// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { loadEnv } from "vite";
import vercel from "@astrojs/vercel";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

const VERCEL_ENV = env.VERCEL_ENV;
let siteUrl = "http://localhost:4321"; // Default for local development
const CUSTOM_DOMAIN = "https://www.andycarlberg.com";

if (VERCEL_ENV === "production") {
  siteUrl = CUSTOM_DOMAIN;
} else if (VERCEL_ENV === "preview") {
  siteUrl = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : siteUrl;
}

export default defineConfig({
  site: siteUrl,
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        lucide: ["mail", "menu", "moon", "notebook-pen", "rss", "sun"],
        "simple-icons": ["drupal", "github", "linkedin"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel({
    isr: {
      exclude: ["/api/contact"],
    },
  }),
  image: {
    layout: "full-width",
    loading: "lazy",
  },
});
