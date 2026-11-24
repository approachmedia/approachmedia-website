'use client'

/**
 * A moving background for an inner page's hero: one of the site's own build
 * clips, muted and looping, behind the hero copy. Two kinds of depth, after
 * style 11 (parallax layers): the clip drifts down at a third of the scroll
 * speed as the page moves, and leans a few pixels toward the pointer, so the
 * copy and the picture separate as the visitor moves.
 *
 * The clip is picked from the pathname, so neighbouring pages differ but any
 * one page always shows the same clip. Phones get the mobile encode. Data
 * saver, reduced motion or a refused autoplay leave the poster still.
 * Decorative: aria-hidden, behind a veil that keeps the copy readable.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const CLIPS = [
  'custom-exhibition-stand-design-india-01',
  'award-winning-stall-design-and-fabrication-agency-01',
  'award-winning-stall-design-and-fabrication-agency-02',
  'custom-trade-show-booth-design-india-01',
  'exhibition-stall-av-technology-integration-01',
  'exhibition-stall-av-technology-integration-02',
  'pharma-exhibition-stall-design-02',
]

function pick(path: string) {
  let h = 0
  for (let i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) >>> 0
  return CLIPS[h % CLIPS.length]
}

export default function HeroMedia({ clip, opacity = 0.32 }: { clip?: string; opacity?: number }) {
  const pathname = usePathname()
  const name = clip ?? pick(pathname)
  const layer = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = layer.current
    const v = video.current
    if (!el || !v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (reduce || conn?.saveData) { v.pause(); v.removeAttribute('autoplay'); return }
    v.play().catch(() => { /* autoplay refused: the poster stays */ })

    const hero = el.parentElement!
    let raf = 0
    const m = { x: 0, y: 0, tx: 0, ty: 0 }
    const apply = () => {
      raf = 0
      const r = hero.getBoundingClientRect()
      if (r.bottom < 0) return
      const scrolled = Math.max(0, -r.top)
      m.x += (m.tx - m.x) * 0.12
      m.y += (m.ty - m.y) * 0.12
      el.style.transform = `translate3d(${m.x.toFixed(1)}px, ${(scrolled * 0.33 + m.y).toFixed(1)}px, 0) scale(1.08)`
      if (Math.abs(m.tx - m.x) > 0.2 || Math.abs(m.ty - m.y) > 0.2) raf = requestAnimationFrame(apply)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply) }
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect()
      m.tx = ((e.clientX - r.left) / r.width - 0.5) * -18
      m.ty = ((e.clientY - r.top) / r.height - 0.5) * -12
      kick()
    }
    window.addEventListener('scroll', kick, { passive: true })
    if (fine) hero.addEventListener('pointermove', onMove)
    kick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      hero.removeEventListener('pointermove', onMove)
    }
  }, [name])

  return (
    <div aria-hidden="true" className="am-hero-media">
      <div ref={layer} className="am-hero-media-layer">
        <video
          ref={video}
          key={name}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster={`/services-flow/${name}-poster.webp`}
          style={{ opacity }}
        >
          <source src={`/services-flow/${name}-m.mp4`} type="video/mp4" media="(max-width: 767px)" />
          <source src={`/services-flow/${name}.webm`} type="video/webm" />
          <source src={`/services-flow/${name}.mp4`} type="video/mp4" />
        </video>
      </div>
      <div className="am-hero-media-veil" />
    </div>
  )
}
