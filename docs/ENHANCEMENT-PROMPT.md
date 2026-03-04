# WorkRight Legal — Full UI/UX Enhancement & Design Makeover

## Context

You are enhancing the WorkRight Legal website — a premium employment law firm site built with **Astro 5 + Tailwind CSS v4 + React 19 islands + GSAP ScrollTrigger + Lenis smooth scroll**. The site is deployed at `workrightlegal.vercel.app`.

The site currently has 88 pages (homepage, about, 6 practice area pages, 60 location landing pages, contact, team, news, FAQ, case results, etc.). The design system uses warm amber/gold accent (`#b8860b`), Cormorant Garamond headings, DM Sans body text.

**Goal:** A comprehensive UI/UX enhancement pass — fix known bugs, modernize the design, improve animations, make sections more visually catchy and engaging, while keeping it sleek, accessible, and professional. Not a full redesign — retain what works, elevate what doesn't.

---

## Tools Available

- **Playwright MCP** — Use `browser_navigate`, `browser_take_screenshot`, `browser_snapshot` to visually audit the live site at `https://workrightlegal.vercel.app` or local dev (`http://localhost:4321`). Take screenshots of each section before and after changes.
- **Pencil MCP** — Use to design/prototype layout alternatives in `.pen` files before implementing. Useful for experimenting with section layouts, card designs, and visual hierarchy.
- **NanoBanana MCP** — Generate replacement images if needed (AI image generation via Gemini).
- **Standard tools** — Read, Write, Edit, Glob, Grep, Bash for code changes.

---

## Phase 1: Visual Audit (Use Playwright)

Before making any changes, do a full visual audit:

1. Start local dev server: `npm run dev`
2. Use Playwright to navigate to `http://localhost:4321` and take full-page screenshots
3. Take section-by-section screenshots of the homepage (hero, stats, situation cards, video, claim checker, journey, why us, video section, testimonials, FAQ, CTA)
4. Note all visual issues, layout problems, spacing inconsistencies
5. Take screenshots of inner pages too (services, about, contact, team)

---

## Phase 1b: Fix Analytics & Monitoring Gaps

### Vercel Analytics — Not Visible
- **Status:** The code (`@vercel/analytics` inject() + `@vercel/speed-insights` injectSpeedInsights()) is wired in `src/layouts/BaseLayout.astro`, but **no data appears in the Vercel dashboard**.
- **Action:**
  1. Open the Vercel dashboard at https://vercel.com → select the `workright-legal` project → go to the **Analytics** tab. If it says "Enable Analytics", click to enable it — the code alone is not enough, the feature must also be activated in the Vercel project settings.
  2. Do the same for **Speed Insights** tab — enable it in the dashboard.
  3. After enabling, deploy once (`git push` or manual deploy) and wait a few minutes for data to populate.
  4. Verify by visiting the live site, then checking the dashboard for page views and Web Vitals.
  5. If still not working, check the browser console for errors related to `@vercel/analytics` or `@vercel/speed-insights`.

### Cookie Consent — Not Implemented
- **Status:** Vercel Analytics and Speed Insights are **cookie-free and privacy-friendly** — they do NOT use cookies and do NOT track personal data. Therefore, **no cookie consent banner is legally required** for these tools under GDPR/Australian Privacy Act.
- **However**, if any future integrations are added (Google Analytics, Facebook Pixel, HotJar, etc.), a cookie consent banner WILL be required. For now, no action needed.
- **If the user wants a cookie banner anyway** (as a trust signal), implement a lightweight one using a simple Astro component with localStorage to remember consent. No third-party library needed.

---

## Phase 2: Fix Known Bugs

### Bug 1: Hero "employee rights" — letter "g" cut off
- **Location:** `src/components/HeroTextReveal.tsx` and `src/components/Hero.astro`
- **Issue:** The gradient text "employee rights" has the descender of "g" clipped. Likely caused by `overflow: hidden` on a parent, or `line-height` being too tight on the heading.
- **Fix:** Check the `leading-[1.05]` on the h1 in HeroTextReveal.tsx (line 66). Increase to `leading-[1.15]` or add `pb-1` to the `.text-gradient` span to give descenders room. Also check if `overflow-hidden` on the hero section (Hero.astro line 35) clips it.

### Bug 2: Situation cards — no left border by default
- **Location:** `src/styles/global.css` (`.situation-card` rules, ~line 638)
- **Issue:** Cards have `border-left: 3px solid transparent` — invisible by default. Only shows on hover.
- **Fix:** Give a subtle default border: `border-left-color: var(--color-border)` or `var(--color-accent-muted)`. On hover, transition to `var(--color-accent)`.

### Bug 3: ClientJourney scroll animation — not smooth, skips stages
- **Location:** `src/lib/scroll-animations.ts` (`initJourneyPinned` function) and `src/components/ClientJourney.astro`
- **Issue:** Fast scrolling causes stages to skip because the animation uses `currentIndex` tracking with gsap.to transitions that can't keep up. The crossfade approach fights with scrub.
- **Fix options:**
  - Replace the `onUpdate` callback approach with a proper GSAP timeline + scrub. Build a timeline where each stage gets a fade-in and fade-out tween, then let ScrollTrigger scrub through it.
  - Use `gsap.timeline()` with labeled sections, and `scrub: true` for frame-perfect sync.
  - Increase scrub value (currently 0.8) for smoother interpolation, or use `scrub: true` for direct scroll-linked movement.

### Bug 4: "See how we work" video section too large
- **Location:** `src/components/VideoSection.astro` and `src/pages/index.astro` (line 225-230)
- **Issue:** The video container uses `aspect-video` (16:9) which is too tall on large screens, gets cut off.
- **Fix:** Constrain max height: add `max-h-[70vh]` to the video container. Or change aspect ratio to `aspect-[21/9]` or `aspect-[2/1]` for a cinematic feel. Also consider adding `max-w-5xl mx-auto` to keep it proportional.

---

## Phase 3: Design Enhancements

### 3.1 Hero Section Modernization
- Add a subtle animated gradient mesh or noise texture behind the hero
- Consider split-layout hero: large text left, abstract visual/illustration right
- Make the HeroTextReveal animation more dramatic — add blur-in effect, larger stagger delay
- Animated underline or highlight on "employee rights" after reveal completes
- Add a scroll-down indicator (animated chevron or mouse icon) at bottom of hero

### 3.2 Stats/Counter Section
- Current: plain grid of numbers on a muted background
- Enhancement: Add animated counting effect (if not already), plus micro-icons or illustrations next to each stat
- Consider a horizontal scrolling ticker on mobile, or cards with subtle borders
- Add a subtle gradient or accent line beneath each number

### 3.3 Situation Selector Cards ("Sound Familiar?")
- Add visible left border accent by default (subtle, transitions to bold on hover)
- Add a subtle background pattern or gradient on hover
- Consider adding a small illustration or icon animation on hover
- Make the reveal text (currently hidden, shown on hover) always visible on mobile
- Add card entrance stagger animation that's slightly more dramatic

### 3.4 ClientJourney Pinned Scroll (Major Overhaul)
- **Content:** Tighten copy further. Each stage should be one punchy sentence, max two.
- **Visuals:** Replace thin SVG line icons with larger, more expressive illustrations or iconography. Consider:
  - Animated SVG icons that draw on as they enter
  - Gradient-filled icons with glow effects
  - Or large watermark-style numbers (01-05) with the icon overlaid
- **Numbers:** Make stage numbers much more prominent — large, bold, with accent color gradient. Currently nearly invisible at `opacity-10`.
- **Animation:** Rebuild with a proper GSAP timeline:
  ```
  const tl = gsap.timeline();
  // For each stage:
  tl.to(prevCard, { opacity: 0, y: -20, duration: 0.3 })
    .fromTo(nextCard, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
    .fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "-=0.3")
    .fromTo(text, { opacity: 0 }, { opacity: 1 }, "-=0.2")
    .fromTo(icon, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1 }, "-=0.3");
  ```
  Then attach to ScrollTrigger with `animation: tl, scrub: true`.
- **Progress indicator:** Replace the thin left-side bar with a more visible progress indicator — horizontal at top, or numbered dots, or a stepper

### 3.5 Video Section ("See how we work")
- Constrain size: `max-h-[70vh]` and `max-w-5xl mx-auto`
- Add a cinematic aspect ratio (21:9 or 2:1)
- Add subtle border and shadow
- Improve the play button — add a pulsing ring animation
- Consider a section header with accent line matching other sections

### 3.6 Testimonials
- Add a horizontal scroll/carousel option on mobile
- Featured testimonial could be larger/hero-style
- Add subtle card hover effects (lift + accent border)
- Consider adding a "Read more stories" link to /testimonials

### 3.7 FAQ Section
- Add number indicators (01, 02, 03...) to each question
- Animate the accordion open/close with height transition
- Add a subtle accent dot or icon before each question

### 3.8 CTA Section
- Add more visual impact — gradient background, floating elements
- Consider adding a trust badge row below the CTA
- Make the section full-bleed with a dark background and accent glow

### 3.9 Footer
- Review spacing and visual hierarchy
- Add a newsletter signup field if appropriate
- Ensure all links work and are properly organized

---

## Phase 4: Global Design Polish

### Typography
- Audit heading sizes for consistency across pages
- Ensure proper hierarchy (h1 > h2 > h3) with clear visual steps
- Check line-height on all heading levels (fix descender clipping globally)

### Spacing
- Standardize section padding: use consistent `py-16 lg:py-24` or similar
- Check gap between sections for rhythm
- Ensure mobile padding is generous but not wasteful

### Color & Contrast
- Audit all text colors against backgrounds for WCAG AA compliance
- Make accent color usage more intentional — not every small element needs it
- Consider adding a second accent color for variety (complementary to amber)

### Hover & Focus States
- Audit all interactive elements for consistent hover/focus behavior
- Ensure all buttons have active/pressed states
- Add focus-visible styles to all interactive elements

### Animations
- Ensure all scroll reveals use consistent timing (duration, ease, delay)
- Add `will-change: transform, opacity` to animated elements for GPU acceleration
- Test all animations at 60fps using browser DevTools Performance tab
- Ensure `prefers-reduced-motion` is respected everywhere

---

## Phase 5: Verification (Use Playwright)

After implementing changes:

1. Take new screenshots of every section and compare to originals
2. Test at multiple viewports: 375px (mobile), 768px (tablet), 1440px (desktop), 1920px (wide)
3. Test scroll animations smoothness — use Playwright to scroll programmatically and check for jank
4. Verify all interactive states (hover, focus, active) on buttons and cards
5. Run `npm run build` to ensure clean build
6. Check Core Web Vitals aren't degraded

---

## Design References & Inspiration

Look for inspiration from these patterns (but adapted to law firm context):
- **Apple-style** scroll sections with pinned reveals
- **Linear.app** style clean, modern SaaS design with subtle animations
- **Stripe-style** gradient meshes and glass morphism
- **Editorial magazine** layouts with strong typography hierarchy

**Anti-patterns to avoid:**
- Navy/gold/burgundy color schemes (per CLAUDE.md rules)
- Overly complex 3D effects that hurt performance
- Gratuitous animations that don't serve a purpose
- Dark mode (not in scope, keep light theme)
- Parallax that causes motion sickness

---

## Files to Modify (Expected)

| File | Changes |
|------|---------|
| `src/components/HeroTextReveal.tsx` | Fix descender clipping, enhance animation |
| `src/components/Hero.astro` | Layout improvements, scroll indicator |
| `src/components/SituationSelector.astro` | Default border, hover improvements |
| `src/components/ClientJourney.astro` | Content + visual overhaul |
| `src/components/VideoSection.astro` | Size constraints, play button |
| `src/components/TestimonialCard.astro` | Hover states, visual polish |
| `src/components/CTASection.astro` | Visual impact improvements |
| `src/components/AnimatedCounter.astro` | Visual enhancements |
| `src/components/FAQAccordion.astro` | Numbering, animation |
| `src/lib/scroll-animations.ts` | Timeline-based journey animation |
| `src/styles/global.css` | Global polish, new utility classes |
| `src/pages/index.astro` | Section ordering, spacing |

---

## Workflow

1. **Audit first** — Use Playwright to screenshot everything before touching code
2. **Design in Pencil** — For major layout changes, prototype in a .pen file first
3. **Fix bugs** — Address the 4 known bugs before enhancements
4. **Enhance section by section** — Work through the homepage top to bottom
5. **Verify each change** — Screenshot after each major change
6. **Build test** — Run `npm run build` after each batch of changes
7. **Commit after each milestone** — Keep commits atomic and descriptive
8. **Update docs and memory** — After every completed task, update PROJECT-PROGRESS.md and MEMORY.md

---

## Quality Iteration Protocol

**Every change must be iterated until the output is high quality. Do not settle for "good enough".**

For each section or component you modify:

1. **Implement v1** — Make the initial change.
2. **Screenshot & review** — Use Playwright to capture the result. Evaluate it critically:
   - Does it look polished and professional?
   - Is the spacing right? Typography balanced?
   - Does it feel modern and catchy without being gimmicky?
   - Does the animation feel smooth and intentional?
   - Does it work on mobile, tablet, and desktop?
3. **Identify issues** — List what's not perfect. Be harsh. Would a top-tier design agency ship this?
4. **Iterate (v2, v3...)** — Fix identified issues. Re-screenshot. Re-evaluate. Repeat.
5. **Final validation** — Only move to the next section when the current one passes:
   - Visual quality: 9/10 or higher
   - Animation smoothness: no jank, no skipping
   - Responsive: looks great at 375px, 768px, 1440px, 1920px
   - Accessibility: keyboard navigable, screen reader friendly, reduced-motion safe
   - Build passes: `npm run build` clean with no warnings
6. **Commit** — Commit the polished version with descriptive message, push to remote.
7. **Update docs** — Update PROJECT-PROGRESS.md and MEMORY.md after every completed section.

**Do NOT move on from a section until it meets the quality bar.** It's better to spend 3 iterations on one section than to rush through 5 sections at 6/10 quality.

If after 3 iterations something still doesn't feel right, present the options to the user with before/after screenshots and ask which direction to go.

---

## Constraints

- **Performance:** No new heavy dependencies. Keep bundle size lean. GSAP is already included.
- **Accessibility:** WCAG 2.1 AA minimum. All animations must respect `prefers-reduced-motion`.
- **Browser support:** Modern browsers only (Chrome, Firefox, Safari, Edge — latest 2 versions).
- **No breaking changes:** All existing URLs, SEO schema, and content must remain intact.
- **Astro SSG:** No server-side rendering. Everything must be static-site compatible.
- **Mobile-first:** All enhancements must work beautifully on 375px+ screens.
