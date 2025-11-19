import type { APIRoute } from "astro";

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
	try {
		const data = await request.formData();
		const name = data.get("name") as string;
		const email = data.get("email") as string;
		const message = data.get("message") as string;

		// 1. Simple Validation
		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({
					message: "Missing required fields (name, email, or message).",
				}),
				{ status: 400 },
			);
		}

		// 2. Prepare the Mailjet Payload
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
						// Crucial: This ensures you can simply hit 'Reply' in your inbox.
						"Reply-To": email,
					},
				},
			],
		};

		// 3. Call the Mailjet API
		const response = await fetch("https://api.mailjet.com/v3.1/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// Basic Authentication using the encoded keys
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
