'use client'

/**
 * The footer's wordmark (style 13, "hover footer"): a huge outlined word that
 * draws its own outline in once, the first time it scrolls into view, and
 * under the pointer reveals a brand-gradient stroke through a soft radial
 * mask that follows it. Decorative: aria-hidden, the brand name is already
 * in the footer as text and as the logo.
 *
 * Drawn in a 3000-unit coordinate space with the type at full size: in a
 * small viewBox the browser laid the outlines out at 72 units and enlarged
 * them about six times, which stepped the curves.
 */

import { useId, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function TextHoverEffect({ text, className }: { text: string; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const svg = useRef<SVGSVGElement>(null)
  const seen = useInView(svg, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [mask, setMask] = useState({ cx: '50%', cy: '50%' })

  return (
    <svg
      ref={svg}
      aria-hidden="true"
      width="100%"
      height="100%"
      viewBox="0 0 3000 1000"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={e => {
        const r = svg.current!.getBoundingClientRect()
        setMask({ cx: `${((e.clientX - r.left) / r.width) * 100}%`, cy: `${((e.clientY - r.top) / r.height) * 100}%` })
      }}
      className={`select-none uppercase ${className ?? ''}`}
    >
      <defs>
        <linearGradient id={`g${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="3000" y2="0">
          <stop offset="0%" stopColor="hsl(110 65% 60%)" />
          <stop offset="50%" stopColor="hsl(160 70% 55%)" />
          <stop offset="100%" stopColor="hsl(230 80% 65%)" />
        </linearGradient>
        <motion.radialGradient
          id={`r${id}`}
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: '50%', cy: '50%' }}
          animate={mask}
          transition={{ duration: 0.12, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`m${id}`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#r${id})`} />
        </mask>
      </defs>
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" textRendering="geometricPrecision" strokeWidth="3"
        className="am-word fill-transparent stroke-white/25"
        style={{ opacity: hovered ? 0.7 : 0, transition: 'opacity 300ms ease' }}
      >
        {text}
      </text>
      <motion.text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" textRendering="geometricPrecision" strokeWidth="3"
        className="am-word fill-transparent stroke-[hsl(110_55%_50%/0.55)]"
        initial={reduce ? false : { strokeDashoffset: 10000, strokeDasharray: 10000 }}
        animate={seen || reduce ? { strokeDashoffset: 0, strokeDasharray: 10000 } : undefined}
        transition={{ duration: 3.2, ease: 'easeInOut' }}
      >
        {text}
      </motion.text>
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" textRendering="geometricPrecision" strokeWidth="4.5"
        stroke={`url(#g${id})`} mask={`url(#m${id})`}
        className="am-word fill-transparent"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 300ms ease' }}
      >
        {text}
      </text>
    </svg>
  )
}
