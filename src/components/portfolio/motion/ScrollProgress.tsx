'use client'

/**
 * A 2px bar across the top of the screen that fills as the page is read.
 * Tracks scroll directly through a light spring, so wheel steps arrive as a
 * glide without the bar lagging the page. Reduced motion keeps the bar (it
 * is information, not decoration) and drops the spring.
 */

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand-green via-brand-green-glow to-brand-blue-glow"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  )
}
