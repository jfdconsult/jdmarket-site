'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Movers, MatrixEntry, Lens } from '@/lib/intelligence'
import type { MarketPulse } from '@/lib/types'

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number | null | undefined, d = 2) => n == null ? '—' : Number(n).toFixed(d)
const milhar = (n: number | null | undefined, d = 0) =>
  n == null ? '—' : Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })
const pctColor = (n: number | null | undefined) =>
  (n ?? 0) > 0 ? 'var(--green)' : (n ?? 0) < 0 ? 'var(--red)' : 'var(--text-muted)'
const pctTxt = (n: number | null | undefined) =>
  n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`
const forceColor = (f: number) => f > 17 ? 'var(--green)' : f < -17 ? 'var(--red)' : 'var(--text-muted)'

// ── Termômetro de força (-100 a +100) ─────────────────────────────────────────
function ForceMeter({ force, w = 120 }: { force: number; w?: number }) {
  const half = w / 2
  const mag = (Math.min(Math.abs(force), 100) / 100) * half
  const pos = force >= 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: w, height: 7, background: 'var(--bg3)', borderRadius: 4 }}>
        <div style={{ position: 'absolute', left: half, top: -1, bottom: -1, width: 1, background: 'var(--text-muted)', opacity: 0.5 }} />
        <div style={{
          position: 'absolute', top: 0, bottom: 0, borderRadius: 4,
          left: pos ? half : half - mag, width: mag,
          background: pos ? 'var(--green)' : 'var(--red)', opacity: 0.9,
        }} />
      </div>
      <span style={{
        fontFamily: 'var(--font-geist-mono), monospace', fontSize: 13, fontWeight: 700,
        width: 34, textAlign: 'right', color: forceColor(force),
      }}>
        {force > 0 ? '+' : ''}{force}
      </span>
    </div>
  )
}

// ── Faixa de lentes (8 métodos como pontos) ───────────────────────────────────
function LensStrip({ lenses }: { lenses: Lens[] }) {
  return (
    <div style={{ display: 'flex', gap: 3 }} title={lenses.map(l => `${l.label}: ${l.read}`).join('\n')}>
      {lenses.map(l => {
        const c = l.vote > 0.15 ? 'var(--green)' : l.vote < -0.15 ? 'var(--red)' : 'var(--text-muted)'
        return <span key={l.key} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: Math.abs(l.vote) < 0.15 ? 0.4 : 0.9 }} />
      })}
    </div>
  )
}

function biasColor(bias: string) {
  if (bias.startsWith('ALTISTA')) return 'var(--green)'
  if (bias.startsWith('BAIXISTA')) return 'var(--red)'
  return 'var(--text-muted)'
}

function DeltaTag({ delta }: { delta: number | null }) {
  if (delta == null) return <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>—</span>
  if (Math.abs(delta) < 5) return <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>•</span>
  const up = delta > 0
  return (
    <span style={{ color: up ? 'var(--green)' : 'var(--red)', fontSize: 12, fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 600 }}>
      {up ? '▲' : '▼'}{Math.abs(delta)}
    </span>
  )
}

// ── Bloco de "o que mudou" ────────────────────────────────────────────────────
function MoverBlock({ title, color, count, children }: {
  title: string; color: string; count: number; children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
        fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
        fontFamily: 'var(--font-geist-mono), monospace', color,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
        {title}
        <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>{count}</span>
      </div>
      {count === 0
        ? <div style={{ fontSize: 11, color: 'var(--text-muted)', paddingLeft: 14 }}>nada hoje</div>
        : children}
    </div>
  )
}

function MoverRow({ ticker, children }: { ticker: string; children: React.ReactNode }) {
  return (
    <Link href={`/${ticker}`} className="v2-row" style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px 6px 14px',
      textDecoration: 'none', color: 'var(--text)', borderRadius: 5, fontSize: 12,
    }}>
      <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 700, color: 'var(--gold)', width: 60 }}>{ticker}</span>
      {children}
    </Link>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
type ViesFilter = 'ALL' | 'ALTISTA' | 'NEUTRO' | 'BAIXISTA'

export default function IntelClient({ matrix, movers, pulse, currentDate, prevDate }: {
  matrix: MatrixEntry[]; movers: Movers; pulse: MarketPulse | null
  currentDate: string | null; prevDate: string | null
}) {
  const [vies, setVies] = useState<ViesFilter>('ALL')
  const [exOnly, setExOnly] = useState(false)
  const [divOnly, setDivOnly] = useState(false)
  const [q, setQ] = useState('')

  const marketBias = useMemo(() => {
    if (!matrix.length) return 0
    return Math.round(matrix.reduce((s, m) => s + m.force, 0) / matrix.length)
  }, [matrix])

  const tally = useMemo(() => {
    let alt = 0, neu = 0, bai = 0
    for (const m of matrix) {
      if (m.bias.startsWith('ALTISTA')) alt++
      else if (m.bias.startsWith('BAIXISTA')) bai++
      else neu++
    }
    return { alt, neu, bai }
  }, [matrix])

  const filtered = useMemo(() => {
    const needle = q.trim().toUpperCase()
    return matrix.filter(m => {
      if (vies === 'ALTISTA' && !m.bias.startsWith('ALTISTA')) return false
      if (vies === 'BAIXISTA' && !m.bias.startsWith('BAIXISTA')) return false
      if (vies === 'NEUTRO' && m.bias !== 'NEUTRO') return false
      if (exOnly && !(m.ex != null && m.ex >= 3)) return false
      if (divOnly && !m.divergent) return false
      if (needle && !m.ticker.toUpperCase().includes(needle) && !(m.name ?? '').toUpperCase().includes(needle)) return false
      return true
    })
  }, [matrix, vies, exOnly, divOnly, q])

  const updated = pulse?.generated_at
    ? new Date(pulse.generated_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : '—'
  const prevTxt = prevDate ? new Date(prevDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '—'

  return (
    <main style={{ maxWidth: 1320, margin: '0 auto', padding: '16px 18px 60px' }}>

      {/* ── PULSO ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap',
        background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10,
        padding: '12px 20px', marginBottom: 16,
      }}>
        {pulse && <Pulse label="Ibovespa" value={milhar(pulse.ibovespa.price)} change={pulse.ibovespa.change_percent} />}
        {pulse && <Pulse label="IBX50" value={milhar(pulse.ibx50.price, 2)} change={pulse.ibx50.change_percent} />}
        {pulse && <Pulse label="USD/BRL" value={fmt(pulse.usdbrl.price, 4)} change={pulse.usdbrl.change_percent} />}
        <div style={{ width: 1, height: 30, background: 'var(--border)' }} />
        {/* Viés agregado do mercado pelos métodos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase' }}>
            Viés do mercado · métodos
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ForceMeter force={marketBias} w={90} />
            <span style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono), monospace' }}>
              <span style={{ color: 'var(--green)' }}>{tally.alt}↑</span>{'  '}
              <span style={{ color: 'var(--text-muted)' }}>{tally.neu}–</span>{'  '}
              <span style={{ color: 'var(--red)' }}>{tally.bai}↓</span>
            </span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase' }}>Atualizado</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-geist-mono), monospace' }}>{updated}</div>
        </div>
      </div>

      {/* ── SPLIT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 0.42fr) 1fr', gap: 16, alignItems: 'start' }}>

        {/* ESQUERDA — O QUE MUDOU */}
        <section style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            O que mudou hoje
          </h2>
          <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: '0 0 16px' }}>
            vs {prevTxt} · leitura dos métodos
          </p>

          <MoverBlock title="Viraram de viés" color="var(--gold)" count={movers.flips.length}>
            {movers.flips.slice(0, 8).map(f => (
              <MoverRow key={f.ticker} ticker={f.ticker}>
                <span style={{ flex: 1, fontSize: 11 }}>
                  <span style={{ color: biasColor(f.biasFrom) }}>{f.biasFrom}</span>
                  <span style={{ color: 'var(--text-muted)' }}> → </span>
                  <span style={{ color: biasColor(f.biasTo), fontWeight: 600 }}>{f.biasTo}</span>
                </span>
                <span style={{ color: forceColor(f.force), fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 700 }}>{f.force > 0 ? '+' : ''}{f.force}</span>
              </MoverRow>
            ))}
          </MoverBlock>

          <MoverBlock title="Ganhando força" color="var(--green)" count={movers.gainers.length}>
            {movers.gainers.slice(0, 6).map(g => (
              <MoverRow key={g.ticker} ticker={g.ticker}>
                <span style={{ flex: 1, fontSize: 11, color: 'var(--text-muted)' }}>{g.forcePrev > 0 ? '+' : ''}{g.forcePrev} → <span style={{ color: forceColor(g.force) }}>{g.force > 0 ? '+' : ''}{g.force}</span></span>
                <span style={{ color: 'var(--green)', fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 700 }}>▲{g.delta}</span>
              </MoverRow>
            ))}
          </MoverBlock>

          <MoverBlock title="Perdendo força" color="var(--red)" count={movers.losers.length}>
            {movers.losers.slice(0, 6).map(g => (
              <MoverRow key={g.ticker} ticker={g.ticker}>
                <span style={{ flex: 1, fontSize: 11, color: 'var(--text-muted)' }}>{g.forcePrev > 0 ? '+' : ''}{g.forcePrev} → <span style={{ color: forceColor(g.force) }}>{g.force > 0 ? '+' : ''}{g.force}</span></span>
                <span style={{ color: 'var(--red)', fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 700 }}>▼{Math.abs(g.delta)}</span>
              </MoverRow>
            ))}
          </MoverBlock>

          <MoverBlock title="Divergências · fund. vs técnico" color="#A855F7" count={movers.divergences.length}>
            {movers.divergences.slice(0, 6).map(d => (
              <MoverRow key={d.ticker} ticker={d.ticker}>
                <span style={{ flex: 1, fontSize: 10.5, color: 'var(--text-muted)' }}>fund. {d.gs} · téc. {d.tech}</span>
              </MoverRow>
            ))}
          </MoverBlock>

          <MoverBlock title="Exaustão / reversão" color="#F97316" count={movers.exhaustion.length}>
            {movers.exhaustion.slice(0, 6).map(e => (
              <MoverRow key={e.ticker} ticker={e.ticker}>
                <span style={{ flex: 1, fontSize: 11, color: 'var(--text-muted)' }}>sinal de exaustão</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#F97316', padding: '1px 5px', borderRadius: 3 }}>EX {e.ex}</span>
              </MoverRow>
            ))}
          </MoverBlock>
        </section>

        {/* DIREITA — MATRIZ */}
        <section style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                Matriz de inteligência · 8 métodos
              </h2>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar…"
                style={{ marginLeft: 'auto', minWidth: 160, padding: '6px 10px', fontSize: 12, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontFamily: 'var(--font-geist-mono), monospace', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Chip active={vies === 'ALL'} onClick={() => setVies('ALL')}>Todos</Chip>
              <Chip active={vies === 'ALTISTA'} onClick={() => setVies('ALTISTA')} color="var(--green)">Altista</Chip>
              <Chip active={vies === 'NEUTRO'} onClick={() => setVies('NEUTRO')} color="var(--text-muted)">Neutro</Chip>
              <Chip active={vies === 'BAIXISTA'} onClick={() => setVies('BAIXISTA')} color="var(--red)">Baixista</Chip>
              <Chip active={divOnly} onClick={() => setDivOnly(v => !v)} color="#A855F7">Divergência</Chip>
              <Chip active={exOnly} onClick={() => setExOnly(v => !v)} color="#F97316">Exaustão</Chip>
            </div>
          </div>

          {/* cabeçalho da tabela */}
          <div style={{ display: 'grid', gridTemplateColumns: '76px 1fr 168px 100px 50px 90px', gap: 8, padding: '9px 16px', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono), monospace', borderBottom: '1px solid var(--border)' }}>
            <span>Ticker</span>
            <span>Empresa</span>
            <span>Força dos métodos</span>
            <span>Viés</span>
            <span style={{ textAlign: 'center' }}>Conv</span>
            <span>Métodos · Δ</span>
          </div>

          <div style={{ maxHeight: '72vh', overflowY: 'auto' }}>
            {filtered.map((m, i) => (
              <Link key={m.ticker} href={`/${m.ticker}`} className="v2-row" style={{
                display: 'grid', gridTemplateColumns: '76px 1fr 168px 100px 50px 90px', gap: 8, alignItems: 'center',
                padding: '10px 16px', textDecoration: 'none', color: 'var(--text)',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 700, fontSize: 13, color: 'var(--gold)' }}>{m.ticker}</span>
                  {m.divergent && <span title="fundamental e técnico discordam" style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7' }} />}
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>
                  {m.name}
                  <span style={{ color: 'var(--text-muted)', fontSize: 10.5 }}>{'  '}R${fmt(m.price)} <span style={{ color: pctColor(m.change_percent) }}>{pctTxt(m.change_percent)}</span></span>
                </span>
                <ForceMeter force={m.force} />
                <span style={{ fontSize: 10.5, fontWeight: 700, fontFamily: 'var(--font-geist-mono), monospace', color: biasColor(m.bias), letterSpacing: '0.03em' }}>{m.bias}</span>
                <span style={{ textAlign: 'center', fontSize: 12, fontFamily: 'var(--font-geist-mono), monospace', color: m.conviction >= 62 ? 'var(--text)' : 'var(--text-muted)' }}>{m.conviction}%</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LensStrip lenses={m.lenses} />
                  <DeltaTag delta={m.delta} />
                </span>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Nenhum ativo com esses filtros.</div>
            )}
          </div>
        </section>
      </div>

      <p style={{ marginTop: 16, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
        {filtered.length} de {matrix.length} ativos · 8 métodos institucionais · IA diária · termômetro de força não é recomendação de compra/venda · fins informativos para gestores
      </p>
    </main>
  )
}

// ── Subcomponentes ────────────────────────────────────────────────────────────
function Pulse({ label, value, change }: { label: string; value: string; change?: number | null }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 88 }}>
      <span style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
        <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-geist-mono), monospace' }}>{value}</span>
        {change != null && <span style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono), monospace', color: pctColor(change) }}>{pctTxt(change)}</span>}
      </div>
    </div>
  )
}

function Chip({ active, onClick, children, color }: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', fontSize: 10.5, fontWeight: 600, fontFamily: 'var(--font-geist-mono), monospace',
      letterSpacing: '0.05em', textTransform: 'uppercase',
      background: active ? (color ?? 'var(--gold)') : 'transparent',
      color: active ? 'var(--bg)' : (color ?? 'var(--text-muted)'),
      border: `1px solid ${active ? (color ?? 'var(--gold)') : 'var(--border)'}`,
      borderRadius: 5, cursor: 'pointer', transition: 'all .12s',
    }}>{children}</button>
  )
}
