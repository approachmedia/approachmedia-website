'use client'

/**
 * The client-voice cards as Motion UI's card stack.
 *
 * The card face is the markup the grid was already using — logo chip, quote,
 * name, role, company — so nothing about what a visitor reads has changed.
 *
 * Two things the demo section carries are not here, because there is no data
 * behind them. It puts a five-star row and a short metric badge on every
 * card; these are real named people at real companies, and neither a rating
 * nor a metric was ever collected from them. Rendering five stars over
 * Haresh Panchal's name would be inventing a review he did not leave.
 *
 * Every quote stays in the DOM, so the page still carries all six for search
 * and for anyone reading with assistive tech, which the grid also did.
 */

import { CardStack, CardStackCard, useCardStack } from '@/components/motion/CardStack'
import { CarouselControls } from '@/components/motion/CarouselControls'

export interface TestimonialCard {
  logo: string
  company: string
  quote: string
  name: string
  role: string
}

export function TestimonialsStack({ testimonials, cdn }: { testimonials: TestimonialCard[]; cdn: string }) {
  const stack = useCardStack({ total: testimonials.length })
  const current = testimonials[stack.index]

  return (
    <div className="mt-12 flex flex-col items-center gap-8">
      <div className="w-full max-w-xl">
        <CardStack state={stack} label="Client testimonials">
          {testimonials.map(t => (
            <CardStackCard key={t.name}>
              <figure className="surface-card flex h-full flex-col rounded-2xl p-7">
                {/* white chip so colourful light-bg logos read on the dark theme */}
                <div className="inline-flex h-16 w-fit max-w-full items-center rounded-lg bg-white px-4 py-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${cdn}/${t.logo}`}
                    alt={`${t.company} logo`}
                    loading="lazy"
                    className="h-full w-auto max-w-[150px] object-contain"
                  />
                </div>

                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground/90">
                  {`“${t.quote}”`}
                </blockquote>

                <figcaption className="mt-6">
                  <p className="font-display text-base font-semibold text-foreground">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.role} · {t.company}</p>
                </figcaption>
              </figure>
            </CardStackCard>
          ))}
        </CardStack>
      </div>

      <CarouselControls
        index={stack.index}
        total={stack.total}
        onPrev={stack.prev}
        onNext={stack.next}
        onSelect={stack.go}
      />

      <p className="sr-only" aria-live="polite">
        {`Testimonial ${stack.index + 1} of ${stack.total}: ${current.name}, ${current.role} at ${current.company}`}
      </p>
    </div>
  )
}
