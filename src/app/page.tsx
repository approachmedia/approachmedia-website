export const metadata = {
  title: 'Approach Media — Exhibition Stall Design & Build Company India',
  description: "India's trusted exhibition stall design and build company. 23+ years, 6000+ stalls, 14+ countries.",
}

export default function HomePage() {
  return (
    <main>

      <section id="hero" className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-video-notice" aria-hidden="true">&#127916; Add Hero Video / Banner Image Here</div>
        <div className="hero-content">
          <span className="hero-rotating-text" id="rotating-text" aria-live="polite">In an ocean of lookalikes, those who stand apart will survive!</span>
          <h1 className="hero-h1" id="hero-heading">Exhibition Spaces That Make<br />Your Brand <span className="highlight">Impossible to Ignore</span></h1>
          <p className="hero-body">Your exhibition stall is more than a display. It is a space where your brand is experienced, understood, and remembered. We design and build exhibition spaces that attract the right audience, guide walk-in interactions, and turn attention into lasting impact.</p>
          <div className="hero-stats" aria-label="Key company statistics">
            <div className="stat-item"><span className="stat-number" data-count="23" data-suffix="+">23+</span><div className="stat-label">Years of Experience</div></div>
            <div className="stat-item"><span className="stat-number" data-count="6000" data-suffix="+">6000+</span><div className="stat-label">Stalls Executed</div></div>
            <div className="stat-item"><span className="stat-number" data-count="9" data-suffix="+">9+</span><div className="stat-label">Industries Served</div></div>
            <div className="stat-item"><span className="stat-number" data-count="14" data-suffix="+">14+</span><div className="stat-label">Countries Delivered</div></div>
          </div>
          <p className="hero-subtext">Know how you can stand out in your next exhibition.</p>
          <div className="hero-ctas">
            <a href="/contact" className="btn btn-primary">Book A Consultation Now</a>
            <a href="/portfolio" className="btn btn-outline">View Portfolio</a>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true"><div className="scroll-line"></div><span>Scroll</span></div>
      </section>

      <section id="clients" className="clients-section" aria-labelledby="clients-heading">
        <div className="container">
          <div className="clients-intro animate-in">
            <h2 id="clients-heading">Our Esteemed Clientele</h2>
            <p>We have successfully designed and built custom exhibition booths for trade shows and expos for clients from diverse industries. Clients know us for our custom designs, efficient execution and versatility. They trust and return to us for our consistency, timeliness and reliability.</p>
          </div>
          <div className="clients-track-wrapper">
            <div className="clients-track" aria-label="Scrolling client logos">
              <div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div>
              <div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div><div className="client-logo-item">Client Logo</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section section" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            <div className="about-text animate-in">
              <span className="section-label">About Approach Media</span>
              <h2 id="about-heading">Your Trusted Exhibition <span className="highlight">Stall Designers</span></h2>
              <span className="about-subhead">Designing exhibition spaces that attract, engage, and deliver impact.</span>
              <div className="about-block">
                <h4>What are we?</h4>
                <p>Approach Media is an exhibition stall design-and-build company delivering projects in India and internationally across diverse industries.</p>
                <p>We handle everything from concept and spatial design to fabrication and on-site execution so your team doesn't have to manage multiple vendors under tight timelines.</p>
                <p>Since 2002, we've combined design thinking, industry insight, and execution precision to create spaces that perform in high-competition environments.</p>
              </div>
              <div className="about-block">
                <h4>Where do we work?</h4>
                <p>We have a footprint in multiple countries including USA, Germany, France, Netherlands, Italy, UAE (Dubai), Spain, Nepal, Bangladesh, Singapore, China, Malaysia and Kenya. Across India, our stalls feature in key exhibitions in cities like Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Ahmedabad, Rajkot, Surat, Baroda, Punjab and Haryana.</p>
                <div className="about-inline-ctas">
                  <a href="/global" className="btn btn-ghost btn-xs">Indian Presence</a>
                  <a href="/global#international" className="btn btn-ghost btn-xs">International Presence</a>
                </div>
              </div>
              <div className="about-block">
                <h4>With whom do we work?</h4>
                <p>We work across a range of industries. We understand each industry has a unique goal and audience, and tailor the exhibition stall based on what matters most.</p>
                <div className="industry-tags">
                  <a href="/industries#real-estate" className="tag">Real Estate</a><a href="/industries#pharma" className="tag">Pharma</a><a href="/industries#manufacturing" className="tag">Manufacturing</a><a href="/industries#fmcg" className="tag">FMCG</a><a href="/industries#textile" className="tag">Textile</a><a href="/industries#technology" className="tag">Technology</a><a href="/industries#automotive" className="tag">Automotive</a><a href="/industries#healthcare" className="tag">Healthcare</a><a href="/industries#construction" className="tag">Construction</a>
                </div>
                <div style={{ marginTop: '18px' }}><a href="/industries" className="btn btn-ghost btn-xs">Explore by Industry</a></div>
              </div>
            </div>
            <div className="about-services-col animate-in delay-2">
              <span className="section-label">What do we do?</span>
              <p>We offer a range of tailor-made services for your brand including:</p>
              <div className="services-grid">
                <a href="/services/exhibition-stall-design" className="service-card"><span className="sc-icon">&#127912;</span><h4>Exhibition Stall Design</h4><p>Spatial design &amp; 3D concepts tailored to your brand</p></a>
                <a href="/services/custom-booth-fabrication" className="service-card"><span className="sc-icon">&#128295;</span><h4>Custom Booth Fabrication</h4><p>Precision-built structures to exact specifications</p></a>
                <a href="/services/turnkey-project-management" className="service-card"><span className="sc-icon">&#128273;</span><h4>Turnkey Project Management</h4><p>Single-team accountability, concept to handover</p></a>
                <a href="/services/av-technology-integration" className="service-card"><span className="sc-icon">&#128250;</span><h4>AV &amp; Technology Integration</h4><p>LED walls, interactive displays, digital experiences</p></a>
                <a href="/services/double-decker-mezzanine-stands" className="service-card"><span className="sc-icon">&#127959;</span><h4>Double Decker Stands</h4><p>Mezzanine-level stands that command attention</p></a>
                <a href="/services/immersive-brand-experience" className="service-card"><span className="sc-icon">&#10024;</span><h4>Immersive Brand Experience</h4><p>Environments that emotionally connect visitors to your brand</p></a>
              </div>
              <p className="about-services-note">Everything is planned, aligned and executed within defined timelines.</p>
            </div>
          </div>
          <div className="about-final-cta animate-in">
            <p>Whatever your requirements, wherever you are and whichever your industry, we are here to provide custom exhibition stall solutions that make you stand out.</p>
            <a href="/contact" className="btn btn-primary">Book A Consultation Now</a>
          </div>
        </div>
      </section>

      <section id="why-us" className="why-section section" aria-labelledby="why-heading">
        <div className="container">
          <div className="text-center animate-in">
            <span className="section-label">Why Choose Approach Media</span>
            <h2 id="why-heading">Thoughtfully Designed. <span className="highlight">Reliably Delivered.</span></h2>
            <p className="section-subtitle">Experience-oriented exhibition stalls, delivered with certainty.</p>
          </div>
          <div className="usp-grid">
            <div className="usp-card animate-in delay-1"><span className="usp-icon">&#127919;</span><h3>Industry-Aware Designing</h3><p>Every industry communicates differently — whether it's showcasing scale, building trust, or demonstrating capability. We design each space to help you communicate your message instantly. Every element, from layout to interaction, is intentional to ensure your brand is experienced and remembered.</p></div>
            <div className="usp-card animate-in delay-2"><span className="usp-icon">&#9881;&#65039;</span><h3>End-to-End Services</h3><p>From concept and design to fabrication, installation, and dismantling, every stage is managed by a single team. This eliminates coordination gaps, reduces delays, and ensures complete control over quality and delivery.</p></div>
            <div className="usp-card animate-in delay-3"><span className="usp-icon">&#127758;</span><h3>Service at International Standards</h3><p>With experience across global markets, we work in line with international build, safety, and execution standards. This ensures consistency in quality, compliance, and finish — regardless of where you exhibit.</p></div>
            <div className="usp-card animate-in delay-4"><span className="usp-icon">&#9889;</span><h3>Fast, Reliable Timelines</h3><p>A clearly defined process allows most projects to be completed within a two-month timeframe. Each stage is planned and reviewed in advance, ensuring timely delivery and a smooth, stress-free on-site experience for your team.</p></div>
          </div>
        </div>
      </section>

      <section id="approach" className="process-section section" aria-labelledby="process-heading">
        <div className="container">
          <div className="text-center animate-in">
            <span className="section-label">Our Approach</span>
            <h2 id="process-heading">A Clear Process. <span className="highlight">Zero Surprises.</span></h2>
            <p className="section-subtitle">A structured workflow so your team can fully focus on the event.</p>
          </div>
          <div className="process-steps">
            <div className="process-step animate-in delay-1"><span className="step-number">01</span><h4>Understanding Your Exhibition Goals</h4><p>A detailed brief covering your brand, audience, exhibition context, and key objectives.</p></div>
            <div className="process-step animate-in delay-2"><span className="step-number">02</span><h4>Spatial Design &amp; 3D Rendering</h4><p>Translating goals into spatial concepts and detailed 3D visualisations for your review.</p></div>
            <div className="process-step animate-in delay-3"><span className="step-number">03</span><h4>Engineering &amp; Detailing</h4><p>Technical drawings, structural engineering, and material specifications finalised.</p></div>
            <div className="process-step animate-in delay-4"><span className="step-number">04</span><h4>Fabrication &amp; Build</h4><p>Our skilled team builds the stand in our workshop to exacting quality standards.</p></div>
            <div className="process-step animate-in delay-1"><span className="step-number">05</span><h4>Full-Scale Mock-Up Testing</h4><p>Complete stand assembled and tested in our warehouse before dispatch.</p></div>
            <div className="process-step animate-in delay-2"><span className="step-number">06</span><h4>On-Site Execution &amp; Handover</h4><p>Complete on-site installation, AV setup, and brand dressing for a seamless handover.</p></div>
            <div className="process-step animate-in delay-3"><span className="step-number">07</span><h4>Post-Event Dismantling &amp; Wrap-Up</h4><p>Full dismantling, material recovery, and site restoration after the event concludes.</p></div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="portfolio-section section" aria-labelledby="portfolio-heading">
        <div className="container">
          <div className="portfolio-header">
            <div className="animate-in">
              <span className="section-label">Featured Projects</span>
              <h2 id="portfolio-heading">Spaces Built for <span className="highlight">Impact</span></h2>
              <p className="portfolio-header-desc">Award-winning designs, visitor engagement, and increased brand visibility across industries and exhibition formats.</p>
            </div>
            <a href="/portfolio" className="btn btn-ghost animate-in">View All Projects</a>
          </div>
          <div className="portfolio-cta-row animate-in"><a href="/portfolio" className="btn btn-primary">View Our Complete Portfolio</a></div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="text-center animate-in">
            <span className="section-label">Client Testimonials</span>
            <h2 id="testimonials-heading">What Our Clients Say</h2>
            <p className="section-subtitle">Our clients' words on their experience with Approach Media.</p>
          </div>
          <div className="testimonials-grid">
            <article className="testimonial-card animate-in delay-1"><div className="testimonial-stars" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote className="testimonial-text">"Approach Media transformed our exhibition presence. The stand they designed at ACETECH generated more walk-ins than we'd ever experienced. Their attention to detail and on-site execution was flawless."</blockquote><footer className="testimonial-author"><div className="testimonial-avatar">R</div><div><div className="testimonial-name">Rajiv Mehta</div><div className="testimonial-company">VP Marketing, Prestige Properties</div></div></footer></article>
            <article className="testimonial-card animate-in delay-2"><div className="testimonial-stars" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote className="testimonial-text">"We've worked with Approach Media across three international exhibitions now. Their understanding of brand communication in exhibition spaces is unmatched. They deliver on time, every time."</blockquote><footer className="testimonial-author"><div className="testimonial-avatar">P</div><div><div className="testimonial-name">Priya Nair</div><div className="testimonial-company">Brand Head, Global Pharma Corp</div></div></footer></article>
            <article className="testimonial-card animate-in delay-3"><div className="testimonial-stars" aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote className="testimonial-text">"The full mock-up process gave us complete confidence before the event. No surprises on-site. The double-decker stand became the landmark of the show floor. Exceptional work by the entire team."</blockquote><footer className="testimonial-author"><div className="testimonial-avatar">A</div><div><div className="testimonial-name">Amit Shah</div><div className="testimonial-company">CEO, AutoDrive Motors</div></div></footer></article>
          </div>
          <div className="google-embed-box animate-in"><strong>&#128205; Designer Note:</strong> Embed your Google Business Reviews widget here. Live reviews significantly improve trust signals and local SEO credibility.</div>
        </div>
      </section>

      <section id="upcoming-exhibitions" className="exhibitions-section section" aria-labelledby="exhibitions-heading">
        <div className="container">
          <div className="animate-in">
            <span className="exhibitions-eyebrow">Planning to exhibit in 2026? Start early to secure design and execution timelines.</span>
            <span className="section-label">Exhibitions Calendar</span>
            <h2 id="exhibitions-heading">Upcoming Exhibitions &amp; Events Timeline</h2>
            <p style={{ color: 'var(--muted)', marginTop: '12px', maxWidth: '580px', lineHeight: '1.8' }}>We actively work across India's major trade shows and global expos. Connect with us early to lock in your design and fabrication slot.</p>
          </div>
          <div className="exhibitions-timeline" id="exhibitions-timeline" aria-label="Upcoming exhibition events">
            {[
              { month: 'JUN', day: '12', year: '2026', name: 'ACETECH Mumbai 2026',   venue: 'Bombay Exhibition Centre · Mumbai, India', industry: 'Architecture & Construction' },
              { month: 'JUL', day: '18', year: '2026', name: 'India Wood Expo 2026',   venue: 'BIEC · Bangalore, India',                  industry: 'Wood & Furniture' },
              { month: 'SEP', day: '08', year: '2026', name: 'Bharat Tex 2026',        venue: 'Bharat Mandapam · Delhi, India',           industry: 'Textile' },
              { month: 'OCT', day: '14', year: '2026', name: 'Stona Expo 2026',        venue: 'BIEC · Bangalore, India',                  industry: 'Stone & Building Materials' },
              { month: 'FEB', day: '11', year: '2027', name: 'India Energy Week 2027', venue: 'Goa Convention Centre · Goa, India',        industry: 'Energy' },
            ].map(e => (
              <div className="exhibition-item animate-in" key={e.name}>
                <div className="exhibition-date">
                  <div className="ex-month">{e.month}</div>
                  <div className="ex-day">{e.day}</div>
                  <div className="ex-year">{e.year}</div>
                </div>
                <div className="exhibition-details">
                  <h4>{e.name}</h4>
                  <p>{e.venue}</p>
                </div>
                <div className="exhibition-meta">
                  <span className="ex-industry">{e.industry}</span>
                  <a href="/contact" className="ex-cta">Plan Your Stand →</a>
                </div>
              </div>
            ))}
          </div>
          <div className="exhibitions-all-cta animate-in"><a href="/exhibitions" className="btn btn-ghost">View All Upcoming Exhibitions</a></div>
        </div>
      </section>

      <section id="cta" className="cta-section" aria-labelledby="cta-heading">
        <div className="container">
          <h2 id="cta-heading">Start Building Your Exhibition Experience Today</h2>
          <p className="cta-sub">Whether you're showcasing, launching, or expanding — your space defines how your brand is experienced and how your clients remember you.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary" style={{ fontSize: '1rem', padding: '18px 40px' }}>Request a Proposal</a>
            <a href="/portfolio" className="btn btn-outline" style={{ fontSize: '1rem', padding: '18px 40px' }}>View Our Portfolio</a>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="text-center animate-in" style={{ marginBottom: '56px' }}>
            <span className="section-label">Frequently Asked Questions</span>
            <h2 id="faq-heading">Common Questions Answered</h2>
          </div>
          <div className="faq-list" role="list">
            <div className="faq-item"><button className="faq-question" aria-expanded="false">Do you handle the entire project?<span className="faq-icon">+</span></button><div className="faq-answer"><p>Yes. From design and fabrication to installation and dismantling, everything is managed end-to-end by our team. You deal with one point of contact throughout the entire project.</p></div></div>
            <div className="faq-item"><button className="faq-question" aria-expanded="false">What is the typical cost of an exhibition stall?<span className="faq-icon">+</span></button><div className="faq-answer"><p>Costs vary based on size, design complexity, and location. We work with brands looking for high-impact, custom-built exhibition spaces. Contact us with your requirements for a tailored quote.</p></div></div>
            <div className="faq-item"><button className="faq-question" aria-expanded="false">Can you work within a defined budget?<span className="faq-icon">+</span></button><div className="faq-answer"><p>Yes. We align design, materials, and execution to your budget while maintaining quality and brand intent. Our team will advise on the best approach for your requirements and investment level.</p></div></div>
            <div className="faq-item"><button className="faq-question" aria-expanded="false">How long does a project take?<span className="faq-icon">+</span></button><div className="faq-answer"><p>Most projects are completed within a two-month timeline, depending on scale and complexity. We recommend engaging us as early as possible — especially for large custom builds or international exhibitions.</p></div></div>
            <div className="faq-item"><button className="faq-question" aria-expanded="false">How do you ensure there are no on-site issues?<span className="faq-icon">+</span></button><div className="faq-answer"><p>We build and test a full-scale mock-up in our warehouse, replicating the exhibition setup to eliminate surprises. Every element is checked for structural integrity, finish quality, and functionality before dispatch.</p></div></div>
            <div className="faq-item"><button className="faq-question" aria-expanded="false">Do you customise designs for different industries?<span className="faq-icon">+</span></button><div className="faq-answer"><p>Absolutely. Each space is tailored to your industry, target audience, and exhibition goals. A pharma stand communicates very differently from an automotive one — we understand these distinctions deeply and design accordingly.</p></div></div>
            <div className="faq-item"><button className="faq-question" aria-expanded="false">Do you execute projects internationally?<span className="faq-icon">+</span></button><div className="faq-answer"><p>Yes. We work across global markets including USA, Germany, UAE, France, Netherlands, Italy, Spain, Singapore, and more — adhering to international standards for quality, safety, and build compliance.</p></div></div>
            <div className="faq-item"><button className="faq-question" aria-expanded="false">How do we get started?<span className="faq-icon">+</span></button><div className="faq-answer"><p>Share your exhibition details with us — the event, location, stand size, and objectives — and we'll guide you through every step from concept to execution. <a href="/contact">Request a proposal here &rarr;</a></p></div></div>
          </div>
        </div>
      </section>

    </main>
  )
}
