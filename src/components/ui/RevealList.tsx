'use client'

/**
 * RevealList — reference-video list treatment.
 *
 * Hairline-divided rows reveal one by one on scroll. A single brand-green
 * square travels down the left rail with scroll progress, rotating as it
 * moves and fading out at the bottom — and as it passes each row, the row
 * eases inward (right) then settles back to left alignment.
 */

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const
const PUSH_PX = 18

function Row({
  progress, index, count, prefersReduced, children,
}: {
  progress: MotionValue<number>
  index: number
  count: number
  prefersReduced: boolean | null
  children: string
}) {
  const center = (index + 0.5) / count
  const x = useTransform(progress, v => {
    const influence = Math.max(0, 1 - Math.abs(v - center) * count * 1.4)
    return prefersReduced ? 0 : influence * PUSH_PX
  })

  return (
    <motion.li
      style={{ x }}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
      className="flex items-start gap-4 py-5 pl-6 will-change-transform"
    >
      <span className="text-sm leading-relaxed text-foreground md:text-base">{children}</span>
    </motion.li>
  )
}

export default function RevealList({ items }: { items: string[] }) {
  const prefersReduced = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: railRef, offset: ['start 0.75', 'end 0.55'] })
  const progress      = useSpring(scrollYProgress, { stiffness: 55, damping: 20 })
  const markerTop     = useTransform(progress, v => `${Math.min(1, Math.max(0, v)) * 100}%`)
  const markerRot     = useTransform(progress, [0, 1], [0, 315])
  const markerOpacity = useTransform(scrollYProgress, [0, 0.02, 0.93, 1], [0, 1, 1, 0])

  return (
    <div ref={railRef} className="relative">
      {!prefersReduced && (
        <motion.span
          style={{ top: markerTop, rotate: markerRot, opacity: markerOpacity }}
          className="absolute left-0 z-10 -mt-1 h-2 w-2 bg-brand-green will-change-transform"
          aria-hidden
        />
      )}

      <ul className="divide-y divide-white/10 border-y border-white/10">
        {items.map((item, i) => (
          <Row key={item} progress={progress} index={i} count={items.length} prefersReduced={prefersReduced}>
            {item}
          </Row>
        ))}
      </ul>
    </div>
  )
}
