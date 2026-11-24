'use client'

/**
 * A departure board for the next shows: date, show and city in monospace
 * rows. Each row's characters cycle through random letters and settle into
 * the real text, staggered down the board, when it first comes on screen;
 * hovering a row flips it again. The real text is in the served HTML (the
 * scramble only runs after mount), and reduced motion leaves it alone.
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function scramble(el: HTMLElement, delay = 0) {
  const spans = Array.from(el.querySelectorAll<HTMLElement>('[data-flip]'))
  spans.forEach(span => {
    const final = span.dataset.flip!
    const start = performance.now() + delay
    const dur = 380 + final.length * 22
    const tick = (now: number) => {
      const t = (now - start) / dur
      if (t < 0) { requestAnimationFrame(tick); return }
      const settled = Math.floor(Math.min(1, t) * final.length)
      let out = ''
      for (let i = 0; i < final.length; i++) {
        const c = final[i]
        out += i < settled || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      span.textContent = out
      if (t < 1) requestAnimationFrame(tick)
      else span.textContent = final
    }
    requestAnimationFrame(tick)
  })
}

export type BoardRow = { slug: string; when: string; what: string; where: string }

export default function ExpoBoard({ rows }: { rows: BoardRow[] }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      Array.from(el.querySelectorAll<HTMLElement>('.exm-row')).forEach((row, i) => scramble(row, i * 110))
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="exm-board" role="list" aria-label="Next shows">
      <div className="exm-board-head" aria-hidden="true"><span>When</span><span>Show</span><span>City</span></div>
      {rows.map(r => (
        <Link
          key={r.slug}
          href={`/expos/${r.slug}`}
          role="listitem"
          className="exm-row"
          onMouseEnter={e => { if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) scramble(e.currentTarget) }}
        >
          <span className="exm-when" data-flip={r.when}>{r.when}</span>
          <span className="exm-what" data-flip={r.what}>{r.what}</span>
          <span className="exm-where" data-flip={r.where}>{r.where}</span>
        </Link>
      ))}
    </div>
  )
}
