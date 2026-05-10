# Approach Media Website

Premium B2B exhibition stall design website with CMS admin panel for managing Portfolio, Blog/Insights, and Exhibitions.

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS
- **Admin**: Next.js API Routes + Custom Dashboard
- **Forms**: React Hook Form

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard & login
│   ├── api/            # API routes for CRUD operations
│   ├── (public)/       # Public pages routes
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/         # Reusable React components
├── lib/
│   ├── prisma.ts       # Prisma client
│   └── utils.ts        # Utility functions
└── types/              # TypeScript types
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with your database URL:

```
DATABASE_URL="postgresql://username:password@localhost:5432/approachmedia"
ADMIN_PASSWORD="your-secure-password"
```

### 3. Set Up Database

Initialize Prisma and create the database schema:

```bash
npx prisma db push
```

View the database with Prisma Studio:

```bash
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter your admin password (from `.env.local`)
3. Access the dashboard to manage Portfolio, Blog, Exhibitions, Clients, Testimonials, and Enquiries

## Features

### Public Pages
- **Homepage** (`/`) - Hero, metrics, services, testimonials, featured projects
- **Portfolio** (`/portfolio`) - Project gallery with filters
- **Blog/Insights** (`/insights`) - Articles and industry insights
- **Exhibitions** (`/exhibitions`) - Upcoming events timeline
- **Services** (`/services/[slug]`) - Service detail pages
- **Industries** (`/industries/[slug]`) - Industry-specific pages
- **Global Presence** (`/global-presence`) - International & India presence
- **About** (`/about-us`) - Company information
- **Contact** (`/contact`) - Lead capture form

### Admin Panel (Protected by Password)
- **Portfolio Management** - Add/edit/delete projects, manage images, featured status
- **Blog Management** - Create articles, manage categories, draft/publish status
- **Exhibition Management** - Add upcoming events with dates, venue, details
- **Client Management** - Manage logos and company information
- **Testimonial Management** - Add/edit client quotes and ratings
- **Lead Enquiries** - View and manage contact form submissions

## CMS Database Schema

The database includes the following collections:

- **PortfolioProject** - Exhibition stall projects with case studies
- **BlogPost** - Articles and insights with SEO metadata
- **UpcomingExhibition** - Event listings with dates and venue info
- **Client** - Client logos and company information
- **Testimonial** - Client testimonials and social proof
- **LeadEnquiry** - Contact form submissions and lead tracking

See `prisma/schema.prisma` for full schema details.

## SEO Features

- Server-side rendering (SSR) with Next.js
- Dynamic sitemap generation
- robots.txt configuration
- JSON-LD schema markup (Organization, LocalBusiness, Article, Event, CreativeWork)
- Meta tags and Open Graph support
- Canonical URLs
- Semantic HTML with proper heading hierarchy
- Image optimization and alt text support

## Styling

The website uses Tailwind CSS with a premium dark/neutral color scheme:

- Primary Dark: `dark-900` to `dark-50`
- Accent Gold: `accent-gold` (#c9a961)
- Accent Bronze: `accent-bronze` (#a0826d)

Colors and animations are defined in `tailwind.config.ts` and `src/app/globals.css`.

## Analytics & Conversion Tracking

The site is structured to support analytics integration:

- CTA click tracking (Request Proposal, View Portfolio, etc.)
- Form submission tracking (Contact, Exhibition Enquiry)
- Portfolio view tracking
- Page view tracking for SEO monitoring

## Deployment

Deploy to Vercel for optimal Next.js performance:

```bash
npm run build
vercel deploy
```

Ensure environment variables are set in Vercel project settings.

## Development Roadmap

- [x] Project initialization and setup
- [x] Database schema design
- [x] Admin authentication
- [x] API routes for CRUD operations
- [ ] Homepage with all sections
- [ ] Portfolio listing and detail pages
- [ ] Blog listing and detail pages
- [ ] Exhibition listing and detail pages
- [ ] Service detail pages
- [ ] Industry detail pages
- [ ] Global presence pages
- [ ] Admin CRUD forms
- [ ] Image upload functionality
- [ ] Form submission and lead capture
- [ ] SEO optimization (sitemap, robots.txt, schema markup)
- [ ] Performance optimization
- [ ] Deployment and testing

## Support

For questions or issues, please contact the development team.
