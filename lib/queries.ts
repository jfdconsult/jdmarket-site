import { getPool } from './db'
import type { TickerSummary, TickerAnalysis, DailySnapshot, RankingRow, MarketPulse } from './types'
import type { SignalRow } from './intelligence'

export async function getLatestDate(): Promise<string | null> {
  const { rows } = await getPool().query(
    'SELECT analysis_date::text FROM daily_snapshots ORDER BY analysis_date DESC LIMIT 1'
  )
  return rows[0]?.analysis_date ?? null
}

export async function getLatestSnapshot(): Promise<DailySnapshot | null> {
  const { rows } = await getPool().query(
    'SELECT * FROM daily_snapshots ORDER BY analysis_date DESC LIMIT 1'
  )
  return (rows[0] as DailySnapshot) ?? null
}

export async function getTickerRanking(date?: string): Promise<TickerSummary[]> {
  if (date) {
    const { rows } = await getPool().query(
      `SELECT ticker, name, sector, logo_small, price, change_percent,
              rating, consensus_signal, bw_risk_score, risk_rating,
              upside_base_pct, moat
       FROM asset_analyses
       WHERE analysis_date = $1::date
       ORDER BY
         CASE consensus_signal
           WHEN 'STRONG_BUY' THEN 1 WHEN 'BUY' THEN 2
           WHEN 'NEUTRAL' THEN 3 WHEN 'SELL' THEN 4 WHEN 'STRONG_SELL' THEN 5
           ELSE 6
         END,
         upside_base_pct DESC NULLS LAST`,
      [date]
    )
    return rows as TickerSummary[]
  }

  const { rows } = await getPool().query(
    `SELECT a.ticker, a.name, a.sector, a.logo_small, a.price, a.change_percent,
            a.rating, a.consensus_signal, a.bw_risk_score, a.risk_rating,
            a.upside_base_pct, a.moat
     FROM asset_analyses a
     INNER JOIN (
       SELECT ticker, MAX(analysis_date) AS latest
       FROM asset_analyses GROUP BY ticker
     ) latest ON a.ticker = latest.ticker AND a.analysis_date = latest.latest
     ORDER BY
       CASE a.consensus_signal
         WHEN 'STRONG_BUY' THEN 1 WHEN 'BUY' THEN 2
         WHEN 'NEUTRAL' THEN 3 WHEN 'SELL' THEN 4 WHEN 'STRONG_SELL' THEN 5
         ELSE 6
       END,
       a.upside_base_pct DESC NULLS LAST`
  )
  return rows as TickerSummary[]
}

export async function getTickerAnalysis(
  ticker: string,
  date?: string
): Promise<TickerAnalysis | null> {
  const query = date
    ? `SELECT a.*, s.generated_at, s.analysis_date::text AS analysis_date,
              s.ibovespa_price, s.usdbrl_price
       FROM asset_analyses a
       JOIN daily_snapshots s ON a.analysis_date = s.analysis_date
       WHERE UPPER(a.ticker) = UPPER($1)
         AND a.analysis_date = $2::date
       LIMIT 1`
    : `SELECT a.*, s.generated_at, a.analysis_date::text AS analysis_date,
              s.ibovespa_price, s.usdbrl_price
       FROM asset_analyses a
       JOIN daily_snapshots s ON a.analysis_date = s.analysis_date
       WHERE UPPER(a.ticker) = UPPER($1)
       ORDER BY a.analysis_date DESC
       LIMIT 1`

  const { rows } = await getPool().query(query, date ? [ticker, date] : [ticker])
  if (!rows[0]) return null

  const row = rows[0] as Record<string, unknown>
  for (const field of ['catalysts', 'risks', 'bw_tail_risks', 'bw_hedges', 'bw_dimensions']) {
    if (typeof row[field] === 'string') {
      row[field] = JSON.parse(row[field] as string)
    }
  }
  return row as unknown as TickerAnalysis
}

export async function getTickerHistory(ticker: string, limit = 30) {
  const { rows } = await getPool().query(
    `SELECT analysis_date::text, price, change_percent, rating, consensus_signal,
            bw_risk_score, targets_base, upside_base_pct
     FROM asset_analyses
     WHERE UPPER(ticker) = UPPER($1)
     ORDER BY analysis_date DESC
     LIMIT $2`,
    [ticker, limit]
  )
  return rows
}

export async function getRecentDates(limit = 10): Promise<string[]> {
  const { rows } = await getPool().query(
    'SELECT analysis_date::text FROM daily_snapshots ORDER BY analysis_date DESC LIMIT $1',
    [limit]
  )
  return rows.map((r: Record<string, unknown>) => r.analysis_date as string)
}

// Ranking rico para a tela principal React (scanner v2).
// Filtra pela data informada OU, sem data, pela ÚLTIMA data disponível —
// evita o bug de "tickers fantasma" (ações que saíram do universo aparecerem
// com dados antigos via MAX por ticker).
export async function getRankingDetailed(date?: string): Promise<RankingRow[]> {
  const dateExpr = date ? '$1::date' : '(SELECT MAX(analysis_date) FROM asset_analyses)'
  const { rows } = await getPool().query(
    `SELECT ticker, name, sector, logo_small, price, change_percent,
            rating, consensus_signal, ct_confidence,
            bw_risk_score, bw_overall_risk, risk_rating, upside_base_pct, moat,
            ab2_momentum, ab4_trend, ex_score, targets_base,
            analysis_date::text AS analysis_date
     FROM asset_analyses
     WHERE analysis_date = ${dateExpr}
     ORDER BY
       CASE consensus_signal
         WHEN 'STRONG_BUY' THEN 1 WHEN 'BUY' THEN 2
         WHEN 'NEUTRAL' THEN 3 WHEN 'SELL' THEN 4 WHEN 'STRONG_SELL' THEN 5
         ELSE 6
       END,
       upside_base_pct DESC NULLS LAST`,
    date ? [date] : []
  )
  return rows as RankingRow[]
}

// As N datas mais recentes da tabela normalizada (para comparar "o que mudou").
export async function getRecentAnalysisDates(limit = 2): Promise<string[]> {
  const { rows } = await getPool().query(
    'SELECT DISTINCT analysis_date::text AS d FROM asset_analyses ORDER BY d DESC LIMIT $1',
    [limit]
  )
  return rows.map((r: Record<string, unknown>) => r.d as string)
}

// Linhas de sinais (todos os métodos) de uma data — alimenta a camada de
// inteligência (força, convicção, divergência, movimento).
export async function getSignalRows(date?: string): Promise<SignalRow[]> {
  const dateExpr = date ? '$1::date' : '(SELECT MAX(analysis_date) FROM asset_analyses)'
  const { rows } = await getPool().query(
    `SELECT ticker, name, sector, logo_small, price, change_percent,
            rating, ct_confidence, trend_daily, trend_weekly, trend_monthly,
            ab1_direction, ab1_signal_bar, ab2_momentum, ab3_ma_confluence, ab4_trend,
            bw_risk_score, bw_overall_risk, consensus_signal, ex_score, upside_base_pct,
            jd_score, consensus_signals,
            analysis_date::text AS analysis_date
     FROM asset_analyses
     WHERE analysis_date = ${dateExpr}`,
    date ? [date] : []
  )
  return rows as SignalRow[]
}

// Pulso de mercado da última data — IBOVESPA/IBX50/USD vêm do full_json.
export async function getLatestPulse(): Promise<MarketPulse | null> {
  const { rows } = await getPool().query(
    `SELECT analysis_date::text AS analysis_date, generated_at, full_json
     FROM daily_snapshots ORDER BY analysis_date DESC LIMIT 1`
  )
  if (!rows[0]) return null
  const fj = (rows[0].full_json ?? {}) as Record<string, { price: number | null; change_percent: number | null }>
  const empty = { price: null, change_percent: null }
  return {
    analysis_date: rows[0].analysis_date as string,
    generated_at: rows[0].generated_at as string,
    ibovespa: fj.ibovespa ?? empty,
    ibx50: fj.ibx50 ?? empty,
    usdbrl: fj.usdbrl ?? empty,
  }
}
