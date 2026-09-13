/**
 * The site's Call and WhatsApp hrefs, in one place.
 *
 * Deliberately not a 'use client' module: the sticky bar is a client
 * component but /contact is a server one, and a server component cannot
 * import from a client module. Keeping the two constants here lets both sides
 * use the same number and the same greeting.
 *
 * The number is the landing pages' own, so a lead arriving by WhatsApp from
 * the website and one from an ad reach the same inbox.
 */
import { LP_PHONE_E164, LP_WA_NUMBER } from '@/content/lp/types'

const WA_TEXT = 'Hi Approach Media, I need an exhibition stall quote.'

export const SITE_WA_HREF = `https://wa.me/${LP_WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`
export const SITE_TEL_HREF = `tel:${LP_PHONE_E164}`
