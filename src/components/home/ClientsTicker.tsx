'use client'

/**
 * The clientele row on Motion UI's Ticker.
 *
 * What this replaces is a CSS keyframe translating a doubled list by -50%.
 * That works until it doesn't: the duration has to be recalculated from the
 * item count to hold a steady speed, one copy is assumed to be enough to fill
 * any screen, and there is no way to react to a pointer. Ticker measures the
 * row, clones as many times as the container actually needs, and drives the
 * offset from a velocity in pixels per second, so speed no longer depends on
 * how many clients are in the portfolio.
 *
 * hoverFactor is the reason it is worth changing. At 0.25 the row nearly
 * stops under the cursor, so a name someone recognises can be read instead of
 * chased. That is the whole point of a client row.
 *
 * Two notes on the API. `fade` is in Motion's published example but not in
 * the installed Ticker, where it would fall through to the DOM as an unknown
 * attribute — the edge fade stays the CSS mask the row already had. And the
 * ticker is aria-hidden with the names repeated in a visually hidden list,
 * because cloning to fill the container repeats every name several times in
 * the DOM.
 */

import { Ticker } from 'motion-plus-react'
import { useReducedMotion } from 'framer-motion'

/** Pixels per second. The old marquee ran at about 55; this is calmer. */
const VELOCITY = 40
/** Multiplier applied while hovered. */
const HOVER_FACTOR = 0.25

function ClientChip({ name }: { name: string }) {
  return (
    <div className="flex h-16 min-w-[180px] items-center justify-center rounded-lg border border-white/15 bg-surface px-6 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-blue-glow/50 hover:text-foreground">
      {name}
    </div>
  )
}

export function ClientsTicker({ clients }: { clients: string[] }) {
  const calm = !!useReducedMotion()

  return (
    <>
      <p className="sr-only">Clients include {clients.join(', ')}.</p>

      {calm ? (
        // No scroll to slow down or pause, so the row is laid out flat and
        // every client stays reachable.
        <ul aria-hidden="true" className="flex flex-wrap items-center justify-center gap-3">
          {clients.map(name => (
            <li key={name}>
              <ClientChip name={name} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          aria-hidden="true"
          className="[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
        >
          <Ticker
            className="w-full"
            velocity={VELOCITY}
            hoverFactor={HOVER_FACTOR}
            gap={12}
            items={clients.map(name => (
              <ClientChip key={name} name={name} />
            ))}
          />
        </div>
      )}
    </>
  )
}
