#!/usr/bin/env node
// rotina_v5.mjs — JD Market Analysis · Pipeline de Dados
// Uso: node rotina_v5.mjs
// Agendar: weekdays 17:00 BRT (após fechamento B3)

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dir = path.dirname(fileURLToPath(import.meta.url));

// ── CONFIG ────────────────────────────────────────────────────────────────────
let HG_KEY       = '9ca1cb51';
let ANTHROPIC_KEY = '';
let TICKERS      = 'PETR4,VALE3,ITUB4,BBDC4,WEGE3,MGLU3,SUZB3,RENT3,BBAS3';

// Carrega .env se existir
const envPath = path.join(__dir, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const k = line.slice(0, eq).trim();
    const v = line.slice(eq + 1).trim();
    if (k === 'HG_KEY')        HG_KEY        = v;
    if (k === 'ANTHROPIC_KEY') ANTHROPIC_KEY = v;
    if (k === 'TICKERS')       TICKERS       = v;
  }
}
if (process.env.HG_KEY)        HG_KEY        = process.env.HG_KEY;
if (process.env.ANTHROPIC_KEY) ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;
if (process.env.TICKERS)       TICKERS       = process.env.TICKERS;

const tickers = TICKERS.split(',').map(t => t.trim()).filter(Boolean);

const HG_URL     = 'https://api.hgbrasil.com/finance/stock_price';
const BRAPI_URL  = 'https://brapi.dev/api/quote';
const CLAUDE_URL = 'https://api.anthropic.com/v1/messages';

// ── FETCH HELPERS ─────────────────────────────────────────────────────────────
async function fetchHG(symbol) {
  const url = `${HG_URL}?key=${HG_KEY}&format=json-cors&symbol=${symbol}`;
  const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  if (!j.valid_key) throw new Error('HG API key inválida');
  return j.results?.[symbol] || null;
}

async function fetchMacro() {
  try {
    const url = `${HG_URL}?key=${HG_KEY}&format=json-cors&symbol=BVSP,USDBRL`;
    const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!r.ok) return {};
    return (await r.json()).results || {};
  } catch { return {}; }
}

async function fetchBrapi(symbol) {
  try {
    const url = `${BRAPI_URL}/${symbol}?modules=financialData,defaultKeyStatistics,summaryProfile`;
    const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!r.ok) return null;
    const j = await r.json();
    const item = j.results?.[0];
    if (!item) return null;
    return {
      ...item.financialData,
      ...item.defaultKeyStatistics,
      summary: item.summaryProfile?.longBusinessSummary,
    };
  } catch { return null; }
}

// ── CLAUDE ANALYSIS ───────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é um analista quantitativo sênior especializado em B3. \
Dado dados reais de mercado, produza análise institucional rigorosa nos 4 frameworks. \
RESPONDA SOMENTE JSON VÁLIDO — sem markdown, sem texto fora do JSON, sem comentários.`;

function buildUserPrompt(ticker, hg, brapi, macro) {
  const p   = hg?.price             || 0;
  const chg = hg?.change_percent    || 0;
  const vol = hg?.volume            || 0;
  const cap = hg?.market_cap        || 0;
  const dy  = hg?.financials?.dividends?.yield_12m || 0;
  const pb  = hg?.financials?.price_to_book_ratio  || 0;

  const ibovChg = macro['BVSP']?.change_percent ?? null;
  const usdBrl  = macro['USDBRL']?.price ?? null;

  const lines = [
    `ATIVO: ${ticker} — ${hg?.company_name || ticker}`,
    `SETOR: ${hg?.sector || ''}`,
    `DATA: ${new Date().toLocaleDateString('pt-BR')}`,
    '',
    '=== DADOS REAIS DE MERCADO ===',
    `Preço: R$${p.toFixed(2)}  Variação hoje: ${chg >= 0 ? '+' : ''}${chg.toFixed(2)}%`,
    `Volume: ${(vol/1e6).toFixed(1)}M  Mkt Cap: R$${(cap/1000).toFixed(0)}B`,
    `P/B: ${pb}  DY 12m: ${dy}%`,
  ];

  if (ibovChg !== null) lines.push(`Ibovespa hoje: ${ibovChg >= 0 ? '+' : ''}${ibovChg.toFixed(2)}%`);
  if (usdBrl  !== null) lines.push(`USD/BRL: ${usdBrl.toFixed(4)}`);

  if (brapi) {
    const b = brapi;
    if (b.trailingPE)       lines.push(`P/E (trailing): ${b.trailingPE?.toFixed(1)}`);
    if (b.forwardPE)        lines.push(`P/E (forward): ${b.forwardPE?.toFixed(1)}`);
    if (b.beta)             lines.push(`Beta: ${b.beta?.toFixed(2)}`);
    if (b.returnOnEquity)   lines.push(`ROE: ${(b.returnOnEquity * 100).toFixed(1)}%`);
    if (b.profitMargins)    lines.push(`Margem Líquida: ${(b.profitMargins * 100).toFixed(1)}%`);
    if (b.revenueGrowth)    lines.push(`Crescimento Receita YoY: ${(b.revenueGrowth * 100).toFixed(1)}%`);
    if (b.debtToEquity)     lines.push(`D/E: ${(b.debtToEquity / 100).toFixed(2)}x`);
    if (b.freeCashflow)     lines.push(`FCF: R$${(b.freeCashflow / 1e9).toFixed(1)}B`);
    if (b.enterpriseToEbitda) lines.push(`EV/EBITDA: ${b.enterpriseToEbitda?.toFixed(1)}x`);
  }

  lines.push('', '=== RETORNE EXATAMENTE ESTE JSON ===');
  lines.push(`{
  "rating": "BUY|HOLD|SELL",
  "moat": "STRONG|MODERATE|WEAK|NONE",
  "investment_thesis": "2-3 frases objetivas sobre a tese de investimento",
  "pe_ratio": <número ou null>,
  "roe": <percentual ex: 22.5>,
  "net_margin": <percentual>,
  "debt_equity": <número ou null>,
  "revenue_growth_yoy": <percentual>,
  "targets": {
    "bear": <preço target pessimista 12m>,
    "base": <preço target base 12m>,
    "bull": <preço target otimista 12m>,
    "upside_base_pct": <upside do target base vs preço atual>
  },
  "entry_zone": "R$XX,XX–R$XX,XX",
  "stop_loss": <preço stop sugerido>,
  "risk_rating": <1-10>,
  "catalysts": ["catalisador 1", "catalisador 2", "catalisador 3"],
  "risks": ["risco 1", "risco 2", "risco 3"],
  "bw_summary": "resumo Bridgewater 2 frases",
  "bw_overall_risk": "LOW|MODERATE|HIGH|EXTREME",
  "bw_risk_score": <1-10>,
  "bw_dimensions": {
    "macro_brasil": {"r": "LOW|MODERATE|HIGH|EXTREME", "n": "nota breve"},
    "cambio_brl":   {"r": "LOW|MODERATE|HIGH|EXTREME", "n": "nota breve"},
    "setor":        {"r": "LOW|MODERATE|HIGH|EXTREME", "n": "nota breve"},
    "liquidez":     {"r": "LOW|MODERATE|HIGH|EXTREME", "n": "nota breve"},
    "alavancagem":  {"r": "LOW|MODERATE|HIGH|EXTREME", "n": "nota breve"},
    "politico":     {"r": "LOW|MODERATE|HIGH|EXTREME", "n": "nota breve"}
  },
  "max_position_pct": <% máximo em portfólio, ex: 8>,
  "recession_drawdown_pct": <drawdown estimado em recessão, negativo ex: -35>,
  "tail_risks": ["tail risk 1", "tail risk 2"],
  "hedges": ["hedge sugerido 1", "hedge sugerido 2"],
  "ct_confidence": "STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "trend_daily": "BULLISH|NEUTRAL|BEARISH",
  "trend_weekly": "BULLISH|NEUTRAL|BEARISH",
  "trend_monthly": "BULLISH|NEUTRAL|BEARISH",
  "ma50": <estimativa MA50 baseada no preço e contexto>,
  "ma200": <estimativa MA200>,
  "above_ma200": <true|false>,
  "rsi": <estimativa RSI 14 dias ex: 55.2>,
  "rsi_signal": "OVERBOUGHT|NEUTRAL|OVERSOLD",
  "macd": "BULLISH|NEUTRAL|BEARISH",
  "bollinger": "UPPER|MIDDLE|LOWER",
  "support1": <suporte principal>,
  "support2": <suporte secundário>,
  "resistance1": <resistência principal>,
  "entry_tech": <zona de entrada técnica>,
  "stop_tech": <stop técnico>,
  "target1": <alvo técnico 1>,
  "target2": <alvo técnico 2>,
  "risk_reward": <ratio ex: 2.4>,
  "tech_summary": "resumo da análise técnica 2 frases",
  "pattern": "nome do padrão gráfico identificado",
  "week52_high": <máximo 52 semanas estimado>,
  "week52_low": <mínimo 52 semanas estimado>,
  "hv20": <volatilidade histórica 20 dias anualizada ex: 28.5>,
  "jpm_play": "BUY_BEFORE|SELL_BEFORE|WAIT",
  "jpm_implied_move_pct": <movimento implícito próximo evento ex: 4.2>,
  "jpm_flow_signal": "BULLISH|NEUTRAL|BEARISH",
  "jpm_options_skew": "CALL_SKEW|PUT_SKEW|NEUTRAL",
  "jpm_positioning": "LONG_HEAVY|BALANCED|SHORT_HEAVY",
  "jpm_event_risk": "descrição do próximo evento de risco relevante"
}`);

  return lines.join('\n');
}

async function analyzeWithClaude(ticker, hg, brapi, macro) {
  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(ticker, hg, brapi, macro) }],
  };

  const r = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });

  if (!r.ok) {
    const err = await r.text();
    throw new Error(`Claude API ${r.status}: ${err.slice(0, 200)}`);
  }

  const j = await r.json();
  const text = j.content?.[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`Resposta sem JSON válido: ${text.slice(0, 100)}`);
  return JSON.parse(match[0]);
}

// ── MONTAR ASSET OBJECT ───────────────────────────────────────────────────────
function buildAsset(ticker, hg, brapi, ai) {
  const a = ai || {};
  return {
    _ticker: ticker,
    _saved:  Date.now(),
    _hg:     hg || {},
    _brapi: {
      pe:              a.pe_ratio          ?? brapi?.trailingPE                     ?? null,
      roe:             a.roe != null        ? a.roe / 100   : brapi?.returnOnEquity  ?? null,
      net_margin:      a.net_margin != null ? a.net_margin / 100 : brapi?.profitMargins ?? null,
      debt_equity:     a.debt_equity       ?? (brapi?.debtToEquity != null ? brapi.debtToEquity / 100 : null),
      revenue_growth:  a.revenue_growth_yoy != null ? a.revenue_growth_yoy / 100 : brapi?.revenueGrowth ?? null,
      free_cashflow:   brapi?.freeCashflow  ?? null,
      ev_ebitda:       brapi?.enterpriseToEbitda ?? null,
      beta:            brapi?.beta          ?? null,
    },
    _tech: {
      ma50:          a.ma50,
      ma200:         a.ma200,
      above_ma200:   a.above_ma200 ?? false,
      rsi:           a.rsi,
      rsi_signal:    a.rsi_signal   || 'NEUTRAL',
      macd:          a.macd         || 'NEUTRAL',
      bollinger:     a.bollinger    || 'MIDDLE',
      support1:      a.support1,
      support2:      a.support2,
      resistance1:   a.resistance1,
      trend_daily:   a.trend_daily  || 'NEUTRAL',
      trend_weekly:  a.trend_weekly || 'NEUTRAL',
      trend_monthly: a.trend_monthly|| 'NEUTRAL',
      week52_high:   a.week52_high,
      week52_low:    a.week52_low,
      avg_vol_7d:    hg?.volume     || 0,
      hv20:          a.hv20,
      pattern:       a.pattern      || '',
    },
    // Goldman Sachs
    rating:             a.rating            || 'HOLD',
    confidence:         a.ct_confidence     || 'NEUTRAL',
    moat:               a.moat              || 'MODERATE',
    investment_thesis:  a.investment_thesis || '',
    pe_ratio:           a.pe_ratio,
    roe:                a.roe,
    net_margin:         a.net_margin,
    debt_equity:        a.debt_equity,
    revenue_growth_yoy: a.revenue_growth_yoy,
    targets:            a.targets           || {},
    entry_zone:         a.entry_zone        || '',
    stop_loss:          a.stop_loss,
    risk_rating:        a.risk_rating       || 5,
    catalysts:          a.catalysts         || [],
    risks:              a.risks             || [],
    // Bridgewater
    bw_summary:           a.bw_summary           || '',
    bw_overall_risk:      a.bw_overall_risk       || 'MODERATE',
    bw_risk_score:        a.bw_risk_score         || 5,
    bw_dimensions:        a.bw_dimensions         || {},
    max_position_pct:     a.max_position_pct      || 5,
    recession_drawdown_pct: a.recession_drawdown_pct || -30,
    tail_risks:           a.tail_risks            || [],
    hedges:               a.hedges                || [],
    // Citadel
    ct_confidence:  a.ct_confidence  || 'NEUTRAL',
    trend_daily:    a.trend_daily    || 'NEUTRAL',
    trend_weekly:   a.trend_weekly   || 'NEUTRAL',
    trend_monthly:  a.trend_monthly  || 'NEUTRAL',
    entry_tech:     a.entry_tech,
    stop_tech:      a.stop_tech,
    target1:        a.target1,
    target2:        a.target2,
    risk_reward:    a.risk_reward,
    tech_summary:   a.tech_summary  || '',
    _candle_signal: a.trend_daily   || 'NEUTRAL',
    _candle_desc:   a.pattern       || '',
    // JPMorgan
    jpm_play:             a.jpm_play            || 'WAIT',
    jpm_implied_move_pct: a.jpm_implied_move_pct ?? null,
    jpm_flow_signal:      a.jpm_flow_signal     || 'NEUTRAL',
    jpm_options_skew:     a.jpm_options_skew    || 'NEUTRAL',
    jpm_positioning:      a.jpm_positioning     || 'BALANCED',
    jpm_event_risk:       a.jpm_event_risk      || '',
    jpm_data_note:        'Análise gerada via Claude API com dados HG Brasil + Brapi.',
  };
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════');
  console.log(' JD Market Analysis · Rotina v5');
  console.log(`  ${new Date().toLocaleString('pt-BR')}`);
  console.log('═══════════════════════════════════════════');

  if (!ANTHROPIC_KEY) {
    console.error('\n❌  ANTHROPIC_KEY não configurada.');
    console.error('    Crie o arquivo .env com:\n');
    console.error('    ANTHROPIC_KEY=sk-ant-...');
    console.error('    HG_KEY=9ca1cb51');
    console.error('    TICKERS=PETR4,VALE3,...\n');
    process.exit(1);
  }

  console.log(`\n📊 Tickers (${tickers.length}): ${tickers.join(' · ')}`);

  console.log('\n📡 Buscando macro (IBOVESPA + USD/BRL)...');
  const macro = await fetchMacro();
  const ibov = macro['BVSP']  || null;
  const usd  = macro['USDBRL']|| null;
  if (ibov) console.log(`   IBOV: ${ibov.price.toLocaleString('pt-BR')} pts  (${ibov.change_percent >= 0 ? '+' : ''}${ibov.change_percent?.toFixed(2)}%)`);
  if (usd)  console.log(`   USD/BRL: R$${usd.price?.toFixed(4)}`);

  const assets = [];

  for (let i = 0; i < tickers.length; i++) {
    const ticker = tickers[i];
    console.log(`\n[${i + 1}/${tickers.length}] ${ticker}`);

    // HG Brasil
    let hg = null;
    try {
      hg = await fetchHG(ticker);
      console.log(`   ✅ HG Brasil  R$${hg?.price?.toFixed(2) || '—'}  ${hg?.change_percent >= 0 ? '+' : ''}${hg?.change_percent?.toFixed(2) || '—'}%`);
    } catch (e) {
      console.error(`   ❌ HG Brasil  ${e.message}`);
    }

    // Brapi
    let brapi = null;
    try {
      brapi = await fetchBrapi(ticker);
      if (brapi) {
        console.log(`   ✅ Brapi      PE=${brapi.trailingPE?.toFixed(1) || '—'}  Beta=${brapi.beta?.toFixed(2) || '—'}  ROE=${brapi.returnOnEquity != null ? (brapi.returnOnEquity * 100).toFixed(1) + '%' : '—'}`);
      } else {
        console.log('   ⚠️  Brapi      sem dados');
      }
    } catch (e) {
      console.error(`   ⚠️  Brapi      ${e.message}`);
    }

    // Claude
    let ai = {};
    try {
      ai = await analyzeWithClaude(ticker, hg, brapi, macro);
      console.log(`   ✅ Claude     ${ai.rating}  BW:${ai.bw_overall_risk}  ${ai.trend_daily}→${ai.trend_weekly}→${ai.trend_monthly}`);
    } catch (e) {
      console.error(`   ❌ Claude     ${e.message}`);
    }

    assets.push(buildAsset(ticker, hg, brapi, ai));

    // Respeitar rate limits
    if (i < tickers.length - 1) await new Promise(r => setTimeout(r, 1200));
  }

  // Salvar data.json
  const output = {
    generated_at: new Date().toISOString(),
    ibovespa: ibov ? { price: ibov.price, change_percent: ibov.change_percent } : null,
    usdbrl:   usd  ? { price: usd.price,  change_percent: usd.change_percent  } : null,
    assets,
  };

  const outPath = path.join(__dir, 'data.json');
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log('\n═══════════════════════════════════════════');
  console.log(`✅  data.json salvo — ${assets.length} ativos`);
  console.log(`⏱️   ${new Date().toLocaleString('pt-BR')}`);
  console.log('═══════════════════════════════════════════\n');
}

main().catch(e => { console.error('\nFATAL:', e.message); process.exit(1); });
