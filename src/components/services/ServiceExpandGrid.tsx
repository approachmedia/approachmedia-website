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
 */

import Link from 'next/link'
import { ArrowUpRight, X } from 'lucide-react'
import {
  ExpandCardBody,
  ExpandCardPanel,
  ExpandCardShared,
  ExpandCardTrigger,
  ExpandCards,
  useExpandCard,
} from '@/components/motion/ExpandCards'
import type { ServiceCard } from '@/app/services/_content/service-cards'

const SURFACE =
  'relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-7 transition-colors'

function CardFace({ service }: { service: ServiceCard }) {
  return (
    <>
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
    </>
  )
}

function ServiceDetail({ service }: { service: ServiceCard }) {
  const { close } = useExpandCard()

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <ExpandCardShared part="number" className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-green">
          {service.number}
        </ExpandCardShared>
        <button
          type="button"
          onClick={close}
          aria-label="Close service detail"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-surface text-muted-foreground transition-colors hover:border-brand-blue-glow/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <ExpandCardShared part="head" as="div" layout="position" className="mt-4">
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
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand-blue-glow transition-[gap] hover:gap-2.5"
        >
          Read the full {service.title.toLowerCase()} page <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </ExpandCardBody>
    </>
  )
}

export function ServiceExpandGrid({ services }: { services: ServiceCard[] }) {
  return (
    <ExpandCards>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(service => (
          <li
            key={service.slug}
            className="h-full transition-transform duration-300 hover:-translate-y-1"
          >
            <ExpandCardTrigger
              id={service.slug}
              label={`${service.title}. ${service.summary} Open for detail.`}
              className={`${SURFACE} group-hover:border-brand-blue-glow/50 group-hover:shadow-[0_20px_60px_-20px_hsl(230_70%_10%/0.6)]`}
            >
              <CardFace service={service} />
            </ExpandCardTrigger>
          </li>
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
        contentClassName="flex flex-col p-6 sm:p-8"
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
