"""
bet_math_v3_discipline.py
==================================================================
MOTOR v3 (não destrutivo). Tudo do motor v2 continua de pé — este
arquivo apenas:

  (1) carrega features de DISCIPLINA + ÁRBITRO + RESULTADO FIFA via
      referee_discipline_features.py;
  (2) aplica AJUSTES CONSERVADORES nos λ (xG) do motor v2;
  (3) adiciona NOVOS mercados derivados: cartões totais, vermelho
      no jogo, pênalti no jogo;
  (4) emite saída explicável (antes/depois, diff em pontos
      percentuais, data_quality_flags).

Pesos finais para os ajustes em λ (conservadores, pré-backtest):
  • força/time/forma/odds/preditivo (motor v2): 80% (default)
  • disciplina das equipes         :  8%
  • rigor do árbitro               :  6%
  • interação árbitro × disciplina :  6%

Os ajustes em λ são limitados a ±5% no total. O motor v2 continua
sendo a fonte primária. Os scores entram para temperar Over/Under,
cartões e risco de pênalti — não para virar o favorito 1X2.

CLI:
  python bet_math_v3_discipline.py adjust  --fixture 6
  python bet_math_v3_discipline.py report                  # 7 jogos confirmados
  python bet_math_v3_discipline.py enrich-dashboard        # gera dashboard_data_v3.js
  python bet_math_v3_discipline.py validate                # smoke test
"""

import argparse
import json
import math
import os
import sys
from typing import Any, Dict, List, Optional

# Mesmo diretório
HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import bet_math as v2                              # noqa: E402
import referee_discipline_features as feat         # noqa: E402


# --------------------------------------------------------------------------- #
# Pesos finais (conservadores) — ajustar SÓ depois de backtest
# --------------------------------------------------------------------------- #
W_BASELINE   = 0.80     # motor v2
W_TEAM_DISC  = 0.08     # disciplina das equipes
W_REFEREE    = 0.06     # rigor do árbitro
W_INTERACT   = 0.06     # interação árbitro × disciplina

# Teto de ajuste relativo no λ (xG) por todos os efeitos somados
LAMBDA_MAX_ADJ = 0.05   # ±5%

# Bases (mesmas usadas em referee_discipline_features) para razões diretas
REF_YEL_BASE = 3.50   # cartões amarelos/jogo médio em Copa
REF_RED_BASE = 0.30   # vermelhos/jogo médio em Copa (WC2022: 19/64 = 0.30)
REF_PEN_BASE = 0.20   # pênaltis/jogo médio em Copa
TEAM_YEL_BASE = 1.80  # amarelos/jogo por seleção
TEAM_RED_BASE = 0.10  # vermelhos/jogo por seleção (lado próprio)

# Shrinkage Bayesiano: número de "jogos virtuais" do prior. Para árbitros
# com poucos jogos apitados, puxa o estimador para o baseline da Copa.
# Ex: Tello com 3 jogos e 0 pênaltis → shrunk = (3*0 + 8*0.20)/(3+8) = 0.145
#     Vincic com 2 jogos e 1 pênalti  → shrunk = (2*0.5 + 8*0.20)/(2+8) = 0.26
N_PRIOR_REFEREE = 8
N_PRIOR_TEAM    = 6

# Piso mínimo absoluto em qualquer probabilidade calculada para mercados
# de eventos raros (vermelho, pênalti). 0% nunca é honesto.
P_FLOOR = 0.01


def _exp_cdf(lam: float) -> float:
    """P(pelo menos 1 evento em um λ Poisson)."""
    return max(0.0, min(1.0, 1.0 - math.exp(-max(0.0, lam))))


def _safe(x: Optional[float], default: float = 0.0) -> float:
    return float(x) if x is not None else default


def _shrink(observed: Optional[float], n_matches: int,
            prior: float, n_prior: int) -> float:
    """Shrinkage Bayesiano: combina taxa observada (com peso n_matches)
    com prior (com peso n_prior). Devolve o estimador 'puxado' para o prior
    quando a amostra é pequena.
        shrunk = (n*obs + n_prior*prior) / (n + n_prior)
    """
    obs = _safe(observed, prior)
    n = max(0, n_matches)
    return (n * obs + n_prior * prior) / (n + n_prior)


# --------------------------------------------------------------------------- #
# Núcleo: ajustar λ com base no bloco de disciplina
# --------------------------------------------------------------------------- #
def adjust_lambdas(hx: float, ax: float, block: Dict[str, Any]) -> Dict[str, Any]:
    """Aplica AJUSTES CONSERVADORES em (home_xg, away_xg) com base no bloco
    de disciplina+árbitro. Devolve {hx_v3, ax_v3, deltas, explanation}.

    Regras:
      • Rigor alto do árbitro (strictness > 0.5) → tendência a -gols
        (mais paradas; ritmo cortado). Factor: −0.05 × (strictness − 0.5)
        no λ total — distribuído proporcionalmente entre home/away.
      • Penalty risk alto → +gols (pênaltis viram gol). Factor:
        +0.06 × penalty_risk (0..1) no λ total.
      • Disciplina alta de uma equipe (mais cartões/faltas) → reduz λ
        próprio em −0.03 × team_discipline_score (mais paradas dela).
      • Tudo capado em ±LAMBDA_MAX_ADJ (5%).
    """
    ref = block.get("referee", {})
    hd = block.get("home_discipline", {}) or {}
    aw = block.get("away_discipline", {}) or {}
    inter = block.get("interaction", {}) or {}

    strictness   = ref.get("referee_strictness_score")
    penalty_risk = inter.get("penalty_risk")
    home_disc    = hd.get("discipline_score")
    away_disc    = aw.get("discipline_score")

    # Cada efeito é centrado em 0 (sem impacto) e capado individualmente
    def _eff_ref():
        if strictness is None:
            return 0.0
        # -0.05 quando strictness=1.0, +0.025 quando strictness=0.0
        return -0.05 * (strictness - 0.5)

    def _eff_pen():
        if penalty_risk is None:
            return 0.0
        return +0.06 * penalty_risk            # 0 ... +0.06

    def _eff_home_disc():
        if home_disc is None:
            return 0.0
        return -0.03 * (home_disc - 0.5)       # ±0.015

    def _eff_away_disc():
        if away_disc is None:
            return 0.0
        return -0.03 * (away_disc - 0.5)

    # λ total (simétrico): ref, pen, e interação afetam os dois lados
    common = _eff_ref() + _eff_pen()
    common *= 1.0  # já pesados nas constantes
    common = max(-LAMBDA_MAX_ADJ, min(LAMBDA_MAX_ADJ, common))

    # Ajustes específicos por lado (disciplina daquele time)
    h_specific = max(-LAMBDA_MAX_ADJ, min(LAMBDA_MAX_ADJ, _eff_home_disc()))
    a_specific = max(-LAMBDA_MAX_ADJ, min(LAMBDA_MAX_ADJ, _eff_away_disc()))

    hx_v3 = hx * (1.0 + common + h_specific)
    ax_v3 = ax * (1.0 + common + a_specific)

    return {
        "hx_baseline": round(hx, 4),
        "ax_baseline": round(ax, 4),
        "hx_v3":       round(hx_v3, 4),
        "ax_v3":       round(ax_v3, 4),
        "delta_total_lambda_pct": round(((hx_v3 + ax_v3) / (hx + ax) - 1.0) * 100, 2),
        "components_pct": {
            "referee_strictness": round(_eff_ref() * 100, 2),
            "penalty_risk":       round(_eff_pen() * 100, 2),
            "home_discipline":    round(_eff_home_disc() * 100, 2),
            "away_discipline":    round(_eff_away_disc() * 100, 2),
        },
        "note": ("ajuste relativo capado em ±%.0f%%. Sem disciplina v3 só usa motor v2."
                 % (LAMBDA_MAX_ADJ * 100)),
    }


# --------------------------------------------------------------------------- #
# Novos mercados (não existiam no v2)
# --------------------------------------------------------------------------- #
def derived_card_markets(block: Dict[str, Any]) -> Dict[str, Any]:
    """Cartões e eventos disciplinares — mercados novos do v3.

    Cartões esperados no jogo = (home_yel + away_yel) × referee_factor
    P(pelo menos 1 vermelho) = 1 - exp(-λ_red)
    P(pelo menos 1 pênalti)  = 1 - exp(-λ_pen)

    NOVO (2026-06-11): aplica SHRINKAGE BAYESIANO. Para cada taxa do
    árbitro/equipe combinamos a observação com um prior de Copa do Mundo
    com peso N_PRIOR_REFEREE / N_PRIOR_TEAM. Isso evita o problema da
    amostra pequena: Tello com 3 jogos e 0 pênaltis NÃO significa que
    ele dá 0 pênaltis. Significa que é abaixo da média, mas o baseline
    da Copa puxa o estimador para ~14%.
    """
    ref = block.get("referee", {})
    hd  = block.get("home_discipline", {}) or {}
    aw  = block.get("away_discipline", {}) or {}

    n_ref = int(_safe(ref.get("matches_refereed"), 0))
    ref_yel_raw = (ref.get("raw") or {}).get("yellow_per_match")
    ref_red_raw = (ref.get("raw") or {}).get("red_per_match")
    ref_pen_raw = (ref.get("raw") or {}).get("penalty_per_match")

    # Shrinkage do árbitro
    ref_yel = _shrink(ref_yel_raw, n_ref, REF_YEL_BASE, N_PRIOR_REFEREE)
    ref_red = _shrink(ref_red_raw, n_ref, REF_RED_BASE, N_PRIOR_REFEREE)
    ref_pen = _shrink(ref_pen_raw, n_ref, REF_PEN_BASE, N_PRIOR_REFEREE)

    # Shrinkage por seleção (n_prior menor — times mudam menos rápido)
    # n_matches do time não vem direto; usar 6 como proxy (WC2022 grupos+1)
    n_team = 6
    h_yel = _shrink(hd.get("yellow_per_match_combined"), n_team,
                    TEAM_YEL_BASE, N_PRIOR_TEAM)
    a_yel = _shrink(aw.get("yellow_per_match_combined"), n_team,
                    TEAM_YEL_BASE, N_PRIOR_TEAM)
    h_red = _shrink(hd.get("red_per_match_combined"), n_team,
                    TEAM_RED_BASE, N_PRIOR_TEAM)
    a_red = _shrink(aw.get("red_per_match_combined"), n_team,
                    TEAM_RED_BASE, N_PRIOR_TEAM)

    # Cartões: combina equipes + ajuste do árbitro (centrado no baseline)
    ref_yel_factor = ref_yel / REF_YEL_BASE          # tipico 0.5 ... 1.6
    expected_total_cards = (h_yel + a_yel) * ref_yel_factor

    # Vermelho: λ_red baseline (WC2022) + ajuste pelo perfil do árbitro
    # Baseline empírico de Copa: ~0.30 vermelhos/jogo total no torneio.
    # λ_red = baseline_match × (ref_red_factor × team_red_factor)
    ref_red_factor = ref_red / REF_RED_BASE          # ~ 0.4 ... 2.0
    team_red_factor = (h_red + a_red) / (2 * TEAM_RED_BASE)  # ~ 0.5 ... 2.0
    # combinar geometricamente p/ suavizar e usar baseline como ancora
    combo_red_factor = math.sqrt(max(0.05, ref_red_factor * team_red_factor))
    lam_red = REF_RED_BASE * combo_red_factor
    p_red_in_match = max(P_FLOOR, _exp_cdf(lam_red))

    # Pênalti: rate do árbitro × propensão (faltas recebidas das equipes)
    fr_avg = (_safe(hd.get("fouls_received_score"), 0.5) +
              _safe(aw.get("fouls_received_score"), 0.5)) / 2.0
    # fr_avg ∈ [0,1]; usar como multiplicador suave (0.7 ... 1.3)
    fr_multiplier = 0.7 + 0.6 * fr_avg
    lam_pen = ref_pen * fr_multiplier
    p_pen_in_match = max(P_FLOOR, _exp_cdf(lam_pen))

    # Confidence agregado
    confs = [ref.get("confidence", "low"),
             hd.get("confidence", "low"), aw.get("confidence", "low")]
    rank = {"high": 3, "medium": 2, "low": 1}
    avg = sum(rank.get(c, 1) for c in confs) / 3.0
    overall_conf = "high" if avg >= 2.7 else "medium" if avg >= 1.8 else "low"

    return {
        "expected_total_yellow_cards": round(expected_total_cards, 2),
        "lambda_red_card":             round(lam_red, 4),
        "prob_red_card_in_match_pct":  round(p_red_in_match * 100, 1),
        "lambda_penalty":              round(lam_pen, 4),
        "prob_penalty_in_match_pct":   round(p_pen_in_match * 100, 1),
        "confidence":                  overall_conf,
        "shrinkage_used": {
            "n_prior_referee":   N_PRIOR_REFEREE,
            "n_prior_team":      N_PRIOR_TEAM,
            "wc_baseline_red":   REF_RED_BASE,
            "wc_baseline_pen":   REF_PEN_BASE,
            "p_floor_pct":       P_FLOOR * 100,
            "ref_red_shrunk":    round(ref_red, 4),
            "ref_pen_shrunk":    round(ref_pen, 4),
            "note": ("Taxas do arbitro suavizadas pelo baseline de Copa "
                     "do Mundo (Bayes shrinkage). Piso minimo de 1% em "
                     "P(red) e P(penalti)."),
        },
        "ranges": {
            "yellow_cards":   "media de Copa ~6; >9 incomum",
            "red_card_prob":  "media de Copa ~26%; <10% arbitro/equipe muito limpos",
            "penalty_prob":   "media de Copa ~18%; >30% indica risco alto",
        },
    }


# --------------------------------------------------------------------------- #
# Pipeline por fixture
# --------------------------------------------------------------------------- #
_MAIN_XG_CACHE = None


def _load_main_engine_xg() -> Dict[str, Dict[str, float]]:
    """Lê o dashboard_data.js do motor PRINCIPAL e devolve um mapa
    norm(match) -> {hx, ax} com o xG JÁ CALIBRADO pelo mercado.

    Reconciliação: o v3 deve partir do MESMO xG calibrado do motor v2,
    senão os dois discordam de quem é o favorito (era o bug do Holanda x
    Japão). Aqui garantimos que o baseline do v3 = saída do motor v2."""
    global _MAIN_XG_CACHE
    if _MAIN_XG_CACHE is not None:
        return _MAIN_XG_CACHE
    _MAIN_XG_CACHE = {}
    candidates = list(getattr(v2, "DASHBOARD_DIRS", []))
    dep = getattr(v2, "DEPLOY_DIR", "")
    if dep:
        candidates.append(os.path.join(dep, "dashboard_data.js"))
    import re as _re
    for path in candidates:
        if not path or not os.path.isfile(path):
            continue
        try:
            txt = open(path, encoding="utf-8").read()
            data = json.loads(_re.search(r"=\s*(\{.*\})\s*;", txt, _re.S).group(1))
            for g in data.get("games", []):
                mx = g.get("model_xg") or {}
                if g.get("match") and mx.get("home") is not None:
                    _MAIN_XG_CACHE[v2._norm(g["match"])] = {
                        "hx": float(mx["home"]), "ax": float(mx["away"])}
            if _MAIN_XG_CACHE:
                break
        except Exception:
            continue
    return _MAIN_XG_CACHE


def score_fixture(fixture_id: int) -> Dict[str, Any]:
    """Roda o pipeline completo v3 para uma fixture:
       (1) carrega features de disciplina
       (2) tenta achar o λ baseline via banco do motor v2
       (3) aplica ajustes
       (4) calcula novos mercados de cartões/pênaltis
       (5) anexa resultado FIFA (placar/status)"""
    frow = feat.load_fixture_features(fixture_id=fixture_id)
    if not frow:
        return {"error": "fixture não encontrada", "fixture_id": fixture_id}

    block = feat.score_fixture(frow)

    # ----- baseline λ do motor v2 (Poisson scoreline) -----
    db_dir = v2.resolve_db()
    db = v2.load_history_db(db_dir) if db_dir else None
    ratings = v2.fit_team_ratings(db) if db else {}
    wc_L, _ = v2.wc_regime_L(db) if db else (None, 0)
    wc_scale = min(max(wc_L / ratings["L"], 0.85), 1.05) \
        if (ratings and wc_L) else 1.0

    home_en, away_en = frow["home_team"], frow["away_team"]
    baseline = None
    if ratings and home_en in ratings["attack"] and away_en in ratings["attack"]:
        L = ratings["L"]
        hx = min(max(L * ratings["attack"][home_en]
                     * ratings["defense"][away_en] * wc_scale,
                     v2._XG_MIN), v2._XG_MAX)
        ax = min(max(L * ratings["attack"][away_en]
                     * ratings["defense"][home_en] * wc_scale,
                     v2._XG_MIN), v2._XG_MAX)
        # --- RECONCILIAÇÃO: usar o xG calibrado do motor principal quando houver ---
        # Sem isto, o v3 usa xG cru e pode discordar do favorito do v2 (bug Holanda x Japão).
        main_xg = _load_main_engine_xg().get(v2._norm(block.get("event_name", "")))
        if main_xg:
            hx, ax = main_xg["hx"], main_xg["ax"]
        mat_b = v2.scoreline_matrix(hx, ax)
        m_b = v2.markets_from_matrix(mat_b)
        baseline = {"hx": round(hx, 4), "ax": round(ax, 4), "markets": m_b}
    else:
        return {
            "error": "sem rating baseline para este par (fora do histórico)",
            "fixture_id": fixture_id, "home_team": home_en, "away_team": away_en,
            "discipline_block": block,
        }

    # ----- ajustar λ -----
    adj = adjust_lambdas(baseline["hx"], baseline["ax"], block)
    mat_v3 = v2.scoreline_matrix(adj["hx_v3"], adj["ax_v3"])
    m_v3 = v2.markets_from_matrix(mat_v3)

    # ----- diffs explicáveis -----
    def _diff(market_baseline, market_v3, keys, label):
        out = []
        for k in keys:
            bv = market_baseline.get(k)
            v3v = market_v3.get(k)
            if isinstance(bv, dict) and isinstance(v3v, dict):
                for sub in bv.keys():
                    if isinstance(bv[sub], (int, float)) and sub in v3v:
                        d = (v3v[sub] - bv[sub]) * 100
                        if abs(d) >= 0.05:
                            out.append({"market": f"{label}.{k}.{sub}",
                                        "baseline_pct": round(bv[sub] * 100, 1),
                                        "v3_pct":       round(v3v[sub] * 100, 1),
                                        "delta_pts":    round(d, 2)})
            elif isinstance(bv, (int, float)) and isinstance(v3v, (int, float)):
                d = (v3v - bv) * 100
                if abs(d) >= 0.05:
                    out.append({"market": f"{label}.{k}",
                                "baseline_pct": round(bv * 100, 1),
                                "v3_pct":       round(v3v * 100, 1),
                                "delta_pts":    round(d, 2)})
        return out

    diffs = []
    diffs += _diff(baseline["markets"], m_v3, ["1x2", "btts"], "main")
    # over/under detalhado
    for line in ("1.5", "2.5", "3.5"):
        b = baseline["markets"]["over_under"].get(line)
        v = m_v3["over_under"].get(line)
        if b and v:
            for side in ("over", "under"):
                d = (v[side] - b[side]) * 100
                if abs(d) >= 0.05:
                    diffs.append({"market": f"OU.{line}.{side}",
                                  "baseline_pct": round(b[side] * 100, 1),
                                  "v3_pct":       round(v[side] * 100, 1),
                                  "delta_pts":    round(d, 2)})

    # ----- novos mercados -----
    card_block = derived_card_markets(block)

    return {
        "fixture_id":      block.get("fixture_id"),
        "event_name":      block.get("event_name"),
        "home_team":       block.get("home_team"),
        "away_team":       block.get("away_team"),
        "referee":         block.get("referee"),
        "fifa_result":     block.get("fifa_result"),
        "baseline_v2": {
            "hx": baseline["hx"], "ax": baseline["ax"],
            "1x2_pct": {k: round(v * 100, 1)
                        for k, v in baseline["markets"]["1x2"].items()},
            "over_2_5_pct": round(baseline["markets"]["over_under"]["2.5"]["over"] * 100, 1),
            "btts_yes_pct": round(baseline["markets"]["btts"]["yes"] * 100, 1),
        },
        "v3_adjustment":   adj,
        "v3_markets": {
            "1x2_pct": {k: round(v * 100, 1) for k, v in m_v3["1x2"].items()},
            "over_2_5_pct": round(m_v3["over_under"]["2.5"]["over"] * 100, 1),
            "btts_yes_pct": round(m_v3["btts"]["yes"] * 100, 1),
        },
        "v3_diffs": diffs,
        "new_discipline_markets": card_block,
        "discipline_block":       block,
        "weights_used": {
            "baseline": W_BASELINE, "team_discipline": W_TEAM_DISC,
            "referee": W_REFEREE, "referee_x_discipline": W_INTERACT,
            "lambda_cap_pct": LAMBDA_MAX_ADJ * 100,
        },
        "_note": ("v3 ajusta levemente Over/Under e adiciona mercados novos. "
                  "Nunca derruba o favorito 1X2 do motor v2."),
    }


# --------------------------------------------------------------------------- #
# Relatório dos 7 jogos confirmados
# --------------------------------------------------------------------------- #
def _all_fixture_ids() -> list:
    """Load all fixture IDs from the CSV database dynamically."""
    try:
        import wc_config as cfg
        sched = cfg.load_schedule()
        if sched:
            return sorted(sched.keys())
    except Exception:
        pass
    db_dir = v2.resolve_db()
    if db_dir:
        import csv as _csv
        p = os.path.join(db_dir, "fixtures_primeira_fase_lottu.csv")
        if os.path.isfile(p):
            with open(p, "r", encoding="utf-8-sig") as f:
                return sorted(int(r["fixture_id"]) for r in _csv.DictReader(f))
    return list(range(1, 73))


def report_confirmed() -> Dict[str, Any]:
    out = []
    for fid in _all_fixture_ids():
        r = score_fixture(fid)
        if "error" not in r:
            out.append(r)
    return {"n": len(out), "fixtures": out, "weights": {
        "baseline": W_BASELINE, "team_discipline": W_TEAM_DISC,
        "referee": W_REFEREE, "referee_x_discipline": W_INTERACT,
        "lambda_cap_pct": LAMBDA_MAX_ADJ * 100,
    }}


# --------------------------------------------------------------------------- #
# Geração do dashboard_data_v3.js (NÃO sobrescreve o v2)
# --------------------------------------------------------------------------- #
def enrich_dashboard() -> Dict[str, Any]:
    """Escreve um dashboard_data_v3.js IRMÃO do v2 nas duas pastas (PAINEL
    de APOSTAS e public/worldcup26). O front-end pode optar por consumir."""
    report = report_confirmed()
    targets = []
    for d in v2.DASHBOARD_DIRS:
        if os.path.isdir(os.path.dirname(d)):
            targets.append(d)
    if not targets:
        targets = [v2.DASHBOARD_DIRS[0]]
    if os.path.isdir(getattr(v2, "DEPLOY_DIR", "")):
        targets.append(v2.DEPLOY_DIR)
    written = []
    payload = {"v3_discipline": True, **report}
    body = "window.WC_DATA_V3 = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    for d in targets:
        os.makedirs(d, exist_ok=True)
        p = os.path.join(d, "dashboard_data_v3.js")
        with open(p, "w", encoding="utf-8") as f:
            f.write(body)
        written.append(p)
    return {"written": written, "n_fixtures": report["n"]}


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def _cmd_adjust(args):
    print(json.dumps(score_fixture(args.fixture), indent=2, ensure_ascii=False))


def _cmd_report(_args):
    rep = report_confirmed()
    print(json.dumps(rep, indent=2, ensure_ascii=False))


def _cmd_enrich(_args):
    print(json.dumps(enrich_dashboard(), indent=2, ensure_ascii=False))


def _cmd_validate(_args):
    """Smoke test: tenta resolver banco, gerar features de 1 jogo, ajustar λ."""
    diag = {"db_path": feat.DB_PATH, "v2_db_dir": v2.resolve_db()}
    one = score_fixture(6)
    diag["fixture_6_ok"] = "error" not in one
    diag["fixture_6_event"] = one.get("event_name")
    diag["fixture_6_delta_pct"] = one.get("v3_adjustment", {}).get("delta_total_lambda_pct")
    print(json.dumps(diag, indent=2, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser(
        description="Motor JD-BET v3: ajustes de DISCIPLINA + ÁRBITRO + RESULTADO FIFA.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("adjust", help="features + ajuste + diffs para 1 fixture")
    p.add_argument("--fixture", type=int, required=True)
    p.set_defaults(func=_cmd_adjust)
    sub.add_parser("report", help="relatório dos 7 jogos confirmados") \
        .set_defaults(func=_cmd_report)
    sub.add_parser("enrich-dashboard",
                   help="gera dashboard_data_v3.js (não sobrescreve v2)") \
        .set_defaults(func=_cmd_enrich)
    sub.add_parser("validate", help="smoke test").set_defaults(func=_cmd_validate)
    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
