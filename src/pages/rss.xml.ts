import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getSortedPosts } from "../utils/posts";

const siteUrl = "https://www.andycarlberg.com/";

export async function GET(_context: APIContext): Promise<Response> {
  const sortedPosts = await getSortedPosts();

  return rss({
    title: "Andy Carlberg | All Insights",
    description:
      "The latest updates, articles, and thoughts on strategy and systems.",
    site: siteUrl,

    stylesheet: "/rss/feed-style.xsl",

    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/insights/${post.id}/`,
    })),

    customData: `<language>en-us</language>`,
  });
}
