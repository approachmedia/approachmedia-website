import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db/prisma'

async function isAuthenticated() {
  const jar = await cookies()
  return jar.get('admin_auth')?.value === 'authenticated'
}

// Encode every path segment — same logic as buildMediaUrl fix
function encodePath(url: string): string {
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return url.replace(/^\//, '').split('/').map(encodeURIComponent).join('/')
}

export async function POST() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  // Load all media records where url doesn't start with http (relative paths)
  const all = await prisma.media.findMany({
    select: { id: true, url: true, cdnUrl: true, thumbnailUrl: true },
  })

  let updated = 0
  const errors: string[] = []

  for (const m of all) {
    const newUrl          = encodePath(m.url)
    const newCdnUrl       = m.cdnUrl       ? encodePath(m.cdnUrl)       : m.cdnUrl
    const newThumbnailUrl = m.thumbnailUrl ? encodePath(m.thumbnailUrl) : m.thumbnailUrl

    const changed = newUrl !== m.url || newCdnUrl !== m.cdnUrl || newThumbnailUrl !== m.thumbnailUrl
    if (!changed) continue

    try {
      await prisma.media.update({
        where: { id: m.id },
        data:  { url: newUrl, cdnUrl: newCdnUrl, thumbnailUrl: newThumbnailUrl },
      })
      updated++
    } catch (e) {
      errors.push(`id=${m.id}: ${String(e).slice(0, 100)}`)
    }
  }

  return NextResponse.json({ total: all.length, updated, errors })
}
