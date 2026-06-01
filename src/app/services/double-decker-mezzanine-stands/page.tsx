export const metadata = {
  title: 'Double Decker Mezzanine Stands — Approach Media',
  description: 'Engineered multi-level structures that maximise floor presence — adding private meeting areas, VIP lounges, and elevated viewing platforms to create a landmark on any show floor.',
}

export default function DoubleDeckerMezzanineStandsPage() {
  return (
    <main>

      {/* ═══ SECTION 1: HERO ═══════════════════════════════════════════ */}
      <section className="page-hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">Stands That Rise Above the Rest</span>
            <h1 id="hero-heading" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.08', maxWidth: '780px', marginBottom: '22px' }}>Double Decker / Mezzanine Stands</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '600px', lineHeight: '1.8', marginBottom: '36px' }}>Engineered multi-level structures that maximise floor presence — adding private meeting areas, VIP lounges, and elevated viewing platforms to create a landmark on any show floor.</p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
              <a href="/contact" className="btn btn-outline">Book a Consultation</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: INTRO + DUMMY IMAGE ════════════════════════════ */}
      <section className="section" aria-labelledby="intro-heading">
        <div className="container">
          <div className="intro-media-grid animate-in">
            <div className="intro-media-text">
              <h2 id="intro-heading" style={{ position: 'absolute', left: '-9999px' }}>Double Decker / Mezzanine Stands</h2>
              <p>When floor space is limited or premium, the smartest way to grow is upward. A double decker stand effectively doubles your usable area without increasing your footprint.</p>
              <p>Multi-level structures also create a commanding visual presence that makes your brand impossible to miss across a crowded hall.</p>
              <p>At Approach Media, we engineer double decker and mezzanine stands that are structurally certified, safe, and visually striking — combining private upper-level spaces with high-impact ground-floor engagement.</p>
            </div>
            {/* DUMMY PHOTO — replace src below with your own image */}
            <figure className="media-frame">
              {/* To use a real photo: <img src="../assets/portfolio/double-decker-mezzanine-stands-1.jpg" alt="Engineered double decker exhibition stand" /> */}
              <span className="media-icon" aria-hidden="true">&#128247;</span>
              <span className="media-hint">Replace with project photo</span>
              <figcaption className="media-tag">Sample Project</figcaption>
              <span className="media-caption">Engineered double decker exhibition stand</span>
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
      <section className="section" aria-labelledby="solutions-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ maxWidth: '640px' }}>
            <h2 id="solutions-heading">End-to-End Double Decker &amp; Mezzanine Solutions</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.85', fontSize: '1rem', marginTop: '18px' }}>We design, engineer, certify, and build multi-level stands that make full use of vertical space — giving you more room to host, meet, and impress without expanding your footprint.</p>
          </div>
          <div className="feature-check-grid">
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Structural Engineering &amp; Certification</h3>
                <p>Load-tested designs with proper certification to meet venue and safety requirements.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-2">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Upper-Level Lounges &amp; Meeting Rooms</h3>
                <p>Private spaces for VIP hospitality, negotiations, and focused conversations.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-3">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Elevated Viewing Platforms</h3>
                <p>Commanding sightlines across the hall that draw visitors to your stand.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-4">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Ground-Floor Engagement Zones</h3>
                <p>High-traffic display and demo areas that capture passing footfall.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Compliance with Venue Norms</h3>
                <p>Every structure meets organiser height limits, load norms, and safety standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: WHY CHOOSE APPROACH MEDIA ══════════════════════ */}
      <section className="section" style={{ background: 'hsl(222 24% 9% / 0.3)', borderTop: '1px solid var(--border)' }} aria-labelledby="why-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Why Choose Approach Media</span>
            <h2 id="why-heading">Reliable multi-level stands delivered with engineering precision and certified safety.</h2>
          </div>
          <div className="why4-grid">
            <div className="why4-card animate-in delay-1">
              <h3>Certified Structural Safety</h3>
              <p>Every double decker is load-tested and certified to meet venue and regulatory standards.</p>
            </div>
            <div className="why4-card animate-in delay-2">
              <h3>Maximised Floor Value</h3>
              <p>You gain a private upper level without paying for additional floor space.</p>
            </div>
            <div className="why4-card animate-in delay-3">
              <h3>Landmark Visual Presence</h3>
              <p>Height and lighting make your stand a reference point across the entire hall.</p>
            </div>
            <div className="why4-card animate-in delay-4">
              <h3>In-House Fabrication</h3>
              <p>Complete control over structural quality, finish, and on-time delivery.</p>
            </div>
            <div className="why4-card animate-in delay-1">
              <h3>Global Build Standards</h3>
              <p>Experience delivering certified multi-level stands across India and internationally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: OUR APPROACH ═══════════════════════════════════ */}
      <section className="section" aria-labelledby="approach-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Our Approach</span>
            <h2 id="approach-heading">How we deliver this, reliably</h2>
          </div>
          <div className="flow-grid">
            <div className="flow-card animate-in delay-1">
              <span className="flow-num">01</span>
              <h3>Understand &amp; Plan</h3>
              <p>We assess your space, objectives, and how you want to use the upper and ground levels.</p>
            </div>
            <div className="flow-card animate-in delay-2">
              <span className="flow-num">02</span>
              <h3>Engineer &amp; Certify</h3>
              <p>Structural drawings and load calculations are finalised and certified for venue approval.</p>
            </div>
            <div className="flow-card animate-in delay-3">
              <span className="flow-num">03</span>
              <h3>Build &amp; Test</h3>
              <p>The structure is fabricated and assembled at full scale, with safety checks at every stage.</p>
            </div>
            <div className="flow-card animate-in delay-4">
              <span className="flow-num">04</span>
              <h3>Install &amp; Support</h3>
              <p>We install on-site, obtain final approvals, and support you throughout the show.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: CTA ════════════════════════════════════════════ */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">Consult with our double decker stand experts today.</h2>
          <p className="cta-sub">Because rising above the crowd — literally — is one of the most powerful ways to own a show floor.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
            <a href="/contact" className="btn btn-outline">Book a Consultation</a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: FAQ ════════════════════════════════════════════ */}
      <section className="section faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <h2 id="faq-heading">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item animate-in delay-1">
              <button className="faq-question" aria-expanded="false">Are double decker stands safe and certified?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Yes. Every multi-level structure is load-tested, engineered, and certified to meet venue regulations and safety standards before approval.</p></div>
            </div>
            <div className="faq-item animate-in delay-2">
              <button className="faq-question" aria-expanded="false">How much extra space do I gain?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>A double decker effectively doubles your usable area within the same floor footprint, adding a private upper level for lounges or meetings.</p></div>
            </div>
            <div className="faq-item animate-in delay-3">
              <button className="faq-question" aria-expanded="false">Do organisers allow double decker stands?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Most major venues permit them within defined height and load limits. We handle the engineering certification and approvals on your behalf.</p></div>
            </div>
            <div className="faq-item animate-in delay-4">
              <button className="faq-question" aria-expanded="false">How early should we plan a multi-level stand?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Earlier than a single-level stand — ideally 8+ weeks — to allow time for structural certification and venue approval. Tell us your date and we will plan around it.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: EXPLORE MORE SERVICES ══════════════════════════ */}
      <section className="section explore-more-section" aria-labelledby="more-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <span className="section-label" id="more-heading">Explore More Services</span>
          </div>
          <div className="srv-cards-grid">
            <a href="/services/exhibition-stall-design" className="srv-card animate-in delay-1">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Exhibition Stall Design</h3>
              <p>Innovative stalls designed to create a lasting impression within seconds.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
            <a href="/services/custom-booth-fabrication" className="srv-card animate-in delay-2">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Custom Booth Fabrication</h3>
              <p>Bespoke designs translated into durable, high-quality structures.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
            <a href="/services/turnkey-project-management" className="srv-card animate-in delay-3">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Turnkey Project Management</h3>
              <p>We manage the entire project cycle so you can focus entirely on your visitors.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
