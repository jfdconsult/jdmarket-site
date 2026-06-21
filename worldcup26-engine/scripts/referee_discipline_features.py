r"""
referee_discipline_features.py
==================================================================
Extrai features de DISCIPLINA (árbitro + comportamento das seleções)
e RESULTADO FIFA do banco SQLite criado pelo coletor do projeto:

  ...\WORLD CUP 2026\DADOS DO DIA\BANCO_RESULTADOS_SELECOES\
       worldcup_2026_resultados_selecoes.sqlite

Tabelas consumidas (somente leitura):
  - fixture_discipline_features_for_model  (join time/time/árbitro por fixture)
  - fixture_referee_assignments_2026       (escala confirmada do FIFA Match Centre)
  - referee_worldcup_history               (histórico do árbitro em Copas)
  - referee_match_discipline_worldcup      (jogo-a-jogo do árbitro)
  - referee_roster_2026_sportingnews       (170 oficiais 2026 — pool operacional)
  - team_discipline_summary_for_model      (resumo disciplinar por seleção)
  - fifa_matchcenter_daily_matches         (placar/status atualizado)

PRINCÍPIOS:
  1. Nunca inventar dados. Vazio vira None + data_quality_flag baixa.
  2. Scores normalizados em [0,1] a partir de baselines de Copa do Mundo.
  3. Confidence menor se árbitro com <3 jogos OU sem histórico OU
     team_discipline_summary_for_model.data_quality = fallback_*
  4. Os scores SÃO INSUMOS — não decisão. O motor v3 aplica pesos pequenos
     (3–8% árbitro, 5–12% disciplina) sobre o baseline do motor v2.

API pública:
  - DB_PATH                                : caminho resolvido do SQLite
  - load_fixture_features(fixture_id|home_team)
  - load_all_fixture_features()
  - score_fixture(features_row) -> dict de scores
  - fifa_result_for(home, away)            : placar/status (se houver)

Uso CLI:
  python referee_discipline_features.py list                  -> lista os 72 jogos
  python referee_discipline_features.py show --fixture 3      -> features cruas + scores
  python referee_discipline_features.py json --fixture 3      -> mesmo, em JSON
  python referee_discipline_features.py score-all             -> 7 jogos confirmados
"""

import argparse
import json
import os
import sqlite3
import sys
from typing import Any, Dict, List, Optional


# --------------------------------------------------------------------------- #
# Localizar o banco (Windows com acento em "Área de Trabalho")
# --------------------------------------------------------------------------- #
def _resolve_db() -> Optional[str]:
    # NUVEM: env explicito, ou SQLite enxuto bundlado no repo
    env = os.environ.get("WC_RESULTS_DB")
    if env and os.path.isfile(env):
        return env
    bases = []
    if os.environ.get("WC_DB_DIR"):
        bases.append(os.environ["WC_DB_DIR"])
    if os.environ.get("WC_DADOS_DIR"):
        bases.append(os.path.join(os.environ["WC_DADOS_DIR"], "BANCO_RESULTADOS_SELECOES"))
    for b in bases:
        for name in ("worldcup_results_small.sqlite", "worldcup_2026_resultados_selecoes.sqlite"):
            cand = os.path.join(b, name)
            if os.path.isfile(cand):
                return cand
    # PC: SQLite completo no OneDrive
    onedrive = os.path.join(os.environ.get("USERPROFILE", ""), "OneDrive")
    for desktop in ("Área de Trabalho", "Area de Trabalho", "Desktop"):
        p = os.path.join(
            onedrive, desktop, "WORLD CUP 2026", "DADOS DO DIA",
            "BANCO_RESULTADOS_SELECOES", "worldcup_2026_resultados_selecoes.sqlite")
        if os.path.exists(p):
            return p
    return None


DB_PATH = _resolve_db()


# --------------------------------------------------------------------------- #
# Baselines (referência: jfjelstul Copa do Mundo, todos os jogos disponíveis)
# Servem para NORMALIZAR scores em [0,1].
# --------------------------------------------------------------------------- #
# Árbitro (médias típicas em Copa do Mundo):
REF_BASE = {
    "yellow_per_match":  3.50,   # eixo: 1.5 (brando) ... 5.5 (rigoroso)
    "red_per_match":     0.15,   # eixo: 0 ... 0.40
    "send_per_match":    0.18,
    "penalty_per_match": 0.20,   # 0 ... 0.50
}

# Seleção (médias típicas):
TEAM_BASE = {
    "fouls_committed_per_match": 13.0,   # eixo: 8 ... 18
    "fouls_received_per_match":  13.0,
    "yellow_per_match":           1.80,
    "red_per_match":              0.08,
}

# Mínimos de amostra para confiar 100% no histórico do árbitro:
REF_MIN_MATCHES_FULL_TRUST = 5


# --------------------------------------------------------------------------- #
# Utilitários
# --------------------------------------------------------------------------- #
def _f(x: Any) -> Optional[float]:
    """Parse seguro. Texto vazio, None, ou não-numérico -> None."""
    if x is None:
        return None
    s = str(x).strip()
    if s == "" or s.lower() in ("nan", "null", "none"):
        return None
    try:
        return float(s)
    except ValueError:
        return None


def _clip01(x: float) -> float:
    return max(0.0, min(1.0, x))


def _norm_score(value: Optional[float], lo: float, hi: float) -> Optional[float]:
    """Normaliza um valor em [0,1] dado um eixo lo..hi. None preserva None."""
    if value is None:
        return None
    if hi <= lo:
        return 0.5
    return _clip01((value - lo) / (hi - lo))


def _q(conn: sqlite3.Connection, sql: str, params=()) -> List[sqlite3.Row]:
    conn.row_factory = sqlite3.Row
    try:
        return conn.execute(sql, params).fetchall()
    except sqlite3.OperationalError:
        # NUVEM: tabela ausente (so temos resultados via CSV, nao disciplina/arbitro).
        # Degrada gracioso -> sem dados em vez de quebrar.
        return []


# --------------------------------------------------------------------------- #
# Leitura de tabelas
# --------------------------------------------------------------------------- #
def _resolve_results_csv() -> Optional[str]:
    """CSV pequeno com a tabela fifa_matchcenter_daily_matches (exportado pelo HERMES),
    usado na NUVEM no lugar do SQLite de 113MB."""
    p = os.environ.get("WC_RESULTS_CSV")
    if p and os.path.isfile(p):
        return p
    bases = []
    if os.environ.get("WC_DB_DIR"):
        bases.append(os.environ["WC_DB_DIR"])
    if os.environ.get("WC_DADOS_DIR"):
        bases.append(os.path.join(os.environ["WC_DADOS_DIR"], "BANCO_RESULTADOS_SELECOES"))
    for b in bases:
        cand = os.path.join(b, "fifa_matchcenter_daily_matches.csv")
        if os.path.isfile(cand):
            return cand
    return None


def _memdb_from_csv(csv_path: str) -> sqlite3.Connection:
    """Monta um SQLite em memoria com a tabela de resultados a partir do CSV."""
    import csv as _csv
    conn = sqlite3.connect(":memory:")
    with open(csv_path, "r", encoding="utf-8-sig", newline="") as f:
        reader = _csv.reader(f)
        cols = next(reader, [])
        if not cols:
            return conn
        coldef = ", ".join('"%s" TEXT' % c for c in cols)
        conn.execute("CREATE TABLE fifa_matchcenter_daily_matches (%s)" % coldef)
        ph = ",".join("?" * len(cols))
        conn.executemany(
            "INSERT INTO fifa_matchcenter_daily_matches VALUES (%s)" % ph,
            [row for row in reader if len(row) == len(cols)])
    conn.commit()
    return conn


def _connect() -> sqlite3.Connection:
    # Forcar CSV (teste local ou override explicito)
    forced = os.environ.get("WC_RESULTS_CSV")
    if forced and os.path.isfile(forced):
        return _memdb_from_csv(forced)
    # PC: SQLite real
    if DB_PATH:
        return sqlite3.connect(DB_PATH)
    # NUVEM: monta banco em memoria a partir do CSV de resultados
    csv_path = _resolve_results_csv()
    if csv_path:
        return _memdb_from_csv(csv_path)
    raise FileNotFoundError(
        "Banco SQLite não encontrado e sem CSV de resultados "
        "(WC_RESULTS_CSV ou fifa_matchcenter_daily_matches.csv em WC_DB_DIR/WC_DADOS_DIR)."
    )


def referee_history(referee_name: str) -> Dict[str, Any]:
    """Procura o histórico de Copa para o árbitro escalado. Tenta match exato e
    fallback por sobrenome em MAIÚSCULAS (formato FIFA: 'Wilton SAMPAIO')."""
    if not referee_name:
        return {"matched": False, "method": "no_assignment"}
    with _connect() as conn:
        # 1) match exato
        rows = _q(conn,
                  "SELECT * FROM referee_worldcup_history "
                  "WHERE lower(referee_name) = lower(?) LIMIT 1",
                  (referee_name,))
        if rows:
            row = dict(rows[0])
            return {"matched": True, "method": "exact_name", "row": row}
        # 2) match por sobrenome (formato FIFA: GRITO no sobrenome)
        parts = [p for p in referee_name.split() if p]
        family = next((p for p in parts if p.isupper() and len(p) > 2), None)
        if family:
            rows = _q(conn,
                      "SELECT * FROM referee_worldcup_history "
                      "WHERE lower(family_name) = lower(?) LIMIT 1",
                      (family,))
            if rows:
                return {"matched": True, "method": "family_name",
                        "row": dict(rows[0])}
        # 3) match por given + family separados
        if len(parts) >= 2:
            given = parts[0].title()
            family = parts[-1].title()
            rows = _q(conn,
                      "SELECT * FROM referee_worldcup_history "
                      "WHERE lower(given_name) LIKE lower(?) "
                      "  AND lower(family_name) = lower(?) LIMIT 1",
                      (given + "%", family))
            if rows:
                return {"matched": True, "method": "given_family_separate",
                        "row": dict(rows[0])}
        # 4) fallback: roster 2026 (matched_history_referee_name)
        rows = _q(conn,
                  "SELECT * FROM referee_roster_2026_sportingnews "
                  "WHERE lower(professional_name) = lower(?) LIMIT 1",
                  (referee_name,))
        if rows:
            roster = dict(rows[0])
            mh = roster.get("matched_history_referee_name")
            if mh:
                rows2 = _q(conn,
                           "SELECT * FROM referee_worldcup_history "
                           "WHERE lower(referee_name) = lower(?) LIMIT 1",
                           (mh,))
                if rows2:
                    return {"matched": True, "method": "via_roster_2026",
                            "row": dict(rows2[0])}
            return {"matched": False, "method": "roster_no_history",
                    "row": roster}
    return {"matched": False, "method": "no_match", "name_tried": referee_name}


def load_fixture_features(fixture_id: Optional[int] = None,
                          home_team: Optional[str] = None,
                          away_team: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Devolve a linha bruta de fixture_discipline_features_for_model."""
    with _connect() as conn:
        if fixture_id is not None:
            rows = _q(conn,
                      "SELECT * FROM fixture_discipline_features_for_model "
                      "WHERE fixture_id = ? LIMIT 1",
                      (str(fixture_id),))
        elif home_team and away_team:
            rows = _q(conn,
                      "SELECT * FROM fixture_discipline_features_for_model "
                      "WHERE lower(home_team) = lower(?) "
                      "  AND lower(away_team) = lower(?) LIMIT 1",
                      (home_team, away_team))
        else:
            return None
        if not rows:
            return None
        return dict(rows[0])


def load_all_fixture_features() -> List[Dict[str, Any]]:
    with _connect() as conn:
        rows = _q(conn,
                  "SELECT * FROM fixture_discipline_features_for_model "
                  "ORDER BY CAST(fixture_id AS INTEGER)")
    return [dict(r) for r in rows]


# Override manual de eventos para jogos cujo raw FIFA mistura
# substituições com gols (a página renderizada não estrutura). Cada vez que
# tivermos confirmação visual humana, podemos colocar aqui até o parser ser
# aprimorado. Chave: match_id_fifa (string). Goals = [{team, scorer, minute}],
# cards = [{team, player, type, minute}].
_MANUAL_EVENTS = {
    # Mexico 2 x 0 South Africa, 2026-06-11
    "400021443": {
        "goals": [
            {"team": "Mexico",       "scorer": "Raul JIMENEZ", "minute": "67'"},
            {"team": "Mexico",       "scorer": "Cesar MONTES", "minute": "90'+2'"},
        ],
        "cards": [],
        "attendance": 80824,
        "source": "manual_after_visual_check_of_fifa_raw_2026_06_11",
    },
    # Korea Republic 2 x 1 Czechia, 2026-06-11
    "400021441": {
        "goals": [
            {"team": "Czech Republic", "scorer": "Ladislav KREJCI", "minute": "59'"},
            {"team": "South Korea",    "scorer": "HWANG Inbeom",    "minute": "67'"},
            {"team": "South Korea",    "scorer": "OH Hyeongyu",     "minute": "80'"},
        ],
        "cards": [
            {"team": "South Korea", "player": "—", "type": "yellow", "minute": "?"},
        ],
        "source": "manual_after_visual_check_of_fifa_raw_2026_06_12",
    },
}


_TEAM_ALIASES = {
    # cada chave vira lista de aliases que devem casar entre si
    "south korea":      ["korea republic", "korea, republic of"],
    "czech republic":   ["czechia", "czech"],
    "united states":    ["usa", "us", "united states of america"],
    "bosnia and herzegovina": ["bosnia & herzegovina", "bosnia-herzegovina"],
    "ivory coast":      ["cote d'ivoire", "côte d'ivoire"],
    "turkey":           ["türkiye", "turkiye"],
    "curacao":          ["curaçao"],
}


def _team_keywords(name: str) -> List[str]:
    """Devolve uma lista de termos a usar em LIKE para casar o nome do time
    contra o FIFA Match Centre (que pode usar formas diferentes)."""
    if not name:
        return []
    n = name.lower().strip()
    out = [n]
    for k, aliases in _TEAM_ALIASES.items():
        if n == k or n in aliases:
            out.append(k)
            out.extend(aliases)
    # também tentar palavras-chave principais (último/primeiro token)
    parts = n.split()
    if parts:
        out.append(parts[-1])  # ex: "south KOREA" -> "korea"
    return list(dict.fromkeys(out))   # dedup mantendo ordem


def fifa_result_for(home: str, away: str) -> Optional[Dict[str, Any]]:
    """Placar/status atualizado do FIFA Match Centre, se disponível.
    Anexa goals/cards de _MANUAL_EVENTS quando o jogo tem entrada manual.
    Usa _TEAM_ALIASES para casar nomes diferentes (Czech Republic <-> Czechia)."""
    h_keys = _team_keywords(home)
    a_keys = _team_keywords(away)
    rows = []
    with _connect() as conn:
        for hk in h_keys:
            if rows:
                break
            for ak in a_keys:
                r = _q(conn,
                       "SELECT * FROM fifa_matchcenter_daily_matches "
                       "WHERE (lower(home_team) LIKE lower(?) AND lower(away_team) LIKE lower(?)) "
                       "   OR (lower(home_team) LIKE lower(?) AND lower(away_team) LIKE lower(?)) "
                       "ORDER BY captured_at DESC LIMIT 1",
                       (f"%{hk}%", f"%{ak}%", f"%{ak}%", f"%{hk}%"))
                if r:
                    rows = r
                    break
    if not rows:
        return None
    r = dict(rows[0])
    out = {
        "match_id_fifa":  r.get("match_id_fifa"),
        "event_name":     r.get("event_name"),
        "kickoff":        r.get("kickoff"),
        "referee":        r.get("referee"),
        "home_score":     _f(r.get("home_score")),
        "away_score":     _f(r.get("away_score")),
        "status":         r.get("status"),
        "city":           r.get("city"),
        "location":       r.get("location"),
        "data_quality":   r.get("data_quality_notes"),
    }
    # Eventos detalhados (manual ou auto), quando disponíveis
    mid = r.get("match_id_fifa")
    if mid and mid in _MANUAL_EVENTS:
        ev = _MANUAL_EVENTS[mid]
        out["goals"] = ev.get("goals", [])
        out["cards"] = ev.get("cards", [])
        out["attendance"] = ev.get("attendance")
        out["events_source"] = ev.get("source")
    return out


# --------------------------------------------------------------------------- #
# Cálculo de scores
# --------------------------------------------------------------------------- #
def _referee_score(hist: Dict[str, Any]) -> Dict[str, Any]:
    """Recebe a saída de referee_history() e devolve scores normalizados."""
    if not hist or not hist.get("matched"):
        return {
            "referee_strictness_score": None,
            "referee_red_card_score":   None,
            "referee_penalty_score":    None,
            "matches_refereed":         0,
            "match_method":             hist.get("method") if hist else None,
            "confidence":               "low",
            "notes":                    "Sem histórico de Copa para o árbitro escalado.",
        }
    row = hist["row"]
    yel = _f(row.get("yellow_cards_per_match"))
    red = _f(row.get("red_cards_per_match"))
    snd = _f(row.get("sending_offs_per_match"))
    pen = _f(row.get("penalty_goals_in_match_per_match"))
    matches = int(_f(row.get("matches_refereed")) or 0)

    # rigor = média dos sub-scores normalizados (apenas dos disponíveis)
    sub = [
        _norm_score(yel, 1.5, 5.5),
        _norm_score(red + (snd or 0) if (red is not None or snd is not None) else None,
                    0.0, 0.40),
        _norm_score(pen, 0.0, 0.50),
    ]
    sub = [s for s in sub if s is not None]
    strict = sum(sub) / len(sub) if sub else None

    red_card_score = _norm_score(red, 0.0, 0.40)
    penalty_score  = _norm_score(pen, 0.0, 0.50)

    if matches >= REF_MIN_MATCHES_FULL_TRUST:
        conf = "high"
    elif matches >= 2:
        conf = "medium"
    else:
        conf = "low"

    return {
        "referee_strictness_score": round(strict, 4) if strict is not None else None,
        "referee_red_card_score":   round(red_card_score, 4) if red_card_score is not None else None,
        "referee_penalty_score":    round(penalty_score, 4) if penalty_score is not None else None,
        "matches_refereed":         matches,
        "match_method":             hist.get("method"),
        "confidence":               conf,
        "raw": {
            "yellow_per_match": yel, "red_per_match": red,
            "sending_offs_per_match": snd, "penalty_per_match": pen,
        },
    }


def _team_score(prefix: str, frow: Dict[str, Any]) -> Dict[str, Any]:
    """prefix = 'home' ou 'away'. Lê os campos prefix_* da fixture_discipline_features_for_model.
    Combina WC2022 (peso 0.7 se data_quality='high_for_wc2022_match_stats') com
    histórico de Copas (peso 0.3 ou 1.0 se WC2022 ausente)."""
    fc_2022   = _f(frow.get(f"{prefix}_fouls_committed_per_match_wc2022_estimated"))
    fr_2022   = _f(frow.get(f"{prefix}_fouls_received_per_match_wc2022_estimated"))
    yel_2022  = _f(frow.get(f"{prefix}_yellow_cards_per_match_wc2022"))
    red_2022  = _f(frow.get(f"{prefix}_red_cards_per_match_wc2022"))
    yel_hist  = _f(frow.get(f"{prefix}_history_yellow_cards_per_match"))
    red_hist  = _f(frow.get(f"{prefix}_history_red_cards_per_match"))
    pen_hist  = _f(frow.get(f"{prefix}_history_penalty_goals_per_match"))
    dq        = frow.get(f"{prefix}_data_quality") or ""

    high_2022 = dq.startswith("high_for_wc2022")
    w_2022 = 0.7 if high_2022 else 0.0
    w_hist = 1.0 - w_2022

    # cartões amarelos combinados (eixo 0.5 ... 3.5)
    yel_combined = None
    if yel_2022 is not None or yel_hist is not None:
        v = 0.0; w = 0.0
        if yel_2022 is not None: v += w_2022 * yel_2022; w += w_2022
        if yel_hist is not None: v += w_hist * yel_hist; w += w_hist
        yel_combined = v / w if w > 0 else None

    red_combined = None
    if red_2022 is not None or red_hist is not None:
        v = 0.0; w = 0.0
        if red_2022 is not None: v += w_2022 * red_2022; w += w_2022
        if red_hist is not None: v += w_hist * red_hist; w += w_hist
        red_combined = v / w if w > 0 else None

    # discipline_score = mistura de cartões amarelos e vermelhos (apenas os disponíveis)
    sub = []
    if yel_combined is not None:
        sub.append(_norm_score(yel_combined, 0.5, 3.5))
    if red_combined is not None:
        sub.append(_norm_score(red_combined, 0.0, 0.40))
    if fc_2022 is not None:
        sub.append(_norm_score(fc_2022, 8.0, 18.0))
    sub = [s for s in sub if s is not None]
    discipline_score = sum(sub) / len(sub) if sub else None

    fouls_received_score = _norm_score(fr_2022, 8.0, 18.0)
    penalty_team_score   = _norm_score(pen_hist, 0.0, 0.30)

    if high_2022 and yel_hist is not None:
        conf = "high"
    elif yel_2022 is not None or yel_hist is not None:
        conf = "medium"
    else:
        conf = "low"

    return {
        "discipline_score":     round(discipline_score, 4) if discipline_score is not None else None,
        "fouls_received_score": round(fouls_received_score, 4) if fouls_received_score is not None else None,
        "penalty_team_score":   round(penalty_team_score, 4) if penalty_team_score is not None else None,
        "yellow_per_match_combined": round(yel_combined, 4) if yel_combined is not None else None,
        "red_per_match_combined":    round(red_combined, 4) if red_combined is not None else None,
        "data_quality":         dq,
        "confidence":           conf,
    }


def score_fixture(frow: Dict[str, Any]) -> Dict[str, Any]:
    """Recebe uma linha bruta de fixture_discipline_features_for_model e
    devolve o BLOCO DE DISCIPLINA pronto para uso no motor v3."""
    referee_name = frow.get("assigned_referee_name") or ""
    rstatus = frow.get("referee_assignment_status") or "not_assigned"

    hist = referee_history(referee_name) if referee_name else \
        {"matched": False, "method": "no_assignment"}
    rscore = _referee_score(hist)

    hs = _team_score("home", frow)
    aw = _team_score("away", frow)

    # ---- interactions ----
    if rscore["referee_strictness_score"] is not None \
            and hs["discipline_score"] is not None and aw["discipline_score"] is not None:
        match_card_risk = rscore["referee_strictness_score"] * \
            (hs["discipline_score"] + aw["discipline_score"]) / 2.0
    else:
        match_card_risk = None

    if rscore["referee_penalty_score"] is not None \
            and hs["fouls_received_score"] is not None and aw["fouls_received_score"] is not None:
        penalty_risk = rscore["referee_penalty_score"] * \
            (hs["fouls_received_score"] + aw["fouls_received_score"]) / 2.0
    else:
        penalty_risk = None

    return {
        "fixture_id":   frow.get("fixture_id"),
        "event_name":   frow.get("event_name_pt"),
        "home_team":    frow.get("home_team"),
        "away_team":    frow.get("away_team"),
        "referee": {
            "assigned_name": referee_name or None,
            "assignment_status": rstatus,
            **rscore,
        },
        "home_discipline": hs,
        "away_discipline": aw,
        "interaction": {
            "match_card_risk": round(match_card_risk, 4) if match_card_risk is not None else None,
            "penalty_risk":    round(penalty_risk, 4) if penalty_risk is not None else None,
        },
        "fifa_result": fifa_result_for(frow.get("home_team") or "",
                                       frow.get("away_team") or ""),
    }


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def _cmd_list(_args):
    rows = load_all_fixture_features()
    print(f"# {len(rows)} fixtures em fixture_discipline_features_for_model\n")
    for r in rows[:80]:
        ref = (r.get("assigned_referee_name") or "—")
        print(f"  {r.get('fixture_id'):>3}  {r.get('home_team'):<22} x "
              f"{r.get('away_team'):<22}  ref: {ref}")


def _cmd_show(args):
    frow = load_fixture_features(fixture_id=args.fixture)
    if not frow:
        print(json.dumps({"error": "fixture não encontrada",
                          "fixture_id": args.fixture}, indent=2))
        return
    block = score_fixture(frow)
    print(json.dumps(block, indent=2, ensure_ascii=False))


def _cmd_json(args):
    return _cmd_show(args)


def _cmd_score_all(_args):
    """Mostra apenas os jogos com árbitro confirmado."""
    rows = load_all_fixture_features()
    out = []
    for r in rows:
        if (r.get("referee_assignment_status") or "").startswith("confirmed"):
            out.append(score_fixture(r))
    print(json.dumps({"n_confirmed": len(out), "fixtures": out},
                     indent=2, ensure_ascii=False))


def main():
    ap = argparse.ArgumentParser(
        description="Extrator de features de DISCIPLINA + ÁRBITRO + RESULTADO FIFA "
                    "para o motor v3 do JD-BET.")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("list", help="lista todas as 72 fixtures").set_defaults(func=_cmd_list)
    p = sub.add_parser("show", help="features + scores para uma fixture")
    p.add_argument("--fixture", type=int, required=True)
    p.set_defaults(func=_cmd_show)
    p = sub.add_parser("json", help="alias de show")
    p.add_argument("--fixture", type=int, required=True)
    p.set_defaults(func=_cmd_json)
    sub.add_parser("score-all", help="todos os jogos com árbitro confirmado") \
        .set_defaults(func=_cmd_score_all)
    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
