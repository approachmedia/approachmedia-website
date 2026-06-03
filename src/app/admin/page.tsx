import Link from 'next/link'
import { getAdminProjectList } from '@/lib/db/portfolio'
import ProjectRowActions from '@/components/admin/ProjectRowActions'

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

      {/* Project table */}
      <div className="rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 border-b border-slate-700">
            <tr>
              {['Title', 'Client', 'Industry', 'Year', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-slate-800/30 transition">
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
                  <ProjectRowActions
                    id={p.id}
                    isFeatured={p.isFeatured}
                    title={p.title}
                  />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-500">No projects yet — <Link href="/admin/portfolio/new" className="text-blue-400 underline">add the first one</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
