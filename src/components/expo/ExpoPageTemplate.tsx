import type { ExpoPageData } from './types'
import Link from 'next/link'

const INDUSTRY_WHY: Record<string, { title: string; body: string }[]> = {
  construction: [
    { title: 'Decision-Makers Under One Roof', body: 'Builders, architects, developers, and interior contractors attend these shows with active project pipelines. Your stall puts you directly in front of procurement decision-makers.' },
    { title: 'Visual Products Sell Through Experience', body: 'Construction materials, flooring, windows, and interiors sell when prospects can see, touch, and compare. A well-designed stall makes this experience memorable.' },
    { title: 'Launch New Products with Authority', body: 'Industry events are the ideal launchpad for new product lines. A flagship stall creates brand recall that lasts well beyond show days.' },
    { title: 'Strengthen Dealer and Distributor Network', body: 'Regional construction expos draw dealers and contractors actively looking for new partnerships. A prominent stall signals credibility and invites productive conversations.' },
    { title: 'Convert Footfall into Project Inquiries', body: 'Visitors at construction expos have active project budgets. A professional booth positioned for engagement turns footfall directly into qualified leads.' },
  ],
  engineering: [
    { title: 'Buyers with Real Procurement Needs', body: 'Engineering expos attract plant managers, procurement heads, and production engineers actively evaluating suppliers for capital investment.' },
    { title: 'Demonstrate Performance Live', body: 'Live machinery demonstrations and interactive displays communicate capabilities far more convincingly than brochures or digital presentations.' },
    { title: 'Generate OEM and System Integrator Leads', body: 'These events draw OEMs, system integrators, and EPC contractors with multi-year project pipelines. A strong booth presence opens doors to long-term contracts.' },
    { title: 'Build Trust Through Presence', body: 'In B2B engineering markets, the professionalism of your exhibition stall is a direct signal of your manufacturing and delivery quality.' },
    { title: 'Capture Adjacent Market Segments', body: 'Cross-industry engineering expos let you reach adjacent sectors — from automation to semiconductor, food processing to automotive — all under one roof.' },
  ],
  pharma: [
    { title: 'Reach Procurement and R&D Decision-Makers', body: 'Pharma expos bring together purchasing heads, formulation scientists, and supply chain managers — all with active sourcing needs and evaluation budgets.' },
    { title: 'Showcase Compliance and Quality', body: 'In pharma and healthcare, a well-organised, professional booth signals regulatory compliance and quality standards — key differentiators for your buyers.' },
    { title: 'Introduce New Formulations and Devices', body: 'Trade events are the most credible platform to launch products to a technically qualified audience of industry professionals and procurement buyers.' },
    { title: 'Expand into Regulated Markets', body: 'International pharma expos create entry points into new geographies with regulatory-ready buyers actively looking for supply partners and manufacturers.' },
    { title: 'Strengthen Distribution and Licensing Partnerships', body: 'Pharma events attract distributors, licence seekers, and API buyers. A flagship booth creates the right first impression for long-term business discussions.' },
  ],
  food: [
    { title: 'Meet Buyers, Distributors and Retail Chains', body: 'Food expos attract HORECA buyers, retail procurement managers, food processing companies, and import-export traders — all with active sourcing intent.' },
    { title: 'Let Your Product Speak for Itself', body: 'Tasting counters and sampling stations turn visitor curiosity into purchase intent. A stall designed around product experience creates immediate brand preference.' },
    { title: 'Reach New Geographies and Market Segments', body: 'National and international food expos draw visitors from cities and markets you may not yet serve — creating distribution and export conversations.' },
    { title: 'Introduce New SKUs and Product Ranges', body: 'These events are industry-validated launch platforms. A new product introduced here reaches thousands of qualified buyers over just a few show days.' },
    { title: 'Build Category Authority', body: 'A premium, well-branded booth signals that your company is a serious category player, building trust with both buyers and peer brands at the event.' },
  ],
  textile: [
    { title: 'Connect with Garment Manufacturers and Buyers', body: 'Textile expos bring together fabric buyers, garment exporters, fashion brands, and manufacturers. One show can open multiple seasons of business conversations.' },
    { title: 'Display Fabric Range with Visual Impact', body: 'Material and colour sell at touch. A stall designed for fabric display — with the right lighting and layout — gives buyers the experience they need to commit.' },
    { title: 'Enter New Export Markets', body: 'International textile expos attract buyers from Europe, Middle East, and South Asia. A professional booth positions your brand for global sourcing discussions.' },
    { title: 'Launch New Collections Commercially', body: 'A flagship stall at a major textile event is one of the most cost-effective ways to generate trade press coverage and buyer traffic for a new collection.' },
    { title: 'Source Yarn, Machinery and Trims', body: 'For brands attending as buyers, a professional stall doubles as a credibility signal when approaching machinery, trim, or material suppliers at the same event.' },
  ],
  industrial: [
    { title: 'Reach Industrial Procurement Teams', body: 'These expos attract plant heads, supply chain managers, project engineers, and energy officers — all with active capex or procurement budgets at the ready.' },
    { title: 'Demonstrate ROI-Driven Products', body: 'Industrial buyers are data-driven. A booth that shows performance metrics, efficiency gains, and cost savings closes deals faster than any brochure.' },
    { title: 'Access International Buyers and Partners', body: 'International industrial expos draw procurement teams from across Asia, Europe, and the Middle East. A strong booth opens global supply chain conversations.' },
    { title: 'Generate Tender and Project Inquiries', body: 'Government departments, PSUs, and large conglomerates scout for vendors at industrial events. Visibility here directly contributes to RFQ submissions.' },
    { title: 'Strengthen After-Sales and Service Network', body: 'These shows attract existing customers too. Your booth is a live touchpoint to reinforce relationships, introduce upgrades, and sell service contracts.' },
  ],
  travel: [
    { title: 'Reach Corporate Travel Managers and Buyers', body: 'MICE and travel trade shows attract HR heads, event managers, corporate travel desks, and agencies — all with immediate booking and contracting intent.' },
    { title: 'Showcase Destination Products Visually', body: 'Travel is aspirational. A stall with immersive visuals, ambient lighting, and large-format destination imagery creates strong recall and inspires decisions.' },
    { title: 'Generate B2B and Group Booking Leads', body: 'This audience books in volume. An engaging booth combined with an on-stand meeting system can fill a qualified sales pipeline from just a few show days.' },
    { title: 'Launch New Routes, Packages and Properties', body: 'Trade shows are the ideal B2B launchpad for new destinations, resorts, or corporate travel packages — bringing them directly to the travel trade.' },
    { title: 'Build Agent and DMC Partnerships', body: 'DMCs, OTAs, travel agents, and destination marketing boards all use these shows to find new supply partners. A premium booth signals a serious trade partner.' },
  ],
  multiindustry: [
    { title: 'High-Value Footfall in a Focused Setting', body: 'This event brings together decision-makers, buyers, and senior business leaders. Your stall gets in front of people who have purchasing authority and intent.' },
    { title: 'Build Brand Visibility at a Key Industry Event', body: 'Presence at the right event signals credibility. A well-designed stall reinforces your brand positioning and creates recall that outlasts the show itself.' },
    { title: 'Generate Direct Sales and Project Leads', body: 'Qualified visitors attending with a specific objective — sourcing, comparing, or networking — convert more readily into leads than most digital channels.' },
    { title: 'Showcase Your Full Product or Service Range', body: 'With dedicated floorspace, you can display your complete portfolio in an environment designed to engage, compare, and inform buying decisions.' },
    { title: 'Strengthen Existing Customer Relationships', body: 'Trade events bring existing clients and channel partners together. Your stall is a live touchpoint to reinforce relationships and close renewals.' },
  ],
}

const STALL_CONCEPTS: Record<string, string[]> = {
  construction: ['Product Showroom Booth', 'Material Sample Display Stand', 'Immersive Demo Zone', 'Premium Custom Island Stand', 'Modular Grid Exhibit'],
  engineering:  ['Live Machinery Display Booth', 'Technical Demo Zone', 'B2B Consultation Cabin', 'Premium Custom Island Stand', 'Modular Portable Exhibit'],
  pharma:       ['Product and Sample Display Stand', 'Regulatory Compliance Showcase', 'Meeting Suite Booth', 'Premium Island Stand', 'Modular Pharma Exhibit'],
  food:         ['Product Sampling and Demo Booth', 'FMCG Brand Showcase Stand', 'Tasting Counter Exhibit', 'Premium Island Stand', 'Modular Pavilion Booth'],
  textile:      ['Fabric Display and Swatch Booth', 'Collection Launch Stand', 'Buyer Meeting Cabin Booth', 'Premium Brand Exhibit', 'Modular Trade Booth'],
  industrial:   ['Technical Solutions Booth', 'Performance Demo Stand', 'B2B Consultation Exhibit', 'Premium Custom Island Stand', 'Modular Industrial Booth'],
  travel:       ['Destination Experience Booth', 'MICE Showcase Stand', 'Meeting Suite Exhibit', 'Luxury Brand Booth', 'Modular Destination Pavilion'],
  multiindustry:['Brand Showcase Booth', 'Product Display Stand', 'Consultation Meeting Booth', 'Premium Custom Island Exhibit', 'Modular Portable Booth'],
}

const SERVICES = [
  { title: 'Custom Stall Design', body: 'Full 2D layout and detailed design developed from your brief — booth dimensions, visitor flow, display zones, and branding placements all planned before a single piece is fabricated.' },
  { title: '3D Booth Visualisation', body: 'Photorealistic 3D renders of your stall before build, so you approve exactly what gets constructed. No surprises on-site.' },
  { title: 'Stall Fabrication', body: 'In-house carpentry, metal fabrication, panelling, and finishing — all controlled by our own team to ensure quality and delivery accuracy.' },
  { title: 'Branding and Graphics', body: 'Backlit panels, digital screens, large-format prints, product labels, and signage — all produced and fitted as part of the complete stall build.' },
  { title: 'Product Display and Demo Zones', body: 'Dedicated zones for product presentation, live demonstrations, and interactive experiences designed to maximise visitor dwell time and engagement.' },
  { title: 'Installation and Dismantling', body: 'Our team handles full on-site setup, venue coordination, and post-show dismantling — freeing your team to focus entirely on your visitors and business conversations.' },
]

const WHY_US = [
  { title: 'Brand-First Design', body: 'Every stall begins with your brand identity, exhibition objective, and visitor profile. We design for your specific brief — not a template.' },
  { title: 'Practical 3D Concepts', body: 'Our 3D visualisations are buildable designs, not aspirational renders. What you approve is what gets built — with no budget surprises.' },
  { title: 'End-to-End Execution', body: 'From design approval through fabrication, transport, installation, and dismantling — a single team manages the entire project.' },
  { title: 'Clear Scope and Quotation', body: 'Transparent, itemised quotations with no hidden costs. You know exactly what is included before you commit.' },
  { title: 'Lead-Focused Booth Layout', body: 'Every spatial decision — entrance, counters, meeting areas, display zones — is made with your exhibition objectives and visitor journey in mind.' },
]

export default function ExpoPageTemplate({ data }: { data: ExpoPageData }) {
  const whyPoints = INDUSTRY_WHY[data.industry] ?? INDUSTRY_WHY.multiindustry
  const concepts = STALL_CONCEPTS[data.industry] ?? STALL_CONCEPTS.multiindustry

  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Exhibition Stall Design for ${data.title}`,
    provider: {
      '@type': 'Organization',
      name: 'Approach Media Pvt. Ltd.',
      url: 'https://approachmedia.in',
    },
    areaServed: { '@type': 'City', name: data.city },
    serviceType: 'Exhibition Stall Design and Fabrication',
    description: data.metaDescription,
    event: {
      '@type': 'Event',
      name: data.title,
      startDate: `${data.year}-${data.month}`,
      location: { '@type': 'Place', name: data.venue },
    },
  })

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">{data.heroEyebrow}</span>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08, maxWidth: '800px', marginBottom: '22px' }}>
              {data.h1}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '580px', lineHeight: 1.8, marginBottom: '36px' }}>
              {data.heroSubline}
            </p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Get Stall Design Quote &rarr;</a>
              <a href="/contact" className="btn btn-outline">Share Exhibition Brief</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENT OVERVIEW ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: '48px', alignItems: 'start' }}>
            <div className="animate-in">
              <span className="section-label">Event Overview</span>
              <h2 style={{ marginBottom: '18px' }}>About {data.title}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '1rem' }}>{data.eventOverview}</p>
            </div>
            <div className="animate-in delay-1" style={{ display: 'grid', gap: '12px' }}>
              {[
                { label: 'Event', value: data.title },
                { label: 'Month', value: `${data.monthName} ${data.year}` },
                { label: 'City', value: data.city },
                { label: 'Venue', value: data.venue },
                { label: 'Industry', value: data.industryLabel },
              ].map(item => (
                <div key={item.label} style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '10px', padding: '14px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'hsl(220 10% 55%)', minWidth: '64px', paddingTop: '2px' }}>{item.label}</span>
                  <span style={{ color: 'hsl(0 0% 96%)', fontWeight: 600, fontSize: '0.92rem' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY EXHIBIT ────────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 9% / 0.4)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Exhibiting at {data.title}?</span>
            <h2>Why a Strong Booth Matters at This Show</h2>
          </div>
          <div className="why4-grid">
            {whyPoints.map((pt, i) => (
              <div key={i} className={`why4-card animate-in delay-${(i % 4) + 1}`}>
                <h3>{pt.title}</h3>
                <p>{pt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ────────────────────────────────────────── */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-strip-inner animate-in">
            <div className="stat-item"><span className="stat-number">23+</span><div className="stat-label">Years of Experience</div></div>
            <div className="stat-item"><span className="stat-number">6000+</span><div className="stat-label">Stalls Executed</div></div>
            <div className="stat-item"><span className="stat-number">9+</span><div className="stat-label">Industries Served</div></div>
            <div className="stat-item"><span className="stat-number">14+</span><div className="stat-label">Countries Delivered</div></div>
          </div>
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head animate-in" style={{ maxWidth: '660px' }}>
            <span className="section-label">Our Services</span>
            <h2>Exhibition Stall Services for {data.title}</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginTop: '16px' }}>
              Everything you need to exhibit professionally at {data.venue} — from first concept to post-show dismantling.
            </p>
          </div>
          <div className="feature-check-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className={`feature-check-card animate-in delay-${(i % 4) + 1}`}>
                <span className="check" aria-hidden="true">&#10003;</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STALL CONCEPTS ─────────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 9% / 0.4)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Booth Concepts</span>
            <h2>Recommended Stall Concepts for {data.title}</h2>
          </div>
          <div className="srv-cards-grid">
            {concepts.map((c, i) => (
              <div key={i} className={`srv-card animate-in delay-${(i % 4) + 1}`}>
                <div className="srv-card-glow" aria-hidden="true" />
                <h3>{c}</h3>
                <p>Designed and fabricated to suit your brand, objectives, and the available space at {data.venue}.</p>
                <a href="/contact" className="srv-card-cta">Discuss this concept &rarr;</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENUE PLANNING ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '48px', alignItems: 'start' }}>
            <div className="animate-in">
              <span className="section-label">Venue-Specific Planning</span>
              <h2>Planning Your Booth at {data.venue}</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.85, marginTop: '14px' }}>{data.venueDescription}</p>
            </div>
            <div className="animate-in delay-1">
              <h3 style={{ marginBottom: '18px' }}>Booth Planning Checklist</h3>
              <ul style={{ display: 'grid', gap: '12px', listStyle: 'none', padding: 0 }}>
                {[
                  'Confirm your allocated booth area and dimensions',
                  'Identify number of open sides (corner, inline, island)',
                  'Check organiser-specified height limits and structure rules',
                  'Plan electrical load and lighting requirements',
                  'Decide branding approach — backlit, print, or digital',
                  'Plan visitor flow: entrance, display zones, meeting area',
                  'Set fabrication and dispatch timeline (ideally 6+ weeks before show)',
                  'Confirm installation schedule with venue authorities',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', color: 'var(--muted)', fontSize: '0.92rem' }}>
                    <span style={{ color: 'hsl(110 55% 50%)', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY APPROACH MEDIA ─────────────────────────────────── */}
      <section className="section" style={{ background: 'hsl(222 24% 9% / 0.4)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Why Approach Media</span>
            <h2>Your Exhibition Build Partner Since 2002</h2>
          </div>
          <div className="why4-grid">
            {WHY_US.map((w, i) => (
              <div key={i} className={`why4-card animate-in delay-${(i % 4) + 1}`}>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / QUOTE FORM ───────────────────────────────────── */}
      <section className="section" id="quote">
        <div className="container">
          <div className="section-head animate-in" style={{ maxWidth: '640px' }}>
            <span className="section-label">Get a Quote</span>
            <h2>Exhibiting at {data.title}?</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: '12px' }}>
              Share your requirements — stall size, design reference, and booth objectives. We respond with a concept outline and quote within 48 hours.
            </p>
          </div>
          <form
            className="animate-in"
            style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '16px', padding: '32px', display: 'grid', gap: '18px', maxWidth: '760px' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div><label className="field-label" style={{ marginBottom: '6px' }}>Name</label><input type="text" placeholder="Your name" className="field-input" /></div>
              <div><label className="field-label" style={{ marginBottom: '6px' }}>Company</label><input type="text" placeholder="Company name" className="field-input" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div><label className="field-label" style={{ marginBottom: '6px' }}>Mobile</label><input type="tel" placeholder="+91 …" className="field-input" /></div>
              <div><label className="field-label" style={{ marginBottom: '6px' }}>Email</label><input type="email" placeholder="you@company.com" className="field-input" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label className="field-label" style={{ marginBottom: '6px' }}>Expo Name</label>
                <input type="text" defaultValue={data.title} className="field-input" readOnly style={{ opacity: 0.7 }} />
              </div>
              <div><label className="field-label" style={{ marginBottom: '6px' }}>Booth Size (sqm)</label><input type="text" placeholder="e.g. 36" className="field-input" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label className="field-label" style={{ marginBottom: '6px' }}>City</label>
                <input type="text" defaultValue={data.city} className="field-input" readOnly style={{ opacity: 0.7 }} />
              </div>
              <div>
                <label className="field-label" style={{ marginBottom: '6px' }}>Venue</label>
                <input type="text" defaultValue={data.venue} className="field-input" readOnly style={{ opacity: 0.7 }} />
              </div>
            </div>
            <div><label className="field-label" style={{ marginBottom: '6px' }}>Message / Brief</label><textarea rows={4} placeholder="Tell us about your brand, design references, and any specific requirements…" className="field-input" style={{ resize: 'vertical' }} /></div>
            <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>Request a Quote &rarr;</button>
            <p style={{ fontSize: '0.8rem', color: 'hsl(220 10% 55%)' }}>Form layout only — wire to your CRM or email service when ready.</p>
          </form>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {[
              [`Do you provide stall design for ${data.title}?`, `Yes. Approach Media provides complete exhibition stall design and fabrication services for ${data.title} at ${data.venue}, ${data.city}. We handle everything from 3D concept design through on-site installation and dismantling.`],
              ['Can you create a 3D booth design before fabrication?', 'Yes. Every project includes a photorealistic 3D visualisation for your approval before any fabrication begins. You see exactly what will be built — with accurate dimensions, materials, branding, and lighting.'],
              [`What is the cost of a stall for ${data.title}?`, 'Cost depends on booth size, design complexity, materials, and the number of open sides. After a short briefing call, we provide a transparent, itemised quotation — no hidden charges.'],
              ['How early should we start planning?', `We recommend starting 6–8 weeks before ${data.title}. This allows sufficient time for concept design, 3D approval, fabrication, quality checks, and a safe dispatch schedule to ${data.city}.`],
              ['Do you handle installation and dismantling?', `Yes. Our installation team travels to ${data.city} and handles full on-site setup at ${data.venue} and post-show dismantling — freeing your team to focus entirely on business conversations.`],
            ].map(([q, a], i) => (
              <div key={i} className={`faq-item animate-in delay-${i + 1}`}>
                <button className="faq-question" aria-expanded="false">{q}<span className="faq-icon" aria-hidden="true">&#43;</span></button>
                <div className="faq-answer"><p>{a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to stand out at {data.title}?</h2>
          <p className="cta-sub">Custom stall design and fabrication, delivered end-to-end. Share your brief and get a proposal within 48 hours.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
            <Link href="/expos" className="btn btn-outline">Explore All Expo Pages</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
