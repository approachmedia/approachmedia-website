import { getLookups } from '@/lib/db/portfolio'
import PortfolioForm from '@/components/admin/PortfolioForm'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'New Project — Admin' }

export default async function NewProjectPage() {
  const { industries, stallTypes, exhibitions, clients } = await getLookups()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">New Project</h1>
        <p className="text-sm text-slate-400 mt-1">Complete all 4 sections before publishing. Draft saves at any time.</p>
      </div>
      <PortfolioForm
        industries={industries}
        stallTypes={stallTypes}
        exhibitions={exhibitions}
        clients={clients}
      />
    </div>
  )
}
