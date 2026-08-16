'use client'

/**
 * The four process steps as photo tiles that open.
 *
 * Composition is the App Store example's: a two-up mosaic where tiles
 * alternate wide and narrow, the photograph fills the card, and the label and
 * title sit over the top-left corner. Tapping one morphs it into a centred
 * card — photograph at the top, copy beneath — and the backdrop, Escape or
 * the close button puts it back.
 *
 * The example does that morph with AnimateView over browser View
 * Transitions. That is not in the installed motion-plus packages
 * (motion-plus-react 1.5.4 and motion-plus-dom 2.12.0 export no
 * animate-view; their only subpath is ./curtains), so the morph runs on the
 * shared layoutId in components/motion/ExpandCards — the same mechanic
 * already behind the six service cards. Same effect, no new dependency.
 *
 * The example's 60/40 rhythm comes from flex-basis arithmetic: flex 0 0 40%
 * with nth-child(4n+1) and (4n+4) overridden to calc(60% - 20px). Here that
 * is a five-column grid with spans of 3-2-2-3 — same proportions, no calc,
 * and no dependence on child position, so a fifth step would not break it.
 *
 * The step description stays on the face of the tile as well as in the open
 * card. The example only has body copy in the open state, but that copy would
 * then exist nowhere in the served HTML — a dialog is not rendered until it
 * is opened — and this is a page that has had a lot of SEO work. Four
 * paragraphs of real copy are not worth trading for a tidier tile.
 */

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import {
  ExpandCardBody,
  ExpandCardPanel,
  ExpandCardShared,
  ExpandCardTrigger,
  ExpandCards,
  useExpandCard,
} from '@/components/motion/ExpandCards'

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

function StepPhoto({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
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
      sizes={sizes}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  )
}

/** Top-down, because the text sits at the top of the photo in both states. */
function Scrim() {
  return <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/45 to-transparent" />
}

function StepDetail({ step }: { step: ProcessStep }) {
  const { close } = useExpandCard()

  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {step.image ? (
          <StepPhoto src={step.image} alt={step.alt} sizes="(max-width: 768px) 100vw, 672px" />
        ) : null}
        <Scrim />

        <div className="absolute inset-x-0 top-0 p-6 md:p-8">
          <ExpandCardShared part="label" className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
            Step {step.num}
          </ExpandCardShared>
          <ExpandCardShared part="title" as="div" layout="position" className="mt-2 max-w-[24ch]">
            <h3
              id={`process-panel-title-${step.num}`}
              className="font-display text-2xl font-semibold leading-tight text-white md:text-3xl"
            >
              {step.title}
            </h3>
          </ExpandCardShared>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Close step detail"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-background/60 text-white backdrop-blur transition-colors hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ExpandCardBody className="p-6 md:p-8">
        <p id={`process-panel-copy-${step.num}`} className="text-[15px] leading-relaxed text-foreground/85">
          {step.copy}
        </p>
      </ExpandCardBody>
    </>
  )
}

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ExpandCards>
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.num} className={`h-[360px] md:h-[420px] ${SPANS[i % SPANS.length]}`}>
            <ExpandCardTrigger
              id={step.num}
              label={`Step ${step.num}, ${step.title}. Open for detail.`}
              className="relative h-full w-full overflow-hidden rounded-[20px] border border-white/10 bg-surface/40"
            >
              {step.image ? (
                <StepPhoto src={step.image} alt={step.alt} sizes="(max-width: 1024px) 100vw, 55vw" />
              ) : null}
              <Scrim />

              <div className="absolute inset-x-0 top-0 max-w-[42ch] p-6 md:p-8">
                <ExpandCardShared part="label" className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                  Step {step.num}
                </ExpandCardShared>
                <ExpandCardShared part="title" as="div" layout="position" className="mt-2">
                  <h3 className="font-display text-xl font-semibold leading-tight text-white md:text-2xl">
                    {step.title}
                  </h3>
                </ExpandCardShared>
                <p className="mt-3 text-sm leading-[1.7] text-white/75">{step.copy}</p>
              </div>
            </ExpandCardTrigger>
          </li>
        ))}
      </ul>

      {/* bg-surface, not bg-card: legacy.css redefines --card as a complete
          colour where tailwind.config expects a bare HSL triple, so bg-card
          compiles to hsl(hsl(...)) and renders transparent. Same reason as
          the service panel; the collision is reported, not patched here. */}
      <ExpandCardPanel
        className="relative z-10 flex max-h-[86dvh] w-full max-w-2xl flex-col overflow-hidden rounded-[20px] border border-white/10 bg-surface"
        contentClassName="flex flex-col"
        labelledBy={id => `process-panel-title-${id}`}
        describedBy={id => `process-panel-copy-${id}`}
      >
        {({ id }) => {
          const step = steps.find(s => s.num === id)
          return step ? <StepDetail step={step} /> : null
        }}
      </ExpandCardPanel>
    </ExpandCards>
  )
}
