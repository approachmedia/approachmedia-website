import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { INDUSTRY_PAGES } from '@/content/industries'
import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'

/**
 * The Industries hub.
 *
 * Editorial pages, deliberately separate from /portfolio/industry/<slug>,
 * which stays what it already is: a filtered, browsable project collection.
 * The brief's README asks for exactly that split, and each page here links
 * down into its filter page rather than replacing it.
 */

export const metadata = {
  title: { absolute: 'Exhibition Stall Design by Industry | Approach Media' },
  description: 'Explore exhibition stall design for your industry. Browse relevant projects, discover exhibition opportunities and plan your next stand with Approach Media.',
  alternates: { canonical: `${SITE_URL}/industries` },
  openGraph: {
    title: 'Exhibition Stall Design by Industry | Approach Media',
    description: 'Explore exhibition stall design for your industry. Browse relevant projects, discover exhibition opportunities and plan your next stand with Approach Media.',
    url: `${SITE_URL}/industries`,
  },
}

export default function IndustriesHub() {
  return (
    <main>
      <JsonLd graph={[
        organizationNode(),
        breadcrumb([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }]),
      ]} />

      {/* ── Hero ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-20 md:py-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand-green">Industries</p>
          <h1 className="max-w-4xl font-display text-4xl font-black leading-[1.05] text-white md:text-6xl">
            Exhibition Stall Design for Your Industry
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold text-white/90">
            Spaces shaped around what you sell and who you want to meet.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            A property buyer, an engineer and a retail distributor arrive at an exhibition with
            different questions. Your stall should help answer them. Approach Media designs and
            builds exhibition spaces around your products, audience and business objectives.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Explore your industry to see relevant work, understand the display possibilities and
            start planning your next exhibition.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#find-your-industry" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
              Explore Industries
            </Link>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
              Request a Proposal
            </Link>
          </div>
        </div>
      </section>

      {/* ── The sixteen ── */}
      <section id="find-your-industry" className="border-b border-white/10 scroll-mt-28">
        <div className="container-wide py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Find Your Industry</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_PAGES.map(i => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/12 bg-surface/40 p-6 transition hover:border-brand-green/50 hover:bg-white/[0.05]"
                >
                  <h3 className="font-display text-lg font-semibold text-white">{i.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{i.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                    Explore {i.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h2 className="max-w-3xl font-display text-2xl font-bold text-white md:text-3xl">
            From Industry Brief to Exhibition Space
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
            We bring concept design, fabrication and on-site execution into one coordinated
            process. Your products, stall dimensions and exhibition requirements guide the layout,
            while your brand shapes the look and feel.
          </p>
        </div>
      </section>

      {/* ── Close ── */}
      <section>
        <div className="container-wide py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Planning an Exhibition?</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            Tell us where you are exhibiting and what you want visitors to experience. We will help
            turn your brief into a practical exhibition-space plan.
          </p>
          <Link href="/contact" className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
            Discuss Your Exhibition
          </Link>
        </div>
      </section>
    </main>
  )
}
