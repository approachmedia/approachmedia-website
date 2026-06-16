import { Star, Quote } from 'lucide-react'

const testimonials = [
  { quote: 'From design to dismantle, Approach Media managed every detail. Our stand became the anchor of the show floor.', name: 'Marketing Director', company: 'Global Pharma Brand',      rating: 5 },
  { quote: 'Their full-scale mock-up testing meant zero surprises on-site. The build quality was genuinely international.', name: 'Brand Lead',          company: 'Indian Automotive OEM',   rating: 5 },
  { quote: "We've returned to them for four consecutive shows. Consistency, timelines, and creative depth — every time.",  name: 'VP Marketing',        company: 'Building Materials Major', rating: 5 },
]

export function Testimonials() {
  return (
    <section className="bg-surface/40 py-20 md:py-28">
      <div className="container-wide">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Client voices</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Brands that come back, <span className="text-gradient-brand">show after show.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="surface-card relative rounded-2xl p-7">
              <Quote className="h-7 w-7 text-brand-green-glow/70" />
              <blockquote className="mt-4 text-base leading-relaxed text-foreground/90">
                {`“${t.quote}”`}
              </blockquote>
              <figcaption className="mt-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-brand-green-glow text-brand-green-glow" />
                  ))}
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-border/70 bg-surface/40 p-6 text-center text-sm text-muted-foreground">
          Google Reviews widget will embed here once the Business Profile is connected.
        </div>
      </div>
    </section>
  )
}
