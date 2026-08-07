import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from './ContactForm'

// Local part only — "+91 " is prefixed for display and stripped for the tel: link.
const PHONE_NUMBERS = ['9426912602', '9898644327', '9427614395']

export const metadata: Metadata = {
  title: 'Contact Us | Approach Media — Exhibition Stall Design Agency',
  description: 'Get in touch with Approach Media for exhibition stall design and fabrication. Share your brief and our team will respond within 1 business day.',
  alternates: { canonical: 'https://approachmedia.in/contact' },
  openGraph: {
    title: 'Contact Us | Approach Media — Exhibition Stall Design Agency',
    description: 'Get in touch with Approach Media for exhibition stall design and fabrication. Share your brief and our team will respond within 1 business day.',
    url: 'https://approachmedia.in/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-b border-white/15 pb-20 pt-24 md:pb-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_20%,hsl(var(--brand-blue-glow)/0.18),transparent_55%)]" />
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.28em] text-brand-green">Get in touch</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            Let&apos;s design a space your{' '}
            <span className="text-gradient-brand">brand will be remembered for</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Have an upcoming show or a question for our team? Share a few details and we&apos;ll get back to you with the right next step.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FORM + SIDEBAR
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.5fr_1fr]">

          <ContactForm />

          {/* ── Sidebar ── */}
          <aside className="space-y-6">

            {/* Direct contact */}
            <div className="rounded-2xl border border-white/15 bg-surface/40 p-7">
              <h3 className="font-display text-lg font-semibold text-foreground">Direct contact</h3>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <a href="mailto:info@approachmedia.in" className="hover:text-foreground transition-colors">
                    info@approachmedia.in
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span className="flex flex-col gap-1.5">
                    {PHONE_NUMBERS.map(n => (
                      <a key={n} href={`tel:+91${n.replace(/\s/g, '')}`} className="hover:text-foreground transition-colors">
                        +91 {n}
                      </a>
                    ))}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <address className="not-italic leading-relaxed">
                    Approach Media Pvt. Ltd.<br />
                    302, 3rd Floor, Chase House, Sheetal Baug Society,<br />
                    Opp. Induben Khakhrawala, Off C. G. Road,<br />
                    Nr. Mithakhali Circle, Ahmedabad, Gujarat
                  </address>
                </li>
              </ul>
            </div>

            {/* What happens next */}
            <div className="rounded-2xl border border-white/15 bg-surface/40 p-7">
              <h3 className="font-display text-lg font-semibold text-foreground">What happens next</h3>
              <ol className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-semibold text-foreground">1.</span>{' '}
                  A project lead reviews your brief within 1 business day.
                </li>
                <li>
                  <span className="font-semibold text-foreground">2.</span>{' '}
                  30-minute discovery call to align on objectives, scope and timeline.
                </li>
                <li>
                  <span className="font-semibold text-foreground">3.</span>{' '}
                  Tailored proposal with concept direction, scope and indicative cost.
                </li>
              </ol>
            </div>

            {/* Tight deadline */}
            <div className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-7">
              <p className="font-display text-base font-semibold text-foreground">Tight deadline?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                For exhibitions in the next 6 weeks, mark your message &ldquo;URGENT&rdquo; and our team will prioritise the response.
              </p>
            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-white/15 bg-surface/40 p-7">
              <p className="font-display text-xl font-semibold text-foreground">
                23+ years. 6000+ stalls.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                From concept to on-site handover, a single team manages your entire exhibition build
                across India and 14+ countries.
              </p>
              <Link
                href="/portfolio"
                className="mt-4 inline-block text-sm font-medium text-brand-green hover:text-brand-green-glow transition-colors"
              >
                View our portfolio →
              </Link>
            </div>

          </aside>
        </div>
      </section>
    </>
  )
}
