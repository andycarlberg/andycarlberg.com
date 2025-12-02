export default {
  // Extends the default Conventional Commits ruleset
  extends: ["@commitlint/config-conventional"],

  rules: {
    // 1. Maintain the standard types
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "a11y",
      ],
    ],

    // 2. 💡 Add the scope-enum rule to clarify *where* the change happened
    "scope-enum": [
      2,
      "always",
      [
        "home", // Changes specific to homepage
        "posts", // Changes specific to blog post content or layout
        "about", // Changes specific to the About page/component
        "contact", // Changes specific to the Contact form/component
        "deps", // Updating or managing dependencies (e.g., pnpm updates)
        "config", // Changes to non-code config files (.biome.json, .depcheckrc, etc.)
        "layout", // Changes to the primary site layout or Astro component structure
        "assets", // Changes to images, fonts, or static assets
      ],
    ],
  },
};
