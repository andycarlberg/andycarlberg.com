/**
 * Generates the full canonical URL using the production site URL,
 * regardless of the current deployment environment (preview or production).
 * @param permalink The page path (e.g., '/blog/post-name').
 * @returns The full canonical URL (e.g., 'https://yoursite.com/blog/post-name').
 */
export function getCanonicalUrl(permalink: string): string {
	// VERCEL_ENV is 'production' on the main branch, otherwise 'preview' or 'development'.
	const isPreview = process.env.VERCEL_ENV !== "production";

	// In a Vercel environment, Astro.site in astro.config.mjs reliably holds
	// the PRODUCTION domain. We use it directly here.
	const productionSite = import.meta.env.SITE;

	if (!productionSite) {
		// Fallback for local development or if site property is missing
		console.warn(
			"Astro site property is missing. Canonical URL may be inaccurate.",
		);
		return new URL(permalink, "http://localhost:4321").href;
	}

	// Ensure the permalink starts with a slash
	const path = permalink.startsWith("/") ? permalink : `/${permalink}`;

	// Construct the URL using the production domain
	return new URL(path, productionSite).href;
}
