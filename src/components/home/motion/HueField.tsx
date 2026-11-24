'use client'

/**
 * The page's ground shifts as you travel down it: two soft glows behind
 * every section, whose hue and position follow the scroll, blue at the top
 * through teal to the brand green and back. Behind the content (it sits in
 * the page's own stacking layer), never over it. Fixed and pointer-free;
 * under reduced motion it holds the opening colour.
 */

import { useEffect, useRef } from 'react'

export default function HueField() {
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const f = el.current
    if (!f || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const apply = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      // 230 (blue) -> 110 (green) -> 200 (teal-blue), never violet.
      const h1 = p < 0.6 ? 230 - (p / 0.6) * 120 : 110 + ((p - 0.6) / 0.4) * 90
      f.style.setProperty('--hf-h1', h1.toFixed(1))
      f.style.setProperty('--hf-h2', (h1 + 40).toFixed(1))
      f.style.setProperty('--hf-x', `${(20 + p * 60).toFixed(1)}%`)
      f.style.setProperty('--hf-y', `${(15 + Math.sin(p * Math.PI * 3) * 20).toFixed(1)}%`)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(apply) }
    apply()
    window.addEventListener('scroll', kick, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', kick) }
  }, [])
  return <div ref={el} className="hf" aria-hidden="true" />
}
