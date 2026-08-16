'use client'
import Image from 'next/image'
import { useState } from 'react'

// Renders a venue photo, falling back to a clean placeholder when the
// image is missing or fails to load (e.g. before the photo is uploaded).
export default function VenueImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      // next/image rather than a raw tag: these are full-size R2 originals
      // being painted into a small card. onError still drives the fallback
      // below, so a missing photo behaves exactly as before.
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => setFailed(true)}
        style={{ objectFit: 'cover' }}
      />
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="hsl(220 10% 28%)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
      <span style={{ color: 'hsl(220 10% 30%)', fontSize: '0.78rem', textAlign: 'center', maxWidth: '140px', lineHeight: 1.5 }}>Venue photo coming soon</span>
    </div>
  )
}
