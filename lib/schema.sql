-- JD Market Analysis — Neon Postgres Schema
-- Run once to initialize the database

CREATE TABLE IF NOT EXISTS daily_snapshots (
  id              SERIAL PRIMARY KEY,
  analysis_date   DATE NOT NULL UNIQUE,
  generated_at    TIMESTAMPTZ NOT NULL,
  ibovespa_price  NUMERIC(12,2),
  ibovespa_change NUMERIC(8,4),
  usdbrl_price    NUMERIC(8,4),
  usdbrl_change   NUMERIC(8,4),
  asset_count     INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS asset_analyses (
  id                      SERIAL PRIMARY KEY,
  analysis_date           DATE NOT NULL,
  ticker                  VARCHAR(12) NOT NULL,
  name                    VARCHAR(200),
  sector                  VARCHAR(200),
  logo_small              TEXT,

  -- Price
  price                   NUMERIC(12,4),
  change_percent          NUMERIC(8,4),
  volume                  BIGINT,
  market_cap              NUMERIC(20,2),

  -- Fundamentals
  pe_ratio                NUMERIC(10,2),
  roe                     NUMERIC(8,4),
  net_margin              NUMERIC(8,4),
  debt_equity             NUMERIC(8,4),
  revenue_growth_yoy      NUMERIC(10,4),
  free_cashflow           NUMERIC(20,2),
  ev_ebitda               NUMERIC(10,4),
  beta                    NUMERIC(8,4),
  dividend_yield          NUMERIC(8,4),

  -- GS Framework
  rating                  VARCHAR(20),
  moat                    VARCHAR(20),
  investment_thesis       TEXT,
  targets_bear            NUMERIC(10,2),
  targets_base            NUMERIC(10,2),
  targets_bull            NUMERIC(10,2),
  upside_base_pct         NUMERIC(8,2),
  entry_zone              VARCHAR(100),
  stop_loss               NUMERIC(10,2),
  risk_rating             INTEGER,
  catalysts               JSONB DEFAULT '[]',
  risks                   JSONB DEFAULT '[]',

  -- BW Framework
  bw_summary              TEXT,
  bw_overall_risk         VARCHAR(20),
  bw_risk_score           INTEGER,
  bw_max_position_pct     NUMERIC(6,2),
  bw_recession_drawdown   NUMERIC(6,2),
  bw_dimensions           JSONB,
  bw_tail_risks           JSONB DEFAULT '[]',
  bw_hedges               JSONB DEFAULT '[]',

  -- CT Framework
  ct_confidence           VARCHAR(20),
  trend_daily             VARCHAR(20),
  trend_weekly            VARCHAR(20),
  trend_monthly           VARCHAR(20),
  ma50                    NUMERIC(10,2),
  ma200                   NUMERIC(10,2),
  above_ma200             BOOLEAN,
  rsi                     NUMERIC(6,2),
  rsi_signal              VARCHAR(20),
  macd                    VARCHAR(20),
  bollinger               VARCHAR(20),
  support1                NUMERIC(10,2),
  support2                NUMERIC(10,2),
  resistance1             NUMERIC(10,2),
  ct_entry                NUMERIC(10,2),
  ct_target1              NUMERIC(10,2),
  ct_target2              NUMERIC(10,2),
  ct_stop                 NUMERIC(10,2),
  ct_rr                   NUMERIC(6,2),
  ct_pattern              TEXT,

  -- AB Framework (Al Brooks)
  ab1_direction           VARCHAR(50),
  ab1_signal_bar          VARCHAR(50),
  ab2_momentum            VARCHAR(50),
  ab2_reversal            VARCHAR(50),
  ab3_ma_confluence       VARCHAR(50),
  ab3_confluence_strength VARCHAR(50),
  ab4_trend               VARCHAR(50),
  ab4_trend_strength      VARCHAR(50),

  -- Consensus
  consensus_signal        VARCHAR(20),

  created_at              TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (analysis_date, ticker),
  FOREIGN KEY (analysis_date) REFERENCES daily_snapshots(analysis_date) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_asset_analyses_date ON asset_analyses(analysis_date DESC);
CREATE INDEX IF NOT EXISTS idx_asset_analyses_ticker ON asset_analyses(ticker);
CREATE INDEX IF NOT EXISTS idx_asset_analyses_rating ON asset_analyses(rating);
CREATE INDEX IF NOT EXISTS idx_asset_analyses_consensus ON asset_analyses(consensus_signal);
