'use client'

/**
 * SmoothScroll — site-wide inertia scrolling via Lenis.
 *
 * Gives the whole site the ScrollSmoother-style buttery scroll feel while
 * smoothing the NATIVE scroll position — so position: sticky (site header),
 * Framer Motion scroll hooks and IntersectionObserver reveals all keep
 * working exactly as before. Disabled for prefers-reduced-motion users and
 * on touch devices (native momentum scrolling is already ideal there).
 */

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.07,         // smoothing strength — lower = floatier
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,    // keep native momentum scrolling on touch devices
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
