import Link from 'next/link'
import { ArrowUpRight, PenTool, Hammer, Layers, MonitorPlay, Building2, Sparkles } from 'lucide-react'

const services = [
  { icon: PenTool,    title: 'Exhibition Stall Design',           slug: 'exhibition-stall-design',           desc: 'Concept-led spatial design that translates your brand into experience.' },
  { icon: Hammer,     title: 'Custom Booth Fabrication',          slug: 'custom-booth-fabrication',          desc: 'In-house fabrication with international build & finish standards.' },
  { icon: Layers,     title: 'Turnkey Project Management',        slug: 'turnkey-project-management',        desc: 'One team, end-to-end — from brief to dismantle.' },
  { icon: MonitorPlay, title: 'Audio-Visual & Tech Integration',  slug: 'av-technology-integration',         desc: 'LED walls, interactive screens, immersive sound and lighting.' },
  { icon: Building2,  title: 'Double Decker / Mezzanine Stands',  slug: 'double-decker-mezzanine-stands',     desc: 'Engineered multi-level stands that maximise floor presence.' },
  { icon: Sparkles,   title: 'Immersive Brand Experiences',       slug: 'immersive-brand-experience',        desc: 'Sensory-led environments designed to be remembered.' },
]

export function ServicesGrid() {
  return (
    <section className="bg-surface/40 py-20 md:py-28" id="services">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-green">What we do</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Services built for <span className="text-gradient-brand">high-stakes</span> exhibitions.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            All services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map(s => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="surface-card group relative flex flex-col gap-5 rounded-2xl p-7 md:p-8"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/30 to-brand-green/20 ring-1 ring-brand-blue-glow/30">
                <s.icon className="h-5 w-5 text-brand-green-glow" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
              <ArrowUpRight className="absolute right-6 top-6 h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-green-glow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
