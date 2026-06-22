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

## 🟡 PEDIDO 3 — ESCALAÇÃO DO ÁRBITRO por jogo (desbloqueia "dados dos árbitros")

Hoje o v3 sai com `referee.assigned_name = null` em **72/72** jogos
(`assignment_status = "not_available_or_not_loaded"`). A disciplina dos TIMES já flui
(cartões esperados), mas o **nome + perfil do árbitro do jogo** não aparece em lugar nenhum
(nem no site, nem no JD TRAINEE) porque a escalação não está casada com a fixture.

**O que falta (lado HERMES/motor de resultados):** popular, no SQLite, o casamento
árbitro→jogo — provavelmente as tabelas que já existem:
`fixture_referee_assignments_2026` (72 linhas) + `referee_worldcup_history` (493) +
`referee_roster_2026_sportingnews` (170). O v3 já SABE ler `referee.assigned_name`/
`referee_strictness_score`; só não está vindo preenchido. Quando vier, **o site e o
JD TRAINEE mostram nome + rigor do árbitro automaticamente** (o código dos dois lados já está pronto).

> Entra no mesmo `worldcup_results_small.sqlite` do PEDIDO 2 — não precisa arquivo novo,
> só garantir que as tabelas de árbitro estejam preenchidas e casadas à fixture.

> ✅ **Feito parcialmente (2026-06-22):** `cloud_referee_assignment_sync.py` casou **20 jogos
> JÁ REALIZADOS**. ⚠️ **Falta o principal: escalar árbitro nos jogos FUTUROS** — é onde o dado
> tem valor (prever cartões antes do jogo). Hoje os jogos do dia saem sem árbitro. Quando os
> futuros forem casados, site e JD TRAINEE já mostram nome+rigor automaticamente.
>
> ⚠️ **Importante (conflito resolvido):** a tarefa local `WC2026_AUTO_POST_MATCH` foi
> **DESABILITADA** porque regenerava os dashboards do SQLite do OneDrive (sem árbitro/KTO) e
> atropelava a nuvem. **A NUVEM agora é fonte única** (roda de 3 em 3h e faz tudo). Se for
> religar qualquer pipeline local que dê `git push` nos `dashboard_*.js`, ela TEM que usar o
> mesmo `worldcup_results_small.sqlite` (com árbitros) e o feed com KTO — senão zera de novo.

## 🟡 PEDIDO 4 — 2ª CASA DE ODDS (desbloqueia "apostas de valor")

O motor de valor só recomenda aposta (`best_plays`) com **2 casas de odds**; hoje só há a
**Lottu**. Com 1 casa, o JD TRAINEE mostra a leitura modelo×casa mas **não libera as apostas
de valor** (fica "confiança baixa / teste").

**Decisão do João:** qual 2ª casa adicionar. Já existe pasta candidata `ODDS_KTO_CANDIDATA`
em DADOS DO DIA (a Betano bloqueou automação). **Trabalho:** scraper da 2ª casa → entra no
mesmo feed/merge → o `dashboard_data.js` passa a gerar `best_plays` → site e JD TRAINEE só
renderizam (o gancho já existe nos dois).

---

_Atualizado pelo Assistente em 2026-06-22. Lado da nuvem + JD TRAINEE prontos; faltam
PEDIDOS 3 e 4 (dados que só o HERMES/motor de resultados produz)._
