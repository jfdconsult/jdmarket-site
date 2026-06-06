'use client'

import { useState, useEffect, useRef } from 'react'

interface NewsItem { title: string; url: string; source?: string }

export default function NewsTicker() {
  const [items, setItems] = useState<NewsItem[]>([])
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('https://agente-jornalista-jd.fly.dev/public/ticker-news?minutes=720&limit=20')
      .then(r => r.ok ? r.json() : { items: [] })
      .then((data: { items?: NewsItem[] } | NewsItem[]) => {
        const news = Array.isArray(data) ? data : (data as { items?: NewsItem[] }).items ?? []
        if (news.length) setItems(news)
      })
      .catch(() => {})
  }, [])

  if (!items.length) return null

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'var(--bg)', borderBottom: '1px solid var(--border)',
      height: 30, overflow: 'hidden', position: 'sticky', top: 52, zIndex: 99,
      padding: '0 16px',
    }}>
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
        color: 'var(--gold)', fontFamily: 'var(--font-geist-mono), monospace',
        flexShrink: 0, textTransform: 'uppercase',
      }}>
        JD NEWS
      </span>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div
          ref={trackRef}
          className="ntk-track-react"
          style={{ display: 'inline-flex', gap: 6, whiteSpace: 'nowrap', minWidth: '200%' }}
        >
          {[...items, ...items].map((n, i) => (
            <a
              key={i}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                textDecoration: 'none', padding: '0 4px', flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-geist-mono), monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {n.source || 'JD'}
              </span>
              <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>●</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
