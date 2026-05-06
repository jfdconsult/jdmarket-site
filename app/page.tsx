import { getTickerRanking, getLatestSnapshot } from '@/lib/queries'
import Header from '@/components/Header'
import RatingBadge from '@/components/RatingBadge'
import Link from 'next/link'
import type { TickerSummary, Rating } from '@/lib/types'

export const revalidate = 3600

function fmt(n: number | null | undefined, decimals = 2): string {
  if (n == null) return '—'
  return Number(n).toFixed(decimals)
}

function pctColor(n: number): string {
  if (n > 0) return 'var(--green)'
  if (n < 0) return 'var(--red)'
  return 'var(--text-muted)'
}

function riskColor(score: number): string {
  if (score <= 3) return 'var(--green)'
  if (score <= 5) return 'var(--yellow)'
  if (score <= 7) return '#F97316'
  return 'var(--red)'
}

export default async function HomePage() {
  let tickers: TickerSummary[] = []
  let snapshot = null
  let error = ''

  try {
    ;[tickers, snapshot] = await Promise.all([getTickerRanking(), getLatestSnapshot()])
  } catch (e) {
    error = 'Banco de dados não configurado. Adicione DATABASE_URL ao .env.local.'
    console.error(e)
  }

  const groups: Record<string, TickerSummary[]> = {
    STRONG_BUY: [],
    BUY: [],
    NEUTRAL: [],
    SELL: [],
    STRONG_SELL: [],
  }
  for (const t of tickers) {
    const key = (t.consensus_signal ?? t.rating) as string
    if (key in groups) groups[key].push(t)
    else groups['NEUTRAL'].push(t)
  }

  const dateStr = snapshot
    ? new Date((snapshot.analysis_date as string) + 'T00:00:00-03:00').toLocaleDateString('pt-BR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
      })
    : null

  return (
    <>
      <Header />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: 26,
            fontWeight: 700,
            color: 'var(--gold)',
            margin: '0 0 6px',
            letterSpacing: '0.02em',
          }}>
            Ranking de Análise — B3
          </h1>
          {dateStr && (
            <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
              Análise de {dateStr}
              {snapshot && (
                <span style={{ marginLeft: 16 }}>
                  Ibovespa{' '}
                  <span style={{ color: pctColor(Number(snapshot.ibovespa_change)) }}>
                    {Number(snapshot.ibovespa_price).toLocaleString('pt-BR')}
                    {' ('}
                    {Number(snapshot.ibovespa_change) > 0 ? '+' : ''}
                    {fmt(Number(snapshot.ibovespa_change))}{'%)'}
                  </span>
                  {'  ·  '}USD/BRL{' '}
                  <span style={{ color: pctColor(Number(snapshot.usdbrl_change)) }}>
                    R${fmt(Number(snapshot.usdbrl_price), 4)}
                  </span>
                </span>
              )}
            </p>
          )}
        </div>

        {error && (
          <div style={{
            background: '#EF44441A', border: '1px solid #EF444455',
            borderRadius: 8, padding: '16px 20px', marginBottom: 24,
            color: '#FCA5A5', fontSize: 13,
          }}>
            {error}
          </div>
        )}

        {tickers.length === 0 && !error && (
          <div style={{
            textAlign: 'center', padding: '80px 20px',
            color: 'var(--text-muted)', fontSize: 15,
          }}>
            Nenhuma análise disponível. O pipeline ainda não rodou hoje.
          </div>
        )}

        {(['STRONG_BUY', 'BUY', 'NEUTRAL', 'SELL', 'STRONG_SELL'] as Rating[]).map(signal => {
          const items = groups[signal]
          if (items.length === 0) return null
          return (
            <section key={signal} style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <RatingBadge rating={signal} size="md" />
                <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                  {items.length} ativo{items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 90px 80px 100px 70px 70px 60px',
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontSize: 11,
                  fontFamily: 'var(--font-geist-mono), monospace',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}>
                  <span></span>
                  <span>Ativo</span>
                  <span style={{ textAlign: 'right' }}>Preço</span>
                  <span style={{ textAlign: 'right' }}>Var.</span>
                  <span style={{ textAlign: 'center' }}>Consenso</span>
                  <span style={{ textAlign: 'right' }}>Upside</span>
                  <span style={{ textAlign: 'right' }}>Risco</span>
                  <span style={{ textAlign: 'center' }}>Moat</span>
                </div>

                {items.map((t, i) => (
                  <Link
                    key={t.ticker}
                    href={`/${t.ticker}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '40px 1fr 90px 80px 100px 70px 70px 60px',
                      padding: '12px 16px',
                      borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                      textDecoration: 'none',
                      color: 'var(--text)',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      {t.logo_small ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={t.logo_small}
                          alt={t.ticker}
                          width={24}
                          height={24}
                          style={{ borderRadius: 4, objectFit: 'contain' }}
                        />
                      ) : (
                        <div style={{
                          width: 24, height: 24, borderRadius: 4,
                          background: 'var(--border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 8, color: 'var(--text-muted)',
                          fontFamily: 'var(--font-geist-mono), monospace',
                        }}>
                          {t.ticker.slice(0, 2)}
                        </div>
                      )}
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                      <span style={{
                        fontFamily: 'var(--font-geist-mono), monospace',
                        fontWeight: 600,
                        fontSize: 13,
                        color: 'var(--gold)',
                      }}>
                        {t.ticker}
                      </span>
                      <span style={{
                        marginLeft: 8, fontSize: 12,
                        color: 'var(--text-muted)',
                      }}>
                        {t.name}
                      </span>
                    </div>

                    <div style={{
                      textAlign: 'right',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: 13,
                    }}>
                      R${fmt(Number(t.price))}
                    </div>

                    <div style={{
                      textAlign: 'right',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: 13,
                      color: pctColor(Number(t.change_percent)),
                    }}>
                      {Number(t.change_percent) > 0 ? '+' : ''}{fmt(Number(t.change_percent))}%
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <RatingBadge rating={(t.consensus_signal ?? t.rating) as Rating} size="xs" />
                    </div>

                    <div style={{
                      textAlign: 'right',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: 13,
                      color: Number(t.upside_base_pct) >= 0 ? 'var(--green)' : 'var(--red)',
                    }}>
                      {t.upside_base_pct != null ? `+${fmt(Number(t.upside_base_pct))}%` : '—'}
                    </div>

                    <div style={{
                      textAlign: 'right',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: 13,
                      color: riskColor(Number(t.risk_rating)),
                    }}>
                      {t.risk_rating ?? '—'}/10
                    </div>

                    <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)' }}>
                      {t.moat ?? '—'}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        <footer style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 24, marginTop: 16,
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            JD Market · Análise B3 · GS · BW · CT · Al Brooks
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Atualizado diariamente após o fechamento do pregão (17h BRT)
          </span>
        </footer>
      </main>
    </>
  )
}
