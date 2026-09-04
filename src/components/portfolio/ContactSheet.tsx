'use client'

/**
 * ContactSheet — the case study's peak, and this build's signature move.
 *
 * The section pins and opens as a darkroom contact sheet: every photograph of
 * the build laid out small, dim and unlabelled. As the reader scrolls, one
 * frame at a time rises to full plate and takes its real caption, then settles
 * back into the sheet brighter than it left. The sheet develops as you go and
 * ends fully exposed, every frame captioned. By the bottom of the section the
 * reader has documented the stall out of the photographs of the stall.
 *
 * Everything on screen is the project's own data: the frame count is the real
 * image count and every caption is the real caption or alt text. Nothing here
 * is generated and nothing is invented.
 *
 * Progress comes from the engine, which sets the act's height, sticks the
 * stage and publishes --sc-p. This component only reads that number.
 *
 * Reduced motion drops the pin entirely rather than leaving a tall pinned
 * section with a static picture in it, which would be a blank gap to scroll
 * past. The attribute is removed before the engine ever mounts, so the section
 * becomes an ordinary grid of all the photographs, fully exposed.
 */

import Image from 'next/image'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type GalleryItem = {
  id: number
  src: string
  alt: string
  caption?: string | null
}

/** Scroll height per frame, in viewport-heights. */
const PER_FRAME = 0.62
const LEAD = 0.9

export default function ContactSheet({ items }: { items: GalleryItem[] }) {
  const actRef = useRef<HTMLElement>(null)
  const [i, setI] = useState(0)
  const [held, setHeld] = useState<number | null>(null)
  const [lit, setLit] = useState<GalleryItem | null>(null)
  const [flat, setFlat] = useState(false)

  const n = items.length
  const span = (LEAD + n * PER_FRAME).toFixed(2)

  // Strip the act before the engine mounts, so reduced motion never gets a
  // pinned section it cannot animate.
  useLayoutEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    actRef.current?.removeAttribute('data-sc-act')
    setFlat(true)
  }, [])

  // Progress is measured from the act's own rectangle rather than read from
  // the engine's --sc-p. The engine sets the height and sticks the stage,
  // which is what it is for, but its published progress sat at 0 for most of
  // a viewport at each end of this act and then ran all four frames through
  // the middle third. Measured here, the frames are evenly spread across the
  // whole pinned travel and neither end is dead scroll.
  useEffect(() => {
    if (flat) return
    const act = actRef.current
    if (!act) return
    let raf = 0
    let last = -1
    const read = () => {
      raf = 0
      const r = act.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      if (travel <= 0) return
      const p = Math.min(1, Math.max(0, -r.top / travel))
      // Spread n frames across the travel, holding the last one only briefly
      // at the very end so the section resolves rather than stopping dead.
      const k = Math.min(n - 1, Math.floor(p * n * 1.04))
      if (k !== last) { last = k; setI(k) }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [flat, n])

  useEffect(() => {
    if (!lit) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLit(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lit])

  const cur = held ?? i
  const frame = items[cur] ?? items[0]
  const label = frame?.caption || frame?.alt || ''

  const pick = useCallback((k: number) => setHeld(k), [])

  if (!n) return null

  // Reduced motion: every frame, exposed, in reading order.
  if (flat) {
    return (
      <div className="csheet csheet--flat">
        <ul className="csheet__all">
          {items.map(it => (
            <li key={it.id}>
              <button type="button" onClick={() => setLit(it)} aria-label={`View ${it.alt}`}>
                <Image src={it.src} alt={it.alt} width={1600} height={1067} sizes="(max-width: 760px) 100vw, 640px" />
              </button>
              {(it.caption || it.alt) && <p>{it.caption || it.alt}</p>}
            </li>
          ))}
        </ul>
        <Lightbox item={lit} onClose={() => setLit(null)} />
      </div>
    )
  }

  return (
    <section ref={actRef} className="csheet" data-sc-act="pin" data-sc-span={span}>
      <div className="sc-stage csheet__stage">

        {/* The plate: the frame currently being exposed. */}
        <figure className="csheet__plate">
          <button type="button" className="csheet__plateimg" onClick={() => frame && setLit(frame)}
                  aria-label={frame ? `View ${frame.alt}` : 'View photograph'}>
            {items.map((it, k) => (
              <Image key={it.id} src={it.src} alt={it.alt} fill priority={k === 0}
                     sizes="(max-width: 760px) 100vw, 62vw"
                     className={k === cur ? 'is-on' : undefined} />
            ))}
          </button>
          <figcaption>
            <span className="csheet__no">{String(cur + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <span className="csheet__cap">{label}</span>
          </figcaption>
        </figure>

        {/* The sheet: every frame, developing as the reader goes. */}
        <ul className="csheet__strip" aria-label="All photographs of this build">
          {items.map((it, k) => (
            <li key={it.id} className={`${k <= i ? 'is-developed' : ''} ${k === cur ? 'is-current' : ''}`.trim()}>
              <button type="button" onClick={() => pick(k)} aria-label={`Show ${it.alt}`} aria-current={k === cur}>
                <Image src={it.src} alt="" width={220} height={147} sizes="120px" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox item={lit} onClose={() => setLit(null)} />
    </section>
  )
}

function Lightbox({ item, onClose }: { item: GalleryItem | null; onClose: () => void }) {
  if (!item) return null
  return (
    <div className="csheet__lb" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.alt}>
      <button type="button" className="csheet__lbx" onClick={onClose} aria-label="Close">×</button>
      <figure onClick={e => e.stopPropagation()}>
        <Image src={item.src} alt={item.alt} width={1920} height={1280} sizes="92vw" />
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>
    </div>
  )
}
