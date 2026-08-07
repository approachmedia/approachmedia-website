import { SITE_URL } from '@/lib/site-url'

/**
 * Service + BreadcrumbList JSON-LD for a /services/* page.
 *
 * The service pages carried no structured data at all, so Google had no
 * signal tying them to the organisation or to each other. Provider is a
 * reference to the organisation node rather than an inline name, so the
 * entity resolves to the same business as every other page on the site.
 *
 * Pass `faqs` to add a FAQPage node — only ever with copy that also appears
 * on the page itself.
 */
export default function ServiceSchema({
  name,
  serviceType,
  slug,
  description,
  faqs,
}: {
  name: string
  serviceType: string
  slug: string
  description: string
  faqs?: { q: string; a: string }[]
}) {
  const url = `${SITE_URL}/services/${slug}`

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Service',
      name,
      serviceType,
      description,
      url,
      provider: { '@id': `${SITE_URL}#organization` },
      areaServed: { '@type': 'Country', name: 'India' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',     item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name,             item: url },
      ],
    },
  ]

  if (faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  )
}
