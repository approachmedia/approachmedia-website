'use client'

/**
 * Motion UI's magnetic-pull field and rolling-text label, combined on one
 * call to action.
 *
 * Two mechanics, both from the supplied sections:
 *
 *  - Magnetic. A padded field zone around the button reads the pointer and
 *    translates the button a fraction of the way toward it, clamped, on a
 *    spring. Mouse only: on touch there is no hover, and a pointer that only
 *    exists during a tap would just make the target move away from the
 *    thumb.
 *  - Rolling text. The label is rendered twice inside a clipped box. On
 *    hover or keyboard focus the stack shifts by exactly one line, so the
 *    duplicate replaces the original without the button changing size.
 *
 * The supplied versions are both `<button>`s. Every call to action on this
 * site is a link to /contact or /portfolio, so this renders an anchor —
 * navigation and a real href in the served HTML, not an onClick.
 *
 * The rolling label is aria-hidden and the accessible name comes from the
 * anchor, because the text is in the DOM twice.
 *
 * The character-stagger variant of the roll is not carried across. It splits
 * both copies with splitText on every render pass and coordinates two
 * animations through a latch controller, and at this size — one short label —
 * it looks the same as moving the whole label at once.
 */

import Link from 'next/link'
import { useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import { GENTLE, UI, withFade } from './tokens'

/** Fraction of the pointer's offset from centre applied as translation. */
const PULL_STRENGTH = 0.35
/** Hard clamp on the displacement, in px. */
const MAX_PULL = 26

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value))
}

/**
 * Variant and size rather than a finished className: ui/button.tsx is a
 * client module, so buttonVariants() cannot be called from a server
 * component, and every section that holds a call to action here is one.
 */
export function MagneticCta({
  href, children, variant = 'hero', size = 'xl', icon,
}: {
  href: string
  children: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  size?: VariantProps<typeof buttonVariants>['size']
  icon?: ReactNode
}) {
  const className = buttonVariants({ variant, size })
  const calm = !!useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const follow = { stiffness: GENTLE.stiffness, damping: GENTLE.damping }
  const x = useSpring(rawX, follow)
  const y = useSpring(rawY, follow)

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (calm || event.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Recover the rest centre from the live rect, which already includes the
    // current translation — otherwise the button chases its own offset.
    const centreX = rect.left + rect.width / 2 - x.get()
    const centreY = rect.top + rect.height / 2 - y.get()
    rawX.set(clamp((event.clientX - centreX) * PULL_STRENGTH, MAX_PULL))
    rawY.set(clamp((event.clientY - centreY) * PULL_STRENGTH, MAX_PULL))
  }

  const release = () => {
    rawX.set(0)
    rawY.set(0)
    setActive(false)
  }

  const rolled = active && !calm

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={release}
      // Negative margin plus equal padding: the field reaches beyond the
      // button without pushing the layout around it.
      className="-m-6 flex p-6"
    >
      <motion.div ref={ref} className="inline-flex" style={calm ? undefined : { x, y }}>
        <Link
          href={href}
          className={className}
          onMouseEnter={() => setActive(true)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
        >
          <span className="relative block overflow-hidden" aria-hidden="true">
            <motion.span
              className="block whitespace-nowrap"
              animate={{ transform: rolled ? 'translateY(100%)' : 'translateY(0%)' }}
              transition={withFade(UI)}
            >
              {children}
            </motion.span>
            <motion.span
              className="absolute inset-0 block whitespace-nowrap"
              animate={{ transform: rolled ? 'translateY(0%)' : 'translateY(-100%)' }}
              transition={withFade(UI)}
            >
              {children}
            </motion.span>
          </span>
          {/* The label is in the DOM twice and both copies are hidden from
              assistive tech, so the accessible name comes from here. */}
          <span className="sr-only">{children}</span>
          {icon}
        </Link>
      </motion.div>
    </div>
  )
}
