'use client'

/**
 * The opening of an industry page.
 *
 *  - The headline rises word by word through masks, once, on load.
 *  - Beside it, the sector's own photographs (its cover from the industries
 *    set, then the hero photographs of its published projects) change every
 *    few seconds with a slatted wipe: the next photograph drops in through
 *    vertical blinds, alternate slats from above and below.
 *  - The photograph panel turns toward the mouse, its picture shifting the
 *    other way for depth.
 *  - The sector's name sits behind everything, huge and outlined, and drifts
 *    sideways as the page scrolls.
 *
 * Every word is the page's existing copy and is in the served HTML. The
 * cycle pauses off screen and in a background tab. Reduced motion: the first
 * photograph, still, and the headline in place.
 */

import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'

export type SectorShot = { src: string; alt: string }

const SLATS = 7
const HOLD = 4200
const WIPE = 700 + SLATS * 60
const SIZES = '(min-width: 1024px) 44vw, 100vw'

export default function SectorHero({
  name, headline, children, shots,
}: {
  name: string
  headline: string
  /** Tagline, intro and the two buttons, server-rendered. */
  children: ReactNode
  shots: SectorShot[]
}) {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const ghost = useRef<HTMLDivElement>(null)
  const [cur, setCur] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [go, setGo] = useState(false)
  const [cycling, setCycling] = useState(false)
  const curRef = useRef(0)
  const busy = useRef(false)

  // The cycle.
  useEffect(() => {
    const el = root.current
    if (!el || shots.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCycling(true)
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(el)
    const t = window.setInterval(() => {
      if (!visible || document.hidden || busy.current) return
      busy.current = true
      setGo(false)
      setNext((curRef.current + 1) % shots.length)
    }, HOLD)
    return () => { window.clearInterval(t); io.disconnect() }
  }, [shots.length])

  // Start the wipe once the incoming photograph has loaded (or after a beat,
  // so a slow image cannot stall the cycle), then settle it as the base.
  const ready = useCallback(() => requestAnimationFrame(() => setGo(true)), [])
  useEffect(() => {
    if (next === null) return
    const fallback = window.setTimeout(() => setGo(true), 1500)
    return () => window.clearTimeout(fallback)
  }, [next])
  useEffect(() => {
    if (!go || next === null) return
    const t = window.setTimeout(() => {
      curRef.current = next
      setCur(next)
      setNext(null)
      setGo(false)
      busy.current = false
    }, WIPE)
    return () => window.clearTimeout(t)
  }, [go, next])

  // Pointer tilt and the drifting name.
  useEffect(() => {
    const el = root.current, st = stage.current, gh = ghost.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ptr = { x: 0, y: 0 }
    let raf = 0
    const frame = () => {
      raf = 0
      if (st) st.style.transform = `perspective(1100px) rotateY(${(ptr.x * 9).toFixed(2)}deg) rotateX(${(-ptr.y * 7).toFixed(2)}deg)`
      if (st) st.style.setProperty('--px', `${(-ptr.x * 14).toFixed(1)}px`)
      if (st) st.style.setProperty('--py', `${(-ptr.y * 10).toFixed(1)}px`)
      if (gh) gh.style.transform = `translate3d(${(-window.scrollY * 0.35 + ptr.x * -24).toFixed(1)}px, 0, 0)`
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      ptr.x = (e.clientX - r.left) / r.width - 0.5
      ptr.y = (e.clientY - r.top) / r.height - 0.5
      kick()
    }
    const onLeave = () => { ptr.x = 0; ptr.y = 0; kick() }
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', kick, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', kick)
    }
  }, [])

  const words = headline.split(' ')

  return (
    <section ref={root} className="idh" data-no-reveal>
      <div ref={ghost} className="idh-ghost" aria-hidden="true">{name}</div>
      <div className={`container-wide idh-grid ${shots.length ? '' : 'idh-grid--solo'}`}>
        <div className="idh-copy">
          <h1 className="idh-h1">
            {words.map((w, i) => (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className="idh-mask"><span className="idh-word" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>{w}</span></span>
              </Fragment>
            ))}
          </h1>
          <div className="idh-rest">{children}</div>
        </div>

        {shots.length > 0 && (
          <div className="idh-stage-wrap">
            <div ref={stage} className="idh-stage" data-own-cursor>
              {shots.map((s, i) => (
                <div key={s.src} className={`idh-shot ${i === cur ? 'is-cur' : ''}`}>
                  <Image src={s.src} alt={i === 0 ? s.alt : ''} fill sizes={SIZES} priority={i === 0} className="object-cover" />
                </div>
              ))}
              {next !== null && (
                <div className={`idh-slats ${go ? 'is-go' : ''}`} aria-hidden="true">
                  {Array.from({ length: SLATS }, (_, i) => (
                    <div key={i} className="idh-slat" style={{ '--i': i, left: `${(i * 100) / SLATS}%`, width: `${100 / SLATS}%` } as CSSProperties}>
                      <div className="idh-slat-img" style={{ left: `${-i * 100}%`, width: `${SLATS * 100}%` }}>
                        <Image src={shots[next].src} alt="" fill sizes={SIZES} className="object-cover" onLoad={i === 0 ? ready : undefined} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="idh-sheen" aria-hidden="true" />
              {cycling && <div className="idh-bar" aria-hidden="true"><span key={cur} /></div>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
