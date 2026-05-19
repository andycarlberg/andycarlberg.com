import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { slugifyTag } from "./tags";

let postsPromise: Promise<CollectionEntry<"posts">[]> | null = null;

/**
 * Fetches all posts, filters out drafts in production, and sorts them by publishDate (Descending: Newest first)
 * Caches the Promise to prevent race conditions during concurrent SSR calls.
 */
export function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  if (postsPromise) return postsPromise;

  postsPromise = getCollection("posts").then((posts) =>
    posts
      .filter((post) => !(import.meta.env.PROD && post.data.draft))
      .sort(
        (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
      ),
  );

  return postsPromise;
}

/**
 * Fetches the latest N posts
 */
export async function getLatestPosts(
  count: number = 3,
): Promise<CollectionEntry<"posts">[]> {
  const sortedPosts = await getSortedPosts();
  return sortedPosts.slice(0, count);
}

/**
 * Fetches all posts that have a specific tag
 */
export async function getPostsByTag(
  tag: string,
): Promise<CollectionEntry<"posts">[]> {
  const sortedPosts = await getSortedPosts();
  const normalizedSearch = tag.toLowerCase();
  return sortedPosts.filter((post) =>
    post.data.tags?.some((t) => t.toLowerCase() === normalizedSearch),
  );
}

export interface TagCount {
  name: string;
  count: number;
  slug: string;
}

/**
 * Fetches all unique tags and their counts, including pre-calculated slugs.
 */
export async function getAllTags(): Promise<TagCount[]> {
  const posts = await getSortedPosts();

  // ES2024 Object.groupBy for efficient tag aggregation
  const allTags = posts
    .flatMap((p) => p.data.tags ?? [])
    .map((t) => t.toLowerCase());
  const grouped = Object.groupBy(allTags, (t) => t);

  return Object.entries(grouped)
    .map(([name, group]) => ({
      name,
      count: group?.length ?? 0,
      slug: slugifyTag(name),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
