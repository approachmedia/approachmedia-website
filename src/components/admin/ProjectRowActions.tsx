'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProjectRowActions({
  id,
  isFeatured,
  title,
}: {
  id: number
  isFeatured: boolean
  title: string
}) {
  const router                    = useRouter()
  const [featured, setFeatured]   = useState(isFeatured)
  const [loadingStar, setLoadStar] = useState(false)
  const [loadingDel, setLoadDel]  = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)

  async function toggleFeatured() {
    setLoadStar(true)
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !featured }),
      })
      if (res.ok) {
        setFeatured(f => !f)
        router.refresh()
      }
    } finally {
      setLoadStar(false)
    }
  }

  async function deleteProject() {
    setLoadDel(true)
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
      if (res.ok) router.refresh()
      else setConfirmDel(false)
    } finally {
      setLoadDel(false)
    }
  }

  return (
    <div className="flex items-center gap-3 justify-end">
      {/* Featured star toggle */}
      <button
        type="button"
        onClick={toggleFeatured}
        disabled={loadingStar}
        title={featured ? 'Remove from featured' : 'Mark as featured'}
        className={`text-lg leading-none transition disabled:opacity-40 ${
          featured ? 'text-yellow-400 hover:text-yellow-300' : 'text-slate-600 hover:text-yellow-400'
        }`}
      >
        {loadingStar ? '…' : featured ? '★' : '☆'}
      </button>

      {/* Edit link */}
      <a
        href={`/admin/portfolio/${id}/edit`}
        className="text-blue-400 hover:text-blue-300 transition text-xs"
      >
        Edit
      </a>

      {/* Delete */}
      {confirmDel ? (
        <span className="flex items-center gap-1.5">
          <span className="text-xs text-slate-400 hidden sm:inline">Delete "{title.slice(0, 20)}…"?</span>
          <button
            type="button"
            onClick={deleteProject}
            disabled={loadingDel}
            className="text-xs font-semibold text-red-400 hover:text-red-300 disabled:opacity-40 transition"
          >
            {loadingDel ? 'Deleting…' : 'Confirm'}
          </button>
          <button
            type="button"
            onClick={() => setConfirmDel(false)}
            className="text-xs text-slate-500 hover:text-slate-300 transition"
          >
            Cancel
          </button>
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setConfirmDel(true)}
          className="text-xs text-red-500 hover:text-red-400 transition"
        >
          Delete
        </button>
      )}
    </div>
  )
}
