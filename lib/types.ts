// Core types derived from the B3 ANALISYS pipeline output format

export type Rating = 'STRONG_BUY' | 'BUY' | 'NEUTRAL' | 'SELL' | 'STRONG_SELL'
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME'
export type Moat = 'STRONG' | 'MODERATE' | 'WEAK' | 'NONE'
export type Trend = 'BULLISH' | 'NEUTRAL' | 'BEARISH'

export interface BWDimension {
  r: RiskLevel
  n: string
}

export interface AssetAnalysis {
  ticker: string
  name: string
  sector: string
  logo_small: string | null
  price: number
  change_percent: number
  volume: number
  market_cap: number

  // Fundamentals
  pe_ratio: number | null
  roe: number | null
  net_margin: number | null
  debt_equity: number | null
  revenue_growth_yoy: number | null
  free_cashflow: number | null
  ev_ebitda: number | null
  beta: number | null
  dividend_yield: number | null

  // GS Framework
  rating: Rating
  moat: Moat
  investment_thesis: string
  targets_bear: number
  targets_base: number
  targets_bull: number
  upside_base_pct: number
  entry_zone: string
  stop_loss: number
  risk_rating: number
  catalysts: string[]
  risks: string[]

  // BW Framework
  bw_summary: string
  bw_overall_risk: RiskLevel
  bw_risk_score: number
  bw_max_position_pct: number | null
  bw_recession_drawdown_pct: number | null
  bw_dimensions: {
    macro_brasil: BWDimension
    cambio_brl: BWDimension
    setor: BWDimension
    liquidez: BWDimension
    alavancagem: BWDimension
    politico: BWDimension
  }
  bw_tail_risks: string[]
  bw_hedges: string[]

  // CT Framework
  ct_confidence: Rating
  trend_daily: Trend
  trend_weekly: Trend
  trend_monthly: Trend
  ma50: number
  ma200: number
  above_ma200: boolean
  rsi: number
  rsi_signal: string
  macd: string
  bollinger: string
  support1: number
  support2: number
  resistance1: number
  ct_entry: number | null
  ct_target1: number | null
  ct_target2: number | null
  ct_stop: number | null
  ct_rr: number | null
  ct_pattern: string | null

  // AB Framework (Al Brooks)
  ab1_direction: string | null
  ab1_signal_bar: string | null
  ab2_momentum: string | null
  ab2_reversal: string | null
  ab3_ma_confluence: string | null
  ab3_confluence_strength: string | null
  ab4_trend: string | null
  ab4_trend_strength: string | null

  // Consensus
  consensus_signal: Rating
}

export interface DailySnapshot {
  id: number
  analysis_date: string // YYYY-MM-DD
  generated_at: string  // ISO timestamp
  ibovespa_price: number
  ibovespa_change: number
  usdbrl_price: number
  usdbrl_change: number
  asset_count: number
}

export interface TickerAnalysis extends AssetAnalysis {
  analysis_date: string
  generated_at: string
}

// Used in home page ranking
export interface TickerSummary {
  ticker: string
  name: string
  sector: string
  logo_small: string | null
  price: number
  change_percent: number
  rating: Rating
  consensus_signal: Rating
  bw_risk_score: number
  risk_rating: number
  upside_base_pct: number
  moat: Moat
}
