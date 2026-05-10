import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const country = searchParams.get('country')
    const industry = searchParams.get('industry')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = parseInt(searchParams.get('skip') || '0')

    const where: any = {
      startDate: {
        gte: new Date(),
      },
    }
    if (featured === 'true') where.featured = true
    if (country) where.country = country
    if (industry) where.industryCategory = industry

    const exhibitions = await prisma.upcomingExhibition.findMany({
      where,
      take: limit,
      skip,
      orderBy: { startDate: 'asc' },
    })

    const total = await prisma.upcomingExhibition.count({ where })

    return NextResponse.json({
      exhibitions,
      total,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch exhibitions' },
      { status: 500 }
    )
  }
}
