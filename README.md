# ✨ andycarlberg.com – Personal Portfolio & Blog

This is the public repository for my personal and professional website, **andycarlberg.com**. This
site serves as my primary blogging platform and as a live **portfolio example** demonstrating my
modern frontend development practices.

---

## 🌟 Development Stack & Portfolio Features

This project showcases expertise in building highly performant web applications using a modern,
standards-compliant stack:

* **⚡️ Performance:** Built with **Astro** to deliver minimal JAVASCRIPT (JS) and achieve top
Lighthouse scores.
* **📱 Mobile-First Design & Accessibility:** Features a fully responsive, mobile-first layout
with smooth CSS-based transitions, **accessible focus states**, and **lazy-loaded images** to
ensure optimal user experience and performance on all viewport sizes.
* **💅 Styling:** Uses **Tailwind CSS** (via the recommended `@tailwindcss/vite` integration) for
rapid, utility-first styling.
* 📧 **Secure Contact Form:** Implemented using **Astro API Routes (Serverless Functions)** and
**Mailjet** for reliable, authenticated email delivery, securing the recipient's private address.
* **✍️ Content:** Blog content is managed via **Markdown** (`.mdx`) files.
* **🗺️ Architecture:** Deployed to **Vercel** to leverage best-in-class edge performance.

---

## 📧 Secure Contact Form Architecture

The project features a direct communication channel implemented via a secure, **Serverless
Function** (Astro API Route) hosted on Vercel. This architecture was chosen to provide a
professional contact mechanism while maintaining strict security standards.

| Component | Purpose & Benefit | Security Rationale |
| :--- | :--- | :--- |
| **Astro API Route** | Acts as the necessary middle layer, preventing client-side code from ever containing sensitive API keys. | Provides a secure execution environment separate from the static frontend. |
| **Mailjet Integration** | Used for reliable, high-deliverability email transport. | Ensures emails are authenticated (via **SPF/DKIM**) and avoids reliance on unstable, self-hosted SMTP configurations. |
| **Environment Variables** | All critical data (`TO_EMAIL`, `MAILJET_SECRET_KEY`) is stored outside the repository and accessed securely at runtime by the Vercel function. | Protects the recipient's private email and external service credentials from public exposure. |
| **DMARC Compliance** | **DMARC** (Domain-based Message Authentication) is configured via DNS to validate all outbound emails, maximizing inbox delivery and preventing email spoofing. | Ensures high deliverability and protects the domain's reputation. |

---

## 🛡️ Tooling: A Comprehensive QA Pipeline

A key focus of this repository is demonstrating a professional, highly automated quality assurance
pipeline. All checks are enforced via **Lefthook** on every commit and run **in parallel** in
GitHub Actions.

| Tool | Purpose | Area of Focus |
| :--- | :--- | :--- |
| **Biome** | **Primary Code Quality** | Lints, formats, and runs built-in accessibility (`a11y`) checks on all **JS/TS/Astro/JSON/CSS** files. |
| **Markdownlint-cli2** | **Structural Content Quality** | Enforces style and consistency rules on all **Markdown** documentation and blog posts, using the faster `cli2`. |
| **Alex** | **Prose Inclusivity** | Scans **Markdown documentation** for ableist or gendered language. |
| **pnpm Audit** | **Security** | Checks all production dependencies for **known vulnerabilities** (in CI). |
| **Depcheck** | **Dependency Health** | Verifies that all dependencies in `package.JSON` are actually **used** and that no used dependencies are missing (in CI). |

---

## ⚙️ Development Commands

Use **pnpm** to manage dependencies and run all project commands.

| Command | Action |
| :--- | :--- |
| `pnpm run dev` | **Start the dev server.** Begins local development at `localhost:4321`. |
| `pnpm run check` | **Format and Lint.** Runs Biome, applying all formatting fixes and linting across the entire codebase. |
| `pnpm run ci:all` | **Full QA Pipeline.** Runs the comprehensive set of quality checks for CI environments (includes Audit and Depcheck). |
| `pnpm run build` | Builds the production site for deployment. |
| `pnpm run deps:check` | **Dependency Audit.** Uses `ncu` to check for available major/minor package updates (Manual/Local use). |

---

## 🛑 Hosting & Usage Policy

**This is a personal portfolio repository.**

* **No Forks for Hosting:** Please **do not fork this repository** with the intent of hosting your
own live site. The content, domain, and specific configuration files are tied to my personal brand.
* **Educational Use Only:** You are welcome to study the code, architecture, and tooling setup for
educational purposes or to inspire your own projects.

If you have questions about the implementation details or the tooling choices, please feel free to
open a GitHub Issue.
