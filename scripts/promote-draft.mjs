#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const updateDate = args.includes("--now");
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");
const keepSource = args.includes("--keep");
const nonFlagArgs = args.filter((arg) => !arg.startsWith("--"));

const slug = nonFlagArgs[0];

if (!slug) {
  console.error(
    "Usage: pnpm drafts:promote <filename-or-slug> [--now] [--dry-run] [--force] [--keep]",
  );
  process.exit(1);
}

const rootDir = process.cwd();
const draftsDir = path.resolve(rootDir, "src/content/drafts");
const postsDir = path.resolve(rootDir, "src/content/posts");

if (!fs.existsSync(draftsDir)) {
  console.error(`Error: Drafts directory not found at ${draftsDir}`);
  process.exit(1);
}

// Recursively find all markdown/mdx draft files
function findDraftFiles(dir, baseDir = dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findDraftFiles(fullPath, baseDir));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
    ) {
      results.push(path.relative(baseDir, fullPath));
    }
  }
  return results;
}

const draftFiles = findDraftFiles(draftsDir);
const normalizedSlug = slug.replace(/\.(md|mdx)$/, "");

const matchedRelativePath = draftFiles.find((relPath) => {
  const relNoExt = relPath.replace(/\.(md|mdx)$/, "");
  return (
    relPath === slug ||
    relNoExt === normalizedSlug ||
    path.basename(relNoExt) === normalizedSlug
  );
});

if (!matchedRelativePath) {
  console.error(`Error: Could not find "${slug}" in ${draftsDir}`);
  console.error(
    `Available drafts: ${draftFiles.length > 0 ? draftFiles.join(", ") : "none"}`,
  );
  process.exit(1);
}

const srcPath = path.join(draftsDir, matchedRelativePath);
const targetFileName = path.basename(matchedRelativePath);
const targetSlug = targetFileName.replace(/\.(md|mdx)$/, "");
const destPath = path.join(postsDir, targetFileName);

// Check collisions across both .md and .mdx extensions
const existingCollision = [".md", ".mdx"]
  .map((ext) => path.join(postsDir, `${targetSlug}${ext}`))
  .find((p) => fs.existsSync(p));

if (existingCollision && !force) {
  console.error(
    `Error: Post already exists at ${existingCollision}. Use --force to overwrite.`,
  );
  process.exit(1);
}

// If forcing overwrite with a different extension, remove the conflicting file first
if (existingCollision && force && existingCollision !== destPath) {
  fs.unlinkSync(existingCollision);
}

// Read draft and strip UTF-8 BOM if present
let content = fs.readFileSync(srcPath, "utf-8");
content = content.replace(/^\uFEFF/, "");

// Parse frontmatter
const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error(`Error: No YAML frontmatter found in ${srcPath}`);
  process.exit(1);
}

let fm = fmMatch[1];
const body = content.slice(fmMatch[0].length);

// Basic frontmatter validation
if (!/^title\s*:/m.test(fm)) {
  console.error(`Error: Draft is missing required "title" in frontmatter.`);
  process.exit(1);
}
if (!/^description\s*:/m.test(fm)) {
  console.error(
    `Error: Draft is missing required "description" in frontmatter.`,
  );
  process.exit(1);
}

// Update draft property (case-insensitive)
if (/^draft\s*:\s*true/im.test(fm)) {
  fm = fm.replace(/^draft\s*:\s*true/im, "draft: false");
} else if (!/^draft\s*:/m.test(fm)) {
  fm = `${fm.trimEnd()}\ndraft: false`;
}

// Update publishDate if requested or missing
const hasPublishDate = /^publishDate\s*:/m.test(fm);
const nowIso = new Date().toISOString();
if (!hasPublishDate) {
  fm = `${fm.trimEnd()}\npublishDate: ${nowIso}`;
} else if (updateDate) {
  fm = fm.replace(/^publishDate\s*:.*$/m, `publishDate: ${nowIso}`);
}

const updatedContent = `---\n${fm.trim()}\n---${body}`;

if (dryRun) {
  console.log(`[DRY RUN] Would promote ${srcPath} -> ${destPath}`);
  console.log(`Updated frontmatter preview:\n---\n${fm.trim()}\n---`);
  process.exit(0);
}

// Write to posts
fs.writeFileSync(destPath, updatedContent, "utf-8");

// Remove or retain original draft
if (keepSource) {
  console.log(
    `✓ Retained original draft at ${path.relative(rootDir, srcPath)} (--keep specified)`,
  );
  console.log(
    "  Note: In dev mode, having the same slug in drafts and posts can cause duplicate slug errors.",
  );
} else {
  fs.unlinkSync(srcPath);
  console.log(`✓ Removed draft from ${path.relative(rootDir, srcPath)}`);
}

// Stage destination file safely without shell invocation
try {
  execFileSync("git", ["add", destPath], { stdio: "inherit" });
} catch {
  console.warn("Warning: Failed to stage promoted post with git add.");
}

console.log(
  `✓ Promoted ${targetFileName} to ${path.relative(rootDir, destPath)}`,
);
console.log("✓ Staged for commit. Review git status and commit when ready.");
