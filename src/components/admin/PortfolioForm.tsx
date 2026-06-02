'use client'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { Industry, StallType, Exhibition, Client } from '@prisma/client'

import { ProjectSchema, type ProjectInput, validateAiSummary } from '@/lib/validations/portfolio'
import TagInput from './TagInput'
import MediaSection from './MediaSection'
import ComboBox, { type ComboOption } from './ComboBox'

// ─────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────

interface PortfolioFormProps {
  industries:  Industry[]
  stallTypes:  StallType[]
  exhibitions: Exhibition[]
  clients:     Client[]
  defaultValues?: Partial<ProjectInput>
  projectId?:  number
}

// ─────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────

function Section({ n, title, subtitle, children }: { n: number; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      <div className="flex items-center gap-4 px-6 py-4 bg-slate-800/60 border-b border-slate-700">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">{n}</span>
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FIELD HELPERS (rendered as Tailwind classes
// via globals.css — added below)
// ─────────────────────────────────────────────

function Field({ label, required, hint, error, counter, children }: {
  label: string; required?: boolean; hint?: string; error?: string
  counter?: { current: number; max: number }; children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest">
          {label}{required && <span className="text-red-400 ml-1">*</span>}
        </label>
        {counter && (
          <span className={`text-xs font-mono ${counter.current > counter.max ? 'text-red-400' : counter.current > counter.max * 0.85 ? 'text-yellow-400' : 'text-slate-500'}`}>
            {counter.current}/{counter.max}
          </span>
        )}
      </div>
      {children}
      {hint  && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

// ─────────────────────────────────────────────
// CHECKBOX MULTI-SELECT
// ─────────────────────────────────────────────

function MultiCheck({ items, selected, onChange, error }: {
  items: { id: number; name: string }[]
  selected: number[]
  onChange: (ids: number[]) => void
  error?: string
}) {
  function toggle(id: number) {
    onChange(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id])
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggle(item.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              selected.includes(item.id)
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-blue-500 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export default function PortfolioForm({ industries, stallTypes, exhibitions, clients, defaultValues, projectId }: PortfolioFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const methods = useForm<ProjectInput>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      status:       'draft',
      floors:       1,
      displayOrder: 0,
      isFeatured:   false,
      industryIds:  [],
      stallTypeIds: [],
      materialsUsed:   [],
      specialFeatures: [],
      awards:          [],
      media:           [],
      ...defaultValues,
    },
  })

  const { register, control, watch, setValue, formState: { errors } } = methods

  // ─── ComboBox option lists (client + exhibition) ────────────
  const clientOptions: ComboOption[] = clients.map(c => ({ id: c.id, label: c.name }))
  const exhibitionOptions: ComboOption[] = exhibitions.map(e => ({
    id: e.id, label: e.name, sublabel: e.city ?? undefined,
  }))

  async function createClientInline(name: string): Promise<ComboOption> {
    const res = await fetch('/api/admin/clients', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name }),
    })
    if (!res.ok) throw new Error('Failed to create client')
    const c = await res.json()
    return { id: c.id, label: c.name }
  }

  async function createExhibitionInline(name: string): Promise<ComboOption> {
    const res = await fetch('/api/admin/exhibitions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name }),
    })
    if (!res.ok) throw new Error('Failed to create exhibition')
    const e = await res.json()
    return { id: e.id, label: e.name, sublabel: e.city ?? undefined }
  }

  // Live slug generation from title
  const title = watch('title') ?? ''
  function autoSlug() {
    if (!watch('slug')) {
      setValue('slug', title.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 320)
      )
    }
  }

  // Live word count for AI summary
  const aiSummaryText    = watch('aiSummary') ?? ''
  const aiSummaryStatus  = validateAiSummary(aiSummaryText)
  const metaTitleText    = watch('seoMetadata.metaTitle')       ?? ''
  const metaDescText     = watch('seoMetadata.metaDescription') ?? ''
  const aiContextText    = watch('seoMetadata.aiContextSummary') ?? ''

  async function onSubmit(data: ProjectInput) {
    setSaving(true)
    setSaveError(null)
    try {
      const res = await fetch(
        projectId ? `/api/admin/portfolio/${projectId}` : '/api/admin/portfolio',
        {
          method:  projectId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(data),
        }
      )
      if (!res.ok) {
        const body = await res.json()
        setSaveError(body.error ?? 'Save failed')
        return
      }
      const saved = await res.json()
      router.push(`/admin/portfolio`)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  // ─── RENDER ─────────────────────────────────

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate className="space-y-8">

        {/* ── SECTION 1: FACT ENTITY TAGS ────────────────────── */}
        <Section n={1} title="Fact Entity Tags" subtitle="Structured data parsed directly by AI search engines — every field must be specific and factual">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Project Title" required error={errors.title?.message}>
              <input {...register('title')} onBlur={autoSlug} placeholder="Sun Pharma — 72 sqm Double Decker Stand, CPHI India 2024" className="field-input" />
            </Field>
            <Field label="URL Slug" required hint="Auto-generated from title. kebab-case only." error={errors.slug?.message}>
              <input {...register('slug')} placeholder="sun-pharma-cphi-india-2024-72sqm-double-decker" className="field-input font-mono text-sm" />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Client" hint="Search, or type a new name and click + Create">
              <Controller name="clientId" control={control} render={({ field }) => (
                <ComboBox
                  options={clientOptions}
                  value={field.value as number | undefined}
                  onChange={field.onChange}
                  placeholder="Search clients…"
                  createLabel="Add client"
                  onCreate={createClientInline}
                />
              )} />
            </Field>
            <Field label="Exhibition / Trade Show" hint="Search, or type a new name and click + Create">
              <Controller name="exhibitionId" control={control} render={({ field }) => (
                <ComboBox
                  options={exhibitionOptions}
                  value={field.value as number | undefined}
                  onChange={field.onChange}
                  placeholder="Search exhibitions…"
                  createLabel="Add exhibition"
                  onCreate={createExhibitionInline}
                />
              )} />
            </Field>
          </div>

          <Field label="Industries" required hint="Select all that apply — first selection = primary" error={errors.industryIds?.message}>
            <Controller
              name="industryIds" control={control}
              render={({ field }) => (
                <MultiCheck items={industries} selected={field.value ?? []} onChange={field.onChange} error={errors.industryIds?.message} />
              )}
            />
          </Field>

          <Field label="Stall Types" required hint="Select all that apply — first selection = primary" error={errors.stallTypeIds?.message}>
            <Controller
              name="stallTypeIds" control={control}
              render={({ field }) => (
                <MultiCheck items={stallTypes} selected={field.value ?? []} onChange={field.onChange} error={errors.stallTypeIds?.message} />
              )}
            />
          </Field>

          {/* Physical specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="Area (sqm)" error={errors.stallAreaSqm?.message}>
              <input {...register('stallAreaSqm', { setValueAs: v => v === '' ? undefined : Number(v) })} type="number" step="0.01" placeholder="72" className="field-input" />
            </Field>
            <Field label="Area (sqft)" error={errors.stallAreaSqft?.message}>
              <input {...register('stallAreaSqft', { setValueAs: v => v === '' ? undefined : Number(v) })} type="number" step="0.01" placeholder="775" className="field-input" />
            </Field>
            <Field label="Height (m)" error={errors.stallHeightM?.message}>
              <input {...register('stallHeightM', { setValueAs: v => v === '' ? undefined : Number(v) })} type="number" step="0.01" placeholder="4.5" className="field-input" />
            </Field>
            <Field label="Floors" error={errors.floors?.message}>
              <input {...register('floors', { valueAsNumber: true })} type="number" min={1} max={5} placeholder="1" className="field-input" />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field label="Build Year" error={errors.buildYear?.message}>
              <input {...register('buildYear', { setValueAs: v => v === '' ? undefined : Number(v) })} type="number" placeholder="2024" className="field-input" />
            </Field>
            <Field label="City" hint="e.g. Mumbai, Delhi, Surat" error={errors.city?.message}>
              <input {...register('city')} placeholder="Mumbai" className="field-input" />
            </Field>
            <Field label="Design Style" hint="e.g. German Minimalist, Corporate Industrial" error={errors.designStyle?.message}>
              <input {...register('designStyle')} placeholder="German Minimalist Corporate" className="field-input" />
            </Field>
          </div>

          <Field label="Materials Used" required hint="List every fabrication material — parsed by AI as hard facts" error={errors.materialsUsed?.message}>
            <Controller name="materialsUsed" control={control} render={({ field }) => (
              <TagInput value={field.value ?? []} onChange={field.onChange} placeholder="MS frame, tension fabric, tempered glass..." />
            )} />
          </Field>

          <Field label="Special Features" hint="Structural and functional highlights" error={errors.specialFeatures?.message}>
            <Controller name="specialFeatures" control={control} render={({ field }) => (
              <TagInput value={field.value ?? []} onChange={field.onChange} placeholder="LED video wall, mezzanine lounge, product counters..." />
            )} />
          </Field>

          <Field label="Awards" hint="Competition wins or recognition">
            <Controller name="awards" control={control} render={({ field }) => (
              <TagInput value={field.value ?? []} onChange={field.onChange} placeholder="Best Booth CPHI 2024..." maxTags={10} />
            )} />
          </Field>

        </Section>

        {/* ── SECTION 2: CONTENT BLOCKS ──────────────────────── */}
        <Section n={2} title="Content Blocks" subtitle="Long-form editorial content — human-written, E-E-A-T quality">

          {/* AI Summary with live word counter */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest">
                AI Summary <span className="text-red-400">*</span>
              </label>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                !aiSummaryText                ? 'bg-slate-700 text-slate-400'
                : aiSummaryStatus.ok          ? 'bg-green-500/20 text-green-400'
                :                               'bg-red-500/20 text-red-400'
              }`}>
                {aiSummaryStatus.count} words {aiSummaryStatus.ok ? '✓' : '(80–150 required)'}
              </span>
            </div>
            <textarea
              {...register('aiSummary')}
              rows={5}
              placeholder="72 sqm double-decker exhibition stall designed and fabricated by Approach Media for [Client] at [Trade Show], [Venue], [City], [Date]. Ground floor ([sqm]) comprises [zones]. Mezzanine ([sqm]) houses [function]. Materials: [list]. Design style: [style]."
              className="field-input resize-y"
            />
            <div className="mt-1 flex items-start justify-between gap-4">
              {errors.aiSummary
                ? <p className="text-xs text-red-400">{errors.aiSummary.message}</p>
                : <p className="text-xs text-slate-500">Entity-rich factual summary. Start with sqm + stall type + client + event. No marketing adjectives.</p>
              }
            </div>
          </div>

          <Field label="Full Description" required hint="300–500 words. Describe the brief, design decisions, structural system, and fabrication process." error={errors.description?.message}>
            <textarea {...register('description')} rows={10} placeholder="Approach Media designed and built this [sqm] [stall type] for [client] at [exhibition]..." className="field-input resize-y" />
          </Field>

          <Field label="Design Brief" hint="The client's original brief — shows problem-solving depth for E-E-A-T" error={errors.designBrief?.message}>
            <textarea {...register('designBrief')} rows={4} placeholder="Client brief: [brand objectives, footfall goals, product highlight requirements]..." className="field-input resize-y" />
          </Field>

        </Section>

        {/* ── SECTION 3: SEO METADATA ────────────────────────── */}
        <Section n={3} title="SEO Metadata" subtitle="Drives Google SERP snippets and AI engine citations — pulled on first byte via generateMetadata()">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Meta Title" counter={{ current: metaTitleText.length, max: 70 }} hint="Include: client · event · city · stall type" error={errors.seoMetadata?.metaTitle?.message}>
              <input {...register('seoMetadata.metaTitle')} placeholder="Sun Pharma Double Decker Stall — CPHI 2024 | Approach Media" className="field-input" />
            </Field>
            <Field label="Meta Description" counter={{ current: metaDescText.length, max: 165 }} hint="Lead with sqm + stall type + client + event" error={errors.seoMetadata?.metaDescription?.message}>
              <input {...register('seoMetadata.metaDescription')} placeholder="72 sqm double-decker booth with LED wall and VIP mezzanine. Built for Sun Pharma, CPHI Mumbai 2024." className="field-input" />
            </Field>
          </div>

          <Field
            label="AI Context Summary"
            counter={{ current: aiContextText.length, max: 2000 }}
            hint="250-word factual brief specifically for LLM crawlers (GPTBot, PerplexityBot). More detailed than ai_summary."
            error={errors.seoMetadata?.aiContextSummary?.message}
          >
            <textarea {...register('seoMetadata.aiContextSummary')} rows={6} placeholder="Approach Media fabricated a [sqm] exhibition stand for [Client] at [Exhibition], [Venue], [City], [Date range]. The stand is a [type] configuration: [floor breakdown]. Structural frame: [specs]. Materials: [list]. Design: [style]. Client: [company details]. Exhibition organiser: [name]." className="field-input resize-y" />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Focus Entities" hint="Named entities for semantic indexing — client, exhibition, city, stall type" error={errors.seoMetadata?.focusEntities?.message}>
              <Controller name="seoMetadata.focusEntities" control={control} render={({ field }) => (
                <TagInput value={(field.value as string[]) ?? []} onChange={field.onChange} placeholder="Sun Pharma, CPHI India 2024, Mumbai..." maxTags={10} />
              )} />
            </Field>
            <Field label="Primary Keywords" hint="Max 8 — high-intent search terms" error={errors.seoMetadata?.primaryKeywords?.message}>
              <Controller name="seoMetadata.primaryKeywords" control={control} render={({ field }) => (
                <TagInput value={(field.value as string[]) ?? []} onChange={field.onChange} placeholder="double decker exhibition stall Mumbai..." maxTags={8} />
              )} />
            </Field>
          </div>

          <Field label="Secondary Keywords" hint="Supporting long-tail terms — up to 15">
            <Controller name="seoMetadata.secondaryKeywords" control={control} render={({ field }) => (
              <TagInput value={(field.value as string[]) ?? []} onChange={field.onChange} placeholder="exhibition stand company Mumbai, trade show booth India..." maxTags={15} />
            )} />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="OG Title" counter={{ current: (watch('seoMetadata.ogTitle') ?? '').length, max: 100 }}>
              <input {...register('seoMetadata.ogTitle')} placeholder="Falls back to Meta Title if empty" className="field-input" />
            </Field>
            <Field label="OG Image URL">
              <input {...register('seoMetadata.ogImageUrl')} placeholder="https://cdn.approachmedia.in/.../hero.jpg" className="field-input" />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Canonical URL" hint="Leave blank to auto-generate from slug">
              <input {...register('seoMetadata.canonicalUrl')} placeholder="https://approachmedia.in/portfolio/..." className="field-input" />
            </Field>
            <Field label="Indexing">
              <label className="flex items-center gap-3 mt-2 cursor-pointer">
                <input {...register('seoMetadata.noIndex')} type="checkbox" className="w-4 h-4 rounded accent-red-500" />
                <span className="text-sm text-slate-300">No-index this page <span className="text-slate-500">(keeps it out of Google)</span></span>
              </label>
            </Field>
          </div>

        </Section>

        {/* ── SECTION 4: MEDIA & ALT TEXT ────────────────────── */}
        <Section n={4} title="Mandatory Image Alt Text Mapping" subtitle="altText is enforced non-nullable — every image must describe stall size · client · event · city">
          <MediaSection control={control} />
        </Section>

        {/* ── STATUS BAR ─────────────────────────────────────── */}
        <div className="sticky bottom-0 z-10 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="field-label mb-1">Status</label>
                <select {...register('status')} className="field-input w-auto py-1.5 text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="field-label mb-1">Display Order</label>
                <input {...register('displayOrder', { valueAsNumber: true })} type="number" min={0} className="field-input w-20 py-1.5 text-sm" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-4">
                <input {...register('isFeatured')} type="checkbox" className="w-4 h-4 rounded accent-yellow-400" />
                <span className="text-sm text-slate-300">Featured project</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              {saveError && <p className="text-sm text-red-400">{saveError}</p>}
              <button
                type="button"
                onClick={() => { setValue('status', 'draft'); methods.handleSubmit(onSubmit)() }}
                disabled={saving}
                className="px-5 py-2 rounded-lg border border-slate-600 text-slate-300 text-sm font-semibold hover:border-slate-400 hover:text-white transition disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save Draft'}
              </button>
              <button
                type="button"
                onClick={() => { setValue('status', 'published'); methods.handleSubmit(onSubmit)() }}
                disabled={saving}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition disabled:opacity-50"
              >
                {saving ? 'Publishing…' : 'Publish'}
              </button>
            </div>
          </div>
        </div>

      </form>
    </FormProvider>
  )
}
