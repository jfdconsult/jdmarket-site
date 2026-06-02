import { notFound } from 'next/navigation'
import { getAssetFull, getTickerHistory, getYahooHistory } from '@/lib/queries'
import RaioXClient from './RaioXClient'
import type { RxHist } from './RaioXClient'

export const revalidate = 300

export default async function TickerPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params
  const t = ticker.toUpperCase()

  const [asset, jdHistory, yahooHistory] = await Promise.all([
    getAssetFull(t),
    getTickerHistory(t, 60),
    getYahooHistory(t, 6),
  ])

  if (!asset) notFound()

  return (
    <RaioXClient
      a={asset}
      history={jdHistory as unknown as RxHist[]}
      priceHistory={yahooHistory}
    />
  )
}
