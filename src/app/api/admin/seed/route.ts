import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db/prisma'

// ── Auth guard ────────────────────────────────────────────────────────────────
async function isAuthenticated() {
  const jar = await cookies()
  return jar.get('admin_auth')?.value === 'authenticated'
}

// ── Embedded project data (FITAG Tech Expo 2025, Gandhinagar) ─────────────────
// Source: new_casestudy_step2_seo_ready.xlsx
// Images stored as relative paths — CDN base URL is read from app_config at render time.

const CDN_BASE = 'https://pub-3142dbc1bfbb47b191e0dca72e867a0f.r2.dev'

const PROJECTS = [
  {
    title: 'Next View 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025',
    slug: 'next-view-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
    clientName: 'Next View',
    exhibitionName: 'FITAG Tech Expo - IT Show',
    venueName: 'Helipad Ground',
    city: 'Gandhinagar', country: 'India',
    stallAreaSqm: 48, stallAreaSqft: 516.67, stallHeightM: 4, floors: 1, buildYear: 2025,
    description: 'Approach Media designed and fabricated a 48 SQM 3 side open stall exhibition stall for Next View at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth presents a spacious electronics and display technology stall with multiple live TV screens, bold Nextview fascia, demo walls, red carpet zone, and open product experience areas.',
    designBrief: 'Create a 48 SQM 3 side open stall custom exhibition stall for Next View that communicates technology, product credibility, and visitor engagement at FITAG Tech Expo - IT Show. The design needed visible branding, product-led storytelling, practical discussion areas, and a premium finish suitable for a busy expo environment.',
    aiSummary: 'Next View exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 48 SQM 3 side open stall booth with immersive display technology booth with live screen-led product storytelling, designed for product display, lead generation, visitor interaction.',
    designStyle: 'Immersive display technology booth with live screen-led product storytelling',
    materialsUsed: ['Custom wooden build', 'laminate finish', 'printed graphics', 'LED display integration', 'acrylic signage', 'carpet flooring'],
    specialFeatures: ['Three-side open visibility', 'multi-screen display wall', 'large brand fascia', 'live demo zones', 'product counters', 'red carpet visitor flow'],
    isFeatured: true, displayOrder: 10,
    industries: ['Security Devises', 'IT', 'Hardware', 'Television'],
    stallTypes: ['3 Side Open Stall'],
    metaTitle: 'Next View 48 SQM Stall Design | FITAG Tech Expo - IT Show',
    metaDescription: "Explore Next View's 48 SQM 3 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media.",
    ogTitle: 'Next View Custom Exhibition Stall at FITAG Tech Expo - IT Show',
    ogDescription: '48 SQM 3 side open stall exhibition stall design and fabrication for Next View by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar.',
    heroPath: '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp',
    heroAlt: 'Next View 48 SQM 3 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media',
    heroCaption: 'Next View 48 SQM 3 Side Open Stall at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar.',
    galleryPaths: [
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-08.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-09.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-10.webp',
      '2025/fitag-tech-expo-it-show/next-view/next-view-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-11.webp',
    ],
  },
  {
    title: 'Acrrynics 18 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025',
    slug: 'acrrynics-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
    clientName: 'Acrrynics', exhibitionName: 'FITAG Tech Expo - IT Show', venueName: 'Helipad Ground',
    city: 'Gandhinagar', country: 'India',
    stallAreaSqm: 18, stallAreaSqft: 193.75, stallHeightM: 4, floors: 1, buildYear: 2025,
    description: 'Approach Media designed and fabricated an 18 SQM 3 side open stall exhibition stall for Acrrynics at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth presents a compact Acronis and Nilmay branded IT security exhibit with illuminated counters, cyber cloud communication panels, blue flooring, and a clean meeting-led layout.',
    designBrief: 'Create an 18 SQM 3 side open stall custom exhibition stall for Acrrynics that communicates technology, product credibility, and visitor engagement at FITAG Tech Expo - IT Show.',
    aiSummary: 'Acrrynics exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 18 SQM 3 side open stall booth with clean technology booth with blue-white cyber security branding.',
    designStyle: 'Clean technology booth with blue-white cyber security branding',
    materialsUsed: ['Laminated wooden structure', 'printed vinyl graphics', 'acrylic logo panels', 'LED backlit fascia', 'carpet flooring', 'display lighting'],
    specialFeatures: ['Backlit fascia', 'Acronis/Nilmay brand panels', 'product communication wall', 'meeting seating', 'illuminated counter', 'open visitor access'],
    isFeatured: true, displayOrder: 20,
    industries: ['Security Devises', 'IT', 'Hardware', 'Television'],
    stallTypes: ['3 Side Open Stall'],
    metaTitle: 'Acrrynics 18 SQM Stall Design | FITAG Tech Expo - IT Show',
    metaDescription: "Explore Acrrynics's 18 SQM 3 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media.",
    ogTitle: 'Acrrynics Custom Exhibition Stall at FITAG Tech Expo - IT Show',
    ogDescription: '18 SQM 3 side open stall exhibition stall design and fabrication for Acrrynics by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar.',
    heroPath: '2025/fitag-tech-expo-it-show/acrrynics/acrrynics-fitag-tech-expo-it-show-gandhinagar-18-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp',
    heroAlt: 'Acrrynics 18 SQM 3 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media',
    heroCaption: 'Acrrynics 18 SQM 3 Side Open Stall at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar.',
    galleryPaths: [
      '2025/fitag-tech-expo-it-show/acrrynics/acrrynics-fitag-tech-expo-it-show-gandhinagar-18-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp',
      '2025/fitag-tech-expo-it-show/acrrynics/acrrynics-fitag-tech-expo-it-show-gandhinagar-18-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp',
      '2025/fitag-tech-expo-it-show/acrrynics/acrrynics-fitag-tech-expo-it-show-gandhinagar-18-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp',
      '2025/fitag-tech-expo-it-show/acrrynics/acrrynics-fitag-tech-expo-it-show-gandhinagar-18-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp',
      '2025/fitag-tech-expo-it-show/acrrynics/acrrynics-fitag-tech-expo-it-show-gandhinagar-18-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp',
      '2025/fitag-tech-expo-it-show/acrrynics/acrrynics-fitag-tech-expo-it-show-gandhinagar-18-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp',
    ],
  },
  {
    title: 'Digisol 18 SQM 1 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025',
    slug: 'digisol-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
    clientName: 'Digisol', exhibitionName: 'FITAG Tech Expo - IT Show', venueName: 'Helipad Ground',
    city: 'Gandhinagar', country: 'India',
    stallAreaSqm: 18, stallAreaSqft: 193.75, stallHeightM: 4, floors: 1, buildYear: 2025,
    description: 'Approach Media designed and fabricated an 18 SQM 1 side open stall exhibition stall for Digisol at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth showcases networking and IT hardware products with a bold orange-white brand palette, structured product display shelves, demo counter, and clear category signage.',
    designBrief: 'Create an 18 SQM 1 side open stall custom exhibition stall for Digisol that communicates technology, product credibility, and visitor engagement at FITAG Tech Expo - IT Show.',
    aiSummary: 'Digisol exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 18 SQM 1 side open stall booth with bold product-first networking hardware display.',
    designStyle: 'Bold product-first networking hardware display',
    materialsUsed: ['Laminated MDF structure', 'printed vinyl graphics', 'acrylic product shelves', 'LED backlit panels', 'orange accent lighting', 'carpet flooring'],
    specialFeatures: ['1-side open layout', 'structured product shelving', 'demo counter', 'category signage', 'backlit brand fascia'],
    isFeatured: true, displayOrder: 30,
    industries: ['Security Devises', 'IT', 'Hardware', 'Television'],
    stallTypes: ['1 Side Open Stall'],
    metaTitle: 'Digisol 18 SQM Stall Design | FITAG Tech Expo - IT Show',
    metaDescription: "Explore Digisol's 18 SQM 1 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media.",
    ogTitle: 'Digisol Custom Exhibition Stall at FITAG Tech Expo - IT Show',
    ogDescription: '18 SQM 1 side open stall exhibition stall design and fabrication for Digisol by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar.',
    heroPath: '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp',
    heroAlt: 'Digisol 18 SQM 1 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media',
    heroCaption: 'Digisol 18 SQM 1 Side Open Stall at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar.',
    galleryPaths: [
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-08.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-09.webp',
      '2025/fitag-tech-expo-it-show/digisol/digisol-fitag-tech-expo-it-show-gandhinagar-18-sqm-1-side-open-stall-exhibition-stall-design-fabrication-approach-media-10.webp',
    ],
  },
  {
    title: 'Lenovo Metrobit Networks 48 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025',
    slug: 'lenovo-metrobit-networks-48-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
    clientName: 'Lenovo - Metrobit Networks Pvt Ltd', exhibitionName: 'FITAG Tech Expo - IT Show', venueName: 'Helipad Ground',
    city: 'Gandhinagar', country: 'India',
    stallAreaSqm: 48, stallAreaSqft: 516.67, stallHeightM: 4, floors: 1, buildYear: 2025,
    description: 'Approach Media designed and fabricated a 48 SQM 3 side open stall exhibition stall for Lenovo Metrobit Networks at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth presents a bold Lenovo red-black branded environment with laptop display walls, server product zones, a presentation counter, and an open demo experience area.',
    designBrief: 'Create a 48 SQM 3 side open stall custom exhibition stall for Lenovo Metrobit Networks that communicates technology leadership, product range, and visitor engagement at FITAG Tech Expo.',
    aiSummary: 'Lenovo Metrobit Networks exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 48 SQM 3 side open stall with bold Lenovo brand identity, laptop and server displays.',
    designStyle: 'Bold Lenovo brand identity with product-led tech showcase',
    materialsUsed: ['Custom MDF structure', 'Lenovo brand red-black laminate', 'product display shelves', 'LED backlit fascia', 'carpet flooring', 'acrylic signage'],
    specialFeatures: ['Three-side open', 'laptop display wall', 'server product zone', 'presentation counter', 'open demo area', 'Lenovo brand fascia'],
    isFeatured: true, displayOrder: 40,
    industries: ['Security Devises', 'IT', 'Hardware', 'Television'],
    stallTypes: ['3 Side Open Stall'],
    metaTitle: 'Lenovo Metrobit Networks 48 SQM Stall Design | FITAG Tech Expo',
    metaDescription: "Explore Lenovo Metrobit Networks' 48 SQM 3 side open stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media.",
    ogTitle: 'Lenovo Metrobit Networks Exhibition Stall at FITAG Tech Expo - IT Show',
    ogDescription: '48 SQM 3 side open stall for Lenovo Metrobit Networks by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar.',
    heroPath: '2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp',
    heroAlt: 'Lenovo Metrobit Networks 48 SQM 3 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar',
    heroCaption: 'Lenovo Metrobit Networks 48 SQM 3 Side Open Stall at FITAG Tech Expo - IT Show, Gandhinagar.',
    galleryPaths: [
      '2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp',
      '2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp',
      '2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp',
      '2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp',
      '2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp',
      '2025/fitag-tech-expo-it-show/lenovo-metrobit-networks/lenovo-metrobit-networks-fitag-tech-expo-it-show-gandhinagar-48-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp',
    ],
  },
  {
    title: 'Securus 18 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025',
    slug: 'securus-18-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
    clientName: 'Securus', exhibitionName: 'FITAG Tech Expo - IT Show', venueName: 'Helipad Ground',
    city: 'Gandhinagar', country: 'India',
    stallAreaSqm: 18, stallAreaSqft: 193.75, stallHeightM: 4, floors: 1, buildYear: 2025,
    description: 'Approach Media designed and fabricated an 18 SQM 2 side open stall exhibition stall for Securus at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth presents a security technology exhibit with CCTV product displays, an illuminated brand counter, and a clean corporate layout.',
    designBrief: 'Create an 18 SQM 2 side open stall custom exhibition stall for Securus that communicates security product credibility and visitor engagement at FITAG Tech Expo - IT Show.',
    aiSummary: 'Securus exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 18 SQM 2 side open stall with CCTV product display and clean corporate security branding.',
    designStyle: 'Clean corporate security technology display',
    materialsUsed: ['MDF laminate structure', 'printed graphics', 'product display wall', 'LED accent lighting', 'carpet flooring'],
    specialFeatures: ['Two-side open', 'CCTV product displays', 'illuminated counter', 'corporate brand fascia'],
    isFeatured: true, displayOrder: 50,
    industries: ['Security Devises', 'IT', 'Hardware', 'Television'],
    stallTypes: ['2 Side Open Stall'],
    metaTitle: 'Securus 18 SQM Stall Design | FITAG Tech Expo - IT Show',
    metaDescription: "Explore Securus's 18 SQM 2 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media.",
    ogTitle: 'Securus Custom Exhibition Stall at FITAG Tech Expo - IT Show',
    ogDescription: '18 SQM 2 side open stall for Securus by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar.',
    heroPath: '2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp',
    heroAlt: 'Securus 18 SQM 2 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media',
    heroCaption: 'Securus 18 SQM 2 Side Open Stall at FITAG Tech Expo - IT Show, Gandhinagar.',
    galleryPaths: [
      '2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp',
      '2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp',
      '2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp',
      '2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp',
      '2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp',
      '2025/fitag-tech-expo-it-show/securus/securus-fitag-tech-expo-it-show-gandhinagar-18-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp',
    ],
  },
  {
    title: 'Voltaic Cable 24 SQM 3 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025',
    slug: 'voltaic-cable-24-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
    clientName: 'Voltaic', exhibitionName: 'FITAG Tech Expo - IT Show', venueName: 'Helipad Ground',
    city: 'Gandhinagar', country: 'India',
    stallAreaSqm: 24, stallAreaSqft: 258.33, stallHeightM: 4, floors: 1, buildYear: 2025,
    description: 'Approach Media designed and fabricated a 24 SQM 3 side open stall exhibition stall for Voltaic Cable at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The booth presents a cable and connectivity product display with structured shelving, product samples, and a clean industrial brand identity.',
    designBrief: 'Create a 24 SQM 3 side open stall for Voltaic Cable that showcases the cable product range clearly with strong brand visibility at FITAG Tech Expo - IT Show.',
    aiSummary: 'Voltaic Cable exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 24 SQM 3 side open stall with cable product display shelving and industrial brand identity.',
    designStyle: 'Industrial cable product showcase with structured display shelving',
    materialsUsed: ['MDF laminate structure', 'product display shelving', 'printed graphics', 'LED lighting', 'carpet flooring'],
    specialFeatures: ['Three-side open', 'cable product shelving', 'brand fascia', 'product sample display'],
    isFeatured: false, displayOrder: 60,
    industries: ['Security Devises', 'IT', 'Hardware', 'Television'],
    stallTypes: ['3 Side Open Stall'],
    metaTitle: 'Voltaic Cable 24 SQM Stall Design | FITAG Tech Expo - IT Show',
    metaDescription: "Explore Voltaic Cable's 24 SQM 3 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media.",
    ogTitle: 'Voltaic Cable Custom Exhibition Stall at FITAG Tech Expo - IT Show',
    ogDescription: '24 SQM 3 side open stall for Voltaic Cable by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar.',
    heroPath: '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp',
    heroAlt: 'Voltaic Cable 24 SQM 3 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media',
    heroCaption: 'Voltaic Cable 24 SQM 3 Side Open Stall at FITAG Tech Expo - IT Show, Gandhinagar.',
    galleryPaths: [
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-07.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-08.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-09.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-10.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-11.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-12.webp',
      '2025/fitag-tech-expo-it-show/voltaic-cable/voltaic-cable-fitag-tech-expo-it-show-gandhinagar-24-sqm-3-side-open-stall-exhibition-stall-design-fabrication-approach-media-13.webp',
    ],
  },
  {
    title: 'Wian 12 SQM 2 Side Open Stall Exhibition Stall Design at FITAG Tech Expo - IT Show, Gandhinagar 2025',
    slug: 'wian-12-sqm-custom-exhibition-stall-fitag-tech-expo-it-show-gandhinagar-2025',
    clientName: 'Wian', exhibitionName: 'FITAG Tech Expo - IT Show', venueName: 'Helipad Ground',
    city: 'Gandhinagar', country: 'India',
    stallAreaSqm: 12, stallAreaSqft: 129.17, stallHeightM: 4, floors: 1, buildYear: 2025,
    description: 'Approach Media designed and fabricated a 12 SQM 2 side open stall exhibition stall for Wian at FITAG Tech Expo - IT Show, Helipad Ground, Gandhinagar. The compact booth showcases wireless networking products with a clean minimal design, product display panel, and brand counter.',
    designBrief: 'Create a 12 SQM 2 side open stall for Wian that presents wireless networking products clearly within a compact space at FITAG Tech Expo - IT Show.',
    aiSummary: 'Wian exhibition stall by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar: 12 SQM 2 side open compact stall with wireless product display and minimal brand design.',
    designStyle: 'Compact minimal wireless technology display',
    materialsUsed: ['MDF laminate structure', 'printed graphics', 'product display panel', 'LED lighting', 'carpet flooring'],
    specialFeatures: ['Two-side open', 'wireless product display', 'brand counter', 'compact efficient layout'],
    isFeatured: false, displayOrder: 70,
    industries: ['Security Devises', 'IT', 'Hardware', 'Television'],
    stallTypes: ['2 Side Open Stall'],
    metaTitle: 'Wian 12 SQM Stall Design | FITAG Tech Expo - IT Show',
    metaDescription: "Explore Wian's 12 SQM 2 side open stall exhibition stall at FITAG Tech Expo - IT Show, Gandhinagar, designed and fabricated by Approach Media.",
    ogTitle: 'Wian Custom Exhibition Stall at FITAG Tech Expo - IT Show',
    ogDescription: '12 SQM 2 side open stall for Wian by Approach Media at FITAG Tech Expo - IT Show, Gandhinagar.',
    heroPath: '2025/fitag-tech-expo-it-show/wian/wian-fitag-tech-expo-it-show-gandhinagar-12-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-01.webp',
    heroAlt: 'Wian 12 SQM 2 side open stall exhibition stall design at FITAG Tech Expo - IT Show Gandhinagar by Approach Media',
    heroCaption: 'Wian 12 SQM 2 Side Open Stall at FITAG Tech Expo - IT Show, Gandhinagar.',
    galleryPaths: [
      '2025/fitag-tech-expo-it-show/wian/wian-fitag-tech-expo-it-show-gandhinagar-12-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-02.webp',
      '2025/fitag-tech-expo-it-show/wian/wian-fitag-tech-expo-it-show-gandhinagar-12-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-03.webp',
      '2025/fitag-tech-expo-it-show/wian/wian-fitag-tech-expo-it-show-gandhinagar-12-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-04.webp',
      '2025/fitag-tech-expo-it-show/wian/wian-fitag-tech-expo-it-show-gandhinagar-12-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-05.webp',
      '2025/fitag-tech-expo-it-show/wian/wian-fitag-tech-expo-it-show-gandhinagar-12-sqm-2-side-open-stall-exhibition-stall-design-fabrication-approach-media-06.webp',
    ],
  },
] as const

// ── Helper: get or create a lookup row ────────────────────────────────────────
function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 220)
}

async function getOrCreateIndustry(name: string) {
  const slug = toSlug(name)
  const existing = await prisma.industry.findUnique({ where: { slug } })
  if (existing) return existing.id
  const created = await prisma.industry.create({ data: { name, slug } })
  return created.id
}

async function getOrCreateStallType(name: string) {
  const slug = toSlug(name)
  const existing = await prisma.stallType.findUnique({ where: { slug } })
  if (existing) return existing.id
  const created = await prisma.stallType.create({ data: { name, slug } })
  return created.id
}

async function getOrCreateClient(name: string) {
  const slug = toSlug(name)
  const existing = await prisma.client.findUnique({ where: { slug } })
  if (existing) return existing.id
  const created = await prisma.client.create({ data: { name, slug } })
  return created.id
}

async function getOrCreateExhibition(name: string, venueName: string, city: string, country: string) {
  const slug = toSlug(name)
  const existing = await prisma.exhibition.findUnique({ where: { slug } })
  if (existing) return existing.id
  const created = await prisma.exhibition.create({ data: { name, slug, venueName, city, country } })
  return created.id
}

// ── POST /api/admin/seed ──────────────────────────────────────────────────────
export async function POST(_req: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Ensure app_config CDN row exists
  await prisma.appConfig.upsert({
    where:  { key: 'media_cdn_base_url' },
    update: { value: CDN_BASE },
    create: { key: 'media_cdn_base_url', value: CDN_BASE, description: 'Cloudflare R2 CDN base URL. Change this one row to switch CDN for all project images.' },
  })

  const results: { slug: string; status: 'created' | 'skipped' | 'error'; message?: string }[] = []

  for (const p of PROJECTS) {
    try {
      const existing = await prisma.project.findUnique({ where: { slug: p.slug } })
      if (existing) {
        results.push({ slug: p.slug, status: 'skipped' })
        continue
      }

      const [exhibitionId, clientId] = await Promise.all([
        getOrCreateExhibition(p.exhibitionName, p.venueName, p.city, p.country),
        getOrCreateClient(p.clientName),
      ])

      const industryIds  = await Promise.all(p.industries.map(getOrCreateIndustry))
      const stallTypeIds = await Promise.all(p.stallTypes.map(getOrCreateStallType))

      await prisma.project.create({
        data: {
          title:          p.title,
          slug:           p.slug,
          stallAreaSqm:   p.stallAreaSqm,
          stallAreaSqft:  p.stallAreaSqft,
          stallHeightM:   p.stallHeightM,
          floors:         p.floors,
          buildYear:      p.buildYear,
          city:           p.city,
          exhibitionId,
          clientId,
          description:    p.description,
          designBrief:    p.designBrief,
          aiSummary:      p.aiSummary,
          designStyle:    p.designStyle,
          materialsUsed:  p.materialsUsed,
          specialFeatures:p.specialFeatures,
          status:         'published',
          isFeatured:     p.isFeatured,
          displayOrder:   p.displayOrder,
          industries: {
            create: industryIds.map((id, i) => ({ industryId: id, isPrimary: i === 0 })),
          },
          stallTypes: {
            create: stallTypeIds.map((id, i) => ({ stallTypeId: id, isPrimary: i === 0 })),
          },
          seoMetadata: {
            create: {
              metaTitle:       p.metaTitle,
              metaDescription: p.metaDescription,
              ogTitle:         p.ogTitle,
              ogDescription:   p.ogDescription,
              ogImageUrl:      p.heroPath,
            },
          },
          media: {
            create: [
              {
                mediaType:    'image',
                url:          p.heroPath,
                altText:      p.heroAlt,
                caption:      p.heroCaption,
                displayOrder: 0,
                isHero:       true,
                isThumbnail:  true,
              },
              ...p.galleryPaths.map((path, i) => ({
                mediaType:    'image' as const,
                url:          path,
                altText:      `${p.title} photo ${i + 1}`,
                displayOrder: i + 1,
                isHero:       false,
                isThumbnail:  false,
              })),
            ],
          },
        },
      })

      results.push({ slug: p.slug, status: 'created' })
    } catch (err) {
      results.push({ slug: p.slug, status: 'error', message: String(err) })
    }
  }

  const created = results.filter(r => r.status === 'created').length
  const skipped = results.filter(r => r.status === 'skipped').length
  const errors  = results.filter(r => r.status === 'error').length

  return NextResponse.json({ summary: { created, skipped, errors }, results })
}

// ── GET /api/admin/seed — preview what will be imported ──────────────────────
export async function GET(_req: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const existing = await prisma.project.findMany({
    where: { slug: { in: PROJECTS.map(p => p.slug) } },
    select: { slug: true },
  })
  const existingSlugs = new Set(existing.map(e => e.slug))
  return NextResponse.json({
    total: PROJECTS.length,
    preview: PROJECTS.map(p => ({
      slug:       p.slug,
      client:     p.clientName,
      sqm:        p.stallAreaSqm,
      images:     1 + p.galleryPaths.length,
      willImport: !existingSlugs.has(p.slug),
    })),
  })
}
