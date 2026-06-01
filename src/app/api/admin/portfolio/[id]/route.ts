import { NextRequest, NextResponse } from 'next/server'
import { ProjectUpdateSchema } from '@/lib/validations/portfolio'
import { updateProject } from '@/lib/db/portfolio'
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
