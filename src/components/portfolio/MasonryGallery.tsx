'use client'

import Image from 'next/image'
import { useState } from 'react'

export type GalleryItem = {
  id: number
  src: string
  alt: string
  caption?: string | null
}

/**
 * Responsive masonry photo grid (Elixir-style).
 * Uses CSS columns so images of differing heights pack tightly with no gaps.
 * Columns scale 1 → 2 → 3 with viewport width. Click any image for a lightbox.
 */
export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="masonry-grid">
        {items.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(img)}
            className="masonry-item"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority={i < 2}
            />
            {img.caption && <span className="masonry-caption">{img.caption}</span>}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'hsl(222 40% 3% / 0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'hsl(222 24% 12%)',
              border: '1px solid hsl(222 18% 22%)',
              color: 'hsl(0 0% 80%)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
          <figure style={{ margin: 0, maxWidth: '90vw', maxHeight: '88vh', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <Image
              src={active.src}
              alt={active.alt}
              width={1600}
              height={1200}
              sizes="90vw"
              style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: '8px' }}
            />
            {active.caption && (
              <figcaption style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.82rem', color: 'hsl(220 10% 60%)' }}>
                {active.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}

      <style>{`
        .masonry-grid {
          column-count: 1;
          column-gap: 16px;
        }
        @media (min-width: 640px) {
          .masonry-grid { column-count: 2; }
        }
        @media (min-width: 1024px) {
          .masonry-grid { column-count: 3; }
        }
        .masonry-item {
          position: relative;
          display: block;
          width: 100%;
          margin: 0 0 16px;
          padding: 0;
          border: 1px solid hsl(222 18% 16%);
          border-radius: 12px;
          overflow: hidden;
          background: hsl(222 24% 9%);
          cursor: zoom-in;
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
        }
        .masonry-item img {
          transition: transform 0.5s ease, opacity 0.3s ease;
        }
        .masonry-item:hover img {
          transform: scale(1.04);
        }
        .masonry-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 18px 14px 10px;
          font-size: 0.72rem;
          color: hsl(220 10% 78%);
          text-align: left;
          background: linear-gradient(to top, hsl(222 40% 4% / 0.92), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .masonry-item:hover .masonry-caption {
          opacity: 1;
        }
      `}</style>
    </>
  )
}
