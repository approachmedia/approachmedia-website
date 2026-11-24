'use client'

/**
 * Style 1 (Infinite Gallery) behind the closing call to action: the
 * project photographs fly toward the viewer as the page scrolls into the
 * close. Loaded only on demand (three.js is heavy and this is the bottom of
 * the page), so it costs nothing to a visitor who never gets there.
 */

import dynamic from 'next/dynamic'
import type { GalleryImage } from '@/components/ui/3d-gallery-photography'

const InfiniteGallery = dynamic(() => import('@/components/ui/3d-gallery-photography'), { ssr: false })

export default function CtaGallery({ images }: { images: GalleryImage[] }) {
  if (images.length < 4) return null
  return <InfiniteGallery images={images} speed={1.2} visibleCount={12} className="absolute inset-0" />
}
