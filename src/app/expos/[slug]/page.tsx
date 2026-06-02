import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import expoData from '@/data/expo-pages.json'
import ExpoPageTemplate from '@/components/expo/ExpoPageTemplate'
import type { ExpoPageData } from '@/components/expo/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://approachmedia.in'

export async function generateStaticParams() {
  return (expoData as ExpoPageData[]).map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const expo = (expoData as ExpoPageData[]).find(e => e.slug === slug)
  if (!expo) return {}
  return {
    title: expo.metaTitle,
    description: expo.metaDescription,
    alternates: { canonical: `${SITE_URL}/expos/${expo.slug}` },
  }
}

export default async function ExpoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const expo = (expoData as ExpoPageData[]).find(e => e.slug === slug)
  if (!expo) notFound()
  return <ExpoPageTemplate data={expo as ExpoPageData} />
}
