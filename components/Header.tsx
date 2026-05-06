import Link from 'next/link'

export default function Header() {
  return (
    <header style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      height: 56,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          fontWeight: 700,
          fontSize: 18,
          color: 'var(--gold)',
          letterSpacing: '0.05em',
        }}>
          JD MARKET
        </span>
        <span style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-geist-mono), monospace',
          letterSpacing: '0.08em',
        }}>
          ANÁLISE B3
        </span>
      </Link>

      <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13 }}>
          Ranking
        </Link>
        <span style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-geist-mono), monospace',
          border: '1px solid var(--border)',
          padding: '3px 8px',
          borderRadius: 4,
        }}>
          50 ativos · B3
        </span>
      </nav>
    </header>
  )
}
