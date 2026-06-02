import { getRankingDetailed, getLatestPulse } from '@/lib/queries'
import Header from '@/components/Header'
import ScannerClient from './ScannerClient'

// Preview da nova tela React (Fase 2). A home oficial segue no scanner.html
// até a "virada de chave" (Fase 3) ser aprovada.
export const revalidate = 300

export default async function V2Page() {
  const [rows, pulse] = await Promise.all([
    getRankingDetailed(),
    getLatestPulse(),
  ])

  return (
    <>
      <Header />
      <ScannerClient rows={rows} pulse={pulse} />
    </>
  )
}
