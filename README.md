# andycarlberg.com – Personal Portfolio & Blog

This is the public repository for my personal and professional website, **andycarlberg.com**. This
site serves as my primary blogging platform and as a live **portfolio example** demonstrating my
modern frontend development practices.

---

## Development Stack & Portfolio Features

This project showcases expertise in building highly performant web applications using a modern,
standards-compliant stack:

* **⚡️ Performance:** Built with **Astro** to deliver minimal JAVASCRIPT and achieve top Lighthouse
scores.
* **💅 Styling:** Uses **Tailwind CSS** (via the recommended `@tailwindcss/vite` integration) for
rapid, utility-first styling.
* **✍️ Content:** Blog content is managed via **Markdown** (`.mdx`) files.
* **🗺️ Architecture:** Deployed to **Vercel** to leverage best-in-class edge performance.

---

## Tooling: A Comprehensive QA Pipeline

A key focus of this repository is demonstrating a professional, highly automated quality assurance
pipeline. All checks are enforced via **Lefthook** on every commit.

| Tool | Purpose | Area of Focus |
| :--- | :--- | :--- |
| **Biome** | **Primary Code Quality** | Lints, formats, and runs built-in accessibility (`a11y`) checks on all **JS/TS/Astro/JSON/CSS** files. |
| **Markdownlint** | **Structural Content Quality** | Enforces style and consistency rules on all **Markdown** documentation and blog posts. |
| **Alex** | **Prose Inclusivity** | Scans **Markdown documentation** for ableist or gendered language. |

---

## Development Commands

Use **pnpm** to manage dependencies and run all project commands.

| Command | Action |
| :--- | :--- |
| `pnpm run dev` | **Start the dev server.** Begins local development at `localhost:4321`. |
| `pnpm run check` | **Format and Lint.** Runs Biome, applying all formatting fixes and linting across the entire codebase. |
| `pnpm run ci` | **Full QA Pipeline.** Runs the comprehensive set of quality checks for CI environments. |
| `pnpm run build` | Builds the production site for deployment. |

---

## 🛑 Hosting & Usage Policy

**This is a personal portfolio repository.**

* **No Forks for Hosting:** Please **do not fork this repository** with the intent of hosting your
own live site. The content, domain, and specific configuration files are tied to my personal brand.
* **Educational Use Only:** You are welcome to study the code, architecture, and tooling setup for
educational purposes or to inspire your own projects.

If you have questions about the implementation details or the tooling choices, please feel free to
open a GitHub Issue.
