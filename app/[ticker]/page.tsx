import { notFound } from 'next/navigation'
import { getTickerAnalysis, getLatestDate } from '@/lib/queries'
import Header from '@/components/Header'
import RatingBadge from '@/components/RatingBadge'
import Link from 'next/link'
import type { Rating, RiskLevel, Trend } from '@/lib/types'

export const revalidate = 3600

function fmt(n: unknown, decimals = 2): string {
  if (n == null) return '—'
  return Number(n).toFixed(decimals)
}

function pctColor(n: number): string {
  return n > 0 ? 'var(--green)' : n < 0 ? 'var(--red)' : 'var(--text-muted)'
}

function riskLevelColor(level: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    LOW: 'var(--green)', MODERATE: 'var(--yellow)',
    HIGH: '#F97316', EXTREME: 'var(--red)',
  }
  return map[level] ?? 'var(--text-muted)'
}

function trendColor(t: Trend): string {
  return t === 'BULLISH' ? 'var(--green)' : t === 'BEARISH' ? 'var(--red)' : 'var(--yellow)'
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '20px 24px', marginBottom: 16,
    }}>
      <h3 style={{
        margin: '0 0 16px', fontSize: 12, fontWeight: 700,
        fontFamily: 'var(--font-geist-mono), monospace',
        color: 'var(--text-muted)', letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Row({ label, value, color }: { label: string; value: React.ReactNode; color?: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '7px 0', borderBottom: '1px solid var(--border)',
    }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
      <span style={{
        fontSize: 13, fontFamily: 'var(--font-geist-mono), monospace',
        color: color ?? 'var(--text)', textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  )
}

export default async function TickerPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params
  const upperTicker = ticker.toUpperCase()

  const latestDate = await getLatestDate()
  const analysis = await getTickerAnalysis(upperTicker, latestDate ?? undefined)

  if (!analysis) notFound()

  const bwDims = analysis.bw_dimensions ?? {}

  return (
    <>
      <Header />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>

        {/* Back */}
        <Link href="/" style={{
          color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13,
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24,
        }}>
          ← Ranking
        </Link>

        {/* Ticker header */}
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px 28px', marginBottom: 24,
          display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap',
        }}>
          {analysis.logo_small && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={analysis.logo_small}
              alt={upperTicker}
              width={48}
              height={48}
              style={{ borderRadius: 8, objectFit: 'contain', flexShrink: 0 }}
            />
          )}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
              <h1 style={{
                margin: 0, fontSize: 28, fontWeight: 700,
                fontFamily: 'var(--font-geist-mono), monospace',
                color: 'var(--gold)', letterSpacing: '0.04em',
              }}>
                {upperTicker}
              </h1>
              <RatingBadge rating={analysis.consensus_signal as Rating} size="md" />
            </div>
            <p style={{ margin: '0 0 4px', fontSize: 15, color: 'var(--text)' }}>
              {analysis.name}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
              {analysis.sector}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: 28, fontWeight: 700,
              fontFamily: 'var(--font-geist-mono), monospace',
            }}>
              R${fmt(analysis.price)}
            </div>
            <div style={{
              fontSize: 14,
              fontFamily: 'var(--font-geist-mono), monospace',
              color: pctColor(Number(analysis.change_percent)),
            }}>
              {Number(analysis.change_percent) > 0 ? '+' : ''}{fmt(analysis.change_percent)}%
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
              {analysis.analysis_date
                ? new Date((analysis.analysis_date as string) + 'T00:00:00-03:00')
                    .toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                : ''}
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

          {/* ── GS FRAMEWORK ── */}
          <div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--gold)',
              fontFamily: 'var(--font-geist-mono), monospace',
              letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase',
            }}>
              Goldman Sachs — Fundamentalista
            </div>

            <Card title="Rating & Moat">
              <Row label="Rating GS" value={<RatingBadge rating={analysis.rating as Rating} size="xs" />} />
              <Row label="Moat" value={analysis.moat ?? '—'} />
              <Row label="Risco GS (1–10)" value={`${analysis.risk_rating}/10`}
                color={analysis.risk_rating <= 4 ? 'var(--green)' : analysis.risk_rating <= 6 ? 'var(--yellow)' : 'var(--red)'} />
            </Card>

            <Card title="Targets de preço">
              <Row label="Bear" value={`R$${fmt(analysis.targets_bear)}`} color="var(--red)" />
              <Row label="Base" value={`R$${fmt(analysis.targets_base)}`} />
              <Row label="Bull" value={`R$${fmt(analysis.targets_bull)}`} color="var(--green)" />
              <Row label="Upside base" value={`+${fmt(analysis.upside_base_pct)}%`} color="var(--green)" />
              <Row label="Zona de entrada" value={analysis.entry_zone ?? '—'} />
              <Row label="Stop loss" value={`R$${fmt(analysis.stop_loss)}`} color="var(--red)" />
            </Card>

            <Card title="Tese de investimento">
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
                {analysis.investment_thesis}
              </p>
            </Card>

            {(analysis.catalysts?.length > 0) && (
              <Card title="Catalisadores">
                <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                  {(analysis.catalysts as string[]).map((c, i) => (
                    <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 6, lineHeight: 1.5 }}>{c}</li>
                  ))}
                </ul>
              </Card>
            )}

            {(analysis.risks?.length > 0) && (
              <Card title="Riscos">
                <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                  {(analysis.risks as string[]).map((r, i) => (
                    <li key={i} style={{ fontSize: 13, color: 'var(--red)', marginBottom: 6, lineHeight: 1.5 }}>{r}</li>
                  ))}
                </ul>
              </Card>
            )}

            {/* ── CT FRAMEWORK ── */}
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--gold)',
              fontFamily: 'var(--font-geist-mono), monospace',
              letterSpacing: '0.1em', marginBottom: 10, marginTop: 8, textTransform: 'uppercase',
            }}>
              Citadel — Técnica Multi-Timeframe
            </div>

            <Card title="Tendências">
              <Row label="Diário" value={analysis.trend_daily ?? '—'} color={trendColor(analysis.trend_daily as Trend)} />
              <Row label="Semanal" value={analysis.trend_weekly ?? '—'} color={trendColor(analysis.trend_weekly as Trend)} />
              <Row label="Mensal" value={analysis.trend_monthly ?? '—'} color={trendColor(analysis.trend_monthly as Trend)} />
              <Row label="Sinal CT" value={analysis.ct_confidence ? <RatingBadge rating={analysis.ct_confidence as Rating} size="xs" /> : '—'} />
            </Card>

            <Card title="Indicadores">
              <Row label="MA50" value={`R$${fmt(analysis.ma50)}`} />
              <Row label="MA200" value={`R$${fmt(analysis.ma200)}`} />
              <Row label="Acima MA200" value={analysis.above_ma200 ? 'Sim' : 'Não'}
                color={analysis.above_ma200 ? 'var(--green)' : 'var(--red)'} />
              <Row label="RSI" value={`${fmt(analysis.rsi, 0)} — ${analysis.rsi_signal ?? '—'}`} />
              <Row label="MACD" value={analysis.macd ?? '—'}
                color={analysis.macd === 'BULLISH' ? 'var(--green)' : analysis.macd === 'BEARISH' ? 'var(--red)' : 'var(--yellow)'} />
              <Row label="Bollinger" value={analysis.bollinger ?? '—'} />
            </Card>

            <Card title="Suportes & Resistências">
              <Row label="Suporte 1" value={`R$${fmt(analysis.support1)}`} color="var(--green)" />
              <Row label="Suporte 2" value={`R$${fmt(analysis.support2)}`} color="var(--green)" />
              <Row label="Resistência 1" value={`R$${fmt(analysis.resistance1)}`} color="var(--red)" />
              {analysis.ct_entry && <Row label="Entrada CT" value={`R$${fmt(analysis.ct_entry)}`} />}
              {analysis.ct_target1 && <Row label="Alvo 1" value={`R$${fmt(analysis.ct_target1)}`} color="var(--green)" />}
              {analysis.ct_target2 && <Row label="Alvo 2" value={`R$${fmt(analysis.ct_target2)}`} color="var(--green)" />}
              {analysis.ct_rr && <Row label="R/R" value={`1:${fmt(analysis.ct_rr)}`} />}
            </Card>

            {analysis.ct_pattern && (
              <Card title="Padrão gráfico">
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{analysis.ct_pattern}</p>
              </Card>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>

            {/* ── FUNDAMENTALS ── */}
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--gold)',
              fontFamily: 'var(--font-geist-mono), monospace',
              letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase',
            }}>
              Fundamentos
            </div>

            <Card title="Valuation & Retorno">
              <Row label="P/E" value={analysis.pe_ratio != null ? fmt(analysis.pe_ratio) : '—'} />
              <Row label="EV/EBITDA" value={analysis.ev_ebitda != null ? fmt(analysis.ev_ebitda) : '—'} />
              <Row label="ROE" value={analysis.roe != null ? `${fmt(analysis.roe)}%` : '—'}
                color={Number(analysis.roe) > 15 ? 'var(--green)' : 'var(--yellow)'} />
              <Row label="Margem líquida" value={analysis.net_margin != null ? `${fmt(analysis.net_margin)}%` : '—'} />
              <Row label="D/E" value={analysis.debt_equity != null ? fmt(analysis.debt_equity, 3) : '—'}
                color={Number(analysis.debt_equity) < 0.5 ? 'var(--green)' : Number(analysis.debt_equity) < 1.5 ? 'var(--yellow)' : 'var(--red)'} />
              <Row label="DY 12m" value={analysis.dividend_yield != null ? `${fmt(analysis.dividend_yield)}%` : '—'}
                color="var(--gold)" />
              <Row label="Beta" value={analysis.beta != null ? fmt(analysis.beta, 3) : '—'} />
            </Card>

            {/* ── BW FRAMEWORK ── */}
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--gold)',
              fontFamily: 'var(--font-geist-mono), monospace',
              letterSpacing: '0.1em', marginBottom: 10, marginTop: 8, textTransform: 'uppercase',
            }}>
              Bridgewater — Decomposição de Risco
            </div>

            <Card title="Score de Risco BW">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12,
              }}>
                <span style={{
                  fontSize: 36, fontWeight: 700,
                  fontFamily: 'var(--font-geist-mono), monospace',
                  color: riskLevelColor(analysis.bw_overall_risk as RiskLevel),
                }}>
                  {analysis.bw_risk_score ?? '—'}
                </span>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Score / 10</div>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: riskLevelColor(analysis.bw_overall_risk as RiskLevel),
                  }}>
                    {analysis.bw_overall_risk ?? '—'}
                  </div>
                </div>
              </div>
              {analysis.bw_max_position_pct != null && (
                <Row label="Posição máx. (BW)" value={`${fmt(analysis.bw_max_position_pct)}%`} />
              )}
              {analysis.bw_recession_drawdown_pct != null && (
                <Row label="Drawdown recessão" value={`-${fmt(analysis.bw_recession_drawdown_pct)}%`} color="var(--red)" />
              )}
            </Card>

            {Object.keys(bwDims).length > 0 && (
              <Card title="Dimensões de Risco BW">
                {(Object.entries(bwDims) as [string, { r: RiskLevel; n: string }][]).map(([key, dim]) => (
                  <div key={key} style={{
                    padding: '8px 0', borderBottom: '1px solid var(--border)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: riskLevelColor(dim.r) }}>
                        {dim.r}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{dim.n}</p>
                  </div>
                ))}
              </Card>
            )}

            {analysis.bw_summary && (
              <Card title="Síntese BW">
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{analysis.bw_summary}</p>
              </Card>
            )}

            {(analysis.bw_tail_risks as string[])?.length > 0 && (
              <Card title="Tail Risks">
                <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                  {(analysis.bw_tail_risks as string[]).map((r, i) => (
                    <li key={i} style={{ fontSize: 13, color: 'var(--red)', marginBottom: 5 }}>{r}</li>
                  ))}
                </ul>
              </Card>
            )}

            {(analysis.bw_hedges as string[])?.length > 0 && (
              <Card title="Hedges Sugeridos">
                <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                  {(analysis.bw_hedges as string[]).map((h, i) => (
                    <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 5 }}>{h}</li>
                  ))}
                </ul>
              </Card>
            )}

            {/* ── AL BROOKS ── */}
            <div style={{
              fontSize: 11, fontWeight: 700, color: 'var(--gold)',
              fontFamily: 'var(--font-geist-mono), monospace',
              letterSpacing: '0.1em', marginBottom: 10, marginTop: 8, textTransform: 'uppercase',
            }}>
              Al Brooks — Price Action
            </div>

            <Card title="Frameworks AB1–AB4">
              {analysis.ab1_direction && <Row label="AB1 — Direção" value={analysis.ab1_direction} />}
              {analysis.ab1_signal_bar && <Row label="AB1 — Signal Bar" value={analysis.ab1_signal_bar} />}
              {analysis.ab2_momentum && <Row label="AB2 — Momentum" value={analysis.ab2_momentum} />}
              {analysis.ab2_reversal && <Row label="AB2 — Reversão" value={analysis.ab2_reversal} />}
              {analysis.ab3_ma_confluence && <Row label="AB3 — Confluência MM" value={analysis.ab3_ma_confluence} />}
              {analysis.ab3_confluence_strength && <Row label="AB3 — Força" value={analysis.ab3_confluence_strength} />}
              {analysis.ab4_trend && <Row label="AB4 — Tendência" value={analysis.ab4_trend} />}
              {analysis.ab4_trend_strength && <Row label="AB4 — Força tendência" value={analysis.ab4_trend_strength} />}
              {!analysis.ab1_direction && (
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>
                  Dados Al Brooks não disponíveis para esta data.
                </p>
              )}
            </Card>

          </div>
        </div>

        <footer style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 20, marginTop: 24,
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 8,
        }}>
          <Link href="/" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>
            ← Voltar ao ranking
          </Link>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Análise gerada automaticamente via Claude API · Fins informativos
          </span>
        </footer>
      </main>
    </>
  )
}
