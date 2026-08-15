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
