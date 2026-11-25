'use client'

/**
 * Style 14: a figure drawn in particles that scatter from the cursor (or a
 * finger) and drift back. Used for one real number at a time; the number is
 * also printed as text beside it, so the canvas is decorative.
 */

import { CursorDrivenParticleTypography } from '@/components/ui/cursor-driven-particles-typography'

export default function ParticleFigure({ text, className }: { text: string; className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <CursorDrivenParticleTypography
        text={text}
        fontSize={200}
        maxWidthRatio={0.24}
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        particleDensity={4}
        particleSize={1.4}
        dispersionStrength={18}
        color="hsl(110, 60%, 55%)"
        className="!h-[120px] !min-h-0 md:!h-[190px]"
      />
    </div>
  )
}
