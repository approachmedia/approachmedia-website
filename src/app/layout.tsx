import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Approach Media - Exhibition Stall Design & Build',
  description: 'Premium exhibition stall design and fabrication services across 14+ countries. 23+ years of expertise, 6000+ stalls executed.',
  keywords: 'exhibition stall design, trade show booth, exhibition fabrication, stall builder',
  openGraph: {
    title: 'Approach Media - Exhibition Stall Design & Build',
    description: 'Premium exhibition stall design and fabrication services across 14+ countries.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
