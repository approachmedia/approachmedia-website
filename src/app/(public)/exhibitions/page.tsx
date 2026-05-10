'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function ExhibitionsPage() {
  const [exhibitions, setExhibitions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExhibitions()
  }, [])

  const fetchExhibitions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/exhibitions?limit=20')
      const data = await response.json()
      setExhibitions(data.exhibitions)
    } catch (error) {
      console.error('Failed to fetch exhibitions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Upcoming Exhibitions</h1>
          <p className="text-dark-200">Plan your exhibition stall with us. Start early to secure design and execution timelines.</p>
        </div>
      </header>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center text-dark-600">Loading exhibitions...</p>
        ) : exhibitions.length === 0 ? (
          <p className="text-center text-dark-600">No upcoming exhibitions</p>
        ) : (
          <div className="space-y-6">
            {exhibitions.map((exhibition: any) => (
              <Link key={exhibition.id} href={`/exhibitions/${exhibition.slug}`}>
                <div className="bg-dark-50 rounded-lg p-6 hover:shadow-lg transition border-l-4 border-accent-gold">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-dark-900">{exhibition.eventName}</h3>
                      <p className="text-dark-600">{exhibition.venue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-dark-600 font-semibold">Dates</p>
                      <p className="text-dark-900">
                        {formatDate(new Date(exhibition.startDate))} - {formatDate(new Date(exhibition.endDate))}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-dark-600 font-semibold">Location</p>
                      <p className="text-dark-900">{exhibition.city}, {exhibition.country}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <button className="bg-accent-gold text-dark-900 px-6 py-2 rounded font-semibold hover:bg-opacity-90">
                        Plan Your Stall
                      </button>
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
