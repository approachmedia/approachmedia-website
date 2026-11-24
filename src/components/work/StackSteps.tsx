'use client'

/**
 * The six steps as full-width cards that stack. Each card sticks a little
 * lower than the one before; as the next one slides over it, the card
 * underneath shrinks and dims, so the steps pile up like a deck you are
 * dealing. Each card carries one of our build clips, and only the card on
 * top plays. The pointer moves the clip inside its frame a few pixels.
 *
 * Phones keep the stack (it is vertical scrolling, nothing pinned sideways)
 * with the clip above the text. Reduced motion: a plain list, clips paused.
 */

import { useEffect, useRef } from 'react'

export type Step = { num: string; title: string; body: string }

const CLIPS = [
  'exhibition-stall-design-company-ahmedabad-01',
  'award-winning-stall-design-and-fabrication-agency-03',
  'custom-exhibition-stand-design-india-01',
  'exhibition-stall-design-and-fabrication-01',
  'custom-trade-show-booth-design-india-04',
  'real-estate-exhibition-stall-design-01',
]

export default function StackSteps({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.ws-card'))
    const videos = cards.map(c => c.querySelector('video'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-still'); videos.forEach(v => v?.pause()); return
    }
    let raf = 0
    let top = -1
    const apply = () => {
      raf = 0
      const rects = cards.map(c => c.getBoundingClientRect())
      cards.forEach((c, i) => {
        // How far the following card has travelled over this one (0..1).
        const next = rects[i + 1]
        const cover = next ? Math.min(1, Math.max(0, (rects[i].bottom - next.top) / rects[i].height)) : 0
        const inner = c.firstElementChild as HTMLElement
        inner.style.transform = `scale(${(1 - cover * 0.08).toFixed(4)})`
        inner.style.filter = `brightness(${(1 - cover * 0.45).toFixed(3)})`
      })
      // The top of the pile: the last card whose top has reached its sticky line.
      let cur = 0
      cards.forEach((c, i) => { if (rects[i].top <= parseFloat(getComputedStyle(c).top) + 2) cur = i })
      if (cur !== top) {
        top = cur
        videos.forEach((v, i) => { if (!v) return; if (i === cur) { v.preload = 'auto'; v.play().catch(() => {}) } else v.pause() })
      }
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply) }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const v = videos[top]
      if (!v) return
      const r = v.parentElement!.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * -14
      const y = ((e.clientY - r.top) / r.height - 0.5) * -10
      v.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(1.06)`
    }
    apply()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    el.addEventListener('pointermove', onMove)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); el.removeEventListener('pointermove', onMove) }
  }, [])

  return (
    <ol ref={root} className="ws" data-no-reveal>
      {steps.map((s, i) => (
        <li key={s.num} className="ws-card" style={{ top: `calc(110px + ${i * 18}px)` }}>
          <div className="ws-inner">
            <div className="ws-copy">
              <span className="ws-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
            <div className="ws-media" aria-hidden="true">
              <video muted loop playsInline preload={i === 0 ? 'metadata' : 'none'} poster={`/services-flow/${CLIPS[i % CLIPS.length]}-poster.webp`}>
                <source src={`/services-flow/${CLIPS[i % CLIPS.length]}.webm`} type="video/webm" />
                <source src={`/services-flow/${CLIPS[i % CLIPS.length]}.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}
