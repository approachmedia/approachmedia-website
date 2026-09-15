'use client'

/**
 * The Industry cell on the admin portfolio table.
 *
 * Replaces a single-value dropdown that could not do either of the two things
 * the work actually needs:
 *
 *  · a project can sit in more than one category — Themis Automation is
 *    Automation plus Machine Manufacturers, Kavit Soap is Pharmaceuticals plus
 *    FMCG — and the old cell showed only the primary. Worse, picking a value
 *    saved `industryIds: [one]`, which replaced the pair with a single entry.
 *    Opening the dropdown on a two-category project and choosing anything
 *    silently deleted the second category.
 *  · a category that does not exist yet could not be created here. Typing one
 *    returned "No matches" and stopped.
 *
 * Each chip is one category. The first is the primary — that is the one the
 * public industry page and the portfolio filter use — and it is marked with a
 * dot. Removing the primary promotes the next, which is handled server side in
 * setProjectIndustry.
 *
 * Writes go one category at a time through /api/admin/portfolio/categories,
 * which already had add and remove for the clean-up screen. Nothing here ever
 * sends a whole array, so there is no longer a call that can overwrite a
 * category the operator did not touch.
 */

import { useEffect, useRef, useState } from 'react'

export type Option = { id: number; name: string }

type Saving = 'idle' | 'saving' | 'saved' | 'error'

export default function IndustryCell({
  projectId, value, options, onCreated,
}: {
  projectId: number
  /** All of the project's industry ids, primary first. */
  value:     number[]
  options:   Option[]
  /** Hands a newly created category up so every other row can see it too. */
  onCreated: (option: Option) => void
}) {
  const [ids, setIds]     = useState<number[]>(value)
  const [state, setState] = useState<Saving>('idle')
  const [error, setError] = useState('')
  const [open, setOpen]   = useState(false)
  const [q, setQ]         = useState('')
  const [busy, setBusy]   = useState(false)
  const btnRef            = useRef<HTMLButtonElement>(null)
  const panelRef          = useRef<HTMLDivElement>(null)
  const [pos, setPos]     = useState({ top: 0, left: 0, up: false })

  useEffect(() => { setIds(value) }, [value])

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
      const r = btnRef.current.getBoundingClientRect()
      const up = window.innerHeight - r.bottom < 340
      setPos({ top: up ? r.top : r.bottom, left: Math.min(r.left, window.innerWidth - 280), up })
    }
    setOpen(o => !o)
    setQ('')
  }

  function flash(next: Saving, message = '') {
    setState(next)
    setError(message)
    window.setTimeout(() => { setState('idle'); setError('') }, next === 'error' ? 4000 : 1500)
  }

  /** One category on or off this project. Optimistic, rolled back on failure. */
  async function write(industryId: number, op: 'add' | 'remove') {
    const prev = ids
    setIds(op === 'add' ? [...ids, industryId] : ids.filter(i => i !== industryId))
    setState('saving')
    try {
      const res = await fetch('/api/admin/portfolio/categories', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ projectId, industryId, op }),
      })
      if (!res.ok) throw new Error(String(res.status))
      flash('saved')
    } catch {
      setIds(prev)
      flash('error', 'Save failed')
    }
  }

  /** Creates the category, then puts the project in it. */
  async function create(name: string) {
    setBusy(true)
    try {
      const res = await fetch('/api/admin/industries', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name }),
      })
      if (!res.ok) throw new Error(String(res.status))
      const created = await res.json() as Option
      onCreated(created)
      setOpen(false)
      setQ('')
      // An existing category can come back here, because the server matches on
      // name without regard to case. Adding it twice is a no-op server side,
      // but the chip would appear twice until the next refresh.
      if (!ids.includes(created.id)) await write(created.id, 'add')
    } catch {
      flash('error', 'Could not create')
    } finally {
      setBusy(false)
    }
  }

  const byId     = new Map(options.map(o => [o.id, o.name]))
  const query    = q.trim()
  const lower    = query.toLowerCase()
  const filtered = query
    ? options.filter(o => o.name.toLowerCase().includes(lower))
    : options
  const exact     = options.some(o => o.name.toLowerCase() === lower)
  const canCreate = query.length >= 2 && !exact

  return (
    <div className="flex min-w-[170px] max-w-[230px] flex-wrap items-center gap-1">
      {ids.map((id, i) => (
        <span
          key={id}
          className="inline-flex max-w-full items-center gap-1 rounded-md border border-slate-700 bg-slate-800 py-1 pl-2 pr-1 text-xs text-slate-200"
          title={i === 0 ? `${byId.get(id) ?? id} — primary category` : byId.get(id) ?? String(id)}
        >
          {i === 0 && <span aria-hidden className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />}
          <span className="truncate">{byId.get(id) ?? `#${id}`}</span>
          <button
            type="button"
            onClick={() => write(id, 'remove')}
            className="flex-shrink-0 px-0.5 text-slate-500 transition hover:text-red-400"
            aria-label={`Remove ${byId.get(id) ?? 'category'}`}
          >
            ✕
          </button>
        </span>
      ))}

      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        className={`rounded-md border px-2 py-1 text-xs transition ${
          ids.length === 0
            ? 'border-slate-700 bg-slate-800 text-slate-500 hover:border-slate-500'
            : 'border-dashed border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
        }`}
      >
        {ids.length === 0 ? 'Select industry' : '+ Add'}
      </button>

      <span className="w-3 flex-shrink-0 text-xs">
        {state === 'saving' && <span className="text-slate-400">…</span>}
        {state === 'saved'  && <span className="text-green-400">✓</span>}
        {state === 'error'  && <span className="text-red-400" title={error}>✕</span>}
      </span>

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
              placeholder="Search or type a new one…"
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500"
              onKeyDown={e => {
                if (e.key === 'Escape') { setOpen(false); setQ('') }
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const first = filtered.find(o => !ids.includes(o.id))
                  if (first) { setOpen(false); setQ(''); write(first.id, 'add') }
                  else if (canCreate) create(query)
                }
              }}
            />
          </div>

          <ul className="max-h-60 overflow-y-auto py-1">
            {filtered.map(o => {
              const on = ids.includes(o.id)
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); setQ(''); write(o.id, on ? 'remove' : 'add') }}
                    className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition ${
                      on ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{o.name}</span>
                    {on && <span className="flex-shrink-0 text-xs">✓</span>}
                  </button>
                </li>
              )
            })}

            {filtered.length === 0 && !canCreate && (
              <li className="px-3 py-4 text-center text-sm text-slate-500">No matches</li>
            )}

            {canCreate && (
              <li className="mt-1 border-t border-slate-800 pt-1">
                <button
                  type="button"
                  onClick={() => create(query)}
                  disabled={busy}
                  className="w-full px-3 py-2 text-left text-sm text-green-400 transition hover:bg-slate-800 disabled:opacity-50"
                >
                  {busy ? 'Creating…' : <>+ Create “<span className="font-semibold">{query}</span>”</>}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
