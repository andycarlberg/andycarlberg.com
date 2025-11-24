import { Redis } from "@upstash/redis";
import type { APIRoute } from "astro";

// --- Configuration ---
const LIMIT = 5; // Max 5 requests
const WINDOW_IN_SECONDS = 60; // per 60 seconds (1 minute)
// ---------------------

const redis = new Redis({
	url: process.env.KV_REST_API_URL!,
	token: process.env.KV_REST_API_TOKEN!,
});

/**
 * Checks and updates the request count for a given key (IP address).
 * Returns true if the request is allowed, false if it is rate-limited.
 */
export async function isRateLimited(key: string): Promise<boolean> {
	const keyPrefix = `rate_limit:${key}`;
	const countKey = `${keyPrefix}:count`;
	const timeKey = `${keyPrefix}:time`;

	const now = Date.now();
	const windowStart = now - WINDOW_IN_SECONDS * 1000;

	// Get the current count and timestamp for the key using pipeline/multi
	// We fetch both values in one round trip for efficiency.
	const [countStr, lastRequestTimeStr] = await redis.mget<string[]>([
		countKey,
		timeKey,
	]);

	const count = countStr ? parseInt(countStr) : null;
	const lastRequestTime = lastRequestTimeStr
		? parseInt(lastRequestTimeStr)
		: null;

	let newCount = 1;

	if (count !== null && lastRequestTime !== null) {
		if (lastRequestTime > windowStart) {
			// If the last request was within the window, increment the count
			newCount = count + 1;
		}
		// If the last request was outside the window, reset count remains 1
	}

	if (newCount > LIMIT) {
		return true;
	}

	// Update the count and time in the store using a transaction (pipeline)
	const pipeline = redis.pipeline();

	// Set count and time, and set the expiration (EX) time on both keys
	pipeline.set(countKey, newCount, { ex: WINDOW_IN_SECONDS });
	pipeline.set(timeKey, now, { ex: WINDOW_IN_SECONDS });

	await pipeline.exec(); // Execute the pipeline transaction

	return false; // Request allowed
}
