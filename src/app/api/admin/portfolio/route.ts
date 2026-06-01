import { NextRequest, NextResponse } from 'next/server'
import { ProjectSchema } from '@/lib/validations/portfolio'
import { createProject } from '@/lib/db/portfolio'
import { cookies } from 'next/headers'

async function isAuthed(): Promise<boolean> {
  const store = await cookies()
  return store.get('admin_auth')?.value === 'authenticated'
}

export async function POST(request: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const body   = await request.json()
  const parsed = ProjectSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 })
  }

  try {
    const project = await createProject(parsed.data)
    return NextResponse.json(project, { status: 201 })
  } catch (err) {
    console.error('[portfolio POST]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
