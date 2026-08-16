import { NextResponse } from 'next/server'
import expoData from '@/data/expo-pages.json'
import { getLegacyMatchCandidates } from '@/lib/db/portfolio'
import { resolveCaseStudy } from '@/lib/legacy-redirects'
import { cityPageFor } from '@/lib/seo/city-links'
import { SITE_URL } from '@/lib/site-url'

/**
 * The old WordPress case-study URLs. Around fifty of these are still indexed
 * and were returning 404 after the migration, throwing away the topical
 * authority each had earned.
 *
 * This is a route handler rather than a middleware rule because choosing a
 * sensible target needs the live portfolio, and middleware cannot reach the
 * database. The cost is one extra hop for an indexed non-www URL: middleware
 * folds host and trailing slash into a single 301, then this issues the
 * second. Two hops is well inside what Google follows.
 *
 * force-dynamic: the match is computed against the portfolio as it stands,
 * and DATABASE_URL only exists at runtime.
 */
export const dynamic = 'force-dynamic'

const EXPOS = (expoData as { slug: string; title: string; city: string }[]).map(e => ({
  slug: e.slug, title: e.title, city: e.city,
}))

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  let projects: { slug: string; title: string; city: string | null }[] = []
  try {
    projects = await getLegacyMatchCandidates()
  } catch (err) {
    // A database blip must not turn a recoverable 301 into a 500. Matching
    // then falls through to the expo and city rules, which need no database.
    console.error('[legacy] portfolio lookup failed, matching on static data only', err)
  }

  const { path, how } = resolveCaseStudy(slug, projects, EXPOS, city => cityPageFor(city)?.path ?? null)

  console.log(`[legacy] /casestudy/${slug} -> ${path} (${how})`)
  return NextResponse.redirect(`${SITE_URL}${path}`, 301)
}
