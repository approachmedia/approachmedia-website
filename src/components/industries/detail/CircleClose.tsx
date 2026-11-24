'use client'

/**
 * The closing enquiry. A project photograph from the sector opens from a
 * small circle to the full screen as the page scrolls, its centre leaning
 * toward the mouse, with the closing copy and button held on top. The copy
 * is server-rendered and readable at every point of the scroll. Reduced
 * motion, or no photograph: the copy over the full picture (or on its own).
 */

import { useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'

export default function CircleClose({ photo, children }: { photo: { src: string; alt: string } | null; children: ReactNode }) {
  const track = useRef<HTMLElement>(null)
  const disc = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const tr = track.current, d = disc.current
    if (!tr || !d) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { tr.classList.add('is-still'); return }
    tr.classList.add('is-armed')
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0
    const frame = () => {
      raf = 0
      const r = tr.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1
      ptr.x += (ptr.tx - ptr.x) * 0.1
      ptr.y += (ptr.ty - ptr.y) * 0.1
      const e = 1 - Math.pow(1 - Math.min(1, p / 0.8), 3)
      const rad = 7 + e * 78
      const cx = 50 + ptr.x * 10 * (1 - e), cy = 50 + ptr.y * 10 * (1 - e)
      d.style.clipPath = `circle(${rad.toFixed(2)}% at ${cx.toFixed(2)}% ${cy.toFixed(2)}%)`
      d.style.setProperty('--zoom', (1.25 - e * 0.25).toFixed(4))
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
    window.addEventListener('resize', kick)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', kick)
      window.removeEventListener('resize', kick)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return (
    <section ref={track} className={`icl ${photo ? '' : 'icl--plain'}`} data-no-reveal>
      <div className="icl-stage">
        {photo && (
          <div ref={disc} className="icl-disc" aria-hidden="true">
            <div className="icl-img"><Image src={photo.src} alt="" fill sizes="100vw" className="object-cover" /></div>
            <div className="icl-veil" />
          </div>
        )}
        <div className="icl-copy container-wide">{children}</div>
      </div>
    </section>
  )
}
