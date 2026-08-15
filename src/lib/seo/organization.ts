import { SITE_URL } from '@/lib/site-url'
import { LOGO_URL } from '@/lib/brand'

/**
 * Single source of truth for the business details that appear in structured
 * data. These were duplicated across schema-generator, the homepage graph and
 * the city template; a fourth and fifth copy were about to be added, and a
 * name/address/phone that disagrees between pages is a known drag on local
 * ranking.
 *
 * ORG_PROFILES is the single source for the social links: the footer renders
 * them and the Organization node emits them as `sameAs`, so the two can never
 * drift. sameAs is a genuine entity signal — it is how Google ties this site
 * to the same business it knows from those profiles.
 */
export const ORG_ID = `${SITE_URL}#organization`

export const ORG_NAME = 'Approach Media Pvt. Ltd.'

export const ORG_LOGO = LOGO_URL

export const ORG_PHONES = ['+919426912602', '+919898644327', '+919427614395']

export const ORG_EMAIL = 'info@approachmedia.in'

/** Official profiles. Order controls the footer button order. */
export const ORG_PROFILES = [
  { label: 'LinkedIn',  short: 'in', url: 'https://www.linkedin.com/company/approach-media-pvt-ltd' },
  { label: 'Instagram', short: 'ig', url: 'https://www.instagram.com/approachmediapvtltd/' },
  { label: 'YouTube',   short: 'yt', url: 'https://www.youtube.com/@ApproachMediaPvtLtd' },
  { label: 'Facebook',  short: 'fb', url: 'https://www.facebook.com/approachmedia.in/' },
] as const

export const ORG_SAME_AS = ORG_PROFILES.map(p => p.url)

export const ORG_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress:
    '302, 3rd Floor, Chase House, Sheetal Baug Society, Opp. Induben Khakhrawala, Off C. G. Road, Nr. Mithakhali Circle',
  addressLocality: 'Ahmedabad',
  addressRegion: 'Gujarat',
  addressCountry: 'IN',
} as const

/** Cities with their own landing page, as schema City nodes. */
export const ORG_AREA_SERVED = [
  'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune',
].map(name => ({ '@type': 'City', name }))

/**
 * The organisation node other graphs reference by @id.
 * `type` is 'Organization' by default and 'LocalBusiness' where the page is
 * making a local-business claim (contact, city and country pages).
 */
export function organizationNode(type: 'Organization' | 'LocalBusiness' = 'Organization') {
  return {
    '@type': type,
    '@id': ORG_ID,
    name: ORG_NAME,
    url: `${SITE_URL}/`,
    logo: ORG_LOGO,
    image: ORG_LOGO,
    description:
      'Exhibition stall design and fabrication company. Custom booths, double decker mezzanine stands, AV integration and turnkey project management across India and 14 countries.',
    foundingDate: '2002',
    telephone: ORG_PHONES,
    email: ORG_EMAIL,
    address: ORG_ADDRESS,
    areaServed: ORG_AREA_SERVED,
    sameAs: ORG_SAME_AS,
  }
}

/** BreadcrumbList from [name, path] pairs. Home is prepended automatically. */
export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  }
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
