'use client'

/**
 * Mounts the scrollcraft engine on the portfolio index.
 *
 * The index is the same grammar as the project pages, gallery / catalog, one
 * level up: the objects are the projects rather than the photographs of one
 * project. Each card reveals as it enters, and the filter bar is the index's
 * nav, held at the top of the screen so the collection can be jumped around
 * rather than only scrolled.
 *
 * The grid itself stays server-rendered. This only wraps it.
 */

import { useRef, type ReactNode } from 'react'
import { useScrollcraft } from '@/components/services/ServiceFlow'
import './portfolio-index.css'

export default function IndexFlow({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  useScrollcraft(root)
  return (
    <main ref={root} className="pfx max-w-7xl mx-auto px-4 py-20 space-y-16">
      {children}
    </main>
  )
}
