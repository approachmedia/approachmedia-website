import Link from 'next/link'
import type { ProjectCardData } from '@/components/portfolio/ProjectCard'
import ExhibitionCarousel from './ExhibitionCarousel'
import type { CityPageData } from './types'

// ── Design tokens ────────────────────────────────────────────

const EYEBROW: React.CSSProperties = {
  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em',
  textTransform: 'uppercase', color: 'hsl(110 55% 55%)',
  marginBottom: '12px', display: 'block',
}

const H2: React.CSSProperties = {
  fontSize: 'clamp(1.75rem, 3.5vw, 2.8rem)', fontWeight: 700,
  lineHeight: 1.2, color: 'hsl(0 0% 95%)', textAlign: 'center',
}

const H2_LEFT: React.CSSProperties = { ...H2, textAlign: 'left' }

const CARD_GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
}

const CARD: React.CSSProperties = {
  background: 'hsl(222 22% 12%)',
  border: '1px solid hsl(222 18% 20%)',
  borderRadius: '16px',
  padding: '28px',
}

const CARD_TITLE: React.CSSProperties = {
  fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.35,
  color: 'hsl(0 0% 95%)', marginBottom: '10px',
}

const CARD_BODY: React.CSSProperties = {
  fontSize: '0.875rem', color: 'hsl(220 10% 55%)',
  lineHeight: 1.7, margin: 0,
}

const MUTED: React.CSSProperties = {
  color: 'hsl(220 10% 58%)', lineHeight: 1.8, fontSize: '1.05rem',
}

// ── Template ─────────────────────────────────────────────────

interface Props {
  data: CityPageData
  cityProjects: ProjectCardData[]
  siteUrl: string
}

export default function CityPageTemplate({ data, cityProjects, siteUrl }: Props) {
  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <span className="section-label">{data.eyebrow}</span>
            <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
              {data.h1Line1}{' '}
              <span className="highlight">{data.h1Highlight}</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'hsl(220 10% 62%)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '28px' }}>
              {data.subtitle}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <Link href="/contact" className="btn btn-primary">Get Exhibition Stall Quote</Link>
              <Link href="/contact" className="btn btn-outline">Discuss Your Exhibition Plan</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.trustPills.map(t => (
                <span key={t} style={{ fontSize: '0.8rem', padding: '5px 14px', borderRadius: '100px', background: 'hsl(222 20% 14%)', border: '1px solid hsl(222 18% 22%)', color: 'hsl(220 10% 70%)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="two-col-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: 1.3 }}>{data.introHeading}</h2>
            <div>
              <p style={{ ...MUTED, marginBottom: '14px' }}>{data.introP1}</p>
              <p style={MUTED}>{data.introP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAND OUT ────────────────────────────────────── */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={EYEBROW}>Make your brand easier to notice</span>
            <h2 style={H2}>{data.standOutHeading}</h2>
          </div>
          <div style={CARD_GRID}>
            {data.standOut.map(p => (
              <div key={p.title} style={CARD}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'hsl(110 55% 50% / 0.1)', border: '1px solid hsl(110 55% 50% / 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(110 55% 60%)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={CARD_TITLE}>{p.title}</h3>
                <p style={CARD_BODY}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={EYEBROW}>What we do</span>
            <h2 style={H2}>Our exhibition services in {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}</h2>
          </div>
          <div style={CARD_GRID}>
            {data.services.map(s => (
              <div key={s.num} style={CARD}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', color: 'hsl(230 70% 65%)', marginBottom: '14px' }}>{s.num}</p>
                <h3 style={{ ...CARD_TITLE, fontSize: '1.1rem' }}>{s.title}</h3>
                <p style={CARD_BODY}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENUE ────────────────────────────────────────── */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={H2}>
              Exhibition Venues We Serve{' '}
              <span className="highlight">in {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}</span>
            </h2>
          </div>
          <p style={{ ...MUTED, maxWidth: '900px', margin: '0 auto 12px' }}>{data.venueP1}</p>
          {data.venueP2 && <p style={{ ...MUTED, maxWidth: '900px', margin: '0 auto 44px' }}>{data.venueP2}</p>}
          {!data.venueP2 && <div style={{ marginBottom: '44px' }} />}

          <div className="venue-card-grid" style={{ display: 'grid', gridTemplateColumns: '370px 1fr', border: '1px solid hsl(222 18% 22%)', borderRadius: '20px', overflow: 'hidden' }}>

            {/* ── Photo panel ── */}
            <div style={{ position: 'relative', background: 'hsl(222 22% 12%)', minHeight: '420px' }}>
              {data.venueImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.venueImageUrl} alt={`${data.venueCardTitle} — exhibition venue`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
              ) : (
                <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(220 10% 28%)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span style={{ color: 'hsl(220 10% 30%)', fontSize: '0.78rem', textAlign: 'center', maxWidth: '130px', lineHeight: 1.5 }}>Add venue photo</span>
                </div>
              )}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(222 30% 5% / 0.92) 0%, transparent 55%)', pointerEvents: 'none' }} />
              <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'hsl(0 72% 47%)', color: '#fff', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.09em', padding: '5px 13px', borderRadius: '100px', textTransform: 'uppercase' }}>Premier Venue</span>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3, marginBottom: '6px' }}>{data.venueCardTitle}</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: 'hsl(220 10% 58%)', fontSize: '0.77rem', lineHeight: 1.4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {data.venueAddress}
                </div>
              </div>
            </div>

            {/* ── Specs panel ── */}
            <div style={{ background: 'hsl(222 20% 11%)', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'hsl(0 72% 58%)', lineHeight: 1.4, margin: 0 }}>{data.venueCardTitle}</h3>

              {data.venueSpecs.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid hsl(222 18% 20%)', borderRadius: '10px', overflow: 'hidden' }}>
                  {data.venueSpecs.map((spec, i) => (
                    <div key={spec.label} style={{
                      padding: '13px 16px',
                      background: 'hsl(222 22% 10%)',
                      borderRight: i % 2 === 0 ? '1px solid hsl(222 18% 20%)' : 'none',
                      borderBottom: i + 2 < data.venueSpecs.length ? '1px solid hsl(222 18% 20%)' : 'none',
                    }}>
                      <p style={{ fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(220 10% 38%)', marginBottom: '4px' }}>{spec.label}</p>
                      <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'hsl(0 0% 87%)', lineHeight: 1.35, margin: 0 }}>{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {data.venueNotableShows && (
                <p style={{ fontSize: '0.84rem', color: 'hsl(220 10% 50%)', lineHeight: 1.7, margin: 0 }}>
                  <strong style={{ color: 'hsl(220 10% 68%)' }}>Notable shows: </strong>
                  {data.venueNotableShows}
                </p>
              )}

              <div style={{ marginTop: 'auto' }}>
                <Link href="/contact" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
                  {data.venueCtaLabel} →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── EXHIBITIONS CAROUSEL ─────────────────────────── */}
      {data.shows.length > 0 && (
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <span style={EYEBROW}>Upcoming shows</span>
            <h2 style={{ ...H2_LEFT, marginBottom: '12px' }}>
              Major Exhibitions <span className="highlight">in {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}</span>
            </h2>
            <p style={{ ...MUTED, maxWidth: '700px', marginBottom: '36px' }}>
              A selection of upcoming trade shows and exhibitions where your brand can exhibit. Plan your stall early for the best stand allocation.
            </p>
            <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
              <ExhibitionCarousel shows={data.shows} />
            </div>
            <div style={{ marginTop: '28px' }}>
              <Link href="/tradeshow-calendar" style={{ fontSize: '0.9rem', color: 'hsl(230 70% 65%)', textDecoration: 'none' }}>
                Browse all India tradeshows →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={EYEBROW}>Sectors we serve</span>
            <h2 style={H2}>Industries we serve in {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}</h2>
          </div>
          <div style={CARD_GRID}>
            {data.industries.map(ind => (
              <div key={ind.title} style={CARD}>
                <h3 style={CARD_TITLE}>{ind.title}</h3>
                <p style={CARD_BODY}>{ind.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────── */}
      <section style={{ background: 'hsl(220 18% 7%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '100px', background: 'linear-gradient(90deg, hsl(230 80% 55%), hsl(110 55% 45%))', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
              Custom Exhibition Stalls · {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: '12px' }}>
              Our Exhibition Stall Projects <span className="highlight">in {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}</span>
            </h2>
            <p style={{ color: 'hsl(220 10% 52%)', maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
              A curated selection of custom exhibition stands designed and built by Approach Media for trade shows in this city.
            </p>
          </div>

          {cityProjects.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '4px' }}>
                {cityProjects.map(p => {
                  const hero = p.media[0]
                  const primaryIndustry = p.industries.find(i => i.isPrimary)?.industry
                  return (
                    <Link key={p.id} href={`/portfolio/${p.slug}`} style={{ position: 'relative', aspectRatio: '4/3', display: 'block', overflow: 'hidden', background: 'hsl(222 24% 12%)' }}>
                      {hero ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={hero.cdnUrl ?? hero.url} alt={hero.altText} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'hsl(220 10% 30%)', fontSize: '0.85rem' }}>No image</span>
                        </div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(222 30% 5% / 0.92) 0%, transparent 55%)', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div style={{ fontSize: '0.72rem', color: 'hsl(110 55% 65%)', fontWeight: 600, marginBottom: '3px' }}>{primaryIndustry?.name ?? 'Exhibition Stall'}</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '4px' }}>{p.client?.name ?? p.title}</div>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem', color: 'hsl(220 10% 60%)' }}>
                          {p.stallAreaSqm && <span>{Number(p.stallAreaSqm)} sqm</span>}
                          {p.buildYear && <span>{p.buildYear}</span>}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link href="/portfolio" className="btn btn-primary">View Full Portfolio →</Link>
              </div>
            </>
          ) : (
            <>
              <div className="portfolio-placeholder-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ aspectRatio: '4/3', background: 'hsl(222 24% 12%)', border: '1px solid hsl(222 18% 18%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'hsl(222 20% 16%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(220 10% 30%)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'hsl(220 10% 30%)' }}>Project coming soon</span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <p style={{ fontSize: '0.85rem', color: 'hsl(220 10% 42%)' }}>
                  Projects will appear here automatically once added via the admin panel.
                </p>
                <Link href="/portfolio" className="btn btn-outline">Browse All Projects →</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={EYEBROW}>Why work with us</span>
            <h2 style={H2}>Why choose Approach Media for exhibition stands in {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}?</h2>
          </div>
          <div style={CARD_GRID}>
            {data.whyUs.map(w => (
              <div key={w.title} style={CARD}>
                <h3 style={CARD_TITLE}>{w.title}</h3>
                <p style={CARD_BODY}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={EYEBROW}>How we work</span>
            <h2 style={H2}>Our exhibition stand process</h2>
          </div>
          <div style={CARD_GRID}>
            {data.process.map(p => (
              <div key={p.step} style={CARD}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', color: 'hsl(230 70% 65%)', marginBottom: '14px' }}>Step {p.step}</p>
                <h3 style={{ ...CARD_TITLE, fontSize: '1.05rem' }}>{p.title}</h3>
                <p style={CARD_BODY}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={EYEBROW}>FAQ</span>
          <h2 style={{ ...H2_LEFT, marginBottom: '40px' }}>Frequently Asked Questions</h2>
          <div>
            {data.faqs.map(faq => (
              <div key={faq.q} className="faq-item" style={{ borderBottom: '1px solid hsl(222 18% 18%)' }}>
                <button className="faq-question" aria-expanded="false"
                  style={{ width: '100%', textAlign: 'left', padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: 'hsl(0 0% 90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', lineHeight: 1.4 }}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={EYEBROW}>Get started</span>
          <h2 style={{ ...H2, marginBottom: '16px' }}>
            Planning to Exhibit in {data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)}?
          </h2>
          <p style={{ color: 'hsl(220 10% 55%)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.75, fontSize: '1.05rem' }}>
            Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom
            exhibition stand with practical execution support.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>Request a Quote</Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: '1rem', padding: '14px 32px' }}>Share Exhibition Brief</Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: data.schemaName,
        provider: { '@type': 'Organization', name: 'Approach Media Pvt Ltd' },
        areaServed: { '@type': 'City', name: data.schemaAreaServed },
        serviceType: 'Exhibition stand design, stall fabrication and turnkey exhibition services',
        description: data.metaDescription,
        url: `${siteUrl}${data.canonicalPath}`,
      })}} />

    </main>
  )
}
