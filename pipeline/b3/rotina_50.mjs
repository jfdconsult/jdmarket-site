// rotina_50.mjs — Base de dados privada: Top 50 B3 por volume (dinâmico)
// Determina os 50 mais líquidos do dia a partir de um pool de ~80 tickers,
// roda os 4 frameworks e salva em data_50.json para uso da Skill do Claude.

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));

// ── CONFIG ────────────────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = fs.readFileSync(path.join(__dir, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const [k, ...rest] = line.split('=');
      if (k && rest.length) process.env[k.trim()] = rest.join('=').trim();
    }
  } catch {}
}
loadEnv();

const HG_KEY      = process.env.HG_KEY;
const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;
const HG_URL      = 'https://api.hgbrasil.com/finance/stock_price';
const BRAPI_URL   = 'https://brapi.dev/api/quote';
const CLAUDE_URL  = 'https://api.anthropic.com/v1/messages';
const OUT_PATH    = path.join(__dir, 'data_50.json');
const DELAY_MS    = 1200;

if (!ANTHROPIC_KEY) { console.error('❌  ANTHROPIC_KEY não configurada'); process.exit(1); }
if (!HG_KEY)        { console.error('❌  HG_KEY não configurada');         process.exit(1); }

// ── TICKERS FIXOS — sempre incluídos independente de volume ──────────────────
const FIXED_TICKERS = [
  'EMBR3',  // Embraer
  'ECOR3',  // ECO Rodovias
];

// ── POOL DINÂMICO (~80 tickers mais líquidos da B3) ──────────────────────────
// Este pool é avaliado diariamente — os 50 com maior volume são selecionados.
const TICKER_POOL = [
  // Petróleo & Energia
  'PETR4','PETR3','PRIO3','RECV3','RRRP3','CSAN3','RAIZ4','VBBR3',
  'CMIG4','CMIG3','ELET3','ELET6','EGIE3','CPFE3','ENEV3','EQTL3',
  'NEOE3','AURE3','TAEE11','CPLE6','SBSP3','SAPR11',
  // Mineração & Siderurgia
  'VALE3','GGBR4','GGBR3','GOAU4','CSNA3','USIM5','CMIN3','FESA4',
  // Financeiro
  'ITUB4','ITUB3','BBDC4','BBDC3','BBAS3','BPAC11','SANB11',
  'B3SA3','IRBR3','WIZC3',
  // Consumo & Varejo
  'ABEV3','LREN3','MGLU3','PETZ3','SOMA3','SBFG3','ARZZ3','NTCO3',
  'LWSA3','COGN3','VIVA3',
  // Saúde
  'RDOR3','HAPV3','FLRY3','DASA3','BLAU3',
  // Industrial & Tecnologia
  'WEGE3','EMBR3','TOTS3','INTB3','POSI3',
  // Proteína & Alimentos
  'JBSS3','BRFS3','MRFG3','BEEF3','SMTO3','SLCE3','AGRO3',
  // Papel & Celulose
  'SUZB3','KLBN11','DXCO3',
  // Transporte & Logística
  'RENT3','RAIL3','CCRO3','ECOR3','AZUL4','GOLL4',
  // Telecom & Mídia
  'VIVT3','TIMS3',
  // Real Estate
  'CYRE3','MRVE3','EVEN3',
  // Outros
  'UNIP6','LIGT3',
].filter((v,i,a)=>a.indexOf(v)===i); // deduplica

// ── FETCH HG BRASIL (batch — até 5 por chamada gratuita) ─────────────────────
async function fetchHGBatch(tickers) {
  const sym = tickers.join(',');
  try {
    const url = `${HG_URL}?key=${HG_KEY}&format=json-cors&symbol=${sym}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) return {};
    const j = await r.json();
    return j.results || {};
  } catch { return {}; }
}

async function fetchAllVolumes(pool) {
  const results = {};
  const chunkSize = 5; // HG Brasil plano gratuito: máximo 5 tickers por request
  for (let i = 0; i < pool.length; i += chunkSize) {
    const chunk = pool.slice(i, i + chunkSize);
    const data  = await fetchHGBatch(chunk);
    Object.assign(results, data);
    if (i + chunkSize < pool.length) await sleep(500);
  }
  return results;
}

// ── SELECIONA TOP 50 POR VOLUME (fixos sempre incluídos) ─────────────────────
function selectTop50(volumeMap) {
  // Fixos entram garantidos (se tiverem dados)
  const fixedWithData = FIXED_TICKERS.filter(t => volumeMap[t]?.price > 0);
  // Dinâmicos: top por volume excluindo os fixos já garantidos
  const dynamic = Object.entries(volumeMap)
    .filter(([t, v]) => !FIXED_TICKERS.includes(t) && v && (v.price||0) > 0 && (v.volume||0) > 0)
    .sort(([,a],[,b]) => (b.volume||0) - (a.volume||0))
    .slice(0, 50 - fixedWithData.length)
    .map(([ticker]) => ticker);
  return [...fixedWithData, ...dynamic];
}

// ── FETCH MACRO ───────────────────────────────────────────────────────────────
async function fetchMacro() {
  try {
    const url = `${HG_URL}?key=${HG_KEY}&format=json-cors&symbol=BVSP,USDBRL`;
    const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!r.ok) return {};
    return (await r.json()).results || {};
  } catch { return {}; }
}

// ── FETCH BRAPI ───────────────────────────────────────────────────────────────
async function fetchBrapi(symbol) {
  try {
    const url = `${BRAPI_URL}/${symbol}?modules=financialData,defaultKeyStatistics,summaryProfile`;
    const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!r.ok) return null;
    const j = await r.json();
    const item = j.results?.[0];
    if (!item) return null;
    return {
      pe:             item.defaultKeyStatistics?.trailingEps ? (item.financialData?.currentPrice / item.defaultKeyStatistics.trailingEps) : null,
      roe:            item.financialData?.returnOnEquity ?? null,
      net_margin:     item.financialData?.profitMargins   ?? null,
      debt_equity:    item.financialData?.debtToEquity != null ? item.financialData.debtToEquity / 100 : null,
      revenue_growth: item.financialData?.revenueGrowth   ?? null,
      free_cashflow:  item.financialData?.freeCashflow     ?? null,
      ev_ebitda:      item.defaultKeyStatistics?.enterpriseToEbitda ?? null,
      beta:           item.defaultKeyStatistics?.beta ?? null,
    };
  } catch { return null; }
}

// ── CLAUDE ANALYSIS ───────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `Você é um analista quantitativo sênior especializado em B3. \
Dado dados reais de mercado, produza análise institucional rigorosa nos 4 frameworks. \
RESPONDA SOMENTE JSON VÁLIDO — sem markdown, sem texto fora do JSON, sem comentários.`;

function buildPrompt(ticker, hg, brapi, macro) {
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

async function analyzeWithClaude(ticker, hg, brapi, macro) {
  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildPrompt(ticker, hg, brapi, macro) }],
  };
  const r = await fetch(CLAUDE_URL, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'x-api-key':ANTHROPIC_KEY, 'anthropic-version':'2023-06-01' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });
  if (!r.ok) throw new Error(`Claude ${r.status}: ${(await r.text()).slice(0,150)}`);
  const j = await r.json();
  const text = j.content?.[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Sem JSON na resposta Claude');
  return JSON.parse(match[0]);
}

// ── BUILD ASSET ───────────────────────────────────────────────────────────────
function buildAsset(ticker, hg, brapi, ai) {
  const a = ai || {};
  const consMap = { BUY:'BULLISH', SELL:'BEARISH', HOLD:'NEUTRAL' };
  const bwHigh  = ['HIGH','EXTREME'].includes(a.bw_overall_risk);
  let signal = consMap[a.rating] || 'NEUTRAL';
  if (bwHigh && a.rating === 'HOLD') signal = 'DEFENSIVE';

  return {
    _ticker:  ticker,
    _saved:   Date.now(),
    _hg:      hg || {},
    _brapi: {
      pe:             a.pe_ratio     ?? brapi?.pe             ?? null,
      roe:            a.roe != null  ? a.roe/100              : brapi?.roe            ?? null,
      net_margin:     a.net_margin != null ? a.net_margin/100 : brapi?.net_margin     ?? null,
      debt_equity:    a.debt_equity  ?? brapi?.debt_equity    ?? null,
      revenue_growth: a.revenue_growth_yoy != null ? a.revenue_growth_yoy/100 : brapi?.revenue_growth ?? null,
      free_cashflow:  brapi?.free_cashflow  ?? null,
      ev_ebitda:      brapi?.ev_ebitda      ?? null,
      beta:           brapi?.beta            ?? null,
    },
    _tech: {
      ma50:         a.ma50         ?? null,
      ma200:        a.ma200        ?? null,
      above_ma200:  a.above_ma200  ?? null,
      rsi:          a.rsi          ?? null,
      rsi_signal:   a.rsi_signal   ?? null,
      macd:         a.macd         ?? null,
      bollinger:    a.bollinger    ?? null,
      support1:     a.support1     ?? null,
      support2:     a.support2     ?? null,
      resistance1:  a.resistance1  ?? null,
      trend_daily:  a.trend_daily  ?? null,
      trend_weekly: a.trend_weekly ?? null,
      trend_monthly:a.trend_monthly?? null,
      week52_high:  a.week52_high  ?? null,
      week52_low:   a.week52_low   ?? null,
      avg_vol_7d:   hg?.volume     ?? null,
      hv20:         a.hv20         ?? null,
      pattern:      a.pattern      ?? null,
    },
    rating:               a.rating              ?? 'HOLD',
    confidence:           a.rating              ?? 'HOLD',
    moat:                 a.moat                ?? 'MODERATE',
    investment_thesis:    a.investment_thesis   ?? '',
    pe_ratio:             a.pe_ratio            ?? null,
    roe:                  a.roe                 ?? null,
    net_margin:           a.net_margin          ?? null,
    debt_equity:          a.debt_equity         ?? null,
    revenue_growth_yoy:   a.revenue_growth_yoy  ?? null,
    targets:              a.targets             ?? {},
    entry_zone:           a.entry_zone          ?? '',
    stop_loss:            a.stop_loss           ?? null,
    risk_rating:          a.risk_rating         ?? 5,
    catalysts:            a.catalysts           ?? [],
    risks:                a.risks               ?? [],
    bw_summary:           a.bw_summary          ?? '',
    bw_overall_risk:      a.bw_overall_risk      ?? 'MODERATE',
    bw_risk_score:        a.bw_risk_score        ?? 5,
    bw_dimensions:        a.bw_dimensions        ?? {},
    max_position_pct:     a.max_position_pct     ?? null,
    recession_drawdown_pct: a.recession_drawdown_pct ?? null,
    tail_risks:           a.tail_risks           ?? [],
    hedges:               a.hedges               ?? [],
    ct_confidence:        a.ct_confidence        ?? 'NEUTRAL',
    trend_daily:          a.trend_daily          ?? 'NEUTRAL',
    trend_weekly:         a.trend_weekly         ?? 'NEUTRAL',
    trend_monthly:        a.trend_monthly        ?? 'NEUTRAL',
    entry_tech:           a.entry_tech           ?? null,
    stop_tech:            a.stop_tech            ?? null,
    target1:              a.target1              ?? null,
    target2:              a.target2              ?? null,
    risk_reward:          a.risk_reward          ?? null,
    tech_summary:         a.tech_summary         ?? '',
    _candle_signal:       signal,
    _candle_desc:         a.pattern              ?? '',
    jpm_play:             a.jpm_play             ?? 'WAIT',
    jpm_implied_move_pct: a.jpm_implied_move_pct ?? null,
    jpm_flow_signal:      a.jpm_flow_signal      ?? 'NEUTRAL',
    jpm_options_skew:     a.jpm_options_skew     ?? 'NEUTRAL',
    jpm_positioning:      a.jpm_positioning      ?? 'BALANCED',
    jpm_event_risk:       a.jpm_event_risk       ?? '',
    jpm_data_note:        'Análise gerada via rotina_50.mjs — base privada 50 ativos.',
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  JD MARKET ANALYSIS — ROTINA 50 (Base Privada)`);
  console.log(`  ${new Date().toLocaleString('pt-BR')}`);
  console.log(`${'═'.repeat(60)}\n`);

  // 1. Fetch volumes de todo o pool para ranking dinâmico
  console.log(`📡  Buscando volumes de ${TICKER_POOL.length} tickers para ranking...`);
  const volumeMap = await fetchAllVolumes(TICKER_POOL);
  const top50 = selectTop50(volumeMap);

  if (top50.length < 10) {
    console.error('❌  Poucos tickers com volume válido. Verifique a API.');
    process.exit(1);
  }

  console.log(`\n📊  Top ${top50.length} selecionados por volume:`);
  console.log(`    ${top50.join(', ')}\n`);

  // 2. Fetch macro
  const macro = await fetchMacro();
  const ibov  = macro['BVSP']   || {};
  const usd   = macro['USDBRL'] || {};

  // 3. Analisar cada ativo
  const assets = [];
  for (let i = 0; i < top50.length; i++) {
    const ticker = top50[i];
    const hg     = volumeMap[ticker] || {};

    process.stdout.write(
      `[${(i+1).toString().padStart(2)}/${top50.length}]  ${ticker.padEnd(8)} R$${(hg.price||0).toFixed(2).padStart(7)}  analisando...`
    );

    let asset;
    try {
      const brapi = await fetchBrapi(ticker);
      const ai    = await analyzeWithClaude(ticker, hg, brapi, macro);
      asset = buildAsset(ticker, hg, brapi, ai);
      process.stdout.write(`  ✅  ${asset.rating}  ${asset._candle_signal}\n`);
    } catch(e) {
      console.log(`  ⚠️  ${e.message.slice(0,60)}`);
      asset = buildAsset(ticker, hg, null, null);
    }

    assets.push(asset);
    if (i < top50.length - 1) await sleep(DELAY_MS);
  }

  // 4. Salva data_50.json
  const out = {
    generated_at:     Date.now(),
    generated_at_br:  new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    type:             'private_50',
    ticker_selection: {
      date:     new Date().toLocaleDateString('pt-BR'),
      pool_size: TICKER_POOL.length,
      selected:  top50,
    },
    ibovespa: { price: ibov.price || null, change_percent: ibov.change_percent || null },
    usdbrl:   { price: usd.price  || null, change_percent: usd.change_percent  || null },
    assets,
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ✅  data_50.json salvo — ${assets.length} ativos`);
  console.log(`  📅  Top 50 de hoje: ${top50.slice(0,10).join(', ')}...`);
  console.log(`  ⏱️   ${new Date().toLocaleString('pt-BR')}`);
  console.log(`${'═'.repeat(60)}\n`);
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1); });
