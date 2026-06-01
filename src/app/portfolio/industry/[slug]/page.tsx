import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { getPublishedProjects } from '@/lib/db/portfolio'
import ProjectCard from '@/components/portfolio/ProjectCard'
import FilterBar from '@/components/portfolio/FilterBar'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = await prisma.industry.findUnique({ where: { slug } })
  if (!industry) return {}
  return {
    title: `${industry.name} Exhibition Stall Portfolio | Approach Media`,
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
    <main className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <header className="max-w-2xl">
        <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">Portfolio — {industry.name}</p>
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          {industry.name} Exhibition Stands
        </h1>
        <p className="text-slate-400">
          {projects.length} project{projects.length !== 1 ? 's' : ''} in the {industry.name} sector.
        </p>
      </header>

      <FilterBar industries={industries} stallTypes={stallTypes} activeIndustry={slug} />

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-20">No published projects for this industry yet.</p>
      )}
    </main>
  )
}
