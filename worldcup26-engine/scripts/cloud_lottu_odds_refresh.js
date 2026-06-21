const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FEED = path.join(ROOT, 'data', 'feed', 'lottu_world_cup_odds.csv');
const DADOS_FEED = path.join(ROOT, 'data', 'dados', 'ODDS_LOTTU', 'processed', 'lottu_world_cup_odds.csv');
const URL = 'https://www.lottu.bet.br/s/CLE?group_type=LEAGUE&identifier=sr:tournament:16&name=Copa%20do%20Mundo';
const COMP = 'Internacional - Copa do Mundo';
const HEADERS = ['captured_at','source','event_name','sport','competition','market','selection','odd','url','period','bookmaker_event_id','raw_text','key'];

function csvEscape(v) {
  v = String(v ?? '');
  return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
}
function parseCsv(text) {
  const rows = [];
  let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i+1];
    if (q && c === '"' && n === '"') { cur += '"'; i++; continue; }
    if (c === '"') { q = !q; continue; }
    if (!q && c === ',') { row.push(cur); cur = ''; continue; }
    if (!q && (c === '\n' || c === '\r')) {
      if (c === '\r' && n === '\n') i++;
      row.push(cur); cur = '';
      if (row.some(x => x !== '')) rows.push(row);
      row = [];
      continue;
    }
    cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift();
  return rows.map(r => Object.fromEntries(headers.map((h,i)=>[h, r[i] ?? ''])));
}
function writeCsv(file, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const body = HEADERS.join(',') + '\n' + rows.map(r => HEADERS.map(h => csvEscape(r[h])).join(',')).join('\n') + '\n';
  fs.writeFileSync(file, body, 'utf8');
}
function keyOf(r) { return [r.source||'lottu', r.sport||'football', r.competition||COMP, r.event_name, r.market||'Resultado Final 1X2', r.selection].join('|'); }
function normTeam(s) {
  let n = (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const aliases = {
    'tchequia':'czech republic', 'republica tcheca':'czech republic', 'czechia':'czech republic',
    'coreia do sul':'south korea', 'republica da coreia':'south korea', 'korea republic':'south korea',
    'rd congo':'dr congo', 'republica democratica do congo':'dr congo', 'congo dr':'dr congo',
    'eua':'usa', 'estados unidos':'usa', 'united states':'usa',
  };
  return aliases[n] || n;
}
function splitEvent(ev) { const p = (ev||'').split(/\s+x\s+|\s+vs\.\s+|\s+vs\s+/i); return p.length >= 2 ? [p[0].trim(), p.slice(1).join(' x ').trim()] : ['', '']; }
function buildExistingMatcher(rows) {
  const byPeriodTeams = new Map();
  for (const r of rows) {
    const [h,a] = splitEvent(r.event_name);
    if (!h || !a || !r.period) continue;
    const k = `${r.period}|${[normTeam(h), normTeam(a)].sort().join('|')}`;
    if (!byPeriodTeams.has(k)) byPeriodTeams.set(k, { event_name:r.event_name, home:h, away:a });
  }
  return (ev) => {
    const k = `${ev.date} ${ev.time}|${[normTeam(ev.home_team), normTeam(ev.away_team)].sort().join('|')}`;
    return byPeriodTeams.get(k) || null;
  };
}
function parseCardText(txt) {
  const l = txt.split('\n').map(x => x.trim()).filter(Boolean);
  if (!/^\d{2}\/\d{2}$/.test(l[0] || '') || !/^\d{2}:\d{2}$/.test(l[1] || '')) return null;
  for (let i = 0; i < l.length - 5; i++) {
    if (l[i] === '1' && /^\d+[.,]\d+/.test(l[i+1] || '') && l[i+2].toLowerCase() === 'x' && /^\d+[.,]\d+/.test(l[i+3] || '') && l[i+4] === '2' && /^\d+[.,]\d+/.test(l[i+5] || '')) {
      const home = l[i-2], away = l[i-1];
      if (!home || !away) return null;
      return {date:l[0], time:l[1], event_name:`${home} x ${away}`, home_team:home, away_team:away, odd1:l[i+1].replace(',','.'), oddx:l[i+3].replace(',','.'), odd2:l[i+5].replace(',','.'), raw:l.slice(0,i+6).join(' | ')};
    }
  }
  return null;
}
async function accept(page) {
  for (const t of ['Ok, entendi', "I'm OK with that", 'Aceitar', 'Accept']) {
    try { await page.getByText(t, { exact: false }).click({ timeout: 1200 }); await page.waitForTimeout(400); return; } catch {}
  }
}
(async () => {
  const existing = fs.existsSync(FEED) ? parseCsv(fs.readFileSync(FEED, 'utf8')) : [];
  const matchExisting = buildExistingMatcher(existing);
  const beforeEvents = new Set(existing.map(r => r.event_name).filter(Boolean));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 }, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' });
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 70000 });
  await page.waitForTimeout(7000);
  await accept(page);
  for (let i=0;i<8;i++) { await page.mouse.wheel(0, 1600); await page.waitForTimeout(300); }
  const cards = await page.locator('.card-container.is-desktop').evaluateAll(els => els.map(el => el.innerText)).catch(()=>[]);
  await browser.close();
  const captured_at = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  const fresh = [];
  for (const txt of cards) {
    const ev = parseCardText(txt);
    if (!ev) continue;
    const existingMatch = matchExisting(ev);
    const eventName = existingMatch ? existingMatch.event_name : ev.event_name;
    const homeName = existingMatch ? existingMatch.home : ev.home_team;
    const awayName = existingMatch ? existingMatch.away : ev.away_team;
    const selMap = new Map([
      [normTeam(ev.home_team), homeName],
      [normTeam(ev.away_team), awayName],
      ['empate', 'Empate'],
    ]);
    for (const [sel0, odd] of [[ev.home_team, ev.odd1], ['Empate', ev.oddx], [ev.away_team, ev.odd2]]) {
      const sel = selMap.get(normTeam(sel0)) || sel0;
      const row = {captured_at, source:'lottu', event_name:eventName, sport:'football', competition:COMP, market:'Resultado Final 1X2', selection:sel, odd, url:URL, period:`${ev.date} ${ev.time}`, bookmaker_event_id:'', raw_text:ev.raw, key:''};
      row.key = keyOf(row);
      fresh.push(row);
    }
  }
  if (fresh.length < 30) throw new Error(`Lottu scrape low coverage: ${fresh.length} rows`);
  const byKey = new Map(existing.map(r => [r.key || keyOf(r), r]));
  for (const r of fresh) byKey.set(r.key, r);
  const merged = [...byKey.values()];
  const afterEvents = new Set(merged.map(r => r.event_name).filter(Boolean));
  if (beforeEvents.size >= 40 && afterEvents.size < beforeEvents.size) throw new Error(`Refusing to shrink feed events ${beforeEvents.size}->${afterEvents.size}`);
  if (afterEvents.size < 40) throw new Error(`Refusing low event coverage ${afterEvents.size}`);
  writeCsv(FEED, merged);
  writeCsv(DADOS_FEED, merged);
  console.log(JSON.stringify({fresh_rows:fresh.length, fresh_events:new Set(fresh.map(r=>r.event_name)).size, merged_rows:merged.length, merged_events:afterEvents.size}, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
