'use client'

/**
 * The services hub grid, on Motion UI's feature-expand mechanic. Tapping a
 * card morphs it into a detail panel carrying that service's own points; the
 * card's number, title and summary travel with the surface rather than
 * cross-fading, which is what makes it read as the same object opening.
 *
 * The cards keep their existing look — same border, radius, glow and hover
 * lift as the anchors they replace. Two differences from the .srv-card rule
 * they used to reuse: the lift moves to the wrapper, because Motion writes an
 * inline transform on the surface during a layout animation and an inline
 * transform beats a hover rule; and the surface is a div rather than an
 * anchor, for the reason below.
 *
 * Those anchors mattered. They were six internal links out of the hub page to
 * the six service pages, in the served HTML. A dialog does not exist until it
 * is opened, so moving the link into the panel would have removed all six
 * from the page a crawler sees — a self-inflicted loss on a page that has had
 * a lot of SEO work. "Explore service" therefore stays a real anchor on the
 * card, sitting above the expand button in the stacking order, and the panel
 * carries a second link for anyone who opened it.
 *
 * ── the photographs ──
 * The six images are the home page's own service photographs, by the same
 * filenames from the same bucket folder, requested the same way — a plain
 * lazy <img>, not next/image. That is deliberate on both counts: the same URL
 * means a visitor arriving from the home page has them cached already, and
 * routing six more files through the image optimiser on a page that already
 * sends four process photographs through it is the one part of this page that
 * has been slow on a cold deploy.
 *
 * ── the reveal ──
 * Each card fades and rises as it enters the viewport, driven by scroll
 * position rather than by a timer, so the six arrive one at a time as the
 * section is scrolled instead of all together. The progress window is per
 * card and measured against the card's own position, which is what makes it
 * behave at every breakpoint: on a phone the cards are a single column and
 * each one reveals as it comes up, and on a three-column desktop row the
 * three would otherwise enter simultaneously, so each column's window is
 * offset a little further down the viewport and the row lights up left to
 * right.
 *
 * The supplied example pinned a 300vh section and dragged the cards
 * horizontally past a sticky viewport. That is a strong effect, but it takes
 * the scroll away from the visitor for three screens on the page that carries
 * the six service links, and this site runs Lenis over the top of it. This is
 * the same one-by-one reveal without the hijack; say the word if the pinned
 * gallery is what was wanted.
 *
 * Nothing here changes the expand behaviour. The reveal transform lives on
 * the <li>, the hover lift on a wrapper inside it, and the morphing surface
 * below that, so the three never write to the same element.
 */

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpRight, X } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ExpandCardBody,
  ExpandCardPanel,
  ExpandCardShared,
  ExpandCardTrigger,
  ExpandCards,
  useExpandCard,
} from '@/components/motion/ExpandCards'
import { SERVICE_IMAGE_CDN, type ServiceCard } from '@/app/services/_content/service-cards'

const SURFACE =
  'relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/40 transition-colors'

// ── the scroll reveal ────────────────────────────────────────

/** How far down the viewport a card starts revealing, as a fraction of it. */
const REVEAL_FROM = 0.95
/** And where it is fully revealed. The gap is the length of the window. */
const REVEAL_TO = 0.58
/** Each column starts its window this much further up. */
const COLUMN_LEAD = 0.07
/** px the card rises through. */
const REVEAL_TRAVEL = 44

/**
 * Takes the edge off the raw scroll value. Lenis already smooths the scroll
 * itself, but a spring here also carries the reveal to its resting value
 * after the visitor stops mid-window, so a card is never left half-faded.
 */
const REVEAL_SPRING = { stiffness: 140, damping: 30, restDelta: 0.001 }

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * The grid's column count, read from the same two breakpoints the grid
 * classes use. The stagger is per column, so it has to follow the layout —
 * index % 3 would put a phone's second card on the third column's timing.
 */
function useColumns() {
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)')
    const medium = window.matchMedia('(min-width: 768px)')
    const apply = () => setColumns(wide.matches ? 3 : medium.matches ? 2 : 1)
    apply()
    wide.addEventListener('change', apply)
    medium.addEventListener('change', apply)
    return () => {
      wide.removeEventListener('change', apply)
      medium.removeEventListener('change', apply)
    }
  }, [])

  return columns
}

function RevealItem({ column, children }: { column: number; children: ReactNode }) {
  const ref = useRef<HTMLLIElement>(null)
  const calm = !!useReducedMotion()

  /**
   * The cards are hidden by the client, never by the server. Their initial
   * scroll progress is 0, so rendering the motion style straight away would
   * put opacity: 0 into the served HTML and leave the section blank for
   * anything that does not run the script. Armed in a layout effect, which
   * runs before the browser paints, so there is no flash of the visible state
   * either.
   */
  const [armed, setArmed] = useState(false)
  useIsomorphicLayoutEffect(() => setArmed(true), [])

  // Rounded so the offset strings stay stable across renders rather than
  // picking up a different float tail each time.
  const lead = column * COLUMN_LEAD
  const from = Number((REVEAL_FROM - lead).toFixed(2))
  const to = Number((REVEAL_TO - lead).toFixed(2))

  // Written inline: useScroll's offset is a union of template literal types,
  // and only the argument position gives it that contextual type.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${from}`, `start ${to}`],
  })
  const eased = useSpring(scrollYProgress, REVEAL_SPRING)
  const opacity = useTransform(eased, [0, 1], [0, 1])
  const y = useTransform(eased, [0, 1], [REVEAL_TRAVEL, 0])

  return (
    <motion.li ref={ref} className="h-full" style={armed && !calm ? { opacity, y } : undefined}>
      {/* The lift sits here rather than on the <li>, which now carries the
          reveal's own inline transform. */}
      <div className="h-full transition-transform duration-300 hover:-translate-y-1">{children}</div>
    </motion.li>
  )
}

// ── the card ─────────────────────────────────────────────────

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
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  )
}

function CardFace({ service }: { service: ServiceCard }) {
  return (
    <>
      <ServicePhoto service={service} className="aspect-[4/3]" />

      <div className="relative flex flex-1 flex-col p-7 pt-6">
        {/* the corner glow the cards already had */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-blue-glow/10 opacity-0 blur-[40px] transition-opacity duration-300 group-hover:opacity-60"
        />

        <ExpandCardShared part="number" className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-green">
          {service.number}
        </ExpandCardShared>

        <ExpandCardShared part="head" as="div" layout="position" className="mt-4">
          <h3 className="font-display text-[1.4rem] font-semibold leading-[1.25] tracking-tight text-foreground">
            {service.title}
          </h3>
        </ExpandCardShared>

        <ExpandCardShared part="summary" as="div" layout="position" className="mt-3 flex-1">
          <p className="text-sm leading-[1.75] text-muted-foreground">{service.summary}</p>
        </ExpandCardShared>

        {/* Above the expand button, so it stays a link rather than a click
            target that opens the panel. */}
        <Link
          href={`/services/${service.slug}`}
          className="relative z-20 mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand-blue-glow transition-[gap] hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
        <ExpandCardShared part="number" className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-green">
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

          {/* The way out of the dialog and on to the service's own page. */}
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

export function ServiceExpandGrid({ services }: { services: ServiceCard[] }) {
  const columns = useColumns()

  return (
    <ExpandCards>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <RevealItem key={service.slug} column={i % columns}>
            <ExpandCardTrigger
              id={service.slug}
              label={`${service.title}. ${service.summary} Open for detail.`}
              className={`${SURFACE} group-hover:border-brand-blue-glow/50 group-hover:shadow-[0_20px_60px_-20px_hsl(230_70%_10%/0.6)]`}
            >
              <CardFace service={service} />
            </ExpandCardTrigger>
          </RevealItem>
        ))}
      </ul>

      {/* bg-surface, not bg-card, and not by preference.
          legacy.css is imported after globals.css in layout.tsx and redefines
          --card as a complete colour, `hsl(222 24% 9%)`, where globals.css
          declares the bare triple `222 24% 9%` that tailwind.config wraps. So
          bg-card compiles to hsl(hsl(222 24% 9%)), which is not a colour, and
          the panel renders transparent with the grid showing through it.
          --surface is not redefined and holds the same value. The collision
          is reported, not patched here — it also affects --border and
          --muted, and belongs in one deliberate change rather than in this
          one. */}
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
