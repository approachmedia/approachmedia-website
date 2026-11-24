'use client'

/**
 * The tradeshow calendar opening: the year set huge, with a build clip
 * playing inside the numerals (the page's dark ground multiplied over the
 * clip, so only the white letters let it through). Scrolling zooms into the
 * year until the clip fills the screen, then the calendar follows. The
 * pointer tilts the year a few degrees.
 *
 * Reduced motion: the year sits still with the clip paused inside it.
 */

import { useEffect, useRef, type ReactNode } from 'react'

const CLIP = 'exhibition-stall-av-technology-integration-01'

export default function YearZoomHero({ year, children }: { year: string; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLDivElement>(null)
  const mask = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const t = track.current, w = word.current, m = mask.current, c = copy.current
    if (!t || !w || !m || !c) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.current?.pause(); t.classList.add('is-still'); return
    }
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0
    const frame = () => {
      raf = 0
      const r = t.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0
      const z = Math.pow(p, 2.2)
      tilt.x += (tilt.tx - tilt.x) * 0.1
      tilt.y += (tilt.ty - tilt.y) * 0.1
      w.style.transform = `perspective(900px) rotateX(${(tilt.y * 8 * (1 - p)).toFixed(2)}deg) rotateY(${(tilt.x * -10 * (1 - p)).toFixed(2)}deg) scale(${(1 + z * 38).toFixed(3)})`
      m.style.opacity = String(Math.max(0, 1 - Math.max(0, p - 0.7) / 0.25))
      c.style.opacity = String(Math.max(0, 1 - p / 0.25))
      c.style.transform = `translate3d(0, ${(p * 80).toFixed(1)}px, 0)`
      if (Math.abs(tilt.tx - tilt.x) + Math.abs(tilt.ty - tilt.y) > 0.002) raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      tilt.tx = e.clientX / window.innerWidth - 0.5
      tilt.ty = e.clientY / window.innerHeight - 0.5
      kick()
    }
    frame()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick); window.removeEventListener('pointermove', onMove) }
  }, [])

  return (
    <section ref={track} className="yz">
      <div className="yz-stage">
        <video ref={video} className="yz-video" muted loop playsInline autoPlay preload="metadata" poster={`/services-flow/${CLIP}-poster.webp`} aria-hidden="true">
          <source src={`/services-flow/${CLIP}-m.mp4`} type="video/mp4" media="(max-width: 767px)" />
          <source src={`/services-flow/${CLIP}.webm`} type="video/webm" />
          <source src={`/services-flow/${CLIP}.mp4`} type="video/mp4" />
        </video>
        <div ref={mask} className="yz-mask" aria-hidden="true">
          <div ref={word} className="yz-year">{year}</div>
        </div>
        <div ref={copy} className="yz-copy container text-center">{children}</div>
      </div>
    </section>
  )
}
