import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute } from "astro";
import GeoPattern from "geopattern";
import satori from "satori";

export const prerender = true;

const fontPath = path.resolve("./public/fonts/Inter-Bold.woff");
const fontData = await fs.readFile(fontPath);

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts
    .filter((post) => !(import.meta.env.PROD && post.data.draft))
    .map((post) => ({
      params: { slug: post.id },
      props: { post },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const pattern = GeoPattern.generate(post.id, { color: "#090d16" });
  const patternDataUri = pattern.toDataUri();

  const formattedDate = post.data.publishDate
    ? new Date(post.data.publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  const primaryTag =
    post.data.tags && post.data.tags.length > 0
      ? post.data.tags[0].toUpperCase()
      : null;

  const titleFontSize = post.data.title.length > 65 ? 48 : 56;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#090d16",
          backgroundImage: `url("${patternDataUri}")`,
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            color: "#94a3b8",
                            fontSize: 22,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                          },
                          children: "andycarlberg.com",
                        },
                      },
                      primaryTag
                        ? {
                            type: "span",
                            props: {
                              style: {
                                color: "#64748b",
                                fontSize: 16,
                                letterSpacing: "0.1em",
                              },
                              children: `// ${primaryTag}`,
                            },
                          }
                        : null,
                    ].filter(Boolean),
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: titleFontSize,
                fontWeight: 700,
                color: "#f8fafc",
                lineHeight: 1.25,
                display: "flex",
              },
              children: post.data.title,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      color: "#64748b",
                      fontSize: 20,
                    },
                    children: formattedDate,
                  },
                },
                post.data.readTime
                  ? {
                      type: "div",
                      props: {
                        style: {
                          color: "#64748b",
                          fontSize: 20,
                        },
                        children: post.data.readTime,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
