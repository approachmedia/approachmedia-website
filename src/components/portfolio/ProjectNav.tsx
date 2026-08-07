import Link from 'next/link'
import Image from 'next/image'
import type { AdjacentProject } from '@/lib/db/portfolio'

/**
 * Previous / next project links at the foot of a project page, so a
 * visitor can walk the portfolio without going back to the index.
 *
 * Uses the same oversized display treatment as the homepage "All Works →"
 * footer: big muted type that lights up on hover, an arrow that slides,
 * and a thumbnail of the project being linked to.
 */
export default function ProjectNav({ prev, next }: { prev: AdjacentProject | null; next: AdjacentProject | null }) {
  if (!prev && !next) return null

  return (
    <nav aria-label="More projects" className="px-[6vw] pb-20 md:pb-28">
      <div className="grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2 md:gap-8 md:pt-16">
        {prev ? <NavLink project={prev} direction="prev" /> : <span className="hidden md:block" />}
        {next && <NavLink project={next} direction="next" />}
      </div>
    </nav>
  )
}

function NavLink({ project, direction }: { project: AdjacentProject; direction: 'prev' | 'next' }) {
  const isNext = direction === 'next'

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={`group flex items-center gap-5 ${isNext ? 'md:flex-row-reverse md:text-right' : ''}`}
    >
      {project.image && (
        <span className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-md border border-white/10 bg-surface md:w-40">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="160px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span
          className={`flex items-baseline gap-3 font-display text-3xl font-semibold leading-none text-muted-foreground transition-colors group-hover:text-brand-green-glow md:text-5xl ${
            isNext ? 'md:justify-end' : ''
          }`}
        >
          {!isNext && (
            <span aria-hidden className="text-2xl transition-transform duration-300 group-hover:-translate-x-2 md:text-4xl">
              ←
            </span>
          )}
          {isNext ? 'Next' : 'Previous'}
          {isNext && (
            <span aria-hidden className="text-2xl transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
              →
            </span>
          )}
        </span>

        <span className="mt-3 line-clamp-2 block text-sm leading-snug text-slate-400 transition-colors group-hover:text-foreground md:text-base">
          {project.title}
        </span>
      </span>
    </Link>
  )
}
