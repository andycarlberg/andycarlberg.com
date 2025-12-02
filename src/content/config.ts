import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.date(),
		author: z.string().default("Andy Carlberg"),
	}),
});

export const collections = {
	posts: postsCollection,
};
