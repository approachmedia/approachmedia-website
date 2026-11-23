'use client'

/**
 * StoryChapters — the middle of the project page as one scroll-driven piece.
 *
 * A photograph of the stand holds still in a sticky frame on the left while
 * the chapters (the brief, what was delivered, the case study) scroll past on
 * the right. The frame crossfades to the next photograph as each chapter
 * reaches the middle of the screen, the chapter being read is at full
 * strength and the others sit back, and a thin rail fills with the scroll.
 *
 * Motion decisions (Emil Kowalski's rules, via the animate and choreograph
 * skills): the photograph is the lead and the only thing that travels, a
 * crossfade with a small settle from scale 1.04; the text only changes
 * opacity; everything is transform and opacity on the strong ease-out curve;
 * the rail tracks scroll directly, so it needs no easing at all. Reduced
 * motion keeps the crossfade and drops the scale and the dimming.
 *
 * On a narrow screen nothing is sticky: each chapter carries its own
 * photograph above it, so the story still alternates picture and text.
 * No captions under photographs; the alt text carries the description.
 *
 * Chapters arrive as server-rendered nodes, so all copy is in the first byte
 * of HTML.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export type StoryImage = { src: string; alt: string }
export type StoryChapter = { id: string; content: ReactNode }

export default function StoryChapters({ images, chapters }: { images: StoryImage[]; chapters: StoryChapter[] }) {
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const refs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  // The chapter crossing the middle band of the viewport is the active one.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [chapters.length])

  const { scrollYProgress } = useScroll({ target: root, offset: ['start 0.6', 'end 0.6'] })
  // A light spring takes the steps out of wheel scrolling without lagging it.
  const rail = useSpring(scrollYProgress, { stiffness: 220, damping: 34, mass: 0.4 })

  const has = images.length > 0
  const imageFor = (i: number) => images[Math.min(i, images.length - 1)]
  const shown = Math.min(active, images.length - 1)

  return (
    <div ref={root} className={`story ${has ? '' : 'story--solo'} ${reduce ? 'story--still' : ''}`}>
      {has && (
        <div className="story__stick">
          <div className="story__frame">
            {images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={i === shown ? 'is-on' : ''}
              />
            ))}
          </div>
        </div>
      )}

      <div className="story__rail" aria-hidden="true">
        <motion.i style={{ scaleY: reduce ? scrollYProgress : rail }} />
      </div>

      <div className="story__chapters">
        {chapters.map((c, i) => (
          <section
            key={c.id}
            ref={el => { refs.current[i] = el }}
            data-i={i}
            className={`story__chapter ${i === active ? 'is-on' : ''}`}
          >
            {has && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="story__inline" src={imageFor(i).src} alt="" loading="lazy" decoding="async" />
            )}
            {c.content}
          </section>
        ))}
      </div>
    </div>
  )
}
