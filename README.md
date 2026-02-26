# WorkRight Legal - Employment Law Firm Website

Premium website for WorkRight Legal, a Sydney-based specialist employment law firm dedicated exclusively to protecting employee rights.

**Live:** [workrightlegal.vercel.app](https://workrightlegal.vercel.app)

## Tech Stack

- **Framework:** Astro 5 (static site generation with View Transitions)
- **Styling:** Tailwind CSS v4 (CSS-first configuration, OKLCH color tokens)
- **Interactive:** React 19 (islands architecture via `client:visible`)
- **Fonts:** Cormorant Garamond (headings) + DM Sans (body)
- **Smooth scroll:** Lenis
- **Deployment:** Vercel

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, practice areas, testimonials, CTA |
| `/about` | Firm mission, attorney profile, differentiators |
| `/services` | All practice areas overview |
| `/services/[slug]` | Individual practice area pages (6 total) |
| `/contact` | Contact form + firm details |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

## Architecture

```
src/
├── components/        # Astro + React components
│   ├── schema/        # JSON-LD structured data
│   └── icons/         # SVG icon map
├── content/           # Content Collections (MD)
│   ├── practice-areas/  # 6 practice areas
│   ├── attorneys/       # Attorney profiles
│   └── testimonials/    # Client testimonials
├── data/
│   └── firm.ts        # Central firm configuration
├── layouts/
│   └── BaseLayout.astro
├── pages/             # File-based routing
└── styles/
    └── global.css     # Tailwind v4 theme
```

## Commands

```sh
npm install      # Install dependencies
npm run dev      # Start dev server (localhost:4321)
npm run build    # Production build to ./dist/
npm run preview  # Preview production build
```

## Design

Minimal white aesthetic with monochrome palette. Scroll-driven reveal animations using CSS `animation-timeline: view()`. No JavaScript animation libraries - pure CSS motion.

## SEO

- JSON-LD schema: Organization, LegalService, Person, FAQ, Breadcrumb
- Open Graph + Twitter Card meta on all pages
- robots.txt with AI crawler directives
- llms.txt for AI citation optimization
- Auto-generated sitemap via @astrojs/sitemap
