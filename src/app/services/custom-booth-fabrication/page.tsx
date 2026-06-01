export const metadata = {
  title: 'Custom Booth Fabrication — Approach Media',
  description: 'At exhibitions, execution matters as much as design. Our custom booth fabrication services deliver stalls built with precision, quality, and reliability for a strong brand presence.',
}

export default function CustomBoothFabricationPage() {
  return (
    <main>

      {/* ═══ SECTION 1: HERO ═══════════════════════════════════════════ */}
      <section className="page-hero" aria-labelledby="cbf-hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">Booths Built to Stand Out</span>
            <h1 id="cbf-hero-heading" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.08', maxWidth: '760px', marginBottom: '22px' }}>Custom Booth Fabrication</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '580px', lineHeight: '1.8', marginBottom: '36px' }}>At exhibitions, execution matters as much as design. Our custom booth fabrication services deliver stalls built with precision, quality, and reliability for a strong brand presence.</p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
              <a href="/contact" className="btn btn-outline">Book a Consultation</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: INTRO + DUMMY IMAGE ════════════════════════════ */}
      <section className="section" aria-labelledby="cbf-intro-heading">
        <div className="container">
          <div className="intro-media-grid animate-in">
            <div className="intro-media-text">
              <h2 id="cbf-intro-heading" style={{ position: 'absolute', left: '-9999px' }}>About our custom booth fabrication</h2>
              <p>In a competitive exhibition environment, a well-fabricated booth creates a strong visual presence, attracts footfall, and gives your brand a solid, professional identity.</p>
              <p>The quality of fabrication directly impacts how your brand is perceived on the exhibition floor.</p>
              <p>At Approach Media, we bring over two decades of expertise in custom booth fabrication across industries and locations. From concept to on-site delivery, we help brands create booths that are structurally robust, precisely built, visually impactful, and ready for flawless execution.</p>
            </div>
            {/* DUMMY PHOTO — replace src below with your own image */}
            <figure className="media-frame">
              {/* To use a real photo: <img src="../assets/portfolio/booth-fabrication-1.jpg" alt="Premium custom booth fabrication build" /> */}
              <span className="media-icon" aria-hidden="true">&#128247;</span>
              <span className="media-hint">Replace with project photo</span>
              <figcaption className="media-tag">Sample Project</figcaption>
              <span className="media-caption">Premium custom booth fabrication build</span>
            </figure>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: STATS STRIP ════════════════════════════════════ */}
      <div className="stats-strip" role="region" aria-label="Company statistics">
        <div className="container">
          <div className="stats-strip-inner animate-in">
            <div className="stat-item"><span className="stat-number">23+</span><div className="stat-label">Years of Experience</div></div>
            <div className="stat-item"><span className="stat-number">6000+</span><div className="stat-label">Stalls Executed</div></div>
            <div className="stat-item"><span className="stat-number">9+</span><div className="stat-label">Industries Served</div></div>
            <div className="stat-item"><span className="stat-number">14+</span><div className="stat-label">Countries Delivered</div></div>
          </div>
        </div>
      </div>

      {/* ═══ SECTION 4: END-TO-END SOLUTIONS ═══════════════════════════ */}
      <section className="section" aria-labelledby="cbf-solutions-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ maxWidth: '620px' }}>
            <h2 id="cbf-solutions-heading">End-to-End Custom Booth Fabrication Solutions</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.85', fontSize: '1rem', marginTop: '18px' }}>At Approach Media, we provide customised booth fabrication services for trade fairs, expos, and corporate events across India. Every booth is manufactured with attention to detail, efficient use of space, and alignment with your brand identity.</p>
          </div>
          <div className="feature-check-grid">
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Technical Drawings &amp; Production Planning</h3>
                <p>Detailed fabrication drawings and execution planning to ensure a smooth build process.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-2">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>In-House Manufacturing &amp; Fabrication</h3>
                <p>High-quality booth production using durable materials, skilled workmanship, and strict quality control.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-3">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Custom Finishes &amp; Branding Elements</h3>
                <p>Integration of graphics, finishes, display systems, lighting, and brand assets for a polished final outcome.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-4">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Installation &amp; Dismantling</h3>
                <p>Professional on-site assembly and dismantling for a stress-free exhibition experience.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Compliance with Venue Norms</h3>
                <p>Ensuring all fabricated booths meet venue regulations, structural guidelines, and safety standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: WHY CHOOSE APPROACH MEDIA ══════════════════════ */}
      <section className="section" style={{ background: 'hsl(222 24% 9% / 0.3)', borderTop: '1px solid var(--border)' }} aria-labelledby="cbf-why-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Why Choose Approach Media</span>
            <h2 id="cbf-why-heading">Reliable custom booth fabrication delivered with precision, consistency, and quality.</h2>
          </div>
          <div className="why4-grid">
            <div className="why4-card animate-in delay-1">
              <h3>In-House Production Expertise</h3>
              <p>Our in-house fabrication capabilities allow complete control over quality, timelines, and finishing standards.</p>
            </div>
            <div className="why4-card animate-in delay-2">
              <h3>Strong Structural Execution</h3>
              <p>Every booth is built for durability, safety, and practical performance during the event.</p>
            </div>
            <div className="why4-card animate-in delay-3">
              <h3>Efficient Coordination</h3>
              <p>From production to on-site setup, one team manages the complete process for smooth execution.</p>
            </div>
            <div className="why4-card animate-in delay-1">
              <h3>Global Delivery Standards</h3>
              <p>With experience across domestic and international markets, we deliver booths that meet professional build and safety expectations.</p>
            </div>
            <div className="why4-card animate-in delay-2">
              <h3>Time-Bound Delivery</h3>
              <p>Our structured workflow helps us complete most booth fabrication projects efficiently within committed timelines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: OUR APPROACH ═══════════════════════════════════ */}
      <section className="section" aria-labelledby="cbf-approach-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Our Approach</span>
            <h2 id="cbf-approach-heading">How we deliver this, reliably</h2>
          </div>
          <div className="flow-grid">
            <div className="flow-card animate-in delay-1">
              <span className="flow-num">01</span>
              <h3>Understand &amp; Plan</h3>
              <p>We review your design, objectives, timelines, and exhibition requirements before production begins.</p>
            </div>
            <div className="flow-card animate-in delay-2">
              <span className="flow-num">02</span>
              <h3>Engineer &amp; Detail</h3>
              <p>Technical drawings, material specifications, and fabrication details are finalised for execution.</p>
            </div>
            <div className="flow-card animate-in delay-3">
              <span className="flow-num">03</span>
              <h3>Build &amp; Inspect</h3>
              <p>The booth is fabricated, assembled, and quality-checked to ensure every component meets standards.</p>
            </div>
            <div className="flow-card animate-in delay-4">
              <span className="flow-num">04</span>
              <h3>Install &amp; Support</h3>
              <p>We manage on-site installation, handover, and post-event dismantling for a smooth end-to-end experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: CTA ════════════════════════════════════════════ */}
      <section className="cta-section" aria-labelledby="cbf-cta-heading">
        <div className="container">
          <h2 id="cbf-cta-heading">Consult with our custom booth fabrication experts today.</h2>
          <p className="cta-sub">Because a well-built booth shapes how your brand is experienced and remembered.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
            <a href="/contact" className="btn btn-outline">Book a Consultation</a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: FAQ ════════════════════════════════════════════ */}
      <section className="section faq-section" aria-labelledby="cbf-faq-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <h2 id="cbf-faq-heading">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item animate-in delay-1">
              <button className="faq-question" aria-expanded="false">How much does custom booth fabrication cost?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Cost depends on booth size, materials, finishes, and complexity. After reviewing your design and requirements we share a transparent, itemised quote so you know exactly what's included — with no hidden charges.</p></div>
            </div>
            <div className="faq-item animate-in delay-2">
              <button className="faq-question" aria-expanded="false">Can you fabricate based on an existing design?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Yes. Share your approved design or 3D renders and our engineering team will prepare production drawings and fabricate the booth to exact specifications — whether the design is ours or yours.</p></div>
            </div>
            <div className="faq-item animate-in delay-3">
              <button className="faq-question" aria-expanded="false">What if changes are needed during installation?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Our on-site team is present throughout setup and carries tools and spares to handle adjustments immediately. Because we test a full-scale mock-up before dispatch, on-site changes are rare and quickly resolved.</p></div>
            </div>
            <div className="faq-item animate-in delay-4">
              <button className="faq-question" aria-expanded="false">Do you fabricate for international exhibitions?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Yes. We deliver to 14+ countries and build to international standards, managing logistics, on-site assembly, and compliance with local venue regulations wherever you exhibit.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: EXPLORE MORE SERVICES ══════════════════════════ */}
      <section className="section explore-more-section" aria-labelledby="cbf-more-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <span className="section-label" id="cbf-more-heading">Explore More Services</span>
          </div>
          <div className="srv-cards-grid">
            <a href="/services/exhibition-stall-design" className="srv-card animate-in delay-1">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Exhibition Stall Design</h3>
              <p>Innovative stalls designed to create a lasting impression within seconds.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
            <a href="/services/turnkey-project-management" className="srv-card animate-in delay-2">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Turnkey Project Management</h3>
              <p>We manage the entire project cycle so you can focus entirely on your visitors.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
            <a href="/services/av-technology-integration" className="srv-card animate-in delay-3">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Audio-Visual &amp; Technology Integration</h3>
              <p>Enhancing how your audience experiences and interacts with your brand.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
