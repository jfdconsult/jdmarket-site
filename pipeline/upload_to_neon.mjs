// upload_to_neon.mjs
// Lê data_ab.json (pipeline B3) e faz upsert no Neon Postgres
// Uso: node upload_to_neon.mjs [caminho/para/data_ab.json]
// Variáveis de ambiente: DATABASE_URL, SITE_URL, REVALIDATE_SECRET

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { neon } from '@neondatabase/serverless'

const __dir = path.dirname(fileURLToPath(import.meta.url))

// ── Config ──────────────────────────────────────────────────────────────────
const DATA_PATH = process.argv[2] ??
  path.join(__dir, '..', '..', '..', 'OneDrive', 'Área de Trabalho', 'HARPIAN', 'B3 ANALISYS', 'data_ab.json')

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) { console.error('❌ DATABASE_URL não definido'); process.exit(1) }

const sql = neon(DATABASE_URL)

// ── Helpers ──────────────────────────────────────────────────────────────────
function normalizeSignal(s) {
  if (!s) return 'NEUTRAL'
  const map = {
    STRONG_BUY: 'STRONG_BUY', STRONG_SELL: 'STRONG_SELL',
    BUY: 'BUY', SELL: 'SELL', NEUTRAL: 'NEUTRAL',
    BULLISH: 'BUY', BEARISH: 'SELL',
    BULL: 'BUY', BEAR: 'SELL',
  }
  return map[s.toUpperCase().replace(/[^A-Z_]/g, '_')] ?? 'NEUTRAL'
}

function extractDate(generatedAtBr) {
  // "04/05/2026, 22:20:47" → "2026-05-04"
  const [datePart] = generatedAtBr.split(',')
  const [d, m, y] = datePart.trim().split('/')
  return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`📂 Lendo: ${DATA_PATH}`)
  const raw = readFileSync(DATA_PATH, 'utf8')
  const data = JSON.parse(raw)

  const analysisDate = extractDate(data.generated_at_br)
  const generatedAt  = new Date(data.generated_at).toISOString()

  console.log(`📅 Data da análise: ${analysisDate} | Ativos: ${data.assets.length}`)

  // ── 1. Upsert snapshot ──────────────────────────────────────────────────────
  await sql`
    INSERT INTO daily_snapshots
      (analysis_date, generated_at, ibovespa_price, ibovespa_change, usdbrl_price, usdbrl_change, asset_count, full_json)
    VALUES
      (${analysisDate}::date, ${generatedAt}::timestamptz,
       ${data.ibovespa?.price}, ${data.ibovespa?.change_percent},
       ${data.usdbrl?.price},   ${data.usdbrl?.change_percent},
       ${data.assets.length},   ${JSON.stringify(data)})
    ON CONFLICT (analysis_date) DO UPDATE SET
      generated_at    = EXCLUDED.generated_at,
      ibovespa_price  = EXCLUDED.ibovespa_price,
      ibovespa_change = EXCLUDED.ibovespa_change,
      usdbrl_price    = EXCLUDED.usdbrl_price,
      usdbrl_change   = EXCLUDED.usdbrl_change,
      asset_count     = EXCLUDED.asset_count,
      full_json       = EXCLUDED.full_json
  `
  console.log('✅ Snapshot salvo')

  // ── 2. Upsert cada ativo ────────────────────────────────────────────────────
  let ok = 0, fail = 0
  for (const a of data.assets) {
    try {
      const hg    = a._hg ?? {}
      const brapi = a._brapi ?? {}
      const tech  = a._tech ?? {}
      const tgts  = a.targets ?? {}
      const c8    = a._consensus8 ?? {}
      const ex    = a._ex ?? {}

      // Consensus: preferir _consensus8.signal, fallback _candle_signal
      const rawConsensus = c8.signal ?? a._candle_signal ?? a.confidence ?? a.rating
      const consensusSignal = normalizeSignal(rawConsensus)

      await sql`
        INSERT INTO asset_analyses (
          analysis_date, ticker, name, sector, logo_small,
          price, change_percent, volume, market_cap,
          pe_ratio, roe, net_margin, debt_equity, revenue_growth_yoy,
          free_cashflow, ev_ebitda, beta, dividend_yield,
          rating, moat, investment_thesis,
          targets_bear, targets_base, targets_bull, upside_base_pct,
          entry_zone, stop_loss, risk_rating,
          catalysts, risks,
          bw_summary, bw_overall_risk, bw_risk_score,
          bw_max_position_pct, bw_recession_drawdown,
          bw_dimensions, bw_tail_risks, bw_hedges,
          ct_confidence, trend_daily, trend_weekly, trend_monthly,
          ma50, ma200, above_ma200, rsi, rsi_signal, macd, bollinger,
          support1, support2, resistance1,
          ct_entry, ct_target1, ct_target2, ct_stop, ct_rr, ct_pattern,
          ab1_direction, ab1_signal_bar,
          ab2_momentum, ab2_reversal,
          ab3_ma_confluence, ab3_confluence_strength,
          ab4_trend, ab4_trend_strength,
          consensus_signal,
          ex_score, ex_classification, ex_bottom_score,
          ex1_rsi_days, ex2_near_52w_high, ex3_rsi_divergence, ex4_macd_decay, ex5_vol_exhaustion,
          ex_override_triggered,
          rsi_divergence, macd_hist_slope, vol_exhaustion,
          ab2_score_slope, ab4_ex_override, ab4_pre_reversal_flag,
          candle_ex_badge, candle_ex_override
        )
        VALUES (
          ${analysisDate}::date, ${a._ticker}, ${hg.name ?? null}, ${hg.sector ?? null},
          ${hg.logo?.small ?? null},
          ${hg.price ?? null}, ${hg.change_percent ?? null},
          ${hg.volume ?? null}, ${hg.market_cap ?? null},
          ${a.pe_ratio ?? (brapi.pe || null)},
          ${a.roe ?? (brapi.roe != null ? brapi.roe * 100 : null)},
          ${a.net_margin ?? (brapi.net_margin != null ? brapi.net_margin * 100 : null)},
          ${a.debt_equity ?? brapi.debt_equity ?? null},
          ${a.revenue_growth_yoy ?? brapi.revenue_growth ?? null},
          ${brapi.free_cashflow ?? null}, ${brapi.ev_ebitda ?? null},
          ${brapi.beta ?? null},
          ${hg.financials?.dividends?.yield_12m ?? null},
          ${normalizeSignal(a.rating)}, ${a.moat ?? null}, ${a.investment_thesis ?? null},
          ${tgts.bear ?? null}, ${tgts.base ?? null}, ${tgts.bull ?? null},
          ${tgts.upside_base_pct ?? null},
          ${a.entry_zone ?? null}, ${a.stop_loss ?? null}, ${a.risk_rating ?? null},
          ${JSON.stringify(a.catalysts ?? [])}, ${JSON.stringify(a.risks ?? [])},
          ${a.bw_summary ?? null},
          ${a.bw_overall_risk ?? null}, ${a.bw_risk_score ?? null},
          ${a.max_position_pct ?? null}, ${a.recession_drawdown_pct ?? null},
          ${JSON.stringify(a.bw_dimensions ?? {})},
          ${JSON.stringify(a.tail_risks ?? [])},
          ${JSON.stringify(a.hedges ?? [])},
          ${a.ct_confidence ?? null},
          ${a.trend_daily ?? tech.trend_daily ?? null},
          ${a.trend_weekly ?? tech.trend_weekly ?? null},
          ${a.trend_monthly ?? tech.trend_monthly ?? null},
          ${tech.ma50 ?? null}, ${tech.ma200 ?? null},
          ${tech.above_ma200 ?? null},
          ${tech.rsi ?? null}, ${tech.rsi_signal ?? null},
          ${tech.macd ?? null}, ${tech.bollinger ?? null},
          ${tech.support1 ?? null}, ${tech.support2 ?? null},
          ${tech.resistance1 ?? null},
          ${a.entry_tech ?? null},
          ${a.target1 ?? null},
          ${a.target2 ?? null},
          ${a.stop_tech ?? null},
          ${a.risk_reward ?? null},
          ${tech.pattern ?? a._candle_desc ?? null},
          ${a.ab1_always_in ?? null}, ${a.ab1_bar_quality ?? null},
          ${a.ab2_trend_strength ?? null}, ${a.ab2_trend_type ?? null},
          ${a.ab3_breakout_pressure ?? null}, ${a.ab3_market_phase ?? null},
          ${a.ab4_signal ?? null}, ${a.ab4_traders_equation ?? null},
          ${consensusSignal},
          ${ex.score ?? null}, ${ex.classification ?? null}, ${ex.bottom_score ?? null},
          ${ex.criteria?.ex1_rsi_overbought_days ?? null},
          ${ex.criteria?.ex2_near_52w_high ?? null},
          ${ex.criteria?.ex3_rsi_divergence ?? null},
          ${ex.criteria?.ex4_macd_hist_decay ?? null},
          ${ex.criteria?.ex5_volume_exhaustion ?? null},
          ${ex.override_triggered ?? null},
          ${ex.rsi_divergence ?? null}, ${ex.macd_hist_slope ?? null}, ${ex.vol_exhaustion ?? null},
          ${a.ab2_score_slope ?? null},
          ${a.ab4_ex_override ?? null}, ${a.ab4_pre_reversal_flag ?? null},
          ${a.candle_ex_badge ?? null}, ${a.candle_ex_override ?? null}
        )
        ON CONFLICT (analysis_date, ticker) DO UPDATE SET
          price = EXCLUDED.price,
          change_percent = EXCLUDED.change_percent,
          rating = EXCLUDED.rating,
          moat = EXCLUDED.moat,
          investment_thesis = EXCLUDED.investment_thesis,
          targets_bear = EXCLUDED.targets_bear,
          targets_base = EXCLUDED.targets_base,
          targets_bull = EXCLUDED.targets_bull,
          upside_base_pct = EXCLUDED.upside_base_pct,
          entry_zone = EXCLUDED.entry_zone,
          stop_loss = EXCLUDED.stop_loss,
          risk_rating = EXCLUDED.risk_rating,
          catalysts = EXCLUDED.catalysts,
          risks = EXCLUDED.risks,
          bw_summary = EXCLUDED.bw_summary,
          bw_overall_risk = EXCLUDED.bw_overall_risk,
          bw_risk_score = EXCLUDED.bw_risk_score,
          bw_dimensions = EXCLUDED.bw_dimensions,
          bw_tail_risks = EXCLUDED.bw_tail_risks,
          bw_hedges = EXCLUDED.bw_hedges,
          ct_confidence = EXCLUDED.ct_confidence,
          trend_daily = EXCLUDED.trend_daily,
          trend_weekly = EXCLUDED.trend_weekly,
          trend_monthly = EXCLUDED.trend_monthly,
          ma50 = EXCLUDED.ma50,
          ma200 = EXCLUDED.ma200,
          above_ma200 = EXCLUDED.above_ma200,
          rsi = EXCLUDED.rsi,
          macd = EXCLUDED.macd,
          bollinger = EXCLUDED.bollinger,
          support1 = EXCLUDED.support1,
          resistance1 = EXCLUDED.resistance1,
          ct_entry = EXCLUDED.ct_entry,
          ct_target1 = EXCLUDED.ct_target1,
          ct_stop = EXCLUDED.ct_stop,
          ct_rr = EXCLUDED.ct_rr,
          ct_pattern = EXCLUDED.ct_pattern,
          ab1_direction = EXCLUDED.ab1_direction,
          ab1_signal_bar = EXCLUDED.ab1_signal_bar,
          ab2_momentum = EXCLUDED.ab2_momentum,
          ab2_reversal = EXCLUDED.ab2_reversal,
          ab3_ma_confluence = EXCLUDED.ab3_ma_confluence,
          ab3_confluence_strength = EXCLUDED.ab3_confluence_strength,
          ab4_trend = EXCLUDED.ab4_trend,
          ab4_trend_strength = EXCLUDED.ab4_trend_strength,
          consensus_signal = EXCLUDED.consensus_signal,
          ex_score = EXCLUDED.ex_score,
          ex_classification = EXCLUDED.ex_classification,
          ex_bottom_score = EXCLUDED.ex_bottom_score,
          ex1_rsi_days = EXCLUDED.ex1_rsi_days,
          ex2_near_52w_high = EXCLUDED.ex2_near_52w_high,
          ex3_rsi_divergence = EXCLUDED.ex3_rsi_divergence,
          ex4_macd_decay = EXCLUDED.ex4_macd_decay,
          ex5_vol_exhaustion = EXCLUDED.ex5_vol_exhaustion,
          ex_override_triggered = EXCLUDED.ex_override_triggered,
          rsi_divergence = EXCLUDED.rsi_divergence,
          macd_hist_slope = EXCLUDED.macd_hist_slope,
          vol_exhaustion = EXCLUDED.vol_exhaustion,
          ab2_score_slope = EXCLUDED.ab2_score_slope,
          ab4_ex_override = EXCLUDED.ab4_ex_override,
          ab4_pre_reversal_flag = EXCLUDED.ab4_pre_reversal_flag,
          candle_ex_badge = EXCLUDED.candle_ex_badge,
          candle_ex_override = EXCLUDED.candle_ex_override
      `
      ok++
    } catch (e) {
      console.error(`  ❌ ${a._ticker}: ${e.message?.slice(0, 120)}`)
      fail++
    }
  }

  console.log(`✅ Upload concluído: ${ok} ativos salvos, ${fail} erros`)

  // ── 3. Revalidate o site ────────────────────────────────────────────────────
  const siteUrl = process.env.SITE_URL
  const secret  = process.env.REVALIDATE_SECRET
  if (siteUrl && secret) {
    try {
      const res = await fetch(`${siteUrl}/api/revalidate`, {
        method: 'POST',
        headers: { 'x-revalidate-secret': secret },
      })
      const json = await res.json()
      console.log(`🔄 Revalidate: ${JSON.stringify(json)}`)
    } catch (e) {
      console.warn(`⚠️  Revalidate falhou: ${e.message}`)
    }
  }
}

main().catch(e => { console.error(e); process.exit(1) })
