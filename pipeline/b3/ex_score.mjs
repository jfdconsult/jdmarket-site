// ex_score.mjs
// Calcula EX Score (exaustão de topo) e EX_BOTTOM_SCORE (exaustão de fundo)
// a partir de dados OHLC brutos — sem chamadas externas.
//
// Input : barsDescending [{date,open,high,low,close,volume}] mais recente primeiro
//         tech            objeto _tech do Claude (week52_high/low, avg_vol_7d, ...)
// Output: objeto _ex com score, classification, criteria, rsi_divergence, etc.

// ── Helpers de indicadores ────────────────────────────────────────────────────

function computeRSISeries(closes) {
  const n = closes.length;
  const rsi = new Array(n).fill(null);
  if (n < 15) return rsi;

  let avgGain = 0, avgLoss = 0;
  for (let i = 1; i <= 14; i++) {
    const d = closes[i] - closes[i - 1];
    if (d > 0) avgGain += d; else avgLoss += -d;
  }
  avgGain /= 14; avgLoss /= 14;
  rsi[14] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);

  for (let i = 15; i < n; i++) {
    const d = closes[i] - closes[i - 1];
    avgGain = (avgGain * 13 + Math.max(d, 0)) / 14;
    avgLoss = (avgLoss * 13 + Math.max(-d, 0)) / 14;
    rsi[i] = avgLoss === 0 ? 100 : 100 - 100 / (1 + avgGain / avgLoss);
  }
  return rsi;
}

function computeEMA(values, period) {
  const k = 2 / (period + 1);
  const ema = new Array(values.length).fill(null);
  if (values.length < period) return ema;

  let sum = 0;
  for (let i = 0; i < period; i++) sum += values[i];
  ema[period - 1] = sum / period;

  for (let i = period; i < values.length; i++) {
    ema[i] = values[i] * k + ema[i - 1] * (1 - k);
  }
  return ema;
}

function computeMACDHistSeries(closes) {
  const ema12 = computeEMA(closes, 12);
  const ema26 = computeEMA(closes, 26);
  const macdLine = closes.map((_, i) =>
    ema12[i] !== null && ema26[i] !== null ? ema12[i] - ema26[i] : null
  );
  // Para Signal, preenche nulos com 0 só para estabilizar EMA
  const filled = macdLine.map(v => v ?? 0);
  const signal = computeEMA(filled, 9);
  return macdLine.map((m, i) =>
    m !== null && signal[i] !== null ? m - signal[i] : null
  );
}

function findSwingHighs(closes, lookback = 20) {
  const start = Math.max(1, closes.length - lookback);
  const highs = [];
  for (let i = start; i < closes.length - 1; i++) {
    if (closes[i] > closes[i - 1] && closes[i] > closes[i + 1]) highs.push(i);
  }
  return highs;
}

function findSwingLows(closes, lookback = 20) {
  const start = Math.max(1, closes.length - lookback);
  const lows = [];
  for (let i = start; i < closes.length - 1; i++) {
    if (closes[i] < closes[i - 1] && closes[i] < closes[i + 1]) lows.push(i);
  }
  return lows;
}

// ── Export principal ──────────────────────────────────────────────────────────

export function calcExScore(barsDescending, tech = {}) {
  const EMPTY = {
    score: 0, classification: 'EX_LOW', bottom_score: 0,
    criteria: {
      ex1_rsi_overbought_days: false, ex2_near_52w_high: false,
      ex3_rsi_divergence: false, ex4_macd_hist_decay: false,
      ex5_volume_exhaustion: false,
    },
    rsi_divergence: 'NONE', macd_hist_slope: 'FLAT', vol_exhaustion: 'NONE',
    override_triggered: null,
  };

  if (!barsDescending?.length || barsDescending.length < 10) return EMPTY;

  // Cronológico (mais antigo primeiro) para cálculos de série
  const bars   = [...barsDescending].reverse();
  const closes = bars.map(b => b.close);
  const vols   = bars.map(b => b.volume);
  const n      = bars.length;

  const rsiSeries  = computeRSISeries(closes);
  const macdHist   = computeMACDHistSeries(closes);
  const validHist  = macdHist.filter(h => h !== null);

  const avgVol7d   = tech.avg_vol_7d
    || vols.slice(-7).reduce((a, b) => a + b, 0) / Math.min(7, n);
  const week52High = tech.week52_high || Math.max(...closes);
  const week52Low  = tech.week52_low  || Math.min(...closes);

  // ── EX TOPO ───────────────────────────────────────────────────────────────

  // EX1: RSI > 70 por 5+ dias consecutivos (da ponta)
  let ex1Streak = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (rsiSeries[i] !== null && rsiSeries[i] > 70) ex1Streak++;
    else break;
  }
  const ex1 = ex1Streak >= 5;

  // EX2: Preço dentro de 3% da máxima 52W por 10+ dias consecutivos
  let ex2Streak = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (closes[i] >= week52High * 0.97) ex2Streak++;
    else break;
  }
  const ex2 = ex2Streak >= 10;

  // EX3: Divergência bearish de RSI (2 swing highs, preço sobe, RSI cai)
  const shIdxs = findSwingHighs(closes, 20);
  let ex3 = false;
  if (shIdxs.length >= 2) {
    const sh1 = shIdxs[shIdxs.length - 2];
    const sh2 = shIdxs[shIdxs.length - 1];
    if (
      closes[sh2] > closes[sh1] &&
      rsiSeries[sh1] !== null && rsiSeries[sh2] !== null &&
      rsiSeries[sh2] < rsiSeries[sh1]
    ) ex3 = true;
  }

  // EX4: Histograma MACD positivo mas 3 barras consecutivas decrescentes
  let ex4 = false;
  if (validHist.length >= 3) {
    const h = validHist.slice(-3);
    ex4 = h[0] > 0 && h[1] > 0 && h[2] > 0 && h[2] < h[1] && h[1] < h[0];
  }

  // EX5: Volume secando em rally OU candle de distribuição no topo
  let ex5 = false;
  if (n >= 3 && avgVol7d > 0) {
    const c3 = closes.slice(-3);
    const v3 = vols.slice(-3);
    const isRally = c3[2] > c3[0];
    // Condição A: volume abaixo de 80% da média 7D em 2 das 3 barras durante rally
    if (isRally && v3.filter(v => v < avgVol7d * 0.8).length >= 2) ex5 = true;
    // Condição B: volume extremo (>2x) com fechamento na metade inferior, perto do topo 52W
    if (!ex5) {
      const lb = bars[n - 1];
      const mid = (lb.high + lb.low) / 2;
      if (vols[n - 1] > avgVol7d * 2 && lb.close < mid && lb.close >= week52High * 0.97) ex5 = true;
    }
  }

  // ── EX FUNDO (espelho) ────────────────────────────────────────────────────

  let exb1Streak = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (rsiSeries[i] !== null && rsiSeries[i] < 30) exb1Streak++;
    else break;
  }
  const exb1 = exb1Streak >= 5;

  let exb2Streak = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (closes[i] <= week52Low * 1.03) exb2Streak++;
    else break;
  }
  const exb2 = exb2Streak >= 10;

  const slIdxs = findSwingLows(closes, 20);
  let exb3 = false;
  if (slIdxs.length >= 2) {
    const sl1 = slIdxs[slIdxs.length - 2];
    const sl2 = slIdxs[slIdxs.length - 1];
    if (
      closes[sl2] < closes[sl1] &&
      rsiSeries[sl1] !== null && rsiSeries[sl2] !== null &&
      rsiSeries[sl2] > rsiSeries[sl1]
    ) exb3 = true;
  }

  let exb4 = false;
  if (validHist.length >= 3) {
    const h = validHist.slice(-3);
    exb4 = h[0] < 0 && h[1] < 0 && h[2] < 0 && h[2] > h[1] && h[1] > h[0];
  }

  let exb5 = false;
  if (n >= 3 && avgVol7d > 0) {
    const c3 = closes.slice(-3);
    const v3 = vols.slice(-3);
    const isDown = c3[2] < c3[0];
    if (isDown && v3.filter(v => v < avgVol7d * 0.7).length >= 2) exb5 = true;
    if (!exb5) {
      const lb = bars[n - 1];
      const mid = (lb.high + lb.low) / 2;
      if (vols[n - 1] > avgVol7d * 2.5 && lb.close > mid && lb.close <= week52Low * 1.03) exb5 = true;
    }
  }

  // ── Scores e classificação ────────────────────────────────────────────────

  const score       = [ex1, ex2, ex3, ex4, ex5].filter(Boolean).length;
  const bottomScore = [exb1, exb2, exb3, exb4, exb5].filter(Boolean).length;
  const classification = score >= 3 ? 'EX_HIGH' : score === 2 ? 'EX_MODERATE' : 'EX_LOW';

  // MACD hist slope (últimas 3 barras válidas)
  let macdHistSlope = 'FLAT';
  if (validHist.length >= 3) {
    const h = validHist.slice(-3);
    if (h[2] > h[1] && h[1] > h[0]) macdHistSlope = 'RISING';
    else if (h[2] < h[1] && h[1] < h[0]) macdHistSlope = 'DECLINING';
  }

  const rsiDivergence = ex3 ? 'BEARISH' : exb3 ? 'BULLISH' : 'NONE';
  const volExhaustion = ex5 ? 'TOP_EXHAUSTION' : exb5 ? 'BOTTOM_EXHAUSTION' : 'NONE';

  return {
    score,
    classification,
    bottom_score: bottomScore,
    criteria: {
      ex1_rsi_overbought_days: ex1,
      ex2_near_52w_high:       ex2,
      ex3_rsi_divergence:      ex3,
      ex4_macd_hist_decay:     ex4,
      ex5_volume_exhaustion:   ex5,
    },
    rsi_divergence: rsiDivergence,
    macd_hist_slope: macdHistSlope,
    vol_exhaustion:  volExhaustion,
    override_triggered: null, // preenchido em calcConsensus8
  };
}
