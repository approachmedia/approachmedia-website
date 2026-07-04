'use client'

/**
 * CaseStudyHero — final version, per client direction.
 *
 * Dark full-viewport hero that scrolls away naturally: wide project image,
 * client name centered, metadata in the four corners, and the blueprint
 * construction-grid line art (client-selected shape) laid over the image.
 * Subtle only: image settles in on load and drifts gently on scroll; the
 * lines fade in and drift — nothing rotates, nothing floats.
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import GoldenRatio from './GoldenRatio'

export type CaseStudyHeroProps = {
  title:     string
  image:     string
  imageAlt:  string
  year:      string | null
  category:  string | null
  client:    string | null
  services:  string | null
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function CaseStudyHero({ title, image, imageAlt, year, category, client, services }: CaseStudyHeroProps) {
  const prefersReduced = useReducedMotion()

  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 900], ['0%', '12%'])
  const linesY = useTransform(scrollY, [0, 900], ['0%', '-6%'])

  const corner = 'absolute z-20 text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 md:text-xs'

  return (
    <section className="relative flex h-[90vh] min-h-[540px] items-center justify-center overflow-hidden bg-black">

      {/* Image — slow settle on load, gentle parallax on scroll */}
      <motion.div
        initial={prefersReduced ? false : { scale: 1.08, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={prefersReduced ? undefined : { y: imageY }}
        className="absolute inset-0 will-change-transform"
      >
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* Golden ratio construction — the final selected shape, full-bleed */}
      <div className="absolute inset-0 z-10">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: EASE }}
          style={prefersReduced ? undefined : { y: linesY }}
          className="h-full w-full will-change-transform"
        >
          <GoldenRatio className="h-full w-full" />
        </motion.div>
      </div>

      {/* Corner metadata */}
      {year     && <p className={`${corner} left-5 top-6 md:left-10 md:top-9`}>Year: {year}</p>}
      {category && <p className={`${corner} right-5 top-6 text-right md:right-10 md:top-9`}>{category}</p>}
      {client   && <p className={`${corner} bottom-6 left-5 md:bottom-9 md:left-10`}>Client: {client}</p>}
      {services && <p className={`${corner} bottom-6 right-5 max-w-[46%] text-right md:bottom-9 md:right-10`}>{services}</p>}

      {/* Centered name */}
      <motion.p
        initial={prefersReduced ? false : { opacity: 0, y: 26, letterSpacing: '0.28em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
        transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
        className="relative z-20 max-w-5xl px-6 text-center font-display text-4xl font-black uppercase leading-none text-white md:text-7xl"
      >
        {title}
      </motion.p>

      {/* Scroll cue */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/50"
      >
        <motion.span animate={prefersReduced ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="block text-lg">↓</motion.span>
      </motion.span>
    </section>
  )
}
