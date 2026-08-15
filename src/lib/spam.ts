/**
 * Contact-form spam defence.
 *
 * The form was being filled by a bot: every field completed including the
 * optional ones, the first option picked in each dropdown, random consonant
 * strings for names, and a date near the Unix epoch. The route had no
 * validation, so each one became an email.
 *
 * Layers here, cheapest first. A submission is dropped if ANY of the hard
 * checks fire; the soft heuristics have to agree with each other before they
 * drop anything, because a false positive costs a real lead and a false
 * negative only costs an email.
 */

import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from './form-fields'

/** A human cannot read and complete this form faster than this. */
const MIN_FILL_MS = 3_000

/** Per-IP submission cap. */
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

// ── HTML escaping ────────────────────────────────────────────

/**
 * Submitted values are interpolated into the notification email. Without this
 * a spammer can put markup — including links — into the message that lands in
 * the inbox, which is how form spam turns into phishing aimed at the owner.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Rate limiting ────────────────────────────────────────────

/**
 * In-memory, so it resets on every deploy and is per-instance. That is fine
 * for the job it does here — blunting a burst — and avoids adding a store for
 * it. If the service is ever scaled past one instance this stops being a real
 * cap and Turnstile becomes the load-bearing layer.
 */
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [k, v] of hits) {
      if (v.every(t => now - t >= RATE_WINDOW_MS)) hits.delete(k)
    }
  }

  return recent.length > RATE_LIMIT
}

// ── Gibberish detection ──────────────────────────────────────

/** 'y' counts as a vowel. Without it Rhythm, Crystal and Wyndham read as
 *  consonant runs, and those are ordinary words in company names. */
const VOWELS = /[aeiouy]/gi
const CONSONANT_RUN = /[^aeiouy\s]{5,}/i

/**
 * True when a word looks machine-generated rather than typed. Deliberately
 * conservative — the cost of a false positive here is a lost enquiry:
 *
 *  - short tokens are ignored, because real abbreviations (GSFC, PVT, BEC)
 *    trip every letter-frequency test there is;
 *  - the vowel-ratio test needs 8+ characters, so Growth, Brandt, Sprint and
 *    Schmidt — all legitimately vowel-poor — are left alone.
 */
function looksRandom(value: string | undefined): boolean {
  if (!value) return false

  for (const token of value.split(/[\s,./-]+/)) {
    if (token.length < 6) continue
    if (!/^[A-Za-z]+$/.test(token)) continue

    // Case flipping inside a word — "dtIKkOscQLrSfJsU". Nothing typed by a
    // person looks like this, so it stands alone.
    if (/[a-z][A-Z][a-z]/.test(token) && /[A-Z].*[a-z].*[A-Z]/.test(token)) return true

    // A consonant run no language sustains — "Czmhsth", "Zouhtwpw".
    if (CONSONANT_RUN.test(token)) return true

    // Long and almost vowel-free.
    if (token.length >= 8) {
      const vowels = (token.match(VOWELS) ?? []).length
      if (vowels / token.length < 0.15) return true
    }
  }

  return false
}

/** Event dates in the past are a bot filling a date input with a small number. */
function datePlausible(value: string | undefined): boolean {
  if (!value) return true
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return false
  return d.getTime() > Date.now() - 365 * 24 * 60 * 60 * 1000
}

function countLinks(value: string | undefined): number {
  if (!value) return 0
  return (value.match(/https?:\/\/|www\./gi) ?? []).length
}

// ── The check ────────────────────────────────────────────────

export type SpamVerdict =
  | { spam: false }
  | { spam: true; reason: string }

export function checkSubmission(
  d: Record<string, string>,
  ip: string,
): SpamVerdict {
  // Hard checks — each on its own is conclusive.

  if (d[HONEYPOT_FIELD]?.trim()) {
    return { spam: true, reason: 'honeypot filled' }
  }

  const renderedAt = Number(d[TIMESTAMP_FIELD])
  if (!renderedAt || Number.isNaN(renderedAt)) {
    return { spam: true, reason: 'no render timestamp — posted outside the form' }
  }
  const elapsed = Date.now() - renderedAt
  if (elapsed < MIN_FILL_MS) {
    return { spam: true, reason: `submitted in ${elapsed}ms` }
  }

  if (rateLimited(ip)) {
    return { spam: true, reason: `more than ${RATE_LIMIT} submissions in ${RATE_WINDOW_MS / 60000} minutes` }
  }

  // Soft checks — weighted, because any one of them can be wrong about a real
  // person. A score of 3 is the bar, so no single signal can drop a
  // submission on its own.
  const links = countLinks(d.message)

  const signals = [
    { weight: 1, label: 'name',       hit: looksRandom(d.name) },
    { weight: 1, label: 'company',    hit: looksRandom(d.company) },
    { weight: 1, label: 'exhibition', hit: looksRandom(d.exhibition) },
    { weight: 1, label: 'venue',      hit: looksRandom(d.venue) },
    { weight: 1, label: 'location',   hit: looksRandom(d.location) },
    { weight: 1, label: 'event date in the past', hit: !datePlausible(d.event_date) },
    // A stall enquiry does not need a list of links. Three is odd, five is
    // a link farm and worth the bar on its own.
    { weight: 2, label: `${links} links in message`, hit: links >= 3 },
    { weight: 1, label: 'link farm',                 hit: links >= 5 },
  ].filter(s => s.hit)

  const score = signals.reduce((n, s) => n + s.weight, 0)
  if (score >= 3) {
    return { spam: true, reason: `score ${score}: ${signals.map(s => s.label).join(', ')}` }
  }

  return { spam: false }
}

// ── Turnstile (optional, off until keys are set) ─────────────

/**
 * Cloudflare Turnstile. Inert unless TURNSTILE_SECRET_KEY is set, so this
 * ships disabled and is switched on by adding the two env vars — it does not
 * require Cloudflare to be in front of the domain.
 */
export async function turnstileOk(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // not configured — skip

  if (!token) return false

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const body = await res.json() as { success?: boolean }
    return body.success === true
  } catch (err) {
    // A Cloudflare outage must not take the contact form down with it.
    console.error('Turnstile verification failed to reach Cloudflare', err)
    return true
  }
}
