// setup_pipeline.mjs
// Copia os scripts do B3 ANALISYS local para pipeline/b3/
// Rode uma vez: node pipeline/setup_pipeline.mjs

import { cpSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))

const SRC = path.join(
  'C:', 'Users', 'jfdco', 'OneDrive', 'Área de Trabalho',
  'HARPIAN', 'B3 ANALISYS'
)
const DEST = path.join(__dir, 'b3')

const FILES = [
  'rotina_v5.mjs',
  'auditor_v1.mjs',
  'rotina_50.mjs',
  'rotina_ab.mjs',
  'run_daily.mjs',
  '.env.example',
]

if (!existsSync(SRC)) {
  console.error(`❌ Pasta não encontrada: ${SRC}`)
  process.exit(1)
}

mkdirSync(DEST, { recursive: true })
mkdirSync(path.join(DEST, 'logs'), { recursive: true })

let copied = 0
for (const file of FILES) {
  const src  = path.join(SRC, file)
  const dest = path.join(DEST, file)
  if (existsSync(src)) {
    cpSync(src, dest)
    console.log(`✅ ${file}`)
    copied++
  } else {
    console.warn(`⚠️  Não encontrado: ${file}`)
  }
}

console.log(`\n📁 ${copied} arquivo(s) copiado(s) para pipeline/b3/`)
console.log('Próximo: crie pipeline/b3/.env com HG_KEY, BRAPI_TOKEN, ANTHROPIC_KEY')
