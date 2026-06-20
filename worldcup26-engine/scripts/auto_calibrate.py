"""
auto_calibrate.py — Calibração contínua do rho (Dixon-Coles)
=============================================================
Roda no pipeline diário. Reajusta sozinho o parâmetro de empate (rho) à medida
que a Copa avança, usando SHRINKAGE BAYESIANO:

    alvo_empate = (K * base_historica + N * observado_na_copa) / (K + N)

- base_historica = 25% (taxa de empate em 960 jogos das seleções; estável).
- observado = empates / jogos já disputados (predictions_log.json).
- K = força do prior (120 "jogos virtuais"). Com K alto, NÃO perseguimos a
  anomalia de empate desta Copa cedo; conforme N cresce, damos mais peso ao
  que está acontecendo de verdade. Doutrina: shrinkage (mesma do módulo de
  disciplina) — proteção contra ruído de amostra pequena.

Depois de achar o alvo, faz um grid no rho e escolhe o que põe a taxa estrutural
de empate do modelo (sobre os jogos já disputados) mais perto do alvo. Grava em
model_calibration.json (lido por bet_math._load_calibrated_rho). Faixa segura
[-0.30, 0.0].

CLI:
  python auto_calibrate.py            # calibra e grava
  python auto_calibrate.py --dry      # mostra o que faria, sem gravar
"""
import json
import os
import re
import sys
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)
import bet_math as v2  # noqa: E402

BASE_DRAW = 0.25       # taxa histórica (960 jogos da base)
PRIOR_K = 120          # força do prior (jogos virtuais) — tunável
RHO_MIN, RHO_MAX = -0.30, 0.0
OUT = os.path.join(HERE, "model_calibration.json")
LOG_PATH = os.path.join(HERE, "predictions_log.json")


def _v3_xg_by_fixture():
    """xG calibrado (baseline_v2) por fixture_id, lido do dashboard_data_v3.js."""
    cands = list(getattr(v2, "DASHBOARD_DIRS", []))
    dep = getattr(v2, "DEPLOY_DIR", "")
    if dep:
        cands.append(os.path.join(dep, "dashboard_data_v3.js"))
    cands = [c.replace("dashboard_data.js", "dashboard_data_v3.js") if c.endswith("dashboard_data.js") else c for c in cands]
    for path in cands:
        d = os.path.join(path, "dashboard_data_v3.js") if os.path.isdir(path) else path
        if os.path.isfile(d) and d.endswith("v3.js"):
            try:
                data = json.loads(re.search(r"=\s*(\{.*\})\s*;", open(d, encoding="utf-8").read(), re.S).group(1))
                out = {}
                for f in data.get("fixtures", []):
                    b = f.get("baseline_v2") or {}
                    if b.get("hx") is not None:
                        out[str(f.get("fixture_id"))] = (b["hx"], b["ax"])
                if out:
                    return out
            except Exception:
                continue
    return {}


def _structural_draw(xgs, rho):
    import statistics
    dr = []
    for hx, ax in xgs:
        p = v2.markets_from_matrix(v2.scoreline_matrix(hx, ax, rho=rho))["1x2"]
        dr.append(p["draw"])
    return statistics.mean(dr) if dr else 0.0


def calibrate(dry=False):
    if not os.path.isfile(LOG_PATH):
        return {"error": "predictions_log.json não encontrado"}
    log = json.load(open(LOG_PATH, encoding="utf-8"))
    played = [g for g in log.values() if g.get("actual_outcome")]
    n = len(played)
    if n < 4:
        return {"skipped": "poucos jogos (<4)", "n": n}
    draws = sum(1 for g in played if g["actual_outcome"] == "draw")
    observed = draws / n
    target = (PRIOR_K * BASE_DRAW + n * observed) / (PRIOR_K + n)

    xg_map = _v3_xg_by_fixture()
    xgs = [xg_map[str(g["fixture_id"])] for g in played if str(g.get("fixture_id")) in xg_map]
    if not xgs:
        return {"error": "sem xG para os jogos disputados (rode enrich-dashboard antes)"}

    # grid no rho -> casa a taxa estrutural de empate com o alvo
    best_rho, best_gap = -0.08, 9.9
    rho = RHO_MIN
    while rho <= RHO_MAX + 1e-9:
        gap = abs(_structural_draw(xgs, rho) - target)
        if gap < best_gap:
            best_gap, best_rho = gap, round(rho, 3)
        rho += 0.005
    best_rho = max(RHO_MIN, min(RHO_MAX, best_rho))

    result = {
        "rho": best_rho,
        "n_games": n,
        "observed_draw_pct": round(observed * 100, 1),
        "base_draw_pct": round(BASE_DRAW * 100, 1),
        "prior_k": PRIOR_K,
        "target_draw_pct": round(target * 100, 1),
        "model_draw_at_rho_pct": round(_structural_draw(xgs, best_rho) * 100, 1),
        "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "note": "shrinkage Bayesiano base+copa; faixa segura [-0.30,0]; nao persegue anomalia.",
    }
    if not dry:
        with open(OUT, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
    return result


if __name__ == "__main__":
    print(json.dumps(calibrate(dry="--dry" in sys.argv), ensure_ascii=False, indent=2))
