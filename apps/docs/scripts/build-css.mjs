#!/usr/bin/env node
/**
 * build-css.mjs
 *
 * Small CSS bundler for Mintlify docs.
 * - Concatenates all CSS files from apps/docs/styles
 * - Optionally includes built library CSS (dist/libs/components/liquidify.css)
 * - Writes a single bundle.css for reliable Mintlify styling
 *
 * Usage:
 *   node apps/docs/scripts/build-css.mjs [--include-lib] [--lib-path=PATH] [--out=PATH] [--minify]
 *
 * Defaults:
 *   --out        apps/docs/styles/bundle.css
 *   --lib-path   dist/libs/components/liquidify.css (relative to repo root)
 *   --include-lib  Only when flag is provided or env DOCS_INCLUDE_LIB_CSS=1
 *
 * Notes:
 * - File order:
 *   1) If apps/docs/mint.json has "styles", use exactly that list in that order
 *   2) Otherwise, include all CSS files in apps/docs/styles (alphabetically)
 *   3) Optional library CSS if requested (appended)
 *
 * - The output file (bundle.css) is never included as an input.
 * - Missing files are skipped with a warning (non-fatal).
 */

import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const docsDir = path.resolve(__dirname, ".."); // apps/docs
const docsStylesDir = path.join(docsDir, "styles");
const repoRoot = path.resolve(docsDir, "..", "..");

// CLI args
const argv = process.argv.slice(2);
const flags = Object.fromEntries(
  argv
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, ...rest] = a.replace(/^--/, "").split("=");
      return [k, rest.length ? rest.join("=") : true];
    }),
);

const includeLib =
  flags.includeLib === true ||
  flags.lib === true ||
  process.env.DOCS_INCLUDE_LIB_CSS === "1";

const libCssPath = path.resolve(
  repoRoot,
  typeof flags["lib-path"] === "string" && flags["lib-path"].length
    ? flags["lib-path"]
    : "dist/libs/components/liquidify.css",
);

const outPath = path.resolve(
  typeof flags.out === "string" && flags.out.length
    ? flags.out
    : path.join(docsStylesDir, "bundle.css"),
);

const wantMinify =
  flags.minify === true || process.env.DOCS_MINIFY_CSS === "1" || false;

const silent =
  flags.silent === true || process.env.DOCS_BUNDLE_SILENT === "1" || false;

// Utilities
async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function log(...args) {
  if (!silent) console.log(...args);
}

function warn(...args) {
  if (!silent) console.warn("WARN:", ...args);
}

function err(...args) {
  if (!silent) console.error("ERROR:", ...args);
}

function unique(arr) {
  return Array.from(new Set(arr));
}

function isCssFile(p) {
  return p.toLowerCase().endsWith(".css");
}

function normalizeStylePath(p) {
  // Mintlify "styles" entries can be absolute-like ("/styles/...") or relative ("styles/...")
  // Normalize to filesystem path relative to docsDir
  if (p.startsWith("/")) {
    return path.join(docsDir, p.replace(/^\//, ""));
  }
  return path.join(docsDir, p);
}

async function readMintStyles() {
  // Try docs.json first, then mint.json for backwards compatibility
  const docsPath = path.join(docsDir, "docs.json");
  const mintPath = path.join(docsDir, "mint.json");
  
  const configPath = (await fileExists(docsPath)) ? docsPath : mintPath;
  if (!(await fileExists(configPath))) {
    return [];
  }

  try {
    const raw = await readFile(configPath, "utf8");
    const json = JSON.parse(raw);
    const styles = Array.isArray(json.styles) ? json.styles : [];
    return styles
      .map(String)
      .map(normalizeStylePath)
      .filter(isCssFile)
      .filter((p) => path.resolve(p) !== path.resolve(outPath));
  } catch (e) {
    warn(`Failed to parse ${path.basename(configPath)} styles:`, e?.message ?? e);
    return [];
  }
}

async function listDocsStylesDir() {
  try {
    const entries = await readdir(docsStylesDir, { withFileTypes: true });
    return entries
      .filter((d) => d.isFile() && isCssFile(d.name))
      .map((d) => path.join(docsStylesDir, d.name))
      .filter((p) => path.resolve(p) !== path.resolve(outPath));
  } catch (e) {
    warn("Failed to read styles directory:", docsStylesDir, e?.message ?? e);
    return [];
  }
}

async function readCssFile(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    return content;
  } catch (e) {
    warn(`Skipping missing/unreadable CSS: ${filePath}`);
    return null;
  }
}

function maybeMinify(css) {
  if (!wantMinify) return css;
  // Very basic minification: strip comments and collapse whitespace
  return (
    css
      // Remove /* comments */
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Collapse whitespace around symbols
      .replace(/\s*([{}:;,])\s+/g, "$1")
      // Collapse multiple spaces/newlines
      .replace(/\s{2,}/g, " ")
      .replace(/\n/g, "")
      .trim()
  );
}

async function ensureOutDir(p) {
  const dir = path.dirname(p);
  try {
    await mkdir(dir, { recursive: true });
  } catch {
    // ignore
  }
}

async function main() {
  log("📦 Building docs CSS bundle...");

  // 1) From mint.json 'styles' in order (strict). If absent, fallback to all CSS in styles dir (alphabetical)
  const mintStyles = await readMintStyles();
  const dirStyles = await listDocsStylesDir();

  let orderedStyles = [];
  if (mintStyles.length > 0) {
    orderedStyles = mintStyles.map((p) => path.resolve(p));
  } else {
    orderedStyles = dirStyles
      .map((p) => path.resolve(p))
      .sort((a, b) => a.localeCompare(b));
  }

  // 2) Optional library CSS appended
  let libCssFiles = [];
  if (includeLib && (await fileExists(libCssPath))) {
    libCssFiles = [libCssPath];
  } else if (includeLib) {
    warn("Requested inclusion of library CSS, but file not found:", libCssPath);
  }

  const allFiles = unique([
    ...orderedStyles,
    ...libCssFiles.map((p) => path.resolve(p)),
  ]);

  log("🗂️  Files to bundle:");
  allFiles.forEach((f, i) =>
    log(`   ${String(i + 1).padStart(2, "0")}. ${path.relative(repoRoot, f)}`),
  );

  const chunks = [];
  const banner = `/* LiqUIdify Docs CSS Bundle
 * Generated: ${new Date().toISOString()}
 * Files: ${allFiles.length}
 * include-lib: ${includeLib ? "yes" : "no"} (${path.relative(repoRoot, libCssPath)})
 */\n`;

  for (const file of allFiles) {
    const css = await readCssFile(file);
    if (css == null) continue;

    const header = `\n/* ====== Begin: ${path.relative(repoRoot, file)} ====== */\n`;
    const footer = `\n/* ====== End:   ${path.relative(repoRoot, file)} ====== */\n`;
    chunks.push(header + css + footer);
  }

  const bundled = banner + chunks.join("\n");
  const finalOut = maybeMinify(bundled);

  await ensureOutDir(outPath);
  await writeFile(outPath, finalOut, "utf8");

  log(
    `✅ Wrote bundle: ${path.relative(repoRoot, outPath)} (${Math.round(finalOut.length / 1024)} KB)`,
  );
  process.exit(0);
}

main().catch((e) => {
  err("Failed to build docs CSS bundle:", e?.stack ?? e);
  process.exit(1);
});
