import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/db/prisma'

async function isAuthed() {
  const jar = await cookies()
  return jar.get('admin_auth')?.value === 'authenticated'
}

export async function POST(request: NextRequest) {
  if (!await isAuthed()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { ids } = await request.json() as { ids: number[] }
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'No ids provided' }, { status: 400 })
  }

  await prisma.project.deleteMany({ where: { id: { in: ids } } })
  revalidateTag('projects')

  return NextResponse.json({ deleted: ids.length })
}
