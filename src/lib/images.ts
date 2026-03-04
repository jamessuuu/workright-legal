/**
 * Centralized image map for practice areas and site-wide imagery.
 * AI-generated images via NanoBanana, stored locally.
 */

export const practiceAreaImages: Record<
  string,
  { src: string; alt: string; width: number; height: number }
> = {
  "unfair-dismissal-lawyers-sydney": {
    src: "/images/generated/practice-areas/unfair-dismissal.png",
    alt: "Empty office desk with personal belongings in a cardboard box, representing unfair dismissal",
    width: 1200,
    height: 500,
  },
  "workplace-discrimination-lawyers-sydney": {
    src: "/images/generated/practice-areas/workplace-discrimination.png",
    alt: "Confident professional woman standing in a diverse modern workplace",
    width: 1200,
    height: 500,
  },
  "employment-contract-lawyers-sydney": {
    src: "/images/generated/practice-areas/employment-contracts.png",
    alt: "Hands reviewing a legal employment contract on a timber desk",
    width: 1200,
    height: 500,
  },
  "workplace-bullying-lawyers-sydney": {
    src: "/images/generated/practice-areas/workplace-bullying.png",
    alt: "Person sitting alone in a corporate corridor, contemplating next steps",
    width: 1200,
    height: 500,
  },
  "redundancy-severance-lawyers-sydney": {
    src: "/images/generated/practice-areas/redundancy-severance.png",
    alt: "Negotiation table with severance documents and notepad ready for discussion",
    width: 1200,
    height: 500,
  },
  "general-protections-lawyers-sydney": {
    src: "/images/generated/practice-areas/general-protections.png",
    alt: "Hand pressing emergency stop button, symbolising exercising workplace rights",
    width: 1200,
    height: 500,
  },
};

export const defaultImage = {
  src: "/images/generated/hero-office-wide.png",
  alt: "WorkRight Legal Sydney office",
  width: 1200,
  height: 500,
};
