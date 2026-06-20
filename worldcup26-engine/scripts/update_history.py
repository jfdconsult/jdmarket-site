"""
update_history.py — registra automaticamente acerto/erro do modelo
================================================================

Para cada jogo COM PLACAR FINAL no v3 (fifa_result.status='full_time'):
  • compara a previsão do modelo (baseline_v2.1x2_pct) com o resultado real
  • registra no arquivo persistente predictions_log.json
  • gera dashboard_history.js com window.WC_HISTORY na estrutura compativel
    com o painel + bloco novo "model_track_record" para a aba Histórico

Persistência: predictions_log.json (NÃO sobrescreve entradas existentes;
faz upsert por fixture_id).

Saídas (3 destinos):
  • PAINEL DE APOSTAS\\dashboard_history.js
  • C:\\dev\\jdmarket-site\\public\\worldcup26\\dashboard_history.js
  • <skill>\\scripts\\predictions_log.json (estado canonico)

CLI:
  python update_history.py refresh    # roda v3 + atualiza log + escreve js
  python update_history.py show       # mostra o log atual em JSON
"""

import argparse
import json
import os
import sys
from typing import Any, Dict, List, Optional

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import bet_math_v3_discipline as v3   # noqa: E402
import bet_math as v2                 # noqa: E402
from datetime import datetime as _dt  # noqa: E402
try:
    import wc_config as _cfg          # noqa: E402
except Exception:
    _cfg = None

LOG_PATH = os.path.join(HERE, "predictions_log.json")


def _is_future_fixture(fid: str) -> bool:
    """True se a data AGENDADA do jogo ainda é futura — guarda anti-fantasma
    (o fetch FIFA às vezes marca jogo futuro como full_time, ex.: fx59 Turquia x EUA
    agendado p/ 25/06). Nunca registramos resultado de jogo que ainda não aconteceu."""
    if not _cfg or not str(fid).isdigit():
        return False
    try:
        info = _cfg.load_schedule().get(int(fid))
        if not info:
            return False
        sched = _dt.strptime(f"{info[0]} {info[1]}", "%Y-%m-%d %H:%M")
        return sched > _dt.now()
    except Exception:
        return False

# Destinos para gravar o dashboard_history.js
DASHBOARD_DIRS = list(getattr(v2, "DASHBOARD_DIRS", []))
DEPLOY_DIR = getattr(v2, "DEPLOY_DIR", "")


def _load_log() -> Dict[str, Dict[str, Any]]:
    if not os.path.exists(LOG_PATH):
        return {}
    try:
        with open(LOG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def _save_log(log: Dict[str, Dict[str, Any]]) -> None:
    with open(LOG_PATH, "w", encoding="utf-8") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)


def _outcome_from_score(hs: float, as_: float) -> str:
    if hs > as_:
        return "home"
    if hs < as_:
        return "away"
    return "draw"


def _model_favorite(pct_dict: Dict[str, float]) -> Optional[Dict[str, Any]]:
    if not pct_dict:
        return None
    items = sorted(pct_dict.items(), key=lambda kv: kv[1], reverse=True)
    label, pct = items[0]
    return {"label": label, "pct": pct}


def _load_v2_games() -> Dict[str, Dict]:
    """Carrega jogos do dashboard_data.js (v2) para capturar market + prediction."""
    v2_games = {}
    for d in list(DASHBOARD_DIRS) + ([DEPLOY_DIR] if DEPLOY_DIR else []):
        p = os.path.join(d, "dashboard_data.js") if os.path.isdir(d) else ""
        if not os.path.isfile(p):
            continue
        try:
            with open(p, "r", encoding="utf-8") as fh:
                raw = fh.read()
            start = raw.index("{")
            data = json.loads(raw[start:].rstrip().rstrip(";"))
            for g in data.get("games", []):
                key = (g.get("match") or "").strip()
                if key:
                    v2_games[key] = g
            if v2_games:
                break
        except Exception:
            continue
    return v2_games


def _match_v2_game(home: str, away: str, v2_games: Dict[str, Dict]) -> Optional[Dict]:
    """Encontra jogo v2 pelo nome (tolera acentos/tradução)."""
    import unicodedata
    def norm(s):
        return unicodedata.normalize("NFD", s.lower()).encode("ascii", "ignore").decode()
    hn, an = norm(home), norm(away)
    for key, g in v2_games.items():
        kn = norm(key)
        if hn[:4] in kn or an[:4] in kn:
            return g
        h2 = norm(g.get("home") or "")
        a2 = norm(g.get("away") or "")
        if hn[:4] in h2 or an[:4] in a2:
            return g
    return None


def refresh_log() -> Dict[str, Any]:
    """Roda v3, descobre jogos finalizados e atualiza o log."""
    report = v3.report_confirmed()
    log = _load_log()
    added = []
    updated = []
    v2_games = _load_v2_games()

    for f in report.get("fixtures", []):
        if "error" in f:
            continue
        fid = str(f.get("fixture_id") or "")
        fifa = f.get("fifa_result") or {}
        status = fifa.get("status") or ""
        if status not in ("full_time", "finished"):
            continue
        if _is_future_fixture(fid):       # guarda anti-fantasma (jogo ainda não ocorreu)
            continue
        hs = fifa.get("home_score")
        as_ = fifa.get("away_score")
        if hs is None or as_ is None:
            continue
        try:
            hs = int(round(float(hs)))
            as_ = int(round(float(as_)))
        except Exception:
            continue
        actual = _outcome_from_score(hs, as_)
        baseline = f.get("baseline_v2") or {}
        m1x2 = baseline.get("1x2_pct") or {}
        v3m = f.get("v3_markets") or {}
        v3_1x2 = v3m.get("1x2_pct") or {}
        nm = f.get("new_discipline_markets") or {}
        model = _model_favorite(m1x2)
        v3_model = _model_favorite(v3_1x2)
        entry = {
            "fixture_id":         fid,
            "event_name":         f.get("event_name"),
            "home_team":          f.get("home_team"),
            "away_team":          f.get("away_team"),
            "kickoff":            fifa.get("kickoff"),
            "referee":            fifa.get("referee"),
            "score":              f"{hs}-{as_}",
            "home_score":         hs,
            "away_score":         as_,
            "actual_outcome":     actual,
            "model_v2_1x2_pct":   m1x2,
            "model_v2_predicted": model["label"] if model else None,
            "model_v2_pct":       model["pct"] if model else None,
            "model_v2_hit":       (model is not None) and (model["label"] == actual),
            "model_v3_1x2_pct":   v3_1x2,
            "model_v3_predicted": v3_model["label"] if v3_model else None,
            "model_v3_pct":       v3_model["pct"] if v3_model else None,
            "model_v3_hit":       (v3_model is not None) and (v3_model["label"] == actual),
            "v3_predictions": {
                "over_2_5_pct":       v3m.get("over_2_5_pct"),
                "btts_yes_pct":       v3m.get("btts_yes_pct"),
                "expected_yellows":   nm.get("expected_total_yellow_cards"),
                "p_red_pct":          nm.get("prob_red_card_in_match_pct"),
                "p_penalty_pct":      nm.get("prob_penalty_in_match_pct"),
            },
            "over_2_5_hit":   ((hs + as_) > 2) if v3m.get("over_2_5_pct") is not None and v3m.get("over_2_5_pct") >= 50 else
                              ((hs + as_) <= 2) if v3m.get("over_2_5_pct") is not None else None,
            "btts_hit":       ((hs > 0 and as_ > 0)) if v3m.get("btts_yes_pct") is not None and v3m.get("btts_yes_pct") >= 50 else
                              (not (hs > 0 and as_ > 0)) if v3m.get("btts_yes_pct") is not None else None,
            "captured_at":    report.get("weights", {}).get("captured_at"),
        }
        v2g = _match_v2_game(f.get("home_team", ""), f.get("away_team", ""), v2_games)
        if v2g:
            entry["market_1x2_pct"] = v2g.get("market_1x2_pct")
            entry["prediction_1x2_pct"] = v2g.get("prediction_1x2_pct")
            entry["prediction_meta"] = v2g.get("prediction_meta")
            entry["consensus_1x2_pct"] = v2g.get("consensus_1x2_pct")
            entry["v2_date"] = v2g.get("date")
            entry["v2_time"] = v2g.get("time")
        # Árbitro: se o v3 não trouxe, mantém o que já estava no log (pesquisado).
        if not entry.get("referee") and fid in log and log[fid].get("referee"):
            entry["referee"] = log[fid]["referee"]
        if fid in log:
            # update-in-place mas preserva campos que o usuário possa ter
            # acrescentado depois (notas, apostas reais, CLV, árbitro pesquisado)
            preserved = {k: v for k, v in log[fid].items()
                         if k in ("notes", "bet", "stake", "odds_taken",
                                  "closing_odds", "clv_pct", "pnl", "referee",
                                  "actual_xg", "model_xg", "xg_error_home",
                                  "xg_error_away", "actual_yellows", "actual_reds")
                         and (k != "referee" or log[fid].get("referee"))}
            entry.update(preserved)
            if entry != log[fid]:
                updated.append(fid)
        else:
            added.append(fid)
        log[fid] = entry

    _save_log(log)
    write_history_js(log)
    return {
        "n_total":    len(log),
        "n_added":    len(added),
        "n_updated":  len(updated),
        "added":      added,
        "updated":    updated,
        "log_path":   LOG_PATH,
    }


def write_history_js(log: Dict[str, Dict[str, Any]]) -> List[str]:
    """Escreve dashboard_history.js em todos os DASHBOARD_DIRS + DEPLOY_DIR.

    Formato: window.WC_HISTORY (array, compatibilidade) + window.WC_TRACK_RECORD
    (estatistica resumida)."""
    entries = sorted(log.values(),
                     key=lambda e: (e.get("score") or "", e.get("fixture_id") or ""))
    hits_v2 = sum(1 for e in entries if e.get("model_v2_hit"))
    hits_v3 = sum(1 for e in entries if e.get("model_v3_hit"))
    n = len(entries)
    over_seen = [e for e in entries if e.get("over_2_5_hit") is not None]
    btts_seen = [e for e in entries if e.get("btts_hit") is not None]
    over_hits = sum(1 for e in over_seen if e["over_2_5_hit"])
    btts_hits = sum(1 for e in btts_seen if e["btts_hit"])

    summary = {
        "n_games":        n,
        "model_v2_hits":  hits_v2,
        "model_v2_pct":   round(hits_v2 / n * 100, 1) if n else 0,
        "model_v3_hits":  hits_v3,
        "model_v3_pct":   round(hits_v3 / n * 100, 1) if n else 0,
        "over_2_5_hits":  over_hits,
        "over_2_5_seen":  len(over_seen),
        "over_2_5_pct":   round(over_hits / len(over_seen) * 100, 1) if over_seen else None,
        "btts_hits":      btts_hits,
        "btts_seen":      len(btts_seen),
        "btts_pct":       round(btts_hits / len(btts_seen) * 100, 1) if btts_seen else None,
    }

    body = ("window.WC_HISTORY = " + json.dumps([], ensure_ascii=False) + ";\n"
            "window.WC_TRACK_RECORD = " + json.dumps({
                "summary": summary,
                "entries": entries,
            }, ensure_ascii=False, indent=2) + ";\n")

    targets = []
    for d in DASHBOARD_DIRS:
        if os.path.isdir(os.path.dirname(d)):
            targets.append(d)
    if not targets:
        targets = [DASHBOARD_DIRS[0]] if DASHBOARD_DIRS else []
    if DEPLOY_DIR and os.path.isdir(DEPLOY_DIR):
        targets.append(DEPLOY_DIR)
    written = []
    for d in targets:
        os.makedirs(d, exist_ok=True)
        p = os.path.join(d, "dashboard_history.js")
        with open(p, "w", encoding="utf-8") as f:
            f.write(body)
        written.append(p)
    return written


def _cmd_refresh(_args):
    res = refresh_log()
    print(json.dumps(res, indent=2, ensure_ascii=False))


def _cmd_show(_args):
    log = _load_log()
    print(json.dumps(log, indent=2, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser(
        description="Atualiza o histórico de acertos do modelo a partir do v3.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("refresh",
                   help="upsert log + grava dashboard_history.js"
                   ).set_defaults(func=_cmd_refresh)
    sub.add_parser("show", help="mostra log atual").set_defaults(func=_cmd_show)
    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
