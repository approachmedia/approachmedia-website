import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Monitor, Zap, Globe2, ShieldCheck,
  Volume2, MousePointerClick, Sparkles, Wifi,
  Lightbulb, Cpu, Film, Settings, Play, Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

import { whyChoose } from '../_content/av-technology-integration'
import { SITE_URL } from '@/lib/site-url'
import ServiceSchema from '@/components/seo/ServiceSchema'
export const metadata = {
  title: { absolute: "Exhibition Stand AV & Technology Integration | LED Walls" },
  description: 'LED video walls, interactive screens, projection mapping and immersive sound integrated into your exhibition stall from day one — not bolted on after design.',
  alternates: { canonical: `${SITE_URL}/services/av-technology-integration` },
  openGraph: {
    title: "Exhibition Stand AV & Technology Integration | LED Walls",
    description: 'LED video walls, interactive screens, projection mapping and immersive sound integrated into your exhibition stall from day one — not bolted on after design.',
    url: `${SITE_URL}/services/av-technology-integration`,
  },
}

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

const trustBadges = [
  { icon: Monitor,     label: 'LED video wall specialists' },
  { icon: Zap,         label: 'Integrated from day one' },
  { icon: Globe2,      label: '14+ countries' },
  { icon: ShieldCheck, label: 'On-site AV crew' },
]


const outcomes = [
  { stat: '10×',   label: 'Engagement vs. standard stall' },
  { stat: 'Day 1', label: 'AV integrated into design' },
  { stat: '6000+', label: 'Stalls with AV delivered' },
  { stat: '24/7',  label: 'On-site crew during show' },
]

const process = [
  { step: '01', icon: Lightbulb, title: 'AV Brief & Goals',                   copy: 'We map your technology objectives, content strategy and audience journey before a single component is specified.' },
  { step: '02', icon: Cpu,       title: 'Concept Integration',                copy: 'AV is designed into the stall architecture from the start — LED walls become structural, speakers disappear into ceilings.' },
  { step: '03', icon: Settings,  title: 'Engineering & Spec',                 copy: 'Power loads, signal paths, rigging weights and cable runs resolved in CAD — no surprises on the show floor.' },
  { step: '04', icon: Film,      title: 'Content Production',                 copy: 'Motion graphics, product reels, interactive UI and ambient loops produced in-house to match screen spec perfectly.' },
  { step: '05', icon: Play,      title: 'On-Site Installation & Calibration', copy: 'Our crew installs, configures and colour-calibrates every display, speaker and lighting fixture — then runs a full dress rehearsal.' },
  { step: '06', icon: Users,     title: 'Live Show Support',                  copy: 'Dedicated on-floor AV technician throughout the show — content swaps, re-calibrations and incident response in minutes.' },
]

const faqs = [
  {
    q: 'What AV technology do you integrate into exhibition stalls?',
    a: 'We integrate a full AV stack — LED video walls, interactive touchscreens, projection mapping onto curved and architectural surfaces, directional sound zones, kinetic lighting rigs and smart control systems. Every technology is specified to suit your stall size, content goals and budget.',
  },
  {
    q: 'Can AV be integrated into any stall size?',
    a: 'Yes. Even a compact 9 sqm stall can benefit from a single LED panel, a directional speaker and a touchscreen. We plan every technology choice around your available footprint, power allocation and visitor journey so the result always feels considered — never cramped.',
  },
  {
    q: 'Who manages the AV on show days?',
    a: 'Our dedicated on-site AV crew is present for the full duration of every show. They handle content playback, daily calibration, real-time content swaps and any technical incidents — so your team can focus entirely on conversations with visitors.',
  },
  {
    q: 'Do you produce the content for the screens?',
    a: 'Yes. Our in-house studio produces motion graphics, product reels, interactive UI and ambient loops — all output to the exact pixel dimensions and refresh rates of your installed screens. Content is tested end-to-end during our pre-show calibration.',
  },
  {
    q: 'Can existing AV equipment be used in our stall?',
    a: 'Absolutely. We assess client-owned equipment for compatibility during the engineering phase and integrate it where it meets the spec. If existing hardware can perform the role reliably, we build the system design around it — saving you cost without compromising quality.',
  },
]

export default function AVTechnologyIntegrationPage() {
  return (
    <main>
      <ServiceSchema
        name="AV & Technology Integration"
        serviceType="Exhibition audio-visual and technology integration"
        slug="av-technology-integration"
        description="LED walls, interactive displays, audio and show-control systems specified and integrated into exhibition stands."
        faqs={faqs}
      />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={`${CDN}/av-hero.jpg`}
            alt="Exhibition stall with full LED video wall, interactive displays and immersive lighting"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container-wide grid gap-10 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-brand-green">
              <Monitor className="h-3.5 w-3.5" /> AV &amp; Technology Integration
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-7xl">
              Technology that makes visitors{' '}
              <span className="text-brand-blue-glow">stop, look,</span>
              <br />
              and engage.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              LED walls, interactive screens, immersive sound and precision lighting
              — planned from day one, not bolted on after the design is done. AV that
              disappears into the architecture and reappears as pure impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">Get a Free AV Concept <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/contact">Talk to an AV Specialist</Link>
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
                src={`${CDN}/av-gallery-1.jpg`}
                alt="Large-format LED video wall at an exhibition stall"
                width={640} height={800}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl border border-white/15 object-cover"
              />
              <div className="space-y-3">
                <Image
                  src={`${CDN}/av-gallery-2.jpg`}
                  alt="Interactive touchscreen display in an exhibition booth"
                  width={640} height={640}
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover"
                />
                <Image
                  src={`${CDN}/av-gallery-3.jpg`}
                  alt="Projection mapping on curved exhibition stall surface"
                  width={640} height={640}
                  loading="lazy"
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
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">The AV truth most stalls ignore</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              AV bolted on at the last minute looks exactly like that.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            When technology is an afterthought, you get screens that clash with the architecture,
            cables that snake across the floor, and sound that bleeds into the aisle. When AV is
            integrated from concept, it delivers 10× the impact — because visitors experience one
            seamless world, not a stall with a TV stuck to it.
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
          WHY CHOOSE US — 6 CARDS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">What we integrate</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Six technologies. One seamless stall experience.
              </h2>
            </div>
            <Button asChild variant="glass" size="lg">
              <Link href="/contact">Discuss your AV brief <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map(s => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-surface/40 p-7 transition-all hover:-translate-y-1 hover:border-brand-blue-glow/50"
              >
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
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">AV in the wild</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Technology that earns its place on the floor.
              </h2>
            </div>
            <Link href="/portfolio" className="hidden items-center gap-1.5 text-sm font-medium text-brand-blue-glow md:inline-flex">
              View full portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            {/* Large left — 2 rows */}
            <div className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '520px' }}>
              <Image
                src={`${CDN}/av-gallery-4.jpg`}
                alt="Massive LED video wall spanning the full width of an exhibition stall"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">ACETECH · LED Wall · 48 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Full-façade LED hero display</p>
              </div>
            </div>
            {/* Top right */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image
                src={`${CDN}/av-gallery-2.jpg`}
                alt="Interactive touchscreen floor installation at GITEX"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">GITEX · Interactive Floor</p>
                <p className="mt-1 font-display text-xl text-foreground">Motion-reactive floor projection</p>
              </div>
            </div>
            {/* Bottom right */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image
                src={`${CDN}/av-gallery-3.jpg`}
                alt="Projection mapping onto a curved exhibition stall canopy at Auto Expo"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Auto Expo · Projection Mapping</p>
                <p className="mt-1 font-display text-xl text-foreground">Curved canopy content theatre</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TECHNOLOGY TYPES — detail image + feature pills
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/15 bg-surface/40 py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15">
              <Image
                src={`${CDN}/av-detail.jpg`}
                alt="Close-up of LED tile joints, signal processors and speaker grilles integrated into an exhibition stall"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">The full AV stack</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              The full AV stack, integrated as one.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              We don&apos;t source individual components and hope they work together. Every
              display, speaker, processor, lighting fixture and control system is specified,
              cabled and programmed as a unified system — so on show day, a single operator
              controls the entire stall environment from one screen.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Monitor,           label: 'LED Video Walls & Displays' },
                { icon: Volume2,           label: 'Directional Sound Zones' },
                { icon: MousePointerClick, label: 'Interactive Touch Systems' },
                { icon: Sparkles,          label: 'Projection & Kinetic Elements' },
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
      <section className="py-20 md:py-24">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">From brief to live show</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              A 6-step process that never leaves AV to the last day.
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
              <Monitor className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                Tell us your story. We&apos;ll build the technology around it.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Share your event, footprint and objectives — we&apos;ll send a free AV concept within 48 hours.
              </p>
            </div>
          </div>
          <Button asChild variant="hero" size="lg" className="shrink-0">
            <Link href="/contact">Get my free AV concept <ArrowRight className="h-4 w-4" /></Link>
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
            The screen everyone photographs starts here.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            A short call, a sharp brief, and an AV concept your team can see. Let&apos;s integrate
            the technology that turns your stall into the one everyone is talking about.
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
