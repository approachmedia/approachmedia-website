/**
 * Rewrite the gallery alt text both importers generated before
 * src/lib/gallery-alt.mjs existed.
 *
 * Every gallery photograph used to get `${project title} — photo ${n}`, so a
 * project with thirty photographs had thirty alt texts differing only by a
 * number. The new sentence carries the floor area and how many sides are
 * open, which are the two attributes the keyword lists actually target.
 *
 * SAFE TO THE OWNER'S OWN WORK. A row is rewritten only when its current alt
 * is exactly the old generated string for that project. Anything typed in the
 * admin, and every hero, is left untouched. The alt is rebuilt from the
 * project's stored fields, never from the filename, because the filename
 * scheme is marketing words rather than descriptions.
 *
 * Runs once, ever. A marker row in app_config records completion, in the same
 * way as the portfolio batch importer, so a later deploy cannot undo an edit
 * the owner made afterwards.
 *
 * Never exits non-zero: the site must start whatever happens here.
 */
import prismaPkg from '@prisma/client'
import { galleryAlt, isGeneratedGalleryAlt } from '../src/lib/gallery-alt.mjs'

const { PrismaClient } = prismaPkg
const MARKER = 'media_alt_backfill:gallery-v2'

async function main() {
  const prisma = new PrismaClient()
  try {
    if (await prisma.appConfig.findUnique({ where: { key: MARKER } })) {
      console.log('[backfill-alt] already run, skipping')
      return
    }

    const projects = await prisma.project.findMany({
      select: {
        title: true, city: true, stallAreaSqm: true,
        client: { select: { name: true } },
        exhibition: { select: { name: true } },
        stallTypes: {
          select: { isPrimary: true, stallType: { select: { name: true } } },
          orderBy: { isPrimary: 'desc' },
        },
        media: {
          where: { isHero: false, mediaType: 'image' },
          select: { id: true, altText: true, displayOrder: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
    })

    let looked = 0, changed = 0, kept = 0
    for (const p of projects) {
      // The shape galleryAlt expects, from the stored record rather than a
      // spreadsheet row.
      const row = {
        client_name: p.client?.name ?? '',
        stall_area_sqm: p.stallAreaSqm ?? '',
        stall_types: p.stallTypes.map(t => t.stallType.name).join('|'),
        exhibition_name: p.exhibition?.name ?? '',
        city: p.city ?? '',
      }
      for (const m of p.media) {
        looked++
        if (!isGeneratedGalleryAlt(m.altText, p.title)) { kept++; continue }
        const next = galleryAlt(row, m.displayOrder)
        if (next === m.altText) { kept++; continue }
        await prisma.media.update({ where: { id: m.id }, data: { altText: next } })
        changed++
      }
    }

    await prisma.appConfig.upsert({
      where: { key: MARKER },
      create: {
        key: MARKER,
        value: `rewrote ${changed}/${looked} gallery alt texts on ${new Date().toISOString()}`,
        description: 'One-shot gallery alt backfill marker. Delete this row to let it run again.',
      },
      update: { value: `rewrote ${changed}/${looked} on ${new Date().toISOString()}` },
    })
    console.log(`[backfill-alt] gallery images seen ${looked}, rewritten ${changed}, left alone ${kept}`)
  } catch (e) {
    console.log(`[backfill-alt] failed (site will still start): ${String(e).slice(0, 300)}`)
  } finally {
    await prisma.$disconnect().catch(() => {})
  }
}

main()
