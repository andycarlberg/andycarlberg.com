# GEMINI.md - andycarlberg.com

<!-- markdownlint-disable MD013 -->

This document serves as the foundational guide and technical context for Gemini CLI interactions
within the `andycarlberg.com` repository.

## Project Overview

`andycarlberg.com` is a personal portfolio and technical blog built with **Astro**. It is designed
as a high-performance, accessible, and standards-compliant web application, serving as both a
content hub and an architectural reference for modern frontend practices.

### Core Technologies

- **Framework:** [Astro](https://astro.build/) (configured for SSR with Vercel)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (using the @tailwindcss/vite integration)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linting & Formatting:** [Biome](https://biomejs.dev/) (primary),
  [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) (for MDX/MD)
- **Content:** [MDX](https://mdxjs.com/) via Astro Content Collections
- **Hosting:** [Vercel](https://vercel.com/) (Serverless functions for API routes)

## Building and Running

The project uses `pnpm` as the package manager.

### Key Commands

- **Development:** `pnpm dev` - Starts the local development server at `localhost:4321`.
- **Production Build:** `pnpm build` - Compiles the site for production.
- **Preview Build:** `pnpm preview` - Previews the production build locally.
- **Code Quality Check:** `pnpm check` - Runs Biome to lint and format code.
- **Full QA Pipeline:** `pnpm ci:all` - Runs the complete suite of checks including Biome,
  markdown linting, security audits, dependency health, and license checks.

## Project Architecture & Conventions

### Voice and Brand (The "Strategic Steward")

This site is the professional home of Andy Carlberg, an executive technology leader. The brand is built on **Technical Stewardship**—the belief that technical integrity is a durable business asset.

#### Persona: The Leader of Leaders

- **Focus:** Organizational design, culture, and strategic alignment. We speak to the "how" of building high-performing departments, not just individual teams.
- **Authority:** Grounded in a deep technical background (CS + MBA), but focused on leveraging that expertise to realize business outcomes.
- **Goal:** To establish leadership that bridges the gap between technical execution and executive strategy.

#### The "People, Product... Profit" (PPP) Philosophy

The core narrative follows a strict hierarchy of priorities, not a sequence:

1. **People:** We prioritize people first—treating them as humans, not resources or liabilities. If you take care of the team, they will be positioned to succeed. We build **Sovereign Teams**—high-agency groups that own the labor and the value.
2. **Product:** We focus on building what is truly needed and wanted, not just what is cheapest. High-agency teams produce products with **Structural Integrity**, preventing the "rebuild tax" and ensuring long-term utility.
3. **... Profit:** Profit is not the primary directive; it is the natural consequence of a healthy team and a strong product. Business value (EBITDA, ROI, IRR) follows when the engine is disciplined. We do not extract value from the shell; we build value through the core.

- **Primary Tone:** Authoritative, Insightful, Strategic.
- **Secondary Tone:** Visionary, Analytical, Mentorship-oriented.
- **Signature Vocabulary:** *Product Stewardship*, *Sovereign Teams*, *Engine and Economics*, *Technical Integrity*, *High-Agency*, *Value Delivered*, *Non-Negotiable*, *Reconcile*, *Friction*.
- **Style Heuristics:**
  - **The "Why" First:** Always connect a technical practice to a business outcome.
  - **Constructive Provocateur:** Challenge industry "norms" with evidence-based alternatives.
  - **Precision:** Use the language of an MBA alongside the language of a CS degree.
  - **Active Leadership:** Describe what you *do* as a practitioner (e.g., "I navigate," "I build," "I reconcile") rather than what you *offer* as a service.

### Connection over Consulting

We are NOT explicitly seeking consulting or new roles. The goal is to establish leadership and foster professional connection.

### Directory Structure

- `src/components/`: Reusable Astro components.
- `src/layouts/`: Global page layouts (e.g., `Layout.astro`, `MarkdownPage.astro`).
- `src/content/`: MDX content collections. Posts are located in `src/content/posts/`.
- `src/pages/`: File-based routing. Includes standard pages, dynamic routes, and API routes.
- `src/pages/api/`: Serverless functions (e.g., contact form handling).
- `src/pages/.well-known/`: Identity resolvers like WebFinger.
- `src/styles/`: Global CSS configurations.
- `src/utils/`: Shared helper functions.

### Development Standards

- **Coding Style:** Biome is the authoritative tool for linting and formatting. Adhere to the rules
  defined in `biome.JSON`.
- **Commits:** Conventional Commits are enforced via `commitlint` and `lefthook`.
- **Type Safety:** TypeScript is used throughout; ensure all new components and utilities are
  properly typed.
- **Accessibility:** Maintain WCAG compliance. Biome's a11y rules should be respected.
- **Content Management:** New blog posts should be added to `src/content/posts/` and must follow
  the schema defined in `src/content/config.ts`.

## Deployment & Infrastructure

- **Hosting:** Deployed on Vercel. Configuration is managed in `vercel.JSON` and `astro.config.mjs`.
- **Identity:** Implements WebFinger and AT Protocol verification.
- **Security:** HTTP Security Headers are strictly enforced. Runtime secrets are managed via Vercel
  environment variables.
