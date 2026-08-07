import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Layers, Sparkles, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CtaBand } from '@/components/home/CtaBand'

import { SITE_URL } from '@/lib/site-url'
export const metadata: Metadata = {
  title: 'About Approach Media | Exhibition Stall Design & Build Company',
  description: 'Approach Media is an exhibition stall design and build company delivering custom, end-to-end exhibition spaces across India and 14+ countries since 2002.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About Approach Media | Exhibition Stall Design & Build Company',
    description: 'Approach Media is an exhibition stall design and build company delivering custom, end-to-end exhibition spaces across India and 14+ countries since 2002.',
    url: `${SITE_URL}/about`,
  },
}

// ── Data ─────────────────────────────────────────────────────

const offerings = [
  {
    Icon: Layers,
    title: 'Custom Services & Offerings',
    body: 'Exhibition stall design, custom booth fabrication, turnkey project management, audio-visual & technology integration, double decker / mezzanine stands, and immersive brand experience design.',
  },
  {
    Icon: Target,
    title: 'Pan-India & Global Presence',
    body: 'We deliver across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Ahmedabad, Rajkot, Surat, Baroda, Punjab and Haryana — and internationally across the USA, Germany, France, Netherlands, Italy, UAE, Spain, Nepal, Bangladesh, Singapore, China, Malaysia and Kenya.',
  },
  {
    Icon: Sparkles,
    title: 'Industries Served',
    body: 'Real estate, pharma, manufacturing, FMCG, textiles, technology, automotive, healthcare, architecture, and construction & building materials — each space tailored to what matters most for the sector.',
  },
]

const stats = [
  { v: '23+',  l: 'Years of experience' },
  { v: '6000+',l: 'Stalls executed' },
  { v: '14+',  l: 'Countries delivered' },
  { v: '500+', l: 'Exhibitions per year' },
]

const principles = [
  {
    title: 'Thoughtful personalisation',
    body: 'Every space is tailored to your brand\'s objectives, ensuring that what you want to communicate is understood instantly and clearly by your audience.',
  },
  {
    title: 'Industry-aware thinking',
    body: 'We factor in the context of your sector — what your audience expects, how they engage, and what builds credibility — so the space supports industry-specific goals.',
  },
  {
    title: 'Clear, effective design',
    body: 'From layout and movement to interaction and detail, every element is intentional, designed to guide engagement and create a lasting impression.',
  },
]

const process = [
  { n: '01', title: 'Consultation & Brief Planning',                         body: 'We discuss your brand, audience, exhibition objectives, space specifications, budget, and timelines to set a clear direction.' },
  { n: '02', title: 'Concept & Spatial Design',                              body: 'We develop a customised concept that reflects your brand and responds to the exhibition context — visually distinct while guiding visitor flow.' },
  { n: '03', title: 'Engineering & Technical Detailing',                     body: 'The concept is translated into detailed technical drawings and specifications to ensure structural integrity and feasibility.' },
  { n: '04', title: 'Fabrication & Build',                                   body: 'All components are produced in-house under controlled conditions, with quality checks at every stage.' },
  { n: '05', title: 'Full-Scale Mock-Up Testing',                            body: 'A complete mock-up is assembled and tested in our warehouse, identifying and resolving issues in advance.' },
  { n: '06', title: 'Logistics, Installation & On-Site Execution',           body: 'We manage packing, transportation, and on-site installation — every element ready ahead of the event.' },
  { n: '07', title: 'Dismantling & Post-Event Wrap-Up',                     body: 'After the event, the stall is carefully dismantled, with materials handled efficiently for reuse or storage.' },
]

// ── Page ─────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-b border-white/15 pb-24 pt-24 md:pb-32 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_20%,hsl(var(--brand-blue-glow)/0.18),transparent_55%)]" />
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green animate-fade-in">About Us</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight text-foreground md:text-6xl lg:text-7xl animate-fade-up">
            About <span className="text-gradient-brand">Approach Media Pvt. Ltd.</span>
          </h1>
          <p className="mt-5 max-w-2xl font-display text-lg font-medium text-foreground/80 md:text-xl">
            We design unique exhibition stalls so that your brand is understood, experienced, and remembered.
          </p>
          <p className="mt-5 max-w-3xl text-base text-muted-foreground md:text-lg">
            Exhibitions are high-investment environments where spaces must communicate clearly, engage meaningfully, and
            leave a lasting impression within moments. With over two decades of work across industries and geographies,
            we partner with brands to create spaces that perform in high-pressure exhibition environments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link href="/contact">Book a Consultation <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OFFERINGS + IMAGE
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            {offerings.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-xl border border-white/15 bg-surface/40 p-6 transition-colors hover:border-brand-blue-glow/40"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-blue/15 p-2 text-brand-blue-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          {/* Stall image — upload about-stall.jpg to R2 /images/ folder */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15">
            <div className="aspect-[4/5] w-full bg-gradient-to-br from-brand-blue/10 via-background to-brand-green/5">
              <Image
                src="https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/about-stall.jpg"
                alt="Award-winning exhibition stall designed and built by Approach Media"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
              <p className="text-xs uppercase tracking-wider text-brand-green">Featured Build</p>
              <p className="mt-1 font-display text-lg text-foreground">Custom premium stall · International Expo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════ */}
      <section className="border-y border-white/15 bg-surface/40 py-14 md:py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.l} className="text-center">
                <div className="font-display text-4xl font-semibold text-gradient-brand md:text-5xl">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR POSITIONING
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-wider text-brand-green">Our Positioning</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-foreground md:text-5xl">
            The &ldquo;Approach&rdquo; that defines us
          </h2>
          <p className="mt-4 max-w-3xl font-display text-lg italic text-muted-foreground">
            In an ocean of lookalikes, those who stand apart will survive.
          </p>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            At Approach Media, no two brands are treated the same. Each has a distinct offering, a specific audience,
            and a unique way of creating value. So while every exhibition stall design project differs in outcome,
            what remains consistent is how we approach it.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map(p => (
              <div key={p.title} className="rounded-2xl border border-white/15 bg-surface/40 p-7">
                <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR PROCESS
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-white/15 bg-surface/30 py-20 md:py-24">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-wider text-brand-green">Our Process</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-foreground md:text-5xl">
            A structured, end-to-end process built for clarity and control
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            With defined stages and consistent communication, you stay informed at key decision points while we manage
            the execution in its entirety.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {process.map(p => (
              <div key={p.n} className="rounded-xl border border-white/15 bg-background/60 p-6">
                <div className="flex items-start gap-4">
                  <div className="font-display text-2xl font-semibold text-brand-blue-glow">{p.n}</div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VISION & MISSION
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-surface/40 p-8">
            <p className="text-xs uppercase tracking-wider text-brand-green">Our Vision</p>
            <p className="mt-4 font-display text-xl leading-snug text-foreground md:text-2xl">
              To be a trusted partner for brands across industries and geographies, known for creating exhibition spaces
              that go beyond visibility to shape how brands are experienced and remembered.
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-surface/40 p-8">
            <p className="text-xs uppercase tracking-wider text-brand-green">Our Mission</p>
            <p className="mt-4 font-display text-xl leading-snug text-foreground md:text-2xl">
              To deliver innovative and impactful exhibition designs and branding solutions that resonate with our
              clients&apos; visions — helping brands connect with their audience on a deeper level.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════ */}
      <CtaBand />
    </>
  )
}
