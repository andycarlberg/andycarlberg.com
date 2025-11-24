import fs from "node:fs";
import path from "node:path";

/**
 * Reads patterns from the .gitignore file to use for ignoring files in the linter.
 * @returns {Array<string>} An array of ignore patterns.
 */
function getGitIgnorePatterns() {
  try {
    const gitignorePath = path.resolve(process.cwd(), ".gitignore");
    const content = fs.readFileSync(gitignorePath, "utf8");
    // Split by line, filter out comments (#) and empty lines
    return content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));
  } catch (_e) {
    console.warn("Could not read .gitignore file.");
    return [];
  }
}

export default {
  ignore: [...getGitIgnorePatterns()],

  config: {
    // Enables all default rules
    default: true,

    // MD001: Ensure heading levels increment one level at a time
    MD001: true,

    // MD003: Enforce a consistent heading style
    MD003: {
      style: "atx",
    },

    // MD013: Maximum line length (100 characters)
    MD013: {
      line_length: 100,
      code_blocks: false, // Ignore code blocks when checking line length
      headings: false, // Allow headers to exceed line length
      tables: false, // Allow table cells to exceed line length
    },

    // MD025: Ensure only one top-level heading exists in the document
    MD025: {
      // The front matter title is for SEO and can be ignored for this rule.
      front_matter_title: "",
    },

    // MD029: Ordered list style
    MD029: {
      style: "ordered", // Enforce 1., 2., 3., etc.
    },

    // MD033: No inline HTML
    MD033: false, // Allow inline HTML

    // MD041: Do not require a top-level heading
    // This supports eyebrow text as well as import statements in MDX files.
    MD041: false,

    // MD044: Enforce specific capitalization/spelling for words
    MD044: {
      names: ["HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT", "JSON"],
    },
  },

  files: ["**/*.md", "**/*.mdx"],
};
