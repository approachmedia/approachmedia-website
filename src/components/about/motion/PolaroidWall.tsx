'use client'

/**
 * Style 3 (Polaroid Line Carousel) on the About page: real stalls as instant
 * prints pegged to a sagging string. Drag the line, use the arrows or let it
 * play; the prints swing with the speed you give them. Each print is titled
 * with its client and captioned with the show, city and year, all from the
 * project records.
 *
 * Colours follow the site: dark ground, light ink, a muted string.
 */

import PolaroidLineCarousel, { type Slide } from '@/components/ui/polaroid-line-carousel'

export default function PolaroidWall({ slides }: { slides: Slide[] }) {
  if (slides.length < 3) return null
  return (
    <PolaroidLineCarousel
      slides={slides}
      height="88svh"
      cardWidth={280}
      sag={42}
      autoplay={4200}
      string="hsl(220 10% 45%)"
      background="hsl(222 30% 6%)"
      ink="hsl(0 0% 96%)"
      ariaLabel="Stalls we have built"
    />
  )
}
