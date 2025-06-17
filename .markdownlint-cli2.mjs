/* eslint-disable camelcase -- markdownlint-cli2 requires this format for config options */

export default {
  gitignore: true,
  config: {
    "code-block-style": {
      style: "fenced",
    },
    "code-fence-style": {
      style: "backtick",
    },
    "emphasis-style": {
      style: "asterisk",
    },
    "fenced-code-language": {
      allowed_languages: [
        "bash",
        "html",
        "javascript",
        "json",
        "markdown",
        "sh",
        "text",
        "xml",
        "yaml",
      ],
      language_only: true,
    },
    "heading-style": {
      style: "atx",
    },
    "hr-style": {
      style: "---",
    },
    "line-length": {
      code_blocks: false,
    },
    "link-image-style": {
      autolink: true,
      inline: true,
      collapsed: false,
      shortcut: false,
    },
    "no-duplicate-heading": {
      siblings_only: true,
    },
    "ol-prefix": {
      style: "ordered",
    },
    "proper-names": {
      code_blocks: false,
      names: [
        "CommonMark",
        "JavaScript",
        "Markdown",
        "markdown-it",
        "markdownlint",
        "markdownlint-cli2",
        "Node.js",
      ],
    },
    "strong-style": {
      style: "asterisk",
    },
    "table-pipe-style": {
      style: "leading_and_trailing",
    },
    "ul-style": {
      style: "dash",
    },
  },
};
