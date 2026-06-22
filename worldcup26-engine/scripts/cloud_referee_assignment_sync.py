#!/usr/bin/env python3
"""Populate referee->fixture assignment tables from FIFA Match Centre results.

The cloud already carries `fifa_matchcenter_daily_matches` rows with a `referee`
column. This script matches those rows to the 72 fixture rows by normalized
home/away team names, then writes the assignment into:

- fixture_referee_assignments_2026
- fixture_discipline_features_for_model

No new data source is invented: blank FIFA referee rows are ignored. The site/v3
will still degrade gracefully for matches without official referee name.
"""
from __future__ import annotations

from pathlib import Path
import json
import re
import sqlite3
import unicodedata
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / 'data' / 'dados' / 'BANCO_RESULTADOS_SELECOES' / 'worldcup_results_small.sqlite'

ALIASES = {
    'usa': 'united states',
    'us': 'united states',
    'eua': 'united states',
    'czechia': 'czech republic',
    'czech': 'czech republic',
    'republica tcheca': 'czech republic',
    'tchequia': 'czech republic',
    'korea republic': 'south korea',
    'republic of korea': 'south korea',
    'coreia do sul': 'south korea',
    'bosnia herzegovina': 'bosnia and herzegovina',
    'bosnia herzgovina': 'bosnia and herzegovina',
    'bosnia': 'bosnia and herzegovina',
    'cote d ivoire': 'ivory coast',
    'côte d ivoire': 'ivory coast',
    'cabo verde': 'cape verde',
    'iran': 'ir iran',
    'irã': 'ir iran',
    'turkiye': 'turkey',
    'türkiye': 'turkey',
    'congo dr': 'dr congo',
    'rd congo': 'dr congo',
    'congo democratic republic': 'dr congo',
    'democratic republic of the congo': 'dr congo',
    'republica democratica do congo': 'dr congo',
    'curacao': 'curacao',
    'curaçao': 'curacao',
}


def norm(s: str | None) -> str:
    s = s or ''
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'[^a-zA-Z0-9]+', ' ', s).strip().lower()
    s = ALIASES.get(s, s)
    return s


def key(home: str, away: str) -> tuple[str, str]:
    return (norm(home), norm(away))


def find_referee_identity(con: sqlite3.Connection, name: str) -> dict:
    """Return best available history/roster identity for a referee name."""
    if not name:
        return {'referee_id': '', 'referee_country': '', 'match_method': 'blank'}
    row = con.execute(
        "SELECT matched_history_referee_id, matched_history_referee_name, country_en "
        "FROM referee_roster_2026_sportingnews "
        "WHERE lower(professional_name)=lower(?) LIMIT 1", (name,)
    ).fetchone()
    if row:
        return {
            'referee_id': row['matched_history_referee_id'] or '',
            'referee_country': row['country_en'] or '',
            'match_method': 'roster_exact',
            'matched_history_name': row['matched_history_referee_name'] or '',
        }
    row = con.execute(
        "SELECT referee_id, referee_country, referee_name FROM referee_worldcup_history "
        "WHERE lower(referee_name)=lower(?) LIMIT 1", (name,)
    ).fetchone()
    if row:
        return {
            'referee_id': row['referee_id'] or '',
            'referee_country': row['referee_country'] or '',
            'match_method': 'history_exact',
            'matched_history_name': row['referee_name'] or '',
        }
    # FIFA style often has family name uppercase: Alireza FAGHANI
    parts = [p for p in re.split(r'\s+', name.strip()) if p]
    fam = next((p for p in parts if p.isupper() and len(p) > 2), parts[-1] if parts else '')
    if fam:
        row = con.execute(
            "SELECT referee_id, referee_country, referee_name FROM referee_worldcup_history "
            "WHERE lower(family_name)=lower(?) LIMIT 1", (fam.title(),)
        ).fetchone()
        if row:
            return {
                'referee_id': row['referee_id'] or '',
                'referee_country': row['referee_country'] or '',
                'match_method': 'history_family_name',
                'matched_history_name': row['referee_name'] or '',
            }
    return {'referee_id': '', 'referee_country': '', 'match_method': 'name_only'}


def main() -> None:
    if not DB_PATH.exists():
        raise SystemExit(f'missing {DB_PATH}')
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    now = datetime.now(timezone.utc).isoformat(timespec='seconds')

    fixtures = con.execute(
        'SELECT fixture_id,event_name_pt,home_team,away_team FROM fixture_discipline_features_for_model'
    ).fetchall()
    by_key = {key(r['home_team'], r['away_team']): dict(r) for r in fixtures}
    # Also allow reversed match because FIFA rows may be reversed in edge cases.
    for r in fixtures:
        by_key.setdefault(key(r['away_team'], r['home_team']), dict(r))

    fifa_rows = con.execute(
        "SELECT * FROM fifa_matchcenter_daily_matches WHERE trim(coalesce(referee,'')) <> ''"
    ).fetchall()
    updates = []
    unmatched = []
    for fr in fifa_rows:
        fk = key(fr['home_team'], fr['away_team'])
        fx = by_key.get(fk)
        if not fx:
            unmatched.append({'event_name': fr['event_name'], 'home': fr['home_team'], 'away': fr['away_team'], 'referee': fr['referee']})
            continue
        ident = find_referee_identity(con, fr['referee'])
        updates.append((fx, dict(fr), ident))

    for fx, fr, ident in updates:
        con.execute(
            "UPDATE fixture_referee_assignments_2026 "
            "SET captured_at=?, referee_name=?, referee_country=?, assignment_status=?, source_url=?, data_quality_notes=? "
            "WHERE fixture_id=?",
            (now, fr['referee'], ident.get('referee_country',''), 'confirmed_fifa_match_centre',
             fr.get('source_url',''), f"Synced from fifa_matchcenter_daily_matches; identity_match={ident.get('match_method')}", fx['fixture_id'])
        )
        con.execute(
            "UPDATE fixture_discipline_features_for_model "
            "SET captured_at=?, assigned_referee_name=?, assigned_referee_id=?, referee_assignment_status=? "
            "WHERE fixture_id=?",
            (now, fr['referee'], ident.get('referee_id',''), 'confirmed_fifa_match_centre', fx['fixture_id'])
        )

    con.commit()
    integrity = con.execute('pragma integrity_check').fetchone()[0]
    n_assigned = con.execute(
        "SELECT count(*) FROM fixture_discipline_features_for_model WHERE trim(coalesce(assigned_referee_name,'')) <> ''"
    ).fetchone()[0]
    con.close()
    if integrity != 'ok':
        raise SystemExit(f'sqlite integrity failed: {integrity}')
    print(json.dumps({
        'db': str(DB_PATH),
        'fifa_referee_rows': len(fifa_rows),
        'matched_updates': len(updates),
        'assigned_fixture_rows': n_assigned,
        'unmatched': unmatched[:10],
        'integrity': integrity,
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
