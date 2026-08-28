import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { setProjectIndustry } from '@/lib/db/portfolio'

/**
 * One project in or out of one category.
 *
 * Separate from PATCH /api/admin/portfolio/[id] on purpose. That route takes
 * the whole industryIds array and replaces it, and its schema requires at
 * least one entry — so it cannot take a project out of its only category,
 * which is exactly what the clean-up screen is for.
 *
 * 'add' is here for the undo on that screen, not for assigning categories;
 * assigning is still the Industry column on the main table.
 */

const Body = z.object({
  projectId:  z.number().int().positive(),
  industryId: z.number().int().positive(),
  op:         z.enum(['add', 'remove']),
})

async function isAuthed(): Promise<boolean> {
  const store = await cookies()
  return store.get('admin_auth')?.value === 'authenticated'
}

export async function POST(request: NextRequest) {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const parsed = Body.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', issues: parsed.error.flatten() }, { status: 422 })
  }

  const { projectId, industryId, op } = parsed.data

  try {
    const result = await setProjectIndustry(projectId, industryId, op)
    // Same tag the other portfolio writes use, so the public industry pages
    // pick the change up.
    if (result.changed) revalidateTag('projects')
    return NextResponse.json(result)
  } catch (err) {
    console.error('[portfolio categories POST]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
