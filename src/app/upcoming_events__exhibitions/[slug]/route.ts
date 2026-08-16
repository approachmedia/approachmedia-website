import { NextResponse } from 'next/server'
import expoData from '@/data/expo-pages.json'
import { resolveLegacyEvent } from '@/lib/legacy-redirects'
import { SITE_URL } from '@/lib/site-url'

/**
 * The old WordPress events calendar. These URLs were answering 403 rather
 * than 404, which tells Google "you are forbidden here" — a state it treats
 * as a possible misconfiguration and keeps retrying, burning crawl budget
 * instead of moving on.
 *
 * They map onto the /expos section, which serves the same intent, so each one
 * goes to its matching show page where the name is recognisable and to the
 * /expos index otherwise. The sibling path /exhibitions/list is a plain
 * prefix with no show name in it, so middleware handles that one directly.
 */
export const dynamic = 'force-static'

const EXPOS = (expoData as { slug: string; title: string; city: string }[]).map(e => ({
  slug: e.slug, title: e.title, city: e.city,
}))

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const { path, how } = resolveLegacyEvent(slug, EXPOS)

  console.log(`[legacy] /upcoming_events__exhibitions/${slug} -> ${path} (${how})`)
  return NextResponse.redirect(`${SITE_URL}${path}`, 301)
}
