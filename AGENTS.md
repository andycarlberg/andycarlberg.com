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

## Content & Voice Standards

- **Voice & Tone:** Senior engineering leader / systems architect. Capable yet grounded—written at
  a high intellectual level with common, accessible vocabulary, never dense, stuffy, or overly
  academic.
- **Avoid Academic Jargon & Purple Prose:** Strictly avoid theoretical buzzwords, academic
  posturing, and overblown metaphors (e.g., avoid "epistemological", "ontological", "cybernetics of
  the hype cycle"). Say things simply and directly.
- **Concrete, Everyday Analogies:** Anchor abstract systems thinking in tangible, mechanical, or
  workplace analogies (e.g., "the plug to unplug", "check engine light", Goodhart's Law in
  sales/support teams, "a hyper-competent idiot with root access").
- **Direct Assertions:** State the core mechanism plainly upfront without throat-clearing,
  rhetorical wind-up, or academic qualification.
- **Clean Aesthetic:** Zero emojis in post titles, headings, or bodies.
- **Tag Discipline:** Strongly favor reusing established tags (`systems-thinking`,
  `architecture`, `governance`, `risk-management`, `ai`, etc.). Only introduce a new tag if a
  post establishes a genuinely distinct technical or architectural domain.

## Social Syndication & Promotion

Selective distribution—not every post goes to every platform. Tailor copy to the platform's
native cadence, culture, and constraints:

- **Bluesky:**
  - Fast-moving, practitioner-oriented.
  - Anchor directly to live discourse, specific people, or events when relevant.
  - Hard constraint: <= 300 characters including URL.
  - No hashtags.
- **LinkedIn:**
  - Executive / peer-architect perspective.
  - Lean into thematic context over fast-expiring names (feed half-life is days, not hours).
  - Hook with the paradox/tension, state the core mechanism, and drive to the post—**do not
    summarize or restate the whole piece**.
  - Strict anti-slop rules: zero emojis, no bold colon labels (`**The Solution:**`), no hashtag
    blocks, no artificial engagement bait ("Agree?", "Thoughts?").
- **Hachyderm (Mastodon):**
  - Infrastructure, open-source, and SRE/systems-engineering audience.
  - Focus on technical mechanics, implementation boundaries, and operational realities over
    industry hype.
  - 500-character limit allows slightly more room for technical nuance; keep it plain-spoken and
    peer-to-peer without corporate framing.
  - CamelCase topical tags (e.g., `#SystemsArchitecture`, `#Infra`) are permissible for
    federated discoverability, but never spam blocks.
