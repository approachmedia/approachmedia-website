import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, Globe2, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design Agency in France | Booth Design & Fabrication',
  description: 'Approach Media is an exhibition stall design agency in France — custom booth design, 3D concepts, fabrication, branding, installation and dismantling for Paris, Lyon, Cannes, Marseille, Bordeaux and Lille.',
  alternates: { canonical: `${SITE_URL}/exhibition-stall-design-agency-france` },
}

// ── Data ─────────────────────────────────────────────────────

const heroBullets = [
  'Custom booth design & 3D concepts',
  'Stand fabrication coordination',
  'Paris · Lyon · Cannes · Marseille',
  'Support for Indian & international exhibitors',
  'Turnkey exhibition management',
]

const standOut = [
  { t: 'European-standard booth quality', d: 'Design and fabrication that meets French venue guidelines, organiser specifications and European build standards.' },
  { t: 'Clear brand communication', d: 'Layouts and graphics designed for visitors evaluating multiple exhibitors — your offer is clear within seconds.' },
  { t: 'Product display & demo zones', d: 'Structured areas to present products and demonstrate solutions, planned for the visitor flow of major French fairs.' },
  { t: 'Meeting & discussion areas', d: 'Private and semi-private spaces for conversations with European buyers, distributors and enterprise clients.' },
  { t: 'Multi-language branding', d: 'Fascia, graphics and signage designed for English, French or both — for European and international audiences.' },
  { t: 'Remote coordination', d: 'Design approvals, scope finalisation and production coordinated remotely before on-site execution in France.' },
]

const services = [
  { n: '01', t: 'Custom Exhibition Stall Design',     d: 'Layouts planned around your booth size, open sides, product category, target visitors, brand and exhibition goals.' },
  { n: '02', t: '3D Booth Design & Visualisation',    d: 'Review a detailed 3D visual of the structure, branding, lighting and visitor movement before fabrication.' },
  { n: '03', t: 'Exhibition Stand Fabrication',       d: 'Custom-built booths, modular stands, shell-scheme upgrades, display walls, counters, meeting rooms and backlit graphics.' },
  { n: '04', t: 'Branding & Graphics Production',    d: 'Fascia branding, wall graphics, product panels, backdrops, signage and LED-ready artwork — strong in competitive halls.' },
  { n: '05', t: 'Turnkey Exhibition Solutions',      d: 'One coordinated team from brief to dismantling — concept, design, production, logistics, installation and removal.' },
  { n: '06', t: 'Modular & Rental Booths',           d: 'Faster, budget-efficient modular and rental formats that maintain a premium brand presentation.' },
  { n: '07', t: 'International Exhibitor Support',   d: 'Remote design approvals, scope management, local fabrication coordination, on-site setup and dismantling.' },
]

const venues = [
  {
    city: 'Paris',
    name: 'Paris Expo Porte de Versailles',
    blurb: "France's largest exhibition venue and the home of Europe's most important fairs — Batimat, EquipHotel, JEC World, VivaTech, Paris Air Show, Milipol Paris, Who's Next.",
    shows: ['Batimat', 'EquipHotel', 'JEC World', 'VivaTech', 'Paris Air Show', 'Milipol Paris', "Who's Next"],
  },
  {
    city: 'Paris',
    name: 'Paris Nord Villepinte',
    blurb: "One of Europe's largest exhibition centres — SIAL Paris, Maison & Objet, Première Vision, Milipol. Draws international buyers, distributors and industry professionals.",
    shows: ['SIAL Paris', 'Maison & Objet', 'Première Vision', 'Milipol', 'Consumer lifestyle', 'Large B2B'],
  },
  {
    city: 'Lyon',
    name: 'Eurexpo Lyon',
    blurb: "France's most important regional venue — Sirha Lyon, Pollutec, Global Industrie, Solutrans. Strong audiences in food service, industry, environment and transport.",
    shows: ['Sirha', 'Pollutec', 'Global Industrie', 'Solutrans', 'Pan-European B2B'],
  },
  {
    city: 'Cannes',
    name: 'Palais des Festivals',
    blurb: "Europe's most prestigious business events — MIPIM, Cannes Lions, MIPCOM, ILTM. Senior decision-makers expecting polished, premium booth presentation.",
    shows: ['MIPIM', 'Cannes Lions', 'MIPCOM', 'ILTM', 'Premium showcases'],
  },
  {
    city: 'Marseille',
    name: 'Parc Chanot',
    blurb: 'Main venue for Foire Internationale de Marseille — serves the Mediterranean corridor of France, Italy, Spain and North Africa for southern European buyers.',
    shows: ['Foire de Marseille', 'Mediterranean B2B', 'Food & agriculture', 'Maritime', 'Regional industrial'],
  },
  {
    city: 'Bordeaux & Lille',
    name: 'Regional Exhibition Centres',
    blurb: "Bordeaux: Vinexpo, Foire de Bordeaux, Exp'Hotel — wine, food service, hospitality. Lille Grand Palais: retail, food, rail, with strong Belgium and UK connections.",
    shows: ['Vinexpo', 'Foire de Bordeaux', "Exp'Hotel", 'SIFER', 'Fashion sourcing'],
  },
]

const exhibitions = [
  { m: 'Jan', y: '26', name: 'Maison & Objet Paris',    cat: 'Interior Design & Lifestyle', venue: 'Paris Nord Villepinte' },
  { m: 'Jan', y: '26', name: 'Sirha Lyon',               cat: 'Tourism & Hospitality',       venue: 'Eurexpo, Lyon' },
  { m: 'Jan', y: '26', name: "Who's Next Paris",         cat: 'Fashion & Beauty',            venue: 'Paris Expo Porte de Versailles' },
  { m: 'Feb', y: '26', name: 'Première Vision Paris',    cat: 'Textile, Fabrics & Yarns',   venue: 'Paris Nord Villepinte' },
  { m: 'Mar', y: '26', name: 'JEC World',                cat: 'Composites & Engineering',    venue: 'Paris Expo Porte de Versailles' },
  { m: 'Mar', y: '26', name: 'MIPIM Cannes',             cat: 'Real Estate',                 venue: 'Palais des Festivals' },
  { m: 'Mar', y: '26', name: 'Global Industrie Lyon',    cat: 'Industrial Engineering',      venue: 'Eurexpo, Lyon' },
  { m: 'Jun', y: '26', name: 'VivaTech Paris',           cat: 'IT & Technology',             venue: 'Paris Expo Porte de Versailles' },
  { m: 'Jun', y: '26', name: 'Cannes Lions',             cat: 'Creative Communications',     venue: 'Palais des Festivals' },
  { m: 'Oct', y: '26', name: 'SIAL Paris',               cat: 'Food Industry',               venue: 'Paris Nord Villepinte' },
  { m: 'Nov', y: '26', name: 'Batimat',                  cat: 'Building & Construction',     venue: 'Paris Expo Porte de Versailles' },
  { m: 'Nov', y: '26', name: 'EquipHotel Paris',         cat: 'Hospitality',                 venue: 'Paris Expo Porte de Versailles' },
  { m: 'Nov', y: '26', name: 'Milipol Paris',            cat: 'Security & Defence',          venue: 'Paris Nord Villepinte' },
  { m: 'Dec', y: '26', name: 'Pollutec Lyon',            cat: 'Energy & Environment',        venue: 'Eurexpo, Lyon' },
]

const industries = [
  { t: 'Food, Beverage & Food Tech',        d: 'Booths for food manufacturers, beverage brands and processing equipment at SIAL Paris, Sirha Lyon, Vinexpo.', span: 'lg:col-span-2' },
  { t: 'Fashion, Textiles & Luxury',        d: "Refined stands for fashion labels, fabric houses and luxury brands — Première Vision, Who's Next, Riviera events." },
  { t: 'Construction & Building Materials', d: 'Product-focused booths for construction and architecture brands at Batimat.' },
  { t: 'Industrial Machinery & Engineering',d: 'Practical, display-focused booths for machinery and engineering firms at Global Industrie.', span: 'lg:col-span-2' },
  { t: 'Technology & Digital Innovation',   d: 'Forward-looking booths for tech, SaaS and enterprise brands at VivaTech.' },
  { t: 'Pharma, Medical & Life Sciences',   d: 'Clean professional layouts for pharma, devices and healthcare brands across European health expos.' },
  { t: 'Real Estate & Investment',          d: 'Premium booths for developers, investment brands and urban planners at MIPIM Cannes.', span: 'lg:col-span-2' },
  { t: 'Aerospace, Defence & Security',     d: 'High-specification stands for aerospace and defence at Paris Air Show, Eurosatory, Milipol Paris.' },
  { t: 'Hospitality, Travel & F&B',         d: 'Showcase booths for hotels, catering equipment and travel brands at EquipHotel and Sirha.' },
]

const whyUs = [
  { t: 'Experience with International Exhibitors', d: "We've helped brands exhibit in Germany, Spain, Netherlands, Italy, UAE and France — we understand exhibiting abroad." },
  { t: 'Brand-First Design Approach',              d: 'Every booth is designed around your objective, audience, products and European brand positioning.' },
  { t: 'Remote Coordination for Overseas Teams',   d: 'Design approvals, 3D concepts and production planning fully managed remotely until on-site execution.' },
  { t: 'Practical Booth Layouts',                  d: 'We design for real exhibition use — visitor flow, product access, meeting areas and staff functionality.' },
  { t: 'Clear Scope & Transparent Budgeting',      d: 'Structure, materials, graphics, lighting, furniture, logistics and install — defined before production starts.' },
  { t: 'Multi-Market Execution',                   d: 'Exhibitors supported across India and 14+ countries, with time-zone and venue-aware coordination.' },
]

const steps = [
  { s: '01', t: 'Exhibition Brief',        d: 'Exhibition, venue, booth size, floor plan, open sides, brand guidelines, products, audience, references, budget and timeline.' },
  { s: '02', t: 'Space & Zone Planning',   d: 'Reception, product display, meeting areas, demo points, branding walls, storage and visitor movement corridors.' },
  { s: '03', t: '3D Booth Concept',        d: 'A 3D visual showing structure, counters, display, lighting, branding, graphics, furniture and visitor flow.' },
  { s: '04', t: 'Scope & Estimate',        d: 'After concept approval — a clear scope of work and cost estimate so your team knows exactly what is included.' },
  { s: '05', t: 'Fabrication & Branding',  d: 'Booth elements and graphics produced to the approved design, material plan and schedule, with remote progress updates.' },
  { s: '06', t: 'Logistics & Installation',d: 'Shipped to the French venue and installed by our execution team. Final QC before handover for show opening.' },
  { s: '07', t: 'Dismantling & Exit',      d: "Post-show dismantling and removal as per venue and organiser instructions — full turnkey closure." },
]

const faqs = [
  { q: 'What does an exhibition stall design agency in France do?', a: 'An exhibition stall design agency in France creates booth layouts, 3D booth designs, branding concepts, fabrication plans and installation support for companies participating in trade fairs and expos across Paris, Lyon, Cannes, Marseille, Nice, Bordeaux and Lille.' },
  { q: 'Does Approach Media provide booth design in Paris?', a: 'Yes. Approach Media provides exhibition booth design and stand fabrication support for events in Paris, including at Paris Expo Porte de Versailles, Paris Nord Villepinte and Le Bourget.' },
  { q: 'What is a standiste in France?', a: "In France, 'standiste' commonly refers to an exhibition stand designer, builder or booth contractor. Approach Media functions as an international standiste supporting exhibitors at French trade shows." },
  { q: 'Which cities in France are most important for exhibitions?', a: 'Paris, Lyon, Cannes, Marseille, Nice, Bordeaux and Lille. Paris hosts most international events; Lyon is significant for food, industry and environment; Cannes for luxury, real estate and media.' },
  { q: 'Can Approach Media support international exhibitors in France?', a: 'Yes. We specifically support Indian and international companies exhibiting in France — coordinating remotely for design approvals, scope and production, and providing on-site installation at the French venue.' },
  { q: 'Do you create 3D booth designs before fabrication?', a: 'Yes. A detailed 3D booth concept is created before any production begins so your team can review and approve the layout, branding, display, furniture, lighting and flow in advance.' },
  { q: 'Which major trade fairs in France do you support?', a: "Maison & Objet, SIAL Paris, VivaTech, Paris Air Show, JEC World, Batimat, EquipHotel, Milipol Paris, Sirha Lyon, Pollutec, Global Industrie, MIPIM Cannes, Cannes Lions, MIPCOM, Première Vision, Who's Next and more." },
  { q: 'What types of exhibition stands do you build for France events?', a: 'Shell-scheme upgrades, custom-built booths, modular stands, island stands, double-decker stands, product display booths, country pavilion elements and branded corporate experience zones.' },
  { q: 'How early should we start planning for a French trade fair?', a: 'For international exhibitions in France we recommend beginning at least 60 to 90 days before the event. Larger stands, custom structures, first-time participation or peak-season shows may require more lead time.' },
  { q: 'What information does Approach Media need to begin the booth design?', a: 'Exhibition name, venue, booth size, floor plan, open sides, brand logo and guidelines, product details, target visitor audience, design references, budget range and timeline.' },
]

// ── Page ─────────────────────────────────────────────────────

export default function FrancePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Approach Media — Exhibition Stall Design Agency in France',
    areaServed: ['France', 'Paris', 'Lyon', 'Cannes', 'Marseille', 'Bordeaux', 'Lille'],
    description: 'Custom exhibition booth design, 3D stand concepts, fabrication coordination, branding, installation and dismantling for trade fairs across France.',
    url: `${SITE_URL}/exhibition-stall-design-agency-france`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/france-hero.jpg"
            alt="Exhibition stall design in France"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,hsl(var(--brand-blue-glow)/0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_75%,hsl(var(--brand-green)/0.08),transparent_50%)]" />
        </div>

        {/* Tricolore vertical stripes (subtle) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-[34%] md:block">
          <div className="absolute inset-y-0 left-[4%] w-px bg-gradient-to-b from-transparent via-brand-blue-glow/50 to-transparent" />
          <div className="absolute inset-y-0 left-[14%] w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
          <div className="absolute inset-y-0 left-[24%] w-px bg-gradient-to-b from-transparent via-brand-green/40 to-transparent" />
        </div>

        <div className="container-wide relative pb-24 pt-24 md:pb-32 md:pt-32">
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue-glow/30 bg-brand-blue-glow/5 px-3 py-1 text-brand-blue-glow">
              <Globe2 className="h-3.5 w-3.5" /> France · Europe
            </span>
            <span className="text-foreground/40">/</span>
            <span className="text-foreground/60">Bonjour Paris, Lyon, Cannes</span>
          </div>

          {/* Headline + stat card */}
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8 animate-fade-up">
              <h1 className="font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                Custom booths,<br />
                <span className="text-gradient-brand">built for the</span><br />
                French trade floor.
              </h1>
              <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
                Approach Media is a professional exhibition stall design agency helping brands exhibit at trade fairs across France. From 3D stand concepts and fabrication to branding, installation and dismantling — in Paris, Lyon, Cannes, Marseille, Nice, Bordeaux and Lille.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" size="lg">
                  <Link href="/contact">Get Exhibition Stall Quote <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link href="/contact">Discuss Your French Exhibition</Link>
                </Button>
              </div>
            </div>

            {/* Stat card */}
            <div className="lg:col-span-4 animate-fade-up" style={{ animationDelay: '150ms' }}>
              <div className="surface-card relative overflow-hidden rounded-3xl p-7">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-blue-glow/10 blur-3xl" />
                <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Across France</p>
                <div className="mt-3 grid grid-cols-2 gap-y-6">
                  {[
                    { v: '7',    l: 'Key Cities' },
                    { v: '14+',  l: 'Countries Delivered' },
                    { v: '23+',  l: 'Years Experience' },
                    { v: '6000+',l: 'Stalls Executed' },
                  ].map(stat => (
                    <div key={stat.l}>
                      <div className="font-display text-4xl font-semibold text-gradient-brand">{stat.v}</div>
                      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{stat.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 hairline-divider" />
                <ul className="mt-5 space-y-2">
                  {heroBullets.map(b => (
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

        {/* Oversized FRANCE wordmark */}
        <div className="pointer-events-none relative -mb-6 select-none overflow-hidden md:-mb-10">
          <div className="container-wide">
            <div className="font-display text-[18vw] font-bold leading-[0.8] tracking-[-0.04em] text-foreground/[0.04] md:text-[14vw]">
              FRANCE
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
                Build a stand that <span className="text-gradient-brand">works in France.</span>
              </h2>
              <p className="mt-6 text-muted-foreground md:text-lg">
                France is one of Europe&apos;s most active trade fair destinations — fashion, food, aerospace, technology, construction, cosmetics, defence and hospitality. Thousands of brands fly in each year to meet buyers, distributors and decision-makers from across Europe.
              </p>
              <p className="mt-4 text-muted-foreground md:text-lg">
                We help you arrive ready — with a booth designed for European visitor habits, organiser specs and the visual standards expected at major French fairs.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
                {standOut.map((c, i) => (
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
                Our exhibition services in France
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              One coordinated team across design, fabrication, branding, logistics, install and dismantling — fewer gaps, faster movement.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(s => (
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
          03 — VENUES (magazine grid)
      ══════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-brand-green">03 — Venue expertise</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Exhibition venues we serve <span className="text-gradient-brand">across France.</span>
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg">
              Each French venue has its own build-up schedules, technical specs, access rules, electrical provisions, rigging permissions and dismantling timelines. We plan with those requirements baked in.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {venues.map((v, i) => (
              <article
                key={v.name}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue-glow/40 hover:bg-surface-elevated"
              >
                {/* Ghost chapter number */}
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
                Major exhibitions in France
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
              {exhibitions.map(e => (
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
              Industries we serve in France
            </h2>
          </div>

          <div className="mt-14 grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, idx) => (
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
          06 — WHY US (numbered list)
      ══════════════════════════════════════════════════ */}
      <section className="relative border-y border-white/10 bg-surface/40 py-24 md:py-32">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs uppercase tracking-[0.28em] text-brand-green">06 — Why us</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
                Why choose us <span className="text-gradient-brand">for France?</span>
              </h2>
              <p className="mt-6 text-muted-foreground">
                Practical booth layouts, transparent scope, and a single accountable team — across 14+ countries.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-px overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                {whyUs.map((w, i) => (
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
            {steps.map((p, i) => (
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
                {i < steps.length - 1 && <div className="mt-6 h-px w-12 bg-gradient-to-r from-brand-blue-glow/40 to-transparent" />}
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
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="surface-card rounded-xl border border-white/10 px-5"
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
          CTA
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--brand-blue-glow)/0.15),transparent_60%)]" />
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green">Get started</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Planning to exhibit in France?<br />
            <span className="text-gradient-brand">Let&apos;s design a stand worthy of the floor.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground md:text-lg">
            Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom exhibition stand with full execution support.
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
