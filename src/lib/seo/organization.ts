import { SITE_URL } from '@/lib/site-url'

/**
 * Single source of truth for the business details that appear in structured
 * data. These were duplicated across schema-generator, the homepage graph and
 * the city template; a fourth and fifth copy were about to be added, and a
 * name/address/phone that disagrees between pages is a known drag on local
 * ranking.
 *
 * `sameAs` is deliberately absent — the footer lists social platforms as
 * labels with no URLs, so there is nothing verified to point at. Add the real
 * profile URLs and the property can go in.
 */
export const ORG_ID = `${SITE_URL}#organization`

export const ORG_NAME = 'Approach Media Pvt. Ltd.'

export const ORG_LOGO =
  'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/logo_favicon/Appraoch%20Media%20Logo.svg'

export const ORG_PHONES = ['+919426912602', '+919898644327', '+919427614395']

export const ORG_EMAIL = 'info@approachmedia.in'

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
