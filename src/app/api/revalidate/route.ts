import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAllPosts, getScheduledPosts, todayInIndia } from '@/lib/blog'

/**
 * POST /api/revalidate  body: { secret: string; slug?: string; scope?: Scope }
 *
 * Two callers:
 *  - the admin publish flow, passing a portfolio `slug`;
 *  - the daily publish scheduler (lib/publish-scheduler.ts), which fires just
 *    after midnight IST so a blog post dated today goes live at once instead
 *    of waiting for its ISR window to lapse.
 *
 * The response reports the blog schedule, so the scheduler's log line is a
 * record of what was live and what is still pending on that date.
 */

type Scope = 'portfolio' | 'blog' | 'all'

const BLOG_PATHS = ['/blog', '/feed.xml', '/sitemap.xml', '/'] as const

export async function POST(request: NextRequest) {
  const { slug, secret, scope = 'all' } = (await request.json()) as {
    slug?: string
    secret?: string
    scope?: Scope
  }

  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (scope === 'portfolio' || scope === 'all') {
    if (slug) revalidatePath(`/portfolio/${slug}`)
    revalidatePath('/portfolio')
    revalidatePath('/portfolio/industry/[slug]', 'page')
    revalidatePath('/portfolio/type/[slug]', 'page')
  }

  if (scope === 'blog' || scope === 'all') {
    for (const p of BLOG_PATHS) revalidatePath(p)
    // Every post page at once: a newly published post changes the Related
    // block on all the others, not just its own page.
    revalidatePath('/blog/[slug]', 'page')
  }

  return NextResponse.json({
    revalidated: true,
    scope,
    today: todayInIndia(),
    published: getAllPosts().map(p => p.slug),
    scheduled: getScheduledPosts(),
  })
}
