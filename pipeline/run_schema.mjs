// Executa o schema.sql no Neon usando pg (node-postgres)
import pg from 'pg'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const { Client } = pg
const __dir = path.dirname(fileURLToPath(import.meta.url))
const schema = readFileSync(path.join(__dir, '..', 'lib', 'schema.sql'), 'utf8')

const client = new Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

try {
  await client.query(schema)
  console.log('✅ Schema criado com sucesso no Neon')
} finally {
  await client.end()
}
