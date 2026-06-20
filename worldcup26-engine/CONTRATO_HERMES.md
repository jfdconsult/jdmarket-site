# Contrato HERMES ↔ Nuvem (JD-BET World Cup)

O painel do JD-BET roda na **nuvem** (GitHub Actions no repo `jdmarket-site`; Vercel
publica no push). A nuvem **processa e publica** o painel. O **HERMES** é a *antena*:
coleta o que a nuvem não consegue e **empurra os dados crus para o repositório**.

> **Descoberta importante:** os placares desta Copa **não existem** na ESPN/SofaScore
> (partidas/datas não batem). Então **odds E resultados** precisam vir do HERMES.
> A nuvem sozinha só consegue montar o painel a partir do que o HERMES empurrar.

Sempre `git pull` ANTES de cada push (a nuvem também commita no mesmo repo).
NÃO mexer em `public/worldcup26/` nem nos `dashboard_*.js` — disso a nuvem cuida.

---

## PEDIDO 1 — ODDS (1x/dia)

Empurrar o feed simples **completo** (o que cobre os 73 jogos — atenção: é o da pasta
**SEM acento** `Area de Trabalho`, ~114 KB / 73 jogos; o da pasta com acento tem só 24).

**Destino no repo:**
`worldcup26-engine/data/feed/lottu_world_cup_odds.csv`
`worldcup26-engine/data/dados/ODDS_LOTTU/processed/lottu_world_cup_odds.csv`

```bash
cd C:\dev\jdmarket-site && git pull --quiet
copy "<...Area de Trabalho...>\ODDS_LOTTU\processed\lottu_world_cup_odds.csv" worldcup26-engine\data\feed\lottu_world_cup_odds.csv
copy "<...>\lottu_world_cup_odds.csv" worldcup26-engine\data\dados\ODDS_LOTTU\processed\lottu_world_cup_odds.csv
git add worldcup26-engine/data/feed worldcup26-engine/data/dados/ODDS_LOTTU
git commit -m "hermes: odds do dia" && git push
```

---

## PEDIDO 2 — RESULTADOS (após cada jogo)

Exportar do SQLite `worldcup_2026_resultados_selecoes.sqlite` a tabela
`fifa_matchcenter_daily_matches` (só ~31 linhas com placar) para um CSV pequeno no repo.
A nuvem vai ler esse CSV para atualizar o histórico/track record após cada jogo.

**Destino no repo:**
`worldcup26-engine/data/dados/BANCO_RESULTADOS_SELECOES/fifa_matchcenter_daily_matches.csv`

```python
# exportar a tabela inteira (é pequena) p/ CSV, no repo
import sqlite3, csv
con = sqlite3.connect(r"<...>\BANCO_RESULTADOS_SELECOES\worldcup_2026_resultados_selecoes.sqlite")
cur = con.execute("SELECT * FROM fifa_matchcenter_daily_matches")
cols = [d[0] for d in cur.description]
with open(r"C:\dev\jdmarket-site\worldcup26-engine\data\dados\BANCO_RESULTADOS_SELECOES\fifa_matchcenter_daily_matches.csv","w",encoding="utf-8",newline="") as f:
    w = csv.writer(f); w.writerow(cols); w.writerows(cur.fetchall())
```
Depois: `git pull && git add ... && git commit -m "hermes: resultados" && git push`.

> **Status:** a nuvem ainda precisa de um ajuste para LER esse CSV (em vez do SQLite de
> 113 MB). O Assistente faz esse ajuste; quando estiver pronto, este pedido fica ativo.

---

_Atualizado pelo Assistente em 2026-06-20. Coordenação em C:\dev\CHANGELOG_AGENTES.md._
