/**
 * The @motion/ui-theme default preset, resolved to plain values.
 *
 * Motion UI sections read their timings from a `<MotionUIThemeProvider>`,
 * which is worth having when a whole site is built out of those sections and
 * you want to retune all of it from one file. This site is not built that
 * way — it has its own design system in globals.css and tailwind.config.ts —
 * so carrying the provider, its context, its preset registry and its CSS
 * variable emitter would add a second theming system that nothing else reads.
 *
 * These are that theme's default numbers written out instead, so ported
 * sections still move with Motion UI's feel and still share it with each
 * other. If more sections arrive and retuning them together starts to matter,
 * this file is the place it would happen.
 *
 * Springs rather than durations so an interrupted animation keeps its
 * velocity. `duration` is kept as the matched timing for opacity, which rides
 * along as a tween so fade and travel land together.
 */

import type { Transition } from 'framer-motion'

type SpringToken = { type: 'spring'; stiffness: number; damping: number; duration: number }

/** Instant feedback: taps, hovers, dots. */
export const SNAP: SpringToken = { type: 'spring', stiffness: 1218.47, damping: 69.81, duration: 0.15 }
/** The default: cards, reveals, menus. */
export const UI: SpringToken = { type: 'spring', stiffness: 304.62, damping: 33.16, duration: 0.3 }
/** Large surfaces: sections, headlines. */
export const GENTLE: SpringToken = { type: 'spring', stiffness: 109.66, damping: 19.9, duration: 0.5 }

/** Stagger between children, in seconds. */
export const STAGGER = { tight: 0.04, base: 0.08, relaxed: 0.15 }
/** How far things travel on enter, in pixels. */
export const TRAVEL = { hover: 4, enter: 24, section: 48 }
/** Viewport-entry defaults for whileInView sections. */
export const IN_VIEW = { amount: 0.4, once: true }

/**
 * The opacity channel for a token. Linear on purpose: opacity is
 * perceptually compressed, so an eased fade front-loads visibility and reads
 * as a pop, where linear reads as evenly paced. The token's own curve stays
 * the one for colour and CSS channels.
 *
 * `inherit` lets top-level keys added next to a spread (delay, repeat) still
 * reach opacity — without it Motion resolves the per-value transition instead
 * of the top level, and a delayed fade would play immediately.
 */
export function fade(duration: number) {
  return { type: 'tween' as const, duration, ease: 'linear' as const, inherit: true }
}

/** A token plus its matched opacity channel, ready to spread into `transition`. */
export function withFade(token: SpringToken): Transition {
  return { ...token, opacity: fade(token.duration) }
}
