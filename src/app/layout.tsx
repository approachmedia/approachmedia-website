import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import './legacy.css'
import SiteChrome from '@/components/site/SiteChrome'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })

const SITE_URL = 'https://approachmedia.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Approach Media — Exhibition Stall Design & Fabrication',
    template: '%s | Approach Media',
  },
  description: 'Custom exhibition stall design and fabrication company. Double decker stands, turnkey project management, AV integration across India.',
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
