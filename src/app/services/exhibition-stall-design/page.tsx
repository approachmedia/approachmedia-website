export const metadata = {
  title: 'Exhibition Stall Design — Approach Media',
  description: 'In exhibitions, you have seconds to make a lasting impression. Our exhibition stall designs do exactly that.',
}

export default function ExhibitionStallDesignPage() {
  return (
    <main>

      {/* ═══ SECTION 1: HERO ═══════════════════════════════════════════ */}
      <section className="page-hero" aria-labelledby="esd-hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">Stalls That Are Designed to Be Remembered</span>
            <h1 id="esd-hero-heading" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.08', maxWidth: '760px', marginBottom: '22px' }}>Exhibition Stall Design</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '560px', lineHeight: '1.8', marginBottom: '36px' }}>In exhibitions, you have seconds to make a lasting impression. Our exhibition stall designs do exactly that.</p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
              <a href="/contact" className="btn btn-outline">Book a Consultation</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: INTRO + DUMMY IMAGE ════════════════════════════ */}
      <section className="section" aria-labelledby="esd-intro-heading">
        <div className="container">
          <div className="intro-media-grid animate-in">
            <div className="intro-media-text">
              <h2 id="esd-intro-heading" className="sr-only" style={{ position: 'absolute', left: '-9999px' }}>About our exhibition stall design</h2>
              <p>In an environment where every stall is competing for attention, we design customised exhibition spaces that align with your brand, audience, and exhibition objectives.</p>
              <p>Choosing the right design directly impacts how your brand is experienced.</p>
              <p>At Approach Media, we bring over two decades of expertise in exhibition stall designs across geographies and industries. We partner with brands to create spaces that perform in high-pressure exhibition environments.</p>
            </div>
            {/* DUMMY PHOTO — replace src below with your own image */}
            <figure className="media-frame">
              {/* To use a real photo: <img src="../assets/portfolio/stall-design-1.jpg" alt="Premium exhibition stall design build" /> */}
              <span className="media-icon" aria-hidden="true">&#128247;</span>
              <span className="media-hint">Replace with project photo</span>
              <figcaption className="media-tag">Sample Project</figcaption>
              <span className="media-caption">Premium exhibition stall design build</span>
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
      <section className="section" aria-labelledby="esd-solutions-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ maxWidth: '620px' }}>
            <h2 id="esd-solutions-heading">End-to-End Exhibition Stall Design Solutions</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.85', fontSize: '1rem', marginTop: '18px' }}>At Approach Media, we design and build customised exhibition stalls for trade fairs, expos, and corporate events across India. Every stall is thoughtfully created to reflect your brand identity, maximise the available space, and create meaningful engagement with visitors.</p>
          </div>
          <div className="feature-check-grid">
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Concept Design &amp; 3D Visualization</h3>
                <p>Transforming your ideas into innovative, functional, and visually impactful exhibition stall designs.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-2">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>In-House Engineering &amp; Fabrication</h3>
                <p>Precision-built structures crafted by our in-house team to ensure quality, durability, and attention to detail.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-3">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Stall Installation &amp; Dismantling</h3>
                <p>Efficient setup and timely removal for a smooth and hassle-free event experience.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-4">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Compliance with Venue Norms</h3>
                <p>Ensuring every exhibition stall design meets venue guidelines, local regulations, and safety standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: WHY CHOOSE APPROACH MEDIA ══════════════════════ */}
      <section className="section" style={{ background: 'hsl(222 24% 9% / 0.3)', borderTop: '1px solid var(--border)' }} aria-labelledby="esd-why-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Why Choose Approach Media</span>
            <h2 id="esd-why-heading">Thoughtfully designed experience-oriented exhibition stalls, delivered with certainty.</h2>
          </div>
          <div className="why4-grid">
            <div className="why4-card animate-in delay-1">
              <h3>Designed with Industry Context</h3>
              <p>Every industry communicates differently. Every element we design is intentional — the goal is to convey your message instantly and create a lasting impression.</p>
            </div>
            <div className="why4-card animate-in delay-2">
              <h3>Smooth End-to-End Execution</h3>
              <p>From concept to dismantling, a single team manages the entire process — ensuring consistency and complete control over quality and timelines.</p>
            </div>
            <div className="why4-card animate-in delay-3">
              <h3>Aligned with Global Standards</h3>
              <p>We adhere to global build, safety, and execution standards, delivering consistent quality wherever you exhibit.</p>
            </div>
            <div className="why4-card animate-in delay-1">
              <h3>Structured, Reliable Timelines</h3>
              <p>A well-defined process enables us to complete most projects within a two-month timeframe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: OUR APPROACH ═══════════════════════════════════ */}
      <section className="section" aria-labelledby="esd-approach-heading">
        <div className="container">
          <div className="section-head animate-in">
            <span className="section-label">Our Approach</span>
            <h2 id="esd-approach-heading">How we deliver this, reliably</h2>
          </div>
          <div className="flow-grid">
            <div className="flow-card animate-in delay-1">
              <span className="flow-num">01</span>
              <h3>Understand &amp; Plan</h3>
              <p>We align on your brand, audience, objectives, and exhibition context to set a clear direction.</p>
            </div>
            <div className="flow-card animate-in delay-2">
              <span className="flow-num">02</span>
              <h3>Design &amp; Detail</h3>
              <p>Your requirements are translated into spatial layouts, 3D concepts, and technical specifications ready for execution.</p>
            </div>
            <div className="flow-card animate-in delay-3">
              <span className="flow-num">03</span>
              <h3>Build &amp; Test</h3>
              <p>The stall is fabricated and assembled, with a full-scale mock-up tested to ensure everything works as intended.</p>
            </div>
            <div className="flow-card animate-in delay-4">
              <span className="flow-num">04</span>
              <h3>Execute &amp; Close</h3>
              <p>We handle on-site installation, handover, and post-event dismantling, ensuring a smooth experience from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: CTA ════════════════════════════════════════════ */}
      <section className="cta-section" aria-labelledby="esd-cta-heading">
        <div className="container">
          <h2 id="esd-cta-heading">Consult with our exhibition stall design experts today.</h2>
          <p className="cta-sub">Because your space defines how your brand is experienced and how your clients remember you.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
            <a href="/contact" className="btn btn-outline">Book a Consultation</a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: FAQ ════════════════════════════════════════════ */}
      <section className="section faq-section" aria-labelledby="esd-faq-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <h2 id="esd-faq-heading">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item animate-in delay-1">
              <button className="faq-question" aria-expanded="false">How much does exhibition stall design cost?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Cost depends on stand size, design complexity, materials, and location. After a short brief we share a transparent, itemised proposal so you know exactly what you're paying for — with no hidden charges.</p></div>
            </div>
            <div className="faq-item animate-in delay-2">
              <button className="faq-question" aria-expanded="false">How early should we start?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Ideally 6–8 weeks before the show. That gives us room for concept design, approvals, fabrication, and a full-scale mock-up. We can work to tighter timelines too — tell us your date and we'll plan around it.</p></div>
            </div>
            <div className="faq-item animate-in delay-3">
              <button className="faq-question" aria-expanded="false">What if we already have ideas or constraints?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Perfect — we love a starting point. Share your references, brand guidelines, or organiser constraints and we'll build the design around them rather than imposing a template.</p></div>
            </div>
            <div className="faq-item animate-in delay-4">
              <button className="faq-question" aria-expanded="false">What if something doesn't work on-site?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Our full-scale mock-up testing eliminates most surprises before dispatch. On-site, our installation team is present throughout setup to handle any adjustment immediately, so your stand is show-ready on time.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: EXPLORE MORE SERVICES ══════════════════════════ */}
      <section className="section explore-more-section" aria-labelledby="esd-more-heading">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '36px' }}>
            <span className="section-label" id="esd-more-heading">Explore More Services</span>
          </div>
          <div className="srv-cards-grid">
            <a href="/services/custom-booth-fabrication" className="srv-card animate-in delay-1">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Custom Booth Fabrication</h3>
              <p>Bespoke designs translated into durable, high-quality structures.</p>
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
