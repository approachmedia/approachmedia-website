import { SITE_URL } from '@/lib/site-url'
import ProseSection from '@/components/seo/ProseSection'
import ServiceCityLinks from '@/components/seo/ServiceCityLinks'
import { INTRO, BLOCKS } from './_content/services-hub'
import { SERVICE_CARDS } from './_content/service-cards'
import { ServiceExpandGrid } from '@/components/services/ServiceExpandGrid'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
export const metadata = {
  title: { absolute: "Exhibition Stall Design & Fabrication Services | India" },
  description: "Exhibition stall design, custom booth fabrication, double-decker stands, AV integration and turnkey project management. 6000+ stalls across 14 countries.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "Exhibition Stall Design & Fabrication Services | India",
    description: "Exhibition stall design, custom booth fabrication, double-decker stands, AV integration and turnkey project management. 6000+ stalls across 14 countries.",
    url: `${SITE_URL}/services`,
  },
}

export default function ServicesPage() {
  return (
    <main>
      <JsonLd graph={[
        organizationNode(),
        {
          '@type': 'CollectionPage',
          name: 'Exhibition stall design and fabrication services',
          description: 'Design, custom booth fabrication, double-decker stands, AV integration and turnkey exhibition project management.',
          url: `${SITE_URL}/services`,
          publisher: { '@id': `${SITE_URL}#organization` },
        },
        {
          '@type': 'ItemList',
          name: 'Our services',
          numberOfItems: 6,
          itemListElement: [
            ['exhibition-stall-design', 'Exhibition Stall Design'],
            ['custom-booth-fabrication', 'Custom Booth Fabrication'],
            ['double-decker-mezzanine-stands', 'Double Decker & Mezzanine Stands'],
            ['turnkey-project-management', 'Turnkey Exhibition Project Management'],
            ['av-technology-integration', 'AV & Technology Integration'],
            ['immersive-brand-experience', 'Immersive Brand Experience Design'],
          ].map(([slug, name], i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name,
            url: `${SITE_URL}/services/${slug}`,
          })),
        },
        breadcrumb([{ name: 'Services', path: '/services' }]),
      ]} />


      {/* ═══ SECTION 1: PAGE HERO ══════════════════════════════════════════ */}
      <section className="page-hero" aria-labelledby="services-hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="section-label">Our Services</span>
            <h1 id="services-hero-heading" style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.1', maxWidth: '860px', marginBottom: '24px' }}>
              Everything your exhibition requires. Planned, designed, and
              <span className="highlight"> delivered as one system.</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '620px', lineHeight: '1.8', marginBottom: '36px' }}>
              From the first concept sketch to post-event dismantling — one accountable team, six tightly integrated services.
            </p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Book A Consultation Now</a>
              <a href="/portfolio" className="btn btn-outline">View Portfolio</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: SIX SERVICE CARDS (expand on tap) ════════════════ */}
      <section className="section" id="services-list" aria-labelledby="services-list-heading">
        <div className="container">
          <h2 id="services-list-heading" className="sr-only">Our six services</h2>
          <ServiceExpandGrid services={SERVICE_CARDS} />
        </div>
      </section>

      {/* ═══ SECTION 3: STATS STRIP ════════════════════════════════════════ */}
      <div className="stats-strip" role="region" aria-label="Company statistics">
        <div className="container">
          <div className="stats-strip-inner animate-in">
            <div className="stat-item">
              <span className="stat-number" data-target="23">23+</span>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="6000">6000+</span>
              <div className="stat-label">Stalls Executed</div>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="9">9+</span>
              <div className="stat-label">Industries Served</div>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="14">14+</span>
              <div className="stat-label">Countries Delivered</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SECTION 4: PROCESS — "A clear process from idea to installation" ═ */}
      <section className="section" id="how-we-work" aria-labelledby="process-srv-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">What happens after you reach out?</span>
            <h2 id="process-srv-heading">A clear process from idea to installation</h2>
          </div>
          <div className="flow-grid">

            <div className="flow-card animate-in delay-1">
              <span className="flow-num">01</span>
              <h3>Understand &amp; Plan</h3>
              <p>We define your brand, audience, exhibition objectives, stand dimensions, and budget — then build the brief that drives every decision.</p>
            </div>

            <div className="flow-card animate-in delay-2">
              <span className="flow-num">02</span>
              <h3>Design &amp; Detail</h3>
              <p>Requirements translate into spatial concepts and 3D renderings. Once approved, full engineering drawings and material specs are locked before fabrication begins.</p>
            </div>

            <div className="flow-card animate-in delay-3">
              <span className="flow-num">03</span>
              <h3>Build &amp; Test</h3>
              <p>Your stand is fabricated in our own workshop and assembled at full scale before dispatch — every element signed off before leaving our facility.</p>
            </div>

            <div className="flow-card animate-in delay-4">
              <span className="flow-num">04</span>
              <h3>Execute &amp; Close</h3>
              <p>We manage installation, hand over a ready-to-show stand, dismantle after the event, and close with full documentation.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: PRINCIPLES — "No two brands are treated the same" ══ */}
      <section className="section principles-section" id="our-approach" aria-labelledby="principles-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">How we make your stall stand out</span>
            <h2 id="principles-heading">No two brands are treated the same</h2>
          </div>
          <div className="principles-grid">

            <div className="principle-card animate-in delay-1">
              <h3>Thoughtful personalisation</h3>
              <p>Every space is tailored to your brand's objectives, so what you want to communicate is understood instantly. No templates, no repeating formulas — each stall is built from the ground up with your brief at the centre.</p>
            </div>

            <div className="principle-card animate-in delay-2">
              <h3>Industry-aware thinking</h3>
              <p>We factor in your sector's context — what audiences expect and what builds credibility — so the space reflects industry-specific goals. A pharma brand and a real estate developer need very different things from the same show floor.</p>
            </div>

            <div className="principle-card animate-in delay-3">
              <h3>Clear, effective design</h3>
              <p>From layout and movement to interaction and detail, every element is intentional and designed to create a lasting impression. We design for outcomes, not aesthetics alone.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: CTA ════════════════════════════════════════════════ */}
      <section className="cta-section" id="cta" aria-labelledby="services-cta-heading">
        <div className="container">
          <h2 id="services-cta-heading">Have an exhibition coming up?</h2>
          <p className="cta-sub">Want to stand out in a high-traffic environment with an end-to-end partner who guarantees smooth coordination? Reach out — the sooner we connect, the more we can do for your brand.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Book A Consultation Now</a>
            <a href="/portfolio" className="btn btn-outline">View Our Portfolio</a>
          </div>
        </div>
      </section>

      <ProseSection eyebrow="What we do" intro={INTRO} blocks={BLOCKS} />
      <ServiceCityLinks />
    </main>
  )
}
