import { getPool } from './db'
import type { TickerSummary, TickerAnalysis, DailySnapshot } from './types'

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
