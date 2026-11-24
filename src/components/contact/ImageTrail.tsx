'use client'

/**
 * Contact hero: moving the mouse across it leaves a trail of our project
 * photographs. One appears every ~90px of travel, pops in at the pointer,
 * holds a moment, then drops away and fades, so a sweep across the screen
 * deals a hand of stalls. On a touch screen a tap deals a small burst
 * around the finger. Decorative and pointer-transparent; reduced motion
 * turns it off.
 */

import { useEffect, useRef } from 'react'

const STEP = 90
const LIVE = 9

export default function ImageTrail({ images }: { images: string[] }) {
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = layer.current
    if (!el || images.length === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hero = el.parentElement!
    // Warm the first few so the trail never flashes empty.
    images.slice(0, 6).forEach(src => { const i = new Image(); i.src = src })
    let n = 0
    let last: { x: number; y: number } | null = null
    const deal = (x: number, y: number, dx = 0) => {
      const img = document.createElement('img')
      img.src = images[n++ % images.length]
      img.alt = ''
      img.className = 'ct-trail-img'
      img.style.left = `${x}px`
      img.style.top = `${y}px`
      img.style.setProperty('--rot', `${(Math.random() * 14 - 7 + dx * 0.05).toFixed(1)}deg`)
      el.appendChild(img)
      requestAnimationFrame(() => img.classList.add('is-in'))
      setTimeout(() => img.classList.add('is-out'), 900)
      setTimeout(() => img.remove(), 1700)
      while (el.children.length > LIVE) el.firstElementChild?.remove()
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = hero.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      if (!last) { last = { x, y }; return }
      const d = Math.hypot(x - last.x, y - last.y)
      if (d >= STEP) { deal(x, y, x - last.x); last = { x, y } }
    }
    const onLeave = () => { last = null }
    const onTap = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      const r = hero.getBoundingClientRect()
      const x = e.clientX - r.left, y = e.clientY - r.top
      for (let k = 0; k < 3; k++) setTimeout(() => deal(x + (k - 1) * 46, y + (k % 2 ? -30 : 20)), k * 90)
    }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    hero.addEventListener('pointerup', onTap)
    return () => { hero.removeEventListener('pointermove', onMove); hero.removeEventListener('pointerleave', onLeave); hero.removeEventListener('pointerup', onTap) }
  }, [images])

  return <div ref={layer} className="ct-trail absolute inset-0" aria-hidden="true" data-no-reveal />
}
