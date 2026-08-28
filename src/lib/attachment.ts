import { ATTACHMENT_MAX_BYTES, ATTACHMENT_TYPES } from './form-fields'

export interface MailAttachment {
  filename: string
  /** Base64, no data: prefix — the shape Resend takes. */
  content: string
}

/**
 * The optional floor plan, validated before it is trusted with anything.
 *
 * Everything here is attacker-controlled — the form's own checks are a
 * courtesy to the visitor, not a control. Returns null for absent or
 * unacceptable, so a bad attachment costs the attachment and not the enquiry:
 * a real person who attaches the wrong thing should still reach the inbox.
 */
export function readAttachment(value: unknown): MailAttachment | null {
  if (!value || typeof value !== 'object') return null

  const { filename, mimeType, data } = value as Record<string, unknown>
  if (typeof filename !== 'string' || typeof mimeType !== 'string' || typeof data !== 'string') return null
  if (!(ATTACHMENT_TYPES as readonly string[]).includes(mimeType)) return null

  // Base64 carries 4 characters per 3 bytes; padding makes this an
  // over-estimate by at most two bytes, which does not matter at this size.
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(data)) return null
  if ((data.length * 3) / 4 > ATTACHMENT_MAX_BYTES) return null

  // The name goes into a mail header and onto whatever disk the recipient
  // saves it to. Control characters out, directory separators flattened, and
  // it has to still say something afterwards.
  const safe = filename
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/[\\/]+/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)

  return /[a-z0-9]/i.test(safe) ? { filename: safe, content: data } : null
}
