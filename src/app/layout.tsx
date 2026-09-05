import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import './legacy.css'
import SiteChrome from '@/components/site/SiteChrome'
import SmoothScroll from '@/components/site/SmoothScroll'
import { GtmHead, GtmNoScript } from '@/components/site/Gtm'

import { SITE_URL } from '@/lib/site-url'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Approach Media — Exhibition Stall Design & Fabrication',
    template: '%s | Approach Media',
  },
  description: 'Custom exhibition stall design and fabrication company. Double decker stands, turnkey project management, AV integration across India.',
  // Served from public/ at the site root. Declared explicitly rather than
  // relying on Next's src/app/favicon.ico convention, because the set spans
  // .ico, two PNG sizes, the Apple touch icon and the web manifest.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Approach Media',
    locale: 'en_IN',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Approach Media — Exhibition Stall Design & Fabrication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@approachmedia',
    images: ['/og-default.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[hsl(222,30%,6%)] text-[hsl(0,0%,96%)] font-sans antialiased">
        {/* React 19 hoists this into <head> on every page. Declared here
            rather than via metadata.alternates because pages that set their
            own alternates.canonical would replace the whole alternates
            object and silently drop the feed link. */}
        <link rel="alternate" type="application/rss+xml" title="Approach Media Blog" href="/feed.xml" />
        <GtmHead />
        <GtmNoScript />
        <SmoothScroll />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
