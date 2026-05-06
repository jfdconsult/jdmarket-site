import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JD Market — Análise B3',
  description: 'Análise técnica e fundamentalista das 50 ações mais líquidas da B3 com 8 frameworks institucionais.',
  openGraph: {
    title: 'JD Market — Análise B3',
    description: 'GS · BW · CT · Al Brooks para as 50 ações mais líquidas da B3',
    url: 'https://www.jdmarket.ai',
    siteName: 'JD Market',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
