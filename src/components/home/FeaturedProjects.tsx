import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Project = {
  id: string
  title: string
  slug: string
  client: string | null
  cover_image_url: string
  exhibition_name: string | null
  city: string | null
  country: string | null
  year: number | null
  industry: { name: string } | null
}

const projects: Project[] = [
  { id: 'f1', title: 'Luxury Retail Launch Pavilion', slug: 'luxury-retail-launch-2025', client: 'Confidential FMCG Brand', industry: { name: 'FMCG / Retail' }, exhibition_name: 'Ambiente',  city: 'Frankfurt',      country: 'Germany', year: 2025, cover_image_url: '/home/project-1.jpg' },
  { id: 'f2', title: 'Pharma Innovation Stand',        slug: 'pharma-innovation-stand',     client: 'Leading Pharma Co.',     industry: { name: 'Pharma' },       exhibition_name: 'CPHI',      city: 'Barcelona',      country: 'Spain',   year: 2024, cover_image_url: '/home/project-2.jpg' },
  { id: 'f3', title: 'Automotive Double-Decker',       slug: 'automotive-double-decker',    client: 'Global Auto OEM',        industry: { name: 'Automotive' },   exhibition_name: 'Auto Expo', city: 'Greater Noida',  country: 'India',   year: 2024, cover_image_url: '/home/project-3.jpg' },
]

export function FeaturedProjects() {
  return (
    <section className="py-20 md:py-28" id="portfolio">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-green">Featured projects</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Selected work across <span className="text-gradient-brand">global stages.</span>
            </h2>
          </div>
          <Button asChild variant="glass">
            <Link href="/portfolio">View Complete Portfolio <ArrowUpRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <Link
              key={p.id}
              href="/portfolio"
              className="group relative overflow-hidden rounded-2xl border border-border/20 bg-surface"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image
                  src={p.cover_image_url}
                  alt={`${p.title} — exhibition stall by Approach Media`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
                {p.industry && (
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-white/90 backdrop-blur">
                    {p.industry.name}
                  </span>
                )}
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-brand-green-glow">
                  {p.title}
                </h3>
                {(p.client || p.exhibition_name) && (
                  <p className="mt-1 text-sm text-muted-foreground">{[p.client, p.exhibition_name].filter(Boolean).join(' · ')}</p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  {(p.city || p.country) && (
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{[p.city, p.country].filter(Boolean).join(', ')}</span>
                  )}
                  {p.year && <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{p.year}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
