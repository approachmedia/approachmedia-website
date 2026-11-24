'use client'

/**
 * A figure that counts up from zero the first time it scrolls into view
 * ("6000+" runs 0 to 6000, then the plus). The real figure is what the
 * server renders, so without JavaScript, or under reduced motion, or if it
 * is already on screen at load, the number simply reads as written.
 */

import { useEffect, useRef } from 'react'

export default function CountUp({ value, ms = 1600 }: { value: string; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const m = value.match(/^(\D*)([\d,]+)(.*)$/)
    if (!m || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = Number(m[2].replace(/,/g, ''))
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return
    el.textContent = `${m[1]}0${m[3]}`
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / ms)
        const eased = 1 - Math.pow(1 - k, 4)
        el.textContent = `${m[1]}${Math.round(target * eased)}${m[3]}`
        if (k < 1) requestAnimationFrame(tick)
        else el.textContent = value
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, ms])
  return <span ref={ref}>{value}</span>
}
