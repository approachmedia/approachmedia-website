'use client'

/**
 * Line-by-line headline reveal with an orchestrated follower stagger.
 *
 * Motion UI's "editorial stagger" mechanic, ported to this project. Three
 * things about the shipped section did not fit and are handled differently:
 *
 *  1. It arrives through `npx shadcn add`, and this project has no
 *     components.json — the ui/ components here were hand-built. Running
 *     `shadcn init` to create one would rewrite globals.css and
 *     tailwind.config.ts against shadcn's defaults, which is where the whole
 *     Approach Media token system lives. So the component is written in
 *     rather than pulled in.
 *  2. Its stylesheet is Tailwind v4 (`@import "tailwindcss/theme.css"`,
 *     `@source`). This project is on 3.4.17, where those are not directives.
 *     Nothing here needs them: the mechanic is JS, and the section's own
 *     styling stays in the consuming component.
 *  3. It resolves its timings through a `@motion/ui-theme` provider — a whole
 *     motion design system for a site built entirely out of Motion UI
 *     sections. This site is not, so the numbers below are that theme's
 *     default preset written out, and the provider is not carried along.
 *
 * The headline is marked with `data-stagger-headline` and followers with
 * `data-stagger-item`, so a consumer keeps its own markup — which matters
 * where the heading already carries inline styling that splitting destroys.
 * `onSplit` is the hook for putting such styling back; see Hero.tsx.
 */

import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { animate, useReducedMotion } from 'framer-motion'
import { splitText } from 'motion-plus-dom'

const HEADLINE_ATTR = 'data-stagger-headline'
const ITEM_ATTR = 'data-stagger-item'

export const STAGGER_LINE_CLASS = 'stagger-line'
export const STAGGER_WORD_CLASS = 'stagger-word'

/**
 * The @motion/ui-theme default preset, resolved. Springs rather than
 * durations so an interrupted animation keeps its velocity; `duration` is
 * kept as the matched timing for the opacity channel, which is a tween so
 * that fade and travel land together.
 */
const GENTLE = { type: 'spring' as const, stiffness: 109.66, damping: 19.9, duration: 0.5 }
/** ui, slowed by the section's 1.25x follower factor. */
const FOLLOWER = { type: 'spring' as const, stiffness: 194.95, damping: 26.53, duration: 0.375 }
/** stagger.relaxed between headline lines, stagger.base between followers. */
const LINE_STAGGER = 0.15
const ITEM_STAGGER = 0.08
/** travel.enter */
const ITEM_TRAVEL = 24

/** Lines rise by a fraction of their own size, so it scales with the type. */
const LINE_RISE = '0.4em'
const ENTER_BLUR = 'blur(4px)'

/** Opacity is linear on purpose: eased fades front-load and read as a pop. */
function fade(duration: number) {
  return { type: 'tween' as const, duration, ease: 'linear' as const, inherit: true }
}

export interface StaggerSplit {
  lines: HTMLElement[]
  words: HTMLElement[]
}

export interface StaggerRevealProps {
  children: ReactNode
  className?: string
  /**
   * Runs after the headline is split and before it animates, with the
   * generated line and word spans. Splitting flattens the heading to plain
   * text, so anything the markup was carrying — a gradient, a highlight —
   * is reapplied here.
   */
  onSplit?: (split: StaggerSplit) => void
}

export function StaggerReveal({ children, className, onSplit }: StaggerRevealProps) {
  const container = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // Held in a ref so a change of callback identity between renders cannot
  // re-run the split — it would animate the hero a second time.
  const onSplitRef = useRef(onSplit)
  onSplitRef.current = onSplit

  useLayoutEffect(() => {
    const root = container.current
    if (!root) return

    const headline = root.querySelector<HTMLElement>(`[${HEADLINE_ATTR}]`)
    if (!headline) return

    const followers = Array.from(root.querySelectorAll<HTMLElement>(`[${ITEM_ATTR}]`))
    const animations: { stop: () => void }[] = []
    let cancelled = false

    // Set in the layout effect, so it is in place before the browser paints
    // and there is no flash of the finished state. The headline is hidden
    // rather than faded because splitting relayouts it.
    headline.style.visibility = 'hidden'
    for (const el of followers) el.style.opacity = '0'

    const reveal = () => {
      if (cancelled) return
      headline.style.visibility = 'visible'
      for (const el of followers) el.style.opacity = ''
    }

    // Captured before the first split, which replaces the heading's markup
    // with its own spans. Every later re-split starts from this again.
    const source = headline.textContent ?? ''

    const split = () => {
      headline.textContent = source
      const { lines, words } = splitText(headline, {
        lineClass: STAGGER_LINE_CLASS,
        wordClass: STAGGER_WORD_CLASS,
        // Skips per-character spans. They are not needed to animate lines,
        // and making every character its own inline-block drops kerning
        // across a display heading.
        preserveHyphens: true,
      })
      // Blocks, so each line owns its own transform. This is also what fixes
      // the line breaks in place, which is why resize has to re-split.
      for (const line of lines) line.style.display = 'block'
      onSplitRef.current?.({ lines, words })
      return lines
    }

    const run = async () => {
      try {
        // Lines are detected by measuring each word's offsetTop, so the
        // final font has to be in place or the line breaks are read off the
        // fallback and the reveal splits in the wrong places.
        await document.fonts?.ready
        if (cancelled || container.current !== root) return

        const lines = split()

        headline.style.visibility = 'visible'

        if (prefersReduced) {
          // Fades only — no travel, no blur.
          const all = [...lines, ...followers]
          for (const el of all) {
            animations.push(animate(el, { opacity: [0, 1] }, { ...GENTLE, opacity: fade(GENTLE.duration) }))
          }
          for (const el of followers) el.style.opacity = ''
          return
        }

        let delay = 0

        for (const line of lines) {
          animations.push(
            animate(
              line,
              {
                opacity: [0, 1],
                transform: [`translateY(${LINE_RISE})`, 'translateY(0em)'],
                filter: [ENTER_BLUR, 'blur(0px)'],
              },
              { ...GENTLE, delay, opacity: fade(GENTLE.duration) },
            ),
          )
          delay += LINE_STAGGER
        }

        // A beat between the headline finishing and the rest arriving.
        if (lines.length > 0) delay += LINE_STAGGER * 2

        for (const el of followers) {
          el.style.opacity = ''
          animations.push(
            animate(
              el,
              {
                opacity: [0, 1],
                transform: [`translateY(${ITEM_TRAVEL}px)`, 'translateY(0px)'],
                filter: [ENTER_BLUR, 'blur(0px)'],
              },
              { ...FOLLOWER, delay, opacity: fade(FOLLOWER.duration) },
            ),
          )
          delay += ITEM_STAGGER
        }
      } finally {
        // Whatever went wrong — fonts never resolving, splitText throwing on
        // markup it cannot handle — the hero must not be left invisible.
        reveal()
      }
    }

    void run()

    // Splitting turns the lines into blocks, which fixes the line breaks at
    // whatever width they were measured on. Left alone, rotating a phone or
    // dragging a window narrower keeps the old breaks and overflows. Width
    // only: on mobile the address bar collapsing fires resize on height, and
    // re-splitting for that would flicker the heading mid-scroll.
    let lastWidth = window.innerWidth
    let debounce: ReturnType<typeof setTimeout> | undefined

    const onResize = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      clearTimeout(debounce)
      debounce = setTimeout(() => {
        if (cancelled || container.current !== root) return
        // Re-split only. The entrance has already played by now, so the new
        // lines are left in their finished state rather than replayed.
        split()
      }, 150)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      clearTimeout(debounce)
      window.removeEventListener('resize', onResize)
      for (const animation of animations) animation.stop()
    }
  }, [prefersReduced])

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  )
}

export default StaggerReveal
