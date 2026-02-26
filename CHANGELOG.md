# Changelog

All notable changes to the WorkRight Legal website are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/).

## [0.5.0] - 2026-02-26

### Added
- **Form:** Contact form now submits to Formspree with loading state, error handling, and network error recovery (BUG-001)
- **UX:** Visible breadcrumb navigation on all service pages via `Breadcrumb.astro` component
- **Social Proof:** Testimonials shown on matching practice area pages (filtered by `practiceArea` field)

### Fixed
- **CSS:** Removed global `a:hover { opacity: 0.7 }` - scoped to `.prose a` only. Eliminated 24 `style="opacity: 1;"` inline overrides across 5 files (BUG-008)

## [0.4.0] - 2026-02-26

### Added
- **Page:** Custom 404 page with branded design, CTA buttons, and service links grid
- **A11y:** Skip navigation link (sr-only + focus:not-sr-only pattern) in BaseLayout
- **A11y:** `autocomplete` attributes on contact form (given-name, family-name, email, tel)
- **A11y:** `aria-describedby` linking form inputs to error message IDs
- **Security:** `vercel.json` with security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- **PWA:** Web app manifest (`/manifest.json`) linked from BaseLayout
- **Meta:** `theme-color` meta tag (#ffffff) + `viewport-fit=cover`

### Fixed
- **A11y:** Services dropdown keyboard navigation - added `focus-within` CSS, Escape key handler, `aria-expanded`, `role="menu"`/`role="menuitem"` (BUG-002)
- **A11y:** Mobile menu now closes on link click + `astro:before-swap` event (BUG-003)
- **A11y:** Color contrast on `--color-text-tertiary` improved from #9c9490 (~2.8:1) to #736e6a (~4.8:1) (BUG-004)
- **A11y:** VideoSection iframe now has `title` attribute, replaced deprecated `frameborder` with CSS (BUG-006)
- **SEO:** AggregateRating now computed dynamically from testimonials collection instead of hardcoded (BUG-007)
- **Layout:** ImageSection width/height now dynamic based on `aspectRatio` prop via `dimensionMap` (BUG-005)

### Removed
- `clsx` package (unused)
- `@astrojs/mdx` integration (unused)
- `src/lib/utils.ts` (unused `cn()` utility)

## [0.3.0] - 2026-02-26

### Added
- **SEO:** AggregateRating schema (5.0 stars from 3 reviews) on Organization
- **SEO:** HowTo schema on all 6 practice area pages (process steps as rich results)
- **SEO:** WebSite schema in BaseLayout for sitelinks search box
- **SEO:** Homepage FAQ section with 5 general employment law questions + FAQSchema
- **SEO:** `width`/`height` attributes on all `<img>` elements (CLS fix)
- **SEO:** `fetchpriority="high"` on hero and above-fold images (LCP improvement)
- **SEO:** `image` prop passed to PersonSchema for Sarah Mitchell
- **SEO:** `logo` and `image` properties on OrganizationSchema
- **SEO:** `areaServed` suburbs (23 City entities) in LegalServiceSchema
- **SEO:** Related practice area cross-links on each service page (4 per page)
- **SEO:** About and Contact links added to footer navigation
- **SEO:** Google Maps "Get directions" link on contact page
- **GEO:** Expanded `llms.txt` with attorney bio, FAQs, process steps, service areas
- **GEO:** Created `llms-full.txt` (comprehensive 300+ line reference, all 36 FAQ pairs)
- **GEO:** Updated `robots.txt` with 10 additional AI crawlers (Applebot-Extended, Meta-ExternalAgent, Amazonbot, cohere-ai, etc.)
- **AEO:** `noindex` on /privacy-policy and /terms-of-service
- **Docs:** Created docs/ directory with PROJECT-PROGRESS.md, CHANGELOG.md
- **Docs:** Created project_notes/ with decisions.md (10 ADRs), bugs.md, issues.md, key_facts.md
- **Docs:** Created LAWFIRM-BUILDER-INSIGHTS.md for agent plugin development

### Changed
- Footer "Legal" column renamed to "Company" with About + Contact links added
- OrganizationSchema `sameAs` now filters empty strings with `.filter(Boolean)`
- LegalServiceSchema accepts optional `serviceAreas` prop for suburb-level areaServed
- VideoSection poster image now has descriptive alt text instead of empty `alt=""`

## [0.2.0] - 2026-02-26

### Added
- Privacy Policy page (`/privacy-policy`) - Australian Privacy Act compliant
- Terms of Service page (`/terms-of-service`) - NSW governing law
- OG default image (`/public/og-default.svg`)
- Updated README.md with proper project documentation

### Fixed
- Social media URLs changed from "#" to empty strings in firm.ts
- Placeholder ABN updated from 00 000 000 000 to 12 345 678 901
- Attorney image on about page now reads from content collection instead of hardcoded URL
- BaseLayout og:image reference updated from .jpg to .svg

### Removed
- `gsap` package (installed but unused)
- `motion` package (installed but unused)

## [0.1.0] - 2026-02-25

### Added
- Initial project: Astro 5 + Tailwind CSS v4 + React 19
- Homepage with hero, practice areas, testimonials, video section, CTA
- About page with attorney profile and firm values
- Services index + 6 practice area detail pages
- Contact page with React contact form (UI only)
- Content Collections: 6 practice areas, 1 attorney, 3 testimonials
- JSON-LD schema: Organization, LegalService, Person, FAQ, Breadcrumb
- Minimal White design system with scroll-driven animations
- robots.txt with AI crawler directives
- llms.txt for AI citation
- Sitemap auto-generation via @astrojs/sitemap
