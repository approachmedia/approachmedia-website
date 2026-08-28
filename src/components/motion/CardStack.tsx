'use client'

/**
 * Motion UI's card-stack mechanic. The geometry and phase logic are the
 * supplied component's, unchanged: cards fan back with a depth-derived
 * translate, scale, rotation and opacity, the outgoing card pops up and away
 * while the incoming one arrives from the same place, and the index wraps so
 * the stack never runs out.
 *
 * Two things are different.
 *
 * Timings come from ../motion/tokens rather than a @motion/ui-theme provider;
 * see that file for why. The "off" motion mode goes with it — the theme's
 * default reduced-motion strategy is "calm" and nothing here selects
 * otherwise, so calm is the only degraded path.
 *
 * The stage measures itself. The demo hard-codes a 19rem card, which works
 * when every quote is a similar length. Real testimonials are not: the ones
 * on this site run from 90 to 430 characters, so a fixed height either clips
 * the long one or leaves a hole under the short ones. Cards are absolutely
 * positioned and cannot size their own container, so the tallest is measured
 * and the stage follows it.
 */

import {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { motion, useReducedMotion, wrap } from 'framer-motion'
import { SNAP, TRAVEL, UI, withFade } from './tokens'

const FOCUS_RING =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

const DEPTH_OPACITY_STEP = 0.14
const POP_X_TRAVEL_FACTOR = 1.1
const POP_Y_TRAVEL_FACTOR = 0.75
const POP_ROTATION_FACTOR = 2

type CardStackPhase = 'resting' | 'outgoing' | 'incoming'

function resolveDepth(i: number, index: number, total: number) {
  return wrap(0, total, i - index)
}

export interface CardStackHandle {
  index: number
  direction: number
  movement: number
  total: number
  advance(dir: number): void
  next(): void
  prev(): void
  go(index: number): void
}

/** Headless controller for front-card index and movement direction. */
export function useCardStack({ total }: { total: number }): CardStackHandle {
  const [position, setPosition] = useState({ index: 0, direction: 1, movement: 0 })

  const advance = useCallback(
    (dir: number) => {
      setPosition(current => ({
        index: wrap(0, total, current.index + dir),
        direction: dir,
        movement: current.movement + 1,
      }))
    },
    [total],
  )

  const next = useCallback(() => advance(1), [advance])
  const prev = useCallback(() => advance(-1), [advance])

  // Jumping to an arbitrary card still needs a direction for the pop, so it
  // is taken from which way round the ring is shorter.
  const go = useCallback(
    (target: number) => {
      setPosition(current => {
        if (target === current.index) return current
        const forward = wrap(0, total, target - current.index)
        return {
          index: target,
          direction: forward <= total / 2 ? 1 : -1,
          movement: current.movement + 1,
        }
      })
    },
    [total],
  )

  return { ...position, total, advance, next, prev, go }
}

interface CardStackContextValue {
  index: number
  direction: number
  movement: number
  total: number
  visibleBehind: number
  cardGap: number
  cardScaleStep: number
  fanRotation: number
  calm: boolean
  cardHeight: number | null
  register: (el: HTMLElement | null, i: number) => void
}

const CardStackContext = createContext<CardStackContextValue | null>(null)
const CardStackIndexContext = createContext(0)

export function CardStackCard({ children, className }: { children?: ReactNode; className?: string }) {
  const ctx = useContext(CardStackContext)
  if (!ctx) throw new Error('CardStackCard must be rendered inside <CardStack>.')
  const i = useContext(CardStackIndexContext)

  const {
    index, direction, movement, total, visibleBehind,
    cardGap, cardScaleStep, fanRotation, calm, cardHeight, register,
  } = ctx

  const depth = resolveDepth(i, index, total)
  const isFront = depth === 0
  const distance = Math.abs(depth)
  const isVisible = distance <= visibleBehind

  const phase: CardStackPhase =
    movement === 0
      ? 'resting'
      : direction > 0 && i === wrap(0, total, index - 1)
        ? 'outgoing'
        : direction < 0 && isFront
          ? 'incoming'
          : 'resting'

  const restY = depth * cardGap
  const restScale = Math.max(0, 1 - distance * cardScaleStep)
  const restRotate = isFront ? 0 : depth * fanRotation
  const restOpacity = isVisible ? 1 - distance * DEPTH_OPACITY_STEP : 0
  const restTransform = `translate3d(0px, ${restY}px, 0px) scale(${restScale}) rotate(${restRotate}deg)`
  const frontTransform = 'translate3d(0px, 0px, 0px) scale(1) rotate(0deg)'

  const popX = calm ? 0 : -TRAVEL.section * POP_X_TRAVEL_FACTOR
  const popY = calm ? 0 : -TRAVEL.section * POP_Y_TRAVEL_FACTOR
  const popRotate = calm ? 0 : -fanRotation * POP_ROTATION_FACTOR
  const popTransform = `translate3d(${popX}px, ${popY}px, 0px) scale(1) rotate(${popRotate}deg)`

  const animation =
    phase === 'outgoing'
      ? { opacity: [1, 0], transform: [frontTransform, popTransform] }
      : phase === 'incoming'
        ? { opacity: [0, 1], transform: [popTransform, frontTransform] }
        : { opacity: restOpacity, transform: restTransform }

  const shuffle = calm ? { ...SNAP, type: 'tween' as const } : withFade(UI)

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      data-card-stack-index={i}
      data-card-stack-depth={depth}
      data-card-stack-phase={phase}
      style={{
        zIndex: phase === 'outgoing' ? total + 1 : total - distance,
        pointerEvents: isFront ? 'auto' : 'none',
        // Every card takes the tallest card's height, so the fan behind the
        // front one lines up instead of stepping in and out as the quotes
        // change length.
        height: cardHeight ?? undefined,
      }}
      aria-hidden={isFront ? undefined : true}
      initial={
        movement > 0 || isFront
          ? false
          : { opacity: restOpacity, transform: calm ? restTransform : frontTransform }
      }
      animate={animation}
      transition={shuffle}
    >
      <div ref={el => register(el, i)} className={`h-full w-full${className ? ` ${className}` : ''}`}>
        {children}
      </div>
    </motion.div>
  )
}

export interface CardStackProps {
  state: CardStackHandle
  children?: ReactNode
  /** Cards behind the front that stay visible. */
  visibleBehind?: number
  /** Vertical push per step back, in px. */
  cardGap?: number
  /** Scale shed per step back. */
  cardScaleStep?: number
  /** Fan rotation per step back, in degrees. */
  fanRotation?: number
  label?: string
  className?: string
}

export function CardStack({
  state,
  children,
  visibleBehind = 2,
  cardGap = 16,
  cardScaleStep = 0.05,
  fanRotation = 4,
  label = 'Card stack',
  className,
}: CardStackProps) {
  const calm = !!useReducedMotion()

  // Measured rather than configured: see the note at the top of the file.
  const faces = useRef(new Map<number, HTMLElement>())
  const [cardHeight, setCardHeight] = useState<number | null>(null)

  const frame = useRef<number | undefined>(undefined)

  /**
   * Two passes, because the thing being measured is also the thing being
   * set. Clearing the height first lets every card fall back to its natural
   * size; the measurement then happens a frame later, once that layout has
   * happened. Measured the other way round it converges on whichever card
   * happened to be shortest on the first pass.
   *
   * offsetHeight, not getBoundingClientRect: the cards behind the front one
   * are scaled down by the fan, and a client rect reports the scaled size
   * where offsetHeight reports the laid-out one.
   */
  const measure = useCallback(() => {
    setCardHeight(null)
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const heights = Array.from(faces.current.values()).map(el => el.offsetHeight)
      if (heights.length) setCardHeight(Math.max(...heights))
    })
  }, [])

  const register = useCallback((el: HTMLElement | null, i: number) => {
    if (el) faces.current.set(i, el)
    else faces.current.delete(i)
  }, [])

  useEffect(() => {
    measure()
    // Fonts change every quote's height, and they land after first paint.
    void document.fonts?.ready.then(measure)

    // Width only. Height-only resizes are the mobile address bar collapsing,
    // and remeasuring there would drop the stack to nothing for a frame
    // mid-scroll.
    let lastWidth = window.innerWidth
    let debounce: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      clearTimeout(debounce)
      debounce = setTimeout(measure, 150)
    }

    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(debounce)
      if (frame.current) cancelAnimationFrame(frame.current)
      window.removeEventListener('resize', onResize)
    }
  }, [measure])

  const ctx: CardStackContextValue = {
    index: state.index,
    direction: state.direction,
    movement: state.movement,
    total: state.total,
    visibleBehind,
    cardGap,
    cardScaleStep,
    fanRotation,
    calm,
    cardHeight,
    register,
  }

  const cards = Children.toArray(children).filter(isValidElement)

  return (
    <div
      className={`relative w-full rounded-2xl focus-visible:ring-offset-4 ${FOCUS_RING}${className ? ` ${className}` : ''}`}
      style={{ minHeight: cardHeight ? cardHeight + visibleBehind * cardGap : undefined }}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          state.advance(1)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          state.advance(-1)
        }
      }}
    >
      <CardStackContext.Provider value={ctx}>
        {cards.map((child, i) => (
          <CardStackIndexContext.Provider key={(child as { key?: string }).key ?? i} value={i}>
            {child}
          </CardStackIndexContext.Provider>
        ))}
      </CardStackContext.Provider>
    </div>
  )
}
