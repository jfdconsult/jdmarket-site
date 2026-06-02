'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import type { Movers, MatrixEntry, Lens, AccelState } from '@/lib/intelligence'
import type { MarketPulse } from '@/lib/types'

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number | null | undefined, d = 2) => n == null ? '—' : Number(n).toFixed(d)
const milhar = (n: number | null | undefined, d = 0) =>
  n == null ? '—' : Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })
const pctColor = (n: number | null | undefined) =>
  (n ?? 0) > 0 ? 'var(--green)' : (n ?? 0) < 0 ? 'var(--red)' : 'var(--text-muted)'
const pctTxt = (n: number | null | undefined) =>
  n == null ? '—' : `${n > 0 ? '+' : ''}${Number(n).toFixed(2)}%`
const forceColor = (f: number) => f >= 2 ? 'var(--green)' : f <= -2 ? 'var(--red)' : 'var(--text-muted)'
const MONO = 'var(--font-geist-mono), monospace'

function biasColor(bias: string) {
  if (bias.includes('BULL')) return 'var(--green)'
  if (bias.includes('BEAR')) return 'var(--red)'
  return 'var(--text-muted)'
}

// ── Termômetro do JD Score (−8 a +8) ──────────────────────────────────────────
function ForceMeter({ force, w = 120, max = 8 }: { force: number; w?: number; max?: number }) {
  const half = w / 2
  const mag = (Math.min(Math.abs(force), max) / max) * half
  const pos = force >= 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: w, height: 7, background: 'var(--bg3)', borderRadius: 4 }}>
        <div style={{ position: 'absolute', left: half, top: -1, bottom: -1, width: 1, background: 'var(--text-muted)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 4, left: pos ? half : half - mag, width: mag, background: pos ? 'var(--green)' : 'var(--red)', opacity: 0.9 }} />
      </div>
      <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 700, width: 34, textAlign: 'right', color: forceColor(force) }}>
        {force > 0 ? '+' : ''}{force}
      </span>
    </div>
  )
}

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

// Aceleração do movimento (acelerando / freando) — direção vem do viés
function AccelChip({ accel, big = false }: { accel: AccelState; big?: boolean }) {
  const fs = big ? 12 : 9.5
  if (accel === 'ACCEL') return <span title="momento acelerando" style={{ fontSize: fs, fontFamily: MONO, fontWeight: 700, color: '#06B6D4', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>»» ACEL</span>
  if (accel === 'BRAKE') return <span title="momento freando" style={{ fontSize: fs, fontFamily: MONO, fontWeight: 700, color: 'var(--yellow)', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>×× FREIO</span>
  return <span title="momento estável" style={{ fontSize: fs, fontFamily: MONO, color: 'var(--text-muted)', opacity: 0.55 }}>{big ? 'estável' : '•'}</span>
}

function ExBadge({ ex }: { ex: number | null }) {
  if (ex == null || ex < 3) return null
  return <span title={`exaustão de movimento — EX ${ex}/5`} style={{ fontSize: 9, fontWeight: 700, color: '#fff', background: '#F97316', padding: '1px 5px', borderRadius: 3, whiteSpace: 'nowrap' }}>EX {ex}</span>
}

function DeltaTag({ delta }: { delta: number | null }) {
  if (delta == null) return <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>—</span>
  if (Math.abs(delta) < 5) return <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>•</span>
  const up = delta > 0
  return <span style={{ color: up ? 'var(--green)' : 'var(--red)', fontSize: 12, fontFamily: MONO, fontWeight: 600 }}>{up ? '▲' : '▼'}{Math.abs(delta)}</span>
}

// ── Painel de preview lateral ─────────────────────────────────────────────────
interface Detail {
  investment_thesis?: string | null
  moat?: string | null
  targets_bear?: number | null; targets_base?: number | null; targets_bull?: number | null
  upside_base_pct?: number | null; entry_zone?: string | null; stop_loss?: number | null
  catalysts?: string[] | null; risks?: string[] | null
  // Fundamentos (Goldman Sachs)
  pe_ratio?: number | null; ev_ebitda?: number | null; roe?: number | null
  net_margin?: number | null; debt_equity?: number | null; dividend_yield?: number | null; beta?: number | null
  // Técnico (Citadel)
  trend_daily?: string | null; trend_weekly?: string | null; trend_monthly?: string | null
  rsi?: number | null; rsi_signal?: string | null; macd?: string | null; bollinger?: string | null
  ma50?: number | null; ma200?: number | null; above_ma200?: boolean | null
  support1?: number | null; support2?: number | null; resistance1?: number | null; ct_pattern?: string | null
  // Risco (Bridgewater)
  bw_summary?: string | null; bw_overall_risk?: string | null; bw_risk_score?: number | null
  // Al Brooks
  ab1_direction?: string | null; ab2_momentum?: string | null
  ab3_ma_confluence?: string | null; ab4_trend?: string | null
}

interface HistPoint {
  analysis_date: string; price?: number | null; consensus_signal?: string | null
}

const trendColor = (t?: string | null) => t === 'BULLISH' ? 'var(--green)' : t === 'BEARISH' ? 'var(--red)' : 'var(--yellow)'

// Mini-gráfico do histórico de preço
function Spark({ points }: { points: number[] }) {
  if (points.length < 2) return null
  const w = 300, h = 44
  const min = Math.min(...points), max = Math.max(...points)
  const range = max - min || 1
  const d = points.map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(' ')
  const up = points[points.length - 1] >= points[0]
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: 44, display: 'block' }}>
      <polyline points={d} fill="none" stroke={up ? 'var(--green)' : 'var(--red)'} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// Cabeçalho de método: nome institucional + o que o método faz (explicação)
function MethodHead({ name, sub }: { name: string; sub: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, fontFamily: MONO, color: 'var(--gold)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{name}</div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 2, lineHeight: 1.4 }}>{sub}</div>
    </div>
  )
}

function Metric({ label, value, color }: { label: string; value: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: 12, fontFamily: MONO, color: color ?? 'var(--text)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

// Barra de um pilar do JD Score (Fundamental −3..+3 ou Técnico −5..+5)
function PillarBar({ label, v, max }: { label: string; v: number; max: number }) {
  const mag = (Math.min(Math.abs(v), max) / max) * 50  // % até o meio
  const pos = v >= 0
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: 'var(--text-muted)', fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: v > 0 ? 'var(--green)' : v < 0 ? 'var(--red)' : 'var(--text-muted)', fontWeight: 700 }}>{v > 0 ? '+' : ''}{v}</span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: 6, background: 'var(--bg3)', borderRadius: 3 }}>
        <div style={{ position: 'absolute', left: '50%', top: -1, bottom: -1, width: 1, background: 'var(--text-muted)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 3, background: pos ? 'var(--green)' : 'var(--red)', left: pos ? '50%' : `${50 - mag}%`, width: `${mag}%`, opacity: 0.9 }} />
      </div>
    </div>
  )
}

const verdictOf = (v: number) => v > 0.15 ? { t: 'BULL', c: 'var(--green)' } : v < -0.15 ? { t: 'BEAR', c: 'var(--red)' } : { t: 'NEUTRO', c: 'var(--text-muted)' }

function PreviewPanel({ entry, onClose }: { entry: MatrixEntry | null; onClose: () => void }) {
  const [detail, setDetail] = useState<Detail | null>(null)
  const [hist, setHist] = useState<HistPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState<string | null>('gs')
  const ticker = entry?.ticker

  useEffect(() => {
    if (!ticker) { setDetail(null); setHist([]); return }
    let alive = true
    setLoading(true); setDetail(null); setHist([])
    fetch(`/api/analysis?ticker=${ticker}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (alive) setDetail(d) })
      .catch(() => { if (alive) setDetail(null) })
      .finally(() => { if (alive) setLoading(false) })
    fetch(`/api/analysis?ticker=${ticker}&history=true`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (alive && d?.history) setHist(d.history as HistPoint[]) })
      .catch(() => {})
    return () => { alive = false }
  }, [ticker])

  if (!entry) {
    return (
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '40px 22px', textAlign: 'center' }}>
        <div style={{ fontSize: 30, marginBottom: 10, opacity: 0.5 }}>◧</div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
          Clique numa ação para a <strong style={{ color: 'var(--text)' }}>leitura rápida</strong> dos 8 métodos aqui.
        </p>
      </div>
    )
  }

  // Os 5 métodos (escolas) — votos oficiais do JD Score
  const sc = entry.schools
  const bwVerdict = sc.bw > 0 ? { t: 'RISCO BAIXO', c: 'var(--green)' } : sc.bw < 0 ? { t: 'RISCO ALTO', c: 'var(--red)' } : { t: 'RISCO MÉDIO', c: 'var(--yellow)' }
  const methods = [
    { key: 'gs', inst: 'Goldman Sachs', area: 'Fundamentalista', verdict: verdictOf(sc.gs).t, color: verdictOf(sc.gs).c },
    { key: 'ct', inst: 'Citadel', area: 'Técnica', verdict: verdictOf(sc.ct).t, color: verdictOf(sc.ct).c },
    { key: 'bw', inst: 'Bridgewater', area: 'Risco', verdict: bwVerdict.t, color: bwVerdict.c },
    { key: 'jp', inst: 'JP Morgan', area: 'Fluxo & Posicionamento', verdict: verdictOf(sc.jp).t, color: verdictOf(sc.jp).c },
    { key: 'ab', inst: 'Al Brooks', area: 'Price Action', verdict: verdictOf(sc.ab).t, color: verdictOf(sc.ab).c },
  ]

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
      {/* HEADER — ticker + preço/variação + JD Score na mesma altura */}
      <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 21, color: 'var(--gold)', letterSpacing: '0.03em' }}>{entry.ticker}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{entry.sector}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <Link href={`/${entry.ticker}`} title="Ver tela cheia — raio-x completo" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 9px', border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: 5, textDecoration: 'none', fontSize: 9.5, fontFamily: MONO, fontWeight: 700, letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>⛶ TELA CHEIA</Link>
            <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700 }}>R${fmt(entry.price)}</span>
            <span style={{ fontFamily: MONO, fontSize: 13, color: pctColor(entry.change_percent) }}>{pctTxt(entry.change_percent)}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--gold)', fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase' }}>JD Score</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'flex-end' }}>
              <span style={{ fontSize: 30, fontWeight: 800, fontFamily: MONO, lineHeight: 1, color: forceColor(entry.force) }}>{entry.force > 0 ? '+' : ''}{entry.force}</span>
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color: biasColor(entry.bias) }}>{entry.bias}</span>
            </div>
          </div>
        </div>
      </div>

      {/* JD detalhe compacto — termômetro + pilares Fundamental/Técnico */}
      <div style={{ padding: '11px 18px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <ForceMeter force={entry.force} w={130} />
          <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>conv. <strong style={{ color: 'var(--text)' }}>{entry.conviction}%</strong></span>
          {entry.delta != null && <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>vs ontem <DeltaTag delta={entry.delta} /></span>}
          <a href="/metodologia_desktop.html" target="_blank" rel="noreferrer" style={{ fontSize: 9.5, color: 'var(--text-muted)', textDecoration: 'none', marginLeft: 'auto' }}>como calculamos →</a>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 11 }}>
          <PillarBar label="Fundamental" v={entry.fund} max={3} />
          <PillarBar label="Técnico" v={entry.tec} max={5} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 11 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>momento <AccelChip accel={entry.accel} big /></span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>exaustão {entry.ex != null ? (entry.ex >= 3 ? <strong style={{ color: '#F97316' }}>EX {entry.ex}/5 alta</strong> : <span style={{ color: 'var(--text)' }}>{entry.ex}/5 baixa</span>) : '—'}</span>
        </div>
        {entry.divergent && <div style={{ marginTop: 8, fontSize: 10.5, color: '#A855F7' }}>⚠ fundamental e técnico discordam — atenção</div>}
      </div>

      {/* OS 4 MÉTODOS — clicáveis, abrem o racional embaixo */}
      {methods.map(M => {
        const isOpen = open === M.key
        return (
          <div key={M.key} style={{ borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => setOpen(isOpen ? null : M.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 18px', background: isOpen ? 'var(--bg3)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: M.color, flexShrink: 0 }} />
              <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, fontFamily: MONO }}>{M.inst}</span>
                <span style={{ fontSize: 9.5, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{M.area}</span>
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, fontFamily: MONO, color: M.color }}>{M.verdict}</span>
              <span style={{ fontSize: 14, color: 'var(--text-muted)', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform .15s', display: 'inline-block' }}>›</span>
            </button>

            {isOpen && (
              <div style={{ padding: '0 18px 16px' }}>
                {loading && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>carregando…</div>}

                {detail && M.key === 'gs' && (
                  <>
                    {detail.investment_thesis && <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text)', margin: '0 0 12px' }}>{detail.investment_thesis}</p>}
                    <Metric label="P/L (P/E)" value={detail.pe_ratio != null ? fmt(detail.pe_ratio, 1) : '—'} />
                    <Metric label="EV/EBITDA" value={detail.ev_ebitda != null ? fmt(detail.ev_ebitda, 1) : '—'} />
                    <Metric label="ROE" value={detail.roe != null ? `${fmt(detail.roe, 1)}%` : '—'} color={Number(detail.roe) > 15 ? 'var(--green)' : undefined} />
                    <Metric label="Margem líquida" value={detail.net_margin != null ? `${fmt(detail.net_margin, 1)}%` : '—'} />
                    <Metric label="Dívida/Patrim. (D/E)" value={detail.debt_equity != null ? fmt(detail.debt_equity, 2) : '—'} />
                    <Metric label="Dividend Yield" value={detail.dividend_yield != null ? `${fmt(detail.dividend_yield, 2)}%` : '—'} color="var(--gold)" />
                    <Metric label="Beta" value={detail.beta != null ? fmt(detail.beta, 2) : '—'} />
                    <Metric label="Moat (fosso competitivo)" value={detail.moat ?? '—'} />
                    {(detail.targets_base != null) && (
                      <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11.5, fontFamily: MONO }}>
                        <span><span style={{ color: 'var(--text-muted)' }}>Bear </span><span style={{ color: 'var(--red)' }}>R${fmt(detail.targets_bear)}</span></span>
                        <span><span style={{ color: 'var(--text-muted)' }}>Base </span>R${fmt(detail.targets_base)}</span>
                        <span><span style={{ color: 'var(--text-muted)' }}>Bull </span><span style={{ color: 'var(--green)' }}>R${fmt(detail.targets_bull)}</span></span>
                      </div>
                    )}
                    {Array.isArray(detail.catalysts) && detail.catalysts.length > 0 && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--green)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Catalisadores</div>
                        <ul style={{ margin: 0, padding: '0 0 0 16px' }}>{detail.catalysts.slice(0, 3).map((c, i) => <li key={i} style={{ fontSize: 11.5, color: 'var(--text)', marginBottom: 3, lineHeight: 1.5 }}>{c}</li>)}</ul>
                      </div>
                    )}
                    {Array.isArray(detail.risks) && detail.risks.length > 0 && (
                      <div style={{ marginTop: 10 }}>
                        <div style={{ fontSize: 9, letterSpacing: '0.1em', color: 'var(--red)', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 5 }}>Riscos</div>
                        <ul style={{ margin: 0, padding: '0 0 0 16px' }}>{detail.risks.slice(0, 3).map((c, i) => <li key={i} style={{ fontSize: 11.5, color: 'var(--text)', marginBottom: 3, lineHeight: 1.5 }}>{c}</li>)}</ul>
                      </div>
                    )}
                  </>
                )}

                {detail && M.key === 'ct' && (
                  <>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      {([['Diário', detail.trend_daily], ['Semanal', detail.trend_weekly], ['Mensal', detail.trend_monthly]] as const).map(([k, v]) => (
                        <div key={k} style={{ flex: 1, textAlign: 'center', padding: '6px 4px', background: 'var(--bg)', borderRadius: 5 }}>
                          <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                          <div style={{ fontSize: 11, fontWeight: 700, fontFamily: MONO, color: trendColor(v) }}>{v === 'BULLISH' ? 'BULL' : v === 'BEARISH' ? 'BEAR' : 'NEUTRO'}</div>
                        </div>
                      ))}
                    </div>
                    <Metric label="RSI" value={`${detail.rsi != null ? fmt(detail.rsi, 0) : '—'}${detail.rsi_signal ? ` · ${detail.rsi_signal}` : ''}`} />
                    <Metric label="MACD" value={detail.macd ?? '—'} color={detail.macd === 'BULLISH' ? 'var(--green)' : detail.macd === 'BEARISH' ? 'var(--red)' : undefined} />
                    <Metric label="Bollinger" value={detail.bollinger ?? '—'} />
                    <Metric label="MA50 / MA200" value={`R$${fmt(detail.ma50)} / R$${fmt(detail.ma200)}`} />
                    <Metric label="Acima da MA200" value={detail.above_ma200 ? 'Sim' : 'Não'} color={detail.above_ma200 ? 'var(--green)' : 'var(--red)'} />
                    <Metric label="Suportes" value={`R$${fmt(detail.support1)} · R$${fmt(detail.support2)}`} color="var(--green)" />
                    <Metric label="Resistência" value={`R$${fmt(detail.resistance1)}`} color="var(--red)" />
                    {detail.ct_pattern && <div style={{ marginTop: 8, fontSize: 11.5, color: 'var(--text)', lineHeight: 1.5 }}>{detail.ct_pattern}</div>}
                  </>
                )}

                {detail && M.key === 'bw' && (
                  <>
                    <Metric label="Score de risco" value={`${detail.bw_risk_score ?? '—'}/10 · ${detail.bw_overall_risk ?? '—'}`} />
                    {detail.bw_summary && <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text)', margin: '10px 0 0' }}>{detail.bw_summary}</p>}
                  </>
                )}

                {detail && M.key === 'ab' && (
                  <>
                    <Metric label="AB1 · Direção" value={detail.ab1_direction ?? '—'} />
                    <Metric label="AB2 · Momentum" value={detail.ab2_momentum ?? '—'} />
                    <Metric label="AB3 · Confluência" value={detail.ab3_ma_confluence ?? '—'} />
                    <Metric label="AB4 · Tendência" value={detail.ab4_trend ?? '—'} />
                  </>
                )}

                {M.key === 'jp' && (
                  <>
                    <div style={{ fontSize: 11.5, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>
                      Leitura de <strong>fluxo institucional e posicionamento de opções</strong>. Sinal de fluxo: <strong style={{ color: verdictOf(sc.jp).c }}>{verdictOf(sc.jp).t}</strong>.
                    </div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontStyle: 'italic' }}>Skew de opções, posicionamento e risco de evento: na tela cheia.</div>
                  </>
                )}
              </div>
            )}
          </div>
        )
      })}

      {/* HISTÓRICO */}
      {hist.length >= 2 && (
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
          <MethodHead name="Histórico" sub={`preço e leitura de consenso dos últimos ${hist.length} dias`} />
          <Spark points={[...hist].reverse().map(h => Number(h.price) || 0)} />
          <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
            {[...hist].reverse().slice(-14).map((h, i) => {
              const s = h.consensus_signal ?? ''
              const c = s.includes('BUY') ? 'var(--green)' : s.includes('SELL') ? 'var(--red)' : 'var(--text-muted)'
              return <span key={i} title={`${h.analysis_date}: ${s || '—'}`} style={{ width: 8, height: 8, borderRadius: 2, background: c, opacity: s.includes('NEUTRAL') || !s ? 0.4 : 0.9 }} />
            })}
          </div>
        </div>
      )}

      <div style={{ padding: '14px 18px' }}>
        <Link href={`/${entry.ticker}`} style={{
          display: 'block', textAlign: 'center', padding: '11px',
          background: 'var(--gold)', color: 'var(--bg)', textDecoration: 'none',
          borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: MONO, letterSpacing: '0.04em',
        }}>
          ⛶ VER TELA CHEIA — RAIO-X COMPLETO
        </Link>
      </div>
    </div>
  )
}

// ── Blocos de "o que mudou" ───────────────────────────────────────────────────
function MoverBlock({ title, color, count, children }: { title: string; color: string; count: number; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: MONO, color }}>
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
    <Link href={`/${ticker}`} className="v2-row" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px 6px 14px', textDecoration: 'none', color: 'var(--text)', borderRadius: 5, fontSize: 12 }}>
      <span style={{ fontFamily: MONO, fontWeight: 700, color: 'var(--gold)', width: 60 }}>{ticker}</span>
      {children}
    </Link>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────
type ViesFilter = 'ALL' | 'BULL' | 'NEUTRAL' | 'BEAR'

export default function IntelClient({ matrix, movers, pulse, prevDate }: {
  matrix: MatrixEntry[]; movers: Movers; pulse: MarketPulse | null
  currentDate: string | null; prevDate: string | null
}) {
  const [vies, setVies] = useState<ViesFilter>('ALL')
  const [exOnly, setExOnly] = useState(false)
  const [divOnly, setDivOnly] = useState(false)
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<MatrixEntry | null>(null)

  const marketBias = useMemo(() => matrix.length ? Math.round(matrix.reduce((s, m) => s + m.force, 0) / matrix.length) : 0, [matrix])
  const tally = useMemo(() => {
    let alt = 0, neu = 0, bai = 0
    for (const m of matrix) { if (m.bias.includes('BULL')) alt++; else if (m.bias.includes('BEAR')) bai++; else neu++ }
    return { alt, neu, bai }
  }, [matrix])

  const filtered = useMemo(() => {
    const needle = q.trim().toUpperCase()
    return matrix.filter(m => {
      if (vies === 'BULL' && !m.bias.includes('BULL')) return false
      if (vies === 'BEAR' && !m.bias.includes('BEAR')) return false
      if (vies === 'NEUTRAL' && m.bias !== 'NEUTRAL') return false
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

  // No telão (≥1360px) clicar abre o preview lateral; em tela menor, vai pro detalhe.
  function onRowClick(e: React.MouseEvent, m: MatrixEntry) {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1360px)').matches) {
      e.preventDefault()
      setSelected(prev => prev?.ticker === m.ticker ? null : m)
    }
  }

  const GRID = '76px 1fr 168px 100px 50px 80px'

  return (
    <main style={{ maxWidth: 2100, margin: '0 auto', padding: '16px 26px 60px' }}>

      {/* ── PULSO ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 20px', marginBottom: 16 }}>
        {pulse && <Pulse label="Ibovespa" value={milhar(pulse.ibovespa.price)} change={pulse.ibovespa.change_percent} />}
        {pulse && <Pulse label="IBX50" value={milhar(pulse.ibx50.price, 2)} change={pulse.ibx50.change_percent} />}
        {pulse && <Pulse label="USD/BRL" value={fmt(pulse.usdbrl.price, 4)} change={pulse.usdbrl.change_percent} />}
        <div style={{ width: 1, height: 30, background: 'var(--border)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: MONO, textTransform: 'uppercase' }}>Viés do mercado · métodos</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ForceMeter force={marketBias} w={90} />
            <span style={{ fontSize: 11, fontFamily: MONO }}>
              <span style={{ color: 'var(--green)' }}>{tally.alt}↑</span>{'  '}
              <span style={{ color: 'var(--text-muted)' }}>{tally.neu}–</span>{'  '}
              <span style={{ color: 'var(--red)' }}>{tally.bai}↓</span>
            </span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: MONO, textTransform: 'uppercase' }}>Atualizado</div>
          <div style={{ fontSize: 12, fontFamily: MONO }}>{updated}</div>
        </div>
      </div>

      {/* ── GRID 3 COLUNAS ── */}
      <div className="intel-grid">

        {/* ESQUERDA — O QUE MUDOU */}
        <section style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
          <h2 style={{ fontSize: 12, fontWeight: 700, fontFamily: MONO, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>O que mudou hoje</h2>
          <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: '0 0 16px' }}>vs {prevTxt} · leitura dos métodos</p>

          <MoverBlock title="Viraram de viés" color="var(--gold)" count={movers.flips.length}>
            {movers.flips.slice(0, 8).map(f => (
              <MoverRow key={f.ticker} ticker={f.ticker}>
                <span style={{ flex: 1, fontSize: 11 }}>
                  <span style={{ color: biasColor(f.biasFrom) }}>{f.biasFrom}</span>
                  <span style={{ color: 'var(--text-muted)' }}> → </span>
                  <span style={{ color: biasColor(f.biasTo), fontWeight: 600 }}>{f.biasTo}</span>
                </span>
                <span style={{ color: forceColor(f.force), fontFamily: MONO, fontWeight: 700 }}>{f.force > 0 ? '+' : ''}{f.force}</span>
              </MoverRow>
            ))}
          </MoverBlock>

          <MoverBlock title="Ganhando força" color="var(--green)" count={movers.gainers.length}>
            {movers.gainers.slice(0, 6).map(g => (
              <MoverRow key={g.ticker} ticker={g.ticker}>
                <span style={{ flex: 1, fontSize: 11, color: 'var(--text-muted)' }}>{g.forcePrev > 0 ? '+' : ''}{g.forcePrev} → <span style={{ color: forceColor(g.force) }}>{g.force > 0 ? '+' : ''}{g.force}</span></span>
                <span style={{ color: 'var(--green)', fontFamily: MONO, fontWeight: 700 }}>▲{g.delta}</span>
              </MoverRow>
            ))}
          </MoverBlock>

          <MoverBlock title="Perdendo força" color="var(--red)" count={movers.losers.length}>
            {movers.losers.slice(0, 6).map(g => (
              <MoverRow key={g.ticker} ticker={g.ticker}>
                <span style={{ flex: 1, fontSize: 11, color: 'var(--text-muted)' }}>{g.forcePrev > 0 ? '+' : ''}{g.forcePrev} → <span style={{ color: forceColor(g.force) }}>{g.force > 0 ? '+' : ''}{g.force}</span></span>
                <span style={{ color: 'var(--red)', fontFamily: MONO, fontWeight: 700 }}>▼{Math.abs(g.delta)}</span>
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

        {/* CENTRO — MATRIZ */}
        <section style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 12, fontWeight: 700, fontFamily: MONO, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Matriz de inteligência · 8 métodos</h2>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar…" style={{ marginLeft: 'auto', minWidth: 160, padding: '6px 10px', fontSize: 12, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)', fontFamily: MONO, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Chip active={vies === 'ALL'} onClick={() => setVies('ALL')}>Todos</Chip>
              <Chip active={vies === 'BULL'} onClick={() => setVies('BULL')} color="var(--green)">Bull</Chip>
              <Chip active={vies === 'NEUTRAL'} onClick={() => setVies('NEUTRAL')} color="var(--text-muted)">Neutral</Chip>
              <Chip active={vies === 'BEAR'} onClick={() => setVies('BEAR')} color="var(--red)">Bear</Chip>
              <Chip active={divOnly} onClick={() => setDivOnly(v => !v)} color="#A855F7">Divergência</Chip>
              <Chip active={exOnly} onClick={() => setExOnly(v => !v)} color="#F97316">Exaustão</Chip>
            </div>
          </div>

          <div className="intel-matrix-scroll">
            <div className="intel-matrix-inner">
              <div style={{ display: 'grid', gridTemplateColumns: GRID, gap: 8, padding: '9px 16px', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: MONO, borderBottom: '1px solid var(--border)' }}>
                <span>Ticker</span><span>Empresa</span><span>JD Score · −8 a +8</span><span>Viés</span><span style={{ textAlign: 'center' }}>Conv</span><span>Mét·Δ</span>
              </div>
              <div style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                {filtered.map((m, i) => (
                  <Link key={m.ticker} href={`/${m.ticker}`} onClick={e => onRowClick(e, m)}
                    className={`v2-row${selected?.ticker === m.ticker ? ' sel' : ''}`}
                    style={{ display: 'grid', gridTemplateColumns: GRID, gap: 8, alignItems: 'center', padding: '10px 16px', textDecoration: 'none', color: 'var(--text)', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 14.5, color: 'var(--gold)' }}>{m.ticker}</span>
                      {m.divergent && <span title="fundamental e técnico discordam" style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7' }} />}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', minWidth: 0 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13.5 }}>
                        {m.name}<span style={{ color: 'var(--text-muted)', fontSize: 11.5 }}>{'  '}R${fmt(m.price)} <span style={{ color: pctColor(m.change_percent) }}>{pctTxt(m.change_percent)}</span></span>
                      </span>
                      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
                        <AccelChip accel={m.accel} />
                        <ExBadge ex={m.ex} />
                      </span>
                    </span>
                    <ForceMeter force={m.force} />
                    <span style={{ fontSize: 11.5, fontWeight: 700, fontFamily: MONO, color: biasColor(m.bias), letterSpacing: '0.03em' }}>{m.bias}</span>
                    <span style={{ textAlign: 'center', fontSize: 13, fontFamily: MONO, color: m.conviction >= 62 ? 'var(--text)' : 'var(--text-muted)' }}>{m.conviction}%</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><LensStrip lenses={m.lenses} /><DeltaTag delta={m.delta} /></span>
                  </Link>
                ))}
                {filtered.length === 0 && <div style={{ padding: '40px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Nenhum ativo com esses filtros.</div>}
              </div>
            </div>
          </div>
        </section>

        {/* DIREITA — PREVIEW (telão) */}
        <div className="intel-preview-wrap">
          <PreviewPanel entry={selected} onClose={() => setSelected(null)} />
        </div>
      </div>

      <p style={{ marginTop: 18, fontSize: 10.5, color: 'var(--text-muted)', textAlign: 'center' }}>
        <span style={{ color: '#06B6D4', fontFamily: MONO, fontWeight: 700 }}>»» ACEL</span> momento acelerando ·{' '}
        <span style={{ color: 'var(--yellow)', fontFamily: MONO, fontWeight: 700 }}>×× FREIO</span> momento freando ·{' '}
        <span style={{ color: '#F97316', fontFamily: MONO, fontWeight: 700 }}>EX</span> exaustão de movimento ·{' '}
        <span style={{ color: '#A855F7' }}>●</span> divergência fund./téc.
      </p>
      <p style={{ marginTop: 6, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
        {filtered.length} de {matrix.length} ativos · 8 métodos institucionais · IA diária · termômetro de força não é recomendação de compra/venda · fins informativos para gestores
      </p>
    </main>
  )
}

// ── Subcomponentes ────────────────────────────────────────────────────────────
function Pulse({ label, value, change }: { label: string; value: string; change?: number | null }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 88 }}>
      <span style={{ fontSize: 9, letterSpacing: '0.12em', color: 'var(--text-muted)', fontFamily: MONO, textTransform: 'uppercase' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
        <span style={{ fontSize: 15, fontWeight: 700, fontFamily: MONO }}>{value}</span>
        {change != null && <span style={{ fontSize: 11, fontFamily: MONO, color: pctColor(change) }}>{pctTxt(change)}</span>}
      </div>
    </div>
  )
}

function Chip({ active, onClick, children, color }: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  return (
    <button onClick={onClick} style={{ padding: '5px 12px', fontSize: 10.5, fontWeight: 600, fontFamily: MONO, letterSpacing: '0.05em', textTransform: 'uppercase', background: active ? (color ?? 'var(--gold)') : 'transparent', color: active ? 'var(--bg)' : (color ?? 'var(--text-muted)'), border: `1px solid ${active ? (color ?? 'var(--gold)') : 'var(--border)'}`, borderRadius: 5, cursor: 'pointer', transition: 'all .12s' }}>{children}</button>
  )
}
