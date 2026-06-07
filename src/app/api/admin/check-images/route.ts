import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db/prisma'
import { getCdnBaseUrl, buildMediaUrl } from '@/lib/db/config'

async function isAuthenticated() {
  const jar = await cookies()
  return jar.get('admin_auth')?.value === 'authenticated'
}

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const cdnBase = await getCdnBaseUrl()

  // Get 5 most recent projects with their hero images
  const projects = await prisma.project.findMany({
    take:    5,
    orderBy: { createdAt: 'desc' },
    select: {
      id:    true,
      title: true,
      slug:  true,
      media: {
        where:   { isHero: true },
        take:    1,
        select:  { id: true, url: true, cdnUrl: true, isHero: true },
      },
    },
  })

  const totalMedia = await prisma.media.count()
  const heroMedia  = await prisma.media.count({ where: { isHero: true } })

  // Test each built URL with a HEAD request to check if file exists in R2
  const projectsWithStatus = await Promise.all(projects.map(async p => {
    const builtUrl = p.media[0] ? buildMediaUrl(p.media[0].url, cdnBase) : null
    let httpStatus: number | null = null
    if (builtUrl) {
      try {
        const res = await fetch(builtUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
        httpStatus = res.status
      } catch {
        httpStatus = 0
      }
    }
    return {
      id:    p.id,
      title: p.title.slice(0, 60),
      slug:  p.slug,
      hero:  p.media[0] ? {
        storedUrl:    p.media[0].url,
        storedCdnUrl: p.media[0].cdnUrl,
        builtUrl,
        httpStatus,
      } : null,
    }
  }))

  return NextResponse.json({
    cdnBase,
    totalMedia,
    heroMedia,
    projects: projectsWithStatus,
  })
}
