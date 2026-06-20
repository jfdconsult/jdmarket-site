"""
daily_full_update.py — pipeline diário completo do JD-BET
=========================================================
Rodado pela rotina das 04:00 BRT (Task Scheduler / scheduled task).

Etapas (em ordem; cada uma é log-de-vez e tolera falha das proximas):
  1. bet_math.py dashboard            -> dashboard_data.js (motor v2)
  2. bet_math_v3_discipline.py        -> dashboard_data_v3.js (disciplina+arbitro)
  3. update_history.py refresh        -> predictions_log.json + dashboard_history.js
                                        (registra automaticamente acertos/erros)
  4. git add + commit + push          -> auto-deploy Vercel
  5. log resumido em daily_log.txt    -> auditoria
"""

import json
import os
import re
import subprocess
import sys
from datetime import datetime
from typing import Tuple

HERE = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(HERE, "daily_log.txt")
REPO_DIR = r"C:\dev\jdmarket-site"
DEPLOY_DIR = r"C:\dev\jdmarket-site\public\worldcup26"


def log(msg: str) -> None:
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def run_step(name: str, script: str, args=None) -> Tuple[bool, str]:
    args = args or []
    cmd = [sys.executable, os.path.join(HERE, script)] + args
    log(f"--> {name}: {' '.join(cmd[1:])}")
    try:
        r = subprocess.run(cmd, capture_output=True, text=True,
                           timeout=300, cwd=HERE)
        if r.returncode == 0:
            tail = (r.stdout or "").strip().split("\n")[-3:]
            log(f"    OK -- {' | '.join(tail)[:200]}")
            return True, r.stdout
        log(f"    FAIL rc={r.returncode} -- {(r.stderr or '')[:300]}")
        return False, r.stderr
    except subprocess.TimeoutExpired:
        log(f"    TIMEOUT depois de 300s")
        return False, "timeout"
    except Exception as e:
        log(f"    EXCEPTION {e}")
        return False, str(e)


def bump_cache_version() -> bool:
    """Carimba ?v=<timestamp> nos <script> de dados do index.html para
    forcar o navegador/CDN a baixar a versao nova a cada deploy (evita o
    site ficar 'preso' numa versao antiga em cache — ex.: sem nomes)."""
    idx = os.path.join(DEPLOY_DIR, "index.html")
    try:
        ver = datetime.now().strftime("%Y%m%d%H%M%S")
        with open(idx, "r", encoding="utf-8") as f:
            html = f.read()
        new = re.sub(r'(/worldcup26/dashboard_[a-z0-9_]+\.js)(\?v=\d+)?',
                     lambda m: m.group(1) + "?v=" + ver, html)
        if new != html:
            with open(idx, "w", encoding="utf-8") as f:
                f.write(new)
            log(f"--> cache-busting: index.html carimbado v={ver}")
        else:
            log("--> cache-busting: nenhuma tag de dados encontrada (sem mudanca)")
        return True
    except Exception as e:
        log(f"    bump_cache_version EXCEPTION {e}")
        return False


def git_push() -> bool:
    log("--> git push: pre-deploy do jdmarket-site")
    try:
        files = ["public/worldcup26/dashboard_data.js",
                 "public/worldcup26/dashboard_data_v3.js",
                 "public/worldcup26/dashboard_history.js",
                 "public/worldcup26/index.html"]
        subprocess.run(["git", "add"] + files,
                       cwd=REPO_DIR, capture_output=True, timeout=30)
        status = subprocess.run(["git", "status", "--porcelain",
                                 "public/worldcup26/"],
                                cwd=REPO_DIR, capture_output=True,
                                text=True, timeout=30)
        if not status.stdout.strip():
            log("    Nada para commitar (dados inalterados)")
            return True
        ts = datetime.now().strftime("%d/%m %H:%M")
        msg = f"worldcup26: atualizacao diaria 4am {ts}"
        subprocess.run(["git", "commit", "-m", msg],
                       cwd=REPO_DIR, capture_output=True, timeout=30)
        r = subprocess.run(["git", "push"], cwd=REPO_DIR,
                           capture_output=True, text=True, timeout=60)
        if r.returncode == 0:
            log("    Push OK -> Vercel deploy disparado")
            return True
        log(f"    Push FAIL: {(r.stderr or '')[:200]}")
        return False
    except Exception as e:
        log(f"    Git EXCEPTION {e}")
        return False


def main():
    log("=" * 68)
    log("DAILY FULL UPDATE - inicio")

    summary = {}

    ok, _ = run_step("(1) v2 dashboard", "bet_math.py", ["dashboard"])
    summary["v2_dashboard"] = ok

    ok, _ = run_step("(2) v3 enrich-dashboard",
                     "bet_math_v3_discipline.py", ["enrich-dashboard"])
    summary["v3_enrich"] = ok

    ok, out = run_step("(3) update_history refresh",
                       "update_history.py", ["refresh"])
    summary["update_history"] = ok
    if ok:
        try:
            jblock = out[out.index("{"):]
            summary["history_summary"] = json.loads(jblock)
        except Exception:
            pass

    bump_cache_version()

    ok = git_push()
    summary["git_push"] = ok

    log("Resumo: " + json.dumps(summary, ensure_ascii=False))
    log("DAILY FULL UPDATE - fim")
    log("=" * 68)


if __name__ == "__main__":
    main()
