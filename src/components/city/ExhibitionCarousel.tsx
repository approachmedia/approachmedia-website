'use client'
import { useRef } from 'react'
import Link from 'next/link'
import type { ExhibitionShow } from './types'

const CAT_COLOR: Record<string, string> = {
  'Textile, Fabrics & Yarns':  'hsl(280 60% 60%)',
  'Apparel & Clothing':        'hsl(280 60% 60%)',
  'Gems & Jewelry':            'hsl(45 90% 58%)',
  'Fashion & Beauty':          'hsl(320 65% 58%)',
  'Auto & Automotive':         'hsl(200 80% 55%)',
  'Auto Shows':                'hsl(200 80% 55%)',
  'Banking & Finance':         'hsl(150 60% 48%)',
  'Business Services':         'hsl(150 60% 48%)',
  'IT & Technology':           'hsl(220 70% 62%)',
  'Power & Energy':            'hsl(40 90% 55%)',
  'Science & Research':        'hsl(190 70% 55%)',
  'Medical & Pharma':          'hsl(170 60% 48%)',
  'Industrial Engineering':    'hsl(25 80% 55%)',
  'Building & Construction':   'hsl(30 70% 50%)',
  'Packing & Packaging':       'hsl(260 55% 58%)',
  'Education & Training':      'hsl(50 80% 52%)',
  'Tourism & Hospitality':     'hsl(180 65% 48%)',
}

function color(cats: string[]) {
  for (const c of cats) if (CAT_COLOR[c]) return CAT_COLOR[c]
  return 'hsl(230 60% 58%)'
}

function label(cats: string[]) {
  return cats.find(c => c !== 'Tradeshow' && c !== 'Conference' && c !== 'Workshop') ?? cats[0] ?? 'Exhibition'
}

export default function ExhibitionCarousel({ shows }: { shows: ExhibitionShow[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 'left' | 'right') =>
    ref.current?.scrollBy({ left: dir === 'right' ? 560 : -560, behavior: 'smooth' })

  const BTN: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
    background: 'hsl(222 24% 14%)', border: '1px solid hsl(222 18% 24%)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'hsl(0 0% 80%)',
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => scroll('left')} aria-label="Previous" style={{ ...BTN, left: '-16px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <div ref={ref} style={{ overflowX: 'auto', display: 'flex', gap: '16px', paddingBottom: '8px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {shows.map((show, i) => {
          const c = color(show.categories)
          return (
            <div key={i} style={{ width: '256px', flexShrink: 0, background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 18% 20%)', borderRadius: '14px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ alignSelf: 'flex-start', padding: '4px 12px', borderRadius: '100px', background: `${c}22`, border: `1px solid ${c}55`, fontSize: '0.73rem', fontWeight: 700, color: c, whiteSpace: 'nowrap' }}>
                {show.dateRaw}
              </div>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, lineHeight: 1.4, color: 'hsl(0 0% 93%)', flex: 1, margin: 0 }}>
                {show.title}
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'hsl(220 10% 52%)' }}>{label(show.categories)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.76rem', color: 'hsl(220 10% 48%)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {show.venue}
              </div>
              <Link href="/contact" style={{ display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: '8px', border: '1px solid hsl(222 18% 24%)', fontSize: '0.8rem', fontWeight: 600, color: 'hsl(220 10% 72%)', textDecoration: 'none', marginTop: '4px' }}>
                Plan My Stand →
              </Link>
            </div>
          )
        })}
      </div>

      <button onClick={() => scroll('right')} aria-label="Next" style={{ ...BTN, right: '-16px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
    </div>
  )
}
