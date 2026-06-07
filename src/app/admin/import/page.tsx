'use client'

import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import Link from 'next/link'

type Row = Record<string, unknown>
type Result = { slug: string; status: 'created' | 'updated' | 'error'; message?: string }
type Summary = { created: number; updated: number; errors: number }

const STATUS_COLOUR: Record<string, string> = {
  created: 'text-green-400',
  updated: 'text-blue-400',
  error:   'text-red-400',
}
const STATUS_ICON: Record<string, string> = { created: '✓', updated: '↻', error: '✗' }

// ── Fix image URLs widget ──────────────────────────────────────────────────────
function FixImageUrlsButton() {
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<{ total: number; updated: number } | null>(null)

  async function run() {
    setState('running')
    try {
      const res  = await fetch('/api/admin/fix-image-urls', { method: 'POST' })
      const data = await res.json()
      setResult({ total: data.total, updated: data.updated })
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="rounded-lg border border-orange-700/40 bg-orange-900/10 p-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-orange-300">Fix existing image URLs</p>
        <p className="text-xs text-slate-400 mt-0.5">
          Re-encodes spaces in folder names for all media already in the database
          (e.g. <span className="font-mono text-slate-300">SSSA BUSINESS EXPO 2022</span> →{' '}
          <span className="font-mono text-slate-300">SSSA%20BUSINESS%20EXPO%202022</span>).
          Safe to run multiple times.
        </p>
        {state === 'done' && result && (
          <p className="text-xs text-green-400 mt-1">
            ✓ Done — {result.updated} of {result.total} records updated
          </p>
        )}
        {state === 'error' && <p className="text-xs text-red-400 mt-1">Error — check console</p>}
      </div>
      <button
        onClick={run}
        disabled={state === 'running' || state === 'done'}
        className="shrink-0 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition disabled:opacity-50"
      >
        {state === 'running' ? 'Fixing…' : state === 'done' ? 'Done ✓' : 'Fix Now'}
      </button>
    </div>
  )
}

export default function ImportPage() {
  const fileRef           = useRef<HTMLInputElement>(null)
  const [rows, setRows]   = useState<Row[] | null>(null)
  const [fileName, setFileName] = useState('')
  const [existingSlugs, setExistingSlugs] = useState<Set<string>>(new Set())
  const [results, setResults]   = useState<Result[] | null>(null)
  const [summary, setSummary]   = useState<Summary | null>(null)
  const [loading, setLoading]   = useState(false)
  const [phase, setPhase]       = useState<'idle' | 'preview' | 'done'>('idle')
  const [error, setError]       = useState<string | null>(null)

  // ── 1. Parse file ─────────────────────────────────────────────────────────
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setRows(null)
    setResults(null)
    setSummary(null)
    setPhase('idle')

    try {
      const buffer = await file.arrayBuffer()
      const wb     = XLSX.read(buffer, { type: 'array' })
      const ws     = wb.Sheets[wb.SheetNames[0]]
      const parsed = XLSX.utils.sheet_to_json<Row>(ws, { defval: '' })
      setFileName(file.name)
      setRows(parsed)
      setPhase('preview')

      // Check which slugs already exist
      setLoading(true)
      const slugs = parsed.map(r => String(r.slug || '')).filter(Boolean)
      const res   = await fetch(`/api/admin/import?slugs=${encodeURIComponent(slugs.join(','))}`)
      const data  = await res.json() as { existing: string[] }
      setExistingSlugs(new Set(data.existing))
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  // ── 2. Run import ─────────────────────────────────────────────────────────
  async function runImport() {
    if (!rows) return
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch('/api/admin/import', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ rows }),
      })
      const data = await res.json() as { results: Result[]; summary: Summary }
      if (!res.ok) throw new Error(JSON.stringify(data))
      setResults(data.results)
      setSummary(data.summary)
      setPhase('done')
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const newCount      = rows ? rows.filter(r => !existingSlugs.has(String(r.slug))).length : 0
  const existingCount = rows ? rows.length - newCount : 0

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Import Portfolio (Excel / CSV)</h1>
        <p className="text-slate-400 text-sm">
          Upload the prepared Excel file. The importer maps all 35 columns automatically.{' '}
          <span className="text-yellow-300">Re-uploading existing slugs updates their images — all other fields unchanged.</span>
        </p>
      </div>

      {/* Column mapping reference */}
      <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4 text-xs space-y-1.5 text-slate-400">
        <p className="font-semibold text-slate-200 mb-2">Column → Database mapping</p>
        <p><span className="font-mono text-yellow-300 w-52 inline-block">01 The Challenge</span>→ Design Brief (shown as "The Challenge" on page)</p>
        <p><span className="font-mono text-yellow-300 w-52 inline-block">02 What We Designed</span>→ Full Description (shown as "What We Designed" on page)</p>
        <p><span className="font-mono text-yellow-300 w-52 inline-block">03 Why It Worked</span>→ AI Summary (shown as "Why It Worked" on page)</p>
        <p><span className="font-mono text-slate-400 w-52 inline-block">hero_image_url</span>→ Hero image (falls back to hero_image_new_path_SEO)</p>
        <p><span className="font-mono text-slate-400 w-52 inline-block">gallery_images</span>→ Gallery images (falls back to gallery_new_paths_SEO, pipe-separated)</p>
        <p><span className="font-mono text-slate-400 w-52 inline-block">status: "final"</span>→ stored as "published"</p>
      </div>

      {/* Fix existing DB records */}
      <FixImageUrlsButton />

      {/* File picker */}
      <div
        className="rounded-2xl border-2 border-dashed border-slate-600 hover:border-blue-500 bg-slate-900/40 p-10 text-center cursor-pointer transition"
        onClick={() => fileRef.current?.click()}
      >
        <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="hidden" />
        {fileName
          ? <p className="text-white font-medium">{fileName} — {rows?.length} rows</p>
          : <p className="text-slate-400">Click to choose Excel (.xlsx) or CSV file</p>
        }
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {/* Preview */}
      {phase === 'preview' && rows && !loading && (
        <div className="space-y-4">
          {/* Summary counts */}
          <div className="flex gap-4">
            <div className="flex-1 rounded-xl bg-blue-900/20 border border-blue-800 p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{rows.length}</div>
              <div className="text-xs text-blue-600 mt-1">Total rows</div>
            </div>
            <div className="flex-1 rounded-xl bg-green-900/20 border border-green-800 p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{newCount}</div>
              <div className="text-xs text-green-600 mt-1">Will import</div>
            </div>
            <div className="flex-1 rounded-xl bg-slate-800 border border-slate-700 p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{existingCount}</div>
              <div className="text-xs text-slate-500 mt-1">Existing (update images)</div>
            </div>
          </div>

          {/* First 10 rows preview */}
          <div className="rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Preview (first 10 rows)
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left px-4 py-2 text-slate-400 font-medium">Client</th>
                  <th className="text-left px-4 py-2 text-slate-400 font-medium">Title (truncated)</th>
                  <th className="text-right px-4 py-2 text-slate-400 font-medium">SQM</th>
                  <th className="text-left px-4 py-2 text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.slice(0, 10).map((r, i) => {
                  const isNew = !existingSlugs.has(String(r.slug))
                  return (
                    <tr key={i} className="bg-slate-900">
                      <td className="px-4 py-2.5 text-white font-medium">{String(r.client_name || '')}</td>
                      <td className="px-4 py-2.5 text-slate-300 max-w-xs truncate">{String(r.title || '').slice(0, 60)}</td>
                      <td className="px-4 py-2.5 text-slate-300 text-right">{String(r.stall_area_sqm || '')}</td>
                      <td className={`px-4 py-2.5 font-medium ${isNew ? 'text-green-400' : 'text-blue-400'}`}>
                        {isNew ? 'New' : 'Update images'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {rows.length > 10 && (
              <div className="bg-slate-800/50 px-4 py-2 text-xs text-slate-500">
                … and {rows.length - 10} more rows
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={runImport}
              disabled={loading || rows.length === 0}
              className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Importing…' : `Import ${newCount} project${newCount !== 1 ? 's' : ''}`}
            </button>
            <button
              onClick={() => { setRows(null); setPhase('idle'); setFileName(''); if (fileRef.current) fileRef.current.value = '' }}
              className="px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && phase === 'preview' && (
        <p className="text-slate-400 text-sm animate-pulse">Checking existing slugs…</p>
      )}
      {loading && phase !== 'preview' && (
        <p className="text-slate-400 text-sm animate-pulse">Importing {rows?.length} rows — please wait…</p>
      )}

      {/* Results */}
      {phase === 'done' && results && summary && (
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1 rounded-xl bg-green-900/20 border border-green-800 p-4 text-center">
              <div className="text-3xl font-bold text-green-400">{summary.created}</div>
              <div className="text-xs text-green-600 mt-1">Created</div>
            </div>
            <div className="flex-1 rounded-xl bg-slate-800 border border-slate-700 p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">{summary.updated}</div>
              <div className="text-xs text-slate-500 mt-1">Updated</div>
            </div>
            {summary.errors > 0 && (
              <div className="flex-1 rounded-xl bg-red-900/20 border border-red-800 p-4 text-center">
                <div className="text-3xl font-bold text-red-400">{summary.errors}</div>
                <div className="text-xs text-red-600 mt-1">Errors</div>
              </div>
            )}
          </div>

          {/* Errors only — don't flood the screen with 500 successes */}
          {summary.errors > 0 && (
            <div className="rounded-xl border border-red-800 overflow-hidden">
              <div className="bg-red-900/30 px-4 py-2 text-xs font-semibold text-red-400">Failed rows</div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-800">
                  {results.filter(r => r.status === 'error').map(r => (
                    <tr key={r.slug} className="bg-slate-900">
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-300">{r.slug}</td>
                      <td className="px-4 py-2.5 text-red-300 text-xs">{r.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="rounded-xl border border-slate-700 overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400">All results</div>
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-800">
                  {results.map(r => (
                    <tr key={r.slug} className="bg-slate-900">
                      <td className="px-4 py-2 font-mono text-xs text-slate-400">{r.slug}</td>
                      <td className={`px-4 py-2 font-medium ${STATUS_COLOUR[r.status]}`}>
                        {STATUS_ICON[r.status]} {r.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/admin/portfolio" className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition">
              View Portfolio
            </Link>
            <button
              onClick={() => { setRows(null); setResults(null); setSummary(null); setPhase('idle'); setFileName(''); if (fileRef.current) fileRef.current.value = '' }}
              className="px-5 py-2.5 rounded-lg bg-slate-700 text-white text-sm"
            >
              Import another file
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
