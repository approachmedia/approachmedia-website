'use client'

/**
 * A hairline across the top of the screen that fills, blue to green, as the
 * page is read. Driven straight from the scroll position on the compositor
 * (a scaleX, no layout), and hidden on pages too short to need it.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const el = bar.current
    if (!el) return
    let raf = 0
    const apply = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const short = max < window.innerHeight * 0.6
      el.style.opacity = short ? '0' : '1'
      el.style.transform = `scaleX(${short ? 0 : Math.min(1, Math.max(0, window.scrollY / max)).toFixed(4)})`
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply) }
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    kick()
    // the page grows as images and scroll sections settle
    const late = window.setTimeout(kick, 1200)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(late)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
    }
  }, [pathname])

  return <div ref={bar} className="am-progress" aria-hidden="true" />
}
