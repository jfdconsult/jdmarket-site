"""
JD-BET World Cup 2026 — Atualização automática + Deploy
=========================================================
Roda 2x/dia (manhã 08:00 + tarde 14:00 BRT) via Task Scheduler.
Bloqueio automático durante jogos (16:00-24:00 em dias de jogo).

Fluxo:
  1. Roda bet_math.py dashboard → gera dashboard_data.js
  2. Copia para C:\dev\jdmarket-site\public\worldcup26\
  3. Git commit + push → Vercel redeploy automático
"""

import subprocess
import sys
import os
import shutil
import json
from datetime import datetime

# Paths
BET_MATH = r"C:\Users\jfdco\.claude\skills\world-cup-bet-intelligence-engine\scripts\bet_math.py"
PAINEL_DIR = r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\PAINEL DE APOSTAS"
DEPLOY_DIR = r"C:\dev\jdmarket-site\public\worldcup26"
REPO_DIR = r"C:\dev\jdmarket-site"
LOG_FILE = r"C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\PAINEL DE APOSTAS\update_log.txt"

# Game schedule: dates with games and their kickoff times (BRT)
# Update this as the tournament progresses
GAME_DAYS = {
    "2026-06-11": ["16:00"],          # México x África do Sul
    "2026-06-11": ["16:00", "23:00"], # + Coreia x Tcheca
    "2026-06-12": ["16:00", "22:00"], # Canadá x Bósnia, EUA x Paraguai
    "2026-06-13": ["16:00", "19:00", "22:00"],  # Qatar x Suíça, Brasil x Marrocos, Haiti x Escócia
    # Add more as schedule is confirmed
}


def log(msg: str):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    try:
        print(line)
    except UnicodeEncodeError:
        # console Windows (cp1252) não encoda emoji — não pode derrubar o pipeline
        print(line.encode("ascii", "replace").decode("ascii"))
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def is_game_in_progress() -> bool:
    """Check if any game is currently in progress (kickoff to +3h window)."""
    now = datetime.now()
    today = now.strftime("%Y-%m-%d")
    if today not in GAME_DAYS:
        return False
    current_time = now.hour * 60 + now.minute
    for kickoff in GAME_DAYS[today]:
        h, m = map(int, kickoff.split(":"))
        start = h * 60 + m - 15   # 15 min before kickoff
        end = h * 60 + m + 180    # 3 hours after kickoff
        if start <= current_time <= end:
            return True
    return False


def auto_calibrate() -> None:
    """Calibração contínua do rho (shrinkage Bayesiano) ANTES de gerar o dashboard,
    para o modelo já sair com o parâmetro de empate reajustado à evidência atual."""
    script = os.path.join(os.path.dirname(BET_MATH), "auto_calibrate.py")
    if not os.path.isfile(script):
        return
    log("Calibrando modelo (auto_calibrate.py)...")
    try:
        r = subprocess.run([sys.executable, script], capture_output=True,
                           text=True, timeout=90, cwd=os.path.dirname(BET_MATH))
        out = (r.stdout or r.stderr).strip().replace("\n", " ")
        log(f"  calib: {out[:200]}")
    except Exception as e:
        log(f"  auto_calibrate ERRO: {e}")


def run_pipeline() -> bool:
    """Calibra o rho, roda bet_math dashboard e regenera o v3 reconciliado."""
    auto_calibrate()
    log("Running bet_math.py dashboard...")
    try:
        result = subprocess.run(
            [sys.executable, BET_MATH, "dashboard"],
            capture_output=True, text=True, timeout=120,
            cwd=os.path.dirname(BET_MATH)
        )
        if result.returncode == 0:
            log(f"Pipeline OK: {result.stdout.strip()[:200]}")
            # Regenera o v3 a partir do MESMO dashboard recém-gerado -> motores
            # reconciliados (v3 usa o xG calibrado do motor principal).
            v3 = os.path.join(os.path.dirname(BET_MATH), "bet_math_v3_discipline.py")
            if os.path.isfile(v3):
                try:
                    r2 = subprocess.run([sys.executable, v3, "enrich-dashboard"],
                                        capture_output=True, text=True, timeout=180,
                                        cwd=os.path.dirname(BET_MATH))
                    log(f"  v3 enrich: {(r2.stdout or r2.stderr).strip()[:160]}")
                except Exception as e:
                    log(f"  v3 enrich ERRO: {e}")
            return True
        else:
            log(f"Pipeline FAILED: {result.stderr.strip()[:300]}")
            return False
    except Exception as e:
        log(f"Pipeline ERROR: {e}")
        return False




def _parse_match_dt(date_s: str, time_s: str):
    """Parse dd/mm/yyyy + HH:MM as local naive datetime; return None on bad rows."""
    try:
        d, m, y = [int(x) for x in (date_s or "").split("/")]
        hh, mm = [int(x) for x in (time_s or "00:00").split(":")[:2]]
        return datetime(y, m, d, hh, mm)
    except Exception:
        return None


def _load_js_object(path: str):
    with open(path, "r", encoding="utf-8") as f:
        txt = f.read()
    return json.loads(txt.split("=", 1)[1].strip().rstrip(";"))


def _write_js_object(path: str, var_name: str, data) -> None:
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"window.{var_name} = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n")


def filter_active_scope_now_72h() -> None:
    """Mantém o painel ao vivo em agora -> próximas 72h."""
    now = datetime.now()
    scope_end = now + __import__("datetime").timedelta(hours=72)
    active_names = set()
    data_path = os.path.join(PAINEL_DIR, "dashboard_data.js")
    if os.path.isfile(data_path):
        data = _load_js_object(data_path)
        games = data.get("games", [])
        filtered = []
        for g in games:
            dt = _parse_match_dt(g.get("date", ""), g.get("time", ""))
            if dt and now <= dt <= scope_end:
                filtered.append(g)
                active_names.add(g.get("match", ""))
        data["games"] = filtered
        data["n_games"] = len(filtered)
        data["generated_at"] = now.strftime("%d/%m/%Y %H:%M")
        data["active_scope"] = {"mode": "rolling_now_next_72h", "scope_start": now.isoformat(timespec="seconds"), "scope_end": scope_end.isoformat(timespec="seconds"), "original_games_before_filter": len(games), "note": "Jogos iniciados/finalizados removidos do painel ativo; histórico permanece em dashboard_history.js."}
        _write_js_object(data_path, "WC_DATA", data)
        log(f"  Rolling 72h aplicado em dashboard_data.js: {len(games)} -> {len(filtered)} jogos")
    v3_path = os.path.join(PAINEL_DIR, "dashboard_data_v3.js")
    if os.path.isfile(v3_path):
        data3 = _load_js_object(v3_path)
        fixtures = data3.get("fixtures", [])
        filtered3 = []
        for f in fixtures:
            name = f.get("event_name") or f.get("match") or ""
            dt = _parse_match_dt(f.get("date", ""), f.get("time", ""))
            if (dt and now <= dt <= scope_end) or (name in active_names):
                filtered3.append(f)
        data3["fixtures"] = filtered3
        data3["n"] = len(filtered3)
        data3["active_scope"] = {"mode": "rolling_now_next_72h", "scope_start": now.isoformat(timespec="seconds"), "scope_end": scope_end.isoformat(timespec="seconds"), "original_fixtures_before_filter": len(fixtures)}
        _write_js_object(v3_path, "WC_DATA_V3", data3)
        log(f"  Rolling 72h aplicado em dashboard_data_v3.js: {len(fixtures)} -> {len(filtered3)} fixtures")

UPDATE_HISTORY = os.path.join(os.path.dirname(BET_MATH), "update_history.py")


def build_history() -> bool:
    """Regenera dashboard_history.js pela ROTINA OFICIAL (update_history.py),
    que lê o predictions_log.json (fonte única), pula jogos futuros (anti-fantasma)
    e preserva os árbitros pesquisados. Substituiu o fork build_history.py."""
    if not os.path.exists(UPDATE_HISTORY):
        log("  update_history.py ausente — pulando geração de histórico")
        return True
    log("Gerando histórico (update_history.py refresh)...")
    try:
        result = subprocess.run(
            [sys.executable, UPDATE_HISTORY, "refresh"],
            capture_output=True, text=True, timeout=120,
            cwd=os.path.dirname(UPDATE_HISTORY),
        )
        log(f"  {(result.stdout or result.stderr).strip()[:250]}")
        return True
    except Exception as e:
        log(f"  update_history ERRO: {e}")
        return False


def sync_deploy_files():
    """Sync ONLY the engine-generated predictions from the panel as a fallback.

    NUNCA copia dashboard_history.js nem index.html do PAINEL — esses são
    mantidos no repositório (deploy dir) e o histórico é gerado, não copiado.
    Assim o pipeline não sobrescreve mais as atualizações manuais."""
    os.makedirs(DEPLOY_DIR, exist_ok=True)
    for fname in ["dashboard_data.js", "dashboard_data_v3.js"]:
        src = os.path.join(PAINEL_DIR, fname)
        dst = os.path.join(DEPLOY_DIR, fname)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            log(f"  Synced {fname}")


def git_push() -> bool:
    """Commit and push changes to GitHub (triggers Vercel deploy)."""
    log("Git commit + push...")
    try:
        os.chdir(REPO_DIR)
        # Stage TODOS os arquivos do worldcup26 (a forma de diretório evita o bug
        # de pathspec inexistente — listar arquivos apagados fazia o git add falhar
        # e o dashboard novo não era commitado).
        subprocess.run(["git", "add", "public/worldcup26/"],
                       capture_output=True, timeout=30)
        # Check if there are changes to commit
        status = subprocess.run(["git", "status", "--porcelain", "public/worldcup26/"],
                                capture_output=True, text=True, timeout=30)
        if not status.stdout.strip():
            log("No changes to commit — data unchanged")
            return True
        # Commit
        ts = datetime.now().strftime("%d/%m %H:%M")
        msg = f"worldcup26: atualização automática {ts}"
        subprocess.run(["git", "commit", "-m", msg], capture_output=True, timeout=30)
        # Push
        result = subprocess.run(["git", "push"], capture_output=True, text=True, timeout=60)
        if result.returncode == 0:
            log("Push OK — Vercel deploy triggered")
            return True
        else:
            log(f"Push FAILED: {result.stderr.strip()[:200]}")
            return False
    except Exception as e:
        log(f"Git ERROR: {e}")
        return False


def register_results() -> None:
    """Busca resultados de jogos encerrados na ESPN (auto_post_match) ANTES de
    tudo, para o histórico e a calibração já saírem com os jogos mais recentes.
    Faz deste script o MESTRE único do ciclo (resultados→odds→calib→hist→push)."""
    script = os.path.join(os.path.dirname(BET_MATH), "auto_post_match.py")
    if not os.path.isfile(script):
        return
    log("Registrando resultados encerrados (auto_post_match check)...")
    try:
        r = subprocess.run([sys.executable, script, "check"], capture_output=True,
                           text=True, timeout=180, cwd=os.path.dirname(script))
        tail = (r.stdout or r.stderr).strip().splitlines()
        log(f"  {tail[-1][:180] if tail else 'sem saída'}")
    except Exception as e:
        log(f"  auto_post_match ERRO: {e}")


def main():
    log("=" * 60)
    log("JD-BET World Cup 2026 — Update & Deploy (mestre)")

    # 0. Resultados da ESPN (jogos encerrados) — fonte sempre fresca p/ o ZOLTAR
    register_results()

    # 1. Run the analysis pipeline (calibra rho + dashboard + v3 reconciliado)
    if not run_pipeline():
        log("❌ Pipeline falhou — abortando deploy")
        return

    # 2. Sync engine predictions to deploy directory (NÃO toca no histórico)
    sync_deploy_files()

    # 3. Regenera o histórico a partir da fonte canônica (com validação)
    build_history()

    # 4. Git push to trigger Vercel deploy
    git_push()

    log("✅ Atualização completa")
    log("=" * 60)


if __name__ == "__main__":
    main()
