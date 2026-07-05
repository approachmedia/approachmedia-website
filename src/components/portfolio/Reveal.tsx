'use client'

/**
 * Scroll-reveal primitives for the Agentura-style case study flow.
 *
 * <Reveal>          — children fade + rise as they enter the viewport.
 * <EditorialImage>  — image un-clips from the bottom while settling from a
 *                     slight zoom, exactly once, as it scrolls into view.
 */

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function EditorialImage({
  src, alt, caption, aspect = 'aspect-[16/9]', className = '',
}: {
  src:      string
  alt:      string
  caption?: string | null
  aspect?:  string
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  const [failed, setFailed] = useState(false)

  // Observe the UNCLIPPED figure wrapper, not the clipped layer itself —
  // newer Chrome treats a fully clip-pathed element as never intersecting,
  // so a whileInView on the clipped div would deadlock (clipped because not
  // in view, not in view because clipped).
  const figRef = useRef<HTMLElement>(null)
  const inView = useInView(figRef, { once: true, margin: '-60px' })

  // A missing or broken image collapses the block entirely — never leave a
  // giant empty placeholder box reserving space on the page.
  if (!src || failed) return null

  return (
    <figure ref={figRef} className={`relative m-0 ${className}`}>
      <div className={`relative overflow-hidden ${aspect} bg-slate-900`}>
        {prefersReduced ? (
          <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={inView ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute inset-0"
          >
            <motion.img
              src={src}
              alt={alt}
              loading="lazy"
              onError={() => setFailed(true)}
              initial={{ scale: 1.06 }}
              animate={inView ? { scale: 1 } : undefined}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
            />
          </motion.div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-slate-500">{caption}</figcaption>
      )}
    </figure>
  )
}
