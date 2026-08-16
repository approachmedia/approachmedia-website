'use client'
import { usePathname } from 'next/navigation'
import SiteHeader from './SiteHeader'
import FooterReveal from './FooterReveal'
import LegacyScripts from './LegacyScripts'

/**
 * Wraps public pages with the site header + footer.
 * Admin routes (/admin/*) have their own chrome, so they're excluded.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <div className="flex flex-col min-h-screen">
      <LegacyScripts />
      <SiteHeader />
      {/* The footer is pinned behind the page, so the page has to be opaque
          and above it or the footer shows through every section. bg-background
          is the same colour the body already paints, so nothing looks
          different when the reveal is switched off. */}
      <div className="relative z-10 flex-1 bg-background">{children}</div>
      <FooterReveal />
    </div>
  )
}
