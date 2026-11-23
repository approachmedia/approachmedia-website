import type { ProjectCardData } from '../ProjectCard'
import type { RailItem } from './FeaturedRail'

/** The listed projects' own hero photographs, for the hero bands. */
export function heroPhotos(projects: ProjectCardData[], max = 16) {
  return projects
    .map(p => p.media[0])
    .filter(Boolean)
    .slice(0, max)
    .map(m => ({ src: m!.cdnUrl ?? m!.url }))
}

/** Plain, serialisable rail rows (Prisma decimals cannot cross to the client). */
export function railItems(projects: ProjectCardData[]): RailItem[] {
  return projects.map(p => {
    const m = p.media[0]
    return {
      slug: p.slug,
      title: p.title,
      img: m ? (m.cdnUrl ?? m.url) : null,
      alt: m?.altText ?? '',
      industry: p.industries.find(i => i.isPrimary)?.industry.name ?? null,
      year: p.buildYear ?? null,
      type: p.stallTypes.find(t => t.isPrimary)?.stallType.name ?? null,
    }
  })
}
