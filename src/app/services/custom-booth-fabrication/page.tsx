import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Sparkles, Hammer, ShieldCheck, Wrench, Truck,
  Layers, Award, Trophy, Clock, Ruler,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata = {
  title: 'Custom Booth Fabrication — Approach Media',
  description: 'In-house custom booth fabrication across India and 14+ countries. Built in our 30,000 sq ft workshop, mock-up tested before dispatch, and delivered on time.',
  alternates: { canonical: 'https://approachmedia.in/services/custom-booth-fabrication' },
  openGraph: {
    title: 'Custom Booth Fabrication — Approach Media',
    description: 'In-house custom booth fabrication across India and 14+ countries. Built in our 30,000 sq ft workshop, mock-up tested before dispatch, and delivered on time.',
    url: 'https://approachmedia.in/services/custom-booth-fabrication',
  },
}

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

const trustBadges = [
  { icon: Trophy,     label: '6000+ stalls fabricated' },
  { icon: Ruler,      label: '30,000 sq ft workshop' },
  { icon: Truck,      label: '14+ countries delivered' },
  { icon: ShieldCheck, label: 'ISO-grade quality' },
]

const whyChoose = [
  { icon: Hammer,     title: 'In-house workshop',          copy: 'Our own 30,000 sq ft facility houses carpentry, metal, print, electricals and finishing under one roof — no third-party delays, no quality compromises.' },
  { icon: ShieldCheck, title: 'Full mock-up QC',            copy: 'Every booth is fully erected and inspected in our warehouse before it ships. What you approve in the warehouse is exactly what appears on the floor.' },
  { icon: Wrench,     title: 'Precision engineering',       copy: 'Working drawings, tight tolerances and experienced fabricators mean every component fits the first time — millimetre accuracy on every joint and surface.' },
  { icon: Truck,      title: 'End-to-end logistics',        copy: 'Crating, freight, customs clearance, on-site installation and post-show dismantling — one accountable team from our workshop door to the exhibition floor.' },
  { icon: Layers,     title: 'Material mastery',            copy: 'Premium veneers, structural steel, fire-rated panels, edge-lit acrylic — we specify and source the right material for the right structural and aesthetic role.' },
  { icon: Award,      title: 'International standards',     copy: 'Booths built to satisfy venue safety norms in Frankfurt, Dubai, Singapore and Mumbai — load ratings, fire certifications, and clean finishes every time.' },
]

const outcomes = [
  { stat: '30,000',  label: 'sq ft in-house workshop' },
  { stat: '100%',    label: 'mock-up tested before dispatch' },
  { stat: '6000+',   label: 'booths fabricated' },
  { stat: '14+',     label: 'countries delivered' },
]

const process = [
  { step: '01', icon: Wrench,     title: 'Brief & Engineering',      copy: 'We review your design brief, exhibition specs and site conditions — turning creative intent into a buildable, costed plan.' },
  { step: '02', icon: Ruler,      title: 'Technical Drawings',        copy: 'Precise fabrication drawings with component breakdowns, tolerances and material callouts. Nothing goes to the shop floor without engineering sign-off.' },
  { step: '03', icon: Layers,     title: 'Material Sourcing',         copy: 'We procure veneers, structural steel, panels, hardware and finishes from vetted suppliers — checked against spec before cutting begins.' },
  { step: '04', icon: Hammer,     title: 'In-House Fabrication',      copy: 'Carpentry, metalwork, finishing and branding elements are all produced in our 30,000 sq ft workshop by permanent, skilled teams.' },
  { step: '05', icon: ShieldCheck, title: 'Mock-Up & QC',              copy: 'The entire booth is assembled and inspected under show conditions. Dimensions, finishes, joints and hardware are signed off before crating.' },
  { step: '06', icon: Truck,      title: 'On-Site Installation',      copy: 'Our crew handles freight, on-site assembly, AV hook-up and standby support for the full show duration, then full dismantling after.' },
]

const materials = [
  { icon: Layers,     label: 'Premium veneers & laminates' },
  { icon: Wrench,     label: 'Structural steel frames' },
  { icon: ShieldCheck, label: 'Fire-rated panels' },
  { icon: Award,      label: 'Edge-lit acrylic systems' },
]

const faqs = [
  {
    q: 'How much does custom booth fabrication cost?',
    a: 'Cost depends on booth size, materials specified and structural complexity. After a short discovery call we share a transparent, line-item quote — no inflated numbers, no hidden charges — so you know exactly what every rupee or dollar goes towards.',
  },
  {
    q: 'Can you fabricate from an existing design?',
    a: 'Absolutely. Provide your approved 3D renders or architectural drawings and our engineering team will produce precise fabrication drawings and build to exact specification — whether the design originates from us or your agency.',
  },
  {
    q: 'How long does fabrication take?',
    a: 'Typically 3–5 weeks for a fully custom booth, depending on size and material complexity. For projects with tight deadlines we offer an expedited track — discuss your show date and we will give you an honest timeline upfront.',
  },
  {
    q: 'Do you do a test build before the show?',
    a: 'Yes — always. Every booth is fully erected in our 30,000 sq ft warehouse, inspected end-to-end, and signed off before crating. What you approve in the mock-up is exactly what arrives on the exhibition floor.',
  },
  {
    q: 'Do you handle international fabrication and shipping?',
    a: 'Yes. We have delivered to 14+ countries including Germany, UAE, Singapore, USA, France, Netherlands and Kenya. We manage crating, freight, customs documentation and on-site assembly through our network of local installation partners.',
  },
]

export default function CustomBoothFabricationPage() {
  return (
    <main>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={`${CDN}/booth-hero.jpg`}
            alt="Custom exhibition booth fabricated in-house — structural steel, premium veneers and precision finishes"
            fill className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container-wide grid gap-10 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-brand-green">
              <Sparkles className="h-3.5 w-3.5" /> Precision Fabrication
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-7xl">
              Built to the <span className="text-brand-blue-glow">millimetre.</span>
              <br />
              Delivered on time.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              In-house custom booth fabrication engineered for precision, built for
              durability, and mock-up tested before it ever leaves our 30,000 sq ft
              workshop. One team. Zero surprises on the floor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">Get a Fabrication Quote <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/contact">Talk to a Fabrication Expert</Link>
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
              <Image
                src={`${CDN}/booth-gallery-1.jpg`}
                alt="Custom booth with structural steel frame and premium wood veneer finishes"
                width={640} height={800} loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl border border-white/15 object-cover"
              />
              <div className="space-y-3">
                <Image
                  src={`${CDN}/booth-gallery-2.jpg`}
                  alt="Exhibition booth interior with edge-lit acrylic brand wall"
                  width={640} height={640} loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover"
                />
                <Image
                  src={`${CDN}/booth-gallery-3.jpg`}
                  alt="Modern fabricated booth with laminate panels and integrated lighting"
                  width={640} height={640} loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover"
                />
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
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">The fabrication gap</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              The fabrication gap that kills good design.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            A perfectly designed booth can fail at the last metre — poor joinery,
            misaligned panels, finishes that look different under show lighting, or a
            build that simply doesn&apos;t arrive in one piece. Great fabrication is invisible;
            bad fabrication is unforgettable, for the wrong reasons. That is the gap we
            have spent two decades closing.
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
                Six reasons project managers sleep better with us on the build.
              </h2>
            </div>
            <Button asChild variant="glass" size="lg">
              <Link href="/contact">Discuss your project <ArrowRight className="h-4 w-4" /></Link>
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
          GALLERY SHOWCASE
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/15 bg-surface/30 py-20 md:py-24">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Built in our workshop</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Fabricated to last the full week.
              </h2>
            </div>
            <Link href="/portfolio" className="hidden items-center gap-1.5 text-sm font-medium text-brand-blue-glow md:inline-flex">
              View full portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <div className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '520px' }}>
              <Image
                src={`${CDN}/booth-gallery-4.jpg`}
                alt="Warm-lit custom real estate exhibition booth at a 72 sqm property expo"
                fill loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Property Expo · 72 sqm · Custom Build</p>
                <p className="mt-1 font-display text-xl text-foreground">Warm-lit custom real estate experience booth</p>
              </div>
            </div>
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image
                src={`${CDN}/booth-gallery-2.jpg`}
                alt="Glass-front exhibition brand lounge with an illuminated façade at a 48 sqm property expo"
                fill loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Property Expo · 48 sqm · Custom Build</p>
                <p className="mt-1 font-display text-xl text-foreground">Glass-front brand lounge with illuminated façade</p>
              </div>
            </div>
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image
                src={`${CDN}/booth-gallery-3.jpg`}
                alt="Premium exhibition consultation lounge with feature partitions at a 54 sqm property expo"
                fill loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Property Expo · 54 sqm · Custom Build</p>
                <p className="mt-1 font-display text-xl text-foreground">Premium consultation lounge with feature partitions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MATERIALS SECTION
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/15 bg-surface/40 py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15">
              <Image
                src={`${CDN}/booth-detail.jpg`}
                alt="Close detail of premium booth materials — veneer, steel joinery and edge-lit acrylic"
                fill loading="lazy" className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Materials that earn their keep</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              The difference is in the materials we choose.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Every material we specify earns its place on structural, aesthetic and
              practical grounds. We do not cut corners on substrate, finish or hardware
              — because a booth that looks tired on day two is a brand problem, not just
              a fabrication problem.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {materials.map(m => (
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
      <section className="py-20 md:py-24">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">From brief to on-site installation</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              A 6-step fabrication process built around zero surprises.
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
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                See it built before it ships.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Every booth goes through a full mock-up in our warehouse — you approve it before we crate and dispatch.
              </p>
            </div>
          </div>
          <Button asChild variant="hero" size="lg" className="shrink-0">
            <Link href="/contact">Request a Fabrication Quote <ArrowRight className="h-4 w-4" /></Link>
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
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-white/10"
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
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-white/15 py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--brand-blue-glow)/0.15),transparent_60%)]" />
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green">Get started</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            The booth that earns the meetings starts here.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            A short call, a precise brief, and a fabrication plan you can trust. Walk
            onto the floor with a booth that holds up, stands out, and reflects the
            brand you&apos;ve worked to build.
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

    </main>
  )
}
