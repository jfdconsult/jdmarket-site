# Contrato HERMES ↔ Nuvem (JD-BET World Cup)

O painel do JD-BET agora roda na **nuvem** (GitHub Actions no repo `jdmarket-site`,
Vercel publica no push). A nuvem **processa e publica**. O **HERMES** é a *antena*:
coleta o que a nuvem não consegue (scraping de odds, bloqueado em IP de nuvem) e
**empurra os dados crus para o repositório**. A nuvem cuida do resto (painel + deploy).

---

## Pedido ATUAL ao HERMES — ODDS, 1x/dia

Depois da coleta diária da Lottu, copie o feed para dentro do repositório e dê push:

**Arquivo de origem (já existe):**
`...\WORLD CUP 2026\DADOS DO DIA\ODDS_LOTTU\processed\lottu_world_cup_odds.csv`

**Destino no repositório:**
`C:\dev\jdmarket-site\worldcup26-engine\data\feed\lottu_world_cup_odds.csv`

**Comandos (1x/dia, após coletar):**
```bash
cd C:\dev\jdmarket-site
git pull --quiet
copy "<origem>\lottu_world_cup_odds.csv" worldcup26-engine\data\feed\lottu_world_cup_odds.csv
git add worldcup26-engine/data/feed/lottu_world_cup_odds.csv
git commit -m "hermes: odds do dia"
git push
```

> **Importante:** sempre `git pull` ANTES (a nuvem também commita no mesmo repo).
> NÃO precisa mexer no painel, nos dashboards `.js`, nem no deploy — disso a nuvem cuida.
> Formato do CSV: **mantenha o mesmo de hoje** (o motor da nuvem lê sem alteração).

---

## Resultados após cada jogo — POR ENQUANTO é a nuvem que busca

A nuvem vai buscar placar/xG via **SofaScore (HTTP)**. Se isso for bloqueado em
produção, este contrato será estendido para o HERMES também empurrar um
`worldcup26-engine/data/results/resultados.csv`
(colunas: `fixture_id,home_team,away_team,home_score,away_score,status,xg_home,xg_away`).
**Ainda não é necessário** — aviso aqui quando/se precisar.

---

_Atualizado pelo Assistente em 2026-06-20. Coordenação registrada em C:\dev\CHANGELOG_AGENTES.md._
