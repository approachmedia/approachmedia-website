import Link from 'next/link'
import Image from 'next/image'
import type { Project, Client, Media, Industry, StallType } from '@prisma/client'

export type ProjectCardData = Project & {
  client:      Client | null
  media:       Media[]
  industries:  { industry: Industry; isPrimary: boolean }[]
  stallTypes:  { stallType: StallType; isPrimary: boolean }[]
}

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const hero            = project.media[0]
  const primaryIndustry = project.industries.find(i => i.isPrimary)?.industry
  const primaryType     = project.stallTypes.find(t => t.isPrimary)?.stallType

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/60 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
        {hero ? (
          <Image
            src={hero.cdnUrl ?? hero.url}
            alt={hero.altText}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <span className="text-slate-600 text-sm">No image</span>
          </div>
        )}

        {/* Featured badge */}
        {project.isFeatured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold backdrop-blur">
            Featured
          </span>
        )}

        {/* Stall type badge */}
        {primaryType && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-600 text-slate-300 text-xs backdrop-blur">
            {primaryType.name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Industry + year row */}
        <div className="flex items-center justify-between mb-2">
          {primaryIndustry && (
            <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
              {primaryIndustry.name}
            </span>
          )}
          {project.buildYear && (
            <span className="text-xs text-slate-500">{project.buildYear}</span>
          )}
        </div>

        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mb-3 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {project.stallAreaSqm && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
              {Number(project.stallAreaSqm)} sqm
            </span>
          )}
          {project.floors > 1 && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {project.floors} floors
            </span>
          )}
          {project.client && (
            <span className="truncate">{project.client.name}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
