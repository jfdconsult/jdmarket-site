# -*- coding: utf-8 -*-
"""One-off: registra fx9 (Alemanha 7-1 Curaçao) e fx10 (Holanda 2-2 Japão).
Atualiza history_data.json + marca full_time no dashboard_data_v3.js + roda build_history."""
import json, re, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))

def outcome(h, a):
    return "home" if h > a else ("away" if h < a else "draw")

def predicted(d):
    return max(d, key=lambda k: d[k])

# ---------- entradas dos 2 jogos ----------
fx9 = {
    "fixture_id": "9", "event_name": "Alemanha x Curaçao",
    "home_team": "Germany", "away_team": "Curaçao",
    "kickoff": "14/06 14:00", "referee": "Jalal Jayed",
    "score": "7-1", "home_score": 7, "away_score": 1, "actual_outcome": "home",
    "model_v2_1x2_pct": {"home": 65.9, "draw": 19.4, "away": 14.7},
    "model_v3_1x2_pct": {"home": 66.4, "draw": 19.2, "away": 14.5},
    "v3_predictions": {"over_2_5_pct": 62.7, "btts_yes_pct": 55.9,
                       "expected_yellows": 3.24, "p_red_pct": 23.0, "p_penalty_pct": 16.6},
    "market_1x2_pct": {"home": 92.4, "draw": 5.3, "away": 2.3},
    "prediction_1x2_pct": {},
    "prediction_meta": {"source": "manifold", "volume": 0, "url": "", "has_data": False},
    "consensus_1x2_pct": {"home": 88.9, "draw": 8.3, "away": 2.8},
    "v2_date": "14/06/2026", "v2_time": "14:00",
    "actual_xg": {"home": 3.90, "away": 0.40},
    "model_xg": {"home": 2.2396, "away": 0.9682},
    "actual_yellows": 0, "actual_reds": 0,
    "goals": [
        {"team": "Germany", "scorer": "Felix Nmecha", "minute": "6'"},
        {"team": "Curaçao", "scorer": "Livano Comenencia", "minute": "21'"},
        {"team": "Germany", "scorer": "Nico Schlotterbeck", "minute": "38'"},
        {"team": "Germany", "scorer": "Kai Havertz (pen)", "minute": "45'+5'"},
        {"team": "Germany", "scorer": "Jamal Musiala", "minute": "47'"},
        {"team": "Germany", "scorer": "Nathaniel Brown", "minute": "68'"},
        {"team": "Germany", "scorer": "Deniz Undav", "minute": "78'"},
        {"team": "Germany", "scorer": "Kai Havertz", "minute": "88'"},
    ],
    "cards": [],
}
fx10 = {
    "fixture_id": "10", "event_name": "Holanda x Japão",
    "home_team": "Netherlands", "away_team": "Japan",
    "kickoff": "14/06 17:00", "referee": "Ismail Elfath",
    "score": "2-2", "home_score": 2, "away_score": 2, "actual_outcome": "draw",
    "model_v2_1x2_pct": {"home": 27.3, "draw": 27.2, "away": 45.5},
    "model_v3_1x2_pct": {"home": 27.0, "draw": 27.1, "away": 45.8},
    "v3_predictions": {"over_2_5_pct": 45.6, "btts_yes_pct": 50.1,
                       "expected_yellows": 3.59, "p_red_pct": 24.6, "p_penalty_pct": 15.5},
    "market_1x2_pct": {"home": 51.2, "draw": 24.5, "away": 24.2},
    "prediction_1x2_pct": {},
    "prediction_meta": {"source": "manifold", "volume": 0, "url": "", "has_data": False},
    "consensus_1x2_pct": {"home": 49.2, "draw": 24.9, "away": 25.8},
    "v2_date": "14/06/2026", "v2_time": "17:00",
    "actual_xg": {"home": 0.79, "away": 0.54},
    "model_xg": {"home": 1.0553, "away": 1.4403},
    "actual_yellows": 1, "actual_reds": 0,
    "goals": [
        {"team": "Netherlands", "scorer": "Virgil van Dijk", "minute": "51'"},
        {"team": "Japan", "scorer": "Keito Nakamura", "minute": "57'"},
        {"team": "Netherlands", "scorer": "Crysencio Summerville", "minute": "64'"},
        {"team": "Japan", "scorer": "Daichi Kamada", "minute": "88'"},
    ],
    "cards": [{"team": "Netherlands", "player": "Micky van de Ven", "type": "yellow", "minute": "90'+1'"}],
}

# derive hit + over/btts
for e in (fx9, fx10):
    e["model_v2_predicted"] = predicted(e["model_v2_1x2_pct"])
    e["model_v2_pct"] = e["model_v2_1x2_pct"][e["model_v2_predicted"]]
    e["model_v2_hit"] = (e["model_v2_predicted"] == e["actual_outcome"])
    e["model_v3_predicted"] = predicted(e["model_v3_1x2_pct"])
    e["model_v3_pct"] = e["model_v3_1x2_pct"][e["model_v3_predicted"]]
    e["model_v3_hit"] = (e["model_v3_predicted"] == e["actual_outcome"])
    tot = e["home_score"] + e["away_score"]
    e["over_2_5_hit"] = tot > 2.5
    e["btts_hit"] = (e["home_score"] > 0 and e["away_score"] > 0)
    e["captured_at"] = None

# ---------- 1) history_data.json ----------
hp = os.path.join(HERE, "history_data.json")
data = json.load(open(hp, encoding="utf-8"))
entries = [x for x in data["entries"] if str(x.get("fixture_id")) not in ("9", "10")]
entries.extend([fx9, fx10])
data["entries"] = entries
json.dump(data, open(hp, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("history_data.json: agora com", len(entries), "jogos")

# ---------- 2) dashboard_data_v3.js: marca full_time fx9/fx10 ----------
vp = os.path.join(HERE, "dashboard_data_v3.js")
raw = open(vp, encoding="utf-8").read()
mprefix = re.match(r'^(.*?=\s*)', raw, re.S).group(1)
m = re.search(r'=\s*(\{.*\})\s*;', raw, re.S)
v3 = json.loads(m.group(1))
fill = {
    "9": {"home_score": 7, "away_score": 1, "referee": "Jalal Jayed",
          "goals": fx9["goals"], "cards": fx9["cards"]},
    "10": {"home_score": 2, "away_score": 2, "referee": "Ismail Elfath",
           "goals": fx10["goals"], "cards": fx10["cards"]},
}
for f in v3.get("fixtures", []):
    fid = str(f.get("fixture_id"))
    if fid in fill:
        fr = f.get("fifa_result") or {}
        fr["status"] = "full_time"
        fr.update(fill[fid])
        f["fifa_result"] = fr
        # tambem no discipline_block.fifa_result se existir
        db = f.get("discipline_block")
        if isinstance(db, dict) and isinstance(db.get("fifa_result"), dict):
            db["fifa_result"].update({"status": "full_time", **fill[fid]})
with open(vp, "w", encoding="utf-8") as fo:
    fo.write(mprefix)
    json.dump(v3, fo, ensure_ascii=False, indent=2)
    fo.write(";\n")
print("dashboard_data_v3.js: fx9 e fx10 marcados full_time")

# ---------- 3) build_history ----------
r = subprocess.run([sys.executable, os.path.join(HERE, "build_history.py")],
                   capture_output=True, text=True, cwd=HERE)
print(r.stdout)
if r.returncode != 0:
    print("STDERR:", r.stderr)
