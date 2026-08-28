import Link from 'next/link'
import { getIndustryCategoryCounts, getProjectsInIndustry } from '@/lib/db/portfolio'
import CategoryBoard from '@/components/admin/CategoryBoard'

export const dynamic = 'force-dynamic'

/**
 * Categories, one at a time, as photographs.
 *
 * The selected category lives in the URL rather than in component state, so
 * only that category's projects are queried and sent — the portfolio is large
 * enough that shipping all of them to the browser to filter client-side would
 * be the wrong trade. ?category=none is the projects that are in no category.
 */
export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const { industries, uncategorised } = await getIndustryCategoryCounts()

  // '' — nothing picked. null — the "no category" bucket. Otherwise a slug.
  const selectedSlug: string | null | '' =
    category === 'none' ? null : industries.some(i => i.slug === category) ? category! : ''

  const projects = selectedSlug === '' ? [] : await getProjectsInIndustry(selectedSlug)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Categories</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pick a category, then click the ✕ on any photo to take that project out of it.
          </p>
        </div>
        <Link
          href="/admin"
          className="whitespace-nowrap rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 transition hover:border-slate-500 hover:text-white"
        >
          ← Portfolio
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">categories</p>
          <p className="font-display text-3xl font-bold text-white">{industries.length}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">categorised</p>
          <p className="font-display text-3xl font-bold text-white">
            {industries.reduce((sum, i) => sum + i.count, 0)}
          </p>
          <p className="mt-1 text-[11px] text-slate-600">placements, not projects</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">no category</p>
          <p className="font-display text-3xl font-bold text-white">{uncategorised}</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="mb-1 text-xs uppercase tracking-widest text-slate-500">largest</p>
          <p className="truncate font-display text-lg font-bold text-white">
            {industries.length
              ? [...industries].sort((a, b) => b.count - a.count)[0].name
              : '—'}
          </p>
        </div>
      </div>

      {/* Keyed on the selection so switching category replaces the board
          rather than leaving the previous category's cards in its state. */}
      <CategoryBoard
        key={selectedSlug === '' ? 'none-picked' : (selectedSlug ?? 'uncategorised')}
        categories={industries}
        selectedSlug={selectedSlug}
        projects={projects}
        uncategorised={uncategorised}
      />
    </div>
  )
}
