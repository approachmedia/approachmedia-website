import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { POST_IMAGES, RELATED_EXTRA } from '@/lib/blog-links'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb, faqPage, ORG_LOGO, ORG_NAME } from '@/lib/seo/organization'
import { SITE_URL } from '@/lib/site-url'

// Fully static: every post is generated at build time from content/blog/.
export const dynamic = 'force-static'

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const url = `${SITE_URL}/blog/${post.slug}`
  const image = POST_IMAGES[post.slug]
  return {
    title: { absolute: post.seoTitle },
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      ...(image ? { images: [{ url: image.src, alt: image.alt }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: post.seoTitle,
      description: post.metaDescription,
      ...(image ? { images: [image.src] } : {}),
    },
  }
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const url = `${SITE_URL}/blog/${post.slug}`
  const image = POST_IMAGES[post.slug]
  const related = getAllPosts().filter(p => p.slug !== post.slug)

  const graph: Record<string, unknown>[] = [
    organizationNode(),
    {
      '@type': 'Article',
      headline: post.h1,
      description: post.metaDescription,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      mainEntityOfPage: url,
      url,
      ...(image ? { image: image.src } : {}),
      author: {
        '@type': 'Person',
        name: 'Mehul',
        jobTitle: 'Director',
        worksFor: { '@type': 'Organization', name: ORG_NAME },
      },
      publisher: { '@type': 'Organization', name: ORG_NAME, logo: ORG_LOGO },
    },
    breadcrumb([
      { name: 'Blog', path: '/blog' },
      { name: post.h1, path: `/blog/${post.slug}` },
    ]),
  ]
  if (post.faqs.length > 0) graph.push(faqPage(post.faqs))

  return (
    <main>
      <JsonLd graph={graph} />

      {/* ── Header ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-white/15 pb-12 pt-24 md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_20%,hsl(var(--brand-blue-glow)/0.16),transparent_55%)]" />
        <div className="container-wide max-w-4xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">
            <Link href="/blog" className="transition-colors hover:text-brand-green-glow">Blog</Link>
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {post.h1}
          </h1>
          <p className="mt-5 text-sm text-slate-400">
            {post.author} · {formatDate(post.datePublished)}
          </p>
        </div>
      </section>

      {/* ── Hero image (real project photos only) ──────────── */}
      {image && (
        <div className="container-wide max-w-4xl">
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/15">
            <Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 896px" />
          </div>
        </div>
      )}

      {/* ── Body ───────────────────────────────────────────── */}
      <article className="container-wide max-w-4xl py-12 md:py-16">
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        {/* Author bio */}
        <div className="mt-14 rounded-2xl border border-white/15 bg-surface/40 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-green">About the author</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.authorBio}</p>
        </div>

        {/* Related */}
        <div className="mt-14 border-t border-white/10 pt-10">
          <h2 className="font-display text-xl font-semibold text-foreground md:text-2xl">Related</h2>
          <ul className="mt-5 space-y-3">
            {related.map(r => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="text-brand-green underline underline-offset-4 transition-colors hover:text-brand-green-glow">
                  {r.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link href={RELATED_EXTRA.href} className="text-brand-green underline underline-offset-4 transition-colors hover:text-brand-green-glow">
                {RELATED_EXTRA.anchor}
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </main>
  )
}
