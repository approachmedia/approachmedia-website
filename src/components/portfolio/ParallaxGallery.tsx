'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export type GalleryItem = {
  id: number
  src: string
  alt: string
  caption?: string | null
}

// Row heights — photos keep their NATURAL aspect ratio (width = auto), so
// nothing is ever cropped. Only the height is fixed per row.
const ROW_H = 360 // desktop band height (px)

// How tall the scroll section is. The extra height beyond one viewport is the
// distance over which the horizontal pan plays out.
const SECTION_VH = 260

function chunkRows<T>(items: T[], rows: number): T[][] {
  const out: T[][] = Array.from({ length: rows }, () => [])
  items.forEach((it, i) => out[i % rows].push(it))
  return out
}

export default function ParallaxGallery({ items }: { items: GalleryItem[] }) {
  const sectionRef          = useRef<HTMLDivElement>(null)
  const rowRefs             = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState<GalleryItem | null>(null)
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Imperatively pan each row horizontally based on how far the section has
  // scrolled. Done in a rAF + direct DOM writes so it stays buttery smooth.
  const apply = useCallback(() => {
    const sec = sectionRef.current
    if (!sec) return
    const vh         = window.innerHeight
    const scrollable = sec.offsetHeight - vh
    const p = scrollable > 0
      ? Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / scrollable))
      : 0

    rowRefs.current.forEach((track, i) => {
      if (!track) return
      const parent = track.parentElement
      if (!parent) return
      const pan = Math.max(0, track.scrollWidth - parent.clientWidth)
      // Even rows reveal toward the right as you scroll down; odd rows reveal
      // toward the left — opposing horizontal drift for a dynamic feel.
      const x = i % 2 === 0 ? -p * pan : -(1 - p) * pan
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`
    })
  }, [])

  useEffect(() => {
    if (isMobile) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isMobile, apply])

  // ── Mobile: simple full-width stack, no parallax, no cropping ──────────
  if (isMobile) {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(img => (
            <Card key={img.id} item={img} mobile onClick={() => setActive(img)} />
          ))}
        </div>
        <Lightbox active={active} onClose={() => setActive(null)} />
        <CardStyles />
      </>
    )
  }

  // ── Desktop: sticky band of horizontally-panning rows ─────────────────
  const rows = chunkRows(items, 2)

  return (
    <>
      <div
        ref={sectionRef}
        style={{
          position: 'relative',
          height:   `${SECTION_VH}vh`,
          // Full-bleed: break out of any max-width parent to span the whole
          // viewport width, edge to edge.
          width:       '100vw',
          left:        '50%',
          right:       '50%',
          marginLeft:  '-50vw',
          marginRight: '-50vw',
        }}
      >
        <div
          style={{
            position:       'sticky',
            top:            0,
            height:         '100vh',
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            gap:            '18px',
            overflow:       'hidden',
          }}
        >
          {rows.map((row, ri) => (
            <div key={ri} style={{ overflow: 'hidden', width: '100%' }}>
              <div
                ref={el => { rowRefs.current[ri] = el }}
                style={{
                  display:    'flex',
                  gap:        '16px',
                  width:      'max-content',
                  willChange: 'transform',
                  // Odd rows start shifted left and reveal rightward — set an
                  // initial nudge via padding so both rows feel balanced.
                  paddingLeft:  '24px',
                  paddingRight: '24px',
                }}
              >
                {row.map(img => (
                  <Card
                    key={img.id}
                    item={img}
                    height={ROW_H}
                    onClick={() => setActive(img)}
                    onReady={apply}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox active={active} onClose={() => setActive(null)} />
      <CardStyles />
    </>
  )
}

// ── A single photo card — natural aspect ratio, never cropped ───────────
function Card({
  item,
  height,
  mobile,
  onClick,
  onReady,
}: {
  item: GalleryItem
  height?: number
  mobile?: boolean
  onClick: () => void
  onReady?: () => void
}) {
  return (
    <button
      type="button"
      className="pg-card"
      onClick={onClick}
      aria-label={`View ${item.alt}`}
      style={
        mobile
          ? { width: '100%' }
          : { height: `${height}px`, flex: '0 0 auto' }
      }
    >
      <Image
        src={item.src}
        alt={item.alt}
        width={1600}
        height={1067}
        sizes={mobile ? '100vw' : `${(height ?? ROW_H) * 1.6}px`}
        onLoad={onReady}
        style={
          mobile
            ? { width: '100%', height: 'auto', display: 'block' }
            : { width: 'auto', height: '100%', display: 'block' }
        }
      />
      <div className="pg-overlay">
        <div className="pg-icon">⤢</div>
        {item.caption && <span className="pg-caption">{item.caption}</span>}
      </div>
    </button>
  )
}

// ── Fullscreen lightbox ─────────────────────────────────────────────────
function Lightbox({ active, onClose }: { active: GalleryItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])

  if (!active) return null
  return (
    <div
      onClick={onClose}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         200,
        background:     'hsl(222 40% 3% / 0.96)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '24px',
        cursor:         'zoom-out',
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: '20px', right: '24px', width: '40px', height: '40px',
          borderRadius: '50%', background: 'hsl(222 24% 14%)', border: '1px solid hsl(222 18% 24%)',
          color: 'hsl(0 0% 80%)', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1,
        }}
      >
        ×
      </button>
      <figure
        style={{ margin: 0, maxWidth: '92vw', maxHeight: '88vh', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={active.src}
          alt={active.alt}
          width={1920}
          height={1280}
          sizes="92vw"
          style={{
            width: 'auto', height: 'auto', maxWidth: '92vw', maxHeight: '82vh',
            objectFit: 'contain', borderRadius: '10px', display: 'block',
          }}
        />
        {active.caption && (
          <figcaption style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.8rem', color: 'hsl(220 10% 58%)' }}>
            {active.caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}

// ── Shared card styles (hover overlay + zoom) ───────────────────────────
function CardStyles() {
  return (
    <style>{`
      .pg-card {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        cursor: zoom-in;
        background: hsl(222 24% 8%);
        border: none;
        padding: 0;
        line-height: 0;
      }
      .pg-card img {
        transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .pg-card:hover img { transform: scale(1.05); }
      .pg-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          hsl(222 40% 4% / 0.85) 0%,
          hsl(222 40% 4% / 0.15) 45%,
          transparent 70%
        );
        opacity: 0;
        transition: opacity 0.4s ease;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 16px;
      }
      .pg-card:hover .pg-overlay { opacity: 1; }
      .pg-caption {
        font-size: 0.74rem;
        color: hsl(220 10% 82%);
        line-height: 1.4;
        transform: translateY(6px);
        transition: transform 0.4s ease;
      }
      .pg-card:hover .pg-caption { transform: translateY(0); }
      .pg-icon {
        width: 32px; height: 32px; border-radius: 50%;
        background: hsl(0 0% 100% / 0.14);
        backdrop-filter: blur(6px);
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 8px; font-size: 0.9rem; color: white;
        transform: scale(0.7);
        transition: transform 0.4s ease;
      }
      .pg-card:hover .pg-icon { transform: scale(1); }
    `}</style>
  )
}
