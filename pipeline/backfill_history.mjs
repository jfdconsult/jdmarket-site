// backfill_history.mjs — Recupera as linhas perdidas na tabela asset_analyses.
// Para cada snapshot histórico (full_json), reescreve um arquivo temporário e
// roda o upload_to_neon.mjs JÁ CORRIGIDO (coerção int). Reusa 100% da lógica de
// produção, sem duplicar SQL e sem tocar no script noturno.
//
// Uso: node backfill_history.mjs   (precisa de DATABASE_URL no ambiente)
// NÃO revalida o site (não passamos SITE_URL) — é só recuperação de dados.

import { neon } from '@neondatabase/serverless'
import { execFileSync } from 'child_process'
import { writeFileSync, unlinkSync, mkdtempSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) { console.error('❌ DATABASE_URL não definido'); process.exit(1) }

const sql = neon(DATABASE_URL)
const uploadScript = path.join(__dir, 'upload_to_neon.mjs')
const tmp = mkdtempSync(path.join(tmpdir(), 'jdm-backfill-'))

console.log('🔄 Backfill iniciado — recuperando histórico da tabela normalizada\n')

const snaps = await sql`
  SELECT analysis_date::text AS d, full_json
  FROM daily_snapshots
  WHERE full_json IS NOT NULL
  ORDER BY analysis_date ASC`

let totalOk = 0, totalFail = 0
for (const s of snaps) {
  const tmpFile = path.join(tmp, `${s.d}.json`)
  writeFileSync(tmpFile, JSON.stringify(s.full_json))
  try {
    // Roda o upload de produção SEM SITE_URL (não revalida) — só DATABASE_URL.
    const out = execFileSync('node', [uploadScript, tmpFile], {
      env: { ...process.env, SITE_URL: '', REVALIDATE_SECRET: '' },
      encoding: 'utf8',
      timeout: 120000,
    })
    const m = out.match(/Upload concluído: (\d+) ativos salvos, (\d+) erros/)
    const ok = m ? +m[1] : 0, fail = m ? +m[2] : 0
    totalOk += ok; totalFail += fail
    console.log(` ${s.d} — ${ok} salvos, ${fail} erros ${fail === 0 ? '✅' : '⚠️'}`)
  } catch (e) {
    console.error(` ${s.d} — ❌ falhou: ${e.message?.slice(0, 100)}`)
  } finally {
    try { unlinkSync(tmpFile) } catch {}
  }
}

console.log(`\n📊 Total: ${totalOk} ativos processados, ${totalFail} erros`)
console.log('🔍 Verificando integridade final...\n')

const check = await sql`
  SELECT s.analysis_date::text AS d, s.asset_count AS snap, COUNT(a.ticker) AS tab
  FROM daily_snapshots s
  LEFT JOIN asset_analyses a ON a.analysis_date = s.analysis_date
  GROUP BY s.analysis_date, s.asset_count
  ORDER BY s.analysis_date DESC`
let gaps = 0
for (const r of check) {
  const gap = r.snap - Number(r.tab)
  if (gap > 0) gaps += gap
  console.log(` ${r.d} — snapshot:${r.snap} normalizada:${r.tab} ${gap > 0 ? `⚠️ faltam ${gap}` : '✅'}`)
}
console.log(`\n${gaps === 0 ? '✅ ZERO buracos — histórico íntegro' : `⚠️ Ainda faltam ${gaps} linhas`}`)
