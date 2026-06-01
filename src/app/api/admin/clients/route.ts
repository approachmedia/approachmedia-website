import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { createClient } from '@/lib/db/portfolio'

async function isAuthed(): Promise<boolean> {
  const store = await cookies()
  return store.get('admin_auth')?.value === 'authenticated'
}

const Body = z.object({
  name:       z.string().min(2, 'Client name too short').max(200),
  industryId: z.number().int().positive().optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
})

export async function POST(request: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const parsed = Body.safeParse(await request.json())
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 })
  }

  try {
    const client = await createClient(parsed.data)
    return NextResponse.json(client, { status: 201 })
  } catch (err) {
    console.error('[clients POST]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
