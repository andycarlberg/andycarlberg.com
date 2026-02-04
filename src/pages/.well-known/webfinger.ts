import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const resource = url.searchParams.get("resource");

  // These are your Hachyderm details
  const MASTODON_INSTANCE = "hachyderm.io";
  const USERNAME = "andycarlberg";

  // Only respond if the request is actually looking for your account
  // This supports both 'acct:andy@andycarlberg.com' and 'acct:andycarlberg@andycarlberg.com'
  if (
    resource === `acct:andy@andycarlberg.com` ||
    resource === `acct:andycarlberg@andycarlberg.com`
  ) {
    const data = {
      subject: `acct:${USERNAME}@${MASTODON_INSTANCE}`,
      aliases: [
        `https://${MASTODON_INSTANCE}/@${USERNAME}`,
        `https://${MASTODON_INSTANCE}/users/${USERNAME}`,
      ],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: `https://${MASTODON_INSTANCE}/@${USERNAME}`,
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: `https://${MASTODON_INSTANCE}/users/${USERNAME}`,
        },
        {
          rel: "http://ostatus.org/spec/1.0/subscribe",
          template: `https://${MASTODON_INSTANCE}/authorize_interaction?uri={uri}`,
        },
      ],
    };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/jrd+json",
        "Access-Control-Allow-Origin": "*", // Crucial for Mastodon's cross-domain lookup
      },
    });
  }

  return new Response("Not Found", { status: 404 });
};
