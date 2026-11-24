import type { Metadata } from 'next'
import expoData from '@/data/expo-pages.json'
import type { ExpoPageData } from '@/components/expo/types'

import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import HeroMedia from '@/components/site/motion/HeroMedia'
import ExpoBoard from '@/components/expo/motion/ExpoBoard'
import ExpoChapters from '@/components/expo/motion/ExpoChapters'
import '@/components/expo/motion/expo-motion.css'
export const metadata: Metadata = {
  title: { absolute: "Exhibition Stall Design for Expos 2026–2027 | India Shows" },
  description: 'Browse upcoming exhibitions and trade shows across India and international venues. Approach Media provides custom stall design, 3D booth concepts, and turnkey fabrication for every expo.',
  alternates: { canonical: `${SITE_URL}/expos` },
}

const MONTH_ORDER: Record<string, number> = {
  JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6,
  JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12,
}

const INDUSTRY_COLORS: Record<string, string> = {
  construction:  'hsl(42 80% 55%)',
  engineering:   'hsl(230 70% 65%)',
  pharma:        'hsl(280 60% 65%)',
  food:          'hsl(110 55% 50%)',
  textile:       'hsl(330 65% 65%)',
  industrial:    'hsl(200 70% 55%)',
  travel:        'hsl(25 80% 60%)',
  multiindustry: 'hsl(220 15% 65%)',
}

/** One of our own stall photographs per expo sector (the R2 industry set). */
const SECTOR_PHOTO: Record<string, string> = {
  construction:  'exhibition-stall-design-doors-windows.jpg',
  engineering:   'exhibition-stall-design-machinery.jpg',
  pharma:        'exhibition-stall-design-pharma.jpg',
  food:          'exhibition-stall-design-fmcg.jpg',
  textile:       'exhibition-stall-design-garment.jpg',
  industrial:    'exhibition-stall-design-valves-pumps-gears.jpg',
  travel:        'exhibition-stall-design-events.jpg',
  multiindustry: 'exhibition-stall-design-events.jpg',
}
const PHOTO_CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/industries'

export default function ExposIndexPage() {
  // Year first, then month. Sorting on the month alone put January 2027
  // above February 2026, which is how the list read the moment a second
  // year was added to it.
  const expos = [...(expoData as ExpoPageData[])].sort(
    (a, b) =>
      Number(a.year) - Number(b.year) ||
      (MONTH_ORDER[a.month] ?? 13) - (MONTH_ORDER[b.month] ?? 13),
  )

  const years = [...new Set(expos.map(e => e.year))].sort()
  const yearSpan = years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : years[0]

  const byMonth = expos.reduce<Record<string, ExpoPageData[]>>((acc, e) => {
    const key = `${e.monthName} ${e.year}`
    if (!acc[key]) acc[key] = []
    acc[key].push(e)
    return acc
  }, {})

  const totalCities = [...new Set(expos.map(e => e.city))].length

  return (
    <main>
      <JsonLd graph={[
        organizationNode(),
        {
          '@type': 'CollectionPage',
          name: `Exhibition stall design for ${yearSpan} expos`,
          description: 'Stall design and fabrication for upcoming expos across India and internationally.',
          url: `${SITE_URL}/expos`,
          publisher: { '@id': `${SITE_URL}#organization` },
        },
        {
          '@type': 'ItemList',
          name: `Expos we build at in ${yearSpan}`,
          numberOfItems: expos.length,
          itemListElement: expos.map((e, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: e.title,
            url: `${SITE_URL}/expos/${e.slug}`,
          })),
        },
        breadcrumb([{ name: `Expos ${yearSpan}`, path: '/expos' }]),
      ]} />

      {/* HERO */}
      <section className="page-hero">
        <HeroMedia />
        <div className="container">
          <div className="page-hero-inner animate-in">
            <span className="eyebrow-pill">Upcoming Expos {yearSpan}</span>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.6rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.08, maxWidth: '800px', marginBottom: '22px' }}>
              Exhibition Stall Design for <span className="highlight">Every Major Expo</span> in {yearSpan}
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '580px', lineHeight: 1.8, marginBottom: '36px' }}>
              Approach Media designs and builds custom exhibition stalls for {expos.length}+ upcoming trade shows across India and internationally. Find your expo below and get a tailored quote.
            </p>
            <div className="hero-ctas">
              <a href="/contact" className="btn btn-primary">Get a Stall Design Quote &rarr;</a>
              <a href="#expo-list" className="btn btn-outline">Browse All Expos</a>
            </div>
            {/* The next six shows on a departure board that flips into place. */}
            <ExpoBoard rows={expos.slice(0, 6).map(e => ({
              slug: e.slug,
              when: `${e.monthName.slice(0, 3).toUpperCase()} ${e.year}`,
              what: e.title,
              where: e.city,
            }))} />
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-strip-inner animate-in">
            <div className="stat-item"><span className="stat-number">{expos.length}+</span><div className="stat-label">Upcoming Expos</div></div>
            <div className="stat-item"><span className="stat-number">{totalCities}+</span><div className="stat-label">Cities Covered</div></div>
            <div className="stat-item"><span className="stat-number">6000+</span><div className="stat-label">Stalls Executed</div></div>
            <div className="stat-item"><span className="stat-number">23+</span><div className="stat-label">Years of Experience</div></div>
          </div>
        </div>
      </div>

      {/* EXPO LIST BY MONTH */}
      <section className="section" id="expo-list">
        <div className="container">
          <div className="section-head animate-in" style={{ marginBottom: '48px' }}>
            <span className="section-label">All Expos</span>
            <h2>Find Your Exhibition by Month</h2>
          </div>

          {/* Month chapters: the month fills as you scroll through its shows,
              and a stall photograph from the show's sector follows the cursor. */}
          <div className="exm">
            <ExpoChapters chapters={Object.entries(byMonth).map(([monthYear, monthExpos]) => {
              const [month, year] = monthYear.split(' ')
              return {
                month,
                year,
                expos: monthExpos.map(expo => ({
                  slug: expo.slug,
                  title: expo.title,
                  venue: expo.venue,
                  city: expo.city,
                  tag: expo.industryLabel.split(',')[0],
                  color: INDUSTRY_COLORS[expo.industry] ?? 'hsl(220 15% 65%)',
                  image: `${PHOTO_CDN}/${SECTOR_PHOTO[expo.industry] ?? SECTOR_PHOTO.multiindustry}`,
                })),
              }
            })} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Can&apos;t find your expo? We cover all major shows.</h2>
          <p className="cta-sub">
            Share your expo name, city, and booth size — we provide a tailored design concept and quote within 48 hours.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Request a Proposal &rarr;</a>
            <a href="/work-with-us" className="btn btn-outline">How We Work</a>
          </div>
        </div>
      </section>
    </main>
  )
}
