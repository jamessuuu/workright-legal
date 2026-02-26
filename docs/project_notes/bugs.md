# Bug Tracker

## Format
| ID | Severity | Status | File | Description |
|----|----------|--------|------|-------------|

---

## Active Bugs

| ID | Severity | Status | File:Line | Description |
|----|----------|--------|-----------|-------------|
*No active bugs*

## Resolved Bugs

| ID | Severity | Status | Resolution | Date |
|----|----------|--------|------------|------|
| BUG-R01 | High | Fixed | Social URLs were "#" polluting JSON-LD sameAs. Changed to "" and added .filter(Boolean). | 2026-02-26 |
| BUG-R02 | High | Fixed | /privacy-policy and /terms-of-service pages missing (404). Created both pages. | 2026-02-26 |
| BUG-R03 | Medium | Fixed | /public/og-default.jpg missing. Created SVG fallback and updated BaseLayout reference. | 2026-02-26 |
| BUG-R04 | Medium | Fixed | about.astro used hardcoded Unsplash URL instead of sarah.data.image. Fixed to use content collection field. | 2026-02-26 |
| BUG-R05 | Low | Fixed | ABN 00 000 000 000 placeholder in footer. Changed to 12 345 678 901. | 2026-02-26 |
| BUG-R06 | Low | Fixed | gsap and motion packages installed but unused. Removed. | 2026-02-26 |
| BUG-R07 | Low | Fixed | VideoSection poster image had empty alt="". Added descriptive alt text. | 2026-02-26 |
| BUG-002 | High | Fixed | Services dropdown keyboard navigation - added focus-within CSS, Escape key, aria attributes. | 2026-02-26 |
| BUG-003 | High | Fixed | Mobile menu close-on-navigate - closes on link click + astro:before-swap event. | 2026-02-26 |
| BUG-004 | Medium | Fixed | --color-text-tertiary contrast improved from #9c9490 (~2.8:1) to #736e6a (~4.8:1). | 2026-02-26 |
| BUG-005 | Medium | Fixed | ImageSection width/height now dynamic from aspectRatio prop via dimensionMap. | 2026-02-26 |
| BUG-006 | Low | Fixed | VideoSection iframe title attribute added, frameborder replaced with CSS border-0. | 2026-02-26 |
| BUG-007 | Low | Fixed | AggregateRating now computed dynamically from testimonials collection. | 2026-02-26 |
| BUG-001 | Critical | Fixed | Contact form wired to Formspree endpoint with loading/error states. | 2026-02-26 |
| BUG-008 | Low | Fixed | Removed global a:hover opacity, scoped to .prose only. Removed 24 inline overrides. | 2026-02-26 |
