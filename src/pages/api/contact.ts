import type { APIRoute } from "astro";
import { isRateLimited } from "../../lib/rateLimit";

// Ensure this runs on the server (Vercel Function)
export const prerender = false;

// --- Environment Variables ---
const API_KEY = import.meta.env.MAILJET_API_KEY;
const SECRET_KEY = import.meta.env.MAILJET_SECRET_KEY;
const TO_EMAIL = import.meta.env.TO_EMAIL;
const FROM_EMAIL = import.meta.env.FROM_EMAIL;

// Create the Basic Auth header value (API_KEY:SECRET_KEY base64 encoded)
const AUTH_HEADER = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString("base64");

export const POST: APIRoute = async ({ request }) => {
	// 1. RATE LIMIT CHECK (First line of defense)
	const ipAddress = request.headers.get("x-forwarded-for") || "unknown";

	const limited = await isRateLimited(ipAddress);
	if (limited) {
		// Send a 429 response if the rate limit is exceeded
		return new Response(
			JSON.stringify({
				message: "Rate limit exceeded. Try again in a minute.",
			}),
			{
				status: 429, // 429 Too Many Requests
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}

	try {
		const data = await request.formData();
		const name = data.get("name") as string;
		const email = data.get("email") as string;
		const message = data.get("message") as string;

		// Catch simple bots with the honeypot field
		if (data.get("_gotcha")) {
			return new Response(null, { status: 403 });
		}

		// 2. Simple Validation (Existing Logic)
		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({
					message: "Missing required fields (name, email, or message).",
				}),
				{ status: 400 },
			);
		}

		// 3. Prepare the Mailjet Payload (Existing Logic)
		const mailjetPayload = {
			Messages: [
				{
					From: {
						Email: FROM_EMAIL,
						Name: "Andycarlberg.com Contact Form",
					},
					To: [
						{
							Email: TO_EMAIL,
							Name: "Andy Carlberg",
						},
					],
					Subject: `New Contact from Portfolio: ${name}`,
					TextPart: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
					HTMLPart: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
					Headers: {
						"Reply-To": email,
					},
				},
			],
		};

		// 4. Call the Mailjet API (Existing Logic)
		const response = await fetch("https://api.mailjet.com/v3.1/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${AUTH_HEADER}`,
			},
			body: JSON.stringify(mailjetPayload),
		});

		if (response.ok) {
			return new Response(
				JSON.stringify({ message: "Email sent successfully!" }),
				{ status: 200 },
			);
		} else {
			// Log the full error response from Mailjet for debugging
			const errorData = await response.json();
			console.error("Mailjet API Error:", errorData);
			return new Response(
				JSON.stringify({
					message: "Failed to send email.",
					details: errorData.ErrorMessage,
				}),
				{ status: 500 },
			);
		}
	} catch (error) {
		console.error("Serverless Function Error:", error);
		return new Response(
			JSON.stringify({
				message: "An unexpected error occurred in the serverless function.",
			}),
			{ status: 500 },
		);
	}
};
