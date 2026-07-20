import { Pool } from 'pg'

let _pool: Pool | null = null

// Remove sslmode= da URL — passamos ssl via objeto abaixo. Silencia o warning
// do pg-connection-string sobre 'prefer'/'require'/'verify-ca'.
function cleanConnStr(url: string): string {
  try {
    const u = new URL(url)
    u.searchParams.delete('sslmode')
    return u.toString()
  } catch {
    return url.replace(/([?&])sslmode=[^&]*/g, '$1').replace(/[?&]$/, '')
  }
}

export function getPool(): Pool {
  if (!_pool) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')
    _pool = new Pool({
      connectionString: cleanConnStr(process.env.DATABASE_URL),
      max: 1,
      ssl: { rejectUnauthorized: false },
    })
  }
  return _pool
}
