export const metadata = {
  title: 'Exhibition Stall Services — Approach Media',
  description: 'Exhibition stall design, custom booth fabrication, turnkey management, AV integration, double decker stands and immersive brand experiences.',
}

export default function ServicesPage() {
  return (
    <main>

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

      {/* ═══ SECTION 2: SIX SERVICE CARDS (3-col, numbered) ═══════════════ */}
      <section className="section" id="services-list" aria-labelledby="services-list-heading">
        <div className="container">
          <div className="srv-cards-grid" id="services-list-heading">

            {/* Card 1 */}
            <a href="/services/exhibition-stall-design" className="srv-card animate-in delay-1" aria-label="Exhibition Stall Design">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <span className="srv-card-number">Service 01</span>
              <h3>Exhibition Stall Design</h3>
              <p>Concept-led spatial design that translates your brand identity into a high-impact exhibition space — from brief to 3D visualisation.</p>
              <span className="srv-card-cta">Explore service &#8599;</span>
            </a>

            {/* Card 2 */}
            <a href="/services/custom-booth-fabrication" className="srv-card animate-in delay-2" aria-label="Custom Booth Fabrication">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <span className="srv-card-number">Service 02</span>
              <h3>Custom Booth Fabrication</h3>
              <p>Precision-built structures from our own workshop — custom joinery, structural frames, surface finishes, to exact specifications.</p>
              <span className="srv-card-cta">Explore service &#8599;</span>
            </a>

            {/* Card 3 */}
            <a href="/services/turnkey-project-management" className="srv-card animate-in delay-3" aria-label="Turnkey Project Management">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <span className="srv-card-number">Service 03</span>
              <h3>Turnkey Project Management</h3>
              <p>Single-team accountability from first brief to post-event dismantle. One point of contact, zero coordination gaps.</p>
              <span className="srv-card-cta">Explore service &#8599;</span>
            </a>

            {/* Card 4 */}
            <a href="/services/av-technology-integration" className="srv-card animate-in delay-1" aria-label="Audio Visual & Technology Integration">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <span className="srv-card-number">Service 04</span>
              <h3>Audio-Visual &amp; Tech Integration</h3>
              <p>LED walls, interactive screens, immersive sound and lighting — all planned and integrated within your stall from day one.</p>
              <span className="srv-card-cta">Explore service &#8599;</span>
            </a>

            {/* Card 5 */}
            <a href="/services/double-decker-mezzanine-stands" className="srv-card animate-in delay-2" aria-label="Double Decker / Mezzanine Stands">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <span className="srv-card-number">Service 05</span>
              <h3>Double Decker / Mezzanine Stands</h3>
              <p>Engineered multi-level structures that maximise floor presence and create a landmark on any show floor.</p>
              <span className="srv-card-cta">Explore service &#8599;</span>
            </a>

            {/* Card 6 */}
            <a href="/services/immersive-brand-experience" className="srv-card animate-in delay-3" aria-label="Immersive Brand Experience Design">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <span className="srv-card-number">Service 06</span>
              <h3>Immersive Brand Experiences</h3>
              <p>Sensory-led brand environments — spatial narrative, lighting, sound, and interaction — designed to be remembered.</p>
              <span className="srv-card-cta">Explore service &#8599;</span>
            </a>

          </div>
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

    </main>
  )
}
