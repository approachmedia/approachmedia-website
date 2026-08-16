'use client'

/**
 * The four process steps as full-bleed photo tiles, in the App Store
 * example's composition: a two-up mosaic where the tiles alternate wide and
 * narrow, the photograph fills the card, and the label and title sit over
 * the top-left corner.
 *
 * The example gets its 60/40 rhythm from flex-basis arithmetic —
 * `flex: 0 0 40%` with `nth-child(4n+1)` and `(4n+4)` overridden to
 * `calc(60% - 20px)`. Here that is a five-column grid with spans of 3-2-2-3,
 * which lands on the same proportions without the calc and without depending
 * on child position, so a fifth step could be added without the pattern
 * breaking.
 *
 * The step description is laid over the image beneath the title. The example
 * has nothing there because its body copy only appears once a card is opened
 * — and it opens via AnimateView, which is not in the installed motion-plus
 * packages (their only subpath export is ./curtains). These four steps carry
 * one paragraph each, which is the whole of what a visitor needs, so it is
 * on the face of the tile rather than behind a tap that would reveal the
 * same sentence again.
 */

import { useState } from 'react'
import Image from 'next/image'

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/process'

export interface ProcessStep {
  num: string
  title: string
  copy: string
  /** Filename in images/process. Omit to render the tile without a photo. */
  image?: string
  alt: string
}

/** Wide, narrow, narrow, wide — the example's rhythm, as column spans. */
const SPANS = ['lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3']

function StepPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  // A step whose photo is missing keeps its tile rather than leaving a hole,
  // the same way the venue cards behave.
  if (failed) {
    return <div className="absolute inset-0 bg-surface-elevated" aria-hidden="true" />
  }

  return (
    <Image
      src={`${CDN}/${src}`}
      alt={alt}
      fill
      // Tiles are 60% or 40% of the container on desktop and full width
      // below it, so the optimiser is told roughly that rather than fetching
      // a desktop-sized file for a phone.
      sizes="(max-width: 1024px) 100vw, 55vw"
      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      onError={() => setFailed(true)}
    />
  )
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 lg:grid-cols-5">
      {steps.map((step, i) => (
        <li
          key={step.num}
          className={`group relative h-[360px] overflow-hidden rounded-[20px] border border-white/10 bg-surface/40 md:h-[420px] ${SPANS[i % SPANS.length]}`}
        >
          {step.image ? <StepPhoto src={step.image} alt={step.alt} /> : null}

          {/* Top-down, because the text sits at the top of the tile. Enough
              to hold white type over a bright photograph without flattening
              the picture below it. */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/45 to-transparent" />

          <div className="absolute inset-x-0 top-0 max-w-[42ch] p-6 md:p-8">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              Step {step.num}
            </span>
            <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-white md:text-2xl">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-[1.7] text-white/75">{step.copy}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
