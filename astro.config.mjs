// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
  site: "https://workrightlegal.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/privacy-policy") &&
        !page.includes("/terms-of-service") &&
        !page.includes("/404") &&
        !page.includes("/og/"),
    }),
  ],
  prefetch: {
    prefetchAll: true,
  },
  image: {
    domains: ["images.unsplash.com"],
  },
  compressHTML: true,
});
