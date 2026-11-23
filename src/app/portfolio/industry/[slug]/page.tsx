import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { getPublishedProjects } from '@/lib/db/portfolio'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import FilterBar from '@/components/portfolio/FilterBar'
import PortfolioHero from '@/components/portfolio/motion/PortfolioHero'
import ScrollProgress from '@/components/portfolio/motion/ScrollProgress'
import { heroPhotos } from '@/components/portfolio/motion/heroPhotos'

import { SITE_URL } from '@/lib/site-url'
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = await prisma.industry.findUnique({ where: { slug } })
  if (!industry) return {}
  return {
    title: { absolute: `${industry.name} Exhibition Stall Design | Portfolio` },
    description: `Custom exhibition stand designs for the ${industry.name} sector. Browse ${industry.name} trade show booth fabrication projects by Approach Media.`,
    alternates: { canonical: `${SITE_URL}/portfolio/industry/${slug}` },
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [industry, industries, stallTypes, projects] = await Promise.all([
    prisma.industry.findUnique({ where: { slug } }),
    prisma.industry.findMany({ orderBy: { name: 'asc' } }),
    prisma.stallType.findMany({ orderBy: { name: 'asc' } }),
    getPublishedProjects({ industrySlug: slug }),
  ])

  if (!industry) notFound()

  return (
    <main className="pfx pb-24">
      <ScrollProgress />
      <PortfolioHero
        eyebrow={`Portfolio — ${industry.name}`}
        lines={[{ text: industry.name, accent: true }, { text: 'Exhibition Stands' }]}
        photos={heroPhotos(projects)}
      >
        <p>
          {projects.length} project{projects.length !== 1 ? 's' : ''} in the {industry.name} sector.
        </p>
      </PortfolioHero>

      <div className="pfx-wrap mt-16">
        <FilterBar industries={industries} stallTypes={stallTypes} activeIndustry={slug} />
      </div>

      <section className="pfx-wrap mt-20">
        {projects.length > 0 ? (
          <PortfolioGrid projects={projects} />
        ) : (
          <p className="text-slate-500 text-center py-20">No published projects for this industry yet.</p>
        )}
        <p className="mt-20 text-sm leading-relaxed text-slate-400">
          Planning a stand in this sector? See our{' '}
          <Link href="/services/exhibition-stall-design" className="text-brand-green underline underline-offset-4 hover:text-brand-green-glow">
            {industry.name.toLowerCase()} exhibition stall design
          </Link>{' '}
          service, or browse{' '}
          <Link href="/portfolio" className="text-brand-green underline underline-offset-4 hover:text-brand-green-glow">
            every stall we have built
          </Link>.
        </p>
      </section>
    </main>
  )
}
