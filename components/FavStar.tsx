'use client'

import { useFavorites } from '@/lib/useFavorites'

export default function FavStar({ ticker, size = 18 }: { ticker: string; size?: number }) {
  const { isFav, toggle, ready } = useFavorites()
  const active = ready && isFav(ticker)
  return (
    <button
      type="button"
      aria-label={active ? `Remover ${ticker} dos favoritos` : `Favoritar ${ticker}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(ticker)
      }}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 4,
        lineHeight: 1,
        color: active ? 'var(--gold)' : 'var(--text-muted)',
        fontSize: size,
        opacity: active ? 1 : 0.55,
        transition: 'color .12s, opacity .12s',
        WebkitTapHighlightColor: 'transparent',
      }}
      title={active ? 'Nos seus favoritos' : 'Favoritar'}
    >
      {active ? '★' : '☆'}
    </button>
  )
}
