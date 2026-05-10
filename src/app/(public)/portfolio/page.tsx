'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PortfolioPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    industry: '',
    country: '',
  })

  useEffect(() => {
    fetchProjects()
  }, [filters])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.industry) params.append('industry', filters.industry)
      if (filters.country) params.append('country', filters.country)

      const response = await fetch(`/api/portfolio?${params}`)
      const data = await response.json()
      setProjects(data.projects)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Our Portfolio</h1>
          <p className="text-dark-200">Explore our exhibition stall designs across industries and countries</p>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-dark-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-dark-700 font-semibold mb-2">Industry</label>
              <select
                value={filters.industry}
                onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg"
              >
                <option value="">All Industries</option>
                <option value="real-estate">Real Estate</option>
                <option value="pharma">Pharma</option>
                <option value="technology">Technology</option>
              </select>
            </div>
            <div>
              <label className="block text-dark-700 font-semibold mb-2">Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="w-full px-4 py-2 border border-dark-300 rounded-lg"
              >
                <option value="">All Countries</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center text-dark-600">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-dark-600">No projects found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <Link key={project.id} href={`/portfolio/${project.slug}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                  {project.heroImage && (
                    <div className="bg-dark-200 h-48 flex items-center justify-center">
                      <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark-900 mb-2">{project.title}</h3>
                    <p className="text-dark-600 mb-4 line-clamp-2">{project.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-accent-gold">{project.industry}</span>
                      <span className="text-sm text-dark-600">{project.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
