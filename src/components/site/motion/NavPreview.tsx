'use client'

/**
 * A moving preview under the pointer while it is over a link in the main
 * navigation: a small card that trails the cursor, leans with its speed, and
 * shows one of our own build clips for where the link goes. The still
 * appears at once; the clip loads only on hover and fades in over it when it
 * can play, so nothing is downloaded for visitors who never hover.
 *
 * Fine pointers and the desktop nav only. Skips the Events menu, which opens
 * its own panel, and does nothing under reduced motion or data saver.
 * Decorative: aria-hidden, and pointer-events none.
 */

import { useEffect, useRef } from 'react'

const CLIPS: Record<string, { clip: string; dir?: string; note: string }> = {
  '/': { clip: 'approach-media-corridor', dir: '/home-intro', note: 'Since 2002' },
  '/services': { clip: 'custom-exhibition-stand-design-india-01', note: 'Design to dismantle' },
  '/industries': { clip: 'pharma-exhibition-stall-design-02', note: 'Built for your sector' },
  '/portfolio': { clip: 'award-winning-stall-design-and-fabrication-agency-01', note: '6000+ stalls' },
  '/expos': { clip: 'custom-trade-show-booth-design-india-01', note: 'Upcoming expos' },
  '/tradeshow-calendar': { clip: 'exhibition-stall-av-technology-integration-01', note: 'Plan the year' },
  '/blog': { clip: 'award-winning-stall-design-and-fabrication-agency-02', note: 'From the workshop floor' },
  '/work-with-us': { clip: 'exhibition-stall-av-technology-integration-02', note: 'How we work' },
  '/contact': { clip: 'custom-exhibition-stand-design-india-01', note: "Let's talk" },
}

export default function NavPreview() {
  const card = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const still = useRef<HTMLImageElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = card.current, v = video.current, img = still.current, lab = label.current
    if (!el || !v || !img || !lab) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (conn?.saveData) return
    const nav = document.querySelector<HTMLElement>('header nav[aria-label="Primary"]')
    if (!nav) return
    const webm = v.canPlayType('video/webm; codecs="vp9"') !== ''

    const p = { x: 0, y: 0, tx: 0, ty: 0, r: 0 }
    let raf = 0
    let shown = false
    let current = ''

    const tick = () => {
      const dx = p.tx - p.x
      p.x += dx * 0.16
      p.y += (p.ty - p.y) * 0.16
      p.r += (Math.max(-9, Math.min(9, dx * 0.12)) - p.r) * 0.2
      el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.r.toFixed(2)}deg)`
      raf = shown || Math.abs(dx) > 0.3 ? requestAnimationFrame(tick) : 0
    }
    const show = (href: string) => {
      const c = CLIPS[href]
      if (!c) return hide()
      if (href !== current) {
        current = href
        const dir = c.dir ?? '/services-flow'
        img.src = `${dir}/${c.clip}-poster.webp`
        lab.textContent = c.note
        el.classList.remove('is-playing')
        v.src = `${dir}/${c.clip}.${webm ? 'webm' : 'mp4'}`
        v.play().catch(() => { /* the still stays */ })
      }
      if (!shown) { shown = true; p.x = p.tx; p.y = p.ty; el.classList.add('is-on') }
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const hide = () => {
      if (!shown) return
      shown = false
      el.classList.remove('is-on')
      v.pause()
    }
    const onPlaying = () => el.classList.add('is-playing')
    const onMove = (e: PointerEvent) => {
      p.tx = e.clientX + 22
      p.ty = e.clientY + 30
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]')
      if (!a || a.closest('.group') || a.getAttribute('aria-haspopup')) return hide()
      show(a.getAttribute('href') || '')
    }

    v.addEventListener('playing', onPlaying)
    nav.addEventListener('pointermove', onMove)
    nav.addEventListener('pointerleave', hide)
    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      v.removeEventListener('playing', onPlaying)
      nav.removeEventListener('pointermove', onMove)
      nav.removeEventListener('pointerleave', hide)
      window.removeEventListener('scroll', hide)
    }
  }, [])

  return (
    <div ref={card} className="am-navpv" aria-hidden="true">
      <div className="am-navpv-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={still} alt="" />
        <video ref={video} muted loop playsInline preload="none" />
        <span ref={label} className="am-navpv-note" />
      </div>
    </div>
  )
}
