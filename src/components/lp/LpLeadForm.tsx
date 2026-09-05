'use client'

/**
 * The five-field lead form. Spec §3.
 *
 * Posts to the SAME /api/contact route the contact page uses, with the
 * attribution fields added as hidden inputs. The route was extended, not
 * forked: it accepts a phone in place of an email for landing-page leads
 * and prints the attribution in the notification email.
 *
 * Spam protection is the site's own: the honeypot and the render timestamp
 * that the route already checks, plus its per-IP rate limit.
 */

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from '@/lib/form-fields'
import { SHOW_SUGGESTIONS, STALL_SIZES, LP_PHONE_DISPLAY, type LpService } from '@/content/lp/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLpParams } from './lp-params'
import { track } from './lp-tracking'
import { TelLink, WaLink } from './LpLinks'

/**
 * India first: a bare 10-digit number is +91. Anything else must be a
 * plausible international number with a country code. Returns E.164 or null.
 */
export function normalisePhone(raw: string): string | null {
  const s = raw.replace(/[\s\-().]/g, '')
  if (/^[6-9]\d{9}$/.test(s)) return `+91${s}`
  if (/^0[6-9]\d{9}$/.test(s)) return `+91${s.slice(1)}`
  if (/^(\+91|91)[6-9]\d{9}$/.test(s)) return `+91${s.slice(-10)}`
  if (/^\+[1-9]\d{7,14}$/.test(s)) return s
  return null
}

export default function LpLeadForm({
  service, title, sub, button, consent,
}: {
  service: LpService; title: string; sub: string; button: string; consent: string
}) {
  const router = useRouter()
  const p = useLpParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [started, setStarted] = useState(false)
  const [renderedAt, setRenderedAt] = useState('')
  const [show, setShow] = useState('')
  const [size, setSize] = useState('')
  const showTouched = useRef(false)

  useEffect(() => { setRenderedAt(String(Date.now())) }, [])
  // Prefill from ?show= / ?size= unless the visitor has already typed.
  useEffect(() => { if (!showTouched.current && p.show) setShow(p.show) }, [p.show])
  useEffect(() => { if (p.size && !size) setSize(p.size) }, [p.size, size])

  function onStart() {
    if (started) return
    setStarted(true)
    track('lead_form_start', { service })
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload: Record<string, string> = {}
    fd.forEach((v, k) => { payload[k] = v.toString() })

    const phone = normalisePhone(payload.phone || '')
    if (!phone) {
      setError('Please enter a valid phone number (10 digits for India, or with country code).')
      return
    }
    payload.phone = phone

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({})) as { ok?: boolean; error?: string }
      if (!res.ok || body.ok === false) throw new Error(body.error || 'Failed')

      track('lead_form_submit', { service, show: payload.exhibition || '', stall_size: payload.stall_size || '', gclid: p.gclid || '' })
      const q = new URLSearchParams({ src: 'lp', service })
      if (payload.exhibition) q.set('show', payload.exhibition)
      if (payload.stall_size) q.set('size', payload.stall_size)
      router.push(`/thank-you?${q.toString()}`)
    } catch (err) {
      setError(err instanceof Error && err.message !== 'Failed' ? err.message : 'Something went wrong sending your brief.')
      setLoading(false)
    }
  }

  return (
    <div id="lp-form" className="scroll-mt-20 rounded-2xl border border-white/12 bg-[hsl(222,28%,9%)]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur md:p-7">
      <h2 className="font-display text-xl font-bold text-white md:text-2xl">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{sub}</p>

      <form onSubmit={onSubmit} onFocusCapture={onStart} className="mt-5 space-y-4" noValidate>
        {/* Spam fields the route already checks. */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={HONEYPOT_FIELD}>Company website</label>
          <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name={TIMESTAMP_FIELD} value={renderedAt} />

        {/* Attribution, for the email and any later CRM import. */}
        <input type="hidden" name="service" value={service} />
        <input type="hidden" name="source" value="google-ads-lp" />
        <input type="hidden" name="landing_path" value={p.landing_path} />
        <input type="hidden" name="gclid" value={p.gclid} />
        <input type="hidden" name="utm_source" value={p.utm_source} />
        <input type="hidden" name="utm_medium" value={p.utm_medium} />
        <input type="hidden" name="utm_campaign" value={p.utm_campaign} />
        <input type="hidden" name="utm_term" value={p.utm_term} />
        <input type="hidden" name="utm_content" value={p.utm_content} />
        <input type="hidden" name="show_param" value={p.show} />
        <input type="hidden" name="referrer" value={p.referrer} />
        <input type="hidden" name="page_variant" value={p.v} />

        <div>
          <Label htmlFor="lp-name" className="text-sm">Name <span className="text-brand-green">*</span></Label>
          <Input id="lp-name" name="name" required autoComplete="name" className="mt-1.5 h-12 text-base" />
        </div>
        <div>
          <Label htmlFor="lp-phone" className="text-sm">Phone / WhatsApp <span className="text-brand-green">*</span></Label>
          <Input id="lp-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+91 98000 00000" className="mt-1.5 h-12 text-base" />
        </div>
        <div>
          <Label htmlFor="lp-company" className="text-sm">Company <span className="text-brand-green">*</span></Label>
          <Input id="lp-company" name="company" required autoComplete="organization" className="mt-1.5 h-12 text-base" />
        </div>
        <div>
          <Label htmlFor="lp-show" className="text-sm">Exhibition / show</Label>
          <Input
            id="lp-show" name="exhibition" list="lp-shows" value={show}
            onChange={e => { showTouched.current = true; setShow(e.target.value) }}
            placeholder="e.g. REI Expo 2026" className="mt-1.5 h-12 text-base"
          />
          <datalist id="lp-shows">
            {SHOW_SUGGESTIONS.map(s => <option key={s} value={s} />)}
          </datalist>
        </div>
        <div>
          <Label htmlFor="lp-size" className="text-sm">Stall size</Label>
          <select
            id="lp-size" name="stall_size" value={size} onChange={e => setSize(e.target.value)}
            className="mt-1.5 flex h-12 w-full rounded-md border border-input bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select…</option>
            {STALL_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {error && (
          <div role="alert" className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
            <div className="mt-1 text-xs text-muted-foreground">
              Or reach us directly: <TelLink placement="hero" className="underline">{LP_PHONE_DISPLAY}</TelLink> · <WaLink placement="hero" show={show} size={size} className="underline">WhatsApp</WaLink>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-brand)] px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {loading ? 'Sending…' : button}
        </button>

        <p className="text-[11px] leading-relaxed text-muted-foreground/80">{consent}</p>
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Prefer to talk? Call <TelLink placement="hero" className="font-semibold text-foreground underline underline-offset-2">{LP_PHONE_DISPLAY}</TelLink> or <WaLink placement="hero" show={show} size={size} className="font-semibold text-foreground underline underline-offset-2">WhatsApp us</WaLink>.
      </p>
    </div>
  )
}
