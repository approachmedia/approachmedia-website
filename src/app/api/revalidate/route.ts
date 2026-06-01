import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// POST /api/revalidate  body: { slug?: string; secret: string }
// Called automatically after admin publish (or manually via webhook)
export async function POST(request: NextRequest) {
  const { slug, secret } = await request.json()

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (slug) {
    revalidatePath(`/portfolio/${slug}`)
  }

  // Always revalidate the index pages so new projects appear
  revalidatePath('/portfolio')
  revalidatePath('/portfolio/industry/[slug]', 'page')
  revalidatePath('/portfolio/type/[slug]', 'page')

  return NextResponse.json({ revalidated: true, slug: slug ?? 'all' })
}
