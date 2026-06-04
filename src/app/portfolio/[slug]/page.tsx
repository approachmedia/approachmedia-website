import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/db/portfolio'
import { generateProjectSchema, generateProjectMetadata } from '@/lib/seo/schema-generator'
import ProjectDetail from '@/components/portfolio/ProjectDetail'

// ── ISR — rebuild each project page every 24 hours ────────────
// On-demand revalidation via: fetch('/api/revalidate?slug=...')
export const revalidate    = 86400
// Allow slugs that weren't known at build time (new projects go live
// on first visit without needing a redeploy)
export const dynamicParams = true

// Return empty array so Next.js doesn't try to pre-build every project
// page at deploy time. At 1,000+ projects that would time out Railway.
// Pages are built on first request and cached as static HTML from then on.
export async function generateStaticParams() {
  return []
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
