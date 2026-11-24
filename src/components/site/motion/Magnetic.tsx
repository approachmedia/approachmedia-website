'use client'

/**
 * Magnetic buttons, site-wide. A call-to-action within reach of the pointer
 * leans toward it (a quarter of the distance, at most 10px) and springs back
 * when the pointer leaves. One listener for the whole document; the elements
 * opt in by selector, so no component has to change.
 *
 * Fine pointers only; nothing under reduced motion.
 */

import { useEffect } from 'react'

const SELECTOR = '[data-magnetic], .iv-btn, .pfx-btn, .cs__btn, .am-btn'
const PULL = 0.25
const MAX = 10

export default function Magnetic() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let active: HTMLElement | null = null
    const release = (el: HTMLElement) => {
      el.style.transition = 'translate 500ms cubic-bezier(0.23, 1, 0.32, 1)'
      el.style.translate = '0 0'
    }
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(SELECTOR)
      if (active && active !== el) { release(active); active = null }
      if (!el) return
      active = el
      const r = el.getBoundingClientRect()
      const dx = Math.max(-MAX, Math.min(MAX, (e.clientX - (r.left + r.width / 2)) * PULL))
      const dy = Math.max(-MAX, Math.min(MAX, (e.clientY - (r.top + r.height / 2)) * PULL))
      el.style.transition = 'translate 120ms linear'
      el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
  return null
}
