import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedProjects } from '@/lib/db/portfolio'
import type { ProjectCardData } from '@/components/portfolio/ProjectCard'
import eventsData from '@/data/tradeshow-events.json'
import ExhibitionCarousel from './ExhibitionCarousel'
import type { ExhibitionShow } from './ExhibitionCarousel'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Agency in Surat | Exhibition Stall Design & Fabrication',
  description:
    'Approach Media Pvt Ltd helps brands plan, design, fabricate and install custom exhibition stalls in Surat for SIECC trade shows, textile expos, jewellery events, auto expos and B2B exhibitions.',
  alternates: { canonical: `${SITE_URL}/exhibition-agency-in-surat` },
}

// ── Data ─────────────────────────────────────────────────────

const SERVICES = [
  { num: '01', title: 'Custom Exhibition Stall Design',   body: 'Concepts built around your brand, product category, exhibition goal and booth size — planned for visibility, visitor flow and practical team use.' },
  { num: '02', title: '3D Stall Design & Visualization',  body: 'Review a 3D view of the proposed stall before fabrication begins. Make changes early and approve with confidence.' },
  { num: '03', title: 'Exhibition Stall Fabrication',     body: 'Custom stalls, modular stalls, shell-scheme upgrades, display areas, counters, backlit panels, partitions and storage.' },
  { num: '04', title: 'Branding, Graphics & Print',       body: 'Fascia branding, product panels, backdrop walls, standees, brochure counters, signage and LED-ready artwork.' },
  { num: '05', title: 'Turnkey Exhibition Management',    body: 'Design, production, logistics, venue installation, quality checks and post-show removal — under one coordinated team.' },
  { num: '06', title: 'Rental & Reusable Options',        body: 'Modular and reusable booth formats that keep brand presence strong while controlling cost across multiple shows.' },
]

const STAND_OUT = [
  { title: 'Clear front-facing branding',  body: 'Better visibility from crowded aisles so visitors notice you before they reach a competitor.' },
  { title: 'Smart product display zones',  body: 'Dedicated areas for samples, catalogues, machines or demos — each placed for easy access.' },
  { title: 'Meeting areas built in',       body: 'Private and semi-private spaces for buyers, dealers, distributors and trade visitors.' },
  { title: 'Lighting, graphics & finishes',body: 'Every element supports your brand identity and looks premium under exhibition lighting.' },
  { title: 'Storage & working space',      body: 'Practical back-of-stall areas keep your team organised throughout the show day.' },
  { title: 'Venue-ready execution',        body: 'We plan for organiser timelines, height permissions, electrical needs and SIECC safety rules.' },
]

const SIECC_HOSTS = [
  'Textile and machinery exhibitions',
  'Gems and jewellery exhibitions',
  'Auto and EV expos',
  'Food and beverage trade shows',
  'Industrial and manufacturing exhibitions',
  'Finance, investment and business expos',
  'Real estate and infrastructure events',
]

const INDUSTRIES = [
  { title: 'Textiles, Apparel & Machinery',             body: 'Stalls that display fabric ranges, highlight processing and create focused buyer discussion areas.' },
  { title: 'Diamonds, Gems & Jewellery',                body: 'Refined layouts with premium finishes, secure counters and focused lighting for trade visitors.' },
  { title: 'Manufacturing & Engineering',               body: 'Durable, easy-to-navigate stalls supporting machinery, components and buyer conversations.' },
  { title: 'Automobile, EV & Components',               body: 'Spaces designed for strong product visibility, vehicle display and clean visitor movement.' },
  { title: 'Food, FMCG & Hospitality Supply',           body: 'Display counters, storage and hygiene-friendly working areas built for high footfall.' },
  { title: 'Finance, Investment & Professional Services',body: 'Professional booths that communicate trust, clarity and easy consultation.' },
  { title: 'Real Estate & Infrastructure',              body: 'Stalls with model display, project visuals, enquiry counters and private discussion zones.' },
]

const WHY_US = [
  { title: 'Brand-First Stall Planning',    body: 'We start with your objective, audience, products, booth size, budget and outcome — not a stock template.' },
  { title: 'Practical 3D Design',           body: 'Concepts planned to look good and work well on the actual floor, with real attention to walking space and storage.' },
  { title: 'One Coordinated Team',          body: 'Design, fabrication, graphics, logistics, installation and dismantling — fewer gaps, faster movement.' },
  { title: 'Transparent Scope & Budgeting', body: "What's included is defined before production — design, materials, branding, lighting, furniture, transport, install, dismantle." },
  { title: 'Local Execution Awareness',     body: 'Surat exhibitions run on tight timelines. We plan with SIECC venue rules and organiser schedules in mind.' },
  { title: 'Lead-Focused Booth Layouts',    body: 'Designed to support visitor conversations, product explanation and enquiry capture — not just decoration.' },
]

const PROCESS = [
  { step: '01', title: 'Brief & Requirement Study',         body: 'Exhibition name, booth size, open sides, product category, brand guidelines, budget, visitor profile and sales goals.' },
  { step: '02', title: 'Concept & Layout Planning',         body: 'Stall direction, zoning plan and customer-flow logic so every part of the booth has a purpose.' },
  { step: '03', title: '3D Stall Design',                   body: 'Visual design showing structure, branding, counters, display areas, lighting and key design elements.' },
  { step: '04', title: 'Estimate & Scope Confirmation',     body: "Clear quotation and scope of work so you understand what's included before production." },
  { step: '05', title: 'Fabrication & Branding Production', body: 'Stall elements, graphics and display materials produced as per approved design and timeline.' },
  { step: '06', title: 'Logistics & Venue Installation',    body: 'Stall transported to the venue and installed by our execution team, with final checks before handover.' },
  { step: '07', title: 'Dismantling After the Show',        body: 'We manage dismantling and removal as per venue instructions, post-event.' },
]

const FAQS = [
  { q: 'Which is the best exhibition agency in Surat for stall design and fabrication?',
    a: 'The best agency is the one that understands your booth size, exhibition objective, brand guidelines, venue rules and execution timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Surat trade shows.' },
  { q: 'Do you provide exhibition stall design for SIECC Surat?',
    a: 'Yes. We support exhibition stall planning and execution for events at Surat International Exhibition and Convention Centre (SIECC), Sarsana, along with other trade show venues in and around Surat.' },
  { q: 'Can you create a 3D stall design before fabrication?',
    a: 'Yes. We prepare a 3D stall design so your team can review the booth layout, branding, product display, lighting and visitor movement before production begins.' },
  { q: 'How much does an exhibition stall cost in Surat?',
    a: 'It depends on booth size, design complexity, materials, open sides, branding, lighting, furniture, technology and installation requirements. Share your exhibition details to receive a customised estimate.' },
  { q: 'How early should we start planning our Surat exhibition stall?',
    a: 'For a custom stall, start at least 30–60 days before the exhibition. Larger stalls or premium finishes may need more time for design approvals and production planning.' },
  { q: 'Do you provide turnkey exhibition stall services?',
    a: 'Yes. We manage the complete process — brief, concept, 3D design, fabrication, branding, logistics, installation and dismantling.' },
  { q: 'Can you handle small booths as well as large custom stalls?',
    a: 'Yes. We support compact booths, shell scheme upgrades, modular stalls, custom-built stalls and larger island-style stands.' },
  { q: 'What details do you need to prepare a stall design?',
    a: 'Exhibition name, booth size, open sides, floor plan if available, brand logo, product details, design references, budget range and project timeline.' },
]

// Hard-coded key Surat shows + CSV top-ups
const KEY_SHOWS: ExhibitionShow[] = [
  { title: 'SITEX — Surat International Textile Expo 2026', dateRaw: '21–23 Feb 2026', categories: ['Tradeshow', 'Textile, Fabrics & Yarns', 'Apparel & Clothing'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Surat International Auto Expo 2026',            dateRaw: '13–16 Mar 2026', categories: ['Tradeshow', 'Auto & Automotive', 'Auto Shows'],              venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Sparkle International Gems & Jewellery Exhibition', dateRaw: '19–21 Mar 2026', categories: ['Tradeshow', 'Gems & Jewelry', 'Fashion & Beauty'],       venue: 'Surat (Venue TBA)',     link: null },
  { title: 'Garfab — TX Surat',                             dateRaw: '27–29 Mar 2026', categories: ['Tradeshow', 'Textile, Fabrics & Yarns'],                       venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'SGCCI Wealth Expo 2026',                        dateRaw: '8–10 May 2026',  categories: ['Tradeshow', 'Banking & Finance', 'Business Services'],        venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'SGCCI Textile Exhibition',                      dateRaw: '26–28 Jun 2026', categories: ['Tradeshow', 'Textile, Fabrics & Yarns', 'Apparel & Clothing'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Hi Life Exhibition',                            dateRaw: '26–28 Mar 2026', categories: ['Tradeshow', 'Fashion & Beauty'],                               venue: 'Surat',                 link: null },
  { title: 'Spring India Expo',                             dateRaw: '2–4 Apr 2026',   categories: ['Tradeshow', 'IT & Technology'],                               venue: 'Surat',                 link: null },
  { title: '21by72 Startup Summit',                        dateRaw: '13 Jun 2026',    categories: ['Tradeshow', 'Business Services'],                             venue: 'Surat',                 link: null },
]

// ── Helpers ───────────────────────────────────────────────────

type CsvEvent = { id: string; title: string; link: string; dateRaw: string; startDate: string | null; endDate: string | null; city: string; categories: string[] }

const csvSuratExtra = (eventsData as CsvEvent[])
  .filter(e => e.city.toLowerCase().includes('surat') && !KEY_SHOWS.some(k => e.title.toLowerCase().startsWith(k.title.toLowerCase().slice(0, 18))))
  .slice(0, 3)
  .map(e => ({ title: e.title, dateRaw: e.dateRaw, categories: e.categories, venue: e.city, link: e.link || null }))

// ── Page ─────────────────────────────────────────────────────

export default async function SuratCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Surat', limit: 6 })
  const allShows: ExhibitionShow[] = [...KEY_SHOWS, ...csvSuratExtra]

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <span className="section-label">Surat · Gujarat · India</span>
            <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
              Exhibition Agency in Surat That Builds Stalls{' '}
              <span className="highlight">Designed to Win Attention</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'hsl(220 10% 62%)', lineHeight: 1.75, maxWidth: '680px', marginBottom: '28px' }}>
              Approach Media Pvt Ltd helps exhibitors create practical, brand-led and visitor-friendly exhibition stalls
              for trade shows in Surat. From 3D concepts and fabrication to venue coordination, installation and
              dismantling — we run the complete exhibition workflow so your team can focus on meetings and conversions.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <Link href="/contact" className="btn btn-primary">Get Exhibition Stall Quote</Link>
              <Link href="/contact" className="btn btn-outline">Discuss Your Surat Expo Plan</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Custom 3D stall design', 'Fabrication & branding support', 'SIECC & Surat trade show execution', 'End-to-end project coordination'].map(t => (
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
            <div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 700, lineHeight: 1.3 }}>
                Exhibition Stall Design &amp; Fabrication for Surat Trade Shows
              </h2>
            </div>
            <div>
              <p style={{ color: 'hsl(220 10% 62%)', lineHeight: 1.8, marginBottom: '14px' }}>
                Surat is one of Gujarat&apos;s most active exhibition markets — especially for textiles, diamonds &amp; jewellery,
                manufacturing, automobiles, food, finance and real estate. For brands participating at Surat International
                Exhibition and Convention Centre (SIECC) Sarsana or other local venues, the stall must do more than look attractive.
              </p>
              <p style={{ color: 'hsl(220 10% 62%)', lineHeight: 1.8 }}>
                It needs to communicate your offer clearly, support product display, manage visitor movement and help your
                sales team start better conversations. We work with brands that need a dependable exhibition agency in Surat
                for planning, design, fabrication, branding, installation and post-show dismantling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAND OUT ────────────────────────────────────── */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={EYEBROW_STYLE}>Make your brand easier to notice</p>
            <h2 style={H2_STYLE}>Built for Crowded Surat Aisles</h2>
          </div>
          <div style={CARD_GRID_3}>
            {STAND_OUT.map(p => (
              <div key={p.title} style={SURFACE_CARD}>
                <div style={GREEN_ICON_BOX}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(110 55% 60%)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={CARD_TITLE}>{p.title}</h3>
                <p style={CARD_BODY}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SERVICES ═══════════════════════════════════════ */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={EYEBROW_STYLE}>What we do</p>
            <h2 style={H2_STYLE}>Our exhibition services in Surat</h2>
          </div>
          <div style={CARD_GRID_3}>
            {SERVICES.map(s => (
              <div key={s.num} style={SURFACE_CARD}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', color: 'hsl(230 70% 65%)', marginBottom: '14px' }}>{s.num}</p>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.35, color: 'hsl(0 0% 95%)', marginBottom: '10px' }}>{s.title}</h3>
                <p style={CARD_BODY}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ VENUE ══════════════════════════════════════════ */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container">
          <div className="two-col-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
            {/* Left */}
            <div>
              <p style={EYEBROW_STYLE}>Venue expertise</p>
              <h2 style={{ ...H2_STYLE, textAlign: 'left' }}>
                Exhibition stall contractor for SIECC, Sarsana &amp; Surat trade venues
              </h2>
              <p style={{ color: 'hsl(220 10% 58%)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '16px' }}>
                Many major trade exhibitions in Surat are hosted at Surat International Exhibition and Convention Centre
                (SIECC), Sarsana — known for large-format exhibitions, B2B trade events and industry-focused shows
                across South Gujarat&apos;s business ecosystem.
              </p>
              <p style={{ color: 'hsl(220 10% 58%)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '32px' }}>
                Stall execution depends on build-up schedules, material movement, electrical planning, organiser rules,
                height permissions, safety requirements and installation timelines. We plan each stall with these
                practical details in mind.
              </p>
              <Link href="/contact" className="btn btn-primary">Plan My Stall for SIECC →</Link>
            </div>

            {/* Right: SIECC hosts card */}
            <div style={{ background: 'hsl(222 20% 13%)', border: '1px solid hsl(222 18% 22%)', borderRadius: '20px', padding: '32px 36px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'hsl(0 0% 94%)', marginBottom: '24px' }}>SIECC hosts</h3>
              <ul style={{ display: 'grid', gap: '14px', listStyle: 'none', padding: 0, margin: 0 }}>
                {SIECC_HOSTS.map(v => (
                  <li key={v} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.95rem', color: 'hsl(220 10% 65%)' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid hsl(110 55% 50%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="hsl(110 55% 60%)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════ EXHIBITIONS CAROUSEL ═══════════════════════════ */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <p style={EYEBROW_STYLE}>Upcoming shows</p>
          <h2 style={{ ...H2_STYLE, textAlign: 'left', marginBottom: '12px' }}>
            Major Exhibitions <span className="highlight">in Surat</span>
          </h2>
          <p style={{ color: 'hsl(220 10% 58%)', lineHeight: 1.75, maxWidth: '700px', marginBottom: '36px' }}>
            Surat hosts a commercially active exhibition calendar throughout the year, with key shows across textiles,
            automobiles, diamonds &amp; jewellery, food processing and financial services. Most major exhibitions take
            place at SIECC, Sarsana and are primarily organised by SGCCI.
          </p>
          <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <ExhibitionCarousel shows={allShows} />
          </div>
          <div style={{ marginTop: '28px' }}>
            <Link href="/tradeshow-calendar" style={{ fontSize: '0.9rem', color: 'hsl(230 70% 65%)', textDecoration: 'none' }}>
              Browse all India tradeshows →
            </Link>
          </div>
        </div>
      </section>

      {/* ════ INDUSTRIES ═════════════════════════════════════ */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={EYEBROW_STYLE}>Sectors we serve</p>
            <h2 style={H2_STYLE}>Industries we serve in Surat</h2>
          </div>
          <div style={CARD_GRID_3}>
            {INDUSTRIES.map(ind => (
              <div key={ind.title} style={SURFACE_CARD}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.35, color: 'hsl(0 0% 95%)', marginBottom: '10px' }}>{ind.title}</h3>
                <p style={CARD_BODY}>{ind.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PORTFOLIO ══════════════════════════════════════ */}
      <section style={{ background: 'hsl(220 18% 7%)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '100px', background: 'linear-gradient(90deg, hsl(230 80% 55%), hsl(110 55% 45%))', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
              Custom Exhibition Stalls Surat
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: '12px' }}>
              Our Exhibition Stall Projects <span className="highlight">in Surat</span>
            </h2>
            <p style={{ color: 'hsl(220 10% 52%)', maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
              A curated portfolio of custom exhibition stands designed and built by Approach Media for Surat&apos;s leading
              trade shows — from compact 9 sqm booths to island-format stands across textile, diamond and automotive sectors.
            </p>
          </div>

          {cityProjects.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '4px' }}>
                {cityProjects.map((p: ProjectCardData) => {
                  const hero = p.media[0]
                  const primaryIndustry = p.industries.find(i => i.isPrimary)?.industry
                  return (
                    <Link key={p.id} href={`/portfolio/${p.slug}`}
                      style={{ position: 'relative', aspectRatio: '4/3', display: 'block', overflow: 'hidden', background: 'hsl(222 24% 12%)' }}>
                      {hero ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={hero.cdnUrl ?? hero.url} alt={hero.altText}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'hsl(220 10% 30%)', fontSize: '0.85rem' }}>No image</span>
                        </div>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(222 30% 5% / 0.92) 0%, transparent 55%)', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div style={{ fontSize: '0.72rem', color: 'hsl(110 55% 65%)', fontWeight: 600, marginBottom: '3px' }}>
                          {primaryIndustry?.name ?? 'Exhibition Stall'}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '4px' }}>
                          {p.client?.name ?? p.title}
                        </div>
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
                <p style={{ fontSize: '0.85rem', color: 'hsl(220 10% 42%)' }}>Surat portfolio projects will appear here automatically once added in the admin panel.</p>
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
            <p style={EYEBROW_STYLE}>Why work with us</p>
            <h2 style={H2_STYLE}>Why choose Approach Media for exhibition stalls in Surat?</h2>
          </div>
          <div style={CARD_GRID_3}>
            {WHY_US.map(w => (
              <div key={w.title} style={SURFACE_CARD}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.35, color: 'hsl(0 0% 95%)', marginBottom: '10px' }}>{w.title}</h3>
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
            <p style={EYEBROW_STYLE}>How we work</p>
            <h2 style={H2_STYLE}>Our exhibition stall process for Surat</h2>
          </div>
          <div style={CARD_GRID_3}>
            {PROCESS.map(p => (
              <div key={p.step} style={SURFACE_CARD}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em', color: 'hsl(230 70% 65%)', marginBottom: '14px' }}>Step {p.step}</p>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.35, color: 'hsl(0 0% 95%)', marginBottom: '10px' }}>{p.title}</h3>
                <p style={CARD_BODY}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p style={EYEBROW_STYLE}>FAQ</p>
          <h2 style={{ ...H2_STYLE, textAlign: 'left', marginBottom: '40px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gap: '0' }}>
            {FAQS.map(faq => (
              <div key={faq.q} className="faq-item" style={{ borderBottom: '1px solid hsl(222 18% 18%)' }}>
                <button
                  className="faq-question"
                  aria-expanded="false"
                  style={{ width: '100%', textAlign: 'left', padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: 'hsl(0 0% 90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', lineHeight: 1.4 }}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ background: 'hsl(222 22% 9%)', padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={EYEBROW_STYLE}>Get started</p>
          <h2 style={H2_STYLE}>Planning to Exhibit in Surat?</h2>
          <p style={{ color: 'hsl(220 10% 55%)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.75, fontSize: '1.05rem' }}>
            Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom
            exhibition stall for Surat with practical execution support.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>Request a Quote</Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: '1rem', padding: '14px 32px' }}>Share Exhibition Brief</Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'LocalBusiness',
        name: 'Approach Media Pvt. Ltd. — Exhibition Agency in Surat',
        areaServed: 'Surat, Gujarat, India',
        description: 'Exhibition stall design, fabrication and turnkey execution in Surat for SIECC Sarsana and other trade venues.',
        url: `${SITE_URL}/exhibition-agency-in-surat`,
      })}} />
    </main>
  )
}

// ── Design tokens (keep next to usage) ────────────────────────

const EYEBROW_STYLE: React.CSSProperties = {
  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.22em',
  textTransform: 'uppercase', color: 'hsl(110 55% 55%)', marginBottom: '12px',
  display: 'block',
}

const H2_STYLE: React.CSSProperties = {
  fontSize: 'clamp(1.75rem, 3.5vw, 2.8rem)', fontWeight: 700,
  lineHeight: 1.2, color: 'hsl(0 0% 95%)', textAlign: 'center',
}

const CARD_GRID_3: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '20px',
}

const SURFACE_CARD: React.CSSProperties = {
  background: 'hsl(222 22% 12%)',
  border: '1px solid hsl(222 18% 20%)',
  borderRadius: '16px',
  padding: '28px',
}

const CARD_TITLE: React.CSSProperties = {
  fontSize: '1.05rem', fontWeight: 700,
  color: 'hsl(0 0% 95%)', marginBottom: '10px', marginTop: '16px',
}

const CARD_BODY: React.CSSProperties = {
  fontSize: '0.875rem', color: 'hsl(220 10% 55%)',
  lineHeight: 1.7, margin: 0,
}

const GREEN_ICON_BOX: React.CSSProperties = {
  width: '36px', height: '36px', borderRadius: '10px',
  background: 'hsl(110 55% 50% / 0.1)',
  border: '1px solid hsl(110 55% 50% / 0.2)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}
