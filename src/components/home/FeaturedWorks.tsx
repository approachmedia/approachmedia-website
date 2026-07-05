import Image from 'next/image'
import Link from 'next/link'
import { getPublishedProjects } from '@/lib/db/portfolio'

/**
 * Featured Works — premium dark editorial section (replaces the old
 * "Featured projects" grid). Layout mirrors the approved reference:
 *
 *  - Header: "Featured Works" left; big gold serif "Proud / Works" right,
 *    with the small description sitting beside "Proud" (never overlapping).
 *  - Staggered two-column grid: the right column starts lower and its first
 *    image is tall (3/4), so the columns interlock like the sample.
 *  - Footer row: big "All Works →" link to /portfolio plus a small teaser
 *    image from the next project in line.
 *
 * Server component: top published projects (featured first) from the DB;
 * hero image + primary industry tag + short "Client — Exhibition" title.
 */

const GOLD  = 'text-[#b6a06a]'
const CREAM = 'text-[#f4f1ea]'

// interlocking ratios, in card order: L1, R1 (tall), L2, R2
const RATIOS = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/3]']

type Work = {
  title: string
  slug: string | null
  image: string
  tag: string | null
}

export async function FeaturedWorks() {
  let works: Work[] = []
  try {
    const rows = (await getPublishedProjects({ limit: 12 })).filter(p => p.media[0]?.url)
    works = rows.slice(0, 5).map(p => ({
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

  if (works.length < 4) return null
  const cards  = works.slice(0, 4)
  const teaser = works[4] ?? works[0]

  return (
    <section id="portfolio" className="bg-[#0e0e0e] px-[6vw] py-24 md:py-32">

      {/* ── Header ── */}
      <div className="mb-16 grid gap-10 md:mb-24 md:grid-cols-[auto_1fr] md:items-start">
        <h2 className={`font-serif text-4xl font-normal leading-[1.05] md:text-6xl ${CREAM}`}>
          Featured
          <br />
          Works
        </h2>

        <div className="md:justify-self-end">
          {/* "Proud" + description side by side — no overlap */}
          <div className="flex flex-wrap items-start justify-between gap-6 md:justify-end md:gap-10">
            <span className={`font-serif text-7xl leading-[0.85] tracking-[-0.03em] md:text-[9rem] ${GOLD}`}>
              Proud
            </span>
            <p className="max-w-[13rem] pt-2 text-xs leading-relaxed text-[#cfcabf]">
              A closer look at exhibition stands, brand spaces, and trade show
              experiences we have built for leading brands.
            </p>
          </div>
          <span className={`mt-1 block text-right font-serif text-7xl leading-[0.85] tracking-[-0.03em] md:text-[9rem] ${GOLD}`}>
            Works
          </span>
        </div>
      </div>

      {/* ── Staggered grid: right column starts lower ── */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        <div className="flex flex-col gap-y-14">
          {[cards[0], cards[2]].map((p, col) => (
            <WorkCard key={p.slug ?? p.title} project={p} ratio={RATIOS[col * 2]} />
          ))}
        </div>
        <div className="flex flex-col gap-y-14 md:pt-28">
          {[cards[1], cards[3]].map((p, col) => (
            <WorkCard key={p.slug ?? p.title} project={p} ratio={RATIOS[col * 2 + 1]} />
          ))}
        </div>
      </div>

      {/* ── All Works footer ── */}
      <div className="mt-20 flex items-center justify-between gap-8 border-t border-white/10 pt-12 md:mt-28">
        <Link
          href="/portfolio"
          className="group inline-flex items-baseline gap-4 font-serif text-5xl leading-none text-[#8a857a] transition-colors hover:text-[#b6a06a] md:text-8xl"
        >
          All Works
          <span aria-hidden className="text-4xl transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">→</span>
        </Link>
        <Link href="/portfolio" className="relative hidden aspect-[4/3] w-44 shrink-0 overflow-hidden rounded-md bg-neutral-900 md:block">
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
      <div className={`relative ${ratio} overflow-hidden rounded-md bg-neutral-900`}>
        <Image
          src={project.image}
          alt={`${project.title} — exhibition stall by Approach Media`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <p className={`mt-5 text-xs font-semibold uppercase tracking-[0.16em] ${GOLD}`}>
        <span className="mr-2">•</span>
        {project.tag || 'Exhibition Design'}
      </p>

      <h3 className={`mt-2 font-serif text-2xl font-normal leading-tight md:text-3xl ${CREAM}`}>
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
