'use client'

/**
 * The selected-projects grid, set moving. On wide screens the three columns
 * travel at slightly different speeds as the page scrolls, so the grid
 * shears gently past the eye; at every width each card's photograph opens
 * upward from its bottom edge as it reaches the screen. Cards already on
 * screen at load are shown at once. Reduced motion: the plain grid.
 */

import { useEffect, useRef, type ReactNode } from 'react'

const SPEED = [0, 0.11, 0.05]

export default function ParallaxProjects({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('li'))
    const vh = window.innerHeight
    items.forEach(li => { if (li.getBoundingClientRect().top < vh * 0.92) li.classList.add('is-in', 'is-now') })
    el.classList.add('idp-armed')
    let raf = 0
    const frame = () => {
      raf = 0
      const h = window.innerHeight
      const wide = window.innerWidth >= 1024
      const r = el.getBoundingClientRect()
      const d = Math.max(-650, Math.min(650, r.top + r.height / 2 - h / 2))
      items.forEach((li, i) => {
        li.style.translate = wide ? `0 ${(d * SPEED[i % 3]).toFixed(1)}px` : ''
        if (!li.classList.contains('is-in') && li.getBoundingClientRect().top < h * 0.9) li.classList.add('is-in')
      })
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    frame()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick) }
  }, [])
  return <div ref={root} className="idp">{children}</div>
}
