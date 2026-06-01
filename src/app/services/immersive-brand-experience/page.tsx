export const metadata = {
  title: 'Immersive Brand Experience — Approach Media',
  description: 'Sensory-led environments designed to be remembered — every touchpoint of spatial narrative, lighting, sound, material, and interaction crafted to emotionally connect visitors to your brand.',
}

export default function ImmersiveBrandExperiencePage() {
  return (
    <main>

      {/* ═══ SECTION 1: HERO ═══════════════════════════════════════════ */}
      <section className="page-hero" aria-labelledby="hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">A Brand. An Experience. A Memory.</span>
            <h1 id="hero-heading" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: '700', letterSpacing: '-0.02em', lineHeight: '1.08', maxWidth: '780px', marginBottom: '22px' }}>Immersive Brand Experiences</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '600px', lineHeight: '1.8', marginBottom: '36px' }}>Sensory-led environments designed to be remembered — every touchpoint of spatial narrative, lighting, sound, material, and interaction crafted to emotionally connect visitors to your brand.</p>
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
              <h2 id="intro-heading" style={{ position: 'absolute', left: '-9999px' }}>Immersive Brand Experience Design</h2>
              <p>People forget what they see, but they remember how a space made them feel. An immersive brand experience turns your exhibition stand from a display into a moment your visitors carry with them.</p>
              <p>Emotional connection is what converts passing footfall into genuine brand recall and lasting relationships.</p>
              <p>At Approach Media — our flagship offering — we design every sensory touchpoint deliberately: the narrative as you walk through, the lighting, the soundscape, the materials, and the moments of interaction that make your brand unforgettable.</p>
            </div>
            {/* DUMMY PHOTO — replace src below with your own image */}
            <figure className="media-frame">
              {/* To use a real photo: <img src="../assets/portfolio/immersive-brand-experience-1.jpg" alt="Immersive brand experience environment" /> */}
              <span className="media-icon" aria-hidden="true">&#128247;</span>
              <span className="media-hint">Replace with project photo</span>
              <figcaption className="media-tag">Sample Project</figcaption>
              <span className="media-caption">Immersive brand experience environment</span>
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
            <h2 id="solutions-heading">End-to-End Immersive Experience Solutions</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.85', fontSize: '1rem', marginTop: '18px' }}>We craft the complete sensory journey of your stand — narrative, space, light, sound, material, and interaction — so visitors don’t just see your brand, they feel it.</p>
          </div>
          <div className="feature-check-grid">
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Spatial Narrative &amp; Journey Design</h3>
                <p>A deliberate story that unfolds as visitors move through your space.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-2">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Sensory Lighting &amp; Soundscapes</h3>
                <p>Light and sound choreographed to set mood and guide emotion.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-3">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Material &amp; Texture Curation</h3>
                <p>Tactile finishes that make your brand feel premium and intentional.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-4">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Interactive &amp; Experiential Zones</h3>
                <p>Moments of participation that turn visitors into active participants.</p>
              </div>
            </div>
            <div className="feature-check-card animate-in delay-1">
              <span className="check" aria-hidden="true">&#10003;</span>
              <div>
                <h3>Brand Storytelling Integration</h3>
                <p>Every element aligned to communicate one clear, memorable brand message.</p>
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
            <h2 id="why-heading">Unforgettable brand experiences, crafted with intent and delivered with certainty.</h2>
          </div>
          <div className="why4-grid">
            <div className="why4-card animate-in delay-1">
              <h3>Experience-First Thinking</h3>
              <p>We design for how visitors feel and remember, not just how the stand looks.</p>
            </div>
            <div className="why4-card animate-in delay-2">
              <h3>Multi-Sensory Craft</h3>
              <p>Light, sound, material, and interaction are composed together as one experience.</p>
            </div>
            <div className="why4-card animate-in delay-3">
              <h3>Flagship Expertise</h3>
              <p>Immersive design is our specialist offering, refined across hundreds of projects.</p>
            </div>
            <div className="why4-card animate-in delay-4">
              <h3>Seamless Execution</h3>
              <p>In-house design and fabrication ensure the experience is delivered exactly as imagined.</p>
            </div>
            <div className="why4-card animate-in delay-1">
              <h3>Global Delivery</h3>
              <p>We create immersive environments to international standards across 14+ countries.</p>
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
              <p>We define your brand story, audience, and the emotion you want visitors to leave with.</p>
            </div>
            <div className="flow-card animate-in delay-2">
              <span className="flow-num">02</span>
              <h3>Design &amp; Detail</h3>
              <p>The spatial narrative, lighting, sound, and interaction are designed and detailed together.</p>
            </div>
            <div className="flow-card animate-in delay-3">
              <span className="flow-num">03</span>
              <h3>Build &amp; Test</h3>
              <p>Every sensory element is fabricated and tested as one integrated experience before dispatch.</p>
            </div>
            <div className="flow-card animate-in delay-4">
              <span className="flow-num">04</span>
              <h3>Execute &amp; Close</h3>
              <p>We install, fine-tune the experience on-site, and dismantle after a flawless show.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: CTA ════════════════════════════════════════════ */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">Consult with our immersive experience experts today.</h2>
          <p className="cta-sub">Because the brands visitors remember are the ones they felt something for.</p>
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
              <button className="faq-question" aria-expanded="false">What makes an experience &ldquo;immersive&rdquo;?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>It engages multiple senses at once — spatial narrative, lighting, sound, material, and interaction — working together so visitors feel your brand rather than just look at it.</p></div>
            </div>
            <div className="faq-item animate-in delay-2">
              <button className="faq-question" aria-expanded="false">Is this only for large stands?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>No. Immersive principles scale to any size. Even a compact stand can deliver a focused, memorable sensory moment when every touchpoint is intentional.</p></div>
            </div>
            <div className="faq-item animate-in delay-3">
              <button className="faq-question" aria-expanded="false">Can you integrate technology into the experience?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Yes. We combine immersive design with AV and interactive technology where it strengthens the story — never as a gimmick.</p></div>
            </div>
            <div className="faq-item animate-in delay-4">
              <button className="faq-question" aria-expanded="false">How do you measure the impact?<span className="faq-icon" aria-hidden="true">&#43;</span></button>
              <div className="faq-answer"><p>Through dwell time, engagement at interactive zones, and brand recall. We design each experience around a clear objective so impact is visible.</p></div>
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
            <a href="/services/av-technology-integration" className="srv-card animate-in delay-1">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Audio-Visual &amp; Technology Integration</h3>
              <p>Enhancing how your audience experiences and interacts with your brand.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
            <a href="/services/exhibition-stall-design" className="srv-card animate-in delay-2">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Exhibition Stall Design</h3>
              <p>Innovative stalls designed to create a lasting impression within seconds.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
            <a href="/services/double-decker-mezzanine-stands" className="srv-card animate-in delay-3">
              <div className="srv-card-glow" aria-hidden="true"></div>
              <h3>Double Decker / Mezzanine Stands</h3>
              <p>Engineered multi-level structures that maximise floor presence.</p>
              <span className="srv-card-cta">Learn more &#8599;</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
