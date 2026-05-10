# Approach Media Website - Project Documentation

## Overview
Modern, premium B2B website for **Approach Media Pvt. Ltd.** - an exhibition stall design-and-build company with 23+ years of experience, 6000+ stalls executed across 14+ countries.

**Design Reference**: https://approach-brand-builder.lovable.app (premium dark/neutral theme, modern B2B aesthetic)

## Core Requirements

### 1. Website Features
- **Homepage**: Hero with rotating text, metric highlights, services cards, portfolio preview, testimonials, upcoming exhibitions, FAQs
- **CMS-Driven Collections**:
  - Portfolio Projects (with filters by industry, location, year, service)
  - Blog/Insights (articles with SEO optimization)
  - Upcoming Exhibitions (timeline with event details)
  - Clients & Testimonials (for social proof)
  - Lead Enquiries (form submissions)

### 2. Page Structure
**Static Pages**: Home, About Us, Services, Industries, Global Presence, Why Choose Us, Our Process, Contact, Privacy, Terms, FAQs

**Dynamic Pages** (CMS-driven):
- /portfolio, /portfolio/[slug] - project details with case studies
- /insights, /insights/[slug] - blog articles
- /exhibitions, /exhibitions/[slug] - upcoming events with registration CTAs
- /services/[slug] - 6 service detail pages
- /industries/[slug] - 9 industry pages
- /global-presence, /locations/[city] - presence pages for 11 Indian cities + 11 countries

### 3. CMS Admin Panel
Protected admin interface for:
- **Portfolio**: Add/edit/delete projects, upload images, mark featured, assign industry/location/service tags
- **Exhibitions**: Event name, dates, venue, city, country, organizer details, description
- **Blog/Insights**: Write articles, manage categories (Exhibition Design, Trade Show Strategy, etc.), publish/draft status, featured posts
- **Clients & Testimonials**: CMS-editable logos and quotes
- **Lead Management**: View/export enquiries from contact forms

**CMS Features**:
- CRUD forms with image upload
- Rich text editor for content
- Draft/Published status
- Preview links to public pages
- Featured item management
- SEO fields (title, description, canonical URL, schema data)

### 4. SEO & AI-Search Optimization
- Server-side rendering (SSR) or static generation
- JSON-LD schema: Organization, LocalBusiness, WebSite, BreadcrumbList, FAQPage, Article, Event, CreativeWork
- Dynamic XML sitemap with all CMS records
- robots.txt
- Meta tags (title, description, OG, Twitter)
- Clean semantic HTML with H1/H2 hierarchy
- Image alt text fields
- Canonical URLs
- Fast performance, responsive images, lazy loading
- Internal linking strategy across services, industries, portfolio, exhibitions

### 5. Conversion Features
- **Persistent Header CTA**: "Request a Proposal"
- **Multiple CTAs**: "Book A Consultation Now", "View Portfolio", "Plan Your Stall", "View Our Portfolio"
- **Lead Capture Form**: Name, company, email, phone, country, city, exhibition name, timeline, stall size, budget range, message
- **Analytics Tracking Ready**: CTA clicks, form submissions, portfolio views, exhibition requests

### 6. Design Direction
- Premium, modern, trustworthy B2B aesthetic
- Strong visuals/video banner area for stall designs
- Clean layout, strong typography, white space
- Dark/neutral accents with subtle animations
- Mobile-first responsive design
- Color scheme & style from https://approach-brand-builder.lovable.app

## Database Schema

```
PortfolioProjects
- id, title, slug, clientName, industry, exhibitionName
- locationCity, locationCountry, year, projectType, servicesUsed
- shortDescription, fullCaseStudy, heroImage, galleryImages, videoUrl
- featured, seoTitle, seoDescription, schemaData, createdAt, updatedAt

BlogPosts/Insights
- id, title, slug, excerpt, content, author, category, tags
- featuredImage, publishedAt, status, seoTitle, seoDescription
- canonicalUrl, schemaData, createdAt, updatedAt

UpcomingExhibitions
- id, eventName, slug, city, country, venue
- startDate, endDate, industryCategory, eventWebsite, shortDescription
- planningNote, featured, seoTitle, seoDescription, schemaData

Clients
- id, name, logo, industry, testimonial, websiteUrl, featured

Testimonials
- id, clientName, designation, company, quote, rating, image
- relatedProjectId, featured, createdAt, updatedAt

LeadEnquiries
- id, name, company, email, phone, country, city, exhibitionName
- stallSize, timeline, budgetRange, message, sourcePage, status, createdAt
```

## Tech Stack Recommendation
- **Frontend**: Next.js 15 (App Router) - SSR/SSG for SEO
- **Database**: PostgreSQL + Prisma ORM
- **CMS Admin**: Next.js API routes + custom admin dashboard
- **Hosting**: Vercel (for Next.js optimization)
- **Image Handling**: Next Image with optimization
- **Forms**: React Hook Form + Server Actions
- **Styling**: Tailwind CSS (matching design reference aesthetic)
- **Content Editor**: TipTap or Markdown for blog posts
- **SEO**: Next.js SEO best practices + JSON-LD schema

## Project Phases
1. **Phase 1**: Project setup, database schema, homepage UI, basic styling
2. **Phase 2**: CMS admin panel (Portfolio, Blog, Exhibitions CRUD)
3. **Phase 3**: Dynamic pages (/portfolio, /insights, /exhibitions)
4. **Phase 4**: Lead forms, analytics tracking, SEO optimization
5. **Phase 5**: Services, Industries, Global Presence detail pages
6. **Phase 6**: Polish, performance optimization, deployment

## Current Branch
`claude/connect-approachmedia-repo-2bl7u` - All development happens here

## Key Files to Create
- `package.json` - dependencies
- `tsconfig.json` - TypeScript config
- `next.config.js` - Next.js config
- `prisma/schema.prisma` - database schema
- `.env.local` - environment variables
- `src/app/page.tsx` - homepage
- `src/app/admin/` - CMS admin routes
- `src/components/` - reusable components
- `src/lib/` - utilities and helpers
- `public/sitemap.xml` - SEO sitemap
- `public/robots.txt` - SEO robots

## Notes
- Use placeholder content and images initially; all editable via CMS
- Focus on conversion-led layout with strong internal linking
- Ensure every page is mobile-responsive
- Implement structured data for rich snippets in search results
