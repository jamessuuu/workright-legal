/**
 * Centralized image map for practice areas and site-wide imagery.
 * Replaces scattered Unsplash URLs with a single source of truth.
 */

export const practiceAreaImages: Record<
  string,
  { src: string; alt: string; width: number; height: number }
> = {
  "unfair-dismissal-lawyers-sydney": {
    src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=500&fit=crop&q=80",
    alt: "Professional workspace representing unfair dismissal legal services in Sydney",
    width: 1200,
    height: 500,
  },
  "workplace-discrimination-lawyers-sydney": {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=500&fit=crop&q=80",
    alt: "Diverse workplace setting representing discrimination law services",
    width: 1200,
    height: 500,
  },
  "employment-contract-lawyers-sydney": {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=500&fit=crop&q=80",
    alt: "Contract review setting for employment contract legal services",
    width: 1200,
    height: 500,
  },
  "workplace-bullying-lawyers-sydney": {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=500&fit=crop&q=80",
    alt: "Supportive workplace environment for bullying law services",
    width: 1200,
    height: 500,
  },
  "redundancy-severance-lawyers-sydney": {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=500&fit=crop&q=80",
    alt: "Professional consultation for redundancy and severance legal advice",
    width: 1200,
    height: 500,
  },
  "general-protections-lawyers-sydney": {
    src: "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=1200&h=500&fit=crop&q=80",
    alt: "Worker rights protection representing general protections law services",
    width: 1200,
    height: 500,
  },
};

export const defaultImage = {
  src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop&q=80",
  alt: "WorkRight Legal Sydney office",
  width: 1200,
  height: 500,
};
