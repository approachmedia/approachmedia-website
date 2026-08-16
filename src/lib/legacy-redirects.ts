/**
 * Where an old WordPress URL should land.
 *
 * The 8 Aug migration left roughly 50 `/casestudy/<slug>/` URLs and a batch of
 * old event URLs dead. Each had years of topical relevance for exactly the
 * queries the business wants, and a 404 throws all of it away.
 *
 * Rather than hard-coding fifty pairs — which would go stale, and would not
 * cover the dead URLs nobody has listed yet — these functions score the old
 * slug against what the site actually serves today. A redirect to an
 * unrelated page is treated by Google as a soft 404 and passes little signal,
 * so the order of preference is strictly by topical closeness:
 *
 *   1. the portfolio project the case study was about
 *   2. the landing page for the show it happened at
 *   3. the city page for where it happened
 *   4. /portfolio
 *
 * Everything here is pure so it can be run over the real slug list offline —
 * see scripts/legacy-redirect-check.ts.
 */

/**
 * Words that appear in almost every legacy slug. Matching on these would pair
 * any two URLs at random, so they carry no weight.
 */
const STOPWORDS = new Set([
  // structural / promotional
  'a', 'an', 'and', 'at', 'best', 'by', 'for', 'in', 'of', 'the', 'to', 'top',
  'with', 'award', 'winning', 'epitome', 'excellence', 'innovation',
  'prestigious', 'captivating', 'creative', 'reliable', 'custom',
  // what the business does — present in essentially every legacy slug
  'agency', 'agencies', 'booth', 'booths', 'company', 'companies',
  'contractors', 'design', 'designer', 'designers', 'designing',
  'designinging', 'development', 'exhibit', 'exhibition', 'exhibitions',
  'fabricating', 'fabrication', 'fabricator', 'fabricators', 'pvt', 'ltd',
  'service', 'services', 'stall', 'stalls', 'stand', 'stands', 'studio',
  // generic event and geography words. These are the ones that produced
  // actively wrong matches on the first run: "global" paired a water expo
  // with a fintech festival, "international" paired a pet trade fair with a
  // cargo show. A token this common carries no evidence of being the same
  // event, and a wrong redirect is a soft 404 — strictly worse than /portfolio.
  'association', 'business', 'congress', 'event', 'events', 'expo', 'expos',
  'fair', 'fairs', 'global', 'group', 'india', 'indian', 'industries',
  'industry', 'international', 'national', 'show', 'shows', 'solutions',
  'trade',
])

/** Distinctive words only — brand names, show names, cities, years. */
export function distinctiveTokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(t => t.length > 2 && !STOPWORDS.has(t))
}

export type Candidate = {
  /** Where a match sends the visitor. */
  path: string
  /** Text the old slug is compared against — slug, title, city, whatever exists. */
  text: string
}

/**
 * Inverse document frequency, so a token shared by two candidates counts for
 * far more than one shared by forty. Without this, "mumbai" alone would pair
 * an old case study with whichever Mumbai project happened to sort first.
 */
function documentFrequency(candidates: Candidate[]): Map<string, number> {
  const df = new Map<string, number>()
  for (const c of candidates) {
    for (const t of new Set(distinctiveTokens(c.text))) {
      df.set(t, (df.get(t) ?? 0) + 1)
    }
  }
  return df
}

export type Match = { path: string; score: number; shared: string[] }

/** A token belonging to exactly one candidate scores 1/1. Requiring this
 *  means "shared with one other page", not "vaguely similar". */
export const UNIQUE_TOKEN_SCORE = 1

/**
 * Best candidate for a slug, or null when nothing is close enough.
 *
 * minScore 0.5 means: one token that appears in at most two candidates is
 * enough ("themis", "acetech"), but a single widely-shared token is not.
 */
export function bestMatch(
  slug: string,
  candidates: Candidate[],
  minScore = 0.5,
): Match | null {
  const wanted = new Set(distinctiveTokens(slug))
  if (wanted.size === 0) return null

  const df = documentFrequency(candidates)
  let best: Match | null = null

  for (const c of candidates) {
    const shared: string[] = []
    let score = 0
    for (const t of new Set(distinctiveTokens(c.text))) {
      if (!wanted.has(t)) continue
      shared.push(t)
      score += 1 / (df.get(t) ?? 1)
    }
    if (score === 0) continue
    // Ties go to the shorter path: a more specific page, not a broader one.
    if (!best || score > best.score || (score === best.score && c.path.length < best.path.length)) {
      best = { path: c.path, score, shared }
    }
  }

  return best && best.score >= minScore ? best : null
}

// ── the two resolvers ────────────────────────────────────────

export type Resolution = {
  path: string
  /** Why this target was chosen — written to the logs on every redirect. */
  how: 'exact' | 'portfolio' | 'expo' | 'city' | 'fallback'
}

export type ExpoCandidate = { slug: string; title: string; city: string }
export type ProjectCandidate = { slug: string; title: string; city: string | null }

export function resolveCaseStudy(
  slug: string,
  projects: ProjectCandidate[],
  expos: ExpoCandidate[],
  cityPath: (city: string) => string | null,
): Resolution {
  const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '')

  // 1. The project kept its slug through the migration.
  if (projects.some(p => p.slug.toLowerCase() === clean)) {
    return { path: `/portfolio/${clean}`, how: 'exact' }
  }

  // 2. The project it was about, matched on slug + title + city.
  const project = bestMatch(
    clean,
    projects.map(p => ({ path: `/portfolio/${p.slug}`, text: `${p.slug} ${p.title} ${p.city ?? ''}` })),
  )
  if (project) return { path: project.path, how: 'portfolio' }

  // 3. The city, when the slug names one. Checked before the show because it
  //    is the safer of the two: a city token means the project was in that
  //    city, full stop, whereas a show token can be the right brand at the
  //    wrong edition — the CPHI India case study matching CPHI Milan.
  for (const token of distinctiveTokens(clean)) {
    const path = cityPath(token)
    if (path) return { path, how: 'city' }
  }

  // 4. The show it happened at. "<show> stall design" is the query these URLs
  //    ranked for, so the show's landing page is close to the original intent
  //    — but only when the evidence is unambiguous. UNIQUE_TOKEN_SCORE means
  //    a token that belongs to exactly one show; anything weaker has already
  //    proved capable of pairing unrelated events.
  const expo = bestMatch(
    clean,
    expos.map(e => ({ path: `/expos/${e.slug}`, text: `${e.slug} ${e.title}` })),
    UNIQUE_TOKEN_SCORE,
  )
  if (expo && expo.shared.some(t => t.length >= 5)) {
    return { path: expo.path, how: 'expo' }
  }

  return { path: '/portfolio', how: 'fallback' }
}

export function resolveLegacyEvent(slug: string, expos: ExpoCandidate[]): Resolution {
  const clean = slug.toLowerCase().replace(/^\/+|\/+$/g, '')

  if (expos.some(e => e.slug.toLowerCase() === clean)) {
    return { path: `/expos/${clean}`, how: 'exact' }
  }

  // Same bar as the case-study resolver, and for the same reason: "cphi" is
  // unique to one page in the dataset, but that page is CPHI Milan and the
  // old URL was CPHI India. A four-letter brand token shared with one
  // overseas edition is not evidence of the same event.
  const expo = bestMatch(
    clean,
    expos.map(e => ({ path: `/expos/${e.slug}`, text: `${e.slug} ${e.title} ${e.city}` })),
    UNIQUE_TOKEN_SCORE,
  )
  if (expo && expo.shared.some(t => t.length >= 5)) {
    return { path: expo.path, how: 'expo' }
  }

  return { path: '/expos', how: 'fallback' }
}
