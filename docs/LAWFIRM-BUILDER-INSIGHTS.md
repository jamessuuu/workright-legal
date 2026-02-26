# Lawfirm Builder Agent Plugin - Insights & Patterns

> Lessons learned from building the WorkRight Legal site that should inform the lawfirm-builder agent plugin.
> This document feeds back into the plugin's skill definitions, agent instructions, and quality checks.

---

## 1. Law Firm Website Architecture Patterns

### Mandatory Pages
Every law firm site MUST have these pages at minimum:
- `/` - Homepage with hero, practice areas, testimonials, CTA
- `/about` - Firm mission, attorney profiles, differentiators
- `/services` - Practice area index
- `/services/[slug]` - Individual practice area pages (dynamic)
- `/contact` - Contact form + firm details + Google Maps
- `/privacy-policy` - Australian Privacy Act compliant (noindex)
- `/terms-of-service` - NSW/state governing law (noindex)
- `/404` - Branded 404 with CTA (MISSING from current build - critical gap)

### Optional High-Value Pages
- `/attorneys/[slug]` - Individual attorney profile pages
- `/blog` or `/resources` - Content marketing / legal updates
- `/case-results` - Settlement outcomes for social proof
- Location-specific landing pages (`/services/unfair-dismissal-parramatta`)

### Content Collections Required
| Collection | Required Fields | Notes |
|------------|----------------|-------|
| practiceAreas | title, slug, description, metaTitle, metaDescription, heroHeading, heroSubheading, keyFacts, process, faqs, serviceAreas, ctaText, stats | All fields required; build fails on missing |
| attorneys | name, slug, title, image, credentials, education, barAdmissions, philosophy, yearsExperience, metaTitle, metaDescription | Need image URL (external or local) |
| testimonials | name, rating, practiceArea | Body is the quote text |

### Central Data Pattern
All firm data MUST flow from a single source (`src/data/firm.ts`):
- Name, phones, email, address, hours, geo, service areas
- Practice areas list with slugs and descriptions
- Social media URLs (use empty string, not "#", for missing)
- This prevents NAP inconsistency across pages

---

## 2. SEO Checklist for Law Firm Sites

### JSON-LD Schema (7 types minimum)
1. **Organization + LegalService** - Global, on every page
2. **WebSite** - Global, for sitelinks search box
3. **Person** - Per attorney, with image, credentials, alumniOf
4. **LegalService** - Per practice area, with areaServed suburbs
5. **FAQPage** - Per practice area + homepage
6. **HowTo** - Per practice area (process steps)
7. **BreadcrumbList** - All interior pages

### Schema Enhancement Patterns
- `AggregateRating` on Organization - wire from testimonials collection
- `areaServed` should list actual suburbs as City entities, not just "Sydney"
- `sameAs` must filter empty/placeholder URLs: `.filter(Boolean)`
- `logo` and `image` properties on Organization (even if just favicon/OG)
- Person schema must include `image` prop for Knowledge Panel potential

### Meta Tags Checklist
- [ ] Unique title per page (<60 chars)
- [ ] Unique description per page (120-160 chars)
- [ ] Canonical URL on every page
- [ ] og:type, og:title, og:description, og:url, og:image, og:locale, og:site_name
- [ ] twitter:card, twitter:title, twitter:description, twitter:image
- [ ] noindex on privacy/terms pages
- [ ] theme-color meta tag

### Image SEO
- [ ] width + height attributes on ALL img tags (prevents CLS)
- [ ] fetchpriority="high" on above-fold hero images
- [ ] Descriptive alt text (not empty, not "image")
- [ ] loading="lazy" on below-fold, loading="eager" on above-fold

---

## 3. GEO (Generative Engine Optimization) Patterns

### llms.txt Requirements
Must include:
- Firm identity + founding story
- Founder/principal bio with credentials
- All practice areas with URLs and key facts (deadlines, compensation ranges)
- FAQ pairs in Q: / A: format (AI systems parse this well)
- Process steps
- Contact details (phone, email, address, hours)
- Service areas list
- Link to llms-full.txt for extended content

### llms-full.txt Requirements
Comprehensive reference with:
- Full practice area descriptions
- ALL FAQ pairs from every practice area (not just a selection)
- Key facts / statistics per practice area
- Process steps per practice area
- Attorney qualifications in detail

### robots.txt AI Crawlers (as of Feb 2026)
Allow these crawlers for maximum AI citation:
```
GPTBot, ChatGPT-User, OAI-SearchBot, Google-Extended, GoogleOther,
anthropic-ai, ClaudeBot, PerplexityBot, Applebot-Extended,
Meta-ExternalAgent, Meta-ExternalFetcher, Amazonbot, cohere-ai,
AI2Bot, YouBot, Bytespider, CCBot, Diffbot, ImagesiftBot, Timpibot
```

---

## 4. AEO (Answer Engine Optimization) Patterns

### FAQ Best Practices
- Use conversational question format ("How long do I have to...")
- Include specific numbers, deadlines, thresholds in answers
- Reference legislation by name (Fair Work Act, NES, etc.)
- 5-7 FAQs per practice area is optimal
- Add 4-5 general FAQs on homepage for broad employment law queries
- Use both FAQSchema (JSON-LD) AND visible FAQAccordion (details/summary)

### HowTo Schema
- Every practice area with a process/steps section should have HowTo schema
- Name format: "How to make a [practice area] claim"
- Steps must have position, name, and text

---

## 5. Common Bugs & Anti-Patterns

### Bug: Placeholder Data Pollution
- Social URLs set to "#" pollute JSON-LD `sameAs` array
- ABN 00 000 000 000 looks obviously fake
- **Fix:** Use empty strings + `.filter(Boolean)` for optional data

### Bug: Hardcoded Image References
- About page used hardcoded Unsplash URL instead of content collection field
- **Fix:** Always use data from content collections; single source of truth

### Bug: Unused Dependencies
- gsap and motion installed but never imported
- clsx imported but only used in one unused utils file
- @astrojs/mdx integration added but no .mdx files exist
- **Fix:** Audit dependencies after initial build; remove unused

### Bug: Missing Pages Linked in Footer
- Footer links to /privacy-policy and /terms-of-service before pages existed
- **Fix:** Create all linked pages before or immediately after footer creation

### Anti-Pattern: style="opacity: 1;" Inline Override
- 24+ occurrences of inline opacity override due to global CSS transition rule
- **Fix:** Add a CSS class that resets opacity on specific elements, not inline styles

### Anti-Pattern: attorneys[0] Without Guard
- Fragile array index access for attorney data
- **Fix:** Use `.find()` by slug or provide graceful empty state

### Anti-Pattern: Hardcoded Schema Counts
- AggregateRating reviewCount: "3" doesn't auto-update
- **Fix:** Compute from collection: `const count = testimonials.length`

---

## 6. Accessibility Requirements for Law Firms

### WCAG AA Minimum
Law firm sites handle sensitive personal matters - accessibility is both ethical and legal:
- Skip navigation link (WCAG 2.4.1)
- Keyboard-accessible navigation including dropdowns (WCAG 2.1.1)
- Color contrast minimum 4.5:1 for normal text (WCAG 1.4.3)
- Form inputs with autocomplete attributes (WCAG 1.3.5)
- Error messages linked via aria-describedby (WCAG 3.3.1)
- iframe title attributes (WCAG 4.1.2)
- Mobile menu must close on navigation and outside click

### Contrast Issue Pattern
Tertiary/muted text colors often fail WCAG AA:
- `#9c9490` on white = ~2.8:1 (FAIL)
- Minimum for body text: 4.5:1
- Minimum for large text (18px+ or 14px bold): 3:1

---

## 7. Conversion Optimization Patterns

### Critical: Contact Form Must Work
The #1 conversion mechanism on a law firm site is the contact form. It MUST:
- Submit to a real endpoint (Formspree, Resend, API route)
- Show loading state during submission
- Confirm with next-steps messaging
- Include autocomplete attributes for faster mobile entry
- Have a honeypot field for spam prevention (not CAPTCHA - reduces conversions)

### Phone CTAs
- Every practice area page should have a direct `tel:` link CTA
- Urgent deadline pages (unfair dismissal, general protections) need prominent phone CTAs
- Footer should show both primary and 1300 numbers

### Trust Signals
- Testimonials per practice area (match `testimonial.practiceArea` to page)
- Case results / settlement amounts (when available)
- Attorney credentials prominently displayed
- "Free consultation" and "No win, no fee" repeated in trust bar, hero, CTA

### Missing Conversion Elements (Future)
- Visible breadcrumbs on service pages
- Back-to-top button on long pages
- Exit intent for deadline-sensitive pages
- Live chat or callback widget

---

## 8. Security Checklist

### vercel.json Security Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Form Security
- No user input rendered with `set:html` (XSS prevention)
- Honeypot field for spam (invisible to users, visible to bots)
- Rate limiting on API endpoint (server-side)
- CSRF protection if using API routes

---

## 9. Enhancement Cascade Opportunities

### Patterns to Propagate to Other Builder Plugins
These patterns from the lawfirm site are generalizable:

| Pattern | Applicable To | Specialization Needed |
|---------|--------------|----------------------|
| llms.txt + llms-full.txt | All professional service sites | Industry-specific Q&A content |
| FAQ per service page + homepage | All service businesses | Domain-specific questions |
| HowTo schema for process steps | Any site with step-by-step workflows | Process terminology |
| AggregateRating from testimonials | All B2C businesses | Review platform integration |
| Central firm data (firm.ts) | All business sites | Entity-specific fields |
| robots.txt AI crawler list | Universal | None - same for all |
| Suburb-level areaServed | All local businesses | City/region-specific lists |
| Security headers template | Universal | None - same for all |

### Lawfirm-Specific Patterns (Do NOT cascade as-is)
- Australian Privacy Act privacy policy content
- NSW governing law terms of service
- Fair Work Commission process steps
- Employment law FAQ content
- Legal disclaimer in footer
- ABN display requirement
