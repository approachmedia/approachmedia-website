import { Hero } from '@/components/home/Hero'
import { ClientsMarquee } from '@/components/home/ClientsMarquee'
import { About } from '@/components/home/About'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { PresenceMap } from '@/components/home/PresenceMap'
import '@/components/home/presence-map.css'
import { Industries } from '@/components/home/Industries'
import { WhyChoose } from '@/components/home/WhyChoose'
import { Process } from '@/components/home/Process'
import { Testimonials } from '@/components/home/Testimonials'
import { UpcomingExhibitions } from '@/components/home/UpcomingExhibitions'
import { LatestPosts } from '@/components/home/LatestPosts'
import { CtaBand } from '@/components/home/CtaBand'
import { Faq, faqs } from '@/components/home/Faq'

import { SITE_URL } from '@/lib/site-url'
// force-dynamic: FeaturedWorks reads from the DB, and DATABASE_URL is not
// available during the Docker build — only at runtime.
export const dynamic = 'force-dynamic'

export const metadata = {
  // absolute: bypasses the "%s | Approach Media" template in layout.tsx, which
  // would otherwise print the brand twice.
  title: { absolute: 'Exhibition Stall Design Company India | 6000+ Stalls Built' },
  description: 'Exhibition stall design and fabrication across India. 23+ years, 6000+ stalls, 14+ countries. Get a concept and costing in 48 hours.',
  // Renders as "https://www.approachmedia.in" with no trailing slash. Next
  // normalises the root canonical because trailingSlash defaults to false, and
  // writing the slash explicitly does not survive that. Harmless: the empty
  // path and "/" are the same URL after normalisation, and the sitemap's root
  // <loc> uses the identical form, so the two agree.
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}#organization`,
      name: 'Approach Media Pvt. Ltd.',
      url: SITE_URL,
      description:
        'Premium exhibition stall design and build company delivering custom trade-show booths across India and 14+ countries since 2002.',
      foundingDate: '2002',
      areaServed: ['IN', 'AE', 'DE', 'FR', 'NL', 'IT', 'ES', 'US', 'SG', 'MY', 'CN', 'BD', 'NP', 'KE'],
      serviceType: [
        'Exhibition Stall Design',
        'Custom Booth Fabrication',
        'Turnkey Project Management',
        'Audio-Visual & Technology Integration',
        'Double Decker / Mezzanine Stands',
        'Immersive Brand Experience Design',
      ],
      telephone: ['+919426912602', '+919898644327', '+919427614395'],
      email: 'info@approachmedia.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress:
          '302, 3rd Floor, Chase House, Sheetal Baug Society, Opp. Induben Khakhrawala, Off C. G. Road, Nr. Mithakhali Circle',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: 'Approach Media',
      url: SITE_URL,
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <ClientsMarquee />
        <About />
        <ServicesGrid />
        <PresenceMap />
        <Industries />
        <WhyChoose />
        <Process />
        <FeaturedWorks />
        <Testimonials />
        <UpcomingExhibitions />
        <LatestPosts />
        <CtaBand />
        <Faq />
      </main>
    </>
  )
}
