'use client'

/**
 * The expo list as month chapters. Each month's name sits large and
 * outlined in a sticky column and fills with the brand gradient as the page
 * scrolls through that month's shows. Hovering a show brings up a
 * photograph of one of our stalls from that sector, trailing the cursor and
 * crossfading as you move down the list. Phones show the photograph as a
 * thumbnail in each row instead.
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export type ChapterExpo = { slug: string; title: string; venue: string; city: string; tag: string; color: string; image: string }
export type Chapter = { month: string; year: string; expos: ChapterExpo[] }

export default function ExpoChapters({ chapters }: { chapters: Chapter[] }) {
  const root = useRef<HTMLDivElement>(null)
  const float = useRef<HTMLDivElement>(null)

  // Month fill: progress through each chapter.
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const chs = Array.from(el.querySelectorAll<HTMLElement>('.exm-chapter'))
    let raf = 0
    const apply = () => {
      raf = 0
      const vh = window.innerHeight
      chs.forEach(ch => {
        const r = ch.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) return
        const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / Math.max(1, r.height)))
        ch.style.setProperty('--fill', p.toFixed(3))
      })
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    window.addEventListener('scroll', kick, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick) }
  }, [])

  // Floating preview.
  useEffect(() => {
    const el = root.current, f = float.current
    if (!el || !f) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const imgs = new Map<string, HTMLImageElement>()
    const show = (src: string) => {
      let img = imgs.get(src)
      if (!img) { img = document.createElement('img'); img.src = src; img.alt = ''; f.appendChild(img); imgs.set(src, img) }
      imgs.forEach(i => i.classList.toggle('is-on', i === img))
    }
    const p = { x: 0, y: 0, tx: 0, ty: 0, vx: 0 }
    let raf = 0
    const tick = () => {
      const nx = p.x + (p.tx - p.x) * 0.16
      p.vx = nx - p.x
      p.x = nx; p.y += (p.ty - p.y) * 0.16
      f.style.transform = `translate3d(${p.x + 28}px, ${p.y - 110}px, 0) rotate(${Math.max(-8, Math.min(8, p.vx * 0.6)).toFixed(2)}deg)`
      raf = Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e: PointerEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>('[data-img]')
      p.tx = e.clientX; p.ty = e.clientY
      if (!f.classList.contains('is-on')) { p.x = p.tx; p.y = p.ty }
      if (a) { show(a.dataset.img!); f.classList.add('is-on') } else f.classList.remove('is-on')
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onLeave = () => f.classList.remove('is-on')
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave) }
  }, [])

  return (
    <div ref={root} data-own-cursor>
      {chapters.map(ch => (
        <section key={ch.month + ch.year} className="exm-chapter" aria-label={`${ch.month} ${ch.year}`}>
          <div className="exm-month">
            <h3 className="exm-month-word">{ch.month}</h3>
            <span className="exm-month-year">{ch.year}</span>
          </div>
          <ul className="exm-list">
            {ch.expos.map(e => (
              <li key={e.slug} className="exm-item">
                <Link href={`/expos/${e.slug}`} data-img={e.image}>
                  <span className="exm-thumb" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </span>
                  <span className="exm-item-title">{e.title}</span>
                  <span className="exm-item-meta">{e.venue} · {e.city}</span>
                  <span className="exm-item-tag" style={{ color: e.color }}><i aria-hidden="true" />{e.tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <div ref={float} className="exm-float" aria-hidden="true" />
    </div>
  )
}
