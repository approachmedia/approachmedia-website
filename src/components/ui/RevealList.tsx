'use client'

/**
 * RevealList — reference-video "What you get" treatment: hairline-divided
 * rows that reveal one by one on scroll, each with a small brand-green
 * square marker that blinks in as its row arrives.
 */

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

export default function RevealList({ items }: { items: string[] }) {
  const prefersReduced = useReducedMotion()

  return (
    <ul className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
          className="relative flex items-start gap-4 py-5 pl-6"
        >
          <motion.span
            initial={prefersReduced ? false : { opacity: 0, scale: 0 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: i * 0.12 + 0.3 }}
            className="absolute left-0 top-[1.65rem] h-1.5 w-1.5 bg-brand-green"
            aria-hidden
          />
          <span className="text-sm leading-relaxed text-foreground md:text-base">{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}
