import Link from 'next/link'
import { getAdminProjectList } from '@/lib/db/portfolio'
import AdminProjectTable from '@/components/admin/AdminProjectTable'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const projects = await getAdminProjectList()

  const counts = {
    total:     projects.length,
    published: projects.filter(p => p.status === 'published').length,
    draft:     projects.filter(p => p.status === 'draft').length,
    featured:  projects.filter(p => p.isFeatured).length,
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-white">Portfolio</h1>
        <Link href="/admin/portfolio/new" className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition">
          + New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(counts).map(([label, val]) => (
          <div key={label} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">{label}</p>
            <p className="text-3xl font-display font-bold text-white">{val}</p>
          </div>
        ))}
      </div>

      <AdminProjectTable projects={projects} />
    </div>
  )
}
