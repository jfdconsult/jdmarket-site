import Header from '@/components/Header'
import Link from 'next/link'

export const metadata = {
  title: 'JD · Quem está por trás do JD Market',
  description: '30 anos integrando mercado financeiro e tecnologia.',
}

const MONO = 'var(--font-geist-mono), monospace'

export default function SobrePage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* ── HERO ── */}
        <section style={{
          display: 'grid', gridTemplateColumns: '420px 1fr', gap: 48,
          alignItems: 'center', marginBottom: 64,
        }} className="sobre-hero">
          <div style={{
            position: 'relative', borderRadius: 12, overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jd-harpian.png" alt="João Daniel" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div>
            <div style={{
              fontSize: 11, letterSpacing: '0.18em', color: 'var(--gold)',
              fontFamily: MONO, textTransform: 'uppercase', fontWeight: 700, marginBottom: 14,
            }}>
              Founder · Harpian — Adaptive Portfolio Engineering
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700,
              color: 'var(--text)', margin: '0 0 18px',
              lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              João Daniel
            </h1>

            <p style={{
              fontSize: 18, lineHeight: 1.55, color: 'var(--text)',
              margin: '0 0 14px', maxWidth: 540,
            }}>
              <strong style={{ color: 'var(--gold)' }}>30 anos</strong> integrando
              mercado financeiro e tecnologia.
            </p>

            <p style={{
              fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)',
              margin: '0 0 10px', maxWidth: 540,
            }}>
              O JD Market é o que faço <em>por diversão</em>.
            </p>
            <p style={{
              fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)',
              margin: 0, maxWidth: 540,
            }}>
              A <strong style={{ color: 'var(--gold)' }}>Harpian</strong> é onde aplico
              o método de verdade — gestão sistemática de capital institucional.
            </p>
          </div>
        </section>

        {/* ── ORIGEM ── */}
        <Section title="Origem" subtitle="01 · onde tudo começou">
          <Story>
            Tudo começou no <strong>Shopping da Gávia</strong>, no Rio, anos 80. Eu vi
            <em> WarGames — Jogos de Guerra</em> com Matthew Broderick e saí do cinema
            decidido: queria aprender a programar.
          </Story>
          <Story>
            Meu pai me matriculou num curso de programação. Eu tinha <strong>10, 12 anos</strong>.
            O computador era um <strong>TK-83</strong>. Depois vieram o Apple II, os
            videogames Atari (era viciado), e a programação virou parte de quem eu sou.
          </Story>
        </Section>

        {/* ── TRAJETÓRIA ── */}
        <Section title="Trajetória empreendedora" subtitle="02 · onde tecnologia virou negócio">
          <Timeline items={[
            {
              year: '1998',
              title: 'Primeira empresa de apps mobile da América do Sul',
              text: 'Fundei uma das primeiras empresas de desenvolvimento de aplicativos para mobile do continente. Desenvolvíamos para Palm III, Palm Tree e Windows Mobile. Estávamos anos à frente do mercado — não havia conectividade ainda.',
            },
            {
              year: '2000s',
              title: 'Adventus — IA antes de a IA virar moda',
              text: 'Criei e fundei a Adventus, a primeira empresa do Brasil a usar URA com reconhecimento de voz para televendas e telecobrança. Inteligência artificial aplicada quando ninguém ainda chamava isso de IA.',
            },
            {
              year: 'Mercado',
              title: '30 anos no mercado financeiro',
              text: 'Em paralelo, construí três décadas de experiência operando no mercado financeiro — análise técnica, derivativos e opções.\n\nHoje isso se traduz em profundo estudo quantitativo, mapeamento de sistema, arquitetura e especificação sistêmica — tudo com o auxílio de IA e ao lado de sócios excepcionais. Esse é o DNA da Harpian.',
            },
          ]} />
        </Section>

        {/* ── FORMAÇÃO ── */}
        <Section title="Formação" subtitle="03 · onde a base intelectual foi forjada">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="sobre-edu">
            <EduCard
              label="Graduação"
              title="Administração"
              place="Cândido Mendes · Rio de Janeiro"
            />
            <EduCard
              label="Pós-graduação"
              title="MBA"
              place="University of Pittsburgh · Pensilvânia, EUA"
            />
          </div>
        </Section>

        {/* ── POR QUE O JD MARKET ── */}
        <Section title="Por que o JD Market existe" subtitle="04 · a filosofia por trás">
          <p style={{
            fontSize: 17, lineHeight: 1.7, color: 'var(--text)',
            margin: '0 0 16px', maxWidth: 720,
          }}>
            O JD Market é uma <strong>vitrine de método</strong>.
          </p>
          <p style={{
            fontSize: 17, lineHeight: 1.7, color: 'var(--text)',
            margin: '0 0 16px', maxWidth: 720,
          }}>
            A maioria dos gestores do mundo opera com o mesmo manual:{' '}
            <strong>Value Investing</strong> e <strong>Buy and Hold</strong> — métodos que
            funcionam, mas que pararam no tempo. No longo prazo entregam algum resultado.
            Ainda assim, cerca de <strong>90% não conseguem superar o S&amp;P 500</strong>.
          </p>
          <p style={{
            fontSize: 19, lineHeight: 1.6, color: 'var(--gold)', fontWeight: 700,
            margin: '0 0 16px', maxWidth: 720, letterSpacing: '-0.01em',
          }}>
            Por que será?
          </p>
          <p style={{
            fontSize: 17, lineHeight: 1.7, color: 'var(--text)',
            margin: '0 0 18px', maxWidth: 720,
          }}>
            Eu entrego o JD Market de graça aos meus amigos. É a minha forma de demonstrar —
            sem te vender nada — como <strong>tecnologia, física, matemática, inteligência
            artificial e mercado financeiro</strong> se integram quando o trabalho é feito
            com profundidade.
          </p>
          <div style={{
            background: 'var(--bg2)', borderLeft: '3px solid var(--gold)',
            padding: '18px 22px', borderRadius: '0 8px 8px 0',
            fontSize: 16, lineHeight: 1.65, color: 'var(--text)', maxWidth: 720,
          }}>
            Aqui é onde eu brinco. Onde eu trabalho de verdade é na{' '}
            <Link href="https://harpiancapital.com" target="_blank" style={{
              color: 'var(--gold)', textDecoration: 'underline', fontWeight: 600,
            }}>
              Harpian
            </Link>{' '}
            — gestão quantitativa de portfólio para family offices, RIAs e investidores
            institucionais que precisam de proteção de capital em qualquer regime de mercado.
          </div>
        </Section>

        {/* ── CTAs ── */}
        <section style={{
          marginTop: 64, padding: 32,
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 12,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: '0.18em', color: 'var(--gold)',
            fontFamily: MONO, textTransform: 'uppercase', fontWeight: 700, marginBottom: 14,
          }}>
            Próximo passo
          </div>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: 'var(--text)',
            margin: '0 0 24px', lineHeight: 1.3,
          }}>
            Como você quer continuar?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="sobre-cta">
            <a
              href="https://wa.me/5521992428700?text=Oi%20Jo%C3%A3o,%20vim%20pelo%20JD%20Market"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', padding: '20px 22px',
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 8, textDecoration: 'none',
                transition: 'border-color .12s',
              }}
            >
              <div style={{
                fontSize: 10, color: 'var(--text-muted)', fontFamily: MONO,
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Quer conversar
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)', marginBottom: 6 }}>
                Falar com meu assistente
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                WhatsApp · ele te envia análises, notícias e responde dúvidas sobre o JD Market.
              </div>
            </a>

            <a
              href="https://harpiancapital.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', padding: '20px 22px',
                background: 'linear-gradient(135deg, rgba(212,175,69,0.08), rgba(212,175,69,0.02))',
                border: '1px solid var(--gold)',
                borderRadius: 8, textDecoration: 'none',
                transition: 'transform .12s',
              }}
            >
              <div style={{
                fontSize: 10, color: 'var(--gold)', fontFamily: MONO,
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700,
              }}>
                Quer ver o método sério
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)', marginBottom: 6 }}>
                Conheça a Harpian Capital →
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Gestão quantitativa de portfólio para investidores institucionais.
              </div>
            </a>
          </div>
        </section>

      </main>

      <style>{`
        @media (max-width: 760px) {
          .sobre-hero { grid-template-columns: 1fr !important; gap: 24px !important; }
          .sobre-edu { grid-template-columns: 1fr !important; }
          .sobre-cta { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

// ────────────────────────────────────────────────────────────────────────────
function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{
        fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-muted)',
        fontFamily: MONO, textTransform: 'uppercase', marginBottom: 6,
      }}>
        {subtitle}
      </div>
      <h2 style={{
        fontSize: 28, fontWeight: 700, color: 'var(--text)',
        margin: '0 0 24px', letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      <div style={{ maxWidth: 760 }}>{children}</div>
    </section>
  )
}

function Story({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 16, lineHeight: 1.75, color: 'var(--text)',
      margin: '0 0 16px',
    }}>
      {children}
    </p>
  )
}

function Timeline({ items }: { items: { year: string; title: string; text: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '110px 1fr', gap: 24,
          paddingBottom: i < items.length - 1 ? 24 : 0,
          borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{
            fontSize: 14, fontWeight: 700, fontFamily: MONO,
            color: 'var(--gold)', letterSpacing: '0.04em',
          }}>
            {it.year}
          </div>
          <div>
            <div style={{
              fontSize: 17, fontWeight: 700, color: 'var(--text)',
              marginBottom: 6,
            }}>
              {it.title}
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-muted)' }}>
              {it.text.split('\n\n').map((para, j) => (
                <p key={j} style={{ margin: j === 0 ? '0 0 10px' : 0 }}>
                  {para.split(/(Harpian)/g).map((part, k) =>
                    part === 'Harpian'
                      ? <strong key={k} style={{ color: 'var(--gold)', fontWeight: 600 }}>{part}</strong>
                      : part
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function EduCard({ label, title, place }: { label: string; title: string; place: string }) {
  return (
    <div style={{
      padding: '20px 22px', background: 'var(--bg2)',
      border: '1px solid var(--border)', borderRadius: 8,
    }}>
      <div style={{
        fontSize: 10, fontFamily: MONO, letterSpacing: '0.1em',
        color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        {place}
      </div>
    </div>
  )
}
