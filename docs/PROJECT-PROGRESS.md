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

## Phase 5: Advanced Features (COMPLETED)
> Attorney profiles, case results, conversion features, font optimization

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Individual attorney profile pages | Done | 2026-02-27 | 3 profiles: Sarah Mitchell, Priya Sharma, James Chen |
| Exit intent / urgency for deadline pages | Done | 2026-02-27 | Exit-intent modal on 21-day unfair dismissal pages |
| Self-host fonts (fontsource) | Done | 2026-02-27 | Already using @fontsource, render-blocking Google Fonts eliminated |
| Case results / settlements page | Done | 2026-02-27 | Social proof + conversion |

## Phase 5b: Animation & Scroll (COMPLETED)
> Replace CSS animations with GSAP ScrollTrigger + Lenis smooth scroll

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Replace CSS animation-timeline with GSAP ScrollTrigger | Done | 2026-02-28 | More reliable cross-browser support |
| Lenis smooth scroll synced with GSAP ticker | Done | 2026-02-28 | gsap-init.ts handles sync |
| Parallax images via ScrollTrigger scrub | Done | 2026-02-28 | Smooth parallax on scroll |
| Journey stage reveal animations | Done | 2026-02-28 | ClientJourney step reveals |
| Stagger children reveals | Done | 2026-02-28 | Cascading entrance animations |

## Phase 5c: Production Hardening (COMPLETED)
> Security headers, caching, PWA icons, sitemap filtering

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Security headers: CSP, HSTS, X-Content-Type-Options, X-Frame-Options | Done | 2026-02-28 | Full security header suite in vercel.json |
| Immutable caching for static assets | Done | 2026-02-28 | Long-lived cache headers for hashed assets |
| PWA icons (apple-touch-icon, icon-192, icon-512) | Done | 2026-02-28 | Complete icon set for mobile |
| Sitemap filters noindex pages | Done | 2026-02-28 | Privacy/terms excluded from sitemap |
| Social links conditional from firmData | Done | 2026-02-28 | No dead href="#" links when URLs empty |

## Phase 5d: Image Optimization (COMPLETED)
> Astro Image component for WebP optimization

| Task | Status | Date | Notes |
|------|--------|------|-------|
| All images converted to Astro Image component with WebP | Done | 2026-02-28 | Build-time WebP optimization |
| Unsplash dns-prefetch/preconnect removed | Done | 2026-02-28 | No external image dependencies |

## Phase 6: AI-Generated Media (COMPLETED)
> Replace all Unsplash placeholders with NanoBanana AI-generated images and video

| Task | Status | Date | Notes |
|------|--------|------|-------|
| 20 NanoBanana AI-generated images | Done | 2026-03-04 | Replacing all Unsplash placeholders |
| 3 attorney portraits | Done | 2026-03-04 | Sarah Mitchell, Priya Sharma, James Chen |
| 6 practice area hero images | Done | 2026-03-04 | One per practice area |
| 6 news article thumbnails | Done | 2026-03-04 | One per news article |
| Homepage hero, consultation scene, video thumbnail, OG card | Done | 2026-03-04 | Key brand images |
| Chatbot avatar | Done | 2026-03-04 | AI-generated avatar |
| Hero ambient video loop (V1) | Done | 2026-03-04 | Fade-in + reduced-motion fallback |
| Firm intro video (V2) | Done | 2026-03-04 | Ready for use |
| All Unsplash references removed from codebase | Done | 2026-03-04 | Clean codebase, no external image deps |
| Unsplash domain removed from astro.config.mjs | Done | 2026-03-04 | No external image domains configured |

## Phase 6b: UI Polish & ClientJourney Redesign (COMPLETED)
> Fix clipping bugs, redesign ClientJourney, improve scroll animations

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Fix SituationSelector overflow-hidden clipping | Done | 2026-03-04 | Border accent + shadow visible on hover |
| Fix TestimonialCard overflow-hidden clipping | Done | 2026-03-04 | Quote mark + hover shadow visible |
| Redesign ClientJourney content | Done | 2026-03-04 | Tighter copy, SVG icons replace shapes |
| Improve ClientJourney GSAP animations | Done | 2026-03-04 | Smooth crossfade, text stagger, scale entrance |
| Add journey card CSS fallbacks | Done | 2026-03-04 | No-JS fallback for card children |

## Phase 7: UI/UX Enhancement Pass (COMPLETED)
> Bug fixes, design polish, animation improvements

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Fix hero descender clipping (leading-[1.05] to [1.15]) | Done | 2026-03-04 | HeroTextReveal.tsx + Hero.astro practice variant |
| Fix situation card default border (transparent to visible) | Done | 2026-03-04 | global.css border-left uses --color-border |
| Fix ClientJourney scroll skip bug | Done | 2026-03-04 | Rebuilt with GSAP timeline + scrub (was onUpdate) |
| Fix video section too tall (max-h-[70vh]) | Done | 2026-03-04 | VideoSection.astro inline variant |
| Situation cards: descriptions visible on mobile | Done | 2026-03-04 | CSS media query, hover-reveal only on lg+ |
| Client Journey: stage numbers more prominent | Done | 2026-03-04 | opacity-20, text-7xl |
| FAQ: numbered indicators (01-07) | Done | 2026-03-04 | FAQAccordion.astro |
| Stats: accent line beneath numbers | Done | 2026-03-04 | AnimatedCounter.astro |
| Hero: scroll-down indicator with bounce | Done | 2026-03-04 | Desktop only, aria-hidden |
| Video: pulsing ring on play button | Done | 2026-03-04 | animate-ping with 2s duration |
| Verified build (88 pages) + mobile/desktop viewports | Done | 2026-03-04 | Playwright screenshots at 375px + 1440px |

## Phase 8: Expansion & Analytics (COMPLETED)
> Location pages, analytics, production features

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Location-specific landing pages (10 suburbs x 6 areas = 60 pages) | Done | 2026-03-04 | Dynamic [slug]/[location] routing |
| Vercel Analytics + Speed Insights | Done | 2026-03-04 | Privacy-friendly, no cookies needed |
| Cookie consent banner | Not needed | 2026-03-04 | Vercel Analytics is cookie-free |
| V3 practice areas ambient video | Deferred | | No Veo MCP available; revisit when video gen tool configured |

## Phase 9: ClientJourney Redesign & Hero Polish (COMPLETED)
> SVG path map for ClientJourney, hero UX improvements, video fixes

| Task | Status | Date | Notes |
|------|--------|------|-------|
| ClientJourney: SVG path map replaces pinned scroll | Done | 2026-03-05 | Desktop: winding SVG trail (40%) + content cards (60%), GSAP scrub draws path |
| ClientJourney: stop circles light up with accent color | Done | 2026-03-05 | Glow rings + card highlight/dim based on active stop |
| ClientJourney: mobile unchanged stacked timeline | Done | 2026-03-05 | Mobile layout preserved |
| scroll-animations.ts: initJourneyPinned replaced with initJourneyMap | Done | 2026-03-05 | stroke-dasharray/dashoffset animation via ScrollTrigger scrub |
| BaseLayout: updated import to initJourneyMap | Done | 2026-03-05 | Was initJourneyPinned |
| Hero: bouncing chevron replaces scroll-line-draw SVG | Done | 2026-03-05 | animate-bounce-gentle CSS (2s ease-in-out, 4px travel) |
| global.css: removed scroll-line-draw keyframes, added bounce-gentle | Done | 2026-03-05 | Updated prefers-reduced-motion references |
| VideoSection: max-h-[70vh] to max-h-[50vh] for inline variant | Done | 2026-03-05 | Constrains video height in viewport |
| Hero: background video fix (is-playing class) | Done | 2026-03-05 | Script sets class on play, removed conflicting opacity-20 |
| Hero: video opacity increased to 0.8 | Done | 2026-03-05 | .hero-video.is-playing in global.css |
| Hero: directional gradient overlay | Done | 2026-03-05 | Left-to-right (solid dark left, 30% right) + top/bottom edge darkening |
| HeroTextReveal: descender fix | Done | 2026-03-05 | Added pb-1 to .hero-word spans, prevents y/g clipping |

## Phase 10: Site-Wide Design Polish (COMPLETED)
> Consistency pass across all inner pages to match homepage design language

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Footer: increase text contrast (text-white/30 to /50) | Done | 2026-03-05 | Hours, disclaimer, copyright all improved |
| Case results: replace gray fallback colors with design system | Done | 2026-03-05 | bg-gray-100 to --color-accent-subtle, --color-surface-alt |
| Case results: accent border on disclaimer box | Done | 2026-03-05 | border-l-2 border-l-accent for visual emphasis |
| About: heading font-family on features h3 | Done | 2026-03-05 | var(--font-heading) on "What sets us apart" items |
| Contact: heading font-family on sidebar h3/h4 | Done | 2026-03-05 | "Contact information" + "Urgent matter?" |
| FAQ: standardize section padding (py-14 lg:py-18 to py-16 lg:py-20) | Done | 2026-03-05 | Matches site-wide rhythm |
| CTA: standardize warm/default padding (py-14 lg:py-18 to py-16 lg:py-20) | Done | 2026-03-05 | Consistent across all CTA variants |
| News: wider container (max-w-5xl to max-w-[90rem]) | Done | 2026-03-05 | Matches site-wide layout, gap-6 to gap-8 |
| Services index: grid gap standardized (gap-5 to gap-6) | Done | 2026-03-05 | Consistent card spacing |
| Testimonials: grid gap standardized (gap-5 to gap-6) | Done | 2026-03-05 | Consistent card spacing |
| Location pages: key facts visual upgrade | Done | 2026-03-05 | Bordered cards with info icon (matches service detail page) |
| Location pages: key facts border-y for section separation | Done | 2026-03-05 | bg-surface-alt + border-y |
| Build verification: 88 pages, zero errors | Done | 2026-03-05 | Playwright screenshots verified |

## Phase 11: Typography & Consistency (COMPLETED)
> Typography hierarchy and padding consistency fix

| Task | Status | Date | Notes |
|------|--------|------|-------|
| Footer h3: font-family body → heading | Done | 2026-03-05 | var(--font-heading) |
| 404: hero padding py-20 lg:py-28, sections py-16 lg:py-20 | Done | 2026-03-05 | Consistent with site |
| Team profile: top padding on hero | Done | 2026-03-05 | Spacing fix |
| Service detail: key facts py-14 → py-16 lg:py-20 | Done | 2026-03-05 | Matches site-wide rhythm |

## Phase 12: Starwind UI Site-Wide Integration (IN PROGRESS)
> Extend Starwind UI component library beyond Prose — Separator, Badge, Breadcrumb, Card, Alert, Accordion, Dialog

**Constraint:** NO visual changes — must look identical before and after. React islands (ContactForm, ClaimChecker) stay as-is.

**NOT replacing:** Buttons (elaborate ::before sweep animations), React form inputs, Navigation header, PracticeAreaCard, TestimonialCard.

| Task | Status | Date | Notes |
|------|--------|------|-------|
| **Phase 0: Foundation** | | | |
| Create `src/lib/utils/cn.ts` (tailwind-merge utility) | Done | 2026-03-05 | Required by Starwind components |
| Verify starwind.config.json paths | Done | 2026-03-05 | componentDir + utilsDir correct |
| Build verification (88 pages) | Done | 2026-03-05 | Zero errors |
| **Phase 1: Separator** | | | |
| Install Starwind Separator component | Done | 2026-03-05 | Moved from nested dir to src/components/starwind/separator/ |
| Replace border-t/border-b dividers (~8 files) | Pending | | team/[slug], news/[slug], services/[slug], faq, testimonials, case-results |
| **Phase 2: Badge** | | | |
| Install Starwind Badge | Pending | | |
| Replace category labels (~3 files) | Pending | | case-results, news/index, news/[slug] |
| **Phase 3: Breadcrumb** | | | |
| Install Starwind Breadcrumb | Pending | | |
| Create SiteBreadcrumb.astro wrapper | Pending | | Same API as current Breadcrumb.astro |
| Update ~15 consumer pages | Pending | | |
| Delete old Breadcrumb.astro | Pending | | After verification |
| **Phase 4: Card** | | | |
| Install Starwind Card | Pending | | |
| Add bridge CSS (--color-card, --color-card-foreground) | Pending | | |
| Replace simple card patterns (~3 files) | Pending | | case-results, news/index only |
| **Phase 5: Alert** | | | |
| Install Starwind Alert | Pending | | |
| Add bridge CSS (--color-error, --color-error-foreground) | Pending | | |
| Rewrite UrgencyBanner.astro internals | Pending | | Preserve dark bg + CTA |
| **Phase 6: Accordion** | | | |
| Install Starwind Accordion | Pending | | |
| Create SiteFAQAccordion.astro wrapper | Pending | | Same faqs[] API |
| Replace FAQAccordion in service + FAQ pages | Pending | | Test View Transitions reinit |
| Delete old FAQAccordion.astro | Pending | | After verification |
| **Phase 7: Dialog** | | | |
| Install Starwind Dialog | Pending | | |
| Add bridge CSS (--color-overlay) | Pending | | |
| Rewrite ExitIntentModal.astro | Pending | | Preserve exit-intent JS + session storage |

### Starwind Integration Notes
- **Config issue:** `npx starwind add` installs to nested `starwind/starwind/` dir — must manually move to `starwind/` after each install
- **Bridge CSS pattern:** `src/styles/starwind-bridge.css` maps Starwind semantic tokens (--color-foreground, --color-card, etc.) to our design system (--color-text, --color-surface, etc.)
- **bg-border:** Separator uses Tailwind `bg-border` which auto-resolves from our `@theme { --color-border }` — no bridge needed
- **Execution order:** Phases 0-3 (low risk) → 4-5 (medium) → 6-7 (high risk, test individually)
