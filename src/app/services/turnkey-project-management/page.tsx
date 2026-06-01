export const metadata = {
  title: 'Turnkey Project Management — Approach Media',
  description: 'We manage the entire project cycle so you can focus entirely on your visitors — from the first brief to post-event dismantle, with zero coordination gaps.',
}

export default function TurnkeyProjectManagementPage() {
  return (
    <main>

      {/* ═══ SECTION 1: HERO ═══════════════════════════════════════════ */}
      <section className="page-hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">One Team. One Point of Contact.</span>
            <h1 id="hero-heading" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.08', maxWidth: '780px', marginBottom: '22px' }}>Turnkey Project Management</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '600px', lineHeight: '1.8', marginBottom: '36px' }}>We manage the entire project cycle so you can focus entirely on your visitors — from the first brief to post-event dismantle, with zero coordination gaps.</p>
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
              <h2 id="intro-heading" style={{ position: 'absolute', left: '-9999px' }}>Turnkey Project Management</h2>
              <p>Exhibitions involve dozens of moving parts — design, fabrication, logistics, vendors, venue approvals, installation, and dismantle. Coordinating them across multiple suppliers is where most delays and budget overruns begin.</p>
              <p>With turnkey project management, a single accountable team owns the entire process, so nothing falls between the cracks.</p>
              <p>At Approach Media, over two decades of delivery across India and 14+ countries means we anticipate problems before they happen — keeping your project on time, on budget, and on brief from day one.</p>
            </div>
            {/* DUMMY PHOTO — replace src below with your own image */}
            <figure className="media-frame">
              {/* To use a real photo: <img src="../assets/portfolio/turnkey-project-management-1.jpg" alt="Turnkey exhibition project delivery" /> */}
              <span className="media-icon" aria-hidden="true">&#128247;</span>
              <span className="media-hint">Replace with project photo</span>
              <figcaption className="media-tag">Sample Project</figcaption>
              <span className="media-caption">Turnkey exhibition project delivery</span>
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
            <h2 id="solutions-heading">End-to-End Turnkey Exhibition Solutions</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.85', fontSize: '1rem', marginTop: '18px' }}>From the first conversation to the final handover, every stage of your exhibition is planned, managed, and delivered by one team — giving you a single point of accountability throughout.</p>
          </div>
          <div className="feature-check-grid">
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Single Point of Contact</h3>
                <p>One dedicated project manager owns your entire exhibition — no chasing multiple vendors.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-2">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Design &amp; Fabrication Management</h3>
                <p>Concept, 3D design, engineering, and in-house fabrication coordinated under one roof.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-3">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Logistics &amp; Site Coordination</h3>
                <p>Transport, venue approvals, and on-site scheduling handled end to end.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-4">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Installation &amp; On-Site Support</h3>
                <p>Professional setup with our team present throughout the show for any adjustment.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Post-Event Dismantle &amp; Closeout</h3>
                <p>Clean dismantle, asset recovery, and a full project documentation report.</p>
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
            <h2 id="why-heading">Reliable turnkey delivery with complete ownership, consistency, and accountability.</h2>
          </div>
          <div className="why4-grid">
            <div className="why4-card animate-in delay-1">
              <h3>Complete Ownership</h3>
              <p>A single team manages the entire process, eliminating coordination gaps and finger-pointing.</p>
            </div>
            <div className="why4-card animate-in delay-2">
              <h3>Predictable Timelines</h3>
              <p>A structured workflow keeps every milestone on schedule, with most projects delivered within committed timelines.</p>
            </div>
            <div className="why4-card animate-in delay-3">
              <h3>Cost Transparency</h3>
              <p>One consolidated, itemised budget — no hidden vendor mark-ups or surprise charges.</p>
            </div>
            <div className="why4-card animate-in delay-4">
              <h3>Quality Control</h3>
              <p>In-house fabrication and full-scale mock-up testing ensure consistent quality before dispatch.</p>
            </div>
            <div className="why4-card animate-in delay-1">
              <h3>Global Delivery</h3>
              <p>Experience across 14+ countries, managing logistics and compliance wherever you exhibit.</p>
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
              <p>We define your brand, objectives, budget, and timelines, then build a complete project plan.</p>
            </div>
            <div className="flow-card animate-in delay-2">
              <span className="flow-num">02</span>
              <h3>Design &amp; Detail</h3>
              <p>Spatial concepts, 3D renders, and engineering drawings are finalised and locked for execution.</p>
            </div>
            <div className="flow-card animate-in delay-3">
              <span className="flow-num">03</span>
              <h3>Build &amp; Coordinate</h3>
              <p>Fabrication, logistics, and venue approvals are managed in parallel and quality-checked.</p>
            </div>
            <div className="flow-card animate-in delay-4">
              <span className="flow-num">04</span>
              <h3>Execute &amp; Close</h3>
              <p>We install on-site, hand over a ready stand, then dismantle and close with full documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: CTA ════════════════════════════════════════════ */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">Consult with our turnkey project management experts today.</h2>
          <p className="cta-sub">Because a single accountable partner means a smoother exhibition and more time for what matters — your visitors.</p>
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
              <button className="faq-question" aria-expanded="false">What does turnkey project management include?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Everything from concept design and fabrication to logistics, venue approvals, installation, on-site support, and post-event dismantle — managed by one team under a single budget.</p></div>
            </div>
            <div className="faq-item animate-in delay-2">
              <button className="faq-question" aria-expanded="false">Will I have one point of contact?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Yes. A dedicated project manager owns your exhibition end to end, so you never coordinate multiple vendors yourself.</p></div>
            </div>
            <div className="faq-item animate-in delay-3">
              <button className="faq-question" aria-expanded="false">Can you manage international exhibitions?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Absolutely. We deliver to 14+ countries, handling logistics, local vendor coordination, and venue compliance wherever you exhibit.</p></div>
            </div>
            <div className="faq-item animate-in delay-4">
              <button className="faq-question" aria-expanded="false">How do you keep the project on budget?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>You receive one consolidated, itemised budget upfront. Because we manage design, fabrication, and logistics in-house, there are no hidden vendor mark-ups.</p></div>
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
