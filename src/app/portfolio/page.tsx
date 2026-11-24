import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPublishedProjects } from '@/lib/db/portfolio'
import { prisma } from '@/lib/db/prisma'
import { generatePortfolioIndexSchema } from '@/lib/seo/schema-generator'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import FilterBar from '@/components/portfolio/FilterBar'
import ZoomMosaicHero from '@/components/portfolio/motion/ZoomMosaicHero'
import ScrollProgress from '@/components/portfolio/motion/ScrollProgress'
import { heroPhotos } from '@/components/portfolio/motion/heroPhotos'
import StellarSection from '@/components/portfolio/motion/StellarSection'

import { SITE_URL } from '@/lib/site-url'
import { socialImage } from '@/lib/seo/social-image'
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

export const metadata: Metadata = {
  title: { absolute: "Exhibition Stall Design Portfolio | 6000+ Stalls Built" },
  description: '600+ custom exhibition stall designs and booth fabrication projects across India. Double decker mezzanine stands, custom booths, modular and pavilion structures.',
  openGraph: {
    title: "Exhibition Stall Design Portfolio | 6000+ Stalls Built",
    description: '600+ custom exhibition stalls built across India.',
    url:         `${SITE_URL}/portfolio`,
    ...socialImage().openGraph,
  },
  twitter: socialImage().twitter,
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

      <ScrollProgress />

      {/* ── Project index ──
           Hero with scroll-linked photo bands, the filters, featured work on
           a pinned sideways rail, the full grid, and the close. Motion lives
           in components/portfolio/motion; copy is unchanged. */}
      <main className="pfx pb-24">

        <ZoomMosaicHero
          eyebrow="Project Index"
          lines={[{ text: 'Every Stall.' }, { text: 'Every Story.', accent: true }]}
          photos={heroPhotos(projects).map(p => ({ src: p.src, alt: '' }))}
        >
          <p>
            {projects.length}+ projects built across India — from minimalist 9 sqm inline stands to 300 sqm double-decker pavilions.
          </p>
        </ZoomMosaicHero>

        <div className="pfx-wrap mt-16">
          <FilterBar industries={industries} stallTypes={stallTypes} />
        </div>

        {/* Featured projects: the same scrolling grid as the rest (the
            sideways pinned rail was removed at the owner's request). */}
        {featured.length > 0 && (
          <section className="pfx-wrap mt-20">
            <h2 className="pfx-label pfx-label--gold mb-8">Featured Projects</h2>
            <PortfolioGrid projects={featured} />
          </section>
        )}

        <section className="pfx-wrap mt-20">
          {featured.length > 0 && (
            <h2 className="pfx-label mb-8">All Projects</h2>
          )}
          {rest.length > 0 ? (
            <PortfolioGrid projects={rest} />
          ) : (
            <p className="text-slate-500 text-center py-20">No projects published yet.</p>
          )}
        </section>

        {/* ── Style 6: the projects as cards on a sphere in a starfield. ── */}
        <section className="pfx-wrap mt-28" aria-label="Projects in 3D">
          <StellarSection cards={projects.filter(p => p.media[0]).slice(0, 24).map(p => ({
            id: String(p.id),
            imageUrl: p.media[0].cdnUrl ?? p.media[0].url,
            alt: p.media[0].altText,
            title: p.client?.name ?? p.title,
            href: `/portfolio/${p.slug}`,
          }))} />
        </section>

        {/* ── CTA ── */}
        <section className="pfx-wrap mt-28">
          <div className="pfx-close">
            <div className="pfx-close-inner px-8 py-16 text-center md:py-24">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-black uppercase leading-tight text-white md:text-5xl">
                Plan Your Next Exhibition Stall
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Tell us your event, your space and your goals — we&apos;ll design a stand that makes the aisle stop walking.
              </p>
              <Link
                href="/contact"
                className="pfx-btn mt-10 inline-block rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white"
              >
                Book A Consultation
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
