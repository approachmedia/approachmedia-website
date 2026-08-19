'use client'

/**
 * The six services as a pinned horizontal gallery, on the Motion example's
 * mechanic: a tall track, a sticky wrapper one card wide, and a flex row
 * translated left as the track is scrolled. The cards pass through the
 * viewport one at a time, which is the reveal that was asked for — the
 * previous fade-as-you-enter version showed them one by one only in the sense
 * that they arrived in order, and that is not the same thing.
 *
 * The example's numbers are kept: 400px cards, a 30px gap, and a wrapper the
 * width of one card centred on the page with nothing clipping it, so the
 * neighbours spill either side and the row reads as continuous. That spill
 * costs no horizontal scrollbar because body already stops one — measured,
 * scrollX stays 0 after a scrollTo(800). Note that globals.css sets that as
 * overflow-x: clip and legacy.css then overrides it to hidden, so the value
 * in force is not the one the comment beside it describes; it happens not to
 * matter here, since body's overflow propagates to the viewport rather than
 * making body a scroll container, and the sticky is measured working. Left
 * alone and reported rather than changed.
 *
 * Two departures.
 *
 * The travel distance is measured, not arithmetic. The example computes
 * (items - 1) x (width + gap), which is exact only while the card width is a
 * constant; these cards step down at two breakpoints, so the distance is read
 * off the row itself and kept current by a ResizeObserver. Same result at
 * 400px, and still right at 280.
 *
 * Keyboard focus moves the page. Tabbing to the sixth card in a pinned
 * gallery would otherwise focus something parked off-screen — the wrapper
 * does not scroll, so the browser cannot bring it into view. Focusing a card
 * puts the track at that card's position instead. Gated on :focus-visible, so
 * clicking a card to open it does not also jump the page.
 *
 * ── the expand ──
 * Tapping a card still morphs it into the detail panel, unchanged. The panel
 * is rendered outside the track, not inside it: it is position: fixed, and a
 * transformed ancestor — which the translated row is — would make it
 * position against the row rather than the viewport.
 *
 * ── the links ──
 * Six internal links out of the hub page to the six service pages, in the
 * served HTML. A dialog does not exist until it is opened, so "Explore
 * service" stays a real anchor on the card, above the expand button in the
 * stacking order, and the panel carries a second one for anyone who opened
 * it.
 *
 * ── the photographs ──
 * The home page's own service photographs, by the same filenames from the
 * same bucket folder, requested the same way — a plain lazy <img>, not
 * next/image. Same URL means a visitor arriving from the home page has them
 * cached, and this page already sends four process photographs through the
 * optimiser, which is the part of it that has been slow on a cold deploy.
 *
 * ── reduced motion ──
 * The example's own fallback: the track collapses to its content, the
 * wrapper stops sticking and becomes an ordinary horizontal scroller, and
 * nothing is translated. Snap points, since it is being dragged by hand then.
 */

import { useCallback, useEffect, useRef, type FocusEvent } from 'react'
import Link from 'next/link'
import { ArrowUpRight, X } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import {
  ExpandCardBody,
  ExpandCardPanel,
  ExpandCardShared,
  ExpandCardTrigger,
  ExpandCards,
  useExpandCard,
} from '@/components/motion/ExpandCards'
import { SERVICE_IMAGE_CDN, type ServiceCard } from '@/app/services/_content/service-cards'

/** One card, at the example's 400px and two steps down for narrower screens. */
const CARD = 'w-[280px] sm:w-[340px] lg:w-[400px]'
/**
 * Every card is the same height, so it has to be the tallest card's height:
 * the photograph at 4:3 plus the copy under a title that wraps to two lines,
 * which four of the six do. Sized from the measured content, not guessed —
 * one line short and the "Explore service" link is clipped on those four.
 */
const CARD_HEIGHT = 'h-[450px] sm:h-[500px] lg:h-[560px]'
/** The example's 30px, and its 15px under 600. */
const GAP = 'gap-[15px] lg:gap-[30px]'

/**
 * vh of scroll per card after the first. The example spends 200vh moving four
 * cards; this is the same pace, and it sets how fast the row travels — larger
 * is slower and more deliberate, smaller is brisker.
 */
const VH_PER_CARD = 52

const SURFACE =
  'relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/40 transition-colors'

// ── the photograph ───────────────────────────────────────────

function ServicePhoto({ service, className }: { service: ServiceCard; className: string }) {
  return (
    <div className={`relative w-full shrink-0 overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${SERVICE_IMAGE_CDN}/${service.image}`}
        alt={`${service.title} — Approach Media`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* The home page's own wash, at the same strength, so the photo meets
          the copy beneath it rather than stopping at a hard edge. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  )
}

// ── the card ─────────────────────────────────────────────────

/**
 * The card face as it already was, and as it was signed off: photograph on
 * top at 4:3, copy on the surface beneath it. Only the frame around it
 * changed. The photograph therefore takes three quarters of the width in
 * height — 210px of a 450px card at 280 wide, 300 of 560 at 400 — and the
 * copy has the rest.
 */
function CardFace({ service }: { service: ServiceCard }) {
  return (
    <>
      <ServicePhoto service={service} className="aspect-[4/3]" />

      <div className="relative flex flex-1 flex-col p-6 lg:p-7">
        {/* the corner glow the cards already had */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-blue-glow/10 opacity-0 blur-[40px] transition-opacity duration-300 group-hover:opacity-60"
        />

        <ExpandCardShared part="number" className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-green">
          {service.number}
        </ExpandCardShared>

        <ExpandCardShared part="head" as="div" layout="position" className="mt-2.5">
          <h3 className="font-display text-lg font-semibold leading-[1.25] tracking-tight text-foreground lg:text-[1.4rem]">
            {service.title}
          </h3>
        </ExpandCardShared>

        <ExpandCardShared part="summary" as="div" layout="position" className="mt-2.5 flex-1">
          <p className="line-clamp-3 text-sm leading-[1.7] text-muted-foreground">{service.summary}</p>
        </ExpandCardShared>

        {/* Above the expand button, so it stays a link rather than a click
            target that opens the panel. */}
        <Link
          href={`/services/${service.slug}`}
          className="relative z-20 mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand-blue-glow transition-[gap] hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Explore service <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </>
  )
}

// ── the panel ────────────────────────────────────────────────

function ServiceDetail({ service }: { service: ServiceCard }) {
  const { close } = useExpandCard()

  return (
    <>
      <div className="relative shrink-0">
        <ServicePhoto service={service} className="aspect-[16/9]" />

        <button
          type="button"
          onClick={close}
          aria-label="Close service detail"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-background/60 text-white backdrop-blur transition-colors hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col p-6 sm:p-8">
        <ExpandCardShared part="number" className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-green">
          {service.number}
        </ExpandCardShared>

        <ExpandCardShared part="head" as="div" layout="position" className="mt-3">
          <h3
            id={`service-panel-title-${service.slug}`}
            className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl"
          >
            {service.title}
          </h3>
        </ExpandCardShared>

        <ExpandCardShared part="summary" as="div" layout="position" className="mt-3">
          <p id={`service-panel-summary-${service.slug}`} className="text-[15px] leading-relaxed text-foreground/90">
            {service.summary}
          </p>
        </ExpandCardShared>

        <ExpandCardBody className="mt-6 flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {service.points.map(point => (
              <li key={point.term} className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">{point.term}</span>
                <span className="text-sm leading-relaxed text-muted-foreground">{point.copy}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/services/${service.slug}`}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-brand-blue-glow/40 px-4 py-2.5 text-sm font-medium text-brand-blue-glow transition-colors hover:border-brand-blue-glow hover:bg-brand-blue-glow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Read the full {service.title.toLowerCase()} page <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </ExpandCardBody>
      </div>
    </>
  )
}

// ── the gallery ──────────────────────────────────────────────

export function ServiceExpandGrid({ services }: { services: ServiceCard[] }) {
  const calm = !!useReducedMotion()

  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLUListElement>(null)

  /**
   * How far the row has to travel. A motion value rather than state so the
   * translation follows a resize without a render, and so the transform below
   * recomputes the moment either input changes.
   */
  const distance = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })
  // The computed form, which tracks every motion value it reads. Passing the
  // pair as an array instead matches an overload that treats them as a static
  // input, and the row never moves.
  const x = useTransform(() => -scrollYProgress.get() * distance.get())

  useEffect(() => {
    const wrap = wrapRef.current
    const row = rowRef.current
    if (calm || !wrap || !row) return

    const measure = () => {
      const first = row.firstElementChild
      const last = row.lastElementChild
      if (!first || !last) return
      // Both edges carry the row's current translation, so the difference
      // between them is the untranslated width of the row.
      const width = last.getBoundingClientRect().right - first.getBoundingClientRect().left
      distance.set(Math.max(0, width - wrap.clientWidth))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    observer.observe(row)
    return () => observer.disconnect()
  }, [calm, distance])

  /**
   * Put the track where the focused card is on screen. Without this, tabbing
   * past the first card focuses an element parked outside the viewport that
   * the browser has no way to scroll to, because the thing holding it does
   * not scroll.
   */
  const revealOnFocus = useCallback(
    (index: number) => (event: FocusEvent<HTMLLIElement>) => {
      const track = trackRef.current
      if (calm || !track) return
      // Only for keyboard focus; clicking a card focuses it too, and jumping
      // the page as the panel opens would be worse than not doing it.
      if (!(event.target as HTMLElement).matches(':focus-visible')) return

      const travel = track.offsetHeight - window.innerHeight
      if (travel <= 0) return
      const top = track.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top + (travel * index) / Math.max(1, services.length - 1) })
    },
    [calm, services.length],
  )

  const cards = services.map((service, i) => (
    <li
      key={service.slug}
      onFocus={revealOnFocus(i)}
      className={`shrink-0 snap-start ${CARD} ${CARD_HEIGHT}`}
    >
      <ExpandCardTrigger
        id={service.slug}
        label={`${service.title}. ${service.summary} Open for detail.`}
        className={`${SURFACE} group-hover:border-brand-blue-glow/50 group-hover:shadow-[0_20px_60px_-20px_hsl(230_70%_10%/0.6)]`}
      >
        <CardFace service={service} />
      </ExpandCardTrigger>
    </li>
  ))

  return (
    <ExpandCards>
      {calm ? (
        // The example's own fallback: an ordinary horizontal scroller.
        <div className="-mx-5 snap-x snap-mandatory overflow-x-auto px-5 py-2 md:-mx-8 md:px-8">
          <ul className={`flex ${GAP}`}>{cards}</ul>
        </div>
      ) : (
        <div
          ref={trackRef}
          className="relative"
          style={{ height: `calc(100vh + ${(services.length - 1) * VH_PER_CARD}vh)` }}
        >
          {/* One card wide and centred, with nothing clipping it, so the
              neighbours are visible either side. */}
          <div ref={wrapRef} className={`sticky top-0 mx-auto flex h-screen items-center ${CARD}`}>
            <motion.ul ref={rowRef} className={`flex will-change-transform ${GAP}`} style={{ x }}>
              {cards}
            </motion.ul>
          </div>
        </div>
      )}

      {/* Outside the track on purpose — see the note at the top of the file.
          bg-surface, not bg-card, also on purpose: legacy.css is imported
          after globals.css in layout.tsx and redefines --card as a complete
          colour, `hsl(222 24% 9%)`, where globals.css declares the bare
          triple `222 24% 9%` that tailwind.config wraps. So bg-card compiles
          to hsl(hsl(222 24% 9%)), which is not a colour, and the panel
          renders transparent. --surface is not redefined and holds the same
          value. The collision is reported, not patched here. */}
      <ExpandCardPanel
        className="relative z-10 flex max-h-[86dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface"
        contentClassName="flex flex-col"
        labelledBy={id => `service-panel-title-${id}`}
        describedBy={id => `service-panel-summary-${id}`}
      >
        {({ id }) => {
          const service = services.find(s => s.slug === id)
          return service ? <ServiceDetail service={service} /> : null
        }}
      </ExpandCardPanel>
    </ExpandCards>
  )
}
