'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MONO = 'var(--font-geist-mono), monospace'
const WHATSAPP_URL = 'https://wa.me/5521992428770?text=Oi%20Jo%C3%A3o%2C%20vim%20pelo%20app%20do%20JD%20Market'

const Icon = {
  panel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z" />
    </svg>
  ),
  analysis: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <polyline points="3 17 8 12 12 15 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </svg>
  ),
  trend: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M2 14c3 0 3-6 6-6s3 6 6 6 3-6 6-6" />
      <polyline points="17 5 20 8 17 11" />
    </svg>
  ),
  star: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
    </svg>
  ),
  news: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M4 5h13a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5z" />
      <path d="M19 8h1a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2" />
      <path d="M7 9h8M7 12h8M7 15h5" />
    </svg>
  ),
  chat: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3C6.5 3 2 6.9 2 11.7c0 2 .8 3.9 2.2 5.4L3 21l4.2-1.3c1.5.6 3.1 1 4.8 1 5.5 0 10-3.9 10-8.9S17.5 3 12 3z" />
    </svg>
  ),
}

export type TabKey = 'panel' | 'analysis' | 'trend' | 'favs' | 'news'
const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'panel',    label: 'Painel',   icon: Icon.panel },
  { key: 'analysis', label: 'Análise',  icon: Icon.analysis },
  { key: 'trend',    label: 'Trend',    icon: Icon.trend },
  { key: 'favs',     label: 'Favs',     icon: Icon.star },
  { key: 'news',     label: 'Notícias', icon: Icon.news },
]

// Contexto pra compartilhar estado do tab entre a Shell e o corpo (MobileApp).
// Estado 100% client-side, sem depender de URL — evita problemas com Suspense.
const TabCtx = createContext<{ tab: TabKey; setTab: (t: TabKey) => void }>({ tab: 'panel', setTab: () => {} })

export function useMobileTab() {
  return useContext(TabCtx)
}

const STORAGE_KEY = 'jdmarket_tab_v1'

export default function MobileShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [tab, setTabState] = useState<TabKey>('panel')

  // Ao montar, restaura o último tab do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as TabKey | null
      if (saved && TABS.some(t => t.key === saved)) setTabState(saved)
    } catch {}
  }, [])

  const setTab = (t: TabKey) => {
    setTabState(t)
    try { localStorage.setItem(STORAGE_KEY, t) } catch {}
  }

  const isHome = pathname === '/'
  const label =
    isHome ? (TABS.find(t => t.key === tab)?.label ?? 'Painel')
           : (pathname.startsWith('/sobre') ? 'Sobre' : decodeURIComponent(pathname.replace(/^\//, '')))

  return (
    <TabCtx.Provider value={{ tab, setTab }}>
      <header className="mobile-app-header">
        <Link
          href="/"
          onClick={() => setTab('panel')}
          style={{ display: 'flex', alignItems: 'baseline', gap: 8, textDecoration: 'none', minWidth: 0, flex: '1 1 auto' }}
        >
          <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17, color: 'var(--gold)', letterSpacing: '0.05em' }}>JD MARKET</span>
          <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: MONO, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>· {label}</span>
        </Link>
        <Link
          href="/sobre"
          style={{ color: '#60A5FA', textDecoration: 'none', fontSize: 11, fontFamily: MONO, fontWeight: 800, border: '1.5px solid #60A5FA', background: 'rgba(96,165,250,0.08)', padding: '3px 9px', borderRadius: 5, flexShrink: 0 }}
        >
          JD
        </Link>
      </header>

      <div className="mobile-app-content">{children}</div>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com o agente JD (WhatsApp)"
        className="mobile-app-agent"
        title="Falar com o jornalista JD"
      >
        {Icon.chat}
      </a>

      <nav className="mobile-app-nav" aria-label="Navegação principal">
        {TABS.map(t => {
          const active = isHome && t.key === tab
          const onClick = (e: React.MouseEvent) => {
            setTab(t.key)
            if (isHome) e.preventDefault()  // se já está na home, só troca tab sem navegar
          }
          return (
            <Link
              key={t.key}
              href="/"
              onClick={onClick}
              prefetch={false}
              scroll={false}
              aria-current={active ? 'page' : undefined}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 3, padding: '10px 0 8px', color: active ? 'var(--gold)' : 'var(--text-muted)',
                textDecoration: 'none', flex: 1, fontFamily: MONO, position: 'relative',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {active && <span style={{ position: 'absolute', top: 0, height: 2, width: 28, background: 'var(--gold)', borderRadius: 2 }} />}
              <span style={{ display: 'inline-flex' }}>{t.icon}</span>
              <span style={{ fontSize: 10, letterSpacing: '0.03em', fontWeight: active ? 700 : 500 }}>{t.label}</span>
            </Link>
          )
        })}
      </nav>
    </TabCtx.Provider>
  )
}
