'use client'
import { useState, useMemo, useCallback } from 'react'

export interface TradeshowEvent {
  id: string
  title: string
  link: string
  dateRaw: string
  startDate: string | null
  endDate: string | null
  city: string
  description: string
  categories: string[]
}

const PAGE_SIZE = 50

const MONTH_LABELS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
]

function formatDateBadge(startDate: string | null, endDate: string | null, dateRaw: string) {
  if (!startDate) return dateRaw
  const start = new Date(startDate + 'T00:00:00')
  if (!endDate || endDate === startDate) {
    return `${start.getDate()} ${MONTH_LABELS[start.getMonth()]} ${start.getFullYear()}`
  }
  const end = new Date(endDate + 'T00:00:00')
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()}–${end.getDate()} ${MONTH_LABELS[start.getMonth()]} ${start.getFullYear()}`
  }
  return `${start.getDate()} ${MONTH_LABELS[start.getMonth()]} – ${end.getDate()} ${MONTH_LABELS[end.getMonth()]} ${end.getFullYear()}`
}

function getMonthYear(startDate: string | null) {
  if (!startDate) return null
  const d = new Date(startDate + 'T00:00:00')
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function isExhibition(cats: string[]) {
  return cats.some(c => c.toLowerCase().includes('tradeshow') || c.toLowerCase().includes('exhibition'))
}

const TOP_CATEGORIES = [
  'Tradeshow',
  'Conference',
  'Building & Construction',
  'Medical & Pharma',
  'Food & Beverages',
  'IT & Technology',
  'Auto & Automotive',
  'Power & Energy',
  'Fashion & Beauty',
  'Agriculture & Forestry',
  'Industrial Engineering',
]

export default function TradeshowClient({ events }: { events: TradeshowEvent[] }) {
  const [query, setQuery] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showExhibitionsOnly, setShowExhibitionsOnly] = useState(false)
  const [page, setPage] = useState(1)

  const allCities = useMemo(() => {
    const s = new Set(events.map(e => e.city).filter(Boolean))
    return Array.from(s).sort()
  }, [events])

  const allMonths = useMemo(() => {
    const s = new Set(events.map(e => getMonthYear(e.startDate)).filter(Boolean) as string[])
    return Array.from(s).sort()
  }, [events])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return events.filter(e => {
      if (q && !e.title.toLowerCase().includes(q) && !e.city.toLowerCase().includes(q) && !e.categories.some(c => c.toLowerCase().includes(q))) return false
      if (selectedMonth && getMonthYear(e.startDate) !== selectedMonth) return false
      if (selectedCity && e.city !== selectedCity) return false
      if (selectedCategory && !e.categories.includes(selectedCategory)) return false
      if (showExhibitionsOnly && !isExhibition(e.categories)) return false
      return true
    })
  }, [events, query, selectedMonth, selectedCity, selectedCategory, showExhibitionsOnly])

  const paginated = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page])

  const resetFilters = useCallback(() => {
    setQuery('')
    setSelectedMonth('')
    setSelectedCity('')
    setSelectedCategory('')
    setShowExhibitionsOnly(false)
    setPage(1)
  }, [])

  const anyFilter = query || selectedMonth || selectedCity || selectedCategory || showExhibitionsOnly

  return (
    <div>
      {/* ── FILTER BAR ─────────────────────────────────── */}
      <div
        style={{
          background: 'hsl(222 24% 9%)',
          border: '1px solid hsl(222 18% 18%)',
          borderRadius: '14px',
          padding: '20px 24px',
          marginBottom: '28px',
          display: 'grid',
          gap: '14px',
        }}
      >
        {/* Search */}
        <input
          type="search"
          value={query}
          onChange={e => { setQuery(e.target.value); setPage(1) }}
          placeholder="Search by event name, city, or industry…"
          className="field-input"
          style={{ fontSize: '0.95rem' }}
        />

        {/* Row 2: dropdowns + toggle */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <select
            value={selectedMonth}
            onChange={e => { setSelectedMonth(e.target.value); setPage(1) }}
            className="field-input"
            style={{ flex: '1 1 160px', maxWidth: '220px' }}
          >
            <option value="">All Months</option>
            {allMonths.map(m => {
              const [y, mo] = m.split('-')
              return (
                <option key={m} value={m}>
                  {MONTH_LABELS[parseInt(mo) - 1]} {y}
                </option>
              )
            })}
          </select>

          <select
            value={selectedCity}
            onChange={e => { setSelectedCity(e.target.value); setPage(1) }}
            className="field-input"
            style={{ flex: '1 1 160px', maxWidth: '220px' }}
          >
            <option value="">All Cities</option>
            {allCities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={e => { setSelectedCategory(e.target.value); setPage(1) }}
            className="field-input"
            style={{ flex: '1 1 180px', maxWidth: '260px' }}
          >
            <option value="">All Categories</option>
            {TOP_CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem', color: 'hsl(220 10% 75%)', whiteSpace: 'nowrap' }}>
            <input
              type="checkbox"
              checked={showExhibitionsOnly}
              onChange={e => { setShowExhibitionsOnly(e.target.checked); setPage(1) }}
              style={{ width: '16px', height: '16px', accentColor: 'hsl(230 80% 60%)' }}
            />
            Trade Shows Only
          </label>

          {anyFilter && (
            <button
              onClick={resetFilters}
              style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'hsl(220 10% 55%)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── RESULTS COUNT ──────────────────────────────── */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.875rem', color: 'hsl(220 10% 55%)' }}>
          Showing <strong style={{ color: 'hsl(0 0% 85%)' }}>{Math.min(paginated.length, filtered.length)}</strong> of{' '}
          <strong style={{ color: 'hsl(0 0% 85%)' }}>{filtered.length}</strong> events
          {filtered.length !== events.length && ` (filtered from ${events.length})`}
        </span>
      </div>

      {/* ── EVENT LIST ─────────────────────────────────── */}
      {paginated.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'hsl(220 10% 45%)' }}>
          No events found. <button onClick={resetFilters} style={{ color: 'hsl(230 70% 65%)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear filters</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {paginated.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* ── LOAD MORE ──────────────────────────────────── */}
      {paginated.length < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={() => setPage(p => p + 1)}
            className="btn btn-outline"
            style={{ minWidth: '200px' }}
          >
            Load More ({filtered.length - paginated.length} remaining)
          </button>
        </div>
      )}
    </div>
  )
}

function EventCard({ event }: { event: TradeshowEvent }) {
  const dateBadge = formatDateBadge(event.startDate, event.endDate, event.dateRaw)
  const isTradeshow = isExhibition(event.categories)

  return (
    <div
      style={{
        background: 'hsl(222 24% 9%)',
        border: '1px solid hsl(222 18% 18%)',
        borderRadius: '12px',
        padding: '18px 22px',
        display: 'grid',
        gridTemplateColumns: '160px 1fr',
        gap: '16px',
        alignItems: 'start',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'hsl(230 50% 40%)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'hsl(222 18% 18%)')}
    >
      {/* Date */}
      <div>
        <div
          style={{
            background: isTradeshow
              ? 'linear-gradient(135deg, hsl(230 64% 52% / 0.2), hsl(110 55% 50% / 0.15))'
              : 'hsl(222 20% 14%)',
            border: `1px solid ${isTradeshow ? 'hsl(230 50% 40% / 0.4)' : 'hsl(222 18% 22%)'}`,
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: isTradeshow ? 'hsl(230 70% 75%)' : 'hsl(220 10% 65%)',
            lineHeight: 1.4,
          }}
        >
          {dateBadge}
        </div>
        <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'hsl(220 10% 55%)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          {event.city || 'India'}
        </div>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
          {event.link ? (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '1rem', fontWeight: 600, color: 'hsl(0 0% 95%)', textDecoration: 'none', lineHeight: 1.4 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'hsl(230 70% 75%)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'hsl(0 0% 95%)')}
            >
              {event.title}
              <svg style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          ) : (
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'hsl(0 0% 95%)', lineHeight: 1.4 }}>
              {event.title}
            </span>
          )}
        </div>

        {event.description && (
          <p style={{ marginTop: '6px', fontSize: '0.825rem', color: 'hsl(220 10% 55%)', lineHeight: 1.5 }}>
            {event.description}
          </p>
        )}

        {event.categories.length > 0 && (
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {event.categories.slice(0, 4).map(cat => (
              <span
                key={cat}
                style={{
                  fontSize: '0.72rem',
                  padding: '3px 8px',
                  borderRadius: '100px',
                  background: 'hsl(222 20% 14%)',
                  border: '1px solid hsl(222 18% 22%)',
                  color: 'hsl(220 10% 65%)',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
