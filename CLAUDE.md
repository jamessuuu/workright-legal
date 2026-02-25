# WorkRight Legal — Law Firm Website

## Project Overview
Premium employment law firm website for WorkRight Legal, a Sydney-based specialist employment law firm. Built with Astro 5, Tailwind CSS v4, and React islands.

## Tech Stack
- **Framework:** Astro 5 (SSG with View Transitions)
- **Styling:** Tailwind CSS v4 (CSS-first, OKLCH colors)
- **Interactive:** React 19 (islands architecture via client:visible)
- **Fonts:** Cormorant Garamond (headings), DM Sans (body)
- **Design System:** "Midnight Sage" — deep sage green + warm copper accent
- **Deployment:** Vercel (workrightlegal.vercel.app)

## Architecture
- `src/content/` — Astro Content Collections (practice-areas, attorneys, testimonials)
- `src/components/` — Astro components (zero JS unless React island)
- `src/components/schema/` — JSON-LD structured data components
- `src/layouts/` — BaseLayout with ViewTransitions
- `src/data/firm.ts` — Central firm configuration
- `src/pages/` — File-based routing
- `public/` — Static assets, robots.txt, llms.txt

## Content Collections
- **practiceAreas** — 6 practice areas with full SEO data, FAQs, process steps
- **attorneys** — Attorney profiles with credentials
- **testimonials** — Client testimonials with ratings

## Key Commands
```
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Anti-AI Design Rules
- NO navy/gold/burgundy color palette
- NO Inter, Poppins, or Montserrat fonts
- Palette: Sage green primary, copper accent, warm neutrals
- Human-crafted feel with editorial serif + distinctive sans-serif

## SEO Features
- JSON-LD schema: Organization, LegalService, Person, FAQ, Breadcrumb
- robots.txt with AI crawler directives (GPTBot, ClaudeBot, PerplexityBot)
- llms.txt for AI citation optimization
- Sitemap auto-generation via @astrojs/sitemap
- Semantic HTML + accessible markup throughout

## Firm Data
- **Name:** WorkRight Legal
- **Location:** Level 12, 123 Pitt Street, Sydney NSW 2000
- **Phone:** (02) 9555 1234 / 1300 123 456
- **Attorney:** Sarah Mitchell, Principal Lawyer
- **Practice Areas:** Unfair Dismissal, Workplace Discrimination, Employment Contracts, Workplace Bullying, Redundancy & Severance, General Protections Claims
