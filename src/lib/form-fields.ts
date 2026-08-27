/**
 * Field names shared between the contact form and the route that validates it.
 *
 * These live apart from lib/spam.ts on purpose. The form is a client
 * component, so anything it imports is downloaded by every visitor — and the
 * detection thresholds in spam.ts are worth rather more when a spammer cannot
 * read them out of the JavaScript bundle.
 */

/** Hidden field a human never sees and so never fills. */
export const HONEYPOT_FIELD = 'company_website'

/** Hidden field holding the time the form was rendered, stamped on mount. */
export const TIMESTAMP_FIELD = 'form_rendered_at'

// ── Floor-plan attachment ────────────────────────────────────
//
// Shared so the form and the route cannot disagree about what is allowed. If
// they drift, the browser accepts a file that the route then silently drops,
// which is the worst of both.

/**
 * Largest file the form will attach, in bytes.
 *
 * Six, not ten, and the ceiling is not the mail provider. The file is posted
 * inside the JSON body as base64, which is four characters per three bytes,
 * and Next truncates a request body at 10 MB — measured, with the truncation
 * logged as `Request body exceeded 10MB for /api/contact`. A 10 MB file makes
 * a 13.4 MB body, so what arrives is a cut-off string, JSON.parse throws, and
 * the visitor loses the entire enquiry rather than just the attachment. Six
 * megabytes encodes to about 8, which clears it with room for the rest of the
 * form.
 */
export const ATTACHMENT_MAX_BYTES = 6 * 1024 * 1024

/**
 * Floor plans arrive as a PDF from the organiser or a photo of one. Nothing
 * executable, and nothing whose type a mail filter will not recognise — an
 * unrecognised attachment is how a real enquiry ends up in a spam folder.
 */
export const ATTACHMENT_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
] as const

/** For the file input's accept attribute — extensions as well as types,
 *  because some browsers match on one and some on the other. */
export const ATTACHMENT_ACCEPT = '.pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp'

/** The shape the form posts and the route expects. */
export interface AttachmentPayload {
  filename: string
  mimeType: string
  /** Base64, without the data: URL prefix. */
  data: string
}
