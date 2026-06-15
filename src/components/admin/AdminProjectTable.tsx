'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Project = {
  id:         number
  title:      string
  status:     string
  isFeatured: boolean
  buildYear:  number | null
  client:     { name: string } | null
  exhibition: { name: string } | null
  industries: { industry: { name: string } }[]
}

// ── Searchable filter dropdown ────────────────────────────────────────────────

function FilterCombo({
  label, options, value, onChange,
}: {
  label:    string
  options:  string[]
  value:    string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [q, setQ]       = useState('')
  const ref             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQ('')
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const filtered = q.trim()
    ? options.filter(o => o.toLowerCase().includes(q.toLowerCase()))
    : options

  function pick(v: string) {
    onChange(v)
    setOpen(false)
    setQ('')
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition whitespace-nowrap ${
          value
            ? 'border-blue-500 bg-blue-600/20 text-blue-300'
            : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500 hover:text-slate-300'
        }`}
      >
        <span className="max-w-[160px] truncate">{value || label}</span>
        {value ? (
          <span
            role="button"
            tabIndex={0}
            onClick={e => { e.stopPropagation(); onChange('') }}
            className="text-blue-400 hover:text-red-400 transition text-xs font-bold flex-shrink-0"
            aria-label="Clear"
          >
            ✕
          </span>
        ) : (
          <svg className="w-3.5 h-3.5 opacity-50 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute z-40 mt-1 w-64 rounded-xl border border-slate-600 bg-slate-900 shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-slate-800">
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={`Search ${label}…`}
              className="w-full bg-slate-800 text-white text-sm rounded-md px-3 py-2 outline-none border border-slate-700 focus:border-blue-500 transition"
              onKeyDown={e => {
                if (e.key === 'Escape') { setOpen(false); setQ('') }
                if (e.key === 'Enter' && filtered.length === 1) pick(filtered[0])
              }}
            />
          </div>

          <ul className="max-h-64 overflow-y-auto py-1">
            {value && (
              <li>
                <button
                  type="button"
                  onClick={() => pick('')}
                  className="w-full text-left px-3 py-2 text-sm text-slate-500 hover:bg-slate-800 transition italic"
                >
                  All {label}s
                </button>
              </li>
            )}
            {filtered.map(o => (
              <li key={o}>
                <button
                  type="button"
                  onClick={() => pick(o)}
                  className={`w-full text-left px-3 py-2 text-sm transition truncate ${
                    o === value ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {o}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-sm text-slate-500 text-center">No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Main table ────────────────────────────────────────────────────────────────

export default function AdminProjectTable({ projects }: { projects: Project[] }) {
  const router                    = useRouter()
  const [selected, setSelected]   = useState<Set<number>>(new Set())
  const [deleting, startDelete]   = useTransition()
  const [confirmBulk, setConfirm] = useState(false)

  // Filter state
  const [filterClient,     setFilterClient]     = useState('')
  const [filterExhibition, setFilterExhibition] = useState('')
  const [filterYear,       setFilterYear]       = useState('')

  // Unique option lists derived from the full project list
  const clientOptions = [...new Set(
    projects.map(p => p.client?.name).filter((n): n is string => Boolean(n))
  )].sort()

  const exhibitionOptions = [...new Set(
    projects.map(p => p.exhibition?.name).filter((n): n is string => Boolean(n))
  )].sort()

  const yearOptions = [...new Set(
    projects.map(p => p.buildYear).filter((y): y is number => y !== null)
  )].sort((a, b) => b - a).map(String)

  const anyFilter = Boolean(filterClient || filterExhibition || filterYear)

  // Apply filters
  const visible = projects.filter(p => {
    if (filterClient     && p.client?.name     !== filterClient)     return false
    if (filterExhibition && p.exhibition?.name !== filterExhibition) return false
    if (filterYear       && String(p.buildYear) !== filterYear)      return false
    return true
  })

  const allIds      = visible.map(p => p.id)
  const allSelected = allIds.length > 0 && allIds.every(id => selected.has(id))

  function toggleAll() {
    setSelected(prev => {
      const next = new Set(prev)
      if (allSelected) { allIds.forEach(id => next.delete(id)) }
      else             { allIds.forEach(id => next.add(id)) }
      return next
    })
  }

  function toggleOne(id: number) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  async function bulkDelete() {
    startDelete(async () => {
      await fetch('/api/admin/portfolio/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [...selected] }),
      })
      setSelected(new Set())
      setConfirm(false)
      router.refresh()
    })
  }

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterCombo
          label="Client"
          options={clientOptions}
          value={filterClient}
          onChange={setFilterClient}
        />
        <FilterCombo
          label="Exhibition"
          options={exhibitionOptions}
          value={filterExhibition}
          onChange={setFilterExhibition}
        />
        <FilterCombo
          label="Year"
          options={yearOptions}
          value={filterYear}
          onChange={setFilterYear}
        />
        {anyFilter && (
          <button
            type="button"
            onClick={() => { setFilterClient(''); setFilterExhibition(''); setFilterYear('') }}
            className="px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-red-400 transition"
          >
            Clear all
          </button>
        )}
        <span className="ml-auto text-xs text-slate-500">
          {anyFilter
            ? `${visible.length} of ${projects.length} projects`
            : `${projects.length} projects`}
        </span>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-4 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700">
          <span className="text-sm text-slate-300 font-medium">{selected.size} selected</span>
          {confirmBulk ? (
            <>
              <span className="text-sm text-red-400">Delete {selected.size} project{selected.size > 1 ? 's' : ''}?</span>
              <button
                onClick={bulkDelete}
                disabled={deleting}
                className="px-3 py-1 rounded text-xs font-semibold bg-red-600 hover:bg-red-500 text-white disabled:opacity-50 transition"
              >
                {deleting ? 'Deleting…' : 'Confirm Delete'}
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="px-3 py-1 rounded text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setConfirm(true)}
                className="px-3 py-1 rounded text-xs font-semibold bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 border border-red-700/40 transition"
              >
                Delete Selected
              </button>
              <button
                onClick={() => setSelected(new Set())}
                className="text-xs text-slate-500 hover:text-slate-300 transition"
              >
                Clear
              </button>
            </>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 border-b border-slate-700">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="rounded border-slate-600 bg-slate-700 accent-blue-500 cursor-pointer"
                />
              </th>
              {['Title', 'Client', 'Industry', 'Year', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {visible.map(p => (
              <tr key={p.id} className={`transition ${selected.has(p.id) ? 'bg-blue-900/20' : 'hover:bg-slate-800/30'}`}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => toggleOne(p.id)}
                    className="rounded border-slate-600 bg-slate-700 accent-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-slate-200 font-medium max-w-xs truncate">
                  {p.isFeatured && <span className="mr-1.5 text-yellow-400">★</span>}
                  {p.title}
                </td>
                <td className="px-4 py-3 text-slate-400">{p.client?.name ?? '—'}</td>
                <td className="px-4 py-3 text-slate-400">{p.industries[0]?.industry.name ?? '—'}</td>
                <td className="px-4 py-3 text-slate-400">{p.buildYear ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    p.status === 'published' ? 'bg-green-500/20 text-green-400'
                    : p.status === 'draft'   ? 'bg-yellow-500/20 text-yellow-400'
                    :                          'bg-slate-600/40 text-slate-400'
                  }`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link href={`/admin/portfolio/${p.id}/edit`} className="text-blue-400 hover:text-blue-300 transition text-xs">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  {anyFilter ? 'No projects match these filters' : 'No projects yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
