export const metadata = {
  title: 'AV & Technology Integration — Approach Media',
  description: 'LED walls, interactive screens, immersive sound and lighting — planned and integrated within your stall from day one to enhance how your audience experiences your brand.',
}

export default function AvTechnologyIntegrationPage() {
  return (
    <main>

      {/* ═══ SECTION 1: HERO ═══════════════════════════════════════════ */}
      <section className="page-hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">Technology That Brings Spaces to Life</span>
            <h1 id="hero-heading" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.08', maxWidth: '780px', marginBottom: '22px' }}>Audio-Visual &amp; Technology Integration</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '600px', lineHeight: '1.8', marginBottom: '36px' }}>LED walls, interactive screens, immersive sound and lighting — planned and integrated within your stall from day one to enhance how your audience experiences your brand.</p>
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
              <h2 id="intro-heading" style={{ position: 'absolute', left: '-9999px' }}>Audio-Visual &amp; Technology Integration</h2>
              <p>Modern exhibition visitors expect more than static displays. Technology — done well — turns a passive stand into an interactive experience that draws people in and keeps them engaged.</p>
              <p>The right AV setup directly shapes how memorable and shareable your brand feels on the show floor.</p>
              <p>At Approach Media, we plan AV and technology as part of the design from day one — not bolted on afterwards. Every screen, speaker, and light is integrated cleanly into the structure for a seamless, high-impact result.</p>
            </div>
            {/* DUMMY PHOTO — replace src below with your own image */}
            <figure className="media-frame">
              {/* To use a real photo: <img src="../assets/portfolio/av-technology-integration-1.jpg" alt="Integrated AV & technology exhibition build" /> */}
              <span className="media-icon" aria-hidden="true">&#128247;</span>
              <span className="media-hint">Replace with project photo</span>
              <figcaption className="media-tag">Sample Project</figcaption>
              <span className="media-caption">Integrated AV &amp; technology exhibition build</span>
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
            <h2 id="solutions-heading">End-to-End AV &amp; Technology Integration Solutions</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.85', fontSize: '1rem', marginTop: '18px' }}>We design, supply, and integrate the complete audio-visual and digital experience for your stall — engineered into the structure for a clean, reliable, high-impact result.</p>
          </div>
          <div className="feature-check-grid">
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>LED Video Walls &amp; Displays</h3>
                <p>High-resolution LED walls and screens that command attention from across the hall.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-2">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Interactive Touchscreens</h3>
                <p>Product configurators, catalogues, and demos that invite visitors to engage hands-on.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-3">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Immersive Sound &amp; Lighting</h3>
                <p>Ambient sound design and programmable lighting that set the mood and guide attention.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-4">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Digital Brand Storytelling</h3>
                <p>Custom content, motion graphics, and looping showreels that tell your brand story.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Technical Setup &amp; On-Site Support</h3>
                <p>Cabling, rigging, testing, and a technician on-site throughout the show.</p>
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
            <h2 id="why-heading">Reliable AV integration, engineered into the design and delivered with certainty.</h2>
          </div>
          <div className="why4-grid">
            <div className="why4-card animate-in delay-1">
              <h3>Designed-In, Not Bolted-On</h3>
              <p>AV is planned as part of the stall structure from day one for a clean, seamless finish.</p>
            </div>
            <div className="why4-card animate-in delay-2">
              <h3>Reliable Hardware</h3>
              <p>We source proven, exhibition-grade equipment that performs reliably under show conditions.</p>
            </div>
            <div className="why4-card animate-in delay-3">
              <h3>Content That Converts</h3>
              <p>Our team can produce or adapt content so screens carry a clear, on-brand message.</p>
            </div>
            <div className="why4-card animate-in delay-4">
              <h3>On-Site Technical Support</h3>
              <p>A technician is present throughout the show to keep every screen and speaker running.</p>
            </div>
            <div className="why4-card animate-in delay-1">
              <h3>Global Standards</h3>
              <p>We work to international electrical, safety, and rigging standards wherever you exhibit.</p>
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
              <p>We define the experience you want and map the AV and content to your objectives.</p>
            </div>
            <div className="flow-card animate-in delay-2">
              <span className="flow-num">02</span>
              <h3>Design &amp; Detail</h3>
              <p>Screen layouts, content, sound, and lighting are specified and integrated into the stall design.</p>
            </div>
            <div className="flow-card animate-in delay-3">
              <span className="flow-num">03</span>
              <h3>Build &amp; Test</h3>
              <p>Hardware is installed and the full AV system is tested end to end before the show opens.</p>
            </div>
            <div className="flow-card animate-in delay-4">
              <span className="flow-num">04</span>
              <h3>Execute &amp; Support</h3>
              <p>We commission everything on-site and keep a technician on hand throughout the event.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: CTA ════════════════════════════════════════════ */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">Consult with our AV &amp; technology integration experts today.</h2>
          <p className="cta-sub">Because the right technology turns a stand into an experience your visitors remember and share.</p>
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
              <button className="faq-question" aria-expanded="false">What AV technology can you integrate?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>LED video walls, interactive touchscreens, product demo stations, ambient sound, programmable lighting, and custom digital content — all integrated into your stall.</p></div>
            </div>
            <div className="faq-item animate-in delay-2">
              <button className="faq-question" aria-expanded="false">Can you produce the on-screen content too?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Yes. Our team can produce or adapt motion graphics, showreels, and interactive content so your screens carry a clear, on-brand message.</p></div>
            </div>
            <div className="faq-item animate-in delay-3">
              <button className="faq-question" aria-expanded="false">Do you provide on-site technical support?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Always. A technician is present throughout the show to test, monitor, and instantly resolve any AV issue.</p></div>
            </div>
            <div className="faq-item animate-in delay-4">
              <button className="faq-question" aria-expanded="false">Is the equipment reliable for multi-day shows?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>We source proven, exhibition-grade hardware and test the full system before opening, so it performs reliably across the entire event.</p></div>
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
            <a href="/services/immersive-brand-experience" className="srv-card animate-in delay-2">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Immersive Brand Experiences</h3>
              <p>Sensory-led environments designed to be remembered.</p>
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
