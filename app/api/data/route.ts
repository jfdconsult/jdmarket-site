import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { rows } = await getPool().query(
    'SELECT full_json FROM daily_snapshots WHERE full_json IS NOT NULL ORDER BY analysis_date DESC LIMIT 1'
  )
  if (!rows[0]?.full_json) {
    return NextResponse.json({ error: 'Nenhuma análise disponível ainda.' }, { status: 404 })
  }
  return NextResponse.json(rows[0].full_json, {
    headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
  })
}
