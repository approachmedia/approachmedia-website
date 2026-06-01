export const metadata = {
  title: 'About Approach Media — Exhibition Stall Designers Since 2002',
  description: 'Approach Media designs and builds exhibition stalls across India and 14+ countries since 2002.',
}

export default function AboutPage() {
  return (
    <main>

      {/* ─── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="page-hero" aria-labelledby="about-hero-heading">
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="section-label">About Approach Media Pvt. Ltd.</span>
            <h1 id="about-hero-heading">We design unique exhibition stalls so that your brand is <span className="highlight">understood, experienced, and remembered.</span></h1>
            <p className="page-hero-body">Exhibitions are high-investment environments where spaces must communicate clearly, engage meaningfully, and leave a lasting impression within moments. This is where we come in. With over two decades of work across industries and geographies, we partner with brands to create spaces that perform in high-pressure exhibition environments.</p>
            <div className="about-hero-blocks animate-in delay-2">
              <div className="about-hero-block">
                <span className="about-hero-block-icon" aria-hidden="true">&#127912;</span>
                <h3>Custom Services and Offerings</h3>
                <p>From design and fabrication to AV integration and immersive brand experiences — every service tailored to your brand and exhibition goals.</p>
                <a href="/services" className="btn btn-ghost btn-xs">Explore Services</a>
              </div>
              <div className="about-hero-block">
                <span className="about-hero-block-icon" aria-hidden="true">&#127758;</span>
                <h3>Pan-India and Global Presence</h3>
                <p>Operating across India's key exhibition cities and 14+ countries including USA, Germany, UAE, Singapore, France, Netherlands, and more.</p>
                <a href="/global" className="btn btn-ghost btn-xs">View Our Reach</a>
              </div>
              <div className="about-hero-block">
                <span className="about-hero-block-icon" aria-hidden="true">&#127919;</span>
                <h3>Industries Served</h3>
                <p>Real estate, pharma, FMCG, technology, automotive, manufacturing, textile, healthcare, and construction — we understand the communication nuance of each.</p>
                <a href="/industries" className="btn btn-ghost btn-xs">Explore Industries</a>
              </div>
            </div>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Book A Consultation Now</a>
              <a href="/portfolio" className="btn btn-outline">View Portfolio</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE "APPROACH" THAT DEFINES US ──────────────────── */}
      <section className="section" aria-labelledby="approach-heading">
        <div className="container">
          <div className="text-center animate-in">
            <span className="section-label">Our Philosophy</span>
            <h2 id="approach-heading">The "Approach" That Defines Us</h2>
            <blockquote className="about-quote animate-in delay-1">
              <p>"In an ocean of lookalikes, those who stand apart will survive!"</p>
            </blockquote>
          </div>
          <div className="about-philosophy-body animate-in delay-2">
            <p>At Approach Media, no two brands are treated the same. Every exhibition stall we design begins with a deep understanding of who you are, who you are speaking to, and what you need them to feel, understand, or do in that space. We believe that exhibition design is not about making things look impressive — it is about making things work. A stall must communicate a clear message to the right audience and create an experience that is worth remembering long after the event ends.</p>
          </div>
          <div className="usp-grid">
            <div className="usp-card animate-in delay-1">
              <span className="usp-icon" aria-hidden="true">&#129528;</span>
              <h3>Thoughtful Personalisation</h3>
              <p>We begin every project by listening. Your brand identity, exhibition goals, audience profile, and budget all shape a design that is uniquely yours. No templates, no repeating formulas — each stall is built from the ground up with your specific brief in mind.</p>
            </div>
            <div className="usp-card animate-in delay-2">
              <span className="usp-icon" aria-hidden="true">&#127919;</span>
              <h3>Industry-Aware Thinking</h3>
              <p>Every industry communicates differently at exhibitions. A pharmaceutical brand needs to convey trust and clinical authority. A real estate developer needs to inspire aspiration. We bring sector-specific insight to every design decision, ensuring your stand speaks the right language to your audience.</p>
            </div>
            <div className="usp-card animate-in delay-3">
              <span className="usp-icon" aria-hidden="true">&#128161;</span>
              <h3>Clear, Effective Design</h3>
              <p>We design for outcomes. Every spatial choice, brand placement, interaction point, and material selection serves a defined purpose. The result is a stand that is not just visually compelling, but functionally effective in driving visitor engagement and brand recall.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: OUR PROCESS ─────────────────────────────────────── */}
      <section className="section process-section" aria-labelledby="process-heading">
        <div className="container">
          <div className="text-center animate-in">
            <span className="section-label">How We Work</span>
            <h2 id="process-heading">Our Process</h2>
            <p className="section-subtitle">We follow a structured, end-to-end process — from the initial conversation to post-event close — so that every project is delivered on time, on brief, and without surprises.</p>
          </div>
          <div className="process-steps">
            <div className="process-step animate-in delay-1">
              <span className="step-number">01</span>
              <h4>Understanding Your Brand &amp; Exhibition Goals</h4>
              <p>Every project begins with a detailed discovery conversation. We learn about your brand, your target audience at the exhibition, the context of the show, what you want visitors to feel and do, and the outcomes you are looking for. This brief becomes the foundation for every decision that follows — from layout to lighting to interaction design.</p>
            </div>
            <div className="process-step animate-in delay-2">
              <span className="step-number">02</span>
              <h4>Spatial Design &amp; 3D Concept Development</h4>
              <p>Our design team translates your brief into spatial concepts — exploring layout options, traffic flow, visual hierarchy, and brand placement. You receive detailed 3D renderings so you can see exactly how your stand will look and function before a single material is ordered. This is where ideas become a tangible vision.</p>
            </div>
            <div className="process-step animate-in delay-3">
              <span className="step-number">03</span>
              <h4>Engineering, Structural Detailing &amp; Material Specification</h4>
              <p>Once the design is approved, we move into technical documentation. Structural engineering drawings are prepared, materials and finishes are finalised, and all vendor specifications are locked in. This stage eliminates ambiguity and ensures a clean handover to the fabrication team.</p>
            </div>
            <div className="process-step animate-in delay-4">
              <span className="step-number">04</span>
              <h4>Fabrication &amp; Build</h4>
              <p>Our skilled craftsmen fabricate the stand in our own workshop, maintaining full quality control at every stage. Custom joinery, surface finishes, lighting rigs, graphic installations, and structural elements are all built and reviewed against the approved design — ensuring the output matches the vision exactly.</p>
            </div>
            <div className="process-step animate-in delay-1">
              <span className="step-number">05</span>
              <h4>Full-Scale Mock-Up &amp; Testing</h4>
              <p>Before any element leaves our warehouse, we assemble the entire stand at full scale. This complete mock-up replicates the exhibition setup — including AV, lighting, and all brand elements. Every structural joint, screen output, and graphic panel is tested and signed off. This step eliminates on-site surprises entirely.</p>
            </div>
            <div className="process-step animate-in delay-2">
              <span className="step-number">06</span>
              <h4>On-Site Execution, AV Setup &amp; Brand Dressing</h4>
              <p>Our on-site team manages full installation at the exhibition venue. Structural assembly, AV and technology integration, brand graphics dressing, and final finishing are all handled by our crew. We hand over a fully operational, exhibition-ready stand to your team — so you can focus entirely on your visitors.</p>
            </div>
            <div className="process-step animate-in delay-3">
              <span className="step-number">07</span>
              <h4>Post-Event Dismantling, Material Recovery &amp; Site Restoration</h4>
              <p>After the event concludes, our team returns to dismantle the stand in a structured, damage-free manner. All reusable structural elements and brand materials are inventoried, recovered, and stored. The booth space is fully restored to exhibition standards. A complete project close-out report is provided on completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: THE ENGINE THAT DRIVES US ───────────────────────── */}
      <section className="section" aria-labelledby="engine-heading">
        <div className="container">
          <div className="text-center animate-in">
            <span className="section-label">What Drives Us</span>
            <h2 id="engine-heading">The Engine That Drives Us</h2>
            <p className="section-subtitle">Our vision and mission shape every project we take on — from the smallest enquiry to the most complex international build.</p>
          </div>

          <div className="why-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '32px', margin: '56px 0' }}>
            <div className="usp-card animate-in delay-1">
              <span className="usp-icon" aria-hidden="true">&#128300;</span>
              <h3>Our Vision</h3>
              <p>To be the most trusted exhibition design and build partner for brands across India and globally — known for creating spaces that consistently deliver measurable impact, meaningful engagement, and lasting brand recall at every exhibition.</p>
            </div>
            <div className="usp-card animate-in delay-2">
              <span className="usp-icon" aria-hidden="true">&#127919;</span>
              <h3>Our Mission</h3>
              <p>To help brands stand apart in competitive exhibition environments by delivering custom, industry-aware, and purpose-driven exhibition spaces — on time, within budget, and to the highest standards of design and execution — every single time.</p>
            </div>
          </div>

          {/* Leadership Placeholder */}
          <div className="animate-in" style={{ margin: '56px 0' }}>
            <div className="text-center" style={{ marginBottom: '40px' }}>
              <span className="section-label">Our Leadership</span>
              <h3>The People Behind the Work</h3>
              <p className="section-subtitle" style={{ maxWidth: '560px', margin: '0 auto' }}>Two decades of expertise, shaped by hundreds of exhibitions and a relentless commitment to design that works.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '28px' }}>
              <div className="testimonial-card animate-in delay-1" style={{ textAlign: 'center', padding: '40px 32px' }}>
                <div className="testimonial-avatar" style={{ width: '72px', height: '72px', fontSize: '1.6rem', margin: '0 auto 20px' }}>L</div>
                <h4 style={{ marginBottom: '6px' }}>Leadership Name</h4>
                <p style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '16px' }}>Founder &amp; Director</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: '1.7' }}>Add leadership profile and bio here. Include years of experience, area of expertise, and what drives their approach to exhibition design and client partnership.</p>
              </div>
              <div className="testimonial-card animate-in delay-2" style={{ textAlign: 'center', padding: '40px 32px' }}>
                <div className="testimonial-avatar" style={{ width: '72px', height: '72px', fontSize: '1.6rem', margin: '0 auto 20px' }}>L</div>
                <h4 style={{ marginBottom: '6px' }}>Leadership Name</h4>
                <p style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '16px' }}>Creative Director</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: '1.7' }}>Add leadership profile and bio here. Include design philosophy, notable projects, and their role in shaping the creative direction of Approach Media's exhibition portfolio.</p>
              </div>
              <div className="testimonial-card animate-in delay-3" style={{ textAlign: 'center', padding: '40px 32px' }}>
                <div className="testimonial-avatar" style={{ width: '72px', height: '72px', fontSize: '1.6rem', margin: '0 auto 20px' }}>L</div>
                <h4 style={{ marginBottom: '6px' }}>Leadership Name</h4>
                <p style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '16px' }}>Head of Operations</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.93rem', lineHeight: '1.7' }}>Add leadership profile and bio here. Include operational expertise, how they manage the end-to-end delivery process, and their commitment to zero-surprise project execution.</p>
              </div>
            </div>
            <p className="google-embed-box animate-in" style={{ marginTop: '32px' }}><strong>&#128221; Designer Note:</strong> Replace the placeholder cards above with real team photos, names, roles, and biographical copy. A genuine leadership section builds significant trust with prospective clients.</p>
          </div>

          {/* Final CTA */}
          <div className="cta-section animate-in" style={{ borderRadius: '16px', marginTop: '16px' }} aria-labelledby="about-cta-heading">
            <div className="container">
              <h2 id="about-cta-heading">Have an exhibition coming up soon? We are here to help!</h2>
              <p className="cta-sub">Whether it is your first exhibition stall or your fiftieth, we bring the same rigour, creativity, and commitment to every project. Let's build something remarkable together.</p>
              <div className="cta-buttons">
                <a href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '18px 40px' }}>Book A Consultation Now</a>
                <a href="/portfolio" className="btn btn-outline" style={{ fontSize: '1rem', padding: '18px 40px' }}>View Our Portfolio</a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  )
}
