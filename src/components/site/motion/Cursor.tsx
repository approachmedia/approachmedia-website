'use client'

/**
 * A ring that trails the pointer on mouse and trackpad screens. It grows over
 * links and buttons and fills with a small label over photographs that open
 * something. The native cursor stays: this decorates it, it never replaces
 * it. Hidden over elements that draw their own pointer treatment
 * ([data-own-cursor]), over form fields, and under reduced motion.
 */

import { useEffect, useRef } from 'react'

const OWN = '[data-own-cursor], .pfx-media, [aria-roledescription="carousel"], input, textarea, select, iframe'

export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ring.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const p = { x: -100, y: -100, tx: -100, ty: -100 }
    let raf = 0
    let shown = false
    const tick = () => {
      p.x += (p.tx - p.x) * 0.22
      p.y += (p.ty - p.y) * 0.22
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
      raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.2 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      p.tx = e.clientX; p.ty = e.clientY
      if (!shown) { p.x = p.tx; p.y = p.ty; shown = true; el.classList.add('is-on') }
      const t = e.target as HTMLElement
      const own = !!t.closest(OWN)
      const link = !own && !!t.closest('a, button, [role="button"], label, summary')
      const view = link && !!t.closest('a')?.querySelector('img, video')
      el.classList.toggle('is-hidden', own)
      el.classList.toggle('is-link', link && !view)
      el.classList.toggle('is-view', view)
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => { shown = false; el.classList.remove('is-on') }
    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')
    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
    }
  }, [])

  return <div ref={ring} className="am-cursor" aria-hidden="true"><span>View</span></div>
}
