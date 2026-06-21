#!/usr/bin/env python3
"""Sync cloud results CSV into the small SQLite consumed by the JD-BET cloud engine.

Keeps the repo self-contained: GitHub Actions refreshes CSV from FIFA rendered pages,
then this script updates worldcup_results_small.sqlite. It never creates the giant raw
text odds table.
"""
from pathlib import Path
import csv
import sqlite3
import json

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / 'data' / 'dados' / 'BANCO_RESULTADOS_SELECOES' / 'fifa_matchcenter_daily_matches.csv'
DB_PATH = ROOT / 'data' / 'dados' / 'BANCO_RESULTADOS_SELECOES' / 'worldcup_results_small.sqlite'


def main():
    if not CSV_PATH.exists():
        raise SystemExit(f'missing {CSV_PATH}')
    if not DB_PATH.exists():
        raise SystemExit(f'missing {DB_PATH}')
    with CSV_PATH.open('r', encoding='utf-8-sig', newline='') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        cols = reader.fieldnames or []
    if not cols:
        raise SystemExit('empty results csv')
    con = sqlite3.connect(DB_PATH)
    # Ensure the table exists with the CSV shape. If the old table has same name but
    # old columns, replacing it is safer for the cloud-consumed results surface.
    con.execute('DROP TABLE IF EXISTS fifa_matchcenter_daily_matches')
    coldef = ', '.join(f'"{c}" TEXT' for c in cols)
    con.execute(f'CREATE TABLE fifa_matchcenter_daily_matches ({coldef})')
    if rows:
        ph = ','.join('?' for _ in cols)
        con.executemany(
            f'INSERT INTO fifa_matchcenter_daily_matches VALUES ({ph})',
            [[r.get(c, '') for c in cols] for r in rows],
        )
    con.commit()
    integrity = con.execute('pragma integrity_check').fetchone()[0]
    con.close()
    if integrity != 'ok':
        raise SystemExit(f'sqlite integrity failed: {integrity}')
    print(json.dumps({'csv_rows': len(rows), 'sqlite': str(DB_PATH), 'integrity': integrity, 'size_mb': round(DB_PATH.stat().st_size/1024/1024, 2)}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
