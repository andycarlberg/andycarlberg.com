import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

const siteUrl = "https://www.andycarlberg.com/";

export async function GET(_context) {
  const posts = await getCollection("posts");

  // Sort posts by publishDate in descending order (newest first)
  const sortedPosts = posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: "Andy Carlberg | All Posts",
    description:
      "The latest updates, articles, and thoughts on strategy and systems.",
    site: siteUrl,

    stylesheet: "/rss/feed-style.xsl",

    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/posts/${post.slug}/`,
      content: post.body,
    })),

    customData: `<language>en-us</language>`,
  });
}
