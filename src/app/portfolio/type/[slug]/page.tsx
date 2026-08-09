import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { getPublishedProjects } from '@/lib/db/portfolio'
import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import FilterBar from '@/components/portfolio/FilterBar'

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
    <main className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <header className="max-w-2xl">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Portfolio — {stallType.name}</p>
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          {stallType.name} Projects
        </h1>
        {stallType.description && (
          <p className="text-slate-400">{stallType.description}</p>
        )}
      </header>

      <FilterBar industries={industries} stallTypes={stallTypes} activeType={slug} />

      {projects.length > 0 ? (
        <PortfolioGrid projects={projects} />
      ) : (
        <p className="text-slate-500 text-center py-20">No published projects for this stall type yet.</p>
      )}
    </main>
  )
}
