'use client'

/**
 * CaseStudyShapes — the Agentura-style persistent geometry layer.
 *
 * Thin-outline shape clusters (brand triangle + circle) start spread wide
 * across the hero, then converge into a centered vertical "totem" as the user
 * scrolls, drifting slower than the page (parallax), rotating gently, and
 * fading away after the opening sections. Content scrolls normally past them.
 *
 * Render inside a `relative overflow-hidden` wrapper that spans the hero and
 * the first content sections. The layer is pointer-events-none.
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

type ClusterProps = {
  top:       string   // starting vertical position within the wrapper
  xStart:    number   // starting horizontal offset from center, in vw
  size:      string   // tailwind h/w, e.g. 'h-[24rem] w-[24rem]'
  dir:       1 | -1   // rotation direction
  triangleUp?: boolean
}

function Cluster({ top, xStart, size, dir, triangleUp = true }: ClusterProps) {
  const { scrollY } = useScroll()

  // Converge to center over the first ~700px of scroll
  const x       = useTransform(scrollY, [0, 700], [`${xStart}vw`, '0vw'])
  // Drift slower than the page: content moves at -1.0, shapes at -0.35
  const y       = useTransform(scrollY, v => v * 0.65 * -1 + v * 0.3)
  const rotate  = useTransform(scrollY, v => (dir * v) / 14)
  const opacity = useTransform(scrollY, [0, 1400, 2200], [1, 0.85, 0])

  const points = triangleUp ? '50,4 4,96 96,96' : '50,96 4,4 96,4'

  return (
    <motion.div
      style={{ top, x, y, rotate, opacity }}
      className={`absolute left-1/2 -ml-[13rem] ${size} will-change-transform`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <polygon points={points} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.4" />
        <circle cx="50" cy={triangleUp ? 62 : 38} r="36" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.4" />
      </svg>
    </motion.div>
  )
}

export default function CaseStudyShapes() {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block" aria-hidden>
      {/* Hero: spread wide — left wing, center, right wing */}
      <Cluster top="18vh" xStart={-26} size="h-[26rem] w-[26rem]" dir={1} />
      <Cluster top="12vh" xStart={0}   size="h-[30rem] w-[30rem]" dir={-1} triangleUp={false} />
      <Cluster top="18vh" xStart={26}  size="h-[26rem] w-[26rem]" dir={1} />

      {/* Below the fold: the totem chain the wings converge into */}
      <Cluster top="105vh" xStart={-6} size="h-[24rem] w-[24rem]" dir={-1} triangleUp={false} />
      <Cluster top="160vh" xStart={5}  size="h-[26rem] w-[26rem]" dir={1} />
      <Cluster top="215vh" xStart={-4} size="h-[22rem] w-[22rem]" dir={-1} triangleUp={false} />
    </div>
  )
}
