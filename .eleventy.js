module.exports = function(eleventyConfig) {
  // Input directory: src
  // Output directory: _site
  eleventyConfig.addPassthroughCopy("src/brands");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/flags");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/layouts");
  eleventyConfig.addPassthroughCopy("src/preloader");
  eleventyConfig.addPassthroughCopy("src/screenshots");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};