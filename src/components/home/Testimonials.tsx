/**
 * Testimonials — real client voices from the old Approach Media site,
 * restyled to the new design system (dark surface cards, display font,
 * brand accents). Client logos are colourful light-background artwork, so
 * each sits in a small white chip that works on the dark theme.
 *
 * Logo files live in the R2 bucket folder `images/clientlogo/`:
 *   apson-inc.png, rabatex-group.png, aahaan-polycare.png,
 *   contendre-solar.png, univia.png, rayzon-solar.png
 */

import { GoogleReviews } from './GoogleReviews'
import { TestimonialsStack } from './TestimonialsStack'

const CDN = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev/images/clientlogo'

const testimonials = [
  {
    logo:    'rabatex-group.png',
    company: 'Rabatex Group',
    quote:   "These guys are highly creative, respectful of deadlines (oftentimes delivering early) and always professional. It's a pleasure working with them!",
    name:    'Haresh Panchal',
    role:    'Director',
  },
  {
    logo:    'contendre-solar.png',
    company: 'Contendre Solar',
    quote:   'Team Approach Media’s meticulous approach to planning, designing, and executing our displays has resulted in remarkable outcomes that have exceeded our expectations. Throughout our partnership, Approach Media Pvt. Ltd. has exhibited a deep understanding of our brand and objectives, ensuring that every exhibition accurately represents our vision.',
    name:    'Dharmin Sheth',
    role:    'Director',
  },
  {
    logo:    'rayzon-solar.png',
    company: 'Rayzon Solar',
    quote:   'Team AMPL’s unwavering commitment to delivering high-quality output has truly impressed us. Approach Media Pvt. Ltd. has consistently demonstrated their expertise and professionalism in handling all aspects of our exhibition projects.',
    name:    'Chirag Nakarani',
    role:    'Director',
  },
  {
    logo:    'univia.png',
    company: 'Univia',
    quote:   'Approach Media Pvt. Ltd. has proven to be a reliable and trustworthy partner. Their timely delivery and efficient project management have allowed us to seamlessly execute our global exhibitions.',
    name:    'Ravi Varmora',
    role:    'Director',
  },
  {
    logo:    'apson-inc.png',
    company: 'Apson Inc',
    quote:   'The AMPL team stands out as a remarkable talent in the field of branding and stall design, showcasing exceptional skills and expertise. Their outstanding attitude and strong work ethic further elevate their reputation.',
    name:    'Hiren Panchal',
    role:    'Director',
  },
  {
    logo:    'aahaan-polycare.png',
    company: 'Aahaan Polycare Pvt. Ltd.',
    quote:   'Everyone at AMPL worked incredibly hard and did what we needed them to do to produce in time.',
    name:    'Abhinav Halani',
    role:    'Director',
  },
]

export function Testimonials() {
  return (
    <section className="bg-surface/40 py-20 md:py-28">
      <div className="container-wide">
        {/* Centred, unlike the left-aligned heading this section used to
            carry. The grid it replaced filled the row, so a left heading had
            something under it; a single card in the middle of the container
            left the heading stranded against empty space. This matches the
            clientele row directly above, which is centred already. */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Client voices</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Brands that come back, <span className="text-gradient-brand">show after show.</span>
          </h2>
        </div>

        <TestimonialsStack testimonials={testimonials} cdn={CDN} />

        {/* Live Google reviews — renders once GOOGLE_PLACES_API_KEY +
            GOOGLE_PLACE_ID are configured on Railway */}
        <GoogleReviews />
      </div>
    </section>
  )
}
