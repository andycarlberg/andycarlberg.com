import { defineCollection } from "astro:content";
import fs from "node:fs/promises";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import readingTime from "reading-time";

const postsCollection = defineCollection({
  loader: (() => {
    const baseLoader = glob({
      pattern: "**/*.{md,mdx}",
      base: "./src/content/posts",
    });

    return {
      ...baseLoader,
      load: async (context) => {
        const { parseData } = context;

        context.parseData = async (entry) => {
          const parsed = await parseData(entry);

          try {
            const content = await fs.readFile(entry.filePath, "utf-8");
            // Inject readTime into the data object
            // @ts-expect-error
            parsed.readTime = readingTime(content).text;
          } catch (e) {
            console.error(`Failed to calculate read time for ${entry.id}:`, e);
          }

          return parsed;
        };

        return baseLoader.load(context);
      },
    };
  })(),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.date(),
      author: z.string().default("Andy Carlberg"),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
      image: image().optional(),
      readTime: z.string().optional(), // Now populated by the loader
    }),
});

export const collections = {
  posts: postsCollection,
};
