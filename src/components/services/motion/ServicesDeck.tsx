'use client'

/**
 * Style 7 (Tumble Deck) on the services hub: the six service photographs
 * stand on edge one behind the other, and as the page scrolls through this
 * pinned stretch the front one tips forward and lands flat, the next one
 * steps up, until all six have fallen. The page scroll drives it (the
 * component's scrollDriven mode), so the page never stops under the pointer.
 *
 * Decorative: each service has its own card and page just below.
 */

import TumbleDeckShowcase from '@/components/ui/tumble-deck-showcase'

export default function ServicesDeck({ cards }: { cards: { src: string; alt: string }[] }) {
  if (cards.length < 3) return null
  return (
    <div data-td-track style={{ height: `calc(100vh + ${cards.length * 38}vh)` }} className="relative">
      <div className="sticky top-0 h-screen">
        <TumbleDeckShowcase
          cards={cards}
          scrollDriven
          height="100%"
          aspect={1.6}
          depth={4}
          background="transparent"
          ariaLabel="Our services, in photographs"
        />
      </div>
    </div>
  )
}
