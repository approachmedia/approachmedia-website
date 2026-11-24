import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { INDUSTRY_BY_SLUG, INDUSTRY_PAGES, isLikelyPlaylistId } from '@/content/industries'
import PlaylistEmbed from '@/components/industries/PlaylistEmbed'
import VideoGrid from '@/components/industries/VideoGrid'
import { getVideosForPlaylists } from '@/lib/youtube'
import { SECTOR_VIDEOS } from '@/content/sector-videos'
import { getProjectsForIndustries } from '@/lib/db/portfolio'
import { SITE_URL } from '@/lib/site-url'
import JsonLd from '@/components/seo/JsonLd'
import { organizationNode, breadcrumb, faqPage } from '@/lib/seo/organization'
import { socialImage } from '@/lib/seo/social-image'
import { industryCover } from '@/content/industry-covers'
import ScrollLit from '@/components/portfolio/ScrollLit'
import SectorHero from '@/components/industries/detail/SectorHero'
import ParallaxProjects from '@/components/industries/detail/ParallaxProjects'
import CircleClose from '@/components/industries/detail/CircleClose'
import '@/components/industries/detail/industry-detail.css'

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
    openGraph: { title: page.title, description: page.meta, url: `${SITE_URL}/industries/${slug}`,
      ...socialImage().openGraph },
    twitter: socialImage().twitter,
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

  // The owner's exported lists are the source. The API is consulted only when
  // YOUTUBE_API_KEY is set, and then wins, so a channel that has moved on is
  // not held to an export; without a key it returns nothing and costs nothing.
  const exported = SECTOR_VIDEOS[page.slug] ?? []
  // 50 is the API's own page size, and above every playlist's current length.
  const live = playlists.length > 0
    ? await getVideosForPlaylists(playlists.map(pl => pl.id), 50)
    : []
  // Both sources normalised to the same shape; the exported rows carry no
  // thumbnail, which is derivable from the video id.
  const source: { id: string; title: string; thumb: string }[] =
    live.length > 0
      ? live
      : exported.map(v => ({ ...v, thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` }))
  // Every video in the sector. VideoGrid folds the tail away past the first
  // twelve rather than dropping any.
  const videos = source

  // Photographs, all the site's own: the sector's cover from the industries
  // set, then the hero photograph of each published project in the sector.
  const cover = industryCover(page.slug, page.name)
  const projectShots = projects
    .map(p => p.media[0])
    .filter(m => !!m?.url)
    .map(m => ({ src: m!.url, alt: m!.altText || `${page.name} exhibition stand by Approach Media` }))
  const shots = [...(cover ? [cover] : []), ...projectShots]
    .filter((s, i, a) => a.findIndex(o => o.src === s.src) === i)
    .slice(0, 6)
  const approachPhoto = projectShots[1] ?? projectShots[0] ?? cover
  const closePhoto = projectShots[0] ?? cover

  return (
    <main className="idx">
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
      <SectorHero name={page.name} headline={page.headline} shots={shots}>
        <p className="mt-6 max-w-2xl text-lg font-semibold text-white/90">{page.tagline}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{page.intro}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/contact" data-magnetic className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
            Request a Proposal
          </Link>
          <Link href={`/portfolio/industry/${page.sourceSlugs[0]}`} data-magnetic className="am-liquid inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
            View Projects
          </Link>
        </div>
      </SectorHero>

      {/* ── Selected projects ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h2 className="idr-h font-display text-2xl font-bold text-white md:text-4xl">
            Selected {page.name} Exhibition Projects
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{page.gallery}</p>

          {projects.length > 0 ? (
            <>
              <ParallaxProjects>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map(p => {
                  const hero = p.media[0]
                  // README's card template: [Client] at [Exhibition], [City] · [Year]
                  const where = [p.exhibition?.name, p.city ?? p.exhibition?.city].filter(Boolean).join(', ')
                  const caption = [p.client?.name, where].filter(Boolean).join(' at ')
                  return (
                    <li key={p.id}>
                      <Link href={`/portfolio/${p.slug}`} className="am-spot group block overflow-hidden rounded-2xl border border-white/12 bg-surface/40 transition hover:border-brand-green/50">
                        <div className="idp-media relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
                          {hero?.url && (
                            <Image
                              src={hero.url}
                              alt={hero.altText || `${p.client?.name ?? 'Approach Media'} exhibition stand at ${p.exhibition?.name ?? 'an exhibition'}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                            />
                          )}
                        </div>
                        <div className="idp-copy p-5">
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
              </ParallaxProjects>
              <Link href={`/portfolio/industry/${page.sourceSlugs[0]}`} data-magnetic className="mt-10 inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
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

      {/* ── Video ── */}
      {playlists.length > 0 && (
        <section className="border-b border-white/10">
          <div className="container-wide py-16 md:py-24">
            <h2 className="idr-h font-display text-2xl font-bold text-white md:text-4xl">
              {page.name} Stands on Video
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
              Walkthroughs of stands we have built for this sector, so you can judge the finish,
              the lighting and the scale for yourself before we talk.
            </p>

            {videos.length > 0 ? (
              <VideoGrid videos={videos} />
            ) : (
              /* No API key, or the API could not answer: the playlist itself,
                 which needs neither. */
              <div className={`mt-10 grid gap-6 ${playlists.length > 1 ? 'lg:grid-cols-2' : 'lg:max-w-4xl'}`}>
                {playlists.map((pl, i) => (
                  <PlaylistEmbed
                    key={pl.id + i}
                    playlistId={pl.id}
                    title={pl.label}
                    poster={projects[i]?.media[0]?.url ?? projects[0]?.media[0]?.url}
                    posterAlt={projects[i]?.media[0]?.altText ?? projects[0]?.media[0]?.altText ?? ''}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {playlists.map((pl, i) => (
                <a
                  key={pl.id + i}
                  href={`https://www.youtube.com/playlist?list=${pl.id}`}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-semibold text-brand-green transition hover:text-brand-green-glow"
                >
                  {playlists.length > 1 ? `${pl.label} on YouTube` : 'Watch the full playlist on YouTube'}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Approach ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <div className={approachPhoto ? 'ida' : ''}>
            {approachPhoto && (
              <div className="ida-photo">
                <Image src={approachPhoto.src} alt={approachPhoto.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}
            <div>
              <h2 className="idr-h font-display text-2xl font-bold text-white md:text-4xl">{page.h2}</h2>
              {/* Lights up word by word as it scrolls through the screen. */}
              <ScrollLit text={page.body} className="mt-5 text-lg leading-relaxed text-slate-200 md:text-xl" />
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Display priorities we can discuss
              </p>
              <ul className="ida-list">
                <span className="ida-line" aria-hidden="true"><i /></span>
                {page.features.map(f => (
                  <li key={f} className="text-base leading-relaxed text-slate-300">
                    <span className="ida-tick" aria-hidden="true"><Check className="h-4 w-4" /></span>
                    <span className="pt-0.5">{f}</span>
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
          <h2 className="idr-h font-display text-2xl font-bold text-white md:text-4xl">
            Planning Your Next {page.name} Exhibition?
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">{page.event}</p>

          {shows.length > 0 && (
            <>
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">
                Exhibitions featured in our work
              </p>
              {/* A hand of tickets, fanning out as it arrives. */}
              <ul className="ids">
                {shows.map((s, i) => (
                  <li key={s.name} style={{ '--k': ((shows.length - 1) / 2 - i) / Math.max(1, shows.length - 1) * 2 } as React.CSSProperties}>
                    <span className="ids-stub" aria-hidden="true" />
                    <span className="ids-name">
                      {s.name}{s.city ? <span> · {s.city}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" data-magnetic className="inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
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
          <h2 className="idr-h font-display text-2xl font-bold text-white md:text-4xl">
            One Team From Design to Delivery
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
            Approach Media brings exhibition stall design, fabrication and on-site execution
            together. We begin with your brief, develop the concept and layout, and coordinate the
            build around the agreed exhibition requirements.
          </p>
          {/* A line drawn across the four steps, each lighting as it passes. */}
          <div className="isv">
          <div className="isv-rail" aria-hidden="true">
            <i />
            {[0, 1, 2, 3].map(n => <b key={n} style={{ left: `${12.5 + n * 25}%`, '--n': n } as React.CSSProperties} />)}
          </div>
          <div className="isv-cards grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Brief and space planning', c: 'Define the audience, products, meeting needs and stall layout.', href: '/services/exhibition-stall-design' },
              { t: 'Concept and 3D design',    c: 'Review the proposed space before moving into production.',      href: '/services/exhibition-stall-design' },
              { t: 'Fabrication and finishing', c: 'Translate the approved design into the physical stand.',        href: '/services/custom-booth-fabrication' },
              { t: 'Installation and dismantling', c: 'Coordinate the on-site build and post-exhibition removal within the agreed scope.', href: '/services/turnkey-project-management' },
            ].map((s, n) => (
              <Link key={s.t} href={s.href} style={{ '--n': n } as React.CSSProperties} className="am-spot group rounded-2xl border border-white/12 bg-surface/40 p-6 transition hover:border-brand-green/50">
                <h3 className="font-display text-base font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.c}</p>
              </Link>
            ))}
          </div>
          </div>
          <Link href="/contact" data-magnetic className="mt-10 inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10">
            Discuss Your Exhibition Brief
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-white/10">
        <div className="container-wide py-16 md:py-24">
          <h2 className="idr-h font-display text-2xl font-bold text-white md:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 max-w-3xl space-y-6">
            {faqs.map(f => (
              <div key={f.q} className="am-spot rounded-2xl border border-white/12 bg-surface/40 p-7">
                <h3 className="font-display text-base font-semibold text-white">{f.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close: a project photograph opens from a circle beneath it ── */}
      <CircleClose photo={closePhoto}>
        <h2 className="max-w-3xl font-display text-3xl font-bold text-white md:text-5xl">{page.cta}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 md:text-lg">{page.closing}</p>
        <Link href="/contact" data-magnetic className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-brand-green px-7 text-sm font-semibold text-accent-foreground transition hover:bg-brand-green-glow">
          Request a Proposal
        </Link>
        <p className="mt-10 text-sm text-slate-300">
          <Link href="/industries" className="hover:text-white">← All industries</Link>
        </p>
      </CircleClose>
    </main>
  )
}
