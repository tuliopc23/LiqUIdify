import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Compute absolute path to the components directory relative to this config file
const baseDir = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(
  baseDir,
  "../../../libs/components/src/components",
);

function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

// Optionally force-exclude specific folders regardless of contents
const IGNORE = new Set([
  // "liquid-glass-defs",
  // "theme-provider",
]);

function hasStoryFilesRec(dir) {
  const entries = safeReadDir(dir);
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (hasStoryFilesRec(full)) return true;
    } else if (e.isFile()) {
      if (/\.(stories)\.(jsx?|tsx?|mdx)$/.test(e.name)) {
        return true;
      }
    }
  }
  return false;
}

function findComponentDirsWithStories() {
  const entries = safeReadDir(componentsDir);
  return entries
    .filter((e) => e.isDirectory())
    .map((d) => d.name)
    .filter((name) => !IGNORE.has(name))
    .filter((name) => hasStoryFilesRec(path.join(componentsDir, name)));
}

// Export an object grouping all components under a single key.
// main.mjs will flatten this structure for production story globs.
export const PRODUCTION_COMPONENTS = {
  all: findComponentDirsWithStories(),
};

export default PRODUCTION_COMPONENTS;
