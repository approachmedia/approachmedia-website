import { getMajorClients } from '@/lib/db/portfolio'
import { ClientsTicker } from './ClientsTicker'

/**
 * Clientele marquee — real clients we have built a stall larger than
 * MIN_SQM sqm for, read from the portfolio so the row stays current as
 * projects are added. Hidden entirely if the portfolio is too thin to
 * fill the row.
 *
 * The query stays here on the server; the row itself is a client component,
 * since Ticker measures the container to decide how many copies it needs.
 */
const MIN_SQM = 70
const MIN_TO_SHOW = 6

export async function ClientsMarquee() {
  const clientNames = await getMajorClients(MIN_SQM)
  if (clientNames.length < MIN_TO_SHOW) return null

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

        <div className="relative mt-12">
          <ClientsTicker clients={clientNames} />
        </div>
      </div>
    </section>
  )
}
