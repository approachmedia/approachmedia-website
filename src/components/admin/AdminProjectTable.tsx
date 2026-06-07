'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Project = {
  id:         number
  title:      string
  status:     string
  isFeatured: boolean
  buildYear:  number | null
  client:     { name: string } | null
  industries: { industry: { name: string } }[]
}

export default function AdminProjectTable({ projects }: { projects: Project[] }) {
  const router                  = useRouter()
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [deleting, startDelete] = useTransition()
  const [confirmBulk, setConfirm] = useState(false)

  const allIds  = projects.map(p => p.id)
  const allSelected = selected.size === allIds.length && allIds.length > 0

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(allIds))
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
            {projects.map(p => (
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
                  <div className="flex items-center gap-3 justify-end">
                    <Link href={`/admin/portfolio/${p.id}/edit`} className="text-blue-400 hover:text-blue-300 transition text-xs">
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-500">No projects yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
