'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Movers, MatrixEntry } from '@/lib/intelligence'
import type { MarketPulse } from '@/lib/types'
import { useFavorites } from '@/lib/useFavorites'
import FavStar from '@/components/FavStar'
import { useMobileTab } from '@/components/MobileShell'

// ── helpers ──────────────────────────────────────────────────────────────────
const MONO = 'var(--font-geist-mono), monospace'
const fmt = (n: number | null | undefined, d = 2) => n == null ? '—' : Number(n).toFixed(d)
const milhar = (n: number | null | undefined, d = 0) => n == null ? '—' : Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })
const pctColor = (n: number | null | undefined) => (n ?? 0) > 0 ? 'var(--green)' : (n ?? 0) < 0 ? 'var(--red)' : 'var(--text-muted)'
const pctTxt = (n: number | null | undefined) => n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`
const forceColor = (f: number) => f >= 2 ? 'var(--green)' : f <= -2 ? 'var(--red)' : 'var(--text-muted)'
const biasColor = (b: string) => b.includes('BULL') ? 'var(--green)' : b.includes('BEAR') ? 'var(--red)' : 'var(--text-muted)'

// ── labels de tendência ──────────────────────────────────────────────────────
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

function PanelTab({ matrix, movers, pulse, prevTxt }: {
  matrix: MatrixEntry[]; movers: Movers; pulse: MarketPulse | null; prevTxt: string
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <IndexTile label="Ibovespa" value={milhar(pulse?.ibovespa.price)} change={pulse?.ibovespa.change_percent} />
        <IndexTile label="IBX50" value={milhar(pulse?.ibx50.price, 2)} change={pulse?.ibx50.change_percent} />
        <IndexTile label="USD/BRL" value={fmt(pulse?.usdbrl.price, 4)} change={pulse?.usdbrl.change_percent} />
      </div>

      <div style={{ marginTop: 10, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
        <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', background: 'var(--bg3)' }}>
          <div style={{ width: w(tally.alt), background: 'var(--green)' }} />
          <div style={{ width: w(tally.neu), background: 'var(--text-muted)', opacity: 0.55 }} />
          <div style={{ width: w(tally.bai), background: 'var(--red)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: MONO, marginTop: 6 }}>
          <span style={{ color: 'var(--green)' }}>{tally.alt}↑ bull</span>
          <span style={{ color: 'var(--text-muted)' }}>{tally.neu}– neutro</span>
          <span style={{ color: 'var(--red)' }}>{tally.bai}↓ bear</span>
        </div>
      </div>

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

      {ready && favEntries.length > 0 && (
        <>
          <SectionTitle>★ Suas ações</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {favEntries.slice(0, 5).map(m => <AssetRow key={m.ticker} m={m} />)}
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

// ── ANÁLISE — 6 botões (JD + 5 escolas) coloridos, lista ordenada ───────────
type MethodKey = 'jd' | 'gs' | 'jp' | 'bw' | 'ct' | 'ab'

const METHODS: { key: MethodKey; short: string; name: string; area: string; desc: string; color: string }[] = [
  { key: 'jd', short: 'JD', name: 'JD Score',      area: 'Consenso geral',   desc: 'Nota final agregando as 5 escolas. Vai de −8 a +8. Ordena por força total.',       color: 'var(--gold)' },
  { key: 'gs', short: 'GS', name: 'Goldman Sachs', area: 'Fundamentalista',  desc: 'Valuation, moat, catalisadores, teses de investimento. Escolhe empresas.',        color: '#3B82F6' },
  { key: 'jp', short: 'JP', name: 'JP Morgan',    area: 'Fluxo & Opções',   desc: 'Posicionamento institucional, skew de opções, risco de evento.',                  color: '#8B5CF6' },
  { key: 'bw', short: 'BW', name: 'Bridgewater',   area: 'Risco',            desc: 'Regime macro, tail risk, drawdown, hedges. Mede o preço a pagar em stress.',      color: '#EAB308' },
  { key: 'ct', short: 'CT', name: 'Citadel',       area: 'Técnica',          desc: 'Tendência, momentum, MAs, RSI, MACD, Bollinger. Timing de mercado.',              color: '#06B6D4' },
  { key: 'ab', short: 'AB', name: 'Al Brooks',     area: 'Price Action',     desc: 'AB1..AB4: direção, momentum, confluência de MAs, tendência. Leitura do gráfico.', color: '#F97316' },
]

function AnalysisTab({ matrix }: { matrix: MatrixEntry[] }) {
  const [method, setMethod] = useState<MethodKey>('jd')
  const meta = METHODS.find(s => s.key === method)!

  const scoreOf = (m: MatrixEntry) => method === 'jd' ? m.force : m.schools[method]

  const list = useMemo(() => {
    return [...matrix].sort((a, b) => {
      const sa = scoreOf(a), sb = scoreOf(b)
      if (sb !== sa) return sb - sa
      return b.force - a.force
    })
  }, [matrix, method])

  return (
    <>
      {/* 6 botões coloridos — cabem em 375px */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 5, marginBottom: 4 }}>
        {METHODS.map(s => {
          const active = method === s.key
          return (
            <button
              key={s.key}
              onClick={() => setMethod(s.key)}
              aria-pressed={active}
              style={{
                padding: '10px 2px', borderRadius: 8,
                background: active ? s.color : 'var(--bg2)',
                border: `1.5px solid ${s.color}`,
                color: active ? 'var(--bg)' : s.color,
                fontFamily: MONO, fontWeight: 800, fontSize: 13,
                letterSpacing: '0.04em', cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {s.short}
            </button>
          )
        })}
      </div>

      {/* Descrição do método selecionado */}
      <div style={{ background: 'var(--bg2)', borderLeft: `3px solid ${meta.color}`, borderRadius: '0 8px 8px 0', padding: '12px 14px', margin: '12px 0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 800, color: meta.color, fontFamily: MONO, letterSpacing: '0.03em' }}>{meta.short}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{meta.name}</span>
        </div>
        <div style={{ fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: meta.color, fontFamily: MONO, marginBottom: 8 }}>{meta.area}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55 }}>{meta.desc}</div>
      </div>

      {/* Lista ordenada de cima pra baixo pela pontuação do método */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 0 8px' }}>
        <h3 style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color: meta.color, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Ranking · {meta.short}</h3>
        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>· maior pontuação primeiro</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.map(m => {
          const v = scoreOf(m)
          const c = v > 0 ? 'var(--green)' : v < 0 ? 'var(--red)' : 'var(--text-muted)'
          const maxAbs = method === 'jd' ? 8 : method === 'ab' ? 4 : 1
          return (
            <AssetRow key={m.ticker} m={m} right={
              <>
                <MethodBar v={v} max={maxAbs} color={c} />
                <span style={{ fontSize: 14, fontFamily: MONO, fontWeight: 800, color: c, minWidth: 30, textAlign: 'right' }}>{v > 0 ? '+' : ''}{v}</span>
              </>
            } />
          )
        })}
      </div>
    </>
  )
}

function MethodBar({ v, max, color }: { v: number; max: number; color: string }) {
  const mag = (Math.min(Math.abs(v), max) / max) * 50
  const pos = v >= 0
  return (
    <div style={{ position: 'relative', width: 48, height: 5, background: 'var(--bg3)', borderRadius: 3 }}>
      <div style={{ position: 'absolute', left: '50%', top: -1, bottom: -1, width: 1, background: 'var(--text-muted)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 3, background: color, left: pos ? '50%' : `${50 - mag}%`, width: `${mag}%` }} />
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
      <div style={{ background: 'var(--bg2)', borderLeft: `3px solid ${meta.color}`, borderRadius: '0 8px 8px 0', padding: '12px 14px', margin: '10px 0 4px' }}>
        <div style={{ fontSize: 14, fontFamily: MONO, fontWeight: 800, color: meta.color, letterSpacing: '0.03em' }}>{meta.label}</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 3 }}>{meta.sub} · <strong style={{ color: 'var(--text)' }}>{list.length}</strong> ações</div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {list.length === 0 ? <Empty>Nada nesta faixa hoje</Empty> : list.map(m => <AssetRow key={m.ticker} m={m} />)}
      </div>
    </>
  )
}

// ── FAVS ─────────────────────────────────────────────────────────────────────
function FavsTab({ matrix }: { matrix: MatrixEntry[] }) {
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
// Puxa as duas levas do dia (manhã + fechamento) — 48h de janela — e mostra
// as mais importantes primeiro (score desc). O endpoint público retorna as
// mesmas notícias que alimentam os briefings de WhatsApp.
interface NewsItem { title: string; url: string; source?: string; score?: number; published_at?: string }
function NewsTab() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true
    fetch('https://agente-jornalista-jd.fly.dev/public/ticker-news?minutes=2880&limit=60')
      .then(r => r.ok ? r.json() : { items: [] })
      .then((d: { items?: NewsItem[] } | NewsItem[]) => {
        if (!alive) return
        const arr = Array.isArray(d) ? d : (d.items ?? [])
        const hasDate = arr.some(n => n.published_at)
        const sorted = hasDate
          ? [...arr].sort((a, b) => (new Date(b.published_at || 0).getTime()) - (new Date(a.published_at || 0).getTime()))
          : [...arr].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        setItems(sorted)
      })
      .catch(() => { if (alive) setItems([]) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])
  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>carregando…</div>
  if (!items.length) return <Empty>Sem notícias no momento</Empty>
  return (
    <>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: MONO, letterSpacing: '0.04em', margin: '2px 4px 10px' }}>
        {items.length} notícias · levas manhã + fechamento (últimas 48h)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((n, i) => (
          <a key={i} href={n.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '12px 14px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 9.5, fontFamily: MONO, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{n.source || 'JD'}</span>
              {n.published_at && <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>· {new Date(n.published_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>}
              {!n.published_at && n.score != null && (
                <span style={{ fontSize: 9.5, fontFamily: MONO, color: 'var(--text-muted)' }}>· score {n.score}</span>
              )}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'var(--text)' }}>{n.title}</div>
          </a>
        ))}
      </div>
    </>
  )
}

// ── APP (tab body only — o shell agora vem do layout) ───────────────────────
export default function MobileApp({ matrix, movers, pulse, prevDate }: {
  matrix: MatrixEntry[]
  movers: Movers
  pulse: MarketPulse | null
  prevDate: string | null
  updated: string
}) {
  const { tab } = useMobileTab()
  const prevTxt = prevDate ? new Date(prevDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—'

  return (
    <div className="mobile-app">
      {tab === 'panel'    && <PanelTab matrix={matrix} movers={movers} pulse={pulse} prevTxt={prevTxt} />}
      {tab === 'analysis' && <AnalysisTab matrix={matrix} />}
      {tab === 'trend'    && <TrendTab matrix={matrix} />}
      {tab === 'favs'     && <FavsTab matrix={matrix} />}
      {tab === 'news'     && <NewsTab />}
    </div>
  )
}
