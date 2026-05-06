import type { Rating } from '@/lib/types'

const CONFIG: Record<Rating, { label: string; color: string }> = {
  STRONG_BUY:  { label: 'FORTE COMPRA', color: '#16A34A' },
  BUY:         { label: 'COMPRA',        color: '#22C55E' },
  NEUTRAL:     { label: 'NEUTRO',        color: '#EAB308' },
  SELL:        { label: 'VENDA',         color: '#EF4444' },
  STRONG_SELL: { label: 'FORTE VENDA',   color: '#DC2626' },
}

export default function RatingBadge({
  rating,
  size = 'sm',
}: {
  rating: Rating
  size?: 'xs' | 'sm' | 'md'
}) {
  const cfg = CONFIG[rating] ?? { label: rating, color: '#6B8299' }
  const pad = size === 'xs' ? '2px 6px' : size === 'sm' ? '3px 8px' : '4px 12px'
  const fs  = size === 'xs' ? '10px' : size === 'sm' ? '11px' : '12px'

  return (
    <span
      style={{
        background: `${cfg.color}22`,
        color: cfg.color,
        border: `1px solid ${cfg.color}55`,
        padding: pad,
        borderRadius: 4,
        fontSize: fs,
        fontWeight: 700,
        fontFamily: 'var(--font-geist-mono), monospace',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}
    >
      {cfg.label}
    </span>
  )
}
