import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllPublishedSlugs } from '@/lib/db/portfolio'
import { generateProjectSchema, generateProjectMetadata } from '@/lib/seo/schema-generator'
import ProjectDetail from '@/components/portfolio/ProjectDetail'

// ── ISR — rebuild each project page every 24 hours ────────────
// On-demand revalidation via: fetch('/api/revalidate?slug=...')
export const revalidate = 86400

// ── Pre-render published project slugs at build time (falls back to [] if DB unavailable) ──
export async function generateStaticParams() {
  try {
    const slugs = await getAllPublishedSlugs()
    return slugs.map(slug => ({ slug }))
  } catch {
    return []
  }
}

// ── Pull SEO fields from DB on the first byte ──────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug }  = await params
  const project   = await getProjectBySlug(slug)
  if (!project) return {}
  return generateProjectMetadata(project)
}

// ── Page ───────────────────────────────────────────────────────
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project  = await getProjectBySlug(slug)

  if (!project || project.status !== 'published') notFound()

  // Full nested @graph JSON-LD: VisualArtwork + Event + Place + Organization + BreadcrumbList
  const jsonLd = generateProjectSchema(project)

  return (
    <>
      {/*
        JSON-LD injected directly into the document — Next.js App Router
        renders this in the HTML <body> but Google reads it from anywhere.
        The script tag appears in the server-rendered HTML on the first byte.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProjectDetail project={project} />
    </>
  )
}
