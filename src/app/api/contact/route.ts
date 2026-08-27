import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkSubmission, escapeHtml, turnstileOk } from '@/lib/spam'
import { readAttachment } from '@/lib/attachment'

const TO   = 'info@approachmedia.in'
const FROM = 'Approach Media Website <noreply@approachmedia.in>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Cap on any single value, so one field cannot carry a wall of text. */
const MAX_FIELD = 2_000

function subjectSafe(value: string | undefined) {
  return (value || 'Unknown').replace(/[\r\n]+/g, ' ').slice(0, 120)
}

function row(label: string, value: string | undefined) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:8px 12px;color:#9ca3af;font-size:13px;width:180px;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#f9fafb;font-size:13px;vertical-align:top">${escapeHtml(value)}</td>
    </tr>`
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json() as Record<string, unknown>

    // Coerce and bound every value before anything else looks at it.
    const d: Record<string, string> = {}
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === 'string') d[k] = v.slice(0, MAX_FIELD).trim()
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    // Bots are answered with success. An error tells them the shape of the
    // filter and invites a retry with different values; a 200 does not.
    const verdict = checkSubmission(d, ip)
    if (verdict.spam) {
      console.warn(`[contact] dropped submission from ${ip} — ${verdict.reason}`)
      return NextResponse.json({ ok: true })
    }

    if (!(await turnstileOk(d['cf-turnstile-response']))) {
      console.warn(`[contact] dropped submission from ${ip} — Turnstile rejected`)
      return NextResponse.json({ ok: true })
    }

    // Genuine validation errors are reported, so a real person who mistypes
    // an address is told about it rather than silently ignored.
    if (!d.name || !d.company || !d.email) {
      return NextResponse.json({ ok: false, error: 'Name, company and email are required.' }, { status: 400 })
    }
    if (!EMAIL_RE.test(d.email)) {
      return NextResponse.json({ ok: false, error: 'That email address does not look right.' }, { status: 400 })
    }

    // Stall size is typed now. The fallback is for a page still open in
    // somebody's browser from before the change, which would post the old
    // "Other" plus a separate custom value.
    const finalSize = d.stall_size === 'Other' ? (d.stall_size_custom || 'Other') : d.stall_size

    // Read after the spam checks, so a dropped submission never costs the
    // base64 decode of a 10 MB file.
    const attachment = readAttachment(raw.floor_plan)

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0f1117;font-family:Inter,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#151822;border:1px solid #ffffff26;border-radius:16px;overflow:hidden">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a3a8f22,#16a34a22);padding:28px 32px;border-bottom:1px solid #ffffff26">
            <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:#4ade80">New Enquiry</p>
            <h1 style="margin:6px 0 0;font-size:22px;color:#f9fafb">Exhibition Enquiry — ${escapeHtml(d.name)}</h1>
            <p style="margin:4px 0 0;font-size:13px;color:#9ca3af">${escapeHtml(d.company || '')}</p>
          </td>
        </tr>

        <!-- Contact -->
        <tr><td style="padding:24px 32px 0">
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#4ade80">Contact</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;border:1px solid #ffffff1a;border-radius:8px">
            <tbody>
              ${row('Full Name',  d.name)}
              ${row('Company',    d.company)}
              ${row('Email',      d.email)}
              ${row('Phone',      d.phone)}
            </tbody>
          </table>
        </td></tr>

        <!-- Exhibition -->
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#4ade80">Exhibition Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;border:1px solid #ffffff1a;border-radius:8px">
            <tbody>
              ${row('Exhibition Name', d.exhibition)}
              ${row('Venue',           d.venue)}
              ${row('Event Date',      d.event_date)}
              ${row('City / Country',  d.location)}
              ${row('Stall No.',       d.stall_no)}
              ${row('Hall No.',        d.hall_no)}
            </tbody>
          </table>
        </td></tr>

        <!-- Project -->
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#4ade80">Project Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;border:1px solid #ffffff1a;border-radius:8px">
            <tbody>
              ${row('Service',    d.service)}
              ${row('Stall Size', finalSize)}
              ${row('Open Sides', d.open_sides)}
              ${row('Budget',     d.budget)}
              ${row('Floor Plan', attachment ? `${attachment.filename} — attached to this email` : undefined)}
            </tbody>
          </table>
        </td></tr>

        <!-- Message -->
        ${d.message ? `
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#4ade80">Message</p>
          <div style="background:#0f1117;border:1px solid #ffffff1a;border-radius:8px;padding:14px 16px;font-size:13px;color:#d1d5db;line-height:1.7">${escapeHtml(d.message).replace(/\n/g, '<br>')}</div>
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="padding:24px 32px;border-top:1px solid #ffffff1a;margin-top:24px">
          <p style="margin:0;font-size:12px;color:#6b7280">Sent from approachmedia.in contact form · Reply directly to this email to respond to ${escapeHtml(d.name)}.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    // Built here rather than at the top of the handler: the constructor
    // throws when RESEND_API_KEY is absent, and a dropped spam submission
    // should never need the mail client at all.
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: FROM,
      to:   TO,
      replyTo: d.email,
      // Newlines stripped: a subject is a mail header, and a header that can
      // carry a line break can carry a second header.
      subject: `Exhibition Enquiry — ${subjectSafe(d.name)} · ${subjectSafe(d.exhibition || d.company)}`,
      html,
      ...(attachment ? { attachments: [attachment] } : {}),
    })

    if (error) {
      console.error('Resend error', error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact route error', err)
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
