# WorkRight Legal - Enhancement Plan

## Current State (as of 2026-03-04)

- **Stack**: Astro 5.17 + Tailwind CSS v4 + React 19 islands
- **Deployment**: Vercel (workrightlegal.vercel.app)
- **Content**: 6 practice areas, 1 attorney, 6 news articles, 6 testimonials
- **Completed**: Phases 1-4b (foundation, bug fixes, SEO/GEO/AEO, accessibility, content polish, premium frontend)
- **Plugin**: Uses `firm` Claude Code plugin (v5.3.4) with 29 agents, 129 skills, 38 commands

## Phase A: Critical Fixes

### A1. Verify practice area routing
- Confirm `/services/[slug].astro` exists and all 6 practice areas render correctly
- If missing, create the dynamic route with full layout: hero, process steps, FAQs, testimonials, related services, CTA
- Each page needs BreadcrumbSchema, FAQSchema, LegalServiceSchema, HowToSchema

### A2. OG image generation
- `satori` + `@resvg/resvg-js` are already installed but no OG endpoint exists
- Create `src/pages/og/[...slug].png.ts` using Astro's dynamic endpoints
- Generate branded OG images with page title, firm name, sage green/copper palette
- Update BaseLayout socialImage to use the generated endpoint

### A3. Analytics setup
- Add Vercel Analytics (zero-config, no cookie consent needed, privacy-friendly)
- Install `@vercel/analytics` and add the `<Analytics />` component to BaseLayout
- Prep for PostHog + GA4 dual-tracking later (Phase D)

## Phase B: Content & Conversion

### B1. Attorney detail pages
- Create `src/pages/team/[slug].astro` template
- Include: photo, credentials, bar admissions, practice area focus, bio, PersonSchema
- Add more attorneys to the content collection (at least 2-3 total)

### B2. Case results / settlements page
- Create `src/content/case-results/` content collection
- Create `src/pages/case-results.astro` index page
- Include: practice area, outcome, settlement amount (where permitted), anonymized client story
- Compliance: add disclaimer "Past results do not guarantee future outcomes" per ASCR

### B3. ChatbotWidget
- Current `ChatbotWidget.astro` is likely a placeholder
- Either integrate with Dify AI (see `/firm:ai-chat-intake` skill) or remove the placeholder entirely
- If keeping: must include "This is not legal advice" disclaimer, no UPL

### B4. Exit-intent for deadline pages
- Unfair dismissal has a strict 21-day filing deadline
- Add exit-intent detection on unfair dismissal + general protections pages
- Show a non-intrusive modal: "You have 21 days to file. Don't lose your rights. Free consultation."
- Use `/firm:deadline-urgency` skill patterns

## Phase C: Local SEO & GEO

### C1. Service-location landing pages
- Create at least 3 programmatic pages combining service + location:
  - `/unfair-dismissal-sydney-cbd`
  - `/workplace-discrimination-parramatta`
  - `/employment-lawyer-north-sydney`
- Use `/firm:location-matrix` and `/firm:service-area-pages` skill patterns
- Each page needs unique content (not just city name swaps), LocalBusiness schema, areaServed

### C2. Enhanced schema markup
- Add GeoCoordinates to Organization schema (lat/lng for 123 Pitt St Sydney)
- Add LocalBusiness schema alongside LegalService
- Add hasMap property linking to Google Maps embed
- Validate with Google Rich Results Test

### C3. Structured blog improvements
- Add categories/tags to news content collection schema
- Create category index pages (e.g., `/news/category/unfair-dismissal`)
- Add author field linking to attorney profiles
- Add publishDate, modifiedDate for Article schema
- Internal linking: auto-link practice area mentions in blog posts to service pages

## Phase D: Performance & Polish

### D1. Image optimization
- Replace all Unsplash URLs with self-hosted, optimized images
- Use Astro's `<Image />` component for automatic format conversion (WebP/AVIF) and responsive srcset
- Consider AI-generated images via NanoBanana/Gemini (see `/firm:ai-media` skill)
- Ensure all images have descriptive alt text

### D2. Core Web Vitals audit
- Run Lighthouse via MCP (`/firm:frontend-test` or lighthouse MCP tool)
- Target: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Optimize: font loading (verify no FOUT), image lazy loading, JS bundle size
- The Lenis smooth scroll library adds ~15KB - evaluate if worth keeping

### D3. React island error boundaries
- Wrap `ClaimChecker` and `ContactForm` React islands with error boundaries
- Graceful fallback UI if JS fails to load
- Add `client:visible` loading states

### D4. Cookie consent banner
- Prep for PostHog + GA4 integration
- Create a GDPR/Privacy Act compliant consent banner
- Categories: necessary, analytics, marketing
- Block tracking scripts until consent given
- Use `/firm:data-privacy-legal` skill patterns

## Validation Between Phases

After each phase, run:
- `/firm:compliance-check` - ABA/ASCR advertising rules
- `/firm:frontend-test` - browser-based testing with Playwright
- `/firm:design-audit` - visual consistency and anti-AI-look check
- `npm run build` - verify no build errors
- Commit with descriptive message

## Reference Skills (from firm plugin)

| Phase | Key Skills |
|-------|-----------|
| A | `schema-markup`, `astro-patterns`, `performance-legal` |
| B | `attorney-profiles`, `case-results`, `ai-chat-intake`, `deadline-urgency`, `visitor-psychology` |
| C | `location-matrix`, `service-area-pages`, `local-seo`, `legal-seo`, `blog-engine` |
| D | `media-optimization`, `performance-legal`, `data-privacy-legal`, `cookie-consent` |
| All | `legal-compliance`, `accessibility-legal`, `output-quality`, `anti-duplication` |
