/**
 * Show where every dead WordPress URL from the Search Console audit will land.
 *
 * The 50 case-study slugs are the list from the 16 Aug audit. Run this before
 * and after changing the matcher, and read the output: a redirect to an
 * unrelated page is treated as a soft 404 and passes almost no signal, so a
 * wrong match is worse than an honest fall back to /portfolio.
 *
 * Without DATABASE_URL the portfolio corpus is empty and everything resolves
 * on the expo and city rules alone — which is the worst case, and still worth
 * seeing. With DATABASE_URL set it reports the real outcome:
 *
 *   npx tsx scripts/legacy-redirect-check.ts
 *   DATABASE_URL=... npx tsx scripts/legacy-redirect-check.ts
 */
import expoData from '../src/data/expo-pages.json'
import { resolveCaseStudy, resolveLegacyEvent } from '../src/lib/legacy-redirects'
import { cityPageFor } from '../src/lib/seo/city-links'

const CASE_STUDY_SLUGS = `
exhibition-stall-designer-surat
stall-design-themis-automation-engimach-ahmedabad
exhibition-stall-design-sssa-business-expo-rajkot-volatic-cable
exhibition-stall-design-and-fabrication-agency
exhibition-stall-design-agency-chem-tech
best-stall-fabricator-agency-at-rei-alishan-green-energy-pvt-ltd-an-epitome-of-excellence-and-innovation
cphi-p-mec-india-2021
exhibition-stall-design-shaligram-group-gihed
exhibition-stall-design-and-fabrication-cmai-national-garment-fair
solar-expo-design-services-mumbai-solmech
exhibition-design-studio
exhibition-stall-designing-company
exhibition-stall-design-agency-acetech
cc-indian-ice-cream-congress-expo-stall-design-agency
exhibition-stall-design-company-imtex-bangalore
delhi-rei-renewable-energy-stall-design-company
reliable-exhibition-stall-fabrication-services-for-the-bee-pharmo-labs-pvt-ltd-and-manisha-analytical-laboratories-at-pharmatec
ggma-exhibition-stall-design-and-fabrication-agency-gandhinagar
chemical-expo-mumbai-stall-design-and-fabrication-company
exhibition-stall-fabrication-services-plast-india
indus-food-stall-design-delhi-gopal
gujarat-garment-manufacturing-association-stall-designer
rei-exhibition-stall-designer-agency
stall-design-and-fabrication-company-garment-industry
indus-food-expo-stall-fabricators
intersolar-exhibition-stall-design
exhibition-stall-design-company-gihed-ahmedabad-gujarat
bangalore-stall-design-agency-imtex-exhibition
rayzon-solars-captivating-mezzanine-exhibition-stand-design-and-fabrication-at-the-prestigious-rei-event
exhibition-stall-design-agency-dti
stall-design-agency-india-lab-expo
exhibition-stall-fabrication-agency-rei
automation-expo-stall-design-and-fabrication-agency-mumbai
creative-exhibition-stall-design-agency
exhibition-stall-design-and-development
hyderabad-stall-design-company
global-water-expo-booth-fabrication
plast-india-stall-design
exhibition-stall-designer-at-jito-exhibition
delhi-renewable-energy-stall-designer
rotary-expo-jalna-stall-designer-and-fabrication-company
ggma-exhibition-stall-fabrication-agency-gandhinagar
garment-stall-design-and-fabrication-agency
award-winning-exhibition-stand-design-agency-property-exhibition
exhibition-stall-design-agency-jito-expo
delhi-solar-exhibition-fabricator
exhibition-stall-design-waptag
intersolar-booth-contractors
iitpf-india-international-pet-trade-fair-stall-designer-agency
custom-exhibition-stall-design
`.trim().split('\n').map(s => s.trim()).filter(Boolean)

const EXPOS = (expoData as { slug: string; title: string; city: string }[]).map(e => ({
  slug: e.slug, title: e.title, city: e.city,
}))

async function main() {
  const projects = await loadProjects()
  await report(projects)
}

async function loadProjects(): Promise<{ slug: string; title: string; city: string | null }[]> {
  if (!process.env.DATABASE_URL) return []
  const { getLegacyMatchCandidates } = await import('../src/lib/db/portfolio')
  return getLegacyMatchCandidates()
}


async function report(projects: { slug: string; title: string; city: string | null }[]) {
console.log(
  projects.length
    ? `\nMatching against ${projects.length} published projects.\n`
    : '\nNo DATABASE_URL — portfolio matching skipped. This is the worst case:\n' +
      'with the database, more of these resolve to a specific project.\n',
)

const counts: Record<string, number> = {}
const rows: string[] = []

for (const slug of CASE_STUDY_SLUGS) {
  const { path, how } = resolveCaseStudy(slug, projects, EXPOS, city => cityPageFor(city)?.path ?? null)
  counts[how] = (counts[how] ?? 0) + 1
  rows.push(`  ${how.padEnd(9)} /casestudy/${slug.slice(0, 52).padEnd(52)} → ${path}`)
}

console.log(rows.join('\n'))

console.log('\nBy match type:')
for (const [how, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${how.padEnd(10)} ${n}`)
}

console.log('\nOld event URLs:')
for (const slug of ['acetech-2024', 'cphi-india', 'plastindia-2023', 'some-unknown-event']) {
  const { path, how } = resolveLegacyEvent(slug, EXPOS)
  console.log(`  ${how.padEnd(9)} /upcoming_events__exhibitions/${slug.padEnd(20)} → ${path}`)
}

const dead = CASE_STUDY_SLUGS.length - (counts.fallback ?? 0)
console.log(
  `\n${dead}/${CASE_STUDY_SLUGS.length} land on a topically-matched page; ` +
  `${counts.fallback ?? 0} fall back to /portfolio.\n`,
)
}

main()
