const nunjucksConfig = require("./lib/nunjucks");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      });
    }
  });

  Object.entries(nunjucksConfig.filters).forEach(([key, value]) =>
    eleventyConfig.addNunjucksFilter(key, value)
  );
  Object.entries(nunjucksConfig.globals).forEach(([key, value]) =>
    eleventyConfig.addNunjucksGlobal(key, value)
  );

  return {
    dir: {
      input: "templates",
      output: "build",
      data: "../data",
      includes: "_includes",
      layouts: "_layouts",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
