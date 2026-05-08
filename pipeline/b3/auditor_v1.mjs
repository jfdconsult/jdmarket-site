// auditor_v1.mjs — Agente auditor independente
// Lê data.json, critica cada análise com um segundo Claude adversarial,
// grava audit.json com score, flags e veredicto por ativo.

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ── CONFIG ────────────────────────────────────────────────────────────────────
const __dir = path.dirname(fileURLToPath(import.meta.url));

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
const CLAUDE_URL    = 'https://api.anthropic.com/v1/messages';
const DATA_PATH     = path.join(__dir, 'data.json');
const AUDIT_PATH    = path.join(__dir, 'audit.json');
const DELAY_MS      = 1000; // entre ativos

if (!ANTHROPIC_KEY) { console.error('❌  ANTHROPIC_KEY não configurada em .env'); process.exit(1); }

// ── AUDITOR SYSTEM PROMPT ─────────────────────────────────────────────────────
const AUDITOR_SYSTEM = `Você é um auditor quantitativo sênior e cético. \
Sua função é CRITICAR e VALIDAR análises produzidas por outro agente de IA. \
Seja rigoroso, adversarial e independente — seu trabalho é encontrar falhas, inconsistências e erros. \
Recalcule métricas-chave com os dados brutos fornecidos. \
RESPONDA SOMENTE JSON VÁLIDO — sem markdown, sem texto fora do JSON.`;

// ── BUILD AUDIT PROMPT ────────────────────────────────────────────────────────
function buildAuditPrompt(asset) {
  // data.json armazena tudo flat no asset — sem sub-objetos _gs/_bw/_ct/_jp
  const h  = asset._hg    || {};
  const b  = asset._brapi || {};
  const tc = asset._tech  || {};   // dados técnicos CT

  const price  = h.price          || 0;
  const chgPct = h.change_percent || 0;

  // GS fields (flat)
  const gs_rating    = asset.rating;
  const gs_moat      = asset.moat;
  const gs_targets   = asset.targets || {};
  const gs_entry     = asset.entry_zone;
  const gs_stop      = asset.stop_loss;
  const gs_risk      = asset.risk_rating;

  // BW fields (flat)
  const bw_risk      = asset.bw_overall_risk;
  const bw_score     = asset.bw_risk_score;
  const bw_dims      = asset.bw_dimensions || {};
  const bw_maxpos    = asset.max_position_pct;
  const bw_recdraw   = asset.recession_drawdown_pct;

  // CT fields (_tech + flat)
  const ct_conf      = asset.ct_confidence;
  const ct_entry     = asset.entry_tech;
  const ct_stop      = asset.stop_tech;
  const ct_t1        = asset.target1;
  const ct_t2        = asset.target2;
  const ct_rr        = asset.risk_reward;

  // JP fields (flat, prefixo jpm_)
  const jp_play      = asset.jpm_play;
  const jp_move      = asset.jpm_implied_move_pct;
  const jp_flow      = asset.jpm_flow_signal;
  const jp_skew      = asset.jpm_options_skew;
  const jp_pos       = asset.jpm_positioning;
  const jp_event     = asset.jpm_event_risk;

  // Consenso
  const consensus    = asset._candle_signal;

  const lines = [
    `ATIVO AUDITADO: ${asset._ticker} — ${h.company_name || asset._ticker}`,
    `SETOR: ${h.sector || ''}`,
    ``,
    `=== DADOS BRUTOS DE MERCADO (fonte: API) ===`,
    `Preço atual: R$${price.toFixed(2)}`,
    `Variação dia: ${chgPct >= 0 ? '+' : ''}${chgPct.toFixed(2)}%`,
    `Volume: ${((h.volume||0)/1e6).toFixed(1)}M`,
    `Mkt Cap: R$${((h.market_cap||0)/1000).toFixed(0)}B`,
    `P/B API: ${h.financials?.price_to_book_ratio ?? 'null'}`,
    `DY 12m API: ${h.financials?.dividends?.yield_12m ?? 'null'}%`,
    ``,
    `=== DADOS BRAPI (fundamentais) ===`,
    `P/E trailing: ${b.pe ?? 'null'}`,
    `ROE:          ${b.roe != null ? (b.roe*100).toFixed(1)+'%' : 'null'}`,
    `Margem líq:   ${b.net_margin != null ? (b.net_margin*100).toFixed(1)+'%' : 'null'}`,
    `D/E:          ${b.debt_equity ?? 'null'}`,
    `FCF:          ${b.free_cashflow != null ? 'R$'+(b.free_cashflow/1e9).toFixed(1)+'B' : 'null'}`,
    `EV/EBITDA:    ${b.ev_ebitda ?? 'null'}`,
    `Rev growth:   ${b.revenue_growth != null ? (b.revenue_growth*100).toFixed(1)+'%' : 'null'}`,
    `Beta:         ${b.beta ?? 'null'}`,
    ``,
    `=== ANÁLISE GS (Goldman Sachs) — A AUDITAR ===`,
    `Rating:       ${gs_rating}`,
    `Moat:         ${gs_moat}`,
    `Target Bear:  R$${gs_targets.bear ?? 'null'}`,
    `Target Base:  R$${gs_targets.base ?? 'null'}  (upside declarado: ${gs_targets.upside_base_pct?.toFixed(1) ?? 'null'}%)`,
    `Target Bull:  R$${gs_targets.bull ?? 'null'}`,
    `Entrada:      ${gs_entry ?? 'null'}`,
    `Stop loss:    R$${gs_stop ?? 'null'}`,
    `Risk rating:  ${gs_risk ?? 'null'}/10`,
    ``,
    `=== ANÁLISE BW (Bridgewater) — A AUDITAR ===`,
    `Overall risk: ${bw_risk}`,
    `Risk score:   ${bw_score ?? 'null'}/10`,
    `Max position: ${bw_maxpos ?? 'null'}%`,
    `Recession dd: ${bw_recdraw ?? 'null'}%`,
    `Dimensões:    macro_brasil=${bw_dims.macro_brasil?.r}  cambio=${bw_dims.cambio_brl?.r}`,
    `              setor=${bw_dims.setor?.r}  liquidez=${bw_dims.liquidez?.r}`,
    `              alavancagem=${bw_dims.alavancagem?.r}  politico=${bw_dims.politico?.r}`,
    ``,
    `=== ANÁLISE CT (Citadel) — A AUDITAR ===`,
    `Confiança:    ${ct_conf}`,
    `Trend D/W/M:  ${tc.trend_daily ?? asset.trend_daily} / ${tc.trend_weekly ?? asset.trend_weekly} / ${tc.trend_monthly ?? asset.trend_monthly}`,
    `MA50:         R$${tc.ma50 ?? 'null'}   MA200: R$${tc.ma200 ?? 'null'}`,
    `Acima MA200:  ${tc.above_ma200 ?? 'null'}`,
    `RSI:          ${tc.rsi ?? 'null'}  (${tc.rsi_signal ?? 'null'})`,
    `MACD:         ${tc.macd ?? 'null'}`,
    `Bollinger:    ${tc.bollinger ?? 'null'}`,
    `Suporte 1:    R$${tc.support1 ?? 'null'}   Suporte 2: R$${tc.support2 ?? 'null'}`,
    `Resistência:  R$${tc.resistance1 ?? 'null'}`,
    `Entry técnico:R$${ct_entry ?? 'null'}   Stop técnico: R$${ct_stop ?? 'null'}`,
    `Alvo 1:       R$${ct_t1 ?? 'null'}   Alvo 2: R$${ct_t2 ?? 'null'}`,
    `Risk/Reward:  ${ct_rr ?? 'null'}`,
    `HV20:         ${tc.hv20 ?? 'null'}%`,
    ``,
    `=== ANÁLISE JP (JPMorgan) — A AUDITAR ===`,
    `Play:         ${jp_play}`,
    `Implied move: ${jp_move ?? 'null'}%`,
    `Flow signal:  ${jp_flow}`,
    `Skew:         ${jp_skew}`,
    `Positioning:  ${jp_pos}`,
    `Event risk:   ${jp_event ?? 'null'}`,
    ``,
    `=== EX SCORE — EXAUSTÃO (calculado do OHLC) ===`,
    `EX Score:       ${asset._ex?.score ?? 'null'} / 5  (${asset._ex?.classification ?? 'null'})`,
    `EX Bottom:      ${asset._ex?.bottom_score ?? 'null'} / 5`,
    `EX1 RSI days:   ${asset._ex?.criteria?.ex1_rsi_overbought_days ?? 'null'}`,
    `EX2 52W high:   ${asset._ex?.criteria?.ex2_near_52w_high ?? 'null'}`,
    `EX3 RSI div:    ${asset._ex?.criteria?.ex3_rsi_divergence ?? 'null'}`,
    `EX4 MACD decay: ${asset._ex?.criteria?.ex4_macd_hist_decay ?? 'null'}`,
    `EX5 Vol exh:    ${asset._ex?.criteria?.ex5_volume_exhaustion ?? 'null'}`,
    `RSI divergência:${asset._ex?.rsi_divergence ?? tc.rsi_divergence ?? 'null'}`,
    `MACD slope:     ${asset._ex?.macd_hist_slope ?? tc.macd_hist_slope ?? 'null'}`,
    `Vol exhaustion: ${asset._ex?.vol_exhaustion ?? tc.vol_exhaustion ?? 'null'}`,
    `AB4 EX override:${asset.ab4_ex_override ?? 'null'}`,
    `Pré-reversão:   ${asset.ab4_pre_reversal_flag ?? 'null'}`,
    `Candle EX badge:${asset.candle_ex_badge ?? 'null'}`,
    ``,
    `=== CONSENSO DERIVADO — A AUDITAR ===`,
    `Badge:        ${consensus ?? 'null'}`,
    `JD Score:     ${asset._consensus8?.score ?? 'null'} / ±8`,
    ``,
    `=== SUA TAREFA: AUDITORIA COMPLETA ===`,
    `Recalcule e valide cada framework. Identifique inconsistências e erros.`,
    ``,
    `REGRAS AUTOMÁTICAS EX SCORE (obrigatório verificar):`,
    `→ FAIL se _ex.score >= 3 E consenso=BULLISH E jd_score >= +5: "EX_HIGH ignorado — BULLISH com exaustão ativa é inválido"`,
    `→ WARN se ab4_ex_override=true E ab4_reversal_risk != HIGH: "EX Override declarado mas reversal_risk não reflete HIGH"`,
    `→ WARN se _ex.score >= 3 E consenso != DEFENSIVE: "EX_HIGH sem DEFENSIVE — verificar override"`,
    `→ WARN se rsi_divergence=BEARISH E ct_confidence=BUY: "CT rebaixamento por divergência não aplicado"`,
    ``,
    `Retorne EXATAMENTE este JSON:`,
    `{`,
    `  "audit_score": <0-100, onde 100=perfeito sem falhas>,`,
    `  "verdict": "PASS|WARN|FAIL",`,
    `  "flags": ["descrição breve do problema encontrado", ...],`,
    ``,
    `  "gs_audit": {`,
    `    "rating_justified": <true|false>,`,
    `    "upside_real_pct": <(target_base - price) / price * 100>,`,
    `    "upside_consistent_with_rating": <true|false>,`,
    `    "moat_vs_fundamentals": "CONSISTENT|QUESTIONABLE|INCONSISTENT",`,
    `    "stop_below_support": <true|false|null>,`,
    `    "note": "nota de auditoria 1 frase"`,
    `  },`,
    ``,
    `  "bw_audit": {`,
    `    "risk_score_recalculated": <1-10 sua estimativa independente>,`,
    `    "score_delta": <abs(declarado - recalculado)>,`,
    `    "max_position_consistent": <true|false>,`,
    `    "recession_drawdown_plausible": <true|false>,`,
    `    "note": "nota de auditoria 1 frase"`,
    `  },`,
    ``,
    `  "ct_audit": {`,
    `    "rr_recalculated": <(alvo1 - entry_tech) / (entry_tech - stop_tech) ou null se dados faltam>,`,
    `    "rr_delta": <abs(declarado - recalculado) ou null>,`,
    `    "rr_acceptable": <true se >=1.5>,`,
    `    "rsi_signal_consistent": <true|false>,`,
    `    "trend_alignment": "ALIGNED|MIXED|CONFLICTING",`,
    `    "ma_cross_consistent": <true|false|null>,`,
    `    "note": "nota de auditoria 1 frase"`,
    `  },`,
    ``,
    `  "jp_audit": {`,
    `    "flow_skew_aligned": <true se flow_signal e options_skew apontam mesma direção>,`,
    `    "implied_move_plausible": <true se hv20 disponível e implied_move < hv20 * 1.5>,`,
    `    "play_consistent_with_flow": <true|false>,`,
    `    "note": "nota de auditoria 1 frase"`,
    `  },`,
    ``,
    `  "cross_framework": {`,
    `    "alignment": "STRONG|MODERATE|WEAK|CONFLICTING",`,
    `    "gs_bw_conflict": <true se BUY + EXTREME risk>,`,
    `    "gs_ct_conflict": <true se GS BUY mas CT BEARISH trend_monthly>,`,
    `    "gs_jp_conflict": <true se GS BUY mas JP SHORT_HEAVY positioning>,`,
    `    "consensus_correct": <true|false — badge bate com os sinais>,`,
    `    "note": "nota de auditoria cross-framework 1 frase"`,
    `  },`,
    ``,
    `  "data_quality": {`,
    `    "null_count": <número de campos críticos nulos>,`,
    `    "outliers": ["campo: valor suspeito", ...],`,
    `    "score": <0-100>`,
    `  },`,
    ``,
    `  "auditor_override": {`,
    `    "suggested_rating": "BUY|HOLD|SELL|NO_CHANGE",`,
    `    "suggested_consensus": "BULLISH|NEUTRAL|BEARISH|NO_CHANGE",`,
    `    "rationale": "1 frase justificando o override, ou null se NO_CHANGE"`,
    `  }`,
    `}`,
  ];

  return lines.join('\n');
}

// ── CALL CLAUDE AUDITOR ───────────────────────────────────────────────────────
async function auditWithClaude(asset) {
  const body = {
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: AUDITOR_SYSTEM,
    messages: [{ role: 'user', content: buildAuditPrompt(asset) }],
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
    throw new Error(`Claude Auditor ${r.status}: ${err.slice(0, 200)}`);
  }

  const j = await r.json();
  const text = j.content?.[0]?.text || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`Auditor sem JSON: ${text.slice(0, 100)}`);
  return JSON.parse(match[0]);
}

// ── SLEEP ─────────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── SUMMARY STATS ─────────────────────────────────────────────────────────────
function printSummary(results) {
  const pass = results.filter(r => r.audit?.verdict === 'PASS').length;
  const warn = results.filter(r => r.audit?.verdict === 'WARN').length;
  const fail = results.filter(r => r.audit?.verdict === 'FAIL').length;
  const avgScore = Math.round(
    results.reduce((s, r) => s + (r.audit?.audit_score ?? 0), 0) / results.length
  );

  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  AUDITORIA CONCLUÍDA — ${results.length} ativos`);
  console.log(`${'─'.repeat(56)}`);
  console.log(`  ✅  PASS  ${pass.toString().padStart(3)}   ⚠️  WARN  ${warn.toString().padStart(3)}   ❌  FAIL  ${fail.toString().padStart(3)}`);
  console.log(`  Score médio: ${avgScore}/100`);
  console.log(`${'─'.repeat(56)}`);

  const flagged = results
    .filter(r => (r.audit?.flags?.length ?? 0) > 0)
    .sort((a, b) => (a.audit?.audit_score ?? 0) - (b.audit?.audit_score ?? 0))
    .slice(0, 5);

  if (flagged.length) {
    console.log(`  Ativos com mais flags:`);
    for (const r of flagged) {
      const f = r.audit.flags.slice(0, 2).join(' · ');
      console.log(`  ${r.ticker.padEnd(8)} [${r.audit.verdict}] score ${r.audit.audit_score}  — ${f}`);
    }
  }

  const overrides = results.filter(
    r => r.audit?.auditor_override?.suggested_rating !== 'NO_CHANGE' ||
         r.audit?.auditor_override?.suggested_consensus !== 'NO_CHANGE'
  );
  if (overrides.length) {
    console.log(`${'─'.repeat(56)}`);
    console.log(`  Overrides sugeridos pelo auditor:`);
    for (const r of overrides) {
      const o = r.audit.auditor_override;
      console.log(`  ${r.ticker.padEnd(8)} rating→${o.suggested_rating}  consenso→${o.suggested_consensus}`);
      if (o.rationale) console.log(`           ${o.rationale}`);
    }
  }
  console.log(`${'═'.repeat(56)}\n`);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  JD MARKET ANALYSIS — AUDITOR v1`);
  console.log(`  ${new Date().toLocaleString('pt-BR')}`);
  console.log(`${'═'.repeat(56)}\n`);

  if (!fs.existsSync(DATA_PATH)) {
    console.error('❌  data.json não encontrado. Execute rotina_v5.mjs primeiro.');
    process.exit(1);
  }

  const raw   = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  const assets = Array.isArray(raw) ? raw : (raw.assets || []);

  if (!assets.length) {
    console.error('❌  data.json sem ativos.');
    process.exit(1);
  }

  console.log(`📋  ${assets.length} ativos para auditar\n`);

  const results = [];

  for (let i = 0; i < assets.length; i++) {
    const asset  = assets[i];
    const ticker = asset._ticker || `ATIVO_${i}`;
    const h      = asset._hg || {};

    process.stdout.write(
      `[${(i+1).toString().padStart(2)}/${assets.length}]  ${ticker.padEnd(8)} R$${(h.price||0).toFixed(2).padStart(7)}  auditando...`
    );

    let audit = null;
    let error = null;

    try {
      audit = await auditWithClaude(asset);
      const verdict = audit.verdict || '???';
      const score   = audit.audit_score ?? '??';
      const flags   = audit.flags?.length ?? 0;
      const icon    = verdict === 'PASS' ? '✅' : verdict === 'WARN' ? '⚠️ ' : '❌';
      process.stdout.write(`  ${icon} ${verdict}  score ${score}  flags ${flags}\n`);
    } catch(e) {
      error = e.message;
      process.stdout.write(`  💥 ERRO: ${e.message.slice(0, 60)}\n`);
    }

    results.push({ ticker, audit, error });

    if (i < assets.length - 1) await sleep(DELAY_MS);
  }

  // ── GRAVA audit.json ───────────────────────────────────────────────────────
  const output = {
    generated_at:    Date.now(),
    generated_at_br: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    data_source_age: raw.generated_at
      ? Math.round((Date.now() - raw.generated_at) / 60000) + ' min'
      : 'unknown',
    total_assets:    results.length,
    pass:  results.filter(r => r.audit?.verdict === 'PASS').length,
    warn:  results.filter(r => r.audit?.verdict === 'WARN').length,
    fail:  results.filter(r => r.audit?.verdict === 'FAIL').length,
    avg_score: Math.round(
      results.reduce((s, r) => s + (r.audit?.audit_score ?? 0), 0) / results.length
    ),
    results,
  };

  fs.writeFileSync(AUDIT_PATH, JSON.stringify(output, null, 2));

  printSummary(results);

  console.log(`✅  audit.json salvo — ${results.length} auditorias`);
  console.log(`⏱️   ${new Date().toLocaleString('pt-BR')}\n`);
}

main().catch(e => { console.error('❌ ', e.message); process.exit(1); });
