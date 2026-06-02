'use client'

import { useState } from 'react'
import Link from 'next/link'
import { computeForce } from '@/lib/intelligence'

const MONO = 'var(--font-geist-mono), monospace'
const fmt = (n: number | null | undefined, d = 2) => n == null ? '—' : Number(n).toFixed(d)
const milhar = (n: number | null | undefined, d = 0) => n == null ? '—' : Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })
const pctColor = (n: number | null | undefined) => (n ?? 0) > 0 ? 'var(--green)' : (n ?? 0) < 0 ? 'var(--red)' : 'var(--text-muted)'
const pctTxt = (n: number | null | undefined) => n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`
const forceColor = (f: number) => f >= 2 ? 'var(--green)' : f <= -2 ? 'var(--red)' : 'var(--text-muted)'
const biasColor = (b: string) => b.includes('BULL') ? 'var(--green)' : b.includes('BEAR') ? 'var(--red)' : 'var(--text-muted)'
const trendColor = (t?: string | null) => t === 'BULLISH' ? 'var(--green)' : t === 'BEARISH' ? 'var(--red)' : 'var(--yellow)'
const verdictOf = (v: number) => v > 0 ? { t: 'BULL', c: 'var(--green)' } : v < 0 ? { t: 'BEAR', c: 'var(--red)' } : { t: 'NEUTRO', c: 'var(--text-muted)' }

export interface RxData {
  ticker?: string; name?: string; sector?: string
  price?: number; change_percent?: number
  jd_score?: number | null; consensus_signals?: Record<string, string> | null
  ex_score?: number | null; ex_bottom_score?: number | null
  upside_base_pct?: number | null; analysis_date?: string; generated_at?: string
  investment_thesis?: string | null; moat?: string | null
  pe_ratio?: number | null; ev_ebitda?: number | null; roe?: number | null; net_margin?: number | null; debt_equity?: number | null; dividend_yield?: number | null; beta?: number | null
  targets_bear?: number | null; targets_base?: number | null; targets_bull?: number | null; entry_zone?: string | null; stop_loss?: number | null; risk_rating?: number | null
  catalysts?: string[] | null; risks?: string[] | null
  trend_daily?: string | null; trend_weekly?: string | null; trend_monthly?: string | null
  rsi?: number | null; rsi_signal?: string | null; macd?: string | null; bollinger?: string | null
  ma50?: number | null; ma200?: number | null; above_ma200?: boolean | null
  support1?: number | null; support2?: number | null; resistance1?: number | null
  ct_entry?: number | null; ct_target1?: number | null; ct_target2?: number | null; ct_stop?: number | null; ct_rr?: number | null; ct_pattern?: string | null
  bw_summary?: string | null; bw_overall_risk?: string | null; bw_risk_score?: number | null
  bw_max_position_pct?: number | null; bw_recession_drawdown_pct?: number | null
  bw_dimensions?: Record<string, { r: string; n: string }> | null
  bw_tail_risks?: string[] | null; bw_hedges?: string[] | null
  ab1_direction?: string | null; ab2_momentum?: string | null; ab3_ma_confluence?: string | null; ab4_trend?: string | null
}
export interface RxHist { analysis_date: string; price?: number | null; consensus_signal?: string | null }

function riskColor(level?: string | null) {
  if (level === 'LOW') return 'var(--green)'
  if (level === 'MODERATE') return 'var(--yellow)'
  if (level === 'HIGH') return '#F97316'
  if (level === 'EXTREME') return 'var(--red)'
  return 'var(--text-muted)'
}

// ── Gráfico de área ───────────────────────────────────────────────────────────
function AreaChart({ points }: { points: number[] }) {
  if (points.length < 2) return <div style={{ color: 'var(--text-muted)', fontSize: 12, padding: 20 }}>sem histórico suficiente</div>
  const W = 600, H = 240, pad = 6
  const min = Math.min(...points), max = Math.max(...points)
  const range = max - min || 1
  const X = (i: number) => (i / (points.length - 1)) * (W - pad * 2) + pad
  const Y = (v: number) => H - pad - ((v - min) / range) * (H - pad * 2)
  const line = points.map((v, i) => `${X(i)},${Y(v)}`).join(' ')
  const area = `${pad},${H - pad} ${line} ${W - pad},${H - pad}`
  const up = points[points.length - 1] >= points[0]
  const col = up ? 'var(--green)' : 'var(--red)'
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id="rxg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={col} stopOpacity="0.28" />
          <stop offset="100%" stopColor={col} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#rxg)" />
      <polyline points={line} fill="none" stroke={col} strokeWidth={2} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// ── Helpers de UI ─────────────────────────────────────────────────────────────
function Card({ children, title, accent }: { children: React.ReactNode; title?: string; accent?: string }) {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, minHeight: 0 }}>
      {title && <div style={{ fontSize: 9, letterSpacing: '0.1em', color: accent ?? 'var(--gold)', fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>{title}</div>}
      {children}
    </div>
  )
}
function M({ k, v, c }: { k: string; v: React.ReactNode; c?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{k}</span>
      <span style={{ fontSize: 12.5, fontFamily: MONO, color: c ?? 'var(--text)', textAlign: 'right' }}>{v}</span>
    </div>
  )
}
function Pillar({ label, v, max }: { label: string; v: number; max: number }) {
  const mag = (Math.min(Math.abs(v), max) / max) * 50
  const pos = v >= 0
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'var(--text-muted)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 4 }}>
        <span>{label}</span><span style={{ color: v > 0 ? 'var(--green)' : v < 0 ? 'var(--red)' : 'var(--text-muted)', fontWeight: 700 }}>{v > 0 ? '+' : ''}{v}</span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 6, background: 'var(--bg3)', borderRadius: 3 }}>
        <div style={{ position: 'absolute', left: '50%', top: -1, bottom: -1, width: 1, background: 'var(--text-muted)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 3, background: pos ? 'var(--green)' : 'var(--red)', left: pos ? '50%' : `${50 - mag}%`, width: `${mag}%`, opacity: 0.9 }} />
      </div>
    </div>
  )
}

const TABS = [
  { key: 'gs', label: 'Fundamental', inst: 'Goldman Sachs' },
  { key: 'ct', label: 'Técnico', inst: 'Citadel' },
  { key: 'bw', label: 'Risco', inst: 'Bridgewater' },
  { key: 'jp', label: 'JP Morgan', inst: 'Fluxo' },
  { key: 'ab', label: 'Price Action', inst: 'Al Brooks' },
]

// ── Componente principal ──────────────────────────────────────────────────────
export default function RaioXClient({ d, history }: { d: RxData; history: RxHist[] }) {
  const [tab, setTab] = useState<string>('gs')

  const intel = computeForce({
    ticker: d.ticker ?? '', name: d.name ?? '', sector: d.sector ?? '', logo_small: null,
    price: d.price ?? 0, change_percent: d.change_percent ?? 0,
    jd_score: d.jd_score ?? null, consensus_signals: d.consensus_signals ?? null,
    ex_score: d.ex_score ?? null, ex_bottom_score: d.ex_bottom_score ?? null,
    upside_base_pct: d.upside_base_pct ?? null, analysis_date: d.analysis_date ?? '',
  })
  const sc = intel.schools
  const prices = [...history].reverse().map(h => Number(h.price) || 0).filter(Boolean)
  const hasBottom = d.ex_bottom_score != null && d.ex_bottom_score >= 3
  const hasTop = d.ex_score != null && d.ex_score >= 3

  const methods = [
    { key: 'gs', inst: 'Goldman Sachs', area: 'Fundamentalista', ...verdictOf(sc.gs) },
    { key: 'ct', inst: 'Citadel', area: 'Técnica', ...verdictOf(sc.ct) },
    { key: 'bw', inst: 'Bridgewater', area: 'Risco', ...(sc.bw > 0 ? { t: 'RISCO BAIXO', c: 'var(--green)' } : sc.bw < 0 ? { t: 'RISCO ALTO', c: 'var(--red)' } : { t: 'RISCO MÉDIO', c: 'var(--yellow)' }) },
    { key: 'jp', inst: 'JP Morgan', area: 'Fluxo & Posic.', ...verdictOf(sc.jp) },
    { key: 'ab', inst: 'Al Brooks', area: 'Price Action', ...verdictOf(sc.ab) },
  ]

  return (
    <div className="raiox">
      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', flexWrap: 'wrap' }}>
        <Link href="/v2" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', whiteSpace: 'nowrap' }}>← Painel</Link>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, minWidth: 0 }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, color: 'var(--gold)', letterSpacing: '0.03em' }}>{d.ticker}</span>
          <span style={{ fontSize: 13, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.sector}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 700 }}>R${fmt(d.price)}</span>
          <span style={{ fontFamily: MONO, fontSize: 13, color: pctColor(d.change_percent) }}>{pctTxt(d.change_percent)}</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          {(hasBottom || hasTop) && (
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: hasBottom ? 'var(--green)' : '#F97316', padding: '3px 8px', borderRadius: 4, fontFamily: MONO }}>
              {hasBottom ? `FUNDO ${d.ex_bottom_score}/5 ↑` : `TOPO ${d.ex_score}/5 ↓`}
            </span>
          )}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--gold)', fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase' }}>JD Score</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 26, fontWeight: 800, fontFamily: MONO, lineHeight: 1, color: forceColor(intel.force) }}>{intel.force > 0 ? '+' : ''}{intel.force}</span>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: MONO, color: biasColor(intel.bias) }}>{intel.bias}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>conv. {intel.conviction}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="raiox-body">

        {/* ESQUERDA — scorecard + gráfico */}
        <div className="raiox-left">
          <Card title="JD Score · 8 votos · −8 a +8">
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <Pillar label="Fundamental" v={intel.fund} max={3} />
              <Pillar label="Técnico" v={intel.tec} max={5} />
            </div>
            {methods.map(m => {
              const active = tab === m.key
              return (
                <button key={m.key} onClick={() => setTab(m.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '7px 8px', background: active ? 'var(--bg3)' : 'transparent', border: 'none', borderLeft: `2px solid ${active ? 'var(--gold)' : 'transparent'}`, cursor: 'pointer', textAlign: 'left', color: 'var(--text)', borderRadius: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.c, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12, fontWeight: 700, fontFamily: MONO }}>{m.inst}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color: m.c }}>{m.t}</span>
                </button>
              )
            })}
            <div style={{ marginTop: 10, display: 'flex', gap: 14, fontSize: 11, color: 'var(--text-muted)' }}>
              <span>reversão {hasBottom ? <strong style={{ color: 'var(--green)' }}>FUNDO ↑</strong> : hasTop ? <strong style={{ color: '#F97316' }}>TOPO ↓</strong> : 'sem sinal'}</span>
              {intel.divergent && <span style={{ color: '#A855F7' }}>● divergência</span>}
            </div>
          </Card>

          <div className="raiox-chart">
            <Card title={`Histórico de preço · ${prices.length} dias`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'var(--text-muted)', fontFamily: MONO, marginBottom: 6 }}>
                <span>min R${fmt(prices.length ? Math.min(...prices) : null)}</span>
                <span>máx R${fmt(prices.length ? Math.max(...prices) : null)}</span>
              </div>
              <div style={{ flex: 1, minHeight: 120 }}><AreaChart points={prices} /></div>
            </Card>
          </div>
        </div>

        {/* DIREITA — abas */}
        <div className="raiox-right">
          <Card>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
              {TABS.map(t => {
                const active = tab === t.key
                return (
                  <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '7px 13px', fontSize: 11, fontWeight: 700, fontFamily: MONO, letterSpacing: '0.04em', textTransform: 'uppercase', background: active ? 'var(--gold)' : 'transparent', color: active ? 'var(--bg)' : 'var(--text-muted)', border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`, borderRadius: 5, cursor: 'pointer' }}>
                    {t.label}
                  </button>
                )
              })}
            </div>

            <div className="raiox-tabcontent" style={{ overflowY: 'auto', paddingRight: 4 }}>
              {tab === 'gs' && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10 }}>Goldman Sachs — valuation, qualidade do negócio e saúde do balanço</div>
                  {d.investment_thesis && <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--text)', margin: '0 0 14px' }}>{d.investment_thesis}</p>}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                    <M k="P/L (P/E)" v={d.pe_ratio != null ? fmt(d.pe_ratio, 1) : '—'} />
                    <M k="EV/EBITDA" v={d.ev_ebitda != null ? fmt(d.ev_ebitda, 1) : '—'} />
                    <M k="ROE" v={d.roe != null ? `${fmt(d.roe, 1)}%` : '—'} c={Number(d.roe) > 15 ? 'var(--green)' : undefined} />
                    <M k="Margem líq." v={d.net_margin != null ? `${fmt(d.net_margin, 1)}%` : '—'} />
                    <M k="Dív/Patrim." v={d.debt_equity != null ? fmt(d.debt_equity, 2) : '—'} />
                    <M k="Dividend Yield" v={d.dividend_yield != null ? `${fmt(d.dividend_yield, 2)}%` : '—'} c="var(--gold)" />
                    <M k="Beta" v={d.beta != null ? fmt(d.beta, 2) : '—'} />
                    <M k="Moat" v={d.moat ?? '—'} />
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12, fontFamily: MONO }}>
                    <span><span style={{ color: 'var(--text-muted)' }}>Bear </span><span style={{ color: 'var(--red)' }}>R${fmt(d.targets_bear)}</span></span>
                    <span><span style={{ color: 'var(--text-muted)' }}>Base </span>R${fmt(d.targets_base)}</span>
                    <span><span style={{ color: 'var(--text-muted)' }}>Bull </span><span style={{ color: 'var(--green)' }}>R${fmt(d.targets_bull)}</span></span>
                    {d.upside_base_pct != null && <span><span style={{ color: 'var(--text-muted)' }}>Upside </span><span style={{ color: 'var(--green)' }}>+{fmt(d.upside_base_pct, 1)}%</span></span>}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 14 }}>
                    {Array.isArray(d.catalysts) && d.catalysts.length > 0 && (
                      <div><div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--green)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Catalisadores</div><ul style={{ margin: 0, padding: '0 0 0 15px' }}>{d.catalysts.slice(0, 4).map((c, i) => <li key={i} style={{ fontSize: 11.5, color: 'var(--text)', marginBottom: 4, lineHeight: 1.45 }}>{c}</li>)}</ul></div>
                    )}
                    {Array.isArray(d.risks) && d.risks.length > 0 && (
                      <div><div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--red)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Riscos</div><ul style={{ margin: 0, padding: '0 0 0 15px' }}>{d.risks.slice(0, 4).map((c, i) => <li key={i} style={{ fontSize: 11.5, color: 'var(--text)', marginBottom: 4, lineHeight: 1.45 }}>{c}</li>)}</ul></div>
                    )}
                  </div>
                </div>
              )}

              {tab === 'ct' && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10 }}>Citadel — tendência em 3 prazos, momentum (RSI/MACD) e médias móveis</div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    {([['Diário', d.trend_daily], ['Semanal', d.trend_weekly], ['Mensal', d.trend_monthly]] as const).map(([k, v]) => (
                      <div key={k} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', background: 'var(--bg)', borderRadius: 6 }}>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{k}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, fontFamily: MONO, color: trendColor(v) }}>{v === 'BULLISH' ? 'BULL' : v === 'BEARISH' ? 'BEAR' : 'NEUTRO'}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                    <M k="RSI" v={`${d.rsi != null ? fmt(d.rsi, 0) : '—'}${d.rsi_signal ? ` · ${d.rsi_signal}` : ''}`} />
                    <M k="MACD" v={d.macd ?? '—'} c={d.macd === 'BULLISH' ? 'var(--green)' : d.macd === 'BEARISH' ? 'var(--red)' : undefined} />
                    <M k="Bollinger" v={d.bollinger ?? '—'} />
                    <M k="Acima MA200" v={d.above_ma200 ? 'Sim' : 'Não'} c={d.above_ma200 ? 'var(--green)' : 'var(--red)'} />
                    <M k="MA50" v={`R$${fmt(d.ma50)}`} />
                    <M k="MA200" v={`R$${fmt(d.ma200)}`} />
                    <M k="Suporte 1 / 2" v={`R$${fmt(d.support1)} · R$${fmt(d.support2)}`} c="var(--green)" />
                    <M k="Resistência" v={`R$${fmt(d.resistance1)}`} c="var(--red)" />
                    {d.ct_entry != null && <M k="Entrada téc." v={`R$${fmt(d.ct_entry)}`} />}
                    {d.ct_rr != null && <M k="Risco/Retorno" v={`1:${fmt(d.ct_rr)}`} />}
                  </div>
                  {d.ct_pattern && <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text)', marginTop: 12 }}>{d.ct_pattern}</p>}
                </div>
              )}

              {tab === 'bw' && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10 }}>Bridgewater — decomposição do risco em 6 dimensões</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                    <span style={{ fontSize: 32, fontWeight: 800, fontFamily: MONO, color: riskColor(d.bw_overall_risk) }}>{d.bw_risk_score ?? '—'}</span>
                    <div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Score / 10</div><div style={{ fontSize: 13, fontWeight: 700, color: riskColor(d.bw_overall_risk) }}>{d.bw_overall_risk ?? '—'}</div></div>
                  </div>
                  {d.bw_dimensions && Object.keys(d.bw_dimensions).length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
                      {Object.entries(d.bw_dimensions).slice(0, 6).map(([k, dim]) => (
                        <div key={k} style={{ padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 10.5, color: 'var(--text-muted)', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}</span>
                            <span style={{ fontSize: 10.5, fontWeight: 700, color: riskColor(dim.r) }}>{dim.r}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {d.bw_summary && <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text)', marginTop: 12 }}>{d.bw_summary}</p>}
                  {Array.isArray(d.bw_tail_risks) && d.bw_tail_risks.length > 0 && (
                    <div style={{ marginTop: 10 }}><div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--red)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 4 }}>Tail risks</div><ul style={{ margin: 0, padding: '0 0 0 15px' }}>{d.bw_tail_risks.slice(0, 3).map((c, i) => <li key={i} style={{ fontSize: 11.5, color: 'var(--text)', marginBottom: 3 }}>{c}</li>)}</ul></div>
                  )}
                </div>
              )}

              {tab === 'jp' && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10 }}>JP Morgan — fluxo institucional e posicionamento de opções</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: MONO, color: verdictOf(sc.jp).c }}>Fluxo: {verdictOf(sc.jp).t}</span>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text)' }}>
                    A escola JP Morgan lê o <strong>fluxo institucional</strong> e o <strong>posicionamento em opções</strong> (call/put skew, posicionamento dos grandes players, risco de evento). Compõe um dos 8 votos do JD Score.
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 10 }}>Skew detalhado, posicionamento e evento: em desenvolvimento para esta tela.</p>
                </div>
              )}

              {tab === 'ab' && (
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 10 }}>Al Brooks — price action: AB1 direção · AB2 momentum · AB3 confluência · AB4 tendência</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                    <M k="AB1 · Direção" v={d.ab1_direction ?? '—'} />
                    <M k="AB2 · Momentum" v={d.ab2_momentum ?? '—'} />
                    <M k="AB3 · Confluência" v={d.ab3_ma_confluence ?? '—'} />
                    <M k="AB4 · Tendência" v={d.ab4_trend ?? '—'} />
                  </div>
                  {(hasBottom || hasTop) && (
                    <p style={{ fontSize: 12, lineHeight: 1.6, color: hasBottom ? 'var(--green)' : '#F97316', marginTop: 14 }}>
                      {hasBottom ? '↑ Possível FUNDO — RSI sobrevendido / divergência altista. Pode estar virando pra cima (oportunidade).' : '↓ Possível TOPO — momento esticado / divergência baixista. Atenção a reversão de baixa.'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
