'use client'

/**
 * Scroll-reveal primitives for the Agentura-style case study flow.
 *
 * <Reveal>          — children fade + rise as they enter the viewport.
 * <EditorialImage>  — image un-clips from the bottom while settling from a
 *                     slight zoom, exactly once, as it scrolls into view.
 */

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

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

  return (
    <figure className={`relative m-0 ${className}`}>
      <div className={`relative overflow-hidden ${aspect} bg-slate-900`}>
        {prefersReduced ? (
          <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-0"
          >
            <motion.img
              src={src}
              alt={alt}
              loading="lazy"
              initial={{ scale: 1.18 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.4, ease: EASE }}
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
