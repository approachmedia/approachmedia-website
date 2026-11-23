import { notFound } from 'next/navigation'
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
  const { slug }    = await params
  const stallType   = await prisma.stallType.findUnique({ where: { slug } })
  if (!stallType) return {}
  return {
    title: { absolute: `${stallType.name} Exhibition Stands | Design Portfolio` },
    description: `${stallType.name} exhibition stand design and fabrication projects by Approach Media. Browse completed builds across India.`,
    alternates: { canonical: `${SITE_URL}/portfolio/type/${slug}` },
  }
}

export default async function StallTypePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [stallType, industries, stallTypes, projects] = await Promise.all([
    prisma.stallType.findUnique({ where: { slug } }),
    prisma.industry.findMany({ orderBy: { name: 'asc' } }),
    prisma.stallType.findMany({ orderBy: { name: 'asc' } }),
    getPublishedProjects({ stallTypeSlug: slug }),
  ])

  if (!stallType) notFound()

  return (
    <main className="pfx pb-24">
      <ScrollProgress />
      <PortfolioHero
        eyebrow={`Portfolio — ${stallType.name}`}
        tone="blue"
        lines={[{ text: stallType.name, accent: true }, { text: 'Projects' }]}
        photos={heroPhotos(projects)}
      >
        {stallType.description && <p>{stallType.description}</p>}
      </PortfolioHero>

      <div className="pfx-wrap mt-16">
        <FilterBar industries={industries} stallTypes={stallTypes} activeType={slug} />
      </div>

      <section className="pfx-wrap mt-20">
        {projects.length > 0 ? (
          <PortfolioGrid projects={projects} />
        ) : (
          <p className="text-slate-500 text-center py-20">No published projects for this stall type yet.</p>
        )}
      </section>
    </main>
  )
}
