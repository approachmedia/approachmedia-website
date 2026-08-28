'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, CheckCircle2, Paperclip, X } from 'lucide-react'
import {
  ATTACHMENT_ACCEPT,
  ATTACHMENT_MAX_BYTES,
  ATTACHMENT_TYPES,
  HONEYPOT_FIELD,
  TIMESTAMP_FIELD,
  type AttachmentPayload,
} from '@/lib/form-fields'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

// ── Options ───────────────────────────────────────────────

const SERVICES = [
  'Exhibition Stall Design',
  'Custom Booth Fabrication',
  'Turnkey Project Management',
  'Audio-Visual & Technology Integration',
  'Double Decker / Mezzanine Stands',
  'Immersive Brand Experience Design',
  'Not sure yet',
]

/**
 * How many sides of the stand are open to the aisle — a corner, an end, an
 * island. It changes the design before anything else does, which is why it
 * sits next to the size rather than in the message.
 *
 * "Island" rather than the "Iland" it was asked for: that is the spelling
 * used everywhere else on this site, including the stall-type names on the
 * portfolio, and it should not read differently on the enquiry form.
 */
const OPEN_SIDES = [
  'One Side Open',
  'Two Side Open',
  'Three Side Open',
  'Island Stall',
]

const BUDGETS = [
  'Under ₹10L', '₹10L – ₹25L', '₹25L – ₹50L', '₹50L – ₹1Cr', '₹1Cr+',
]

// ── Sub-components ───────────────────────────────────────

function Field({
  label, name, type = 'text', required, placeholder,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">
        {label}{required && <span className="text-brand-green"> *</span>}
      </Label>
      <Input id={name} name={name} type={type} required={required} placeholder={placeholder} className="mt-2" />
    </div>
  )
}

function SelectField({
  label, name, options, onValueChange,
}: {
  label: string; name: string; options: string[]; onValueChange?: (v: string) => void
}) {
  return (
    <div>
      <Label htmlFor={name} className="text-sm">{label}</Label>
      <Select name={name} onValueChange={onValueChange}>
        {/* id, so the Label above actually points at something. Radix puts
            the name on a hidden native select for the form data and leaves
            the trigger without one, so htmlFor had nothing to bind to. */}
        <SelectTrigger id={name} className="mt-2"><SelectValue placeholder="Select…" /></SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}

// ── Floor-plan attachment ────────────────────────────────

/** MB reads as "0.0 MB" for anything small, which looks like a failed read. */
function fileSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/**
 * An optional file, kept in React state rather than posted as part of the
 * FormData. The submit handler flattens every FormData entry with
 * `.toString()`, and a File stringifies to "[object File]" — so the input is
 * deliberately nameless and the file is added to the payload by hand.
 */
function FloorPlanField({
  file, error, onPick, onClear,
}: {
  file:    File | null
  error:   string
  onPick:  (f: File | null) => void
  onClear: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      {/* A span, not a Label. The drop zone below is itself a <label for>, so
          a second one pointing at the same input would give it two competing
          associations; the input carries its own aria-label instead, which
          also covers the attached state where the drop zone is gone. */}
      <span className="block text-sm font-medium leading-none">
        Floor plan <span className="text-muted-foreground">(optional)</span>
      </span>

      {file ? (
        <div className="mt-2 flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm">
          <Paperclip className="h-3.5 w-3.5 shrink-0 text-brand-green" />
          <span className="flex-1 truncate text-foreground" title={file.name}>{file.name}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{fileSize(file.size)}</span>
          <button
            type="button"
            onClick={() => {
              onClear()
              // The input keeps its value after a clear, so picking the same
              // file again would not fire change.
              if (inputRef.current) inputRef.current.value = ''
            }}
            aria-label="Remove the attached floor plan"
            className="shrink-0 rounded p-0.5 text-muted-foreground transition-colors hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="floor_plan"
          className="mt-2 flex h-10 cursor-pointer items-center gap-2 rounded-md border border-dashed border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-brand-green/60 hover:text-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
        >
          <Paperclip className="h-3.5 w-3.5 shrink-0" />
          Attach the organiser&apos;s floor plan
        </label>
      )}

      <input
        ref={inputRef}
        id="floor_plan"
        type="file"
        accept={ATTACHMENT_ACCEPT}
        aria-label="Floor plan (optional)"
        aria-describedby="floor_plan_hint"
        onChange={e => onPick(e.target.files?.[0] ?? null)}
        className="sr-only"
      />

      <p
        id="floor_plan_hint"
        role={error ? 'alert' : undefined}
        className={`mt-1.5 text-xs ${error ? 'text-red-400' : 'text-muted-foreground'}`}
      >
        {error || `PDF or image, up to ${ATTACHMENT_MAX_BYTES / 1024 / 1024} MB.`}
      </p>
    </div>
  )
}

/** Read a file as bare base64 — Resend takes the content without the data: prefix. */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result)
      resolve(result.slice(result.indexOf(',') + 1))
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

// ── Main form ─────────────────────────────────────────────

export function ContactForm({ isProposal = false }: { isProposal?: boolean }) {
  const [loading, setLoading]       = useState(false)
  const [success, setSuccess]       = useState(false)
  const [error,   setError]         = useState('')
  const [plan,    setPlan]          = useState<File | null>(null)
  const [planError, setPlanError]   = useState('')
  const renderedAt                  = useRef<HTMLInputElement>(null)

  // Checked here as well as in the route. The route is the one that counts —
  // this only saves the visitor from uploading 40 MB before being told.
  function pickPlan(file: File | null) {
    if (!file) { setPlan(null); setPlanError(''); return }
    if (file.size > ATTACHMENT_MAX_BYTES) {
      setPlan(null)
      setPlanError(`That file is ${fileSize(file.size)} — the limit is ${ATTACHMENT_MAX_BYTES / 1024 / 1024} MB.`)
      return
    }
    if (!(ATTACHMENT_TYPES as readonly string[]).includes(file.type)) {
      setPlan(null)
      setPlanError('Attach a PDF or an image. For anything else, email it to info@approachmedia.in.')
      return
    }
    setPlan(file)
    setPlanError('')
  }

  // Stamped after mount, not in the JSX: this page is prerendered, so a value
  // written into the markup would be the build time — the same for every
  // visitor, and no measure of how long anyone took to fill the form.
  useEffect(() => {
    if (renderedAt.current) renderedAt.current.value = String(Date.now())
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, unknown> = {}
    formData.forEach((v, k) => { payload[k] = v.toString() })

    try {
      if (plan) {
        const attachment: AttachmentPayload = {
          filename: plan.name,
          mimeType: plan.type,
          data:     await toBase64(plan),
        }
        payload.floor_plan = attachment
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = await res.json().catch(() => ({})) as { error?: string }
      if (!res.ok) throw new Error(body.error || 'Failed')
      setSuccess(true)
      form.reset()
      setPlan(null)
      setPlanError('')
    } catch (err) {
      // The route reports genuine validation problems — a mistyped address,
      // a missing required field — so show those rather than burying them
      // under the generic failure message.
      setError(
        err instanceof Error && err.message !== 'Failed'
          ? err.message
          : 'Something went wrong — please email us directly at info@approachmedia.in',
      )
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/15 bg-surface/40 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/10">
          <CheckCircle2 className="h-8 w-8 text-brand-green" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-semibold text-foreground">Thank you — we&apos;ve received your request.</h3>
          <p className="mt-3 text-muted-foreground">
            Our team will review your brief and get back to you within <strong className="text-foreground">1 business day</strong> with next steps.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            For urgent enquiries, WhatsApp or call us directly.
          </p>
        </div>
        <Button variant="outlineBrand" onClick={() => setSuccess(false)}>Submit another enquiry</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/15 bg-surface/40 p-6 md:p-10">
      {/* Bot trap. Positioned off-screen rather than display:none, which some
          form-fillers know to skip, and kept out of the tab order and the
          accessibility tree so nobody using a keyboard or a screen reader can
          land in it. A value here means the sender was not a person. */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Company website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input ref={renderedAt} type="hidden" name={TIMESTAMP_FIELD} />

      {/* ── Contact info ── */}
      <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Contact information</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <Field label="Full name"                 name="name"     required placeholder="Your name" />
        <Field label="Company"                   name="company"  required placeholder="Company name" />
        <Field label="Work email"                name="email"    type="email" required placeholder="you@company.com" />
        <Field label="Phone (with country code)" name="phone"    placeholder="+91 98000 00000" />
      </div>

      {/* ── Exhibition details ── */}
      <p className="mt-8 text-xs uppercase tracking-[0.22em] text-brand-green">Exhibition details</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <Field label="Exhibition / event name" name="exhibition" placeholder="e.g. ACETECH 2026" />
        <Field label="Venue"                   name="venue"      placeholder="e.g. Bombay Exhibition Centre" />
        <Field label="Event city / country"    name="location"   placeholder="e.g. Mumbai, India" />
        <div>
          <Label htmlFor="event_date" className="text-sm">Event date <span className="text-muted-foreground">(optional)</span></Label>
          <Input id="event_date" name="event_date" type="date" className="mt-2" />
        </div>
        {/* Stall and hall are what the organiser allocates, so they belong
            with the exhibition rather than with the project brief. */}
        <Field label="Stall no." name="stall_no" placeholder="e.g. B-14" />
        <Field label="Hall no."  name="hall_no"  placeholder="e.g. Hall 5" />
      </div>

      {/* ── Project details ── */}
      <p className="mt-8 text-xs uppercase tracking-[0.22em] text-brand-green">Project details</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <SelectField label="Service of interest" name="service" options={SERVICES} />

        {/* Typed rather than picked. The bracketed list could not express a
            real allocation — 6m x 6m went in as "36 sqm", and anything not on
            the list went in as "Other", so the one number the brief actually
            turns on arrived rounded or missing. */}
        <Field label="Stall size" name="stall_size" placeholder="e.g. 6m x 6m" />

        <SelectField label="Open sides" name="open_sides" options={OPEN_SIDES} />

        <SelectField label="Indicative budget" name="budget" options={BUDGETS} />

        <FloorPlanField
          file={plan}
          error={planError}
          onPick={pickPlan}
          onClear={() => { setPlan(null); setPlanError('') }}
        />
      </div>

      {/* ── Message ── */}
      <div className="mt-5">
        <Label htmlFor="message" className="text-sm">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about the brand, audience, objectives and anything specific you want the stall to achieve…"
          className="mt-2"
        />
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
      )}

      <Button type="submit" variant="hero" size="lg" className="mt-7 w-full md:w-auto" disabled={loading}>
        {loading ? 'Sending…' : isProposal ? 'Send Proposal Request' : 'Send Enquiry'}
        <Send className="h-4 w-4" />
      </Button>
      <p className="mt-4 text-xs text-muted-foreground">
        We respond to all enquiries within 1 business day. Your information stays private and is never shared.
      </p>
    </form>
  )
}
