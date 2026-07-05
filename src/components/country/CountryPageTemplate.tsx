import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, Globe2, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// ── Shared data (same across all country pages) ───────────────

const SHARED_SERVICES = [
  { n: '01', t: 'Custom Exhibition Stall Design',   d: 'Layouts planned around your booth size, open sides, product category, target visitors, brand and exhibition goals.' },
  { n: '02', t: '3D Booth Design & Visualisation',  d: 'Review a detailed 3D visual of the structure, branding, lighting and visitor movement before fabrication.' },
  { n: '03', t: 'Exhibition Stand Fabrication',     d: 'Custom-built booths, modular stands, shell-scheme upgrades, display walls, counters, meeting rooms and backlit graphics.' },
  { n: '04', t: 'Branding & Graphics Production',  d: 'Fascia branding, wall graphics, product panels, backdrops, signage and LED-ready artwork — strong in competitive halls.' },
  { n: '05', t: 'Turnkey Exhibition Solutions',    d: 'One coordinated team from brief to dismantling — concept, design, production, logistics, installation and removal.' },
  { n: '06', t: 'Modular & Rental Booths',         d: 'Faster, budget-efficient modular and rental formats that maintain a premium brand presentation.' },
  { n: '07', t: 'International Exhibitor Support', d: 'Remote design approvals, scope management, local fabrication coordination, on-site setup and dismantling.' },
]

const SHARED_WHY_US = [
  { t: 'Experience with International Exhibitors', d: "We've helped Indian brands exhibit across Europe, the Gulf, Asia and Africa — we understand the complexity of exhibiting abroad." },
  { t: 'Brand-First Design Approach',             d: 'Every booth is designed around your objective, audience, products and international brand positioning.' },
  { t: 'Remote Coordination for Overseas Teams',  d: 'Design approvals, 3D concepts and production planning fully managed remotely until on-site execution.' },
  { t: 'Practical Booth Layouts',                 d: 'We design for real exhibition use — visitor flow, product access, meeting areas and staff functionality.' },
  { t: 'Clear Scope & Transparent Budgeting',     d: 'Structure, materials, graphics, lighting, furniture, logistics and install — defined before production starts.' },
  { t: 'Multi-Market Execution',                  d: 'Exhibitors supported across India and 14+ countries, with time-zone and venue-aware coordination.' },
]

const SHARED_STEPS = [
  { s: '01', t: 'Exhibition Brief',        d: 'Exhibition, venue, booth size, floor plan, open sides, brand guidelines, products, audience, references, budget and timeline.' },
  { s: '02', t: 'Space & Zone Planning',   d: 'Reception, product display, meeting areas, demo points, branding walls, storage and visitor movement corridors.' },
  { s: '03', t: '3D Booth Concept',        d: 'A 3D visual showing structure, counters, display, lighting, branding, graphics, furniture and visitor flow.' },
  { s: '04', t: 'Scope & Estimate',        d: 'After concept approval — a clear scope of work and cost estimate so your team knows exactly what is included.' },
  { s: '05', t: 'Fabrication & Branding',  d: 'Booth elements and graphics produced to the approved design, material plan and schedule, with remote progress updates.' },
  { s: '06', t: 'Logistics & Installation',d: 'Shipped to the venue and installed by our execution team. Final QC before handover for show opening.' },
  { s: '07', t: 'Dismantling & Exit',      d: 'Post-show dismantling and removal as per venue and organiser instructions — full turnkey closure.' },
]

// ── Types ─────────────────────────────────────────────────────

export interface CountryVenue {
  city: string
  name: string
  blurb: string
  shows: string[]
}

export interface CountryExhibition {
  m: string
  y: string
  name: string
  cat: string
  venue: string
}

export interface CountryIndustry {
  t: string
  d: string
  span?: string
}

export interface CountryFaq {
  q: string
  a: string
}

export interface CountryPageData {
  country: string
  wordmark: string
  slug: string
  areaServed: string[]

  meta: {
    title: string
    description: string
  }

  hero: {
    regionBadge: string
    greetingLine: string
    h1Line1: string
    h1Gradient: string
    h1Line3: string
    body: string
    statLabel: string
    citiesCount: string
    bullets: string[]
    ctaSecondary: string
  }

  standOut: {
    body1: string
    body2: string
    cards: Array<{ t: string; d: string }>
  }

  venues: CountryVenue[]
  exhibitions: CountryExhibition[]
  industries: CountryIndustry[]
  faqs: CountryFaq[]
  heroImageUrl?: string

  cta: {
    heading1: string
    heading2gradient: string
    body: string
  }
}

// ── Template ─────────────────────────────────────────────────

export function CountryPageTemplate({ data }: { data: CountryPageData }) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'
  const pageUrl  = `${SITE_URL}/${data.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: `Approach Media — Exhibition Stall Design Agency in ${data.country}`,
        areaServed: data.areaServed,
        description: data.meta.description,
        url: pageUrl,
        '@id': `${SITE_URL}#organization`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'International', item: `${SITE_URL}/#international` },
          { '@type': 'ListItem', position: 3, name: `Exhibition Stall Design in ${data.country}`, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-20">
          {data.heroImageUrl && (
            <Image
              src={data.heroImageUrl}
              alt={`Exhibition stall design in ${data.country}`}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,hsl(var(--brand-blue-glow)/0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_75%,hsl(var(--brand-green)/0.08),transparent_50%)]" />
        </div>

        {/* Subtle decorative stripes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[34%] md:block">
          <div className="absolute inset-y-0 left-[4%] w-px bg-gradient-to-b from-transparent via-brand-blue-glow/40 to-transparent" />
          <div className="absolute inset-y-0 left-[20%] w-px bg-gradient-to-b from-transparent via-brand-green/30 to-transparent" />
        </div>

        <div className="container-wide relative pb-24 pt-24 md:pb-32 md:pt-32">
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue-glow/30 bg-brand-blue-glow/5 px-3 py-1 text-brand-blue-glow">
              <Globe2 className="h-3.5 w-3.5" /> {data.hero.regionBadge}
            </span>
            <span className="text-foreground/40">/</span>
            <span className="text-foreground/60">{data.hero.greetingLine}</span>
          </div>

          {/* Headline + stat card */}
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8 animate-fade-up">
              <h1 className="font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                {data.hero.h1Line1}<br />
                <span className="text-gradient-brand">{data.hero.h1Gradient}</span><br />
                {data.hero.h1Line3}
              </h1>
              <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
                {data.hero.body}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" size="lg">
                  <Link href="/contact">Get Exhibition Stall Quote <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link href="/contact">{data.hero.ctaSecondary}</Link>
                </Button>
              </div>
            </div>

            {/* Stat card */}
            <div className="lg:col-span-4 animate-fade-up" style={{ animationDelay: '150ms' }}>
              <div className="surface-card relative overflow-hidden rounded-3xl p-7">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-blue-glow/10 blur-3xl" />
                <p className="text-xs uppercase tracking-[0.22em] text-brand-green">{data.hero.statLabel}</p>
                <div className="mt-3 grid grid-cols-2 gap-y-6">
                  {[
                    { v: data.hero.citiesCount, l: 'Key Cities' },
                    { v: '14+',                 l: 'Countries Delivered' },
                    { v: '23+',                 l: 'Years Experience' },
                    { v: '6000+',               l: 'Stalls Executed' },
                  ].map(stat => (
                    <div key={stat.l}>
                      <div className="font-display text-4xl font-semibold text-gradient-brand">{stat.v}</div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 hairline-divider" />
                <ul className="mt-5 space-y-2">
                  {data.hero.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized country wordmark */}
        <div className="pointer-events-none relative -mb-6 select-none overflow-hidden md:-mb-10">
          <div className="container-wide">
            <div className="font-display text-[18vw] font-bold leading-[0.8] tracking-[-0.04em] text-foreground/[0.04] md:text-[14vw]">
              {data.wordmark}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          01 — STAND OUT
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-green">01 — On the floor</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
                Build a stand that{' '}
                <span className="text-gradient-brand">works in {data.country}.</span>
              </h2>
              <p className="mt-6 text-muted-foreground md:text-lg">{data.standOut.body1}</p>
              <p className="mt-4 text-muted-foreground md:text-lg">{data.standOut.body2}</p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
                {data.standOut.cards.map((c, i) => (
                  <div key={c.t} className="group relative bg-background p-7 transition-colors hover:bg-surface-elevated md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-medium tracking-[0.28em] text-brand-blue-glow">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <Sparkles className="h-4 w-4 text-brand-green opacity-60 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{c.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          02 — SERVICES
      ══════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/10 bg-surface/40 py-24 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-green">02 — What we do</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Our exhibition services in {data.country}
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              One coordinated team across design, fabrication, branding, logistics, install and dismantling — fewer gaps, faster movement.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SHARED_SERVICES.map(s => (
              <div key={s.n} className="surface-card group relative overflow-hidden rounded-2xl p-7">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-blue-glow/0 blur-2xl transition-all duration-500 group-hover:bg-brand-blue-glow/10" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xs font-medium tracking-[0.28em] text-brand-blue-glow">{s.n}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-green" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          03 — VENUES
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-green">03 — Venue expertise</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Exhibition venues we serve{' '}
              <span className="text-gradient-brand">across {data.country}.</span>
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg">
              Each venue has its own build-up schedules, technical specs, access rules, electrical provisions and dismantling timelines. We plan with those requirements baked in.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.venues.map((v, i) => (
              <article
                key={v.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue-glow/40 hover:bg-surface-elevated"
              >
                <div className="absolute right-6 top-6 font-display text-6xl font-bold leading-none text-foreground/[0.06] transition-colors group-hover:text-brand-blue-glow/20">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-brand-blue-glow">
                  <MapPin className="h-3.5 w-3.5" /> {v.city}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">{v.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{v.blurb}</p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {v.shows.map(s => (
                    <span key={s} className="rounded-full border border-white/10 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-foreground/80">
                      {s}
                    </span>
                  ))}
                </div>

                <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green transition-colors hover:text-brand-green-glow">
                  Plan my stand <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          04 — EXHIBITIONS TIMELINE
      ══════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/10 bg-surface/40 py-24 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-green">04 — Upcoming shows</p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Major exhibitions in {data.country}
              </h2>
              <p className="mt-5 text-muted-foreground md:text-lg">
                A selection of upcoming trade shows where your brand can exhibit. Plan early for the best stand allocation.
              </p>
            </div>
            <Button asChild variant="outlineBrand" size="lg">
              <Link href="/expos">Full calendar <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-background/40">
            <ul className="divide-y divide-white/[0.07]">
              {data.exhibitions.map(e => (
                <li
                  key={e.name}
                  className="group grid grid-cols-12 items-center gap-4 px-5 py-5 transition-colors hover:bg-surface-elevated md:px-8 md:py-6"
                >
                  <div className="col-span-3 md:col-span-2">
                    <div className="font-display text-lg font-semibold text-foreground md:text-2xl">
                      {e.m}<span className="text-brand-blue-glow">&apos;</span>{e.y}
                    </div>
                  </div>
                  <div className="col-span-9 md:col-span-5">
                    <h3 className="font-display text-base font-semibold text-foreground md:text-lg">{e.name}</h3>
                    <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground md:hidden">{e.venue}</p>
                  </div>
                  <div className="col-span-7 hidden md:col-span-3 md:block">
                    <span className="inline-flex rounded-full border border-brand-green/30 bg-brand-green/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-brand-green">
                      {e.cat}
                    </span>
                  </div>
                  <div className="col-span-5 hidden text-right text-xs text-muted-foreground md:col-span-2 md:block">
                    {e.venue}
                  </div>
                  <div className="col-span-3 flex justify-end md:hidden">
                    <Link href="/contact" className="text-xs font-medium text-brand-green">Plan →</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          05 — INDUSTRIES (bento)
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-green">05 — Sectors</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Industries we serve in {data.country}
            </h2>
          </div>

          <div className="mt-14 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.industries.map((ind, idx) => (
              <div key={ind.t} className={`surface-card group relative overflow-hidden rounded-2xl p-7 ${ind.span ?? ''}`}>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue-glow/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="font-display text-xs font-medium tracking-[0.28em] text-brand-blue-glow">
                  S{String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{ind.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ind.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          06 — WHY US
      ══════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/10 bg-surface/40 py-24 md:py-32">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-green">06 — Why us</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
                Why choose us{' '}
                <span className="text-gradient-brand">for {data.country}?</span>
              </h2>
              <p className="mt-6 text-muted-foreground">
                Practical booth layouts, transparent scope, and a single accountable team — across 14+ countries.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                {SHARED_WHY_US.map((w, i) => (
                  <li key={w.t} className="group flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-surface-elevated md:flex-row md:items-start md:gap-8 md:p-8">
                    <div className="font-display text-3xl font-semibold text-gradient-brand md:w-24">
                      0{i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground">{w.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          07 — PROCESS (vertical rail)
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="container-narrow">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-green">07 — How we work</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Our exhibition stand process
            </h2>
          </div>

          <ol className="relative mt-16 space-y-10 border-l border-white/10 pl-8 md:pl-12">
            {SHARED_STEPS.map((p, i) => (
              <li key={p.s} className="relative">
                <span className="absolute -left-[2.05rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-brand-blue-glow/40 bg-background md:-left-[3.05rem]">
                  <span className="h-2 w-2 rounded-full bg-brand-blue-glow" />
                </span>
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                  <span className="font-display text-xs font-medium uppercase tracking-[0.28em] text-brand-blue-glow md:w-24">
                    Step {p.s}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">{p.t}</h3>
                    <p className="mt-2 text-muted-foreground">{p.d}</p>
                  </div>
                </div>
                {i < SHARED_STEPS.length - 1 && <div className="mt-6 h-px w-12 bg-gradient-to-r from-brand-blue-glow/40 to-transparent" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-white/10 bg-surface/40 py-24 md:py-32">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-5xl">Frequently Asked Questions</h2>
          <div className="mt-12">
            <Accordion type="single" collapsible className="border-t border-white/10">
              {data.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="surface-card rounded-xl border border-white/10 px-5"
                >
                  <AccordionTrigger className="py-5 text-left text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground hover:no-underline md:text-sm">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--brand-blue-glow)/0.15),transparent_60%)]" />
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green">Get started</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {data.cta.heading1}<br />
            <span className="text-gradient-brand">{data.cta.heading2gradient}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            {data.cta.body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link href="/contact">Share Exhibition Brief</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
