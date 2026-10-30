/**
 * Matching Open Graph and Twitter image blocks for a page's metadata.
 *
 * Two traps this exists to close.
 *
 * The first is that Next merges metadata shallowly. A page that declares its
 * own `openGraph` does NOT inherit `openGraph.images` from the root layout,
 * so the services pages, which set a title and description but no images,
 * were shipping with no og:image at all.
 *
 * The second is the mirror of it: a page that sets `openGraph.images` but no
 * `twitter` keeps the root layout's `twitter.images`. Portfolio pages set the
 * project photograph for Open Graph and still handed X the site default, so
 * every project shared on X showed the same card, and that card was pointing
 * at a file that did not exist.
 *
 * Passing no url gives the site default, which is a real 1200x630 file in
 * public/ and is the one case where the dimensions are known and declared.
 * Project photographs come from R2 at sizes this code cannot read, so width
 * and height are left off rather than guessed; both are optional hints and a
 * wrong pair is worse than none.
 *
 * On formats: X documents JPG, PNG, WEBP and GIF as supported for
 * summary_large_image, so the WebP project photographs are handed over as
 * they are. Converting the library to JPEG for the sake of social cards
 * would be several hundred new files for no documented gain.
 */

export const DEFAULT_OG_IMAGE = '/og-default.jpg'
export const DEFAULT_OG_ALT = 'Approach Media, exhibition stall design and fabrication, Ahmedabad'

type Social = {
  openGraph: { images: { url: string; alt: string; width?: number; height?: number }[] }
  twitter: { card: 'summary_large_image'; images: string[] }
}

/**
 * @param url Absolute image URL. Omit for the site's default card.
 * @param alt Describes the image; falls back to the default card's wording.
 */
export function socialImage(url?: string | null, alt?: string | null): Social {
  const isDefault = !url
  const src = url || DEFAULT_OG_IMAGE
  return {
    openGraph: {
      images: [{
        url: src,
        alt: alt || DEFAULT_OG_ALT,
        // Known only for the file we ship ourselves.
        ...(isDefault ? { width: 1200, height: 630 } : {}),
      }],
    },
    twitter: { card: 'summary_large_image', images: [src] },
  }
}
