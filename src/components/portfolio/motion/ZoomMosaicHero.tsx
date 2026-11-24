'use client'

/**
 * The portfolio index opening: a build clip fills the screen behind the
 * headline, and as the page scrolls it shrinks into the centre tile of a
 * 3x3 mosaic of project photographs, the other eight flying in from beyond
 * the edges to meet it. Once assembled, the tiles shift toward the pointer,
 * each by a different depth, so the wall feels layered.
 *
 * One sticky stage, one scroll listener, transforms written straight to the
 * tiles. Reduced motion: the assembled mosaic, still, with the headline
 * above it. All copy is in the served HTML.
 */

import { Fragment, useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import '../portfolio-index.css'

export type MosaicPhoto = { src: string; alt: string }

const CLIP = 'award-winning-stall-design-and-fabrication-agency-01'
const DEPTH = [0.9, 0.5, 1.1, 0.6, 0, 0.8, 1.2, 0.4, 1]
const ease = (t: number) => 1 - Math.pow(1 - t, 3)

export default function ZoomMosaicHero({
  eyebrow, lines, photos, children,
}: {
  eyebrow: string
  lines: { text: string; accent?: boolean }[]
  photos: MosaicPhoto[]
  children?: ReactNode
}) {
  const track = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const veil = useRef<HTMLDivElement>(null)

  // Eight photographs around the clip; repeat the set if there are fewer.
  const ring: MosaicPhoto[] = []
  for (let i = 0; ring.length < 8 && photos.length; i++) ring.push(photos[i % photos.length])

  useEffect(() => {
    const t = track.current, g = grid.current, c = copy.current
    if (!t || !g || !c) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tiles = Array.from(g.children) as HTMLElement[]
    if (reduce) { t.classList.add('is-still'); g.querySelector('video')?.pause(); return }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let raf = 0
    const frame = () => {
      raf = 0
      const r = t.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1
      const q = ease(Math.min(1, p / 0.75))
      mouse.x += (mouse.tx - mouse.x) * 0.1
      mouse.y += (mouse.ty - mouse.y) * 0.1
      const center = tiles[4]
      const cw = center.offsetWidth, ch = center.offsetHeight
      const cover = Math.max(window.innerWidth / cw, window.innerHeight / ch) * 1.04
      const gw = g.offsetWidth, gh = g.offsetHeight
      tiles.forEach((tile, i) => {
        const d = DEPTH[i] * q
        const mx = mouse.x * d * 14, my = mouse.y * d * 10
        if (i === 4) {
          const s = cover + (1 - cover) * q
          tile.style.transform = `translate3d(${mx}px, ${my}px, 0) scale(${s.toFixed(4)})`
          tile.style.borderRadius = `${(14 * q).toFixed(1)}px`
          return
        }
        // Offset from the stage centre, pushed out beyond the viewport at p=0.
        const ox = tile.offsetLeft + tile.offsetWidth / 2 - gw / 2
        const oy = tile.offsetTop + tile.offsetHeight / 2 - gh / 2
        const push = (1 - q) * 1.6
        tile.style.transform = `translate3d(${(ox * push + mx).toFixed(1)}px, ${(oy * push + my).toFixed(1)}px, 0) scale(${(0.8 + 0.2 * q).toFixed(3)})`
        tile.style.opacity = q.toFixed(3)
      })
      c.style.opacity = String(Math.max(0, 1 - p / 0.35))
      // The veil is for the copy over the full-screen clip; it leaves with it.
      if (veil.current) veil.current.style.opacity = String(Math.max(0, 1 - p / 0.4))
      c.style.transform = `translate3d(0, ${(-p * 120).toFixed(1)}px, 0)`
      if (Math.abs(mouse.tx - mouse.x) > 0.002 || Math.abs(mouse.ty - mouse.y) > 0.002) raf = requestAnimationFrame(frame)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      mouse.tx = e.clientX / window.innerWidth - 0.5
      mouse.ty = e.clientY / window.innerHeight - 0.5
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

  let w = 0
  return (
    <header ref={track} className="pzm">
      <div className="pzm-stage">
        <div ref={grid} className="pzm-grid" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className={`pzm-tile ${i === 4 ? 'pzm-tile--clip' : ''}`}>
              {i === 4 ? (
                <video muted loop playsInline autoPlay preload="metadata" poster={`/services-flow/${CLIP}-poster.webp`}>
                  <source src={`/services-flow/${CLIP}-m.mp4`} type="video/mp4" media="(max-width: 767px)" />
                  <source src={`/services-flow/${CLIP}.webm`} type="video/webm" />
                  <source src={`/services-flow/${CLIP}.mp4`} type="video/mp4" />
                </video>
              ) : ring[i < 4 ? i : i - 1] ? (
                <Image src={ring[i < 4 ? i : i - 1].src} alt="" fill sizes="(min-width: 768px) 30vw, 33vw" className="object-cover" />
              ) : null}
            </div>
          ))}
        </div>
        <div ref={veil} className="pzm-veil" aria-hidden="true" />
        <div ref={copy} className="pzm-copy pfx-wrap">
          <p className="pfx-pill pfx-pill--green"><span className="pfx-pill-dot" aria-hidden="true" />{eyebrow}</p>
          <h1 className="pfx-h1">
            {lines.map((l, li) => (
              <span key={li} className={`pfx-line ${l.accent ? 'pfx-accent' : ''}`}>
                {l.text.split(' ').map((word, wi) => {
                  const i = w++
                  return (
                    <Fragment key={wi}>
                      {wi > 0 && ' '}
                      <span className="pfx-mask"><span className="pfx-word pzm-word" style={{ animationDelay: `${0.1 + i * 0.07}s` }}>{word}</span></span>
                    </Fragment>
                  )
                })}
                {li < lines.length - 1 && ' '}
              </span>
            ))}
          </h1>
          <div className="pfx-lede">{children}</div>
        </div>
      </div>
    </header>
  )
}
