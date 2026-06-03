'use client'

import { useState } from 'react'
import Link from 'next/link'

type ProjectResult = {
  slug: string
  status: 'created' | 'skipped' | 'error'
  message?: string
}

type PreviewRow = {
  slug: string
  client: string
  sqm: number
  images: number
  willImport: boolean
}

export default function SeedPage() {
  const [preview, setPreview]   = useState<PreviewRow[] | null>(null)
  const [results, setResults]   = useState<ProjectResult[] | null>(null)
  const [summary, setSummary]   = useState<{ created: number; skipped: number; errors: number } | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  async function loadPreview() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/seed')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load preview')
      setPreview(data.preview)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  async function runImport() {
    setLoading(true)
    setError(null)
    setResults(null)
    setSummary(null)
    try {
      const res  = await fetch('/api/admin/seed', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Import failed')
      setResults(data.results)
      setSummary(data.summary)
      setPreview(null)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const statusColor = (s: string) =>
    s === 'created' ? 'text-green-400' : s === 'skipped' ? 'text-slate-400' : 'text-red-400'

  const statusIcon = (s: string) =>
    s === 'created' ? '✓' : s === 'skipped' ? '—' : '✗'

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Import Projects</h1>
        <p className="text-slate-400 text-sm">
          Imports 7 FITAG Tech Expo 2025 projects from the case-study Excel file.
          Safe to run multiple times — existing slugs are skipped.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
          {error}
        </div>
      )}

      {!results && (
        <div className="flex gap-3">
          <button
            onClick={loadPreview}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium disabled:opacity-50 transition"
          >
            {loading && !preview ? 'Loading…' : 'Preview'}
          </button>
          <button
            onClick={runImport}
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium disabled:opacity-50 transition"
          >
            {loading ? 'Importing…' : 'Run Import'}
          </button>
        </div>
      )}

      {preview && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-3">
            {preview.filter(p => p.willImport).length} of {preview.length} projects will be imported
          </h2>
          <div className="rounded-xl border border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Client</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">SQM</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Images</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {preview.map(p => (
                  <tr key={p.slug} className="bg-slate-900">
                    <td className="px-4 py-3 text-white">{p.client}</td>
                    <td className="px-4 py-3 text-slate-300">{p.sqm}</td>
                    <td className="px-4 py-3 text-slate-300">{p.images}</td>
                    <td className={`px-4 py-3 font-medium ${p.willImport ? 'text-blue-400' : 'text-slate-500'}`}>
                      {p.willImport ? 'Will import' : 'Already exists'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={runImport}
              disabled={loading || preview.filter(p => p.willImport).length === 0}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium disabled:opacity-50 transition"
            >
              {loading ? 'Importing…' : 'Confirm & Import'}
            </button>
            <button onClick={() => setPreview(null)} className="px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {results && summary && (
        <div className="mt-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 rounded-xl bg-green-900/20 border border-green-800 p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{summary.created}</div>
              <div className="text-xs text-green-600 mt-1">Created</div>
            </div>
            <div className="flex-1 rounded-xl bg-slate-800 border border-slate-700 p-4 text-center">
              <div className="text-3xl font-bold text-slate-400">{summary.skipped}</div>
              <div className="text-xs text-slate-500 mt-1">Skipped</div>
            </div>
            {summary.errors > 0 && (
              <div className="flex-1 rounded-xl bg-red-900/20 border border-red-800 p-4 text-center">
                <div className="text-3xl font-bold text-red-400">{summary.errors}</div>
                <div className="text-xs text-red-600 mt-1">Errors</div>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-700 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Project slug</th>
                  <th className="text-left px-4 py-3 text-slate-400 font-medium">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {results.map(r => (
                  <tr key={r.slug} className="bg-slate-900">
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{r.slug}</td>
                    <td className={`px-4 py-3 font-medium ${statusColor(r.status)}`}>
                      {statusIcon(r.status)} {r.status}
                      {r.message && <span className="ml-2 text-red-300 font-normal">{r.message}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {summary.created > 0 && (
            <div className="flex gap-3">
              <Link href="/admin/portfolio" className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition">
                View in Portfolio
              </Link>
              <Link href="/portfolio" target="_blank" className="px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition">
                View Public Site →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
