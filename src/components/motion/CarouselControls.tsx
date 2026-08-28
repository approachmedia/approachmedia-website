'use client'

/**
 * Motion UI's carousel control strip: prev button, position dots, next
 * button. Ported as supplied, with two adjustments.
 *
 * Timings come from ./tokens rather than a @motion/ui-theme provider.
 *
 * Colours are read through hsl(). The supplied component writes raw
 * `var(--primary)` into inline styles, which works where the custom property
 * holds a complete colour. Here every token is a bare HSL triple — `230 60%
 * 38%` — so the Tailwind config wraps them in hsl() and inline styles have to
 * do the same, or the declaration is simply invalid and the dot renders
 * transparent.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { SNAP, UI, withFade } from './tokens'

const FOCUS_RING =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const DOT_FAINT = 'hsl(var(--muted-foreground) / 0.45)'
const DOT_ACTIVE = 'hsl(var(--brand-green))'

export type ArrowDirection = 'prev' | 'next'

function ArrowIcon({ direction }: { direction: ArrowDirection }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ transform: direction === 'prev' ? 'scaleX(-1)' : undefined }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function StepButton({
  direction, onClick, label,
}: {
  direction: ArrowDirection
  onClick: () => void
  label: string
}) {
  const calm = !!useReducedMotion()
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex size-10 items-center justify-center rounded-lg border border-white/15 bg-surface text-muted-foreground transition-colors hover:border-brand-blue-glow/50 hover:text-foreground focus-visible:text-foreground ${FOCUS_RING}`}
      whileTap={calm ? undefined : { scale: 0.92 }}
      transition={SNAP}
    >
      <ArrowIcon direction={direction} />
    </motion.button>
  )
}

export interface CarouselControlsProps {
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  /** Makes the dots selectable. */
  onSelect?: (index: number) => void
  prevLabel?: string
  nextLabel?: string
  dotsLabel?: string
  className?: string
}

export function CarouselControls({
  index, total, onPrev, onNext, onSelect,
  prevLabel = 'Previous testimonial',
  nextLabel = 'Next testimonial',
  dotsLabel = 'Choose a testimonial',
  className,
}: CarouselControlsProps) {
  const calm = !!useReducedMotion()
  const transition = calm ? { ...SNAP, type: 'tween' as const } : withFade(UI)

  const marks = Array.from({ length: total }).map((_, i) => {
    const selected = i === index
    const animate = { scaleX: selected ? 1 : 0.34, opacity: selected ? 1 : 0.5 }
    const shape = 'block h-1.5 w-[18px] origin-center rounded-full'

    if (onSelect) {
      return (
        <motion.button
          key={i}
          type="button"
          role="tab"
          aria-selected={selected}
          aria-label={`Show testimonial ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`${shape} ${FOCUS_RING}`}
          style={{ backgroundColor: selected ? DOT_ACTIVE : DOT_FAINT }}
          animate={animate}
          transition={transition}
        />
      )
    }

    return (
      <motion.span
        key={i}
        className={shape}
        style={{ backgroundColor: selected ? DOT_ACTIVE : DOT_FAINT }}
        animate={animate}
        transition={transition}
      />
    )
  })

  return (
    <div className={`flex items-center gap-3${className ? ` ${className}` : ''}`}>
      <StepButton direction="prev" onClick={onPrev} label={prevLabel} />
      {onSelect ? (
        <div role="tablist" aria-label={dotsLabel} className="flex items-center gap-1.5">
          {marks}
        </div>
      ) : (
        <div aria-hidden="true" className="flex items-center gap-1.5">
          {marks}
        </div>
      )}
      <StepButton direction="next" onClick={onNext} label={nextLabel} />
    </div>
  )
}
