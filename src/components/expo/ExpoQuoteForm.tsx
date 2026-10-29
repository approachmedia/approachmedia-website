'use client'

/**
 * The quote form on an expo page.
 *
 * It used to be markup only: a <form> with no action and no handler, inside a
 * server component that could not have given it one. Pressing "Request a
 * Quote" reloaded the page and dropped everything typed into it, and the page
 * carried a line reading "Form layout only, wire to your CRM or email service
 * when ready" where a visitor could read it. Eighty live expo pages shipped
 * that way.
 *
 * It now posts to /api/contact, the same endpoint the landing pages use, and
 * sends the same field names so the enquiry email prints the expo, the venue
 * and the stall size in their own rows. On success the visitor lands on
 * /thank-you, which is where conversion tracking fires, so these pages start
 * counting as leads like every other form on the site.
 *
 * The three prefilled fields stay readonly and are submitted, because which
 * show the enquiry came from is the useful part of it.
 */

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const FIELD = 'field-input'
const LABEL: React.CSSProperties = { marginBottom: '6px' }
const PAIR: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }
const READONLY: React.CSSProperties = { opacity: 0.7 }

/** India's ten digits, or anything with a country code. Mirrors the landing
 *  page form, which is the one that has been taking real enquiries. */
function normalisePhone(raw: string): string {
  const t = raw.replace(/[^\d+]/g, '')
  if (/^\+\d{10,15}$/.test(t)) return t
  const digits = t.replace(/\D/g, '')
  if (digits.length === 10) return `+91${digits}`
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`
  return ''
}

export default function ExpoQuoteForm({ expo, city, venue }: { expo: string; city: string; venue: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const payload: Record<string, string> = {}
    new FormData(e.currentTarget).forEach((v, k) => { payload[k] = v.toString() })

    if (payload.phone) {
      const phone = normalisePhone(payload.phone)
      if (!phone) {
        setError('Please enter a valid phone number: ten digits for India, or with a country code.')
        return
      }
      payload.phone = phone
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({})) as { ok?: boolean; error?: string }
      if (!res.ok || body.ok === false) throw new Error(body.error || 'Failed')

      const q = new URLSearchParams({ src: 'expo', show: expo })
      if (payload.stall_size) q.set('size', payload.stall_size)
      router.push(`/thank-you?${q.toString()}`)
    } catch (err) {
      setError(err instanceof Error && err.message !== 'Failed'
        ? err.message
        : 'Something went wrong sending your brief. Please call us, or email info@approachmedia.in.')
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="animate-in"
      style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '16px', padding: '32px', display: 'grid', gap: '18px', maxWidth: '760px' }}
    >
      <div style={PAIR}>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-name">Name</label>
          <input id="expo-name" name="name" type="text" required placeholder="Your name" className={FIELD} />
        </div>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-company">Company</label>
          <input id="expo-company" name="company" type="text" required placeholder="Company name" className={FIELD} />
        </div>
      </div>

      <div style={PAIR}>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-phone">Mobile</label>
          <input id="expo-phone" name="phone" type="tel" placeholder="+91 …" className={FIELD} />
        </div>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-email">Email</label>
          <input id="expo-email" name="email" type="email" required placeholder="you@company.com" className={FIELD} />
        </div>
      </div>

      <div style={PAIR}>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-show">Expo Name</label>
          <input id="expo-show" name="exhibition" type="text" defaultValue={expo} className={FIELD} readOnly style={READONLY} />
        </div>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-size">Booth Size (sqm)</label>
          <input id="expo-size" name="stall_size" type="text" placeholder="e.g. 36" className={FIELD} />
        </div>
      </div>

      <div style={PAIR}>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-city">City</label>
          <input id="expo-city" name="location" type="text" defaultValue={city} className={FIELD} readOnly style={READONLY} />
        </div>
        <div>
          <label className="field-label" style={LABEL} htmlFor="expo-venue">Venue</label>
          <input id="expo-venue" name="venue" type="text" defaultValue={venue} className={FIELD} readOnly style={READONLY} />
        </div>
      </div>

      <div>
        <label className="field-label" style={LABEL} htmlFor="expo-message">Message / Brief</label>
        <textarea id="expo-message" name="message" rows={4} placeholder="Tell us about your brand, design references, and any specific requirements…" className={FIELD} style={{ resize: 'vertical' }} />
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifySelf: 'start', opacity: loading ? 0.65 : 1 }}>
        {loading ? 'Sending…' : 'Request a Quote →'}
      </button>

      {error && <p role="alert" style={{ fontSize: '0.85rem', color: 'hsl(4 80% 68%)', margin: 0 }}>{error}</p>}
    </form>
  )
}
