import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const practiceAreas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/practice-areas" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroHeading: z.string(),
    heroSubheading: z.string(),
    icon: z.string(),
    order: z.number(),
    ctaText: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    keyFacts: z.array(z.string()),
    process: z.array(
      z.object({
        step: z.number(),
        title: z.string(),
        description: z.string(),
        timeline: z.string(),
      })
    ),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
    serviceAreas: z.array(z.string()),
  }),
});

const attorneys = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/attorneys" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    title: z.string(),
    image: z.string(),
    credentials: z.array(z.string()),
    education: z.array(z.string()),
    barAdmissions: z.array(z.string()),
    philosophy: z.string(),
    yearsExperience: z.number(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    name: z.string(),
    rating: z.number(),
    practiceArea: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
});

const caseResults = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-results" }),
  schema: z.object({
    title: z.string(),
    practiceArea: z.string(),
    outcome: z.string(),
    settlementRange: z.string().optional(),
    year: z.number(),
    summary: z.string(),
    order: z.number(),
  }),
});

export const collections = { practiceAreas, attorneys, testimonials, news, caseResults };
