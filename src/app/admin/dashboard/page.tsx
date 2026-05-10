'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-dark-50">
      <header className="bg-dark-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Card */}
          <Link href="/admin/portfolio" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Portfolio</h2>
            <p className="text-dark-600 mb-4">Manage your project gallery and case studies</p>
            <span className="text-accent-gold font-semibold">Manage →</span>
          </Link>

          {/* Exhibitions Card */}
          <Link href="/admin/exhibitions" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Exhibitions</h2>
            <p className="text-dark-600 mb-4">Add and manage upcoming exhibitions</p>
            <span className="text-accent-gold font-semibold">Manage →</span>
          </Link>

          {/* Blog Card */}
          <Link href="/admin/blog" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Blog/Insights</h2>
            <p className="text-dark-600 mb-4">Create and publish blog articles</p>
            <span className="text-accent-gold font-semibold">Manage →</span>
          </Link>

          {/* Clients Card */}
          <Link href="/admin/clients" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Clients</h2>
            <p className="text-dark-600 mb-4">Manage client logos and information</p>
            <span className="text-accent-gold font-semibold">Manage →</span>
          </Link>

          {/* Testimonials Card */}
          <Link href="/admin/testimonials" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Testimonials</h2>
            <p className="text-dark-600 mb-4">Add and manage client testimonials</p>
            <span className="text-accent-gold font-semibold">Manage →</span>
          </Link>

          {/* Enquiries Card */}
          <Link href="/admin/enquiries" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-dark-900 mb-2">Lead Enquiries</h2>
            <p className="text-dark-600 mb-4">View and manage form submissions</p>
            <span className="text-accent-gold font-semibold">Manage →</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
