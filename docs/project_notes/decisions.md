# Architectural Decision Records (ADRs)

## ADR-001: Static Site Generation over Server-Side Rendering
- **Date:** 2026-02-25
- **Status:** Accepted
- **Context:** Law firm website with mostly static content, no user authentication, no dynamic data
- **Decision:** Use Astro 5 SSG (static output) with React islands only for interactive components (contact form)
- **Rationale:** Maximum performance, zero server cost (Vercel free tier), excellent SEO (pre-rendered HTML), View Transitions for SPA-like feel
- **Consequences:** No server-side form handling - must use external service or API route for contact form

## ADR-002: Tailwind CSS v4 CSS-First Configuration
- **Date:** 2026-02-25
- **Status:** Accepted
- **Context:** Need a design system that supports OKLCH colors and CSS custom properties natively
- **Decision:** Tailwind CSS v4 with `@theme` block in global.css instead of tailwind.config.js
- **Rationale:** v4's CSS-first approach allows theming via CSS variables, better integration with Astro's scoped styles
- **Consequences:** No JS config file; all tokens in `src/styles/global.css`

## ADR-003: Content Collections with Glob Loader
- **Date:** 2026-02-25
- **Status:** Accepted
- **Context:** 6 practice areas, 1 attorney, 3 testimonials - structured content with typed frontmatter
- **Decision:** Astro Content Collections with glob loader, Zod schemas, markdown content
- **Rationale:** Type-safe frontmatter, built-in slug generation, easy to add new entries
- **Consequences:** All content in `src/content/` as markdown; `render()` from `astro:content` for body

## ADR-004: Minimal White Design over Sage Green
- **Date:** 2026-02-25
- **Status:** Accepted (supersedes initial "Midnight Sage" design)
- **Context:** Initial design used sage green + copper accent, redesigned to minimal white
- **Decision:** Monochrome white backgrounds, #0a0a0a text, no color accent, editorial typography
- **Rationale:** Distinctive anti-AI aesthetic, clean and professional, avoids typical law firm navy/gold
- **Consequences:** CLAUDE.md still references "Midnight Sage" in some places; design system uses neutral palette

## ADR-005: Scroll-Driven CSS Animations over JavaScript Libraries
- **Date:** 2026-02-25
- **Status:** Accepted
- **Context:** Had gsap and motion installed; needed reveal animations on scroll
- **Decision:** Pure CSS `animation-timeline: view()` with `@supports` fallback
- **Rationale:** Zero JavaScript overhead, no bundle size, progressive enhancement
- **Consequences:** Removed gsap and motion dependencies; animations only work in supporting browsers (Chrome 115+, Safari 18+, Firefox 128+)

## ADR-006: External Unsplash Images over Local Assets
- **Date:** 2026-02-25
- **Status:** Accepted (with known trade-offs)
- **Context:** Need professional photography for hero images, practice areas, attorney
- **Decision:** Hotlink Unsplash images with size/quality parameters
- **Rationale:** Zero image hosting cost, professional quality, instant availability
- **Trade-offs:** No Astro Image optimization (no WebP/AVIF, no srcset), external dependency, no offline support
- **Future:** Consider moving to local assets with Astro `<Image>` for production

## ADR-007: SVG for OG Default Image
- **Date:** 2026-02-26
- **Status:** Accepted (with known limitation)
- **Context:** Needed a default Open Graph social share image
- **Decision:** SVG with firm branding at /public/og-default.svg
- **Limitation:** Some social platforms (Facebook, LinkedIn) don't support SVG for og:image
- **Future:** Generate a 1200x630 PNG version for full platform compatibility

## ADR-008: llms.txt + llms-full.txt for GEO
- **Date:** 2026-02-26
- **Status:** Accepted
- **Context:** Need AI systems (ChatGPT, Claude, Perplexity) to cite WorkRight Legal accurately
- **Decision:** Maintain llms.txt (summary) + llms-full.txt (comprehensive) with all practice areas, FAQs, attorney bio
- **Rationale:** Follows llms.txt specification; structured Q&A format optimized for AI citation
- **Consequences:** Must be manually updated when content changes; no auto-generation from content collections

## ADR-009: Contact Form is Frontend-Only (Technical Debt)
- **Date:** 2026-02-26
- **Status:** Accepted as temporary
- **Context:** ContactForm.tsx validates and displays success but sends no data
- **Decision:** Acknowledge as critical gap; needs resolution before production launch
- **Options:** Formspree, Resend email API, Vercel serverless function, Netlify Forms
- **Priority:** CRITICAL - must be resolved in Phase 4

## ADR-010: Documentation Structure Modeled on llm-agent Plugin
- **Date:** 2026-02-26
- **Status:** Accepted
- **Context:** Need persistent documentation for project progress, bugs, decisions, issues
- **Decision:** Create docs/ directory with PROJECT-PROGRESS.md, CHANGELOG.md, and project_notes/ subdirectory for bugs.md, decisions.md, issues.md, key_facts.md
- **Rationale:** Mirrors the proven self-documenting patterns from the llm-agent plugin; supports the lawfirm-builder agent plugin development workflow
