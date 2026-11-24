'use client'

/**
 * A quiet moving background for a section lower down a page (a closing call
 * to action, a statement band): one of the site's own build clips, muted and
 * looping, behind the copy.
 *
 * Unlike HeroMedia this is built for sections far below the fold:
 *   - nothing is downloaded until the section is within a screen of view
 *   - it plays only while on screen and pauses when it leaves
 *   - the picture pushes in slowly as the section crosses the screen, and
 *     leans a few pixels toward the pointer
 * Data saver and reduced motion leave the poster still. Decorative:
 * aria-hidden, under a veil that keeps the copy readable.
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const CLIPS = [
  'award-winning-stall-design-and-fabrication-agency-02',
  'custom-trade-show-booth-design-india-01',
  'exhibition-stall-av-technology-integration-02',
  'custom-exhibition-stand-design-india-01',
  'pharma-exhibition-stall-design-02',
  'award-winning-stall-design-and-fabrication-agency-01',
  'exhibition-stall-av-technology-integration-01',
]

function pick(path: string) {
  let h = 7
  for (let i = 0; i < path.length; i++) h = (h * 33 + path.charCodeAt(i)) >>> 0
  return CLIPS[h % CLIPS.length]
}

export default function AmbientVideo({ clip, opacity = 0.34, veil = 'center' }: { clip?: string; opacity?: number; veil?: 'center' | 'left' }) {
  const pathname = usePathname()
  const name = clip ?? pick(pathname)
  const root = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = root.current, lay = layer.current, v = video.current
    if (!el || !lay || !v) return
    const host = el.parentElement!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const still = reduce || !!conn?.saveData
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    let loaded = false
    let onScreen = false
    let raf = 0
    const m = { x: 0, y: 0, tx: 0, ty: 0 }

    const load = () => {
      if (loaded) return
      loaded = true
      const phone = window.matchMedia('(max-width: 767px)').matches
      const webm = v.canPlayType('video/webm; codecs="vp9"') !== ''
      v.src = phone ? `/services-flow/${name}-m.mp4` : `/services-flow/${name}.${webm ? 'webm' : 'mp4'}`
    }
    const apply = () => {
      raf = 0
      if (!onScreen) return
      const r = host.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 as the section's top meets the bottom of the screen, 1 as it leaves
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      m.x += (m.tx - m.x) * 0.1
      m.y += (m.ty - m.y) * 0.1
      lay.style.transform = `translate3d(${m.x.toFixed(1)}px, ${((p - 0.5) * -60 + m.y).toFixed(1)}px, 0) scale(${(1.08 + p * 0.1).toFixed(4)})`
      if (Math.abs(m.tx - m.x) > 0.2 || Math.abs(m.ty - m.y) > 0.2) raf = requestAnimationFrame(apply)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply) }
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      m.tx = ((e.clientX - r.left) / r.width - 0.5) * -22
      m.ty = ((e.clientY - r.top) / r.height - 0.5) * -14
      kick()
    }

    const near = new IntersectionObserver(es => {
      if (es.some(e => e.isIntersecting) && !still) { load(); near.disconnect() }
    }, { rootMargin: '100% 0px' })
    const seen = new IntersectionObserver(es => {
      onScreen = es.some(e => e.isIntersecting)
      el.classList.toggle('is-on', onScreen)
      if (still) return
      if (onScreen) { load(); v.play().catch(() => { /* autoplay refused: the poster stays */ }); kick() }
      else v.pause()
    }, { threshold: 0.05 })
    near.observe(host)
    seen.observe(host)

    if (!still) {
      window.addEventListener('scroll', kick, { passive: true })
      if (fine) host.addEventListener('pointermove', onMove)
    }
    return () => {
      near.disconnect(); seen.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      host.removeEventListener('pointermove', onMove)
    }
  }, [name])

  return (
    <div ref={root} aria-hidden="true" className={`am-ambient am-ambient--${veil}`}>
      <div ref={layer} className="am-ambient-layer">
        <video ref={video} key={name} muted loop playsInline preload="none" poster={`/services-flow/${name}-poster.webp`} style={{ opacity }} />
      </div>
      <div className="am-ambient-veil" />
    </div>
  )
}
