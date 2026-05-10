import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = parseInt(searchParams.get('skip') || '0')

    const where: any = {
      status: 'published',
    }
    if (category) where.category = category

    const posts = await prisma.blogPost.findMany({
      where,
      take: limit,
      skip,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        author: true,
        publishedAt: true,
        category: true,
        tags: true,
      },
    })

    const total = await prisma.blogPost.count({ where })

    return NextResponse.json({
      posts,
      total,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
