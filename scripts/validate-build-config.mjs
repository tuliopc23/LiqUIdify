#!/usr/bin/env node

/**
 * Build Configuration Validator
 *
 * Validates consistency between:
 * - Vite build entries and package.json exports
 * - Path aliases across all build tools
 * - File existence for all entry points
 *
 * Run this script to catch configuration drift before builds fail.
 */

import { readFileSync, existsSync } from "fs";
import { resolve, join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function error(message) {
  log(colors.red, `❌ ERROR: ${message}`);
}

function warn(message) {
  log(colors.yellow, `⚠️  WARNING: ${message}`);
}

function success(message) {
  log(colors.green, `✅ ${message}`);
}

function info(message) {
  log(colors.blue, `ℹ️  ${message}`);
}

function loadJson(filePath) {
  try {
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    error(`Failed to load ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

async function loadViteConfig() {
  // Use regex parsing approach that works reliably
  return loadViteConfigFallback();
}

function loadViteConfigFallback() {
  try {
    const viteConfigPath = resolve(rootDir, "vite.config.ts");
    const content = readFileSync(viteConfigPath, "utf-8");

    // Look for the entry object within build.lib
    const libEntryMatch = content.match(/lib:\s*{[^}]*entry:\s*{([^}]+)}/s);
    const inputMatch = content.match(/input:\s*{([^}]+)}/s);

    const entryMatch = libEntryMatch || inputMatch;
    if (!entryMatch) {
      throw new Error("Could not find entry or input configuration");
    }

    let entryContent = entryMatch[1];
    const entries = {};

    // Handle multiline entries - extract the full entry block more carefully
    if (!entryContent.includes("resolve(")) {
      // Try to find a larger block that includes resolve calls
      const expandedMatch = content.match(/entry:\s*{([\s\S]*?)},?\s*name:/s);
      if (expandedMatch) {
        entryContent = expandedMatch[1];
      }
    }

    // Parse entry points with comprehensive regex patterns
    // Remove comments and normalize whitespace for better parsing
    const cleanContent = entryContent
      .replace(/\/\/.*$/gm, "") // Remove comments
      .replace(/\s+/g, " "); // Normalize whitespace

    const patterns = [
      // Pattern: "key": resolve("path")
      /(['"`])([\w\/\-]+)\1:\s*resolve\(['"`]([^'"` ]+)['"`]\)/g,
      // Pattern: key: resolve("path") - unquoted key
      /([\w\-]+):\s*resolve\(['"`]([^'"` ]+)['"`]\)/g,
      // Pattern: "data-display": resolve( multiline
      /(['"`])([\w\/\-]+)\1:\s*resolve\(\s*['"`]([^'"` ]+)['"`]/g,
      // Pattern for multiline entries
      /([\w\-]+):\s*resolve\(\s*['"`]([^'"` ]+)['"`]/g,
    ];

    // Also try parsing the original content for multiline entries
    const multilinePattern =
      /(['"`]?)([\w\/\-]+)\1:\s*resolve\([\s\S]*?['"`]([^'"` ]+)['"`]\s*\)/g;
    let match;
    while ((match = multilinePattern.exec(entryContent)) !== null) {
      const key = match[2];
      const path = match[3];
      entries[key] = path;
    }

    // Apply patterns to cleaned content
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(cleanContent)) !== null) {
        let key, path;
        if (match.length === 4) {
          // Pattern with quotes around key
          key = match[2];
          path = match[3];
        } else {
          // Pattern without quotes around key
          key = match[1];
          path = match[2];
        }
        entries[key] = path;
      }
    }

    if (Object.keys(entries).length === 0) {
      // If no entries found, try a more aggressive approach
      const allResolveMatches = [
        ...entryContent.matchAll(
          /([\w\/\-"'`]+):\s*resolve\([\s\S]*?['"`]([^'"` ]+)['"`]/g,
        ),
      ];
      for (const match of allResolveMatches) {
        const key = match[1].replace(/['"`]/g, "");
        const path = match[2];
        entries[key] = path;
      }
    }

    info(`Found ${Object.keys(entries).length} entries via regex parsing`);
    return { entries };
  } catch (err) {
    error(`Fallback parsing also failed: ${err.message}`);
    process.exit(1);
  }
}

async function extractPathAliases(configPath, configName) {
  // Use regex parsing approach that works reliably
  return extractPathAliasesFallback(configPath);
}

function extractPathAliasesFallback(configPath) {
  const content = readFileSync(configPath, "utf-8");
  const aliasMatch = content.match(/(?:alias|resolve):\s*{([^}]+)}/s);
  if (!aliasMatch) return {};

  const aliases = {};
  const aliasContent = aliasMatch[1];
  // Improved regex to handle various quote styles and resolve() calls
  const aliasRegex =
    /(['"`])([^'"` ]+)\1:\s*(?:resolve\(['"`]([^'"` ]+)['"`]\)|['"`]([^'"` ]+)['"`])/g;
  let match;

  while ((match = aliasRegex.exec(aliasContent)) !== null) {
    const key = match[2];
    const value = match[3] || match[4]; // resolve() call or direct string
    aliases[key] = value;
  }

  return aliases;
}

function validateFileExists(filePath, description) {
  const fullPath = resolve(rootDir, filePath);
  if (!existsSync(fullPath)) {
    error(`${description} file not found: ${filePath}`);
    return false;
  }
  return true;
}

async function validateExportsBuildEntries() {
  info("Validating package.json exports vs Vite build entries...");

  const packageJson = loadJson(resolve(rootDir, "package.json"));
  const viteConfig = await loadViteConfig();

  let hasErrors = false;

  // Create mapping from exports to expected entries
  const exportToEntryMap = {
    "./context": "providers", // context export maps to providers entry
    "./button": "components/button",
    "./card": "components/card",
    "./modal": "components/modal",
    "./input": "components/input",
  };

  // Check if every package.json export has a corresponding build entry
  for (const [exportPath, exportConfig] of Object.entries(
    packageJson.exports,
  )) {
    if (
      exportPath === "." ||
      exportPath === "./package.json" ||
      exportPath === "./css" ||
      exportPath === "./styles"
    ) {
      continue; // Skip special exports
    }

    const exportName = exportPath.replace("./", "");
    let found = false;

    // Check direct mapping first
    if (
      exportToEntryMap[exportPath] &&
      viteConfig.entries[exportToEntryMap[exportPath]]
    ) {
      found = true;
    } else {
      // Check if there's a corresponding entry in Vite config
      for (const entryName of Object.keys(viteConfig.entries)) {
        if (
          entryName === exportName ||
          entryName.endsWith(exportName) ||
          exportName === entryName.replace("components/", "")
        ) {
          found = true;
          break;
        }
      }
    }

    if (!found) {
      error(`Export "${exportPath}" has no corresponding Vite build entry`);
      hasErrors = true;
    }
  }

  // Check if every Vite entry has a corresponding export (for bundles)
  for (const [entryName, entryPath] of Object.entries(viteConfig.entries)) {
    if (entryName === "index") {
      continue; // Skip main index
    }

    let hasExport = false;

    // Special handling for component entries
    if (entryName.startsWith("components/")) {
      const componentName = entryName.replace("components/", "");
      hasExport = !!packageJson.exports[`./${componentName}`];
    } else {
      // Check for direct export or special mappings
      hasExport =
        !!packageJson.exports[`./${entryName}`] ||
        (entryName === "providers" && !!packageJson.exports["./context"]);
    }

    if (!hasExport) {
      warn(
        `Vite entry "${entryName}" has no corresponding package.json export`,
      );
    }
  }

  return !hasErrors;
}

async function validateEntryPointFiles() {
  info("Validating that all entry point files exist...");

  const viteConfig = await loadViteConfig();
  let hasErrors = false;

  for (const [entryName, entryPath] of Object.entries(viteConfig.entries)) {
    if (!validateFileExists(entryPath, `Entry point "${entryName}"`)) {
      hasErrors = true;
    }
  }

  return !hasErrors;
}

async function validatePathAliases() {
  info("Validating path aliases consistency...");

  const configs = [
    {
      name: "tsconfig.json",
      file: resolve(rootDir, "tsconfig.json"),
      parser: async (filePath) => {
        const content = readFileSync(filePath, "utf-8");
        const config = JSON.parse(content);
        return config.compilerOptions?.paths || {};
      },
    },
    {
      name: "vite.config.ts",
      file: resolve(rootDir, "vite.config.ts"),
      parser: async (filePath) =>
        extractPathAliases(filePath, "vite.config.ts"),
    },
    {
      name: "Storybook main.ts",
      file: resolve(rootDir, "apps/storybook/.storybook/main.ts"),
      parser: async (filePath) =>
        extractPathAliases(filePath, "Storybook main.ts"),
    },
    {
      name: "VitePress config.ts",
      file: resolve(rootDir, "apps/docs/.vitepress/config.ts"),
      parser: async (filePath) =>
        extractPathAliases(filePath, "VitePress config.ts"),
    },
  ];

  const allAliases = {};
  let hasErrors = false;

  // Load all alias configurations
  for (const config of configs) {
    try {
      allAliases[config.name] = await config.parser(config.file);
    } catch (err) {
      error(`Failed to load ${config.name}: ${err.message}`);
      hasErrors = true;
    }
  }

  if (hasErrors) return false;

  // Get reference aliases from TypeScript config
  const referenceAliases = allAliases["tsconfig.json"];
  const requiredAliases = [
    "@/*",
    "@/components/*",
    "@/core/*",
    "@/hooks/*",
    "@/styles/*",
    "@/tokens/*",
    "@/types/*",
  ];

  // Check each config for consistency
  for (const [configName, aliases] of Object.entries(allAliases)) {
    if (configName === "tsconfig.json") continue;

    for (const requiredAlias of requiredAliases) {
      const aliasKey = requiredAlias.replace("/*", "");
      const hasExactMatch = aliases[requiredAlias];
      const hasBaseMatch = aliases[aliasKey];

      if (!hasExactMatch && !hasBaseMatch) {
        error(
          `${configName} is missing alias: ${requiredAlias} or ${aliasKey}`,
        );
        hasErrors = true;
      }
    }
  }

  return !hasErrors;
}

function validateTypeScriptConfig() {
  info("Validating TypeScript configuration consistency...");

  const tsconfig = loadJson(resolve(rootDir, "tsconfig.json"));
  const tsconfigBase = loadJson(resolve(rootDir, "tsconfig.base.json"));

  let hasErrors = false;

  // Check critical settings consistency
  const criticalSettings = ["target", "module", "moduleResolution"];

  for (const setting of criticalSettings) {
    const mainValue = tsconfig.compilerOptions?.[setting];
    const baseValue = tsconfigBase.compilerOptions?.[setting];

    if (mainValue && baseValue && mainValue !== baseValue) {
      error(
        `TypeScript config mismatch: ${setting} is "${mainValue}" in tsconfig.json but "${baseValue}" in tsconfig.base.json`,
      );
      hasErrors = true;
    }
  }

  // Validate modern settings
  if (tsconfig.compilerOptions?.moduleResolution !== "bundler") {
    warn(
      'Consider using "moduleResolution": "bundler" for better Vite compatibility',
    );
  }

  return !hasErrors;
}

async function main() {
  log(colors.bold + colors.cyan, "🔍 Build Configuration Validator");
  log(colors.cyan, "=====================================\n");

  const validations = [
    { name: "TypeScript Configuration", fn: validateTypeScriptConfig },
    { name: "Entry Point Files", fn: validateEntryPointFiles },
    { name: "Exports vs Build Entries", fn: validateExportsBuildEntries },
    { name: "Path Aliases", fn: validatePathAliases },
  ];

  let allValid = true;

  for (const validation of validations) {
    try {
      const isValid = await validation.fn();
      if (isValid) {
        success(`${validation.name} validation passed`);
      } else {
        allValid = false;
      }
    } catch (err) {
      error(`${validation.name} validation failed: ${err.message}`);
      allValid = false;
    }
    console.log(); // Add spacing
  }

  if (allValid) {
    log(
      colors.bold + colors.green,
      "🎉 All validations passed! Configuration is consistent.",
    );
  } else {
    log(
      colors.bold + colors.red,
      "💥 Configuration validation failed. Please fix the issues above.",
    );
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    error(`Validation script failed: ${err.message}`);
    process.exit(1);
  });
}

export { main as validateBuildConfig };
