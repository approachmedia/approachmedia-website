import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { POST_IMAGES } from '@/lib/blog-links'

/**
 * Three most recent blog posts on the homepage.
 *
 * The point is internal linking, not freshness. The homepage carries the most
 * authority and is crawled most often; without this, every post sat three
 * clicks away behind /blog and inherited link equity filtered through an
 * index page. Direct links make them two clicks and speed up discovery of new
 * posts considerably.
 *
 * Reads from the same source as /blog, so it follows every deploy with no
 * maintenance — add a post, it appears here.
 */
const COUNT = 3

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  })
}

export function LatestPosts() {
  const posts = getAllPosts().slice(0, COUNT)
  if (posts.length === 0) return null

  return (
    <section className="border-t border-white/15 py-20 md:py-28">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-green">From the blog</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Costs, rules and decisions, <span className="text-gradient-brand">explained plainly</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue-glow transition-colors hover:text-brand-green-glow"
          >
            All articles
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map(post => {
            const image = POST_IMAGES[post.slug]
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-surface/40 transition-colors hover:border-brand-blue-glow/50"
              >
                {image ? (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  // Posts with no cleared project photo get the typographic
                  // treatment rather than a stock image.
                  <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-blue/25 via-background to-brand-green/15 p-6">
                    <span className="text-gradient-brand text-center font-display text-lg font-semibold leading-snug">
                      {post.h1.split(':')[0]}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-slate-500">{formatDate(post.datePublished)}</p>
                  <h3 className="mt-2 line-clamp-3 font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-green-glow">
                    {post.h1}
                  </h3>
                  <span className="mt-4 text-sm font-medium text-brand-green">Read the guide →</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
