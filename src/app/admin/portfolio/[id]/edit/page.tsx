import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLookups, getProjectById } from '@/lib/db/portfolio'
import PortfolioForm from '@/components/admin/PortfolioForm'
import type { ProjectInput } from '@/lib/validations/portfolio'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edit Project — Admin' }

function toNum(d: unknown): number | undefined {
  if (d == null) return undefined
  return Number(d)
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params
  const id = parseInt(idStr, 10)
  if (isNaN(id)) notFound()

  const [project, { industries, stallTypes, exhibitions, clients }] = await Promise.all([
    getProjectById(id),
    getLookups(),
  ])
  if (!project) notFound()

  const defaultValues: Partial<ProjectInput> = {
    title:           project.title,
    slug:            project.slug,
    stallAreaSqm:    toNum(project.stallAreaSqm),
    stallAreaSqft:   toNum(project.stallAreaSqft),
    stallHeightM:    toNum(project.stallHeightM),
    floors:          project.floors,
    buildYear:       project.buildYear ?? undefined,
    city:            project.city ?? undefined,
    exhibitionId:    project.exhibitionId ?? undefined,
    clientId:        project.clientId ?? undefined,
    description:     project.description,
    designBrief:     project.designBrief ?? undefined,
    aiSummary:       project.aiSummary ?? undefined,
    designStyle:     project.designStyle ?? undefined,
    materialsUsed:   (project.materialsUsed as string[] | null) ?? [],
    specialFeatures: (project.specialFeatures as string[] | null) ?? [],
    awards:          (project.awards as string[] | null) ?? [],
    status:          project.status as 'draft' | 'published' | 'archived',
    isFeatured:      project.isFeatured,
    displayOrder:    project.displayOrder,
    industryIds:     project.industries.map(i => i.industry.id),
    stallTypeIds:    project.stallTypes.map(s => s.stallType.id),
    ...(project.seoMetadata && {
      seoMetadata: {
        metaTitle:         project.seoMetadata.metaTitle ?? undefined,
        metaDescription:   project.seoMetadata.metaDescription ?? undefined,
        aiContextSummary:  project.seoMetadata.aiContextSummary ?? undefined,
        focusEntities:     (project.seoMetadata.focusEntities as string[] | null) ?? undefined,
        primaryKeywords:   (project.seoMetadata.primaryKeywords as string[] | null) ?? undefined,
        secondaryKeywords: (project.seoMetadata.secondaryKeywords as string[] | null) ?? undefined,
        ogTitle:           project.seoMetadata.ogTitle ?? undefined,
        ogDescription:     project.seoMetadata.ogDescription ?? undefined,
        ogImageUrl:        project.seoMetadata.ogImageUrl ?? undefined,
        canonicalUrl:      project.seoMetadata.canonicalUrl ?? undefined,
        noIndex:           project.seoMetadata.noIndex,
      },
    }),
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Edit Project</h1>
        <p className="text-sm text-slate-400 mt-1">{project.title}</p>
      </div>
      <PortfolioForm
        industries={industries}
        stallTypes={stallTypes}
        exhibitions={exhibitions}
        clients={clients}
        defaultValues={defaultValues}
        projectId={id}
      />
    </div>
  )
}
