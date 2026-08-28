'use client'

/**
 * A beam that traces a card's border while the pointer is over it.
 *
 * The technique is the supplied component's: a conic gradient spun inside a
 * box that is masked down to a rim, so the lit streak appears to run around
 * the border. Two masks are composited — one clipped to the content box, one
 * to the whole box — and excluding the first from the second leaves a ring of
 * exactly `thickness`.
 *
 * Three things differ from what was supplied.
 *
 * It runs on hover rather than continuously. The original animates whenever
 * the card is in view, which on this site would mean seven cards spinning
 * gradients the entire time a visitor is on the page. Tied to the pointer it
 * is a highlight — it marks the card being read — instead of ambient
 * decoration competing with the copy.
 *
 * The colours are the site's own. The original reads var(--primary) directly,
 * which works where that property holds a complete colour; every token here
 * is a bare HSL triple, so a raw var() reference is an invalid declaration
 * and the beam renders as nothing. It sweeps brand-blue-glow into
 * brand-green, the same pair as --gradient-accent.
 *
 * The corner radius is a prop. The original hardcodes rounded-lg, and a rim
 * whose radius does not match the card it traces reads as a misaligned
 * outline at every corner.
 *
 * Nothing runs on touch: there is no hover there, and a beam triggered by a
 * tap would fire as the visitor is already leaving for the next thing. Also
 * nothing under reduced motion.
 */

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Clip to the content box, then to the whole box; excluding one leaves the rim. */
const RING_MASK = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)'

/**
 * The lit streak is the last `size` degrees of the sweep, ramping from
 * transparent through a half-strength blue to a solid green at 360, so the
 * beam has a tail behind its head rather than a hard edge.
 */
function beamGradient(size: number) {
  const tailStart = Math.max(0, 360 - size)
  const mid = tailStart + (360 - tailStart) * 0.65
  return (
    'conic-gradient(from 0deg at 50% 50%, ' +
    'transparent 0deg, ' +
    `transparent ${tailStart}deg, ` +
    `hsl(var(--brand-blue-glow) / 0.55) ${mid.toFixed(1)}deg, ` +
    'hsl(var(--brand-green)) 360deg)'
  )
}

export interface BorderBeamProps {
  children: ReactNode
  /** Angular length of the lit streak, in degrees. */
  size?: number
  /** Seconds for one full lap. */
  duration?: number
  /** Thickness of the rim, in px. */
  thickness?: number
  /** Must match the card's own radius, or the rim sits off its corners. */
  radius?: string
  /** Merged onto the wrapper. */
  className?: string
}

export function BorderBeam({
  children,
  size = 120,
  duration = 4,
  thickness = 2,
  radius = '1rem',
  className,
}: BorderBeamProps) {
  const calm = !!useReducedMotion()
  const [canHover, setCanHover] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover)')
    const apply = () => setCanHover(query.matches)
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])

  const enabled = canHover && !calm

  return (
    <div
      className={`relative${className ? ` ${className}` : ''}`}
      onPointerEnter={e => {
        if (e.pointerType === 'mouse') setHovered(true)
      }}
      onPointerLeave={() => setHovered(false)}
    >
      {children}

      {enabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={
            {
              borderRadius: radius,
              padding: thickness,
              WebkitMask: RING_MASK,
              WebkitMaskComposite: 'xor',
              mask: RING_MASK,
              maskComposite: 'exclude',
              // Faded rather than mounted on hover, so the beam arrives and
              // leaves instead of appearing mid-lap.
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.25s ease',
            } as CSSProperties
          }
        >
          <motion.span
            className="absolute inset-[-75%] block"
            style={{ background: beamGradient(size) }}
            animate={hovered ? { rotate: 360 } : { rotate: 0 }}
            transition={
              hovered
                ? { duration, repeat: Infinity, ease: 'linear' }
                : { duration: 0 }
            }
          />
        </div>
      )}
    </div>
  )
}
