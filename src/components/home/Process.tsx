const steps = [
  { n: '01', t: 'Understanding goals',            d: 'We map your exhibition objectives, audience, and competitive context.' },
  { n: '02', t: 'Spatial design & 3D rendering',  d: 'Concept design and photoreal renders for stakeholder alignment.' },
  { n: '03', t: 'Engineering & detailing',        d: 'Build drawings, materials, AV and structural detailing.' },
  { n: '04', t: 'Fabrication & build',            d: 'In-house fabrication with quality checks at each milestone.' },
  { n: '05', t: 'Full-scale mock-up testing',     d: 'We replicate the booth in our warehouse to eliminate on-site surprises.' },
  { n: '06', t: 'On-site execution & handover',   d: 'Installation, AV commissioning and a ready-to-show handover.' },
  { n: '07', t: 'Post-event dismantle & wrap-up', d: 'Clean dismantle, asset storage, and a debrief for the next show.' },
]

export function Process() {
  return (
    <section className="bg-surface/40 py-20 md:py-28" id="process">
      <div className="container-wide">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Our Approach</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              A clear process so your team can <span className="text-gradient-brand">focus on the event.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Seven defined stages, one accountable team — from first brief to post-event wrap-up.
            </p>
          </div>
          <ol className="space-y-3 md:col-span-8">
            {steps.map(s => (
              <li key={s.n} className="surface-card flex gap-6 rounded-2xl p-6 transition-colors hover:bg-surface-elevated md:p-7">
                <div className="font-display text-2xl font-semibold text-brand-green-glow md:text-3xl">{s.n}</div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground md:text-base">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
