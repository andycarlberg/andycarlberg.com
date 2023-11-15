module.exports = function(eleventyConfig) {
  eleventyConfig.setServerOptions({
    showAllHosts: true
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      layouts: "_layouts"
    }
  }
}
