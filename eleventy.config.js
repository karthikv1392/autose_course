export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.setServerOptions({ host: "127.0.0.1" });
  eleventyConfig.addCollection("lectures", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/lectures/*.md")
      .filter((item) => item.data.draft !== true)
      .sort((left, right) => (left.data.order ?? 999) - (right.data.order ?? 999))
  );

  return {
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "md", "njk"]
  };
}
