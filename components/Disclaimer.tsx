'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'jdmarket_disclaimer_v1'

export default function Disclaimer() {
  const [mounted, setMounted] = useState(false)
  const [accepted, setAccepted] = useState(true) // começa como aceito p/ não piscar

  useEffect(() => {
    setMounted(true)
    try {
      const ok = localStorage.getItem(STORAGE_KEY)
      setAccepted(!!ok)
    } catch {
      setAccepted(true) // se não tem storage, deixa passar
    }
  }, [])

  function handleAccept(e?: React.MouseEvent | React.TouchEvent) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    try { localStorage.setItem(STORAGE_KEY, new Date().toISOString()) } catch {}
    setAccepted(true)
  }

  if (!mounted || accepted) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, overflowY: 'auto',
        pointerEvents: 'auto',
      }}
    >
      <div style={{
        maxWidth: 720, width: '100%', background: 'var(--bg2)',
        border: '1px solid var(--gold)', borderRadius: 12,
        padding: 'clamp(24px, 4vw, 36px)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.15em', color: 'var(--gold)',
          fontFamily: 'var(--font-geist-mono), monospace',
          textTransform: 'uppercase', fontWeight: 700, marginBottom: 14,
        }}>
          ⚠ Aviso Legal · Disclaimer
        </div>

        <h2 style={{
          fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700,
          color: 'var(--text)', margin: '0 0 18px',
          lineHeight: 1.3, letterSpacing: '-0.01em',
        }}>
          Bem-vindo ao <span style={{ color: 'var(--gold)' }}>JD Market</span>
        </h2>

        <div style={{
          fontSize: 14.5, lineHeight: 1.65, color: 'var(--text)',
          marginBottom: 22,
        }}>
          <p style={{ margin: '0 0 14px' }}>
            O JD Market é uma <strong>plataforma de inteligência analítica</strong> sobre ações da B3,
            que aplica 8 frameworks institucionais (Goldman Sachs, JP Morgan, Bridgewater, Citadel e Al Brooks)
            via inteligência artificial.
          </p>

          <div style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '14px 16px', margin: '14px 0',
            borderLeft: '3px solid var(--gold)',
          }}>
            <strong style={{ color: 'var(--gold)', fontSize: 13.5 }}>
              Esta plataforma NÃO é recomendação de investimento.
            </strong>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, fontSize: 13.5 }}>
              <li style={{ marginBottom: 5 }}>Não emite ordens de <strong>compra ou venda</strong> de ativos.</li>
              <li style={{ marginBottom: 5 }}>O <strong>JD Score</strong> é uma leitura de viés dos métodos, não um call.</li>
              <li style={{ marginBottom: 5 }}>Quem decide pelo seu capital é <strong>você</strong> (ou seu assessor credenciado).</li>
              <li>Análises geradas por IA estão sujeitas a <strong>erros e desatualização</strong>.</li>
            </ul>
          </div>

          <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--text-muted)' }}>
            Conteúdo apenas para <strong>fins informativos e educacionais</strong>.
            Consulte um profissional credenciado (CVM) antes de qualquer decisão de investimento.
            O JD Market e seus criadores não se responsabilizam por perdas decorrentes do uso destas informações.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleAccept}
            onTouchEnd={handleAccept}
            style={{
              background: 'var(--gold)', color: 'var(--bg)', border: 'none',
              padding: '14px 28px', borderRadius: 6, fontSize: 13,
              fontFamily: 'var(--font-geist-mono), monospace',
              fontWeight: 700, letterSpacing: '0.04em', cursor: 'pointer',
              textTransform: 'uppercase', flex: '1 1 auto', minWidth: 200,
              pointerEvents: 'auto', userSelect: 'none',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Entendi e aceito
          </button>
          <a href="/metodologia_desktop.html" style={{
            color: 'var(--gold)', textDecoration: 'underline',
            fontSize: 12, fontFamily: 'var(--font-geist-mono), monospace',
            letterSpacing: '0.04em',
          }}>
            Ver metodologia →
          </a>
        </div>

        <div style={{
          marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border)',
          fontSize: 11, color: 'var(--text-muted)',
          fontFamily: 'var(--font-geist-mono), monospace',
          letterSpacing: '0.06em',
        }}>
          JD MARKET · ANÁLISE B3 · ferramenta proprietária
        </div>
      </div>
    </div>
  )
}
