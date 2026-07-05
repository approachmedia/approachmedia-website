import { Hero } from '@/components/home/Hero'
import { ClientsMarquee } from '@/components/home/ClientsMarquee'
import { About } from '@/components/home/About'
import { FeaturedWorks } from '@/components/home/FeaturedWorks'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { Presence } from '@/components/home/Presence'
import { Industries } from '@/components/home/Industries'
import { WhyChoose } from '@/components/home/WhyChoose'
import { Process } from '@/components/home/Process'
import { Testimonials } from '@/components/home/Testimonials'
import { UpcomingExhibitions } from '@/components/home/UpcomingExhibitions'
import { CtaBand } from '@/components/home/CtaBand'
import { Faq, faqs } from '@/components/home/Faq'

// force-dynamic: FeaturedWorks reads from the DB, and DATABASE_URL is not
// available during the Docker build — only at runtime.
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Approach Media — Exhibition Stall Design & Build Company India',
  description: "India's trusted exhibition stall design and build company. 23+ years, 6000+ stalls, 14+ countries.",
}

const SITE_URL = 'https://approachmedia.in'

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
        <Presence />
        <Industries />
        <WhyChoose />
        <Process />
        <FeaturedWorks />
        <Testimonials />
        <UpcomingExhibitions />
        <CtaBand />
        <Faq />
      </main>
    </>
  )
}
