import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Loader from '@/components/loader'
import ScrollProgress from '@/components/scroll-rope'

const editorial = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-editorial',
  display: 'swap',
})

const clean = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-clean',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sarina Khezrian — Architecture with Intention',
  description:
    'Sarina Khezrian — an architecture practice creating quiet, precise spaces shaped by context, material and light.',
  generator: 'realxein',
  keywords: [
'architecture studio',
    'residential architecture',
    'cultural architecture',
    'interior architecture',
    'Sarina Khezrian',
  ],
  openGraph: {
    title: 'Sarina Khezrian — Architecture with Intention',
    description:
      'Independent architecture practice creating residential, civic, cultural and interior spaces with intention.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#f9f9f9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-white ${editorial.variable} ${clean.variable}`}>
      <body className="antialiased grain-fixed">
        <Loader />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
