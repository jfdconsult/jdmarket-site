// ── CAMADA DE INTELIGÊNCIA ────────────────────────────────────────────────────
// Lógica pura (sem banco, sem React): transforma os sinais brutos dos métodos
// num TERMÔMETRO DE FORÇA (-100 a +100), convicção, divergência e movimento.
// NÃO emite "compra/venda" — descreve o VIÉS que os métodos estão lendo.

export interface SignalRow {
  ticker: string
  name: string
  sector: string
  logo_small: string | null
  price: number
  change_percent: number
  rating: string | null              // GS fundamental
  ct_confidence: string | null       // CT técnico
  trend_daily: string | null
  trend_weekly: string | null
  trend_monthly: string | null
  ab1_direction: string | null
  ab1_signal_bar: string | null
  ab2_momentum: string | null
  ab3_ma_confluence: string | null
  ab4_trend: string | null
  bw_risk_score: number | null
  bw_overall_risk: string | null
  consensus_signal: string | null
  ex_score: number | null
  upside_base_pct: number | null
  analysis_date: string
}

export interface Lens {
  key: string
  label: string
  vote: number    // -1..+1
  read: string    // texto curto para o gestor
}

export interface Intelligence {
  force: number       // -100..+100 (pressão líquida dos métodos)
  conviction: number  // 0..100 (% de métodos alinhados ao viés dominante)
  bias: string        // ALTISTA FORTE | ALTISTA | NEUTRO | BAIXISTA | BAIXISTA FORTE
  lenses: Lens[]
  divergent: boolean  // fundamental e técnico discordam
}

// ── Mapeamentos ───────────────────────────────────────────────────────────────
const RATING_V: Record<string, number> = {
  STRONG_BUY: 1, BUY: 0.5, NEUTRAL: 0, SELL: -0.5, STRONG_SELL: -1,
}
const TREND_V: Record<string, number> = { BULLISH: 1, NEUTRAL: 0, BEARISH: -1 }

function dir(v: string | null, pos: string[], neg: string[]): number {
  if (!v) return 0
  const u = v.toUpperCase()
  if (pos.some(p => u.includes(p))) return 1
  if (neg.some(n => u.includes(n))) return -1
  return 0
}
const sgn = (n: number) => (n > 0 ? 1 : n < 0 ? -1 : 0)
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))

// ── As 8 lentes (os métodos) ──────────────────────────────────────────────────
export function lensVotes(r: SignalRow): Lens[] {
  const gs = RATING_V[r.rating ?? ''] ?? 0
  const ct = RATING_V[r.ct_confidence ?? ''] ?? 0
  const trend = (
    (TREND_V[r.trend_daily ?? ''] ?? 0) +
    (TREND_V[r.trend_weekly ?? ''] ?? 0) +
    (TREND_V[r.trend_monthly ?? ''] ?? 0)
  ) / 3
  const ab1 = dir(r.ab1_direction, ['LONG', 'BULL', 'BUY'], ['SHORT', 'BEAR', 'SELL'])
  const ab2 = dir(r.ab2_momentum, ['BULL'], ['BEAR'])
  const ab3 = dir(r.ab3_ma_confluence, ['BULL'], ['BEAR'])
  const ab4 = dir(r.ab4_trend, ['BUY', 'BULL', 'LONG'], ['SELL', 'BEAR', 'SHORT'])
  // BW = risco (inverso): risco baixo = pressão levemente positiva; risco alto = negativa
  const bw = r.bw_risk_score != null ? clamp((5.5 - r.bw_risk_score) / 4.5, -1, 1) : 0

  const word = (v: number, p: string, n: string, z = 'neutro') => v > 0.15 ? p : v < -0.15 ? n : z

  return [
    { key: 'gs', label: 'Fundamental (GS)', vote: gs, read: word(gs, 'bull', 'bear') },
    { key: 'ct', label: 'Técnico (CT)', vote: ct, read: word(ct, 'bull', 'bear') },
    { key: 'trend', label: 'Tendência D/S/M', vote: trend, read: word(trend, 'bull', 'bear', 'lateral') },
    { key: 'ab1', label: 'Al Brooks · Direção', vote: ab1, read: word(ab1, 'comprador', 'vendedor') },
    { key: 'ab2', label: 'Al Brooks · Momentum', vote: ab2, read: word(ab2, 'forte', 'fraco') },
    { key: 'ab3', label: 'Al Brooks · Confluência', vote: ab3, read: word(ab3, 'alinhada', 'contrária') },
    { key: 'ab4', label: 'Al Brooks · Tendência', vote: ab4, read: word(ab4, 'bull', 'bear') },
    { key: 'bw', label: 'Risco (BW)', vote: bw, read: r.bw_risk_score != null ? `risco ${r.bw_risk_score}/10` : '—' },
  ]
}

export function biasLabel(force: number): string {
  if (force >= 55) return 'STRONG BULL'
  if (force >= 18) return 'BULL'
  if (force > -18) return 'NEUTRAL'
  if (force > -55) return 'BEAR'
  return 'STRONG BEAR'
}

export function computeForce(r: SignalRow): Intelligence {
  const lenses = lensVotes(r)
  const mean = lenses.reduce((s, l) => s + l.vote, 0) / lenses.length
  const force = Math.round(mean * 100)
  const net = sgn(force)

  // convicção: % de lentes apontando no sentido dominante
  const aligned = net === 0
    ? lenses.filter(l => Math.abs(l.vote) < 0.15).length
    : lenses.filter(l => sgn(l.vote) === net).length
  const conviction = Math.round((aligned / lenses.length) * 100)

  // divergência: fundamental (GS) vs técnico (CT+tendência+AB) discordam
  const gsVote = lenses[0].vote
  const techVote = (lenses[1].vote + lenses[2].vote + lenses[3].vote + lenses[6].vote) / 4
  const divergent = Math.abs(gsVote) >= 0.4 && Math.abs(techVote) >= 0.4 && sgn(gsVote) !== sgn(techVote)

  return { force, conviction, bias: biasLabel(force), lenses, divergent }
}

// ── MOVIMENTO: o que mudou de um dia para o outro ─────────────────────────────
export interface MoverFlip {
  ticker: string; name: string; force: number; biasFrom: string; biasTo: string
}
export interface MoverDelta {
  ticker: string; name: string; force: number; forcePrev: number; delta: number; bias: string
}
export interface MoverDiverge {
  ticker: string; name: string; force: number; gs: string; tech: string
}

export interface Movers {
  flips: MoverFlip[]
  gainers: MoverDelta[]
  losers: MoverDelta[]
  divergences: MoverDiverge[]
  exhaustion: { ticker: string; name: string; force: number; ex: number }[]
}

// Lado do viés: BULL (altista) = +1, BEAR (baixista) = -1, NEUTRAL = 0.
// STRONG BULL e BULL são o MESMO lado; STRONG BEAR e BEAR também.
function biasSide(bias: string): number {
  if (bias.includes('BULL')) return 1
  if (bias.includes('BEAR')) return -1
  return 0
}

// ── ACELERAÇÃO: o movimento da força está ganhando ou perdendo velocidade? ─────
// Compara a velocidade de hoje (f0−f1) com a de ontem (f1−f2). É direção-neutro:
// mede se o MOVIMENTO acelera, seja pra cima ou pra baixo (a direção é o viés).
export type AccelState = 'ACCEL' | 'STABLE' | 'BRAKE'

export function computeAccel(f0: number, f1: number | null, f2: number | null): AccelState {
  if (f1 == null || f2 == null) return 'STABLE'
  const speedNow = Math.abs(f0 - f1)
  const speedPrev = Math.abs(f1 - f2)
  if (speedNow < 8) return 'STABLE'          // movimento praticamente parado
  const diff = speedNow - speedPrev
  if (diff >= 12) return 'ACCEL'             // ganhando velocidade
  if (diff <= -12) return 'BRAKE'            // freando
  return 'STABLE'
}

// ── MATRIZ: a inteligência completa por ação (com a força de ontem p/ o delta) ─
export interface MatrixEntry {
  ticker: string
  name: string
  sector: string
  price: number
  change_percent: number
  upside: number | null
  ex: number | null
  force: number
  forcePrev: number | null
  delta: number | null
  accel: AccelState
  conviction: number
  bias: string
  divergent: boolean
  lenses: Lens[]
}

export function buildMatrix(today: SignalRow[], prev: SignalRow[], prev2: SignalRow[] = []): MatrixEntry[] {
  const pF = new Map(prev.map(r => [r.ticker, computeForce(r).force]))
  const p2F = new Map(prev2.map(r => [r.ticker, computeForce(r).force]))
  return today
    .map(r => {
      const intel = computeForce(r)
      const f1 = pF.has(r.ticker) ? (pF.get(r.ticker) as number) : null
      const f2 = p2F.has(r.ticker) ? (p2F.get(r.ticker) as number) : null
      return {
        ticker: r.ticker, name: r.name, sector: r.sector,
        price: r.price, change_percent: r.change_percent,
        upside: r.upside_base_pct, ex: r.ex_score,
        force: intel.force, forcePrev: f1, delta: f1 != null ? intel.force - f1 : null,
        accel: computeAccel(intel.force, f1, f2),
        conviction: intel.conviction, bias: intel.bias,
        divergent: intel.divergent, lenses: intel.lenses,
      }
    })
    .sort((a, b) => b.force - a.force)
}

export function buildMovers(today: SignalRow[], prev: SignalRow[]): Movers {
  const prevMap = new Map(prev.map(r => [r.ticker, computeForce(r)]))
  const flips: MoverFlip[] = []
  const gainers: MoverDelta[] = []
  const losers: MoverDelta[] = []
  const divergences: MoverDiverge[] = []
  const exhaustion: Movers['exhaustion'] = []

  for (const r of today) {
    const t = computeForce(r)
    const p = prevMap.get(r.ticker)

    if (p) {
      // "Virou de viés" só quando MUDA DE LADO (bull↔bear, ou entra/sai do neutro).
      // Intensificar no mesmo lado (BEAR→STRONG BEAR) NÃO conta — isso é força.
      if (biasSide(t.bias) !== biasSide(p.bias)) {
        flips.push({ ticker: r.ticker, name: r.name, force: t.force, biasFrom: p.bias, biasTo: t.bias })
      }
      const delta = t.force - p.force
      if (delta >= 12) gainers.push({ ticker: r.ticker, name: r.name, force: t.force, forcePrev: p.force, delta, bias: t.bias })
      if (delta <= -12) losers.push({ ticker: r.ticker, name: r.name, force: t.force, forcePrev: p.force, delta, bias: t.bias })
    }

    if (t.divergent) {
      const L = t.lenses
      divergences.push({
        ticker: r.ticker, name: r.name, force: t.force,
        gs: L[0].read, tech: L[1].read,
      })
    }
    if (r.ex_score != null && r.ex_score >= 3) {
      exhaustion.push({ ticker: r.ticker, name: r.name, force: t.force, ex: r.ex_score })
    }
  }

  // ordena por relevância
  flips.sort((a, b) => Math.abs(b.force) - Math.abs(a.force))
  gainers.sort((a, b) => b.delta - a.delta)
  losers.sort((a, b) => a.delta - b.delta)
  divergences.sort((a, b) => Math.abs(b.force) - Math.abs(a.force))

  return { flips, gainers, losers, divergences, exhaustion }
}
