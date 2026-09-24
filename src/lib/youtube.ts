import { unstable_cache } from 'next/cache'

/**
 * The videos inside a YouTube playlist, for the industry pages.
 *
 * The pages used to embed the playlist as one player. The owner wants the
 * videos themselves visible — six or more per sector — which needs the
 * individual video ids, and those are not in a playlist URL.
 *
 * Read from the YouTube Data API rather than pasted into the repo, for one
 * reason worth the extra moving part: the owner adds videos to these
 * playlists. Baked-in ids would be right on the day they were copied and
 * quietly stale after that, and would have to be re-copied by hand every
 * time. This way the page follows the channel.
 *
 * DEGRADES TO EXACTLY TODAY'S BEHAVIOUR. No key, a bad key, exhausted quota,
 * a network failure, a deleted playlist — every one of them returns an empty
 * list, and the page falls back to the single playlist player it already
 * shows. Nothing on the site breaks if YOUTUBE_API_KEY is never set.
 *
 * Cost: one quota unit per playlist per refresh, against a default 10,000 a
 * day. Fifteen playlists on a twelve-hour cache is thirty units.
 */

export type PlaylistVideo = {
  id: string
  title: string
  /** YouTube's own thumbnail for the video. */
  thumb: string
}

const CACHE_SECONDS = 60 * 60 * 12

/** Highest-quality still that exists for every video. */
const thumbFor = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

async function fetchPlaylist(playlistId: string, max: number): Promise<PlaylistVideo[]> {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) return []

  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
  url.searchParams.set('part', 'snippet,contentDetails')
  url.searchParams.set('playlistId', playlistId)
  url.searchParams.set('maxResults', String(Math.min(Math.max(max, 1), 50)))
  url.searchParams.set('key', key)

  try {
    const res = await fetch(url, { next: { revalidate: CACHE_SECONDS } })
    if (!res.ok) {
      // A wrong id, a private playlist or a spent quota all land here. Logged
      // once rather than thrown, so one bad playlist cannot take a page down.
      console.warn(`[youtube] ${playlistId}: ${res.status} ${res.statusText}`)
      return []
    }
    const body = await res.json() as {
      items?: { snippet?: { title?: string; resourceId?: { videoId?: string } } }[]
    }
    return (body.items ?? [])
      .map(i => ({
        id:    i.snippet?.resourceId?.videoId ?? '',
        title: i.snippet?.title ?? '',
      }))
      // Deleted and private videos stay in a playlist with a placeholder
      // title and no usable id. Both are dropped.
      .filter(v => v.id && v.title && v.title !== 'Deleted video' && v.title !== 'Private video')
      .map(v => ({ ...v, thumb: thumbFor(v.id) }))
  } catch (err) {
    console.warn(`[youtube] ${playlistId}: ${String(err).slice(0, 120)}`)
    return []
  }
}

/**
 * Cached per playlist, so two pages sharing one playlist — Cosmetics and
 * Printing & Packaging both use Cosmetic & Packaging — cost one call between
 * them rather than one each.
 */
export function getPlaylistVideos(playlistId: string, max = 6) {
  return unstable_cache(
    () => fetchPlaylist(playlistId, max),
    ['youtube-playlist', playlistId, String(max)],
    { revalidate: CACHE_SECONDS, tags: ['youtube'] },
  )()
}

/** Every playlist on one page, flattened and de-duplicated by video id. */
export async function getVideosForPlaylists(ids: string[], perPlaylist = 6): Promise<PlaylistVideo[]> {
  const lists = await Promise.all(ids.map(id => getPlaylistVideos(id, perPlaylist)))
  const seen = new Set<string>()
  return lists.flat().filter(v => (seen.has(v.id) ? false : (seen.add(v.id), true)))
}
