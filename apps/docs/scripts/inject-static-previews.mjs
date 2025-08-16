#!/usr/bin/env node
/**
 * inject-static-previews.mjs
 *
 * Reusable Node script that:
 * 1) Injects or refreshes self-contained static HTML+CSS previews into component MDX files
 *    - Uses idempotent markers so re-running refreshes in place (no duplication)
 *    - Scopes styles to prevent leaks
 *    - Inserts near the top of each component doc if markers are missing
 * 2) Updates the components index page with a visual grid of thumbnail previews
 *    - Adds/refreshes content between STATIC_COMPONENT_GRID markers
 *    - Each tile links to its respective component doc
 *
 * Conventions:
 * - Preview source files should be HTML documents in previews/ named:
 *    - <slug>.html           e.g., button.html
 *    - liquid-glass-<slug>.html (fallback) e.g., liquid-glass-button.html
 * - Injected MDX markers follow the format:
 *    <!-- STATIC_PREVIEW:<slug>:start --> ... <!-- STATIC_PREVIEW:<slug>:end -->
 *
 * Typical usage:
 *   node apps/docs/scripts/inject-static-previews.mjs
 *   node apps/docs/scripts/inject-static-previews.mjs --only=button,card
 *   node apps/docs/scripts/inject-static-previews.mjs --dry-run
 *   node apps/docs/scripts/inject-static-previews.mjs --previews=previews --docs=apps/docs/components --index=apps/docs/components/index.mdx
 */

import {
  readFile,
  writeFile,
  readdir,
  stat,
  mkdir,
  access,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* ------------------------------ Config & Args ------------------------------ */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..", "..", ".."); // at repo root

const DEFAULTS = {
  previewsDir: path.resolve(repoRoot, "previews"),
  docsDir: path.resolve(repoRoot, "apps", "docs", "components"),
  indexPath: path.resolve(repoRoot, "apps", "docs", "components", "index.mdx"),
  dryRun: false,
  silent: false,
  only: null, // array of slugs or null for all
};

const argv = process.argv.slice(2);
const flags = Object.fromEntries(
  argv
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, ...rest] = a.replace(/^--/, "").split("=");
      return [k, rest.length ? rest.join("=") : true];
    }),
);

function boolFlag(val, envName) {
  if (val === true) return true;
  if (val === false) return false;
  if (typeof val === "string") {
    return val === "1" || val.toLowerCase() === "true";
  }
  if (envName && process.env[envName]) {
    const v = process.env[envName];
    return v === "1" || v.toLowerCase() === "true";
  }
  return false;
}

const options = {
  previewsDir:
    typeof flags.previews === "string" && flags.previews.length
      ? path.resolve(flags.previews)
      : DEFAULTS.previewsDir,
  docsDir:
    typeof flags.docs === "string" && flags.docs.length
      ? path.resolve(flags.docs)
      : DEFAULTS.docsDir,
  indexPath:
    typeof flags.index === "string" && flags.index.length
      ? path.resolve(flags.index)
      : DEFAULTS.indexPath,
  dryRun:
    boolFlag(flags["dry-run"] ?? flags.dry, "INJECT_PREVIEWS_DRY_RUN") ||
    DEFAULTS.dryRun,
  silent: boolFlag(flags.silent, "INJECT_PREVIEWS_SILENT") || DEFAULTS.silent,
  only:
    typeof flags.only === "string" && flags.only.length
      ? flags.only
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : DEFAULTS.only,
};

const SKIP_DOCS = new Set(["index", "showcase"]);
const GRID_MARKER_START = "<!-- STATIC_COMPONENT_GRID:start -->";
const GRID_MARKER_END = "<!-- STATIC_COMPONENT_GRID:end -->";

/* --------------------------------- Logging -------------------------------- */

function log(...args) {
  if (!options.silent) console.log(...args);
}
function warn(...args) {
  if (!options.silent) console.warn("WARN:", ...args);
}
function err(...args) {
  if (!options.silent) console.error("ERROR:", ...args);
}

/* ------------------------------ FS Utilities ------------------------------ */

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function readText(p) {
  try {
    return await readFile(p, "utf8");
  } catch (e) {
    return null;
  }
}

async function writeTextIfChanged(p, nextContent) {
  const prev = await readText(p);
  if (prev === null) {
    await mkdir(path.dirname(p), { recursive: true });
    if (!options.dryRun) await writeFile(p, nextContent, "utf8");
    log(
      `✍️  Created ${path.relative(repoRoot, p)} (${Math.round(nextContent.length / 1024)} KB)`,
    );
    return true;
  }
  if (prev !== nextContent) {
    if (!options.dryRun) await writeFile(p, nextContent, "utf8");
    log(
      `♻️  Updated ${path.relative(repoRoot, p)} (${Math.round(nextContent.length / 1024)} KB)`,
    );
    return true;
  }
  log(`✅ No changes ${path.relative(repoRoot, p)}`);
  return false;
}

/* ------------------------------ CSS Scoping ------------------------------- */

/**
 * Scope CSS selectors to a given container id, without leaking styles.
 * - Transforms :root and html/body selectors so they apply to the container
 * - Keeps @media/@supports blocks, recursing into their contents
 * - Leaves @keyframes/@font-face/@import alone
 *
 * NOTE: This is a pragmatic minimal parser; it won't cover every CSS edge case,
 * but is sufficient for our generated/static previews composed of simple rules.
 */
function scopeCss(css, scopeId) {
  // Strip BOM and trim
  css = (css || "").replace(/^\uFEFF/, "").trim();

  // Remove @import lines (prevent external fetches, and not needed inside doc)
  css = css.replace(/@import[^;]+;/g, "");

  // Tokenize with a small stack-based brace parser to handle at-rules.
  let i = 0;
  const n = css.length;

  function isWhitespace(ch) {
    return (
      ch === " " || ch === "\n" || ch === "\t" || ch === "\r" || ch === "\f"
    );
  }

  function readUntil(chars) {
    const start = i;
    while (i < n && !chars.includes(css[i])) i++;
    return css.slice(start, i);
  }

  function skipWhitespace() {
    while (i < n && isWhitespace(css[i])) i++;
  }

  function readBlock() {
    // Reads content until matching '}' at current nesting level
    let depth = 1;
    const start = i;
    while (i < n) {
      const ch = css[i++];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    return css.slice(start, i - 1);
  }

  function processRules(input) {
    let out = "";
    let localI = 0;
    const L = input.length;

    while (localI < L) {
      // Skip whitespace/comments
      // Remove comments
      if (input.slice(localI).startsWith("/*")) {
        const end = input.indexOf("*/", localI + 2);
        if (end === -1) break;
        localI = end + 2;
        continue;
      }
      while (localI < L && isWhitespace(input[localI])) localI++;

      if (localI >= L) break;

      // If at-rule without block (e.g., @charset; @import;) just copy through
      if (input[localI] === "@") {
        const atStart = localI;
        // Read until '{' or ';'
        while (localI < L && input[localI] !== "{" && input[localI] !== ";")
          localI++;
        const prelude = input.slice(atStart, localI).trim();
        if (localI < L && input[localI] === ";") {
          // At-rule ends here
          const line = input.slice(atStart, localI + 1);
          // Drop @import already, but keep other semicolon at-rules
          if (!/^@import\b/i.test(prelude)) out += line;
          localI++;
          continue;
        }
        // Otherwise it's a block at-rule (e.g., @media, @supports, @keyframes)
        if (localI < L && input[localI] === "{") {
          localI++; // skip '{'
          const bodyStart = localI;
          let depth = 1;
          while (localI < L && depth > 0) {
            const ch = input[localI++];
            if (ch === "{") depth++;
            else if (ch === "}") depth--;
          }
          const body = input.slice(bodyStart, localI - 1);

          if (
            /^@media\b/i.test(prelude) ||
            /^@supports\b/i.test(prelude) ||
            /^@layer\b/i.test(prelude)
          ) {
            out += `${prelude}{${processRules(body)}}`;
          } else if (
            /^@keyframes\b/i.test(prelude) ||
            /^@-webkit-keyframes\b/i.test(prelude) ||
            /^@font-face\b/i.test(prelude)
          ) {
            // Keep keyframes/font-face content untouched
            out += `${prelude}{${body}}`;
          } else {
            // Unknown at-rule with block; be conservative: keep as-is
            out += `${prelude}{${body}}`;
          }
          continue;
        }
      }

      // Normal rule: selectors { declarations }
      const selStart = localI;
      while (localI < L && input[localI] !== "{") localI++;
      const rawSelectors = input.slice(selStart, localI).trim();
      if (localI >= L || input[localI] !== "{") break;
      localI++; // skip '{'

      const declStart = localI;
      let depth = 1;
      while (localI < L && depth > 0) {
        const ch = input[localI++];
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
      }
      const body = input.slice(declStart, localI - 1);

      const scopedSelectors = rawSelectors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((sel) => scopeOneSelector(sel, scopeId))
        .join(", ");

      out += `${scopedSelectors}{${body}}`;
    }

    return out;
  }

  function scopeOneSelector(selector, id) {
    const scope = `#${id}`;
    // Replace :root with scope
    selector = selector.replace(/(^|[\s>+~])\:root\b/g, `$1${scope}`);

    // Replace leading html/body with scope
    selector = selector.replace(/(^|,)\s*html\b/g, `$1 ${scope}`);
    selector = selector.replace(/(^|,)\s*body\b/g, `$1 ${scope}`);

    // If it already targets our scope, keep as-is
    const normalized = selector.replace(/\s+/g, " ").trim();
    if (normalized.startsWith(scope) || normalized.startsWith(`${scope} `)) {
      return normalized;
    }

    // Keyframes percentages/from/to shouldn't be scoped (but we don't arrive here for keyframes)
    // Default: prefix with scope
    return `${scope} ${selector}`.replace(/\s+/g, " ").trim();
  }

  return processRules(css);
}

/* ----------------------------- HTML Extraction ---------------------------- */

/**
 * Extract styles and content from a full HTML preview document and convert to
 * a self-contained, scoped block suitable for MDX insertion.
 */
function buildInlinePreview(htmlSource, slug, { wrapperId }) {
  const scopeId = `${wrapperId}`;
  const withoutScripts = htmlSource
    // remove inline <script> blocks
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    // remove script src tags
    .replace(/<script\b[^>]*\/?>/gi, "");

  const styleBlocks = [];
  const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = styleRe.exec(withoutScripts)) !== null) {
    styleBlocks.push(m[1]);
  }

  let bodyInner = "";
  const bodyMatch = withoutScripts.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyInner = bodyMatch[1].trim();
  } else {
    // Fallback: try to remove <head> if present
    const noHead = withoutScripts.replace(/<head[^>]*>[\s\S]*?<\/head>/i, "");
    // remove outer html tag
    bodyInner = noHead
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "")
      .trim();
  }

  // Scope CSS
  const combinedCss = styleBlocks.join("\n\n");
  const scopedCss = scopeCss(combinedCss, scopeId);

  // Compose block
  const block =
    `<div id="${scopeId}">\n` +
    `  <style>\n${scopedCss}\n  </style>\n` +
    `  ${bodyInner}\n` +
    `</div>`;

  return block;
}

/* ----------------------------- MDX Manipulation --------------------------- */

function makePreviewMarkers(slug) {
  return {
    start: `<!-- STATIC_PREVIEW:${slug}:start -->`,
    end: `<!-- STATIC_PREVIEW:${slug}:end -->`,
  };
}

function injectOrReplacePreview(mdx, slug, inlineBlock) {
  const { start, end } = makePreviewMarkers(slug);
  const block = `${start}\n${inlineBlock}\n${end}`;

  // If markers exist, replace content in between
  const startIdx = mdx.indexOf(start);
  const endIdx = mdx.indexOf(end);
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = mdx.slice(0, startIdx);
    const after = mdx.slice(endIdx + end.length);
    return before + block + after;
  }

  // Otherwise, insert after first H1 header (# ...)
  const h1Match = mdx.match(/^# .+$/m);
  if (h1Match) {
    const h1Pos = mdx.indexOf(h1Match[0]);
    const afterH1 = h1Pos + h1Match[0].length;
    // Find the next blank line after H1 to place the block
    const rest = mdx.slice(afterH1);
    const doubleNl = rest.indexOf("\n\n");
    if (doubleNl !== -1) {
      const insertPos = afterH1 + doubleNl + 2;
      return mdx.slice(0, insertPos) + `\n${block}\n` + mdx.slice(insertPos);
    } else {
      // Append if no blank line found
      return mdx + `\n\n${block}\n`;
    }
  }

  // Fallback: append at end
  return mdx + `\n\n${block}\n`;
}

/* -------------------------- Index Grid Manipulation ----------------------- */

function buildGridBlock(items) {
  // items: Array<{ slug, docPath, inlineBlock }>
  // We'll enclose each preview in a tile that constrains size, adding subtle border and hover
  const GRID_ID = "liquidify-static-component-grid";
  const gridCss = `
#${GRID_ID} {
  margin: 28px 0 8px;
}
#${GRID_ID} .grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
#${GRID_ID} .tile {
  position: relative;
  border-radius: 14px;
  overflow: clip;
  border: 1px solid rgba(0,0,0,0.1);
  background: linear-gradient(180deg, rgba(255,255,255,0.66), rgba(255,255,255,0.35));
  box-shadow:
    0 6px 16px rgba(0,0,0,0.08),
    0 2px 4px rgba(0,0,0,0.06);
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
}
#${GRID_ID} .tile:hover {
  transform: translateY(-2px);
  box-shadow:
    0 12px 28px rgba(0,0,0,0.12),
    0 4px 10px rgba(0,0,0,0.08);
  border-color: rgba(0,0,0,0.16);
}
#${GRID_ID} .thumb {
  position: relative;
  min-height: 140px;
  max-height: 180px;
  overflow: hidden;
  display: block;
}
#${GRID_ID} .thumb-inner {
  /* Let previews define their own look; constrain with padding */
  padding: 10px;
}
#${GRID_ID} .meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
#${GRID_ID} .title {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}
#${GRID_ID} .link {
  text-decoration: none;
  color: inherit;
}
@media (prefers-color-scheme: dark) {
  #${GRID_ID} .tile {
    border-color: rgba(255,255,255,0.14);
    background: linear-gradient(180deg, rgba(20,20,25,0.5), rgba(20,20,25,0.35));
    box-shadow:
      0 8px 20px rgba(0,0,0,0.35),
      0 1px 2px rgba(0,0,0,0.2) inset;
  }
  #${GRID_ID} .meta {
    border-top-color: rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
  }
  #${GRID_ID} .title {
    color: #e5e7eb;
  }
}
`.trim();

  const tiles = items
    .map((it) => {
      const tileId = `liquidify-static-thumb-${it.slug}`;
      // Re-scope the already-scoped block by changing id to the tile id, to ensure uniqueness in the grid.
      const thumbBlock = it.inlineBlock.replace(
        /id="liquidify-static-[^"]+-preview"/,
        `id="${tileId}"`,
      );
      return [
        `<a class="link" href="/components/${it.slug}" aria-label="${it.slug} component">`,
        `  <div class="tile">`,
        `    <div class="thumb">`,
        `      <div class="thumb-inner">`,
        `        ${thumbBlock}`,
        `      </div>`,
        `    </div>`,
        `    <div class="meta">`,
        `      <div class="title">${humanizeSlug(it.slug)}</div>`,
        `      <span aria-hidden="true">→</span>`,
        `    </div>`,
        `  </div>`,
        `</a>`,
      ].join("\n");
    })
    .join("\n");

  return [
    GRID_MARKER_START,
    `<div id="${GRID_ID}">`,
    `  <style>\n${gridCss}\n  </style>`,
    `  <div class="grid">`,
    tiles,
    `  </div>`,
    `</div>`,
    GRID_MARKER_END,
  ].join("\n");
}

function injectOrReplaceGrid(indexMdx, gridBlock) {
  const startIdx = indexMdx.indexOf(GRID_MARKER_START);
  const endIdx = indexMdx.indexOf(GRID_MARKER_END);
  const block = `\n${gridBlock}\n`;

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const before = indexMdx.slice(0, startIdx);
    const after = indexMdx.slice(endIdx + GRID_MARKER_END.length);
    return before + block + after;
  }

  // Insert after the first H1 '# Component Library' or after frontmatter if present
  // 1) Skip frontmatter if exists
  let insertPos = 0;
  if (indexMdx.startsWith("---")) {
    const fmEnd = indexMdx.indexOf("\n---", 3);
    if (fmEnd !== -1) {
      insertPos = fmEnd + 4; // include "---\n"
    }
  }
  // 2) Find H1
  const h1Match = indexMdx.slice(insertPos).match(/^# .+$/m);
  if (h1Match) {
    const h1Pos = indexMdx.indexOf(h1Match[0], insertPos);
    const afterH1 = h1Pos + h1Match[0].length;
    // Insert after the next blank line following H1
    const rest = indexMdx.slice(afterH1);
    const doubleNl = rest.indexOf("\n\n");
    if (doubleNl !== -1) {
      const pos = afterH1 + doubleNl + 2;
      return indexMdx.slice(0, pos) + block + indexMdx.slice(pos);
    }
    return indexMdx + block;
  }

  // Append if no H1 found
  return indexMdx + block;
}

/* --------------------------------- Helpers -------------------------------- */

function humanizeSlug(slug) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function candidatePreviewPaths(previewsDir, slug) {
  return [
    path.join(previewsDir, `${slug}.html`),
    path.join(previewsDir, `liquid-glass-${slug}.html`),
  ];
}

/* --------------------------------- All Preview Items Builder --------------------------------- */

async function buildPreviewItem(slug) {
  const previewFile = await findPreviewFile(options.previewsDir, slug);
  if (!previewFile) return null;

  const html = await readText(previewFile);
  if (html === null) return null;

  const wrapperId = `liquidify-static-${slug}-preview`;
  const inlineBlock = buildInlinePreview(html, slug, { wrapperId });

  return {
    slug,
    mdxPath: path.join(options.docsDir, `${slug}.mdx`),
    updated: false,
    inlineBlock,
  };
}

async function collectAllPreviewItems() {
  const allSlugs = await collectDocsSlugs(options.docsDir);
  const items = [];
  for (const slug of allSlugs) {
    if (SKIP_DOCS.has(slug)) continue;
    const item = await buildPreviewItem(slug);
    if (item && item.inlineBlock) items.push(item);
  }
  return items;
}

/* --------------------------------- Runner --------------------------------- */

async function collectDocsSlugs(docsDir) {
  const entries = await readdir(docsDir, { withFileTypes: true });
  const slugs = entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".mdx"))
    .map((e) => e.name.replace(/\.mdx$/i, ""))
    .filter((slug) => !SKIP_DOCS.has(slug));
  slugs.sort((a, b) => a.localeCompare(b));
  return slugs;
}

async function findPreviewFile(previewsDir, slug) {
  const candidates = candidatePreviewPaths(previewsDir, slug);
  for (const c of candidates) {
    if (await fileExists(c)) return c;
  }
  return null;
}

async function processComponentDoc(slug) {
  const mdxPath = path.join(options.docsDir, `${slug}.mdx`);
  const mdxContent = await readText(mdxPath);
  if (mdxContent === null) {
    warn(
      `Missing MDX file for slug "${slug}": ${path.relative(repoRoot, mdxPath)}`,
    );
    return null;
  }

  const previewFile = await findPreviewFile(options.previewsDir, slug);
  if (!previewFile) {
    warn(
      `No preview HTML found for "${slug}" (looked in ${path.relative(repoRoot, options.previewsDir)})`,
    );
    return { slug, mdxPath, updated: false, inlineBlock: null };
  }

  const html = await readText(previewFile);
  if (html === null) {
    warn(
      `Failed to read preview for "${slug}": ${path.relative(repoRoot, previewFile)}`,
    );
    return { slug, mdxPath, updated: false, inlineBlock: null };
  }

  const wrapperId = `liquidify-static-${slug}-preview`;
  const inlineBlock = buildInlinePreview(html, slug, { wrapperId });

  const nextMdx = injectOrReplacePreview(mdxContent, slug, inlineBlock);
  if (nextMdx !== mdxContent) {
    if (!options.dryRun) await writeFile(mdxPath, nextMdx, "utf8");
    log(
      `🔧 Injected static preview for "${slug}" -> ${path.relative(repoRoot, mdxPath)}`,
    );
    return { slug, mdxPath, updated: true, inlineBlock };
  } else {
    log(`↔️  Preview for "${slug}" is up-to-date`);
    return { slug, mdxPath, updated: false, inlineBlock };
  }
}

async function updateIndexGrid(items) {
  const indexContent = await readText(options.indexPath);
  if (indexContent === null) {
    warn(`Index page not found: ${path.relative(repoRoot, options.indexPath)}`);
    return false;
  }

  // Only include items with an inlineBlock (i.e., preview exists)
  const gridItems = items
    .filter((it) => it && it.inlineBlock)
    .map((it) => ({
      slug: it.slug,
      docPath: `/components/${it.slug}`,
      inlineBlock: it.inlineBlock,
    }));

  if (gridItems.length === 0) {
    warn("No previews available to build grid; leaving index unchanged");
    return false;
  }

  const gridBlock = buildGridBlock(gridItems);
  const nextIndex = injectOrReplaceGrid(indexContent, gridBlock);

  if (nextIndex !== indexContent) {
    if (!options.dryRun) await writeFile(options.indexPath, nextIndex, "utf8");
    log(
      `🗂️  Updated component grid in ${path.relative(repoRoot, options.indexPath)}`,
    );
    return true;
  }
  log(
    `✅ Component grid up-to-date in ${path.relative(repoRoot, options.indexPath)}`,
  );
  return false;
}

async function main() {
  log("🧩 Inject Static Previews");
  log(`   Previews: ${path.relative(repoRoot, options.previewsDir)}`);
  log(`   Docs:     ${path.relative(repoRoot, options.docsDir)}`);
  log(`   Index:    ${path.relative(repoRoot, options.indexPath)}`);
  log(`   Only:     ${options.only ? options.only.join(", ") : "(all)"}`);
  log(`   Dry run:  ${options.dryRun ? "yes" : "no"}`);
  log("");

  // Collect component slugs
  const allSlugs = await collectDocsSlugs(options.docsDir);
  const targetSlugs = options.only
    ? allSlugs.filter((s) => options.only.includes(s))
    : allSlugs;

  if (targetSlugs.length === 0) {
    warn("No component MDX files found or --only filter excluded all.");
    process.exit(0);
  }

  const results = [];
  for (const slug of targetSlugs) {
    // Skip non-component files explicitly if needed
    if (SKIP_DOCS.has(slug)) continue;
    // Skip misc MDX not representing a component by heuristic (if wanted)
    results.push(await processComponentDoc(slug));
  }

  // Update the index grid (always include all available previews, not just --only)
  const allPreviewItems = await collectAllPreviewItems();
  await updateIndexGrid(allPreviewItems.length ? allPreviewItems : results);

  log("\n✅ Done.");
}

main().catch((e) => {
  err("Failed:", e?.stack ?? e);
  process.exit(1);
});
