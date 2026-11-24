'use client'

/**
 * A paragraph that comes up to full strength word by word as it scrolls
 * through the viewport. The text is one string in the served HTML; reduced
 * motion renders it plain.
 */

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useHydratedReducedMotion } from '@/components/motion/useHydratedReducedMotion'

function Word({ word, progress, range, still }: { word: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, still ? [1, 1] : [0.2, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

export default function ScrollLit({ text, className }: { text: string; className?: string }) {
  const reduce = useHydratedReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.92', 'end 0.55'] })
  const words = text.split(/\s+/).filter(Boolean)
  return (
    <p ref={ref} className={className}>
      {/* The same markup on server and client (rendering plain text under
          reduced motion made hydration fail); reduced motion holds every
          word at full strength instead. */}
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce} />
      ))}
    </p>
  )
}
