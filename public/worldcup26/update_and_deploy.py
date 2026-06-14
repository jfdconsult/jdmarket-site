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
    print(line)
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


def run_pipeline() -> bool:
    """Run bet_math.py dashboard command."""
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


BUILD_HISTORY = os.path.join(DEPLOY_DIR, "build_history.py")


def build_history() -> bool:
    """Regenerate dashboard_history.js from the canonical history_data.json.

    IMPORTANTE: o histórico é GERADO aqui, nunca copiado de uma cópia velha.
    Foi exatamente a cópia de fonte velha que apagava jogos no passado.
    O gerador valida e recusa publicar jogo incompleto."""
    if not os.path.exists(BUILD_HISTORY):
        log("  build_history.py ausente — pulando geração de histórico")
        return True
    log("Gerando histórico (build_history.py)...")
    try:
        result = subprocess.run(
            [sys.executable, BUILD_HISTORY],
            capture_output=True, text=True, timeout=60, cwd=DEPLOY_DIR,
        )
        log(f"  {result.stdout.strip()[:300]}")
        if result.returncode != 0 and result.stderr:
            log(f"  history stderr: {result.stderr.strip()[:200]}")
        return True
    except Exception as e:
        log(f"  build_history ERRO: {e}")
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
        # Stage worldcup26 files (dados, histórico gerado, fonte canônica e gerador)
        subprocess.run(["git", "add",
                        "public/worldcup26/dashboard_data.js",
                        "public/worldcup26/dashboard_data_v3.js",
                        "public/worldcup26/dashboard_history.js",
                        "public/worldcup26/history_data.json",
                        "public/worldcup26/build_history.py"],
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


def main():
    log("=" * 60)
    log("JD-BET World Cup 2026 — Update & Deploy")

    # Check if game is in progress
    if is_game_in_progress():
        log("⚠️ JOGO EM ANDAMENTO — atualização suspensa (economia de processamento)")
        return

    # 1. Run the analysis pipeline
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
