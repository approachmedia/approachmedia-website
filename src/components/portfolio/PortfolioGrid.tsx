import Link from 'next/link'
import Image from 'next/image'
import type { ProjectCardData } from './ProjectCard'

/**
 * Portfolio index grid — the editorial, staggered treatment used by the
 * homepage "Featured Works" section, widened to three columns.
 *
 * Reading order is preserved (DOM order == visual order, left to right) so
 * the newest-year-first ordering from getPublishedProjects still reads
 * correctly across each row. The zig-zag comes from two things:
 *
 *  - a per-column top offset, so neighbouring columns never line up, and
 *  - a four-step aspect-ratio cycle across three columns, so the ratio
 *    rotates row to row instead of giving each column one fixed shape.
 *
 * Both are desktop-only; below lg the grid collapses to a plain 1/2-column
 * stack where staggering would just look broken.
 */

// 4 ratios over 3 columns — coprime, so the pattern rotates rather than
// locking one shape per column.
const RATIOS = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-square']
const OFFSETS = ['', 'lg:mt-20', 'lg:mt-10']

export default function PortfolioGrid({ projects }: { projects: ProjectCardData[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <GridCard
          key={project.id}
          project={project}
          ratio={RATIOS[i % RATIOS.length]}
          offset={OFFSETS[i % OFFSETS.length]}
        />
      ))}
    </div>
  )
}

function GridCard({ project, ratio, offset }: { project: ProjectCardData; ratio: string; offset: string }) {
  const hero            = project.media[0]
  const primaryIndustry = project.industries.find(i => i.isPrimary)?.industry
  const primaryType     = project.stallTypes.find(t => t.isPrimary)?.stallType

  return (
    <Link href={`/portfolio/${project.slug}`} className={`group block ${offset}`}>
      <div className={`relative ${ratio} overflow-hidden rounded-md border border-white/10 bg-surface`}>
        {hero ? (
          <Image
            src={hero.cdnUrl ?? hero.url}
            alt={hero.altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <span className="text-sm text-slate-600">No image</span>
          </div>
        )}

        {project.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-1 text-xs font-semibold text-yellow-400 backdrop-blur">
            Featured
          </span>
        )}
        {primaryType && (
          <span className="absolute right-3 top-3 rounded-full border border-slate-600 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300 backdrop-blur">
            {primaryType.name}
          </span>
        )}
      </div>

      <p className="mt-5 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
        <span className="truncate">
          <span className="mr-2">•</span>
          {primaryIndustry?.name || 'Exhibition Design'}
        </span>
        {project.buildYear && (
          <span className="shrink-0 font-normal tracking-normal text-slate-500">{project.buildYear}</span>
        )}
      </p>

      <h3 className="mt-2 line-clamp-2 font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-brand-green-glow md:text-2xl">
        {project.title}
      </h3>

      <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
        {project.stallAreaSqm && <span>{Number(project.stallAreaSqm)} sqm</span>}
        {project.floors > 1 && <span>{project.floors} floors</span>}
        {project.client && <span className="truncate">{project.client.name}</span>}
      </div>
    </Link>
  )
}
