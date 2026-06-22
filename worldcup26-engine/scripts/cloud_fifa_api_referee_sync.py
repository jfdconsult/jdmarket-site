#!/usr/bin/env python3
"""Sync referee assignment via the FIFA public JSON API.

Replaces the regex-over-HTML approach: api.fifa.com/api/v3 exposes Officials
structured for all 72 group-stage matches, including FUTURE ones once FIFA
publishes the appointment (typically 2-3 days before kickoff).

Endpoint (no login, no anti-bot, JSON):
  /calendar/matches?idCompetition=17&idSeason=285023&idStage=289273&language=en

Each match payload exposes `Officials` with OfficialType=1 (Referee), including
the official name + IdCountry (ISO3).

Writes to the same tables as cloud_referee_assignment_sync.py:
  - fixture_referee_assignments_2026
  - fixture_discipline_features_for_model

Idempotent. Does not touch results / scores / cards / odds tables. Degrades
gracefully if FIFA API is unreachable (keeps the DB untouched, exit 0).
"""
from __future__ import annotations

import json
import re
import sqlite3
import sys
import unicodedata
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / 'data' / 'dados' / 'BANCO_RESULTADOS_SELECOES' / 'worldcup_results_small.sqlite'

FIFA_API = (
    'https://api.fifa.com/api/v3/calendar/matches'
    '?idCompetition=17&idSeason=285023&idStage=289273'
    '&language=en&count=100'
)
USER_AGENT = (
    'Mozilla/5.0 (compatible; jdmarket-cloud/1.0; '
    '+https://www.jdmarket.ai/worldcup26)'
)

# Team-name aliases — identical to cloud_referee_assignment_sync.py
ALIASES = {
    'usa': 'united states', 'us': 'united states', 'eua': 'united states',
    'czechia': 'czech republic', 'czech': 'czech republic',
    'republica tcheca': 'czech republic', 'tchequia': 'czech republic',
    'korea republic': 'south korea', 'republic of korea': 'south korea',
    'coreia do sul': 'south korea',
    'bosnia herzegovina': 'bosnia and herzegovina',
    'bosnia herzgovina': 'bosnia and herzegovina',
    'bosnia': 'bosnia and herzegovina',
    'cote d ivoire': 'ivory coast',
    'cabo verde': 'cape verde',
    'iran': 'ir iran',
    'turkiye': 'turkey',
    'congo dr': 'dr congo', 'rd congo': 'dr congo',
    'congo democratic republic': 'dr congo',
    'democratic republic of the congo': 'dr congo',
    'republica democratica do congo': 'dr congo',
    'curacao': 'curacao',
}


def norm(s):
    s = s or ''
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-zA-Z0-9]+', ' ', s).strip().lower()
    return ALIASES.get(s, s)


def fkey(home, away):
    return (norm(home), norm(away))


def fifa_get_json(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': USER_AGENT,
        'Accept': 'application/json',
    })
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read())


def first_desc(name_list):
    """FIFA returns localized arrays: [{"Locale":"en-GB","Description":"..."}, ...]."""
    if not name_list:
        return ''
    for n in name_list:
        if (n or {}).get('Description'):
            return n['Description']
    return ''


def get_referee(officials):
    """Returns {'name', 'country_iso', 'fifa_official_id'} or {} when no referee yet."""
    for o in officials or []:
        if o.get('OfficialType') == 1:  # 1 = Referee
            name = first_desc(o.get('NameShort')) or first_desc(o.get('Name'))
            if name:
                return {
                    'name': name,
                    'country_iso': o.get('IdCountry') or '',
                    'fifa_official_id': o.get('OfficialId') or '',
                }
    return {}


def find_local_referee_identity(con, fifa_name):
    """Local identity (R-NNN id + nice country) for the FIFA referee name.

    Priority: roster_2026_sportingnews → history (exact name) → history (family name).
    """
    if not fifa_name:
        return {'referee_id': '', 'referee_country': '', 'match_method': 'blank'}
    row = con.execute(
        "SELECT matched_history_referee_id, country_en "
        "FROM referee_roster_2026_sportingnews "
        "WHERE lower(professional_name)=lower(?) LIMIT 1",
        (fifa_name,)
    ).fetchone()
    if row:
        return {
            'referee_id': row['matched_history_referee_id'] or '',
            'referee_country': row['country_en'] or '',
            'match_method': 'roster_exact',
        }
    row = con.execute(
        "SELECT referee_id, referee_country FROM referee_worldcup_history "
        "WHERE lower(referee_name)=lower(?) LIMIT 1",
        (fifa_name,)
    ).fetchone()
    if row:
        return {
            'referee_id': row['referee_id'] or '',
            'referee_country': row['referee_country'] or '',
            'match_method': 'history_exact',
        }
    parts = [p for p in re.split(r'\s+', fifa_name.strip()) if p]
    fam = next((p for p in parts if p.isupper() and len(p) > 2), parts[-1] if parts else '')
    if fam:
        row = con.execute(
            "SELECT referee_id, referee_country FROM referee_worldcup_history "
            "WHERE lower(family_name)=lower(?) LIMIT 1",
            (fam.title(),)
        ).fetchone()
        if row:
            return {
                'referee_id': row['referee_id'] or '',
                'referee_country': row['referee_country'] or '',
                'match_method': 'history_family_name',
            }
    return {'referee_id': '', 'referee_country': '', 'match_method': 'name_only'}


def main():
    if not DB_PATH.exists():
        raise SystemExit(f'missing {DB_PATH}')

    try:
        data = fifa_get_json(FIFA_API)
    except (urllib.error.URLError, TimeoutError) as e:
        # Graceful degrade — keep DB untouched, do not fail the workflow step.
        print(json.dumps({'status': 'fifa_api_unreachable', 'error': str(e)},
                         ensure_ascii=False, indent=2))
        return

    matches = data.get('Results') or []
    if not matches:
        print(json.dumps({'status': 'no_matches_in_api'}, ensure_ascii=False, indent=2))
        return

    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    now = datetime.now(timezone.utc).isoformat(timespec='seconds')

    fixtures = con.execute(
        'SELECT fixture_id, event_name_pt, home_team, away_team '
        'FROM fixture_discipline_features_for_model'
    ).fetchall()
    by_key = {fkey(r['home_team'], r['away_team']): dict(r) for r in fixtures}
    for r in fixtures:
        by_key.setdefault(fkey(r['away_team'], r['home_team']), dict(r))

    updated = 0
    pending_no_ref = []
    unmatched = []
    method_counts = {}

    for m in matches:
        # FIFA /calendar/matches exposes teams under `Home`/`Away` (TeamName + ShortClubName),
        # NOT under `HomeTeam`/`AwayTeam` (those are only present on /live/football/{id}).
        home_obj = m.get('Home') or {}
        away_obj = m.get('Away') or {}
        home_name = first_desc(home_obj.get('TeamName')) or home_obj.get('ShortClubName', '')
        away_name = first_desc(away_obj.get('TeamName')) or away_obj.get('ShortClubName', '')
        fk = fkey(home_name, away_name)
        fx = by_key.get(fk)
        if not fx:
            unmatched.append({
                'home': home_name, 'away': away_name,
                'idMatch': m.get('IdMatch'),
            })
            continue

        ref = get_referee(m.get('Officials'))
        if not ref:
            pending_no_ref.append(fx['event_name_pt'])
            continue

        ident = find_local_referee_identity(con, ref['name'])
        method_counts[ident['match_method']] = method_counts.get(ident['match_method'], 0) + 1

        con.execute(
            "UPDATE fixture_referee_assignments_2026 SET "
            "captured_at=?, referee_name=?, referee_country=?, "
            "assignment_status='confirmed_fifa_api', "
            "source_url=?, data_quality_notes=? "
            "WHERE fixture_id=?",
            (
                now,
                ref['name'],
                ident.get('referee_country') or ref.get('country_iso', ''),
                f"https://api.fifa.com/api/v3/live/football/{m.get('IdMatch')}",
                (f"Synced from FIFA public API; identity_match={ident['match_method']}; "
                 f"fifa_official_id={ref.get('fifa_official_id','')}"),
                fx['fixture_id'],
            )
        )
        con.execute(
            "UPDATE fixture_discipline_features_for_model SET "
            "captured_at=?, assigned_referee_name=?, assigned_referee_id=?, "
            "referee_assignment_status='confirmed_fifa_api' "
            "WHERE fixture_id=?",
            (now, ref['name'], ident.get('referee_id', ''), fx['fixture_id'])
        )
        updated += 1

    con.commit()
    integrity = con.execute('pragma integrity_check').fetchone()[0]
    n_with_ref = con.execute(
        "SELECT count(*) FROM fixture_discipline_features_for_model "
        "WHERE trim(coalesce(assigned_referee_name,'')) <> ''"
    ).fetchone()[0]
    con.close()
    if integrity != 'ok':
        raise SystemExit(f'sqlite integrity failed: {integrity}')

    print(json.dumps({
        'status': 'ok',
        'fifa_total_matches': len(matches),
        'updated': updated,
        'fixtures_with_referee_total': n_with_ref,
        'matches_without_referee_yet': len(pending_no_ref),
        'identity_match_methods': method_counts,
        'unmatched_fixtures_sample': unmatched[:5],
        'integrity': integrity,
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
