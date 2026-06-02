'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  alt: string
  caption?: string | null
  title: string
}

/**
 * Elixir-style scroll hero.
 * Starts as a full-bleed image (edge to edge, no radius) and, as the user
 * scrolls through the section, scales down into a contained, rounded frame.
 * Big at the top → smaller and framed as you move down the page.
 */
export default function ScrollHero({ src, alt, caption, title }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0) // 0 = full-bleed, 1 = fully contained

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        // The section is taller than the viewport; progress runs as its top
        // travels from 0 up to -(section height - viewport height).
        const scrollable = el.offsetHeight - window.innerHeight
        if (scrollable <= 0) return setProgress(0)
        const p = Math.min(1, Math.max(0, -rect.top / scrollable))
        setProgress(p)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Interpolate visual properties from progress.
  const inset  = progress * 6          // vw of horizontal inset (0 → 6vw each side)
  const radius = progress * 28         // px border radius (0 → 28)
  const scaleY = 1 - progress * 0.12   // subtle vertical shrink
  const topGap = progress * 32         // px top margin once framed

  return (
    <div ref={sectionRef} style={{ position: 'relative', height: '180vh', background: 'hsl(222 30% 5%)' }}>
      {/* Sticky stage keeps the image pinned while the section scrolls past */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <figure
          style={{
            position: 'relative',
            margin: 0,
            marginTop: `${topGap}px`,
            width: `calc(100vw - ${inset * 2}vw)`,
            height: `calc(100vh - ${topGap}px)`,
            maxHeight: '100vh',
            borderRadius: `${radius}px`,
            overflow: 'hidden',
            transform: `scaleY(${scaleY})`,
            transformOrigin: 'top center',
            transition: 'box-shadow 0.3s ease',
            boxShadow: progress > 0.4 ? '0 30px 80px -20px hsl(222 40% 2% / 0.8)' : 'none',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Title overlay — visible while full-bleed, fades as it frames */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, hsl(222 40% 3% / 0.7) 0%, transparent 45%)',
              opacity: 1 - progress * 0.6,
            }}
          />
          {caption && (
            <figcaption
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '24px',
                fontSize: '0.72rem',
                color: 'hsl(220 10% 70%)',
                background: 'hsl(222 30% 6% / 0.7)',
                padding: '4px 10px',
                borderRadius: '6px',
                opacity: 1 - progress,
              }}
            >
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  )
}
