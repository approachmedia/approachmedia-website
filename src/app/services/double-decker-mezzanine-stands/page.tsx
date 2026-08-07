import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, ArrowUp, ShieldCheck, Ruler, Globe2,
  Layers, Users, Hammer, Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

import { SITE_URL } from '@/lib/site-url'
import ServiceSchema from '@/components/seo/ServiceSchema'
import ProseSection from '@/components/seo/ProseSection'
import ServiceCityLinks from '@/components/seo/ServiceCityLinks'
import { INTRO, BLOCKS } from '../_content/double-decker-mezzanine-stands'
export const metadata = {
  title: { absolute: "Double Decker & Mezzanine Stall Design | Approach Media" },
  description: "Double decker and mezzanine exhibition stall design with certified load engineering. 23+ years, 6000+ stalls. Get a two-storey concept and costing.",
  alternates: { canonical: `${SITE_URL}/services/double-decker-mezzanine-stands` },
  openGraph: {
    title: "Double Decker & Mezzanine Stall Design | Approach Media",
    description: "Double decker and mezzanine exhibition stall design with certified load engineering. 23+ years, 6000+ stalls. Get a two-storey concept and costing.",
    url: `${SITE_URL}/services/double-decker-mezzanine-stands`,
  },
}

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

const trustBadges = [
  { icon: ArrowUp,     label: 'Multi-level specialists' },
  { icon: ShieldCheck, label: 'Structurally engineered' },
  { icon: Ruler,       label: 'Custom to your footprint' },
  { icon: Globe2,      label: '14+ countries built' },
]

const outcomes = [
  { stat: '2×',     label: 'floor space from same footprint' },
  { stat: '100%',   label: 'structurally engineered & tested' },
  { stat: '50sqm+', label: 'minimum size we recommend' },
  { stat: '14+',    label: 'countries we\'ve built in' },
]

const whyChoose = [
  { icon: ArrowUp,     title: 'Structural engineering expertise', copy: 'Every double-decker is designed by structural engineers — load calculations, connection details and safety margins built in from day one.' },
  { icon: ShieldCheck, title: 'Safety-certified builds',          copy: 'Full structural certificates, load test reports and venue-compliant drawings provided for organiser approval at every show.' },
  { icon: Layers,      title: 'Multi-zone floor planning',        copy: 'Ground floor for brand engagement and footfall. Upper floor for private meetings, VIP hosting and focused conversations.' },
  { icon: Users,       title: 'VIP meeting room design',          copy: 'The upper lounge is designed as a branded hospitality space — furniture, lighting, AV and acoustics considered as a whole.' },
  { icon: Hammer,      title: 'In-house fabrication',             copy: 'Structure and joinery built in our own 30,000 sq ft workshop — no outsourced guesswork, full quality control end-to-end.' },
  { icon: Globe2,      title: 'International venue compliance',   copy: 'We have delivered certified double-decker stands across India, UAE, Germany, Singapore and beyond — we know what each venue demands.' },
]

const process = [
  { step: '01', icon: ArrowUp,     title: 'Structural Brief',              copy: 'We map your footprint, show venue height limits, load requirements and the zones you need on both levels.' },
  { step: '02', icon: Ruler,       title: 'Engineering & Load Calculations', copy: 'Structural engineer signs off on every column, beam and floor-loading spec before design begins.' },
  { step: '03', icon: Layers,      title: '3D Design & Approval',          copy: 'Full 3D walkthrough renders of both floors — approved by you before fabrication starts.' },
  { step: '04', icon: Hammer,      title: 'In-House Fabrication',          copy: 'Steel, carpentry, finishes and AV integration all built in our own facility under one QC regime.' },
  { step: '05', icon: ShieldCheck, title: 'Mock-Up & Safety QC',           copy: 'The structure is fully erected and load-tested in our warehouse. Certificates issued before it ships.' },
  { step: '06', icon: Globe2,      title: 'On-Site Build & Handover',      copy: 'Our structural crew installs, organiser inspector signs off, and your team walks into a ready stand.' },
]

const faqs = [
  { q: 'What is the minimum size for a double-decker stall?',           a: 'Most venues require a minimum footprint of 36–50 sqm before permitting a double-decker structure. We advise the exact minimum based on your specific venue, hall and organiser guidelines.' },
  { q: 'Are double-decker stands allowed at all exhibitions?',          a: 'The majority of major exhibition venues allow double-decker stands, subject to structural certificates, load calculations and height compliance. We manage the full compliance and approval process on your behalf.' },
  { q: 'How is the structure made safe?',                               a: 'Every stand is fully engineered — structural drawings, load calculations, column and beam specifications — then fabricated in-house, mock-up tested at full scale, and issued with structural certificates before it reaches the venue.' },
  { q: 'Can the upper floor have AV and branding?',                     a: 'Absolutely. We design upper floors as fully branded VIP hospitality spaces — LED walls, cove lighting, custom furniture, acoustic panels and full AV integration are all part of the brief.' },
  { q: 'How long does a double-decker take to install and dismantle?',  a: 'Typically 2–3 build-up days depending on size and complexity. Dismantling is usually one full day. We coordinate directly with your venue schedule and organiser move-in windows.' },
]

export default function DoubleDeckerMezzanineStandsPage() {
  return (
    <main>
      <ServiceSchema
        name="Double Decker & Mezzanine Stall Design"
        serviceType="Double decker and mezzanine exhibition stand design"
        slug="double-decker-mezzanine-stands"
        description="Double decker and mezzanine exhibition stall design with certified load engineering and organiser-approved structural drawings."
        faqs={faqs}
      />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={`${CDN}/decker-hero.jpg`}
            alt="Premium double-decker exhibition stand with private upper VIP lounge and brand walls"
            fill className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container-wide grid gap-10 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-brand-green">
              <Sparkles className="h-3.5 w-3.5" /> Double Decker &amp; Mezzanine Stands
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-7xl">
              Double Decker &amp; Mezzanine Stall Design —{' '}
              <span className="text-brand-blue-glow">Two Floors of Impact</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Maximise your footprint with a multi-level structure that does twice the work.
              A private upper VIP lounge for high-value meetings. Elevated brand presence
              that commands attention across the hall. Meeting rooms, hospitality space
              and a ground-floor experience — all inside the same footprint. The landmark
              on any show floor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">Request a Proposal <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/contact">Talk to a Stand Engineer</Link>
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
              <Image src={`${CDN}/decker-gallery-1.jpg`} alt="Double-decker exhibition stand with upper lounge"
                width={640} height={800} loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl border border-white/15 object-cover" />
              <div className="space-y-3">
                <Image src={`${CDN}/decker-gallery-2.jpg`} alt="Upper mezzanine VIP meeting room"
                  width={640} height={640} loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover" />
                <Image src={`${CDN}/decker-gallery-3.jpg`} alt="Ground floor brand experience zone"
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
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">The double-decker advantage</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Same floor space. Twice the presence.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            A double-decker stand gives you a private meeting floor above and a full
            brand experience below — without paying for a single additional square metre
            of show floor. While your competitors operate on one level, you&apos;re hosting
            on two. It&apos;s not a bigger stall — it&apos;s a smarter one.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUTCOMES STRIP
      ══════════════════════════════════════════════════ */}
      <section className="py-14">
        <div className="container-wide grid grid-cols-2 gap-6 md:grid-cols-4">
          {outcomes.map(o => (
            <div key={o.label} className="rounded-2xl border border-white/15 bg-background/60 p-6 text-center">
              <div className="font-display text-3xl font-semibold text-brand-blue-glow md:text-4xl">{o.stat}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{o.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Why choose Approach Media</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Six reasons to trust us with a structure this complex.
              </h2>
            </div>
            <Button asChild variant="glass" size="lg">
              <Link href="/contact">Start the conversation <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map(s => (
              <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-white/15 bg-surface/40 p-7 transition-all hover:-translate-y-1 hover:border-brand-blue-glow/50">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue-glow/10 text-brand-blue-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-green/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/15 bg-surface/30 py-20 md:py-24">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Double-deckers we&apos;ve built</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Multi-level stands, real shows, real floors.
              </h2>
            </div>
            <Link href="/portfolio" className="hidden items-center gap-1.5 text-sm font-medium text-brand-blue-glow md:inline-flex">
              View full portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <div className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '520px' }}>
              <Image src={`${CDN}/decker-gallery-4.jpg`} alt="Large double-decker exhibition stand with full upper lounge"
                fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">ACETECH Delhi · 96 sqm Double Decker</p>
                <p className="mt-1 font-display text-xl text-foreground">Two-storey landmark build</p>
              </div>
            </div>
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image src={`${CDN}/decker-gallery-2.jpg`} alt="Upper lounge VIP meeting room at GITEX Dubai"
                fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">GITEX Dubai · Upper Lounge</p>
                <p className="mt-1 font-display text-xl text-foreground">Private VIP hospitality floor</p>
              </div>
            </div>
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image src={`${CDN}/decker-gallery-3.jpg`} alt="Mezzanine meeting suite at Auto Expo"
                fill loading="lazy" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Auto Expo · Mezzanine Meeting Suite</p>
                <p className="mt-1 font-display text-xl text-foreground">Integrated upper meeting rooms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STAND CONFIGURATIONS
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15">
              <Image src={`${CDN}/decker-detail.jpg`} alt="Detail view of engineered double-decker stand structure"
                fill loading="lazy" className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Built to spec, not off the shelf</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Every double-decker is engineered, not assembled.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              We don&apos;t use off-the-shelf mezzanine kits. Every structure starts with a
              custom structural design — column placements matched to your floor plan,
              staircase integrated into the brand experience, upper floor loaded and
              tested for real hospitality use. The result is a stand that&apos;s as safe
              as it is striking.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Users,       label: 'Private upper meeting lounge' },
                { icon: Layers,      label: 'Ground-level brand experience' },
                { icon: ArrowUp,     label: 'Integrated staircase design' },
                { icon: ShieldCheck, label: 'Venue-compliant load ratings' },
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
          PROCESS — 6 STEPS
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-white/15 bg-surface/30 py-20 md:py-24">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">From brief to handover</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              A 6-step process built for structures this significant.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {process.map(p => (
              <div key={p.step} className="relative rounded-2xl border border-white/15 bg-surface/40 p-7 transition-colors hover:border-brand-blue-glow/50">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold text-brand-blue-glow">{p.step}</span>
                  <p.icon className="h-5 w-5 text-brand-green" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INLINE CTA BAND
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-white/15 bg-surface/40 py-14">
        <div className="container-wide flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
              <ArrowUp className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                Double your floor space. Not your stress.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Share your show, footprint and brief — we&apos;ll take it from there.
              </p>
            </div>
          </div>
          <Button asChild variant="hero" size="lg" className="shrink-0">
            <Link href="/contact">Get a structural brief <ArrowRight className="h-4 w-4" /></Link>
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
            The landmark on the show floor starts with a conversation.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            Tell us your footprint, your show and your ambition — we&apos;ll design a
            double-decker stand that your competitors will study and your visitors
            will remember.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">Request a Proposal <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outlineBrand" size="xl">
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <ProseSection eyebrow="Two-storey stands" intro={INTRO} blocks={BLOCKS} />
      <ServiceCityLinks />
    </main>
  )
}
