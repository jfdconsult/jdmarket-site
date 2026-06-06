'use client'

import { useState, useEffect, useRef } from 'react'
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
export interface PricePoint { date: string; close: number }

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

// ── Calcula média móvel simples de N períodos ─────────────────────────────────
function calcSMA(prices: number[], period: number): (number | null)[] {
  return prices.map((_, i) => {
    if (i < period - 1) return null
    let sum = 0
    for (let j = i - period + 1; j <= i; j++) sum += prices[j]
    return sum / period
  })
}

// ── Gráfico (eixos em HTML, ticks customizáveis, linhas de série adicionais) ─
interface ChartLine { data: (number | null)[]; color: string; label: string; dash?: boolean }
function PriceChart({ hist, refs, yLevels, extraLines }: {
  hist: RxHist[]
  refs?: { label: string; v: number; c: string }[]
  yLevels?: { label: string; v: number; c: string }[]  // eixo Y = esses preços exatos
  extraLines?: ChartLine[]
}) {
  const data = [...hist].reverse().filter(h => Number(h.price))
  if (data.length < 2) return <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: 20 }}>sem histórico suficiente</div>
  const prices = data.map(h => Number(h.price))
  const refVals = (refs ?? []).map(r => r.v).filter(v => v > 0)
  const lvlVals = (yLevels ?? []).map(l => l.v).filter(v => v > 0)
  const extraVals = (extraLines ?? []).flatMap(l => l.data.filter((v): v is number => v != null))
  const allVals = [...prices, ...refVals, ...lvlVals, ...extraVals]
  const lo = Math.min(...allVals), hi = Math.max(...allVals)
  const span = (hi - lo) || 1, pad = span * 0.12
  const yMin = lo - pad, yMax = hi + pad
  const pY = (v: number) => (1 - (v - yMin) / (yMax - yMin)) * 100
  const pX = (i: number) => (i / (data.length - 1)) * 100

  // Eixo Y: se yLevels fornecido, usa os preços exatos como ticks; senão gera 4 uniformes
  const yticks = yLevels && yLevels.length > 0
    ? yLevels.filter(l => l.v > 0).map(l => ({ v: l.v, top: pY(l.v), label: l.label, c: l.c }))
    : [0, 1, 2, 3].map(i => {
        const v = yMin + (yMax - yMin) * (1 - i / 3)
        return { v, top: (i / 3) * 100, label: '', c: 'var(--text-muted)' }
      })

  // Preço atual como tick do eixo Y (sempre)
  const lastP = prices[prices.length - 1]
  const priceTick = { v: lastP, top: pY(lastP), label: 'Preço', c: 'var(--text)' }

  const linePts = prices.map((v, i) => `${pX(i)},${pY(v)}`).join(' ')
  const areaPts = `0,100 ${linePts} 100,100`
  const up = lastP >= prices[0]
  const col = up ? 'var(--green)' : 'var(--red)'
  const dt = (s: string) => { const p = s.split('-'); return `${p[2]}/${p[1]}` }
  const first = dt(data[0].analysis_date), mid = dt(data[Math.floor((data.length - 1) / 2)].analysis_date), last = dt(data[data.length - 1].analysis_date)
  const visRefs = (refs ?? []).filter(r => r.v > 0 && r.v >= yMin && r.v <= yMax)

  // Linhas de série adicionais (MA50, MA200, etc.)
  const seriesPolylines = (extraLines ?? []).map(line => {
    const pts = line.data.map((v, i) => v != null ? `${pX(i)},${pY(v)}` : null).filter(Boolean).join(' ')
    return { pts, color: line.color, dash: line.dash }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div style={{ width: 66, position: 'relative', flexShrink: 0 }}>
          {yticks.map((t, i) => <div key={`y${i}`} style={{ position: 'absolute', right: 6, top: `${t.top}%`, transform: 'translateY(-50%)', fontSize: 12, color: t.c, fontFamily: MONO, fontWeight: 600, whiteSpace: 'nowrap' }}>R${t.v.toFixed(2)}{t.label ? <span style={{ fontSize: 9, color: t.c, opacity: 0.7, marginLeft: 2 }}>{t.label}</span> : null}</div>)}
          <div style={{ position: 'absolute', right: 6, top: `${priceTick.top}%`, transform: 'translateY(-50%)', fontSize: 12, color: col, fontFamily: MONO, fontWeight: 700 }}>R${lastP.toFixed(2)}</div>
        </div>
        <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
          {/* grid lines nos ticks do eixo Y */}
          {yticks.map((t, i) => <div key={`g${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${t.top}%`, borderTop: `1px dashed ${t.c}`, opacity: 0.35 }} />)}
          {/* ref lines */}
          {visRefs.map((r, i) => <div key={`r${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${pY(r.v)}%`, borderTop: `1.5px dashed ${r.c}`, opacity: 0.6 }} />)}
          {/* preço atual: linha horizontal sutil */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: `${priceTick.top}%`, borderTop: `1px solid ${col}`, opacity: 0.3 }} />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs><linearGradient id="rxg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={col} stopOpacity="0.2" /><stop offset="100%" stopColor={col} stopOpacity="0" /></linearGradient></defs>
            <polygon points={areaPts} fill="url(#rxg)" />
            <polyline points={linePts} fill="none" stroke={col} strokeWidth={2.2} vectorEffect="non-scaling-stroke" />
            {seriesPolylines.map((s, i) => s.pts ? <polyline key={i} points={s.pts} fill="none" stroke={s.color} strokeWidth={1.8} strokeDasharray={s.dash ? '6 4' : 'none'} vectorEffect="non-scaling-stroke" opacity={0.85} /> : null)}
          </svg>
          {visRefs.map((r, i) => <div key={`rl${i}`} style={{ position: 'absolute', right: 3, top: `${pY(r.v)}%`, transform: 'translateY(-50%)', fontSize: 12, fontWeight: 700, color: r.c, fontFamily: MONO, background: 'var(--bg2)', padding: '0 5px', borderRadius: 3 }}>{r.label}</div>)}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 66, marginTop: 8, fontSize: 13, color: 'var(--text-muted)', fontFamily: MONO }}>
        <span>{first}</span><span>{mid}</span><span>{last}</span>
      </div>
    </div>
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
// ── TradingView embed (gratuito, interativo) ──────────────────────────────────
function TVChart({ ticker }: { ticker: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BMFBOVESPA:${ticker}`,
      interval: 'D',
      timezone: 'America/Sao_Paulo',
      theme: 'dark',
      style: '1',
      locale: 'br',
      backgroundColor: 'rgba(9, 14, 20, 1)',
      gridColor: 'rgba(30, 45, 61, 0.3)',
      allow_symbol_change: false,
      calendar: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      studies: [
        { id: 'STD;SMA', inputs: { length: 50 } },
        { id: 'STD;SMA', inputs: { length: 200 } },
        { id: 'STD;RSI' },
        { id: 'STD;MACD' },
        { id: 'STD;Bollinger_Bands' },
      ],
      support_host: 'https://www.tradingview.com',
    })
    const wrapper = document.createElement('div')
    wrapper.className = 'tradingview-widget-container__widget'
    wrapper.style.height = '100%'
    wrapper.style.width = '100%'
    containerRef.current.appendChild(wrapper)
    containerRef.current.appendChild(script)
  }, [ticker])
  return <div ref={containerRef} className="tradingview-widget-container" style={{ height: '100%', width: '100%' }} />
}

const TABS = [
  { key: 'jp', label: 'JP Morgan' },
  { key: 'gs', label: 'Goldman Sachs' },
  { key: 'bw', label: 'Bridgewater' },
  { key: 'ct', label: 'Citadel' },
  { key: 'ab', label: 'Price Action' },
]

export default function RaioXClient({ a, history, priceHistory }: { a: Record<string, unknown>; history: RxHist[]; priceHistory: PricePoint[] }) {
  const A = a as unknown as RxAsset
  const [tab, setTab] = useState('gs')
  const [abOpen, setAbOpen] = useState<string | null>(null)
  const [fullChart, setFullChart] = useState(false)

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
          <button onClick={() => setFullChart(v => !v)} style={{
            padding: '6px 14px', fontSize: 12, fontWeight: 700, fontFamily: MONO,
            background: fullChart ? 'var(--gold)' : 'transparent',
            color: fullChart ? 'var(--bg)' : 'var(--gold)',
            border: '1.5px solid var(--gold)', borderRadius: 5, cursor: 'pointer',
            letterSpacing: '0.03em', whiteSpace: 'nowrap',
          }}>
            {fullChart ? '← ANÁLISES' : '📊 FULL GRÁFICO'}
          </button>
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

      {/* FULL CHART MODE */}
      {fullChart && (
        <div style={{ flex: 1, minHeight: 0, padding: 14 }}>
          <TVChart ticker={A._ticker ?? ''} />
        </div>
      )}

      {/* BODY — análises (escondido quando fullChart ativo) */}
      {!fullChart && <div className="raiox-body">
        <div className="raiox-top">
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
            <div style={{ marginTop: 9, fontSize: 12, color: 'var(--text-muted)' }}>reversão {hasBottom ? <strong style={{ color: 'var(--green)' }}>FUNDO ↑ {exBot}/5</strong> : hasTop ? <strong style={{ color: '#F97316' }}>TOPO ↓ {exTop}/5</strong> : 'sem sinal'}{intel.divergent && <span style={{ color: '#A855F7', marginLeft: 10 }}>● divergência</span>}</div>
          </Card>
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
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 12 }}>Al Brooks — price action em 4 frameworks. Clique para expandir.</div>
                  {([
                    { key: 'ab1', title: 'AB1 · Direção da barra', accent: sigColor(A.ab1_signal), verdict: A.ab1_signal, content: (
                      <><G2><M k="Sinal" v={A.ab1_signal ?? '—'} c={sigColor(A.ab1_signal)} /><M k="Always-in" v={A.ab1_always_in ?? '—'} c={sigColor(A.ab1_always_in)} /><M k="Bar score" v={fmt(A.ab1_bar_score, 0)} /><M k="Qualidade / Padrão" v={`${A.ab1_bar_quality ?? '—'} · ${A.ab1_entry_pattern ?? '—'}`} /></G2><Narr>{A.ab1_summary}</Narr></>
                    )},
                    { key: 'ab2', title: 'AB2 · Momentum / Tendência', accent: sigColor(A.ab2_trend_strength), verdict: A.ab2_trend_strength, content: (
                      <><G2><M k="Força da tendência" v={A.ab2_trend_strength ?? '—'} c={sigColor(A.ab2_trend_strength)} /><M k="Score (slope)" v={`${fmt(A.ab2_score, 0)} · ${A.ab2_score_slope ?? '—'}`} c={sigColor(A.ab2_score_slope)} /><M k="Tipo / Pullback" v={`${A.ab2_trend_type ?? '—'} · ${A.ab2_pullback_quality ?? '—'}`} /><M k="Critérios bull/bear" v={`${fmt(A.ab2_bull_criteria, 0)} / ${fmt(A.ab2_bear_criteria, 0)}`} /></G2><Narr>{A.ab2_summary}</Narr></>
                    )},
                    { key: 'ab3', title: 'AB3 · Fase de mercado', accent: sigColor(A.ab3_signal), verdict: A.ab3_signal, content: (
                      <><G2><M k="Sinal" v={A.ab3_signal ?? '—'} c={sigColor(A.ab3_signal)} /><M k="Fase" v={A.ab3_market_phase ?? '—'} /><M k="Breakout" v={`${A.ab3_breakout_pressure ?? '—'} · ${A.ab3_breakout_quality ?? '—'}`} /><M k="Range" v={`R$${fmt(A.ab3_range_bottom)}–R$${fmt(A.ab3_range_top)}`} /></G2><Narr>{A.ab3_summary}</Narr></>
                    )},
                    { key: 'ab4', title: 'AB4 · Reversão', accent: A.ab4_reversal_risk === 'HIGH' ? 'var(--red)' : '#F97316', verdict: A.ab4_reversal_risk, content: (
                      <><G2><M k="Sinal" v={A.ab4_signal ?? '—'} c={sigColor(A.ab4_signal)} /><M k="Risco reversão" v={`${A.ab4_reversal_risk ?? '—'} (${fmt(A.ab4_reversal_score, 0)})`} c={riskColor(A.ab4_reversal_risk)} /><M k="Trader's equation" v={A.ab4_traders_equation ?? '—'} /><M k="Padrão" v={A.ab4_pattern ?? '—'} /></G2><Narr>{A.ab4_summary}</Narr></>
                    )},
                  ] as const).map(item => {
                    const isOpen = abOpen === item.key
                    return (
                      <div key={item.key} style={{ borderBottom: '1px solid var(--border)', marginBottom: 2 }}>
                        <button onClick={() => setAbOpen(isOpen ? null : item.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 4px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)' }}>
                          <span style={{ fontSize: 16, color: item.accent, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform .15s', display: 'inline-block' }}>›</span>
                          <span style={{ flex: 1, fontSize: 14, fontWeight: 700, fontFamily: MONO, color: isOpen ? item.accent : 'var(--text)' }}>{item.title}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: MONO, color: item.accent }}>{item.verdict ?? '—'}</span>
                        </button>
                        {isOpen && <div style={{ padding: '0 4px 14px 26px' }}>{item.content}</div>}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </Card>
        </div>
        </div>
        <div className="raiox-chartfull">
          {(() => {
            // Usa dados Yahoo (6 meses) se disponíveis, senão cai no JD history
            const hasYahoo = priceHistory.length >= 30
            const yahooHist: RxHist[] = priceHistory.map(p => ({ analysis_date: p.date, price: p.close }))
            const chartSource = hasYahoo ? yahooHist : [...history].slice(0, 30)
            const nDays = chartSource.length
            const label = hasYahoo ? `${nDays} dias (6 meses)` : `${nDays} dias`

            // Calcula MA50 e MA200 de VERDADE sobre os 6 meses de dados
            const allPrices = hasYahoo
              ? priceHistory.map(p => p.close)
              : [...history].slice(0, 60).reverse().map(h => Number(h.price)).filter(Boolean)
            const ma50Full = calcSMA(allPrices, 50)
            const ma200Full = calcSMA(allPrices, 200)
            // Pega só os últimos N (o que mostramos no gráfico)
            const offset = allPrices.length - nDays
            const ma50 = ma50Full.slice(offset)
            const ma200 = ma200Full.slice(offset)

            // Cruzamento das MA50/MA200 nos últimos 5 dias
            let crossSignal = ''
            for (let i = ma50.length - 1; i >= Math.max(0, ma50.length - 5); i--) {
              const c50 = ma50[i], p50 = ma50[i - 1], c200 = ma200[i], p200 = ma200[i - 1]
              if (c50 != null && p50 != null && c200 != null && p200 != null) {
                if (p50 < p200 && c50 >= c200) { crossSignal = 'GOLDEN CROSS ↑ (MA50 cruzou acima da MA200)'; break }
                if (p50 > p200 && c50 <= c200) { crossSignal = 'DEATH CROSS ↓ (MA50 cruzou abaixo da MA200)'; break }
              }
            }
            if (!crossSignal) {
              const lastMA50 = ma50.filter((v): v is number => v != null).at(-1)
              const lastMA200 = ma200.filter((v): v is number => v != null).at(-1)
              if (lastMA50 != null && lastMA200 != null) {
                crossSignal = lastMA50 > lastMA200 ? 'MA50 acima da MA200 (tendência de alta)' : 'MA50 abaixo da MA200 (tendência de baixa)'
              }
            }
            const crossColor = crossSignal.includes('↑') || crossSignal.includes('alta') ? 'var(--green)' : crossSignal.includes('↓') || crossSignal.includes('baixa') ? 'var(--red)' : 'var(--text-muted)'

            return (
              <>
                <Card title={`Médias móveis · ${label}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', fontFamily: MONO, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span><span style={{ color: 'var(--blue)' }}>━ MA50</span></span>
                    <span><span style={{ color: 'var(--gold)' }}>━ MA200</span></span>
                    <span style={{ color: crossColor, fontWeight: 700 }}>{crossSignal}</span>
                  </div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <PriceChart
                      hist={chartSource}
                      yLevels={[
                        { label: 'MA50', v: num(T.ma50) ?? 0, c: 'var(--blue)' },
                        { label: 'MA200', v: num(T.ma200) ?? 0, c: 'var(--gold)' },
                      ]}
                      extraLines={[
                        { data: ma50, color: 'var(--blue)', label: 'MA50' },
                        { data: ma200, color: 'var(--gold)', label: 'MA200', dash: true },
                      ]}
                    />
                  </div>
                </Card>
                <Card title={`Suporte & resistência · ${label}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', fontFamily: MONO, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span><span style={{ color: 'var(--green)' }}>┄ Suporte</span> R${fmt(T.support1)}</span>
                    <span><span style={{ color: 'var(--red)' }}>┄ Resistência</span> R${fmt(T.resistance1)}</span>
                    <span>52s: R${fmt(T.week52_low)}–R${fmt(T.week52_high)}</span>
                  </div>
                  <div style={{ flex: 1, minHeight: 0 }}>
                    <PriceChart
                      hist={chartSource}
                      refs={[
                        { label: 'Sup', v: num(T.support1) ?? 0, c: 'var(--green)' },
                        { label: 'Res', v: num(T.resistance1) ?? 0, c: 'var(--red)' },
                      ]}
                      yLevels={[
                        { label: 'Sup', v: num(T.support1) ?? 0, c: 'var(--green)' },
                        { label: 'Res', v: num(T.resistance1) ?? 0, c: 'var(--red)' },
                      ]}
                    />
                  </div>
                </Card>
              </>
            )
          })()}
        </div>
      </div>}
    </div>
  )
}
