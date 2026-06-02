import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedProjects } from '@/lib/db/portfolio'
import type { ProjectCardData } from '@/components/portfolio/ProjectCard'
import eventsData from '@/data/tradeshow-events.json'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export const metadata: Metadata = {
  title: 'Exhibition Agency in Surat | Exhibition Stall Design & Fabrication',
  description:
    'Approach Media Pvt Ltd helps brands plan, design, fabricate and install custom exhibition stalls in Surat for SIECC trade shows, textile expos, jewellery events, auto expos and B2B exhibitions.',
  alternates: { canonical: `${SITE_URL}/exhibition-agency-in-surat` },
}

// ── Static data ───────────────────────────────────────────────

const SERVICES = [
  { num: '01', title: 'Custom Exhibition Stall Design', body: 'Concepts built around your brand, product category, exhibition goal and booth size — planned for visibility, visitor flow and practical team use.' },
  { num: '02', title: '3D Stall Design & Visualization', body: 'Review a 3D view of the proposed stall before fabrication begins. Make changes early and approve with confidence.' },
  { num: '03', title: 'Exhibition Stall Fabrication', body: 'Custom stalls, modular stalls, shell-scheme upgrades, display areas, counters, backlit panels, partitions and storage.' },
  { num: '04', title: 'Branding, Graphics & Print', body: 'Fascia branding, product panels, backdrop walls, standees, brochure counters, signage and LED-ready artwork.' },
  { num: '05', title: 'Turnkey Exhibition Management', body: 'Design, production, logistics, venue installation, quality checks and post-show removal — under one coordinated team.' },
  { num: '06', title: 'Rental & Reusable Options', body: 'Modular and reusable booth formats that keep brand presence strong while controlling cost across multiple shows.' },
]

const STAND_OUT = [
  { title: 'Clear front-facing branding', body: 'Better visibility from crowded aisles so visitors notice you before they reach a competitor.' },
  { title: 'Smart product display zones', body: 'Dedicated areas for samples, catalogues, machines or demos — each placed for easy access.' },
  { title: 'Meeting areas built in', body: 'Private and semi-private spaces for buyers, dealers, distributors and trade visitors.' },
  { title: 'Lighting, graphics & finishes', body: 'Every element supports your brand identity and looks premium under exhibition lighting.' },
  { title: 'Storage & working space', body: 'Practical back-of-stall areas keep your team organised throughout the show day.' },
  { title: 'Venue-ready execution', body: 'We plan for organiser timelines, height permissions, electrical needs and SIECC safety rules.' },
]

const INDUSTRIES = [
  { title: 'Textiles, Apparel & Machinery', body: 'Stalls that display fabric ranges, highlight processing and create focused buyer discussion areas.' },
  { title: 'Diamonds, Gems & Jewellery', body: 'Refined layouts with premium finishes, secure counters and focused lighting for trade visitors.' },
  { title: 'Manufacturing & Engineering', body: 'Durable, easy-to-navigate stalls supporting machinery, components and buyer conversations.' },
  { title: 'Automobile, EV & Components', body: 'Spaces designed for strong product visibility, vehicle display and clean visitor movement.' },
  { title: 'Food, FMCG & Hospitality Supply', body: 'Display counters, storage and hygiene-friendly working areas built for high footfall.' },
  { title: 'Finance, Investment & Professional Services', body: 'Professional booths that communicate trust, clarity and easy consultation.' },
  { title: 'Real Estate & Infrastructure', body: 'Stalls with model display, project visuals, enquiry counters and private discussion zones.' },
]

const WHY_US = [
  { title: 'Brand-First Stall Planning', body: 'We start with your objective, audience, products, booth size, budget and outcome — not a stock template.' },
  { title: 'Practical 3D Design', body: 'Concepts planned to look good and work well on the actual floor, with real attention to walking space and storage.' },
  { title: 'One Coordinated Team', body: 'Design, fabrication, graphics, logistics, installation and dismantling — fewer gaps, faster movement.' },
  { title: 'Transparent Scope & Budgeting', body: "What's included is defined before production — design, materials, branding, lighting, furniture, transport, install, dismantle." },
  { title: 'Local Execution Awareness', body: 'Surat exhibitions run on tight timelines. We plan with SIECC venue rules and organiser schedules in mind.' },
  { title: 'Lead-Focused Booth Layouts', body: 'Designed to support visitor conversations, product explanation and enquiry capture — not just decoration.' },
]

const PROCESS = [
  { step: '01', title: 'Brief & Requirement Study', body: 'Exhibition name, booth size, open sides, product category, brand guidelines, budget, visitor profile and sales goals.' },
  { step: '02', title: 'Concept & Layout Planning', body: 'Stall direction, zoning plan and customer-flow logic so every part of the booth has a purpose.' },
  { step: '03', title: '3D Stall Design', body: 'Visual design showing structure, branding, counters, display areas, lighting and key design elements.' },
  { step: '04', title: 'Estimate & Scope Confirmation', body: "Clear quotation and scope of work so you understand what's included before production." },
  { step: '05', title: 'Fabrication & Branding Production', body: 'Stall elements, graphics and display materials produced as per approved design and timeline.' },
  { step: '06', title: 'Logistics & Venue Installation', body: 'Stall transported to the venue and installed by our execution team, with final checks before handover.' },
  { step: '07', title: 'Dismantling After the Show', body: 'We manage dismantling and removal as per venue instructions, post-event.' },
]

const FAQS = [
  { q: 'Which is the best exhibition agency in Surat for stall design and fabrication?', a: 'The best agency is the one that understands your booth size, exhibition objective, brand guidelines, venue rules and execution timeline. Approach Media Pvt Ltd supports exhibitors with 3D stall design, fabrication, branding, installation and dismantling for Surat trade shows.' },
  { q: 'Do you provide exhibition stall design for SIECC Surat?', a: 'Yes. We support exhibition stall planning and execution for events at Surat International Exhibition and Convention Centre (SIECC), Sarsana, along with other trade show venues in and around Surat.' },
  { q: 'Can you create a 3D stall design before fabrication?', a: 'Yes. We prepare a 3D stall design so your team can review the booth layout, branding, product display, lighting and visitor movement before production begins.' },
  { q: 'How much does an exhibition stall cost in Surat?', a: 'It depends on booth size, design complexity, materials, open sides, branding, lighting, furniture, technology and installation requirements. Share your exhibition details to receive a customised estimate.' },
  { q: 'How early should we start planning our Surat exhibition stall?', a: 'For a custom stall, start at least 30–60 days before the exhibition. Larger stalls or premium finishes may need more time for design approvals and production planning.' },
  { q: 'Do you provide turnkey exhibition stall services?', a: 'Yes. We manage the complete process — brief, concept, 3D design, fabrication, branding, logistics, installation and dismantling.' },
  { q: 'Can you handle small booths as well as large custom stalls?', a: 'Yes. We support compact booths, shell scheme upgrades, modular stalls, custom-built stalls and larger island-style stands.' },
  { q: 'What details do you need to prepare a stall design?', a: 'Exhibition name, booth size, open sides, floor plan if available, brand logo, product details, design references, budget range and project timeline.' },
]

// Key shows hard-coded from SGCCI calendar (not all in CSV)
const KEY_SURAT_SHOWS = [
  { title: 'SITEX — Surat International Textile Expo 2026', dateRaw: '21–23 Feb 2026', startDate: '2026-02-21', categories: ['Tradeshow', 'Textile, Fabrics & Yarns', 'Apparel & Clothing'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Surat International Auto Expo 2026', dateRaw: '13–16 Mar 2026', startDate: '2026-03-13', categories: ['Tradeshow', 'Auto & Automotive', 'Auto Shows'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Sparkle International Gems & Jewellery Exhibition', dateRaw: '19–21 Mar 2026', startDate: '2026-03-19', categories: ['Tradeshow', 'Gems & Jewelry', 'Fashion & Beauty'], venue: 'Surat (Venue TBA)', link: null },
  { title: 'Garfab — TX Surat', dateRaw: '27–29 Mar 2026', startDate: '2026-03-27', categories: ['Tradeshow', 'Textile, Fabrics & Yarns', 'Knitting & Stitching'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'SGCCI Wealth Expo 2026', dateRaw: '8–10 May 2026', startDate: '2026-05-08', categories: ['Tradeshow', 'Banking & Finance', 'Business Services'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'SGCCI Textile Exhibition', dateRaw: '26–28 Jun 2026', startDate: '2026-06-26', categories: ['Tradeshow', 'Textile, Fabrics & Yarns', 'Apparel & Clothing'], venue: 'SIECC, Sarsana, Surat', link: null },
  { title: 'Hi Life Exhibition', dateRaw: '26–28 Mar 2026', startDate: '2026-03-26', categories: ['Tradeshow', 'Fashion & Beauty'], venue: 'Surat', link: null },
  { title: 'Spring India Expo', dateRaw: '2–4 Apr 2026', startDate: '2026-04-02', categories: ['Tradeshow', 'IT & Technology'], venue: 'Surat', link: null },
  { title: '21by72 Startup Summit', dateRaw: '13 Jun 2026', startDate: '2026-06-13', categories: ['Tradeshow', 'Business Services', 'Banking & Finance'], venue: 'Surat', link: null },
]

// Also pull from CSV for any Surat events we might have missed
const CSV_SURAT = (eventsData as { id: string; title: string; link: string; dateRaw: string; startDate: string | null; endDate: string | null; city: string; categories: string[] }[])
  .filter(e => e.city.toLowerCase().includes('surat') && !KEY_SURAT_SHOWS.some(k => k.title.toLowerCase().includes(e.title.toLowerCase().slice(0, 20))))
  .slice(0, 4)

const CATEGORY_COLOR: Record<string, string> = {
  'Textile, Fabrics & Yarns': 'hsl(280 60% 55%)',
  'Apparel & Clothing': 'hsl(280 60% 55%)',
  'Gems & Jewelry': 'hsl(45 90% 55%)',
  'Fashion & Beauty': 'hsl(320 70% 55%)',
  'Auto & Automotive': 'hsl(200 80% 50%)',
  'Auto Shows': 'hsl(200 80% 50%)',
  'Banking & Finance': 'hsl(150 60% 45%)',
  'Business Services': 'hsl(150 60% 45%)',
  'IT & Technology': 'hsl(220 70% 60%)',
  'Education & Training': 'hsl(30 80% 55%)',
}

function getCategoryColor(cats: string[]): string {
  for (const c of cats) {
    if (CATEGORY_COLOR[c]) return CATEGORY_COLOR[c]
  }
  return 'hsl(230 60% 55%)'
}

function getCategoryLabel(cats: string[]): string {
  const nonGeneric = cats.filter(c => c !== 'Tradeshow' && c !== 'Conference' && c !== 'Workshop')
  return nonGeneric[0] ?? cats[0] ?? 'Exhibition'
}

// ── Page ─────────────────────────────────────────────────────

export default async function SuratCityPage() {
  const cityProjects = await getPublishedProjects({ city: 'Surat', limit: 6 })

  const allSuratShows = [
    ...KEY_SURAT_SHOWS,
    ...CSV_SURAT.map(e => ({ title: e.title, dateRaw: e.dateRaw, startDate: e.startDate ?? '', categories: e.categories, venue: e.city, link: e.link || null })),
  ].sort((a, b) => (a.startDate > b.startDate ? 1 : -1))

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
              dismantling — we run the complete exhibition workflow so your team can focus on meetings, enquiries and conversions.
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
              <p style={{ color: 'hsl(220 10% 62%)', lineHeight: 1.75, marginBottom: '14px' }}>
                Surat is one of Gujarat&apos;s most active exhibition markets — especially for textiles, diamonds &amp; jewellery,
                manufacturing, automobiles, food, finance and real estate. For brands participating at Surat International
                Exhibition and Convention Centre (SIECC) Sarsana or other local venues, the stall must do more than look attractive.
              </p>
              <p style={{ color: 'hsl(220 10% 62%)', lineHeight: 1.75 }}>
                It needs to communicate your offer clearly, support product display, manage visitor movement and help your
                sales team start better conversations. We work with brands that need a dependable exhibition agency in Surat
                for planning, design, fabrication, branding, installation and post-show dismantling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAND OUT ────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="section-label">Make Your Brand Easier to Notice</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Built for Crowded Surat Aisles</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {STAND_OUT.map(p => (
              <div key={p.title} className="card animate-in" style={{ padding: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'hsl(110 55% 50% / 0.12)', border: '1px solid hsl(110 55% 50% / 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(110 55% 60%)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Our Exhibition Services in Surat</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
            {SERVICES.map(s => (
              <div key={s.num} className="card animate-in" style={{ padding: '28px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'hsl(230 60% 65%)', letterSpacing: '0.2em', marginBottom: '12px' }}>{s.num}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HIGHLIGHTED SECTION 1 — SIECC VENUE
      ════════════════════════════════════════════════════ */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <span className="section-label">Venue Expertise</span>
          <h2 className="section-title">Exhibition Venues We Serve <span className="highlight">in Surat</span></h2>
          <p style={{ color: 'hsl(220 10% 60%)', lineHeight: 1.75, maxWidth: '820px', marginBottom: '40px' }}>
            Surat&apos;s exhibition infrastructure is anchored by the Surat International Exhibition and Convention Centre
            (SIECC) at Sarsana — the city&apos;s principal facility for large-format trade shows, industrial exhibitions
            and national-level B2B events. Built and operated under the Southern Gujarat Chamber of Commerce and Industry
            (SGCCI), SIECC hosts Surat&apos;s most commercially significant shows across textiles, automobiles, gems &amp;
            jewellery, food and manufacturing.
          </p>

          {/* Venue card */}
          <div className="two-col-stack" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '0', background: 'hsl(222 22% 11%)', border: '1px solid hsl(222 18% 20%)', borderRadius: '16px', overflow: 'hidden' }}>

            {/* Left: photo placeholder + address */}
            <div style={{ position: 'relative', minHeight: '400px', background: 'linear-gradient(160deg, hsl(222 30% 14%), hsl(222 30% 9%))', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '28px' }}>
              {/* Architectural illustration overlay */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
                <svg viewBox="0 0 340 400" width="100%" height="100%" preserveAspectRatio="none">
                  <rect x="20" y="200" width="300" height="180" fill="none" stroke="hsl(230 70% 70%)" strokeWidth="1" />
                  <path d="M20 200 L170 80 L320 200" fill="none" stroke="hsl(230 70% 70%)" strokeWidth="1" />
                  <path d="M80 200 L80 340" stroke="hsl(230 70% 70%)" strokeWidth="0.5" />
                  <path d="M170 200 L170 340" stroke="hsl(230 70% 70%)" strokeWidth="0.5" />
                  <path d="M260 200 L260 340" stroke="hsl(230 70% 70%)" strokeWidth="0.5" />
                  <ellipse cx="170" cy="78" rx="30" ry="10" fill="none" stroke="hsl(110 55% 60%)" strokeWidth="1" />
                </svg>
              </div>
              <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '0.72rem', fontWeight: 700, padding: '5px 12px', borderRadius: '100px', background: 'linear-gradient(90deg, hsl(230 80% 55%), hsl(110 55% 45%))', color: '#fff', letterSpacing: '0.1em' }}>
                Premier Venue
              </span>
              <div style={{ position: 'relative' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                  Surat International Exhibition &amp; Convention Centre (SIECC)
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'hsl(220 10% 55%)', display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.5 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="hsl(230 60% 65%)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  146/B, Bhatar–Althan Road, Near Khajod Chowkdi, Sarsana, Surat 395017
                </p>
              </div>
            </div>

            {/* Right: specs + notable shows */}
            <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '18px', color: 'hsl(0 0% 92%)' }}>Venue Specifications</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid hsl(222 18% 20%)', borderRadius: '10px', overflow: 'hidden' }}>
                  {[
                    { label: 'Total Land Area', value: '1,30,000 sq. metres' },
                    { label: 'Exhibition Hall', value: 'Pillarless, AC · 10,600 sq. m' },
                    { label: 'Ceiling Height', value: '17 m centre / 6.5 m sides' },
                    { label: 'Conference Rooms', value: '14 rooms · 10–250 capacity' },
                    { label: 'Convention Centre', value: 'Platinum Hall, multi-purpose' },
                    { label: 'Parking', value: '750 dedicated on-site spaces' },
                    { label: 'Airport Distance', value: '~7 km from Surat Airport' },
                    { label: 'Organizer', value: 'SGCCI · Est. 1940 · ISO 9001' },
                  ].map((spec, i) => (
                    <div key={spec.label} style={{ padding: '12px 16px', borderBottom: i < 6 ? '1px solid hsl(222 18% 20%)' : 'none', borderRight: i % 2 === 0 ? '1px solid hsl(222 18% 20%)' : 'none' }}>
                      <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'hsl(220 10% 48%)', marginBottom: '4px' }}>{spec.label}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'hsl(0 0% 88%)' }}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'hsl(220 10% 48%)', marginBottom: '10px' }}>Notable Shows at SIECC</div>
                <p style={{ fontSize: '0.85rem', color: 'hsl(220 10% 60%)', lineHeight: 1.65 }}>
                  SITEX, Surat International Auto Expo, Sparkle Gems &amp; Jewellery Exhibition, UDYOG Industrial Exhibition,
                  Food &amp; Beverage Expo, SGCCI Wealth Expo, Textile Utsav, ROOTZ Jewellery Exhibition, WeaveKniTT,
                  Women Entrepreneur Exhibition (WEE)
                </p>
              </div>

              <Link href="/contact" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Plan My Stand at SIECC →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HIGHLIGHTED SECTION 2 — MAJOR EXHIBITIONS
      ════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <span className="section-label">Upcoming Shows</span>
          <h2 className="section-title">Major Exhibitions <span className="highlight">in Surat</span></h2>
          <p style={{ color: 'hsl(220 10% 60%)', lineHeight: 1.75, maxWidth: '760px', marginBottom: '36px' }}>
            Surat hosts a commercially active exhibition calendar throughout the year, with key shows across textiles,
            automobiles, diamonds &amp; jewellery, food processing and financial services. Most major exhibitions take
            place at SIECC, Sarsana and are primarily organised by the Southern Gujarat Chamber of Commerce and Industry (SGCCI).
          </p>

          {/* Horizontal scroll cards */}
          <div style={{ overflowX: 'auto', paddingBottom: '12px', marginLeft: '-4px', marginRight: '-4px' }}>
            <div style={{ display: 'flex', gap: '16px', paddingLeft: '4px', paddingRight: '4px', minWidth: 'max-content' }}>
              {allSuratShows.map((show, idx) => {
                const color = getCategoryColor(show.categories)
                const catLabel = getCategoryLabel(show.categories)
                return (
                  <div
                    key={idx}
                    style={{
                      width: '260px',
                      flexShrink: 0,
                      background: 'hsl(222 22% 10%)',
                      border: '1px solid hsl(222 18% 20%)',
                      borderRadius: '14px',
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {/* Date badge */}
                    <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '4px 12px', borderRadius: '100px', background: `${color}22`, border: `1px solid ${color}55`, fontSize: '0.75rem', fontWeight: 700, color }}>
                      {show.dateRaw}
                    </div>

                    {/* Title */}
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.35, color: 'hsl(0 0% 93%)', flex: 1 }}>
                      {show.title}
                    </h3>

                    {/* Category */}
                    <div style={{ fontSize: '0.78rem', color: 'hsl(220 10% 55%)' }}>{catLabel}</div>

                    {/* Venue */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: 'hsl(220 10% 50%)' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {show.venue}
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      style={{ display: 'block', textAlign: 'center', padding: '9px 16px', borderRadius: '8px', border: '1px solid hsl(222 18% 25%)', fontSize: '0.8rem', fontWeight: 600, color: 'hsl(220 10% 75%)', textDecoration: 'none', marginTop: '4px', transition: 'border-color 0.15s, color 0.15s' }}
                      onMouseEnter={undefined}
                    >
                      Plan My Stand →
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Link to full calendar */}
          <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/tradeshow-calendar" style={{ fontSize: '0.9rem', color: 'hsl(230 70% 65%)', textDecoration: 'none' }}>
              Browse all India tradeshows →
            </Link>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="section-label">Sectors We Serve</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Industries We Serve in Surat</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {INDUSTRIES.map(ind => (
              <div key={ind.title} className="card animate-in" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{ind.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{ind.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HIGHLIGHTED SECTION 3 — PORTFOLIO SHOWCASE
      ════════════════════════════════════════════════════ */}
      <section style={{ background: 'hsl(220 18% 7%)', padding: '80px 0' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ display: 'inline-block', padding: '6px 18px', borderRadius: '100px', background: 'linear-gradient(90deg, hsl(230 80% 55%), hsl(110 55% 45%))', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', color: '#fff', textTransform: 'uppercase', marginBottom: '16px' }}>
              Custom Exhibition Stalls Surat
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800 }}>
              Our Exhibition Stall Projects <span className="highlight">in Surat</span>
            </h2>
            <p style={{ color: 'hsl(220 10% 55%)', maxWidth: '700px', margin: '12px auto 0', fontSize: '0.95rem', lineHeight: 1.7 }}>
              A curated portfolio of custom exhibition stands we&apos;ve designed and built for brands participating in
              Surat&apos;s leading trade shows. Each project showcases our focus on creative exhibition stall design,
              precision fabrication and brand-first execution.
            </p>
          </div>

          {cityProjects.length > 0 ? (
            <>
              {/* Project grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '4px' }}>
                {cityProjects.map((p: ProjectCardData) => {
                  const hero = p.media[0]
                  const primaryIndustry = p.industries.find(i => i.isPrimary)?.industry
                  return (
                    <Link
                      key={p.id}
                      href={`/portfolio/${p.slug}`}
                      style={{ position: 'relative', aspectRatio: '4/3', display: 'block', overflow: 'hidden', background: 'hsl(222 24% 12%)' }}
                    >
                      {hero ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={hero.cdnUrl ?? hero.url}
                          alt={hero.altText}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'hsl(222 24% 14%)' }}>
                          <span style={{ color: 'hsl(220 10% 35%)', fontSize: '0.85rem' }}>No image</span>
                        </div>
                      )}
                      {/* Overlay */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(222 30% 5% / 0.92) 0%, transparent 55%)', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div style={{ fontSize: '0.75rem', color: 'hsl(110 55% 65%)', fontWeight: 600, marginBottom: '4px' }}>
                          {primaryIndustry?.name ?? 'Exhibition Stall'}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '4px' }}>
                          {p.client?.name ?? p.title}
                        </div>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'hsl(220 10% 65%)' }}>
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
            /* Empty state — styled like a placeholder grid */
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }} className="portfolio-placeholder-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ aspectRatio: '4/3', background: 'hsl(222 24% 12%)', border: '1px solid hsl(222 18% 18%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'hsl(222 20% 16%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="hsl(220 10% 35%)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'hsl(220 10% 35%)' }}>Project coming soon</span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <p style={{ fontSize: '0.875rem', color: 'hsl(220 10% 45%)' }}>
                  Surat portfolio projects will appear here automatically once added to the admin panel.
                </p>
                <Link href="/portfolio" className="btn btn-outline">Browse All Projects →</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── WHY APPROACH MEDIA ───────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="section-label">Why Work With Us</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Why Choose Approach Media for Exhibition Stalls in Surat?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {WHY_US.map(w => (
              <div key={w.title} className="card animate-in" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{w.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
            <span className="section-label">How We Work</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Our Exhibition Stall Process for Surat</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '18px' }}>
            {PROCESS.map(p => (
              <div key={p.step} className="card animate-in" style={{ padding: '24px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'hsl(230 60% 65%)', letterSpacing: '0.2em', marginBottom: '10px' }}>Step {p.step}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'hsl(220 10% 58%)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list" style={{ marginTop: '36px' }}>
            {FAQS.map(faq => (
              <div key={faq.q} style={{ borderBottom: '1px solid hsl(222 18% 18%)', paddingBottom: '4px' }}>
                <button className="faq-question" style={{ width: '100%', textAlign: 'left', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.975rem', fontWeight: 600, color: 'hsl(0 0% 90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  {faq.q}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                <div className="faq-answer" style={{ paddingBottom: '18px', color: 'hsl(220 10% 60%)', lineHeight: 1.75, fontSize: '0.9rem', display: 'none' }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 8%)' }}>
        <div className="container text-center">
          <span className="section-label">Get Started</span>
          <h2 className="section-title">Planning to Exhibit in Surat?</h2>
          <p className="section-subtitle">
            Share your booth size, exhibition name, brand details and timeline. Our team will help you plan a custom
            exhibition stall design for Surat with practical execution support.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginTop: '28px' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>Request a Quote</Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: '1rem', padding: '14px 32px' }}>Share Exhibition Brief</Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Approach Media Pvt. Ltd. — Exhibition Agency in Surat',
            areaServed: 'Surat, Gujarat, India',
            description: 'Exhibition stall design, fabrication and turnkey execution in Surat for SIECC Sarsana and other trade venues.',
            url: `${SITE_URL}/exhibition-agency-in-surat`,
          }),
        }}
      />
    </main>
  )
}
