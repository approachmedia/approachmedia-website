'use client'

/**
 * Cursor spotlight on cards across the site (the light idea from style 10,
 * applied without rewriting each page). Any card matching the selector gets a
 * soft radial glow and a lit border that follow the pointer while it is over
 * the card. One listener for the document; cards opt in by class, so the
 * older hand-written pages pick it up without markup changes.
 *
 * Fine pointers only; nothing under reduced motion.
 */

import { useEffect } from 'react'

export const SPOT_SELECTOR = [
  '.am-spot', '.service-card', '.srv-card', '.why-service-card', '.positioning-card',
  '.feature-check-card', '.about-block-card', '.flow-card', '.vm-card', '.principle-card',
  '.service-page-card', '.portfolio-card', '.testimonial-card', '.expo-card-link', '.cty-card',
].join(', ')

export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let lit: HTMLElement | null = null
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(SPOT_SELECTOR)
      if (lit && lit !== el) { lit.classList.remove('am-lit'); lit = null }
      if (!el) return
      if (!el.classList.contains('am-spot-ready')) el.classList.add('am-spot-ready')
      const r = el.getBoundingClientRect()
      el.style.setProperty('--sx', `${e.clientX - r.left}px`)
      el.style.setProperty('--sy', `${e.clientY - r.top}px`)
      if (lit !== el) { el.classList.add('am-lit'); lit = el }
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
  return null
}
