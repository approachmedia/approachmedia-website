'use client'

/**
 * Style 9 (Domino Gallery): the first featured stalls stand like dominoes
 * and fall one after another as the page scrolls; scrolling back stands them
 * up again. A card opens its project. Phones get shorter, narrower cards
 * (the component fits them to the width) and a shorter scroll.
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DominoGallery, type DominoItem } from '@/components/ui/domino-gallery'

export default function DominoWorks({ items }: { items: (DominoItem & { href?: string })[] }) {
  const router = useRouter()
  // Five cards need about 470px; a phone shows four, a little closer together.
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(max-width: 479px)')
    const on = () => setNarrow(m.matches)
    on(); m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  if (items.length < 3) return null
  const shown = narrow ? items.slice(0, 4) : items
  return (
    <DominoGallery
      items={shown}
      className="overflow-x-clip"
      cardWidth={230}
      cardHeight={520}
      gap={narrow ? 10 : 16}
      scrollLength={1300}
      standAngle={92}
      onSelect={i => { const h = shown[i].href; if (h) router.push(h) }}
    />
  )
}
