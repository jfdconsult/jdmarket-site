'use client'

import { useState } from 'react'
import Link from 'next/link'
import { computeForce } from '@/lib/intelligence'

const MONO = 'var(--font-geist-mono), monospace'
const num = (v: unknown): number | null => (typeof v === 'number' ? v : v == null ? null : Number(v))
const fmt = (n: number | null | undefined, d = 2) => n == null || Number.isNaN(n) ? '—' : Number(n).toFixed(d)
const milhar = (n: number | null | undefined, d = 0) => n == null ? '—' : Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })
const pctColor = (n: number | null | undefined) => (n ?? 0) > 0 ? 'var(--green)' : (n ?? 0) < 0 ? 'var(--red)' : 'var(--text-muted)'
const pctTxt = (n: number | null | undefined) => n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`
const forceColor = (f: number) => f >= 2 ? 'var(--green)' : f <= -2 ? 'var(--red)' : 'var(--text-muted)'
const biasColor = (b: string) => b.includes('BULL') ? 'var(--green)' : b.includes('BEAR') ? 'var(--red)' : 'var(--text-muted)'
const trendColor = (t?: string | null) => t === 'BULLISH' ? 'var(--green)' : t === 'BEARISH' ? 'var(--red)' : 'var(--yellow)'
const sigColor = (s?: string | null) => /BULL|BUY|LONG|RISING|STRONG BUY/i.test(s ?? '') ? 'var(--green)' : /BEAR|SELL|SHORT|DECLINING/i.test(s ?? '') ? 'var(--red)' : 'var(--text-muted)'
const verdictOf = (v: number) => v > 0 ? { t: 'BULL', c: 'var(--green)' } : v < 0 ? { t: 'BEAR', c: 'var(--red)' } : { t: 'NEUTRO', c: 'var(--text-muted)' }
const riskColor = (l?: string | null) => l === 'LOW' ? 'var(--green)' : l === 'MODERATE' ? 'var(--yellow)' : l === 'HIGH' ? '#F97316' : l === 'EXTREME' ? 'var(--red)' : 'var(--text-muted)'

export interface RxHist { analysis_date: string; price?: number | null; consensus_signal?: string | null }

type Dim = { r: string; n: string }
interface RxAsset {
  _ticker?: string
  _hg?: { company_name?: string; name?: string; sector?: string; price?: number; change_percent?: number; market_cap?: number; volume?: number; financials?: { price_to_book_ratio?: number; equity_per_share?: number; dividends?: { yield_12m?: number } } }
  _brapi?: { pe?: number | null; roe?: number | null; net_margin?: number | null; debt_equity?: number | null; ev_ebitda?: number | null; beta?: number | null; revenue_growth?: number | null; free_cashflow?: number | null }
  _tech?: { rsi?: number; rsi_signal?: string; rsi_divergence?: string; macd?: string; macd_hist_slope?: string; bollinger?: string; hv20?: number; ma50?: number; ma200?: number; above_ma200?: boolean; support1?: number; support2?: number; resistance1?: number; week52_high?: number; week52_low?: number; avg_vol_7d?: number; vol_exhaustion?: string; pattern?: string; trend_daily?: string; trend_weekly?: string; trend_monthly?: string }
  _ex?: { score?: number; bottom_score?: number; classification?: string; criteria?: Record<string, boolean>; rsi_divergence?: string; macd_hist_slope?: string; vol_exhaustion?: string }
  _consensus8?: { score?: number; signals?: Record<string, string> }
  pe_ratio?: number | null; roe?: number | null; net_margin?: number | null; debt_equity?: number | null; revenue_growth_yoy?: number | null; moat?: string; investment_thesis?: string
  targets?: { bear?: number; base?: number; bull?: number; upside_base_pct?: number }
  entry_zone?: string; stop_loss?: number; risk_rating?: number; catalysts?: string[]; risks?: string[]
  bw_summary?: string; bw_overall_risk?: string; bw_risk_score?: number; bw_dimensions?: Record<string, Dim>; tail_risks?: string[]; hedges?: string[]; max_position_pct?: number; recession_drawdown_pct?: number
  tech_summary?: string; ct_confidence?: string; entry_tech?: number; stop_tech?: number; target1?: number; target2?: number; risk_reward?: number
  ab1_signal?: string; ab1_always_in?: string; ab1_bar_score?: number; ab1_bar_quality?: string; ab1_entry_pattern?: string; ab1_summary?: string
  ab2_trend_strength?: string; ab2_score?: number; ab2_score_slope?: string; ab2_pullback_quality?: string; ab2_trend_type?: string; ab2_summary?: string; ab2_bull_criteria?: number; ab2_bear_criteria?: number
  ab3_signal?: string; ab3_market_phase?: string; ab3_breakout_pressure?: string; ab3_breakout_quality?: string; ab3_range_top?: number; ab3_range_bottom?: number; ab3_summary?: string
  ab4_signal?: string; ab4_reversal_risk?: string; ab4_reversal_score?: number; ab4_traders_equation?: string; ab4_pattern?: string; ab4_summary?: string; ab4_pre_reversal_flag?: boolean
  jpm_flow_signal?: string; jpm_play?: string; jpm_implied_move_pct?: number; jpm_options_skew?: string; jpm_positioning?: string; jpm_event_risk?: string
}

// ── UI helpers ────────────────────────────────────────────────────────────────
function Card({ children, title, style }: { children: React.ReactNode; title?: string; style?: React.CSSProperties }) {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, minHeight: 0, ...style }}>
      {title && <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--gold)', fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>{title}</div>}
      {children}
    </div>
  )
}
function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, letterSpacing: '0.08em', color: accent ?? 'var(--gold)', fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase', marginBottom: 9, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>{title}</div>
      {children}
    </div>
  )
}
function G2({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 28px' }}>{children}</div>
}
function M({ k, v, c }: { k: string; v: React.ReactNode; c?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{k}</span>
      <span style={{ fontSize: 14, fontFamily: MONO, color: c ?? 'var(--text)', textAlign: 'right' }}>{v}</span>
    </div>
  )
}
function Narr({ children }: { children: React.ReactNode }) {
  if (!children) return null
  return <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', margin: '0 0 14px', background: 'var(--bg)', borderLeft: '3px solid var(--gold)', padding: '11px 15px', borderRadius: '0 6px 6px 0' }}>{children}</p>
}
function Pillar({ label, v, max }: { label: string; v: number; max: number }) {
  const mag = (Math.min(Math.abs(v), max) / max) * 50, pos = v >= 0
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

// ── Gráfico com eixos ─────────────────────────────────────────────────────────
function PriceChart({ hist, refs }: { hist: RxHist[]; refs: { label: string; v: number; c: string }[] }) {
  const data = [...hist].reverse().filter(h => Number(h.price))
  if (data.length < 2) return <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>sem histórico suficiente</div>
  const prices = data.map(h => Number(h.price))
  const refVals = refs.map(r => r.v).filter(v => typeof v === 'number' && v > 0)
  const lo = Math.min(...prices, ...refVals), hi = Math.max(...prices, ...refVals)
  const span = (hi - lo) || 1, pad = span * 0.06
  const yMin = lo - pad, yMax = hi + pad
  const W = 700, H = 300, mL = 48, mR = 56, mT = 10, mB = 22
  const pw = W - mL - mR, ph = H - mT - mB
  const X = (i: number) => mL + (i / (data.length - 1)) * pw
  const Y = (v: number) => mT + (1 - (v - yMin) / (yMax - yMin)) * ph
  const line = prices.map((v, i) => `${X(i)},${Y(v)}`).join(' ')
  const area = `${X(0)},${mT + ph} ${line} ${X(data.length - 1)},${mT + ph}`
  const up = prices[prices.length - 1] >= prices[0]
  const col = up ? 'var(--green)' : 'var(--red)'
  const yticks = [0, 1, 2, 3, 4].map(i => yMin + (yMax - yMin) * (i / 4))
  const xidx = [0, Math.floor((data.length - 1) / 3), Math.floor(2 * (data.length - 1) / 3), data.length - 1]
  const dt = (s: string) => { const p = s.split('-'); return `${p[2]}/${p[1]}` }
  const lastP = prices[prices.length - 1]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs><linearGradient id="rxg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={col} stopOpacity="0.25" /><stop offset="100%" stopColor={col} stopOpacity="0" /></linearGradient></defs>
      {/* grid + eixo Y */}
      {yticks.map((v, i) => (
        <g key={i}>
          <line x1={mL} y1={Y(v)} x2={mL + pw} y2={Y(v)} stroke="var(--border)" strokeWidth={0.5} />
          <text x={mL - 6} y={Y(v) + 3} fontSize={9} fill="var(--text-muted)" textAnchor="end" fontFamily="monospace">{v.toFixed(2)}</text>
        </g>
      ))}
      {/* eixo X */}
      {xidx.map((i, k) => (
        <text key={k} x={X(i)} y={H - 6} fontSize={9} fill="var(--text-muted)" textAnchor={k === 0 ? 'start' : k === xidx.length - 1 ? 'end' : 'middle'} fontFamily="monospace">{dt(data[i].analysis_date)}</text>
      ))}
      {/* área + linha */}
      <polygon points={area} fill="url(#rxg)" />
      <polyline points={line} fill="none" stroke={col} strokeWidth={2} vectorEffect="non-scaling-stroke" />
      {/* linhas de referência (MM, suportes) */}
      {refs.filter(r => r.v > 0 && r.v >= yMin && r.v <= yMax).map((r, i) => (
        <g key={i}>
          <line x1={mL} y1={Y(r.v)} x2={mL + pw} y2={Y(r.v)} stroke={r.c} strokeWidth={1} strokeDasharray="4 3" opacity={0.7} />
          <text x={mL + pw + 4} y={Y(r.v) + 3} fontSize={8.5} fill={r.c} fontFamily="monospace">{r.label}</text>
        </g>
      ))}
      {/* marcador preço atual */}
      <circle cx={X(data.length - 1)} cy={Y(lastP)} r={3} fill={col} />
    </svg>
  )
}

// Cor institucional de cada casa
const BANK: Record<string, string> = {
  jp: '#A47551',  // JP Morgan — bronze (octógono)
  gs: '#6CA2D6',  // Goldman Sachs — azul claro
  bw: '#1F4E79',  // Morgan Stanley — navy
  ct: '#17B4AE',  // Citadel — teal
  ab: '#D4AF45',  // Price Action — dourado
}
const TABS = [
  { key: 'jp', label: 'JP Morgan' },
  { key: 'gs', label: 'Goldman Sachs' },
  { key: 'bw', label: 'Bridgewater' },
  { key: 'ct', label: 'Citadel' },
  { key: 'ab', label: 'Price Action' },
]

export default function RaioXClient({ a, history }: { a: Record<string, unknown>; history: RxHist[] }) {
  const A = a as unknown as RxAsset
  const [tab, setTab] = useState('gs')

  const intel = computeForce({
    ticker: A._ticker ?? '', name: '', sector: '', logo_small: null, price: 0, change_percent: 0,
    jd_score: A._consensus8?.score ?? null, consensus_signals: A._consensus8?.signals ?? null,
    ex_score: A._ex?.score ?? null, ex_bottom_score: A._ex?.bottom_score ?? null,
    upside_base_pct: null, analysis_date: '',
  })
  const sc = intel.schools
  const T = A._tech ?? {}
  const exTop = A._ex?.score ?? 0, exBot = A._ex?.bottom_score ?? 0
  const hasBottom = exBot >= 3, hasTop = exTop >= 3
  const price = A._hg?.price
  const dy = A._hg?.financials?.dividends?.yield_12m
  const pvp = A._hg?.financials?.price_to_book_ratio

  const methods = [
    { key: 'jp', inst: 'JP Morgan', ...verdictOf(sc.jp) },
    { key: 'gs', inst: 'Goldman Sachs', ...verdictOf(sc.gs) },
    { key: 'bw', inst: 'Bridgewater', ...(sc.bw > 0 ? { t: 'RISCO BAIXO', c: 'var(--green)' } : sc.bw < 0 ? { t: 'RISCO ALTO', c: 'var(--red)' } : { t: 'RISCO MÉDIO', c: 'var(--yellow)' }) },
    { key: 'ct', inst: 'Citadel', ...verdictOf(sc.ct) },
    { key: 'ab', inst: 'Price Action', ...verdictOf(sc.ab) },
  ]

  const chartRefs = [
    { label: 'MA50', v: num(T.ma50) ?? 0, c: 'var(--blue)' },
    { label: 'MA200', v: num(T.ma200) ?? 0, c: 'var(--gold)' },
    { label: 'Sup', v: num(T.support1) ?? 0, c: 'var(--green)' },
    { label: 'Res', v: num(T.resistance1) ?? 0, c: 'var(--red)' },
  ]

  return (
    <div className="raiox">
      {/* TOP BAR */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '11px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)', flexWrap: 'wrap' }}>
        <Link href="/v2" style={{ fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', whiteSpace: 'nowrap' }}>← Painel</Link>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, minWidth: 0 }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 22, color: 'var(--gold)' }}>{A._ticker}</span>
          <span style={{ fontSize: 13, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{A._hg?.company_name ?? A._hg?.name}</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{A._hg?.sector}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 700 }}>R${fmt(price)}</span>
          <span style={{ fontFamily: MONO, fontSize: 13, color: pctColor(A._hg?.change_percent) }}>{pctTxt(A._hg?.change_percent)}</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          {(hasBottom || hasTop) && <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: hasBottom ? 'var(--green)' : '#F97316', padding: '3px 8px', borderRadius: 4, fontFamily: MONO }}>{hasBottom ? `FUNDO ${exBot}/5 ↑` : `TOPO ${exTop}/5 ↓`}</span>}
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
        {/* ESQUERDA */}
        <div className="raiox-left">
          <Card title="JD Score · 8 votos · −8 a +8">
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}><Pillar label="Fundamental" v={intel.fund} max={3} /><Pillar label="Técnico" v={intel.tec} max={5} /></div>
            {methods.map(m => {
              const active = tab === m.key
              return (
                <button key={m.key} onClick={() => setTab(m.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 9px', background: active ? 'var(--bg3)' : 'transparent', border: 'none', borderLeft: `3px solid ${active ? BANK[m.key] : 'transparent'}`, cursor: 'pointer', textAlign: 'left', color: 'var(--text)', borderRadius: 4 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: m.c, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 700, fontFamily: MONO }}>{m.inst}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, fontFamily: MONO, color: m.c }}>{m.t}</span>
                </button>
              )
            })}
            <div style={{ marginTop: 9, fontSize: 11, color: 'var(--text-muted)' }}>reversão {hasBottom ? <strong style={{ color: 'var(--green)' }}>FUNDO ↑ {exBot}/5</strong> : hasTop ? <strong style={{ color: '#F97316' }}>TOPO ↓ {exTop}/5</strong> : 'sem sinal'}{intel.divergent && <span style={{ color: '#A855F7', marginLeft: 10 }}>● divergência</span>}</div>
          </Card>

          <div className="raiox-chart">
            <Card title={`Preço · ${history.length} dias`} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 14, fontSize: 10.5, color: 'var(--text-muted)', fontFamily: MONO, marginBottom: 4, flexWrap: 'wrap' }}>
                <span>52s: <span style={{ color: 'var(--red)' }}>R${fmt(T.week52_low)}</span> – <span style={{ color: 'var(--green)' }}>R${fmt(T.week52_high)}</span></span>
                <span><span style={{ color: 'var(--blue)' }}>● MA50</span> R${fmt(T.ma50)}</span>
                <span><span style={{ color: 'var(--gold)' }}>● MA200</span> R${fmt(T.ma200)}</span>
              </div>
              <div style={{ flex: 1, minHeight: 140 }}><PriceChart hist={history} refs={chartRefs} /></div>
            </Card>
          </div>
        </div>

        {/* DIREITA — abas */}
        <div className="raiox-right">
          <Card style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
              {TABS.map(t => {
                const active = tab === t.key
                const col = BANK[t.key]
                return <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: '10px 18px', fontSize: 13.5, fontWeight: 700, fontFamily: MONO, letterSpacing: '0.03em', background: active ? col : 'transparent', color: active ? '#fff' : 'var(--text-muted)', border: `1.5px solid ${active ? col : 'var(--border)'}`, borderRadius: 6, cursor: 'pointer', transition: 'all .12s' }}>{t.label}</button>
              })}
            </div>

            <div className="raiox-tabcontent" style={{ overflowY: 'auto', paddingRight: 6 }}>
              {/* ── FUNDAMENTAL ── */}
              {tab === 'gs' && (
                <div>
                  <Narr>{A.investment_thesis}</Narr>
                  <Section title="Valuation">
                    <G2>
                      <M k="P/L (P/E)" v={A.pe_ratio != null ? fmt(A.pe_ratio, 1) : '—'} />
                      <M k="P/VP" v={pvp != null ? fmt(pvp, 2) : '—'} />
                      <M k="EV/EBITDA" v={A._brapi?.ev_ebitda != null ? fmt(A._brapi.ev_ebitda, 1) : '—'} />
                      <M k="Dividend Yield" v={dy != null ? `${fmt(dy, 2)}%` : '—'} c="var(--gold)" />
                    </G2>
                  </Section>
                  <Section title="Rentabilidade & Margens">
                    <G2>
                      <M k="ROE" v={A.roe != null ? `${fmt(A.roe, 1)}%` : '—'} c={Number(A.roe) > 15 ? 'var(--green)' : undefined} />
                      <M k="Margem líquida" v={A.net_margin != null ? `${fmt(A.net_margin, 1)}%` : '—'} />
                      <M k="Beta" v={A._brapi?.beta != null ? fmt(A._brapi.beta, 2) : '—'} />
                      <M k="Moat" v={A.moat ?? '—'} c="var(--gold)" />
                    </G2>
                  </Section>
                  <Section title="Endividamento & Crescimento">
                    <G2>
                      <M k="Dívida/Patrim. (D/E)" v={A.debt_equity != null ? fmt(A.debt_equity, 2) : '—'} />
                      <M k="Cresc. receita (a/a)" v={A.revenue_growth_yoy != null ? `${fmt(A.revenue_growth_yoy, 1)}%` : '—'} />
                      <M k="VPA (R$/ação)" v={fmt(A._hg?.financials?.equity_per_share)} />
                      <M k="Free Cash Flow" v={A._brapi?.free_cashflow != null ? `R$${fmt(Number(A._brapi.free_cashflow) / 1e9, 1)}B` : '—'} />
                    </G2>
                  </Section>
                  <Section title="Alvos & Operacional">
                    <div style={{ display: 'flex', gap: 18, fontSize: 14, fontFamily: MONO, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span><span style={{ color: 'var(--text-muted)' }}>Bear </span><span style={{ color: 'var(--red)' }}>R${fmt(A.targets?.bear)}</span></span>
                      <span><span style={{ color: 'var(--text-muted)' }}>Base </span>R${fmt(A.targets?.base)}</span>
                      <span><span style={{ color: 'var(--text-muted)' }}>Bull </span><span style={{ color: 'var(--green)' }}>R${fmt(A.targets?.bull)}</span></span>
                      {A.targets?.upside_base_pct != null && <span><span style={{ color: 'var(--text-muted)' }}>Upside </span><span style={{ color: 'var(--green)' }}>+{fmt(A.targets.upside_base_pct, 1)}%</span></span>}
                    </div>
                    <G2><M k="Zona de entrada" v={A.entry_zone ?? '—'} /><M k="Stop loss" v={`R$${fmt(A.stop_loss)}`} c="var(--red)" /></G2>
                  </Section>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                    {Array.isArray(A.catalysts) && A.catalysts.length > 0 && <div><div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--green)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Catalisadores</div><ul style={{ margin: 0, padding: '0 0 0 15px' }}>{A.catalysts.map((c, i) => <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 5, lineHeight: 1.5 }}>{c}</li>)}</ul></div>}
                    {Array.isArray(A.risks) && A.risks.length > 0 && <div><div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--red)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Riscos</div><ul style={{ margin: 0, padding: '0 0 0 15px' }}>{A.risks.map((c, i) => <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 5, lineHeight: 1.5 }}>{c}</li>)}</ul></div>}
                  </div>
                </div>
              )}

              {/* ── TÉCNICO ── */}
              {tab === 'ct' && (
                <div>
                  <Narr>{A.tech_summary}</Narr>
                  <Section title="Tendência multi-prazo">
                    <div style={{ display: 'flex', gap: 8 }}>
                      {([['Diário', T.trend_daily], ['Semanal', T.trend_weekly], ['Mensal', T.trend_monthly]] as const).map(([k, v]) => (
                        <div key={k} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', background: 'var(--bg)', borderRadius: 6 }}>
                          <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{k}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, fontFamily: MONO, color: trendColor(v) }}>{v === 'BULLISH' ? 'BULL' : v === 'BEARISH' ? 'BEAR' : 'NEUTRO'}</div>
                        </div>
                      ))}
                    </div>
                  </Section>
                  <Section title="Momentum (RSI / MACD)">
                    <G2>
                      <M k="RSI (14)" v={`${fmt(T.rsi, 0)} · ${T.rsi_signal ?? '—'}`} c={Number(T.rsi) >= 70 ? 'var(--red)' : Number(T.rsi) <= 30 ? 'var(--green)' : undefined} />
                      <M k="Divergência RSI" v={T.rsi_divergence ?? 'NONE'} c={sigColor(T.rsi_divergence)} />
                      <M k="MACD" v={T.macd ?? '—'} c={sigColor(T.macd)} />
                      <M k="MACD histograma" v={T.macd_hist_slope ?? '—'} c={sigColor(T.macd_hist_slope)} />
                    </G2>
                  </Section>
                  <Section title="Médias móveis & Volatilidade">
                    <G2>
                      <M k="MA50 / MA200" v={`R$${fmt(T.ma50)} / R$${fmt(T.ma200)}`} />
                      <M k="Acima da MA200" v={T.above_ma200 ? 'Sim' : 'Não'} c={T.above_ma200 ? 'var(--green)' : 'var(--red)'} />
                      <M k="Bollinger" v={T.bollinger ?? '—'} />
                      <M k="Volat. histórica (HV20)" v={T.hv20 != null ? `${fmt(T.hv20, 1)}%` : '—'} />
                    </G2>
                  </Section>
                  <Section title="Suportes, resistências & 52 semanas">
                    <G2>
                      <M k="Suporte 1 / 2" v={`R$${fmt(T.support1)} · R$${fmt(T.support2)}`} c="var(--green)" />
                      <M k="Resistência 1" v={`R$${fmt(T.resistance1)}`} c="var(--red)" />
                      <M k="Mínima 52s" v={`R$${fmt(T.week52_low)}`} />
                      <M k="Máxima 52s" v={`R$${fmt(T.week52_high)}`} />
                    </G2>
                  </Section>
                  <Section title="Níveis operacionais">
                    <G2>
                      <M k="Entrada técnica" v={`R$${fmt(A.entry_tech)}`} />
                      <M k="Stop técnico" v={`R$${fmt(A.stop_tech)}`} c="var(--red)" />
                      <M k="Alvo 1 / 2" v={`R$${fmt(A.target1)} · R$${fmt(A.target2)}`} c="var(--green)" />
                      <M k="Risco / Retorno" v={A.risk_reward != null ? `1:${fmt(A.risk_reward)}` : '—'} />
                    </G2>
                  </Section>
                  <Section title="Exaustão / reversão" accent={hasBottom ? 'var(--green)' : hasTop ? '#F97316' : 'var(--gold)'}>
                    <G2>
                      <M k="EX Topo" v={`${exTop}/5`} c={hasTop ? '#F97316' : undefined} />
                      <M k="EX Fundo" v={`${exBot}/5`} c={hasBottom ? 'var(--green)' : undefined} />
                      <M k="Exaustão de volume" v={T.vol_exhaustion ?? 'NONE'} />
                      <M k="Classificação" v={A._ex?.classification ?? '—'} />
                    </G2>
                    {(hasBottom || hasTop) && <p style={{ fontSize: 11.5, lineHeight: 1.6, color: hasBottom ? 'var(--green)' : '#F97316', marginTop: 8 }}>{hasBottom ? '↑ Possível FUNDO — RSI sobrevendido / divergência altista. Possível volta de alta (oportunidade).' : '↓ Possível TOPO — momento esticado / divergência baixista. Atenção a reversão de baixa.'}</p>}
                  </Section>
                  {T.pattern && <Section title="Padrão gráfico"><p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text)', margin: 0 }}>{T.pattern}</p></Section>}
                </div>
              )}

              {/* ── RISCO ── */}
              {tab === 'bw' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                    <span style={{ fontSize: 34, fontWeight: 800, fontFamily: MONO, color: riskColor(A.bw_overall_risk) }}>{fmt(A.bw_risk_score, 1)}</span>
                    <div><div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Score de risco / 10</div><div style={{ fontSize: 13, fontWeight: 700, color: riskColor(A.bw_overall_risk) }}>{A.bw_overall_risk ?? '—'}</div></div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right', fontSize: 11, color: 'var(--text-muted)' }}>
                      <div>Posição máx. <strong style={{ color: 'var(--text)' }}>{fmt(A.max_position_pct, 1)}%</strong></div>
                      <div>Drawdown recessão <strong style={{ color: 'var(--red)' }}>{fmt(A.recession_drawdown_pct, 0)}%</strong></div>
                    </div>
                  </div>
                  <Narr>{A.bw_summary}</Narr>
                  <Section title="6 dimensões de risco">
                    {A.bw_dimensions && Object.entries(A.bw_dimensions).map(([k, dim]) => (
                      <div key={k} style={{ padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                          <span style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'capitalize', fontWeight: 600 }}>{k.replace(/_/g, ' ')}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: riskColor(dim.r) }}>{dim.r}</span>
                        </div>
                        <p style={{ fontSize: 12.5, color: 'var(--text)', lineHeight: 1.55, margin: 0 }}>{dim.n}</p>
                      </div>
                    ))}
                  </Section>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                    {Array.isArray(A.tail_risks) && A.tail_risks.length > 0 && <div><div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--red)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Tail risks</div><ul style={{ margin: 0, padding: '0 0 0 15px' }}>{A.tail_risks.map((c, i) => <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 5, lineHeight: 1.5 }}>{c}</li>)}</ul></div>}
                    {Array.isArray(A.hedges) && A.hedges.length > 0 && <div><div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--green)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Hedges sugeridos</div><ul style={{ margin: 0, padding: '0 0 0 15px' }}>{A.hedges.map((c, i) => <li key={i} style={{ fontSize: 13, color: 'var(--text)', marginBottom: 5, lineHeight: 1.5 }}>{c}</li>)}</ul></div>}
                  </div>
                </div>
              )}

              {/* ── JP MORGAN ── */}
              {tab === 'jp' && (
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 12 }}>JP Morgan — fluxo institucional e posicionamento de opções</div>
                  <Section title="Fluxo & Posicionamento">
                    <G2>
                      <M k="Sinal de fluxo" v={A.jpm_flow_signal ?? '—'} c={sigColor(A.jpm_flow_signal)} />
                      <M k="Play sugerido" v={A.jpm_play ?? '—'} c={sigColor(A.jpm_play)} />
                      <M k="Posicionamento" v={A.jpm_positioning ?? '—'} />
                      <M k="Skew de opções" v={A.jpm_options_skew ?? '—'} c={/CALL/i.test(A.jpm_options_skew ?? '') ? 'var(--green)' : /PUT/i.test(A.jpm_options_skew ?? '') ? 'var(--red)' : undefined} />
                      <M k="Movimento implícito" v={A.jpm_implied_move_pct != null ? `±${fmt(A.jpm_implied_move_pct, 1)}%` : '—'} />
                    </G2>
                  </Section>
                  {A.jpm_event_risk && <Section title="Risco de evento"><Narr>{A.jpm_event_risk}</Narr></Section>}
                </div>
              )}

              {/* ── AL BROOKS ── */}
              {tab === 'ab' && (
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 12 }}>Al Brooks — price action em 4 frameworks (AB1 direção · AB2 momentum · AB3 fase · AB4 reversão)</div>
                  <Section title="AB1 · Direção da barra" accent={sigColor(A.ab1_signal)}>
                    <G2><M k="Sinal" v={A.ab1_signal ?? '—'} c={sigColor(A.ab1_signal)} /><M k="Always-in" v={A.ab1_always_in ?? '—'} c={sigColor(A.ab1_always_in)} /><M k="Bar score" v={fmt(A.ab1_bar_score, 0)} /><M k="Qualidade / Padrão" v={`${A.ab1_bar_quality ?? '—'} · ${A.ab1_entry_pattern ?? '—'}`} /></G2>
                    <Narr>{A.ab1_summary}</Narr>
                  </Section>
                  <Section title="AB2 · Momentum / Tendência" accent={sigColor(A.ab2_trend_strength)}>
                    <G2><M k="Força da tendência" v={A.ab2_trend_strength ?? '—'} c={sigColor(A.ab2_trend_strength)} /><M k="Score (slope)" v={`${fmt(A.ab2_score, 0)} · ${A.ab2_score_slope ?? '—'}`} c={sigColor(A.ab2_score_slope)} /><M k="Tipo / Pullback" v={`${A.ab2_trend_type ?? '—'} · ${A.ab2_pullback_quality ?? '—'}`} /><M k="Critérios bull/bear" v={`${fmt(A.ab2_bull_criteria, 0)} / ${fmt(A.ab2_bear_criteria, 0)}`} /></G2>
                    <Narr>{A.ab2_summary}</Narr>
                  </Section>
                  <Section title="AB3 · Fase de mercado" accent={sigColor(A.ab3_signal)}>
                    <G2><M k="Sinal" v={A.ab3_signal ?? '—'} c={sigColor(A.ab3_signal)} /><M k="Fase" v={A.ab3_market_phase ?? '—'} /><M k="Breakout" v={`${A.ab3_breakout_pressure ?? '—'} · ${A.ab3_breakout_quality ?? '—'}`} /><M k="Range" v={`R$${fmt(A.ab3_range_bottom)}–R$${fmt(A.ab3_range_top)}`} /></G2>
                    <Narr>{A.ab3_summary}</Narr>
                  </Section>
                  <Section title="AB4 · Reversão" accent={A.ab4_reversal_risk === 'HIGH' ? 'var(--red)' : '#F97316'}>
                    <G2><M k="Sinal" v={A.ab4_signal ?? '—'} c={sigColor(A.ab4_signal)} /><M k="Risco reversão" v={`${A.ab4_reversal_risk ?? '—'} (${fmt(A.ab4_reversal_score, 0)})`} c={riskColor(A.ab4_reversal_risk)} /><M k="Trader's equation" v={A.ab4_traders_equation ?? '—'} /><M k="Padrão" v={A.ab4_pattern ?? '—'} /></G2>
                    <Narr>{A.ab4_summary}</Narr>
                  </Section>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
