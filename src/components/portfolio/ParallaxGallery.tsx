'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export type GalleryItem = {
  id: number
  src: string
  alt: string
  caption?: string | null
}

// Column scroll speeds — col 1 moves DOWN, col 2 moves UP, col 3 moves DOWN
// (relative to how fast the section scrolls past)
const COL_SPEEDS = [0.14, -0.18, 0.10]

function distributeItems<T>(items: T[], cols: number): T[][] {
  const out: T[][] = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => out[i % cols].push(item))
  return out
}

export default function ParallaxGallery({ items }: { items: GalleryItem[] }) {
  const wrapRef                     = useRef<HTMLDivElement>(null)
  const [offset, setOffset]         = useState(0)
  const [active, setActive]         = useState<GalleryItem | null>(null)
  const [isMobile, setIsMobile]     = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current
        if (!el) return
        // offset = how many px the top of the section is above the viewport top
        setOffset(-el.getBoundingClientRect().top)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll) }
  }, [])

  const colCount = isMobile ? 1 : 3
  const columns  = distributeItems(items, colCount)

  return (
    <>
      {/* ── Gallery grid ──────────────────────────────────────── */}
      <div
        ref={wrapRef}
        style={{
          display:             'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap:                 '12px',
          alignItems:          'start',
          // Extra vertical room so parallax movement doesn't clip edges
          paddingTop:          isMobile ? 0 : '60px',
          paddingBottom:       isMobile ? 0 : '60px',
        }}
      >
        {columns.map((col, ci) => {
          const translateY = isMobile ? 0 : offset * COL_SPEEDS[ci]
          return (
            <div
              key={ci}
              style={{
                display:        'flex',
                flexDirection:  'column',
                gap:            '12px',
                transform:      `translateY(${translateY}px)`,
                willChange:     'transform',
              }}
            >
              {col.map(img => (
                <GalleryCard
                  key={img.id}
                  item={img}
                  onClick={() => setActive(img)}
                  // Middle column gets taller cards for visual rhythm
                  tall={ci === 1}
                />
              ))}
            </div>
          )
        })}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          200,
            background:      'hsl(222 40% 3% / 0.96)',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            padding:         '24px',
            cursor:          'zoom-out',
          }}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            style={{
              position:     'absolute',
              top:          '20px',
              right:        '24px',
              width:        '40px',
              height:       '40px',
              borderRadius: '50%',
              background:   'hsl(222 24% 14%)',
              border:       '1px solid hsl(222 18% 24%)',
              color:        'hsl(0 0% 80%)',
              fontSize:     '1.2rem',
              cursor:       'pointer',
              lineHeight:   1,
            }}
          >
            ×
          </button>
          <figure
            style={{ margin: 0, maxWidth: '90vw', maxHeight: '88vh', position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={1600}
              height={1200}
              sizes="90vw"
              style={{
                width:        'auto',
                height:       'auto',
                maxWidth:     '90vw',
                maxHeight:    '82vh',
                objectFit:    'contain',
                borderRadius: '10px',
              }}
            />
            {active.caption && (
              <figcaption style={{
                textAlign:  'center',
                marginTop:  '12px',
                fontSize:   '0.8rem',
                color:      'hsl(220 10% 58%)',
              }}>
                {active.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      <style>{`
        .pgallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          cursor: zoom-in;
          background: hsl(222 24% 8%);
          display: block;
          width: 100%;
          border: none;
          padding: 0;
        }
        .pgallery-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .pgallery-card:hover img {
          transform: scale(1.06);
        }
        .pgallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            hsl(222 40% 4% / 0.88) 0%,
            hsl(222 40% 4% / 0.2)  40%,
            transparent             70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px 16px 14px;
        }
        .pgallery-card:hover .pgallery-overlay {
          opacity: 1;
        }
        .pgallery-caption {
          font-size: 0.72rem;
          color: hsl(220 10% 80%);
          line-height: 1.4;
          transform: translateY(6px);
          transition: transform 0.4s ease;
        }
        .pgallery-card:hover .pgallery-caption {
          transform: translateY(0);
        }
        .pgallery-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: hsl(0 0% 100% / 0.12);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
          font-size: 0.9rem;
          color: white;
          transform: scale(0.7);
          transition: transform 0.4s ease;
        }
        .pgallery-card:hover .pgallery-icon {
          transform: scale(1);
        }
      `}</style>
    </>
  )
}

function GalleryCard({
  item,
  onClick,
  tall,
}: {
  item: GalleryItem
  onClick: () => void
  tall: boolean
}) {
  // Middle column cards are taller for visual rhythm
  const imgH = tall ? 420 : 320

  return (
    <button
      type="button"
      className="pgallery-card"
      onClick={onClick}
      aria-label={`View ${item.alt}`}
      style={{ height: `${imgH}px` }}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="pgallery-overlay">
        <div className="pgallery-icon">⤢</div>
        {item.caption && (
          <span className="pgallery-caption">{item.caption}</span>
        )}
      </div>
    </button>
  )
}
