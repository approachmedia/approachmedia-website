import Image from 'next/image'
import Link from 'next/link'
import type { ProjectWithRelations } from '@/lib/seo/schema-generator'
import CaseStudyHero from './CaseStudyHero'
import BrandMark from './BrandMark'
import { EditorialPlate } from './Plate'
import ParallaxGallery, { type GalleryItem } from './ParallaxGallery'
import CaseStudyFlow from './CaseStudyFlow'
import './case-study.css'

/**
 * The project page, in the gallery / catalog grammar: objects in a walkable
 * collection, labelled with fact rather than pitch.
 *
 * Every string on this page is unchanged. What changed is the markup around
 * them. The page was styled entirely with inline React style objects, which
 * cannot carry a media query, so it had no mobile layout at all: the Project
 * Details card was crushed to about 110px on a phone with its values running
 * off the screen, and the 180px label rail pushed the service cards half out
 * of the viewport. Styles now live in case-study.css, where they can collapse.
 *
 * Scroll devices are annotated here and driven by the engine, mounted once by
 * CaseStudyFlow on the article root. The gallery is the peak, and it carries
 * its own motion (a sticky band of panning rows) rather than an engine act.
 */

// ── Helpers ────────────────────────────────────────────────────

function FactRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="cs__fact" data-sc-in>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function ServiceCard({ label }: { label: string }) {
  return (
    <div className="cs__card" data-sc-in>
      <i aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

function NarrativeBlock({ num, heading, body }: { num: string; heading: string; body: string }) {
  return (
    <div className="cs__block" data-sc-in>
      <div className="cs__blockhead">
        <span className="cs__num">{num}</span>
        <h3>{heading}</h3>
      </div>
      <p>{body}</p>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────

export default function ProjectDetail({ project }: { project: ProjectWithRelations }) {
  const hero            = project.media.find(m => m.isHero) ?? project.media.find(m => m.mediaType === 'image')
  const galleryImages   = project.media.filter(m => m.mediaType === 'image' && m.id !== hero?.id)
  const renders         = project.media.filter(m => m.mediaType === 'render_3d')
  const floorPlan       = project.media.find(m => m.mediaType === 'floor_plan')
  const primaryIndustry = project.industries.find(i => i.isPrimary)?.industry
  const allTypes        = project.stallTypes.map(t => t.stallType)

  const materials       = (project.materialsUsed   as string[] | null) ?? []
  const features        = (project.specialFeatures as string[] | null) ?? []
  const awards          = (project.awards          as string[] | null) ?? []
  const ex              = project.exhibition

  // Split description into paragraphs for narrative blocks
  const descParas = project.description.split(/\n\n+/).map(p => p.trim()).filter(Boolean)
  const contextPara   = descParas[0] ?? ''
  const challengePara = project.designBrief ?? descParas[1] ?? descParas[0] ?? ''
  const designPara    = descParas[2] ?? descParas[1] ?? descParas[0] ?? ''
  const outcomePara   = project.aiSummary ?? descParas[3] ?? descParas[descParas.length - 1] ?? ''

  // Services list — stall types + special features
  const servicesList = [
    ...allTypes.map(t => t.name),
    ...features,
  ].filter(Boolean)
  if (servicesList.length === 0) {
    servicesList.push('Custom Stall Design', '3D Booth Visualisation', 'Fabrication', 'Installation & Dismantling')
  }

  // Impact outcomes — derive from data or use smart defaults
  const impactItems = [
    features[0] ? { label: 'Key Feature', value: features[0] } : null,
    project.stallAreaSqm ? { label: 'Exhibition Area', value: `${Number(project.stallAreaSqm)} sqm` } : null,
    project.stallHeightM ? { label: 'Stall Height', value: `${Number(project.stallHeightM)} m` } : null,
    project.floors > 1   ? { label: 'Floors', value: `${project.floors} levels` } : null,
    materials[0]         ? { label: 'Primary Material', value: materials[0] } : null,
    project.buildYear    ? { label: 'Year Built', value: String(project.buildYear) } : null,
  ].filter(Boolean).slice(0, 4) as { label: string; value: string }[]

  if (impactItems.length === 0) {
    impactItems.push(
      { label: 'Brand Presence', value: 'Premium' },
      { label: 'Visitor Circulation', value: 'Optimised' },
      { label: 'Lead Generation', value: 'High-Intent' },
      { label: 'Delivery', value: 'On Schedule' },
    )
  }

  // Editorial breaks: first 3 gallery images woven between sections (all WIDE
  // ratios so logos/footers in the photos never crop); the rest join the
  // panning gallery.
  const editorialImgs   = galleryImages.slice(0, 3)
  const remainingItems: GalleryItem[] = [...galleryImages.slice(3), ...renders].map(m => ({
    id: m.id,
    src: m.cdnUrl ?? m.url,
    alt: m.altText,
    caption: m.caption,
  }))

  const heroServices = [
    ...allTypes.map(t => t.name),
    'Design',
    'Fabrication',
  ].filter(Boolean).slice(0, 3).join(' · ')

  const heroClientLine = project.client
    ? [project.client.name, ex?.city ?? project.city].filter(Boolean).join(', ')
    : null

  return (
    <CaseStudyFlow>

      {/* ═══ HERO — object one: the stand itself, already labelled ═══ */}
      {hero && (
        <CaseStudyHero
          title={project.client?.name ?? project.title}
          image={hero.cdnUrl ?? hero.url}
          imageAlt={hero.altText}
          year={project.buildYear ? String(project.buildYear) : null}
          category={primaryIndustry?.name ?? null}
          client={heroClientLine}
          services={heroServices}
        />
      )}

      <div>

        {/* ── INTRO: title left, the specimen card right. The facts arrive
               one row at a time rather than as a block. ── */}
        <section data-sc-act="flow">
          <div className="cs__wrap cs__wrap--intro">

            <nav aria-label="Breadcrumb" className="cs__crumbs">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li className="sep">/</li>
                <li><Link href="/portfolio">Portfolio</Link></li>
                {primaryIndustry && (
                  <>
                    <li className="sep">/</li>
                    <li>
                      <Link href={`/portfolio/industry/${primaryIndustry.slug}`}>
                        {primaryIndustry.name}
                      </Link>
                    </li>
                  </>
                )}
                <li className="sep">/</li>
                <li className="cur">{project.title}</li>
              </ol>
            </nav>

            <div className="cs__split">

              <div data-sc-in>
                <div className="cs__tags">
                  {primaryIndustry && (
                    <Link href={`/portfolio/industry/${primaryIndustry.slug}`} className="cs__tag cs__tag--ind">
                      {primaryIndustry.name}
                    </Link>
                  )}
                  {allTypes.slice(0, 1).map(t => (
                    <Link key={t.id} href={`/portfolio/type/${t.slug}`} className="cs__tag cs__tag--type">
                      {t.name}
                    </Link>
                  ))}
                  {awards.slice(0, 1).map((a, i) => (
                    <span key={i} className="cs__tag cs__tag--award">{a}</span>
                  ))}
                </div>

                <h1 className="cs__title">{project.title}</h1>

                {project.client && (
                  <p className="cs__client">
                    Client: <b>{project.client.name}</b>
                  </p>
                )}

                <p className="cs__lede">{descParas[0] ?? project.description}</p>
              </div>

              <dl className="cs__facts" data-sc-stagger>
                <h2>Project Details</h2>
                {project.client     && <FactRow label="Client"     value={project.client.name} />}
                {primaryIndustry    && <FactRow label="Industry"   value={primaryIndustry.name} />}
                {ex                 && <FactRow label="Exhibition" value={ex.name} />}
                {(ex?.city ?? project.city) && (
                  <FactRow label="Location" value={[ex?.city ?? project.city, ex?.country].filter(Boolean).join(', ')} />
                )}
                {project.buildYear  && <FactRow label="Year"       value={project.buildYear} />}
                {allTypes[0]        && <FactRow label="Type"       value={allTypes[0].name} />}
                {project.stallAreaSqm && <FactRow label="Stall Area" value={`${Number(project.stallAreaSqm)} sqm`} />}
                {project.stallHeightM && <FactRow label="Height"   value={`${Number(project.stallHeightM)} m`} />}
                {project.floors > 1   && <FactRow label="Floors"   value={`${project.floors}`} />}
                {project.designStyle  && <FactRow label="Style"    value={project.designStyle} />}
              </dl>
            </div>
          </div>
        </section>

        {/* ── PLATE 1: offset right, drifting up ── */}
        {editorialImgs[0] && (
          <section data-sc-act="flow">
            <div className="cs__wrap cs__wrap--wide">
              <div className="cs__split cs__offset" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2.2fr)', gap: '24px', alignItems: 'end' }}>
                <p className="cs__eyebrow" data-sc-in>
                  {String(project.buildYear ?? '')} {ex?.name ? `· ${ex.name}` : ''}
                </p>
                <EditorialPlate
                  src={editorialImgs[0].cdnUrl ?? editorialImgs[0].url}
                  alt={editorialImgs[0].altText}
                  caption={editorialImgs[0].caption}
                  ratio="16 / 9"
                  rate={1}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── THE BRIEF: wipes up at the chapter boundary ── */}
        <section className="cs__brief" data-sc-act="flow">
          <div aria-hidden className="cs__mark">
            <BrandMark className="h-full w-full" stroke="hsl(222 18% 22%)" strokeWidth={0.8} />
          </div>
          <div className="cs__wrap" style={{ position: 'relative' }}>
            <div className="cs__rail">
              <div className="cs__railhead">
                <span className="cs__eyebrow">Context</span>
              </div>
              <div data-sc-reveal="up">
                <h2 className="cs__h2" style={{ marginBottom: '20px' }}>The Brief</h2>
                <div className="cs__stack">
                  {(challengePara || contextPara) && (
                    <p className="cs__body">{challengePara || contextPara}</p>
                  )}
                  {ex && (
                    <dl className="cs__meta">
                      <div>
                        <dt>Exhibition</dt>
                        <dd>{ex.name}</dd>
                      </div>
                      {ex.venueName && (
                        <div>
                          <dt>Venue</dt>
                          <dd>{ex.venueName}</dd>
                        </div>
                      )}
                      {ex.city && (
                        <div>
                          <dt>Location</dt>
                          <dd>{[ex.city, ex.state, ex.country].filter(Boolean).join(', ')}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PLATE 2: full bleed, drifting the other way ── */}
        {editorialImgs[1] && (
          <section data-sc-act="flow">
            <div className="cs__bleed">
              <EditorialPlate
                src={editorialImgs[1].cdnUrl ?? editorialImgs[1].url}
                alt={editorialImgs[1].altText}
                ratio="21 / 9"
                rate={-1}
                className="plate--bleed"
              />
            </div>
          </section>
        )}

        {/* ── WHAT WE DELIVERED: the list arrives row by row ── */}
        <section data-sc-act="flow">
          <div className="cs__wrap">
            <div className="cs__rail">
              <div className="cs__railhead">
                <span className="cs__eyebrow">Services</span>
              </div>
              <div>
                <h2 className="cs__h2" style={{ marginBottom: '28px' }} data-sc-in>What We Delivered</h2>
                <div className="cs__cards" data-sc-stagger>
                  {servicesList.map((s, i) => <ServiceCard key={i} label={s} />)}
                </div>
                {materials.length > 0 && (
                  <div style={{ marginTop: '28px' }} data-sc-in>
                    <p className="cs__sub">Materials Used</p>
                    <div className="cs__chips">
                      {materials.map((m, i) => (
                        <span key={i} className="cs__chip">{m}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── PLATE 3: centred, drifting up ── */}
        {editorialImgs[2] && (
          <section data-sc-act="flow">
            <div className="cs__wrap cs__wrap--wide">
              <EditorialPlate
                src={editorialImgs[2].cdnUrl ?? editorialImgs[2].url}
                alt={editorialImgs[2].altText}
                caption={editorialImgs[2].caption}
                ratio="16 / 9"
                rate={1}
              />
            </div>
          </section>
        )}

        {/* ── CASE STUDY: the quiet section before the gallery ── */}
        <section data-sc-act="flow">
          <div className="cs__wrap">
            <p className="cs__eyebrow" style={{ marginBottom: '48px' }} data-sc-in>Case Study</p>
            <div className="cs__blocks" data-sc-stagger>
              <NarrativeBlock
                num="01"
                heading="The Challenge"
                body={challengePara || `${project.client?.name ?? 'The client'} needed a stall that balanced strong brand visibility with a structured visitor experience — turning footfall into focused business conversations in a competitive exhibition environment.`}
              />
              <NarrativeBlock
                num="02"
                heading="What We Designed"
                body={designPara || `We developed a custom stall concept centred on clear visitor flow, structured product display, and a dedicated consultation zone — all within a premium finish that communicated brand quality at first glance.`}
              />
              <NarrativeBlock
                num="03"
                heading="Why It Worked"
                body={outcomePara || `The design balanced visual impact with practical usability. Every spatial decision — entrance positioning, display height, meeting alcoves — was made with the visitor journey and conversion in mind.`}
              />
            </div>
          </div>
        </section>

        {/* ── GALLERY: the owner's original showcase, restored ──
             This was briefly a pinned contact sheet that developed frame by
             frame. The owner compared the two on the live site and preferred
             this one, so the panning rows are back exactly as they were: a
             sticky band of two rows travelling in opposite directions on
             desktop, a plain full-width stack on a phone, lightbox on click. */}
        {remainingItems.length > 0 && (
          <section>
            <div className="cs__wrap cs__wrap--gallery">
              <div className="cs__ghead">
                <div>
                  <span className="cs__eyebrow">Gallery</span>
                  <h2>Inside the Build</h2>
                </div>
                <span className="cs__count">
                  {remainingItems.length} {remainingItems.length === 1 ? 'image' : 'images'} · click to enlarge
                </span>
              </div>

              <ParallaxGallery items={remainingItems} />

              {floorPlan && (
                <div className="cs__plan">
                  <p className="cs__sub">Floor Plan</p>
                  <figure className="cs__planfig">
                    <Image src={floorPlan.cdnUrl ?? floorPlan.url} alt={floorPlan.altText} fill sizes="640px" style={{ objectFit: 'contain', padding: '16px' }} />
                  </figure>
                </div>
              )}
            </div>
          </section>
        )}

      </div>{/* end content zone */}

      {/* ═══ THE RESULT — dark bookend, held after the gallery ═══ */}
      <section className="cs__result" data-sc-act="flow">
        <div className="cs__wrap" style={{ padding: '80px 24px' }}>
          <div className="cs__resulthead" data-sc-in>
            <span className="cs__eyebrow">Project Outcomes</span>
            <h2>The Result</h2>
          </div>
          <div className="cs__grid" data-sc-stagger>
            {impactItems.map((item, i) => (
              <div key={i} className="cs__cell" data-sc-in>
                <p>{item.value}</p>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          {project.aiSummary && (
            <div className="cs__summary" data-sc-in>
              <p>Project Summary</p>
              <p>{project.aiSummary}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══ THE ASK — the only reveal-from-left on the page ═══ */}
      <section data-sc-act="flow" style={{ borderBottom: 'none' }}>
        <div className="cs__wrap" style={{ padding: '80px 24px' }}>
          <div className="cs__ask" data-sc-reveal="left">
            <div>
              <span className="cs__eyebrow">Start Your Project</span>
              <h2>Planning an exhibition presence that needs to look sharp and perform under pressure?</h2>
              <p>
                Share your exhibition brief — stall size, show name, and brand requirements. We respond with a design concept within 72 hours.
              </p>
              <div className="cs__acts">
                <Link href="/contact" className="cs__btn cs__btn--go">
                  Request a Proposal &rarr;
                </Link>
                <Link href="/portfolio" className="cs__btn cs__btn--alt">
                  View More Projects
                </Link>
              </div>
            </div>
            <div className="cs__tally">
              {[
                { num: '23+', label: 'Years of Experience' },
                { num: '6000+', label: 'Exhibition Stalls Built' },
                { num: '14+', label: 'Countries Delivered' },
                { num: '9+', label: 'Industries Served' },
              ].map(({ num, label }) => (
                <div key={label} className="cs__tallyrow">
                  <b>{num}</b>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </CaseStudyFlow>
  )
}
