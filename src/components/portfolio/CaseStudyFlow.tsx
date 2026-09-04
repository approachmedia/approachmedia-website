'use client'

/**
 * Mounts the scrollcraft engine once on the case study article.
 *
 * The page itself stays server-rendered: this component only wraps it and
 * annotates nothing. Every heading, paragraph and link is in the first byte of
 * HTML, so a crawler or a visitor without JavaScript reads the whole case
 * study with no motion and nothing hidden.
 */

import { useRef, type ReactNode } from 'react'
import { useScrollcraft } from '@/components/services/ServiceFlow'

export default function CaseStudyFlow({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  useScrollcraft(root)
  return <article ref={root} className="cs">{children}</article>
}
