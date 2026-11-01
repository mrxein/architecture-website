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
  title: 'Sarina Khezrian — Architecture, BIM & Digital Design',
  description:
    'Explore the architectural portfolio of Sarina Khezrian, specializing in architectural design, BIM modeling, Tekla Structures, 3D visualization, and architectural graphics.',

  generator: 'realxein',

  keywords: [
    'Sarina Khezrian',
    'architecture portfolio',
    'architectural design',
    'BIM modeling',
    'Building Information Modeling',
    'Tekla Structures',
    'structural steel modeling',
    'Autodesk Revit',
    'AutoCAD',
    'SketchUp',
    'Enscape rendering',
    '3D architectural visualization',
    'architectural graphics',
    'digital design',
  ],

  openGraph: {
    title: 'Sarina Khezrian — Architecture & BIM Portfolio',
    description:
      'Discover architectural design, BIM modeling, structural modeling, 3D visualization, and architectural graphics by Sarina Khezrian.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sarina Khezrian — Architecture, BIM & Digital Design',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Sarina Khezrian — Architecture & BIM Portfolio',
    description:
      'Architectural design, BIM modeling, Tekla Structures, 3D visualization, and architectural graphics.',
    images: ['/og-image.jpg'],
  },
};

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
