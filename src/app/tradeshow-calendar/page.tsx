import type { Metadata } from 'next'
import TradeshowClient, { type TradeshowEvent } from './TradeshowClient'
import eventsData from '@/data/tradeshow-events.json'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb, faqPage } from '@/lib/seo/organization'
import { SITE_URL } from '@/lib/site-url'

// Visible on the page below, and mirrored into FAQPage markup. Google only
// honours FAQ markup whose answers a visitor can actually read.
const CALENDAR_FAQS = [
  { q: 'How far in advance should I book a stall for a 2026 trade show?',
    a: 'Six to eight weeks before the show is comfortable for a custom stall, and ten to twelve weeks if you need a double-decker, because the structural drawings usually need organiser approval before fabrication can start. Four weeks is workable. Under three weeks we can often still deliver, but material choices narrow.' },
  { q: 'Which Indian cities host the most trade shows?',
    a: 'Mumbai, New Delhi and Greater Noida carry the largest share, followed by Bangalore, Hyderabad, Ahmedabad and Gandhinagar, Chennai and Pune. Each has its own venues with different rigging limits, build-up windows and access constraints.' },
  { q: 'Do you build stalls at every show on this calendar?',
    a: 'We build across India and in 14 countries, and we have delivered stands at most of the major venues on this list. If you are exhibiting at a show here, we can usually tell you the venue rules before you commit to a stand size.' },
  { q: 'How often is this calendar updated?',
    a: 'The list is filtered on every page load so shows that have finished drop off automatically. Dates and venues come from organiser listings, so confirm the exact hall and build-up schedule with the organiser before booking travel.' },
]

// Rendered per-request so "today" is always current — past events drop off
// automatically as their dates pass, without needing a redeploy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'India Trade Show Calendar 2026 | Exhibition Dates & Venues' },
  description: 'India trade show calendar 2026 with dates, venues and cities for every major exhibition. Plan your stall early and lock fabrication slots.',
  alternates: { canonical: '/tradeshow-calendar' },
}

export default function TradeshowCalendarPage() {
  // "Today" in Indian time (YYYY-MM-DD) — the calendar serves an Indian audience.
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
  const currentMonth = today.slice(0, 7)

  // Upcoming only: keep events whose last day is today or later. Multi-day
  // events still running count as upcoming. Events without a parseable date
  // are kept (we can't prove they are past).
  const upcoming = (eventsData as TradeshowEvent[]).filter(e => {
    const lastDay = e.endDate || e.startDate
    return !lastDay || lastDay >= today
  })

  // Event markup for the shows with a parseable start date. Capped so the
  // payload stays reasonable — the full list runs to several hundred.
  const schemaEvents = upcoming.filter(e => e.startDate).slice(0, 100)

  const graph = [
    organizationNode(),
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/tradeshow-calendar#page`,
      name: 'India Trade Show Calendar 2026',
      description: 'Dates, venues and cities for upcoming trade shows and exhibitions across India.',
      url: `${SITE_URL}/tradeshow-calendar`,
      isPartOf: { '@id': `${SITE_URL}#website` },
      publisher: { '@id': `${SITE_URL}#organization` },
    },
    {
      '@type': 'ItemList',
      name: 'Upcoming trade shows and exhibitions in India',
      numberOfItems: schemaEvents.length,
      itemListElement: schemaEvents.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Event',
          name: e.title,
          startDate: e.startDate,
          ...(e.endDate ? { endDate: e.endDate } : {}),
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          ...(e.description ? { description: e.description } : {}),
          ...(e.link ? { url: e.link } : {}),
          location: {
            '@type': 'Place',
            name: e.city || 'India',
            address: { '@type': 'PostalAddress', addressLocality: e.city || undefined, addressCountry: 'IN' },
          },
        },
      })),
    },
    breadcrumb([{ name: 'India Trade Show Calendar 2026', path: '/tradeshow-calendar' }]),
    faqPage(CALENDAR_FAQS),
  ]

  return (
    <main>
      <JsonLd graph={graph} />
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container text-center">
          <span className="section-label">India Tradeshow Calendar</span>
          <h1>
            India Trade Show Calendar 2026 — <span className="highlight">Exhibition Dates, Venues and Cities</span>
          </h1>
          <p className="section-subtitle">
            Browse {upcoming.length}+ upcoming trade shows, exhibitions, and industry conferences
            across India. Filter by city, month, or industry to plan your exhibition calendar.
          </p>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section style={{ paddingTop: '0', paddingBottom: '0' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, hsl(230 64% 52% / 0.12), hsl(110 55% 50% / 0.10))',
              border: '1px solid hsl(222 18% 18%)',
              borderRadius: '14px',
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              margin: '32px 0',
            }}
          >
            <div>
              <p style={{ fontWeight: 600, color: 'hsl(0 0% 92%)', marginBottom: '4px' }}>
                Exhibiting at an upcoming show?
              </p>
              <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 60%)' }}>
                We design and build exhibition stalls across India. Get a free design concept in 72 hours.
              </p>
            </div>
            <a href="/contact" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Get a Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── CALENDAR ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <TradeshowClient events={upcoming} initialMonth={currentMonth} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={{ marginBottom: '28px' }}>Planning questions</h2>
          {CALENDAR_FAQS.map(f => (
            <div key={f.q} style={{ borderTop: '1px solid hsl(222 18% 18%)', padding: '22px 0' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '10px' }}>{f.q}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '0.95rem' }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
