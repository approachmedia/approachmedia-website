'use client'

/**
 * A full-screen pause between the showreel and the rest of the page: the
 * brand's own line, "In an ocean of lookalikes, those who stand apart will
 * survive.", builds word by word as the page scrolls, over a build clip that
 * slowly pulls back. The last two words take the brand gradient. The pointer
 * drifts the clip. Reduced motion: the line in full, the clip paused.
 */

import { useEffect, useRef } from 'react'

const LINE = 'In an ocean of lookalikes, those who stand apart will survive.'
const CLIP = 'award-winning-stall-design-and-fabrication-agency-02'

export default function OceanStatement() {
  const track = useRef<HTMLElement>(null)
  const clip = useRef<HTMLVideoElement>(null)
  const words = LINE.split(' ')

  useEffect(() => {
    const tr = track.current, v = clip.current
    if (!tr || !v) return
    const spans = Array.from(tr.querySelectorAll<HTMLElement>('.os-w'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause(); spans.forEach(s => { s.style.opacity = '1' }); return
    }
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0
    let playing = false
    const frame = () => {
      raf = 0
      const r = tr.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0
      const onScreen = r.top < window.innerHeight && r.bottom > 0
      if (onScreen !== playing) { playing = onScreen; if (onScreen) v.play().catch(() => {}); else v.pause() }
      ptr.x += (ptr.tx - ptr.x) * 0.08
      ptr.y += (ptr.ty - ptr.y) * 0.08
      v.style.transform = `translate3d(${(ptr.x * 20).toFixed(1)}px, ${(ptr.y * 14).toFixed(1)}px, 0) scale(${(1.3 - p * 0.25).toFixed(4)})`
      const n = spans.length
      spans.forEach((s, i) => {
        const a = Math.min(1, Math.max(0, (p * 1.45 - i / n) * n / 2.2))
        s.style.opacity = (0.1 + a * 0.9).toFixed(3)
        s.style.transform = `translate3d(0, ${((1 - a) * 0.35).toFixed(3)}em, 0)`
        s.style.filter = a < 1 ? `blur(${((1 - a) * 6).toFixed(2)}px)` : ''
      })
      if (Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) > 0.002) raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      ptr.tx = e.clientX / window.innerWidth - 0.5
      ptr.ty = e.clientY / window.innerHeight - 0.5
      kick()
    }
    frame()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick); window.removeEventListener('pointermove', onMove) }
  }, [])

  return (
    <section ref={track} className="os" data-no-reveal aria-label="In an ocean of lookalikes">
      <div className="os-stage">
        <video ref={clip} className="os-clip" muted loop playsInline preload="metadata" poster={`/services-flow/${CLIP}-poster.webp`} aria-hidden="true">
          <source src={`/services-flow/${CLIP}-m.mp4`} type="video/mp4" media="(max-width: 767px)" />
          <source src={`/services-flow/${CLIP}.webm`} type="video/webm" />
          <source src={`/services-flow/${CLIP}.mp4`} type="video/mp4" />
        </video>
        <div className="os-veil" aria-hidden="true" />
        <div className="os-line container-wide">
          <p>
            {words.map((w, i) => (
              <span key={i} className={`os-w ${i >= words.length - 2 ? 'os-accent' : ''}`}>{w}{i < words.length - 1 ? ' ' : ''}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
