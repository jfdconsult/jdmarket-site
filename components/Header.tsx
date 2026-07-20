import Link from 'next/link'
import NewsTicker from './NewsTicker'

const MONO = 'var(--font-geist-mono), monospace'

export default function Header() {
  return (
    <>
      <header
        className="jd-header"
        style={{
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
        }}
      >
        {/* ESQUERDA — logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--gold)',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}
            >
              JD MARKET
            </span>
            <span
              className="jd-header-sub"
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: MONO,
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
              }}
            >
              ANÁLISE B3
            </span>
          </Link>
        </div>

        {/* DIREITA — METODOLOGIA + JD */}
        <nav style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a
            className="jd-header-method"
            href="/metodologia_desktop.html"
            aria-label="Metodologia"
            style={{
              color: 'var(--gold)',
              textDecoration: 'none',
              fontSize: 11,
              fontFamily: MONO,
              letterSpacing: '0.06em',
              border: '1px solid var(--gold)',
              padding: '5px 12px',
              borderRadius: 5,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            <span className="method-label">METODOLOGIA</span>
          </a>

          {/* JD — azul com caixinha visível, ação clara de clique */}
          <a
            href="/sobre"
            style={{
              color: '#60A5FA',
              textDecoration: 'none',
              fontSize: 12,
              fontFamily: MONO,
              letterSpacing: '0.1em',
              fontWeight: 800,
              border: '1.5px solid #60A5FA',
              background: 'rgba(96,165,250,0.08)',
              padding: '5px 13px',
              borderRadius: 5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              boxShadow: '0 0 0 1px rgba(96,165,250,0.15)',
            }}
          >
            JD
          </a>

          <span
            className="jd-header-tag"
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              fontFamily: MONO,
              border: '1px solid var(--border)',
              padding: '3px 8px',
              borderRadius: 4,
              whiteSpace: 'nowrap',
            }}
          >
            50 ativos · B3
          </span>
        </nav>
      </header>
      <NewsTicker />
    </>
  )
}
