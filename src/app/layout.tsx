import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SiteChrome from '@/components/site/SiteChrome'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  title: {
    default: 'Approach Media — Exhibition Stall Design & Fabrication',
    template: '%s | Approach Media',
  },
  description: 'Custom exhibition stall design and fabrication company. Double decker stands, turnkey project management, AV integration across India.',
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
