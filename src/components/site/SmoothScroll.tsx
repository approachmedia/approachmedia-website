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

/**
 * Clearance for the fixed header, so a section arrived at by fragment is not
 * tucked under it. Matches the scroll-mt-28 (7rem) the anchored sections
 * carry for the non-Lenis path.
 */
const HEADER_OFFSET = 112

/** Any of these means the visitor has taken over; stop correcting. */
const INTERRUPTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const

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
      // In-page "#" links. Without this Lenis keeps its own position and
      // writes it back on the next frame, so the browser's jump to the
      // fragment is undone and the click looks like it did nothing. No
      // offset here on purpose: Lenis honours the target's own
      // scroll-margin-top, which is how the anchored sections already clear
      // the fixed header.
      anchors: true,
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
   * Arriving on a fragment is the same problem in reverse. The browser does
   * jump to the element, and Lenis then writes position 0 back over it, so
   * /about#client-reviews landed at the top of the About page. Lenis has to
   * be told the target too. The id is looked up with getElementById rather
   * than querySelector, because a fragment is not required to be a valid CSS
   * selector and querySelector throws on one that is not.
   */
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    const id = decodeURIComponent(window.location.hash.slice(1))
    const target = id ? document.getElementById(id) : null

    if (!target) {
      lenis.scrollTo(0, { immediate: true })
      return
    }

    /**
     * One scroll is not enough, because where the element sits is not settled
     * at mount. Images are still being sized, and on /about the scrollcraft
     * engine gives its acts their scroll spans only once it has started,
     * which moves everything below the first act several thousand pixels
     * down. A single jump measured before that lands nowhere near the
     * section. So the position is re-checked and re-applied for up to a
     * second, and abandoned the moment the visitor scrolls for themselves.
     */
    let tries = 0
    let timer = 0
    let stopped = false

    const stop = () => {
      stopped = true
      window.clearTimeout(timer)
      for (const ev of INTERRUPTS) window.removeEventListener(ev, stop)
    }
    for (const ev of INTERRUPTS) window.addEventListener(ev, stop, { passive: true, once: true })

    const settle = () => {
      if (stopped) return
      const top = target.getBoundingClientRect().top
      if (Math.abs(top - HEADER_OFFSET) > 2) {
        // A number, not the element: passing the element makes Lenis apply
        // the target's scroll-margin-top as well, which on a section that
        // has one lands it a second header-height too low.
        lenis.scrollTo(window.scrollY + top - HEADER_OFFSET, { immediate: true })
      }
      if (++tries < 12) timer = window.setTimeout(settle, 120)
      else stop()
    }
    timer = window.setTimeout(settle, 0)

    return stop
  }, [pathname])

  return null
}
