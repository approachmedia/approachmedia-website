import type { ProjectCardData } from '../ProjectCard'

/** The listed projects' own hero photographs, for the hero bands. */
export function heroPhotos(projects: ProjectCardData[], max = 16) {
  return projects
    .map(p => p.media[0])
    .filter(Boolean)
    .slice(0, max)
    .map(m => ({ src: m!.cdnUrl ?? m!.url }))
}
