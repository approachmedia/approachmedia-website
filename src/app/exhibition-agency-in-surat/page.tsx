import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedProjects } from '@/lib/db/portfolio'
import ProjectCard from '@/components/portfolio/ProjectCard'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Agency in Surat | Exhibition Stall Design & Fabrication',
  description:
    'Approach Media Pvt Ltd helps brands plan, design, fabricate and install custom exhibition stalls in Surat for SIECC trade shows, textile expos, jewellery events, auto expos and B2B exhibitions.',
  alternates: { canonical: `${SITE_URL}/exhibition-agency-in-surat` },
}

const SERVICES = [
  {
    num: '01',
    title: 'Custom Exhibition Stall Design',
    body: 'We create stall concepts based on your brand, product category, exhibition goal and available booth size. The layout is planned for visibility, visitor flow, product display and practical team use during the show.',
  },
  {
    num: '02',
    title: '3D Stall Design and Visualization',
    body: 'Before fabrication begins, you can review a 3D view of the proposed stall. This helps your team understand the final look, make changes early and approve the design with confidence.',
  },
  {
    num: '03',
    title: 'Exhibition Stall Fabrication',
    body: 'We support fabrication for custom stalls, modular stalls, shell scheme upgrades, product display areas, reception counters, branding panels, backlit graphics, partitions and storage spaces.',
  },
  {
    num: '04',
    title: 'Branding, Graphics & Print Production',
    body: 'We convert your brand communication into exhibition-ready graphics — fascia branding, product panels, backdrop walls, standees, brochure counters, directional signage, LED-ready artwork and display communication.',
  },
  {
    num: '05',
    title: 'Turnkey Exhibition Management',
    body: 'We manage the full flow from brief to dismantling — design, estimation, production, logistics, venue installation, final quality checks and post-show removal.',
  },
  {
    num: '06',
    title: 'Rental & Reusable Stall Options',
    body: 'Need a cost-conscious or repeat-use solution? We plan modular and reusable booth formats that keep your brand presence strong while controlling production effort across multiple shows.',
  },
]

const WHY_POINTS = [
  { title: 'Clear front-facing branding', body: 'Better visibility from crowded aisles so visitors notice you before they reach a competitor.' },
  { title: 'Smart product display zones', body: 'Dedicated areas for samples, catalogues, machines or demos, each placed for easy access.' },
  { title: 'Meeting areas built in', body: 'Private and semi-private spaces for buyers, dealers, distributors and trade visitors.' },
  { title: 'Lighting, graphics & finishes', body: 'Every element supports your brand identity and makes the stall look premium under exhibition lighting.' },
  { title: 'Storage & working space', body: 'Practical back-of-stall areas keep your team organised throughout the show day.' },
  { title: 'Venue-ready execution', body: 'We plan for organiser timelines, height permissions, electrical requirements and SIECC safety rules.' },
]

const INDUSTRIES = [
  { title: 'Textiles, Apparel & Machinery', body: 'Stalls that display fabric ranges, highlight embroidery and processing, and create focused discussion areas for buyers and distributors.' },
  { title: 'Diamonds, Gems & Jewellery', body: 'Refined booth layouts with premium finishes, controlled display zones, secure counters and focused lighting for trade and retail visitors.' },
  { title: 'Manufacturing & Engineering', body: 'Durable, easy-to-navigate stalls that support machinery and component displays, demo areas and buyer conversations.' },
  { title: 'Automobile, EV & Components', body: 'Spaces designed for strong product visibility, vehicle display, lead capture and clear visitor movement for auto and EV expositions.' },
  { title: 'Food, FMCG & Hospitality Supply', body: 'Display counters, storage, hygiene-friendly working areas and communication walls built for high footfall food and beverage shows.' },
  { title: 'Finance, Investment & Professional Services', body: 'Professional booths that communicate trust, clarity and easy consultation for banks, NBFCs, fintech and advisory companies.' },
  { title: 'Real Estate & Infrastructure', body: 'Stalls supporting model display, project visuals, enquiry counters, private discussions and digital presentations.' },
]

const WHY_US = [
  { title: 'Brand-First Stall Planning', body: 'We start with your business objective, target audience, products, booth size, budget and expected outcome — not a stock template.' },
  { title: 'Practical 3D Design', body: 'Our stall concepts are planned to look good and work well on the actual exhibition floor, with real attention to walking space and storage.' },
  { title: 'One Coordinated Team', body: 'Design, fabrication, graphics, logistics, installation and dismantling — one team, fewer coordination gaps, faster project movement.' },
  { title: 'Transparent Scope & Budgeting', body: 'We define what is included before production begins — design, materials, branding, lighting, furniture, transport, installation and dismantling.' },
  { title: 'Local Execution Awareness', body: 'Surat exhibitions run on tight timelines. We plan with SIECC venue rules, organiser schedules and practical installation needs in mind.' },
  { title: 'Lead-Focused Booth Layouts', body: 'The stall is designed to support visitor conversations, product explanation and enquiry capture — not just visual decoration.' },
]

const PROCESS = [
  { step: '01', title: 'Brief & Requirement Study', body: 'We begin with your exhibition name, booth size, open sides, product category, brand guidelines, budget, expected visitor profile and sales goals.' },
  { step: '02', title: 'Concept & Layout Planning', body: 'Our team prepares the basic stall direction, zoning plan and customer-flow logic so every part of the booth has a purpose.' },
  { step: '03', title: '3D Stall Design', body: 'You receive a visual design showing structure, branding, counters, display areas, lighting and key design elements.' },
  { step: '04', title: 'Estimate & Scope Confirmation', body: 'We share a clear quotation and scope of work so you understand what is included before the project moves into production.' },
  { step: '05', title: 'Fabrication & Branding Production', body: 'Stall elements, graphics and display materials are produced as per approved design and timeline.' },
  { step: '06', title: 'Logistics & Venue Installation', body: 'The stall is transported to the venue and installed by our execution team. Final checks are done before handover.' },
  { step: '07', title: 'Dismantling After the Show', body: 'After the exhibition, we manage dismantling and removal as per venue instructions.' },
]

const FAQS = [
  {
    q: 'Which is the best exhibition agency in Surat for stall design and fabrication?',
    a: 'The best agency is the one that understands your booth size, exhibition objective, brand guidelines, venue rules and execution timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Surat trade shows.',
  },
  {
    q: 'Do you provide exhibition stall design for SIECC Surat?',
    a: 'Yes. We support exhibition stall planning and execution for events at Surat International Exhibition and Convention Centre (SIECC), Sarsana, along with other trade show venues in and around Surat.',
  },
  {
    q: 'Can you create a 3D stall design before fabrication?',
    a: 'Yes. We prepare a 3D stall design so your team can review the booth layout, branding, product display, lighting and visitor movement before production begins.',
  },
  {
    q: 'How much does an exhibition stall cost in Surat?',
    a: 'The cost depends on booth size, design complexity, materials, open sides, branding, lighting, furniture, technology and installation requirements. Share your exhibition details and booth size to receive a customised estimate.',
  },
  {
    q: 'How early should we start planning our Surat exhibition stall?',
    a: 'For a custom stall, start at least 30 to 60 days before the exhibition. Larger stalls, special structures or premium finishes may need more time for design approvals and production planning.',
  },
  {
    q: 'Do you provide turnkey exhibition stall services?',
    a: 'Yes. Approach Media Pvt Ltd can manage the complete process — brief, concept, 3D design, fabrication, branding, logistics, installation and dismantling.',
  },
  {
    q: 'Can you handle small booths as well as large custom stalls?',
    a: 'Yes. We support compact booths, shell scheme upgrades, modular stalls, custom-built stalls, product display areas and larger island-style exhibition stands.',
  },
  {
    q: 'What details do you need to prepare a stall design?',
    a: 'Exhibition name, booth size, open sides, floor plan if available, brand logo, product details, design references, budget range, expected deliverables and project timeline.',
  },
]

export default async function SuratCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Surat', limit: 6 })

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <span className="section-label">Surat Exhibition Stall Design &amp; Fabrication</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}>
              Exhibition Agency in Surat That Builds Stalls{' '}
              <span className="highlight">Designed to Win Attention</span>
            </h1>
            <p className="section-subtitle" style={{ textAlign: 'left', maxWidth: '680px', marginLeft: 0 }}>
              Approach Media Pvt Ltd helps exhibitors create practical, brand-led and visitor-friendly exhibition stalls
              for trade shows in Surat. From 3D stall concepts and fabrication to venue coordination, installation and
              dismantling, we manage the complete exhibition workflow so your team can focus on meetings, enquiries and conversions.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '28px' }}>
              <Link href="/contact" className="btn btn-primary">Get Exhibition Stall Quote</Link>
              <Link href="/contact" className="btn btn-outline">Discuss Your Surat Expo Plan</Link>
            </div>
            {/* Trust pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '28px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '48px', alignItems: 'start' }} className="two-col-stack">
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                Exhibition Stall Design and Fabrication Support for Surat Trade Shows
              </h2>
            </div>
            <div>
              <p style={{ color: 'hsl(220 10% 65%)', lineHeight: 1.75, marginBottom: '16px' }}>
                Surat is one of Gujarat&apos;s most active exhibition markets — especially for textiles, diamonds and jewellery,
                manufacturing, automobiles, food, finance and real estate. For brands participating in exhibitions at Surat
                International Exhibition and Convention Centre (SIECC), Sarsana or other local venues, the stall must do more than
                look attractive.
              </p>
              <p style={{ color: 'hsl(220 10% 65%)', lineHeight: 1.75 }}>
                It needs to communicate your offer clearly, support product display, manage visitor movement and help your sales team
                start better conversations. Approach Media Pvt Ltd works with brands that need a dependable exhibition agency in Surat
                for planning, design, fabrication, branding, installation and post-show dismantling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY SURAT EXHIBITORS NEED A STRONG STALL PARTNER ── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <span className="section-label">Stand Out on the Show Floor</span>
          <h2 className="section-title">Make Your Brand Easier to Notice on a Busy Show Floor</h2>
          <p className="section-subtitle">
            In Surat exhibitions, visitors move quickly across crowded aisles, comparing multiple suppliers in the same category.
            A well-designed stall helps your brand stand apart through strong visibility, clean messaging and a layout that makes it
            easy for people to enter, explore and interact.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {WHY_POINTS.map(p => (
              <div key={p.title} className="card" style={{ padding: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, hsl(230 64% 52% / 0.2), hsl(110 55% 50% / 0.15))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(230 70% 70%)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'hsl(0 0% 92%)' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Our Exhibition Services in Surat</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {SERVICES.map(s => (
              <div key={s.num} className="card animate-in" style={{ padding: '28px', position: 'relative' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(230 60% 65%)', letterSpacing: '0.18em', marginBottom: '12px' }}>{s.num}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', color: 'hsl(0 0% 92%)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENUE ────────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '48px', alignItems: 'center' }} className="two-col-stack">
            <div>
              <span className="section-label">Venue Expertise</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.3, marginBottom: '16px' }}>
                Exhibition Stall Contractor for SIECC, Sarsana &amp; Surat Trade Venues
              </h2>
              <p style={{ color: 'hsl(220 10% 65%)', lineHeight: 1.75, marginBottom: '16px' }}>
                Many major trade exhibitions in Surat are hosted at Surat International Exhibition and Convention Centre (SIECC),
                Sarsana. The venue is known for large-format exhibitions, B2B trade events, conventions and industry-focused shows
                organized around South Gujarat&apos;s business ecosystem.
              </p>
              <p style={{ color: 'hsl(220 10% 65%)', lineHeight: 1.75, marginBottom: '28px' }}>
                Stall execution depends on build-up schedules, material movement, electrical planning, organizer rules, height
                permissions, safety requirements and installation timelines. We plan each stall with these practical details in mind.
              </p>
              <Link href="/contact" className="btn btn-primary">Plan My Stall for SIECC</Link>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              {[
                'Surat International Exhibition & Convention Centre (SIECC)',
                'Textile and machinery exhibitions',
                'Gems and jewellery exhibitions',
                'Auto and EV expos',
                'Food and beverage trade shows',
                'Industrial and manufacturing exhibitions',
                'Finance, investment and business expos',
                'Real estate and infrastructure events',
              ].map(v => (
                <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'hsl(222 20% 12%)', border: '1px solid hsl(222 18% 20%)', borderRadius: '8px', fontSize: '0.875rem', color: 'hsl(220 10% 72%)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(110 55% 55%)" strokeWidth="2.5" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="section-label">Sectors We Serve</span>
          <h2 className="section-title">Industries We Serve in Surat</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {INDUSTRIES.map(ind => (
              <div key={ind.title} className="card animate-in" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: 'hsl(0 0% 92%)' }}>{ind.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{ind.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO (city-filtered) ─────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Exhibition Stalls We&apos;ve Built in Surat</h2>
          <p className="section-subtitle">
            A selection of exhibition stalls designed and fabricated by Approach Media for Surat trade shows.
          </p>

          {cityProjects.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '36px' }}>
                {cityProjects.map(p => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link href="/portfolio" className="btn btn-outline">View Full Portfolio</Link>
              </div>
            </>
          ) : (
            <div style={{ marginTop: '36px', padding: '48px 32px', background: 'hsl(222 20% 12%)', border: '1px solid hsl(222 18% 20%)', borderRadius: '14px', textAlign: 'center' }}>
              <p style={{ color: 'hsl(220 10% 50%)', fontSize: '0.95rem', marginBottom: '16px' }}>
                Surat portfolio projects will appear here automatically once added to the admin panel.
              </p>
              <Link href="/portfolio" className="btn btn-outline">Browse All Projects</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY APPROACH MEDIA ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="section-label">Why Work With Us</span>
          <h2 className="section-title">Why Work With Approach Media Pvt Ltd for Exhibition Stalls in Surat?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {WHY_US.map(w => (
              <div key={w.title} className="card animate-in" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', color: 'hsl(0 0% 92%)' }}>{w.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <span className="section-label">How We Work</span>
          <h2 className="section-title">Our Exhibition Stall Process for Surat</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px', marginTop: '40px' }}>
            {PROCESS.map(p => (
              <div key={p.step} className="card animate-in" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(230 60% 65%)', letterSpacing: '0.18em', marginBottom: '10px' }}>Step {p.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'hsl(0 0% 92%)' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR SHOW CATEGORIES ──────────────────────── */}
      <section className="section">
        <div className="container">
          <span className="section-label">Tradeshow Landscape</span>
          <h2 className="section-title">Popular Trade Show Categories in Surat</h2>
          <p className="section-subtitle">
            Surat&apos;s exhibition calendar is strongly connected with South Gujarat&apos;s commercial strengths. Brands often
            look for exhibition stall designers in Surat for:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '32px' }}>
            {[
              'Textile machinery & fabric exhibitions',
              'Diamond, gems & jewellery exhibitions',
              'Auto, EV & commercial vehicle expos',
              'Food & beverage trade shows',
              'Industrial, engineering & MSME exhibitions',
              'Finance, wealth & investment expos',
              'Real estate & property exhibitions',
              'Technology, startup & business networking events',
            ].map(cat => (
              <span key={cat} style={{ padding: '10px 18px', background: 'hsl(222 20% 12%)', border: '1px solid hsl(222 18% 22%)', borderRadius: '8px', fontSize: '0.875rem', color: 'hsl(220 10% 72%)' }}>
                {cat}
              </span>
            ))}
          </div>
          <div style={{ marginTop: '24px' }}>
            <Link href="/tradeshow-calendar" style={{ fontSize: '0.9rem', color: 'hsl(230 70% 65%)', textDecoration: 'none' }}>
              Browse India Tradeshow Calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list" style={{ marginTop: '36px' }}>
            {FAQS.map(faq => (
              <div key={faq.q} className="faq-item" style={{ borderBottom: '1px solid hsl(222 18% 18%)', paddingBottom: '4px' }}>
                <button className="faq-question" style={{ width: '100%', textAlign: 'left', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, color: 'hsl(0 0% 90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  {faq.q}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                <div className="faq-answer" style={{ paddingBottom: '18px', color: 'hsl(220 10% 62%)', lineHeight: 1.75, fontSize: '0.925rem', display: 'none' }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container text-center">
          <span className="section-label">Get Started</span>
          <h2 className="section-title">Planning to Exhibit in Surat?</h2>
          <p className="section-subtitle">
            Share your booth size, exhibition name, city, brand details and timeline. Our team will help you plan a custom
            exhibition stall design for Surat with practical execution support.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>Request a Quote</Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: '1.05rem', padding: '14px 32px' }}>Share Exhibition Brief</Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Exhibition Agency in Surat',
            provider: { '@type': 'Organization', name: 'Approach Media Pvt Ltd' },
            areaServed: { '@type': 'City', name: 'Surat' },
            serviceType: 'Exhibition stall design, fabrication and turnkey exhibition services',
            description:
              'Approach Media Pvt Ltd provides exhibition stall design, 3D visualization, fabrication, branding, installation and dismantling support for trade shows in Surat.',
          }),
        }}
      />
    </main>
  )
}
