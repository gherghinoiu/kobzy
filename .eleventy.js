module.exports = function (eleventyConfig) {
  // Copy static assets straight through to the built site
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  // Admin (Sveltia CMS) — copy as-is, don't run it through the templating engine
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.ignores.add("src/admin/**");
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  // --- Collections ---------------------------------------------------------
  // Every car is a markdown file in src/cars/. Newest (by "date") first.
  eleventyConfig.addCollection("cars", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("car")
      .sort((a, b) => (b.data.date || 0) - (a.data.date || 0));
  });

  // Only cars that are still available (not marked sold) — used on the homepage.
  eleventyConfig.addCollection("availableCars", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("car")
      .filter((c) => !c.data.sold)
      .sort((a, b) => (b.data.date || 0) - (a.data.date || 0));
  });

  // --- Filters -------------------------------------------------------------
  // Format a number as UK currency, e.g. 12995 -> "£12,995"
  eleventyConfig.addFilter("gbp", (value) => {
    const n = Number(value);
    if (isNaN(n)) return value;
    return "£" + n.toLocaleString("en-GB");
  });

  // Format mileage, e.g. 42000 -> "42,000 miles"
  eleventyConfig.addFilter("miles", (value) => {
    const n = Number(value);
    if (isNaN(n)) return value;
    return n.toLocaleString("en-GB") + " miles";
  });

  // Human date, e.g. "20 August 2026"
  eleventyConfig.addFilter("humanDate", (value) => {
    const d = value ? new Date(value) : new Date();
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  // ISO date for sitemaps / structured data
  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value ? new Date(value) : new Date();
    return d.toISOString();
  });

  // Turn a YouTube/Vimeo URL into an embeddable URL
  eleventyConfig.addFilter("embedUrl", (url) => {
    if (!url) return "";
    // YouTube: watch?v=ID , youtu.be/ID , shorts/ID
    const yt = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
    );
    if (yt) return "https://www.youtube.com/embed/" + yt[1];
    // Vimeo
    const vim = url.match(/vimeo\.com\/(\d+)/);
    if (vim) return "https://player.vimeo.com/video/" + vim[1];
    return url;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
