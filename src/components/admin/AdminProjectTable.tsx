'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Option = { id: number; name: string }

type Project = {
  id:           number
  title:        string
  status:       string
  isFeatured:   boolean
  buildYear:    number | null
  client:       { name: string } | null
  exhibition:   { name: string } | null
  industryId:   number | null
  stallTypeId:  number | null
  thumbnail:    string | null
  thumbnailAlt: string
}

// ── Inline auto-saving searchable dropdown ────────────────────────────────────
// Type-to-filter combobox; saves immediately on pick via
// PATCH /api/admin/portfolio/[id]. `field` picks which relation to update
// (industryIds | stallTypeIds). The panel is position:fixed so the table's
// overflow container can't clip it.

function InlineSelect({
  projectId, field, value, options, placeholder,
}: {
  projectId:   number
  field:       'industryIds' | 'stallTypeIds'
  value:       number | null
  options:     Option[]
  placeholder: string
}) {
  const [current, setCurrent] = useState<number | null>(value)
  const [state, setState]     = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [open, setOpen]       = useState(false)
  const [q, setQ]             = useState('')
  const btnRef                = useRef<HTMLButtonElement>(null)
  const panelRef              = useRef<HTMLDivElement>(null)
  const [pos, setPos]         = useState({ top: 0, left: 0, up: false })

  // Keep in sync if the server data changes (e.g. after router.refresh)
  useEffect(() => { setCurrent(value) }, [value])

  // Close on outside click / scroll (fixed panel would drift on scroll)
  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (panelRef.current?.contains(e.target as Node)) return
      if (btnRef.current?.contains(e.target as Node)) return
      setOpen(false); setQ('')
    }
    function onScroll(e: Event) {
      if (panelRef.current?.contains(e.target as Node)) return
      setOpen(false); setQ('')
    }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [open])

  function toggle() {
    if (!open && btnRef.current) {
      const r  = btnRef.current.getBoundingClientRect()
      const up = window.innerHeight - r.bottom < 320
      setPos({ top: up ? r.top : r.bottom, left: r.left, up })
    }
    setOpen(o => !o)
    setQ('')
  }

  async function save(newId: number) {
    const prev = current
    setCurrent(newId)
    setOpen(false)
    setQ('')
    setState('saving')
    try {
      const res = await fetch(`/api/admin/portfolio/${projectId}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ [field]: [newId] }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('saved')
      setTimeout(() => setState('idle'), 1500)
    } catch {
      setCurrent(prev)
      setState('error')
      setTimeout(() => setState('idle'), 2500)
    }
  }

  const currentName = options.find(o => o.id === current)?.name
  const filtered = q.trim()
    ? options.filter(o => o.name.toLowerCase().includes(q.toLowerCase()))
    : options

  return (
    <div className="flex items-center gap-1.5">
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        disabled={state === 'saving'}
        className={`flex min-w-[150px] max-w-[210px] items-center justify-between gap-2 rounded-md border bg-slate-800 px-2 py-1.5 text-left text-xs outline-none transition disabled:opacity-60 ${
          state === 'error' ? 'border-red-500' : state === 'saved' ? 'border-green-500' : 'border-slate-700 hover:border-slate-500'
        } ${currentName ? 'text-slate-200' : 'text-slate-500'}`}
      >
        <span className="truncate">{currentName ?? placeholder}</span>
        <svg className="h-3 w-3 flex-shrink-0 opacity-50" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          style={pos.up
            ? { position: 'fixed', bottom: window.innerHeight - pos.top + 4, left: pos.left }
            : { position: 'fixed', top: pos.top + 4, left: pos.left }}
          className="z-50 w-64 overflow-hidden rounded-xl border border-slate-600 bg-slate-900 shadow-2xl"
        >
          <div className="border-b border-slate-800 p-2">
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={`Search…`}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500"
              onKeyDown={e => {
                if (e.key === 'Escape') { setOpen(false); setQ('') }
                if (e.key === 'Enter' && filtered.length >= 1) save(filtered[0].id)
              }}
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.map(o => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => save(o.id)}
                  className={`w-full truncate px-3 py-2 text-left text-sm transition ${
                    o.id === current ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {o.name}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-slate-500">No matches</li>
            )}
          </ul>
        </div>
      )}

      <span className="w-3 flex-shrink-0 text-xs">
        {state === 'saving' && <span className="text-slate-400">…</span>}
        {state === 'saved'  && <span className="text-green-400">✓</span>}
        {state === 'error'  && <span className="text-red-400" title="Save failed">✕</span>}
      </span>
    </div>
  )
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

export default function AdminProjectTable({
  projects, industryOptions, stallTypeOptions,
}: {
  projects:         Project[]
  industryOptions:  Option[]
  stallTypeOptions: Option[]
}) {
  const router                    = useRouter()
  const [selected, setSelected]   = useState<Set<number>>(new Set())
  const [deleting, startDelete]   = useTransition()
  const [confirmBulk, setConfirm] = useState(false)

  // Filter state
  const [filterClient,     setFilterClient]     = useState('')
  const [filterExhibition, setFilterExhibition] = useState('')
  const [filterYear,       setFilterYear]       = useState('')
  const [filterIndustry,   setFilterIndustry]   = useState('')

  const industryName = useMemo(() => {
    const m = new Map(industryOptions.map(o => [o.id, o.name]))
    return (id: number | null) => (id ? m.get(id) ?? '' : '')
  }, [industryOptions])

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

  const industryFilterOptions = industryOptions.map(o => o.name).sort()

  const anyFilter = Boolean(filterClient || filterExhibition || filterYear || filterIndustry)

  // Apply filters
  const visible = projects.filter(p => {
    if (filterClient     && p.client?.name     !== filterClient)      return false
    if (filterExhibition && p.exhibition?.name !== filterExhibition)  return false
    if (filterYear       && String(p.buildYear) !== filterYear)       return false
    if (filterIndustry   && industryName(p.industryId) !== filterIndustry) return false
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

  async function bulkFeature(featured: boolean) {
    startDelete(async () => {
      await fetch('/api/admin/portfolio/bulk-feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [...selected], featured }),
      })
      setSelected(new Set())
      router.refresh()
    })
  }

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterCombo label="Industry"   options={industryFilterOptions} value={filterIndustry}   onChange={setFilterIndustry} />
        <FilterCombo label="Client"     options={clientOptions}         value={filterClient}     onChange={setFilterClient} />
        <FilterCombo label="Exhibition" options={exhibitionOptions}     value={filterExhibition} onChange={setFilterExhibition} />
        <FilterCombo label="Year"       options={yearOptions}           value={filterYear}       onChange={setFilterYear} />
        {anyFilter && (
          <button
            type="button"
            onClick={() => { setFilterClient(''); setFilterExhibition(''); setFilterYear(''); setFilterIndustry('') }}
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
                onClick={() => bulkFeature(true)}
                disabled={deleting}
                className="px-3 py-1 rounded text-xs font-semibold bg-yellow-500/15 hover:bg-yellow-500/30 text-yellow-400 hover:text-yellow-300 border border-yellow-600/40 transition disabled:opacity-50"
              >
                ★ Featured Projects
              </button>
              <button
                onClick={() => bulkFeature(false)}
                disabled={deleting}
                className="px-3 py-1 rounded text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-600 transition disabled:opacity-50"
              >
                Remove Featured
              </button>
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
      <div className="rounded-2xl border border-slate-700 overflow-x-auto">
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
              {['Photo', 'Title', 'Client', 'Industry', 'Stall Type', 'Year', 'Status', ''].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">{h}</th>
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
                <td className="px-4 py-2">
                  {p.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.thumbnail}
                      alt={p.thumbnailAlt}
                      loading="lazy"
                      className="h-12 w-16 rounded-md object-cover border border-slate-700 bg-slate-800"
                    />
                  ) : (
                    <div className="h-12 w-16 rounded-md border border-slate-700 bg-slate-800 flex items-center justify-center text-slate-600 text-[10px]">
                      No image
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-200 font-medium max-w-[220px] truncate">
                  {p.isFeatured && <span className="mr-1.5 text-yellow-400">★</span>}
                  {p.title}
                </td>
                <td className="px-4 py-3 text-slate-400">{p.client?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <InlineSelect
                    projectId={p.id}
                    field="industryIds"
                    value={p.industryId}
                    options={industryOptions}
                    placeholder="Select industry"
                  />
                </td>
                <td className="px-4 py-3">
                  <InlineSelect
                    projectId={p.id}
                    field="stallTypeIds"
                    value={p.stallTypeId}
                    options={stallTypeOptions}
                    placeholder="Select stall type"
                  />
                </td>
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
                <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
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
