import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Disclaimer from '@/components/Disclaimer'
import SWRegister from '@/components/SWRegister'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JD Market — Análise B3',
  description: 'Análise técnica e fundamentalista das 50 ações mais líquidas da B3 com 8 frameworks institucionais.',
  applicationName: 'JD Market',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'JD Market',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'JD Market — Análise B3',
    description: 'GS · BW · CT · Al Brooks para as 50 ações mais líquidas da B3',
    url: 'https://www.jdmarket.ai',
    siteName: 'JD Market',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#090E14',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SWRegister />
        <Disclaimer />
        {children}
      </body>
    </html>
  )
}
