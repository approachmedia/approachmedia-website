import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO   = 'info@approachmedia.in'
const FROM = 'Approach Media Website <noreply@approachmedia.in>'

function row(label: string, value: string | undefined) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:8px 12px;color:#9ca3af;font-size:13px;width:180px;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#f9fafb;font-size:13px;vertical-align:top">${value}</td>
    </tr>`
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const d = await req.json() as Record<string, string>

    const finalSize = d.stall_size === 'Other' ? (d.stall_size_custom || 'Other') : d.stall_size

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
            <h1 style="margin:6px 0 0;font-size:22px;color:#f9fafb">Exhibition Enquiry — ${d.name || '—'}</h1>
            <p style="margin:4px 0 0;font-size:13px;color:#9ca3af">${d.company || ''}</p>
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
              ${row('Budget',     d.budget)}
            </tbody>
          </table>
        </td></tr>

        <!-- Message -->
        ${d.message ? `
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#4ade80">Message</p>
          <div style="background:#0f1117;border:1px solid #ffffff1a;border-radius:8px;padding:14px 16px;font-size:13px;color:#d1d5db;line-height:1.7">${d.message.replace(/\n/g, '<br>')}</div>
        </td></tr>` : ''}

        <!-- Footer -->
        <tr><td style="padding:24px 32px;border-top:1px solid #ffffff1a;margin-top:24px">
          <p style="margin:0;font-size:12px;color:#6b7280">Sent from approachmedia.in contact form · Reply directly to this email to respond to ${d.name || 'the enquirer'}.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

    const { error } = await resend.emails.send({
      from: FROM,
      to:   TO,
      replyTo: d.email,
      subject: `Exhibition Enquiry — ${d.name || 'Unknown'} · ${d.exhibition || d.company || 'General'}`,
      html,
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
