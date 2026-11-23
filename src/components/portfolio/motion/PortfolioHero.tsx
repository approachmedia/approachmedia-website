'use client'

/**
 * The opening of the portfolio index and its filter pages.
 *
 * The h1 rises in word by word through masks on load (once). Under it, two
 * bands of the listed projects' own photographs travel sideways in opposite
 * directions as the page scrolls: the scroll is the only thing moving them,
 * so they stop when the reader stops. Copy arrives as props and is rendered
 * as given.
 *
 * Choreography: the headline is the lead (words 70ms apart, 0.9s rise on
 * the strong ease-out), the lede and children follow as one beat at 0.55s,
 * the photo bands are static until scrolled. Reduced motion: everything is
 * in place on first paint and the bands do not move.
 */

import { Fragment, useEffect, useRef, type ReactNode } from 'react'
import '../portfolio-index.css'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1] as const

export type HeroLine = { text: string; accent?: boolean }
export type HeroPhoto = { src: string }

function Band({ photos, dir }: { photos: HeroPhoto[]; dir: 1 | -1 }) {
  return (
    <div className="pfx-band-row" data-dir={dir}>
      {photos.map((p, i) => (
        <div key={i} className="pfx-band-tile">
          <Image src={p.src} alt="" fill sizes="340px" className="object-cover" />
        </div>
      ))}
    </div>
  )
}

export default function PortfolioHero({
  eyebrow, tone = 'green', lines, photos, children,
}: {
  eyebrow: string
  tone?: 'green' | 'blue'
  lines: HeroLine[]
  photos: HeroPhoto[]
  children?: ReactNode
}) {
  const reduce = useReducedMotion()
  const bandRef = useRef<HTMLDivElement>(null)

  // Scroll-linked travel: one listener, transforms written straight to the
  // two rows, only while the band is near the screen.
  useEffect(() => {
    const band = bandRef.current
    if (!band || reduce) return
    const rows = Array.from(band.querySelectorAll<HTMLElement>('.pfx-band-row'))
    let raf = 0
    const apply = () => {
      raf = 0
      const r = band.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < -100 || r.top > vh + 100) return
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      const travel = Math.min(520, window.innerWidth * 0.35)
      rows.forEach(row => {
        const dir = Number(row.dataset.dir)
        row.style.transform = `translate3d(${((p - 0.5) * travel * dir - travel / 2).toFixed(1)}px, 0, 0)`
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduce])

  // Enough tiles per row to cover the widest screen plus the travel, by
  // repeating the set when a filter page has only a few projects.
  const fill = (list: HeroPhoto[]) => {
    if (list.length === 0) return list
    const out: HeroPhoto[] = []
    while (out.length < 9) out.push(...list)
    return out.slice(0, Math.max(9, list.length))
  }
  const half = Math.ceil(photos.length / 2)
  const rowA = fill(photos.slice(0, half))
  const rowB = fill(photos.slice(half).length ? photos.slice(half) : [...photos].reverse())

  let word = 0

  return (
    <header className="pfx-hero">
      <div className="pfx-glow" aria-hidden="true" />
      <div className="pfx-wrap pfx-hero-copy">
        <motion.p
          className={`pfx-pill pfx-pill--${tone}`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="pfx-pill-dot" aria-hidden="true" />
          {eyebrow}
        </motion.p>

        <h1 className="pfx-h1">
          {lines.map((line, li) => (
            <span key={li} className={`pfx-line ${line.accent ? 'pfx-accent' : ''}`}>
              {line.text.split(' ').map((w, wi) => {
                const i = word++
                return (
                  <Fragment key={wi}>
                    {wi > 0 && ' '}
                    <span className="pfx-mask">
                      <motion.span
                        className="pfx-word"
                        initial={reduce ? false : { y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: EASE }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  </Fragment>
                )
              })}
              {li < lines.length - 1 && ' '}
            </span>
          ))}
        </h1>

        <motion.div
          className="pfx-lede"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>

      {photos.length > 0 && (
        <div ref={bandRef} className="pfx-band" aria-hidden="true">
          <Band photos={rowA} dir={-1} />
          <Band photos={rowB} dir={1} />
        </div>
      )}
    </header>
  )
}
