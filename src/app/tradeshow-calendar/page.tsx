import type { Metadata } from 'next'
import TradeshowClient, { type TradeshowEvent } from './TradeshowClient'
import eventsData from '@/data/tradeshow-events.json'

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

  return (
    <main>
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
    </main>
  )
}
