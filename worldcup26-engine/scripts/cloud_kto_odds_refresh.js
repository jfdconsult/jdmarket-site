const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FEED = path.join(ROOT, 'data', 'feed', 'lottu_world_cup_odds.csv');
const DADOS_FEED = path.join(ROOT, 'data', 'dados', 'ODDS_LOTTU', 'processed', 'lottu_world_cup_odds.csv');
const URL = 'https://www.kto.bet.br/esportes/futebol';
const COMP = 'Internacional - Copa do Mundo';
const HEADERS = ['captured_at','source','event_name','sport','competition','market','selection','odd','url','period','bookmaker_event_id','raw_text','key'];

function csvEscape(v){v=String(v??'');return /[",\n\r]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}
function parseCsv(text){const rows=[];let row=[],cur='',q=false;for(let i=0;i<text.length;i++){const c=text[i],n=text[i+1];if(q&&c==='"'&&n==='"'){cur+='"';i++;continue}if(c==='"'){q=!q;continue}if(!q&&c===','){row.push(cur);cur='';continue}if(!q&&(c==='\n'||c==='\r')){if(c==='\r'&&n==='\n')i++;row.push(cur);cur='';if(row.some(x=>x!==''))rows.push(row);row=[];continue}cur+=c}if(cur||row.length){row.push(cur);rows.push(row)}if(!rows.length)return[];const h=rows.shift();return rows.map(r=>Object.fromEntries(h.map((x,i)=>[x,r[i]??''])))}
function writeCsv(file, rows){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,HEADERS.join(',')+'\n'+rows.map(r=>HEADERS.map(h=>csvEscape(r[h])).join(',')).join('\n')+'\n','utf8')}
function keyOf(r){return [r.source||'kto',r.sport||'football',r.competition||COMP,r.event_name,r.market||'Resultado Final 1X2',r.selection].join('|')}
function normTeam(s){let n=(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();const a={
  'catar':'qatar','cabo verde':'cape verde','congo':'dr congo','rd congo':'dr congo','republica democratica do congo':'dr congo','coreia do sul':'south korea','republica da coreia':'south korea','chequia':'czech republic','tchequia':'czech republic','republica tcheca':'czech republic','eua':'united states','estados unidos':'united states','costa do marfim':'ivory coast','curacao':'curacao','irã':'ir iran','ira':'ir iran'
};return a[n]||n}
function splitEvent(ev){const p=(ev||'').split(/\s+x\s+|\s+vs\.\s+|\s+vs\s+/i);return p.length>=2?[p[0].trim(),p.slice(1).join(' x ').trim()]:['','']}
function buildMatcher(rows){const m=new Map();for(const r of rows){const [h,a]=splitEvent(r.event_name);if(!h||!a)continue;const k=[normTeam(h),normTeam(a)].sort().join('|');if(!m.has(k))m.set(k,{event_name:r.event_name,home:h,away:a,period:r.period})}return (home,away)=>m.get([normTeam(home),normTeam(away)].sort().join('|'))||null}
async function accept(page){for(const t of ['Aceitar',"I'm OK with that",'Accept','Ok']){try{await page.getByText(t,{exact:false}).click({timeout:1000});await page.waitForTimeout(300);return}catch{}}}
function parseKto(text){const lines=text.split('\n').map(x=>x.trim()).filter(Boolean);const out=[];const start=lines.findIndex((x,i)=>x==='Copa do Mundo 2026'&&lines.slice(i,i+8).includes('1')&&lines.slice(i,i+8).includes('X')&&lines.slice(i,i+8).includes('2'));const end=lines.findIndex((x,i)=>i>start && /^Brasil\s*\/|Brasileir|Copa Libertadores|Premier League/i.test(x));const slice=lines.slice(start>=0?start:0,end>0?end:lines.length);for(let i=0;i<slice.length;i++){if(slice[i]!=='CA')continue;const home=slice[i-2],away=slice[i-1],o1=slice[i+1],ox=slice[i+2],o2=slice[i+3];if(!home||!away||!/^\d+(\.\d+)?$/.test(o1)||!/^\d+(\.\d+)?$/.test(ox)||!/^\d+(\.\d+)?$/.test(o2))continue;out.push({home,away,o1,ox,o2,raw:slice.slice(Math.max(0,i-6),Math.min(slice.length,i+12)).join(' | ')})}return out}
(async()=>{
  const existing=fs.existsSync(FEED)?parseCsv(fs.readFileSync(FEED,'utf8')):[];
  const match=buildMatcher(existing);
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:2200},locale:'pt-BR',timezoneId:'America/Sao_Paulo'});
  await page.goto(URL,{waitUntil:'domcontentloaded',timeout:70000});
  await page.waitForTimeout(8000); await accept(page);
  for(let i=0;i<5;i++){await page.mouse.wheel(0,1200);await page.waitForTimeout(300)}
  const text=await page.locator('body').innerText({timeout:20000});
  await browser.close();
  const captured_at=new Date().toISOString().replace(/\.\d+Z$/,'Z');
  const fresh=[];
  for(const ev of parseKto(text)){
    const ex=match(ev.home,ev.away); if(!ex) continue;
    const selMap=new Map([[normTeam(ev.home),ex.home],[normTeam(ev.away),ex.away]]);
    const triples=[[ev.home,ev.o1],['Empate',ev.ox],[ev.away,ev.o2]];
    for(const [sel0,odd] of triples){const sel=sel0==='Empate'?'Empate':(selMap.get(normTeam(sel0))||sel0);const r={captured_at,source:'kto',event_name:ex.event_name,sport:'football',competition:COMP,market:'Resultado Final 1X2',selection:sel,odd,url:URL,period:ex.period||'',bookmaker_event_id:'',raw_text:ev.raw,key:''};r.key=keyOf(r);fresh.push(r)}
  }
  const existingNoKto=existing.filter(r=>(r.source||'').toLowerCase()!=='kto');
  if(fresh.length<15){console.warn(`KTO low coverage (${fresh.length}); keeping existing feed without changing KTO rows`);console.log(JSON.stringify({fresh_rows:fresh.length,merged_rows:existing.length,fallback:'no_kto_update'},null,2));return}
  const byKey=new Map(existingNoKto.map(r=>[r.key||keyOf(r),r]));for(const r of fresh)byKey.set(r.key,r);const merged=[...byKey.values()];
  writeCsv(FEED,merged);writeCsv(DADOS_FEED,merged);
  console.log(JSON.stringify({fresh_rows:fresh.length,fresh_events:new Set(fresh.map(r=>r.event_name)).size,merged_rows:merged.length,merged_events:new Set(merged.map(r=>r.event_name)).size},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
