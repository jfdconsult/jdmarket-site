"""
post_match_pipeline.py — Rotina pós-jogo completa
===================================================
Acabou o jogo → roda tudo automático:
  1. Registra resultado no predictions_log.json
  2. Atualiza dashboard_data_v3.js (marca full_time)
  3. Recalcula dashboard_history.js
  4. Regenera dashboard_data.js com modelo calibrado
  5. Faz git commit + push para Vercel

CLI:
  python post_match_pipeline.py result --fixture 3 --home-score 1 --away-score 1
  python post_match_pipeline.py result --fixture 3 --home-score 1 --away-score 1 \\
      --goals "Lukic 21;Larin 78" --yellows "Player1 35;Player2 60" --reds "" \\
      --xg-home 1.23 --xg-away 0.96
  python post_match_pipeline.py refresh-all          # recalcula tudo sem novo resultado
  python post_match_pipeline.py full-pipeline        # v2 + v3 + history + push
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import bet_math as v2
import bet_math_v3_discipline as v3
import update_history as hist

LOG_PATH = os.path.join(HERE, "predictions_log.json")
DEPLOY_DIR = v2.DEPLOY_DIR


def _load_log() -> Dict:
    if not os.path.exists(LOG_PATH):
        return {}
    with open(LOG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_log(log: Dict) -> None:
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)


def _parse_events(raw: str) -> List[Dict]:
    if not raw or raw.strip() == "":
        return []
    events = []
    for part in raw.split(";"):
        part = part.strip()
        if not part:
            continue
        tokens = part.rsplit(" ", 1)
        if len(tokens) == 2:
            name, minute = tokens
            events.append({"player": name.strip(), "minute": minute.strip().rstrip("'")})
        else:
            events.append({"player": part, "minute": "?"})
    return events


def register_result(fixture_id: int, home_score: int, away_score: int,
                    goals_str: str = "", yellows_str: str = "", reds_str: str = "",
                    xg_home: Optional[float] = None, xg_away: Optional[float] = None,
                    attendance: Optional[int] = None) -> Dict:
    """Register a match result and update all data files."""
    fid = str(fixture_id)

    # 1. Update predictions_log.json via refresh (picks up v3 data)
    print(f"[1/5] Atualizando predictions_log.json para fixture {fid}...")

    # First, ensure v3 has the result in fifa_result
    # We need to update the v3 data with the score
    report = v3.report_confirmed()
    fixture_data = None
    for f in report.get("fixtures", []):
        if str(f.get("fixture_id")) == fid:
            fixture_data = f
            break

    if not fixture_data:
        return {"error": f"Fixture {fid} not found in v3 data"}

    # Build goals list from string
    goals = []
    if goals_str:
        parts = goals_str.split(";")
        for p in parts:
            p = p.strip()
            if not p:
                continue
            tokens = p.rsplit(" ", 1)
            if len(tokens) == 2:
                scorer, minute = tokens[0].strip(), tokens[1].strip().rstrip("'")
                goals.append({"scorer": scorer, "minute": minute, "team": "?"})
            else:
                goals.append({"scorer": p, "minute": "?", "team": "?"})

    # Build cards list
    cards = []
    if yellows_str:
        for ev in _parse_events(yellows_str):
            cards.append({"player": ev["player"], "minute": ev["minute"], "type": "yellow"})
    if reds_str:
        for ev in _parse_events(reds_str):
            cards.append({"player": ev["player"], "minute": ev["minute"], "type": "red"})

    # Update the v3 fixture with the result
    fifa_result = fixture_data.get("fifa_result", {}) or {}
    fifa_result["status"] = "full_time"
    fifa_result["home_score"] = home_score
    fifa_result["away_score"] = away_score
    if goals:
        fifa_result["goals"] = goals
    if cards:
        fifa_result["cards"] = cards
    if attendance:
        fifa_result["attendance"] = attendance

    # Store actual xG from SofaScore if provided
    actual_xg = {}
    if xg_home is not None:
        actual_xg["home"] = xg_home
    if xg_away is not None:
        actual_xg["away"] = xg_away

    # Update predictions_log with actual data
    log = _load_log()
    outcome = "home" if home_score > away_score else ("away" if away_score > home_score else "draw")

    if fid in log:
        entry = log[fid]
        entry["score"] = f"{home_score}-{away_score}"
        entry["home_score"] = home_score
        entry["away_score"] = away_score
        entry["actual_outcome"] = outcome
        # Recalculate hits
        if entry.get("model_v2_predicted"):
            entry["model_v2_hit"] = entry["model_v2_predicted"] == outcome
        if entry.get("model_v3_predicted"):
            entry["model_v3_hit"] = entry["model_v3_predicted"] == outcome
        v3p = entry.get("v3_predictions", {})
        if v3p.get("over_2_5_pct") is not None:
            total = home_score + away_score
            if v3p["over_2_5_pct"] >= 50:
                entry["over_2_5_hit"] = total > 2
            else:
                entry["over_2_5_hit"] = total <= 2
        if v3p.get("btts_yes_pct") is not None:
            btts_real = home_score > 0 and away_score > 0
            if v3p["btts_yes_pct"] >= 50:
                entry["btts_hit"] = btts_real
            else:
                entry["btts_hit"] = not btts_real
    else:
        # Build new entry from v3 data
        m2 = fixture_data.get("baseline_v2", {})
        m3 = fixture_data.get("v3_markets", {})
        disc = fixture_data.get("new_discipline_markets", {})
        m2_1x2 = m2.get("1x2_pct", {})
        m3_1x2 = m3.get("1x2_pct", {})

        def _fav(pct):
            if not pct:
                return None
            best = max(pct.items(), key=lambda x: x[1])
            return {"label": best[0], "pct": best[1]}

        fav2 = _fav(m2_1x2)
        fav3 = _fav(m3_1x2)
        total = home_score + away_score

        entry = {
            "fixture_id": fid,
            "event_name": fixture_data.get("event_name"),
            "home_team": fixture_data.get("home_team"),
            "away_team": fixture_data.get("away_team"),
            "score": f"{home_score}-{away_score}",
            "home_score": home_score,
            "away_score": away_score,
            "actual_outcome": outcome,
            "model_v2_1x2_pct": m2_1x2,
            "model_v2_predicted": fav2["label"] if fav2 else None,
            "model_v2_pct": fav2["pct"] if fav2 else None,
            "model_v2_hit": fav2["label"] == outcome if fav2 else None,
            "model_v3_1x2_pct": m3_1x2,
            "model_v3_predicted": fav3["label"] if fav3 else None,
            "model_v3_pct": fav3["pct"] if fav3 else None,
            "model_v3_hit": fav3["label"] == outcome if fav3 else None,
            "v3_predictions": {
                "over_2_5_pct": m3.get("over_2_5_pct"),
                "btts_yes_pct": m3.get("btts_yes_pct"),
                "expected_yellows": disc.get("expected_total_yellow_cards"),
                "p_red_pct": disc.get("prob_red_card_in_match_pct"),
                "p_penalty_pct": disc.get("prob_penalty_in_match_pct"),
            },
            "over_2_5_hit": (total > 2) if m3.get("over_2_5_pct") and m3["over_2_5_pct"] >= 50
                            else (total <= 2) if m3.get("over_2_5_pct") else None,
            "btts_hit": (home_score > 0 and away_score > 0) if m3.get("btts_yes_pct") and m3["btts_yes_pct"] >= 50
                        else not (home_score > 0 and away_score > 0) if m3.get("btts_yes_pct") else None,
        }
        log[fid] = entry

    # Add actual xG if provided
    if actual_xg:
        log[fid]["actual_xg"] = actual_xg
        model_xg = {"home": fixture_data.get("baseline_v2", {}).get("hx"),
                     "away": fixture_data.get("baseline_v2", {}).get("ax")}
        log[fid]["model_xg"] = model_xg
        if model_xg.get("home") and actual_xg.get("home"):
            log[fid]["xg_error_home"] = round(actual_xg["home"] - model_xg["home"], 3)
        if model_xg.get("away") and actual_xg.get("away"):
            log[fid]["xg_error_away"] = round(actual_xg["away"] - model_xg["away"], 3)

    # Add actual discipline
    if cards:
        actual_yellows = sum(1 for c in cards if c["type"] == "yellow")
        actual_reds = sum(1 for c in cards if c["type"] == "red")
        log[fid]["actual_yellows"] = actual_yellows
        log[fid]["actual_reds"] = actual_reds

    _save_log(log)
    print(f"   → predictions_log.json atualizado ({len(log)} jogos)")

    # 1b. Recalibra o rho (shrinkage Bayesiano) com o resultado novo, ANTES de
    # regenerar — assim cada jogo encerrado já reajusta o modelo (sempre fresco).
    try:
        import auto_calibrate as _ac
        c = _ac.calibrate()
        if c.get("rho") is not None:
            print(f"   → modelo recalibrado: rho={c['rho']} (alvo empate {c.get('target_draw_pct')}%)")
    except Exception as e:
        print(f"   → AVISO: recalibração pulada ({e})")

    # 2. Regenerate v3 dashboard (will include updated fifa_result)
    print("[2/5] Regenerando dashboard_data_v3.js...")
    v3_result = v3.enrich_dashboard()
    print(f"   → {len(v3_result.get('written', []))} arquivos escritos")

    # Now manually patch the v3 file to ensure the fifa_result is correct
    _patch_v3_fifa_result(fixture_id, fifa_result)

    # 3. Recalculate history
    print("[3/5] Recalculando dashboard_history.js...")
    hist.write_history_js(log)
    print("   → dashboard_history.js atualizado")

    # 4. Regenerate v2 dashboard with calibrated model
    print("[4/5] Regenerando dashboard_data.js (modelo calibrado)...")
    try:
        v2_result = v2.export_dashboard()
        print(f"   → {v2_result.get('written', 'ok')}")
    except Exception as e:
        print(f"   → AVISO: v2 dashboard falhou ({e}), continuando...")

    # 5. Summary
    print("[5/5] Resumo:")
    print(f"   Jogo: {fixture_data.get('event_name')}")
    print(f"   Placar: {home_score}-{away_score} ({outcome})")
    if actual_xg:
        model_hx = fixture_data.get("baseline_v2", {}).get("hx", "?")
        model_ax = fixture_data.get("baseline_v2", {}).get("ax", "?")
        print(f"   xG modelo: {model_hx}/{model_ax} vs real: {actual_xg.get('home','?')}/{actual_xg.get('away','?')}")
    print(f"   1×2 modelo previu: {log[fid].get('model_v3_predicted')} → {'✓' if log[fid].get('model_v3_hit') else '✗'}")

    return {
        "fixture_id": fid,
        "score": f"{home_score}-{away_score}",
        "outcome": outcome,
        "model_hit": log[fid].get("model_v3_hit"),
        "log_entries": len(log),
        "actual_xg": actual_xg or None,
    }


def _patch_v3_fifa_result(fixture_id: int, fifa_result: Dict):
    """Patch the v3 JS file to ensure fifa_result has correct status/scores."""
    targets = []
    for d in v2.DASHBOARD_DIRS:
        p = os.path.join(d, "dashboard_data_v3.js")
        if os.path.isfile(p):
            targets.append(p)
    deploy_p = os.path.join(DEPLOY_DIR, "dashboard_data_v3.js")
    if os.path.isfile(deploy_p):
        targets.append(deploy_p)

    for path in targets:
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
            start = content.index("{")
            data = json.loads(content[start:].rstrip().rstrip(";"))
            for fix in data.get("fixtures", []):
                if str(fix.get("fixture_id")) == str(fixture_id):
                    fix["fifa_result"] = {**fix.get("fifa_result", {}), **fifa_result}
                    break
            body = "window.WC_DATA_V3 = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
            with open(path, "w", encoding="utf-8") as f:
                f.write(body)
        except Exception as e:
            print(f"   AVISO: patch v3 falhou em {path}: {e}")


def full_pipeline(push: bool = True) -> Dict:
    """Run the complete pipeline: v2 + v3 + history + optional git push."""
    results = {}

    print("=== PIPELINE COMPLETO ===")

    # 1. Regenerate v2 (calibrated model)
    print("\n[1/4] dashboard_data.js (modelo calibrado v2)...")
    try:
        r = v2.export_dashboard()
        results["v2"] = r.get("written")
        print(f"   → {r.get('written')}")
    except Exception as e:
        results["v2_error"] = str(e)
        print(f"   → ERRO: {e}")

    # 2. Regenerate v3
    print("\n[2/4] dashboard_data_v3.js...")
    try:
        r = v3.enrich_dashboard()
        results["v3"] = r.get("written")
        print(f"   → {r.get('written')}")
    except Exception as e:
        results["v3_error"] = str(e)
        print(f"   → ERRO: {e}")

    # 3. Regenerate history
    print("\n[3/4] dashboard_history.js...")
    try:
        r = hist.refresh_log()
        results["history"] = r
        print(f"   → {r.get('n_total')} jogos no log")
    except Exception as e:
        results["hist_error"] = str(e)
        print(f"   → ERRO: {e}")

    # 4. Git push
    if push:
        print("\n[4/4] Git commit + push...")
        results["git"] = _git_push()
    else:
        print("\n[4/4] Push desabilitado (--no-push)")
        results["git"] = "skipped"

    print("\n=== PIPELINE COMPLETO ===")
    return results


def _git_push() -> str:
    """Commit and push dashboard files to Vercel."""
    if not os.path.isdir(DEPLOY_DIR):
        return "deploy dir not found"
    try:
        cwd = os.path.dirname(DEPLOY_DIR)  # C:\dev\jdmarket-site
        # Find repo root
        while cwd and not os.path.isdir(os.path.join(cwd, ".git")):
            parent = os.path.dirname(cwd)
            if parent == cwd:
                return "git repo not found"
            cwd = parent

        ts = datetime.now().strftime("%d/%m %H:%M")
        subprocess.run(["git", "add", "public/worldcup26/"], cwd=cwd, check=True,
                        capture_output=True, text=True)
        result = subprocess.run(
            ["git", "commit", "-m", f"WC26 pipeline update {ts}"],
            cwd=cwd, capture_output=True, text=True
        )
        if result.returncode != 0 and "nothing to commit" in result.stdout:
            return "nothing to commit"
        subprocess.run(["git", "push"], cwd=cwd, check=True,
                        capture_output=True, text=True)
        return f"pushed at {ts}"
    except subprocess.CalledProcessError as e:
        return f"git error: {e.stderr or e.stdout}"


def refresh_all() -> Dict:
    """Recalculate everything without registering a new result."""
    return full_pipeline(push=False)


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def main():
    ap = argparse.ArgumentParser(description="Pipeline pós-jogo JD-BET")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("result", help="Registrar resultado + atualizar tudo")
    p.add_argument("--fixture", type=int, required=True, help="ID do jogo")
    p.add_argument("--home-score", type=int, required=True)
    p.add_argument("--away-score", type=int, required=True)
    p.add_argument("--goals", type=str, default="", help="Gols: 'Lukic 21;Larin 78'")
    p.add_argument("--yellows", type=str, default="", help="Amarelos: 'Player1 35;Player2 60'")
    p.add_argument("--reds", type=str, default="", help="Vermelhos: 'Player1 55'")
    p.add_argument("--xg-home", type=float, default=None, help="xG real (SofaScore) home")
    p.add_argument("--xg-away", type=float, default=None, help="xG real (SofaScore) away")
    p.add_argument("--attendance", type=int, default=None, help="Público")
    p.add_argument("--no-push", action="store_true", help="Não fazer git push")

    sub.add_parser("refresh-all", help="Recalcula v2+v3+history sem novo resultado")
    sub.add_parser("full-pipeline", help="Pipeline completo com push")

    args = ap.parse_args()

    if args.cmd == "result":
        result = register_result(
            fixture_id=args.fixture,
            home_score=args.home_score,
            away_score=args.away_score,
            goals_str=args.goals,
            yellows_str=args.yellows,
            reds_str=args.reds,
            xg_home=args.xg_home,
            xg_away=args.xg_away,
            attendance=args.attendance,
        )
        print(json.dumps(result, indent=2, ensure_ascii=False))
        if not args.no_push:
            print("\nFazendo push para Vercel...")
            print(_git_push())
    elif args.cmd == "refresh-all":
        print(json.dumps(refresh_all(), indent=2, ensure_ascii=False))
    elif args.cmd == "full-pipeline":
        print(json.dumps(full_pipeline(), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
