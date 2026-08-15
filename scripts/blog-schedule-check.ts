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
import { getAllPosts, getScheduledPosts, todayInIndia } from '../src/lib/blog'

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
]
for (const [iso, want] of EXPECTED) {
  check(`${iso.slice(0, 10)} → ${want} live`, at(iso, () => getAllPosts().length), want)
}
check('nothing left scheduled after 5 Sep',
  at('2026-09-05T12:00:00+05:30', () => getScheduledPosts().length), 0)

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
]
for (const [slug, iso, href] of EXPECT_LINK) {
  const html = at(iso, () => getAllPosts().find(p => p.slug === slug)?.html ?? '')
  check(`${slug.slice(0, 28).padEnd(28)} → ${href}`, html.includes(`href="${href}"`), true)
}

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} FAILED\n`)
process.exit(failures === 0 ? 0 : 1)
