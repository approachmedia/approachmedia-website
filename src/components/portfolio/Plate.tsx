'use client'

/**
 * EditorialPlate — one photograph in its own frame, drifting inside it.
 *
 * The frame is fixed and the picture is larger than it, so as the frame
 * travels through the viewport the picture moves against it. Adjacent plates
 * take opposing rates, so scrolling past two of them reads as depth rather
 * than as two pictures sliding the same way.
 *
 * This is hand-rolled rather than the engine's `data-sc-parallax` because that
 * device moves a layer by rate*100px across a whole act, which inside a framed
 * photograph is roughly 55px and reads as the picture simply sitting there.
 * That exact complaint was raised on the city pages. Here the drift is a
 * measured share of the frame height, so it is visible at any viewport size.
 *
 * The picture is never cropped tighter than the frame: it is scaled by exactly
 * the amount the drift consumes, so no edge is ever exposed.
 */

import { useEffect, useRef, useState } from 'react'

/** Share of the frame height the picture travels across its whole life. */
const DRIFT = 0.14

export function EditorialPlate({
  src, alt, caption, ratio = '16 / 9', rate = 1, className = '',
}: {
  src: string
  alt: string
  caption?: string | null
  ratio?: string
  /** +1 drifts up as you scroll down, -1 drifts down. Alternate them. */
  rate?: number
  className?: string
}) {
  const figRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const fig = figRef.current
    const img = imgRef.current
    if (!fig || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      img.style.transform = 'none'
      return
    }

    let raf = 0
    const apply = () => {
      raf = 0
      const r = fig.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < -200 || r.top > vh + 200) return
      // 0 as the frame's top edge enters the bottom of the screen,
      // 1 as its bottom edge leaves the top.
      const k = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
      const travel = (k - 0.5) * DRIFT * r.height * -rate
      img.style.transform = `translate3d(0, ${travel.toFixed(1)}px, 0) scale(${1 + DRIFT})`
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
  }, [rate])

  // A broken image collapses the plate rather than reserving an empty box.
  if (!src || failed) return null

  return (
    <figure ref={figRef} className={`plate ${className}`.trim()}>
      <div className="plate__frame" style={{ aspectRatio: ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          style={{ transform: `scale(${1 + DRIFT})` }}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
