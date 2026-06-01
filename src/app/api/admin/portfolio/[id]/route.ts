import { NextRequest, NextResponse } from 'next/server'
import { ProjectUpdateSchema } from '@/lib/validations/portfolio'
import { updateProject } from '@/lib/db/portfolio'
import { cookies } from 'next/headers'

function isAuthed() {
  const store = cookies()
  return (store as unknown as { get: (key: string) => { value: string } | undefined }).get('admin_auth')?.value === 'authenticated'
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthed()) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const id     = parseInt(params.id, 10)
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
