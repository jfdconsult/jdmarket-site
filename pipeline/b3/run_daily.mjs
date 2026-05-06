// run_daily.mjs — Pipeline diário completo
// Sequência: rotina_v5 (30 público) → auditor_v1 → rotina_50 (50 privado)
// Executado automaticamente pelo Task Scheduler às 17:05 BRT (seg–sex)

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const LOG_PATH = path.join(__dir, 'logs', 'daily.log');

// garante pasta logs
if (!fs.existsSync(path.join(__dir, 'logs'))) {
  fs.mkdirSync(path.join(__dir, 'logs'));
}

function log(msg) {
  const ts = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const line = `[${ts}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_PATH, line + '\n');
}

function run(script) {
  const full = path.join(__dir, script);
  log(`▶ Iniciando ${script}...`);
  try {
    execSync(`node "${full}"`, {
      cwd: __dir,
      stdio: 'inherit',
      timeout: 15 * 60 * 1000, // 15 min max por script
    });
    log(`✅ ${script} concluído`);
    return true;
  } catch (e) {
    log(`❌ ${script} falhou: ${e.message.slice(0, 200)}`);
    return false;
  }
}

log('═'.repeat(50));
log('JD MARKET ANALYSIS — Pipeline Diário');
log('═'.repeat(50));

// ── 1. Base pública — 30 ativos fixos ─────────────────────────────────────────
log('── FASE 1: Base pública (30 ativos) ──');
const ok1 = run('rotina_v5.mjs');
if (ok1) {
  run('auditor_v1.mjs');
} else {
  log('⚠️  Auditoria cancelada — rotina_v5 falhou');
}

// ── 2. Base privada — Top 50 dinâmico ─────────────────────────────────────────
log('── FASE 2: Base privada (Top 50 dinâmico) ──');
const ok2 = run('rotina_50.mjs');

// ── 3. Al Brooks AB1-AB4 (8-framework consensus) ───────────────────────────────
log('── FASE 3: Al Brooks AB1-AB4 (data_ab.json) ──');
if (ok2) {
  run('rotina_ab.mjs');
} else {
  log('⚠️  AB rotina cancelada — rotina_50 falhou (data_50.json ausente ou corrompido)');
}

log('Pipeline encerrado');
log('═'.repeat(50));
