import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db/prisma'

async function isAuthed() {
  const jar = await cookies()
  return jar.get('admin_auth')?.value === 'authenticated'
}

// POST { ids: number[], featured: boolean } — set/unset isFeatured in bulk
export async function POST(request: NextRequest) {
  if (!await isAuthed()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { ids, featured } = await request.json() as { ids: number[]; featured?: boolean }
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'No ids provided' }, { status: 400 })
  }

  const result = await prisma.project.updateMany({
    where: { id: { in: ids } },
    data:  { isFeatured: featured !== false },
  })
  revalidateTag('projects')

  return NextResponse.json({ updated: result.count })
}
