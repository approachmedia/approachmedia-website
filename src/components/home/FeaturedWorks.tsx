import Image from 'next/image'
import Link from 'next/link'
import { getPublishedProjects } from '@/lib/db/portfolio'

/**
 * Featured Works — editorial portfolio section (replaces the old
 * "Featured projects" grid), styled to match the rest of the site:
 * site background, display font, brand blue→green gradient on the big
 * "Proud / Works" type (same treatment as "Impossible to Ignore").
 *
 *  - Header: "Featured Works" left; huge gradient "Proud / Works" right,
 *    with the small description sitting beside "Proud" (never overlapping).
 *  - Staggered two-column grid: the right column starts lower and its first
 *    image is tall (3/4), so the columns interlock.
 *  - Footer row: big "All Works →" link to /portfolio plus a small teaser
 *    image from the next project in line.
 *
 * Server component: top published projects (featured first) from the DB;
 * hero image + primary industry tag + short "Client — Exhibition" title.
 */

// interlocking ratio cycles per column (left / right)
const LEFT_RATIOS  = ['aspect-[4/3]', 'aspect-[4/5]']
const RIGHT_RATIOS = ['aspect-[3/4]', 'aspect-[4/3]']

type Work = {
  title: string
  slug: string | null
  image: string
  tag: string | null
}

export async function FeaturedWorks() {
  let works: Work[] = []
  try {
    // Every project marked ★ Featured in the admin (with a hero image)
    const rows = (await getPublishedProjects({ featured: true })).filter(p => p.media[0]?.url)
    works = rows.map(p => ({
      // Short editorial title ("Sun Pharma — CPHI India 2024"), not the long SEO one
      title: p.client?.name
        ? [p.client.name, p.exhibition?.name ?? p.buildYear].filter(Boolean).join(' — ')
        : p.title,
      slug:  p.slug,
      image: p.media[0].url,
      tag:   p.industries[0]?.industry?.name ?? null,
    }))
  } catch {
    // DB unreachable — skip the section rather than crash the homepage.
  }

  if (works.length === 0) return null
  const leftCards  = works.filter((_, i) => i % 2 === 0)
  const rightCards = works.filter((_, i) => i % 2 === 1)
  const teaser     = works[0]

  return (
    <section id="portfolio" className="px-[6vw] py-20 md:py-28">

      {/* ── Header ── */}
      <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-[auto_1fr] md:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Featured projects</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-foreground md:text-6xl">
            Featured
            <br />
            Works
          </h2>
        </div>

        <div className="md:justify-self-end">
          {/* "Proud" + description side by side — no overlap */}
          <div className="flex flex-wrap items-start justify-between gap-6 md:justify-end md:gap-10">
            <span className="text-gradient-brand font-display text-7xl font-semibold leading-[0.9] tracking-[-0.03em] md:text-[8.5rem]">
              Proud
            </span>
            <p className="max-w-[13rem] pt-2 text-xs leading-relaxed text-muted-foreground">
              A closer look at exhibition stands, brand spaces, and trade show
              experiences we have built for leading brands.
            </p>
          </div>
          <span className="text-gradient-brand mt-1 block text-right font-display text-7xl font-semibold leading-[0.9] tracking-[-0.03em] md:text-[8.5rem]">
            Works
          </span>
        </div>
      </div>

      {/* ── Staggered grid: right column starts lower ── */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        <div className="flex flex-col gap-y-14">
          {leftCards.map((p, i) => (
            <WorkCard key={p.slug ?? p.title} project={p} ratio={LEFT_RATIOS[i % LEFT_RATIOS.length]} />
          ))}
        </div>
        <div className="flex flex-col gap-y-14 md:pt-28">
          {rightCards.map((p, i) => (
            <WorkCard key={p.slug ?? p.title} project={p} ratio={RIGHT_RATIOS[i % RIGHT_RATIOS.length]} />
          ))}
        </div>
      </div>

      {/* ── All Works footer ── */}
      <div className="mt-20 flex items-center justify-between gap-8 border-t border-white/10 pt-12 md:mt-28">
        <Link
          href="/portfolio"
          className="group inline-flex items-baseline gap-4 font-display text-5xl font-semibold leading-none text-muted-foreground transition-colors hover:text-brand-green-glow md:text-8xl"
        >
          All Works
          <span aria-hidden className="text-4xl transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">→</span>
        </Link>
        <Link href="/portfolio" className="relative hidden aspect-[4/3] w-44 shrink-0 overflow-hidden rounded-md border border-white/10 bg-surface md:block">
          <Image
            src={teaser.image}
            alt="View all exhibition stall projects by Approach Media"
            fill
            sizes="176px"
            className="object-cover"
          />
        </Link>
      </div>
    </section>
  )
}

function WorkCard({ project, ratio }: { project: Work; ratio: string }) {
  const content = (
    <>
      <div className={`relative ${ratio} overflow-hidden rounded-md border border-white/10 bg-surface`}>
        <Image
          src={project.image}
          alt={`${project.title} — exhibition stall by Approach Media`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
        <span className="mr-2">•</span>
        {project.tag || 'Exhibition Design'}
      </p>

      <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-brand-green-glow md:text-3xl">
        {project.title}
      </h3>
    </>
  )

  return project.slug ? (
    <Link href={`/portfolio/${project.slug}`} className="group block">{content}</Link>
  ) : (
    <article className="group block">{content}</article>
  )
}
