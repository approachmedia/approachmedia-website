'use client'

/**
 * A YouTube playlist on an industry page, loaded only when someone asks for it.
 *
 * Click-to-load, not a bare <iframe>. A YouTube embed pulls roughly a megabyte
 * of third-party JavaScript and sets cookies on arrival, on every one of these
 * pages, for every visitor — including the ones who never press play. Until
 * the play button is clicked this component is one <img> and a <button>: no
 * request to Google, nothing to disclose, nothing to slow the page down.
 *
 * The poster is one of the sector's own project photographs, passed in by the
 * page. That keeps the rule this site works to — real Approach Media work
 * only, never stock and never a generated image — and it means the poster is
 * a stand we actually built rather than a YouTube thumbnail.
 *
 * Once clicked it embeds from youtube-nocookie.com, which is YouTube's own
 * no-tracking-until-playback host, and autoplays because the click was the
 * request to watch.
 */

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

export default function PlaylistEmbed({
  playlistId, videoId, title, poster, posterAlt, compact,
}: {
  /** Embed a whole playlist... */
  playlistId?: string
  /** ...or one video from it. Exactly one of the two. */
  videoId?: string
  /** Names it for screen readers and for the button label. */
  title: string
  poster?: string
  posterAlt?: string
  /** Grid tile rather than a feature panel: smaller play button and caption. */
  compact?: boolean
}) {
  const [playing, setPlaying] = useState(false)

  const src = videoId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId ?? '')}&autoplay=1&rel=0`

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/12 bg-surface/40">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {poster ? (
            <Image
              src={poster}
              alt={posterAlt || ''}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover opacity-70 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-80"
            />
          ) : (
            <span className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 to-brand-green/20" />
          )}
          <span className="absolute inset-0 bg-black/30" aria-hidden />
          <span className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-green shadow-lg shadow-black/40 transition group-hover:scale-105 ${compact ? 'h-12 w-12' : 'h-16 w-16'}`}>
            <Play className={`ml-0.5 fill-accent-foreground text-accent-foreground ${compact ? 'h-5 w-5' : 'h-7 w-7'}`} aria-hidden />
          </span>
          <span className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent text-left font-semibold text-white ${compact ? 'line-clamp-2 p-3 pt-8 text-xs' : 'p-5 text-sm md:text-base'}`}>
            {title}
          </span>
        </button>
      )}
    </div>
  )
}
