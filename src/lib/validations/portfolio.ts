import { z } from 'zod'

// ─────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────

const slug = z
  .string()
  .min(3)
  .max(320)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case (e.g. sun-pharma-cphi-2024)')

const urlOrEmpty = z.union([z.string().url(), z.literal('')]).optional()

// ─────────────────────────────────────────────
// AI SUMMARY — 80–150 word hard enforcement
// LLMs index density, not word count, but
// 80 min forces factual completeness and
// 150 max prevents keyword stuffing.
// ─────────────────────────────────────────────

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

const aiSummaryField = z
  .string()
  .refine(v => wordCount(v) >= 80,  { message: 'ai_summary must be at least 80 words — add more factual entity detail' })
  .refine(v => wordCount(v) <= 150, { message: 'ai_summary must not exceed 150 words — trim marketing language' })

// ─────────────────────────────────────────────
// MEDIA SCHEMA — altText is MANDATORY
// An empty or generic altText string is
// rejected. Minimum 20 chars forces a real
// description (blocks placeholder text like
// "image" or "photo").
// ─────────────────────────────────────────────

export const MediaSchema = z.object({
  id:           z.number().int().positive().optional(),
  projectId:    z.number().int().positive().optional(),
  mediaType:    z.enum(['image', 'render_3d', 'video', 'floor_plan', 'elevation']),
  url:          z.string().url('Media URL must be a valid URL'),
  cdnUrl:       urlOrEmpty,
  thumbnailUrl: urlOrEmpty,

  // Non-nullable, minimum-length enforced at validation layer
  altText: z
    .string()
    .min(20, 'altText must be at least 20 characters — describe the stall, client, event, and location')
    .max(300, 'altText must not exceed 300 characters')
    .refine(
      v => !['image', 'photo', 'picture', 'img', 'untitled', 'placeholder'].includes(v.toLowerCase().trim()),
      { message: 'altText must be a real description, not a generic placeholder' }
    ),

  caption:      z.string().max(500).optional(),
  titleAttr:    z.string().max(200).optional(),
  displayOrder: z.number().int().min(0).default(0),
  isHero:       z.boolean().default(false),
  isThumbnail:  z.boolean().default(false),
  widthPx:      z.number().int().positive().optional(),
  heightPx:     z.number().int().positive().optional(),
  fileSizeKb:   z.number().int().positive().optional(),
  mimeType:     z.string().max(60).optional(),
})

export type MediaInput = z.infer<typeof MediaSchema>

// ─────────────────────────────────────────────
// SEO METADATA SCHEMA
// ─────────────────────────────────────────────

export const SeoMetadataSchema = z.object({
  metaTitle: z
    .string()
    .min(10, 'Meta title too short')
    .max(70, 'Meta title must be ≤ 70 characters for full SERP display')
    .optional(),

  metaDescription: z
    .string()
    .min(50, 'Meta description too short — aim for 120–165 characters')
    .max(165, 'Meta description must be ≤ 165 characters')
    .optional(),

  aiContextSummary: z
    .string()
    .min(100, 'AI context summary must be at least 100 characters')
    .max(2000)
    .optional(),

  focusEntities:    z.array(z.string().min(2)).max(10).optional(),
  primaryKeywords:  z.array(z.string().min(2)).max(8).optional(),
  secondaryKeywords: z.array(z.string().min(2)).max(15).optional(),

  ogTitle:       z.string().max(100).optional(),
  ogDescription: z.string().max(200).optional(),
  ogImageUrl:    urlOrEmpty,
  canonicalUrl:  urlOrEmpty,
  noIndex:       z.boolean().default(false),
})

export type SeoMetadataInput = z.infer<typeof SeoMetadataSchema>

// ─────────────────────────────────────────────
// CORE PROJECT SCHEMA
// ─────────────────────────────────────────────

// Base object — used by both full create and partial update schemas
const ProjectSchemaBase = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(300, 'Title must be ≤ 300 characters')
    .refine(v => !v.match(/^(untitled|test|new project)/i), {
      message: 'Title must be a real project name, not a placeholder',
    }),

  slug,

  // Physical specs
  stallAreaSqm:  z.number().positive('Stall area must be positive').max(5000).optional(),
  stallAreaSqft: z.number().positive().max(53820).optional(),
  stallHeightM:  z.number().positive().max(20).optional(),
  floors:        z.number().int().min(1).max(5).default(1),
  buildYear:     z.number().int().min(2000).max(new Date().getFullYear() + 1).optional(),
  city:          z.string().max(100).optional(),

  // Relations
  exhibitionId: z.number().int().positive().optional(),
  clientId:     z.number().int().positive().optional(),

  // Content
  description: z
    .string()
    .min(100, 'Description must be at least 100 characters — provide full project detail')
    .max(10000),

  designBrief: z.string().max(2000).optional(),

  // AI/LLM fields
  aiSummary:       aiSummaryField.optional(),
  designStyle:     z.string().max(150).optional(),
  materialsUsed:   z.array(z.string().min(2)).min(1, 'Add at least one material').max(30).optional(),
  specialFeatures: z.array(z.string().min(2)).max(30).optional(),
  awards:          z.array(z.string().min(2)).max(10).optional(),

  // Admin
  status:       z.enum(['draft', 'published', 'archived']).default('draft'),
  isFeatured:   z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),

  // Nested relations
  industryIds:  z.array(z.number().int().positive()).min(1, 'Select at least one industry'),
  stallTypeIds: z.array(z.number().int().positive()).min(1, 'Select at least one stall type'),
  media:        z.array(MediaSchema).optional(),
  seoMetadata:  SeoMetadataSchema.optional(),
})

// Full create schema — adds cross-field sqm/sqft consistency check
export const ProjectSchema = ProjectSchemaBase.refine(
  data => !data.stallAreaSqm || !data.stallAreaSqft || Math.abs(data.stallAreaSqm * 10.764 - data.stallAreaSqft) < 5,
  { message: 'sqm and sqft values do not match (1 sqm ≈ 10.764 sqft)', path: ['stallAreaSqft'] }
)

export type ProjectInput = z.infer<typeof ProjectSchema>

// ─────────────────────────────────────────────
// PARTIAL UPDATE SCHEMA (PATCH operations)
// .partial() requires ZodObject, not ZodEffects —
// so we call it on the base before the refinement.
// ─────────────────────────────────────────────

export const ProjectUpdateSchema = ProjectSchemaBase.partial().extend({ id: z.number().int().positive() })
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>

// ─────────────────────────────────────────────
// LOOKUP SCHEMAS
// ─────────────────────────────────────────────

export const IndustrySchema = z.object({
  name:        z.string().min(2).max(100),
  slug,
  description: z.string().max(500).optional(),
})

export const StallTypeSchema = z.object({
  name:        z.string().min(2).max(100),
  slug,
  description: z.string().max(500).optional(),
})

export const ExhibitionSchema = z.object({
  name:      z.string().min(2).max(200),
  slug,
  venueName: z.string().max(200).optional(),
  city:      z.string().max(100).optional(),
  state:     z.string().max(100).optional(),
  country:   z.string().max(100).default('India'),
  startDate: z.coerce.date().optional(),
  endDate:   z.coerce.date().optional(),
  organizer: z.string().max(200).optional(),
  websiteUrl: urlOrEmpty,
})
.refine(
  data => !data.startDate || !data.endDate || data.endDate >= data.startDate,
  { message: 'End date must be on or after start date', path: ['endDate'] }
)

export const ClientSchema = z.object({
  name:        z.string().min(2).max(200),
  slug,
  industryId:  z.number().int().positive().optional(),
  websiteUrl:  urlOrEmpty,
  logoUrl:     urlOrEmpty,
  description: z.string().max(1000).optional(),
})

// ─────────────────────────────────────────────
// HELPER — validate ai_summary word count
// (exported for use in form UI feedback)
// ─────────────────────────────────────────────

export function getAiSummaryWordCount(text: string): number {
  return wordCount(text)
}

export function validateAiSummary(text: string): { ok: boolean; count: number; message?: string } {
  const count = wordCount(text)
  if (count < 80)  return { ok: false, count, message: `${count}/80 words minimum — add entity-rich facts` }
  if (count > 150) return { ok: false, count, message: `${count}/150 words maximum — trim marketing language` }
  return { ok: true, count }
}
