import { sql } from './db'
import type { TickerSummary, TickerAnalysis, DailySnapshot } from './types'

export async function getLatestDate(): Promise<string | null> {
  const rows = await sql`
    SELECT analysis_date::text FROM daily_snapshots
    ORDER BY analysis_date DESC LIMIT 1
  `
  return rows[0]?.analysis_date ?? null
}

export async function getLatestSnapshot(): Promise<DailySnapshot | null> {
  const rows = await sql`
    SELECT * FROM daily_snapshots ORDER BY analysis_date DESC LIMIT 1
  `
  return (rows[0] as DailySnapshot) ?? null
}

export async function getTickerRanking(date?: string): Promise<TickerSummary[]> {
  const rows = date
    ? await sql`
        SELECT
          ticker, name, sector, logo_small, price, change_percent,
          rating, consensus_signal, bw_risk_score, risk_rating,
          upside_base_pct, moat
        FROM asset_analyses
        WHERE analysis_date = ${date}::date
        ORDER BY
          CASE consensus_signal
            WHEN 'STRONG_BUY' THEN 1 WHEN 'BUY' THEN 2
            WHEN 'NEUTRAL' THEN 3 WHEN 'SELL' THEN 4 WHEN 'STRONG_SELL' THEN 5
            ELSE 6
          END,
          upside_base_pct DESC NULLS LAST
      `
    : await sql`
        SELECT
          a.ticker, a.name, a.sector, a.logo_small, a.price, a.change_percent,
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
          a.upside_base_pct DESC NULLS LAST
      `
  return rows as TickerSummary[]
}

export async function getTickerAnalysis(
  ticker: string,
  date?: string
): Promise<TickerAnalysis | null> {
  const rows = date
    ? await sql`
        SELECT a.*, s.generated_at, s.analysis_date::text AS analysis_date,
               s.ibovespa_price, s.usdbrl_price
        FROM asset_analyses a
        JOIN daily_snapshots s ON a.analysis_date = s.analysis_date
        WHERE UPPER(a.ticker) = UPPER(${ticker})
          AND a.analysis_date = ${date}::date
        LIMIT 1
      `
    : await sql`
        SELECT a.*, s.generated_at, a.analysis_date::text AS analysis_date,
               s.ibovespa_price, s.usdbrl_price
        FROM asset_analyses a
        JOIN daily_snapshots s ON a.analysis_date = s.analysis_date
        WHERE UPPER(a.ticker) = UPPER(${ticker})
        ORDER BY a.analysis_date DESC
        LIMIT 1
      `
  if (!rows[0]) return null
  const row = rows[0] as Record<string, unknown>
  // Parse JSONB fields
  for (const field of ['catalysts', 'risks', 'bw_tail_risks', 'bw_hedges', 'bw_dimensions']) {
    if (typeof row[field] === 'string') {
      row[field] = JSON.parse(row[field] as string)
    }
  }
  return row as unknown as TickerAnalysis
}

export async function getTickerHistory(ticker: string, limit = 30) {
  return sql`
    SELECT analysis_date::text, price, change_percent, rating, consensus_signal,
           bw_risk_score, targets_base, upside_base_pct
    FROM asset_analyses
    WHERE UPPER(ticker) = UPPER(${ticker})
    ORDER BY analysis_date DESC
    LIMIT ${limit}
  `
}

export async function getRecentDates(limit = 10): Promise<string[]> {
  const rows = await sql`
    SELECT analysis_date::text FROM daily_snapshots
    ORDER BY analysis_date DESC LIMIT ${limit}
  `
  return rows.map((r: Record<string, unknown>) => r.analysis_date as string)
}
