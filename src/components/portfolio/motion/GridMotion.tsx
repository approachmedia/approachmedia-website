'use client'

/**
 * Motion for the project grid, wrapped around server-rendered cards.
 *
 * - Reveal: each card's photograph opens upward from a clip as it first
 *   enters (once), its picture settling from 1.12 to the parallax scale.
 *   Cards already on screen at load are shown at once, with no animation,
 *   so the first screen never flashes empty. One entrance per card; the two
 *   columns already sit out of step, so no extra stagger is added.
 * - Parallax: the photograph drifts inside its frame as the card crosses the
 *   screen. Only cards near the viewport are computed; one scroll listener
 *   for the whole grid.
 * - Columns: on wide screens the right column travels slightly faster than
 *   the left, so the staggered grid shears gently as it scrolls.
 * - Cursor chip: over a card, a round arrow chip trails the pointer. Fine
 *   pointers only.
 *
 * Without JavaScript the cards are simply visible; the hiding class is only
 * added once this has mounted.
 */

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import '../portfolio-index.css'

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const DRIFT = 0.12

export default function GridMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const chip = useRef<HTMLDivElement>(null)

  useIso(() => {
    const el = root.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.pfx-card'))
    if (reduce) { cards.forEach(c => c.classList.add('is-in')); return }

    // Anything already on screen is shown before the first paint.
    const vh = window.innerHeight
    cards.forEach(c => {
      const r = c.getBoundingClientRect()
      if (r.top < vh * 0.92 && r.bottom > 0) c.classList.add('is-in', 'no-anim')
    })
    el.classList.add('pfx-armed')

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    cards.forEach(c => { if (!c.classList.contains('is-in')) io.observe(c) })

    // Parallax + column shear.
    const near = new Set<HTMLElement>()
    const nio = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) near.add(e.target as HTMLElement); else near.delete(e.target as HTMLElement) })
      schedule()
    }, { rootMargin: '25% 0px 25% 0px' })
    cards.forEach(c => nio.observe(c))
    const shear = el.querySelector<HTMLElement>('[data-shear]')

    let raf = 0
    const apply = () => {
      raf = 0
      const h = window.innerHeight
      near.forEach(card => {
        const frame = card.querySelector<HTMLElement>('.pfx-media')
        const img = frame?.querySelector<HTMLElement>('img')
        if (!frame || !img) return
        const r = frame.getBoundingClientRect()
        const k = Math.min(1, Math.max(0, (h - r.top) / (h + r.height)))
        img.style.setProperty('--py', `${((0.5 - k) * DRIFT * r.height).toFixed(1)}px`)
      })
      if (shear && window.innerWidth >= 768) {
        const r = el.getBoundingClientRect()
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - h)))
        shear.style.transform = `translate3d(0, ${(-p * 90).toFixed(1)}px, 0)`
      } else if (shear) shear.style.transform = ''
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    apply()

    // Cursor chip.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const c = chip.current
    let chipRaf = 0
    const pos = { x: 0, y: 0, tx: 0, ty: 0, on: false }
    const tick = () => {
      chipRaf = 0
      pos.x += (pos.tx - pos.x) * 0.2
      pos.y += (pos.ty - pos.y) * 0.2
      if (c) c.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pos.on ? 1 : 0.6})`
      if (Math.abs(pos.tx - pos.x) > 0.3 || Math.abs(pos.ty - pos.y) > 0.3) chipRaf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      if (!c) return
      const media = (e.target as HTMLElement).closest('.pfx-media')
      const on = !!media
      if (on !== pos.on) { pos.on = on; c.classList.toggle('is-on', on) }
      const r = el.getBoundingClientRect()
      pos.tx = e.clientX - r.left - 28
      pos.ty = e.clientY - r.top - 28
      if (!on) { pos.x = pos.tx; pos.y = pos.ty }
      if (!chipRaf) chipRaf = requestAnimationFrame(tick)
    }
    const onLeave = () => { pos.on = false; c?.classList.remove('is-on') }
    if (fine) { el.addEventListener('pointermove', onMove); el.addEventListener('pointerleave', onLeave) }

    return () => {
      io.disconnect(); nio.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (chipRaf) cancelAnimationFrame(chipRaf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={root} className="pfx-grid-root">
      {children}
      <div ref={chip} className="pfx-chip" aria-hidden="true"><ArrowUpRight /></div>
    </div>
  )
}
