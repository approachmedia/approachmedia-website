import type { Metadata } from 'next'
import Link from 'next/link'
import expoData from '@/data/expo-pages.json'
import type { ExpoPageData } from '@/components/expo/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Work With Us — Exhibition Stall Design Partner | Approach Media',
  description: 'Partner with Approach Media for your next exhibition. We design, fabricate, and install custom exhibition stalls across India and internationally. See how we work and find your expo.',
  alternates: { canonical: `${SITE_URL}/work-with-us` },
}

const PROCESS = [
  { num: '01', title: 'Share Your Brief', body: 'Tell us your expo name, city, booth size, and brand objectives. A one-page brief or a quick call is enough to get started.' },
  { num: '02', title: 'Concept Design', body: 'We develop a tailored 2D layout and 3D visualisation based on your brief — showing exactly how the stall will look before any fabrication begins.' },
  { num: '03', title: 'Review and Approve', body: 'You review the 3D concept. We incorporate feedback and refine until you approve. No fabrication starts without your sign-off.' },
  { num: '04', title: 'Fabrication', body: 'Our in-house team builds the stall using the approved design — carpentry, metal work, branding panels, lighting, and finishing all under one roof.' },
  { num: '05', title: 'Transport and Install', body: 'We dispatch to the venue city, coordinate with venue authorities, and handle full on-site installation — ready before your team arrives.' },
  { num: '06', title: 'Show Day Support and Dismantling', body: 'We remain available during the show for any adjustments and manage complete post-show dismantling and material return.' },
]

const INDUSTRIES = [
  { label: 'Manufacturing & Engineering', icon: '⚙' },
  { label: 'Pharma & Healthcare', icon: '⚕' },
  { label: 'Food & Agriculture', icon: '🌾' },
  { label: 'Textile & Apparel', icon: '🧵' },
  { label: 'Construction & Real Estate', icon: '🏗' },
  { label: 'Energy & Industrial', icon: '⚡' },
  { label: 'Technology & Electronics', icon: '💡' },
  { label: 'Travel, MICE & Hospitality', icon: '✈' },
  { label: 'Retail & Consumer Goods', icon: '🛍' },
]

const NEXT_EXPOS = (expoData as ExpoPageData[]).slice(0, 9)

const MONTH_ORDER: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
}

export default function WorkWithUsPage() {
  const upcomingExpos = [...(expoData as ExpoPageData[])]
    .sort((a, b) => (MONTH_ORDER[a.month] ?? 13) - (MONTH_ORDER[b.month] ?? 13))
    .slice(0, 9)

  return (
    <main>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">Exhibition Stall Design Partner</span>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08, maxWidth: '820px', marginBottom: '22px' }}>
              Work With Us — Your Exhibition <span className="highlight">Design and Build</span> Partner
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '580px', lineHeight: 1.8, marginBottom: '36px' }}>
              Approach Media has designed and built 6,000+ exhibition stalls across India and 14 countries since 2002. We handle the entire build — from your first brief to post-show dismantling.
            </p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Start a Project &rarr;</a>
              <a href="#how-we-work" className="btn btn-outline">How We Work</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-strip-inner animate-in">
            <div className="stat-item"><span className="stat-number">23+</span><div className="stat-label">Years in Business</div></div>
            <div className="stat-item"><span className="stat-number">6000+</span><div className="stat-label">Exhibition Stalls Built</div></div>
            <div className="stat-item"><span className="stat-number">14+</span><div className="stat-label">Countries Delivered</div></div>
            <div className="stat-item"><span className="stat-number">80+</span><div className="stat-label">Expos Covered in 2026</div></div>
          </div>
        </div>
      </div>

      {/* ── WHAT WE DO ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: '56px', alignItems: 'start' }}>
            <div className="animate-in">
              <span className="section-label">What We Do</span>
              <h2 style={{ marginBottom: '20px' }}>End-to-End Exhibition Stall Design and Build</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '16px' }}>
                We are an exhibition stall design and build company — not a brokerage or project manager who sub-contracts everything out. Our in-house team handles concept, 3D design, fabrication, transport, installation, and dismantling.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginBottom: '28px' }}>
                This means better quality control, more predictable timelines, and a single accountable partner for your entire exhibition build — regardless of where in India or internationally your show is.
              </p>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  'Custom exhibition stall design (2D + 3D)',
                  'In-house fabrication and finishing',
                  'Branding, graphics, and lighting',
                  'Installation and dismantling',
                  'Turnkey show management',
                  'International exhibition builds',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.92rem', color: 'hsl(0 0% 88%)' }}>
                    <span style={{ color: 'hsl(110 55% 50%)', fontWeight: 700 }}>&#10003;</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-in delay-1" style={{ display: 'grid', gap: '16px' }}>
              <div style={{ background: 'linear-gradient(135deg, hsl(230 64% 52% / 0.12), hsl(110 55% 50% / 0.10))', border: '1px solid hsl(222 18% 22%)', borderRadius: '14px', padding: '28px' }}>
                <h4 style={{ marginBottom: '10px' }}>We design for your objectives</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  Every stall starts with your business goals — lead generation, product launch, brand awareness, or dealer meetings. We design the booth layout and visitor experience around those outcomes, not a template.
                </p>
              </div>
              <div style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '14px', padding: '28px' }}>
                <h4 style={{ marginBottom: '10px' }}>No surprises at the venue</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  We do a full-scale mock-up of every stall at our workshop before dispatch. What you approve in 3D is what you see on-site — with no budget overruns or last-minute compromises.
                </p>
              </div>
              <div style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '14px', padding: '28px' }}>
                <h4 style={{ marginBottom: '10px' }}>One team. One invoice.</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  From design to dismantling, a single project team manages your entire build. One point of contact, clear scope, and transparent pricing from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────── */}
      <section className="section" id="how-we-work" style={{ background: 'hsl(222 24% 9% / 0.4)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">How We Work</span>
            <h2>From Brief to Build in 6 Steps</h2>
          </div>
          <div className="flow-grid">
            {PROCESS.map((step, i) => (
              <div key={i} className={`flow-card animate-in delay-${(i % 4) + 1}`}>
                <span className="flow-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Industries We Serve</span>
            <h2>We Build for Every Industry</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className={`animate-in delay-${(i % 4) + 1}`} style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '10px', padding: '18px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem' }}>{ind.icon}</span>
                <span style={{ fontSize: '0.85rem', color: 'hsl(0 0% 88%)', fontWeight: 500, lineHeight: 1.4 }}>{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EXPOS ─────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 9% / 0.4)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <span className="section-label">2026 Exhibition Calendar</span>
            <h2>Exhibiting at an Upcoming Show?</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: '14px', maxWidth: '600px' }}>
              We cover {(expoData as ExpoPageData[]).length}+ upcoming exhibitions in 2026. Click your show for a dedicated stall design page with venue details, planning checklist, and a quote form.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginBottom: '28px' }}>
            {upcomingExpos.map(expo => (
              <Link
                key={expo.slug}
                href={`/expos/${expo.slug}`}
                style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '10px', padding: '18px', display: 'block', textDecoration: 'none' }}
                className="expo-card-link"
              >
                <div style={{ fontSize: '0.7rem', color: 'hsl(230 70% 65%)', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  {expo.monthName} {expo.year} · {expo.city}
                </div>
                <div style={{ color: 'hsl(0 0% 92%)', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.4, marginBottom: '6px' }}>{expo.title}</div>
                <div style={{ color: 'hsl(220 10% 55%)', fontSize: '0.78rem' }}>{expo.venue}</div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/expos" className="btn btn-outline">View All {(expoData as ExpoPageData[]).length} Expo Pages &rarr;</Link>
          </div>
        </div>
      </section>

      {/* ── CITIES ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Cities We Cover</span>
            <h2>We Execute Across India and Internationally</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
            {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Noida', 'Greater Noida', 'Gandhinagar', 'Surat', 'Kochi', 'Chandigarh', 'Ludhiana', 'Navi Mumbai', 'Milan', 'Paris', 'Dubai', 'Singapore'].map((city, i) => (
              <div key={i} style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: 'hsl(0 0% 82%)', textAlign: 'center' }}>
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to build your next exhibition stall?</h2>
          <p className="cta-sub">
            Share your expo name, city, and booth size. We send a tailored design concept and quote within 48 hours.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
            <a href="/portfolio" className="btn btn-outline">View Portfolio</a>
          </div>
        </div>
      </section>

    </main>
  )
}
