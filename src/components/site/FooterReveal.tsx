'use client'

/**
 * Footer reveal — the page scrolls away to uncover the footer pinned beneath it.
 *
 * Adapted from the Motion example, with the one thing that example cannot do:
 * it hard-codes `h-[400px]` on both the footer and the spacer that reserves
 * room for it. This footer is six columns, a city list, social buttons and a
 * legal bar, and its height changes with the breakpoint and with the content.
 * A fixed number would either clip it or leave a gap, so the height is
 * measured and the spacer follows it.
 *
 * The effect is also switched off whenever it would work against the visitor,
 * which is more often than the example suggests:
 *
 *   - reduced-motion users get the plain footer;
 *   - if the footer is taller than most of the viewport it can never be seen
 *     in full while pinned, so it stays in normal flow — this is the usual
 *     outcome on a phone, where the columns stack;
 *   - if the page is too short to scroll the footer's own height, the reveal
 *     could never finish and the footer would sit half-faded and unreachable.
 *
 * In every disabled case the markup is identical and only the positioning
 * classes differ, so there is one DOM tree, no layout shift when the decision
 * flips, and a crawler or a visitor without JavaScript sees an ordinary
 * footer in the ordinary place.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SiteFooter from './SiteFooter'

/** Leave this much of the viewport for the footer to breathe into. */
const MAX_VIEWPORT_SHARE = 0.85

/** How faint the footer starts before any of it has been uncovered. */
const START_OPACITY = 0.25

/** Upward drift, in px, as it is revealed. */
const DRIFT = 40

export default function FooterReveal() {
  const slot = useRef<HTMLDivElement>(null)
  const footer = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [enabled, setEnabled] = useState(false)
  const prefersReduced = useReducedMotion()

  // 0 when the top of the reserved slot reaches the bottom of the viewport,
  // 1 when its bottom does — which, since the slot ends the document, is
  // exactly the moment the page has finished scrolling.
  const { scrollYProgress } = useScroll({ target: slot, offset: ['start end', 'end end'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [START_OPACITY, 1])
  const y = useTransform(scrollYProgress, [0, 1], [DRIFT, 0])

  useEffect(() => {
    const el = footer.current
    if (!el) return

    function evaluate() {
      const node = footer.current
      if (!node) return
      const measured = node.offsetHeight
      const viewport = window.innerHeight

      // Document height is unchanged by enabling the effect — the spacer is
      // exactly the footer's height — so this measurement is stable and
      // cannot oscillate between the two states.
      const scrollable = document.documentElement.scrollHeight - viewport

      setHeight(measured)
      setEnabled(
        !prefersReduced &&
        measured > 0 &&
        measured <= viewport * MAX_VIEWPORT_SHARE &&
        scrollable >= measured,
      )
    }

    evaluate()
    const observer = new ResizeObserver(evaluate)
    observer.observe(el)
    window.addEventListener('resize', evaluate)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', evaluate)
    }
  }, [prefersReduced])

  return (
    <div
      ref={slot}
      className={enabled ? 'relative' : undefined}
      style={enabled ? { height } : undefined}
    >
      <div className={enabled ? 'fixed bottom-0 left-0 z-0 w-full' : undefined}>
        <motion.div ref={footer} style={enabled ? { opacity, y } : undefined}>
          <SiteFooter />
        </motion.div>
      </div>
    </div>
  )
}
