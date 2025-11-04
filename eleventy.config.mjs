import pluginWebc from "@11ty/eleventy-plugin-webc";
import postcss from "postcss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);

  eleventyConfig.addGlobalData("layout", "layouts/main.webc");

  eleventyConfig.addBundle("css", {
    transforms: [
      async function (content) {
        const result = await postcss().process(content, {
          from: this.page.inputPath,
          to: null,
        });
        return result.css;
      },
    ],
  });
}
