import type { APIRoute, GetStaticPaths } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

// Load font files at module level for reuse
const fontDir = path.resolve("node_modules/@fontsource/dm-sans/files");
const dmSansRegular = fs.readFileSync(
  path.join(fontDir, "dm-sans-latin-400-normal.woff")
);
const dmSansBold = fs.readFileSync(
  path.join(fontDir, "dm-sans-latin-700-normal.woff")
);

interface OGPageData {
  title: string;
  description?: string;
  type: "home" | "practice" | "news" | "attorney" | "default";
  date?: string;
  author?: string;
}

// Define all pages that get OG images
const pages: Record<string, OGPageData> = {
  index: {
    title: "WorkRight Legal",
    description: "Fighting for workers' rights across Greater Sydney",
    type: "home",
  },
  about: {
    title: "About Us",
    description: "Sydney employment lawyers with 15+ years of experience",
    type: "default",
  },
  contact: {
    title: "Contact Us",
    description: "Free consultation with Sydney employment lawyers",
    type: "default",
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Common questions about employment law in Australia",
    type: "default",
  },
  team: {
    title: "Our Team",
    description: "Meet the employment law specialists at WorkRight Legal",
    type: "default",
  },
  services: {
    title: "Our Services",
    description: "Employment law services across Greater Sydney",
    type: "default",
  },
  testimonials: {
    title: "Client Testimonials",
    description: "What our clients say about WorkRight Legal",
    type: "default",
  },
  news: {
    title: "News & Updates",
    description: "Employment law news and updates from WorkRight Legal",
    type: "default",
  },
  // Practice areas
  "services/unfair-dismissal-lawyers-sydney": {
    title: "Unfair Dismissal Lawyers",
    description:
      "Fight unfair dismissal with top-rated Sydney employment lawyers",
    type: "practice",
  },
  "services/workplace-discrimination-lawyers-sydney": {
    title: "Workplace Discrimination Lawyers",
    description: "Experienced discrimination lawyers in Sydney",
    type: "practice",
  },
  "services/employment-contract-lawyers-sydney": {
    title: "Employment Contract Lawyers",
    description: "Expert contract review, negotiation, and drafting",
    type: "practice",
  },
  "services/workplace-bullying-lawyers-sydney": {
    title: "Workplace Bullying Lawyers",
    description: "Stop workplace bullying and harassment",
    type: "practice",
  },
  "services/redundancy-severance-lawyers-sydney": {
    title: "Redundancy & Severance Lawyers",
    description: "Get the redundancy payout you are entitled to",
    type: "practice",
  },
  "services/general-protections-lawyers-sydney": {
    title: "General Protections Lawyers",
    description: "Uncapped compensation for workplace rights violations",
    type: "practice",
  },
  // Attorney
  "team/sarah-mitchell": {
    title: "Sarah Mitchell",
    description: "Principal Lawyer",
    type: "attorney",
  },
};

export const getStaticPaths: GetStaticPaths = async () => {
  return Object.keys(pages).map((slug) => ({
    params: { slug: slug === "index" ? undefined : slug },
  }));
};

// Color palette (Slate & Terra inspired, warm stone accent)
const colors = {
  bg: "#1a1a1a",
  text: "#f5f0eb",
  accent: "#c4956a",
  muted: "#8a8a8a",
  accentBar: "#c4956a",
};

function getLayout(data: OGPageData) {
  const { title, description, type, date, author } = data;

  // Shared base container
  const container = {
    display: "flex" as const,
    flexDirection: "column" as const,
    width: "100%",
    height: "100%",
    backgroundColor: colors.bg,
    padding: "60px 80px",
    justifyContent: "space-between" as const,
  };

  const topLabel =
    type === "practice"
      ? "Employment Law"
      : type === "news"
        ? "News & Updates"
        : type === "attorney"
          ? "Our Team"
          : null;

  return {
    type: "div",
    props: {
      style: container,
      children: [
        // Top section
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: "16px" },
            children: [
              // Label
              topLabel
                ? {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      },
                      children: [
                        {
                          type: "div",
                          props: {
                            style: {
                              width: "32px",
                              height: "2px",
                              backgroundColor: colors.accent,
                            },
                          },
                        },
                        {
                          type: "span",
                          props: {
                            style: {
                              color: colors.accent,
                              fontSize: "18px",
                              fontWeight: 400,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase" as const,
                            },
                            children: topLabel,
                          },
                        },
                      ],
                    },
                  }
                : null,
              // Title
              {
                type: "div",
                props: {
                  style: {
                    color: colors.text,
                    fontSize: type === "home" ? "72px" : "56px",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    maxWidth: "900px",
                  },
                  children: title,
                },
              },
              // Description
              description
                ? {
                    type: "div",
                    props: {
                      style: {
                        color: colors.muted,
                        fontSize: "24px",
                        lineHeight: 1.4,
                        maxWidth: "700px",
                        marginTop: "8px",
                      },
                      children: description,
                    },
                  }
                : null,
              // Date/Author for news
              date || author
                ? {
                    type: "div",
                    props: {
                      style: {
                        color: colors.muted,
                        fontSize: "18px",
                        marginTop: "8px",
                      },
                      children: [date, author].filter(Boolean).join(" - "),
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        // Bottom bar: firm name + accent line
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: "20px" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "100%",
                    height: "3px",
                    backgroundColor: colors.accentBar,
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: {
                          color: colors.text,
                          fontSize: "24px",
                          fontWeight: 700,
                          letterSpacing: "-0.01em",
                        },
                        children: "WorkRight Legal",
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          color: colors.muted,
                          fontSize: "18px",
                        },
                        children: "Sydney Employment Lawyers",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug || "index";
  const data = pages[slug];

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  const layout = getLayout(data);

  const svg = await satori(layout as any, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "DM Sans",
        data: dmSansRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "DM Sans",
        data: dmSansBold,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
