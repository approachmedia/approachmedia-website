'use client'
import { useState, useRef, KeyboardEvent } from 'react'

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  maxTags?: number
}

export default function TagInput({ value, onChange, placeholder = 'Type and press Enter', label, hint, error, maxTags = 30 }: TagInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function addTag(raw: string) {
    const tag = raw.trim()
    if (!tag || value.includes(tag) || value.length >= maxTags) return
    onChange([...value, tag])
    setInput('')
  }

  function removeTag(idx: number) {
    onChange(value.filter((_, i) => i !== idx))
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input) }
    if (e.key === 'Backspace' && !input && value.length > 0) removeTag(value.length - 1)
  }

  return (
    <div>
      {label && <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-1">{label}</label>}
      <div
        className={`flex flex-wrap gap-1.5 min-h-[42px] p-2 rounded-lg bg-slate-800/60 border cursor-text ${
          error ? 'border-red-500' : 'border-slate-600 focus-within:border-blue-500'
        } transition`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-medium">
            {tag}
            <button type="button" onClick={() => removeTag(i)} className="hover:text-white transition" aria-label={`Remove ${tag}`}>
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => addTag(input)}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[140px] bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none"
        />
      </div>
      {hint  && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      <p className="mt-1 text-xs text-slate-600">{value.length}/{maxTags} tags · Enter or comma to add</p>
    </div>
  )
}
