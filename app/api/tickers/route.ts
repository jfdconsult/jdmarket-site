import { NextResponse } from 'next/server'
import { getTickerRanking, getLatestSnapshot } from '@/lib/queries'

export const revalidate = 3600

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date') ?? undefined

  const [tickers, snapshot] = await Promise.all([
    getTickerRanking(date),
    getLatestSnapshot(),
  ])

  return NextResponse.json({ tickers, snapshot })
}
