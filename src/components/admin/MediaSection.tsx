'use client'
import { useFieldArray, Control, useFormContext } from 'react-hook-form'
import type { ProjectInput } from '@/lib/validations/portfolio'

const MEDIA_TYPES = ['image', 'render_3d', 'video', 'floor_plan', 'elevation'] as const

interface MediaSectionProps {
  control: Control<ProjectInput>
}

export default function MediaSection({ control }: MediaSectionProps) {
  const { register, watch, formState: { errors } } = useFormContext<ProjectInput>()
  const { fields, append, remove, move } = useFieldArray({ control, name: 'media' })

  const mediaErrors = errors.media

  function addMedia() {
    append({
      mediaType:    'image',
      url:          '',
      altText:      '',
      displayOrder: fields.length,
      isHero:       fields.length === 0,
      isThumbnail:  false,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Media Items</h3>
          <p className="text-xs text-slate-500 mt-0.5">Alt text is mandatory on every image — minimum 20 characters</p>
        </div>
        <button
          type="button"
          onClick={addMedia}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition"
        >
          + Add Media
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-10 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 text-sm">
          No media yet — click "Add Media" to attach images, renders, or a floor plan
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field, idx) => {
          const altText   = watch(`media.${idx}.altText`) ?? ''
          const altLen    = altText.length
          const altError  = (mediaErrors?.[idx] as { altText?: { message: string } })?.altText
          const isHero    = watch(`media.${idx}.isHero`)

          return (
            <div key={field.id} className={`rounded-xl border p-4 space-y-4 ${isHero ? 'border-green-500/40 bg-green-500/5' : 'border-slate-700 bg-slate-800/40'}`}>
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">#{idx + 1}</span>
                  {isHero && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">Hero</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {idx > 0 && (
                    <button type="button" onClick={() => move(idx, idx - 1)} className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition text-xs">↑</button>
                  )}
                  {idx < fields.length - 1 && (
                    <button type="button" onClick={() => move(idx, idx + 1)} className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition text-xs">↓</button>
                  )}
                  <button type="button" onClick={() => remove(idx)} className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition text-xs">
                    Remove
                  </button>
                </div>
              </div>

              {/* URL + type row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="field-label">Media URL *</label>
                  <input
                    {...register(`media.${idx}.url`)}
                    placeholder="https://cdn.approachmedia.in/portfolio/..."
                    className="field-input"
                  />
                  {(mediaErrors?.[idx] as { url?: { message: string } })?.url && (
                    <p className="field-error">{(mediaErrors?.[idx] as { url?: { message: string } })?.url?.message}</p>
                  )}
                </div>
                <div>
                  <label className="field-label">Type *</label>
                  <select {...register(`media.${idx}.mediaType`)} className="field-input">
                    {MEDIA_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                  </select>
                </div>
              </div>

              {/* Alt text — highlighted with border colour */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="field-label text-yellow-400">
                    Alt Text <span className="text-red-400">*</span>
                  </label>
                  <span className={`text-xs font-mono ${altLen < 20 ? 'text-red-400' : altLen > 280 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {altLen}/300
                  </span>
                </div>
                <input
                  {...register(`media.${idx}.altText`)}
                  placeholder='e.g. "72 sqm double decker exhibition stall Sun Pharma CPHI Mumbai 2024 — Approach Media"'
                  className={`field-input border-2 ${altError ? 'border-red-500' : altLen >= 20 ? 'border-green-500/40' : 'border-yellow-500/40'}`}
                />
                {altError
                  ? <p className="field-error">{altError.message}</p>
                  : <p className="mt-1 text-xs text-slate-500">Include: stall size · client name · event name · city · fabricator</p>
                }
              </div>

              {/* Caption + order + flags */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="field-label">Caption</label>
                  <input {...register(`media.${idx}.caption`)} placeholder="Ground floor product display zone" className="field-input" />
                </div>
                <div>
                  <label className="field-label">Display Order</label>
                  <input {...register(`media.${idx}.displayOrder`, { valueAsNumber: true })} type="number" min={0} className="field-input" />
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input {...register(`media.${idx}.isHero`)} type="checkbox" className="w-4 h-4 rounded accent-green-500" />
                  <span className="text-sm text-slate-300">Hero image <span className="text-slate-500">(OG + page header)</span></span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input {...register(`media.${idx}.isThumbnail`)} type="checkbox" className="w-4 h-4 rounded accent-blue-500" />
                  <span className="text-sm text-slate-300">Thumbnail <span className="text-slate-500">(grid card)</span></span>
                </label>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
