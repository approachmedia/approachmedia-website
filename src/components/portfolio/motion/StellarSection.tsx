'use client'

/** Loads the 3D sphere only when this page is visited (three.js is heavy). */

import dynamic from 'next/dynamic'
import type { StellarCard } from './StellarGallery'

const StellarGallery = dynamic(() => import('./StellarGallery'), { ssr: false })

export default function StellarSection({ cards }: { cards: StellarCard[] }) {
  if (cards.length < 6) return null
  return (
    <div className="relative">
      <StellarGallery cards={cards} />
      <p className="pointer-events-none absolute bottom-4 left-0 right-0 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
        <span className="hidden [@media(hover:hover)_and_(pointer:fine)]:inline">Drag to turn · Click a card</span>
        <span className="[@media(hover:hover)_and_(pointer:fine)]:hidden">Tap a card</span>
      </p>
    </div>
  )
}
