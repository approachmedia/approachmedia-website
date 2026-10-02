'use client'

/**
 * Every video in a sector, with the long tail folded away until asked for.
 *
 * All of them are on the page — Real Estate's forty-six are all in the DOM,
 * all indexable, all one click from playing. The first twelve are visible and
 * the rest sit behind "Show all N videos", because a forty-six tile wall is a
 * catalogue rather than a page, and the sector copy and enquiry below it
 * would be a very long scroll away.
 *
 * Nothing is fetched for the hidden ones until they are shown: next/image
 * lazy-loads, and an element that is display:none never enters the viewport.
 * So revealing them costs their thumbnails and nothing else, and playing one
 * is still the only thing that contacts YouTube.
 */

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PlaylistEmbed from './PlaylistEmbed'

export type GridVideo = { id: string; title: string; thumb: string }

const INITIAL = 12

export default function VideoGrid({ videos }: { videos: GridVideo[] }) {
  const [expanded, setExpanded] = useState(false)
  const hidden = Math.max(0, videos.length - INITIAL)

  return (
    <>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <li key={v.id} hidden={!expanded && i >= INITIAL}>
            <PlaylistEmbed videoId={v.id} title={v.title} poster={v.thumb} posterAlt="" compact />
          </li>
        ))}
      </ul>

      {hidden > 0 && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-7 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Show all {videos.length} videos
          <ChevronDown className="h-4 w-4" aria-hidden />
        </button>
      )}
    </>
  )
}
