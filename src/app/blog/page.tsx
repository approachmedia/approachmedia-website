import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/blog'
import { POST_IMAGES } from '@/lib/blog-links'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb } from '@/lib/seo/organization'
import { SITE_URL } from '@/lib/site-url'

/**
 * Revalidated rather than force-static: posts publish on a date held in their
 * frontmatter, so the set of live posts changes without a deploy. Fifteen
 * minutes is the worst-case lag between a post's date arriving and the index
 * listing it — and /api/revalidate collapses that to zero when the daily
 * publish trigger fires.
 */
export const revalidate = 900

export const metadata: Metadata = {
  title: { absolute: 'Exhibition Stall Design Blog | Costs, Rules & Guides' },
  description:
    'Practical guides on exhibition stall design and fabrication in India — real cost ranges, double-decker approval rules, custom vs modular, and exhibiting abroad.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Exhibition Stall Design Blog | Costs, Rules & Guides',
    description:
      'Practical guides on exhibition stall design and fabrication in India — from the team behind 6000+ stalls.',
    url: `${SITE_URL}/blog`,
  },
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const graph: Record<string, unknown>[] = [
    organizationNode(),
    {
      '@type': 'CollectionPage',
      name: 'Approach Media Blog',
      description: 'Guides on exhibition stall design, fabrication cost and show rules in India.',
      url: `${SITE_URL}/blog`,
      publisher: { '@id': `${SITE_URL}#organization` },
    },
    {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.h1,
        url: `${SITE_URL}/blog/${p.slug}`,
      })),
    },
    breadcrumb([{ name: 'Blog', path: '/blog' }]),
  ]

  return (
    <main>
      <JsonLd graph={graph} />

      <section className="relative isolate overflow-hidden border-b border-white/15 pb-16 pt-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_20%,hsl(var(--brand-blue-glow)/0.16),transparent_55%)]" />
        <div className="container-wide">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">From the workshop floor</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            Exhibition stall design, <span className="text-gradient-brand">explained plainly</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Costs, rules and decisions Indian exhibitors actually face — written from 23+ years and
            6000+ stalls built, not from other people&apos;s blog posts.
          </p>
        </div>
      </section>

      <section className="container-wide py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map(p => {
            const image = POST_IMAGES[p.slug]
            return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/15 bg-surface/40 transition-colors hover:border-brand-blue-glow/50"
              >
                {image ? (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={image.src} alt={image.alt} fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-brand-blue/25 via-background to-brand-green/15 p-8">
                    <span className="text-gradient-brand text-center font-display text-2xl font-semibold leading-snug">
                      {p.h1.split('?')[0]}?
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs text-slate-500">{formatDate(p.datePublished)} · {p.author}</p>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-green-glow">
                    {p.h1}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {p.metaDescription}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
