'use client'

/**
 * Style 5 (Tilted Grid Hero) as a showreel band under the hero: one row of
 * real project photographs streaming right to left around the inside of a
 * cylinder, the ends curling toward the viewer and fading into the page.
 * Purely visual (the component marks itself aria-hidden); the projects are
 * all linked from the portfolio below.
 */

import { TiltedGridHero, type TiltedGridImage } from '@/components/ui/tilted-grid-hero'

export default function ShowreelBand({ images }: { images: TiltedGridImage[] }) {
  if (images.length < 3) return null
  return (
    <TiltedGridHero
      images={images}
      speed={4.5}
      tileHeight={58}
      axis={50}
      curve={70}
      fade={10}
      className="h-[240px] w-full sm:h-[320px] md:h-[420px]"
    />
  )
}
