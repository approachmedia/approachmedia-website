'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The admin's searchable filter dropdown. Lifted out of AdminProjectTable
 * unchanged so the category screen wears the same control rather than a
 * lookalike — same chip, same blue active state, same clear ✕, same
 * type-to-filter panel.
 *
 * One addition, optional and off by default: `meta` puts a muted string on
 * the right of each row. The category screen shows a project count there; the
 * project table passes nothing and renders exactly as before.
 */
export default function FilterCombo({
  label, options, value, onChange, meta, allLabel,
}: {
  label:     string
  options:   string[]
  value:     string
  onChange:  (v: string) => void
  meta?:     (option: string) => string | null
  /** Overrides the default "All {label}s" reset row. */
  allLabel?: string
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
                  {allLabel ?? `All ${label}s`}
                </button>
              </li>
            )}
            {filtered.map(o => (
              <li key={o}>
                <button
                  type="button"
                  onClick={() => pick(o)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition ${
                    o === value ? 'bg-blue-600/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex-1 truncate">{o}</span>
                  {meta?.(o) && <span className="flex-shrink-0 text-xs text-slate-500">{meta(o)}</span>}
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
