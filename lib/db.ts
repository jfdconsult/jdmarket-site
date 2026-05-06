import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let _sql: NeonQueryFunction<false, false> | null = null

export function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set')
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

// Convenience proxy — same API as before but lazy
export const sql = new Proxy({} as NeonQueryFunction<false, false>, {
  apply(_t, _thisArg, args) {
    return (getSql() as unknown as (...a: unknown[]) => unknown)(...args)
  },
  get(_t, prop) {
    return (getSql() as unknown as Record<string | symbol, unknown>)[prop]
  },
}) as NeonQueryFunction<false, false>
