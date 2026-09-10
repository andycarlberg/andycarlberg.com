#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const rootDir = process.cwd();
const linkPath = path.resolve(rootDir, "src/content/drafts");

function resolveTargetDir() {
  const argPath = process.argv[2];

  if (!argPath) {
    console.error("Usage: pnpm drafts:link <path-to-drafts-folder>");
    process.exit(1);
  }

  const resolved = path.resolve(argPath.replace(/^~(?=$|\/|\\)/, os.homedir()));

  if (!fs.existsSync(resolved)) {
    console.error(`Error: Target directory does not exist at ${resolved}`);
    process.exit(1);
  }

  const stat = fs.statSync(resolved);
  if (!stat.isDirectory()) {
    console.error(`Error: Target path is not a directory: ${resolved}`);
    process.exit(1);
  }

  return resolved;
}

const targetDir = resolveTargetDir();

// Ensure parent directory src/content exists
const contentDir = path.dirname(linkPath);
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Clean up existing symlink or empty directory at linkPath
try {
  const stat = fs.lstatSync(linkPath);
  if (stat.isSymbolicLink()) {
    fs.unlinkSync(linkPath);
  } else if (stat.isDirectory()) {
    const existingFiles = fs.readdirSync(linkPath);
    if (existingFiles.length === 0) {
      fs.rmdirSync(linkPath);
    } else {
      console.error(
        `Error: ${linkPath} is a non-empty directory. Remove or backup its contents first.`,
      );
      process.exit(1);
    }
  } else {
    fs.unlinkSync(linkPath);
  }
} catch (e) {
  if (e.code !== "ENOENT") throw e;
}

// Create symlink
fs.symlinkSync(targetDir, linkPath, "dir");
console.log(`✓ Linked ${path.relative(rootDir, linkPath)} -> ${targetDir}`);
console.log(
  "Drafts in this folder will automatically appear in development mode (pnpm dev).",
);
