import { notFound } from 'next/navigation'
import { getTickerAnalysis, getTickerHistory, getLatestDate } from '@/lib/queries'
import RaioXClient from './RaioXClient'
import type { RxData, RxHist } from './RaioXClient'

export const revalidate = 300

export default async function TickerPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params
  const t = ticker.toUpperCase()

  const latest = await getLatestDate()
  const [analysis, history] = await Promise.all([
    getTickerAnalysis(t, latest ?? undefined),
    getTickerHistory(t, 60),
  ])

  if (!analysis) notFound()

  return <RaioXClient d={analysis as unknown as RxData} history={history as unknown as RxHist[]} />
}
