/**
 * Prove the publishing schedule by moving the clock.
 *
 * The whole mechanism turns on one comparison — a post's datePublished
 * against today's date in India — so the only honest test is to run the real
 * loader at simulated instants and look at what it returns. Boundary cases
 * either side of midnight IST matter most: Railway runs in UTC, and a naive
 * implementation publishes a post dated the 24th at 05:30 IST on the 24th,
 * or on the evening of the 23rd.
 *
 * Run: npx tsx scripts/blog-schedule-check.ts
 */

// Imported normally: the loader reads the clock when it is called, not when
// it is imported, so the override inside at() is what each call sees.
import { getAllPosts, getScheduledPosts, todayInIndia, blogLinksFor } from '../src/lib/blog'

const RealDate = Date

/** Freeze the clock at an instant, then run the real loader against it. */
function at<T>(iso: string, fn: () => T): T {
  const fixed = new RealDate(iso).getTime()
  class FakeDate extends RealDate {
    constructor(...args: unknown[]) {
      // @ts-expect-error — forwarding the real overloads
      if (args.length === 0) super(fixed); else super(...args)
    }
    static now() { return fixed }
  }
  // @ts-expect-error — deliberate global override for the duration of fn
  globalThis.Date = FakeDate
  try { return fn() } finally { globalThis.Date = RealDate }
}


let failures = 0
function check(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (!ok) failures++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label}`)
  if (!ok) console.log(`        got:  ${JSON.stringify(got)}\n        want: ${JSON.stringify(want)}`)
}

// ── the schedule as authored ─────────────────────────────────

console.log('\nSCHEDULE\n')
at('2026-08-15T12:00:00+05:30', () => {
  console.log(`  today in India: ${todayInIndia()}`)
  console.log(`  live now (${getAllPosts().length}):`)
  getAllPosts().forEach(p => console.log(`    ${p.datePublished}  ${p.slug}`))
  console.log(`  scheduled (${getScheduledPosts().length}):`)
  getScheduledPosts().forEach(p => console.log(`    ${p.datePublished}  ${p.slug}`))
})

// ── midnight boundaries, India time ──────────────────────────

console.log('\nMIDNIGHT BOUNDARY (IST)\n')

const BAUMA = 'bauma-conexpo-india-2026-exhibitor-guide'
const isLive = (slug: string) => getAllPosts().some(p => p.slug === slug)

check('23 Aug 23:50 IST — bauma still hidden',
  at('2026-08-23T23:50:00+05:30', () => isLive(BAUMA)), false)
check('24 Aug 00:10 IST — bauma live',
  at('2026-08-24T00:10:00+05:30', () => isLive(BAUMA)), true)
check('23 Aug 20:00 UTC (= 24 Aug 01:30 IST) — bauma live, not held to UTC midnight',
  at('2026-08-23T20:00:00Z', () => isLive(BAUMA)), true)
check('23 Aug 17:00 UTC (= 23 Aug 22:30 IST) — bauma still hidden',
  at('2026-08-23T17:00:00Z', () => isLive(BAUMA)), false)

// ── how the live set grows ───────────────────────────────────

console.log('\nLIVE COUNT OVER TIME\n')
const EXPECTED: [string, number][] = [
  ['2026-08-15T12:00:00+05:30', 5],   // the five already published
  ['2026-08-23T12:00:00+05:30', 5],
  ['2026-08-24T12:00:00+05:30', 6],   // + bauma
  ['2026-08-26T12:00:00+05:30', 7],   // + semicon
  ['2026-08-29T12:00:00+05:30', 8],   // + REI/Battery
  ['2026-08-31T12:00:00+05:30', 9],   // + aluminium bharat
  ['2026-09-03T12:00:00+05:30', 10],  // + anuga foodtec
  ['2026-09-05T12:00:00+05:30', 11],  // + beautyworld dubai
  ['2026-09-08T12:00:00+05:30', 12],  // + CPHI Milan
  ['2026-09-10T12:00:00+05:30', 13],  // + windergy
  ['2026-09-13T12:00:00+05:30', 14],  // + yashobhoomi venue guide
  ['2026-09-16T12:00:00+05:30', 15],  // + CPHI/PMEC split-venue
  ['2026-09-18T12:00:00+05:30', 16],  // + India ITME
  ['2026-09-21T12:00:00+05:30', 17],  // + India Expo Mart venue guide
]
for (const [iso, want] of EXPECTED) {
  check(`${iso.slice(0, 10)} → ${want} live`, at(iso, () => getAllPosts().length), want)
}
check('nothing left scheduled after 21 Sep',
  at('2026-09-21T12:00:00+05:30', () => getScheduledPosts().length), 0)

// ── cross-links to unpublished posts ─────────────────────────

console.log('\nCROSS-LINK SEQUENCING\n')

const baumaHtml = (iso: string) =>
  at(iso, () => getAllPosts().find(p => p.slug === BAUMA)?.html ?? '')

const REI_HREF = 'href="/blog/rei-expo-battery-show-india-2026-guide"'

check('24 Aug — bauma mentions the REI guide',
  baumaHtml('2026-08-24T12:00:00+05:30').includes('Battery Show guide'), true)
check('24 Aug — but NOT as a link (REI publishes 29 Aug)',
  baumaHtml('2026-08-24T12:00:00+05:30').includes(REI_HREF), false)
check('29 Aug — becomes a real link once REI is live',
  baumaHtml('2026-08-29T12:00:00+05:30').includes(REI_HREF), true)

const anugaHtml = (iso: string) =>
  at(iso, () => getAllPosts().find(p => p.slug === 'anuga-foodtec-india-2026-exhibitor-guide')?.html ?? '')
check('anuga — link to the missing NESCO guide degrades to plain text',
  anugaHtml('2026-09-03T12:00:00+05:30').includes('/blog/bombay-exhibition-centre-nesco-exhibitor-guide'), false)
check('anuga — the NESCO wording survives as text',
  anugaHtml('2026-09-03T12:00:00+05:30').includes('NESCO'), true)

// The two Batch-4 posts hold a link to a split-venue guide that is not in
// the repo yet. The anchors are registered now; they must stay inert until
// that post exists, and light up on their own when it does.
const SPLIT = '/blog/cphi-pmec-india-2026-split-venue-guide'
for (const slug of ['cphi-milan-2026-indian-exhibitors-guide', 'yashobhoomi-iicc-delhi-exhibitor-guide']) {
  const html = at('2026-09-13T12:00:00+05:30', () => getAllPosts().find(p => p.slug === slug)?.html ?? '')
  check(`${slug.slice(0, 30).padEnd(30)} — split-venue anchor inert while the target is absent`,
    html.includes(SPLIT), false)
  check(`${slug.slice(0, 30).padEnd(30)} — the wording still reads`,
    html.includes('split-venue guide'), true)
}

// Batch-4 posts that reference earlier posts in the same programme: those
// targets publish first, so by their own publish date the links are real.
const windergyHtml = at('2026-09-10T12:00:00+05:30',
  () => getAllPosts().find(p => p.slug === 'windergy-india-2026-exhibitor-guide')?.html ?? '')
check('windergy — REI link is live by 10 Sep (REI published 29 Aug)',
  windergyHtml.includes('href="/blog/rei-expo-battery-show-india-2026-guide"'), true)

const yashoHtml = at('2026-09-13T12:00:00+05:30',
  () => getAllPosts().find(p => p.slug === 'yashobhoomi-iicc-delhi-exhibitor-guide')?.html ?? '')
check('yashobhoomi — SEMICON link is live by 13 Sep (SEMICON published 26 Aug)',
  yashoHtml.includes('href="/blog/semicon-india-2026-exhibitor-guide"'), true)

// ── the pack's "deploy actions", done without a deploy ───────
//
// Batch 5 asks a person to activate held links on 16 Sep and again on 21 Sep.
// Both dates are asserted here against the real loader: inert the day before,
// live the day of.

console.log('\nDEPLOY ACTIONS (should need no deploy)\n')

const htmlAt = (slug: string, iso: string) =>
  at(iso, () => getAllPosts().find(p => p.slug === slug)?.html ?? '')

const SPLIT_HREF = 'href="/blog/cphi-pmec-india-2026-split-venue-guide"'
const IEML_HREF = 'href="/blog/india-expo-mart-greater-noida-exhibitor-guide"'

// 16 Sep — the split-venue guide publishes; two Batch-4 posts link it.
for (const slug of ['cphi-milan-2026-indian-exhibitors-guide', 'yashobhoomi-iicc-delhi-exhibitor-guide']) {
  check(`15 Sep — ${slug.slice(0, 26).padEnd(26)} split-venue link still inert`,
    htmlAt(slug, '2026-09-15T12:00:00+05:30').includes(SPLIT_HREF), false)
  check(`16 Sep — ${slug.slice(0, 26).padEnd(26)} split-venue link activates`,
    htmlAt(slug, '2026-09-16T12:00:00+05:30').includes(SPLIT_HREF), true)
}

// 21 Sep — the IEML venue guide publishes; two posts hold a link to it.
for (const slug of ['cphi-pmec-india-2026-split-venue-guide', 'india-itme-2026-exhibitor-guide']) {
  check(`20 Sep — ${slug.slice(0, 26).padEnd(26)} IEML link still inert`,
    htmlAt(slug, '2026-09-20T12:00:00+05:30').includes(IEML_HREF), false)
  check(`21 Sep — ${slug.slice(0, 26).padEnd(26)} IEML link activates`,
    htmlAt(slug, '2026-09-21T12:00:00+05:30').includes(IEML_HREF), true)
}

// The IEML guide itself links three posts that publish before it.
const ieml = htmlAt('india-expo-mart-greater-noida-exhibitor-guide', '2026-09-21T12:00:00+05:30')
for (const href of [
  'href="/blog/rei-expo-battery-show-india-2026-guide"',
  SPLIT_HREF,
  'href="/blog/india-itme-2026-exhibitor-guide"',
]) {
  check(`IEML guide resolves ${href.slice(12, 46)}`, ieml.includes(href), true)
}

// ── registered anchors actually became links ─────────────────

console.log('\nREGISTERED INTERNAL LINKS RESOLVED\n')
const EXPECT_LINK: [string, string, string][] = [
  [BAUMA, '2026-08-24T12:00:00+05:30', '/expos/exhibition-stall-design-bauma-conexpo-india-2026-greater-noida'],
  [BAUMA, '2026-08-24T12:00:00+05:30', '/services/double-decker-mezzanine-stands'],
  ['semicon-india-2026-exhibitor-guide', '2026-08-26T12:00:00+05:30', '/expos/exhibition-stall-design-semicon-india-2026-new-delhi'],
  ['rei-expo-battery-show-india-2026-guide', '2026-08-29T12:00:00+05:30', '/expos/exhibition-stall-design-renewable-energy-india-expo-2026-greater-noida'],
  ['rei-expo-battery-show-india-2026-guide', '2026-08-29T12:00:00+05:30', '/expos/exhibition-stall-design-the-battery-show-india-2026-greater-noida'],
  ['aluminium-bharat-2026-exhibitor-guide', '2026-08-31T12:00:00+05:30', '/services/exhibition-stall-design'],
  ['anuga-foodtec-india-2026-exhibitor-guide', '2026-09-03T12:00:00+05:30', '/expos/exhibition-stall-design-anuga-foodtec-india-2026-mumbai'],
  ['beautyworld-dubai-2026-indian-exhibitors-guide', '2026-09-05T12:00:00+05:30', '/services/turnkey-project-management'],
  ['beautyworld-dubai-2026-indian-exhibitors-guide', '2026-09-05T12:00:00+05:30', '/services/exhibition-stall-design'],
  ['cphi-milan-2026-indian-exhibitors-guide', '2026-09-08T12:00:00+05:30', '/expos/exhibition-stall-design-cphi-milan-2026'],
  ['cphi-milan-2026-indian-exhibitors-guide', '2026-09-08T12:00:00+05:30', '/services/turnkey-project-management'],
  ['windergy-india-2026-exhibitor-guide', '2026-09-10T12:00:00+05:30', '/services/custom-booth-fabrication'],
  ['yashobhoomi-iicc-delhi-exhibitor-guide', '2026-09-13T12:00:00+05:30', '/services/custom-booth-fabrication'],
  ['yashobhoomi-iicc-delhi-exhibitor-guide', '2026-09-13T12:00:00+05:30', '/services/turnkey-project-management'],
  ['india-itme-2026-exhibitor-guide', '2026-09-18T12:00:00+05:30', '/expos/exhibition-stall-design-india-itme-2026-greater-noida'],
  ['india-itme-2026-exhibitor-guide', '2026-09-18T12:00:00+05:30', '/services/double-decker-mezzanine-stands'],
  ['india-expo-mart-greater-noida-exhibitor-guide', '2026-09-21T12:00:00+05:30', '/services/custom-booth-fabrication'],
]
for (const [slug, iso, href] of EXPECT_LINK) {
  const html = at(iso, () => getAllPosts().find(p => p.slug === slug)?.html ?? '')
  check(`${slug.slice(0, 28).padEnd(28)} → ${href}`, html.includes(`href="${href}"`), true)
}

// ── "From the blog" blocks on landing pages ──────────────────

console.log('\nFROM-THE-BLOG BLOCKS (landing pages)\n')

const AHMEDABAD = [
  'helipad-exhibition-centre-gandhinagar-guide',
  'aluminium-bharat-2026-exhibitor-guide',
  'exhibition-stall-design-cost-india',
  'double-decker-stall-rules-india',
  'custom-vs-modular-exhibition-stands-india',
  'exhibition-stand-cost-dubai-indian-exhibitors',
]
const CHENNAI = [
  'windergy-india-2026-exhibitor-guide',
  'exhibition-stall-design-cost-india',
  'custom-vs-modular-exhibition-stands-india',
]

check('Ahmedabad today — 5 cards, Aluminium Bharat withheld',
  at('2026-08-15T12:00:00+05:30', () => blogLinksFor(AHMEDABAD).length), 5)
check('Ahmedabad on 31 Aug — 6 cards, Aluminium Bharat joins',
  at('2026-08-31T12:00:00+05:30', () => blogLinksFor(AHMEDABAD).length), 6)
check('Ahmedabad card titles come from frontmatter h1',
  at('2026-08-15T12:00:00+05:30', () => blogLinksFor(AHMEDABAD)[0].title),
  "Exhibitor's Guide to Helipad Exhibition Centre, Gandhinagar")
check('Chennai today — 2 cards, Windergy withheld',
  at('2026-08-15T12:00:00+05:30', () => blogLinksFor(CHENNAI).length), 2)
check('Chennai on 10 Sep — 3 cards, Windergy joins at the top',
  at('2026-09-10T12:00:00+05:30', () => blogLinksFor(CHENNAI)[0].href),
  '/blog/windergy-india-2026-exhibitor-guide')
const NOIDA = [
  'india-expo-mart-greater-noida-exhibitor-guide',
  'india-itme-2026-exhibitor-guide',
  'cphi-pmec-india-2026-split-venue-guide',
  'rei-expo-battery-show-india-2026-guide',
  'exhibition-stall-design-cost-india',
]
check('Noida today — 1 card (only the cost guide is live)',
  at('2026-08-15T12:00:00+05:30', () => blogLinksFor(NOIDA).length), 1)
check('Noida on 21 Sep — all 5 cards',
  at('2026-09-21T12:00:00+05:30', () => blogLinksFor(NOIDA).length), 5)
check('an unknown slug is dropped, not rendered',
  at('2026-08-15T12:00:00+05:30', () => blogLinksFor(['no-such-post']).length), 0)

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} FAILED\n`)
process.exit(failures === 0 ? 0 : 1)
