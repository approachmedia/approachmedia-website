import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { createExhibition } from '@/lib/db/portfolio'

async function isAuthed(): Promise<boolean> {
  const store = await cookies()
  return store.get('admin_auth')?.value === 'authenticated'
}

const Body = z.object({
  name:      z.string().min(2, 'Exhibition name too short').max(200),
  city:      z.string().max(100).optional(),
  venueName: z.string().max(200).optional(),
  startDate: z.coerce.date().optional(),
})

export async function POST(request: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const parsed = Body.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 })
  }

  try {
    const exhibition = await createExhibition(parsed.data)
    return NextResponse.json(exhibition, { status: 201 })
  } catch (err) {
    console.error('[exhibitions POST]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
