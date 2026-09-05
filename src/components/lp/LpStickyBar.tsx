'use client'

/**
 * Mobile sticky action bar (§4). Fixed to the bottom, below md only, and
 * hidden while the lead form is on screen so it never covers the submit
 * button. Padding respects the home-indicator safe area.
 */

import { useEffect, useState } from 'react'
import { TelLink, WaLink } from './LpLinks'

export default function LpStickyBar() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const form = document.getElementById('lp-form')
    if (!form) return
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.15 })
    io.observe(form)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[hsl(222,30%,6%)]/95 backdrop-blur-md transition-transform duration-300 md:hidden ${hidden ? 'translate-y-full' : 'translate-y-0'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={hidden}
    >
      <div className="grid grid-cols-2 gap-2 p-2.5">
        <TelLink placement="sticky" className="h-12 rounded-lg border border-white/20 bg-white/[0.06] text-sm font-semibold text-white">
          Call now
        </TelLink>
        <WaLink placement="sticky" className="h-12 rounded-lg bg-brand-green text-sm font-semibold text-accent-foreground">
          WhatsApp
        </WaLink>
      </div>
    </div>
  )
}
