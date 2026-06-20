"""
auto_post_match.py — Coleta automatica de resultados pos-jogo (Copa 2026)
=========================================================================
2h30 apos o apito, busca dados da ESPN API, registra no pipeline e faz push.
Calendario carregado dinamicamente dos CSVs (72 jogos da fase de grupos).

USO:
  python auto_post_match.py check          # Verifica jogos acabados e processa
  python auto_post_match.py check --dry    # Simula sem gravar
  python auto_post_match.py status         # Mostra status de todos os jogos
  python auto_post_match.py force ID       # Forca reprocessamento do fixture ID

SCHEDULED TASK (Windows):
  Roda a cada 30min entre 15:00-03:00 BRT (horarios dos jogos).
  So processa jogos cujo kickoff + 2h ja passou E que ainda nao foram registrados.
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple

# Force UTF-8 output on Windows
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

import requests

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import wc_config as cfg

LOG_PATH = os.path.join(HERE, "predictions_log.json")
PROCESSED_PATH = os.path.join(HERE, "auto_processed.json")


def _get_schedule() -> Dict[int, Tuple[str, str, str, str]]:
    """Load the full 72-game schedule from CSV via wc_config."""
    sched = cfg.load_schedule()
    if not sched:
        print("  AVISO: Nao foi possivel carregar o calendario dos CSVs.")
        print("  Verifique se os arquivos existem na pasta DADOS DO DIA.")
    return sched


def _load_processed() -> Dict:
    if os.path.exists(PROCESSED_PATH):
        with open(PROCESSED_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def _save_processed(data: Dict) -> None:
    with open(PROCESSED_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def _load_predictions_log() -> Dict:
    if os.path.exists(LOG_PATH):
        with open(LOG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


# -- ESPN data fetch ----------------------------------------------------------

def fetch_espn_scoreboard(date_str: str) -> List[Dict]:
    """Fetch all FIFA WC events for a date (YYYY-MM-DD -> YYYYMMDD)."""
    ymd = date_str.replace("-", "")
    url = f"{cfg.ESPN_BASE}/scoreboard?dates={ymd}"
    try:
        r = requests.get(url, headers=cfg.ESPN_HEADERS, timeout=15)
        r.raise_for_status()
        return r.json().get("events", [])
    except Exception as e:
        print(f"  [ESPN] Erro ao buscar scoreboard {date_str}: {e}")
        return []


def fetch_espn_summary(event_id: str) -> Optional[Dict]:
    """Fetch detailed match summary (full stats)."""
    url = f"{cfg.ESPN_BASE}/summary?event={event_id}"
    try:
        r = requests.get(url, headers=cfg.ESPN_HEADERS, timeout=15)
        r.raise_for_status()
        return r.json()
    except Exception as e:
        print(f"  [ESPN] Erro ao buscar summary {event_id}: {e}")
        return None


def _estimate_xg(total_shots: int, on_target: int) -> float:
    """Rough xG estimate from shot data."""
    off_target = total_shots - on_target
    return round(on_target * cfg.XG_EST_SOT_WEIGHT + off_target * cfg.XG_EST_OFF_WEIGHT, 2)


def parse_espn_match(event: Dict) -> Optional[Dict]:
    """Parse an ESPN event into our match result format."""
    status = event.get("status", {}).get("type", {})
    if status.get("state") != "post":
        return None

    comp = event.get("competitions", [{}])[0]
    competitors = comp.get("competitors", [])
    if len(competitors) != 2:
        return None

    home_c = next((c for c in competitors if c.get("homeAway") == "home"), None)
    away_c = next((c for c in competitors if c.get("homeAway") == "away"), None)
    if not home_c or not away_c:
        return None

    home_name = cfg.normalize_espn_team(home_c["team"]["displayName"])
    away_name = cfg.normalize_espn_team(away_c["team"]["displayName"])
    home_score = int(home_c.get("score", 0))
    away_score = int(away_c.get("score", 0))

    details = comp.get("details", [])
    goals_str_parts = []
    yellows_str_parts = []
    reds_str_parts = []

    for d in details:
        minute = d.get("clock", {}).get("displayValue", "?")
        athletes = d.get("athletesInvolved", [])
        player = athletes[0].get("displayName", "?") if athletes else "?"

        if d.get("scoringPlay"):
            goals_str_parts.append(f"{player} {minute}")
        elif d.get("yellowCard"):
            yellows_str_parts.append(f"{player} {minute}")
        elif d.get("redCard"):
            reds_str_parts.append(f"{player} {minute}")

    result = {
        "espn_event_id": event.get("id"),
        "home_name": home_name,
        "away_name": away_name,
        "home_score": home_score,
        "away_score": away_score,
        "goals_str": ";".join(goals_str_parts),
        "yellows_str": ";".join(yellows_str_parts),
        "reds_str": ";".join(reds_str_parts),
    }

    summary = fetch_espn_summary(event.get("id"))
    if summary:
        boxscore = summary.get("boxscore", {})
        teams_stats = boxscore.get("teams", [])
        for ts in teams_stats:
            team_name = cfg.normalize_espn_team(ts.get("team", {}).get("displayName", ""))
            stat_dict = {s["name"]: s["displayValue"] for s in ts.get("statistics", [])}

            total_shots = int(stat_dict.get("totalShots", 0))
            on_target = int(stat_dict.get("shotsOnTarget", 0))
            xg_est = _estimate_xg(total_shots, on_target)

            stats_block = {
                "totalShots": total_shots,
                "shotsOnTarget": on_target,
                "possession": float(stat_dict.get("possessionPct", 0)),
                "fouls": int(stat_dict.get("foulsCommitted", 0)),
                "yellowCards": int(stat_dict.get("yellowCards", 0)),
                "redCards": int(stat_dict.get("redCards", 0)),
                "corners": int(stat_dict.get("wonCorners", 0)),
                "offsides": int(stat_dict.get("offsides", 0)),
                "saves": int(stat_dict.get("saves", 0)),
                "passes": int(stat_dict.get("totalPasses", 0)),
                "passAccuracy": float(stat_dict.get("passPct", 0)),
                "xg_estimated": xg_est,
            }

            if team_name == home_name:
                result["home_stats"] = stats_block
                result["xg_home_est"] = xg_est
            elif team_name == away_name:
                result["away_stats"] = stats_block
                result["xg_away_est"] = xg_est

    return result


# -- Match fixture to our DB -------------------------------------------------

def _match_teams(name_a: str, name_b: str) -> bool:
    """Check if two team names refer to the same team using centralized normalization."""
    return cfg.normalize_team(name_a) == cfg.normalize_team(name_b)


def _match_fixture(home: str, away: str, schedule: Dict) -> Optional[int]:
    """Find fixture_id matching home/away team names."""
    for fid, (date, time, h, a) in schedule.items():
        if _match_teams(home, h) and _match_teams(away, a):
            return fid
    return None


# -- Main logic ---------------------------------------------------------------

def games_ready_to_process(now: Optional[datetime] = None) -> List[Tuple[int, Dict]]:
    """Find games that ended (kickoff + 2h passed) and haven't been processed."""
    if now is None:
        now = datetime.now()

    schedule = _get_schedule()
    processed = _load_processed()
    predictions = _load_predictions_log()
    ready = []

    for fid, (date_str, time_str, home, away) in schedule.items():
        fid_str = str(fid)

        if fid_str in processed:
            continue

        if fid_str in predictions and predictions[fid_str].get("score"):
            continue

        try:
            kickoff = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
        except ValueError:
            continue

        if now >= kickoff + timedelta(hours=2):
            ready.append((fid, {"date": date_str, "time": time_str,
                                 "home": home, "away": away}))

    return ready


def process_game(fixture_id: int, espn_match: Dict, dry: bool = False) -> Dict:
    """Register result using post_match_pipeline."""
    schedule = _get_schedule()
    info = schedule.get(fixture_id)
    if not info:
        return {"error": f"Fixture {fixture_id} not in schedule"}

    home_score = espn_match["home_score"]
    away_score = espn_match["away_score"]
    xg_home = espn_match.get("xg_home_est")
    xg_away = espn_match.get("xg_away_est")

    print(f"\n{'='*60}")
    print(f"PROCESSANDO: {info[2]} {home_score} x {away_score} {info[3]}")
    print(f"Fixture ID: {fixture_id} | Data: {info[0]} {info[1]}")
    print(f"xG estimado: {xg_home} / {xg_away}")
    print(f"Gols: {espn_match.get('goals_str', '-')}")
    print(f"Amarelos: {espn_match.get('yellows_str', '-')}")
    print(f"Vermelhos: {espn_match.get('reds_str', '-')}")
    if espn_match.get("home_stats"):
        hs = espn_match["home_stats"]
        as_ = espn_match.get("away_stats", {})
        print(f"Posse: {hs.get('possession')}% / {as_.get('possession')}%")
        print(f"Chutes: {hs.get('totalShots')} ({hs.get('shotsOnTarget')} no gol) / "
              f"{as_.get('totalShots')} ({as_.get('shotsOnTarget')} no gol)")
    print(f"{'='*60}")

    if dry:
        print("  [DRY RUN] Nao gravou nada.")
        return {"dry": True, "fixture_id": fixture_id,
                "score": f"{home_score}-{away_score}"}

    import post_match_pipeline as pmp

    result = pmp.register_result(
        fixture_id=fixture_id,
        home_score=home_score,
        away_score=away_score,
        goals_str=espn_match.get("goals_str", ""),
        yellows_str=espn_match.get("yellows_str", ""),
        reds_str=espn_match.get("reds_str", ""),
        xg_home=xg_home,
        xg_away=xg_away,
    )

    processed = _load_processed()
    processed[str(fixture_id)] = {
        "processed_at": datetime.now().isoformat(),
        "score": f"{home_score}-{away_score}",
        "source": "espn_api",
        "espn_event_id": espn_match.get("espn_event_id"),
        "xg_source": "estimated_from_shots",
        "espn_stats": {
            "home": espn_match.get("home_stats"),
            "away": espn_match.get("away_stats"),
        },
    }
    _save_processed(processed)

    print("\nFazendo push para Vercel...")
    push_result = pmp._git_push()
    print(f"  -> {push_result}")

    return result


def check_and_process(dry: bool = False) -> Dict:
    """Main entry: find finished games, fetch data, process them."""
    now = datetime.now()
    print(f"[{now.strftime('%d/%m/%Y %H:%M')}] Verificando jogos finalizados...")

    ready = games_ready_to_process(now)
    if not ready:
        print("  Nenhum jogo novo para processar.")
        return {"processed": 0}

    print(f"  {len(ready)} jogo(s) pronto(s) para processar.")

    dates_needed = set()
    for fid, info in ready:
        dates_needed.add(info["date"])

    espn_events_by_date = {}
    for d in dates_needed:
        events = fetch_espn_scoreboard(d)
        espn_events_by_date[d] = events
        print(f"  ESPN {d}: {len(events)} evento(s)")

    results = []
    for fid, info in ready:
        events = espn_events_by_date.get(info["date"], [])
        matched = None

        for event in events:
            parsed = parse_espn_match(event)
            if not parsed:
                continue
            if (_match_teams(parsed["home_name"], info["home"]) and
                _match_teams(parsed["away_name"], info["away"])):
                matched = parsed
                break

        if not matched:
            print(f"\n  AVISO: Fixture {fid} ({info['home']} x {info['away']}) "
                  f"nao encontrado na ESPN para {info['date']}.")
            for event in events:
                status = event.get("status", {}).get("type", {}).get("state", "")
                if status != "post":
                    comp = event.get("competitions", [{}])[0]
                    teams = comp.get("competitors", [])
                    names = [t.get("team", {}).get("displayName", "") for t in teams]
                    print(f"    Jogo em andamento? {' vs '.join(names)} (status: {status})")
            continue

        result = process_game(fid, matched, dry=dry)
        results.append(result)

    return {"processed": len(results), "results": results}


def show_status() -> None:
    """Show status of all scheduled games."""
    now = datetime.now()
    schedule = _get_schedule()
    processed = _load_processed()
    predictions = _load_predictions_log()

    print(f"\n{'='*70}")
    print(f"STATUS DOS JOGOS - {now.strftime('%d/%m/%Y %H:%M')}")
    print(f"{'='*70}")
    print(f"{'ID':>3} {'Jogo':<40} {'Data':>10} {'Hora':>5} {'Status':<15}")
    print(f"{'-'*3} {'-'*40} {'-'*10} {'-'*5} {'-'*15}")

    for fid in sorted(schedule.keys()):
        date, time, home, away = schedule[fid]
        fid_str = str(fid)
        match_name = f"{home} x {away}"

        if fid_str in processed:
            score = processed[fid_str].get("score", "?")
            status = f"OK {score}"
        elif fid_str in predictions and predictions[fid_str].get("score"):
            score = predictions[fid_str]["score"]
            status = f"OK {score} (manual)"
        else:
            try:
                kickoff = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
                if now >= kickoff + timedelta(hours=2):
                    status = "PRONTO"
                elif now >= kickoff:
                    status = "EM JOGO"
                else:
                    delta = kickoff - now
                    hours = delta.seconds // 3600
                    mins = (delta.seconds % 3600) // 60
                    if delta.days > 0:
                        status = f"{delta.days}d {hours}h"
                    else:
                        status = f"{hours}h{mins}m"
            except ValueError:
                status = "?"

        print(f"{fid:>3} {match_name:<40} {date:>10} {time:>5} {status}")

    print(f"\nTotal jogos: {len(schedule)}")
    print(f"Processados automaticamente: {len(processed)}")
    print(f"No predictions_log: {len(predictions)}")


def force_process(fixture_id: int) -> None:
    """Force reprocessing of a specific fixture (even if already processed)."""
    schedule = _get_schedule()
    if fixture_id not in schedule:
        print(f"Fixture {fixture_id} nao existe no calendario.")
        return

    info = schedule[fixture_id]

    processed = _load_processed()
    if str(fixture_id) in processed:
        del processed[str(fixture_id)]
        _save_processed(processed)

    events = fetch_espn_scoreboard(info[0])
    for event in events:
        parsed = parse_espn_match(event)
        if not parsed:
            continue
        if _match_teams(parsed["home_name"], info[2]):
            process_game(fixture_id, parsed)
            return

    print(f"Jogo nao encontrado na ESPN para {info[0]}.")


# -- CLI ----------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description="Coleta automatica pos-jogo (Copa 2026)")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p_check = sub.add_parser("check", help="Verifica e processa jogos acabados")
    p_check.add_argument("--dry", action="store_true", help="Simula sem gravar")

    sub.add_parser("status", help="Mostra status de todos os jogos")

    p_force = sub.add_parser("force", help="Forca reprocessamento de um jogo")
    p_force.add_argument("fixture_id", type=int, help="ID do fixture")

    args = ap.parse_args()

    if args.cmd == "check":
        result = check_and_process(dry=args.dry)
        print(f"\n=== Resumo: {result['processed']} jogo(s) processado(s) ===")
    elif args.cmd == "status":
        show_status()
    elif args.cmd == "force":
        force_process(args.fixture_id)


if __name__ == "__main__":
    main()
