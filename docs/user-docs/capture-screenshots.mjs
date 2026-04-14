#!/usr/bin/env node
/**
 * Law Firm Website — Screenshot Capture (Astro)
 *
 * Connects to a running Astro dev server and captures public page screenshots
 * for inclusion in the user documentation. Uses puppeteer-core + the system
 * browser so there is no Chromium download.
 *
 * Prereqs:
 *   - Astro dev server running (npm run dev)
 *
 * Usage:
 *   node docs/user-docs/capture-screenshots.mjs
 *
 * Environment variables:
 *   BASE_URL — dev server base URL (default http://localhost:4321)
 *
 * The script auto-discovers pages by reading src/pages/ for .astro files.
 * It always captures: homepage (desktop + mobile), about, team, contact, news.
 * It also captures the first practice area page from src/content/practice-areas/.
 */

import { mkdir, readFile } from 'node:fs/promises';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.join(__dirname, 'assets', 'screenshots');

// Walk up from docs/user-docs/ to find the project root
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

const BASE = process.env.BASE_URL || 'http://localhost:4321';

function findBrowser() {
  const candidates = {
    win32: [
      'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
      'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
      'C:/Program Files/Google/Chrome/Application/chrome.exe',
    ],
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ],
    linux: ['/usr/bin/google-chrome', '/usr/bin/chromium-browser'],
  };
  const list = candidates[process.platform] || [];
  return list.find((p) => existsSync(p)) || null;
}

/**
 * Discover the first practice area slug from the project's content.
 * Reads src/data/firm.ts looking for the first slug, or falls back to
 * reading src/content/practice-areas/ filenames.
 */
function discoverFirstPracticeAreaSlug() {
  // Try reading practice area content files
  const paDir = path.join(PROJECT_ROOT, 'src', 'content', 'practice-areas');
  if (existsSync(paDir)) {
    const files = readdirSync(paDir).filter((f) => f.endsWith('.md'));
    if (files.length > 0) {
      // Read the first file and extract the slug from frontmatter
      const content = readFileSync(path.join(paDir, files[0]), 'utf8');
      const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)/);
      if (slugMatch) return slugMatch[1].trim();
    }
  }
  return null;
}

async function shot(page, filePath, opts = {}) {
  const { fullPage = true, viewport, waitFor, hydrateWait = 5000 } = opts;
  if (viewport) {
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    await new Promise((r) => setTimeout(r, 1000));
  }
  if (waitFor) {
    try {
      await page.waitForSelector(waitFor, { timeout: 15000, visible: true });
    } catch (err) {
      console.log(`  waitFor ${waitFor} timed out`);
    }
  }
  // Wait for page to stabilise (fonts, images).
  try {
    await page.waitForFunction(
      () => {
        const len = document.body?.innerText?.length || 0;
        if (!window.__prevLen) window.__prevLen = len;
        const stable = window.__prevLen === len && len > 100;
        window.__prevLen = len;
        return stable;
      },
      { polling: 500, timeout: hydrateWait }
    );
  } catch {}
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: filePath, fullPage, type: 'png' });
  const stat = await import('node:fs/promises').then((fs) => fs.stat(filePath));
  console.log(`  saved ${path.basename(filePath)} (${Math.round(stat.size / 1024)} KB)`);
}

async function tryGoto(page, url, desc) {
  console.log(`\nGoto ${url} (${desc})`);
  try {
    // Astro dev server keeps HMR websocket open, so networkidle never fires.
    // Use domcontentloaded with a generous timeout, then settle.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise((r) => setTimeout(r, 4000));
    return true;
  } catch (err) {
    console.log(`  FAILED: ${err.message}`);
    return false;
  }
}

async function capturePage(browser, url, fileName, desc, viewport) {
  const page = await browser.newPage();
  try {
    if (await tryGoto(page, url, desc)) {
      await shot(page, path.join(OUT_DIR, fileName), {
        viewport: viewport || { width: 1440, height: 900 },
      });
    }
  } finally {
    await page.close();
  }
}

async function main() {
  const browserPath = findBrowser();
  if (!browserPath) {
    console.error('No system browser found (Edge/Chrome).');
    process.exit(1);
  }
  console.log(`Browser: ${browserPath}`);
  console.log(`Base URL: ${BASE}`);
  console.log(`Project root: ${PROJECT_ROOT}`);

  await mkdir(OUT_DIR, { recursive: true });

  const puppeteer = (await import('puppeteer-core')).default;
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
    defaultViewport: { width: 1440, height: 900 },
  });

  // ---- Core pages (always captured) ------------------------------------

  // Homepage desktop
  await capturePage(browser, BASE + '/', 'live-homepage.png', 'homepage desktop',
    { width: 1440, height: 900 });

  // Homepage mobile
  await capturePage(browser, BASE + '/', 'live-homepage-mobile.png', 'homepage mobile',
    { width: 375, height: 812 });

  // ---- Auto-discover pages from src/pages/ -----------------------------
  const pagesDir = path.join(PROJECT_ROOT, 'src', 'pages');
  const standardPages = [
    { file: 'about.astro', route: '/about', name: 'live-about.png', desc: 'about page' },
    { file: 'team.astro', route: '/team', name: 'live-team.png', desc: 'team page' },
    { file: 'contact.astro', route: '/contact', name: 'live-contact.png', desc: 'contact page' },
    { file: 'faq.astro', route: '/faq', name: 'live-faq.png', desc: 'FAQ page' },
    { file: 'testimonials.astro', route: '/testimonials', name: 'live-testimonials.png', desc: 'testimonials page' },
    { file: 'case-results.astro', route: '/case-results', name: 'live-case-results.png', desc: 'case results page' },
  ];

  // Services/practice areas listing
  const servicesDir = path.join(pagesDir, 'services');
  if (existsSync(path.join(servicesDir, 'index.astro'))) {
    await capturePage(browser, BASE + '/services', 'live-services.png', 'services listing',
      { width: 1440, height: 900 });
  }

  // First practice area detail page
  const firstSlug = discoverFirstPracticeAreaSlug();
  if (firstSlug) {
    await capturePage(browser, BASE + '/services/' + firstSlug, 'live-practice-area.png',
      'practice area detail', { width: 1440, height: 900 });
  }

  // Standard pages (only if they exist in src/pages/)
  for (const p of standardPages) {
    if (existsSync(path.join(pagesDir, p.file))) {
      await capturePage(browser, BASE + p.route, p.name, p.desc,
        { width: 1440, height: 900 });
    }
  }

  // News listing
  const newsDir = path.join(pagesDir, 'news');
  if (existsSync(path.join(newsDir, 'index.astro'))) {
    await capturePage(browser, BASE + '/news', 'live-news.png', 'news listing',
      { width: 1440, height: 900 });
  }

  await browser.close();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('\nFATAL:', err.stack || err.message);
  process.exit(1);
});
