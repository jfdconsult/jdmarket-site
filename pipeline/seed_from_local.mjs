// seed_from_local.mjs
// Importa os JSONs existentes em B3 ANALISYS para o Neon
// Uso: node pipeline/seed_from_local.mjs
// (rode uma vez para popular o banco com o histórico local)

import { execSync } from 'child_process'
import { readdirSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))

const B3_DIR = path.join(
  'C:', 'Users', 'jfdco', 'OneDrive', 'Área de Trabalho',
  'HARPIAN', 'B3 ANALISYS'
)

const UPLOAD_SCRIPT = path.join(__dir, 'upload_to_neon.mjs')

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL não definido. Crie um arquivo .env.local e rode com:')
  console.error('   node --env-file=.env.local pipeline/seed_from_local.mjs')
  process.exit(1)
}

// Candidatos: data_ab.json é o mais completo; fallback data_50.json
const candidates = ['data_ab.json', 'data_50.json']
let found = null
for (const c of candidates) {
  const p = path.join(B3_DIR, c)
  if (existsSync(p)) { found = p; break }
}

if (!found) {
  console.error(`❌ Nenhum JSON encontrado em ${B3_DIR}`)
  process.exit(1)
}

console.log(`🌱 Seed a partir de: ${found}`)
execSync(`node "${UPLOAD_SCRIPT}" "${found}"`, {
  stdio: 'inherit',
  env: process.env,
})
console.log('🌱 Seed concluído.')
