import { NextResponse } from 'next/server'
import { getTickerAnalysis, getTickerHistory } from '@/lib/queries'

export const revalidate = 3600

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get('ticker')
  const date = searchParams.get('date') ?? undefined
  const history = searchParams.get('history') === 'true'

  if (!ticker) {
    return NextResponse.json({ error: 'ticker is required' }, { status: 400 })
  }

  if (history) {
    const rows = await getTickerHistory(ticker)
    return NextResponse.json({ ticker: ticker.toUpperCase(), history: rows })
  }

  const analysis = await getTickerAnalysis(ticker, date)
  if (!analysis) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  return NextResponse.json(analysis)
}
