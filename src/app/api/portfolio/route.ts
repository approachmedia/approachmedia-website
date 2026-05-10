import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const industry = searchParams.get('industry')
    const country = searchParams.get('country')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = parseInt(searchParams.get('skip') || '0')

    const where: any = {}
    if (featured === 'true') where.featured = true
    if (industry) where.industry = industry
    if (country) where.locationCountry = country

    const projects = await prisma.portfolioProject.findMany({
      where,
      take: limit,
      skip,
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.portfolioProject.count({ where })

    return NextResponse.json({
      projects,
      total,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    )
  }
}
