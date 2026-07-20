'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Movers, MatrixEntry } from '@/lib/intelligence'
import type { MarketPulse } from '@/lib/types'
import { useFavorites } from '@/lib/useFavorites'
import FavStar from '@/components/FavStar'

// ── helpers ──────────────────────────────────────────────────────────────────
const MONO = 'var(--font-geist-mono), monospace'
const WHATSAPP_URL = 'https://wa.me/5521992428700?text=Oi%20Jo%C3%A3o%2C%20vim%20pelo%20app%20do%20JD%20Market'

const fmt = (n: number | null | undefined, d = 2) => n == null ? '—' : Number(n).toFixed(d)
const milhar = (n: number | null | undefined, d = 0) => n == null ? '—' : Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })
const pctColor = (n: number | null | undefined) => (n ?? 0) > 0 ? 'var(--green)' : (n ?? 0) < 0 ? 'var(--red)' : 'var(--text-muted)'
const pctTxt = (n: number | null | undefined) => n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`
const forceColor = (f: number) => f >= 2 ? 'var(--green)' : f <= -2 ? 'var(--red)' : 'var(--text-muted)'
const biasColor = (b: string) => b.includes('BULL') ? 'var(--green)' : b.includes('BEAR') ? 'var(--red)' : 'var(--text-muted)'

// ── labels de tendência (usado no filtro TREND) ─────────────────────────────
const TREND_LABEL: Record<string, { label: string; short: string; color: string; sub: string }> = {
  SB:  { label: 'STRONG BULL',  short: 'S. BULL',  color: 'var(--green)',      sub: 'força total · +5 a +8' },
  B:   { label: 'BULL',         short: 'BULL',     color: 'var(--green)',      sub: 'viés de alta · +2 a +4' },
  N:   { label: 'NEUTRAL',      short: 'NEUTRO',   color: 'var(--text-muted)', sub: 'range · −1 a +1' },
  BR:  { label: 'BEAR',         short: 'BEAR',     color: 'var(--red)',        sub: 'viés de baixa · −4 a −2' },
  SBR: { label: 'STRONG BEAR',  short: 'S. BEAR',  color: 'var(--red)',        sub: 'força vendedora · −8 a −5' },
}
type TrendKey = keyof typeof TREND_LABEL
const trendOfEntry = (m: MatrixEntry): TrendKey => {
  if (m.force >= 5) return 'SB'
  if (m.force >= 2) return 'B'
  if (m.force >= -1) return 'N'
  if (m.force >= -4) return 'BR'
  return 'SBR'
}

// ── ícones ───────────────────────────────────────────────────────────────────
const Icon = {
  panel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z" />
    </svg>
  ),
  analysis: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <polyline points="3 17 8 12 12 15 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </svg>
  ),
  trend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M2 14c3 0 3-6 6-6s3 6 6 6 3-6 6-6" />
      <polyline points="17 5 20 8 17 11" />
    </svg>
  ),
  star: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
    </svg>
  ),
  news: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M4 5h13a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5z" />
      <path d="M19 8h1a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2" />
      <path d="M7 9h8M7 12h8M7 15h5" />
    </svg>
  ),
  chat: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.5 3 2 6.9 2 11.7c0 2 .8 3.9 2.2 5.4L3 21l4.2-1.3c1.5.6 3.1 1 4.8 1 5.5 0 10-3.9 10-8.9S17.5 3 12 3z" />
    </svg>
  ),
}

type TabKey = 'panel' | 'analysis' | 'trend' | 'favs' | 'news'
const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'panel',    label: 'Painel',   icon: Icon.panel },
  { key: 'analysis', label: 'Análise',  icon: Icon.analysis },
  { key: 'trend',    label: 'Trend',    icon: Icon.trend },
  { key: 'favs',     label: 'Favs',     icon: Icon.star },
  { key: 'news',     label: 'Notícias', icon: Icon.news },
]

// ── linha de ativo (reusada) ─────────────────────────────────────────────────
function AssetRow({ m, right, showBias = true }: { m: MatrixEntry; right?: React.ReactNode; showBias?: boolean }) {
  return (
    <Link href={`/${m.ticker}`} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center', padding: '11px 12px', textDecoration: 'none', color: 'var(--text)', background: 'var(--bg2)', borderRadius: 10, border: '1px solid var(--border)' }}>
      <span onClick={e => e.stopPropagation()} style={{ display: 'inline-flex' }}>
        <FavStar ticker={m.ticker} size={18} />
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15, color: 'var(--gold)' }}>{m.ticker}</span>
          {m.divergent && <span title="divergência" style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7', display: 'inline-block' }} />}
        </span>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {m.name} · R${fmt(m.price)} <span style={{ color: pctColor(m.change_percent) }}>{pctTxt(m.change_percent)}</span>
        </span>
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {right ?? (
          showBias && (
            <>
              <span style={{ fontSize: 11, fontFamily: MONO, fontWeight: 700, color: biasColor(m.bias), letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>{m.bias.replace('STRONG ', 'S.')}</span>
              <span style={{ fontSize: 16, fontFamily: MONO, fontWeight: 800, color: forceColor(m.force), minWidth: 32, textAlign: 'right' }}>{m.force > 0 ? '+' : ''}{m.force}</span>
            </>
          )
        )}
      </span>
    </Link>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 30, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>{children}</div>
}

function SectionTitle({ children, hint, color = 'var(--gold)' }: { children: React.ReactNode; hint?: string; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '18px 0 10px' }}>
      <h3 style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>{children}</h3>
      {hint && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>· {hint}</span>}
    </div>
  )
}

// ── PAINEL ───────────────────────────────────────────────────────────────────
type MoverKind = 'flips' | 'gainers' | 'losers' | 'bottoms' | 'exhaustion' | 'divergences'

function PanelTab({ matrix, movers, pulse, prevTxt, onGoFavs }: {
  matrix: MatrixEntry[]; movers: Movers; pulse: MarketPulse | null; prevTxt: string
  onGoAnalysis: () => void; onGoFavs: () => void
}) {
  const { favs, ready } = useFavorites()
  const tally = useMemo(() => {
    let alt = 0, neu = 0, bai = 0
    for (const m of matrix) { if (m.bias.includes('BULL')) alt++; else if (m.bias.includes('BEAR')) bai++; else neu++ }
    return { alt, neu, bai }
  }, [matrix])
  const total = tally.alt + tally.neu + tally.bai || 1
  const w = (n: number) => `${(n / total) * 100}%`

  const favEntries = useMemo(() => favs.map(t => matrix.find(m => m.ticker === t)).filter(Boolean) as MatrixEntry[], [favs, matrix])
  const topBulls = useMemo(() => [...matrix].filter(m => m.force >= 5).sort((a, b) => b.force - a.force).slice(0, 3), [matrix])

  // Expansão inline dos cards "o que mudou hoje"
  const [expanded, setExpanded] = useState<MoverKind | null>(null)
  const moverList = (kind: MoverKind): MatrixEntry[] => {
    const byTicker = (t: string) => matrix.find(m => m.ticker === t)!
    const src: string[] = kind === 'flips'       ? movers.flips.map(f => f.ticker)
                        : kind === 'gainers'     ? movers.gainers.map(g => g.ticker)
                        : kind === 'losers'      ? movers.losers.map(g => g.ticker)
                        : kind === 'bottoms'     ? movers.bottoms.map(e => e.ticker)
                        : kind === 'exhaustion'  ? movers.exhaustion.map(e => e.ticker)
                        :                          movers.divergences.map(d => d.ticker)
    return src.map(byTicker).filter(Boolean)
  }

  return (
    <>
      {/* ÍNDICES no topo */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <IndexTile label="Ibovespa" value={milhar(pulse?.ibovespa.price)} change={pulse?.ibovespa.change_percent} />
        <IndexTile label="IBX50" value={milhar(pulse?.ibx50.price, 2)} change={pulse?.ibx50.change_percent} />
        <IndexTile label="USD/BRL" value={fmt(pulse?.usdbrl.price, 4)} change={pulse?.usdbrl.change_percent} />
      </div>

      {/* BARRA colorida bull/neutro/bear — logo abaixo dos índices */}
      <div style={{ marginTop: 10, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
        <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: 'var(--bg3)' }}>
          <div style={{ width: w(tally.alt), background: 'var(--green)' }} title={`${tally.alt} bull`} />
          <div style={{ width: w(tally.neu), background: 'var(--text-muted)', opacity: 0.55 }} title={`${tally.neu} neutro`} />
          <div style={{ width: w(tally.bai), background: 'var(--red)' }} title={`${tally.bai} bear`} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: MONO, marginTop: 6 }}>
          <span style={{ color: 'var(--green)' }}>{tally.alt}↑ bull</span>
          <span style={{ color: 'var(--text-muted)' }}>{tally.neu}– neutro</span>
          <span style={{ color: 'var(--red)' }}>{tally.bai}↓ bear</span>
        </div>
      </div>

      {/* O QUE MUDOU HOJE — cards clicáveis que expandem lista inline */}
      <SectionTitle hint={`vs ${prevTxt}`}>O que mudou hoje</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <SummaryCard n={movers.flips.length}       label="viraram de viés" color="var(--gold)"        active={expanded === 'flips'}       onClick={() => setExpanded(x => x === 'flips' ? null : 'flips')} />
        <SummaryCard n={movers.gainers.length}     label="ganharam força"  color="var(--green)"       active={expanded === 'gainers'}     onClick={() => setExpanded(x => x === 'gainers' ? null : 'gainers')} />
        <SummaryCard n={movers.losers.length}      label="perderam força"  color="var(--red)"         active={expanded === 'losers'}      onClick={() => setExpanded(x => x === 'losers' ? null : 'losers')} />
        <SummaryCard n={movers.bottoms.length}     label="fundos ↑"        color="var(--green)"       active={expanded === 'bottoms'}     onClick={() => setExpanded(x => x === 'bottoms' ? null : 'bottoms')} />
        <SummaryCard n={movers.exhaustion.length}  label="topos ↓"         color="#F97316"            active={expanded === 'exhaustion'}  onClick={() => setExpanded(x => x === 'exhaustion' ? null : 'exhaustion')} />
        <SummaryCard n={movers.divergences.length} label="divergências"    color="#A855F7"            active={expanded === 'divergences'} onClick={() => setExpanded(x => x === 'divergences' ? null : 'divergences')} />
      </div>
      {expanded && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {moverList(expanded).length === 0
            ? <Empty>Nada hoje nesta categoria</Empty>
            : moverList(expanded).map(m => <AssetRow key={m.ticker} m={m} />)}
        </div>
      )}

      {/* FAVS PREVIEW */}
      {ready && favEntries.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '20px 0 10px' }}>
            <h3 style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>★ Suas ações</h3>
            <button onClick={onGoFavs} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', fontSize: 10, fontFamily: MONO, letterSpacing: '0.05em', cursor: 'pointer', textTransform: 'uppercase' }}>ver todas →</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {favEntries.slice(0, 3).map(m => <AssetRow key={m.ticker} m={m} />)}
          </div>
        </>
      )}
      {ready && favEntries.length === 0 && topBulls.length > 0 && (
        <>
          <SectionTitle color="var(--green)" hint="STRONG BULL · sugestão do dia">Mais fortes agora</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {topBulls.map(m => <AssetRow key={m.ticker} m={m} />)}
          </div>
          <div style={{ marginTop: 10, padding: '10px 14px', border: '1px dashed var(--gold)', borderRadius: 10, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--gold)' }}>★</strong> toque na estrela pra favoritar — elas aparecem aqui em cima toda vez.
          </div>
        </>
      )}
    </>
  )
}

function SummaryCard({ n, label, color, onClick, active }: { n: number; label: string; color: string; onClick: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} style={{ background: active ? 'var(--bg3)' : 'var(--bg2)', border: `1px solid ${active ? color : 'var(--border)'}`, borderRadius: 10, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', WebkitTapHighlightColor: 'transparent', transition: 'background .12s, border-color .12s' }}>
      <div style={{ fontSize: 22, fontFamily: MONO, fontWeight: 800, color, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: MONO, letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
    </button>
  )
}

function IndexTile({ label, value, change }: { label: string; value: string; change?: number | null }) {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
      <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: MONO }}>{label}</div>
      <div style={{ fontSize: 14, fontFamily: MONO, fontWeight: 700, marginTop: 3 }}>{value}</div>
      {change != null && <div style={{ fontSize: 11, fontFamily: MONO, color: pctColor(change), marginTop: 1 }}>{pctTxt(change)}</div>}
    </div>
  )
}

// ── ANÁLISE: 5 escolas em sub-tabs ───────────────────────────────────────────
type SchoolKey = 'gs' | 'jp' | 'bw' | 'ct' | 'ab'

const SCHOOLS: { key: SchoolKey; short: string; inst: string; area: string; desc: string; max: number }[] = [
  { key: 'gs', short: 'GS', inst: 'Goldman Sachs',  area: 'Fundamentalista', desc: 'Valuation, moat, catalisadores, teses de investimento. Escolhe empresas.',                max: 1 },
  { key: 'jp', short: 'JP', inst: 'JP Morgan',      area: 'Fluxo & Opções',  desc: 'Posicionamento institucional, skew de opções, risco de evento.',                        max: 1 },
  { key: 'bw', short: 'BW', inst: 'Bridgewater',    area: 'Risco',           desc: 'Regime macro, tail risk, drawdown, hedges. Mede o preço a pagar em stress.',            max: 1 },
  { key: 'ct', short: 'CT', inst: 'Citadel',        area: 'Técnica',         desc: 'Tendência, momentum, MAs, RSI, MACD, Bollinger. Timing de mercado.',                    max: 1 },
  { key: 'ab', short: 'AB', inst: 'Al Brooks',      area: 'Price Action',    desc: 'AB1..AB4 · direção, momentum, confluência de MAs, tendência. Leitura do gráfico puro.', max: 4 },
]

function AnalysisTab({ matrix }: { matrix: MatrixEntry[] }) {
  const [school, setSchool] = useState<SchoolKey>('gs')
  const meta = SCHOOLS.find(s => s.key === school)!

  const scoreOf = (m: MatrixEntry) => m.schools[school]

  const bulls = useMemo(() => matrix.filter(m => scoreOf(m) > 0).sort((a, b) => scoreOf(b) - scoreOf(a) || b.force - a.force), [matrix, school])
  const neutrals = useMemo(() => matrix.filter(m => scoreOf(m) === 0).sort((a, b) => b.force - a.force), [matrix, school])
  const bears = useMemo(() => matrix.filter(m => scoreOf(m) < 0).sort((a, b) => scoreOf(a) - scoreOf(b) || a.force - b.force), [matrix, school])

  const scoreBadge = (v: number) => {
    const c = v > 0 ? 'var(--green)' : v < 0 ? 'var(--red)' : 'var(--text-muted)'
    return <span style={{ fontSize: 12, fontFamily: MONO, fontWeight: 800, color: c, minWidth: 28, textAlign: 'right' }}>{v > 0 ? '+' : ''}{v}</span>
  }

  return (
    <>
      {/* Sub-tabs de escolas */}
      <div className="chip-row" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6, marginBottom: 4 }}>
        {SCHOOLS.map(s => {
          const active = school === s.key
          return (
            <button key={s.key} onClick={() => setSchool(s.key)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, padding: '8px 14px', borderRadius: 10, background: active ? 'var(--bg3)' : 'var(--bg2)', border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`, cursor: 'pointer', flexShrink: 0, WebkitTapHighlightColor: 'transparent' }}>
              <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 13, color: active ? 'var(--gold)' : 'var(--text)', letterSpacing: '0.03em' }}>{s.short}</span>
              <span style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: MONO, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.area}</span>
            </button>
          )
        })}
      </div>

      {/* Descrição da escola */}
      <div style={{ background: 'var(--bg2)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', padding: '12px 14px', margin: '8px 0 4px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{meta.inst}</div>
        <div style={{ fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: MONO, marginBottom: 8 }}>{meta.area}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{meta.desc}</div>
      </div>

      {/* Buckets */}
      <SchoolBucket title={`Voto BULL · ${meta.short}`} count={bulls.length} color="var(--green)" items={bulls} schoolKey={school} render={scoreBadge} />
      <SchoolBucket title={`Voto NEUTRO · ${meta.short}`} count={neutrals.length} color="var(--text-muted)" items={neutrals} schoolKey={school} render={scoreBadge} />
      <SchoolBucket title={`Voto BEAR · ${meta.short}`} count={bears.length} color="var(--red)" items={bears} schoolKey={school} render={scoreBadge} />
    </>
  )
}

function SchoolBucket({ title, count, color, items, schoolKey, render }: {
  title: string; count: number; color: string; items: MatrixEntry[]
  schoolKey: SchoolKey
  render: (score: number) => React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  if (count === 0) return null
  return (
    <div style={{ marginTop: 14 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', padding: '4px 4px 8px', cursor: 'pointer', color: 'var(--text)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
        <span style={{ fontSize: 11, fontFamily: MONO, fontWeight: 700, color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{title}</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', fontFamily: MONO }}>{count}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s', display: 'inline-block' }}>›</span>
      </button>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(m => <AssetRow key={m.ticker} m={m} right={render(m.schools[schoolKey])} />)}
        </div>
      )}
    </div>
  )
}

// ── TREND ────────────────────────────────────────────────────────────────────
function TrendTab({ matrix }: { matrix: MatrixEntry[] }) {
  const trendCounts = useMemo(() => {
    const c: Record<TrendKey, number> = { SB: 0, B: 0, N: 0, BR: 0, SBR: 0 }
    for (const m of matrix) c[trendOfEntry(m)]++
    return c
  }, [matrix])

  // Escolhe a maior faixa como default
  const defaultTrend = useMemo<TrendKey>(() => {
    const order: TrendKey[] = ['SB', 'B', 'N', 'BR', 'SBR']
    return order.reduce((best, k) => trendCounts[k] > trendCounts[best] ? k : best, 'SB')
  }, [trendCounts])

  const [trend, setTrend] = useState<TrendKey>(defaultTrend)
  const list = useMemo(() =>
    [...matrix]
      .filter(m => trendOfEntry(m) === trend)
      .sort((a, b) => trend === 'SBR' || trend === 'BR' ? a.force - b.force : b.force - a.force),
  [matrix, trend])

  const meta = TREND_LABEL[trend]

  return (
    <>
      {/* Chips compactos — TODOS os 5 cabem sem scroll em 375px */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5, marginBottom: 4 }}>
        {(['SB', 'B', 'N', 'BR', 'SBR'] as TrendKey[]).map(k => {
          const m = TREND_LABEL[k]
          const active = trend === k
          return (
            <button key={k} onClick={() => setTrend(k)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, padding: '8px 2px', borderRadius: 8, background: active ? m.color : 'var(--bg2)', border: `1px solid ${active ? m.color : 'var(--border)'}`, cursor: 'pointer', color: active ? 'var(--bg)' : m.color, WebkitTapHighlightColor: 'transparent' }}>
              <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{m.short}</span>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800 }}>{trendCounts[k]}</span>
            </button>
          )
        })}
      </div>

      {/* Descrição da faixa selecionada */}
      <div style={{ background: 'var(--bg2)', borderLeft: `3px solid ${meta.color}`, borderRadius: '0 8px 8px 0', padding: '12px 14px', margin: '10px 0 4px' }}>
        <div style={{ fontSize: 14, fontFamily: MONO, fontWeight: 800, color: meta.color, letterSpacing: '0.03em' }}>{meta.label}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 3 }}>{meta.sub} · <strong style={{ color: 'var(--text)' }}>{list.length}</strong> ações</div>
      </div>

      {/* Lista */}
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.length === 0 ? <Empty>Nada nesta faixa hoje</Empty> : list.map(m => <AssetRow key={m.ticker} m={m} />)}
      </div>
    </>
  )
}

// ── FAVS ─────────────────────────────────────────────────────────────────────
function FavsTab({ matrix, onGoAnalysis }: { matrix: MatrixEntry[]; onGoAnalysis: () => void }) {
  const { favs, ready } = useFavorites()
  const entries = useMemo(() => favs.map(t => matrix.find(m => m.ticker === t)).filter(Boolean) as MatrixEntry[], [favs, matrix])
  if (!ready) return null
  if (entries.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, color: 'var(--gold)', marginBottom: 14, opacity: 0.6 }}>☆</div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', margin: '0 0 8px' }}>Sem favoritos ainda</h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 20px' }}>
          Vai em <strong style={{ color: 'var(--gold)' }}>Análise</strong> e toca na ☆ ao lado de qualquer ação. Elas aparecem aqui.
        </p>
        <button onClick={onGoAnalysis} style={{ background: 'var(--gold)', color: 'var(--bg)', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 12, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer', textTransform: 'uppercase' }}>Ir pra Análise</button>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {entries.map(m => <AssetRow key={m.ticker} m={m} />)}
    </div>
  )
}

// ── NOTÍCIAS ────────────────────────────────────────────────────────────────
interface NewsItem { title: string; url: string; source?: string; published_at?: string }
function NewsTab() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://agente-jornalista-jd.fly.dev/public/ticker-news?minutes=1440&limit=40')
      .then(r => r.ok ? r.json() : { items: [] })
      .then((d: { items?: NewsItem[] } | NewsItem[]) => setItems(Array.isArray(d) ? d : (d.items ?? [])))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>carregando…</div>
  if (!items.length) return <Empty>Sem notícias no momento</Empty>
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((n, i) => (
        <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '12px 14px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 9.5, fontFamily: MONO, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{n.source || 'JD'}</span>
            {n.published_at && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>· {new Date(n.published_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>}
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--text)' }}>{n.title}</div>
        </a>
      ))}
    </div>
  )
}

// ── APP ──────────────────────────────────────────────────────────────────────
export default function MobileApp({ matrix, movers, pulse, prevDate, updated }: {
  matrix: MatrixEntry[]
  movers: Movers
  pulse: MarketPulse | null
  prevDate: string | null
  updated: string
}) {
  const [tab, setTab] = useState<TabKey>('panel')
  const prevTxt = prevDate ? new Date(prevDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—'

  return (
    <div className="mobile-app">
      {/* HEADER APP */}
      <header className="mobile-app-header">
        <button onClick={() => setTab('panel')} style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'baseline', gap: 8, cursor: 'pointer', padding: 0 }}>
          <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17, color: 'var(--gold)', letterSpacing: '0.05em' }}>JD MARKET</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: MONO }}>{TABS.find(t => t.key === tab)?.label}</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: MONO }}>{updated}</span>
          <Link href="/sobre" style={{ color: '#60A5FA', textDecoration: 'none', fontSize: 11, fontFamily: MONO, fontWeight: 800, border: '1.5px solid #60A5FA', background: 'rgba(96,165,250,0.08)', padding: '3px 9px', borderRadius: 5 }}>JD</Link>
        </div>
      </header>

      {/* CONTEÚDO */}
      <div className="mobile-app-body">
        {tab === 'panel'    && <PanelTab matrix={matrix} movers={movers} pulse={pulse} prevTxt={prevTxt} onGoAnalysis={() => setTab('analysis')} onGoFavs={() => setTab('favs')} />}
        {tab === 'analysis' && <AnalysisTab matrix={matrix} />}
        {tab === 'trend'    && <TrendTab matrix={matrix} />}
        {tab === 'favs'     && <FavsTab matrix={matrix} onGoAnalysis={() => setTab('analysis')} />}
        {tab === 'news'     && <NewsTab />}
      </div>

      {/* BOTÃO FLUTUANTE — AGENTE (WhatsApp) */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com o agente JD (WhatsApp)"
        className="mobile-app-agent"
        title="Falar com o jornalista JD"
      >
        {Icon.chat}
      </a>

      {/* BOTTOM NAV */}
      <nav className="mobile-app-nav" aria-label="Navegação principal">
        {TABS.map(t => {
          const active = tab === t.key
          return (
            <button key={t.key} onClick={() => setTab(t.key)} aria-current={active ? 'page' : undefined} style={{ background: 'transparent', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '10px 0 8px', color: active ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer', flex: 1, fontFamily: MONO, WebkitTapHighlightColor: 'transparent', position: 'relative' }}>
              {active && <span style={{ position: 'absolute', top: 0, height: 2, width: 28, background: 'var(--gold)', borderRadius: 2 }} />}
              <span style={{ display: 'inline-flex' }}>{t.icon}</span>
              <span style={{ fontSize: 10, letterSpacing: '0.03em', fontWeight: active ? 700 : 500 }}>{t.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
