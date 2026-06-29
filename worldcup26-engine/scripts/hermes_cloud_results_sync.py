#!/usr/bin/env python3
"""HERMES cloud results sync for JD-BET World Cup 2026.

Consumes FIFA's public JSON calendar endpoint (no login, no Playwright) and
updates the cloud SQLite table consumed by the dashboard:

  data/dados/BANCO_RESULTADOS_SELECOES/worldcup_results_small.sqlite
  table: fifa_matchcenter_daily_matches

Rules:
- graceful degrade: if FIFA is unreachable, do not touch SQLite/CSV and exit 0;
- idempotent: re-runs replace/dedupe rows by match_id_fifa without corruption;
- keep the same table schema/columns already used by the old HERMES CSV pipeline;
- do not touch referee assignment tables (Claude's referee matching is preserved).
"""
from __future__ import annotations

import csv
import json
import sqlite3
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List, Tuple

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data" / "dados" / "BANCO_RESULTADOS_SELECOES"
DB_PATH = DATA_DIR / "worldcup_results_small.sqlite"
CSV_PATH = DATA_DIR / "fifa_matchcenter_daily_matches.csv"

FIFA_API = (
    "https://api.fifa.com/api/v3/calendar/matches"
    "?idCompetition=17&idSeason=285023"
    "&language=en&count=200"
)
USER_AGENT = (
    "Mozilla/5.0 (compatible; jdmarket-hermes-results/1.0; "
    "+https://www.jdmarket.ai/worldcup26)"
)

HEADERS = [
    "captured_at",
    "source",
    "source_url",
    "match_date_query",
    "match_id_fifa",
    "match_no",
    "event_name",
    "home_team",
    "away_team",
    "kickoff",
    "location",
    "city",
    "referee",
    "home_score",
    "away_score",
    "status",
    "yellow_cards_home",
    "yellow_cards_away",
    "red_cards_home",
    "red_cards_away",
    "goals_home_detail",
    "goals_away_detail",
    "raw_text_path",
    "data_quality_notes",
]

DETAIL_FIELDS = {
    "yellow_cards_home",
    "yellow_cards_away",
    "red_cards_home",
    "red_cards_away",
    "goals_home_detail",
    "goals_away_detail",
    "raw_text_path",
}


def fifa_get_json(url: str) -> Dict[str, Any]:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def first_desc(name_list: Any) -> str:
    if not name_list:
        return ""
    if isinstance(name_list, str):
        return name_list
    for item in name_list:
        if isinstance(item, dict) and item.get("Description"):
            return str(item["Description"])
    return ""


def team_name(team: Dict[str, Any]) -> str:
    return first_desc(team.get("TeamName")) or str(team.get("ShortClubName") or team.get("Abbreviation") or "")


def get_referee(officials: Any) -> str:
    for official in officials or []:
        if official.get("OfficialType") == 1:
            return first_desc(official.get("NameShort")) or first_desc(official.get("Name"))
    return ""


def clean_score(value: Any) -> str:
    if value is None:
        return ""
    try:
        if isinstance(value, float) and value.is_integer():
            return str(int(value))
        return str(int(value))
    except Exception:
        return str(value)


def status_from_match(match: Dict[str, Any]) -> str:
    # In the FIFA calendar endpoint used here, MatchStatus=0 has represented
    # completed matches with scores; MatchStatus=1 has represented scheduled/live
    # fixtures without final scores. Keep the dashboard's existing status labels.
    hs = match.get("HomeTeamScore")
    as_ = match.get("AwayTeamScore")
    if hs is None:
        hs = (match.get("Home") or {}).get("Score")
    if as_ is None:
        as_ = (match.get("Away") or {}).get("Score")
    if match.get("MatchStatus") == 0 and hs is not None and as_ is not None:
        return "full_time"
    return "scheduled_or_live"


def stadium_name(stadium: Any) -> str:
    if not isinstance(stadium, dict):
        return ""
    return first_desc(stadium.get("Name")) or first_desc(stadium.get("StadiumName")) or str(stadium.get("Name") or "")


def city_name(stadium: Any) -> str:
    if not isinstance(stadium, dict):
        return ""
    city = stadium.get("CityName") or stadium.get("City") or stadium.get("CityNameLocalized")
    if isinstance(city, list):
        return first_desc(city)
    if isinstance(city, dict):
        return first_desc(city.get("Name")) or first_desc(city.get("Description"))
    return str(city or "")


def row_from_match(match: Dict[str, Any], captured_at: str) -> Dict[str, str]:
    home_obj = match.get("Home") or {}
    away_obj = match.get("Away") or {}
    home = team_name(home_obj)
    away = team_name(away_obj)
    hs = match.get("HomeTeamScore")
    as_ = match.get("AwayTeamScore")
    if hs is None:
        hs = home_obj.get("Score")
    if as_ is None:
        as_ = away_obj.get("Score")

    match_id = str(match.get("IdMatch") or "")
    match_date = str(match.get("Date") or "")[:10]
    match_no = str(match.get("MatchNumber") or "")
    source_url = f"https://api.fifa.com/api/v3/live/football/{match_id}" if match_id else FIFA_API
    event_name = f"{home} vs. {away}".strip()

    row = {h: "" for h in HEADERS}
    row.update(
        {
            "captured_at": captured_at,
            "source": "FIFA public calendar API",
            "source_url": source_url,
            "match_date_query": match_date,
            "match_id_fifa": match_id,
            "match_no": match_no,
            "event_name": event_name,
            "home_team": home,
            "away_team": away,
            "kickoff": str(match.get("Date") or ""),
            "location": stadium_name(match.get("Stadium")),
            "city": city_name(match.get("Stadium")),
            "referee": get_referee(match.get("Officials")),
            "home_score": clean_score(hs) if status_from_match(match) == "full_time" else "",
            "away_score": clean_score(as_) if status_from_match(match) == "full_time" else "",
            "status": status_from_match(match),
            "data_quality_notes": (
                "Synced by HERMES from FIFA public calendar API. "
                "Scores/referee are structured JSON; detailed goals/cards may remain blank "
                "unless FIFA exposes them in this endpoint or an older row already had them."
            ),
        }
    )
    return row


def ensure_table(con: sqlite3.Connection) -> List[str]:
    info = con.execute("PRAGMA table_info(fifa_matchcenter_daily_matches)").fetchall()
    if not info:
        coldef = ", ".join(f'"{c}" TEXT' for c in HEADERS)
        con.execute(f"CREATE TABLE fifa_matchcenter_daily_matches ({coldef})")
        return list(HEADERS)
    cols = [r[1] for r in info]
    for col in HEADERS:
        if col not in cols:
            con.execute(f'ALTER TABLE fifa_matchcenter_daily_matches ADD COLUMN "{col}" TEXT')
            cols.append(col)
    return cols


def load_existing(con: sqlite3.Connection, cols: List[str]) -> Dict[str, Dict[str, str]]:
    rows = con.execute("SELECT * FROM fifa_matchcenter_daily_matches").fetchall()
    out: Dict[str, Dict[str, str]] = {}
    for row in rows:
        d = {k: ("" if row[k] is None else str(row[k])) for k in row.keys()}
        key = d.get("match_id_fifa") or d.get("match_no") or f"row-{len(out)}"
        out[str(key)] = d
    return out


def merge_rows(old: Dict[str, str], new: Dict[str, str], captured_at: str) -> Dict[str, str]:
    merged = {h: "" for h in HEADERS}
    for h in HEADERS:
        merged[h] = new.get(h, "")
    # Preserve older detailed cards/goals/raw evidence if the calendar endpoint
    # does not expose them on this run.
    for field in DETAIL_FIELDS:
        if not merged.get(field) and old.get(field):
            merged[field] = old[field]
    # Preserve previous referee if current API transiently omits it.
    if not merged.get("referee") and old.get("referee"):
        merged["referee"] = old["referee"]

    # Idempotence: if only captured_at would change, keep the old timestamp and
    # report no update. When football data actually changes, stamp this run.
    comparable_fields = [h for h in HEADERS if h != "captured_at"]
    if old and {h: old.get(h, "") for h in comparable_fields} == {h: merged.get(h, "") for h in comparable_fields}:
        merged["captured_at"] = old.get("captured_at", merged.get("captured_at", ""))
    elif old and old != merged:
        merged["captured_at"] = captured_at
    return merged


def sort_key(row: Dict[str, str]) -> Tuple[int, str]:
    try:
        return (int(row.get("match_no") or 9999), row.get("match_id_fifa") or "")
    except Exception:
        return (9999, row.get("match_id_fifa") or "")


def write_csv(rows: Iterable[Dict[str, str]]) -> None:
    CSV_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CSV_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS, lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({h: row.get(h, "") for h in HEADERS})


def main() -> None:
    if not DB_PATH.exists():
        raise SystemExit(f"missing SQLite DB: {DB_PATH}")

    try:
        data = fifa_get_json(FIFA_API)
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as e:
        print(json.dumps({"status": "fifa_api_unreachable", "error": str(e), "db_touched": False}, ensure_ascii=False, indent=2))
        return

    matches = data.get("Results") or []
    if not matches:
        print(json.dumps({"status": "no_matches_in_api", "db_touched": False}, ensure_ascii=False, indent=2))
        return

    captured_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
    new_by_key = {str(m.get("IdMatch") or m.get("MatchNumber")): row_from_match(m, captured_at) for m in matches}

    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    try:
        cols = ensure_table(con)
        old_by_key = load_existing(con, cols)
        merged_by_key = dict(old_by_key)
        inserted: List[str] = []
        updated: List[str] = []

        for key, new_row in new_by_key.items():
            old_row = old_by_key.get(key, {})
            merged = merge_rows(old_row, new_row, captured_at)
            if not old_row:
                inserted.append(merged.get("match_no") or key)
            elif {h: old_row.get(h, "") for h in HEADERS} != {h: merged.get(h, "") for h in HEADERS}:
                updated.append(merged.get("match_no") or key)
            merged_by_key[key] = merged

        final_rows = sorted(merged_by_key.values(), key=sort_key)
        con.execute("DROP TABLE IF EXISTS fifa_matchcenter_daily_matches")
        coldef = ", ".join(f'"{c}" TEXT' for c in HEADERS)
        con.execute(f"CREATE TABLE fifa_matchcenter_daily_matches ({coldef})")
        placeholders = ",".join("?" for _ in HEADERS)
        con.executemany(
            f"INSERT INTO fifa_matchcenter_daily_matches VALUES ({placeholders})",
            [[row.get(h, "") for h in HEADERS] for row in final_rows],
        )
        integrity = con.execute("PRAGMA integrity_check").fetchone()[0]
        if integrity != "ok":
            raise RuntimeError(f"sqlite integrity failed: {integrity}")
        con.commit()
    except Exception:
        con.rollback()
        raise
    finally:
        con.close()

    write_csv(final_rows)

    full_time = sum(1 for r in final_rows if r.get("status") == "full_time")
    scheduled = sum(1 for r in final_rows if r.get("status") != "full_time")
    print(json.dumps(
        {
            "status": "ok",
            "source": FIFA_API,
            "sqlite": str(DB_PATH),
            "csv": str(CSV_PATH),
            "api_matches": len(matches),
            "table_rows": len(final_rows),
            "full_time_rows": full_time,
            "scheduled_or_live_rows": scheduled,
            "inserted_count": len(inserted),
            "updated_count": len(updated),
            "inserted_match_nos": inserted[:40],
            "updated_match_nos": updated[:40],
            "integrity": integrity,
            "size_mb": round(DB_PATH.stat().st_size / 1024 / 1024, 2),
        },
        ensure_ascii=False,
        indent=2,
    ))


if __name__ == "__main__":
    main()
