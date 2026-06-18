import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Sparkles, ClipboardList, Calendar, Users, Globe2,
  ShieldCheck, FileText, Trophy, MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'

export const metadata = {
  title: 'Turnkey Exhibition Project Management — Approach Media',
  description: 'End-to-end turnkey exhibition project management — concept to dismantling, one team, one point of accountability, zero coordination gaps across India and 14+ countries.',
  alternates: { canonical: 'https://approachmedia.in/services/turnkey-project-management' },
  openGraph: {
    title: 'Turnkey Exhibition Project Management — Approach Media',
    description: 'End-to-end turnkey exhibition project management — concept to dismantling, one team, one point of accountability, zero coordination gaps across India and 14+ countries.',
    url: 'https://approachmedia.in/services/turnkey-project-management',
  },
}

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/services'

const trustBadges = [
  { icon: Trophy,        label: '6000+ projects' },
  { icon: ClipboardList, label: 'Single point of contact' },
  { icon: MapPin,        label: '14+ countries' },
  { icon: ShieldCheck,   label: 'On-time delivery' },
]

const outcomes = [
  { stat: '7',     label: 'integrated service stages' },
  { stat: '1',     label: 'dedicated project manager' },
  { stat: '6000+', label: 'projects delivered' },
  { stat: '14+',   label: 'countries managed' },
]

const whyChoose = [
  { icon: ClipboardList, title: 'Single accountability',      copy: 'One team owns every stage — design, fabrication, logistics, installation, and dismantling. No finger-pointing, no gaps, no surprises.' },
  { icon: Calendar,      title: 'Timeline management',        copy: 'Structured milestone schedules, built-in buffer windows, and proactive replanning if anything shifts — so the show always opens on time.' },
  { icon: Users,         title: 'Cross-team coordination',    copy: 'We coordinate internal teams, venue authorities, freight partners, and on-site crews under a single master plan you always have visibility into.' },
  { icon: Globe2,        title: 'International execution',    copy: 'Exhibitions across 14+ countries. We manage local compliance, import documentation, ground-level logistics, and trusted regional partners.' },
  { icon: ShieldCheck,   title: 'Risk management',            copy: 'Contingency plans for every critical path item. We identify and de-risk before mobilisation — not on the show floor.' },
  { icon: FileText,      title: 'Transparent reporting',      copy: 'Regular status updates, budget trackers, and post-event documentation. You always know exactly where the project stands.' },
]

const processSteps = [
  { step: '01', title: 'Brief',                   copy: 'We capture your event, brand goals, footprint, timeline, and budget in a focused discovery session.' },
  { step: '02', title: 'Design',                  copy: 'Concept, mood, spatial layout and 3D walkthroughs — refined until you can see and feel the result.' },
  { step: '03', title: 'Scope & Quote',            copy: 'A transparent, line-item budget covering every stage. No hidden vendor charges, no scope ambiguity.' },
  { step: '04', title: 'Fabrication',              copy: 'Built in our 30,000 sq ft in-house warehouse — carpentry, metal, print, lighting, and AV under one roof.' },
  { step: '05', title: 'QC Mock-up',               copy: 'The entire stand is erected and inspected end-to-end before it leaves our workshop.' },
  { step: '06', title: 'Logistics & Installation', copy: 'Freight, venue approvals, on-site build, AV calibration, and a standby crew for every show day.' },
  { step: '07', title: 'Dismantling',              copy: 'Clean, safe dismantle, asset return, and a full post-event project close-out report.' },
]

const featurePills = [
  { icon: ClipboardList, label: 'Concept to installation' },
  { icon: Sparkles,      label: 'Graphics & branding' },
  { icon: Globe2,        label: 'AV & technology' },
  { icon: ArrowRight,    label: 'Logistics & dismantling' },
]

const faqs = [
  {
    q: 'What exactly is turnkey exhibition management?',
    a: 'Turnkey exhibition management means one team handles the complete lifecycle of your exhibition — from the initial brief and design through fabrication, logistics, on-site installation, and final dismantling. You brief a single point of contact and collect the keys to a finished stand.',
  },
  {
    q: 'How do you handle multiple vendors?',
    a: 'We don\'t rely on multiple external vendors for core delivery. Design, fabrication, graphics, AV integration, and installation are handled in-house by our own teams in our 30,000 sq ft workshop. This eliminates the coordination overhead and quality inconsistency that fragmented vendor chains introduce.',
  },
  {
    q: 'Can we still be involved in decisions throughout the project?',
    a: 'Absolutely. Your dedicated project manager schedules milestone approvals at every key stage — concept sign-off, 3D design, material selection, mock-up inspection, and pre-dispatch QC. You stay informed and in control without managing the logistics yourself.',
  },
  {
    q: 'Do you manage international exhibitions?',
    a: 'Yes. We have delivered exhibitions across 14+ countries including USA, Germany, UAE, France, Singapore, Netherlands, and Kenya. Our team handles import documentation, local compliance, freight forwarding, and on-ground installation coordination.',
  },
  {
    q: 'What if the show timeline changes last minute?',
    a: 'We build flexibility into every project schedule with contingency windows at critical-path stages. Your dedicated project manager monitors milestones continuously and adapts the plan immediately if a venue shifts dates or your brief evolves — keeping delivery on track regardless.',
  },
]

export default function TurnkeyProjectManagementPage() {
  return (
    <main>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={`${CDN}/turnkey-hero.jpg`}
            alt="Turnkey exhibition project management — full-scale stand on the show floor"
            fill className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container-wide grid gap-10 py-24 md:grid-cols-12 md:py-36">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-brand-green">
              <Sparkles className="h-3.5 w-3.5" /> Turnkey Project Management
            </div>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-7xl">
              One team. One brief.{' '}
              <span className="text-brand-blue-glow">Zero coordination gaps.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              We manage the entire exhibition lifecycle — concept through dismantling —
              under a single scope, a single budget, and one accountable project manager.
              No fragmented vendors. No dropped handoffs. Just a stand that shows up on time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">Request a Proposal <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/contact">Talk to a Project Manager</Link>
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
                src={`${CDN}/turnkey-gallery-1.jpg`}
                alt="Turnkey project delivery — large-format exhibition stand"
                width={640} height={800} loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl border border-white/15 object-cover"
              />
              <div className="space-y-3">
                <Image
                  src={`${CDN}/turnkey-gallery-2.jpg`}
                  alt="On-site installation managed by Approach Media project team"
                  width={640} height={640} loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-white/15 object-cover"
                />
                <Image
                  src={`${CDN}/turnkey-gallery-3.jpg`}
                  alt="Completed turnkey exhibition stand ready for show day"
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
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">The cost of fragmentation</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Multiple agencies. Multiple risks. One missed deadline.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            When design, fabrication, logistics, and AV are split across four different
            suppliers, no one is accountable for the whole. One late delivery cascades
            into a late installation, and suddenly you&apos;re opening your show with half
            a stall. Turnkey removes that entirely — a single team owns the risk, the
            timeline, and the result.
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
                Six reasons project teams hand it over to us and sleep soundly.
              </h2>
            </div>
            <Button asChild variant="glass" size="lg">
              <Link href="/contact">Discuss your project <ArrowRight className="h-4 w-4" /></Link>
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
          GALLERY
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-y border-white/15 bg-surface/30 py-20 md:py-24">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Projects we have delivered</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                One team. Thousands of shows delivered.
              </h2>
            </div>
            <Link href="/portfolio" className="hidden items-center gap-1.5 text-sm font-medium text-brand-blue-glow md:inline-flex">
              View full portfolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            {/* Large left */}
            <div className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '520px' }}>
              <Image
                src={`${CDN}/turnkey-gallery-4.jpg`}
                alt="Completed large-format turnkey exhibition stand — full project delivery"
                fill loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Manufacturing Expo · 120 sqm · Turnkey</p>
                <p className="mt-1 font-display text-xl text-foreground">Brief to build in seven stages</p>
              </div>
            </div>
            {/* Top right */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image
                src={`${CDN}/turnkey-gallery-2.jpg`}
                alt="On-site installation managed by turnkey project team"
                fill loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">International Trade Fair · 72 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Cross-border execution, zero delays</p>
              </div>
            </div>
            {/* Bottom right */}
            <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-white/15" style={{ minHeight: '250px' }}>
              <Image
                src={`${CDN}/turnkey-gallery-3.jpg`}
                alt="Turnkey project — finished hospitality and display zone"
                fill loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-6">
                <p className="text-xs uppercase tracking-wider text-brand-green">Pharma Summit · 48 sqm</p>
                <p className="mt-1 font-display text-xl text-foreground">Single PM, full delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT'S INCLUDED
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/15 bg-surface/40 py-20 md:py-24">
        <div className="container-wide grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15">
              <Image
                src={`${CDN}/turnkey-detail.jpg`}
                alt="Turnkey exhibition management — detail of materials and project execution"
                fill loading="lazy" className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">Everything included</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              Everything in one scope. Nothing left to chance.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              From the first sketch to the last bolt removed from the floor, every
              deliverable is inside a single project scope — budgeted, scheduled, and
              managed by one accountable team. There are no handoff gaps, no hidden
              add-ons, and no separate supplier invoices to reconcile.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {featurePills.map(f => (
                <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/15 bg-background/60 px-4 py-3 text-sm text-foreground">
                  <f.icon className="h-4 w-4 text-brand-green" />
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROCESS — 7 STEPS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-green">From brief to dismantling</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
              A 7-step process with zero gaps in ownership.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Every step is planned, assigned, and tracked before the previous one
              closes. No stage is handed to an external coordinator — our team owns
              every transition.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-7">
              <Link href="/contact">Start your project <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="lg:col-span-8">
            <ol className="space-y-4">
              {processSteps.map(p => (
                <li
                  key={p.step}
                  className="flex gap-5 rounded-2xl border border-white/15 bg-surface/40 p-6 transition-colors hover:border-brand-blue-glow/50"
                >
                  <div className="font-display text-3xl font-semibold text-brand-blue-glow">{p.step}</div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
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
              <ClipboardList className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                Tell us your show. We&apos;ll manage the rest.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                Share your event, footprint, and timeline — your dedicated PM takes it from there.
              </p>
            </div>
          </div>
          <Button asChild variant="hero" size="lg" className="shrink-0">
            <Link href="/contact">Start the conversation <ArrowRight className="h-4 w-4" /></Link>
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
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border border-white/15 bg-surface/40 px-5"
                >
                  <AccordionTrigger className="py-5 text-left font-display text-base font-medium text-foreground hover:no-underline">
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
            One call is all it takes to hand it over.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            Brief a project manager today. We&apos;ll scope the full lifecycle, fix the
            budget, and own every stage — so your team is free to focus on the show.
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
