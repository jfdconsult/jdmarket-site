// Fase 3 — virada de chave: home agora é o painel de inteligência React.
// Desktop = IntelClient com Header. Mobile = MobileApp (shell com bottom nav).
import { getSignalRows, getRecentAnalysisDates, getLatestPulse } from '@/lib/queries'
import { buildMovers, buildMatrix } from '@/lib/intelligence'
import Header from '@/components/Header'
import IntelClient from './v2/IntelClient'
import MobileApp from '@/components/MobileApp'

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

  const updated = pulse?.generated_at
    ? new Date(pulse.generated_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : '—'

  return (
    <>
      {/* Desktop / tablet grande */}
      <div className="desktop-shell">
        <Header />
        <IntelClient
          matrix={matrix}
          movers={movers}
          pulse={pulse}
          currentDate={dates[0] ?? null}
          prevDate={dates[1] ?? null}
        />
      </div>

      {/* Mobile — shell de aplicativo */}
      <MobileApp
        matrix={matrix}
        movers={movers}
        pulse={pulse}
        prevDate={dates[1] ?? null}
        updated={updated}
      />
    </>
  )
}
