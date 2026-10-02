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

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      lerp: 0.07,         // smoothing strength — lower = floatier
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,    // keep native momentum scrolling on touch devices
    })

    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /**
   * Start every new page at the top.
   *
   * Next scrolls the window on a client-side navigation, but Lenis keeps its
   * own scroll position and writes it back on the next frame, so the window
   * reset alone did not stick. Lenis is told directly, and immediately — an
   * animated reset would be the same crawl from the bottom that this fixes.
   *
   * A hash is left alone: /industries#find-your-industry should land on the
   * section, not the top of the page.
   */
  useEffect(() => {
    if (window.location.hash) return
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [pathname])

  return null
}
