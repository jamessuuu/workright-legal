# Project Key Facts & Reference

## URLs
- **Production:** https://workrightlegal.vercel.app
- **Repository:** C:\Users\james\sample-lawfirm
- **Deployment:** Vercel (free tier, auto-deploy from main)

## Tech Stack
- **Runtime:** Node.js 20.x
- **Framework:** Astro 5.17.x (SSG)
- **CSS:** Tailwind CSS 4.2.x (CSS-first, @theme block)
- **Interactive:** React 19.2.x (islands via client:visible)
- **Smooth scroll:** Lenis 1.3.x
- **Build output:** Static HTML to dist/

## Fonts
- **Headings:** Cormorant Garamond (Google Fonts) - `--font-heading`
- **Body:** DM Sans (Google Fonts) - `--font-body`

## Design Tokens (from global.css)
- **Background:** `--color-bg: #ffffff`
- **Text primary:** `--color-text: #0a0a0a`
- **Text secondary:** `--color-text-secondary: #4a4543`
- **Text tertiary:** `--color-text-tertiary: #9c9490` (contrast issue - see BUG-004)
- **Accent:** `--color-accent: #0a0a0a`
- **Border:** `--color-border: #e8e4e1`
- **Surface alt:** `--color-surface-alt: #faf9f8`

## Content Collections
| Collection | Count | Schema Location |
|------------|-------|-----------------|
| practiceAreas | 6 | `src/content.config.ts` |
| attorneys | 1 | `src/content.config.ts` |
| testimonials | 3 | `src/content.config.ts` |

## Pages (12 total)
| Route | Source |
|-------|--------|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/contact` | `src/pages/contact.astro` |
| `/services` | `src/pages/services/index.astro` |
| `/services/[slug]` × 6 | `src/pages/services/[slug].astro` |
| `/privacy-policy` | `src/pages/privacy-policy.astro` |
| `/terms-of-service` | `src/pages/terms-of-service.astro` |

## JSON-LD Schema Types
| Schema | Location | Scope |
|--------|----------|-------|
| Organization + LegalService | `OrganizationSchema.astro` | Global (BaseLayout) |
| WebSite | `WebSiteSchema.astro` | Global (BaseLayout) |
| Person | `PersonSchema.astro` | About page |
| LegalService | `LegalServiceSchema.astro` | Per practice area |
| FAQPage | `FAQSchema.astro` | Homepage + per practice area |
| HowTo | `HowToSchema.astro` | Per practice area |
| BreadcrumbList | `BreadcrumbSchema.astro` | All interior pages |

## Commands
```
npm run dev      # Dev server (localhost:4321)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Firm Data Source
All firm information centralized in `src/data/firm.ts`:
- Name, phones, email, address, hours, geo coordinates
- Service areas (23 suburbs)
- Practice areas list with slugs, descriptions, icon keys
