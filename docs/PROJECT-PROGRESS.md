# WorkRight Legal - Project Progress Tracker

## Project Overview
- **Project:** WorkRight Legal employment law firm website
- **Stack:** Astro 5 + Tailwind CSS v4 + React 19 islands
- **Repository:** sample-lawfirm
- **Deployment:** https://workrightlegal.vercel.app

---

## Phase 1: Foundation (COMPLETED)
> Initial build - site structure, content, design system

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Astro 5 project scaffold | Done | 2026-02-25 | Initial commit |
| Tailwind CSS v4 theme (Minimal White) | Done | 2026-02-25 | OKLCH tokens, CSS-first config |
| Content Collections (practice areas, attorneys, testimonials) | Done | 2026-02-25 | 6 areas, 1 attorney, 3 testimonials |
| Homepage | Done | 2026-02-25 | Hero, practice areas, testimonials, CTA |
| About page | Done | 2026-02-25 | Mission, attorney profile, differentiators |
| Services index + 6 detail pages | Done | 2026-02-25 | Dynamic [slug] routing |
| Contact page + form (UI only) | Done | 2026-02-25 | React island, client-side validation |
| BaseLayout with ViewTransitions | Done | 2026-02-25 | Lenis smooth scroll |
| Header + Footer | Done | 2026-02-25 | Mobile menu, service dropdown |
| Scroll-driven animations | Done | 2026-02-25 | CSS animation-timeline: view() |

## Phase 2: Completeness & Fixes (COMPLETED)
> Fix broken links, missing pages, placeholder data, dead dependencies

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Create Privacy Policy page | Done | 2026-02-26 | Australian Privacy Act compliant |
| Create Terms of Service page | Done | 2026-02-26 | NSW governing law |
| Fix placeholder social URLs in firm.ts | Done | 2026-02-26 | Changed "#" to "", filtered from schema |
| Fix placeholder ABN in footer | Done | 2026-02-26 | Changed to 12 345 678 901 |
| Remove unused gsap + motion deps | Done | 2026-02-26 | Pure CSS animations used instead |
| Fix attorney image (use content collection) | Done | 2026-02-26 | about.astro now reads sarah.data.image |
| Create OG default image (SVG) | Done | 2026-02-26 | /public/og-default.svg |
| Update README.md | Done | 2026-02-26 | Replaced Astro starter template |

## Phase 3: SEO / GEO / AEO (COMPLETED)
> Search, generative, and answer engine optimization

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Add noindex to privacy/terms pages | Done | 2026-02-26 | Prevents crawl budget dilution |
| Add width/height to all img tags | Done | 2026-02-26 | Eliminates CLS |
| Add fetchpriority="high" to hero images | Done | 2026-02-26 | Improves LCP |
| Add image prop to PersonSchema | Done | 2026-02-26 | Sarah's photo in structured data |
| Add logo/image to OrganizationSchema | Done | 2026-02-26 | favicon.svg + og-default.svg |
| Add AggregateRating schema | Done | 2026-02-26 | 5.0 from 3 reviews |
| Add HowTo schema to practice areas | Done | 2026-02-26 | Process steps as HowTo rich results |
| Add WebSite schema | Done | 2026-02-26 | Global in BaseLayout |
| Add areaServed suburbs to LegalServiceSchema | Done | 2026-02-26 | 23 suburbs as City entities |
| Add homepage FAQ section + schema | Done | 2026-02-26 | 5 general employment law FAQs |
| Add Google Maps link to contact page | Done | 2026-02-26 | "Get directions" link |
| Expand llms.txt + create llms-full.txt | Done | 2026-02-26 | Full FAQ pairs, attorney bio, process |
| Update robots.txt with latest AI crawlers | Done | 2026-02-26 | +10 new crawlers |
| Add footer links to About/Contact | Done | 2026-02-26 | Renamed "Legal" to "Company" |
| Add related practice area cross-links | Done | 2026-02-26 | 4 related services per page |

## Phase 4: Quality, Accessibility & Conversion (COMPLETED)
> Fix critical gaps, improve accessibility, wire form, add missing pages

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Create 404 page | Done | 2026-02-26 | Branded with CTA + service links |
| Wire contact form to Formspree endpoint | Done | 2026-02-26 | Formspree fetch with loading/error states |
| Fix keyboard navigation for Services dropdown | Done | 2026-02-26 | Added focus-within CSS + Escape key handler |
| Add skip navigation link | Done | 2026-02-26 | sr-only + focus:not-sr-only pattern |
| Fix color contrast on tertiary text | Done | 2026-02-26 | Changed #9c9490 to #736e6a (~4.8:1) |
| Add autocomplete attributes to contact form | Done | 2026-02-26 | given-name, family-name, email, tel |
| Add aria-describedby to form error messages | Done | 2026-02-26 | Linked inputs to error message IDs |
| Fix iframe title in VideoSection | Done | 2026-02-26 | Added title attr, replaced frameborder with CSS |
| Add security headers (vercel.json) | Done | 2026-02-26 | X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy |
| Add theme-color meta tag | Done | 2026-02-26 | #ffffff + viewport-fit=cover |
| Add web app manifest | Done | 2026-02-26 | /public/manifest.json |
| Remove unused clsx + @astrojs/mdx deps | Done | 2026-02-26 | Deleted src/lib/utils.ts, removed MDX integration |
| Fix ImageSection hardcoded dimensions | Done | 2026-02-26 | Dynamic from aspectRatio prop |
| Fix mobile menu close-on-navigate | Done | 2026-02-26 | Close on link click + astro:before-swap |
| Make AggregateRating dynamic from collection | Done | 2026-02-26 | Computed from testimonials collection |
| Add testimonials to practice area pages | Done | 2026-02-26 | Filter by practiceArea, blockquote cards |
| Add visible breadcrumb nav to service pages | Done | 2026-02-26 | Breadcrumb.astro component |
| Remove inline style="opacity: 1;" pattern | Done | 2026-02-26 | Scoped hover opacity to .prose only |

## Phase 4b: Content & Design Polish (COMPLETED)
> Em dash removal, typography fixes, content width, News section

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Replace all em dashes across site | Done | 2026-02-26 | 40+ files cleaned |
| Widen service page content (max-w-3xl to 4xl) | Done | 2026-02-26 | All sections widened |
| Fix body text to 16px minimum (WCAG) | Done | 2026-02-26 | text-sm to text-base |
| Fix paragraph spacing (prose-lg + prose-p:mb-6) | Done | 2026-02-26 | Improved readability |
| Make service area chips non-interactive | Done | 2026-02-26 | Informational only |
| Add News section with content collection | Done | 2026-02-26 | 3 articles, index + [slug] pages |
| Add News to header + footer nav | Done | 2026-02-26 | Desktop, mobile, footer |

## Phase 5: Future Enhancements (PLANNED)
> Analytics, advanced features

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Individual attorney profile pages | Planned | | /attorneys/[slug] template |
| Location-specific landing pages | Planned | | /services/unfair-dismissal-parramatta |
| Analytics integration (Vercel Analytics or Plausible) | Planned | | Zero tracking currently |
| Cookie consent banner | Planned | | Required if analytics added |
| Self-host fonts (fontsource) | Planned | | Eliminate render-blocking Google Fonts |
| Case results / settlements page | Planned | | Social proof + conversion |
| Exit intent / urgency for deadline pages | Planned | | 21-day countdown for unfair dismissal |
