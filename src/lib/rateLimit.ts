import { createClient } from "@vercel/kv";
import type { APIRoute } from "astro";

// --- Configuration ---
const LIMIT = 5; // Max 5 requests
const WINDOW_IN_SECONDS = 60; // per 60 seconds (1 minute)
// ---------------------

// Initialize KV client (it auto-uses Vercel environment variables)
const kv = createClient({
	url: process.env.KV_REST_API_URL,
	token: process.env.KV_REST_API_TOKEN,
});

/**
 * Checks and updates the request count for a given key (IP address).
 * Returns true if the request is allowed, false if it is rate-limited.
 */
export async function isRateLimited(key: string): Promise<boolean> {
	const keyPrefix = `rate_limit:${key}`;
	const now = Date.now();
	const windowStart = now - WINDOW_IN_SECONDS * 1000;

	// 1. Get the current count and timestamp for the key
	// We use a multi-key fetch (pipeline) for efficiency
	const [count, lastRequestTime] = (await kv.mget([
		`${keyPrefix}:count`,
		`${keyPrefix}:time`,
	])) as [number | null, number | null];

	let newCount = 1;

	if (count !== null && lastRequestTime !== null) {
		if (lastRequestTime > windowStart) {
			// If the last request was within the window, increment the count
			newCount = count + 1;
		}
		// If the last request was outside the window, reset count to 1
	}

	if (newCount > LIMIT) {
		// Limit exceeded
		return true;
	}

	// 2. Update the count and time in the store (using a pipeline for atomicity)
	const pipeline = kv.pipeline();
	pipeline.set(`${keyPrefix}:count`, newCount, { ex: WINDOW_IN_SECONDS }); // Set expiration time
	pipeline.set(`${keyPrefix}:time`, now, { ex: WINDOW_IN_SECONDS });
	await pipeline.exec();

	return false; // Request allowed
}
