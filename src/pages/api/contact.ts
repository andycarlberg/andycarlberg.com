import {
  FROM_EMAIL,
  MAILJET_API_KEY,
  MAILJET_SECRET_KEY,
  TO_EMAIL,
} from "astro:env/server";
import type { APIContext } from "astro";

// Ensure this runs on the server (Vercel Function)
export const prerender = false;

// Create the Basic Auth header value (API_KEY:SECRET_KEY base64 encoded)
const AUTH_HEADER = Buffer.from(
  `${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`,
).toString("base64");

export async function POST({ request }: APIContext): Promise<Response> {
  try {
    const data = await request.formData();
    const name = data.get("name")?.toString();
    const email = data.get("email")?.toString();
    const subject = data.get("subject")?.toString() || "New Contact from Portfolio";
    const message = data.get("message")?.toString();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    // Catch simple bots with the honeypot field

    // Catch simple bots with the honeypot field
    if (data.get("_gotcha")) {
      return new Response(null, { status: 403 });
    }

    // Simple Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields (name, email, or message).",
        }),
        { status: 400 },
      );
    }

    // Prepare the Mailjet Payload
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
          Subject: `${subject} (from ${name})`,
          TextPart: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          HTMLPart: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
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

    // Call the Mailjet API
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
    }

    const errorData = await response.json();

    // Log the full JSON object using JSON.stringify with spacing (null, 2)
    // This forces Vercel logs to expand the nested arrays for debugging.
    console.error(
      "--- MAILJET API ERROR (Details Below) ---",
      JSON.stringify(errorData, null, 2),
    );

    // Extract the first error message to return to the client, if available
    const clientErrorMessage =
      errorData.Messages?.[0]?.Errors?.[0]?.ErrorMessage ||
      "Failed to send email due to a backend configuration error.";

    return new Response(
      JSON.stringify({
        message: "Failed to send email. Please try again later.",
        // Return a generic, safe message to the client, not the raw API error
        details: clientErrorMessage,
      }),
      { status: 500 },
    );
  } catch (error) {
    console.error("Serverless Function Error:", error);
    return new Response(
      JSON.stringify({
        message: "An unexpected error occurred in the serverless function.",
      }),
      { status: 500 },
    );
  }
}
