import { getMajorClients } from '@/lib/db/portfolio'

/**
 * Clientele marquee — real clients we have built a stall larger than
 * MIN_SQM sqm for, read from the portfolio so the row stays current as
 * projects are added. Hidden entirely if the portfolio is too thin to
 * fill the row.
 */
const MIN_SQM = 70
const MIN_TO_SHOW = 6

// Seconds each logo takes to travel its own width. The animation moves the
// row by exactly one copy of the list, so scaling the duration by the number
// of logos keeps the scroll at a steady ~55px/s no matter how many there are.
const SECONDS_PER_LOGO = 3.5

export async function ClientsMarquee() {
  const clientNames = await getMajorClients(MIN_SQM)
  if (clientNames.length < MIN_TO_SHOW) return null

  // Duplicated so the marquee can loop seamlessly.
  const row = [...clientNames, ...clientNames]
  const duration = { '--marquee-duration': `${clientNames.length * SECONDS_PER_LOGO}s` } as React.CSSProperties
  return (
    <section className="border-y border-white/15 bg-surface/40 py-16 md:py-20">
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
          <div className="flex w-max animate-marquee gap-3" style={duration}>
            {row.map((c, i) => (
              <div
                key={i}
                className="flex h-16 min-w-[180px] items-center justify-center rounded-lg border border-white/15 bg-surface px-6 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-blue-glow/50 hover:text-foreground"
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
