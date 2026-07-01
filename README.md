# Real Estate Media Quote Calculator

A professional web application for managing real estate media service quotes with separate client-facing and admin interfaces.

## Overview

This is a **Next.js + React + TypeScript + Tailwind CSS** application that provides:

1. **Client-Facing Interface** - A quote request form for real estate agents
2. **Admin Dashboard** - Tools for reviewing, calculating, and finalizing quotes
3. **Pricing Management** - Admin interface for configuring all pricing without code

## Features

### Client Interface (`/`)

- **Professional Quote Request Form** with sections for:
  - Agent Information (name, brokerage, contact details)
  - Property Information (address, type, size, listing price, dates)
  - Package Selection (visual cards showing service bundles)
  - Services Selection (checkboxes for individual services)
  - Conditional Sections (drone visuals, video details, 3D walkthrough)
  - AI Editing Add-ons (with quantity inputs)
  - Special Instructions
  - Estimated Cost Preview (showing recommendation)

- **Features:**
  - Real-time estimate range calculation
  - Intelligent package recommendation engine
  - Mobile-responsive design
  - Clean, premium aesthetic (white, dark navy, gold accents)
  - Form validation before submission
  - Confirmation screen after submission

### Admin Interface (`/admin`)

- **Password-Protected Access**
  - Temporary authentication using `NEXT_PUBLIC_ADMIN_PASSWORD` env variable
  - Persists session in localStorage
  - ⚠️ *Replace with proper OAuth/SSO before production*

- **Dashboard** (`/admin`)
  - Summary cards showing stats and metrics
  - Recent quotes table with quick links

- **Quotes Management** (`/admin/quotes`)
  - Filterable table of all quote requests
  - Search and status filtering
  - Quick actions (view, delete)

- **Quote Detail Review** (`/admin/quotes/[id]`)
  - View all client-submitted information
  - Live quote calculator with real-time totals
  - Package selection and pricing adjustments
  - Notes and status management
  - Save functionality

- **Pricing Settings** (`/admin/pricing`)
  - Editable pricing configuration with tabs for packages, services, add-ons, and adjustments
  - Save/reset functionality
  - LocalStorage persistence

## Design System

### Colors
- **Background:** White (#ffffff)
- **Primary Text:** Dark Navy (#0f172a, #1a202c)
- **Accent:** Gold (#d4af37)
- **Semantic:** Green (success), Amber (warning), Red (error)

### Components
- Rounded cards with subtle shadows
- Professional spacing and typography
- Clear visual hierarchy
- Status badges with color coding
- Responsive grid layouts

## Architecture

### Directory Structure

```
├── app/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home (client form)
│   ├── globals.css               # Styles
│   └── admin/                    # Admin routes
│       ├── layout.tsx
│       ├── page.tsx             # Dashboard
│       ├── quotes/
│       │   ├── page.tsx         # Quotes list
│       │   └── [id]/page.tsx    # Quote detail
│       └── pricing/page.tsx     # Pricing settings
├── components/
│   ├── client/                   # Client components
│   │   ├── ClientQuoteForm.tsx
│   │   ├── EstimatePreview.tsx
│   │   └── sections/
│   └── admin/                    # Admin components
│       ├── AdminAuthGate.tsx
│       ├── AdminNavigation.tsx
│       ├── QuoteCalculator.tsx
│       └── PricingEditor.tsx
├── lib/
│   ├── types/index.ts           # TypeScript definitions
│   ├── pricing/config.ts        # Default pricing
│   └── utils/                    # Utilities
│       ├── calculations.ts
│       ├── storage.ts
│       └── format.ts
└── .env.local.example
```

### Key Components

**Client Form Sections:**
- AgentInfoSection
- PropertyInfoSection
- PackageSelectionSection
- ServicesSection
- DroneVisualsSection
- VideoDetailsSection
- WalkthroughDetailsSection
- AIEditingSection
- SpecialInstructionsSection
- EstimatePreview

**Admin Components:**
- AdminAuthGate - Password authentication
- AdminNavigation - Navigation bar
- QuoteCalculator - Real-time pricing sidebar
- PricingEditor - Tabbed pricing configuration

### Pricing Structure

**4 Packages:**
- Essential: $175
- Photo + Floor Plan: $250
- Premium Listing: $450
- Full Media: $850

**Square Footage Adjustments:**
- 0-1,499 sf: $0
- 1,500-2,499 sf: +$50
- 2,500-3,499 sf: +$100
- 3,500-4,499 sf: +$175
- 4,500-5,999 sf: +$250
- 6,000+ sf: +$350

**À La Carte Services:**
- Professional photos: $175
- Floor plan: $100
- Drone photos: $150
- Drone video: $200
- Listing video: $300
- 3D walkthrough: $200
- Vertical reel: $150

**AI Editing Add-ons:**
- 15+ options ranging $10-$125

## Data Models

All types defined in `lib/types/index.ts`:

- **QuoteRequest** - Complete quote with all data
- **AgentInfo** - Agent contact information
- **PropertyInfo** - Property details
- **PricingConfig** - Centralized pricing configuration
- **QuoteSummary** - Calculated breakdown
- **Package**, **Service**, **AIEditingAddon** - Service definitions

## Recommendation Engine

Intelligent package recommendations based on:
- Services selected (video, drone, 3D, etc.)
- Listing price ($750K+, $1M+)
- Property complexity

Client sees recommendation with explanation. Admins see it in reviews.

## Setup & Running

### Installation
```bash
cd real-estate-media-calc
npm install
```

### Environment Setup
```bash
cp .env.local.example .env.local
# Edit .env.local with your admin password
```

### Development
```bash
npm run dev
```

Visit:
- Client: http://localhost:3000/
- Admin: http://localhost:3000/admin (password: admin123)

### Build for Production
```bash
npm run build
npm start
```

## Data Persistence

**Current:** LocalStorage (browser-based)
- Quotes stored in `localStorage`
- Pricing config stored separately
- Survives page reloads, not browser cache clear

**Future:** Easy migration to database
- Storage functions in `lib/utils/storage.ts` are backend-agnostic
- Can connect Supabase, Firebase, or custom API

## Security Notes

⚠️ **NOT Production Ready**
- Admin password in environment variable
- Sessions in browser localStorage
- No encryption
- No audit logging

**Before Production:**
- Replace password with OAuth2/SSO
- Implement backend authentication
- Use secure session management
- Add database encryption
- Implement audit logging
- Add role-based access control

## Technologies

- **Framework:** Next.js 16.2 (App Router)
- **UI:** React 19 with TypeScript
- **Styling:** Tailwind CSS
- **Storage:** LocalStorage (database-ready)

## Performance

- Fast client-side calculations
- Instant form validation
- Responsive mobile design
- No external API calls (MVP)

## Future Enhancements

- [ ] Database integration (Supabase/Firebase)
- [ ] Email integration (send quotes to clients)
- [ ] Payment processing (Stripe)
- [ ] Client portal (view quote status)
- [ ] Calendar/scheduling integration
- [ ] PDF quote generation
- [ ] Analytics dashboard
- [ ] Booking automation
- [ ] SMS notifications
- [ ] CRM integration

---

**Built with:** Next.js, React, TypeScript, Tailwind CSS  
**Version:** 1.0.0  
**Status:** MVP Complete
