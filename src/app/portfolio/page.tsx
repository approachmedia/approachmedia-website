import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPublishedProjects } from '@/lib/db/portfolio'
import { prisma } from '@/lib/db/prisma'
import { generatePortfolioIndexSchema } from '@/lib/seo/schema-generator'
import ProjectCard from '@/components/portfolio/ProjectCard'
import FilterBar from '@/components/portfolio/FilterBar'

// force-dynamic: DATABASE_URL is not available during Docker build, only at runtime.
// Data is cached for 5 minutes at the function level via unstable_cache below.
export const dynamic = 'force-dynamic'

// Cache the DB queries for 5 minutes. The page renders fresh each request but the
// heavy DB work is only done once per 5-minute window (or when 'projects' tag is invalidated).
const getPortfolioData = unstable_cache(
  async () => {
    const [projects, industries, stallTypes] = await Promise.all([
      getPublishedProjects(),
      prisma.industry.findMany({ orderBy: { name: 'asc' } }),
      prisma.stallType.findMany({ orderBy: { name: 'asc' } }),
    ])
    return { projects, industries, stallTypes }
  },
  ['portfolio-page-data-v2'],
  { revalidate: 300, tags: ['projects'] },
)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Stall Portfolio — Approach Media',
  description: '600+ custom exhibition stall designs and booth fabrication projects across India. Double decker mezzanine stands, custom booths, modular and pavilion structures.',
  openGraph: {
    title:       'Exhibition Stall Portfolio — Approach Media',
    description: '600+ custom exhibition stalls built across India.',
    url:         `${SITE_URL}/portfolio`,
  },
  alternates: { canonical: `${SITE_URL}/portfolio` },
}

export default async function PortfolioIndexPage() {
  const { projects, industries, stallTypes } = await getPortfolioData()

  const jsonLd = generatePortfolioIndexSchema(projects.map(p => ({ title: p.title, slug: p.slug })))

  const featured = projects.filter(p => p.isFeatured)
  const rest     = projects.filter(p => !p.isFeatured)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Project index ── */}
      <main className="max-w-7xl mx-auto px-4 py-20 space-y-16">

        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-bold text-green-400 uppercase tracking-[0.3em] mb-3">Project Index</p>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-white leading-none mb-5">
            Every Stall.<br />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Every Story.</span>
          </h1>
          <p className="text-slate-400 text-lg">
            {projects.length}+ projects built across India — from minimalist 9 sqm inline stands to 300 sqm double-decker pavilions.
          </p>
        </header>

        {/* Filter bar */}
        <FilterBar industries={industries} stallTypes={stallTypes} />

        {/* Featured projects */}
        {featured.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>
        )}

        {/* All projects */}
        <section>
          {featured.length > 0 && (
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">All Projects</h2>
          )}
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {rest.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-20">No projects published yet.</p>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-950 to-black px-8 py-16 text-center md:py-24">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rotate-12 border-2 border-blue-500/20"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full border-2 border-green-500/20" />
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-black uppercase leading-tight text-white md:text-5xl">
            Plan Your Next Exhibition Stall
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Tell us your event, your space and your goals — we&apos;ll design a stand that makes the aisle stop walking.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:opacity-90"
          >
            Book A Consultation
          </Link>
        </section>

      </main>
    </>
  )
}
