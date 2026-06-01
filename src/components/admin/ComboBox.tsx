'use client'
import { useEffect, useRef, useState } from 'react'

export interface ComboOption {
  id:        number
  label:     string
  sublabel?: string
}

interface ComboBoxProps {
  options:     ComboOption[]
  value:       number | undefined
  onChange:    (id: number | undefined) => void
  placeholder?: string
  /** Creates a new record on the server and returns it. Enables the "+ Create" row. */
  onCreate?:   (name: string) => Promise<ComboOption>
  createLabel?: string
}

export default function ComboBox({
  options, value, onChange, placeholder = 'Search…', onCreate, createLabel = 'Create',
}: ComboBoxProps) {
  const [open, setOpen]       = useState(false)
  const [query, setQuery]     = useState('')
  const [items, setItems]     = useState<ComboOption[]>(options)
  const [creating, setCreating] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // keep local list in sync if parent options change
  useEffect(() => { setItems(options) }, [options])

  // close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const selected = items.find(o => o.id === value)
  const q        = query.trim().toLowerCase()
  const filtered = q
    ? items.filter(o => o.label.toLowerCase().includes(q) || o.sublabel?.toLowerCase().includes(q))
    : items
  const exactMatch = items.some(o => o.label.toLowerCase() === q)
  const canCreate  = onCreate && q.length >= 2 && !exactMatch

  async function handleCreate() {
    if (!onCreate || !query.trim()) return
    setCreating(true)
    try {
      const created = await onCreate(query.trim())
      setItems(prev => [created, ...prev])
      onChange(created.id)
      setQuery('')
      setOpen(false)
    } catch {
      // surfaced by the parent via its own error handling if needed
    } finally {
      setCreating(false)
    }
  }

  function select(id: number) {
    onChange(id)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={wrapRef} className="relative">
      {/* Trigger / selected display */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="field-input flex items-center justify-between text-left w-full"
      >
        <span className={selected ? 'text-white' : 'text-slate-500'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="flex items-center gap-2 flex-shrink-0">
          {selected && (
            <span
              role="button"
              tabIndex={0}
              onClick={e => { e.stopPropagation(); onChange(undefined) }}
              className="text-slate-500 hover:text-red-400 text-sm"
              aria-label="Clear"
            >
              ✕
            </span>
          )}
          <svg className="w-4 h-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-30 mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-700">
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-800 text-white text-sm rounded-md px-3 py-2 outline-none border border-slate-700 focus:border-blue-500"
              onKeyDown={e => {
                if (e.key === 'Enter') { e.preventDefault(); if (canCreate) handleCreate() }
                if (e.key === 'Escape') setOpen(false)
              }}
            />
          </div>

          <ul className="max-h-60 overflow-y-auto py-1">
            {filtered.map(o => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => select(o.id)}
                  className={`w-full text-left px-3 py-2 text-sm transition flex items-center justify-between ${
                    o.id === value ? 'bg-blue-600/20 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{o.label}</span>
                  {o.sublabel && <span className="text-xs text-slate-500">{o.sublabel}</span>}
                </button>
              </li>
            ))}

            {filtered.length === 0 && !canCreate && (
              <li className="px-3 py-3 text-sm text-slate-500 text-center">No matches</li>
            )}

            {canCreate && (
              <li className="border-t border-slate-700 mt-1 pt-1">
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={creating}
                  className="w-full text-left px-3 py-2 text-sm text-green-400 hover:bg-slate-800 transition disabled:opacity-50"
                >
                  {creating ? 'Creating…' : <>+ {createLabel} “<span className="font-semibold">{query.trim()}</span>”</>}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
