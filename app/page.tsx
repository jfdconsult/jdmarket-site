// Fase 3 â€” virada de chave: home agora Ã© o painel de inteligÃªncia React.
// Scanner.html antigo removido — esta agora e a unica home oficial.
import { getSignalRows, getRecentAnalysisDates, getLatestPulse } from '@/lib/queries'
import { buildMovers, buildMatrix } from '@/lib/intelligence'
import Header from '@/components/Header'
import IntelClient from './v2/IntelClient'

export const revalidate = 300

export default async function HomePage() {
  const dates = await getRecentAnalysisDates(3)
  const [today, prev, prev2, pulse] = await Promise.all([
    getSignalRows(dates[0]),
    dates[1] ? getSignalRows(dates[1]) : Promise.resolve([]),
    dates[2] ? getSignalRows(dates[2]) : Promise.resolve([]),
    getLatestPulse(),
  ])

  const movers = buildMovers(today, prev)
  const matrix = buildMatrix(today, prev, prev2)

  return (
    <>
      <Header />
      <IntelClient
        matrix={matrix}
        movers={movers}
        pulse={pulse}
        currentDate={dates[0] ?? null}
        prevDate={dates[1] ?? null}
      />
    </>
  )
}
