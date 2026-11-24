'use client'

/**
 * Motion for the blog index, wrapped around server-rendered cards.
 *
 *  - Arrival: each card swings in from its own side (left column from the
 *    left, right from the right) with a slight turn, once, as it reaches the
 *    screen. Cards on screen at load are shown at once.
 *  - Tilt and glare: under a mouse a card leans toward the pointer (at most
 *    5 degrees) with a soft highlight where the light would catch it.
 *  - Featured story: its photograph slowly scales from 1.15 to 1 as the
 *    story crosses the screen.
 *
 * Fine pointers only for the tilt; reduced motion keeps everything still.
 */

import { useEffect, useRef, type ReactNode } from 'react'

export default function TiltGrid({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.bt-card'))
    const vh = window.innerHeight
    cards.forEach((c, i) => {
      c.style.setProperty('--side', i % 2 === 0 ? '-1' : '1')
      const r = c.getBoundingClientRect()
      if (r.top < vh * 0.92) c.classList.add('is-in', 'is-now')
    })
    el.classList.add('bt-armed')

    const feature = el.querySelector<HTMLElement>('.bt-feature img')
    let raf = 0
    const check = () => {
      raf = 0
      const h = window.innerHeight
      cards.forEach(c => {
        if (c.classList.contains('is-in')) return
        if (c.getBoundingClientRect().top < h * 0.9) c.classList.add('is-in')
      })
      if (feature) {
        const r = feature.parentElement!.getBoundingClientRect()
        const k = Math.min(1, Math.max(0, (h - r.top) / (h + r.height)))
        feature.style.scale = String((1.15 - 0.15 * k).toFixed(4))
      }
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', kick, { passive: true })

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onMove = (e: PointerEvent) => {
      const c = (e.target as HTMLElement).closest<HTMLElement>('.bt-card')
      cards.forEach(o => { if (o !== c && o.classList.contains('is-tilt')) { o.classList.remove('is-tilt'); o.style.removeProperty('--rx'); o.style.removeProperty('--ry') } })
      if (!c) return
      const r = c.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
      c.classList.add('is-tilt')
      c.style.setProperty('--rx', `${((0.5 - y) * 5).toFixed(2)}deg`)
      c.style.setProperty('--ry', `${((x - 0.5) * 5).toFixed(2)}deg`)
      c.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
      c.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
    }
    const onLeave = () => cards.forEach(o => { o.classList.remove('is-tilt'); o.style.removeProperty('--rx'); o.style.removeProperty('--ry') })
    if (fine) { el.addEventListener('pointermove', onMove); el.addEventListener('pointerleave', onLeave) }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <div ref={root} className="bt" data-no-reveal data-own-cursor>{children}</div>
}
