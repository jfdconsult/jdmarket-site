# HANDOFF — Painel World Cup 2026 no jdmarket.ai

**Data:** 2026-06-10  
**De:** João Daniel (produto/inteligência)  
**Para:** Responsável pelo jdmarket.ai (front-end/deploy)  
**URL em produção:** https://www.jdmarket.ai/worldcup26

---

## 1. O que é

Um painel de inteligência de apostas para a Copa do Mundo 2026 que roda em
**www.jdmarket.ai/worldcup26**. O painel cruza 3 fontes de dados (modelo interno,
odds de casas de apostas, mercados preditivos) para identificar oportunidades
com valor esperado positivo.

O painel é **100% estático** (HTML + JS puro) servido pela pasta `public/` do Next.js.
Ele **não usa React, não usa APIs do jdmarket, não depende de banco de dados**.
Funciona de forma independente do resto do site.

---

## 2. Arquitetura no repositório

```
jdmarket-site/                          ← repo GitHub (jfdconsult/jdmarket-site)
├── next.config.ts                      ← contém a regra de rewrite (ver abaixo)
├── public/
│   └── worldcup26/                     ← PASTA DO PAINEL (3 arquivos)
│       ├── index.html                  ← Dashboard UI completo (61 KB)
│       ├── dashboard_data.js           ← Dados vivos — atualizado 2x/dia (889 KB)
│       └── dashboard_history.js        ← Histórico de precisão (stub por enquanto)
├── app/                                ← Resto do jdmarket (NÃO MEXER para o painel)
│   ├── page.tsx                        ← Home (painel B3)
│   ├── v2/                             ← Preview intelligence
│   ├── sobre/                          ← Página About
│   └── api/                            ← APIs do B3 (nada a ver com Copa)
└── ...
```

### Regra de roteamento (next.config.ts)

A única mudança feita no Next.js foi adicionar um **rewrite** para que `/worldcup26`
(sem barra final) sirva o `index.html`:

```typescript
async rewrites() {
  return [
    {
      source: '/worldcup26',
      destination: '/worldcup26/index.html',
    },
  ];
},
```

**Importante:** Os scripts dentro do `index.html` usam **caminhos absolutos**:
```html
<script src="/worldcup26/dashboard_data.js"></script>
<script src="/worldcup26/dashboard_history.js"></script>
```
Isso é necessário porque o rewrite faz o browser achar que está em `/worldcup26`
(sem barra), e caminhos relativos resolveriam para `/dashboard_data.js` (404).

### Acesso
- `www.jdmarket.ai/worldcup26` → funciona (rewrite)
- `www.jdmarket.ai/worldcup26/` → funciona (Next.js serve index.html de subpasta)
- `www.jdmarket.ai/worldcup26/index.html` → funciona (arquivo direto)

---

## 3. Como os dados são atualizados

O painel **não busca dados em tempo real**. Os dados vêm pré-computados no arquivo
`dashboard_data.js`, que é **regenerado 2x por dia** e commitado no repo.

### Fluxo de atualização

```
[Motor Python bet_math.py]
        ↓ gera
[dashboard_data.js]  ←  arquivo com window.WC_DATA = {...}
        ↓ copia para
[public/worldcup26/dashboard_data.js]
        ↓ git commit + push
[GitHub main]
        ↓ auto-deploy
[Vercel] → www.jdmarket.ai/worldcup26 atualizado
```

### Script de automação

**Arquivo:** `C:\Users\jfdco\OneDrive\Área de Trabalho\WORLD CUP 2026\PAINEL DE APOSTAS\update_and_deploy.py`

O que ele faz:
1. Roda `bet_math.py dashboard` (gera os dados)
2. Copia `dashboard_data.js`, `dashboard_history.js` e `index.html` para `public/worldcup26/`
3. Faz `git add` + `git commit` + `git push` no repo jdmarket-site
4. **Trava automática durante jogos** (não atualiza de kickoff -15min até +3h)

### Tarefas agendadas (Claude scheduled tasks)

Dois jobs rodam automaticamente:
- **worldcup26-update-morning** → 08:00 BRT
- **worldcup26-update-afternoon** → 14:00 BRT

Ambos executam o pipeline completo (motor → sync → git push → Vercel redeploy).

---

## 4. Estrutura do dashboard_data.js

O arquivo exporta um objeto global:

```javascript
window.WC_DATA = {
  meta: {
    generated: "2026-06-10T14:25:50",
    model_version: "dixon-coles-v2",
    weights: { model: 0.40, bookmaker: 0.40, prediction: 0.20 },
    sources: { bookmaker: "Lottu", prediction: "Manifold" }
  },
  games: [
    {
      id: "...",
      home: "México", away: "África do Sul",
      date: "2026-06-11", time: "16:00",
      home_xg: 1.72, away_xg: 0.81,
      model_probs: { home: 0.53, draw: 0.24, away: 0.23 },
      book_fair_probs: { home: 0.52, draw: 0.25, away: 0.23 },
      prediction_probs: { home: 0.69, draw: 0.20, away: 0.11 },
      consensus: { home: 0.55, draw: 0.23, away: 0.22 },
      best_plays: [...],
      all_markets_evaluated: [
        // TODOS os mercados derivados: Over/Under, BTTS, Handicap, Placar, etc.
        { name: "Mais de 2.5", type: "over_under", prob_model: 0.55,
          book_odd: 2.10, book_fair_prob: 0.46, ev: 0.08, edge: 9,
          confidence: "alta", convergence: "3/3" },
        ...
      ]
    },
    // ... 7 jogos
  ]
}
```

### Abas do painel (renderizadas pelo index.html)

| Aba | O que mostra | Dados usados |
|-----|-------------|-------------|
| Visao Geral | Resumo dos 7 jogos, consenso, melhores apostas | `games[].consensus`, `best_plays` |
| Jogos | Detalhe por jogo: xG, probabilidades, 3 pilares | `games[]` completo |
| Risco x Retorno | TODAS as oportunidades tiered (Alta/Boa/Complementar/Radar) | `all_markets_evaluated[]` |
| Historico | Track record de acertos (futuro) | `window.WC_HISTORY` |

---

## 5. Metodologia dos 3 Pilares (resumo)

O painel cruza 3 fontes independentes para calibrar probabilidades:

| Pilar | Peso | Fonte | O que faz |
|-------|------|-------|-----------|
| Modelo interno | 40% | Dixon-Coles sobre banco histórico | Calcula xG e probabilidades por Poisson |
| Bookmaker (Lottu) | 40% | Odds de casa de apostas | Remove margem (devig) para achar prob. justa |
| Mercado preditivo (Manifold) | 20%* | Prediction market | Prob. de crowd, ajustada por volume |

*O peso do 3o pilar varia: volume >= M$750 → 20%, 250-750 → 14%, <250 → 8%.
Sem dados do 3o pilar: modelo 55% / bookmaker 45%.

**Mercados derivados** (Over/Under, BTTS, Handicap, Placar Exato, Total de Gols) são
computados a partir da **matriz de Poisson** do modelo interno, e então comparados com
as odds da casa para achar discrepâncias.

---

## 6. Commits no repositório (histórico relevante)

```
1b54798  fix: numero WhatsApp correto
4e7b8bd  feat: header com botoes COPA 26 + pagina /sobre
421c94e  feat: remove /jd-bet, adds Disclaimer modal
315fe64  data: pesos recalibrados 40/40/20
c955a34  fix: caminhos absolutos + rewrite /worldcup26
db8dfef  fix: redirect /worldcup26 (tentativa anterior, substituída)
4cebc7e  feat: adiciona painel World Cup 2026 em /worldcup26
```

---

## 7. Para o desenvolvedor — o que saber

### Se precisar atualizar o painel manualmente
```bash
cd C:\dev\jdmarket-site
# Copie o novo dashboard_data.js para public/worldcup26/
git add public/worldcup26/dashboard_data.js
git commit -m "worldcup26: atualização manual"
git push
# Vercel redeploya automaticamente em ~1-2 minutos
```

### Se precisar mudar o visual do painel
Edite `public/worldcup26/index.html`. Tudo está num único arquivo (CSS + HTML + JS).
Não tem framework, não tem build step, não tem dependências. Editar e fazer push.

### Se precisar mudar os dados
O `dashboard_data.js` é gerado pelo motor Python. Para rodar manualmente:
```bash
cd C:\Users\jfdco\.claude\skills\world-cup-bet-intelligence-engine\scripts
python bet_math.py dashboard
```
Isso gera o arquivo na pasta do painel E na pasta de deploy.

### Se precisar remover o painel após a Copa
1. Delete a pasta `public/worldcup26/`
2. Remova o bloco `rewrites()` do `next.config.ts`
3. Commit e push

### Problemas conhecidos
- **Build leva 1-2 min:** Após push, a URL pode mostrar versão antiga por 1-2 minutos
  até o build da Vercel completar.
- **Cache do browser:** Se os dados parecem velhos, force refresh (Ctrl+F5).
- **dashboard_history.js está vazio:** O histórico de precisão será populado conforme
  jogos terminem e resultados sejam registrados.

---

## 8. Mapa completo de arquivos (fora do repo)

Para contexto — estes arquivos ficam na máquina do João, **não precisam ir pro repo**:

| Local | O que é |
|-------|---------|
| `Área de Trabalho\WORLD CUP 2026\PAINEL DE APOSTAS\` | Cópia master do HTML + script de deploy |
| `Área de Trabalho\WORLD CUP 2026\DADOS DO DIA\` | Inputs: odds Lottu, banco histórico, Manifold |
| `.claude\skills\world-cup-bet-intelligence-engine\` | Motor Python (bet_math.py) + referências |
| `.claude\scheduled-tasks\worldcup26-update-*\` | Definições das tarefas automáticas 2x/dia |

---

## 9. Resumo visual

```
                    ┌──────────────────────┐
                    │  Lottu (odds 1X2)    │ ← Pilar 2 (40%)
                    └──────────┬───────────┘
                               │
┌──────────────────┐           │         ┌───────────────────────┐
│ Banco Histórico  │───► bet_math.py ◄───│ Manifold (prediction) │ ← Pilar 3 (20%)
│ (Dixon-Coles)    │    Pilar 1 (40%)    └───────────────────────┘
└──────────────────┘           │
                               ▼
                    ┌──────────────────────┐
                    │  dashboard_data.js   │
                    └──────────┬───────────┘
                               │ git push
                               ▼
                    ┌──────────────────────┐
                    │  Vercel (auto-build) │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ jdmarket.ai/worldcup26│
                    └──────────────────────┘
```

---

**Qualquer dúvida, falar com João Daniel.**
