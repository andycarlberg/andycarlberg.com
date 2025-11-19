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

if (VERCEL_ENV === "production") {
  // Production environment
  siteUrl = env.PUBLIC_VERCEL_URL
    ? `https://${env.PUBLIC_VERCEL_URL}`
    : "https://www.andycarlberg.com";
} else if (VERCEL_ENV === "preview") {
  // Vercel Preview environment
  siteUrl = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : siteUrl;
}

export default defineConfig({
  site: siteUrl,
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        lucide: ["sun", "moon", "mail", "notebook-pen"],
        "simple-icons": ["github", "linkedin"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel({
    edge: false,
    analytics: true,
  }),
});
