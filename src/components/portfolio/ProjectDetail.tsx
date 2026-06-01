import Image from 'next/image'
import Link from 'next/link'
import type { ProjectWithRelations } from '@/lib/seo/schema-generator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

// ── Stat chip ──────────────────────────────────────────────────

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center px-5 py-4 rounded-xl bg-slate-800/60 border border-slate-700">
      <p className="text-2xl font-display font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
        {value}
      </p>
      <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{label}</p>
    </div>
  )
}

// ── Tag pill ───────────────────────────────────────────────────

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-300 text-xs font-medium">
      {children}
    </span>
  )
}

// ── Main component ─────────────────────────────────────────────

export default function ProjectDetail({ project }: { project: ProjectWithRelations }) {
  const hero            = project.media.find(m => m.isHero) ?? project.media[0]
  const gallery         = project.media.filter(m => m.mediaType === 'image' && m.id !== hero?.id)
  const renders         = project.media.filter(m => m.mediaType === 'render_3d')
  const floorPlan       = project.media.find(m => m.mediaType === 'floor_plan')
  const primaryIndustry = project.industries.find(i => i.isPrimary)?.industry
  const primaryType     = project.stallTypes.find(t => t.isPrimary)?.stallType
  const materials       = (project.materialsUsed   as string[] | null) ?? []
  const features        = (project.specialFeatures as string[] | null) ?? []
  const awards          = (project.awards          as string[] | null) ?? []
  const ex              = project.exhibition

  return (
    <article>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[21/9] max-h-[600px] bg-slate-800 overflow-hidden">
        {hero ? (
          <Image
            src={hero.cdnUrl ?? hero.url}
            alt={hero.altText}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-slate-600 text-sm">Hero image placeholder — replace via admin</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,6%)] via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* ── BREADCRUMB ───────────────────────────────────────── */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs text-slate-500">
            <li><Link href="/" className="hover:text-slate-300 transition">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/portfolio" className="hover:text-slate-300 transition">Portfolio</Link></li>
            {primaryIndustry && (
              <>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`/portfolio/industry/${primaryIndustry.slug}`} className="hover:text-slate-300 transition">
                    {primaryIndustry.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden>/</li>
            <li className="text-slate-400 truncate max-w-[200px]">{project.title}</li>
          </ol>
        </nav>

        {/* ── HEADER ──────────────────────────────────────────── */}
        <header className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {primaryIndustry && (
              <Link href={`/portfolio/industry/${primaryIndustry.slug}`}>
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-widest hover:bg-green-500/20 transition">
                  {primaryIndustry.name}
                </span>
              </Link>
            )}
            {primaryType && (
              <Link href={`/portfolio/type/${primaryType.slug}`}>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-widest hover:bg-blue-500/20 transition">
                  {primaryType.name}
                </span>
              </Link>
            )}
            {awards.map((award, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
                🏆 {award}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
            {project.title}
          </h1>

          {project.client && (
            <p className="text-lg text-slate-400">
              Client: <span className="text-slate-200 font-medium">{project.client.name}</span>
            </p>
          )}
        </header>

        {/* ── STATS STRIP ─────────────────────────────────────── */}
        {(project.stallAreaSqm || project.stallHeightM || project.buildYear || ex) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.stallAreaSqm  && <Stat label="Stall Area"  value={`${Number(project.stallAreaSqm)} sqm`} />}
            {project.stallHeightM  && <Stat label="Height"      value={`${Number(project.stallHeightM)}m`} />}
            {project.floors > 1    && <Stat label="Floors"      value={project.floors} />}
            {project.buildYear     && <Stat label="Year"        value={project.buildYear} />}
            {ex?.city              && <Stat label="Location"    value={ex.city} />}
          </div>
        )}

        {/* ── MAIN CONTENT GRID ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT — editorial content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Description */}
            <div className="prose prose-invert prose-sm max-w-none
                            prose-p:text-slate-300 prose-p:leading-relaxed
                            prose-headings:font-display prose-headings:text-white">
              {project.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* AI Summary — visible as "Project Facts" block for human readers too */}
            {project.aiSummary && (
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Project Facts</p>
                <p className="text-sm text-slate-300 leading-relaxed">{project.aiSummary}</p>
              </div>
            )}

            {/* Design Brief */}
            {project.designBrief && (
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Design Brief</p>
                <p className="text-sm text-slate-300 leading-relaxed">{project.designBrief}</p>
              </div>
            )}
          </div>

          {/* RIGHT — project metadata sidebar */}
          <aside className="space-y-6">

            {/* Exhibition info */}
            {ex && (
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exhibition</p>
                <p className="text-sm font-semibold text-white">{ex.name}</p>
                {ex.venueName && <p className="text-xs text-slate-400">{ex.venueName}</p>}
                {ex.city && (
                  <p className="text-xs text-slate-400">
                    {[ex.city, ex.state, ex.country].filter(Boolean).join(', ')}
                  </p>
                )}
                {ex.startDate && (
                  <p className="text-xs text-slate-500">
                    {new Date(ex.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {ex.endDate && ` — ${new Date(ex.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}`}
                  </p>
                )}
              </div>
            )}

            {/* Design style */}
            {project.designStyle && (
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Design Style</p>
                <p className="text-sm text-slate-200">{project.designStyle}</p>
              </div>
            )}

            {/* Materials */}
            {materials.length > 0 && (
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Materials Used</p>
                <ul className="space-y-1.5">
                  {materials.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Special features */}
            {features.length > 0 && (
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Special Features</p>
                <ul className="space-y-1.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* All industries */}
            {project.industries.length > 1 && (
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Industries</p>
                <div className="flex flex-wrap gap-2">
                  {project.industries.map(({ industry }) => (
                    <Link key={industry.id} href={`/portfolio/industry/${industry.slug}`}>
                      <Pill>{industry.name}</Pill>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* ── MEDIA GALLERY ───────────────────────────────────── */}
        {gallery.length > 0 && (
          <section>
            <h2 className="text-lg font-display font-bold text-white mb-6">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map(img => (
                <figure key={img.id} className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                  <Image
                    src={img.cdnUrl ?? img.url}
                    alt={img.altText}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {img.caption && (
                    <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-slate-900/90 text-xs text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── 3D RENDERS ──────────────────────────────────────── */}
        {renders.length > 0 && (
          <section>
            <h2 className="text-lg font-display font-bold text-white mb-6">3D Renders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renders.map(img => (
                <figure key={img.id} className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                  <Image src={img.cdnUrl ?? img.url} alt={img.altText} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── FLOOR PLAN ──────────────────────────────────────── */}
        {floorPlan && (
          <section>
            <h2 className="text-lg font-display font-bold text-white mb-4">Floor Plan</h2>
            <figure className="relative w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
              <Image src={floorPlan.cdnUrl ?? floorPlan.url} alt={floorPlan.altText} fill className="object-contain p-4" />
            </figure>
          </section>
        )}

        {/* ── CTA ─────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800/60 p-8 md:p-12 text-center">
          <p className="text-xs uppercase tracking-widest text-green-400 font-semibold mb-3">Start Your Project</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Need a stand like this?
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8">
            Share your exhibition brief with us — stall size, show name, and brand requirements. We'll send a design concept within 72 hours.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition"
          >
            Request a Quote
          </Link>
        </section>

      </div>
    </article>
  )
}
