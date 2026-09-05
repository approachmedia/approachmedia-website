import { LP_WA_NUMBER } from '@/content/lp/types'

/**
 * WhatsApp deep link, spec §5. The message is built from whatever the page
 * knows at the moment of the click: the ?show= param or the show typed into
 * the form, and the stall size selected. Missing values fall back to the
 * spec's own placeholders.
 */
export function whatsappUrl(show?: string, size?: string): string {
  const text =
    `Hi Approach Media, I need an exhibition stall for ${show?.trim() || 'an upcoming exhibition'}. ` +
    `Stall size: ${size?.trim() || 'TBD'}. Please share a 3D concept and costing.`
  return `https://wa.me/${LP_WA_NUMBER}?text=${encodeURIComponent(text)}`
}
