# 🗺️ COORDENADAS — JD-BET World Cup (mapa para agentes)

Documento único para qualquer agente (WhatsApp/CPA, jornalista esportivo, etc.)
**entender, avaliar e rodar** o projeto na nuvem. Leia isto primeiro.

---

## 1. O QUE É
Painel público de apostas da Copa (JD-BET): modelo próprio vs odds do mercado, EV,
melhores apostas, e histórico de acertos. Roda **na nuvem 24h** e publica sozinho.

- **Site no ar:** https://www.jdmarket.ai/worldcup26
- **Repositório:** github.com/jfdconsult/jdmarket-site  · local: `C:\dev\jdmarket-site`
- **Skill-fonte (motor original):** `C:\Users\jfdco\.claude\skills\world-cup-bet-intelligence-engine`
- **Log de coordenação entre agentes:** `C:\dev\CHANGELOG_AGENTES.md`

## 2. ARQUITETURA (como funciona)
```
COLETA (scraping)            NUVEM (GitHub Actions, 1x/dia 06:00 BRT)        Vercel
──────────────────           ──────────────────────────────────────         ──────
odds Lottu  ─┐               (A) Atualiza inputs:                            site
resultados  ─┤  push repo →      cloud_lottu_odds_refresh.js   (odds)    →   jdmarket.ai
FIFA        ─┘  OU scraping       cloud_fifa_results_refresh.js (placar)      /worldcup26
                na propria        cloud_sync_results_sqlite.py  (sqlite)
                nuvem          (B) Regenera painel:
                                  bet_math.py dashboard
                                  bet_math_v3_discipline.py enrich-dashboard
                                  update_history.py refresh
                               (C) Commit + push (Vercel publica)
```
Duas fontes possíveis de input (redundantes):
- **HERMES (PC)** empurra os dados crus pro repo — ver `CONTRATO_HERMES.md`.
- **Nuvem** tenta coletar sozinha (playwright); se o site bloquear, mantém o último válido.

## 3. ONDE FICA CADA COISA (no repo)
| Caminho | O que é |
|---|---|
| `public/worldcup26/` | site publicado (index.html + dashboard_*.js) — **NÃO editar à mão** |
| `worldcup26-engine/scripts/` | motor Python + scripts de coleta na nuvem (.js) |
| `worldcup26-engine/data/feed/` | feed de odds (lottu_world_cup_odds.csv, **73 jogos**) |
| `worldcup26-engine/data/dados/ODDS_LOTTU/processed/` | mesmo feed (estrutura DADOS DO DIA) |
| `worldcup26-engine/data/dados/BANCO_RESULTADOS_SELECOES/worldcup_results_small.sqlite` | banco enxuto (1,5 MB) de resultados/disciplina |
| `worldcup26-engine/data/db/` | CSVs de histórico das seleções (ratings) |
| `.github/workflows/worldcup26.yml` | o robô da nuvem |
| `worldcup26-engine/CONTRATO_HERMES.md` | o que o HERMES empurra |

## 4. COMO RODAR / OPERAR
- **Disparar manualmente:** `gh workflow run worldcup26.yml` (ou GitHub → Actions → "WorldCup26 - Painel (nuvem)" → Run workflow).
- **Ver execuções:** `gh run list --workflow=worldcup26.yml` · logs: `gh run view <id> --log`.
- **Rodar o motor local (igual à nuvem) p/ testar:** definir env e rodar os 3 scripts:
  ```
  WC_DB_DIR=.../data/db  WC_FEED_DIR=.../data/feed  WC_DADOS_DIR=.../data/dados
  WC_RESULTS_DB=.../data/dados/BANCO_RESULTADOS_SELECOES/worldcup_results_small.sqlite
  WC_DEPLOY_DIR=.../public/worldcup26
  python bet_math.py dashboard && python bet_math_v3_discipline.py enrich-dashboard && python update_history.py refresh
  ```
- **Portabilidade:** o motor lê tudo por env vars (`WC_*`). Sem env = modo PC (OneDrive).

## 5. REGRAS DE OURO / ARMADILHAS (aprendido na marra)
1. **NUNCA** deixar `dashboard_data.js` passar de ~3 MB. O campo `all_book_markets`
   empilhava 72h de capturas e inflou p/ **102 MB → Vercel parou de publicar** (site
   congelava). Fix: `_compact_book_markets` em bet_math.py. Se voltar a inchar, é regressão.
2. **Feed correto = 73 jogos** (pasta SEM acento `Area de Trabalho`). O da pasta COM
   acento tem só 24 — não usar.
3. **Banco de resultados:** usar o **enxuto** (`worldcup_results_small.sqlite`, 1,5 MB),
   nunca o de 113 MB. É o grande sem a tabela `odds_lottu_detalhadas_rolling_48_72h`.
4. **Trava de segurança no workflow:** não publica painel < 40 jogos, vazio, ou com
   `"error"`. Se uma coleta falhar, mantém a versão boa anterior.
5. **Antes de qualquer push no repo: `git pull` primeiro** (vários agentes + a nuvem commitam).
6. `public/worldcup26/*.js` são **gerados** — nunca editar à mão.

## 6. STATUS (2026-06-21)
- ✅ Site no ar, 73 jogos, histórico com resultados.
- ✅ Nuvem regenera + publica sozinha (diário 06:00 BRT + disparo manual).
- 🟡 Coleta na nuvem (playwright) em validação pelo agente jornalista; HERMES (PC) é o
  fallback que já funciona (push de odds + sqlite enxuto).

---
_Mantido pelos agentes. Atualize este mapa quando mudar a arquitetura._
