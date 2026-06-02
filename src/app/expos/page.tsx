import type { Metadata } from 'next'
import Link from 'next/link'
import expoData from '@/data/expo-pages.json'
import type { ExpoPageData } from '@/components/expo/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Stall Design for Upcoming Expos 2026 | Approach Media',
  description: 'Browse 80+ upcoming exhibitions and trade shows across India and international venues. Approach Media provides custom stall design, 3D booth concepts, and turnkey fabrication for every expo.',
  alternates: { canonical: `${SITE_URL}/expos` },
}

const MONTH_ORDER: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
}

const INDUSTRY_COLORS: Record<string, string> = {
  construction:  'hsl(42 80% 55%)',
  engineering:   'hsl(230 70% 65%)',
  pharma:        'hsl(280 60% 65%)',
  food:          'hsl(110 55% 50%)',
  textile:       'hsl(330 65% 65%)',
  industrial:    'hsl(200 70% 55%)',
  travel:        'hsl(25 80% 60%)',
  multiindustry: 'hsl(220 15% 65%)',
}

export default function ExposIndexPage() {
  const expos = [...(expoData as ExpoPageData[])].sort(
    (a, b) => (MONTH_ORDER[a.month] ?? 13) - (MONTH_ORDER[b.month] ?? 13),
  )

  const byMonth = expos.reduce<Record<string, ExpoPageData[]>>((acc, e) => {
    const key = `${e.monthName} ${e.year}`
    if (!acc[key]) acc[key] = []
    acc[key].push(e)
    return acc
  }, {})

  const totalCities = [...new Set(expos.map(e => e.city))].length

  return (
    <main>
      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">Upcoming Expos 2026</span>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08, maxWidth: '800px', marginBottom: '22px' }}>
              Exhibition Stall Design for <span className="highlight">Every Major Expo</span> in 2026
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '580px', lineHeight: 1.8, marginBottom: '36px' }}>
              Approach Media designs and builds custom exhibition stalls for {expos.length}+ upcoming trade shows across India and internationally. Find your expo below and get a tailored quote.
            </p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Get a Stall Design Quote &rarr;</a>
              <a href="#expo-list" className="btn btn-outline">Browse All Expos</a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-strip-inner animate-in">
            <div className="stat-item"><span className="stat-number">{expos.length}+</span><div className="stat-label">Upcoming Expos</div></div>
            <div className="stat-item"><span className="stat-number">{totalCities}+</span><div className="stat-label">Cities Covered</div></div>
            <div className="stat-item"><span className="stat-number">6000+</span><div className="stat-label">Stalls Executed</div></div>
            <div className="stat-item"><span className="stat-number">23+</span><div className="stat-label">Years of Experience</div></div>
          </div>
        </div>
      </div>

      {/* EXPO LIST BY MONTH */}
      <section className="section" id="expo-list">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '48px' }}>
            <span className="section-label">All Expos</span>
            <h2>Find Your Exhibition by Month</h2>
          </div>

          {Object.entries(byMonth).map(([monthYear, monthExpos]) => (
            <div key={monthYear} style={{ marginBottom: '56px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'hsl(230 70% 65%)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                {monthYear}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {monthExpos.map(expo => (
                  <Link
                    key={expo.slug}
                    href={`/expos/${expo.slug}`}
                    style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '12px', padding: '20px', display: 'block', transition: 'border-color 0.2s', textDecoration: 'none' }}
                    className="expo-card-link"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: INDUSTRY_COLORS[expo.industry] ?? 'hsl(220 15% 65%)', flexShrink: 0 }}>
                        {expo.industryLabel.split(',')[0]}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'hsl(220 10% 50%)', textAlign: 'right' }}>{expo.city}</span>
                    </div>
                    <h4 style={{ color: 'hsl(0 0% 96%)', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '8px' }}>{expo.title}</h4>
                    <p style={{ color: 'hsl(220 10% 55%)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '12px' }}>{expo.venue}</p>
                    <span style={{ fontSize: '0.78rem', color: 'hsl(230 70% 65%)', fontWeight: 600 }}>
                      View Stall Design Page &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Can&apos;t find your expo? We cover all major shows.</h2>
          <p className="cta-sub">
            Share your expo name, city, and booth size — we provide a tailored design concept and quote within 48 hours.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
            <a href="/work-with-us" className="btn btn-outline">How We Work</a>
          </div>
        </div>
      </section>
    </main>
  )
}
