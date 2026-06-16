const clientNames = [
  'Tata', 'Reliance', 'Mahindra', 'Aditya Birla', 'Pfizer', 'Sun Pharma',
  'Cipla', 'Asian Paints', "Dr. Reddy's", 'L&T', 'Godrej', 'Bajaj',
  'Hindustan Unilever', 'ITC', 'JSW', 'Bosch', 'Siemens', 'Schneider',
]

export function ClientsMarquee() {
  const row = [...clientNames, ...clientNames]
  return (
    <section className="border-y border-border/10 bg-surface/40 py-16 md:py-20">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Trusted by leaders</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground md:text-3xl">
            Our Esteemed Clientele
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Brands across diverse industries trust us for custom designs, efficient execution, and consistency they can return to.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-3">
            {row.map((c, i) => (
              <div
                key={i}
                className="flex h-16 min-w-[180px] items-center justify-center rounded-lg border border-border/10 bg-surface px-6 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-blue-glow/50 hover:text-foreground"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
