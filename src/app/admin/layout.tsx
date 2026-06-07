import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from '@/components/admin/LogoutButton'

export const metadata: Metadata = { title: 'Admin — Approach Media', robots: { index: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[hsl(222,30%,6%)]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" aria-label="Approach Media Admin">
              <Image
                src="https://approachmedia.in/wp-content/uploads/2020/10/approach-media-logo-small.png"
                alt="Approach Media"
                width={120}
                height={30}
                style={{ height: '28px', width: 'auto' }}
              />
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/admin/portfolio"     className="text-slate-400 hover:text-white transition">Portfolio</Link>
              <Link href="/admin/portfolio/new" className="text-slate-400 hover:text-white transition">+ New Project</Link>
              <Link href="/admin/import"        className="text-slate-400 hover:text-white transition">Import</Link>
              <Link href="/admin/setup-2fa"     className="text-slate-400 hover:text-white transition">2FA Setup</Link>
            </nav>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
