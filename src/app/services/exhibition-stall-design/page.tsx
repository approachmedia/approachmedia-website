import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, PenTool, ShieldCheck, Sparkles, Trophy, Users, Clock, Ruler, Layers, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RevealList from '@/components/ui/RevealList'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

import { SITE_URL } from '@/lib/site-url'
import { WhyChooseFlow, ProcessFlow } from '@/components/services/ExhibitionFlow'
import '@/styles/scrollcraft-engine.css'
import './services-flow.css'
import ServiceSchema from '@/components/seo/ServiceSchema'
import ProseSection from '@/components/seo/ProseSection'
import ServiceCityLinks from '@/components/seo/ServiceCityLinks'
import { INTRO, BLOCKS } from '../_content/exhibition-stall-design'
export const metadata = {
  title: { absolute: "Exhibition Stall Design Services | 3D Concepts in 48 Hrs" },
  description: "Exhibition stall design services with 3D concepts in 48 hours. 23+ years, 6000+ stalls across 9 industries and 14 countries. Request your design brief.",
  alternates: { canonical: `${SITE_URL}/services/exhibition-stall-design` },
  openGraph: {
    title: "Exhibition Stall Design Services | 3D Concepts in 48 Hrs",
    description: "Exhibition stall design services with 3D concepts in 48 hours. 23+ years, 6000+ stalls across 9 industries and 14 countries. Request your design brief.",
    url: `${SITE_URL}/services/exhibition-stall-design`,
  },
}

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

const trustBadges = [
  { icon: Trophy,      label: '6000+ stalls executed' },
  { icon: Users,       label: '14+ countries' },
  { icon: Clock,       label: '23+ years experience' },
  { icon: ShieldCheck, label: 'ISO-grade build quality' },
]

const stallTypes = [
  { title: 'Custom Built Stalls',   copy: 'Fully bespoke, brand-led architecture — your most powerful on-floor asset.',                      img: 'stall-gallery-1.jpg', alt: 'Modern white custom exhibition stall with lounge' },
  { title: 'Double-Decker Stalls',  copy: 'Maximize footprint with a private upper lounge for high-value meetings.',                        img: 'stall-gallery-4.jpg', alt: 'Double-decker exhibition stand with full LED walls' },
  { title: 'Modular Stalls',        copy: 'Reusable, reconfigurable systems for brands exhibiting across multiple shows.',                   img: 'stall-gallery-2.jpg', alt: 'Bold geometric exhibition booth with LED fins' },
  { title: 'Country Pavilions',     copy: 'Large-format pavilions that host multiple brands under one cohesive story.',                     img: 'stall-gallery-3.jpg', alt: 'Luxury reception with wood paneling and ring light' },
]

const promises = [
  'Free 3D concept sketch within 48 hours',
  'Fixed-price quote with zero hidden costs',
  'Dedicated project manager from day one',
  'Reply to every brief within 4 working hours',
  'On-time delivery — guaranteed in writing',
  'Standby crew on-site for all show days',
]

const faqs = [
  { q: 'How early should we start the stall design process?',  a: 'Ideally 6–8 weeks before the event for custom builds, and 10–12 weeks for double-decker or international shipments. For tight timelines, we can fast-track with a focused design sprint.' },
  { q: 'Do you handle stalls outside India?',                  a: 'Yes. We have executed stalls across 14+ countries including USA, Germany, France, UAE, Singapore, Italy, Netherlands and Kenya — with local installation partners and full project oversight from our team.' },
  { q: 'What does a custom stall typically cost?',             a: 'Custom stalls are priced by size, material, complexity and city. We share a transparent, line-item quote after a short discovery call — no inflated numbers, no hidden charges.' },
  { q: 'Can we re-use the stall for other shows?',             a: 'Absolutely. We design with modularity in mind so the same stall can be reconfigured for different footprints and shows — reducing your cost per exhibition over time.' },
  { q: 'Who manages the stall on-site during the exhibition?', a: 'Our on-floor crew handles installation, AV, electricals, daily maintenance and dismantling. A project manager stays through the show so your team only focuses on conversations.' },
]

export default function ExhibitionStallDesignPage() {
  return (
    <main>
      <ServiceSchema
        name="Exhibition Stall Design"
        serviceType="Exhibition stall design and 3D concept development"
        slug="exhibition-stall-design"
        description="Exhibition stall design services with 3D concepts in 48 hours, across 9 industries and 14 countries."
        faqs={faqs}
      />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={`${CDN}/stall-hero.jpg`}
            alt="Premium custom exhibition stall with double-decker design, wood and brass finishes"
            fill className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container-wide grid gap-10 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-brand-green">
              <Sparkles className="h-3.5 w-3.5" /> Exhibition Stall Design
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-7xl">
              Exhibition Stall Design Services —{' '}
              <span className="text-brand-blue-glow">The Stall Your Buyers Actually Remember</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Custom-designed, in-house built exhibition stalls — engineered for first
              impressions, full-week durability, and the kind of conversations that
              close after the show.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">Get a Free 3D Concept <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/contact">Talk to a Stall Designer</Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 md:grid-cols-4">
              {trustBadges.map(b => (
                <div key={b.label} className="flex items-center gap-2 rounded-xl border border-white/15 bg-background/60 px-3 py-2 text-xs text-muted-foreground backdrop-blur">
                  <b.icon className="h-3.5 w-3.5 text-brand-green" />
                  <span className="leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <Image src={`${CDN}/stall-gallery-1.jpg`} alt="Modern white custom exhibition stall with lounge"
                width={640} height={800} loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl border border-white/15 object-cover" />
              <div className="space-y-3">
                <Image src={`${CDN}/stall-gallery-5.jpg`} alt="Property expo exhibition stall, 72 sqm"
                  width={640} height={640} loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover" />
                <Image src={`${CDN}/stall-gallery-3.jpg`} alt="Luxury reception with wood paneling and ring light"
                  width={640} height={640} loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONFIDENCE STRIP
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-white/15 bg-surface/40 py-16 md:py-20">
        <div className="container-wide grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Why brands trust us</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              23 years. 6000+ stalls. Zero missed deadlines.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            From Fortune 500 brands at Hannover Messe to home-grown leaders at Pragati
            Maidan — we&apos;ve quietly built a reputation for stalls that show up on time,
            stand strong through the week, and bring real ROI back to the marketing team.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE US · scroll-driven: reasons dock beside a proof
          panel of real build footage. Copy unchanged, served HTML.
      ══════════════════════════════════════════════════ */}
      <WhyChooseFlow />

      {/* ══════════════════════════════════════════════════
          GALLERY SHOWCASE
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/15 bg-surface/30 py-20 md:py-24">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">A walk through our work</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Real stalls, real shows, real ROI.
              </h2>
            </div>
            <Link href="/portfolio" className="hidden items-center gap-1.5 text-sm font-medium text-brand-blue-glow md:inline-flex">
              View full portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <div className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '520px' }}>
              <Image src={`${CDN}/stall-gallery-4.jpg`} alt="Double-decker exhibition stand with full LED walls"
                fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Renewable Energy Expo · 144 sqm · Double-Decker</p>
                <p className="mt-1 font-display text-xl text-foreground">Two-storey statement build</p>
              </div>
            </div>
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image src={`${CDN}/stall-gallery-5.jpg`} alt="Property expo exhibition stall, 72 sqm"
                fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Property Expo · 72 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Architectural fin façade</p>
              </div>
            </div>
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image src={`${CDN}/stall-gallery-3.jpg`} alt="Luxury wooden reception with brand wall"
                fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Luxury Property Expo · 72 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Warm hospitality lounge</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STALL TYPES
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Stall types we build</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Whatever your footprint, we have a format that performs.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stallTypes.map(t => (
              <div key={t.title} className="group overflow-hidden rounded-2xl border border-white/15 bg-surface/40">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={`${CDN}/${t.img}`} alt={t.alt} fill loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MATERIAL / CRAFT BAND
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/15 bg-surface/40 py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15">
              <Image src={`${CDN}/stall-gallery-5.jpg`} alt="Detail of fluted wood, brushed brass and backlit glass on a premium stall"
                fill loading="lazy" className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Built like architecture, not a backdrop</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              The difference is in the millimetres.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Fluted oak panels meeting brushed brass trims. Seamless edge-lit acrylic.
              Floor-to-ceiling laminations without a single visible joint. We obsess
              over the details that visitors don&apos;t consciously notice — but absolutely feel.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Layers,      label: 'Premium veneers & laminates' },
                { icon: Lightbulb,   label: 'Integrated cove & spot lighting' },
                { icon: Ruler,       label: 'Tolerances under 2 mm' },
                { icon: ShieldCheck, label: 'Fire-rated, safety-tested builds' },
              ].map(m => (
                <div key={m.label} className="flex items-center gap-3 rounded-xl border border-white/15 bg-background/60 px-4 py-3 text-sm text-foreground">
                  <m.icon className="h-4 w-4 text-brand-green" />
                  {m.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS · scroll-driven: the six steps land in pairs over a
          clip of a finished build scrubbing under the wheel.
      ══════════════════════════════════════════════════ */}
      <ProcessFlow />

      {/* ══════════════════════════════════════════════════
          OUR PROMISE
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-white/15 bg-surface/30 py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Our promise to you</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Six commitments. Every single project.
            </h2>
            <p className="mt-5 text-muted-foreground">
              No fine print, no caveats. This is what every client we work with gets —
              from a 9 sqm shell scheme to a 200 sqm flagship pavilion.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-7">
              <Link href="/contact">Start your project <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="md:col-span-7">
            <RevealList items={promises} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INLINE CONVERSION BAND
      ══════════════════════════════════════════════════ */}
      <section className="border-b border-white/15 bg-surface/40 py-14">
        <div className="container-wide flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
              <PenTool className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                See your stall before you commit.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Share your event, footprint and brand — we&apos;ll send a free 3D concept within 48 hours.
              </p>
            </div>
          </div>
          <Button asChild variant="hero" size="lg" className="shrink-0">
            <Link href="/contact">Get my free 3D concept <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green">FAQ</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-5xl">Frequently Asked Questions</h2>
          <div className="mt-12">
            <Accordion type="single" collapsible className="border-t border-white/10">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
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
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-white/15 py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--brand-blue-glow)/0.15),transparent_60%)]" />
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green">Get started</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Let&apos;s build the stall your competitors will study.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            A short call, a sharp brief, and a 3D concept you can show your team. Be on the
            floor with a stall that earns the meetings — and the memories.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">Request a Proposal <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <ProseSection eyebrow="How we design" intro={INTRO} blocks={BLOCKS} />
      <ServiceCityLinks />
    </main>
  )
}
