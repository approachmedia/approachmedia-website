'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function InsightsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/blog?limit=12')
      const data = await response.json()
      setPosts(data.posts)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Insights & Blog</h1>
          <p className="text-dark-200">Exhibition design trends, strategy, and industry insights</p>
        </div>
      </header>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <p className="text-center text-dark-600">Loading articles...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-dark-600">No articles yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/insights/${post.slug}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                  {post.featuredImage && (
                    <div className="bg-dark-200 h-48 flex items-center justify-center">
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-accent-gold uppercase">{post.category}</span>
                      <span className="text-xs text-dark-500">By {post.author}</span>
                    </div>
                    <h3 className="text-xl font-bold text-dark-900 mb-2">{post.title}</h3>
                    <p className="text-dark-600 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs bg-dark-100 text-dark-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
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
