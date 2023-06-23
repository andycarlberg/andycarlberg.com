module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  return {
    dir: {
      layouts: "_layouts"
    }
  }
}
