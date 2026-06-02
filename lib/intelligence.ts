// ── CAMADA DE INTELIGÊNCIA — JD SCORE ─────────────────────────────────────────
// JD Score = método próprio: soma dos votos de 8 frameworks, escala −8 a +8.
// Frameworks: GS (Goldman), BW (Bridgewater), CT (Citadel), JP (JP Morgan),
// AB1–AB4 (Al Brooks). Cada um vota −1/0/+1.
//   Fundamental = GS + BW + JP   (−3..+3)
//   Técnico     = CT + AB1..AB4  (−5..+5)
// NÃO emite "compra/venda" — descreve o VIÉS que os métodos leem.

export interface SignalRow {
  ticker: string
  name: string
  sector: string
  logo_small: string | null
  price: number
  change_percent: number
  jd_score: number | null
  consensus_signals: Record<string, string> | null
  ex_score: number | null
  upside_base_pct: number | null
  analysis_date: string
}

export interface Lens {
  key: string
  label: string
  vote: number    // -1..+1
  read: string    // texto curto
}

export interface Intelligence {
  force: number       // = JD Score, −8..+8
  conviction: number  // 0..100 (% de métodos alinhados ao viés)
  bias: string        // STRONG BULL | BULL | NEUTRAL | BEAR | STRONG BEAR
  fund: number        // pilar fundamental −3..+3
  tec: number         // pilar técnico −5..+5
  lenses: Lens[]      // os 8 votos
  divergent: boolean  // fundamental e técnico discordam
  schools: { gs: number; ct: number; bw: number; ab: number; jp: number }
}

// Mapeamento de sinal → voto (mesmo do calcConsensus8 do pipeline)
const S: Record<string, number> = {
  'STRONG BUY': 1, 'BUY': 1, 'STRONG BULL': 1, 'BULL': 1, 'BULLISH': 1, 'LONG': 1,
  'STRONG SELL': -1, 'SELL': -1, 'STRONG BEAR': -1, 'BEAR': -1, 'BEARISH': -1, 'SHORT': -1,
  'NEUTRAL': 0, 'HOLD': 0, 'BALANCED': 0,
}
const vote = (s?: string) => S[(s ?? '').toUpperCase().trim()] ?? 0
const sgn = (n: number) => (n > 0 ? 1 : n < 0 ? -1 : 0)

export function biasLabel(score: number): string {
  if (score >= 5) return 'STRONG BULL'
  if (score >= 2) return 'BULL'
  if (score >= -1) return 'NEUTRAL'
  if (score >= -4) return 'BEAR'
  return 'STRONG BEAR'
}

export function computeForce(row: SignalRow): Intelligence {
  const sig = row.consensus_signals ?? {}
  const g = vote(sig.gs), b = vote(sig.bw), c = vote(sig.ct), j = vote(sig.jp)
  const a1 = vote(sig.ab1), a2 = vote(sig.ab2), a3 = vote(sig.ab3), a4 = vote(sig.ab4)
  const ab = a1 + a2 + a3 + a4
  const fund = g + b + j
  const tec = c + ab
  const score = row.jd_score != null ? row.jd_score : fund + tec

  const votes = [g, b, c, j, a1, a2, a3, a4]
  const net = sgn(score)
  const aligned = net === 0 ? votes.filter(v => v === 0).length : votes.filter(v => sgn(v) === net).length
  const conviction = Math.round((aligned / 8) * 100)

  const divergent = Math.abs(fund) >= 1 && Math.abs(tec) >= 2 && sgn(fund) !== 0 && sgn(tec) !== 0 && sgn(fund) !== sgn(tec)

  const word = (v: number) => v > 0 ? 'bull' : v < 0 ? 'bear' : 'neutro'
  const lenses: Lens[] = [
    { key: 'gs', label: 'Fundamental (GS)', vote: g, read: word(g) },
    { key: 'bw', label: 'Risco (BW)', vote: b, read: word(b) },
    { key: 'ct', label: 'Técnico (CT)', vote: c, read: word(c) },
    { key: 'jp', label: 'JP Morgan', vote: j, read: word(j) },
    { key: 'ab1', label: 'Al Brooks · AB1', vote: a1, read: word(a1) },
    { key: 'ab2', label: 'Al Brooks · AB2', vote: a2, read: word(a2) },
    { key: 'ab3', label: 'Al Brooks · AB3', vote: a3, read: word(a3) },
    { key: 'ab4', label: 'Al Brooks · AB4', vote: a4, read: word(a4) },
  ]

  return { force: score, conviction, bias: biasLabel(score), fund, tec, lenses, divergent, schools: { gs: g, ct: c, bw: b, ab, jp: j } }
}

// ── ACELERAÇÃO: o movimento do JD Score ganha ou perde velocidade? ────────────
export type AccelState = 'ACCEL' | 'STABLE' | 'BRAKE'
export function computeAccel(f0: number, f1: number | null, f2: number | null): AccelState {
  if (f1 == null || f2 == null) return 'STABLE'
  const speedNow = Math.abs(f0 - f1)
  const speedPrev = Math.abs(f1 - f2)
  if (speedNow < 2) return 'STABLE'
  const diff = speedNow - speedPrev
  if (diff >= 2) return 'ACCEL'
  if (diff <= -2) return 'BRAKE'
  return 'STABLE'
}

// ── Lado do viés: BULL = +1, BEAR = -1, NEUTRAL = 0 ───────────────────────────
function biasSide(bias: string): number {
  if (bias.includes('BULL')) return 1
  if (bias.includes('BEAR')) return -1
  return 0
}
function sideLabel(bias: string): string {
  if (bias.includes('BULL')) return 'BULL'
  if (bias.includes('BEAR')) return 'BEAR'
  return 'NEUTRAL'
}

// ── MATRIZ ────────────────────────────────────────────────────────────────────
export interface MatrixEntry {
  ticker: string
  name: string
  sector: string
  price: number
  change_percent: number
  upside: number | null
  ex: number | null
  force: number          // JD Score −8..+8
  forcePrev: number | null
  delta: number | null
  accel: AccelState
  conviction: number
  bias: string
  fund: number
  tec: number
  divergent: boolean
  lenses: Lens[]
  schools: { gs: number; ct: number; bw: number; ab: number; jp: number }
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
        conviction: intel.conviction, bias: intel.bias, fund: intel.fund, tec: intel.tec,
        divergent: intel.divergent, lenses: intel.lenses, schools: intel.schools,
      }
    })
    .sort((a, b) => b.force - a.force)
}

// ── MOVIMENTO ─────────────────────────────────────────────────────────────────
export interface MoverFlip { ticker: string; name: string; force: number; biasFrom: string; biasTo: string }
export interface MoverDelta { ticker: string; name: string; force: number; forcePrev: number; delta: number; bias: string }
export interface MoverDiverge { ticker: string; name: string; force: number; gs: string; tech: string }
export interface Movers {
  flips: MoverFlip[]
  gainers: MoverDelta[]
  losers: MoverDelta[]
  divergences: MoverDiverge[]
  exhaustion: { ticker: string; name: string; force: number; ex: number }[]
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
      // virou de viés = mudou de LADO (bull↔bear); intensificar no mesmo lado não conta
      if (biasSide(t.bias) !== biasSide(p.bias)) {
        flips.push({ ticker: r.ticker, name: r.name, force: t.force, biasFrom: sideLabel(p.bias), biasTo: sideLabel(t.bias) })
      }
      const delta = t.force - p.force
      if (delta >= 2) gainers.push({ ticker: r.ticker, name: r.name, force: t.force, forcePrev: p.force, delta, bias: t.bias })
      if (delta <= -2) losers.push({ ticker: r.ticker, name: r.name, force: t.force, forcePrev: p.force, delta, bias: t.bias })
    }
    if (t.divergent) {
      divergences.push({ ticker: r.ticker, name: r.name, force: t.force, gs: t.fund > 0 ? 'bull' : t.fund < 0 ? 'bear' : 'neutro', tech: t.tec > 0 ? 'bull' : t.tec < 0 ? 'bear' : 'neutro' })
    }
    if (r.ex_score != null && r.ex_score >= 3) {
      exhaustion.push({ ticker: r.ticker, name: r.name, force: t.force, ex: r.ex_score })
    }
  }

  flips.sort((a, b) => Math.abs(b.force) - Math.abs(a.force))
  gainers.sort((a, b) => b.delta - a.delta)
  losers.sort((a, b) => a.delta - b.delta)
  divergences.sort((a, b) => Math.abs(b.force) - Math.abs(a.force))
  return { flips, gainers, losers, divergences, exhaustion }
}
