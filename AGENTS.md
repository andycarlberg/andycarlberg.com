# AGENTS.md

## Commands

- `pnpm check`: Run Biome format and lint checks (`biome check --write --error-on-warnings .`).
- `pnpm lint:md`: Run markdownlint across content (`markdownlint-cli2 --fix`).
- `pnpm ci:all`: Run full CI validation suite (Biome, docs lint, audit, depcheck, license check).
- `pnpm drafts:link <path>`: Symlink external drafts directory into `src/content/drafts`.
- `pnpm drafts:promote <slug> [--now] [--dry-run] [--force] [--keep]`: Promote a draft to `posts`.

## Architecture & Conventions

- Published posts live in `src/content/posts/*.{md,mdx}`; drafts are symlinked to `src/content/drafts`.
- In `DEV` mode, `posts` loads both `posts` and `drafts`. Production builds only load `posts`.
- Promoting a draft validates frontmatter, stamps `publishDate`, and stages the file in git.
- Styling: Tailwind CSS v4 configured in `src/styles/` (`@theme`); no `tailwind.config.js`.
- Icons: `astro-icon` bundles only explicitly allowlisted icons in `astro.config.mjs` (`include`).
- Testing: No unit test runner; verification relies on `pnpm ci:all` and `pnpm build`.

## Commit Conventions

Enforced on pre-commit and commit-msg hooks via Lefthook and Commitlint:

- Format: `type(scope): message` (header <= 100 chars, body lines <= 100 chars).
- Required scopes: `home`, `posts`, `about`, `contact`, `deps`, `config`, `layout`, `assets`.
