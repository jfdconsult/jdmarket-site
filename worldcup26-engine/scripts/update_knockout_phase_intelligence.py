#!/usr/bin/env python3
"""Atualiza inteligência da fase mata-mata da Copa 2026 para JD-BET.

Cria/atualiza tabelas no SQLite:
- wc2026_knockout_fixtures_official
- wc2026_knockout32_qualified
- wc2026_round16_known
- wc1998_2022_knockout_match_history
- wc1998_2022_round_of_16_history
- wc1998_2022_knockout_summary_by_team
- prediction_polymarket_knockout_matches

Também exporta CSV/JSON/README em data/dados/MATA_MATA_2026.
"""
from __future__ import annotations

import csv
import json
import sqlite3
import time
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "dados" / "BANCO_RESULTADOS_SELECOES" / "worldcup_results_small.sqlite"
OUT_DIR = ROOT / "data" / "dados" / "MATA_MATA_2026"
RAW_DIR = OUT_DIR / "raw"
FIFA_ALL = "https://api.fifa.com/api/v3/calendar/matches?idCompetition=17&idSeason=285023&language=en&count=200"
MATCHES_CSV = "https://raw.githubusercontent.com/jfjelstul/worldcup/master/data-csv/matches.csv"
POLY_SEARCH = "https://gamma-api.polymarket.com/events?limit=20&active=true&closed=false&search="
UA = "Mozilla/5.0 (compatible; jdmarket-knockout-refresh/1.0; +https://www.jdmarket.ai/worldcup26)"


def get_json(url: str) -> Any:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=35) as r:
        return json.loads(r.read())


def get_text(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/csv,text/plain,*/*"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read().decode("utf-8", "replace")


def desc(x: Any) -> str:
    if not x:
        return ""
    if isinstance(x, str):
        return x
    if isinstance(x, list):
        for item in x:
            if isinstance(item, dict) and item.get("Description"):
                return str(item["Description"])
    return ""


def team(obj: Dict[str, Any] | None) -> str:
    obj = obj or {}
    return desc(obj.get("TeamName")) or str(obj.get("ShortClubName") or obj.get("Abbreviation") or "")


def stage(m: Dict[str, Any]) -> str:
    return desc(m.get("StageName"))


def score(v: Any) -> str:
    if v is None:
        return ""
    try:
        return str(int(v))
    except Exception:
        return str(v)


def fifa_rows() -> List[Dict[str, str]]:
    data = get_json(FIFA_ALL)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    (RAW_DIR / f"fifa_all_matches_{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    rows = []
    for m in data.get("Results", []):
        n = int(m.get("MatchNumber") or 0)
        if n < 73:
            continue
        h, a = team(m.get("Home")), team(m.get("Away"))
        st = stage(m)
        rows.append({
            "captured_at": datetime.now(timezone.utc).isoformat(),
            "source": "FIFA public calendar API all stages",
            "match_no": str(n),
            "stage_name": st,
            "kickoff": str(m.get("Date") or ""),
            "home_team": h,
            "away_team": a,
            "event_name": f"{h} vs. {a}" if h and a else (h or a or f"Match {n}"),
            "home_score": score(m.get("HomeTeamScore")),
            "away_score": score(m.get("AwayTeamScore")),
            "status": "full_time" if m.get("MatchStatus") == 0 and m.get("HomeTeamScore") is not None and m.get("AwayTeamScore") is not None else "scheduled_or_live",
            "source_url": f"https://api.fifa.com/api/v3/live/football/{m.get('IdMatch')}" if m.get("IdMatch") else FIFA_ALL,
            "data_quality_notes": "Official FIFA calendar JSON. Blank team means FIFA bracket slot not yet resolved.",
        })
    return sorted(rows, key=lambda r: int(r["match_no"]))


def load_worldcup_history() -> List[Dict[str, str]]:
    text = get_text(MATCHES_CSV)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    (RAW_DIR / "jfjelstul_worldcup_matches.csv").write_text(text, encoding="utf-8")
    rows = list(csv.DictReader(text.splitlines()))
    out = []
    for r in rows:
        try:
            year = int((r.get("tournament_id") or "WC-0").split("-")[-1])
        except Exception:
            year = 0
        if year < 1998 or year > 2022:
            continue
        if str(r.get("knockout_stage", "")).lower() not in {"1", "true", "t"}:
            continue
        out.append(r)
    return out


def norm_team_name(t: str) -> str:
    aliases = {
        "Czechia": "Czech Republic",
        "Korea Republic": "South Korea",
        "Côte d'Ivoire": "Côte d’Ivoire",
        "IR Iran": "Iran",
        "USA": "United States",
        "Congo DR": "DR Congo",
        "Türkiye": "Turkey",
    }
    return aliases.get(t, t)


def build_history_tables(knockout_teams: Iterable[str], hist: List[Dict[str, str]]):
    wanted = set(knockout_teams) | {norm_team_name(t) for t in knockout_teams}
    match_rows = []
    r16_rows = []
    summary = defaultdict(lambda: {"team": "", "knockout_matches": 0, "round_of_16_matches": 0, "wins": 0, "draws": 0, "losses": 0, "goals_for": 0, "goals_against": 0, "penalty_shootouts": 0, "best_stage": ""})
    stage_rank = {"final": 6, "third-place match": 5, "semi-finals": 4, "quarter-finals": 3, "round of 16": 2, "round of 32": 1}
    for r in hist:
        year = (r.get("tournament_id") or "WC-").split("-")[-1]
        st = r.get("stage_name", "")
        h, a = r.get("home_team_name", ""), r.get("away_team_name", "")
        for side, tm, opp, gf, ga, win_col in [
            ("home", h, a, r.get("home_team_score", "0"), r.get("away_team_score", "0"), "home_team_win"),
            ("away", a, h, r.get("away_team_score", "0"), r.get("home_team_score", "0"), "away_team_win"),
        ]:
            if tm not in wanted and norm_team_name(tm) not in wanted:
                continue
            try:
                gfi, gai = int(float(gf or 0)), int(float(ga or 0))
            except Exception:
                gfi, gai = 0, 0
            result = "D"
            if str(r.get(win_col, "")).lower() in {"1", "true", "t"}:
                result = "W"
            elif str(r.get("draw", "")).lower() not in {"1", "true", "t"}:
                result = "L"
            rec = {
                "team": tm, "year": year, "stage_name": st, "match_date": r.get("match_date", ""),
                "match_name": r.get("match_name", ""), "side": side, "opponent": opp,
                "goals_for": str(gfi), "goals_against": str(gai), "result_after_match_rules": result,
                "extra_time": r.get("extra_time", ""), "penalty_shootout": r.get("penalty_shootout", ""),
                "score": r.get("score", ""), "score_penalties": r.get("score_penalties", ""),
                "source": "jfjelstul/worldcup matches.csv",
            }
            match_rows.append(rec)
            if st.lower() == "round of 16":
                r16_rows.append(rec)
            s = summary[tm]; s["team"] = tm; s["knockout_matches"] += 1; s["goals_for"] += gfi; s["goals_against"] += gai
            if st.lower() == "round of 16": s["round_of_16_matches"] += 1
            if result == "W": s["wins"] += 1
            elif result == "L": s["losses"] += 1
            else: s["draws"] += 1
            if str(r.get("penalty_shootout", "")).lower() in {"1", "true", "t"}: s["penalty_shootouts"] += 1
            if stage_rank.get(st.lower(), 0) > stage_rank.get(str(s["best_stage"]).lower(), 0): s["best_stage"] = st
    return match_rows, r16_rows, list(summary.values())


def flatten_polymarket_event(query: str, event: Dict[str, Any]) -> List[Dict[str, str]]:
    rows = []
    markets = event.get("markets") or []
    for m in markets:
        prices = []
        outcomes = []
        for field, target in [("outcomePrices", prices), ("outcomes", outcomes)]:
            val = m.get(field) or []
            if isinstance(val, str):
                try: val = json.loads(val)
                except Exception: val = []
            target.extend(val if isinstance(val, list) else [])
        rows.append({
            "captured_at": datetime.now(timezone.utc).isoformat(),
            "query": query,
            "event_id": str(event.get("id", "")),
            "event_title": str(event.get("title") or event.get("question") or ""),
            "event_slug": str(event.get("slug", "")),
            "event_volume": str(event.get("volume") or event.get("volumeNum") or ""),
            "event_liquidity": str(event.get("liquidity") or event.get("liquidityNum") or ""),
            "market_id": str(m.get("id", "")),
            "market_question": str(m.get("question", "")),
            "market_slug": str(m.get("slug", "")),
            "outcomes": json.dumps(outcomes, ensure_ascii=False),
            "outcome_prices": json.dumps(prices, ensure_ascii=False),
            "active": str(m.get("active", "")),
            "closed": str(m.get("closed", "")),
            "end_date": str(m.get("endDate", "")),
            "source_url": "https://polymarket.com/event/" + str(event.get("slug", "")) if event.get("slug") else "https://polymarket.com",
            "quality_note": "Raw Polymarket search result; use only if question maps directly to fixture and liquidity is acceptable.",
        })
    return rows


def collect_polymarket(fixtures: List[Dict[str, str]]) -> List[Dict[str, str]]:
    all_rows = []
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    for fx in fixtures:
        if not fx.get("home_team") or not fx.get("away_team"):
            continue
        query = f"World Cup {fx['home_team']} {fx['away_team']}"
        url = POLY_SEARCH + urllib.parse.quote(query)
        try:
            data = get_json(url)
            (RAW_DIR / f"polymarket_{fx['match_no']}_{fx['home_team']}_vs_{fx['away_team']}.json".replace("/", "-")).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
            events = data if isinstance(data, list) else data.get("events", []) if isinstance(data, dict) else []
            if not events:
                all_rows.append({"captured_at": datetime.now(timezone.utc).isoformat(), "query": query, "event_id": "", "event_title": "", "event_slug": "", "event_volume": "", "event_liquidity": "", "market_id": "", "market_question": "", "market_slug": "", "outcomes": "[]", "outcome_prices": "[]", "active": "", "closed": "", "end_date": "", "source_url": url, "quality_note": "No Polymarket event returned for this direct fixture query."})
            for ev in events:
                all_rows.extend(flatten_polymarket_event(query, ev))
        except Exception as e:
            all_rows.append({"captured_at": datetime.now(timezone.utc).isoformat(), "query": query, "event_id": "", "event_title": "", "event_slug": "", "event_volume": "", "event_liquidity": "", "market_id": "", "market_question": "", "market_slug": "", "outcomes": "[]", "outcome_prices": "[]", "active": "", "closed": "", "end_date": "", "source_url": url, "quality_note": f"ERROR: {e!r}"})
        time.sleep(0.15)
    return all_rows


def write_csv(path: Path, rows: List[Dict[str, Any]]):
    path.parent.mkdir(parents=True, exist_ok=True)
    fields = sorted({k for r in rows for k in r.keys()}) if rows else []
    with path.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in rows:
            w.writerow(r)


def replace_table(con: sqlite3.Connection, name: str, rows: List[Dict[str, Any]]):
    con.execute(f'DROP TABLE IF EXISTS "{name}"')
    fields = sorted({k for r in rows for k in r.keys()}) if rows else ["empty"]
    con.execute(f'CREATE TABLE "{name}" ({", ".join(chr(34)+f+chr(34)+" TEXT" for f in fields)})')
    if rows:
        sql = f'INSERT INTO "{name}" ({", ".join(chr(34)+f+chr(34) for f in fields)}) VALUES ({", ".join("?" for _ in fields)})'
        con.executemany(sql, [[str(r.get(f, "")) for f in fields] for r in rows])


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    fixtures = fifa_rows()
    r32 = [r for r in fixtures if r["stage_name"] == "Round of 32"]
    r16 = [r for r in fixtures if r["stage_name"] == "Round of 16"]
    qualified = []
    for r in r32:
        for side in ["home_team", "away_team"]:
            if r.get(side):
                qualified.append({
                    "captured_at": datetime.now(timezone.utc).isoformat(),
                    "team": r[side],
                    "source_match_no": r["match_no"],
                    "source_fixture": r["event_name"],
                    "source": "Official FIFA Round of 32 fixture list",
                    "note": "Equipe presente em jogo oficial de Round of 32; portanto classificada entre as 32.",
                })
    hist = load_worldcup_history()
    match_hist, r16_hist, hist_summary = build_history_tables([q["team"] for q in qualified], hist)
    poly = collect_polymarket(r32 + [r for r in r16 if r.get("home_team") or r.get("away_team")])

    write_csv(OUT_DIR / "wc2026_knockout_fixtures_official.csv", fixtures)
    write_csv(OUT_DIR / "wc2026_knockout32_qualified.csv", qualified)
    write_csv(OUT_DIR / "wc2026_round16_known.csv", r16)
    write_csv(OUT_DIR / "wc1998_2022_knockout_match_history.csv", match_hist)
    write_csv(OUT_DIR / "wc1998_2022_round_of_16_history.csv", r16_hist)
    write_csv(OUT_DIR / "wc1998_2022_knockout_summary_by_team.csv", hist_summary)
    write_csv(OUT_DIR / "prediction_polymarket_knockout_matches.csv", poly)

    with sqlite3.connect(DB_PATH) as con:
        replace_table(con, "wc2026_knockout_fixtures_official", fixtures)
        replace_table(con, "wc2026_knockout32_qualified", qualified)
        replace_table(con, "wc2026_round16_known", r16)
        replace_table(con, "wc1998_2022_knockout_match_history", match_hist)
        replace_table(con, "wc1998_2022_round_of_16_history", r16_hist)
        replace_table(con, "wc1998_2022_knockout_summary_by_team", hist_summary)
        replace_table(con, "prediction_polymarket_knockout_matches", poly)
        integrity = con.execute("PRAGMA integrity_check").fetchone()[0]

    meta = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "db": str(DB_PATH),
        "official_knockout_fixtures": len(fixtures),
        "round_of_32_fixtures": len(r32),
        "round_of_32_qualified_teams": len({q["team"] for q in qualified}),
        "round_of_16_known_slots": len(r16),
        "canada_round32_result": [r for r in r32 if "Canada" in (r.get("home_team"), r.get("away_team"))],
        "historical_knockout_rows": len(match_hist),
        "historical_round_of_16_rows": len(r16_hist),
        "polymarket_rows": len(poly),
        "sqlite_integrity": integrity,
        "sources": [FIFA_ALL, MATCHES_CSV, "https://gamma-api.polymarket.com"],
    }
    (OUT_DIR / "METADADOS_MATA_MATA_2026.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    teams = ", ".join(sorted({q["team"] for q in qualified}))
    (OUT_DIR / "LEIA_PRIMEIRO_MATA_MATA_2026.md").write_text(
        f"# JD-BET Copa 2026 — Mata-mata\n\n"
        f"Gerado em: {meta['generated_at']}\n\n"
        f"Leia primeiro estes arquivos: wc2026_knockout_fixtures_official.csv, wc2026_knockout32_qualified.csv, wc1998_2022_knockout_summary_by_team.csv, prediction_polymarket_knockout_matches.csv.\n\n"
        f"32 classificados oficiais via lista FIFA Round of 32: {teams}.\n\n"
        f"Canadá: jogo 73, South Africa 0 x 1 Canada, status full_time; Canadá já aparece no Round of 16 no jogo 90.\n\n"
        f"Mercados preditivos: tabela Polymarket contém resultados brutos de busca por confronto; linhas sem market_id significam nenhum mercado direto encontrado. Use volume/liquidez antes de usar como pilar de probabilidade.\n\n"
        f"SQLite atualizado: {DB_PATH}\n",
        encoding="utf-8",
    )
    print(json.dumps(meta, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
