import { getAllPosts } from '@/lib/blog'
import { SITE_URL } from '@/lib/site-url'

/**
 * RSS 2.0 feed for the blog.
 *
 * Consumed by the social-automation pipeline (RSS → captions → posting APIs),
 * so it carries the full rendered HTML of each post via content:encoded, not
 * just the description.
 *
 * force-static: built once per deploy. pubDate comes from each post's
 * frontmatter, so the feed is byte-stable between deploys — same discipline
 * as the sitemap's lastmod.
 */
export const dynamic = 'force-static'

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** RFC 822 date at a fixed morning IST offset, as RSS requires. */
function rfc822(iso: string) {
  return new Date(`${iso}T09:00:00+05:30`).toUTCString()
}

export function GET() {
  const posts = getAllPosts()

  const items = posts
    .map(p => {
      const url = `${SITE_URL}/blog/${p.slug}`
      // Feed readers resolve nothing — every URL in the content must be absolute.
      const html = p.html
        .replace(/href="\//g, `href="${SITE_URL}/`)
        .replace(/src="\//g, `src="${SITE_URL}/`)
      return `    <item>
      <title>${esc(p.seoTitle)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.datePublished)}</pubDate>
      <description>${esc(p.metaDescription)}</description>
      <content:encoded><![CDATA[${html.replace(/\]\]>/g, ']]]]><![CDATA[>')}]]></content:encoded>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Approach Media Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Guides on exhibition stall design and fabrication in India — costs, rules and decisions, from 23+ years and 6000+ stalls built.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  })
}
