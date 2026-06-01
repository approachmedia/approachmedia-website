'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface FilterBarProps {
  industries: { name: string; slug: string }[]
  stallTypes: { name: string; slug: string }[]
  activeIndustry?: string
  activeType?:     string
}

export default function FilterBar({ industries, stallTypes, activeIndustry, activeType }: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Industry filters */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Industry</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/portfolio" className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
            !activeIndustry && !activeType ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'
          }`}>All</Link>
          {industries.map(ind => (
            <Link
              key={ind.slug}
              href={`/portfolio/industry/${ind.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                activeIndustry === ind.slug
                  ? 'bg-green-600/80 border-green-500 text-white'
                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              {ind.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Stall type filters */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Stall Type</p>
        <div className="flex flex-wrap gap-2">
          {stallTypes.map(t => (
            <Link
              key={t.slug}
              href={`/portfolio/type/${t.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                activeType === t.slug
                  ? 'bg-blue-600/80 border-blue-500 text-white'
                  : 'bg-slate-800 border-slate-600 text-slate-400 hover:text-white hover:border-slate-500'
              }`}
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
