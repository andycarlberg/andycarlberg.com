// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import icon from "astro-icon";
import rehypeKatex from "rehype-katex";
import rehypeWrapAll from "rehype-wrap-all";
import remarkMath from "remark-math";
import { loadEnv } from "vite";

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
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeWrapAll,
          {
            selector: "span.katex-display",
            wrapper: "div.w-full.overflow-x-auto",
          },
        ],
      ],
    }),
    sitemap(),
    icon({
      include: {
        lucide: [
          "activity",
          "arrow-left",
          "arrow-right",
          "award",
          "book-open",
          "box",
          "chart-spline",
          "check",
          "chevron-right",
          "clock",
          "code-2",
          "component",
          "dices",
          "filter",
          "gavel",
          "gauge",
          "heart-pulse",
          "home",
          "iteration-ccw",
          "layers",
          "lightbulb",
          "mail",
          "map",
          "map-pin-off",
          "menu",
          "moon",
          "network",
          "route",
          "rss",
          "search",
          "search-x",
          "server",
          "shield-alert",
          "shield-check",
          "sparkles",
          "sun",
          "tags",
          "timer",
          "trending-up",
          "users",
          "utensils",
          "x",
          "zap",
        ],
        "simple-icons": ["*"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel({
    isr: {
      exclude: ["/api/contact", "/.well-known/webfinger", "/contact"],
    },
  }),
  image: {
    layout: "full-width",
    loading: "lazy",
  },
  security: {
    checkOrigin: false,
  },
  env: {
    schema: {
      MAILJET_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      MAILJET_SECRET_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
      FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
      VERCEL_ENV: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
    },
  },
});
