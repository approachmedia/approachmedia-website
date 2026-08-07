import Link from 'next/link'

/**
 * Long-form prose block for the service pages.
 *
 * The service pages ran 583-627 words against page-one competitors at
 * 1,400-1,900 for the same queries. These sections carry the depth, and are
 * written as answers to what a buyer actually asks rather than as keyword
 * padding — the headings double as the H2s the pages were missing.
 */
export type ProseBlock = {
  heading: string
  paragraphs: string[]
  bullets?: { term: string; copy: string }[]
}

export default function ProseSection({
  eyebrow,
  intro,
  blocks,
}: {
  eyebrow: string
  intro?: string
  blocks: ProseBlock[]
}) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-wide max-w-4xl">
        <p className="text-xs uppercase tracking-[0.18em] text-brand-green">{eyebrow}</p>

        {intro && (
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
        )}

        {blocks.map(b => (
          <div key={b.heading} className="mt-12">
            <h2 className="font-display text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              {b.heading}
            </h2>
            {b.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            {b.bullets && (
              <ul className="mt-6 space-y-3">
                {b.bullets.map(x => (
                  <li key={x.term} className="border-l-2 border-brand-green/40 pl-4">
                    <span className="font-semibold text-foreground">{x.term}</span>
                    <span className="text-muted-foreground"> — {x.copy}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <p className="mt-12 rounded-2xl border border-white/15 bg-surface/40 p-6 text-sm leading-relaxed text-muted-foreground">
          Planning a stand? Send us your stand size, show name and brand guidelines and we will come
          back with a 3D concept and firm costing.{' '}
          <Link href="/contact" className="font-medium text-brand-green hover:text-brand-green-glow">
            Share your exhibition brief →
          </Link>
        </p>
      </div>
    </section>
  )
}
