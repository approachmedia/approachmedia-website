'use client'
import { useRef } from 'react'
import Link from 'next/link'

export interface ExhibitionShow {
  title: string
  dateRaw: string
  categories: string[]
  venue: string
  link: string | null
}

const CATEGORY_COLOR: Record<string, string> = {
  'Textile, Fabrics & Yarns': 'hsl(280 60% 60%)',
  'Apparel & Clothing':       'hsl(280 60% 60%)',
  'Gems & Jewelry':           'hsl(45 90% 58%)',
  'Fashion & Beauty':         'hsl(320 65% 58%)',
  'Auto & Automotive':        'hsl(200 80% 55%)',
  'Auto Shows':               'hsl(200 80% 55%)',
  'Banking & Finance':        'hsl(150 60% 48%)',
  'Business Services':        'hsl(150 60% 48%)',
  'IT & Technology':          'hsl(220 70% 62%)',
  'Power & Energy':           'hsl(40 90% 55%)',
  'Science & Research':       'hsl(190 70% 55%)',
}

function getCategoryColor(cats: string[]): string {
  for (const c of cats) if (CATEGORY_COLOR[c]) return CATEGORY_COLOR[c]
  return 'hsl(230 60% 58%)'
}

function getCategoryLabel(cats: string[]): string {
  return cats.find(c => c !== 'Tradeshow' && c !== 'Conference' && c !== 'Workshop') ?? cats[0] ?? 'Exhibition'
}

export default function ExhibitionCarousel({ shows }: { shows: ExhibitionShow[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const amount = 560
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        style={{
          position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
          background: 'hsl(222 24% 14%)', border: '1px solid hsl(222 18% 24%)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'hsl(0 0% 80%)', transition: 'background 0.15s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'hsl(222 24% 20%)')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'hsl(222 24% 14%)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        style={{
          overflowX: 'auto', display: 'flex', gap: '16px',
          paddingBottom: '8px', scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {shows.map((show, idx) => {
          const color = getCategoryColor(show.categories)
          const catLabel = getCategoryLabel(show.categories)
          return (
            <div
              key={idx}
              style={{
                width: '256px', flexShrink: 0,
                background: 'hsl(222 22% 11%)',
                border: '1px solid hsl(222 18% 20%)',
                borderRadius: '14px', padding: '22px',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}
            >
              {/* Date badge */}
              <div style={{
                alignSelf: 'flex-start', padding: '4px 12px', borderRadius: '100px',
                background: `color-mix(in srgb, ${color} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
                fontSize: '0.73rem', fontWeight: 700, color, whiteSpace: 'nowrap',
              }}>
                {show.dateRaw}
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.4, color: 'hsl(0 0% 93%)', flex: 1, margin: 0 }}>
                {show.title}
              </h3>

              {/* Category */}
              <div style={{ fontSize: '0.78rem', color: 'hsl(220 10% 52%)' }}>{catLabel}</div>

              {/* Venue */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: 'hsl(220 10% 48%)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                {show.venue}
              </div>

              {/* CTA */}
              <Link
                href="/contact"
                style={{
                  display: 'block', textAlign: 'center', padding: '9px 14px',
                  borderRadius: '8px', border: '1px solid hsl(222 18% 24%)',
                  fontSize: '0.8rem', fontWeight: 600, color: 'hsl(220 10% 72%)',
                  textDecoration: 'none', transition: 'border-color 0.15s, color 0.15s',
                  marginTop: '4px',
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'hsl(230 50% 45%)'; el.style.color = '#fff' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'hsl(222 18% 24%)'; el.style.color = 'hsl(220 10% 72%)' }}
              >
                Plan My Stand →
              </Link>
            </div>
          )
        })}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        style={{
          position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
          background: 'hsl(222 24% 14%)', border: '1px solid hsl(222 18% 24%)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'hsl(0 0% 80%)', transition: 'background 0.15s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'hsl(222 24% 20%)')}
        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'hsl(222 24% 14%)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )
}
