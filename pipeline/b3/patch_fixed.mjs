// patch_fixed.mjs
// Roda análise completa (8 frameworks) SOMENTE para os FIXED_TICKERS (EMBR3, ECOR3)
// e injeta nos dados existentes do Neon — sem precisar rodar o pipeline de 50 ativos.
//
// Uso: node patch_fixed.mjs
// Env: ANTHROPIC_KEY, HG_KEY, BRAPI_TOKEN, DATABASE_URL (carregados de .env + ../../.env.local)

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { calcExScore }   from './ex_score.mjs';
import { neon }          from '@neondatabase/serverless';

const __dir = path.dirname(fileURLToPath(import.meta.url));

// ── ENV ────────────────────────────────────────────────────────────────────────
function loadEnv(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    for (const line of raw.split('\n')) {
      const [k, ...rest] = line.split('=');
      if (k && rest.length) process.env[k.trim()] = rest.join('=').trim();
    }
  } catch {}
}
// pipeline/b3/.env (ANTHROPIC_KEY, HG_KEY, BRAPI_TOKEN)
loadEnv(path.join(__dir, '.env'));
// ../../.env.local (DATABASE_URL, SITE_URL, REVALIDATE_SECRET)
loadEnv(path.join(__dir, '..', '..', '.env.local'));

const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;
const HG_KEY        = process.env.HG_KEY;
const BRAPI_TOKEN   = process.env.BRAPI_TOKEN || '';
const DATABASE_URL  = process.env.DATABASE_URL;
const SITE_URL      = process.env.SITE_URL;
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

if (!ANTHROPIC_KEY) { console.error('❌  ANTHROPIC_KEY não configurada'); process.exit(1); }
if (!HG_KEY)        { console.error('❌  HG_KEY não configurada');         process.exit(1); }
if (!DATABASE_URL)  { console.error('❌  DATABASE_URL não configurada');   process.exit(1); }

const FIXED_TICKERS = ['EMBR3', 'ECOR3'];
const HG_URL    = 'https://api.hgbrasil.com/finance/stock_price';
const BRAPI_URL = 'https://brapi.dev/api/quote';
const CLAUDE_URL= 'https://api.anthropic.com/v1/messages';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── FETCH HG BRASIL ────────────────────────────────────────────────────────────
async function fetchHG(tickers) {
  try {
    const sym = tickers.join(',');
    const r = await fetch(`${HG_URL}?key=${HG_KEY}&format=json-cors&symbol=${sym}`, {
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) return {};
    const j = await r.json();
    return j.results || {};
  } catch { return {}; }
}

// ── FETCH MACRO ────────────────────────────────────────────────────────────────
async function fetchMacro() {
  try {
    const r = await fetch(`${HG_URL}?key=${HG_KEY}&format=json-cors&symbol=BVSP,USDBRL`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return {};
    return (await r.json()).results || {};
  } catch { return {}; }
}

// ── FETCH BRAPI FUNDAMENTALS ──────────────────────────────────────────────────
async function fetchBrapi(symbol) {
  try {
    const headers = BRAPI_TOKEN ? { Authorization: `Bearer ${BRAPI_TOKEN}` } : {};
    const url = `${BRAPI_URL}/${symbol}?modules=financialData,defaultKeyStatistics,summaryProfile`;
    const r = await fetch(url, { headers, signal: AbortSignal.timeout(12000) });
    if (!r.ok) return null;
    const j = await r.json();
    const item = j.results?.[0];
    if (!item) return null;
    return {
      pe:             item.defaultKeyStatistics?.trailingEps
                        ? (item.financialData?.currentPrice / item.defaultKeyStatistics.trailingEps)
                        : null,
      roe:            item.financialData?.returnOnEquity    ?? null,
      net_margin:     item.financialData?.profitMargins     ?? null,
      debt_equity:    item.financialData?.debtToEquity != null
                        ? item.financialData.debtToEquity / 100 : null,
      revenue_growth: item.financialData?.revenueGrowth     ?? null,
      free_cashflow:  item.financialData?.freeCashflow       ?? null,
      ev_ebitda:      item.defaultKeyStatistics?.enterpriseToEbitda ?? null,
      beta:           item.defaultKeyStatistics?.beta        ?? null,
    };
  } catch { return null; }
}

// ── FETCH OHLC (30 barras diárias) ────────────────────────────────────────────
async function fetchOHLC(ticker) {
  try {
    const headers = BRAPI_TOKEN ? { Authorization: `Bearer ${BRAPI_TOKEN}` } : {};
    const url = `${BRAPI_URL}/${ticker}?range=3mo&interval=1d`;
    const r = await fetch(url, { headers, signal: AbortSignal.timeout(12000) });
    if (!r.ok) return [];
    const j = await r.json();
    const hist = j?.results?.[0]?.historicalDataPrice;
    if (!hist?.length) return [];
    return hist
      .sort((a, b) => b.date - a.date)
      .slice(0, 30)
      .map(bar => ({
        date:   new Date(bar.date * 1000).toISOString().split('T')[0],
        open:   bar.open,
        high:   bar.high,
        low:    bar.low,
        close:  bar.close,
        volume: bar.volume,
      }));
  } catch { return []; }
}

// ── CLAUDE — ANÁLISE BASE (GS+BW+CT+JP) ──────────────────────────────────────
const SYS_BASE = `Você é um analista quantitativo sênior especializado em B3. \
Dado dados reais de mercado, produza análise institucional rigorosa nos 4 frameworks. \
RESPONDA SOMENTE JSON VÁLIDO — sem markdown, sem texto fora do JSON, sem comentários.`;

function buildBasePrompt(ticker, hg, brapi, macro) {
  const p   = hg?.price          || 0;
  const chg = hg?.change_percent || 0;
  const vol = hg?.volume         || 0;
  const cap = hg?.market_cap     || 0;
  const dy  = hg?.financials?.dividends?.yield_12m || 0;
  const pb  = hg?.financials?.price_to_book_ratio  || 0;
  const ibovChg = macro['BVSP']?.change_percent ?? null;
  const usdBrl  = macro['USDBRL']?.price        ?? null;

  const lines = [
    `ATIVO: ${ticker} — ${hg?.company_name || ticker}`,
    `SETOR: ${hg?.sector || ''}`,
    `DATA: ${new Date().toLocaleDateString('pt-BR')}`,
    '',
    '=== DADOS REAIS ===',
    `Preço: R$${p.toFixed(2)}  Variação: ${chg>=0?'+':''}${chg.toFixed(2)}%`,
    `Volume: ${(vol/1e6).toFixed(1)}M  Cap: R$${(cap/1000).toFixed(0)}B`,
    `P/B: ${pb}  DY: ${dy}%`,
  ];
  if (ibovChg !== null) lines.push(`Ibovespa: ${ibovChg>=0?'+':''}${ibovChg.toFixed(2)}%`);
  if (usdBrl  !== null) lines.push(`USD/BRL: ${usdBrl.toFixed(4)}`);
  if (brapi) {
    if (brapi.pe            != null) lines.push(`P/E: ${brapi.pe?.toFixed(1)}`);
    if (brapi.roe           != null) lines.push(`ROE: ${(brapi.roe*100).toFixed(1)}%`);
    if (brapi.net_margin    != null) lines.push(`Margem: ${(brapi.net_margin*100).toFixed(1)}%`);
    if (brapi.debt_equity   != null) lines.push(`D/E: ${brapi.debt_equity.toFixed(2)}x`);
    if (brapi.revenue_growth!= null) lines.push(`Rev Growth: ${(brapi.revenue_growth*100).toFixed(1)}%`);
    if (brapi.free_cashflow != null) lines.push(`FCF: R$${(brapi.free_cashflow/1e9).toFixed(1)}B`);
    if (brapi.ev_ebitda     != null) lines.push(`EV/EBITDA: ${brapi.ev_ebitda?.toFixed(1)}x`);
    if (brapi.beta          != null) lines.push(`Beta: ${brapi.beta?.toFixed(2)}`);
  }
  lines.push('', '=== RETORNE EXATAMENTE ESTE JSON ===');
  lines.push(`{
  "rating":"BUY|HOLD|SELL","moat":"STRONG|MODERATE|WEAK|NONE",
  "investment_thesis":"2-3 frases",
  "pe_ratio":<num|null>,"roe":<pct>,"net_margin":<pct>,"debt_equity":<num|null>,"revenue_growth_yoy":<pct>,
  "targets":{"bear":<num>,"base":<num>,"bull":<num>,"upside_base_pct":<num>},
  "entry_zone":"R$XX,XX–R$XX,XX","stop_loss":<num>,"risk_rating":<1-10>,
  "catalysts":["c1","c2","c3"],"risks":["r1","r2","r3"],
  "bw_summary":"2 frases","bw_overall_risk":"LOW|MODERATE|HIGH|EXTREME","bw_risk_score":<1-10>,
  "bw_dimensions":{
    "macro_brasil":{"r":"LOW|MODERATE|HIGH|EXTREME","n":"nota"},
    "cambio_brl":{"r":"LOW|MODERATE|HIGH|EXTREME","n":"nota"},
    "setor":{"r":"LOW|MODERATE|HIGH|EXTREME","n":"nota"},
    "liquidez":{"r":"LOW|MODERATE|HIGH|EXTREME","n":"nota"},
    "alavancagem":{"r":"LOW|MODERATE|HIGH|EXTREME","n":"nota"},
    "politico":{"r":"LOW|MODERATE|HIGH|EXTREME","n":"nota"}
  },
  "max_position_pct":<num>,"recession_drawdown_pct":<neg>,"tail_risks":["t1","t2"],"hedges":["h1","h2"],
  "ct_confidence":"STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "trend_daily":"BULLISH|NEUTRAL|BEARISH","trend_weekly":"BULLISH|NEUTRAL|BEARISH","trend_monthly":"BULLISH|NEUTRAL|BEARISH",
  "ma50":<num>,"ma200":<num>,"above_ma200":<bool>,"rsi":<num>,"rsi_signal":"OVERBOUGHT|NEUTRAL|OVERSOLD",
  "macd":"BULLISH|NEUTRAL|BEARISH","bollinger":"UPPER|MIDDLE|LOWER",
  "support1":<num>,"support2":<num>,"resistance1":<num>,
  "entry_tech":<num>,"stop_tech":<num>,"target1":<num>,"target2":<num>,"risk_reward":<num>,
  "hv20":<num>,"pattern":"padrão gráfico","tech_summary":"2 frases",
  "week52_high":<num>,"week52_low":<num>,
  "jpm_play":"BUY_BEFORE|SELL_BEFORE|WAIT","jpm_implied_move_pct":<num>,
  "jpm_flow_signal":"BULLISH|NEUTRAL|BEARISH","jpm_options_skew":"CALL_SKEW|PUT_SKEW|NEUTRAL",
  "jpm_positioning":"LONG_HEAVY|BALANCED|SHORT_HEAVY","jpm_event_risk":"descrição"
}`);
  return lines.join('\n');
}

async function claudeBase(ticker, hg, brapi, macro) {
  const body = {
    model: 'claude-sonnet-4-6', max_tokens: 2048,
    system: SYS_BASE,
    messages: [{ role: 'user', content: buildBasePrompt(ticker, hg, brapi, macro) }],
  };
  const r = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'x-api-key':ANTHROPIC_KEY, 'anthropic-version':'2023-06-01' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });
  if (!r.ok) throw new Error(`Claude base ${r.status}: ${(await r.text()).slice(0,150)}`);
  const j = await r.json();
  const text = j.content?.[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Sem JSON na resposta base');
  return JSON.parse(match[0]);
}

function buildAsset(ticker, hg, brapi, ai) {
  const a = ai || {};
  const consMap = { BUY:'BULLISH', SELL:'BEARISH', HOLD:'NEUTRAL' };
  const bwHigh  = ['HIGH','EXTREME'].includes(a.bw_overall_risk);
  let signal = consMap[a.rating] || 'NEUTRAL';
  if (bwHigh && a.rating === 'HOLD') signal = 'DEFENSIVE';
  return {
    _ticker: ticker, _saved: Date.now(), _hg: hg || {},
    _brapi: {
      pe:             a.pe_ratio     ?? brapi?.pe          ?? null,
      roe:            a.roe != null  ? a.roe/100           : brapi?.roe ?? null,
      net_margin:     a.net_margin != null ? a.net_margin/100 : brapi?.net_margin ?? null,
      debt_equity:    a.debt_equity  ?? brapi?.debt_equity ?? null,
      revenue_growth: a.revenue_growth_yoy != null ? a.revenue_growth_yoy/100 : brapi?.revenue_growth ?? null,
      free_cashflow:  brapi?.free_cashflow ?? null,
      ev_ebitda:      brapi?.ev_ebitda     ?? null,
      beta:           brapi?.beta           ?? null,
    },
    _tech: {
      ma50:          a.ma50        ?? null, ma200:        a.ma200       ?? null,
      above_ma200:   a.above_ma200 ?? null, rsi:          a.rsi         ?? null,
      rsi_signal:    a.rsi_signal  ?? null, macd:         a.macd        ?? null,
      bollinger:     a.bollinger   ?? null, support1:     a.support1    ?? null,
      support2:      a.support2    ?? null, resistance1:  a.resistance1 ?? null,
      trend_daily:   a.trend_daily ?? null, trend_weekly: a.trend_weekly?? null,
      trend_monthly: a.trend_monthly??null, week52_high:  a.week52_high ?? null,
      week52_low:    a.week52_low  ?? null, avg_vol_7d:   hg?.volume    ?? null,
      hv20:          a.hv20        ?? null, pattern:      a.pattern     ?? null,
    },
    rating: a.rating ?? 'HOLD', confidence: a.rating ?? 'HOLD',
    moat:   a.moat ?? 'MODERATE', investment_thesis: a.investment_thesis ?? '',
    pe_ratio: a.pe_ratio ?? null, roe: a.roe ?? null,
    net_margin: a.net_margin ?? null, debt_equity: a.debt_equity ?? null,
    revenue_growth_yoy: a.revenue_growth_yoy ?? null,
    targets: a.targets ?? {}, entry_zone: a.entry_zone ?? '',
    stop_loss: a.stop_loss ?? null, risk_rating: a.risk_rating ?? 5,
    catalysts: a.catalysts ?? [], risks: a.risks ?? [],
    bw_summary: a.bw_summary ?? '', bw_overall_risk: a.bw_overall_risk ?? 'MODERATE',
    bw_risk_score: a.bw_risk_score ?? 5, bw_dimensions: a.bw_dimensions ?? {},
    max_position_pct: a.max_position_pct ?? null,
    recession_drawdown_pct: a.recession_drawdown_pct ?? null,
    tail_risks: a.tail_risks ?? [], hedges: a.hedges ?? [],
    ct_confidence: a.ct_confidence ?? 'NEUTRAL',
    trend_daily: a.trend_daily ?? 'NEUTRAL', trend_weekly: a.trend_weekly ?? 'NEUTRAL',
    trend_monthly: a.trend_monthly ?? 'NEUTRAL',
    entry_tech: a.entry_tech ?? null, stop_tech: a.stop_tech ?? null,
    target1: a.target1 ?? null, target2: a.target2 ?? null,
    risk_reward: a.risk_reward ?? null, tech_summary: a.tech_summary ?? '',
    _candle_signal: signal, _candle_desc: a.pattern ?? '',
    jpm_play: a.jpm_play ?? 'WAIT', jpm_implied_move_pct: a.jpm_implied_move_pct ?? null,
    jpm_flow_signal: a.jpm_flow_signal ?? 'NEUTRAL',
    jpm_options_skew: a.jpm_options_skew ?? 'NEUTRAL',
    jpm_positioning: a.jpm_positioning ?? 'BALANCED',
    jpm_event_risk: a.jpm_event_risk ?? '',
    jpm_data_note: 'Análise gerada via patch_fixed.mjs — tickers fixos.',
  };
}

// ── CLAUDE — AB1–AB4 ──────────────────────────────────────────────────────────
const SYS_AB = `Você é um analista sênior de price action especializado na metodologia de Al Brooks, com foco em gráficos DIÁRIOS de ações da B3.

Sua tarefa é executar 4 frameworks de análise (AB1, AB2, AB3, AB4) derivados dos 4 livros de Al Brooks, utilizando exclusivamente os dados OHLC diários fornecidos. Não invente dados. Se um campo não puder ser determinado com os dados disponíveis, retorne null.

Responda APENAS com o JSON abaixo, sem texto adicional, sem markdown, sem comentários.`;

function buildABPrompt(ticker, ohlc, tech, macro, ex) {
  return `Analise o ativo ${ticker} usando os 4 frameworks Al Brooks para dados DIÁRIOS.

=== DADOS OHLC DIÁRIOS (últimas 30 barras, mais recente primeiro) ===
${JSON.stringify(ohlc, null, 2)}

=== DADOS TÉCNICOS COMPLEMENTARES (já calculados) ===
${JSON.stringify({
  ma50:tech.ma50, ma200:tech.ma200, above_ma200:tech.above_ma200,
  rsi:tech.rsi, rsi_signal:tech.rsi_signal,
  rsi_divergence:ex?.rsi_divergence??'NONE', macd:tech.macd,
  macd_hist_slope:ex?.macd_hist_slope??'FLAT', bollinger:tech.bollinger,
  vol_exhaustion:ex?.vol_exhaustion??'NONE',
  support1:tech.support1, support2:tech.support2, resistance1:tech.resistance1,
  trend_daily:tech.trend_daily, trend_weekly:tech.trend_weekly,
  hv20:tech.hv20, week52_high:tech.week52_high, week52_low:tech.week52_low,
  avg_vol_7d:tech.avg_vol_7d,
}, null, 2)}

=== EX SCORE — EXAUSTÃO ===
${JSON.stringify({
  score:ex?.score??0, classification:ex?.classification??'EX_LOW',
  bottom_score:ex?.bottom_score??0, criteria:ex?.criteria??{},
  rsi_divergence:ex?.rsi_divergence??'NONE',
  macd_hist_slope:ex?.macd_hist_slope??'FLAT',
  vol_exhaustion:ex?.vol_exhaustion??'NONE',
}, null, 2)}

=== CONTEXTO MACRO ===
Ibovespa: ${macro.ibov_price} (${macro.ibov_change}%)
USD/BRL: ${macro.usdbrl_price} (${macro.usdbrl_change}%)

=== INSTRUÇÕES DOS 4 FRAMEWORKS ===

## AB1 — Always-In Direction + Signal Bar Quality (últimas 10 barras)
PASSO 1 — Always-In Direction: LONG|SHORT|UNCERTAIN
PASSO 2 — Bar Quality Score da barra mais recente (6 critérios, +1/-1/0): soma ≥+3=STRONG BULL | +1/+2=MODERATE BULL | 0=NEUTRAL | -1/-2=MODERATE BEAR | ≤-3=STRONG BEAR
PASSO 3 — Entry Pattern (H1/H2/H3/H4/L1/L2/BREAKOUT_PULLBACK/NONE)
ab1_signal: STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL

## AB2 — Trend Strength Score 12 Signs (últimas 20 barras)
Score bull_criteria - bear_criteria → ≥+7=STRONG BULL | +3a+6=BULL | -2a+2=NEUTRAL | -6a-3=BEAR | ≤-7=STRONG BEAR
ab2_score_slope: RISING|STABLE|DECLINING (direção do score nas últimas barras)

## AB3 — Market Phase & Breakout Pressure (últimas 15 barras)
Phase: TRENDING_BULL|TRENDING_BEAR|TRADING_RANGE|TRANSITIONING
Pressure: BULL|BEAR|BALANCED
ab3_signal: STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL

## AB4 — Reversal Patterns + EX Score Integration (últimas 30 barras)
PASSO 0: se ex_score>=3 → ab4_reversal_risk=HIGH; se ex_bottom_score>=3 → ab4_reversal_risk=HIGH (bullish)
Reversal Score 0-10 → 0-3=LOW | 4-5=MODERATE | 6-10=HIGH
ab4_signal: STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL
ab4_pre_reversal_flag: true SE macd_hist_slope=DECLINING E rsi_divergence=BEARISH E ab4_reversal_score>=3 E contexto bullish

=== RETORNE EXATAMENTE ESTE JSON ===
{
  "ab1_signal":"STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "ab1_always_in":"LONG|SHORT|UNCERTAIN",
  "ab1_bar_quality":"STRONG BULL|MODERATE BULL|NEUTRAL|MODERATE BEAR|STRONG BEAR",
  "ab1_entry_pattern":"H1|H2|H3|H4|L1|L2|BREAKOUT_PULLBACK|NONE",
  "ab1_bar_score":<-6 a +6>,
  "ab1_summary":"1-2 frases",
  "ab2_trend_strength":"STRONG BULL|BULL|NEUTRAL|BEAR|STRONG BEAR",
  "ab2_score":<número>,
  "ab2_bull_criteria":<0-12>,"ab2_bear_criteria":<0-10>,
  "ab2_trend_type":"SPIKE_CHANNEL|STAIRS|TIGHT_CHANNEL|TRENDING_RANGE|NONE",
  "ab2_pullback_quality":"STRONG|MODERATE|WEAK",
  "ab2_score_slope":"RISING|STABLE|DECLINING",
  "ab2_summary":"2 frases",
  "ab3_signal":"STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "ab3_market_phase":"TRENDING_BULL|TRENDING_BEAR|TRADING_RANGE|TRANSITIONING",
  "ab3_breakout_pressure":"BULL|BEAR|BALANCED",
  "ab3_range_top":<número ou null>,"ab3_range_bottom":<número ou null>,
  "ab3_breakout_quality":"STRONG|WEAK|NONE","ab3_fade_setup":<true|false>,
  "ab3_summary":"2 frases",
  "ab4_signal":"STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "ab4_reversal_risk":"LOW|MODERATE|HIGH",
  "ab4_reversal_score":<0-10>,
  "ab4_pattern":"WEDGE_TOP|DOUBLE_TOP|CLIMAX_BAR_TOP|CHANNEL_OVERSHOOT_TOP|FAILED_BREAKOUT_HIGH|THREE_PUSHES_UP|EX_DRIVEN_TOP|WEDGE_BOTTOM|DOUBLE_BOTTOM|CLIMAX_BAR_BOTTOM|CHANNEL_OVERSHOOT_BOTTOM|FAILED_BREAKOUT_LOW|THREE_PUSHES_DOWN|EX_DRIVEN_BOTTOM|NONE",
  "ab4_sequence_step":<0-4>,"ab4_second_entry":<true|false>,
  "ab4_traders_equation":"FAVORABLE|NEUTRAL|UNFAVORABLE",
  "ab4_ex_override":<true|false>,"ab4_pre_reversal_flag":<true|false>,
  "ab4_summary":"2 frases"
}`;
}

async function claudeAB(ticker, ohlc, tech, macro, ex) {
  const body = {
    model: 'claude-sonnet-4-6', max_tokens: 1600,
    system: SYS_AB,
    messages: [{ role: 'user', content: buildABPrompt(ticker, ohlc, tech, macro, ex) }],
  };
  const r = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'x-api-key':ANTHROPIC_KEY, 'anthropic-version':'2023-06-01' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });
  if (!r.ok) throw new Error(`Claude AB ${r.status}: ${(await r.text()).slice(0,150)}`);
  const j = await r.json();
  const raw = j.content?.[0]?.text?.trim() || '';
  const match = raw.replace(/```json|```/g,'').match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Sem JSON na resposta AB');
  return JSON.parse(match[0]);
}

// ── CONSENSO 8 FRAMEWORKS ─────────────────────────────────────────────────────
function calcConsensus8(asset, ab, ex) {
  const S = {
    'STRONG BUY':1,'BUY':1,'STRONG BULL':1,'BULL':1,'BULLISH':1,
    'STRONG SELL':-1,'SELL':-1,'STRONG BEAR':-1,'BEAR':-1,'BEARISH':-1,
    'NEUTRAL':0,'HOLD':0,'BALANCED':0,
  };
  const bwProxy = {LOW:'BUY',MODERATE:'BUY',HIGH:'NEUTRAL',EXTREME:'SELL'}[asset.bw_overall_risk]||'NEUTRAL';
  const signals = {
    gs:asset.rating, bw:bwProxy, ct:asset.ct_confidence, jp:asset.jpm_flow_signal,
    ab1:ab?.ab1_signal, ab2:ab?.ab2_trend_strength, ab3:ab?.ab3_signal, ab4:ab?.ab4_signal,
  };
  const score = Object.values(signals).reduce((s,v)=>s+(S[v]??0),0);
  const bwExtreme    = asset.bw_overall_risk==='EXTREME';
  const ab4High      = ab?.ab4_reversal_risk==='HIGH';
  const ab4ModOrHigh = ab?.ab4_reversal_risk==='MODERATE'||ab?.ab4_reversal_risk==='HIGH';
  const exScore      = ex?.score??0;
  const exBottomScore= ex?.bottom_score??0;
  let signal, exBadge=null, exOverride=null;
  if (exScore>=3 && score>=5)             { signal='DEFENSIVE'; exBadge='EXAUSTÃO ATIVA';   exOverride='OVERRIDE_1'; }
  if (!exOverride && exScore===2 && ab4ModOrHigh && score>=4)
                                          { signal='DEFENSIVE'; exBadge='RISCO DE TOPO';    exOverride='OVERRIDE_2'; }
  if (!exOverride && ex?.criteria?.ex4_macd_hist_decay && ab?.ab2_score_slope==='DECLINING'
      && (ab?.ab4_reversal_score??0)>=3 && score>=4)
                                          { exBadge='PRÉ-REVERSÃO';                         exOverride='OVERRIDE_3'; }
  if (!exOverride && exBottomScore>=3 && score<=-3 && ab?.ab4_signal && S[ab.ab4_signal]>0)
                                          { exBadge='REVERSÃO BULLISH POTENCIAL';            exOverride='OVERRIDE_4'; }
  if (!signal) {
    if      (bwExtreme && asset.rating==='HOLD')          signal='DEFENSIVE';
    else if (bwExtreme && score>=4)                       signal='DEFENSIVE';
    else if (ab4High && score>=3)                         signal='DEFENSIVE';
    else if (score>=4)                                    signal='BULLISH';
    else if (score<=-4)                                   signal='BEARISH';
    else if ((bwExtreme||asset.bw_overall_risk==='HIGH') && asset.rating==='HOLD') signal='DEFENSIVE';
    else                                                  signal='NEUTRAL';
  }
  if (exOverride==='OVERRIDE_3' && ab?.ab4_reversal_risk==='LOW') ab.ab4_reversal_risk='MODERATE';
  return { signal, score, signals, ab4_alert:ab4High&&score>=3, ex_badge:exBadge, ex_override:exOverride };
}

// ── UPLOAD PARA NEON ──────────────────────────────────────────────────────────
function normalizeSignal(s) {
  if (!s) return 'NEUTRAL';
  const map = {STRONG_BUY:'STRONG_BUY',STRONG_SELL:'STRONG_SELL',BUY:'BUY',SELL:'SELL',NEUTRAL:'NEUTRAL',
               BULLISH:'BUY',BEARISH:'SELL',BULL:'BUY',BEAR:'SELL'};
  return map[s.toUpperCase().replace(/[^A-Z_]/g,'_')]??'NEUTRAL';
}

async function uploadToNeon(data) {
  const sql = neon(DATABASE_URL);
  const analysisDate = new Date().toISOString().split('T')[0]; // today
  const generatedAt  = new Date().toISOString();

  // Upsert snapshot (today's date)
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
  `;
  console.log(`  ✅  Snapshot upsertado (${analysisDate})`);

  // Upsert cada ativo
  let ok = 0, fail = 0;
  for (const a of data.assets) {
    try {
      const hg=a._hg??{}, brapi=a._brapi??{}, tech=a._tech??{};
      const tgts=a.targets??{}, c8=a._consensus8??{}, ex=a._ex??{};
      const rawConsensus = c8.signal ?? a._candle_signal ?? a.confidence ?? a.rating;
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
        ) VALUES (
          ${analysisDate}::date, ${a._ticker}, ${hg.name??null}, ${hg.sector??null},
          ${hg.logo?.small??null},
          ${hg.price??null}, ${hg.change_percent??null}, ${hg.volume??null}, ${hg.market_cap??null},
          ${a.pe_ratio??(brapi.pe||null)},
          ${a.roe??(brapi.roe!=null?brapi.roe*100:null)},
          ${a.net_margin??(brapi.net_margin!=null?brapi.net_margin*100:null)},
          ${a.debt_equity??brapi.debt_equity??null},
          ${a.revenue_growth_yoy??brapi.revenue_growth??null},
          ${brapi.free_cashflow??null}, ${brapi.ev_ebitda??null}, ${brapi.beta??null},
          ${hg.financials?.dividends?.yield_12m??null},
          ${normalizeSignal(a.rating)}, ${a.moat??null}, ${a.investment_thesis??null},
          ${tgts.bear??null}, ${tgts.base??null}, ${tgts.bull??null}, ${tgts.upside_base_pct??null},
          ${a.entry_zone??null}, ${a.stop_loss??null}, ${a.risk_rating??null},
          ${JSON.stringify(a.catalysts??[])}, ${JSON.stringify(a.risks??[])},
          ${a.bw_summary??null}, ${a.bw_overall_risk??null}, ${a.bw_risk_score??null},
          ${a.max_position_pct??null}, ${a.recession_drawdown_pct??null},
          ${JSON.stringify(a.bw_dimensions??{})},
          ${JSON.stringify(a.tail_risks??[])},
          ${JSON.stringify(a.hedges??[])},
          ${a.ct_confidence??null},
          ${a.trend_daily??tech.trend_daily??null},
          ${a.trend_weekly??tech.trend_weekly??null},
          ${a.trend_monthly??tech.trend_monthly??null},
          ${tech.ma50??null}, ${tech.ma200??null}, ${tech.above_ma200??null},
          ${tech.rsi??null}, ${tech.rsi_signal??null}, ${tech.macd??null}, ${tech.bollinger??null},
          ${tech.support1??null}, ${tech.support2??null}, ${tech.resistance1??null},
          ${a.entry_tech??null}, ${a.target1??null}, ${a.target2??null},
          ${a.stop_tech??null}, ${a.risk_reward??null},
          ${tech.pattern??a._candle_desc??null},
          ${a.ab1_always_in??null}, ${a.ab1_bar_quality??null},
          ${a.ab2_trend_strength??null}, ${a.ab2_trend_type??null},
          ${a.ab3_breakout_pressure??null}, ${a.ab3_market_phase??null},
          ${a.ab4_signal??null}, ${a.ab4_traders_equation??null},
          ${normalizeSignal(rawConsensus)},
          ${ex.score??null}, ${ex.classification??null}, ${ex.bottom_score??null},
          ${ex.criteria?.ex1_rsi_overbought_days??null},
          ${ex.criteria?.ex2_near_52w_high??null},
          ${ex.criteria?.ex3_rsi_divergence??null},
          ${ex.criteria?.ex4_macd_hist_decay??null},
          ${ex.criteria?.ex5_volume_exhaustion??null},
          ${ex.override_triggered??null},
          ${ex.rsi_divergence??null}, ${ex.macd_hist_slope??null}, ${ex.vol_exhaustion??null},
          ${a.ab2_score_slope??null}, ${a.ab4_ex_override??null}, ${a.ab4_pre_reversal_flag??null},
          ${a.candle_ex_badge??null}, ${a.candle_ex_override??null}
        )
        ON CONFLICT (analysis_date, ticker) DO UPDATE SET
          price=EXCLUDED.price, change_percent=EXCLUDED.change_percent,
          rating=EXCLUDED.rating, moat=EXCLUDED.moat,
          investment_thesis=EXCLUDED.investment_thesis,
          targets_bear=EXCLUDED.targets_bear, targets_base=EXCLUDED.targets_base,
          targets_bull=EXCLUDED.targets_bull, upside_base_pct=EXCLUDED.upside_base_pct,
          entry_zone=EXCLUDED.entry_zone, stop_loss=EXCLUDED.stop_loss,
          risk_rating=EXCLUDED.risk_rating, catalysts=EXCLUDED.catalysts, risks=EXCLUDED.risks,
          bw_summary=EXCLUDED.bw_summary, bw_overall_risk=EXCLUDED.bw_overall_risk,
          bw_risk_score=EXCLUDED.bw_risk_score, bw_dimensions=EXCLUDED.bw_dimensions,
          bw_tail_risks=EXCLUDED.bw_tail_risks, bw_hedges=EXCLUDED.bw_hedges,
          ct_confidence=EXCLUDED.ct_confidence,
          trend_daily=EXCLUDED.trend_daily, trend_weekly=EXCLUDED.trend_weekly,
          trend_monthly=EXCLUDED.trend_monthly, ma50=EXCLUDED.ma50, ma200=EXCLUDED.ma200,
          above_ma200=EXCLUDED.above_ma200, rsi=EXCLUDED.rsi, macd=EXCLUDED.macd,
          bollinger=EXCLUDED.bollinger, support1=EXCLUDED.support1, resistance1=EXCLUDED.resistance1,
          ct_entry=EXCLUDED.ct_entry, ct_target1=EXCLUDED.ct_target1, ct_stop=EXCLUDED.ct_stop,
          ct_rr=EXCLUDED.ct_rr, ct_pattern=EXCLUDED.ct_pattern,
          ab1_direction=EXCLUDED.ab1_direction, ab1_signal_bar=EXCLUDED.ab1_signal_bar,
          ab2_momentum=EXCLUDED.ab2_momentum, ab2_reversal=EXCLUDED.ab2_reversal,
          ab3_ma_confluence=EXCLUDED.ab3_ma_confluence, ab3_confluence_strength=EXCLUDED.ab3_confluence_strength,
          ab4_trend=EXCLUDED.ab4_trend, ab4_trend_strength=EXCLUDED.ab4_trend_strength,
          consensus_signal=EXCLUDED.consensus_signal,
          ex_score=EXCLUDED.ex_score, ex_classification=EXCLUDED.ex_classification,
          ex_bottom_score=EXCLUDED.ex_bottom_score,
          ex1_rsi_days=EXCLUDED.ex1_rsi_days, ex2_near_52w_high=EXCLUDED.ex2_near_52w_high,
          ex3_rsi_divergence=EXCLUDED.ex3_rsi_divergence, ex4_macd_decay=EXCLUDED.ex4_macd_decay,
          ex5_vol_exhaustion=EXCLUDED.ex5_vol_exhaustion,
          ex_override_triggered=EXCLUDED.ex_override_triggered,
          rsi_divergence=EXCLUDED.rsi_divergence, macd_hist_slope=EXCLUDED.macd_hist_slope,
          vol_exhaustion=EXCLUDED.vol_exhaustion,
          ab2_score_slope=EXCLUDED.ab2_score_slope, ab4_ex_override=EXCLUDED.ab4_ex_override,
          ab4_pre_reversal_flag=EXCLUDED.ab4_pre_reversal_flag,
          candle_ex_badge=EXCLUDED.candle_ex_badge, candle_ex_override=EXCLUDED.candle_ex_override
      `;
      ok++;
    } catch(e) {
      console.error(`  ❌ ${a._ticker}: ${e.message?.slice(0,100)}`);
      fail++;
    }
  }
  console.log(`  ✅  ${ok} ativos salvos, ${fail} erros`);

  // Revalidate
  if (SITE_URL && REVALIDATE_SECRET) {
    try {
      const res = await fetch(`${SITE_URL}/api/revalidate`, {
        method:'POST', headers:{'x-revalidate-secret':REVALIDATE_SECRET},
      });
      const rj = await res.json();
      console.log(`  🔄  Revalidate: ${JSON.stringify(rj)}`);
    } catch(e) { console.warn(`  ⚠️  Revalidate falhou: ${e.message}`); }
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  PATCH FIXED TICKERS — EMBR3 + ECOR3`);
  console.log(`  ${new Date().toLocaleString('pt-BR')}`);
  console.log(`${'═'.repeat(60)}\n`);

  // 1. Buscar dados existentes do Neon via API pública
  console.log('📡  Buscando dados atuais do Neon...');
  const apiResp = await fetch('https://www.jdmarket.ai/api/data', {
    signal: AbortSignal.timeout(30000),
  });
  if (!apiResp.ok) throw new Error(`API data: ${apiResp.status}`);
  const baseData = await apiResp.json();
  const existingAssets = baseData.assets || [];
  console.log(`  ✅  ${existingAssets.length} ativos existentes (gerado: ${baseData.generated_at_br})\n`);

  // 2. Fetch macro
  console.log('📊  Buscando macro (Ibovespa + USD/BRL)...');
  const macroRaw = await fetchMacro();
  const ibov = macroRaw['BVSP']   || {};
  const usd  = macroRaw['USDBRL'] || {};
  const macro = {
    ibov_price:   ibov.price         ?? baseData.ibovespa?.price         ?? 0,
    ibov_change:  ibov.change_percent?? baseData.ibovespa?.change_percent?? 0,
    usdbrl_price: usd.price          ?? baseData.usdbrl?.price           ?? 0,
    usdbrl_change:usd.change_percent ?? baseData.usdbrl?.change_percent  ?? 0,
  };
  console.log(`  Ibovespa: ${macro.ibov_price} (${macro.ibov_change}%)  USD/BRL: ${macro.usdbrl_price}\n`);

  // 3. Fetch preços HG dos fixed tickers
  console.log(`🏭  Buscando preços HG para: ${FIXED_TICKERS.join(', ')}...`);
  const hgData = await fetchHG(FIXED_TICKERS);
  console.log(`  HG retornou: ${Object.keys(hgData).join(', ') || '(vazio)'}\n`);

  // 4. Processar cada fixed ticker
  const newAssets = [];
  for (const ticker of FIXED_TICKERS) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`  Processando ${ticker}...`);

    const hg = hgData[ticker] || {};
    if (!hg.price) {
      console.warn(`  ⚠️  HG sem dados para ${ticker} — usando dados BRAPI quote`);
      // Tenta preço básico via BRAPI quote
      try {
        const headers = BRAPI_TOKEN ? { Authorization: `Bearer ${BRAPI_TOKEN}` } : {};
        const r = await fetch(`${BRAPI_URL}/${ticker}`, { headers, signal: AbortSignal.timeout(10000) });
        const j = await r.json();
        const item = j.results?.[0];
        if (item) {
          hg.price          = item.regularMarketPrice;
          hg.change_percent = item.regularMarketChangePercent;
          hg.volume         = item.regularMarketVolume;
          hg.market_cap     = item.marketCap;
          hg.company_name   = item.longName || ticker;
          hg.name           = item.longName || ticker;
          hg.symbol         = item.symbol;
          hg.sector         = item.sector || '';
          hg.fiftyTwoWeekHigh = item.fiftyTwoWeekHigh;
          hg.fiftyTwoWeekLow  = item.fiftyTwoWeekLow;
        }
      } catch(e) { console.warn(`  ⚠️  BRAPI quote também falhou: ${e.message}`); }
    }

    if (!hg.price) {
      console.error(`  ❌  Sem dados de preço para ${ticker} — pulando`);
      continue;
    }

    console.log(`  Preço: R$${hg.price}  Vol: ${hg.volume}`);

    // 4a. Fundamentals BRAPI
    process.stdout.write(`  📈  Fundamentals BRAPI...`);
    const brapi = await fetchBrapi(ticker);
    console.log(brapi ? '  ✅' : '  ⚠️  sem dados');
    await sleep(1200);

    // 4b. Análise base (GS+BW+CT+JP)
    process.stdout.write(`  🤖  Análise base Claude...`);
    let asset;
    try {
      const ai = await claudeBase(ticker, hg, brapi, macroRaw);
      asset = buildAsset(ticker, hg, brapi, ai);
      console.log(`  ✅  ${asset.rating} / ${asset.bw_overall_risk}`);
    } catch(e) {
      console.log(`  ⚠️  ${e.message.slice(0,60)} — usando fallback`);
      asset = buildAsset(ticker, hg, brapi, null);
    }
    await sleep(1500);

    // 4c. OHLC
    process.stdout.write(`  📊  OHLC 30 barras...`);
    const ohlc = await fetchOHLC(ticker);
    console.log(`  ${ohlc.length} barras`);
    await sleep(1000);

    if (ohlc.length < 10) {
      console.warn(`  ⚠️  OHLC insuficiente — AB frameworks pulados`);
      newAssets.push(asset);
      continue;
    }

    // 4d. EX Score
    const ex = calcExScore(ohlc, asset._tech || {});
    console.log(`  EX Score: ${ex.score} (${ex.classification})`);

    // 4e. AB1-AB4
    process.stdout.write(`  🔬  AB1-AB4 Claude...`);
    try {
      const ab = await claudeAB(ticker, ohlc, asset._tech || {}, macro, ex);
      const cons8 = calcConsensus8(asset, ab, ex);
      ex.override_triggered = cons8.ex_override ?? null;

      const techEnriched = {
        ...(asset._tech || {}),
        rsi_divergence:  ex.rsi_divergence,
        macd_hist_slope: ex.macd_hist_slope,
        vol_exhaustion:  ex.vol_exhaustion,
      };

      const enrichedAsset = {
        ...asset,
        _tech:                techEnriched,
        _ex:                  ex,
        _ohlc_bars:           ohlc.length,
        ab1_signal:           ab.ab1_signal,
        ab1_always_in:        ab.ab1_always_in,
        ab1_bar_quality:      ab.ab1_bar_quality,
        ab1_entry_pattern:    ab.ab1_entry_pattern,
        ab1_bar_score:        ab.ab1_bar_score,
        ab1_summary:          ab.ab1_summary,
        ab2_trend_strength:   ab.ab2_trend_strength,
        ab2_score:            ab.ab2_score,
        ab2_bull_criteria:    ab.ab2_bull_criteria,
        ab2_bear_criteria:    ab.ab2_bear_criteria,
        ab2_trend_type:       ab.ab2_trend_type,
        ab2_pullback_quality: ab.ab2_pullback_quality,
        ab2_score_slope:      ab.ab2_score_slope,
        ab2_summary:          ab.ab2_summary,
        ab3_signal:           ab.ab3_signal,
        ab3_market_phase:     ab.ab3_market_phase,
        ab3_breakout_pressure:ab.ab3_breakout_pressure,
        ab3_range_top:        ab.ab3_range_top,
        ab3_range_bottom:     ab.ab3_range_bottom,
        ab3_breakout_quality: ab.ab3_breakout_quality,
        ab3_fade_setup:       ab.ab3_fade_setup,
        ab3_summary:          ab.ab3_summary,
        ab4_signal:           ab.ab4_signal,
        ab4_reversal_risk:    ab.ab4_reversal_risk,
        ab4_reversal_score:   ab.ab4_reversal_score,
        ab4_pattern:          ab.ab4_pattern,
        ab4_sequence_step:    ab.ab4_sequence_step,
        ab4_second_entry:     ab.ab4_second_entry,
        ab4_traders_equation: ab.ab4_traders_equation,
        ab4_ex_override:      ab.ab4_ex_override ?? false,
        ab4_pre_reversal_flag:(ab.ab4_pre_reversal_flag??false) && cons8.score>=4,
        ab4_summary:          ab.ab4_summary,
        candle_ex_badge:      cons8.ex_badge ?? null,
        candle_ex_override:   cons8.ex_override ?? null,
        _consensus8:          cons8,
      };

      console.log(`  ✅  →${cons8.signal}  AB1:${ab.ab1_signal?.split(' ').pop()}  AB4:${ab.ab4_reversal_risk}`);
      newAssets.push(enrichedAsset);
    } catch(e) {
      console.log(`  💥  ${e.message.slice(0,60)}`);
      newAssets.push({ ...asset, _ex: ex, _ohlc_bars: ohlc.length });
    }
    await sleep(1500);
  }

  if (newAssets.length === 0) {
    console.error('\n❌  Nenhum ativo processado com sucesso.');
    process.exit(1);
  }

  // 5. Merge: remove existing entries for these tickers, add new ones
  const fixedSet = new Set(FIXED_TICKERS);
  const mergedAssets = [
    ...existingAssets.filter(a => !fixedSet.has(a._ticker)),
    ...newAssets,
  ];

  // 6. Montar output final
  const now = new Date();
  const out = {
    ...baseData,
    generated_at:    now.getTime(),
    generated_at_br: now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    type:            'private_50_patched',
    ibovespa: {
      price:          macro.ibov_price  || baseData.ibovespa?.price,
      change_percent: macro.ibov_change || baseData.ibovespa?.change_percent,
    },
    usdbrl: {
      price:          macro.usdbrl_price  || baseData.usdbrl?.price,
      change_percent: macro.usdbrl_change || baseData.usdbrl?.change_percent,
    },
    assets: mergedAssets,
  };

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  📦  Total de ativos: ${mergedAssets.length}`);
  console.log(`  🆕  Novos/atualizados: ${newAssets.map(a=>a._ticker).join(', ')}`);
  console.log(`${'═'.repeat(60)}\n`);

  // 7. Upload para Neon
  console.log('📤  Enviando para Neon...');
  await uploadToNeon(out);

  console.log(`\n✅  PATCH CONCLUÍDO — ${new Date().toLocaleString('pt-BR')}`);
  console.log('   Scanner atualizado em jdmarket.ai/scanner.html\n');
}

main().catch(e => { console.error('❌ Fatal:', e.message); process.exit(1); });
