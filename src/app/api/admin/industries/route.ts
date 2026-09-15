import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'
import { createIndustry } from '@/lib/db/portfolio'

/**
 * Create a category from the Industry column on the admin table.
 *
 * Categories used to be creatable only by the importer, which invents one
 * whenever a sheet carries a name that is not on the list. Typing a new one in
 * the table hit "No matches" and there was nowhere to go from there.
 *
 * Creating is deduplicated case-insensitively in createIndustry, so the
 * response may be an existing row. That is deliberate: the caller only needs
 * an id to select, and two categories differing by capitalisation would give
 * the site two public pages competing for the same term.
 */

const Body = z.object({
  name: z.string().trim().min(2, 'Category name too short').max(120),
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

  try {
    const industry = await createIndustry(parsed.data.name)
    // The public industry pages and the portfolio filters are built from this
    // list, so they have to see a new one.
    revalidateTag('projects')
    return NextResponse.json({ id: industry.id, name: industry.name, slug: industry.slug }, { status: 201 })
  } catch (err) {
    console.error('[industries POST]', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
