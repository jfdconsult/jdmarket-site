// migrate_ex_score.mjs
// Adiciona colunas de EX Score na tabela asset_analyses do Neon
// Uso: node pipeline/migrate_ex_score.mjs
// Variável de ambiente: DATABASE_URL

import pg from 'pg'
const { Client } = pg

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) { console.error('❌ DATABASE_URL não definido'); process.exit(1) }

async function main() {
  const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } })
  await client.connect()
  console.log('🔧 Iniciando migration EX Score...')

  const migrations = [
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex_score INTEGER`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex_classification VARCHAR(20)`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex_bottom_score INTEGER`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex1_rsi_days BOOLEAN`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex2_near_52w_high BOOLEAN`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex3_rsi_divergence BOOLEAN`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex4_macd_decay BOOLEAN`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex5_vol_exhaustion BOOLEAN`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ex_override_triggered VARCHAR(20)`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS rsi_divergence VARCHAR(10)`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS macd_hist_slope VARCHAR(10)`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS vol_exhaustion VARCHAR(30)`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ab2_score_slope VARCHAR(10)`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ab4_ex_override BOOLEAN`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS ab4_pre_reversal_flag BOOLEAN`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS candle_ex_badge VARCHAR(30)`,
    `ALTER TABLE asset_analyses ADD COLUMN IF NOT EXISTS candle_ex_override VARCHAR(20)`,
  ]

  for (const stmt of migrations) {
    const col = stmt.match(/ADD COLUMN IF NOT EXISTS (\w+)/)?.[1] ?? stmt
    try {
      await client.query(stmt)
      console.log(`  ✅ ${col}`)
    } catch (e) {
      console.error(`  ❌ ${col}: ${e.message?.slice(0, 100)}`)
    }
  }

  await client.end()
  console.log('✅ Migration concluída')
}

main().catch(e => { console.error(e); process.exit(1) })
