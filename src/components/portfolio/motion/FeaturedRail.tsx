'use client'

/**
 * Featured projects as a pinned rail. On a wide screen the section holds
 * still under the header while vertical scrolling carries the row of
 * featured stalls sideways, each photograph drifting against its frame in
 * the opposite direction. When the row fits on screen there is nothing to
 * pan and it is a plain row. On a phone it is a native swipe row with snap
 * points, which a thumb already knows how to use.
 *
 * Plain data in, so nothing non-serialisable crosses from the server.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import '../portfolio-index.css'

export type RailItem = {
  slug: string
  title: string
  img: string | null
  alt: string
  industry: string | null
  year: number | null
  type: string | null
}

export default function FeaturedRail({ heading, items }: { heading: string; items: RailItem[] }) {
  const sec = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [pan, setPan] = useState(0)

  useEffect(() => {
    const s = sec.current
    const t = track.current
    if (!s || !t) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const measure = () => {
      const wide = window.innerWidth >= 768 && !reduce
      setPan(wide ? Math.max(0, t.scrollWidth - t.parentElement!.clientWidth) : 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    const s = sec.current
    const t = track.current
    if (!s || !t) return
    if (pan <= 0) { t.style.transform = ''; return }
    const imgs = Array.from(t.querySelectorAll<HTMLElement>('.pfx-rail-img img'))
    let raf = 0
    const apply = () => {
      raf = 0
      const r = s.getBoundingClientRect()
      const scrollable = r.height - window.innerHeight
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, scrollable)))
      t.style.transform = `translate3d(${(-p * pan).toFixed(1)}px, 0, 0)`
      imgs.forEach(img => img.style.setProperty('--px', `${(p * 6 - 3).toFixed(2)}%`))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [pan])

  return (
    <section
      ref={sec}
      className={`pfx-rail ${pan > 0 ? 'is-pinned' : ''}`}
      style={pan > 0 ? { height: `calc(100vh + ${pan}px)` } : undefined}
    >
      <div className="pfx-rail-stick">
        <div className="pfx-wrap">
          <h2 className="pfx-label pfx-label--gold">{heading}</h2>
        </div>
        <div className="pfx-rail-view">
          <div ref={track} className="pfx-rail-track">
            {items.map(p => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="pfx-rail-card group">
                <div className="pfx-rail-img">
                  {p.img && <Image src={p.img} alt={p.alt} fill sizes="(min-width: 768px) 44vw, 82vw" className="object-cover" />}
                </div>
                <div className="pfx-rail-shade" aria-hidden="true" />
                {p.type && <span className="pfx-rail-type">{p.type}</span>}
                <span className="pfx-rail-arrow" aria-hidden="true"><ArrowUpRight /></span>
                <div className="pfx-rail-copy">
                  <p className="pfx-rail-meta">
                    <span>{p.industry || 'Exhibition Design'}</span>
                    {p.year && <span>{p.year}</span>}
                  </p>
                  <h3 className="pfx-rail-title"><span>{p.title}</span></h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
