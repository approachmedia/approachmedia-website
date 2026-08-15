/**
 * Sanity check for the contact-form filter.
 *
 * The spam cases are taken from the submissions that actually arrived. The
 * genuine cases matter more: a rejected real enquiry is a lost customer, so
 * every one of them has to pass.
 *
 * Run: npx tsx scripts/spam-filter-check.ts
 */
import { checkSubmission, escapeHtml } from '../src/lib/spam'
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from '../src/lib/form-fields'

const HUMAN_PACE = String(Date.now() - 90_000) // filled over a minute and a half

type Case = { label: string; data: Record<string, string> }

const SPAM: Case[] = [
  {
    label: 'the submission from the inbox screenshot',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Lpmi Zouhtwpw',
      company: 'Czmhsth LLC',
      email: 'leb.umoq.iho7.39@gmail.com',
      phone: '3901627326',
      exhibition: 'dtIKkOscQLrSfJsU',
      venue: 'HFFsDZvjClJpilIUjjJoq',
      event_date: '1970-05-31',
      location: 'zDhrxfyEwedsKDVyjGmX',
      service: 'Exhibition Stall Design',
      stall_size: '9 sqm',
    },
  },
  {
    label: 'honeypot filled, everything else plausible',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      [HONEYPOT_FIELD]: 'http://example.com',
      name: 'Rajesh Patel', company: 'Shreeji Industries', email: 'rajesh@shreeji.co.in',
    },
  },
  {
    label: 'posted straight at the API, no timestamp',
    data: { name: 'Rajesh Patel', company: 'Shreeji Industries', email: 'rajesh@shreeji.co.in' },
  },
  {
    label: 'form completed in 400ms',
    data: {
      [TIMESTAMP_FIELD]: String(Date.now() - 400),
      name: 'Rajesh Patel', company: 'Shreeji Industries', email: 'rajesh@shreeji.co.in',
    },
  },
  {
    label: 'link farm in the message',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'SEO Offer', company: 'Growth', email: 'a@b.com',
      message: 'Cheap backlinks: https://a.example www.b.example https://c.example www.d.example https://e.example',
    },
  },
]

const GENUINE: Case[] = [
  {
    label: 'Gujarati name, local company, upcoming show',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Rajeshbhai Chaudhary', company: 'Shreeji Enterprise', email: 'rajesh@shreejienterprise.in',
      phone: '+91 98250 12345', exhibition: 'Vibrant Gujarat 2027',
      venue: 'Helipad Exhibition Centre', location: 'Gandhinagar, India',
      event_date: '2027-01-10', service: 'Exhibition Stall Design', stall_size: '36 sqm',
      message: 'We need a two side open stall. Please share design options and costing.',
    },
  },
  {
    label: 'all-caps abbreviations everywhere',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'S K Sharma', company: 'GSFC LTD', email: 'sk.sharma@gsfc.in',
      exhibition: 'ACETECH', venue: 'BEC', location: 'Mumbai',
      event_date: '2026-12-05',
    },
  },
  {
    label: 'South Indian name, long consonant-heavy company',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Krishnamurthy Venkataraghavan', company: 'Sri Lakshmi Textiles Pvt Ltd',
      email: 'kv@srilakshmi.com', exhibition: 'India ITME', venue: 'India Expo Mart',
      location: 'Greater Noida, India', event_date: '2026-11-20',
    },
  },
  {
    label: 'minimal enquiry, only required fields',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Anita Desai', company: 'Nirvana Labs', email: 'anita@nirvanalabs.io',
    },
  },
  {
    label: 'overseas enquiry, no date, one link in the message',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Wolfgang Schmidt', company: 'Brandt Maschinenbau GmbH',
      email: 'w.schmidt@brandt-mb.de', exhibition: 'Drupa', venue: 'Messe Duesseldorf',
      location: 'Duesseldorf, Germany',
      message: 'Our brand guide is at https://brandt-mb.de/brand — 120 sqm island required.',
    },
  },
  {
    label: 'real words that read as vowel-poor (Growth, Brandt, Schmidt)',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Wolfgang Schmidt', company: 'Growth Brandt Sprint Crystal Rhythm Ltd',
      email: 'w@growthbrandt.com', exhibition: 'Strength Expo', venue: 'Wyndham Centre',
      location: 'Frankfurt',
    },
  },
  {
    label: 'two links in the message — a brand guide and a website',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Meera Iyer', company: 'Kanchi Silks', email: 'meera@kanchisilks.in',
      message: 'Brand guide https://kanchisilks.in/brand and our site www.kanchisilks.in',
    },
  },
  {
    label: 'past show, asking about the next edition',
    data: {
      [TIMESTAMP_FIELD]: HUMAN_PACE,
      name: 'Priya Nair', company: 'Aster Pharma', email: 'priya@asterpharma.com',
      exhibition: 'PharmaTech Expo', venue: 'Helipad Exhibition Centre',
      location: 'Gandhinagar', event_date: '2026-08-01',
      message: 'We exhibited last month and want to plan the next one.',
    },
  },
]

let failures = 0

console.log('\nSPAM — must be dropped')
for (const c of SPAM) {
  const v = checkSubmission(c.data, `spam-${c.label}`)
  const ok = v.spam
  if (!ok) failures++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${c.label}${v.spam ? `  [${v.reason}]` : ''}`)
}

console.log('\nGENUINE — must get through')
for (const c of GENUINE) {
  const v = checkSubmission(c.data, `genuine-${c.label}`)
  const ok = !v.spam
  if (!ok) failures++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${c.label}${v.spam ? `  [wrongly dropped: ${v.reason}]` : ''}`)
}

console.log('\nRATE LIMIT — 6th submission from one IP')
const base = { [TIMESTAMP_FIELD]: HUMAN_PACE, name: 'Test User', company: 'Test Co', email: 't@t.com' }
let limited = false
for (let i = 1; i <= 6; i++) {
  const v = checkSubmission({ ...base }, '203.0.113.9')
  if (i <= 5 && v.spam) { console.log(`  FAIL  submission ${i} blocked early`); failures++ }
  if (i === 6) limited = v.spam
}
console.log(`  ${limited ? 'PASS' : 'FAIL'}  6th blocked`)
if (!limited) failures++

console.log('\nESCAPING — submitted markup must not survive into the email')
const escapes: [string, string][] = [
  ['<a href="http://evil.example">Click</a>', '&lt;a href=&quot;http://evil.example&quot;&gt;Click&lt;/a&gt;'],
  ['<script>alert(1)</script>', '&lt;script&gt;alert(1)&lt;/script&gt;'],
  ["O'Brien & Sons", 'O&#39;Brien &amp; Sons'],
]
for (const [input, expected] of escapes) {
  const got = escapeHtml(input)
  const ok = got === expected
  if (!ok) failures++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${input}${ok ? '' : `\n        got:      ${got}\n        expected: ${expected}`}`)
}

console.log(failures === 0 ? '\nAll checks passed.\n' : `\n${failures} FAILED\n`)
process.exit(failures === 0 ? 0 : 1)
