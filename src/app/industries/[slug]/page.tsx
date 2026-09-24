import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { INDUSTRY_BY_SLUG, INDUSTRY_PAGES, isLikelyPlaylistId } from '@/content/industries'
import PlaylistEmbed from '@/components/industries/PlaylistEmbed'
import { getProjectsForIndustries } from '@/lib/db/portfolio'
import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb, faqPage } from '@/lib/seo/organization'

/**
 * One editorial page per industry, in the order the brief's README sets out:
 * breadcrumb, hero, selected projects, design approach, exhibitions, the
 * shared service module, FAQ, enquiry.
 *
 * Two departures from the draft, both required by its own rules:
 *
 *  · Project cards come from the database, not from the two or three example
 *    projects the draft names per page. The README says each card must be
 *    checked against its project record before publishing, which cannot be
 *    done from here; drawing them live means every card carries a real
 *    client, exhibition, city, year and photograph, and none can rot.
 *  · The "Upcoming Exhibitions" group is not built. The README is explicit
 *    that upcoming editions must be verified with the organiser first and
 *    that historical events must never be presented as confirmed future
 *    appearances. So the page shows only "Exhibitions Featured in Our Work",
 *    drawn from the shows those real projects were actually built for.
 */

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return INDUSTRY_PAGES.map(i => ({ slug: i.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const page = INDUSTRY_BY_SLUG.get(slug)
  if (!page) return {}
  return {
    title: { absolute: page.title },
    description: page.meta,
    alternates: { canonical: `${SITE_URL}/industries/${slug}` },
    openGraph: { title: page.title, description: page.meta, url: `${SITE_URL}/industries/${slug}` },
  }
}

export default async function IndustryEditorialPage({ params }: Props) {
  const { slug } = await params
  const page = INDUSTRY_BY_SLUG.get(slug)
  if (!page) notFound()

  // Never fail the page over the database: an unreachable one costs the
  // project strip, not the copy.
  let projects: Awaited<ReturnType<typeof getProjectsForIndustries>> = []
  try { projects = await getProjectsForIndustries(page.sourceSlugs, 6) } catch { /* copy only */ }

  // The shows these real projects were built for. Historical, and labelled as
  // such — never presented as a future appearance.
  const shows = [...new Map(
    projects
      .filter(p => p.exhibition?.name)
      .map(p => [p.exhibition!.name, { name: p.exhibition!.name, city: p.exhibition!.city, year: p.buildYear }]),
  ).values()]

  const faqs = [{ q: page.faq, a: page.answer }]

  // Only ids that could be ids at all. Nothing here can tell whether a real
  // id points at a real playlist, so that is left to the owner to spot-check.
  const playlists = (page.playlists ?? []).filter(pl => isLikelyPlaylistId(pl.id))

  return (
    <main>
      <JsonLd graph={[
        organizationNode(),
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: page.name, path: `/industries/${page.slug}` },
        ]),
        faqPage(faqs),
      ]} />

      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="border-b border-white/10">
        <ol className="container-wide flex flex-wrap items-center gap-2 py-4 text-xs text-slate-500">
          <li><Link href="/" className="hover:text-slate-300">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/industries" className="hover:text-slate-300">Industries</Link></li>
          <li aria-hidden>/</li>
          <li className="text-slate-300">{page.name}</li>
        </ol>
      </nav>

      {/* ── Hero ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h1 className="max-w-4xl font-display text-3xl font-black leading-[1.08] text-white md:text-5xl">
            {page.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold text-white/90">{page.tagline}</p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{page.intro}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
              Request a Proposal
            </Link>
            <Link href={`/portfolio/industry/${page.sourceSlugs[0]}`} className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── Selected projects ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Selected {page.name} Exhibition Projects
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{page.gallery}</p>

          {projects.length > 0 ? (
            <>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map(p => {
                  const hero = p.media[0]
                  // README's card template: [Client] at [Exhibition], [City] · [Year]
                  const where = [p.exhibition?.name, p.city ?? p.exhibition?.city].filter(Boolean).join(', ')
                  const caption = [p.client?.name, where].filter(Boolean).join(' at ')
                  return (
                    <li key={p.id}>
                      <Link href={`/portfolio/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-white/12 bg-surface/40 transition hover:border-brand-green/50">
                        <div className="relative aspect-[4/3] bg-white/[0.04]">
                          {hero?.url && (
                            <Image
                              src={hero.url}
                              alt={hero.altText || `${p.client?.name ?? 'Approach Media'} exhibition stand at ${p.exhibition?.name ?? 'an exhibition'}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          )}
                        </div>
                        <div className="p-5">
                          <p className="text-sm font-semibold text-white">{caption}{p.buildYear ? ` · ${p.buildYear}` : ''}</p>
                          {(p.stallAreaSqm || p.stallTypes[0]) && (
                            <p className="mt-1.5 text-xs text-slate-400">
                              {[p.stallAreaSqm ? `${Number(p.stallAreaSqm)} sqm` : null, p.stallTypes[0]?.stallType.name].filter(Boolean).join(' · ')}
                            </p>
                          )}
                          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                            View Project
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                          </span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <Link href={`/portfolio/industry/${page.sourceSlugs[0]}`} className="mt-10 inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
                View More Projects
              </Link>
            </>
          ) : (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-400">
              We have not published work in this sector yet. Tell us about your exhibition and we
              will discuss a design brief for it.{' '}
              <Link href="/portfolio" className="text-brand-green underline underline-offset-4 hover:text-brand-green-glow">
                Browse every stall we have built
              </Link>.
            </p>
          )}
        </div>
      </section>

      {/* ── Video, only where a playlist has been supplied ── */}
      {playlists.length > 0 && (
        <section className="border-b border-white/10">
          <div className="container-wide py-16 md:py-24">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              {page.name} Stands on Video
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
              Walkthroughs of stands we have built for this sector, so you can judge the finish,
              the lighting and the scale for yourself before we talk.
            </p>
            <div className={`mt-10 grid gap-6 ${playlists.length > 1 ? 'lg:grid-cols-2' : 'lg:max-w-4xl'}`}>
              {playlists.map((pl, i) => (
                <div key={pl.id + i}>
                  <PlaylistEmbed
                    playlistId={pl.id}
                    title={pl.label}
                    poster={projects[i]?.media[0]?.url ?? projects[0]?.media[0]?.url}
                    posterAlt={projects[i]?.media[0]?.altText ?? projects[0]?.media[0]?.altText ?? ''}
                  />
                  <a
                    href={`https://www.youtube.com/playlist?list=${pl.id}`}
                    target="_blank"
                    rel="noopener"
                    className="mt-3 inline-block text-sm font-semibold text-brand-green transition hover:text-brand-green-glow"
                  >
                    Watch on YouTube
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Approach ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">{page.h2}</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-300">{page.body}</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-surface/40 p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Display priorities we can discuss
              </p>
              <ul className="mt-5 space-y-3.5">
                {page.features.map(f => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exhibitions (historical only) ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Planning Your Next {page.name} Exhibition?
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{page.event}</p>

          {shows.length > 0 && (
            <>
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Exhibitions featured in our work
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {shows.map(s => (
                  <li key={s.name} className="rounded-lg border border-white/12 bg-surface/40 px-4 py-2 text-sm text-slate-300">
                    {s.name}{s.city ? <span className="text-slate-500"> · {s.city}</span> : null}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
              Plan Your Stall
            </Link>
            <Link href="/tradeshow-calendar" className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
              India Trade Show Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* ── Shared service module ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            One Team From Design to Delivery
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
            Approach Media brings exhibition stall design, fabrication and on-site execution
            together. We begin with your brief, develop the concept and layout, and coordinate the
            build around the agreed exhibition requirements.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Brief and space planning', c: 'Define the audience, products, meeting needs and stall layout.', href: '/services/exhibition-stall-design' },
              { t: 'Concept and 3D design',    c: 'Review the proposed space before moving into production.',      href: '/services/exhibition-stall-design' },
              { t: 'Fabrication and finishing', c: 'Translate the approved design into the physical stand.',        href: '/services/custom-booth-fabrication' },
              { t: 'Installation and dismantling', c: 'Coordinate the on-site build and post-exhibition removal within the agreed scope.', href: '/services/turnkey-project-management' },
            ].map(s => (
              <Link key={s.t} href={s.href} className="group rounded-2xl border border-white/12 bg-surface/40 p-6 transition hover:border-brand-green/50">
                <h3 className="font-display text-base font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.c}</p>
              </Link>
            ))}
          </div>
          <Link href="/contact" className="mt-10 inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
            Discuss Your Exhibition Brief
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">Frequently Asked Questions</h2>
          <div className="mt-8 max-w-3xl space-y-6">
            {faqs.map(f => (
              <div key={f.q} className="rounded-2xl border border-white/12 bg-surface/40 p-7">
                <h3 className="font-display text-base font-semibold text-white">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section>
        <div className="container-wide py-16 md:py-24">
          <h2 className="max-w-3xl font-display text-2xl font-bold text-white md:text-3xl">{page.cta}</h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">{page.closing}</p>
          <Link href="/contact" className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
            Request a Proposal
          </Link>
          <p className="mt-10 text-sm text-slate-500">
            <Link href="/industries" className="hover:text-slate-300">← All industries</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
