import type { Project, Client, Exhibition, Media, SeoMetadata, Industry, StallType } from '@prisma/client'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type ProjectWithRelations = Project & {
  client:      (Client & { industry?: Industry | null }) | null
  exhibition:  Exhibition | null
  media:       Media[]
  seoMetadata: SeoMetadata | null
  industries:  { industry: Industry; isPrimary: boolean }[]
  stallTypes:  { stallType: StallType; isPrimary: boolean }[]
}

type JsonLdNode = Record<string, unknown>

const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'
const ORG_ID      = `${SITE_URL}#organization`
const ORG_NAME    = 'Approach Media'

// ─────────────────────────────────────────────
// ORGANISATION NODE (reused across all pages)
// ─────────────────────────────────────────────

export function buildOrganizationNode(): JsonLdNode {
  return {
    '@type':        'Organization',
    '@id':          ORG_ID,
    name:           ORG_NAME,
    url:            SITE_URL,
    description:    'Exhibition stall design and fabrication company. Custom booths, double decker mezzanine stands, turnkey project management across India.',
    foundingDate:   '2015',
    areaServed:     ['India', 'UAE', 'Singapore'],
    serviceType: [
      'Exhibition Stall Design',
      'Custom Booth Fabrication',
      'Double Decker Mezzanine Stands',
      'AV Technology Integration',
      'Turnkey Exhibition Management',
    ],
    address: {
      '@type':         'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion:   'Maharashtra',
      addressCountry:  'IN',
    },
  }
}

// ─────────────────────────────────────────────
// PLACE NODE (exhibition venue)
// ─────────────────────────────────────────────

function buildPlaceNode(exhibition: Exhibition): JsonLdNode {
  return {
    '@type': 'Place',
    name:    exhibition.venueName ?? exhibition.name,
    address: {
      '@type':         'PostalAddress',
      addressLocality: exhibition.city     ?? undefined,
      addressRegion:   exhibition.state    ?? undefined,
      addressCountry:  exhibition.country  ?? 'IN',
    },
  }
}

// ─────────────────────────────────────────────
// EVENT NODE (trade show / exhibition)
// ─────────────────────────────────────────────

function buildEventNode(exhibition: Exhibition, artworkId: string): JsonLdNode {
  const node: JsonLdNode = {
    '@type':               'Event',
    '@id':                 `${SITE_URL}/portfolio/exhibition/${exhibition.slug}#event`,
    name:                  exhibition.name,
    eventAttendanceMode:   'https://schema.org/OfflineEventAttendanceMode',
    eventStatus:           'https://schema.org/EventScheduled',
    location:              buildPlaceNode(exhibition),
    about:                 { '@id': artworkId },
  }
  if (exhibition.startDate) node.startDate = (exhibition.startDate as Date).toISOString().split('T')[0]
  if (exhibition.endDate)   node.endDate   = (exhibition.endDate   as Date).toISOString().split('T')[0]
  if (exhibition.organizer) node.organizer = { '@type': 'Organization', name: exhibition.organizer }
  if (exhibition.websiteUrl) node.url      = exhibition.websiteUrl
  return node
}

// ─────────────────────────────────────────────
// VISUAL ARTWORK NODE (the stall itself)
// ─────────────────────────────────────────────

function buildVisualArtworkNode(project: ProjectWithRelations, artworkId: string): JsonLdNode {
  const heroMedia   = project.media.find(m => m.isHero) ?? project.media[0]
  const allImages   = project.media.filter(m => m.mediaType === 'image').map(m => m.cdnUrl ?? m.url)
  const materialsUsed = (project.materialsUsed as string[] | null) ?? []

  const node: JsonLdNode = {
    '@type':    'VisualArtwork',
    '@id':      artworkId,
    name:       project.title,
    url:        `${SITE_URL}/portfolio/${project.slug}`,
    description: project.seoMetadata?.metaDescription ?? project.aiSummary ?? project.description.slice(0, 200),
    artform:    'Exhibition Stand Design & Fabrication',
    creator:    { '@id': ORG_ID },
  }

  if (allImages.length > 0)   node.image     = allImages.length === 1 ? allImages[0] : allImages
  if (heroMedia)              node.thumbnailUrl = heroMedia.cdnUrl ?? heroMedia.url
  if (project.designStyle)    node.artMedium  = `${materialsUsed.join(', ')} — ${project.designStyle}`
  if (project.stallAreaSqm)   node.width      = { '@type': 'QuantitativeValue', value: Number(project.stallAreaSqm), unitCode: 'MTK' }
  if (project.buildYear)      node.dateCreated = String(project.buildYear)

  if (project.exhibition) {
    node.locationCreated = buildPlaceNode(project.exhibition)
  }

  if (project.client) {
    const clientNode: JsonLdNode = {
      '@type': 'Organization',
      name:    project.client.name,
    }
    if (project.client.websiteUrl) clientNode.url = project.client.websiteUrl
    if (project.client.industry)   clientNode.industry = project.client.industry.name
    node.client = clientNode
  }

  const keywords: string[] = [
    ...(project.seoMetadata?.primaryKeywords   as string[] ?? []),
    ...(project.seoMetadata?.secondaryKeywords as string[] ?? []),
  ]
  if (keywords.length > 0) node.keywords = keywords.join(', ')

  return node
}

// ─────────────────────────────────────────────
// BREADCRUMB NODE
// ─────────────────────────────────────────────

function buildBreadcrumbNode(project: ProjectWithRelations): JsonLdNode {
  const primaryIndustry = project.industries.find(i => i.isPrimary)?.industry

  const items: { name: string; item: string }[] = [
    { name: 'Home',      item: SITE_URL },
    { name: 'Portfolio', item: `${SITE_URL}/portfolio` },
  ]

  if (primaryIndustry) {
    items.push({ name: primaryIndustry.name, item: `${SITE_URL}/portfolio/industry/${primaryIndustry.slug}` })
  }

  items.push({ name: project.title, item: `${SITE_URL}/portfolio/${project.slug}` })

  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       item.item,
    })),
  }
}

// ─────────────────────────────────────────────
// PRIMARY EXPORT — full @graph for a project page
// ─────────────────────────────────────────────

export function generateProjectSchema(project: ProjectWithRelations): { '@context': string; '@graph': JsonLdNode[] } {
  const artworkId = `${SITE_URL}/portfolio/${project.slug}#artwork`

  const graph: JsonLdNode[] = [
    buildOrganizationNode(),
    buildVisualArtworkNode(project, artworkId),
    buildBreadcrumbNode(project),
  ]

  if (project.exhibition) {
    graph.push(buildEventNode(project.exhibition, artworkId))
  }

  // Merge any per-project schema overrides stored in seoMetadata.schemaOverride
  if (project.seoMetadata?.schemaOverride) {
    const override = project.seoMetadata.schemaOverride as JsonLdNode
    // Merge into VisualArtwork node (index 1)
    Object.assign(graph[1], override)
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

// ─────────────────────────────────────────────
// PORTFOLIO INDEX SCHEMA (CollectionPage)
// ─────────────────────────────────────────────

export function generatePortfolioIndexSchema(projects: Pick<Project, 'title' | 'slug'>[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationNode(),
      {
        '@type':       'CollectionPage',
        '@id':         `${SITE_URL}/portfolio#collection`,
        name:          'Exhibition Stall Portfolio — Approach Media',
        description:   'Portfolio of 600+ custom exhibition stalls, double decker stands, and booth fabrication projects across India.',
        url:           `${SITE_URL}/portfolio`,
        provider:      { '@id': ORG_ID },
        hasPart:       projects.map(p => ({
          '@type': 'VisualArtwork',
          name:    p.title,
          url:     `${SITE_URL}/portfolio/${p.slug}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',      item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
        ],
      },
    ],
  }
}

// ─────────────────────────────────────────────
// GENERATE NEXT.JS METADATA (for generateMetadata())
// ─────────────────────────────────────────────

export function generateProjectMetadata(project: ProjectWithRelations) {
  const seo     = project.seoMetadata
  const heroImg = project.media.find(m => m.isHero)

  return {
    title:       seo?.metaTitle       ?? project.title,
    description: seo?.metaDescription ?? project.aiSummary?.slice(0, 160) ?? project.description.slice(0, 160),
    openGraph: {
      title:       seo?.ogTitle       ?? seo?.metaTitle ?? project.title,
      description: seo?.ogDescription ?? seo?.metaDescription ?? undefined,
      images:      heroImg ? [{ url: heroImg.cdnUrl ?? heroImg.url, alt: heroImg.altText }] : undefined,
      type:        'website' as const,
    },
    alternates: {
      canonical: seo?.canonicalUrl ?? `${SITE_URL}/portfolio/${project.slug}`,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}
