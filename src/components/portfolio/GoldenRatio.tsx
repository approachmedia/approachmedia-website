'use client'

/**
 * GoldenRatio — exact golden-ratio construction that DRAWS ITSELF on load.
 *
 * True Fibonacci subdivision of a 1618×1000 golden rectangle (φ = 1.618).
 * Every stroke animates in via pathLength (the same stroke-dash technique as
 * GSAP DrawSVG, natively supported by Framer Motion — no extra library):
 *
 *   1. the rectangle and Fibonacci squares draw first,
 *   2. the golden spiral sweeps through all eight squares,
 *   3. the inscribed circles bloom,
 *   4. the reciprocal diagonals strike through to the pole,
 *   5. the faint golden-division grid fades in last.
 *
 * Respects prefers-reduced-motion (renders the finished drawing).
 */

import { motion, useReducedMotion } from 'framer-motion'

const COLORS = {
  squares:   'rgba(255,255,255,0.30)',
  circles:   'rgba(255,255,255,0.13)',
  diagonals: 'rgba(255,255,255,0.22)',
  grid:      'rgba(255,255,255,0.09)',
  spiral:    'rgba(255,255,255,0.48)',
}

const SPIRAL_D = `M 0 1000
  A 1000 1000 0 0 1 1000 0
  A 618 618 0 0 1 1618 618
  A 382 382 0 0 1 1236 1000
  A 236 236 0 0 1 1000 764
  A 146 146 0 0 1 1146 618
  A 90 90 0 0 1 1236 708
  A 56 56 0 0 1 1180 764
  A 34 34 0 0 1 1146 730`

const SQUARE_LINES: [number, number, number, number][] = [
  [1000, 0,   1000, 1000],
  [1000, 618, 1618, 618],
  [1236, 618, 1236, 1000],
  [1000, 764, 1236, 764],
  [1146, 618, 1146, 764],
  [1146, 708, 1236, 708],
  [1180, 708, 1180, 764],
]

const CIRCLES: [number, number, number][] = [
  [500, 500, 500], [1309, 309, 309], [1427, 809, 191], [1118, 882, 118],
  [1073, 691, 73], [1191, 663, 45], [1208, 736, 28],
]

const EASE = [0.65, 0, 0.35, 1] as const

export default function GoldenRatio({ className = '' }: { className?: string }) {
  const prefersReduced = useReducedMotion()

  // draw(delay, duration) — the DrawSVG-style stroke reveal
  const draw = (delay: number, duration: number) =>
    prefersReduced
      ? {}
      : {
          initial:    { pathLength: 0, opacity: 0 },
          animate:    { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { delay, duration, ease: EASE },
            opacity:    { delay, duration: 0.01 },
          },
        }

  return (
    <svg
      viewBox="0 0 1618 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      {/* 1 — outer rectangle + Fibonacci squares */}
      <motion.rect
        x="0" y="0" width="1618" height="1000"
        stroke={COLORS.squares} strokeWidth="1.5" fill="none"
        {...draw(0.2, 1.2)}
      />
      {SQUARE_LINES.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={COLORS.squares} strokeWidth="1.5"
          {...draw(0.5 + i * 0.14, 0.7)}
        />
      ))}

      {/* 2 — the golden spiral, the hero stroke */}
      <motion.path
        d={SPIRAL_D}
        fill="none" stroke={COLORS.spiral} strokeWidth="2"
        {...draw(0.9, 2.2)}
      />

      {/* 3 — inscribed circles bloom */}
      {CIRCLES.map(([cx, cy, r], i) => (
        <motion.circle
          key={i}
          cx={cx} cy={cy} r={r}
          stroke={COLORS.circles} strokeWidth="1.5" fill="none"
          {...draw(1.6 + i * 0.12, 0.9)}
        />
      ))}

      {/* 4 — reciprocal diagonals strike through to the pole */}
      <motion.line
        x1="0" y1="0" x2="1618" y2="1000"
        stroke={COLORS.diagonals} strokeWidth="1.5"
        {...draw(2.6, 0.8)}
      />
      <motion.line
        x1="1618" y1="0" x2="1000" y2="1000"
        stroke={COLORS.diagonals} strokeWidth="1.5"
        {...draw(2.8, 0.7)}
      />

      {/* 5 — faint golden-division grid fades in last */}
      <motion.g
        stroke={COLORS.grid} strokeWidth="1.5"
        initial={prefersReduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        <line x1="618" y1="0" x2="618" y2="1000" />
        <line x1="0" y1="382" x2="1618" y2="382" />
      </motion.g>
    </svg>
  )
}
