import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { exhibitionStallDesign } from '@/content/lp/exhibition-stall-design'
import { stallFabrication } from '@/content/lp/stall-fabrication'
import type { LandingPageConfig } from '@/content/lp/types'
import { getGoogleRating } from '@/lib/google-rating'
import { getPublishedProjects } from '@/lib/db/portfolio'
import { LpParamsProvider } from '@/components/lp/lp-params'
import { paramsFromSearch } from '@/components/lp/lp-params-shared'
import LpHeader from '@/components/lp/LpHeader'
import LpHero from '@/components/lp/LpHero'
import LpFaq from '@/components/lp/LpFaq'
import LpFinalCta from '@/components/lp/LpFinalCta'
import LpStickyBar from '@/components/lp/LpStickyBar'
import LpView from '@/components/lp/LpView'
import { LpTrustBar, LpOffer, LpProcess, LpPortfolioStrip, LpTestimonials, LpPricing, LpFooter, type LpProject } from '@/components/lp/LpSections'

/**
 * Google Ads landing pages. One template, one config per slug.
 *
 * Not SEO pages: noindex, nofollow, absent from the sitemap, and rendered
 * without the site's header nav or footer link grid (SiteChrome steps aside
 * for /lp/*). The whole page has one job, which is the form, the phone
 * number and the WhatsApp button.
 *
 * Reading searchParams makes the route dynamic, which is what §6 needs: the
 * H1 has to be right in the first byte for a ?show= click, not corrected
 * after hydration.
 */

const CONFIGS: Record<string, LandingPageConfig> = {
  [exhibitionStallDesign.slug]: exhibitionStallDesign,
  [stallFabrication.slug]: stallFabrication,
}

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return Object.keys(CONFIGS).map(slug => ({ slug }))
}

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cfg = CONFIGS[slug]
  if (!cfg) return {}
  return {
    title: { absolute: cfg.title },
    description: cfg.subhead,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    alternates: { canonical: undefined },
  }
}

/**
 * Six recent, substantial builds across the three ad regions: two from
 * Gandhinagar/Ahmedabad, two from Mumbai, two from Delhi NCR. Where a
 * region has fewer, the strip is topped up from the newest work overall so
 * it always shows six real projects.
 */
async function pickProjects(): Promise<LpProject[]> {
  const take = (list: LpProject[], n: number, seen: Set<number>) =>
    list.filter(p => !seen.has(p.id)).slice(0, n).map(p => { seen.add(p.id); return p })
  try {
    const [guj, mum, del, all] = await Promise.all([
      getPublishedProjects({ city: 'Gandhinagar', minAreaSqm: 36, limit: 6 }),
      getPublishedProjects({ city: 'Mumbai', minAreaSqm: 36, limit: 6 }),
      getPublishedProjects({ city: 'Delhi', minAreaSqm: 36, limit: 6 }),
      getPublishedProjects({ minAreaSqm: 36, limit: 12 }),
    ])
    const ahm = guj.length < 2 ? await getPublishedProjects({ city: 'Ahmedabad', minAreaSqm: 36, limit: 4 }) : []
    const seen = new Set<number>()
    const out = [
      ...take([...guj, ...ahm] as LpProject[], 2, seen),
      ...take(mum as LpProject[], 2, seen),
      ...take(del as LpProject[], 2, seen),
    ]
    if (out.length < 6) out.push(...take(all as LpProject[], 6 - out.length, seen))
    return out
  } catch {
    return []
  }
}

export default async function LandingPage({ params, searchParams }: Props) {
  const { slug } = await params
  const cfg = CONFIGS[slug]
  if (!cfg) notFound()

  const sp = await searchParams
  const { show, city } = paramsFromSearch(sp)
  const [rating, projects] = await Promise.all([getGoogleRating(), pickProjects()])

  return (
    <LpParamsProvider>
      <LpView service={cfg.service} />
      <LpHeader />
      <main>
        <LpHero cfg={cfg} initialShow={show} initialCity={city} rating={rating} />
        <LpTrustBar {...cfg.trustBar} />
        <LpOffer cards={cfg.offer} />
        <LpProcess steps={cfg.process} />
        <LpPortfolioStrip projects={projects} cta={cfg.portfolioCta} />
        <LpTestimonials {...cfg.testimonials} />
        <LpPricing {...cfg.pricing} />
        <LpFaq items={cfg.faq} initialCity={city} />
        <LpFinalCta {...cfg.finalCta} />
      </main>
      <LpFooter />
      <LpStickyBar />
    </LpParamsProvider>
  )
}
