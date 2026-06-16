import { Compass, Workflow, Globe2, Timer } from 'lucide-react'

const items = [
  { icon: Compass,  title: 'Industry-Aware Designing', desc: 'Every industry communicates differently. We design each space to help you communicate your message instantly — layout, flow and interaction are intentional.' },
  { icon: Workflow, title: 'End-to-End Services',      desc: 'From concept and design to fabrication, installation and dismantling, every stage is managed by a single team.' },
  { icon: Globe2,   title: 'International Standards',  desc: 'Experience across global markets with international build, safety and execution standards.' },
  { icon: Timer,    title: 'Fast, Reliable Timelines', desc: 'Clearly defined process; most projects completed within a two-month timeframe depending on scale and complexity.' },
]

export function WhyChoose() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Why Approach Media</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Built for brands that <span className="text-gradient-brand">cannot afford</span> to blend in.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map(it => (
            <div key={it.title} className="surface-card group relative overflow-hidden rounded-2xl p-7">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-blue/30 to-brand-green/20 ring-1 ring-brand-blue-glow/30">
                <it.icon className="h-5 w-5 text-brand-green-glow" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-brand-blue-glow/10 blur-2xl transition-opacity group-hover:opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
