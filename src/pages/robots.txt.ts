import type { APIRoute } from "astro";

const PREVIEW_ROBOTS_TXT = `
User-agent: *
Disallow: /
`;

const PRODUCTION_ROBOTS_TXT = (sitemapUrl: string) => `
User-agent: *
Allow: /

# Exclude common resource directories from being explicitly crawled, 
# as search engines usually handle these implicitly.
Disallow: /assets/
Disallow: /images/
Disallow: /styles/

# Disallow the contact form API route
Disallow: /api/contact/

Sitemap: ${sitemapUrl}
`;

export const GET: APIRoute = async ({ url }) => {
  const isPreview = process.env.VERCEL_ENV !== "production";
  const sitemapUrl = new URL("sitemap-index.xml", url).href;

  const content = isPreview
    ? PREVIEW_ROBOTS_TXT.trim()
    : PRODUCTION_ROBOTS_TXT(sitemapUrl).trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
