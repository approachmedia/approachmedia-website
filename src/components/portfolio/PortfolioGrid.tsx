import Link from 'next/link'
import Image from 'next/image'
import type { ProjectCardData } from './ProjectCard'

/**
 * Portfolio index grid — the same editorial, staggered treatment as the
 * homepage "Featured Works" section: two columns, the right one starting
 * lower, with the ratio alternating down each column so the cards
 * interlock rather than lining up.
 *
 * Projects alternate left/right in order, so the newest work sits at the
 * top of both columns. Below md it collapses to a single stack, where
 * staggering would just read as broken spacing.
 */

// Ratio cycles per column, matching FeaturedWorks on the homepage.
const LEFT_RATIOS  = ['aspect-[4/3]', 'aspect-[4/5]']
const RIGHT_RATIOS = ['aspect-[3/4]', 'aspect-[4/3]']

export default function PortfolioGrid({ projects }: { projects: ProjectCardData[] }) {
  const leftCards  = projects.filter((_, i) => i % 2 === 0)
  const rightCards = projects.filter((_, i) => i % 2 === 1)

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
      <div className="flex flex-col gap-y-14">
        {leftCards.map((p, i) => (
          <GridCard key={p.id} project={p} ratio={LEFT_RATIOS[i % LEFT_RATIOS.length]} />
        ))}
      </div>
      <div className="flex flex-col gap-y-14 md:pt-28">
        {rightCards.map((p, i) => (
          <GridCard key={p.id} project={p} ratio={RIGHT_RATIOS[i % RIGHT_RATIOS.length]} />
        ))}
      </div>
    </div>
  )
}

function GridCard({ project, ratio }: { project: ProjectCardData; ratio: string }) {
  const hero            = project.media[0]
  const primaryIndustry = project.industries.find(i => i.isPrimary)?.industry
  const primaryType     = project.stallTypes.find(t => t.isPrimary)?.stallType

  return (
    <Link href={`/portfolio/${project.slug}`} className="group block">
      <div className={`relative ${ratio} overflow-hidden rounded-md border border-white/10 bg-surface`}>
        {hero ? (
          <Image
            src={hero.cdnUrl ?? hero.url}
            alt={hero.altText}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
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

      <h3 className="mt-2 line-clamp-2 font-display text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-brand-green-glow md:text-3xl">
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
