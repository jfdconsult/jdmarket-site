#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
bet_math.py  —  World Cup Bet Intelligence Engine: deterministic calculation core.

This module does the *exact math* so the analyst (Claude) never estimates arithmetic
by hand. The analyst's job is to research and supply judgement inputs (expected goals,
Elo, form, lineup adjustments); this script turns those inputs into probabilities,
fair odds, expected value, Kelly stakes and closing-line-value — reproducibly.

Zero external dependencies (pure standard library) so it always runs on the local
machine. Tested on CPython 3.11+.

Doctrine sources distilled here:
  - Joseph Buchdahl, "Fixed Odds Sports Betting" (margin removal, value, yield, staking)
  - Stanford Wong, "Sharp Sports Betting" (line value, closing line, sharp vs square)
  - Christoph Biermann, "Football Hackers" (expected goals / data-driven match modelling)
  - Marcos Lopez de Prado, "Advances in Financial Machine Learning" (bet sizing discipline)
  - Dixon & Coles (1997) low-score correlation adjustment for football scorelines.

CLI quick reference (run `python bet_math.py -h`):
  devig    convert a market's decimal odds into margin-free "fair" probabilities
  poisson  build a full scoreline model from expected goals -> 1X2/OU/BTTS/AH/scores
  ev       expected value + edge of one bet
  kelly    fractional-Kelly stake with a bankroll cap
  value    compare model probs vs book, output EV/Kelly/recommendation per selection
  clv      closing line value of a taken price vs the closing price
  elo      win/draw/loss probabilities from an Elo rating difference
"""

from __future__ import annotations
import argparse
import csv
import json
import math
import os
import unicodedata
from typing import Dict, List, Optional, Tuple

try:
    from datetime import datetime as _dt
except Exception:                       # pragma: no cover
    _dt = None

# --------------------------------------------------------------------------- #
#  1. ODDS  <->  PROBABILITY  and  MARGIN (OVERROUND) REMOVAL
# --------------------------------------------------------------------------- #

def implied_prob(decimal_odds: float) -> float:
    """Raw implied probability of a single decimal price = 1 / odds."""
    if decimal_odds <= 1.0:
        raise ValueError("Decimal odds must be > 1.0")
    return 1.0 / decimal_odds


def overround(decimal_odds: List[float]) -> float:
    """Bookmaker margin of a market = sum(1/odds) - 1. (a.k.a. 'vig', 'juice')."""
    return sum(1.0 / o for o in decimal_odds) - 1.0


def devig_multiplicative(decimal_odds: List[float]) -> List[float]:
    """
    Basic/proportional margin removal: divide each implied prob by the booksum.
    Fast and standard, but assumes the margin is spread proportionally. Tends to
    overstate favourites slightly (favourite-longshot bias not corrected).
    """
    raw = [1.0 / o for o in decimal_odds]
    s = sum(raw)
    return [r / s for r in raw]


def devig_power(decimal_odds: List[float], tol: float = 1e-9) -> List[float]:
    """
    Power method: find exponent k such that sum(p_i^k) = 1 where p_i are raw
    implied probs. Corrects favourite-longshot bias better than proportional.
    """
    raw = [1.0 / o for o in decimal_odds]
    lo, hi = 0.0001, 10.0
    for _ in range(200):
        k = (lo + hi) / 2.0
        s = sum(p ** k for p in raw)
        if abs(s - 1.0) < tol:
            break
        if s > 1.0:
            lo = k  # need larger k to shrink
        else:
            hi = k
    k = (lo + hi) / 2.0
    fair = [p ** k for p in raw]
    s = sum(fair)
    return [f / s for f in fair]


def devig_shin(decimal_odds: List[float], tol: float = 1e-10) -> List[float]:
    """
    Shin (1992) method: removes margin assuming a proportion z of 'insider' money.
    Widely regarded as the most accurate simple de-vig for 2-3 outcome markets;
    pulls probability away from favourites toward longshots in a principled way.
    """
    raw = [1.0 / o for o in decimal_odds]
    booksum = sum(raw)
    pi = [r / booksum for r in raw]  # normalised starting point

    def fair_given_z(z: float) -> List[float]:
        denom = sum(math.sqrt(z * z + 4.0 * (1.0 - z) * (p * p) / booksum) for p in raw)
        out = []
        for p in raw:
            num = math.sqrt(z * z + 4.0 * (1.0 - z) * (p * p) / booksum) - z
            out.append(num / (2.0 * (1.0 - z)) if z < 1.0 else p / booksum)
        # normalise (numerical safety)
        s = sum(out)
        return [o / s for o in out]

    # Solve for z in [0, 0.4] so that the implied booksum reconstructs; use bisection
    lo, hi = 0.0, 0.4
    for _ in range(200):
        z = (lo + hi) / 2.0
        fair = fair_given_z(z)
        # Shin condition: implied margin recovered. Use derivative-free fit on booksum.
        recon = sum((z / len(raw) + (1.0 - z) * f) for f in fair)  # ~1 by construction
        # Better: match overround via spread of fair vs pi. Use variance heuristic.
        spread = sum(abs(f - p) for f, p in zip(fair, pi))
        target = overround(decimal_odds)
        if abs(spread - target) < tol:
            break
        if spread < target:
            lo = z
        else:
            hi = z
    return fair_given_z((lo + hi) / 2.0)


DEVIG_METHODS = {
    "mult": devig_multiplicative,
    "power": devig_power,
    "shin": devig_shin,
}


def devig(decimal_odds: List[float], method: str = "shin") -> Dict:
    fn = DEVIG_METHODS.get(method, devig_shin)
    fair = fn(decimal_odds)
    return {
        "method": method,
        "overround_pct": round(overround(decimal_odds) * 100, 3),
        "raw_implied": [round(implied_prob(o), 5) for o in decimal_odds],
        "fair_prob": [round(p, 5) for p in fair],
        "fair_odds": [round(1.0 / p, 4) if p > 0 else None for p in fair],
    }


# --------------------------------------------------------------------------- #
#  2. POISSON / DIXON-COLES SCORELINE MODEL
# --------------------------------------------------------------------------- #

def _load_calibrated_rho(default: float = -0.08) -> float:
    """rho do Dixon-Coles vindo da calibração contínua (auto_calibrate.py).
    Se o arquivo não existir ou for inválido, usa o default. Mantido numa
    faixa segura [-0.30, 0.0] para o auto-calibrador nunca explodir o modelo."""
    try:
        p = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                         "model_calibration.json")
        if os.path.isfile(p):
            with open(p, encoding="utf-8") as f:
                r = float(json.load(f).get("rho"))
            if -0.30 <= r <= 0.0:
                return r
    except Exception:
        pass
    return default


_CALIBRATED_RHO = _load_calibrated_rho()


def _poisson_pmf(lam: float, k: int) -> float:
    return math.exp(-lam) * (lam ** k) / math.factorial(k)


def _dc_tau(i: int, j: int, lam: float, mu: float, rho: float) -> float:
    """Dixon-Coles correction for the four low-score cells (0-0,1-0,0-1,1-1)."""
    if i == 0 and j == 0:
        return 1.0 - lam * mu * rho
    if i == 0 and j == 1:
        return 1.0 + lam * rho
    if i == 1 and j == 0:
        return 1.0 + mu * rho
    if i == 1 and j == 1:
        return 1.0 - rho
    return 1.0


def scoreline_matrix(home_xg: float, away_xg: float, rho: float = None,
                     max_goals: int = 10) -> List[List[float]]:
    """
    Probability matrix P[i][j] = P(home scores i, away scores j).
    home_xg / away_xg are the expected goals (lambda) for each side.
    rho is the Dixon-Coles low-score correlation (~ -0.05..-0.15 for football;
    set 0.0 for plain independent Poisson).

    CALIBRAÇÃO CONTÍNUA: rho default = None -> usa _CALIBRATED_RHO, atualizado
    pelo auto_calibrate.py (shrinkage Bayesiano: base histórica 25% + dados da
    Copa, mais peso aos dados conforme N cresce). Histórico: -0.03 -> -0.08 em
    2026-06-16 (modelo subestimava empate vs base de 25%). NÃO persegue a anomalia
    de empate desta Copa; converge à medida que a evidência acumula.
    """
    if rho is None:
        rho = _CALIBRATED_RHO
    m = [[0.0] * (max_goals + 1) for _ in range(max_goals + 1)]
    total = 0.0
    for i in range(max_goals + 1):
        for j in range(max_goals + 1):
            p = (_poisson_pmf(home_xg, i) * _poisson_pmf(away_xg, j)
                 * _dc_tau(i, j, home_xg, away_xg, rho))
            p = max(p, 0.0)
            m[i][j] = p
            total += p
    # renormalise (truncation + DC tau make it not sum exactly to 1)
    if total > 0:
        for i in range(max_goals + 1):
            for j in range(max_goals + 1):
                m[i][j] /= total
    return m


def markets_from_matrix(m: List[List[float]], ou_lines=(1.5, 2.5, 3.5),
                        ah_lines=(-1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5),
                        top_scores: int = 6) -> Dict:
    n = len(m)
    p_home = p_draw = p_away = 0.0
    p_btts = 0.0
    score_probs: Dict[str, float] = {}
    for i in range(n):
        for j in range(n):
            p = m[i][j]
            if i > j:
                p_home += p
            elif i == j:
                p_draw += p
            else:
                p_away += p
            if i > 0 and j > 0:
                p_btts += p
            score_probs[f"{i}-{j}"] = score_probs.get(f"{i}-{j}", 0.0) + p

    # Over/Under for each total-goals line
    ou = {}
    for line in ou_lines:
        over = 0.0
        for i in range(n):
            for j in range(n):
                if (i + j) > line:
                    over += m[i][j]
        ou[str(line)] = {"over": round(over, 5), "under": round(1.0 - over, 5)}

    # Asian Handicap on the HOME team (push-aware for whole/half lines, incl. quarter)
    ah = {}
    for line in ah_lines:
        ah[str(line)] = _asian_handicap_home(m, line)

    top = sorted(score_probs.items(), key=lambda kv: kv[1], reverse=True)[:top_scores]
    return {
        "1x2": {"home": round(p_home, 5), "draw": round(p_draw, 5), "away": round(p_away, 5)},
        "double_chance": {
            "1X": round(p_home + p_draw, 5),
            "12": round(p_home + p_away, 5),
            "X2": round(p_draw + p_away, 5),
        },
        "btts": {"yes": round(p_btts, 5), "no": round(1.0 - p_btts, 5)},
        "over_under": ou,
        "asian_handicap_home": ah,
        "top_scorelines": [{"score": s, "prob": round(p, 5)} for s, p in top],
        "fair_odds_1x2": {
            "home": round(1.0 / p_home, 3) if p_home else None,
            "draw": round(1.0 / p_draw, 3) if p_draw else None,
            "away": round(1.0 / p_away, 3) if p_away else None,
        },
    }


def model_board(M: Dict, mat: List[List[float]], home_pt: str, away_pt: str) -> List[Dict]:
    """Quadro COMPLETO de probabilidades do modelo (Poisson), independente de
    haver odd da casa. Garante que TODO jogo mostre ~30-40 mercados com o
    percentual do modelo. Os labels batem com `plays` (all_markets_evaluated)
    para o painel sobrepor o EV onde a casa tiver a odd."""
    n = len(mat)
    rows: List[Dict] = []

    def add(label, p, group):
        if p is None or p <= 0:
            return
        rows.append({"market": label, "group": group,
                     "model_pct": round(p * 100, 1),
                     "model_odd": round(1.0 / p, 2)})

    # 1X2
    add(f"Resultado: {home_pt}", M["1x2"]["home"], "Resultado")
    add("Resultado: Empate", M["1x2"]["draw"], "Resultado")
    add(f"Resultado: {away_pt}", M["1x2"]["away"], "Resultado")
    # Dupla chance
    add(f"Dupla chance: {home_pt} ou Empate", M["double_chance"]["1X"], "Dupla chance")
    add(f"Dupla chance: {home_pt} ou {away_pt}", M["double_chance"]["12"], "Dupla chance")
    add(f"Dupla chance: Empate ou {away_pt}", M["double_chance"]["X2"], "Dupla chance")
    # Ambas marcam
    add("Ambas marcam: Sim", M["btts"]["yes"], "Ambas marcam")
    add("Ambas marcam: Não", M["btts"]["no"], "Ambas marcam")
    # Over/Under 0.5 a 4.5 (calculado direto da matriz)
    for line in (0.5, 1.5, 2.5, 3.5, 4.5):
        over = sum(mat[i][j] for i in range(n) for j in range(n) if (i + j) > line)
        add(f"Mais de {line} gols", over, "Gols O/U")
        add(f"Menos de {line} gols", 1.0 - over, "Gols O/U")
    # Handicap asiático no mandante (prob de cobrir, excluindo push)
    for ln, d in M.get("asian_handicap_home", {}).items():
        denom = d["win"] + d["lose"]
        p = (d["win"] / denom) if denom > 0 else None
        sign = "+" if float(ln) >= 0 else ""
        add(f"Handicap {home_pt} {sign}{ln}", p, "Handicap")
    # Placares mais prováveis
    for sc in M.get("top_scorelines", []):
        parts = sc["score"].split("-")
        if len(parts) == 2:
            add(f"Placar {parts[0]}-{parts[1]}", sc["prob"], "Placar")
    return rows


def _asian_handicap_home(m: List[List[float]], line: float) -> Dict:
    """
    Win-probability of backing the HOME team at Asian handicap `line`.
    Handles whole-line pushes; quarter lines split the stake into two halves.
    Returns win / push / lose probability for the home side.
    """
    # quarter line (e.g. -0.75) -> average of the two adjacent half/whole lines
    frac = round(abs(line) % 1, 2)
    if frac == 0.25 or frac == 0.75:
        lo = line - 0.25
        hi = line + 0.25
        a = _asian_handicap_home(m, lo)
        b = _asian_handicap_home(m, hi)
        return {k: round((a[k] + b[k]) / 2.0, 5) for k in ("win", "push", "lose")}

    n = len(m)
    win = push = lose = 0.0
    for i in range(n):
        for j in range(n):
            margin = (i + line) - j
            if margin > 1e-9:
                win += m[i][j]
            elif abs(margin) <= 1e-9:
                push += m[i][j]
            else:
                lose += m[i][j]
    return {"win": round(win, 5), "push": round(push, 5), "lose": round(lose, 5)}


# --------------------------------------------------------------------------- #
#  3. VALUE: EXPECTED VALUE, KELLY, CLOSING LINE VALUE
# --------------------------------------------------------------------------- #

def expected_value(prob: float, decimal_odds: float) -> float:
    """EV per 1 unit staked = prob*odds - 1.  (>0 = positive expectation.)"""
    return prob * decimal_odds - 1.0


def edge(prob: float, decimal_odds: float) -> float:
    """Edge = model_prob - fair_implied_prob_at_offered_price = prob - 1/odds."""
    return prob - (1.0 / decimal_odds)


def kelly_fraction(prob: float, decimal_odds: float) -> float:
    """
    Full Kelly fraction of bankroll = ((b*p) - q) / b, with b = odds-1, q = 1-p.
    Negative result => no bet (no edge).
    """
    b = decimal_odds - 1.0
    q = 1.0 - prob
    f = (b * prob - q) / b
    return f


def staking(prob: float, decimal_odds: float, kelly_mult: float = 0.25,
            bankroll_cap: float = 0.03) -> Dict:
    """
    Recommended stake as a fraction of bankroll.
      kelly_mult   : fractional-Kelly multiplier (0.10 conservative, 0.25 moderate, 0.50 aggressive)
      bankroll_cap : hard ceiling per single bet (default 3%).
    """
    full = kelly_fraction(prob, decimal_odds)
    ev = expected_value(prob, decimal_odds)
    if full <= 0 or ev <= 0:
        return {"bet": False, "reason": "no positive edge", "stake_pct": 0.0,
                "full_kelly_pct": round(full * 100, 3), "ev_pct": round(ev * 100, 3)}
    frac = full * kelly_mult
    capped = min(frac, bankroll_cap)
    return {
        "bet": True,
        "ev_pct": round(ev * 100, 2),
        "edge_pct": round(edge(prob, decimal_odds) * 100, 2),
        "full_kelly_pct": round(full * 100, 2),
        "kelly_mult": kelly_mult,
        "stake_pct": round(capped * 100, 3),
        "capped": capped < frac,
    }


def closing_line_value(entry_odds: float, closing_odds: float) -> Dict:
    """
    CLV — the single best long-run predictor of betting skill (Wong, Buchdahl).
    Positive CLV = you took a bigger price than the market closed at = you beat the close.
    """
    entry_p = 1.0 / entry_odds
    close_p = 1.0 / closing_odds
    return {
        "entry_odds": entry_odds,
        "closing_odds": closing_odds,
        "clv_pct": round((entry_odds / closing_odds - 1.0) * 100, 3),
        "prob_clv_pct": round((close_p - entry_p) / entry_p * 100, 3),
        "beat_close": entry_odds > closing_odds,
    }


def classify_ev(ev_pct: float) -> str:
    if ev_pct <= 0:
        return "NO BET (EV<=0)"
    if ev_pct < 3:
        return "weak edge"
    if ev_pct < 7:
        return "interesting"
    if ev_pct < 12:
        return "strong"
    return "VERIFY DATA (EV>12% is usually a data error)"


# --------------------------------------------------------------------------- #
#  4. ELO -> PROBABILITIES
# --------------------------------------------------------------------------- #

def elo_expected(elo_home: float, elo_away: float, home_adv: float = 65.0) -> float:
    """Expected score (win prob incl. half-draws) for home from Elo difference."""
    diff = (elo_home + home_adv) - elo_away
    return 1.0 / (1.0 + 10.0 ** (-diff / 400.0))


def elo_wdl(elo_home: float, elo_away: float, home_adv: float = 65.0,
            draw_factor: float = 0.27) -> Dict:
    """
    Rough 1X2 split from Elo. draw_factor scales the draw band; tune per competition.
    Use as a *prior* to blend with a goals model, not as a final answer.
    """
    exp_home = elo_expected(elo_home, elo_away, home_adv)
    p_draw = draw_factor * math.exp(-((exp_home - 0.5) ** 2) / 0.08)
    p_draw = min(max(p_draw, 0.05), 0.40)
    p_home = exp_home - p_draw / 2.0
    p_away = (1.0 - exp_home) - p_draw / 2.0
    # clamp + renormalise
    p_home, p_away = max(p_home, 0.01), max(p_away, 0.01)
    s = p_home + p_draw + p_away
    return {"home": round(p_home / s, 5), "draw": round(p_draw / s, 5),
            "away": round(p_away / s, 5)}


# --------------------------------------------------------------------------- #
#  4.5  READ THE HERMES ODDS FEED (CSV) AND AUTO-DEVIG EVERY MARKET
# --------------------------------------------------------------------------- #
#
# HERMES drops one CSV per day with all games + bookmaker odds. Expected canonical
# headers (the reader is tolerant of common PT/EN synonyms and a UTF-8 BOM):
#
#   date,kickoff,home,away,market,selection,odds,odds_open,bookmaker
#
# One row per (game, market, selection). `odds_open` and `bookmaker` are optional.
# See ../references/HERMES_ODDS_SPEC (mirrored to the WORLD CUP 2026 hub) for the
# full spec given to HERMES. This reader groups rows by game+market, removes the
# margin, and emits the "fair price" of every selection — ready for the analyst to
# attach model probabilities and run `value`.

# Onde o HERMES (scraper Lottu) pode ter salvo o feed — a área de trabalho do OneDrive
# tem variantes com/sem acento. Procuramos em todas e usamos o arquivo MAIS RECENTE.
LOTTU_FILENAME = "lottu_world_cup_odds.csv"


def _env_dirs(env_keys, root_subpath=None):
    """Diretorios vindos de variaveis de ambiente (prioridade NUVEM); ficam na
    frente das pastas fixas do Windows (fallback LOCAL). Sem env = lista vazia,
    entao o comportamento no PC fica identico ao de antes."""
    out = []
    for k in env_keys:
        v = os.environ.get(k)
        if v:
            out.append(v)
    root = os.environ.get("WC_ROOT_DIR")
    if root and root_subpath:
        out.append(os.path.join(root, *root_subpath))
    return out


def _compact_book_markets(markets):
    """Enxuga o board de odds para PUBLICACAO. A coleta rolling 72h empilha o
    mesmo mercado dezenas de vezes e carrega um campo 'raw' (texto cru da
    pagina) — isso inflava o dashboard_data.js para 100MB+ e a Vercel parava de
    publicar (site congelava desatualizado). Aqui removemos 'raw' e deduplicamos
    cada linha por (sel, line), mantendo a odd mais recente."""
    if not isinstance(markets, dict):
        return markets
    compact = {}
    for name, items in markets.items():
        if not isinstance(items, list):
            compact[name] = items
            continue
        seen = {}
        for it in items:
            if not isinstance(it, dict):
                continue
            k = (it.get("sel"), it.get("line"))
            seen[k] = {kk: vv for kk, vv in it.items() if kk != "raw"}
        compact[name] = list(seen.values())
    return compact


CANDIDATE_FEED_DIRS = _env_dirs(["WC_FEED_DIR"], ["DADOS DO DIA", "ODDS_LOTTU", "processed"]) + [
    r"C:\Users\jfdco\OneDrive\Area de Trabalho\WORLD CUP 2026\DADOS DO DIA\ODDS_LOTTU\processed",
    r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\DADOS DO DIA\ODDS_LOTTU\processed",
    r"C:\Users\jfdco\OneDrive\Area de Trabalho CORRIGIDO\WORLD CUP 2026\DADOS DO DIA\ODDS_LOTTU\processed",
]


def resolve_feed() -> Optional[str]:
    """Return the newest existing Lottu feed CSV across candidate folders, or None."""
    found = []
    for d in CANDIDATE_FEED_DIRS:
        p = os.path.join(d, LOTTU_FILENAME)
        if os.path.exists(p):
            found.append((os.path.getmtime(p), p))
    if not found:
        return None
    found.sort(reverse=True)
    return found[0][1]


_HEADER_SYNONYMS = {
    "date": {"date", "data", "dia", "match_date", "data_jogo"},
    "kickoff": {"kickoff", "time", "hora", "horario", "horário", "ko", "kick_off"},
    "home": {"home", "home_team", "mandante", "time_casa", "equipe_casa", "time_a", "casa_time"},
    "away": {"away", "away_team", "visitante", "time_fora", "equipe_fora", "time_b"},
    "market": {"market", "mercado", "tipo", "bet_type", "tipo_aposta"},
    "selection": {"selection", "selecao", "seleção", "pick", "resultado", "lado", "escolha"},
    "odds": {"odds", "odd", "preco", "preço", "cotacao", "cotação", "price", "odd_atual"},
    "odds_open": {"odds_open", "abertura", "odd_abertura", "opening", "open", "odd_open"},
    "bookmaker": {"bookmaker", "casa", "book", "casa_aposta", "bookie", "casa_de_aposta"},
}


def _build_header_map(fieldnames: List[str]) -> Dict[str, str]:
    """Map each canonical field to the actual column name found in the CSV."""
    found = {}
    lower = {(fn or "").strip().lower(): fn for fn in fieldnames}
    for canon, syns in _HEADER_SYNONYMS.items():
        for key, original in lower.items():
            if key in syns:
                found[canon] = original
                break
    return found


def _strip_accents(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKD", s or "")
                   if not unicodedata.combining(c)).strip()


def _norm(s: str) -> str:
    return _strip_accents(s).casefold()


# ---- LOTTU adapter (HERMES scraper real format) -------------------------- #
# Header: captured_at,source,event_name,sport,competition,market,selection,odd,
#         url,period,bookmaker_event_id,raw_text,key
# One row per (event, selection); selection is the team name or "Empate".
# The file ACCUMULATES snapshots over the day, so per (event,selection) we read the
# latest captured_at as the current odd and the earliest as the opening odd -> the
# market movement is derived automatically, no separate odds_open needed.

_MONTHS_OK = True


def _parse_period(period: str, year: int = 2026) -> Tuple[str, str]:
    """'11/06 16:00' -> ('2026-06-11', '16:00'). Returns ('','') if unparseable."""
    period = (period or "").strip()
    try:
        datepart, *rest = period.split()
        d, m = datepart.split("/")[:2]
        kickoff = rest[0] if rest else ""
        return f"{year}-{int(m):02d}-{int(d):02d}", kickoff
    except Exception:
        return "", ""


def _lottu_outcome(sel: str, home: str, away: str) -> Optional[str]:
    s = _norm(sel)
    if s in ("empate", "draw", "x", "1x2 - empate"):
        return "draw"
    if s == _norm(home):
        return "home"
    if s == _norm(away):
        return "away"
    return None


def read_lottu_csv(path: str, method: str = "shin",
                   only_date: Optional[str] = None, rows: Optional[List] = None) -> Dict:
    if rows is None:
        with open(path, "r", encoding="utf-8-sig", newline="") as f:
            rows = list(csv.DictReader(f))

    # event -> outcome -> list of (captured_at, odd); plus keep home/away/period
    events: Dict[str, Dict] = {}
    for row in rows:
        ev = (row.get("event_name") or "").strip()
        if " x " not in ev:
            continue
        home, away = [p.strip() for p in ev.split(" x ", 1)]
        outcome = _lottu_outcome(row.get("selection", ""), home, away)
        if outcome is None:
            continue
        try:
            odd = float(str(row.get("odd", "")).replace(",", "."))
        except (ValueError, TypeError):
            continue
        if odd <= 1.0:           # odd travada/locked -> ignora
            continue
        e = events.setdefault(ev, {"home": home, "away": away,
                                   "period": (row.get("period") or "").strip(),
                                   "bookmaker": (row.get("source") or "").strip(),
                                   "outcomes": {}})
        e["outcomes"].setdefault(outcome, []).append(
            ((row.get("captured_at") or "").strip(), odd))

    order = {"home": 0, "draw": 1, "away": 2}
    games = []
    for ev, e in events.items():
        date, kickoff = _parse_period(e["period"])
        if only_date and date and date != only_date:
            continue
        sels = []
        for outcome, series in e["outcomes"].items():
            series.sort(key=lambda t: t[0])           # by captured_at
            open_odd = series[0][1]
            cur_odd = series[-1][1]
            sels.append((outcome, cur_odd, open_odd if len(series) > 1 else None))
        sels.sort(key=lambda t: order.get(t[0], 9))
        odds = [o for _, o, _ in sels]
        fair = devig(odds, method)["fair_prob"] if len(odds) >= 2 else [None] * len(odds)
        label = {"home": e["home"], "draw": "Empate", "away": e["away"]}
        rows_out = []
        for (outcome, odd, odd_open), fp in zip(sels, fair):
            mv = round((odd / odd_open - 1.0) * 100, 1) if odd_open else None
            rows_out.append({
                "selection": label.get(outcome, outcome),
                "outcome": outcome,
                "odds": odd,
                "odds_open": odd_open,
                "move_pct": mv,
                "implied_pct": round(implied_prob(odd) * 100, 2),
                "fair_pct": round(fp * 100, 2) if fp is not None else None,
                "fair_odds": round(1.0 / fp, 3) if fp else None,
            })
        games.append({
            "date": date, "kickoff": kickoff, "match": f"{e['home']} x {e['away']}",
            "home": e["home"], "away": e["away"], "bookmaker": e["bookmaker"] or "lottu",
            "markets": {"1X2": {
                "overround_pct": round(overround(odds) * 100, 2) if len(odds) >= 2 else None,
                "selections": rows_out}},
        })
    games.sort(key=lambda x: (x["date"], x["kickoff"], x["match"]))
    return {"source": os.path.basename(path), "format": "lottu",
            "devig_method": method, "n_games": len(games), "games": games}


def read_odds_csv(path: str, method: str = "shin",
                  only_date: Optional[str] = None) -> Dict:
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    with open(path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        fields = [(fn or "").strip().lower() for fn in (reader.fieldnames or [])]
        # auto-detect the LOTTU scraper schema vs the generic schema
        if "event_name" in fields and "odd" in fields and "selection" in fields:
            return read_lottu_csv(path, method, only_date, rows=list(reader))
        hm = _build_header_map(reader.fieldnames or [])
        missing = [k for k in ("home", "away", "selection", "odds") if k not in hm]
        if missing:
            raise ValueError(f"CSV missing required column(s): {missing}. "
                             f"Found headers: {reader.fieldnames}")
        rows = list(reader)

    def get(row, canon, default=""):
        col = hm.get(canon)
        return (row.get(col, default) or "").strip() if col else default

    # group: game key -> market -> list of (selection, odds, odds_open)
    games: Dict[Tuple, Dict] = {}
    for row in rows:
        date = get(row, "date")
        if only_date and date and date != only_date:
            continue
        home, away = get(row, "home"), get(row, "away")
        if not home or not away:
            continue
        market = get(row, "market") or "1X2"
        sel = get(row, "selection")
        try:
            odd = float(get(row, "odds").replace(",", "."))
        except ValueError:
            continue
        open_raw = get(row, "odds_open")
        try:
            odd_open = float(open_raw.replace(",", ".")) if open_raw else None
        except ValueError:
            odd_open = None
        gkey = (date, get(row, "kickoff"), home, away)
        g = games.setdefault(gkey, {"date": date, "kickoff": get(row, "kickoff"),
                                    "home": home, "away": away,
                                    "bookmaker": get(row, "bookmaker"), "markets": {}})
        g["markets"].setdefault(market, []).append((sel, odd, odd_open))

    out = []
    for gkey, g in games.items():
        markets_out = {}
        for market, sels in g["markets"].items():
            odds = [o for _, o, _ in sels]
            fair = devig(odds, method)["fair_prob"] if len(odds) >= 2 else [None] * len(odds)
            rows_out = []
            for (sel, odd, odd_open), fp in zip(sels, fair):
                mv = round((odd / odd_open - 1.0) * 100, 1) if odd_open else None
                rows_out.append({
                    "selection": sel,
                    "odds": odd,
                    "odds_open": odd_open,
                    "move_pct": mv,  # negativo = odd caiu (encurtou)
                    "implied_pct": round(implied_prob(odd) * 100, 2),
                    "fair_pct": round(fp * 100, 2) if fp is not None else None,
                    "fair_odds": round(1.0 / fp, 3) if fp else None,
                })
            markets_out[market] = {
                "overround_pct": round(overround(odds) * 100, 2) if len(odds) >= 2 else None,
                "selections": rows_out,
            }
        out.append({
            "date": g["date"], "kickoff": g["kickoff"],
            "match": f"{g['home']} x {g['away']}",
            "home": g["home"], "away": g["away"], "bookmaker": g["bookmaker"],
            "markets": markets_out,
        })
    out.sort(key=lambda x: (x["date"], x["kickoff"], x["match"]))
    return {"source": os.path.basename(path), "devig_method": method,
            "n_games": len(out), "games": out}


# --------------------------------------------------------------------------- #
#  4.6  FORM MODEL — turn recent results + H2H into expected goals (xG)
# --------------------------------------------------------------------------- #
#
# This is the bridge between the HISTORY database (the last ~20 games of each
# national team, home/away, plus the last 5 head-to-head meetings — collected by
# HERMES) and the Poisson scoreline model. It produces the two lambdas (home_xg,
# away_xg) automatically from form, so the analyst no longer guesses them by hand.
#
# Method: a classic multiplicative attack/defence model normalised by the average
# goals-per-team-per-game (L). Each team's scoring/conceding rate is shrunk toward
# L (Bayesian regularisation) so small samples don't produce extreme predictions.
# At a neutral World Cup venue, overall rates are used; set neutral=false to use
# home/away splits with a modest home edge.
#
# Input (a "fixture" dict, usually loaded from JSON):
#   {
#     "league_avg_goals": 1.35,         # optional, default 1.35 (intl football)
#     "neutral": true,                   # WC group stage = neutral ground
#     "home": {"name": "Brazil",  "matches": [{"venue":"H","gf":3,"ga":0}, ...]},
#     "away": {"name": "Serbia",  "matches": [{"venue":"A","gf":1,"ga":2}, ...]},
#     "h2h":  [{"home":"Brazil","away":"Serbia","gf":2,"ga":0}, ...]   # optional
#   }

DEFAULT_LEAGUE_AVG = 1.35       # avg goals per team per game (international)
_SHRINK_W = 5                   # pseudo-games pulling a rate toward the mean
_XG_MIN, _XG_MAX = 0.2, 4.0


def _avg(matches: List[Dict], key: str) -> Optional[float]:
    vals = [float(m[key]) for m in matches if m.get(key) is not None]
    return sum(vals) / len(vals) if vals else None


def _split_rates(matches: List[Dict]) -> Dict:
    home = [m for m in matches if str(m.get("venue", "")).upper().startswith("H")]
    away = [m for m in matches if str(m.get("venue", "")).upper().startswith("A")]
    return {
        "n": len(matches), "gf": _avg(matches, "gf"), "ga": _avg(matches, "ga"),
        "n_home": len(home), "gf_home": _avg(home, "gf"), "ga_home": _avg(home, "ga"),
        "n_away": len(away), "gf_away": _avg(away, "gf"), "ga_away": _avg(away, "ga"),
    }


def _shrink(value: Optional[float], n: int, L: float, w: int = _SHRINK_W) -> float:
    if value is None or n == 0:
        return L
    return (value * n + L * w) / (n + w)


def fixture_xg(fixture: Dict) -> Dict:
    L = float(fixture.get("league_avg_goals", DEFAULT_LEAGUE_AVG))
    neutral = bool(fixture.get("neutral", True))
    H = _split_rates(fixture.get("home", {}).get("matches", []))
    A = _split_rates(fixture.get("away", {}).get("matches", []))

    if neutral:
        h_att = _shrink(H["gf"], H["n"], L); h_def = _shrink(H["ga"], H["n"], L)
        a_att = _shrink(A["gf"], A["n"], L); a_def = _shrink(A["ga"], A["n"], L)
    else:
        h_att = _shrink(H["gf_home"], H["n_home"], L); h_def = _shrink(H["ga_home"], H["n_home"], L)
        a_att = _shrink(A["gf_away"], A["n_away"], L); a_def = _shrink(A["ga_away"], A["n_away"], L)

    home_xg = (h_att * a_def) / L
    away_xg = (a_att * h_def) / L
    if not neutral:                       # modest home advantage on non-neutral ground
        home_xg *= 1.10
        away_xg *= 0.95

    home_xg = min(max(home_xg, _XG_MIN), _XG_MAX)
    away_xg = min(max(away_xg, _XG_MIN), _XG_MAX)

    h2h = fixture.get("h2h", []) or []
    h2h_summary = None
    if h2h:
        hn = fixture.get("home", {}).get("name", "home")
        wins = sum(1 for m in h2h if (m.get("home") == hn and m.get("gf", 0) > m.get("ga", 0))
                   or (m.get("away") == hn and m.get("ga", 0) > m.get("gf", 0)))
        draws = sum(1 for m in h2h if m.get("gf") == m.get("ga"))
        h2h_summary = {"n": len(h2h), "home_team_wins": wins, "draws": draws,
                       "other": len(h2h) - wins - draws}

    return {
        "home_team": fixture.get("home", {}).get("name", "home"),
        "away_team": fixture.get("away", {}).get("name", "away"),
        "neutral": neutral, "league_avg_goals": L,
        "home_xg": round(home_xg, 3), "away_xg": round(away_xg, 3),
        "ratings": {
            "home_attack": round(h_att, 3), "home_defense": round(h_def, 3),
            "away_attack": round(a_att, 3), "away_defense": round(a_def, 3),
        },
        "samples": {"home_games": H["n"], "away_games": A["n"]},
        "h2h": h2h_summary,
        "note": "xG shrunk toward league average; few games -> closer to average.",
    }


# --------------------------------------------------------------------------- #
#  4.7  HISTORY DB (HERMES) -> FULL PREDICTION + VALUE IN ONE STEP
# --------------------------------------------------------------------------- #
#
# Reads the BANCO_RESULTADOS_SELECOES database (built by HERMES from public
# international results) and joins it with the live Lottu odds to produce, for a
# given fixture: model xG -> Poisson 1X2/OU/BTTS -> compare to the book -> EV and
# stake per selection. This is the whole pipeline (history -> probability -> value).

CANDIDATE_DB_DIRS = _env_dirs(["WC_DB_DIR"], ["DADOS DO DIA", "BANCO_RESULTADOS_SELECOES"]) + [
    r"C:\Users\jfdco\OneDrive\Area de Trabalho\WORLD CUP 2026\DADOS DO DIA\BANCO_RESULTADOS_SELECOES",
    r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\DADOS DO DIA\BANCO_RESULTADOS_SELECOES",
    r"C:\Users\jfdco\OneDrive\Area de Trabalho CORRIGIDO\WORLD CUP 2026\DADOS DO DIA\BANCO_RESULTADOS_SELECOES",
]
_DB_FIXTURES = "fixtures_primeira_fase_lottu.csv"


def resolve_db() -> Optional[str]:
    for d in CANDIDATE_DB_DIRS:
        if os.path.exists(os.path.join(d, _DB_FIXTURES)):
            return d
    return None


def _load_csv(path: str) -> List[Dict]:
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def load_history_db(db_dir: str) -> Dict:
    def by_team(rows):
        d: Dict[str, List] = {}
        for r in rows:
            d.setdefault(r.get("team", ""), []).append(r)
        return d
    last = _load_csv(os.path.join(db_dir, "ultimos_20_jogos_por_selecao_ultimo_ano.csv"))
    # base ampliada (60 jogos) tem prioridade; cai pro 20 se não existir
    geral = (_load_csv(os.path.join(db_dir, "ultimos_60_jogos_por_selecao.csv"))
             or _load_csv(os.path.join(db_dir, "ultimos_20_jogos_por_selecao_geral.csv")))
    return {
        "fixtures": _load_csv(os.path.join(db_dir, _DB_FIXTURES)),
        "last": by_team(last), "geral": by_team(geral),
        "h2h": _load_csv(os.path.join(db_dir, "ultimos_5_confrontos_diretos_por_jogo.csv")),
        "majors": _load_csv(os.path.join(db_dir, "jogos_grandes_torneios_por_selecao.csv")),
    }


def _matches_for(db: Dict, team_en: str, min_recent: int = 10, cap: int = 20) -> List[Dict]:
    rows = db["last"].get(team_en, [])
    if len(rows) < min_recent:                       # poucos jogos no último ano -> usa o geral
        rows = db["geral"].get(team_en, rows)
    out = []
    for r in rows[:cap]:
        sl = (r.get("team_scoreline") or "").split("-")
        try:
            gf, ga = int(sl[0]), int(sl[1])
        except (ValueError, IndexError):
            continue
        venue = "H" if r.get("side") == "home" else "A"
        out.append({"venue": venue, "gf": gf, "ga": ga,
                    "opponent": r.get("opponent", ""), "date": r.get("date", "")})
    return out


def build_fixture_from_db(db: Dict, frow: Dict, neutral: bool = True) -> Dict:
    home_en, away_en, fid = frow["home_team"], frow["away_team"], frow["fixture_id"]
    h2h = []
    for r in db["h2h"]:
        if r.get("fixture_id") != fid:
            continue
        try:
            h2h.append({"home": r["home_team"], "away": r["away_team"],
                        "gf": int(r["home_score"]), "ga": int(r["away_score"])})
        except (ValueError, KeyError):
            continue
    return {"league_avg_goals": DEFAULT_LEAGUE_AVG, "neutral": neutral,
            "home": {"name": home_en, "matches": _matches_for(db, home_en)},
            "away": {"name": away_en, "matches": _matches_for(db, away_en)},
            "h2h": h2h}


def _find_fixture(db: Dict, fixture_id=None, home=None, away=None) -> Optional[Dict]:
    for r in db["fixtures"]:
        if fixture_id is not None and r.get("fixture_id") == str(fixture_id):
            return r
        if home and away:
            hn, an = _norm(home), _norm(away)
            if {_norm(r.get("home_team", "")), _norm(r.get("home_team_pt", ""))} & {hn} and \
               {_norm(r.get("away_team", "")), _norm(r.get("away_team_pt", ""))} & {an}:
                return r
    return None


RATING_HALFLIFE_DAYS = 540        # ~1,5 ano: jogo dessa idade pesa metade do mais recente


def _comp_weight(tour: str) -> float:
    """Peso por competitividade — amistoso vale menos que jogo pra valer (Biermann:
    amistoso = squad rodado/baixa intensidade). Copa do Mundo pesa mais."""
    t = _norm(tour)
    if "friendly" in t:
        return 0.7
    if "world cup" in t:
        return 1.1 if "qualif" in t else 1.4
    if "qualif" in t:
        return 1.1
    if any(s in t for s in ("euro", "copa am", "copa á", "african", "africa cup",
                            "gold cup", "asian cup", "nations league", "confeder", "finalissima")):
        return 1.2
    return 1.0


def _date_ord(s: str):
    try:
        return _dt.strptime(s.strip(), "%Y-%m-%d").toordinal() if _dt else None
    except Exception:
        return None


def fit_team_ratings(db: Dict, k: float = 3.0, iters: int = 80) -> Dict:
    """
    Opponent-adjusted attack/defence ratings via iterative Poisson fitting (the
    'poor-man's Dixon-Coles'). Each team's attack = goals scored / defensive strength
    of opponents faced, iterated to convergence — beating strong defences counts more.
    Games are WEIGHTED: recent games decay (half-life ~1.5y) and competitive games
    (World Cup/qualifiers) outweigh friendlies. `k` pseudo-games shrink thin samples
    toward the mean. Uses the whole pool (any team appearing), deduped by date+pairing.
    """
    src = db["geral"] if db["geral"] else db["last"]
    seen, games = set(), []
    for team, rows in src.items():
        for r in rows:
            sl = (r.get("team_scoreline") or "").split("-")
            try:
                gf, ga = int(sl[0]), int(sl[1])
            except (ValueError, IndexError):
                continue
            opp = r.get("opponent", "")
            if not opp:
                continue
            date = r.get("date", "")
            key = (date,) + tuple(sorted([team, opp]))
            if key in seen:
                continue
            seen.add(key)
            games.append((team, gf, opp, ga, _date_ord(date), _comp_weight(r.get("tournament", ""))))
    if not games:
        return {}
    ords = [o for *_, o, _ in games if o is not None]
    ref = max(ords) if ords else None

    def weight(o, cw):
        rec = (0.5 ** ((ref - o) / RATING_HALFLIFE_DAYS)) if (ref and o) else 1.0
        return max(rec, 0.05) * cw

    wgames = [(a, gf, b, ga, weight(o, cw)) for (a, gf, b, ga, o, cw) in games]
    sw = sum(w for *_, w in wgames) or 1.0
    L = sum(w * (gf + ga) for _, gf, _, ga, w in wgames) / (2 * sw)
    teams = set()
    for a, _, b, _, _ in wgames:
        teams.add(a); teams.add(b)
    per: Dict[str, List] = {t: [] for t in teams}
    for a, gf, b, ga, w in wgames:
        per[a].append((gf, ga, b, w))         # a scored gf, conceded ga, vs b (peso w)
        per[b].append((ga, gf, a, w))
    attack = {t: 1.0 for t in teams}
    defense = {t: 1.0 for t in teams}
    for _ in range(iters):
        na, nd = {}, {}
        for t in teams:
            num_a = den_a = num_d = den_d = k * L
            for gf, ga, opp, w in per[t]:
                num_a += w * gf; den_a += w * L * defense[opp]
                num_d += w * ga; den_d += w * L * attack[opp]
            na[t] = num_a / den_a if den_a else 1.0
            nd[t] = num_d / den_d if den_d else 1.0
        ma = sum(na.values()) / len(na)
        md = sum(nd.values()) / len(nd)
        attack = {t: na[t] / ma for t in teams}
        defense = {t: nd[t] / md for t in teams}
    return {"attack": attack, "defense": defense, "L": round(L, 4),
            "n_games": len(games), "n_teams": len(teams)}


def market_implied_xg(book_fair_1x2: Dict[str, float]) -> Tuple[float, float]:
    """Reverse-engineer (home_xg, away_xg) from bookmaker fair 1X2 probabilities.
    Two-pass grid search over Dixon-Coles Poisson: coarse (0.1 step) then fine (0.02)."""
    ph = book_fair_1x2.get("home", 0.33)
    pd = book_fair_1x2.get("draw", 0.33)
    pa = book_fair_1x2.get("away", 0.33)
    best_err, best = float('inf'), (1.3, 1.0)
    for hx_10 in range(3, 26):
        hx = hx_10 / 10.0
        for ax_10 in range(3, 26):
            ax = ax_10 / 10.0
            m1 = markets_from_matrix(scoreline_matrix(hx, ax, max_goals=6))["1x2"]
            err = (m1["home"]-ph)**2 + (m1["draw"]-pd)**2 + (m1["away"]-pa)**2
            if err < best_err:
                best_err, best = err, (hx, ax)
    bh, ba = best
    for hx_100 in range(max(20, int((bh-0.12)*100)), int((bh+0.14)*100), 2):
        hx = hx_100 / 100.0
        for ax_100 in range(max(20, int((ba-0.12)*100)), int((ba+0.14)*100), 2):
            ax = ax_100 / 100.0
            m1 = markets_from_matrix(scoreline_matrix(hx, ax, max_goals=6))["1x2"]
            err = (m1["home"]-ph)**2 + (m1["draw"]-pd)**2 + (m1["away"]-pa)**2
            if err < best_err:
                best_err, best = err, (hx, ax)
    return best


def market_calibrated_xg(model_hx: float, model_ax: float,
                         book_fair_1x2: Dict[str, float],
                         divergence_threshold: float = 0.08) -> Tuple[float, float, Dict]:
    """Calibrate model xG using bookmaker fair 1X2 when divergence is large.
    The model's fit_team_ratings produces xG too flat for unequal teams — e.g.
    USA 1.23 × Paraguay 1.03 when the market implies 1.55 × 0.85. When the max
    1X2 divergence exceeds threshold (8pp), blend toward market-implied xG.
    Higher divergence → more market weight: 30% at 8pp, up to 70% at 25pp+."""
    mat = scoreline_matrix(model_hx, model_ax, max_goals=6)
    model_1x2 = markets_from_matrix(mat)["1x2"]
    max_div = max(
        abs(model_1x2["home"] - book_fair_1x2.get("home", model_1x2["home"])),
        abs(model_1x2["draw"] - book_fair_1x2.get("draw", model_1x2["draw"])),
        abs(model_1x2["away"] - book_fair_1x2.get("away", model_1x2["away"]))
    )
    if max_div <= divergence_threshold:
        return model_hx, model_ax, {
            "calibrated": False, "max_divergence_pp": round(max_div * 100, 1),
        }
    mkt_hx, mkt_ax = market_implied_xg(book_fair_1x2)
    alpha = min(0.80, 0.60 + (max_div - divergence_threshold) * 2.5)
    cal_hx = round((1 - alpha) * model_hx + alpha * mkt_hx, 4)
    cal_ax = round((1 - alpha) * model_ax + alpha * mkt_ax, 4)
    return cal_hx, cal_ax, {
        "calibrated": True, "max_divergence_pp": round(max_div * 100, 1),
        "raw_model_xg": {"home": round(model_hx, 3), "away": round(model_ax, 3)},
        "market_implied_xg": {"home": round(mkt_hx, 3), "away": round(mkt_ax, 3)},
        "blend_alpha": round(alpha, 2),
    }


def wc_regime_L(db: Dict, since_year: int = 2010) -> Tuple[Optional[float], int]:
    """Gols por EQUIPE por jogo em Copas do Mundo recentes (>= since_year), medido do
    histórico de grandes torneios. Captura o regime de pressão/criticidade da Copa
    (menos gols, jogo mais truncado). Retorna (L_copa_por_equipe, n_jogos)."""
    cutoff = f"{since_year}-01-01"
    seen = {}
    for r in db.get("majors", []):
        if r.get("tournament") != "FIFA World Cup" or r.get("date", "") < cutoff:
            continue
        try:
            tot = int(r["home_score"]) + int(r["away_score"])
        except (ValueError, KeyError):
            continue
        seen[(r.get("date"), r.get("home_team"), r.get("away_team"))] = tot
    if len(seen) < 50:
        return None, 0
    vals = list(seen.values())
    return (sum(vals) / len(vals)) / 2.0, len(vals)


def predict_fixture(fixture_id=None, home=None, away=None,
                    devig_method: str = "shin", neutral: bool = True,
                    adjusted: bool = True) -> Dict:
    db_dir = resolve_db()
    if not db_dir:
        return {"error": "history DB not found", "searched": CANDIDATE_DB_DIRS}
    db = load_history_db(db_dir)
    frow = _find_fixture(db, fixture_id, home, away)
    if not frow:
        return {"error": "fixture not found", "hint": "use list-fixtures to see ids"}

    fx = build_fixture_from_db(db, frow, neutral)
    xg = fixture_xg(fx)                                   # naive (form-only) baseline
    home_en, away_en = frow["home_team"], frow["away_team"]

    model_kind = "naive_form"
    home_xg, away_xg = xg["home_xg"], xg["away_xg"]
    ratings = fit_team_ratings(db) if adjusted else {}
    if ratings and home_en in ratings["attack"] and away_en in ratings["attack"]:
        L = ratings["L"]
        home_xg = min(max(L * ratings["attack"][home_en] * ratings["defense"][away_en],
                          _XG_MIN), _XG_MAX)
        away_xg = min(max(L * ratings["attack"][away_en] * ratings["defense"][home_en],
                          _XG_MIN), _XG_MAX)
        if not neutral:
            home_xg *= 1.10; away_xg *= 0.95
        model_kind = "opponent_adjusted"

    # --- MARKET CALIBRATION: load odds early to fix flat-xG ---
    _cal_info = {"calibrated": False}
    feed = resolve_feed()
    _lottu_g = None
    if feed:
        _lottu_games = read_odds_csv(feed)["games"]
        _lottu_g = next((gg for gg in _lottu_games
                         if _norm(gg["home"]) == _norm(frow["home_team_pt"])
                         and _norm(gg["away"]) == _norm(frow["away_team_pt"])), None)
        if _lottu_g and "1X2" in _lottu_g.get("markets", {}):
            _sel = _lottu_g["markets"]["1X2"]["selections"]
            _book_odds = [s["odds"] for s in _sel if s["odds"] > 1.0]
            if len(_book_odds) >= 3:
                _fair = devig(_book_odds, "shin")["fair_prob"]
                _book_fair_1x2 = {}
                for s, fp in zip(_sel, _fair):
                    _book_fair_1x2[s["outcome"]] = fp
                home_xg, away_xg, _cal_info = market_calibrated_xg(
                    home_xg, away_xg, _book_fair_1x2)
                if _cal_info.get("calibrated"):
                    model_kind = "market_calibrated"

    markets = markets_from_matrix(scoreline_matrix(home_xg, away_xg))
    m1x2 = markets["1x2"]

    out = {
        "fixture_id": frow["fixture_id"], "match": frow["event_name_pt"],
        "home": frow["home_team"], "away": frow["away_team"],
        "model_kind": model_kind,
        "xg": {"home": round(home_xg, 3), "away": round(away_xg, 3),
               "naive_form_xg": {"home": xg["home_xg"], "away": xg["away_xg"]}},
        "xg_calibration": _cal_info,
        "ratings": ({"home": {"attack": round(ratings["attack"][home_en], 2),
                              "defense": round(ratings["defense"][home_en], 2)},
                     "away": {"attack": round(ratings["attack"][away_en], 2),
                              "defense": round(ratings["defense"][away_en], 2)}}
                    if model_kind in ("opponent_adjusted", "market_calibrated") else None),
        "model_1x2": m1x2,
        "over_under_2_5": markets["over_under"].get("2.5"),
        "btts": markets["btts"],
        "top_scorelines": markets["top_scorelines"][:4],
        "h2h": xg["h2h"], "form_samples": xg["samples"],
    }

    if not feed:
        out["lottu"] = "no live Lottu feed found"
        return out
    g = _lottu_g
    if not g:
        out["lottu"] = "fixture not in current Lottu feed"
        return out

    out["date"], out["kickoff"] = g.get("date"), g.get("kickoff")
    mp = {"home": m1x2["home"], "draw": m1x2["draw"], "away": m1x2["away"]}
    value = []
    for s in g["markets"]["1X2"]["selections"]:
        oc, odd = s["outcome"], s["odds"]
        p = mp.get(oc)
        if p is None:
            continue
        ev = expected_value(p, odd)
        st = staking(p, odd, 0.25, 0.03)
        value.append({
            "selection": s["selection"], "outcome": oc, "odds": odd,
            "move_pct": s["move_pct"],
            "model_prob_pct": round(p * 100, 2),
            "book_fair_pct": s["fair_pct"],
            "ev_pct": round(ev * 100, 2), "class": classify_ev(ev * 100),
            "recommend": st["bet"], "stake_pct_bankroll": st["stake_pct"],
        })
    value.sort(key=lambda x: x["ev_pct"], reverse=True)
    out["value_1x2"] = value
    # Honest guardrail: an EV above the VERIFY threshold on a longshot is almost always
    # the goals model underrating a quality gap, NOT real value. Only treat 0<EV<=12%
    # as a playable edge; flag the rest as discarded.
    playable = [v for v in value if 0 < v["ev_pct"] <= 12]
    discarded = [v for v in value if v["ev_pct"] > 12]
    best = playable[0] if playable else None
    if best:
        out["best_bet"] = (f'{best["selection"]} @ {best["odds"]} '
                           f'(EV {best["ev_pct"]}%, stake {best["stake_pct_bankroll"]}%)')
    else:
        out["best_bet"] = ("Sem aposta de valor confiável. "
                           "Modelo conservador vs mercado em jogo desigual — edges reais "
                           "aparecem em jogos equilibrados, não contra favoritão.")
    if discarded:
        out["discarded_fake_value"] = [
            f'{v["selection"]} (EV {v["ev_pct"]}% = provável erro de modelo, não valor)'
            for v in discarded]
    return out


# --------------------------------------------------------------------------- #
#  4.8  DETAILED ODDS (HERMES "página principal") -> MULTI-MARKET VALUE
# --------------------------------------------------------------------------- #
#
# The detailed feed has ~18 markets per game. We price the three the model covers
# well — Resultado final (1X2), Para ambos os times marcarem (BTTS) and Gols
# Mais/Menos (Over/Under) — comparing each to the opponent-adjusted model, with the
# same honest guardrail (only 0<EV<=12% is playable). Columns:
#   event_name,home_team,away_team,market,selection,line,odd,locked,...

# Search these roots recursively for the newest detailed-odds CSV. Robust to HERMES
# creating a fresh folder per collection (PRIMEIRO_DIA, 3_PRIMEIROS_DIAS, ...).
DETAILED_SEARCH_ROOTS = _env_dirs(["WC_DADOS_DIR"], ["DADOS DO DIA"]) + [
    r"C:\Users\jfdco\OneDrive\Area de Trabalho\WORLD CUP 2026\DADOS DO DIA",
    r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\DADOS DO DIA",
]


def resolve_detailed() -> Optional[str]:
    found = []
    for root in DETAILED_SEARCH_ROOTS:
        if not os.path.isdir(root):
            continue
        for dirpath, _, files in os.walk(root):
            for fn in files:
                low = fn.lower()
                if low.endswith(".csv") and "detalhad" in low:
                    p = os.path.join(dirpath, fn)
                    found.append((os.path.getmtime(p), p))
    return max(found)[1] if found else None


def _resolve_simple_1x2_feed() -> Optional[str]:
    """Find the simple Lottu 1X2 feed (all 72 games, collected by HERMES)."""
    for root in DETAILED_SEARCH_ROOTS:
        if not os.path.isdir(root):
            continue
        p = os.path.join(root, "ODDS_LOTTU", "processed", "lottu_world_cup_odds.csv")
        if os.path.isfile(p):
            return p
    # Fallback NUVEM: resolve_feed() respeita WC_FEED_DIR (feed bundlado no repo)
    return resolve_feed()


def _parse_detailed(csv_path: str) -> Dict:
    games: Dict[str, Dict] = {}
    for r in _load_csv(csv_path):
        if str(r.get("locked", "0")).strip() == "1":
            continue
        try:
            odd = float(str(r.get("odd", "")).replace(",", "."))
        except (ValueError, TypeError):
            continue
        ev = r.get("event_name", "")
        home = r.get("home_team", "")
        away = r.get("away_team", "")
        if not home and not away and " x " in ev:
            parts = ev.split(" x ", 1)
            home, away = parts[0].strip(), parts[1].strip()
        mkt = r.get("market", "")
        if mkt == "Resultado Final 1X2":
            mkt = "Resultado final"
        date_val = r.get("event_date", "")
        time_val = r.get("event_time", "")
        if not date_val:
            period = r.get("period", "")
            if period and " " in period:
                dp, tp = period.split(" ", 1)
                date_val = dp + "/2026"
                time_val = tp
            else:
                date_val = period
        source = (r.get("source") or r.get("bookmaker") or "unknown").strip() or "unknown"
        g = games.setdefault(ev, {"home": home, "away": away,
                                  "date": date_val,
                                  "time": time_val,
                                  "markets": {}, "odds_sources": set()})
        g["odds_sources"].add(source)
        g["markets"].setdefault(mkt, []).append(
            {"sel": r.get("selection", ""), "line": (r.get("line") or "").strip(),
             "odd": odd, "source": source,
             "raw": (r.get("raw_market_text") or r.get("raw_text", ""))})
    for g in games.values():
        g["odds_sources"] = sorted(g.get("odds_sources", []))
    return games


def _parse_and_merge_feeds() -> Dict:
    """Parse the detailed feed + simple 1X2 feed, merging both.
    Detailed feed takes priority (more markets). Simple feed fills in
    games that are missing from detailed."""
    games: Dict[str, Dict] = {}
    detailed = resolve_detailed()
    if detailed:
        games = _parse_detailed(detailed)
    simple = _resolve_simple_1x2_feed()
    if simple:
        simple_games = _parse_detailed(simple)
        for ev, g in simple_games.items():
            if ev not in games:
                games[ev] = g
            else:
                merged_sources = set(games[ev].get("odds_sources", [])) | set(g.get("odds_sources", []))
                games[ev]["odds_sources"] = sorted(merged_sources)
    return games


def _ev_row(label, model_p, odd, devig_pair=None):
    ev = expected_value(model_p, odd)
    st = staking(model_p, odd, 0.25, 0.03)
    return {"market": label, "odds": odd, "model_pct": round(model_p * 100, 1),
            "ev_pct": round(ev * 100, 2), "class": classify_ev(ev * 100),
            "stake_pct": st["stake_pct"]}


# --------------------------------------------------------------------------- #
#  4.7  PREDICTION MARKET — MANIFOLD (terceiro pilar)
# --------------------------------------------------------------------------- #

# Mapping: Manifold selection (EN with emoji) → normalized key for matching.
# The CSV uses selections like "🇲🇽 Mexico", "🇿🇦 South Africa", "Draw", etc.
# We strip emoji/flags and map to the PT name used in the Lottu/motor.
_MANIFOLD_EN_TO_PT = {
    "mexico": "México", "south africa": "África do Sul",
    "south korea": "Coreia do Sul", "czechia": "República Tcheca",
    "czech republic": "República Tcheca",
    "canada": "Canadá", "bosnia-herzegovina": "Bósnia & Herzegovina",
    "bosnia and herzegovina": "Bósnia & Herzegovina",
    "united states": "EUA", "paraguay": "Paraguai",
    "qatar": "Qatar", "switzerland": "Suíça",
    "brazil": "Brasil", "morocco": "Marrocos",
    "haiti": "Haiti", "scotland": "Escócia",
    "draw": "Empate",
}

MANIFOLD_SEARCH_DIRS = [
    r"C:\Users\jfdco\OneDrive\Area de Trabalho\WORLD CUP 2026\DADOS DO DIA\MERCADOS_PREDITIVOS_MANIFOLD",
    r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\DADOS DO DIA\MERCADOS_PREDITIVOS_MANIFOLD",
]


def _clean_manifold_sel(s: str) -> str:
    """Strip emoji flags and whitespace from Manifold selection names."""
    # Remove characters outside basic latin + accented latin
    cleaned = "".join(c for c in (s or "") if c.isascii() or unicodedata.category(c).startswith("L"))
    return cleaned.strip()


def resolve_manifold() -> Optional[str]:
    """Find the curated Manifold CSV (direct match markets)."""
    for d in MANIFOLD_SEARCH_DIRS:
        p = os.path.join(d, "manifold_mercados_diretos_jogos_3_primeiros_dias.csv")
        if os.path.isfile(p):
            return p
    # fallback: search for any manifold*diretos*.csv
    for d in MANIFOLD_SEARCH_DIRS:
        if not os.path.isdir(d):
            continue
        for fn in os.listdir(d):
            if fn.lower().endswith(".csv") and "diretos" in fn.lower():
                return os.path.join(d, fn)
    return None


def load_manifold(csv_path: Optional[str] = None) -> Dict[str, Dict[str, Dict]]:
    """Load Manifold prediction market data.

    Returns: {event_name_pt: {"home": {...}, "draw": {...}, "away": {...}}}
    where each inner dict has: prob, volume, liquidity, url, prob_change_day.
    event_name_pt matches the Lottu event name (PT) for easy merging.
    """
    csv_path = csv_path or resolve_manifold()
    if not csv_path or not os.path.isfile(csv_path):
        return {}
    result: Dict[str, Dict[str, Dict]] = {}
    for r in _load_csv(csv_path):
        ev_name = r.get("event_name", "")
        sel_raw = r.get("selection", "")
        sel_clean = _clean_manifold_sel(sel_raw).lower().strip()
        # Map to PT
        sel_pt = _MANIFOLD_EN_TO_PT.get(sel_clean)
        if not sel_pt:
            # try partial match
            for key, val in _MANIFOLD_EN_TO_PT.items():
                if key in sel_clean or sel_clean in key:
                    sel_pt = val
                    break
        if not sel_pt:
            continue
        try:
            prob = float(r.get("prediction_probability", 0))
            vol = float(r.get("market_volume", 0))
            liq = float(r.get("market_liquidity", 0))
        except (ValueError, TypeError):
            continue
        try:
            pcd = float(r.get("prob_change_day", 0))
        except (ValueError, TypeError):
            pcd = 0.0
        entry = {"prob": prob, "prob_pct": round(prob * 100, 2),
                 "volume": round(vol, 2), "liquidity": round(liq, 2),
                 "url": r.get("market_url", ""),
                 "prob_change_day": round(pcd * 100, 2),
                 "source": "manifold"}
        game = result.setdefault(ev_name, {})
        # Determine selection type
        if sel_pt == "Empate":
            game["draw"] = entry
        elif ev_name and sel_pt:
            # Determine if home or away by matching the event_name
            parts = ev_name.split(" x ")
            if len(parts) == 2:
                home_pt = parts[0].strip()
                away_pt = parts[1].strip()
                if _norm(sel_pt) == _norm(home_pt):
                    game["home"] = entry
                elif _norm(sel_pt) == _norm(away_pt):
                    game["away"] = entry
                else:
                    # try fuzzy
                    if _norm(sel_pt) in _norm(home_pt) or _norm(home_pt) in _norm(sel_pt):
                        game["home"] = entry
                    elif _norm(sel_pt) in _norm(away_pt) or _norm(away_pt) in _norm(sel_pt):
                        game["away"] = entry
    return result


def prediction_market_weight(volume: float) -> float:
    """Volume-adjusted weight for prediction market probability.
    CALIBRATED after 3 games (2026-06-12): market outperforms model on
    unequal games; raise pred weight to let market correct model bias.
    Base target: 25%. Scaled by volume: <250 → 12%, 250-750 → 18%, >750 → 25%."""
    if volume >= 750:
        return 0.25
    elif volume >= 250:
        return 0.18
    else:
        return 0.12


def consensus_probability(model_p: float, book_fair_p: float,
                          pred_p: Optional[float] = None,
                          pred_volume: float = 0) -> Dict:
    """Weighted consensus of 3 pillars.
    CALIBRATED after 3 games (2026-06-12):
      - Model overestimates favorites in balanced games, underestimates in unequal
      - Bookmaker + prediction market calibrate quality gap better
      - When market disagrees with model by >10pp, trust market more
    With prediction market: model 35%, bookmaker 40%, prediction 25% (vol-adjusted)
    Without prediction market: model 45%, bookmaker 55%
    Returns dict with consensus_prob and weights used."""
    if pred_p is not None and pred_volume > 0:
        w_pred = prediction_market_weight(pred_volume)
        remaining = 1.0 - w_pred
        w_model = remaining * 0.467   # ~35% total at max pred weight
        w_book = remaining * 0.533    # ~40% total at max pred weight
        cons = w_model * model_p + w_book * book_fair_p + w_pred * pred_p
        return {"consensus_prob": round(cons, 4),
                "w_model": round(w_model, 3), "w_book": round(w_book, 3),
                "w_pred": round(w_pred, 3), "pillars": 3}
    else:
        cons = 0.45 * model_p + 0.55 * book_fair_p
        return {"consensus_prob": round(cons, 4),
                "w_model": 0.45, "w_book": 0.55, "w_pred": 0.0, "pillars": 2}


def agreement_flag(model_fav: str, book_fav: str,
                   pred_fav: Optional[str] = None) -> str:
    """Classify pillar agreement: '3-of-3', '2-of-3', or 'no-consensus'."""
    if pred_fav is None:
        return "2-of-2 aligned" if model_fav == book_fav else "split"
    votes = [model_fav, book_fav, pred_fav]
    from collections import Counter
    c = Counter(votes)
    top, n = c.most_common(1)[0]
    if n == 3:
        return "3-of-3 aligned"
    elif n == 2:
        minority = [v for v in votes if v != top][0]
        return f"2-of-3 aligned (outlier: {minority})"
    return "no-consensus"


def analyze_detailed(csv_path: Optional[str] = None, neutral: bool = True) -> Dict:
    if csv_path:
        games = _parse_detailed(csv_path)
    else:
        games = _parse_and_merge_feeds()
    if not games:
        return {"error": "no odds feed found", "searched": DETAILED_SEARCH_ROOTS}
    db_dir = resolve_db()
    db = load_history_db(db_dir) if db_dir else None
    ratings = fit_team_ratings(db) if db else {}
    wc_L, wc_n = wc_regime_L(db) if db else (None, 0)
    wc_scale = min(max(wc_L / ratings["L"], 0.85), 1.05) if (ratings and wc_L) else 1.0

    # --- TERCEIRO PILAR: Prediction Market (Manifold) ---
    manifold_data = load_manifold()

    out_games = []
    for ev, g in games.items():
        home_pt, away_pt = g["home"], g["away"]
        frow = None
        if db:
            frow = next((r for r in db["fixtures"]
                         if _norm(r.get("home_team_pt", "")) == _norm(home_pt)
                         and _norm(r.get("away_team_pt", "")) == _norm(away_pt)), None)
        if not frow or not ratings:
            out_games.append({"match": ev, "note": "sem histórico/modelo para este jogo"})
            continue

        home_en, away_en = frow["home_team"], frow["away_team"]
        if home_en in ratings["attack"] and away_en in ratings["attack"]:
            L = ratings["L"]
            hx = min(max(L * ratings["attack"][home_en] * ratings["defense"][away_en] * wc_scale, _XG_MIN), _XG_MAX)
            ax = min(max(L * ratings["attack"][away_en] * ratings["defense"][home_en] * wc_scale, _XG_MIN), _XG_MAX)
        else:
            continue
        # --- MARKET CALIBRATION: fix the flat-xG problem ---
        # Extract 1X2 odds early to calibrate xG before computing scorelines.
        _raw_1x2_odds = {}
        for x in g["markets"].get("Resultado final", []):
            if _norm(x["sel"]) == _norm(home_pt):
                _raw_1x2_odds["home"] = x["odd"]
            elif _norm(x["sel"]) == "empate":
                _raw_1x2_odds["draw"] = x["odd"]
            elif _norm(x["sel"]) == _norm(away_pt):
                _raw_1x2_odds["away"] = x["odd"]
        _calibration_info = {"calibrated": False}
        if len(_raw_1x2_odds) >= 3:
            _fair = devig(list(_raw_1x2_odds.values()), "shin")["fair_prob"]
            _book_fair = dict(zip(_raw_1x2_odds.keys(), _fair))
            hx, ax, _calibration_info = market_calibrated_xg(hx, ax, _book_fair)
        mat = scoreline_matrix(hx, ax)
        M = markets_from_matrix(mat)

        def market_block(entries):
            """entries: [(label, model_prob, odd)]; devig the market -> fair prob per
            selection; attach EV, the disagreement (edge in points) and stake."""
            odds = [e[2] for e in entries]
            fair = devig(odds, "shin")["fair_prob"] if len(odds) >= 2 else [None] * len(odds)
            rows = []
            for (label, mp, odd), fp in zip(entries, fair):
                ev = expected_value(mp, odd)
                edge = (mp - fp) if fp is not None else None
                rows.append({"market": label, "odds": odd,
                             "model_pct": round(mp * 100, 1),
                             "fair_pct": round(fp * 100, 1) if fp is not None else None,
                             "edge_pts": round(edge * 100, 1) if edge is not None else None,
                             "ev_pct": round(ev * 100, 2),
                             "stake_pct": staking(mp, odd, 0.25, 0.03)["stake_pct"]})
            return rows

        plays = []
        # ---- 1X2 (also used for the game-level reliability gate) ----
        r1x2 = {x["sel"]: x["odd"] for x in g["markets"].get("Resultado final", [])}
        ent_1x2 = []
        for outcome, sel in (("home", home_pt), ("draw", "Empate"), ("away", away_pt)):
            if sel in r1x2:
                ent_1x2.append((f"Resultado: {sel}", M["1x2"][outcome], r1x2[sel], outcome))
        b1x2 = market_block([(a, b, c) for a, b, c, _ in ent_1x2])
        plays += b1x2
        # market fair 1X2 vs model 1X2 -> who does each side think is favourite?
        market_fair = {ent_1x2[i][3]: (b1x2[i]["fair_pct"] or 0) for i in range(len(ent_1x2))}
        model_1x2 = {k: round(v * 100, 1) for k, v in M["1x2"].items()}
        # ALINHADO vs DIVERGENTE: o modelo e o mercado concordam em QUEM é o favorito?
        # RISCO = quão DECIDIDO é o jogo (certeza do resultado), NÃO o risco da aposta:
        #   lopsided (favorito ~82%) = baixo risco; perto de 50/50 = alto risco (dá qualquer um).
        category, divergence_reason, fav_prob = "ALINHADO", "", 0.0
        if market_fair:
            mk_fav = max(market_fair, key=market_fair.get)
            md_fav = max(model_1x2, key=model_1x2.get)
            namemap = {"home": home_pt, "draw": "Empate", "away": away_pt}
            if mk_fav != md_fav:
                category = "DIVERGENTE"
                divergence_reason = (f"modelo aponta {namemap[md_fav]} favorito; "
                                     f"mercado aponta {namemap[mk_fav]}")
            fav_prob = (model_1x2.get(mk_fav, 0) + market_fair.get(mk_fav, 0)) / 2.0
        aligned = category == "ALINHADO"
        risk = "Baixo" if fav_prob >= 62 else "Médio" if fav_prob >= 47 else "Alto"

        # ---- BTTS ----
        bt = {_norm(x["sel"]): x["odd"] for x in g["markets"].get("Para ambos os times marcarem", [])}
        if "sim" in bt and ("nao" in bt or "não" in bt):
            no = bt.get("nao", bt.get("não"))
            plays += market_block([("Ambas marcam: Sim", M["btts"]["yes"], bt["sim"]),
                                   ("Ambas marcam: Não", M["btts"]["no"], no)])
        # ---- Over/Under per line ----
        ou = {x["line"]: x["odd"] for x in g["markets"].get("Gols - Mais/Menos", [])}
        for line in ("1.5", "2.5", "3.5"):
            mou = M["over_under"].get(line)
            if mou and f"+{line}" in ou and f"-{line}" in ou:
                plays += market_block([(f"Mais de {line} gols", mou["over"], ou[f"+{line}"]),
                                       (f"Menos de {line} gols", mou["under"], ou[f"-{line}"])])

        # ---- Placar certo (placar exato) — direto da matriz Poisson m[i][j] ----
        cs_all = []
        for x in g["markets"].get("Placar certo", []):
            parts = str(x["sel"]).upper().replace("×", "X").split("X")
            if len(parts) != 2:
                continue
            try:
                hi, aj = int(parts[0].strip()), int(parts[1].strip())
            except ValueError:
                continue
            if hi < len(mat) and aj < len(mat):
                cs_all.append((f"Placar {hi}-{aj}", mat[hi][aj], x["odd"]))
        if len(cs_all) >= 2:
            cs_rows = market_block(cs_all)              # devig sobre TODOS os placares ofertados
            plays += [r for r in cs_rows                # mostra só os relevantes (corta ruído)
                      if r["model_pct"] >= 1.5 or (r["fair_pct"] or 0) >= 2.0]

        # ---- Total de Gols (total exato) ----
        N = len(mat)
        tot_all = []
        for x in g["markets"].get("Total de Gols", []):
            digs = "".join(ch for ch in str(x["sel"]) if ch.isdigit())
            if not digs:
                continue
            k = int(digs)
            if "mais" in _norm(x["sel"]):
                mp = sum(mat[i][j] for i in range(N) for j in range(N) if i + j >= k)
            else:
                mp = sum(mat[i][j] for i in range(N) for j in range(N) if i + j == k)
            tot_all.append((f"Total {x['sel']}", mp, x["odd"]))
        if len(tot_all) >= 2:
            plays += market_block(tot_all)

        # ---- Handicap Asiático — reparse do RAW (o HERMES rotula os 2 lados como a casa).
        # Formato raw: "Home | Away | linha | odd | linha | odd | ...": 1ª metade dos pares é
        # do mandante (linhas <=0), 2ª metade do visitante (linhas >=0).
        def ah_side(side, L):
            if side == "home":
                return _asian_handicap_home(mat, L)
            h = _asian_handicap_home(mat, -L)            # away em L <=> home em -L invertido
            return {"win": h["lose"], "push": h["push"], "lose": h["win"]}

        ah_list = g["markets"].get("Handicap Asiático", [])
        raw_ah = ah_list[0].get("raw", "") if ah_list else ""
        toks = [t.strip() for t in raw_ah.split("|")]
        pairs = []
        k = 2                                            # pula os 2 nomes de time
        while k + 1 < len(toks):
            try:
                pairs.append((float(toks[k].replace("+", "")),
                              float(toks[k + 1].replace(",", "."))))
            except ValueError:
                pass
            k += 2
        half = len(pairs) // 2
        for idx, (L, o) in enumerate(pairs):
            if o <= 1.0:
                continue
            side = "home" if idx < half else "away"
            team = home_pt if side == "home" else away_pt
            r = ah_side(side, L)
            w, pu = r["win"], r["push"]
            we = w + 0.5 * pu                            # prob efetiva (push conta meio)
            evp = w * o + pu - 1.0                       # EV correto: push devolve a aposta
            imp = 1.0 / o
            sign = "+" if L > 0 else ""
            plays.append({"market": f"Handicap {team} {sign}{L}", "odds": o,
                          "model_pct": round(we * 100, 1), "fair_pct": round(imp * 100, 1),
                          "edge_pts": round((we - imp) * 100, 1), "ev_pct": round(evp * 100, 2),
                          "stake_pct": staking(we, o, 0.25, 0.03)["stake_pct"]})

        plays.sort(key=lambda x: x["ev_pct"], reverse=True)
        # Regra editorial JD-BET: todo jogo precisa de 2 sites/fontes de odds.
        # Manifold é terceiro pilar preditivo, mas NÃO conta como casa de odds.
        odds_sources = sorted(g.get("odds_sources", []))
        odds_source_count = len(odds_sources)
        odds_coverage_ok = odds_source_count >= 2
        odds_coverage_note = ("ok" if odds_coverage_ok
                              else f"odds insuficientes: {odds_source_count}/2 fonte(s) — adicionar segunda casa antes de recomendar")
        # Apostas de valor (auto-recomendação) só de jogos ALINHADOS, com 2 fontes de odds,
        # discordância crível (0<edge<=12) e EV são. Placar/Total ficam AVALIADOS na tabela
        # mas FORA da recomendação automática (alta variância — placar exato é onde o modelo erra mais).
        playable = [p for p in plays if odds_coverage_ok and aligned and p["edge_pts"] is not None
                    and 0 < p["edge_pts"] <= 12 and 0 < p["ev_pct"] <= 15
                    and not p["market"].startswith(("Placar ", "Total ", "Handicap "))]
        if not odds_coverage_ok:
            verdict = f"SEM RECOMENDAÇÃO — {odds_coverage_note}."
        elif not aligned:
            verdict = (f"DIVERGENTE — {divergence_reason}. Radar: investigar "
                       f"(sabemos algo que o mercado não sabe?), não apostar no automático.")
        elif playable:
            bp = playable[0]
            verdict = (f'{bp["market"]} @ {bp["odds"]} '
                       f'(EV {bp["ev_pct"]}%, edge {bp["edge_pts"]}pts, stake {bp["stake_pct"]}%)')
        else:
            verdict = "Alinhado, mas sem aposta de valor (preço justo)"

        # ---- TERCEIRO PILAR: Prediction Market merge ----
        pm = manifold_data.get(ev, {})
        pm_1x2 = {}
        pm_meta = {"source": "manifold", "volume": 0, "url": "", "has_data": False}
        if pm:
            for side in ("home", "draw", "away"):
                if side in pm:
                    pm_1x2[side] = pm[side]["prob_pct"]
            if pm.get("home"):
                pm_meta["volume"] = pm["home"]["volume"]
                pm_meta["url"] = pm["home"]["url"]
                pm_meta["has_data"] = True
        # Consensus: weighted average of 3 pillars
        consensus_1x2 = {}
        for side in ("home", "draw", "away"):
            mp = model_1x2.get(side, 0) / 100.0
            bp = market_fair.get(side, 0) / 100.0
            pp = pm_1x2.get(side)
            pp_f = pp / 100.0 if pp is not None else None
            c = consensus_probability(mp, bp, pp_f, pm_meta.get("volume", 0))
            consensus_1x2[side] = round(c["consensus_prob"] * 100, 1)
        # Agreement flag: who does each pillar think is the favourite?
        def _fav_of(d):
            if not d:
                return None
            return max(d, key=lambda k: d.get(k, 0))
        md_fav = _fav_of(model_1x2)
        mk_fav = _fav_of(market_fair)
        pm_fav = _fav_of(pm_1x2) if pm_1x2 else None
        agree = agreement_flag(md_fav or "", mk_fav or "", pm_fav)
        # Spreads for cross-pillar analysis
        spreads = {}
        for side in ("home", "draw", "away"):
            mp = model_1x2.get(side, 0)
            bp = market_fair.get(side, 0)
            pp = pm_1x2.get(side)
            spreads[side] = {
                "model_vs_book": round(mp - bp, 1),
                "model_vs_pred": round(mp - pp, 1) if pp is not None else None,
                "book_vs_pred": round(bp - pp, 1) if pp is not None else None,
            }

        # ---- Quadro COMPLETO do modelo (sempre presente, mesmo sem odds da casa) ----
        full_board = model_board(M, mat, home_pt, away_pt)
        _play_by_label = {p["market"]: p for p in plays}
        for r in full_board:
            pb = _play_by_label.get(r["market"])
            if pb:
                r["odd"] = pb.get("odds")
                r["fair_pct"] = pb.get("fair_pct")
                r["edge_pts"] = pb.get("edge_pts")
                r["ev_pct"] = pb.get("ev_pct")
                r["stake_pct"] = pb.get("stake_pct")

        out_games.append({
            "match": ev, "home": home_pt, "away": away_pt,
            "date": g["date"], "time": g["time"],
            "category": category, "aligned": aligned,
            "divergence_reason": divergence_reason,
            "risk": risk, "fav_pct": round(fav_prob, 1),
            "model_xg": {"home": round(hx, 2), "away": round(ax, 2)},
            "xg_calibration": _calibration_info,
            "model_1x2_pct": model_1x2, "market_1x2_pct": market_fair,
            "prediction_1x2_pct": pm_1x2, "prediction_meta": pm_meta,
            "consensus_1x2_pct": consensus_1x2,
            "agreement": agree, "spreads": spreads,
            "odds_sources": odds_sources,
            "odds_source_count": odds_source_count,
            "odds_coverage_ok": odds_coverage_ok,
            "odds_coverage_note": odds_coverage_note,
            "best_plays": playable[:3],
            "verdict": verdict,
            "all_markets_evaluated": plays,
            "model_board": full_board,          # quadro completo do modelo (prob + EV onde houver odd)
            "n_model_markets": len(full_board),
            "all_book_markets": _compact_book_markets(g["markets"]),   # board do HERMES, enxuto p/ publicacao
            "n_book_markets": len(g["markets"]),
        })
    has_pred = any(g.get("prediction_meta", {}).get("has_data") for g in out_games)
    return {"source": os.path.basename(csv_path) if csv_path else "merged_feeds", "n_games": len(out_games),
            "wc_regime": {"scale": round(wc_scale, 3),
                          "wc_goals_per_game": round(wc_L * 2, 2) if wc_L else None,
                          "n_matches": wc_n},
            "prediction_market": {"source": "manifold", "has_data": has_pred,
                                  "n_matched": sum(1 for g in out_games
                                                   if g.get("prediction_meta", {}).get("has_data"))},
            "games": out_games}


# --------------------------------------------------------------------------- #
#  4.8  CROSS-PILLAR ENGINE — CSV export per HERMES spec
# --------------------------------------------------------------------------- #

CROSS_PILLAR_DIRS = [
    r"C:\Users\jfdco\OneDrive\Area de Trabalho\WORLD CUP 2026\DADOS DO DIA\CROSS_PILLAR_ENGINE",
    r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\DADOS DO DIA\CROSS_PILLAR_ENGINE",
]


def export_cross_pillar() -> Dict:
    """Generate the cross-pillar CSV: model × bookmaker × prediction market."""
    data = analyze_detailed()
    if "error" in data:
        return data
    target = next((d for d in CROSS_PILLAR_DIRS if os.path.isdir(os.path.dirname(d))),
                  CROSS_PILLAR_DIRS[0])
    os.makedirs(target, exist_ok=True)
    out_path = os.path.join(target, "cross_pillar_3_primeiros_dias.csv")
    rows = []
    for g in data.get("games", []):
        m1 = g.get("model_1x2_pct", {})
        mk = g.get("market_1x2_pct", {})
        pm = g.get("prediction_1x2_pct", {})
        pm_meta = g.get("prediction_meta", {})
        sp = g.get("spreads", {})
        # Get 1X2 odds from book markets
        r1x2 = {}
        for x in g.get("all_book_markets", {}).get("Resultado final", []):
            if _norm(x["sel"]) == _norm(g["home"]):
                r1x2["home"] = x["odd"]
            elif _norm(x["sel"]) == "empate":
                r1x2["draw"] = x["odd"]
            elif _norm(x["sel"]) == _norm(g["away"]):
                r1x2["away"] = x["odd"]
        for side, team in [("home", g["home"]), ("draw", "Empate"), ("away", g["away"])]:
            odd = r1x2.get(side, "")
            raw_imp = round(1.0 / odd * 100, 2) if odd else ""
            rows.append({
                "event_name": g["match"],
                "event_date": g.get("date", ""),
                "event_time": g.get("time", ""),
                "selection_type": side,
                "team_or_draw": team,
                "bookmaker_odd": odd,
                "bookmaker_implied_prob_raw": raw_imp,
                "bookmaker_implied_prob_fair": mk.get(side, ""),
                "prediction_market_source": pm_meta.get("source", ""),
                "prediction_market_prob": pm.get(side, ""),
                "prediction_market_volume": pm_meta.get("volume", ""),
                "prediction_market_liquidity": pm_meta.get("liquidity", ""),
                "internal_model_prob": m1.get(side, ""),
                "consensus_prob": g.get("consensus_1x2_pct", {}).get(side, ""),
                "spread_internal_vs_bookmaker": sp.get(side, {}).get("model_vs_book", ""),
                "spread_internal_vs_prediction": sp.get(side, {}).get("model_vs_pred", ""),
                "spread_bookmaker_vs_prediction": sp.get(side, {}).get("book_vs_pred", ""),
                "agreement_flag": g.get("agreement", ""),
                "edge_flag": g.get("category", ""),
                "data_quality_flag": "ok" if pm.get(side) else "no_prediction_market",
                "notes": g.get("divergence_reason", ""),
            })
    fieldnames = ["event_name", "event_date", "event_time", "selection_type", "team_or_draw",
                  "bookmaker_odd", "bookmaker_implied_prob_raw", "bookmaker_implied_prob_fair",
                  "prediction_market_source", "prediction_market_prob",
                  "prediction_market_volume", "prediction_market_liquidity",
                  "internal_model_prob", "consensus_prob",
                  "spread_internal_vs_bookmaker", "spread_internal_vs_prediction",
                  "spread_bookmaker_vs_prediction", "agreement_flag", "edge_flag",
                  "data_quality_flag", "notes"]
    with open(out_path, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)
    return {"written": out_path, "n_rows": len(rows), "n_games": data.get("n_games")}


# --------------------------------------------------------------------------- #
#  4.9  DASHBOARD EXPORT — write the data the local HTML panel reads
# --------------------------------------------------------------------------- #

DASHBOARD_DIRS = _env_dirs(["WC_PAINEL_DIR"], ["PAINEL DE APOSTAS"]) + [
    r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\PAINEL DE APOSTAS",
    r"C:\Users\jfdco\OneDrive\Area de Trabalho\WORLD CUP 2026\PAINEL DE APOSTAS",
]
# Also deploy to jdmarket.ai repo (Vercel auto-deploys on push)
DEPLOY_DIR = os.environ.get("WC_DEPLOY_DIR", r"C:\dev\jdmarket-site\public\worldcup26")


def _preserve_extra_games_from_published(data: Dict) -> int:
    """Preserva jogos do painel atualmente publicado que a nuvem NÃO gerou.

    Caso típico: mata-mata adicionado pelo HERMES local (Round of 32, oitavas,
    quartas, etc.). A nuvem só sabe gerar fase de grupos a partir do CSV de
    fixtures; sem isso, regenerar o painel derrubaria os jogos extras toda vez.

    Heurística: lê dashboard_data.js publicado (DEPLOY_DIR de preferência, depois
    DASHBOARD_DIRS); identifica jogos cuja chave (home+away normalizado) não
    está no `data["games"]` recém-gerado; anexa-os ao output. Returns n_added.
    """
    import unicodedata, re as _re
    def _key(g):
        h = (g.get("home") or "").strip()
        a = (g.get("away") or "").strip()
        n = unicodedata.normalize("NFD", h + "|" + a)
        n = "".join(c for c in n if unicodedata.category(c) != "Mn")
        return _re.sub(r"[^a-zA-Z0-9|]+", "", n).lower()

    # Procura o dashboard publicado em ordem de preferência
    candidates = []
    if os.path.isdir(DEPLOY_DIR):
        candidates.append(os.path.join(DEPLOY_DIR, "dashboard_data.js"))
    for d in DASHBOARD_DIRS:
        candidates.append(os.path.join(d, "dashboard_data.js"))

    existing_payload = None
    for p in candidates:
        if not os.path.exists(p):
            continue
        try:
            with open(p, "r", encoding="utf-8") as f:
                raw = f.read()
            # remove "window.WC_DATA = " do início e ";" do final
            inner = raw.split("=", 1)[1].rstrip().rstrip(";").strip()
            existing_payload = json.loads(inner)
            break
        except Exception:
            continue

    if not existing_payload or not isinstance(existing_payload.get("games"), list):
        return 0

    new_keys = {_key(g) for g in (data.get("games") or [])}
    extras = []
    for g in existing_payload["games"]:
        k = _key(g)
        if k and k not in new_keys:
            # marca origem pra rastreabilidade
            g2 = dict(g)
            g2["_preserved_from_published"] = True
            extras.append(g2)

    if extras:
        data["games"] = list(data.get("games") or []) + extras
        data["n_games"] = len(data["games"])
    return len(extras)


def export_dashboard() -> Dict:
    """Run the day's analysis and write `dashboard_data.js` (a `window.WC_DATA = {...}`
    file the offline HTML loads via <script>, which sidesteps file:// CORS). Also seeds
    an empty `dashboard_history.js` once (never overwrites accumulated history)."""
    data = analyze_detailed()
    # Preserva mata-mata / jogos extras publicados pelo HERMES local que a nuvem
    # ainda não sabe gerar. Sem isso, cada regeneração derruba esses jogos.
    n_preserved = _preserve_extra_games_from_published(data)
    if n_preserved:
        print(f"[export_dashboard] preserved {n_preserved} extra games from published panel")
    ts = _dt.now().strftime("%d/%m/%Y %H:%M") if _dt else ""
    target = next((d for d in DASHBOARD_DIRS if os.path.isdir(os.path.dirname(d))),
                  DASHBOARD_DIRS[0])
    os.makedirs(target, exist_ok=True)
    payload = {"generated_at": ts}
    payload.update(data)
    data_path = os.path.join(target, "dashboard_data.js")
    with open(data_path, "w", encoding="utf-8") as f:
        f.write("window.WC_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n")
    hist_path = os.path.join(target, "dashboard_history.js")
    if not os.path.exists(hist_path):
        with open(hist_path, "w", encoding="utf-8") as f:
            f.write("window.WC_HISTORY = [];\n")
    # Also copy to jdmarket.ai deploy dir
    deploy_path = None
    if os.path.isdir(DEPLOY_DIR):
        import shutil
        deploy_data = os.path.join(DEPLOY_DIR, "dashboard_data.js")
        shutil.copy2(data_path, deploy_data)
        deploy_hist = os.path.join(DEPLOY_DIR, "dashboard_history.js")
        if os.path.exists(hist_path):
            shutil.copy2(hist_path, deploy_hist)
        deploy_path = deploy_data
    return {"written": data_path, "deploy": deploy_path, "history": hist_path,
            "n_games": data.get("n_games"), "generated_at": ts}


# --------------------------------------------------------------------------- #
#  5. CLI
# --------------------------------------------------------------------------- #

def _print(obj):
    print(json.dumps(obj, indent=2, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser(description="World Cup Bet Intelligence Engine — math core")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("devig", help="remove bookmaker margin from a market")
    p.add_argument("--odds", nargs="+", type=float, required=True)
    p.add_argument("--method", choices=list(DEVIG_METHODS), default="shin")

    p = sub.add_parser("poisson", help="scoreline model from expected goals")
    p.add_argument("--home-xg", type=float, required=True)
    p.add_argument("--away-xg", type=float, required=True)
    p.add_argument("--rho", type=float, default=-0.03)
    p.add_argument("--max-goals", type=int, default=10)

    p = sub.add_parser("ev", help="expected value of a bet")
    p.add_argument("--prob", type=float, required=True)
    p.add_argument("--odds", type=float, required=True)

    p = sub.add_parser("kelly", help="fractional Kelly stake")
    p.add_argument("--prob", type=float, required=True)
    p.add_argument("--odds", type=float, required=True)
    p.add_argument("--fraction", type=float, default=0.25)
    p.add_argument("--cap", type=float, default=0.03)

    p = sub.add_parser("value", help="compare model probs vs offered odds for a market")
    p.add_argument("--model-probs", nargs="+", type=float, required=True)
    p.add_argument("--odds", nargs="+", type=float, required=True)
    p.add_argument("--labels", nargs="+", type=str, default=None)
    p.add_argument("--fraction", type=float, default=0.25)
    p.add_argument("--cap", type=float, default=0.03)

    p = sub.add_parser("clv", help="closing line value")
    p.add_argument("--entry", type=float, required=True)
    p.add_argument("--close", type=float, required=True)

    p = sub.add_parser("elo", help="1X2 from Elo ratings")
    p.add_argument("--home", type=float, required=True)
    p.add_argument("--away", type=float, required=True)
    p.add_argument("--home-adv", type=float, default=65.0)

    p = sub.add_parser("read-odds", help="read the HERMES/Lottu odds CSV and auto-devig every market")
    p.add_argument("--file", type=str, default=None,
                   help="path to the CSV; omit (or use --auto) to auto-locate the newest Lottu feed")
    p.add_argument("--auto", action="store_true", help="auto-locate the newest Lottu feed")
    p.add_argument("--method", choices=list(DEVIG_METHODS), default="shin")
    p.add_argument("--date", type=str, default=None, help="filter to one date (YYYY-MM-DD)")

    sub.add_parser("find-feed", help="print the path of the newest Lottu feed CSV found")

    p = sub.add_parser("team-xg", help="expected goals from recent form + full poisson markets")
    p.add_argument("--fixture", type=str, required=True, help="path to a fixture JSON file")
    p.add_argument("--rho", type=float, default=-0.08)

    sub.add_parser("list-fixtures", help="list the 72 group-stage fixtures with ids")
    sub.add_parser("analyze-day", help="read the detailed Lottu feed and value 1X2/BTTS/OU per game")
    sub.add_parser("dashboard", help="export dashboard_data.js for the local HTML panel")
    sub.add_parser("cross-pillar", help="export cross-pillar CSV (model × bookmaker × prediction market)")

    p = sub.add_parser("predict", help="full pipeline: history DB -> xG -> model -> Lottu odds -> value")
    p.add_argument("--fixture-id", type=str, default=None)
    p.add_argument("--home", type=str, default=None)
    p.add_argument("--away", type=str, default=None)
    p.add_argument("--method", choices=list(DEVIG_METHODS), default="shin")
    p.add_argument("--non-neutral", action="store_true", help="use home/away splits + home edge")
    p.add_argument("--naive", action="store_true", help="disable opponent-strength adjustment (form-only)")

    args = ap.parse_args()

    if args.cmd == "devig":
        _print(devig(args.odds, args.method))

    elif args.cmd == "poisson":
        m = scoreline_matrix(args.home_xg, args.away_xg, args.rho, args.max_goals)
        out = markets_from_matrix(m)
        out["inputs"] = {"home_xg": args.home_xg, "away_xg": args.away_xg, "rho": args.rho}
        _print(out)

    elif args.cmd == "ev":
        ev = expected_value(args.prob, args.odds)
        _print({"prob": args.prob, "odds": args.odds,
                "ev_pct": round(ev * 100, 3),
                "edge_pct": round(edge(args.prob, args.odds) * 100, 3),
                "class": classify_ev(ev * 100)})

    elif args.cmd == "kelly":
        _print(staking(args.prob, args.odds, args.fraction, args.cap))

    elif args.cmd == "value":
        labels = args.labels or [f"sel{i+1}" for i in range(len(args.odds))]
        fair = devig(args.odds, "shin")["fair_prob"]
        rows = []
        for lab, mp, od, fp in zip(labels, args.model_probs, args.odds, fair):
            s = staking(mp, od, args.fraction, args.cap)
            rows.append({
                "selection": lab,
                "model_prob": round(mp, 4),
                "book_fair_prob": round(fp, 4),
                "offered_odds": od,
                "ev_pct": round(expected_value(mp, od) * 100, 2),
                "class": classify_ev(expected_value(mp, od) * 100),
                "recommend": s["bet"],
                "stake_pct_bankroll": s["stake_pct"],
            })
        rows.sort(key=lambda r: r["ev_pct"], reverse=True)
        _print({"market": rows})

    elif args.cmd == "clv":
        _print(closing_line_value(args.entry, args.close))

    elif args.cmd == "elo":
        _print(elo_wdl(args.home, args.away, args.home_adv))

    elif args.cmd == "read-odds":
        path = args.file
        if args.auto or not path:
            path = resolve_feed()
            if not path:
                _print({"error": "no Lottu feed found", "searched": CANDIDATE_FEED_DIRS})
                return
        _print(read_odds_csv(path, args.method, args.date))

    elif args.cmd == "find-feed":
        path = resolve_feed()
        _print({"feed": path, "searched": CANDIDATE_FEED_DIRS} if path
               else {"feed": None, "searched": CANDIDATE_FEED_DIRS})

    elif args.cmd == "team-xg":
        with open(args.fixture, "r", encoding="utf-8-sig") as f:
            fx = json.load(f)
        res = fixture_xg(fx)
        m = scoreline_matrix(res["home_xg"], res["away_xg"], args.rho)
        res["markets"] = markets_from_matrix(m)
        _print(res)

    elif args.cmd == "list-fixtures":
        db_dir = resolve_db()
        if not db_dir:
            _print({"error": "history DB not found", "searched": CANDIDATE_DB_DIRS})
            return
        db = load_history_db(db_dir)
        _print({"n": len(db["fixtures"]),
                "fixtures": [{"id": r["fixture_id"], "match": r["event_name_pt"],
                              "home": r["home_team"], "away": r["away_team"]}
                             for r in db["fixtures"]]})

    elif args.cmd == "predict":
        _print(predict_fixture(args.fixture_id, args.home, args.away,
                               args.method, neutral=not args.non_neutral,
                               adjusted=not args.naive))

    elif args.cmd == "analyze-day":
        _print(analyze_detailed())

    elif args.cmd == "dashboard":
        _print(export_dashboard())

    elif args.cmd == "cross-pillar":
        _print(export_cross_pillar())


if __name__ == "__main__":
    main()
