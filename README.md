# andycarlberg.com – Personal Portfolio & Strategy Hub

This is the public repository for andycarlberg.com. The site serves as a primary technical blog and
a live architectural reference demonstrating modern frontend practices, decentralized identity
ownership, and high-performance systems design.

---

## Technical Stack & Architectural Pillars

This project demonstrates expertise in building performant, secure, and standards-compliant web
applications using a modern, agnostic stack:

* **Performance:** Engineered with Astro to deliver zero-kilobyte JavaScript by default, achieving
  optimal Lighthouse scores and Core Web Vitals.
* **Decentralized Identity:** Implements AT Protocol verification via DNS and Fediverse Identity
  (WebFinger) via a custom API route, ensuring platform-independent ownership of the digital
  persona.
* **Mobile-First & Accessibility:** Fully responsive layout adhering to WCAG-compliant
  accessibility standards, including skip links, semantic HTML, and accessible focus states.
* **Security Architecture:** Robust HTTP Security Headers (HSTS, CSP, X-Frame-Options) are enforced
  via `vercel.JSON` to mitigate XSS and injection vulnerabilities.
* **Agnostic Styling:** Utilizes Tailwind CSS via the @tailwindcss/vite integration for a design
  system that is maintainable and decoupled from specific UI frameworks.
* **Content Management:** Strategy and technical execution articles managed via MDX for structured,
  component-driven documentation.

---

## Serverless Infrastructure & Identity Resolvers

The site leverages Vercel’s serverless environment to handle dynamic business logic and identity
discovery without the overhead of traditional backend management.

| Component | Purpose & Architectural Rationale |
| :--- | :--- |
| **Astro API Route (Contact)** | Acts as a secure middle layer for communication, ensuring API keys for Mailjet remain protected in the execution environment. |
| **WebFinger API Route** | Resolves Fediverse handles (e.g., @<andy@andycarlberg.com>) to specific instances using the JRD (JSON Resource Descriptor) standard. |
| **DMARC & SPF** | Domain-level authentication configured to validate outbound communication and protect domain reputation. |
| **Environment Security** | All runtime secrets are managed outside the codebase, ensuring a strict separation of configuration and code. |

---

## Quality Assurance & Automated Governance

A central focus of this repository is the professional-grade QA pipeline. All checks are enforced
via Lefthook on every commit and executed in parallel within GitHub Actions.

| Tool | Purpose | Area of Focus |
| :--- | :--- | :--- |
| **Biome** | Primary Code Quality | Lints, formats, and executes built-in a11y checks across the codebase. |
| **Package JSON Lint** | Configuration Security | Scans manifest files for security anti-patterns and metadata consistency. |
| **License Checker** | Legal Compliance | Validates that all production dependencies comply with an approved license allow-list. |
| **Markdownlint-cli2** | Content Integrity | Enforces structural consistency and style rules on all technical documentation. |
| **Security Audits** | Vulnerability Scanning | Utilizes pnpm audit and Depcheck to monitor dependency health and known vulnerabilities. |

---

## Development Operations

Manage dependencies and local execution using pnpm.

| Command | Action |
| :--- | :--- |
| `pnpm run dev` | Start the local development server at `localhost:4321`. |
| `pnpm run check` | Execute formatting and linting across the project. |
| `pnpm run ci:all` | Run the full QA pipeline (Audit, Depcheck, License Check). |
| `pnpm run build` | Compile the production-ready site for deployment. |

---

## 🛑 Usage Policy

This is a personal portfolio and architectural reference.

* **No Forks for Hosting:** Please do not fork this repository for the purpose of hosting a live
  site. The content, configuration, and identity layers are specific to my professional brand.
* **Educational Purpose:** You are encouraged to study the architecture, CI/CD patterns, and
  identity implementations for inspiration in your own projects.

If you have questions about the implementation details or would like to discuss a project, please
reach out via the [contact form](https://www.andycarlberg.com/contact).
