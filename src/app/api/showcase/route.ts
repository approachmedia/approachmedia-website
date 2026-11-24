/**
 * Hero photographs of published projects, for the photo set pieces
 * (components/site/showcase) that run on pages which are otherwise static.
 *
 * Those pages are prerendered at build time, where the database cannot be
 * reached, so the photographs are fetched by the browser from here instead
 * of being baked into the page. Only what a tile needs is returned: the
 * photograph, its alt text, the project title and its portfolio link.
 */
import { getPublishedProjects } from '@/lib/db/portfolio'

export const dynamic = 'force-dynamic'

// next/image refuses hosts that next.config does not list; those go out raw.
const OPTIMISED = ['cdn.approachmedia.in', 'approachmedia.in', 'pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev']

function sized(url: string, w: number) {
  try {
    if (OPTIMISED.includes(new URL(url).hostname)) return `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=70`
  } catch { /* relative or malformed: use as is */ }
  return url
}

export async function GET() {
  try {
    const projects = await getPublishedProjects({ limit: 48 })
    const items = projects
      .filter(p => p.media[0]?.url)
      .map(p => {
        const m = p.media[0]
        const url = m.cdnUrl ?? m.url
        return { src: sized(url, 640), srcLg: sized(url, 1080), alt: m.altText ?? p.title, title: p.title, href: `/portfolio/${p.slug}` }
      })
    return Response.json({ items }, { headers: { 'cache-control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' } })
  } catch {
    return Response.json({ items: [] }, { headers: { 'cache-control': 'no-store' } })
  }
}
