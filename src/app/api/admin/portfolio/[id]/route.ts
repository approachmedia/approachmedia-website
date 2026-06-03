import { NextRequest, NextResponse } from 'next/server'
import { ProjectUpdateSchema } from '@/lib/validations/portfolio'
import { updateProject } from '@/lib/db/portfolio'
import { prisma } from '@/lib/db/prisma'
import { cookies } from 'next/headers'

async function isAuthed(): Promise<boolean> {
  const store = await cookies()
  return store.get('admin_auth')?.value === 'authenticated'
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id: idStr } = await params
  const id     = parseInt(idStr, 10)
  const body   = await request.json()
  const parsed = ProjectUpdateSchema.safeParse({ ...body, id })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 })
  }

  try {
    const project = await updateProject(id, parsed.data)
    return NextResponse.json(project)
  } catch (err) {
    console.error('[portfolio PATCH]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { id: idStr } = await params
  const id = parseInt(idStr, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  try {
    // Delete related rows first (FK constraints), then the project itself
    await prisma.$transaction([
      prisma.media.deleteMany({ where: { projectId: id } }),
      prisma.projectIndustry.deleteMany({ where: { projectId: id } }),
      prisma.projectStallType.deleteMany({ where: { projectId: id } }),
      prisma.seoMetadata.deleteMany({ where: { projectId: id } }),
      prisma.project.delete({ where: { id } }),
    ])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[portfolio DELETE]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
