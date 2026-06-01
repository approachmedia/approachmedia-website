export const metadata = {
  title: 'Contact Approach Media — Book a Consultation',
  description: 'Get in touch with Approach Media for exhibition stall design and fabrication. Share your brief — stall size, show name, and brand requirements — and we will respond within 72 hours.',
}

const DETAILS = [
  { label: 'Email',    value: 'info@approachmedia.in',  href: 'mailto:info@approachmedia.in' },
  { label: 'Phone',    value: '+91 98200 00000',        href: 'tel:+919820000000' },
  { label: 'Location', value: 'Mumbai, Maharashtra, India', href: null },
]

export default function ContactPage() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container text-center">
          <span className="section-label">Get in Touch</span>
          <h1>Let&apos;s Build Your Next <span className="highlight">Exhibition Stand</span></h1>
          <p className="section-subtitle">
            Share your exhibition brief — stall size, show name, city, and brand requirements.
            We&apos;ll send a tailored design concept within 72 hours.
          </p>
        </div>
      </section>

      {/* ── CONTACT GRID ─────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: '48px',
              alignItems: 'start',
            }}
            className="contact-grid"
          >
            {/* Form */}
            <form
              className="animate-in"
              style={{
                background: 'hsl(222 24% 9%)',
                border: '1px solid hsl(222 18% 18%)',
                borderRadius: '16px',
                padding: '32px',
                display: 'grid',
                gap: '18px',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Name</label>
                  <input type="text" placeholder="Your name" className="field-input" />
                </div>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Company</label>
                  <input type="text" placeholder="Company name" className="field-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Email</label>
                  <input type="email" placeholder="you@company.com" className="field-input" />
                </div>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Phone</label>
                  <input type="tel" placeholder="+91…" className="field-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Exhibition / Show</label>
                  <input type="text" placeholder="e.g. ACETECH 2026" className="field-input" />
                </div>
                <div>
                  <label className="field-label" style={{ marginBottom: '6px' }}>Stall Size (sqm)</label>
                  <input type="text" placeholder="e.g. 72" className="field-input" />
                </div>
              </div>

              <div>
                <label className="field-label" style={{ marginBottom: '6px' }}>Your Brief</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your brand objectives, footfall goals, and any specific requirements…"
                  className="field-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }}>
                Request a Proposal
              </button>
              <p style={{ fontSize: '0.8rem', color: 'hsl(220 10% 65%)' }}>
                This form is a layout placeholder — wire it to your CRM or email service when ready.
              </p>
            </form>

            {/* Details sidebar */}
            <aside className="animate-in delay-1" style={{ display: 'grid', gap: '20px' }}>
              <div
                style={{
                  background: 'hsl(222 24% 9%)',
                  border: '1px solid hsl(222 18% 18%)',
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                <span className="section-label">Reach Us</span>
                <ul style={{ display: 'grid', gap: '18px', marginTop: '8px' }}>
                  {DETAILS.map(d => (
                    <li key={d.label}>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(220 10% 65%)', marginBottom: '4px' }}>
                        {d.label}
                      </div>
                      {d.href ? (
                        <a href={d.href} style={{ color: 'hsl(0 0% 96%)', fontWeight: 600 }}>{d.value}</a>
                      ) : (
                        <span style={{ color: 'hsl(0 0% 96%)', fontWeight: 600 }}>{d.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, hsl(230 64% 52% / 0.12), hsl(110 55% 50% / 0.10))',
                  border: '1px solid hsl(222 18% 18%)',
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                <h4 style={{ marginBottom: '10px' }}>23+ years. 6000+ stalls.</h4>
                <p style={{ color: 'hsl(220 10% 65%)', fontSize: '0.95rem' }}>
                  From concept to on-site handover, a single team manages your entire exhibition build
                  across India and 14+ countries.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
