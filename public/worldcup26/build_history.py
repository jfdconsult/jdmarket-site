"""
JD-BET World Cup 2026 — Gerador de Histórico (com validação de completude)
==========================================================================
Lê a fonte canônica `history_data.json` e gera `dashboard_history.js`.

Princípio (pedido do João): o site NUNCA pode mostrar jogo pela metade.
Este gerador RECUSA publicar uma entrada que esteja faltando qualquer
campo obrigatório — força ter todos os dados antes de subir.

Uso:
    python build_history.py            # gera e valida
    python build_history.py --check    # só valida, não escreve

Fonte única de verdade:  history_data.json  (editar AQUI os resultados)
Saída:                    dashboard_history.js  (UTF-8, consumido pelo site)
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCE = os.path.join(HERE, "history_data.json")
OUTPUT = os.path.join(HERE, "dashboard_history.js")

# Campos obrigatórios para um jogo ser considerado COMPLETO.
# Se faltar qualquer um, o jogo é rejeitado (não vai pro ar pela metade).
REQUIRED = [
    "fixture_id", "event_name", "home_team", "away_team",
    "referee", "score", "home_score", "away_score", "actual_outcome",
    "model_v2_1x2_pct", "model_v2_predicted", "model_v2_hit",
    "model_v3_1x2_pct", "model_v3_predicted", "model_v3_hit",
    "v3_predictions", "market_1x2_pct", "consensus_1x2_pct",
    "actual_xg", "model_xg", "actual_yellows", "actual_reds",
]
# Campos que podem ser objetos e precisam ter as 3 chaves home/draw/away
TRIPLES = ["model_v2_1x2_pct", "model_v3_1x2_pct", "market_1x2_pct", "consensus_1x2_pct"]
# Campos que precisam ter home/away
DUOS = ["actual_xg", "model_xg"]


def is_filled(v):
    """Um valor conta como preenchido se não for None nem string/dict/list vazios.
    Zero é válido (ex.: 0 cartões vermelhos)."""
    if v is None:
        return False
    if isinstance(v, str) and v.strip() == "":
        return False
    if isinstance(v, (dict, list)) and len(v) == 0:
        return False
    return True


def validate(entry):
    """Retorna lista de problemas (vazia = completo)."""
    problems = []
    for k in REQUIRED:
        if not is_filled(entry.get(k)):
            problems.append(f"falta '{k}'")
    for k in TRIPLES:
        v = entry.get(k)
        if isinstance(v, dict) and not all(x in v for x in ("home", "draw", "away")):
            problems.append(f"'{k}' sem home/draw/away")
    for k in DUOS:
        v = entry.get(k)
        if isinstance(v, dict) and not all(x in v for x in ("home", "away")):
            problems.append(f"'{k}' sem home/away")
    return problems


def compute_summary(entries):
    n = len(entries)
    v2 = sum(1 for e in entries if e.get("model_v2_hit"))
    v3 = sum(1 for e in entries if e.get("model_v3_hit"))
    o25_seen = sum(1 for e in entries if "over_2_5_hit" in e)
    o25 = sum(1 for e in entries if e.get("over_2_5_hit"))
    btts_seen = sum(1 for e in entries if "btts_hit" in e)
    btts = sum(1 for e in entries if e.get("btts_hit"))
    pct = lambda a, b: round(100.0 * a / b, 1) if b else 0.0
    return {
        "n_games": n,
        "model_v2_hits": v2, "model_v2_pct": pct(v2, n),
        "model_v3_hits": v3, "model_v3_pct": pct(v3, n),
        "over_2_5_hits": o25, "over_2_5_seen": o25_seen, "over_2_5_pct": pct(o25, o25_seen),
        "btts_hits": btts, "btts_seen": btts_seen, "btts_pct": pct(btts, btts_seen),
    }


def main():
    check_only = "--check" in sys.argv
    if not os.path.exists(SOURCE):
        print(f"ERRO: fonte nao encontrada: {SOURCE}")
        sys.exit(1)

    with open(SOURCE, encoding="utf-8") as f:
        data = json.load(f)
    entries = data.get("entries", [])

    # ordena por fixture_id numerico (cronologico)
    entries.sort(key=lambda e: int(e.get("fixture_id", 0)))

    # VALIDACAO — rejeita jogos incompletos
    complete, rejected = [], []
    for e in entries:
        problems = validate(e)
        if problems:
            rejected.append((e.get("fixture_id"), e.get("event_name", "?"), problems))
        else:
            complete.append(e)

    print(f"Jogos na fonte: {len(entries)}  |  completos: {len(complete)}  |  rejeitados: {len(rejected)}")
    for fid, name, probs in rejected:
        print(f"  [REJEITADO] fx{fid} {name}: {'; '.join(probs)}")

    if rejected:
        print("\nATENCAO: ha jogos incompletos. Eles NAO serao publicados ate ter todos os dados.")
        if not check_only:
            print("Gerando mesmo assim SO com os jogos completos (os incompletos ficam de fora).")

    if check_only:
        sys.exit(1 if rejected else 0)

    summary = compute_summary(complete)
    record = {"summary": summary, "entries": complete}

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write("window.WC_HISTORY = [];\n")
        f.write("window.WC_TRACK_RECORD = ")
        json.dump(record, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print(f"\nOK -> {OUTPUT}")
    print(f"  {summary['n_games']} jogos | modelo v2 {summary['model_v2_pct']}% | "
          f"over2.5 {summary['over_2_5_pct']}% | btts {summary['btts_pct']}%")


if __name__ == "__main__":
    main()
