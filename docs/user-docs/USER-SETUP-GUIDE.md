---
title: "WorkRight Legal — Website Setup Guide"
subtitle: "A step-by-step guide for preparing, installing, running, and handing over the WorkRight Legal website"
version: "2.0 (Enhanced draft)"
date: "2026-04-13"
audience: "WorkRight Legal internal team, content editors, and handover developers"
eyebrow: "User setup guide"
brandName: "Lift Legal Marketing"
footerLine: "Lift Legal Marketing  —  WorkRight Legal Website Setup Guide"
---

# WorkRight Legal — Website Setup Guide

## Before you read anything else

This guide walks through everything needed to prepare, install, and launch a law firm website built with the lawfirm-builder stack. The WorkRight Legal project at `https://github.com/jamessuuu/workright-legal` is the reference. Every command, path, and file in this guide matches that project.

This guide is written for people who are not developers. If you can follow a recipe, you can follow this guide. By the end of it you will know:

- What information and files to gather before we touch any code
- What the tool is and why we chose each piece
- How to install everything on a new computer
- What happens during the build and what to expect at every step
- How to edit content without a CMS admin panel
- How to deploy the site to the public internet
- Who to ask when something breaks

> NOTE: The lawfirm-builder stack is deliberately simpler than the Lift Legal Marketing stack. There is no CMS admin panel, no database, and no custom API. Content lives in Markdown files that the team edits with VS Code or the GitHub web editor. If the project needs a full admin panel, use the Lift Legal stack instead.

### Document conventions

- Numbered steps `(1) (2) (3)` are meant to be followed in order.
- `Monospace text` means something you type or copy into a terminal.
- A box with a lightning bolt means a tip that is nice to know.
- A box with a warning triangle means something that can break the site if you skip it.
- A box with a red stop sign means something that can lose work or money if you do it wrong.

---

## Part 1: What you need to prepare

The quality of the finished website depends on what goes in at the start. Gather everything below before you begin.

### 1.1 Brand and design assets

| Item | Why we need it | Preferred format |
|---|---|---|
| Primary logo | Header, footer, favicon, share images | SVG (preferred) or PNG at 1000 px minimum |
| Reversed logo | Dark hero sections | SVG or transparent PNG |
| Favicon | Browser tab icon | Square PNG at 512 x 512 or SVG |
| Brand colour palette | The whole site | HEX values for primary, secondary, accent, text, background |
| Typography | Headings and body | Google Font name or a licensed font file |
| Social share image | Link previews | PNG at 1200 x 630 |
| Photography reference | Imagery direction | A note plus 2-5 reference images |

WorkRight Legal uses the "Midnight Sage" palette:

- Primary deep sage green: `#2D4A3E`
- Accent warm copper: `#C17F59`
- Headings: Cormorant Garamond serif
- Body text: DM Sans

### 1.2 Firm information

| Field | Example |
|---|---|
| Legal business name | WorkRight Legal Pty Ltd |
| Trading name | WorkRight Legal |
| Registered address | Level 12, 123 Pitt Street, Sydney NSW 2000 |
| Main phone number | (02) 9555 1234 |
| Secondary phone | 1300 123 456 |
| General enquiries email | hello@workrightlegal.com.au |
| Social media URLs | LinkedIn, Facebook |
| Business hours | Monday to Friday, 9:00 am to 5:30 pm |
| Year founded | 2009 |
| Service area | Greater Sydney, 100 km from Sydney CBD |
| Practice areas | List of 3 to 10 focus areas |
| Attorney bar numbers | One per attorney |

### 1.3 Attorney profiles

For every attorney on the site:

- Full name
- Position or title (e.g. Principal Solicitor, Senior Associate)
- Credentials (e.g. LLB (Hons), GDLP)
- Education (university and year)
- Bar admissions (jurisdictions and dates)
- Years of experience
- Philosophy statement (one or two sentences about their approach)
- Professional headshot (square, 800 x 800 minimum, plain or transparent background)

### 1.4 Practice areas

For every practice area:

- Title and slug
- Short description (one sentence)
- Long description (150 to 300 words)
- Hero heading and subheading
- Key facts (3 to 5 bullet points)
- Process steps with timelines (e.g. "Initial consultation — 30 minutes — free")
- FAQs (5 to 8 questions with 60 to 130 word answers)
- Service area cities

### 1.5 Case results

For every case result the firm wants to display:

- Case title or reference
- Practice area it fits into
- Outcome summary
- Settlement range (if disclosable)
- Year resolved
- Longer description with context, strategy, and result

> WARNING: Every case result must be cleared by the firm's compliance officer before publication. Some jurisdictions ban specific dollar amounts in advertising.

### 1.6 Testimonials

For every client testimonial:

- Client first name (never full name without explicit consent)
- Rating out of 5
- Which practice area the testimonial is about

The quote itself lives in the Markdown body of the file, not the frontmatter.

### 1.7 News and insights

For every blog or news article:

- Title and slug
- Author (must be one of the attorneys)
- Publication date
- Category
- Featured image (1600 x 900)
- Body copy in Markdown

### 1.8 Legal and compliance

- Privacy policy
- Terms of service
- Attorney advertising disclaimers
- Bar-mandated disclosure statements

### 1.9 Technical accounts

| Account | Purpose |
|---|---|
| Domain registrar | Point the domain at Vercel or Cloudflare |
| GitHub | Source code hosting |
| Vercel | Hosting the static site |
| Google Analytics or Plausible | Analytics |

### 1.10 Preparation checklist

- [ ] Primary logo (SVG)
- [ ] Reversed logo
- [ ] Favicon
- [ ] Brand palette (HEX)
- [ ] Typography
- [ ] Firm information
- [ ] Attorney profiles and headshots
- [ ] Practice areas with FAQs
- [ ] Case results cleared by compliance
- [ ] Testimonials with consent
- [ ] News articles (if any)
- [ ] Privacy policy and terms of service
- [ ] Account credentials

---

## Part 2: What the tool is and why each piece is there

The lawfirm-builder stack uses these pieces:

| Piece | What it does | Why we chose it |
|---|---|---|
| Astro 5 | Static site generator with islands | Ships zero client JavaScript by default, fastest for SEO |
| Tailwind CSS v4 | Utility-first styling | CSS-first mode, OKLCH colours, no runtime |
| React 19 | Interactive islands | For anything that needs client-side state (nav, forms) |
| Cormorant Garamond + DM Sans | Typography | Editorial feel, distinctly non-AI |
| GSAP | Animations | Smooth professional motion, not bouncy |
| Lenis | Smooth scroll | Polished scrolling experience |
| Satori | OG image generation | Server-rendered social cards at build time |
| Vercel | Hosting | One-click deploys, analytics, speed insights built-in |
| Astro Content Collections | Content store | Markdown files in `src/content/`, typed schemas, no database |

### 2.1 The live reference

![Figure: The WorkRight Legal homepage captured from the development server at 1440 pixels wide.](./assets/screenshots/live-homepage.png)

![Figure: The same homepage at a 375 pixel mobile viewport.](./assets/screenshots/live-homepage-mobile.png)

### 2.2 Why no CMS?

A small law firm site has the same 20 or 30 pages for years at a time. A CMS adds complexity for little benefit when:

- The firm edits content once a month or less
- Only one or two people edit the site
- The team is comfortable opening a file in VS Code or using GitHub's web editor

If the firm will publish weekly or has more than three editors, pick the Lift Legal Marketing stack instead.

---

## Part 3: Dependencies and system requirements

### 3.1 Your computer

| Requirement | Minimum | Recommended |
|---|---|---|
| Operating system | Windows 10, macOS 12, Ubuntu 22.04 | Latest stable |
| RAM | 4 GB | 8 GB or more |
| Disk space | 2 GB free | 10 GB free |
| Internet | Broadband | Fibre or fast 4G |

The Astro stack is much lighter than Next.js + Payload. An 8 GB laptop is plenty.

### 3.2 Software to install

(1) **Node.js 20 or newer.** Download from nodejs.org, pick the LTS version.

(2) **Git.** Preinstalled on macOS and Linux. On Windows, install from git-scm.com.

(3) **Visual Studio Code.** This is how the team edits content. Download from code.visualstudio.com.

(4) **A GitHub account.** Required for pushing changes and deploying. Sign up at github.com.

You do NOT need:

- PostgreSQL (no database)
- pnpm (npm works fine)
- Docker (no containers)
- A CMS login (there is no CMS)

---

## Part 4: Installing and setting up the site

### 4.1 Step 1 — Get the code

(1) Open a terminal.
(2) Change to the folder where you want the project:
   ```
   cd C:\Users\yourname\Projects
   ```
(3) Clone the repository:
   ```
   git clone https://github.com/jamessuuu/workright-legal.git
   cd workright-legal
   ```
(4) If Git asks for credentials, enter them or connect GitHub Desktop.

### 4.2 Step 2 — Install dependencies

```
npm install
```

On a fast connection this takes about 60 to 90 seconds. The Astro stack is much lighter than a Next.js monorepo. You will see warnings about deprecated transitive dependencies; these are safe to ignore.

### 4.3 Step 3 — Start the dev server

```
npm run dev
```

You will see output like this:

```
astro  v5.17.1 ready in 312 ms
┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

Open `http://localhost:4321` in your browser.

> TIP: Unlike most web frameworks, Astro runs on port 4321, not 3000. If port 4321 is already taken, the dev server will pick the next available one.

### 4.4 Step 4 — Check the pages

Click through every menu item on the public site. You should see:

- Homepage with hero section and practice area cards
- About page with firm story
- Team page with attorney profiles, plus individual attorney detail pages
- Each of the six practice area pages under `/services/`
- Location-specific service pages (e.g. `/services/unfair-dismissal-lawyers-sydney/parramatta`)
- News listing and individual news articles
- Case results page
- Testimonials page
- FAQ page
- Check My Case page (interactive case assessment)
- Contact page with form
- Privacy policy and terms of service

If a page is missing or crashes, check the dev server terminal for error messages.

### 4.5 Step 5 — Build once to verify production

```
npm run build
```

This runs for about 10 to 15 seconds and produces a `dist/` folder with the final static HTML. You can serve it locally with:

```
npm run preview
```

The preview URL is typically `http://localhost:4321` as well (Astro uses the same port).

---

## Part 5: What to expect during and after the setup

### 5.1 During `npm install`

- Downloads about 200 MB of dependencies.
- Takes 60 to 120 seconds.
- Warnings are normal.

### 5.2 During `npm run dev`

- First compile takes under 1 second.
- Subsequent reloads are instant.
- Markdown changes reload instantly.

### 5.3 During `npm run build`

- Takes 10 to 15 seconds.
- Produces `dist/` with one HTML file per route.
- Generates OG images dynamically via satori.
- Optimises all images.
- Generates the sitemap.xml and robots.txt.

### 5.4 After setup

You will have:

- A working static site with the WorkRight Legal starter content
- Six practice area pages (under `/services/`)
- Location-specific service pages for each practice area and suburb
- Three attorney profiles (team page plus individual detail pages)
- Six news articles
- Five case results
- Six testimonials
- FAQ page
- Check My Case interactive assessment
- Full JSON-LD schema (LegalService, Person, FAQPage, BreadcrumbList)
- Complete SEO (meta tags, OG tags, llms.txt, robots.txt)
- Automatic sitemap generation
- OG image generation via Satori
- Zero client-side JavaScript on most pages

---

## Part 6: Editing content

This is the biggest difference from the Lift Legal stack. Content lives in Markdown files, not a database.

### 6.1 The content folder

All editable content is under `src/content/`. Each subfolder is a collection:

```
src/content/
├── practice-areas/        # One MD file per practice area
├── attorneys/             # One MD file per attorney
├── news/                  # One MD file per blog article
├── case-results/          # One MD file per case
└── testimonials/          # One MD file per testimonial
```

### 6.2 Editing an existing page

(1) Open VS Code.
(2) Open the project folder.
(3) Use `Ctrl` + `P` to jump to a file, e.g. type `unfair-dismissal` to open the unfair dismissal practice area.
(4) Edit the Markdown body.
(5) Save with `Ctrl` + `S`.
(6) The dev server reloads automatically. Your change appears in the browser within 500 ms.

### 6.3 The frontmatter

The top of every Markdown file has a YAML frontmatter block enclosed in `---` lines. This is where every field lives.

Example from `src/content/practice-areas/unfair-dismissal.md`:

```yaml
---
title: "Unfair Dismissal"
slug: "unfair-dismissal-lawyers-sydney"
description: "Fight unfair dismissal with Sydney's top-rated employment lawyers."
metaTitle: "Unfair Dismissal Lawyers Sydney | Free Case Assessment | WorkRight Legal"
metaDescription: "Sydney's specialist unfair dismissal lawyers. 95% success rate..."
heroHeading: "Dismissed unfairly? You have 21 days to act."
heroSubheading: "We can help you fight back and get the compensation you deserve."
order: 1
icon: "⚖️"
ctaText: "Time Is Running Out - Only 21 Days to Act"
stats:
  - value: "95%"
    label: "Success Rate"
keyFacts:
  - "21-day strict deadline from dismissal date to lodge a claim"
  - "Free case assessment within 24 hours"
process:
  - step: 1
    title: "Free Case Assessment"
    description: "30 minute free consultation to review your case"
    timeline: "Within 24 hours"
faqs:
  - question: "What counts as unfair dismissal?"
    answer: "Unfair dismissal occurs when..."
---

# Body content in Markdown goes here
```

> NOTE: Practice area slugs use SEO-optimised format (e.g. `unfair-dismissal-lawyers-sydney`, not just `unfair-dismissal`). Pages are served at `/services/[slug]` (not `/practice-areas/`).

### 6.4 Adding a new practice area

(1) In VS Code, right-click the `src/content/practice-areas/` folder and pick **New File**.
(2) Name it `redundancy-disputes.md` (lowercase, hyphens, no spaces).
(3) Paste the frontmatter template from an existing file.
(4) Fill in every field.
(5) Save.
(6) Refresh the browser. The new page appears automatically at `/services/redundancy-disputes-lawyers-sydney` (matching the slug in frontmatter).

### 6.5 Adding a new attorney

(1) Put the headshot in `src/assets/attorneys/` or `public/images/generated/attorneys/`.
(2) Create a new file `src/content/attorneys/first-last.md`.
(3) Fill in the frontmatter.
(4) Save.
(5) The new profile appears automatically on the About page.

### 6.6 Editing firm-wide information

The firm's phone number, address, email, and social links live in one file: `src/data/firm.ts`. This file also contains the `practiceAreasList` array with short descriptions and URL slugs for each practice area.

Location data for suburb-specific landing pages lives in a separate file: `src/data/locations.ts`. Each location has a name, slug, postcode, region, description, and distance from CBD.

Open the relevant file in VS Code, change the value you need, save. Every page that uses that value updates automatically.

> WARNING: Do not duplicate firm information across multiple files. Always update `src/data/firm.ts` for firm details and `src/data/locations.ts` for location data. These are the single sources of truth.

### 6.7 Images

Place new images under `src/assets/` (optimised automatically) or `public/` (used as-is).

Reference them in Markdown like this:

```
![Alt text describing the image](../../assets/path-to-image.jpg)
```

Always include alt text. It is required for accessibility and helps with SEO.

### 6.8 Editing via the GitHub web editor

If you do not have VS Code installed, or you are editing from a computer that isn't yours:

(1) Go to the repository on github.com.
(2) Navigate to the file you want to edit.
(3) Click the pencil icon.
(4) Make your changes.
(5) Scroll to the bottom, add a short description of what you changed.
(6) Click **Commit directly to the main branch** (or **Create a pull request** if you want someone to review first).

GitHub saves the change. Vercel rebuilds the site within two minutes. Your change is live.

---

## Part 7: Deploying the site

### 7.1 First-time deployment to Vercel

(1) Sign up at vercel.com with your GitHub account.
(2) Click **Add New Project**.
(3) Pick the repository from the list.
(4) Vercel auto-detects that it is an Astro project. Leave all defaults.
(5) Click **Deploy**.
(6) Within 90 seconds you have a live URL like `https://workrightlegal.vercel.app`.

### 7.2 Subsequent deployments

After the first deploy, Vercel watches the GitHub repository. Every push to `main` triggers a new production deployment. Every pull request gets a preview deployment with its own URL.

### 7.3 Connecting a custom domain

(1) Open the Vercel dashboard for your project.
(2) Go to **Settings** → **Domains**.
(3) Click **Add** and type the domain you own.
(4) Vercel shows you the DNS records to add at your registrar.
(5) Add those records at the registrar.
(6) Wait up to 24 hours for DNS propagation.
(7) Vercel automatically issues an SSL certificate.

### 7.4 Rolling back

If a deployment breaks the site:

(1) Open the Vercel dashboard.
(2) Go to **Deployments**.
(3) Find the last known good deployment.
(4) Click the three-dot menu on it.
(5) Pick **Promote to Production**.
(6) The rollback takes about 10 seconds.

---

## Part 8: Accessibility and device access

Every page meets WCAG 2.2 AA:

- Text contrast ratio at least 4.5 to 1
- Skip-to-main-content link on every page
- Keyboard navigation works throughout
- All images have alt text
- Heading hierarchy is respected
- Forms have labels and error messages
- No animation for users with `prefers-reduced-motion`

Device support:

| Device | Support |
|---|---|
| Desktop browsers (Windows, macOS, Linux) | Full |
| iPad portrait and landscape | Full |
| iPhone and Android phones | Full, mobile-first design |
| Screen readers (VoiceOver, NVDA, JAWS) | Full |
| Chromebook | Full |

---

## Part 9: Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `npm install` fails with EACCES | Permissions | Delete `node_modules` and retry |
| `npm run dev` says port in use | Another process on 4321 | Close it, or Astro picks next port automatically |
| Site looks unstyled | Tailwind did not build | Restart dev server |
| Markdown change not appearing | Dev server stale | Refresh browser with `Ctrl` + `Shift` + `R` |
| Build fails with "frontmatter validation" | Missing required field | Read the error, add the field |
| Image not showing | Wrong path | Check the relative path in the Markdown |
| Deployment fails on Vercel | Build error in CI | Open the Vercel logs and fix the error |
| Custom domain not working | DNS not propagated | Wait up to 24 hours, check `dnschecker.org` |
| "Module not found" in the terminal | Missing dependency | Run `npm install` again |

---

## Part 10: Glossary

- **Astro** — The static site framework we use.
- **Astro Content Collection** — A folder of Markdown files that Astro treats as a typed dataset.
- **Build** — The process of turning source files into the final `dist/` folder.
- **Content Collection Schema** — A TypeScript definition in `src/content.config.ts` that says what fields every Markdown file in a collection must have.
- **Frontmatter** — The YAML block at the top of a Markdown file, between the `---` lines.
- **Island** — A small interactive React component inside an otherwise static Astro page.
- **Markdown** — A plain text format with simple styling (bold, italic, lists, links).
- **OG image** — A picture that shows up when a link is shared on social media.
- **Satori** — The library we use to generate OG images at build time.
- **Static site** — A site made up of pre-built HTML files with no database at runtime.
- **Vercel** — The hosting platform we use.
- **VS Code** — Visual Studio Code, the free editor most of the team uses.
- **WCAG** — Web Content Accessibility Guidelines. We meet version 2.2 AA.
- **Zero-JS pages** — Pages that load no JavaScript at all in the browser. The default in Astro.

---

## Part 11: Frequently asked questions

**Q: Can I use this stack for a firm that publishes weekly?**
A: Yes, but the editing experience is less friendly than a CMS. For weekly publishing, consider upgrading to the Lift Legal Marketing stack with Payload CMS.

**Q: Can the client edit content without a developer?**
A: If the client is comfortable with VS Code or GitHub's web editor, yes. If they are not, train them or pick a stack with a CMS.

**Q: How many pages can the site support?**
A: Thousands. Each page is a static HTML file, so there is no runtime bottleneck.

**Q: What about forms?**
A: Simple contact forms are handled by Vercel serverless functions. For complex forms or CRM integration, switch to the Lift Legal stack.

**Q: What about search on the site?**
A: Client-side search via Pagefind is optional. It adds a small amount of client JavaScript but stays under 20 KB.

**Q: Can the team work offline?**
A: Yes. Once dependencies are installed, the dev server and editing workflow work fully offline.

**Q: Can I have multiple languages?**
A: Astro supports i18n out of the box. Add a locale folder, translate each Markdown file, and the build will produce localised URLs.

**Q: Who owns the code?**
A: The client, once the project is handed over.

---

## Part 12: Quick reference

### 12.1 Commands

```
npm install          Install dependencies
npm run dev          Start the dev server on http://localhost:4321
npm run build        Build for production (produces dist/)
npm run preview      Serve the production build locally
```

### 12.2 File locations

| What | Where |
|---|---|
| Firm-wide info | `src/data/firm.ts` |
| Location data | `src/data/locations.ts` |
| Practice areas | `src/content/practice-areas/*.md` |
| Attorneys | `src/content/attorneys/*.md` |
| News articles | `src/content/news/*.md` |
| Case results | `src/content/case-results/*.md` |
| Testimonials | `src/content/testimonials/*.md` |
| Content schema | `src/content.config.ts` |
| Pages | `src/pages/*.astro` |
| Components | `src/components/*.astro` or `*.tsx` |
| Styles | `src/styles/global.css` |
| Images | `src/assets/` or `public/` |

### 12.3 Who to contact

| Problem | Person |
|---|---|
| Can't install | James |
| Content question | Firm's content lead |
| Brand question | Brian |
| Legal question | Firm's compliance officer |
| Deployment broken | James |

---

## Part 13: When you are stuck

(1) Search this guide with `Ctrl` + `F`.
(2) Check `docs/project_notes/` for known issues.
(3) Post in the team channel with a screenshot and the error message.
(4) Tag James directly if the production site is down.

---

*This document is version 1.0 (First enhanced draft), dated 2026-04-12. The Content Editor Guide is the companion document and should be read next by anyone who will edit content.*
