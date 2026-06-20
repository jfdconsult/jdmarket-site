"""
wc_config.py — Configuração centralizada do World Cup Bet Intelligence Engine
==============================================================================
Único ponto de verdade para: paths, aliases de times, constantes do modelo.
Todos os outros scripts importam daqui em vez de definir suas próprias cópias.
"""

import csv
import os
import sys
from typing import Dict, List, Optional, Tuple

# Force UTF-8 output on Windows
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

HERE = os.path.dirname(os.path.abspath(__file__))

# ── Paths ────────────────────────────────────────────────────────────────────
# Portabilidade PC <-> nuvem: se as variaveis de ambiente abaixo estiverem
# definidas (ex.: no GitHub Actions/Linux), elas tem prioridade. Sem elas, cai
# no comportamento Windows/OneDrive de sempre. Assim o mesmo codigo roda nos dois.
#   WC_ROOT_DIR   -> raiz "WORLD CUP 2026" (contem DADOS DO DIA, PAINEL, etc.)
#   WC_FEED_DIR   -> pasta do feed de odds (lottu_world_cup_odds.csv)
#   WC_DB_DIR     -> pasta do banco de resultados/fixtures
#   WC_DEPLOY_DIR -> pasta publica do site (onde gravam os dashboard_*.js)
#   WC_REPO_DIR   -> raiz do repositorio git

# OneDrive root varies due to accent issues on Windows
_DESKTOP_VARIANTS = [
    r"C:\Users\jfdco\OneDrive\Area de Trabalho",
    r"C:\Users\jfdco\OneDrive\Área de Trabalho",
]

_ENV_WC_ROOT = os.environ.get("WC_ROOT_DIR")
WC_ROOT_CANDIDATES = ([_ENV_WC_ROOT] if _ENV_WC_ROOT else []) + \
    [os.path.join(d, "WORLD CUP 2026") for d in _DESKTOP_VARIANTS]

# subpaths usam os.path.join p/ funcionar em Windows e Linux
DB_SUBPATH = os.path.join("DADOS DO DIA", "BANCO_RESULTADOS_SELECOES")
FEED_SUBPATH = os.path.join("DADOS DO DIA", "ODDS_LOTTU", "processed")
PAINEL_SUBPATH = "PAINEL DE APOSTAS"

DEPLOY_DIR = os.environ.get("WC_DEPLOY_DIR", r"C:\dev\jdmarket-site\public\worldcup26")
REPO_DIR = os.environ.get("WC_REPO_DIR", r"C:\dev\jdmarket-site")

FIXTURES_CSV = "fixtures_primeira_fase_lottu.csv"
LOTTU_CSV = "lottu_world_cup_odds.csv"


def _find_path(*subpaths: str) -> Optional[str]:
    """Resolve a path under the WC root, trying all desktop variants."""
    for root in WC_ROOT_CANDIDATES:
        for sub in subpaths:
            p = os.path.join(root, sub)
            if os.path.exists(p):
                return p
    return None


def resolve_db_dir() -> Optional[str]:
    env = os.environ.get("WC_DB_DIR")
    if env and os.path.isdir(env):
        return env
    return _find_path(DB_SUBPATH)


def resolve_feed_dir() -> Optional[str]:
    env = os.environ.get("WC_FEED_DIR")
    if env and os.path.isdir(env):
        return env
    return _find_path(FEED_SUBPATH)


def resolve_painel_dir() -> Optional[str]:
    env = os.environ.get("WC_PAINEL_DIR")
    if env and os.path.isdir(env):
        return env
    return _find_path(PAINEL_SUBPATH)


def dashboard_dirs() -> List[str]:
    """All directories where dashboard JS files should be written."""
    dirs = []
    p = resolve_painel_dir()
    if p:
        dirs.append(p)
    if os.path.isdir(DEPLOY_DIR):
        dirs.append(DEPLOY_DIR)
    return dirs


# ── Team Name Normalization ──────────────────────────────────────────────────
# Single source of truth for mapping variant names to a canonical English name.
TEAM_ALIASES: Dict[str, str] = {
    # ESPN variants
    "czechia": "Czech Republic",
    "bosnia-herzegovina": "Bosnia and Herzegovina",
    "bosnia herzegovina": "Bosnia and Herzegovina",
    "bosnia": "Bosnia and Herzegovina",
    "republic of ireland": "Ireland",
    "ivory coast": "Ivory Coast",
    "cote d'ivoire": "Ivory Coast",
    "côte d'ivoire": "Ivory Coast",
    "korea republic": "South Korea",
    "korea": "South Korea",
    "dr congo": "DR Congo",
    "congo dr": "DR Congo",
    "democratic republic of the congo": "DR Congo",
    "república democrática do congo": "DR Congo",
    "rd congo": "DR Congo",
    "curacao": "Curaçao",
    "curaçao": "Curaçao",
    # Portuguese names
    "eua": "United States",
    "estados unidos": "United States",
    "usa": "United States",
    "us": "United States",
    "méxico": "Mexico",
    "africa do sul": "South Africa",
    "áfrica do sul": "South Africa",
    "coreia do sul": "South Korea",
    "república tcheca": "Czech Republic",
    "rep. tcheca": "Czech Republic",
    "bósnia & herzegovina": "Bosnia and Herzegovina",
    "bósnia e herzegovina": "Bosnia and Herzegovina",
    "canadá": "Canada",
    "paraguai": "Paraguay",
    "suíça": "Switzerland",
    "marrocos": "Morocco",
    "escócia": "Scotland",
    "alemanha": "Germany",
    "holanda": "Netherlands",
    "japão": "Japan",
    "suécia": "Sweden",
    "tunísia": "Tunisia",
    "espanha": "Spain",
    "cabo verde": "Cape Verde",
    "bélgica": "Belgium",
    "egito": "Egypt",
    "arábia saudita": "Saudi Arabia",
    "uruguai": "Uruguay",
    "irã": "Iran",
    "nova zelândia": "New Zealand",
    "frança": "France",
    "iraque": "Iraq",
    "noruega": "Norway",
    "argélia": "Algeria",
    "áustria": "Austria",
    "jordânia": "Jordan",
    "inglaterra": "England",
    "croácia": "Croatia",
    "gana": "Ghana",
    "panamá": "Panama",
    "uzbequistão": "Uzbekistan",
    "colômbia": "Colombia",
    "costa do marfim": "Ivory Coast",
    "equador": "Ecuador",
    "turquia": "Turkey",
    "austrália": "Australia",
    "dinamarca": "Denmark",
    "nigéria": "Nigeria",
    "senegal": "Senegal",
    "portugal": "Portugal",
    "itália": "Italy",
    "polônia": "Poland",
    "costa rica": "Costa Rica",
    "haiti": "Haiti",
    "brasil": "Brazil",
    "qatar": "Qatar",
    "argentina": "Argentina",
}


def normalize_team(name: str) -> str:
    """Normalize a team name to its canonical English form."""
    import unicodedata
    n = name.strip().lower()
    # Remove accents for matching
    nfkd = unicodedata.normalize("NFKD", n)
    n_ascii = "".join(c for c in nfkd if not unicodedata.combining(c))
    # Try exact match first (with accents)
    if n in TEAM_ALIASES:
        return TEAM_ALIASES[n]
    # Try without accents
    if n_ascii in TEAM_ALIASES:
        return TEAM_ALIASES[n_ascii]
    # Return title-cased original
    return name.strip().title()


# ── Schedule (loaded dynamically from CSV) ───────────────────────────────────

_SCHEDULE_CACHE: Optional[Dict[int, Tuple[str, str, str, str]]] = None


def load_schedule() -> Dict[int, Tuple[str, str, str, str]]:
    """Load the complete 72-game schedule from fixtures CSV + Lottu feed.
    Returns: {fixture_id: (date_iso, time_brt, home_en, away_en)}
    """
    global _SCHEDULE_CACHE
    if _SCHEDULE_CACHE is not None:
        return _SCHEDULE_CACHE

    db_dir = resolve_db_dir()
    feed_dir = resolve_feed_dir()
    if not db_dir or not feed_dir:
        return {}

    fixtures_path = os.path.join(db_dir, FIXTURES_CSV)
    feed_path = os.path.join(feed_dir, LOTTU_CSV)

    if not os.path.isfile(fixtures_path) or not os.path.isfile(feed_path):
        return {}

    # Load fixtures
    with open(fixtures_path, "r", encoding="utf-8-sig") as f:
        fixtures = list(csv.DictReader(f))

    # Load Lottu feed to get dates/times
    with open(feed_path, "r", encoding="utf-8-sig") as f:
        feed = list(csv.DictReader(f))

    # Build event_name → period mapping (first occurrence)
    events: Dict[str, str] = {}
    for r in feed:
        name = r.get("event_name", "")
        period = r.get("period", "")
        if name and period and name not in events:
            events[name] = period

    # Build schedule
    schedule: Dict[int, Tuple[str, str, str, str]] = {}
    for fix in fixtures:
        fid = int(fix["fixture_id"])
        name_pt = fix.get("event_name_pt", "")
        home_en = fix.get("home_team", "")
        away_en = fix.get("away_team", "")

        period = events.get(name_pt, "")
        if not period:
            continue

        parts = period.split(" ")
        date_part = parts[0]  # DD/MM
        time_part = parts[1] if len(parts) > 1 else "00:00"
        day, month = date_part.split("/")
        date_iso = f"2026-{month}-{day}"
        schedule[fid] = (date_iso, time_part, home_en, away_en)

    _SCHEDULE_CACHE = schedule
    return schedule


# ── ESPN API ─────────────────────────────────────────────────────────────────
ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world"
ESPN_HEADERS = {"User-Agent": "Mozilla/5.0"}

# ESPN uses slightly different team names
ESPN_TO_CANONICAL: Dict[str, str] = {
    "Czechia": "Czech Republic",
    "Bosnia-Herzegovina": "Bosnia and Herzegovina",
    "Republic of Ireland": "Ireland",
    "Korea Republic": "South Korea",
    "Curacao": "Curaçao",
}


def normalize_espn_team(name: str) -> str:
    """Normalize an ESPN team name to canonical form."""
    return ESPN_TO_CANONICAL.get(name, name)


# ── Model Constants ──────────────────────────────────────────────────────────
POISSON_RHO = -0.03
POISSON_MAX_GOALS = 8
CALIBRATION_DIVERGENCE_THRESHOLD = 0.08
CALIBRATION_ALPHA_BASE = 0.60
CALIBRATION_ALPHA_SLOPE = 2.5
CALIBRATION_ALPHA_CAP = 0.80

CONSENSUS_WEIGHTS = {"model": 0.35, "bookmaker": 0.40, "prediction": 0.25}
CONSENSUS_WEIGHTS_NO_PRED = {"model": 0.45, "bookmaker": 0.55}

KELLY_FRACTION = 0.25
KELLY_CAP = 0.03
EV_FAKE_THRESHOLD = 0.12

XG_EST_SOT_WEIGHT = 0.30
XG_EST_OFF_WEIGHT = 0.04
