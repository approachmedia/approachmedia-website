import Image from 'next/image'
import Link from 'next/link'
import type { ProjectWithRelations } from '@/lib/seo/schema-generator'
import ScrollHero from './ScrollHero'
import ParallaxGallery, { type GalleryItem } from './ParallaxGallery'

// ── Helpers ────────────────────────────────────────────────────

function FactRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '10px 0', borderBottom: '1px solid hsl(222 18% 16%)' }}>
      <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(220 10% 48%)', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'hsl(0 0% 92%)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

function ServiceCard({ label }: { label: string }) {
  return (
    <div style={{ padding: '16px 20px', background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(110 55% 50%)', flexShrink: 0 }} />
      <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'hsl(0 0% 88%)' }}>{label}</span>
    </div>
  )
}

function NarrativeBlock({ num, heading, body }: { num: string; heading: string; body: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(230 70% 65%)', flexShrink: 0 }}>{num}</span>
        <h3 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 700, color: 'hsl(0 0% 96%)', lineHeight: 1.2 }}>{heading}</h3>
      </div>
      <p style={{ fontSize: '0.95rem', color: 'hsl(220 10% 62%)', lineHeight: 1.85, paddingLeft: '32px' }}>{body}</p>
    </div>
  )
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div style={{ background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', borderRadius: '12px', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'hsl(222 18% 18%)' }} />
      <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(220 10% 40%)' }}>{label}</span>
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

  // Combined photo set for the masonry grid (build photos + 3D renders)
  const galleryItems: GalleryItem[] = [...galleryImages, ...renders].map(m => ({
    id: m.id,
    src: m.cdnUrl ?? m.url,
    alt: m.altText,
    caption: m.caption,
  }))
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

  return (
    <article>

      {/* ═══════════════════════════════════════════════════════
          BLOCK 1 — INTRO: breadcrumb + title left, facts right
          ═══════════════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid hsl(222 18% 14%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 48px' }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: '32px' }}>
            <ol style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/" style={{ fontSize: '0.78rem', color: 'hsl(220 10% 50%)', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: 'hsl(220 10% 35%)', fontSize: '0.78rem' }}>/</li>
              <li><Link href="/portfolio" style={{ fontSize: '0.78rem', color: 'hsl(220 10% 50%)', textDecoration: 'none' }}>Portfolio</Link></li>
              {primaryIndustry && (
                <>
                  <li style={{ color: 'hsl(220 10% 35%)', fontSize: '0.78rem' }}>/</li>
                  <li>
                    <Link href={`/portfolio/industry/${primaryIndustry.slug}`} style={{ fontSize: '0.78rem', color: 'hsl(220 10% 50%)', textDecoration: 'none' }}>
                      {primaryIndustry.name}
                    </Link>
                  </li>
                </>
              )}
              <li style={{ color: 'hsl(220 10% 35%)', fontSize: '0.78rem' }}>/</li>
              <li style={{ fontSize: '0.78rem', color: 'hsl(220 10% 36%)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                {project.title}
              </li>
            </ol>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)', gap: '56px', alignItems: 'start' }}>

            {/* Left — title block */}
            <div>
              {/* Industry + type pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {primaryIndustry && (
                  <Link href={`/portfolio/industry/${primaryIndustry.slug}`}
                    style={{ padding: '4px 12px', borderRadius: '999px', background: 'hsl(110 55% 50% / 0.1)', border: '1px solid hsl(110 55% 50% / 0.3)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(110 55% 50%)', textDecoration: 'none' }}>
                    {primaryIndustry.name}
                  </Link>
                )}
                {allTypes.slice(0, 1).map(t => (
                  <Link key={t.id} href={`/portfolio/type/${t.slug}`}
                    style={{ padding: '4px 12px', borderRadius: '999px', background: 'hsl(230 70% 65% / 0.1)', border: '1px solid hsl(230 70% 65% / 0.3)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(230 70% 65%)', textDecoration: 'none' }}>
                    {t.name}
                  </Link>
                ))}
                {awards.slice(0, 1).map((a, i) => (
                  <span key={i} style={{ padding: '4px 12px', borderRadius: '999px', background: 'hsl(42 80% 55% / 0.1)', border: '1px solid hsl(42 80% 55% / 0.3)', fontSize: '0.7rem', fontWeight: 700, color: 'hsl(42 80% 60%)' }}>
                    {a}
                  </span>
                ))}
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.06, color: 'hsl(0 0% 97%)', marginBottom: '20px' }}>
                {project.title}
              </h1>

              {project.client && (
                <p style={{ fontSize: '1rem', color: 'hsl(220 10% 55%)', marginBottom: '8px' }}>
                  Client: <span style={{ color: 'hsl(0 0% 88%)', fontWeight: 600 }}>{project.client.name}</span>
                </p>
              )}

              <p style={{ fontSize: '1.05rem', color: 'hsl(220 10% 62%)', lineHeight: 1.8, maxWidth: '560px', marginTop: '12px' }}>
                {descParas[0] ?? project.description}
              </p>
            </div>

            {/* Right — compact fact stack */}
            <div style={{ background: 'hsl(222 28% 8%)', border: '1px solid hsl(222 18% 16%)', borderRadius: '14px', padding: '24px', marginTop: '4px' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(220 10% 45%)', marginBottom: '4px' }}>
                Project Details
              </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BLOCK 2 — HERO VISUAL (scroll-scaling, big → framed)
          ═══════════════════════════════════════════════════════ */}
      {hero ? (
        <ScrollHero
          src={hero.cdnUrl ?? hero.url}
          alt={hero.altText}
          caption={hero.caption}
          title={project.title}
        />
      ) : (
        <section style={{ position: 'relative', width: '100%', background: 'hsl(222 30% 6%)' }}>
          <div style={{ width: '100%', aspectRatio: '21/9', maxHeight: '480px', background: 'hsl(222 28% 8%)', border: '1px solid hsl(222 18% 16%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'hsl(222 18% 14%)' }} />
            <span style={{ fontSize: '0.8rem', color: 'hsl(220 10% 35%)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{project.title}</span>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          BLOCK 3 — CONTEXT / BRIEF
          ═══════════════════════════════════════════════════════ */}
      <section style={{ background: 'hsl(222 28% 7%)', borderBottom: '1px solid hsl(222 18% 13%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px minmax(0, 1fr)', gap: '48px', alignItems: 'start' }}>
            <div style={{ paddingTop: '4px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'hsl(220 10% 45%)' }}>Context</span>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'hsl(0 0% 96%)', marginBottom: '20px', lineHeight: 1.2 }}>
                The Brief
              </h2>
              <div style={{ display: 'grid', gap: '16px', maxWidth: '680px' }}>
                {(challengePara || contextPara) && (
                  <p style={{ fontSize: '1rem', color: 'hsl(220 10% 62%)', lineHeight: 1.85 }}>
                    {challengePara || contextPara}
                  </p>
                )}
                {ex && (
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '8px', padding: '20px', background: 'hsl(222 28% 9%)', border: '1px solid hsl(222 18% 16%)', borderRadius: '10px' }}>
                    <div>
                      <p style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(220 10% 45%)', marginBottom: '4px' }}>Exhibition</p>
                      <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'hsl(0 0% 88%)' }}>{ex.name}</p>
                    </div>
                    {ex.venueName && (
                      <div>
                        <p style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(220 10% 45%)', marginBottom: '4px' }}>Venue</p>
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'hsl(0 0% 88%)' }}>{ex.venueName}</p>
                      </div>
                    )}
                    {ex.city && (
                      <div>
                        <p style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'hsl(220 10% 45%)', marginBottom: '4px' }}>Location</p>
                        <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'hsl(0 0% 88%)' }}>
                          {[ex.city, ex.state, ex.country].filter(Boolean).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BLOCK 4 — SERVICES USED
          ═══════════════════════════════════════════════════════ */}
      <section style={{ borderBottom: '1px solid hsl(222 18% 13%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '180px minmax(0, 1fr)', gap: '48px', alignItems: 'start' }}>
            <div style={{ paddingTop: '4px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'hsl(220 10% 45%)' }}>Services</span>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'hsl(0 0% 96%)', marginBottom: '28px', lineHeight: 1.2 }}>
                What We Delivered
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {servicesList.map((s, i) => <ServiceCard key={i} label={s} />)}
              </div>
              {materials.length > 0 && (
                <div style={{ marginTop: '28px' }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(220 10% 45%)', marginBottom: '12px' }}>
                    Materials Used
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {materials.map((m, i) => (
                      <span key={i} style={{ padding: '4px 12px', borderRadius: '6px', background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 18%)', fontSize: '0.78rem', color: 'hsl(220 10% 65%)' }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BLOCK 5 — NARRATIVE: Challenge / Design / Outcome
          ═══════════════════════════════════════════════════════ */}
      <section style={{ background: 'hsl(222 28% 7%)', borderBottom: '1px solid hsl(222 18% 13%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 24px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'hsl(220 10% 45%)', marginBottom: '48px' }}>
            Case Study
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
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

      {/* ═══════════════════════════════════════════════════════
          BLOCK 6 — GALLERY (responsive masonry photo grid)
          ═══════════════════════════════════════════════════════ */}
      {galleryItems.length > 0 ? (
        <section style={{ borderBottom: '1px solid hsl(222 18% 13%)' }}>
          <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', marginBottom: '36px', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'hsl(220 10% 45%)' }}>Gallery</span>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'hsl(0 0% 96%)', marginTop: '10px', lineHeight: 1.15 }}>
                  Inside the Build
                </h2>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'hsl(220 10% 45%)' }}>
                {galleryItems.length} {galleryItems.length === 1 ? 'image' : 'images'} · click to enlarge
              </span>
            </div>

            <ParallaxGallery items={galleryItems} />

            {floorPlan && (
              <div style={{ marginTop: '48px' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(220 10% 45%)', marginBottom: '20px' }}>
                  Floor Plan
                </p>
                <figure style={{ position: 'relative', maxWidth: '640px', aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden', background: 'hsl(222 24% 9%)', border: '1px solid hsl(222 18% 16%)', margin: 0 }}>
                  <Image src={floorPlan.cdnUrl ?? floorPlan.url} alt={floorPlan.altText} fill sizes="640px" style={{ objectFit: 'contain', padding: '16px' }} />
                </figure>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section style={{ borderBottom: '1px solid hsl(222 18% 13%)' }}>
          <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px 24px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'hsl(220 10% 45%)' }}>Gallery</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'hsl(0 0% 96%)', marginTop: '10px', marginBottom: '36px', lineHeight: 1.15 }}>Project Visuals</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              <ImagePlaceholder label="Concept Render" />
              <ImagePlaceholder label="Booth Interaction" />
              <ImagePlaceholder label="Material Mood" />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════
          BLOCK 7 — IMPACT (dark, high-contrast)
          ═══════════════════════════════════════════════════════ */}
      <section style={{ background: 'hsl(222 40% 4%)', borderBottom: '1px solid hsl(222 18% 10%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'hsl(110 55% 50%)' }}>
              Project Outcomes
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.025em', color: 'hsl(0 0% 97%)', marginTop: '12px', lineHeight: 1.1 }}>
              The Result
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px', background: 'hsl(222 18% 10%)' }}>
            {impactItems.map((item, i) => (
              <div key={i} style={{ background: 'hsl(222 40% 4%)', padding: '36px 28px', textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'hsl(0 0% 97%)', lineHeight: 1.1, marginBottom: '10px' }}>
                  {item.value}
                </p>
                <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'hsl(220 10% 48%)' }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          {project.aiSummary && (
            <div style={{ marginTop: '40px', maxWidth: '720px', margin: '40px auto 0', padding: '24px 28px', background: 'hsl(222 28% 7%)', border: '1px solid hsl(222 18% 14%)', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'hsl(220 10% 45%)', marginBottom: '10px' }}>
                Project Summary
              </p>
              <p style={{ fontSize: '0.92rem', color: 'hsl(220 10% 62%)', lineHeight: 1.8 }}>
                {project.aiSummary}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BLOCK 8 — CLOSING CTA
          ═══════════════════════════════════════════════════════ */}
      <section>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '56px', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'hsl(110 55% 50%)', marginBottom: '16px' }}>
                Start Your Project
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.025em', color: 'hsl(0 0% 97%)', lineHeight: 1.1, marginBottom: '20px' }}>
                Planning an exhibition presence that needs to look sharp and perform under pressure?
              </h2>
              <p style={{ fontSize: '1rem', color: 'hsl(220 10% 55%)', lineHeight: 1.8, maxWidth: '500px', marginBottom: '32px' }}>
                Share your exhibition brief — stall size, show name, and brand requirements. We respond with a design concept within 72 hours.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/contact"
                  style={{ display: 'inline-block', padding: '12px 28px', borderRadius: '999px', background: 'hsl(230 64% 52%)', color: 'white', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', transition: 'background 0.2s' }}>
                  Request a Proposal &rarr;
                </Link>
                <Link href="/portfolio"
                  style={{ display: 'inline-block', padding: '12px 28px', borderRadius: '999px', background: 'transparent', border: '1px solid hsl(222 18% 28%)', color: 'hsl(220 10% 70%)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
                  View More Projects
                </Link>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { num: '23+', label: 'Years of Experience' },
                { num: '6000+', label: 'Exhibition Stalls Built' },
                { num: '14+', label: 'Countries Delivered' },
                { num: '9+', label: 'Industries Served' },
              ].map(({ num, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'hsl(222 28% 8%)', border: '1px solid hsl(222 18% 15%)', borderRadius: '10px' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, hsl(230 70% 65%), hsl(110 55% 50%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {num}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'hsl(220 10% 55%)', textAlign: 'right' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </article>
  )
}
