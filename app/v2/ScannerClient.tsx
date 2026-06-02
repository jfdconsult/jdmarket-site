'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import RatingBadge from '@/components/RatingBadge'
import type { RankingRow, MarketPulse, Rating } from '@/lib/types'

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number | null | undefined, d = 2) =>
  n == null ? '—' : Number(n).toFixed(d)
const fmtMilhar = (n: number | null | undefined, d = 0) =>
  n == null ? '—' : Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })
const pctColor = (n: number | null | undefined) =>
  (n ?? 0) > 0 ? 'var(--green)' : (n ?? 0) < 0 ? 'var(--red)' : 'var(--text-muted)'
const pctTxt = (n: number | null | undefined) =>
  n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`

function riskColor(score: number | null) {
  if (score == null) return 'var(--text-muted)'
  if (score <= 4) return 'var(--green)'
  if (score <= 6) return 'var(--yellow)'
  return 'var(--red)'
}

type FilterKey = 'ALL' | 'BUY' | 'SELL' | 'NEUTRAL'
const BUY_SET = new Set<Rating>(['STRONG_BUY', 'BUY'])
const SELL_SET = new Set<Rating>(['SELL', 'STRONG_SELL'])

const GRID = '104px 1fr 96px 78px 150px 116px 66px 84px'

// ── Pulso de mercado ─────────────────────────────────────────────────────────
function PulseItem({ label, value, change, realtime }: {
  label: string; value: string; change?: number | null; realtime?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 96 }}>
      <span style={{
        fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)',
        fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase',
      }}>
        {label}{!realtime && <span style={{ opacity: 0.6 }}> · fech.</span>}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-geist-mono), monospace' }}>
          {value}
        </span>
        {change != null && (
          <span style={{ fontSize: 12, fontFamily: 'var(--font-geist-mono), monospace', color: pctColor(change) }}>
            {pctTxt(change)}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Botão de filtro ──────────────────────────────────────────────────────────
function FilterBtn({ active, onClick, children, color }: {
  active: boolean; onClick: () => void; children: React.ReactNode; color?: string
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 14px',
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'var(--font-geist-mono), monospace',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        background: active ? (color ?? 'var(--gold)') : 'transparent',
        color: active ? 'var(--bg)' : (color ?? 'var(--text-muted)'),
        border: `1px solid ${active ? (color ?? 'var(--gold)') : 'var(--border)'}`,
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'all .12s',
      }}
    >
      {children}
    </button>
  )
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function ScannerClient({ rows, pulse }: {
  rows: RankingRow[]; pulse: MarketPulse | null
}) {
  const [filter, setFilter] = useState<FilterKey>('ALL')
  const [exOnly, setExOnly] = useState(false)
  const [q, setQ] = useState('')

  const counts = useMemo(() => {
    let buy = 0, sell = 0, neutral = 0
    for (const r of rows) {
      if (BUY_SET.has(r.consensus_signal)) buy++
      else if (SELL_SET.has(r.consensus_signal)) sell++
      else neutral++
    }
    return { buy, sell, neutral, total: rows.length }
  }, [rows])

  const filtered = useMemo(() => {
    const needle = q.trim().toUpperCase()
    return rows.filter(r => {
      if (filter === 'BUY' && !BUY_SET.has(r.consensus_signal)) return false
      if (filter === 'SELL' && !SELL_SET.has(r.consensus_signal)) return false
      if (filter === 'NEUTRAL' && r.consensus_signal !== 'NEUTRAL') return false
      if (exOnly && !(r.ex_score != null && r.ex_score >= 3)) return false
      if (needle && !r.ticker.toUpperCase().includes(needle) &&
          !(r.name ?? '').toUpperCase().includes(needle)) return false
      return true
    })
  }, [rows, filter, exOnly, q])

  const updated = pulse?.generated_at
    ? new Date(pulse.generated_at).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo', day: '2-digit', month: '2-digit',
        hour: '2-digit', minute: '2-digit',
      })
    : '—'

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 20px 60px' }}>

      {/* ── PULSO DE MERCADO ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap',
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '14px 22px', marginBottom: 18,
      }}>
        {pulse && <PulseItem label="Ibovespa" value={fmtMilhar(pulse.ibovespa.price)} change={pulse.ibovespa.change_percent} />}
        {pulse && <PulseItem label="IBX50" value={fmtMilhar(pulse.ibx50.price, 2)} change={pulse.ibx50.change_percent} realtime />}
        {pulse && <PulseItem label="USD/BRL" value={fmt(pulse.usdbrl.price, 4)} change={pulse.usdbrl.change_percent} realtime />}

        <div style={{ width: 1, height: 30, background: 'var(--border)' }} />

        <div style={{ display: 'flex', gap: 18 }}>
          <PulseStat label="Compra" value={counts.buy} color="var(--green)" />
          <PulseStat label="Venda" value={counts.sell} color="var(--red)" />
          <PulseStat label="Neutro" value={counts.neutral} color="var(--yellow)" />
          <PulseStat label="Ativos" value={counts.total} color="var(--text)" />
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{
            fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)',
            fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase',
          }}>
            Atualizado
          </div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-geist-mono), monospace' }}>{updated}</div>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <FilterBtn active={filter === 'ALL'} onClick={() => setFilter('ALL')}>Todos</FilterBtn>
        <FilterBtn active={filter === 'BUY'} onClick={() => setFilter('BUY')} color="var(--green)">Compra</FilterBtn>
        <FilterBtn active={filter === 'SELL'} onClick={() => setFilter('SELL')} color="var(--red)">Venda</FilterBtn>
        <FilterBtn active={filter === 'NEUTRAL'} onClick={() => setFilter('NEUTRAL')} color="var(--yellow)">Neutro</FilterBtn>
        <FilterBtn active={exOnly} onClick={() => setExOnly(v => !v)} color="#F97316">⚠ Exaustão</FilterBtn>

        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Buscar ticker ou empresa…"
          style={{
            marginLeft: 'auto', minWidth: 220,
            padding: '7px 12px', fontSize: 12,
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 6, color: 'var(--text)',
            fontFamily: 'var(--font-geist-mono), monospace',
            outline: 'none',
          }}
        />
      </div>

      {/* ── TABELA ── */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 10 }}>
        <div style={{ minWidth: 880 }}>
          {/* Cabeçalho */}
          <div style={{
            display: 'grid', gridTemplateColumns: GRID, gap: 8,
            padding: '10px 16px', background: 'var(--bg2)',
            borderBottom: '1px solid var(--border)',
            fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono), monospace',
            position: 'sticky', top: 0, zIndex: 1,
          }}>
            <span>Ticker</span>
            <span>Empresa</span>
            <span style={{ textAlign: 'right' }}>Preço</span>
            <span style={{ textAlign: 'right' }}>Var%</span>
            <span style={{ textAlign: 'center' }}>Consenso JD</span>
            <span style={{ textAlign: 'center' }}>Rating GS</span>
            <span style={{ textAlign: 'center' }}>Risco</span>
            <span style={{ textAlign: 'right' }}>Upside</span>
          </div>

          {/* Linhas */}
          {filtered.map((r, i) => (
            <Link
              key={r.ticker}
              href={`/${r.ticker}`}
              style={{
                display: 'grid', gridTemplateColumns: GRID, gap: 8, alignItems: 'center',
                padding: '11px 16px', textDecoration: 'none', color: 'var(--text)',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 ? 'transparent' : 'rgba(255,255,255,.012)',
              }}
              className="v2-row"
            >
              {/* Ticker + EX */}
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 700,
                  fontSize: 13, color: 'var(--gold)', letterSpacing: '0.03em',
                }}>
                  {r.ticker}
                </span>
                {r.ex_score != null && r.ex_score >= 3 && (
                  <span style={{
                    fontSize: 8, fontWeight: 700, color: '#fff', background: '#F97316',
                    padding: '1px 4px', borderRadius: 3, letterSpacing: '0.05em',
                  }}>EX</span>
                )}
              </span>

              {/* Empresa */}
              <span style={{ fontSize: 12.5, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.name}
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>  ·  {r.sector}</span>
              </span>

              {/* Preço */}
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-geist-mono), monospace', fontSize: 13 }}>
                R${fmt(r.price)}
              </span>

              {/* Var% */}
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-geist-mono), monospace', fontSize: 13, color: pctColor(r.change_percent) }}>
                {pctTxt(r.change_percent)}
              </span>

              {/* Consenso */}
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <RatingBadge rating={r.consensus_signal} size="sm" />
              </span>

              {/* GS */}
              <span style={{ display: 'flex', justifyContent: 'center' }}>
                <RatingBadge rating={r.rating} size="xs" />
              </span>

              {/* Risco */}
              <span style={{ textAlign: 'center', fontFamily: 'var(--font-geist-mono), monospace', fontSize: 13, fontWeight: 700, color: riskColor(r.bw_risk_score) }}>
                {r.bw_risk_score ?? '—'}
              </span>

              {/* Upside */}
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-geist-mono), monospace', fontSize: 13, color: (r.upside_base_pct ?? 0) >= 0 ? 'var(--green)' : 'var(--red)' }}>
                {r.upside_base_pct != null ? `${r.upside_base_pct > 0 ? '+' : ''}${fmt(r.upside_base_pct, 1)}%` : '—'}
              </span>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              Nenhum ativo com esses filtros.
            </div>
          )}
        </div>
      </div>

      <p style={{ marginTop: 16, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
        {filtered.length} de {rows.length} ativos · clique numa linha para a análise completa · Fins informativos
      </p>
    </main>
  )
}

function PulseStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{
        fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)',
        fontFamily: 'var(--font-geist-mono), monospace', textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{ fontSize: 16, fontWeight: 700, color, fontFamily: 'var(--font-geist-mono), monospace' }}>
        {value}
      </span>
    </div>
  )
}
