'use client'

/**
 * The three-bar to cross morph from Motion's sidebar example.
 *
 * The bars are SVG paths and the `d` attribute is animated, so the top bar
 * travels into one diagonal of the cross and the bottom into the other while
 * the middle fades. That is the whole point: it is one continuous object
 * changing shape, where swapping a menu icon for a close icon — which is
 * what this header did — is a cut with nothing in between.
 *
 * The example's own coordinates are kept exactly, including the asymmetry:
 * the bars span x 2 to 20 at rest and the diagonals span 3 to 17, so the
 * cross is inset slightly from the bars' full width. Changing that makes the
 * cross look oversized next to the bars it came from.
 *
 * Two things differ from the example. The stroke is currentColor rather than
 * its hardcoded near-black, since this header is dark. And the middle bar's
 * fade is not given a fixed 0.1s under reduced motion — the whole morph is
 * dropped to zero duration there, so the icon still reads the state, it just
 * gets there instantly.
 */

import { motion, useReducedMotion, type Transition, type Variants } from 'framer-motion'

function Bar({ variants, transition }: { variants: Variants; transition?: Transition }) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="currentColor"
      strokeLinecap="round"
      variants={variants}
      transition={transition}
    />
  )
}

export function MenuToggleIcon({ open }: { open: boolean }) {
  const calm = !!useReducedMotion()
  const instant: Transition | undefined = calm ? { duration: 0 } : undefined

  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 23 23"
      initial={false}
      animate={open ? 'open' : 'closed'}
      aria-hidden="true"
    >
      <Bar
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
        transition={instant}
      />
      <Bar
        variants={{
          closed: { opacity: 1, d: 'M 2 9.423 L 20 9.423' },
          open: { opacity: 0, d: 'M 2 9.423 L 20 9.423' },
        }}
        // Quicker than the two travelling bars so the middle is gone before
        // they arrive, rather than crossing through it.
        transition={calm ? { duration: 0 } : { duration: 0.1 }}
      />
      <Bar
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
        transition={instant}
      />
    </motion.svg>
  )
}
