// rotina_ab.mjs — Al Brooks AB1–AB4 · Base Privada (8 Frameworks)
// Lê data_50.json → busca OHLC 30 barras → roda AB1-AB4 via Claude
// Salva data_ab.json: 50 ativos com GS+BW+CT+JP+AB1+AB2+AB3+AB4 + consenso 8 sinais

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

const ANTHROPIC_KEY = process.env.ANTHROPIC_KEY;
const BRAPI_TOKEN   = process.env.BRAPI_TOKEN || '';
const CLAUDE_URL    = 'https://api.anthropic.com/v1/messages';
const BRAPI_URL     = 'https://brapi.dev/api/quote';
const IN_PATH       = path.join(__dir, 'data_50.json');
const OUT_PATH      = path.join(__dir, 'data_ab.json');
const DELAY_MS      = 1500; // AB prompt é maior — dar mais tempo entre chamadas

if (!ANTHROPIC_KEY) { console.error('❌  ANTHROPIC_KEY não configurada'); process.exit(1); }
if (!BRAPI_TOKEN)   { console.warn('⚠️   BRAPI_TOKEN não configurado — dados históricos podem ser bloqueados por rate limit'); }

// ── FETCH OHLC (30 barras diárias, mais recente primeiro) ─────────────────────
async function fetchOHLC(ticker) {
  try {
    const url = `${BRAPI_URL}/${ticker}?range=3mo&interval=1d`;
    const headers = BRAPI_TOKEN ? { Authorization: `Bearer ${BRAPI_TOKEN}` } : {};
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

// ── AB SYSTEM PROMPT ──────────────────────────────────────────────────────────
const AB_SYSTEM = `Você é um analista sênior de price action especializado na metodologia de Al Brooks, com foco em gráficos DIÁRIOS de ações da B3.

Sua tarefa é executar 4 frameworks de análise (AB1, AB2, AB3, AB4) derivados dos 4 livros de Al Brooks, utilizando exclusivamente os dados OHLC diários fornecidos. Não invente dados. Se um campo não puder ser determinado com os dados disponíveis, retorne null.

Responda APENAS com o JSON abaixo, sem texto adicional, sem markdown, sem comentários.`;

// ── AB USER PROMPT ────────────────────────────────────────────────────────────
function buildABPrompt(ticker, ohlc, tech, macro) {
  return `Analise o ativo ${ticker} usando os 4 frameworks Al Brooks para dados DIÁRIOS.

=== DADOS OHLC DIÁRIOS (últimas 30 barras, mais recente primeiro) ===
${JSON.stringify(ohlc, null, 2)}

=== DADOS TÉCNICOS COMPLEMENTARES (já calculados) ===
${JSON.stringify({
  ma50:         tech.ma50,
  ma200:        tech.ma200,
  above_ma200:  tech.above_ma200,
  rsi:          tech.rsi,
  rsi_signal:   tech.rsi_signal,
  macd:         tech.macd,
  bollinger:    tech.bollinger,
  support1:     tech.support1,
  support2:     tech.support2,
  resistance1:  tech.resistance1,
  trend_daily:  tech.trend_daily,
  trend_weekly: tech.trend_weekly,
  hv20:         tech.hv20,
  week52_high:  tech.week52_high,
  week52_low:   tech.week52_low,
  avg_vol_7d:   tech.avg_vol_7d,
}, null, 2)}

=== CONTEXTO MACRO ===
Ibovespa: ${macro.ibov_price} (${macro.ibov_change}%)
USD/BRL: ${macro.usdbrl_price} (${macro.usdbrl_change}%)

=== INSTRUÇÕES DOS 4 FRAMEWORKS ===

## AB1 — Always-In Direction + Signal Bar Quality (últimas 10 barras)

PASSO 1 — Always-In Direction:
Analise as últimas 10 barras.
- LONG: maioria de closes acima do midpoint (high+low)/2, higher lows em sequência, barras bull dominantes
- SHORT: maioria de closes abaixo do midpoint, lower highs em sequência, barras bear dominantes
- UNCERTAIN: barras extensivamente sobrepostas, alternância sem sequência clara

PASSO 2 — Bar Quality Score da barra mais recente (6 critérios, +1 bull / -1 bear / 0 neutro):
1. Corpo: grande bull body (+1) | grande bear body (-1) | doji/pequeno (0)
2. Fechamento: próximo à máxima (+1) | próximo à mínima (-1) | no meio (0)
3. Cauda superior: pequena/ausente (+1) | grande rejeição (-1) | moderada (0)
4. Cauda inferior: grande suporte (+1) | pequena/ausente (-1) | moderada (0)
5. Tamanho vs média 10 barras: acima da média em barra bull (+1) | acima em barra bear (-1) | abaixo (0)
6. Close vs barra anterior: acima do close anterior (+1) | abaixo (-1) | igual (0)
Soma: ≥+3=STRONG BULL | +1/+2=MODERATE BULL | 0=NEUTRAL | -1/-2=MODERATE BEAR | ≤-3=STRONG BEAR

PASSO 3 — Entry Pattern (últimas 5 barras):
H1: primeiro pullback em bull trend | H2: segundo pullback (mais confiável) | H3/H4: possível exaustão
L1: primeiro rally em bear trend | L2: segundo rally (MELHOR entrada short)
BREAKOUT_PULLBACK: rompimento + pullback sem voltar ao range | NONE: sem padrão

ab1_signal: STRONG BUY (Always-In LONG + STRONG BULL + H2) | BUY (LONG + MODERATE BULL ou H1/H2) | NEUTRAL | SELL (SHORT + MODERATE BEAR ou L1/L2) | STRONG SELL (SHORT + STRONG BEAR + L2)

---
## AB2 — Trend Strength Score — 12 Signs of Strength (últimas 20 barras)

Pontue +1 bull / -1 bear para cada critério:

BULL (+1 cada):
1. Sequência clara de HH e HL nos swings
2. >60% das barras são bull bars
3. Pouca sobreposição entre barras consecutivas
4. Tails < 25% do range na maioria
5. Pullbacks < 30% do swing anterior
6. Barras bear presentes mas não dominantes
7. Pullbacks param na EMA20/MA50
8. Signal bars de pullbacks com closes fortes
9. Sem clímax/parábola evidente
10. Preço cada vez mais distante da MA (sem tocá-la)
11. Breakouts com 2+ barras de follow-through
12. Tentativas de reversão bearish falharam

BEAR (-1 cada):
1. Sequência clara de LH e LL
2. >60% são bear bars
3. Pouca sobreposição entre bear bars consecutivas
4. Bear bars fechando na mínima ou próximas
5. Rallies fracos: 1-3 barras sem convicção
6. Nenhum close consecutivo acima da MA
7. Signal bars de rally com closes fracos
8. Breakdowns com 2+ barras de follow-through
9. Preço abaixo da MA com distância crescente
10. Tentativas de reversão bullish falharam

Score = bull_criteria - bear_criteria
≥+7=STRONG BULL | +3a+6=BULL | -2a+2=NEUTRAL | -6a-3=BEAR | ≤-7=STRONG BEAR

Tipo de tendência: SPIKE_CHANNEL | STAIRS | TIGHT_CHANNEL | TRENDING_RANGE | NONE
Qualidade dos pullbacks: STRONG | MODERATE | WEAK

---
## AB3 — Market Phase & Breakout Pressure (últimas 15 barras)

PASSO 1 — Market Phase:
TRENDING_BULL: HH/HL + bull bars dominantes + pullbacks respeitam MA
TRENDING_BEAR: LH/LL + bear bars dominantes
TRADING_RANGE: barras extensivamente sobrepostas (overlap >50%), MA plana, sem direção
TRANSITIONING: rompimento recente OU trendline break após tendência longa

PASSO 2 — Breakout Pressure (se TRADING_RANGE ou TRANSITIONING):
BULL: >55% bull bars + fechamentos no terço superior + tails inferiores + breakdowns falharam + bull bars maiores
BEAR: >55% bear bars + fechamentos no terço inferior + tails superiores + breakouts falharam + bear bars maiores
BALANCED: critérios equilibrados

PASSO 3 — Breakout Quality (se houve rompimento nas últimas 5 barras):
STRONG: barra grande fechando na extremidade + sem overlap seguinte + múltiplos níveis rompidos
WEAK: barra pequena + cauda contrária + barras seguintes revertendo
NONE: sem rompimento

fade_setup = true se breakout WEAK

ab3_signal: STRONG BUY (RANGE + BULL pressure + breakout STRONG para cima) | BUY (RANGE + BULL moderada ou TRANSITIONING bullish) | NEUTRAL (BALANCED ou TRENDING → delegar AB1/AB2) | SELL | STRONG SELL

---
## AB4 — Reversal Patterns & Trader's Equation (últimas 30 barras)

PASSO 1 — Padrão de reversão mais relevante:
TOPO: WEDGE_TOP | DOUBLE_TOP | CLIMAX_BAR_TOP | CHANNEL_OVERSHOOT_TOP | FAILED_BREAKOUT_HIGH | THREE_PUSHES_UP | NONE
FUNDO: WEDGE_BOTTOM | DOUBLE_BOTTOM | CLIMAX_BAR_BOTTOM | CHANNEL_OVERSHOOT_BOTTOM | FAILED_BREAKOUT_LOW | THREE_PUSHES_DOWN | NONE

PASSO 2 — Reversal Score (0-10, +1 por sinal presente):
1. Wedge ou 3 pushes identificados
2. Trendline principal rompida com força
3. Volume acima da média na barra de clímax
4. Signal bar de reversão forte
5. Tentativa de novo extremo falhou
6. Divergência RSI (RSI < 70 em novo high bull OU > 30 em novo low bear)
7. Double top/bottom em suporte/resistência importante
8. Overshoot de canal com reversão na mesma barra ou seguinte
9. Gap de exaustão seguido de reversão
10. Ativo próximo a 52-week high/low
Score: 0-3=LOW | 4-5=MODERATE | 6-10=HIGH

PASSO 3 — Sequência de Reversão (etapa atingida):
0: Nenhuma | 1: Clímax/overshoot | 2: Trendline rompida | 3: Pullback/retest | 4: Reversão confirmada

PASSO 4 — second_entry: true se segunda tentativa de reversão (Failed Failure = maior confiança)

PASSO 5 — Trader's Equation:
FAVORABLE: prob ≥ 40% + recompensa ≥ 2× risco
UNFAVORABLE: prob < 40% OU recompensa < 1.5× risco
NEUTRAL: entre os dois

ab4_signal: STRONG BUY (score≥6 + padrão FUNDO + step≥3 + FAVORABLE) | BUY | NEUTRAL | SELL | STRONG SELL
IMPORTANTE: AB4 sinaliza CONTRA a tendência. AB4 SELL com AB2 STRONG BULL = alerta de topo, não inversão imediata.

=== RETORNE EXATAMENTE ESTE JSON ===

{
  "ab1_signal": "STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "ab1_always_in": "LONG|SHORT|UNCERTAIN",
  "ab1_bar_quality": "STRONG BULL|MODERATE BULL|NEUTRAL|MODERATE BEAR|STRONG BEAR",
  "ab1_entry_pattern": "H1|H2|H3|H4|L1|L2|L3|BREAKOUT_PULLBACK|NONE",
  "ab1_bar_score": <-6 a +6>,
  "ab1_summary": "1-2 frases sobre as últimas barras e Always-In direction",
  "ab2_trend_strength": "STRONG BULL|BULL|NEUTRAL|BEAR|STRONG BEAR",
  "ab2_score": <número>,
  "ab2_bull_criteria": <0-12>,
  "ab2_bear_criteria": <0-10>,
  "ab2_trend_type": "SPIKE_CHANNEL|STAIRS|TIGHT_CHANNEL|TRENDING_RANGE|NONE",
  "ab2_pullback_quality": "STRONG|MODERATE|WEAK",
  "ab2_summary": "2 frases sobre força e tipo da tendência",
  "ab3_signal": "STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "ab3_market_phase": "TRENDING_BULL|TRENDING_BEAR|TRADING_RANGE|TRANSITIONING",
  "ab3_breakout_pressure": "BULL|BEAR|BALANCED",
  "ab3_range_top": <número ou null>,
  "ab3_range_bottom": <número ou null>,
  "ab3_breakout_quality": "STRONG|WEAK|NONE",
  "ab3_fade_setup": <true|false>,
  "ab3_summary": "2 frases sobre regime de mercado e pressão direcional",
  "ab4_signal": "STRONG BUY|BUY|NEUTRAL|SELL|STRONG SELL",
  "ab4_reversal_risk": "LOW|MODERATE|HIGH",
  "ab4_reversal_score": <0-10>,
  "ab4_pattern": "WEDGE_TOP|DOUBLE_TOP|CLIMAX_BAR_TOP|CHANNEL_OVERSHOOT_TOP|FAILED_BREAKOUT_HIGH|THREE_PUSHES_UP|WEDGE_BOTTOM|DOUBLE_BOTTOM|CLIMAX_BAR_BOTTOM|CHANNEL_OVERSHOOT_BOTTOM|FAILED_BREAKOUT_LOW|THREE_PUSHES_DOWN|NONE",
  "ab4_sequence_step": <0-4>,
  "ab4_second_entry": <true|false>,
  "ab4_traders_equation": "FAVORABLE|NEUTRAL|UNFAVORABLE",
  "ab4_summary": "2 frases sobre risco de reversão e setup atual"
}`;
}

// ── CLAUDE AB CALL ────────────────────────────────────────────────────────────
async function analyzeABWithClaude(ticker, ohlc, tech, macro) {
  const body = {
    model:      'claude-sonnet-4-6',
    max_tokens: 1500,
    system:     AB_SYSTEM,
    messages:   [{ role: 'user', content: buildABPrompt(ticker, ohlc, tech, macro) }],
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
  const clean = raw.replace(/```json|```/g, '').trim();
  const match = clean.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Sem JSON na resposta AB');
  return JSON.parse(match[0]);
}

// ── CONSENSO 8 FRAMEWORKS ─────────────────────────────────────────────────────
function calcConsensus8(asset, ab) {
  const S = {
    'STRONG BUY':1,'BUY':1,'STRONG BULL':1,'BULL':1,'BULLISH':1,
    'STRONG SELL':-1,'SELL':-1,'STRONG BEAR':-1,'BEAR':-1,'BEARISH':-1,
    'NEUTRAL':0,'HOLD':0,'BALANCED':0,
  };

  // BW proxy: LOW/MODERATE = BUY, HIGH = NEUTRAL, EXTREME = SELL
  const bwProxy = {LOW:'BUY',MODERATE:'BUY',HIGH:'NEUTRAL',EXTREME:'SELL'}[asset.bw_overall_risk] || 'NEUTRAL';

  const signals = {
    gs:  asset.rating,
    bw:  bwProxy,
    ct:  asset.ct_confidence,
    jp:  asset.jpm_flow_signal,
    ab1: ab?.ab1_signal,
    ab2: ab?.ab2_trend_strength,
    ab3: ab?.ab3_signal,
    ab4: ab?.ab4_signal,
  };

  const score = Object.values(signals).reduce((sum, s) => sum + (S[s] ?? 0), 0);

  const bwExtreme  = asset.bw_overall_risk === 'EXTREME';
  const ab4High    = ab?.ab4_reversal_risk === 'HIGH';
  const ab4Warn    = ab4High && score >= 3; // AB4 alert layer

  let signal;
  if      (bwExtreme && asset.rating === 'HOLD')  signal = 'DEFENSIVE';
  else if (bwExtreme && score >= 4)               signal = 'DEFENSIVE';
  else if (ab4Warn)                               signal = 'DEFENSIVE';
  else if (score >= 4)                            signal = 'BULLISH';
  else if (score <= -4)                           signal = 'BEARISH';
  else if ((bwExtreme || asset.bw_overall_risk === 'HIGH') && asset.rating === 'HOLD') signal = 'DEFENSIVE';
  else                                            signal = 'NEUTRAL';

  return { signal, score, signals, ab4_alert: ab4Warn };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  JD MARKET ANALYSIS — ROTINA AB (Al Brooks · 8 Frameworks)`);
  console.log(`  ${new Date().toLocaleString('pt-BR')}`);
  console.log(`${'═'.repeat(60)}\n`);

  if (!fs.existsSync(IN_PATH)) {
    console.error('❌  data_50.json não encontrado. Execute rotina_50.mjs primeiro.');
    process.exit(1);
  }

  const base   = JSON.parse(fs.readFileSync(IN_PATH, 'utf8'));
  const assets = base.assets || [];
  const macro  = {
    ibov_price:   base.ibovespa?.price      ?? 0,
    ibov_change:  base.ibovespa?.change_percent ?? 0,
    usdbrl_price: base.usdbrl?.price        ?? 0,
    usdbrl_change:base.usdbrl?.change_percent  ?? 0,
  };

  console.log(`📋  ${assets.length} ativos para análise AB\n`);

  // Carrega sinais anteriores (para delta tracking)
  let prevSignals = {};
  try {
    if (fs.existsSync(OUT_PATH)) {
      const prev = JSON.parse(fs.readFileSync(OUT_PATH, 'utf8'));
      for (const a of (prev.assets || [])) {
        if (a._ticker && a._consensus8?.signal) {
          prevSignals[a._ticker] = a._consensus8.signal;
        }
      }
      console.log(`📊  Sinais anteriores carregados: ${Object.keys(prevSignals).length} tickers\n`);
    }
  } catch {
    console.warn('⚠️  Não foi possível carregar data_ab.json anterior — sem delta tracking\n');
  }

  const enriched = [];

  for (let i = 0; i < assets.length; i++) {
    const asset  = assets[i];
    const ticker = asset._ticker;
    const price  = asset._hg?.price || 0;

    process.stdout.write(
      `[${(i+1).toString().padStart(2)}/${assets.length}]  ${ticker.padEnd(8)} R$${price.toFixed(2).padStart(7)}  OHLC...`
    );

    // Busca OHLC
    const ohlc = await fetchOHLC(ticker);

    if (ohlc.length < 10) {
      process.stdout.write(`  ⚠️  OHLC insuficiente (${ohlc.length} barras) — pulando AB\n`);
      enriched.push({ ...asset, _ab_error: 'insufficient_ohlc' });
      await sleep(500);
      continue;
    }

    process.stdout.write(` ${ohlc.length}bars  AB...`);

    let ab = null;
    try {
      ab = await analyzeABWithClaude(ticker, ohlc, asset._tech || {}, macro);
      const cons8   = calcConsensus8(asset, ab);
      const prevSig = prevSignals[ticker] || null;
      const changed = prevSig !== null && prevSig !== cons8.signal;
      process.stdout.write(
        `  ✅  AB1:${ab.ab1_signal?.split(' ').pop()}  AB2:${ab.ab2_trend_strength?.split(' ').pop()}  AB4:${ab.ab4_reversal_risk}  →${cons8.signal}${changed ? `  🔄 ${prevSig}→${cons8.signal}` : ''}\n`
      );
      enriched.push({
        ...asset,
        _ohlc_bars: ohlc.length,
        ab1_signal:          ab.ab1_signal,
        ab1_always_in:       ab.ab1_always_in,
        ab1_bar_quality:     ab.ab1_bar_quality,
        ab1_entry_pattern:   ab.ab1_entry_pattern,
        ab1_bar_score:       ab.ab1_bar_score,
        ab1_summary:         ab.ab1_summary,
        ab2_trend_strength:  ab.ab2_trend_strength,
        ab2_score:           ab.ab2_score,
        ab2_bull_criteria:   ab.ab2_bull_criteria,
        ab2_bear_criteria:   ab.ab2_bear_criteria,
        ab2_trend_type:      ab.ab2_trend_type,
        ab2_pullback_quality:ab.ab2_pullback_quality,
        ab2_summary:         ab.ab2_summary,
        ab3_signal:          ab.ab3_signal,
        ab3_market_phase:    ab.ab3_market_phase,
        ab3_breakout_pressure:ab.ab3_breakout_pressure,
        ab3_range_top:       ab.ab3_range_top,
        ab3_range_bottom:    ab.ab3_range_bottom,
        ab3_breakout_quality:ab.ab3_breakout_quality,
        ab3_fade_setup:      ab.ab3_fade_setup,
        ab3_summary:         ab.ab3_summary,
        ab4_signal:          ab.ab4_signal,
        ab4_reversal_risk:   ab.ab4_reversal_risk,
        ab4_reversal_score:  ab.ab4_reversal_score,
        ab4_pattern:         ab.ab4_pattern,
        ab4_sequence_step:   ab.ab4_sequence_step,
        ab4_second_entry:    ab.ab4_second_entry,
        ab4_traders_equation:ab.ab4_traders_equation,
        ab4_summary:         ab.ab4_summary,
        _consensus8:         cons8,
        prev_consensus:      prevSig,
        consensus_changed:   changed,
      });
    } catch(e) {
      process.stdout.write(`  💥  ${e.message.slice(0,50)}\n`);
      enriched.push({ ...asset, _ab_error: e.message.slice(0,100) });
    }

    if (i < assets.length - 1) await sleep(DELAY_MS);
  }

  // Salva data_ab.json
  const out = {
    generated_at:     Date.now(),
    generated_at_br:  new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    type:             'private_ab_8frameworks',
    base_generated:   base.generated_at_br,
    ticker_selection: base.ticker_selection,
    frameworks:       ['GS','BW','CT','JP','AB1','AB2','AB3','AB4'],
    ibovespa:         base.ibovespa,
    usdbrl:           base.usdbrl,
    assets:           enriched,
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));

  // Sumário
  const pass = enriched.filter(a => !a._ab_error).length;
  const ab4hi = enriched.filter(a => a.ab4_reversal_risk === 'HIGH').length;
  const defensive = enriched.filter(a => a._consensus8?.signal === 'DEFENSIVE').length;
  const bullish   = enriched.filter(a => a._consensus8?.signal === 'BULLISH').length;
  const bearish   = enriched.filter(a => a._consensus8?.signal === 'BEARISH').length;

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ✅  data_ab.json salvo — ${pass}/${enriched.length} com AB completo`);
  console.log(`  🐂  BULLISH: ${bullish}  🐻  BEARISH: ${bearish}  🛡️  DEFENSIVE: ${defensive}`);
  console.log(`  ⚠️   AB4 HIGH reversal risk: ${ab4hi} ativos`);
  console.log(`  ⏱️   ${new Date().toLocaleString('pt-BR')}`);
  console.log(`${'═'.repeat(60)}\n`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
