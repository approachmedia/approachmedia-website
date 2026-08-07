/**
 * Maps an event city to the city landing page that should own its search
 * traffic.
 *
 * The 80 expo pages already carry a city name, so one contextual link per
 * page routes internal authority to the city pages, which currently receive
 * nothing but global navigation and behave like orphans as a result.
 *
 * Keys are lowercased and matched exactly, with aliases for the spellings
 * that appear in the expo dataset (Bengaluru/Bangalore, New Delhi/Delhi).
 * Gandhinagar maps to Ahmedabad — same metro, and the Ahmedabad page already
 * covers Gandhinagar venues. Cities with no landing page return null and the
 * link is simply not rendered.
 */
const CITY_PAGES: Record<string, { path: string; label: string }> = {
  'mumbai':        { path: '/exhibition-stall-designer-mumbai',        label: 'Mumbai' },
  'navi mumbai':   { path: '/exhibition-stall-designer-mumbai',        label: 'Mumbai' },
  'delhi':         { path: '/exhibition-stall-designer-delhi',         label: 'Delhi' },
  'new delhi':     { path: '/exhibition-stall-designer-delhi',         label: 'Delhi' },
  'bangalore':     { path: '/exhibition-stall-designer-bangalore',     label: 'Bangalore' },
  'bengaluru':     { path: '/exhibition-stall-designer-bangalore',     label: 'Bangalore' },
  'hyderabad':     { path: '/exhibition-stall-design-hyderabad',       label: 'Hyderabad' },
  'chennai':       { path: '/exhibition-stall-designer-chennai',       label: 'Chennai' },
  'pune':          { path: '/exhibition-stall-design-pune',            label: 'Pune' },
  'ahmedabad':     { path: '/exhibition-stand-builders-in-ahmedabad',  label: 'Ahmedabad' },
  'gandhinagar':   { path: '/exhibition-stand-builders-in-ahmedabad',  label: 'Ahmedabad' },
  'greater noida': { path: '/exhibition-stand-builders-in-noida',      label: 'Noida' },
  'noida':         { path: '/exhibition-stand-builders-in-noida',      label: 'Noida' },
  'jaipur':        { path: '/exhibition-stand-in-jaipur',              label: 'Jaipur' },
  'kolkata':       { path: '/exhibition-stand-builder-in-kolkata',     label: 'Kolkata' },
  'surat':         { path: '/exhibition-agency-in-surat',              label: 'Surat' },
  'chandigarh':    { path: '/exhibition-stall-design-chandigarh',      label: 'Chandigarh' },
  'goa':           { path: '/exhibition-stall-design-goa',             label: 'Goa' },
  'panaji':        { path: '/exhibition-stall-design-goa',             label: 'Goa' },
  'kochi':         { path: '/exhibition-stall-design-kochi',           label: 'Kochi' },
  'ludhiana':      { path: '/exhibition-stall-design-ludhiana',        label: 'Ludhiana' },
}

export function cityPageFor(city: string | null | undefined) {
  if (!city) return null
  return CITY_PAGES[city.trim().toLowerCase()] ?? null
}
