#!/usr/bin/env python3
"""Atualiza árbitros do mata-mata da Copa 2026 no SQLite JD-BET.

Usa o que já está no banco após hermes_cloud_results_sync.py:
- fifa_matchcenter_daily_matches contém jogos 73-104 e o campo referee quando a FIFA publicou.

Atualiza/cria:
- fixture_referee_assignments_2026 para 73-104
- fixture_discipline_features_for_model para 73-104, preservando priors de disciplina por seleção
- wc2026_knockout_referee_assignments
- CSV/readme em data/dados/MATA_MATA_2026/ARBITROS
"""
from __future__ import annotations

import csv
import json
import re
import sqlite3
import unicodedata
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any, List

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "dados" / "BANCO_RESULTADOS_SELECOES" / "worldcup_results_small.sqlite"
OUT_DIR = ROOT / "data" / "dados" / "MATA_MATA_2026" / "ARBITROS"

ALIASES = {
    "usa": "united states", "eua": "united states", "united states": "united states",
    "czechia": "czech republic", "czech republic": "czech republic",
    "korea republic": "south korea", "south korea": "south korea",
    "cote d ivoire": "ivory coast", "côte d'ivoire": "ivory coast", "côte d’ivoire": "ivory coast", "ivory coast": "ivory coast",
    "cabo verde": "cape verde", "cape verde": "cape verde",
    "congo dr": "dr congo", "rd congo": "dr congo", "dr congo": "dr congo",
    "ir iran": "iran", "iran": "iran",
    "turkiye": "turkey", "türkiye": "turkey", "turkey": "turkey",
}

def norm(s: str) -> str:
    s = s or ""
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-zA-Z0-9]+", " ", s).strip().lower()
    return ALIASES.get(s, s)

def referee_identity(con: sqlite3.Connection, name: str) -> Dict[str, str]:
    if not name:
        return {"referee_id": "", "referee_country": "", "method": "blank"}
    row = con.execute(
        "SELECT matched_history_referee_id, country_en FROM referee_roster_2026_sportingnews WHERE lower(professional_name)=lower(?) LIMIT 1",
        (name,),
    ).fetchone()
    if row:
        return {"referee_id": row[0] or "", "referee_country": row[1] or "", "method": "roster_exact"}
    row = con.execute(
        "SELECT referee_id, referee_country FROM referee_worldcup_history WHERE lower(referee_name)=lower(?) LIMIT 1",
        (name,),
    ).fetchone()
    if row:
        return {"referee_id": row[0] or "", "referee_country": row[1] or "", "method": "history_exact"}
    fam = next((p for p in name.split() if p.isupper() and len(p) > 2), name.split()[-1] if name.split() else "")
    if fam:
        row = con.execute(
            "SELECT referee_id, referee_country FROM referee_worldcup_history WHERE lower(family_name)=lower(?) LIMIT 1",
            (fam.title(),),
        ).fetchone()
        if row:
            return {"referee_id": row[0] or "", "referee_country": row[1] or "", "method": "history_family_name"}
    return {"referee_id": "", "referee_country": "", "method": "name_only"}

def team_summary(con: sqlite3.Connection, team: str) -> Dict[str, str]:
    if not team:
        return {}
    rows = con.execute("SELECT * FROM team_discipline_summary_for_model").fetchall()
    cols = [d[0] for d in con.execute("SELECT * FROM team_discipline_summary_for_model LIMIT 1").description]
    for r in rows:
        d = dict(zip(cols, r))
        if norm(d.get("team", "")) == norm(team):
            return {k: "" if v is None else str(v) for k, v in d.items()}
    return {}

def ensure_assignment_row(con: sqlite3.Connection, fx: Dict[str, str], ident: Dict[str, str], now: str) -> None:
    fid = fx["match_no"]
    exists = con.execute("SELECT 1 FROM fixture_referee_assignments_2026 WHERE fixture_id=?", (fid,)).fetchone()
    status = "confirmed_fifa_api" if fx.get("referee") else "pending_official_fifa_publication"
    note = f"Knockout sync from FIFA calendar/results table; identity_match={ident['method']}" if fx.get("referee") else "Knockout sync; FIFA has not published referee yet."
    vals = (
        now, fid, fx.get("event_name", ""), fx.get("home_team", ""), fx.get("away_team", ""), fx.get("referee", ""),
        ident.get("referee_country", ""), "", "", "", "", status, fx.get("source_url", ""), "", note,
    )
    if exists:
        con.execute(
            "UPDATE fixture_referee_assignments_2026 SET captured_at=?, event_name_pt=?, home_team=?, away_team=?, referee_name=?, referee_country=?, assistant_1_name=?, assistant_2_name=?, var_name=?, fourth_official_name=?, assignment_status=?, source_url=?, raw_evidence_path=?, data_quality_notes=? WHERE fixture_id=?",
            (now, fx.get("event_name", ""), fx.get("home_team", ""), fx.get("away_team", ""), fx.get("referee", ""), ident.get("referee_country", ""), "", "", "", "", status, fx.get("source_url", ""), "", note, fid),
        )
    else:
        con.execute(
            "INSERT INTO fixture_referee_assignments_2026 (captured_at, fixture_id, event_name_pt, home_team, away_team, referee_name, referee_country, assistant_1_name, assistant_2_name, var_name, fourth_official_name, assignment_status, source_url, raw_evidence_path, data_quality_notes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            vals,
        )

def ensure_feature_row(con: sqlite3.Connection, fx: Dict[str, str], ident: Dict[str, str], now: str) -> None:
    fid = fx["match_no"]
    hs = team_summary(con, fx.get("home_team", ""))
    aw = team_summary(con, fx.get("away_team", ""))
    status = "confirmed_fifa_api" if fx.get("referee") else "pending_official_fifa_publication"
    vals = {
        "captured_at": now, "fixture_id": fid, "event_name_pt": fx.get("event_name", ""),
        "home_team": fx.get("home_team", ""), "away_team": fx.get("away_team", ""),
        "assigned_referee_name": fx.get("referee", ""), "assigned_referee_id": ident.get("referee_id", ""),
        "referee_assignment_status": status,
        "home_fouls_committed_per_match_wc2022_estimated": hs.get("fouls_committed_per_match_wc2022_estimated", ""),
        "home_fouls_received_per_match_wc2022_estimated": hs.get("fouls_received_per_match_wc2022_estimated", ""),
        "home_yellow_cards_per_match_wc2022": hs.get("yellow_cards_per_match_wc2022", ""),
        "home_red_cards_per_match_wc2022": hs.get("red_cards_per_match_wc2022", ""),
        "home_history_yellow_cards_per_match": hs.get("worldcup_history_yellow_cards_per_match", ""),
        "home_history_red_cards_per_match": hs.get("worldcup_history_red_cards_per_match", ""),
        "home_history_penalty_goals_per_match": hs.get("worldcup_history_penalty_goals_per_match", ""),
        "home_data_quality": hs.get("data_quality", "no_team_or_no_summary"),
        "away_fouls_committed_per_match_wc2022_estimated": aw.get("fouls_committed_per_match_wc2022_estimated", ""),
        "away_fouls_received_per_match_wc2022_estimated": aw.get("fouls_received_per_match_wc2022_estimated", ""),
        "away_yellow_cards_per_match_wc2022": aw.get("yellow_cards_per_match_wc2022", ""),
        "away_red_cards_per_match_wc2022": aw.get("red_cards_per_match_wc2022", ""),
        "away_history_yellow_cards_per_match": aw.get("worldcup_history_yellow_cards_per_match", ""),
        "away_history_red_cards_per_match": aw.get("worldcup_history_red_cards_per_match", ""),
        "away_history_penalty_goals_per_match": aw.get("worldcup_history_penalty_goals_per_match", ""),
        "away_data_quality": aw.get("data_quality", "no_team_or_no_summary"),
        "model_use_note": "Knockout fixture. Referee confirmed only when FIFA publishes explicit referee field; team priors copied from team_discipline_summary_for_model.",
    }
    exists = con.execute("SELECT 1 FROM fixture_discipline_features_for_model WHERE fixture_id=?", (fid,)).fetchone()
    cols = list(vals.keys())
    if exists:
        con.execute("UPDATE fixture_discipline_features_for_model SET " + ", ".join(f"{c}=?" for c in cols if c != "fixture_id") + " WHERE fixture_id=?", [vals[c] for c in cols if c != "fixture_id"] + [fid])
    else:
        con.execute("INSERT INTO fixture_discipline_features_for_model (" + ",".join(cols) + ") VALUES (" + ",".join("?" for _ in cols) + ")", [vals[c] for c in cols])

def write_csv(path: Path, rows: List[Dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fields = sorted({k for r in rows for k in r}) if rows else []
    with path.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(rows)

def replace_table(con: sqlite3.Connection, name: str, rows: List[Dict[str, Any]]) -> None:
    fields = sorted({k for r in rows for k in r}) if rows else ["empty"]
    con.execute(f'DROP TABLE IF EXISTS "{name}"')
    con.execute(f'CREATE TABLE "{name}" ({", ".join(chr(34)+f+chr(34)+" TEXT" for f in fields)})')
    if rows:
        con.executemany(f'INSERT INTO "{name}" ({", ".join(chr(34)+f+chr(34) for f in fields)}) VALUES ({", ".join("?" for _ in fields)})', [[str(r.get(f, "")) for f in fields] for r in rows])

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    fixtures = [dict(r) for r in con.execute("SELECT match_no,event_name,home_team,away_team,kickoff,referee,status,source_url FROM fifa_matchcenter_daily_matches WHERE CAST(match_no AS INTEGER)>=73 ORDER BY CAST(match_no AS INTEGER)")]
    rows = []
    for fx in fixtures:
        ident = referee_identity(con, fx.get("referee", ""))
        ensure_assignment_row(con, fx, ident, now)
        ensure_feature_row(con, fx, ident, now)
        rows.append({
            **fx,
            "captured_at": now,
            "referee_id": ident.get("referee_id", ""),
            "referee_country": ident.get("referee_country", ""),
            "identity_match_method": ident.get("method", ""),
            "assignment_status": "confirmed_fifa_api" if fx.get("referee") else "pending_official_fifa_publication",
            "data_quality_notes": "Official FIFA referee field when present; blank means not yet published. Historical priors available in referee_worldcup_history/referee_match_discipline_worldcup.",
        })
    replace_table(con, "wc2026_knockout_referee_assignments", rows)
    con.commit()
    integrity = con.execute("PRAGMA integrity_check").fetchone()[0]
    if integrity != "ok":
        raise SystemExit(f"sqlite integrity failed: {integrity}")
    confirmed = sum(1 for r in rows if r.get("referee"))
    pending = len(rows) - confirmed
    write_csv(OUT_DIR / "wc2026_knockout_referee_assignments.csv", rows)
    meta = {
        "generated_at": now,
        "sqlite": str(DB_PATH),
        "knockout_rows": len(rows),
        "confirmed_referees": confirmed,
        "pending_referees": pending,
        "sqlite_integrity": integrity,
        "confirmed_matches": [r for r in rows if r.get("referee")],
        "pending_match_nos": [r["match_no"] for r in rows if not r.get("referee")],
    }
    (OUT_DIR / "METADADOS_ARBITROS_MATA_MATA_2026.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT_DIR / "LEIA_PRIMEIRO_ARBITROS_MATA_MATA_2026.md").write_text(
        "# Árbitros — Mata-mata Copa 2026\n\n"
        f"Gerado em: {now}\n\n"
        "Tabelas SQLite atualizadas:\n"
        "- wc2026_knockout_referee_assignments\n"
        "- fixture_referee_assignments_2026\n"
        "- fixture_discipline_features_for_model\n\n"
        "Histórico já existente para cruzamento:\n"
        "- referee_worldcup_history\n"
        "- referee_match_discipline_worldcup\n"
        "- referee_roster_2026_sportingnews\n\n"
        f"Confirmados pela FIFA no mata-mata: {confirmed}. Pendentes: {pending}.\n"
        "Não inventar árbitros pendentes; aguardar publicação oficial FIFA.\n",
        encoding="utf-8",
    )
    print(json.dumps(meta, ensure_ascii=False, indent=2))
    con.close()

if __name__ == "__main__":
    main()
