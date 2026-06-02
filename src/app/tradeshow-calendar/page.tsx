import type { Metadata } from 'next'
import TradeshowClient from './TradeshowClient'
import eventsData from '@/data/tradeshow-events.json'

export const metadata: Metadata = {
  title: 'India Tradeshow Calendar 2026 — Exhibition Events',
  description: 'Complete calendar of trade shows, exhibitions, and industry conferences in India for 2026. Filter by city, month, and industry to find the right events for your brand.',
}

export default function TradeshowCalendarPage() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container text-center">
          <span className="section-label">India Tradeshow Calendar</span>
          <h1>
            Find Your Next <span className="highlight">Exhibition</span>
          </h1>
          <p className="section-subtitle">
            Browse {eventsData.length}+ trade shows, exhibitions, and industry conferences
            across India in 2026. Filter by city, month, or industry to plan your exhibition calendar.
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
          <TradeshowClient events={eventsData as Parameters<typeof TradeshowClient>[0]['events']} />
        </div>
      </section>
    </main>
  )
}
