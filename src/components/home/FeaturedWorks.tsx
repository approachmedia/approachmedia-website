import Image from 'next/image'
import Link from 'next/link'
import { getPublishedProjects } from '@/lib/db/portfolio'

/**
 * Featured Works — premium dark editorial section near the top of the home
 * page. Server component: pulls the top 4 published projects (featured
 * first) from the database, using each project's hero image and primary
 * industry as the tag. The lower FeaturedProjects section skips these four
 * so the homepage never repeats a project.
 */

type FeaturedWork = {
  title: string
  slug?: string | null
  image: string
  tag?: string | null
}

export async function FeaturedWorks() {
  let works: FeaturedWork[] = []
  try {
    const rows = await getPublishedProjects({ limit: 12 })
    works = rows
      .filter(p => p.media[0]?.url)
      .slice(0, 4)
      .map(p => ({
        title: p.title,
        slug:  p.slug,
        image: p.media[0].url,
        tag:   p.industries[0]?.industry?.name ?? null,
      }))
  } catch {
    // DB unreachable — skip the section rather than crash the homepage.
  }

  if (works.length === 0) return null

  return (
    <section className="bg-[#0e0e0e] px-[6vw] py-24 text-[#f4f1ea] md:py-32">
      <div className="mb-20 flex flex-wrap items-start justify-between gap-10">
        <h2 className="font-serif text-5xl font-normal leading-none md:text-7xl">
          Featured
          <br />
          Works
        </h2>

        <div className="relative max-w-2xl text-left md:text-right">
          <span className="block font-serif text-7xl leading-[0.9] tracking-[-0.03em] text-[#b6a06a] md:text-[10rem]">
            Proud
            <br />
            Works
          </span>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#cfcabf] md:absolute md:right-0 md:top-2 md:mt-0 md:text-left">
            A closer look at exhibition stands, brand spaces, and trade show
            experiences we have built for leading brands.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {works.map(project => {
          const content = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-neutral-900">
                <Image
                  src={project.image}
                  alt={`${project.title} — exhibition stall by Approach Media`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#b6a06a]">
                <span className="mr-2">•</span>
                {project.tag || 'Exhibition Design'}
              </p>

              <h3 className="mt-2 font-serif text-2xl font-normal leading-tight text-[#f4f1ea] md:text-3xl">
                {project.title}
              </h3>
            </>
          )

          if (project.slug) {
            return (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group block"
              >
                {content}
              </Link>
            )
          }

          return (
            <article key={project.title} className="group block">
              {content}
            </article>
          )
        })}
      </div>
    </section>
  )
}
