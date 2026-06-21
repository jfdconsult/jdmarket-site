# Contrato HERMES ↔ Nuvem (JD-BET World Cup) — PRONTO

A nuvem (GitHub Actions no repo `jdmarket-site`) **já monta e publica** painel + v3 +
histórico/resultados sozinha, 24h, sem o PC. Só falta o **HERMES empurrar 2 coisas**
pro repositório. A nuvem assume dali (processa + publica via Vercel).

> A ESPN/SofaScore **não têm** os jogos desta Copa, então odds E resultados vêm do HERMES.
> SEMPRE `git pull` ANTES de cada push. NUNCA mexer em `public/worldcup26/` nem nos `.js`.

Caminho do repo no PC: `C:\dev\jdmarket-site`

---

## ✅ PEDIDO 1 — ODDS (1x/dia)

Empurrar o feed que cobre os **73 jogos** — é o da pasta **SEM acento**
`...\Area de Trabalho\...\ODDS_LOTTU\processed\lottu_world_cup_odds.csv` (~114 KB, 73 jogos).
⚠️ O da pasta COM acento tem só 24 jogos — NÃO usar esse.

Copiar para **2 destinos** no repo e dar push:
```
worldcup26-engine\data\feed\lottu_world_cup_odds.csv
worldcup26-engine\data\dados\ODDS_LOTTU\processed\lottu_world_cup_odds.csv
```

---

## ✅ PEDIDO 2 — RESULTADOS (após cada jogo)

Gerar um **SQLite enxuto** (só ~1,5 MB) a partir do banco grande de 113 MB — é o mesmo
banco, sem a única tabela gigante (`odds_lottu_detalhadas_rolling_48_72h`, que é texto cru
inútil aqui). A nuvem lê esse banco enxuto para atualizar os placares/histórico.

**Destino no repo:**
`worldcup26-engine\data\dados\BANCO_RESULTADOS_SELECOES\worldcup_results_small.sqlite`

**Script pronto (rodar após cada jogo, ou de hora em hora durante os jogos):**
```python
import sqlite3, os
SRC = r"C:\Users\jfdco\OneDrive\Area de Trabalho\WORLD CUP 2026\DADOS DO DIA\BANCO_RESULTADOS_SELECOES\worldcup_2026_resultados_selecoes.sqlite"
OUT = r"C:\dev\jdmarket-site\worldcup26-engine\data\dados\BANCO_RESULTADOS_SELECOES\worldcup_results_small.sqlite"
EXCLUDE = {"odds_lottu_detalhadas_rolling_48_72h"}   # tabela gigante (texto cru) — fora
if os.path.exists(OUT): os.remove(OUT)
src = sqlite3.connect(SRC); dst = sqlite3.connect(OUT)
for name, sql in src.execute("SELECT name, sql FROM sqlite_master WHERE type='table'").fetchall():
    if name in EXCLUDE or not sql:
        continue
    dst.execute(sql)
    rows = src.execute(f'SELECT * FROM "{name}"').fetchall()
    if rows:
        ph = ",".join("?" * len(rows[0]))
        dst.executemany(f'INSERT INTO "{name}" VALUES ({ph})', rows)
dst.commit(); dst.close()
print("OK: banco enxuto gerado")
```

---

## Comandos git (após gerar os arquivos dos 2 pedidos)

```bash
cd C:\dev\jdmarket-site
git pull --no-edit
git add worldcup26-engine/data/feed worldcup26-engine/data/dados
git commit -m "hermes: odds + resultados do dia"
git push
```

Pronto. A nuvem (rodando diário + de 2 em 2h) detecta os dados novos, regenera painel +
resultados e publica no jdmarket.ai sozinha.

---

_Atualizado pelo Assistente em 2026-06-21. Lado da nuvem 100% pronto e testado._
