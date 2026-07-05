import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Sparkles, Lightbulb, Volume2, Layers3,
  MousePointerClick, Wand2, Eye, Clock, Users, Trophy,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata = {
  title: 'Immersive Brand Experience Design — Approach Media',
  description: 'Turn your exhibition stand into a sensory journey. We design immersive brand experiences — narrative, light, sound, material and interaction — that drive dwell time and qualified leads.',
  alternates: { canonical: 'https://approachmedia.in/services/immersive-brand-experience' },
  openGraph: {
    title: 'Immersive Brand Experience Design — Approach Media',
    description: 'Turn your exhibition stand into a sensory journey. We design immersive brand experiences — narrative, light, sound, material and interaction — that drive dwell time and qualified leads.',
    url: 'https://approachmedia.in/services/immersive-brand-experience',
  },
}

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

const sensoryLayers = [
  { icon: Layers3,          title: 'Spatial Narrative',       copy: 'A walk-through story arc — anticipation, reveal, interaction, recall.' },
  { icon: Lightbulb,        title: 'Cinematic Lighting',      copy: 'Choreographed beams, gradients and reveals that steer the eye.' },
  { icon: Volume2,          title: 'Soundscape Design',       copy: 'Directional audio zones that change as visitors move through space.' },
  { icon: Wand2,            title: 'Material & Texture',      copy: 'Tactile surfaces — wood, brass, fluted glass, micro-mesh — to feel premium.' },
  { icon: MousePointerClick, title: 'Interactive Touchpoints', copy: 'Touch walls, AR previews, kinetic installations, branded games.' },
  { icon: Sparkles,         title: 'Moments of Surprise',     copy: 'Projection mapping, kinetic ceilings, hidden reveals — designed to be shared.' },
]

const outcomes = [
  { stat: '3.2×', label: 'Average dwell time vs. a standard stall' },
  { stat: '62%',  label: 'More qualified conversations captured' },
  { stat: '4.8×', label: 'Social shares and reels generated on-floor' },
  { stat: '23+',  label: 'Years building experiences that convert' },
]

const journey = [
  { step: '01', title: 'Discover the brand truth',  copy: 'We unpack who you are, who you want, and the single feeling visitors must leave with.' },
  { step: '02', title: 'Script the experience',     copy: 'A spatial storyboard — entry hook, journey beats, climax moment, capture point.' },
  { step: '03', title: 'Design in 3D',              copy: 'Walkthrough renders, VR previews, lighting & material studies — approved before a bolt is cut.' },
  { step: '04', title: 'Build & rehearse',          copy: 'Fabricated in our 30,000 sq ft warehouse and tested end-to-end before it ships.' },
  { step: '05', title: 'Stage on-site',             copy: 'Our crew installs, calibrates AV, sound and lighting — and stays through show days.' },
]

const faqs = [
  { q: 'How is this different from a regular custom stall?',  a: 'A standard stall displays your brand. An immersive experience pulls visitors into a designed journey — narrative, light, sound, interaction — so they remember you weeks after the show.' },
  { q: 'Will this work for a smaller booth?',                 a: 'Yes. We have built memorable immersive moments inside 6×3 m stalls using projection, sound zoning and a single strong interactive idea.' },
  { q: 'What is the indicative investment?',                  a: 'Immersive builds typically start meaningfully above a standard custom stall and scale with technology and footprint. We share a transparent budget after a 20-minute discovery call.' },
  { q: 'How early should we start?',                         a: 'Ideally 8–12 weeks before the event. For complex AV or kinetic builds, 12–16 weeks gives the smoothest run.' },
  { q: 'Do you handle the tech on-site too?',                a: 'Yes — content, AV, lighting, sound and interactive systems are all run by our on-floor team for the entire show duration.' },
]

export default function ImmersiveBrandExperiencePage() {
  return (
    <main>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={`${CDN}/immersive-hero.jpg`}
            alt="Immersive exhibition stall with LED walls, ribbon lighting and interactive touch displays"
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
              <Sparkles className="h-3.5 w-3.5" /> Flagship Service
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-7xl">
              A brand. <span className="text-brand-blue-glow">An experience.</span>
              <br />
              A memory worth a meeting.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We design exhibition stands you don&apos;t just walk past — you walk through.
              Sensory, narrative, interactive spaces engineered to turn footfall into
              real business conversations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">
                  Get a Free Concept Sketch <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/contact">Book a 20-min Consult</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-brand-green" /> 6000+ stalls executed</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-brand-green" /> 14+ countries</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand-green" /> Reply in &lt; 4 hrs</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <Image
                src={`${CDN}/immersive-gallery-1.jpg`}
                alt="Double-decker immersive stall with LED video wall"
                width={640} height={800}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl border border-white/15 object-cover"
              />
              <div className="space-y-3">
                <Image
                  src={`${CDN}/immersive-gallery-3.jpg`}
                  alt="Interactive hologram product island"
                  width={640} height={640}
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover"
                />
                <Image
                  src={`${CDN}/immersive-gallery-2.jpg`}
                  alt="Projection mapped tunnel inside booth"
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
          PROBLEM / PROMISE
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-white/15 bg-surface/40 py-16 md:py-20">
        <div className="container-wide grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">The reality on the show floor</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              90% of visitors forget your stand within 24 hours.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            People don&apos;t remember what they saw. They remember how a space made them
            feel. An immersive brand experience replaces the &ldquo;booth glance&rdquo; with a
            moment — and a moment is what turns a stranger into a sales conversation.
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
          SIX SENSORY LAYERS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Six sensory layers</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                Every immersive build is engineered across six layers — not just visuals.
              </h2>
            </div>
            <Button asChild variant="glass" size="lg">
              <Link href="/contact">Talk to a designer <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sensoryLayers.map(s => (
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
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">See it, feel it</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                A glimpse of immersive stands we&apos;ve built.
              </h2>
            </div>
            <Link href="/portfolio" className="hidden items-center gap-1.5 text-sm font-medium text-brand-blue-glow md:inline-flex">
              View full portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            {/* Large left */}
            <div className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/15">
              <Image
                src={`${CDN}/immersive-gallery-2.jpg`}
                alt="Projection mapped immersive tunnel"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Tech Expo · 24 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Projection-mapped entry tunnel</p>
              </div>
            </div>
            {/* Top right */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '260px' }}>
              <Image
                src={`${CDN}/immersive-gallery-4.jpg`}
                alt="Sensory lighting installation in exhibition stand"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Auto Show · 48 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Choreographed light theatre</p>
              </div>
            </div>
            {/* Bottom right */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '260px' }}>
              <Image
                src={`${CDN}/immersive-gallery-3.jpg`}
                alt="Holographic interactive product island"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Pharma Expo · 36 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Interactive product hologram</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          JOURNEY — 5 STEPS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">From brief to standing ovation</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              The 5-step journey we run with every brand.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Predictable timelines, transparent budgets, one accountable team — from
              the first sketch to dismantling day.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-7">
              <Link href="/contact">Start your project <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="lg:col-span-8">
            <ol className="space-y-4">
              {journey.map(j => (
                <li
                  key={j.step}
                  className="flex gap-5 rounded-2xl border border-white/15 bg-surface/40 p-6 transition-colors hover:border-brand-blue-glow/50"
                >
                  <div className="font-display text-3xl font-semibold text-brand-blue-glow">{j.step}</div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{j.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{j.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          INLINE CONVERSION BAND
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-white/15 bg-surface/40 py-14">
        <div className="container-wide flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/15 text-brand-green">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                See your stand before it&apos;s built.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Share your event, footprint and brand — we&apos;ll send a free concept sketch within 48 hours.
              </p>
            </div>
          </div>
          <Button asChild variant="hero" size="lg" className="shrink-0">
            <Link href="/contact">Get my free concept <ArrowRight className="h-4 w-4" /></Link>
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
            Be the stand everyone&apos;s talking about.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            A short call, a sharp brief, and a concept you can take to your team. Let&apos;s build
            the experience your visitors will remember long after the lights go down.
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
