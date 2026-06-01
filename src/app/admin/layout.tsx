import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin — Approach Media', robots: { index: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(222,30%,6%)]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-bold text-white font-display">
              AM Admin
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/admin/portfolio"     className="text-slate-400 hover:text-white transition">Portfolio</Link>
              <Link href="/admin/portfolio/new" className="text-slate-400 hover:text-white transition">+ New Project</Link>
            </nav>
          </div>
          <form action="/api/admin/login" method="post" onSubmit={async e => {
            e.preventDefault()
            await fetch('/api/admin/login', { method: 'DELETE' })
            window.location.href = '/admin/login'
          }}>
            <button type="submit" className="text-xs text-slate-500 hover:text-slate-300 transition">Sign out</button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
