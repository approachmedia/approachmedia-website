/**
 * Hub-and-spoke: the blog case study a portfolio project belongs to.
 *
 * Both multi-stall case studies link out to every project they cover, and the
 * publishing notes for both asked for the return link — "add a back-link from
 * each of the N portfolio pages". Nothing was ever built for it, so the
 * PharmaTech hub has been one-directional since it published: fourteen links
 * out, none back.
 *
 * A map rather than a query. The relationship is editorial, not data: the
 * September import carries 26 projects from 13 shows and only these eight are
 * written up. Deriving it from the exhibition name would put the badge on
 * projects the post never mentions.
 *
 * The href is checked before it renders: getPostBySlug returns null for a post
 * whose publish date has not arrived, and ProjectDetail skips the badge in
 * that case. So a case study can be committed with a future date and its
 * eight portfolio pages stay clean until the day it goes live — no second
 * deploy, and never a link to a 404.
 */

export type CaseStudyRef = {
  /** Blog slug, without the /blog prefix. */
  post: string
  /** The sentence shown on the project page, from the post's own notes. */
  label: string
}

const PHARMATECH = {
  post: 'pharmatech-expo-2026-gandhinagar-14-exhibition-stalls',
  label: 'One of 14 stalls we delivered at PharmaTech Expo 2026 — read the case study.',
}

const IPHEX = {
  post: 'iphex-2026-new-delhi-8-exhibition-stalls',
  label: 'One of 8 stalls we delivered at iPHEX 2026 — read the case study.',
}

/** Project slug → the case study covering it. */
export const CASE_STUDY_BY_PROJECT: Record<string, CaseStudyRef> = {
  // iPHEX 2026, Bharat Mandapam — the eight the post writes up.
  'zeon-group-of-companies-exhibition-stall-design-iphex-new-delhi-2026':      IPHEX,
  'salud-care-group-of-companies-exhibition-stall-design-iphex-new-delhi-2026': IPHEX,
  'sanolet-randex-exhibition-stall-design-iphex-new-delhi-2026':               IPHEX,
  'kavit-soap-industries-exhibition-stall-design-iphex-new-delhi-2026':        IPHEX,
  'dev-international-exhibition-stall-design-iphex-new-delhi-2026':            IPHEX,
  'soins-exhibition-stall-design-iphex-new-delhi-2026':                        IPHEX,
  'captavis-biocare-private-limited-exhibition-stall-design-iphex-new-delhi-2026': IPHEX,
  'avantika-exhibition-stall-design-iphex-new-delhi-2026':                     IPHEX,

  // PharmaTech Expo 2026, Helipad Exhibition Centre — the fourteen from the
  // August batch, closing the loop that post opened. Keys are the slugs as
  // imported, which follow the source folder names: the post's own notes
  // record that four clients were renamed in copy (protect → Protech Air
  // Systems, selvio → Stelvio Healthcare, sheel-oversies → Sheel Overseas,
  // GMP → GMP & Shinryo) without the URLs being changed.
  'balkrishna-boilers-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':   PHARMATECH,
  'fayme-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':                PHARMATECH,
  'gmp-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':          PHARMATECH,
  'healthwise-pharma-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':    PHARMATECH,
  'legriffe-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':             PHARMATECH,
  'omish-lab-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':            PHARMATECH,
  'protect-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':  PHARMATECH,
  'r-r-clean-room-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':        PHARMATECH,
  'selvio-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':               PHARMATECH,
  'sharp-process-equipments-exhibition-stall-design-pharmatech-expo-gandhinagar-2026': PHARMATECH,
  'sheel-oversies-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':       PHARMATECH,
  'superpack-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':            PHARMATECH,
  'trade-stone-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':          PHARMATECH,
  'wexford-exhibition-stall-design-pharmatech-expo-gandhinagar-2026':              PHARMATECH,
}
