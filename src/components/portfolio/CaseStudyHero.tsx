'use client'

/**
 * CaseStudyHero — hero with the black→light scroll transition from the
 * reference recording.
 *
 * A 175vh wrapper pins the hero. As the user scrolls, a light-filled
 * rounded triangle scales up from the center of the image and swallows the
 * viewport; its fill matches the background of the sections below, so the
 * page reads as changing from dark to light. The brand mark (interlocked
 * triangle + circle) sits behind the centered name as still line art —
 * a gentle drift only, no rotation.
 */

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import BrandMark from './BrandMark'

export type CaseStudyHeroProps = {
  title:     string
  image:     string
  imageAlt:  string
  year:      string | null
  category:  string | null
  client:    string | null
  services:  string | null
}

export const CASE_LIGHT_BG = 'hsl(220 20% 96%)'
const EASE = [0.22, 1, 0.36, 1] as const

export default function CaseStudyHero({ title, image, imageAlt, year, category, client, services }: CaseStudyHeroProps) {
  const prefersReduced = useReducedMotion()
  const wrapRef        = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  // The expanding shape: dormant while the hero holds, then grows to cover the
  // screen, finishing exactly as the light content zone arrives (no dead gap).
  const shapeScale   = useTransform(scrollYProgress, [0.45, 1], [0, 18])
  const shapeRotate  = useTransform(scrollYProgress, [0.45, 1], [-8, 0])
  // Hero content calms down as the shape takes over.
  const contentFade  = useTransform(scrollYProgress, [0.45, 0.85], [1, 0])
  const imageScale   = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  // The mark drifts up slightly with scroll — drift, not rotation.
  const markY        = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  // After the light shape covers the screen, its own line-art mark fades in
  // (gray on light) so the handoff moment isn't a blank screen.
  const coverMarkOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])
  const coverMarkY       = useTransform(scrollYProgress, [0.8, 1], ['10%', '0%'])

  const corner = 'absolute z-20 text-[10px] font-bold uppercase tracking-[0.25em] text-white/80 md:text-xs'

  const heroInner = (
    <>
      {/* Image */}
      <motion.div
        initial={prefersReduced ? false : { scale: 1.08, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={prefersReduced ? undefined : { scale: imageScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
      </motion.div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      <motion.div style={prefersReduced ? undefined : { opacity: contentFade }} className="absolute inset-0">
        {/* Brand mark — still line art behind the name.
            Outer div owns the CSS centering; the inner motion.div only animates
            opacity/scale/y so Framer's transform never overwrites the translate. */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 md:h-[34rem] md:w-[34rem]">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 0.4, ease: EASE }}
            style={prefersReduced ? undefined : { y: markY }}
            className="h-full w-full will-change-transform"
          >
            <BrandMark className="h-full w-full" stroke="rgba(255,255,255,0.32)" strokeWidth={0.9} />
          </motion.div>
        </div>

        {/* Corner metadata */}
        {year     && <p className={`${corner} left-5 top-6 md:left-10 md:top-9`}>Year: {year}</p>}
        {category && <p className={`${corner} right-5 top-6 text-right md:right-10 md:top-9`}>{category}</p>}
        {client   && <p className={`${corner} bottom-6 left-5 md:bottom-9 md:left-10`}>Client: {client}</p>}
        {services && <p className={`${corner} bottom-6 right-5 max-w-[46%] text-right md:bottom-9 md:right-10`}>{services}</p>}

        {/* Centered name */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 26, letterSpacing: '0.28em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.08em' }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="max-w-5xl text-center font-display text-4xl font-black uppercase leading-none text-white md:text-7xl"
          >
            {title}
          </motion.p>
        </div>

        {/* Scroll cue */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/50"
        >
          <motion.span animate={prefersReduced ? undefined : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="block text-lg">↓</motion.span>
        </motion.span>
      </motion.div>

      {/* The expanding light shape — rounded triangle, fill = next section bg */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-64 w-64 -translate-x-1/2 -translate-y-1/2">
          <motion.div style={{ scale: shapeScale, rotate: shapeRotate }} className="h-full w-full will-change-transform">
            <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
              <path
                d="M50 10 L90 82 L10 82 Z"
                fill={CASE_LIGHT_BG}
                stroke={CASE_LIGHT_BG}
                strokeWidth="16"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Post-cover state: gray line mark on the light background */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 md:h-[28rem] md:w-[28rem]">
          <motion.div style={{ opacity: coverMarkOpacity, y: coverMarkY }} className="h-full w-full will-change-transform">
            <BrandMark className="h-full w-full" stroke="hsl(220 15% 80%)" strokeWidth={0.8} />
          </motion.div>
        </div>
      )}
    </>
  )

  if (prefersReduced) {
    return (
      <section className="relative flex h-[90vh] min-h-[540px] items-center justify-center overflow-hidden bg-black">
        {heroInner}
      </section>
    )
  }

  return (
    <div ref={wrapRef} className="relative" style={{ height: '175vh', backgroundColor: CASE_LIGHT_BG }}>
      <section className="sticky top-0 h-screen min-h-[540px] overflow-hidden bg-black">
        {heroInner}
      </section>
    </div>
  )
}
