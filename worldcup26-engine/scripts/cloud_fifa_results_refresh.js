const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV = path.join(ROOT, 'data', 'dados', 'BANCO_RESULTADOS_SELECOES', 'fifa_matchcenter_daily_matches.csv');
const HEADERS = ['captured_at','source','source_url','match_date_query','match_id_fifa','match_no','event_name','home_team','away_team','kickoff','location','city','referee','home_score','away_score','status','yellow_cards_home','yellow_cards_away','red_cards_home','red_cards_away','goals_home_detail','goals_away_detail','raw_text_path','data_quality_notes'];

function csvEscape(v) { v = String(v ?? ''); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }
function parseCsv(text) {
  const rows=[]; let row=[], cur='', q=false;
  for (let i=0;i<text.length;i++) { const c=text[i], n=text[i+1];
    if (q && c==='"' && n==='"') { cur+='"'; i++; continue; }
    if (c==='"') { q=!q; continue; }
    if (!q && c===',') { row.push(cur); cur=''; continue; }
    if (!q && (c==='\n'||c==='\r')) { if(c==='\r'&&n==='\n') i++; row.push(cur); cur=''; if(row.some(x=>x!=='')) rows.push(row); row=[]; continue; }
    cur+=c;
  }
  if(cur||row.length){ row.push(cur); rows.push(row); }
  if(!rows.length) return [];
  const h=rows.shift(); return rows.map(r=>Object.fromEntries(h.map((x,i)=>[x,r[i]??''])));
}
function writeCsv(file, rows) {
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file, HEADERS.join(',')+'\n'+rows.map(r=>HEADERS.map(h=>csvEscape(r[h])).join(',')).join('\n')+'\n', 'utf8');
}
async function accept(page) {
  for (const t of ["I'm OK with that", 'Reject All', 'Accept']) {
    try { await page.getByText(t, {exact:false}).click({timeout:1000}); await page.waitForTimeout(300); return; } catch {}
  }
}
function norm(s) { return (s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
function parseMatchText(text, row) {
  const home = row.home_team, away = row.away_team;
  const event = `${home} vs. ${away}`;
  let idx = text.indexOf(event);
  if (idx < 0) idx = text.indexOf(`${home} vs ${away}`);
  if (idx < 0) {
    const h = norm(home), a = norm(away);
    const lines = text.split('\n').map(x=>x.trim()).filter(Boolean);
    const joined = lines.join(' | ');
    if (!norm(joined).includes(h) || !norm(joined).includes(a)) return null;
    idx = 0;
  }
  const seg = text.slice(idx, idx + 1400).replace(/\u00a0/g, ' ');
  let m = seg.match(new RegExp(home.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + "\\s*\\n\\s*(\\d+)\\s*-\\s*(\\d+)\\s*\\n" + away.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), 'i'));
  if (!m) m = seg.match(/\n\s*(\d+)\s*-\s*(\d+)\s*\n/);
  const full = /Full Time|\bFT\b/i.test(seg);
  const live = /Live|Half Time|Second Half|First Half/i.test(seg);
  const scheduled = !m && (/\bJUN 2026\b|\d{1,2}\s*:\s*\d{2}/i.test(seg));
  const out = {};
  if (m) { out.home_score = m[1]; out.away_score = m[2]; }
  if (full) out.status = 'full_time'; else if (live) out.status = 'scheduled_or_live'; else if (scheduled) out.status = row.status || 'scheduled_or_live';
  const y = seg.match(/Yellow Cards\s*\n\s*(\d+)\s*\n\s*(\d+)/i);
  if (y) { out.yellow_cards_home = y[1]; out.yellow_cards_away = y[2]; }
  const r = seg.match(/Red Cards\s*\n\s*(\d+)\s*\n\s*(\d+)/i);
  if (r) { out.red_cards_home = r[1]; out.red_cards_away = r[2]; }
  return out;
}
(async () => {
  if (!fs.existsSync(CSV)) throw new Error(`missing ${CSV}`);
  const rows = parseCsv(fs.readFileSync(CSV, 'utf8'));
  const browser = await chromium.launch({headless:true});
  const captured_at = new Date().toISOString();
  let changed = 0, checked = 0;
  for (const row of rows) {
    if (!row.source_url || !row.source_url.startsWith('http')) continue;
    // Keep bounded: check non-final rows and the most recent final rows, because FIFA may fill cards/referee late.
    if (row.status === 'full_time' && row.home_score !== '' && row.away_score !== '') continue;
    checked++;
    const page = await browser.newPage({viewport:{width:1365,height:1800}, locale:'en-US', timezoneId:'America/Sao_Paulo'});
    try {
      await page.goto(row.source_url, {waitUntil:'domcontentloaded', timeout:60000});
      await page.waitForTimeout(5000);
      await accept(page);
      const text = await page.locator('body').innerText({timeout:20000});
      const parsed = parseMatchText(text, row);
      if (parsed) {
        for (const [k,v] of Object.entries(parsed)) if (v !== undefined && String(v) !== String(row[k]||'')) { row[k] = String(v); changed++; }
        row.captured_at = captured_at;
        row.source = 'FIFA Match Centre cloud rendered page';
        row.data_quality_notes = 'Cloud GitHub Actions render; scores/cards parsed when visible; no login/bypass.';
      }
    } catch (e) {
      row.data_quality_notes = `cloud_refresh_error: ${e.message}`;
    } finally { await page.close().catch(()=>{}); }
  }
  await browser.close();
  writeCsv(CSV, rows);
  console.log(JSON.stringify({checked, changed, rows: rows.length}, null, 2));
})().catch(e => { console.error(e); process.exit(1); });
