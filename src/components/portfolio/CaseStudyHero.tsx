'use client'

/**
 * CaseStudyHero — Agentura-style project hero.
 *
 * Full-viewport hero image that scrolls away normally (no pinning), with the
 * client name centered and metadata pinned to the four corners: year /
 * industry / client / services. The rotating outline geometry lives in
 * CaseStudyShapes — a page-level layer rendered by ProjectDetail — so the
 * shapes travel from the hero into the sections below it.
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export type CaseStudyHeroProps = {
  title:     string        // centered name (client or short project name)
  image:     string
  imageAlt:  string
  year:      string | null
  category:  string | null // top-right (industry)
  client:    string | null // bottom-left "CLIENT: X, CITY"
  services:  string | null // bottom-right "3 SIDE OPEN · DESIGN · FABRICATION"
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function CaseStudyHero({ title, image, imageAlt, year, category, client, services }: CaseStudyHeroProps) {
  const prefersReduced = useReducedMotion()

  // Gentle parallax: the image drifts down slightly as it scrolls away.
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 900], ['0%', '14%'])

  const corner = 'absolute z-20 text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 md:text-xs'

  return (
    <section className="relative flex h-[90vh] min-h-[540px] items-center justify-center overflow-hidden bg-black">

      {/* Hero image — slow settle on load, parallax drift on scroll */}
      <motion.div
        initial={prefersReduced ? false : { scale: 1.1, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
        style={prefersReduced ? undefined : { y: imageY }}
        className="absolute inset-0 will-change-transform"
      >
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </motion.div>

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* ── Corner metadata ── */}
      {year     && <p className={`${corner} left-5 top-6 md:left-10 md:top-9`}>Year: {year}</p>}
      {category && <p className={`${corner} right-5 top-6 text-right md:right-10 md:top-9`}>{category}</p>}
      {client   && <p className={`${corner} bottom-6 left-5 md:bottom-9 md:left-10`}>Client: {client}</p>}
      {services && <p className={`${corner} bottom-6 right-5 max-w-[46%] text-right md:bottom-9 md:right-10`}>{services}</p>}

      {/* ── Centered name ── */}
      <motion.p
        initial={prefersReduced ? false : { opacity: 0, y: 30, letterSpacing: '0.3em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        className="relative z-20 max-w-5xl px-6 text-center font-display text-4xl font-black uppercase leading-none text-white md:text-7xl"
      >
        {title}
      </motion.p>

      {/* Scroll cue */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 text-white/50 md:bottom-20"
      >
        <motion.span animate={prefersReduced ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="block text-lg">↓</motion.span>
      </motion.span>
    </section>
  )
}
