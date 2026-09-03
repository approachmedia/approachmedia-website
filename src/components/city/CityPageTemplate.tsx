import Image from 'next/image'
import Link from 'next/link'
import type { ProjectCardData } from '@/components/portfolio/ProjectCard'
import CityProjectsCarousel from './CityProjectsCarousel'
import ExhibitionCarousel from './ExhibitionCarousel'
import { CityChapters } from './CityChapters'
import './city-chapters.css'
import type { CityPageData } from './types'

/**
 * The 15 city landing pages, as a chaptered editorial feature.
 *
 * Five of this template's sections used to be the same centred card grid on
 * two alternating grounds; they are now five different chapters, each on its
 * own ground. The shape lives in CityChapters; this file stays the server
 * component that assembles the data, and it still owns the three things that
 * were deliberately not rebuilt:
 *
 *   · the PORTFOLIO section, untouched at the owner's instruction;
 *   · the FAQ markup, whose class names LegacyScripts binds to;
 *   · the JSON-LD graph.
 *
 * No copy changed anywhere in this rebuild.
 */

const EYEBROW: React.CSSProperties = {
  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em',
  textTransform: 'uppercase', color: 'hsl(110 55% 55%)',
  marginBottom: '12px', display: 'block',
}

const H2_LEFT: React.CSSProperties = {
  fontSize: 'clamp(1.75rem, 3.5vw, 2.8rem)', fontWeight: 700,
  lineHeight: 1.2, color: 'hsl(0 0% 95%)', textAlign: 'left',
}

const MUTED: React.CSSProperties = {
  color: 'hsl(220 10% 58%)', lineHeight: 1.8, fontSize: '1.05rem',
}

/**
 * Below this many projects the 3D carousel has too few planes to read as a
 * row — it looks like a bug rather than an effect — so those cities keep the
 * grid. Cities with a deep portfolio get the carousel.
 */
const CAROUSEL_MIN = 8

interface Props {
  data: CityPageData
  cityProjects: ProjectCardData[]
  siteUrl: string
  /** Optional "From the blog" block — only the Ahmedabad page passes this. */
  fromTheBlog?: { title: string; href: string }[]
}

export default function CityPageTemplate({ data, cityProjects, siteUrl, fromTheBlog }: Props) {
  const City = data.citySlug.charAt(0).toUpperCase() + data.citySlug.slice(1)

  // ── The untouched Portfolio section, verbatim from the previous template ──
  const portfolio = (
    <section style={{ background: 'hsl(220 18% 7%)', padding: '80px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '100px', background: 'linear-gradient(90deg, hsl(230 80% 55%), hsl(110 55% 45%))', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
            Custom Exhibition Stalls · {City}
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: '12px' }}>
            Our Exhibition Stall Projects <span className="highlight">in {City}</span>
          </h2>
          <p style={{ color: 'hsl(220 10% 52%)', maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            A curated selection of custom exhibition stands designed and built by Approach Media for trade shows in this city.
          </p>
        </div>

        {cityProjects.length >= CAROUSEL_MIN ? (
          <>
            <CityProjectsCarousel projects={cityProjects} />
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Link href="/portfolio" className="btn btn-primary">View Full Portfolio →</Link>
            </div>
          </>
        ) : cityProjects.length > 0 ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '4px' }}>
              {cityProjects.map(p => {
                const hero = p.media[0]
                const primaryIndustry = p.industries.find(i => i.isPrimary)?.industry
                return (
                  <Link key={p.id} href={`/portfolio/${p.slug}`} style={{ position: 'relative', aspectRatio: '4/3', display: 'block', overflow: 'hidden', background: 'hsl(222 24% 12%)' }}>
                    {hero ? (
                      <Image
                        src={hero.cdnUrl ?? hero.url}
                        alt={hero.altText}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
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
  )

  // ── The upcoming-shows carousel, unchanged in behaviour ──
  const calendar = data.shows.length > 0 ? (
    <>
      <div data-sc-in>
        <span style={EYEBROW}>Upcoming shows</span>
        <h2 style={{ ...H2_LEFT, marginBottom: '12px' }}>
          Major Exhibitions <span className="highlight">in {City}</span>
        </h2>
        <p style={{ ...MUTED, maxWidth: '700px', marginBottom: '36px' }}>
          A selection of upcoming trade shows and exhibitions where your brand can exhibit. Plan your stall early for the best stand allocation.
        </p>
      </div>
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <ExhibitionCarousel shows={data.shows} />
      </div>
      <div style={{ marginTop: '28px' }}>
        <Link href="/tradeshow-calendar" style={{ fontSize: '0.9rem', color: 'hsl(230 70% 65%)', textDecoration: 'none' }}>
          Browse all India tradeshows →
        </Link>
      </div>
    </>
  ) : null

  // ── FAQ. The markup LegacyScripts binds to, unchanged. ──
  const faq = (
    <>
      <span style={EYEBROW}>FAQ</span>
      <h2 style={{ ...H2_LEFT, marginBottom: '40px' }}>Frequently Asked Questions</h2>
      <div>
        {data.faqs.map(faqItem => (
          <div key={faqItem.q} className="faq-item" style={{ borderBottom: '1px solid hsl(222 18% 18%)' }}>
            <button className="faq-question" aria-expanded="false"
              style={{ width: '100%', textAlign: 'left', padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: 'hsl(0 0% 90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', lineHeight: 1.4 }}>
              <span>{faqItem.q}</span>
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer"><p>{faqItem.a}</p></div>
          </div>
        ))}
      </div>
    </>
  )

  // ── The close: a masthead plate. Same copy, same two CTAs, same links. ──
  const colophon = (
    <>
      <div>
        <span style={EYEBROW}>Get started</span>
        <h2 style={{ ...H2_LEFT, fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)' }}>
          Planning to Exhibit in {City}?
        </h2>
      </div>
      <div>
        <p style={{ color: 'hsl(220 10% 58%)', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
          Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom
          exhibition stand with practical execution support.
        </p>
        <div className="cty-colo__acts">
          <Link href="/contact" className="btn btn-primary">Request a Quote</Link>
          <Link href="/contact" className="btn btn-outline">Share Exhibition Brief</Link>
        </div>
        <p className="cty-colo__run">
          Already have a design approved? See how we handle{' '}
          <Link href="/services/custom-booth-fabrication">custom booth fabrication</Link>{' '}
          in our own workshop, or read about{' '}
          <Link href="/services/double-decker-mezzanine-stands">mezzanine stall design</Link>{' '}
          if your footprint can carry a second floor.
        </p>
        {fromTheBlog && fromTheBlog.length > 0 && (
          <div style={{ marginTop: '26px', borderTop: '1px solid hsl(222 18% 20%)', paddingTop: '18px' }}>
            <p style={{ fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'hsl(220 10% 42%)', margin: '0 0 12px' }}>From the blog</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {fromTheBlog.map(post => (
                <li key={post.href} style={{ padding: '9px 0', borderTop: '1px solid hsl(222 18% 15%)' }}>
                  <Link href={post.href} style={{ fontSize: '0.9rem', color: 'hsl(110 55% 60%)', textDecoration: 'none' }}>{post.title} →</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )

  return (
    <main>
      <CityChapters
        data={data}
        cap={`A custom stand on the show floor. Designed, fabricated and installed by Approach Media.`}
        calendar={calendar}
        portfolio={portfolio}
        faq={faq}
        colophon={colophon}
      />

      {/*
        JSON-LD. Was a bare Service node; now a full graph so the page can
        earn FAQ rich results and so the organisation is a real entity rather
        than an inline name string. FAQ answers come from data.faqs — the copy
        already on the page — so the markup never states anything the visitor
        cannot also read.
      */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'LocalBusiness',
            '@id': `${siteUrl}#organization`,
            name: 'Approach Media Pvt. Ltd.',
            url: `${siteUrl}/`,
            description: 'Exhibition stall design and fabrication company in Ahmedabad, India.',
            telephone: ['+919426912602', '+919898644327', '+919427614395'],
            email: 'info@approachmedia.in',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '302, 3rd Floor, Chase House, Sheetal Baug Society, Opp. Induben Khakhrawala, Off C. G. Road, Nr. Mithakhali Circle',
              addressLocality: 'Ahmedabad',
              addressRegion: 'Gujarat',
              addressCountry: 'IN',
            },
            areaServed: [
              'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore',
              'Hyderabad', 'Chennai', 'Pune',
            ].map(name => ({ '@type': 'City', name })),
          },
          {
            '@type': 'Service',
            name: data.schemaName,
            serviceType: 'Exhibition stall design and fabrication',
            provider: { '@id': `${siteUrl}#organization` },
            areaServed: { '@type': 'City', name: data.schemaAreaServed },
            description: data.metaDescription,
            url: `${siteUrl}${data.canonicalPath}`,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: data.schemaName, item: `${siteUrl}${data.canonicalPath}` },
            ],
          },
          {
            '@type': 'FAQPage',
            mainEntity: data.faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ],
      })}} />
    </main>
  )
}
