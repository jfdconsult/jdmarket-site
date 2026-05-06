# Pipeline JD Market — B3 Analysis

A pasta `pipeline/b3/` deve conter os scripts do B3 ANALISYS:

```
pipeline/b3/
  rotina_v5.mjs      (30 ativos públicos — GS/BW/CT)
  auditor_v1.mjs     (auditoria adversarial)
  rotina_50.mjs      (50 ativos dinâmicos)
  rotina_ab.mjs      (Al Brooks AB1-AB4)
  .env               (HG_KEY, BRAPI_TOKEN, ANTHROPIC_KEY)
```

## Setup inicial

1. Copiar scripts de `HARPIAN/B3 ANALISYS/` para `pipeline/b3/`:

```bash
node pipeline/setup_pipeline.mjs
```

2. Criar `.env.local` com as variáveis (ver `.env.example`)

3. Rodar seed para popular o Neon com os dados existentes:

```bash
node --env-file=.env.local pipeline/seed_from_local.mjs
```

## GitHub Actions

O workflow `.github/workflows/daily-analysis.yml` roda automaticamente às 17:05 BRT (seg-sex).

Secrets necessários no repositório GitHub:
- `DATABASE_URL`
- `ANTHROPIC_KEY`
- `HG_KEY`
- `BRAPI_TOKEN`
- `SITE_URL` (ex: https://www.jdmarket.ai)
- `REVALIDATE_SECRET`
