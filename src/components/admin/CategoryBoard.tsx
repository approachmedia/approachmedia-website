'use client'

/**
 * The category clean-up screen.
 *
 * Pick a category, see every project in it as a photograph, and click the ✕
 * on a photograph to take that project out of that category. Built for going
 * through a wrong category quickly rather than for editing one project at a
 * time — the Industry column on the main table already does that, and doing
 * it there means opening a dropdown and reading a name per row when the thing
 * you actually want to judge on is the picture.
 *
 * The removal is optimistic: the card goes the moment it is clicked, and it
 * comes back if the write fails. Every removal is undoable from the bar that
 * appears with it, because the whole point is to click quickly, and clicking
 * quickly means mis-clicking. Undo is a real write back, not a local
 * rollback, so it is still correct after the card has gone.
 *
 * Each card lists the project's other categories. A project can be in more
 * than one, and the public portfolio lists it under all of them, so it
 * matters whether this removal is a correction or is about to leave the
 * project in nothing. "No category" is a bucket you can select, so the ones
 * left with nothing are a list you can work through rather than projects that
 * have quietly disappeared from the portfolio filters.
 */

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FilterCombo from './FilterCombo'

export type BoardCategory = { id: number; name: string; slug: string; count: number }

export type BoardProject = {
  id: number
  title: string
  slug: string
  status: string
  buildYear: number | null
  client: string | null
  exhibition: string | null
  categories: { id: number; name: string; slug: string; isPrimary: boolean }[]
  thumbnail: string | null
  thumbnailAlt: string
}

/** The pseudo-category for projects that are in none. */
const NONE = 'No category'

type Pending = {
  project: BoardProject
  industryId: number
  categoryName: string
  /** This removal was the project's last category. */
  orphaned: boolean
}

export default function CategoryBoard({
  categories, selectedSlug, projects, uncategorised,
}: {
  categories:   BoardCategory[]
  /** null means the "No category" bucket; '' means nothing picked yet. */
  selectedSlug: string | null | ''
  projects:     BoardProject[]
  uncategorised: number
}) {
  const router = useRouter()

  // Seeded from the server and then owned here, so a removal takes the card
  // away without a round trip to re-render the whole grid.
  const [rows, setRows] = useState<BoardProject[]>(projects)
  const [busy, setBusy] = useState<Set<number>>(new Set())
  const [undo, setUndo] = useState<Pending | null>(null)
  const [error, setError] = useState<string | null>(null)

  const selected = useMemo(
    () => categories.find(c => c.slug === selectedSlug) ?? null,
    [categories, selectedSlug],
  )

  const byName = useMemo(() => new Map(categories.map(c => [c.name, c])), [categories])
  const options = useMemo(() => [NONE, ...categories.map(c => c.name)], [categories])

  // Removals made in this session, that left a project with nothing. The rest
  // of the counts come from the server and refresh on every navigation, but
  // this one has to keep up as you work — the whole reason to look at it is to
  // see what the clean-up is leaving behind.
  const [orphaned, setOrphaned] = useState(0)

  const countFor = useCallback(
    (name: string) => {
      if (name === NONE) return `${uncategorised + orphaned}`
      const c = byName.get(name)
      if (!c) return null
      // The open category is counted from what is actually on screen.
      return `${c.slug === selectedSlug ? rows.length : c.count}`
    },
    [byName, uncategorised, orphaned, selectedSlug, rows.length],
  )

  const currentLabel = selectedSlug === null ? NONE : (selected?.name ?? '')

  function choose(name: string) {
    if (!name) return router.push('/admin/portfolio/categories')
    if (name === NONE) return router.push('/admin/portfolio/categories?category=none')
    const c = byName.get(name)
    if (c) router.push(`/admin/portfolio/categories?category=${encodeURIComponent(c.slug)}`)
  }

  async function write(projectId: number, industryId: number, op: 'add' | 'remove') {
    const res = await fetch('/api/admin/portfolio/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId, industryId, op }),
    })
    if (!res.ok) throw new Error(String(res.status))
  }

  async function remove(project: BoardProject) {
    if (!selected) return
    const { id: industryId, name: categoryName } = selected
    const orphans = project.categories.filter(c => c.id !== industryId).length === 0

    setError(null)
    setBusy(prev => new Set(prev).add(project.id))
    setRows(prev => prev.filter(p => p.id !== project.id))

    try {
      await write(project.id, industryId, 'remove')
      setUndo({ project, industryId, categoryName, orphaned: orphans })
      if (orphans) setOrphaned(n => n + 1)
    } catch {
      // Put it back exactly where it was rather than at the end of the list.
      setRows(prev =>
        [...prev, project].sort((a, b) => projects.indexOf(a) - projects.indexOf(b)),
      )
      setError(`Could not remove “${project.title}”. Nothing was changed.`)
    } finally {
      setBusy(prev => {
        const next = new Set(prev)
        next.delete(project.id)
        return next
      })
    }
  }

  async function undoRemove() {
    if (!undo) return
    const { project, industryId, orphaned: wasOrphaned } = undo
    setUndo(null)
    setError(null)
    try {
      await write(project.id, industryId, 'add')
      setRows(prev =>
        [...prev, project].sort((a, b) => projects.indexOf(a) - projects.indexOf(b)),
      )
      if (wasOrphaned) setOrphaned(n => n - 1)
    } catch {
      setError(`Could not put “${project.title}” back. Reload and check it.`)
    }
  }

  return (
    <div className="space-y-3">
      {/* Picker — the same control the project table filters with. */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterCombo
          label="Category"
          options={options}
          value={currentLabel}
          onChange={choose}
          meta={countFor}
          allLabel="Choose a category…"
        />
        {selected && (
          <Link
            href={`/portfolio/industry/${selected.slug}`}
            target="_blank"
            className="px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-blue-400 transition"
          >
            View this category on the site ↗
          </Link>
        )}
        <span className="ml-auto text-xs text-slate-500">
          {currentLabel ? `${rows.length} project${rows.length === 1 ? '' : 's'}` : 'No category selected'}
        </span>
      </div>

      {undo && (
        <div className="flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5">
          <span className="text-sm text-slate-300">
            Removed <span className="font-medium text-white">{undo.project.title}</span> from {undo.categoryName}.
          </span>
          <button
            type="button"
            onClick={undoRemove}
            className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-blue-500"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={() => setUndo(null)}
            className="text-xs text-slate-500 transition hover:text-slate-300"
          >
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-700/50 bg-red-900/20 px-4 py-2.5 text-sm text-red-300">
          {error}
        </div>
      )}

      {!currentLabel ? (
        <div className="rounded-2xl border border-slate-700 px-4 py-16 text-center text-slate-500">
          Pick a category above to see everything in it.
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-slate-700 px-4 py-16 text-center text-slate-500">
          {selectedSlug === null
            ? 'Every project is in at least one category.'
            : `Nothing left in ${currentLabel}.`}
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {rows.map(p => {
            const others = p.categories.filter(c => c.slug !== selectedSlug)
            const working = busy.has(p.id)
            return (
              <li
                key={p.id}
                className={`group overflow-hidden rounded-xl border border-slate-700 bg-slate-900/60 transition ${
                  working ? 'opacity-40' : 'hover:border-slate-500'
                }`}
              >
                <div className="relative aspect-[4/3] bg-slate-800">
                  {p.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.thumbnail}
                      alt={p.thumbnailAlt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[11px] text-slate-600">
                      No image
                    </div>
                  )}

                  {/* The ✕ on the photograph. Always visible rather than
                      revealed on hover — this screen exists to be clicked
                      through, and on a touch screen there is no hover. */}
                  {selected && (
                    <button
                      type="button"
                      onClick={() => remove(p)}
                      disabled={working}
                      title={`Remove from ${selected.name}`}
                      aria-label={`Remove ${p.title} from ${selected.name}`}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 bg-slate-900/85 text-sm text-slate-300 backdrop-blur transition hover:border-red-500 hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50"
                    >
                      ✕
                    </button>
                  )}

                  {p.status !== 'published' && (
                    <span className="absolute left-2 top-2 rounded-full bg-yellow-500/20 px-2 py-0.5 text-[10px] font-semibold text-yellow-400">
                      {p.status}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 p-3">
                  <p className="truncate text-sm font-medium text-slate-200" title={p.title}>
                    {p.title}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {p.client ?? '—'}
                    {p.buildYear ? ` · ${p.buildYear}` : ''}
                  </p>

                  {/* What the project would be left with. */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {others.length === 0 ? (
                      <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-500">
                        {selectedSlug === null ? 'in no category' : 'only category'}
                      </span>
                    ) : (
                      others.map(c => (
                        <span
                          key={c.id}
                          className="max-w-full truncate rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400"
                          title={c.name}
                        >
                          {c.name}
                        </span>
                      ))
                    )}
                  </div>

                  <Link
                    href={`/admin/portfolio/${p.id}/edit`}
                    className="inline-block pt-1 text-xs text-blue-400 transition hover:text-blue-300"
                  >
                    Edit
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
