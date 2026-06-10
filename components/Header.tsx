import Link from 'next/link'
import NewsTicker from './NewsTicker'

export default function Header() {
  return (
    <>
      <header style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        padding: '0 20px',
        height: 52,
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
            fontWeight: 700, fontSize: 18,
            color: 'var(--gold)', letterSpacing: '0.05em',
          }}>
            JD MARKET
          </span>
          <span style={{
            fontSize: 11, color: 'var(--text-muted)',
            fontFamily: 'var(--font-geist-mono), monospace',
            letterSpacing: '0.08em',
          }}>
            ANÁLISE B3
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 12, fontFamily: 'var(--font-geist-mono), monospace', letterSpacing: '0.06em' }}>
            Ranking
          </Link>
          <a href="/metodologia_desktop.html" style={{
            color: 'var(--gold)', textDecoration: 'none', fontSize: 11,
            fontFamily: 'var(--font-geist-mono), monospace', letterSpacing: '0.06em',
            border: '1px solid var(--gold)', padding: '5px 12px', borderRadius: 5,
            fontWeight: 600,
          }}>
            METODOLOGIA
          </a>
          <a href="/jd-bet/" style={{
            color: '#3B82F6', textDecoration: 'none', fontSize: 11,
            fontFamily: 'var(--font-geist-mono), monospace', letterSpacing: '0.06em',
            border: '1px solid #3B82F6', padding: '5px 12px', borderRadius: 5,
            fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <span>⚽</span> JD-BET
          </a>
          <span style={{
            fontSize: 11, color: 'var(--text-muted)',
            fontFamily: 'var(--font-geist-mono), monospace',
            border: '1px solid var(--border)', padding: '3px 8px', borderRadius: 4,
          }}>
            50 ativos · B3
          </span>
        </nav>
      </header>
      <NewsTicker />
    </>
  )
}
