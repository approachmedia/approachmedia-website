'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  alt: string
  caption?: string | null
  title: string
}

// Final (small) hero dimensions when fully scrolled
const FINAL_W = 426
const FINAL_H = 212
const FINAL_R = 14 // border-radius at small state

export default function ScrollHero({ src, alt, caption }: Props) {
  const sectionRef              = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [win, setWin]           = useState({ w: 1280, h: 800 })

  useEffect(() => {
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current
        if (!el) return
        const vw = window.innerWidth
        const vh = window.innerHeight
        setWin({ w: vw, h: vh })
        const scrollable = el.offsetHeight - vh
        if (scrollable <= 0) return setProgress(0)
        const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / scrollable))
        setProgress(p)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Interpolate from full-bleed (progress=0) → 426×212 centered card (progress=1)
  const figW    = win.w - progress * (win.w - FINAL_W)
  const figH    = win.h - progress * (win.h - FINAL_H)
  const offsetX = (win.w - figW) / 2
  const offsetY = (win.h - figH) / 2
  const radius  = progress * FINAL_R
  const shadow  = progress > 0.3 ? `0 24px 80px -10px hsl(222 40% 2% / ${progress * 0.85})` : 'none'

  return (
    <div ref={sectionRef} style={{ position: 'relative', height: '200vh', background: 'hsl(222 30% 5%)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <figure
          style={{
            position:     'absolute',
            margin:       0,
            top:          `${offsetY}px`,
            left:         `${offsetX}px`,
            width:        `${figW}px`,
            height:       `${figH}px`,
            borderRadius: `${radius}px`,
            overflow:     'hidden',
            boxShadow:    shadow,
            transition:   'box-shadow 0.4s ease',
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
          {/* gradient overlay — fades as hero shrinks */}
          <div style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(to top, hsl(222 40% 3% / 0.65) 0%, transparent 50%)',
            opacity:    1 - progress * 0.9,
            pointerEvents: 'none',
          }} />
          {caption && (
            <figcaption style={{
              position:     'absolute',
              bottom:       '16px',
              right:        '18px',
              fontSize:     '0.7rem',
              color:        'hsl(220 10% 72%)',
              background:   'hsl(222 30% 6% / 0.75)',
              padding:      '3px 9px',
              borderRadius: '5px',
              opacity:      1 - progress * 1.5 < 0 ? 0 : 1 - progress * 1.5,
            }}>
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </div>
  )
}
