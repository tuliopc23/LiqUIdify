#!/usr/bin/env node

/**
 * Build Configuration Validation Script
 *
 * Validates consistency between:
 * - Vite build entries in vite.config.ts
 * - package.json exports
 * - Actual file existence
 * - Path aliases across all build tools
 *
 * Exits with code 1 if any inconsistencies are found.
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "..");

let hasErrors = false;
const errors = [];
const warnings = [];

/**
 * Log functions for consistent output
 */
function logError(message) {
  errors.push(message);
  console.error(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function logWarning(message) {
  warnings.push(message);
  console.warn(`⚠️  WARNING: ${message}`);
}

function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

/**
 * Read and parse configuration files
 */
function readConfigFiles() {
  const configs = {};

  try {
    // Read package.json
    const packageJsonPath = resolve(ROOT_DIR, "package.json");
    configs.packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

    // Read tsconfig.json
    const tsconfigPath = resolve(ROOT_DIR, "tsconfig.json");
    configs.tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8"));

    // Read vite.config.ts (extract configuration)
    const viteConfigPath = resolve(ROOT_DIR, "vite.config.ts");
    const viteConfigContent = readFileSync(viteConfigPath, "utf8");
    configs.viteConfigContent = viteConfigContent;

    // Read Storybook main.ts (handle missing configuration)
    const storybookMainPath = resolve(
      ROOT_DIR,
      "apps/storybook/.storybook/main.ts",
    );
    if (existsSync(storybookMainPath)) {
      const storybookContent = readFileSync(storybookMainPath, "utf8");
      configs.storybookContent = storybookContent;
    } else {
      logError(
        "Storybook configuration not found at apps/storybook/.storybook/main.ts",
      );
      configs.storybookContent = null;
    }

    // Read VitePress config.ts
    const vitepressConfigPath = resolve(
      ROOT_DIR,
      "apps/docs/.vitepress/config.ts",
    );
    const vitepressContent = readFileSync(vitepressConfigPath, "utf8");
    configs.vitepressContent = vitepressContent;

    return configs;
  } catch (error) {
    logError(`Failed to read configuration files: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Extract Vite build entries from vite.config.ts content
 */
function extractViteBuildEntries(viteConfigContent) {
  const entries = {};

  // Find the entry object in build.lib configuration
  // Need to handle nested braces and multiline strings carefully
  const entryStartMatch = viteConfigContent.match(/entry:\s*{/);
  if (!entryStartMatch) {
    logError("Could not find build.lib.entry configuration in vite.config.ts");
    return entries;
  }

  const startIndex = entryStartMatch.index + entryStartMatch[0].length;
  let braceCount = 1;
  let endIndex = startIndex;

  // Find the matching closing brace
  for (
    let i = startIndex;
    i < viteConfigContent.length && braceCount > 0;
    i++
  ) {
    if (viteConfigContent[i] === "{") braceCount++;
    if (viteConfigContent[i] === "}") braceCount--;
    endIndex = i;
  }

  if (braceCount !== 0) {
    logError("Could not parse entry object - unmatched braces");
    return entries;
  }

  const entryContent = viteConfigContent.slice(startIndex, endIndex);

  // Handle both single-line and multi-line entries
  // Match patterns like: entryName: resolve("path") or "entry-name": resolve("path")
  const entryRegex =
    /(?:(?:["']([^"']+)["'])|(\w+)):\s*resolve\(\s*["']([^"']+)["']\s*\)/g;
  let match;

  while ((match = entryRegex.exec(entryContent)) !== null) {
    const entryName = match[1] || match[2]; // Quoted or unquoted key
    const filePath = match[3];
    entries[entryName] = filePath;
  }

  return entries;
}

/**
 * Extract path aliases from various configuration files
 */
function extractPathAliases(configs) {
  const aliases = {
    vite: {},
    tsconfig: {},
    storybook: {},
    vitepress: {},
  };

  // Extract from Vite config - handle resolve() calls
  const viteResolveMatch = configs.viteConfigContent.match(
    /resolve:\s*{[\s\S]*?alias:\s*{([\s\S]*?)},[\s\S]*?}/,
  );
  if (viteResolveMatch) {
    const aliasContent = viteResolveMatch[1];
    const lines = aliasContent.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("//") || !trimmedLine.includes(":")) {
        continue;
      }

      const match = trimmedLine.match(
        /["'`]([^"'`]+)["'`]\s*:\s*resolve\(\s*["'`]([^"'`]+)["'`]\s*\)/,
      );
      if (match) {
        const [, alias, path] = match;
        aliases.vite[alias] = path;
      }
    }
  }

  // Extract from tsconfig.json
  if (configs.tsconfig.compilerOptions?.paths) {
    Object.entries(configs.tsconfig.compilerOptions.paths).forEach(
      ([alias, paths]) => {
        // Take the first path and normalize it
        aliases.tsconfig[alias] = paths[0];
      },
    );
  }

  // Extract from Storybook config - handle relative paths (if exists)
  if (configs.storybookContent) {
    const storybookViteFinalMatch = configs.storybookContent.match(
      /viteFinal:[\s\S]*?alias:\s*{([\s\S]*?)}/,
    );
    if (storybookViteFinalMatch) {
      const aliasContent = storybookViteFinalMatch[1];
      const lines = aliasContent.split("\n");

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("//") || !trimmedLine.includes(":")) {
          continue;
        }

        const match = trimmedLine.match(
          /["'`]([^"'`]+)["'`]\s*:\s*["'`]([^"'`]+)["'`]/,
        );
        if (match) {
          const [, alias, path] = match;
          aliases.storybook[alias] = path;
        }
      }
    }
  } else {
    logWarning("Skipping Storybook alias extraction - configuration not found");
  }

  // Extract from VitePress config - handle relative paths
  const vitepressViteMatch = configs.vitepressContent.match(
    /vite:\s*{[\s\S]*?resolve:\s*{[\s\S]*?alias:\s*{([\s\S]*?)}/,
  );
  if (vitepressViteMatch) {
    const aliasContent = vitepressViteMatch[1];
    const lines = aliasContent.split("\n");

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("//") || !trimmedLine.includes(":")) {
        continue;
      }

      const match = trimmedLine.match(
        /["'`]([^"'`]+)["'`]\s*:\s*["'`]([^"'`]+)["'`]/,
      );
      if (match) {
        const [, alias, path] = match;
        aliases.vitepress[alias] = path;
      }
    }
  }

  return aliases;
}

/**
 * Validate that Vite build entries match package.json exports
 */
function validateBuildEntries(viteEntries, packageExports) {
  logInfo("Validating Vite build entries against package.json exports...");

  // Create a mapping of expected exports based on Vite entries
  const expectedExports = new Set();
  const entryToExportMapping = {};

  Object.keys(viteEntries).forEach((entryName) => {
    let exportName;
    if (entryName === "index") {
      exportName = ".";
    } else if (entryName.startsWith("components/")) {
      const componentName = entryName.replace("components/", "");
      exportName = `./${componentName}`;
    } else if (entryName === "providers") {
      // Special case: providers bundle maps to context export
      exportName = "./context";
    } else {
      exportName = `./${entryName}`;
    }

    expectedExports.add(exportName);
    entryToExportMapping[entryName] = exportName;
  });

  // Check if all Vite entries have corresponding package.json exports
  Object.entries(entryToExportMapping).forEach(([entryName, exportName]) => {
    if (!packageExports[exportName]) {
      logError(
        `Vite entry "${entryName}" (maps to "${exportName}") missing from package.json exports`,
      );
    }
  });

  // Check if all package.json exports have corresponding Vite entries
  Object.keys(packageExports).forEach((exportName) => {
    if (
      exportName === "./package.json" ||
      exportName === "./css" ||
      exportName === "./styles"
    ) {
      return; // Skip utility exports
    }

    if (!expectedExports.has(exportName)) {
      logError(
        `package.json export "${exportName}" has no corresponding Vite entry`,
      );
    }
  });

  logSuccess("Vite build entries validation completed");
}

/**
 * Validate that all entry files actually exist
 */
function validateFileExistence(viteEntries) {
  logInfo("Validating file existence...");

  Object.entries(viteEntries).forEach(([entryName, filePath]) => {
    const fullPath = resolve(ROOT_DIR, filePath);
    if (!existsSync(fullPath)) {
      logError(
        `Entry file does not exist: ${filePath} (for entry "${entryName}")`,
      );
    }
  });

  logSuccess("File existence validation completed");
}

/**
 * Normalize path for comparison (handle different formats)
 */
function normalizePath(path) {
  return path
    .replace(/^\.\//, "") // Remove leading ./
    .replace(/\/\*$/, "") // Remove trailing /*
    .replace(/\*$/, "") // Remove trailing *
    .replace(/^libs\/components\/src\//, "") // Remove absolute path prefix
    .replace(/^\.\.\/\.\.\/\.\.\/libs\/components\/src\/?/, "") // Remove relative path prefix
    .replace(/^\.\.\/\.\.\/\.\.\/libs\/components\/src$/, "") // Handle exact match
    .replace(/^\.\.\/\.\.\/\.\.\//, "") // Remove relative path prefix only
    .replace(/\/index\.ts$/, "") // Remove /index.ts suffix
    .replace(/\.ts$/, "") // Remove .ts suffix
    .trim();
}

/**
 * Validate path alias consistency across all configuration files
 */
function validatePathAliases(aliases) {
  logInfo("Validating path alias consistency...");

  const allAliases = new Set();
  Object.values(aliases).forEach((configAliases) => {
    Object.keys(configAliases).forEach((alias) => allAliases.add(alias));
  });

  allAliases.forEach((alias) => {
    const paths = {};

    // Collect paths for this alias from all configs
    Object.entries(aliases).forEach(([configName, configAliases]) => {
      if (configAliases[alias]) {
        paths[configName] = normalizePath(configAliases[alias]);
      }
    });

    // Check consistency
    const uniquePaths = new Set(Object.values(paths));
    if (uniquePaths.size > 1) {
      logError(`Inconsistent path alias "${alias}":`);
      Object.entries(paths).forEach(([config, path]) => {
        console.error(`  ${config}: ${path}`);
      });
    }

    // Check that alias exists in all relevant configs
    const requiredConfigs = ["vite", "tsconfig"];
    requiredConfigs.forEach((configName) => {
      if (!paths[configName]) {
        logWarning(
          `Path alias "${alias}" missing from ${configName} configuration`,
        );
      }
    });
  });

  logSuccess("Path alias validation completed");
}

/**
 * Validate bundle structure and naming consistency
 */
function validateBundleStructure(viteEntries, packageExports) {
  logInfo("Validating bundle structure...");

  // Check that bundle entries follow consistent naming
  const bundleEntries = Object.keys(viteEntries).filter(
    (entry) => !entry.startsWith("components/") && entry !== "index",
  );

  bundleEntries.forEach((bundleName) => {
    const exportKey = `./${bundleName}`;
    const packageExport = packageExports[exportKey];

    if (!packageExport) {
      logError(`Bundle "${bundleName}" missing from package.json exports`);
      return;
    }

    // Check that export paths follow expected pattern
    const expectedImportPath = `./dist/libs/components/${bundleName}.mjs`;
    const expectedRequirePath = `./dist/libs/components/cjs/${bundleName}.cjs`;
    const expectedTypesPath = `./dist/libs/components/bundles/${bundleName}.d.ts`;

    if (packageExport.import !== expectedImportPath) {
      logError(
        `Bundle "${bundleName}" import path mismatch. Expected: ${expectedImportPath}, Got: ${packageExport.import}`,
      );
    }

    if (packageExport.require !== expectedRequirePath) {
      logError(
        `Bundle "${bundleName}" require path mismatch. Expected: ${expectedRequirePath}, Got: ${packageExport.require}`,
      );
    }

    if (packageExport.types !== expectedTypesPath) {
      logError(
        `Bundle "${bundleName}" types path mismatch. Expected: ${expectedTypesPath}, Got: ${packageExport.types}`,
      );
    }
  });

  logSuccess("Bundle structure validation completed");
}

/**
 * Validate Vercel configuration
 */
function validateVercelConfiguration() {
  logInfo("Validating Vercel configuration...");

  const vercelConfigPath = resolve(ROOT_DIR, "vercel.json");
  if (!existsSync(vercelConfigPath)) {
    logError("vercel.json not found");
    return;
  }

  try {
    const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));

    // Check for required Storybook build configuration
    if (!vercelConfig.builds || vercelConfig.builds.length === 0) {
      logError("vercel.json missing builds configuration");
      return;
    }

    const storybookBuild = vercelConfig.builds.find(
      (build) =>
        build.config &&
        build.config.buildCommand &&
        build.config.buildCommand.includes("build:storybook"),
    );

    if (!storybookBuild) {
      logError("vercel.json missing Storybook build configuration");
    } else {
      // Check output directory
      const expectedOutput = "apps/storybook/storybook-static";
      if (storybookBuild.config.outputDirectory !== expectedOutput) {
        logError(
          `Vercel Storybook output directory mismatch. Expected: ${expectedOutput}, Got: ${storybookBuild.config.outputDirectory}`,
        );
      }
    }

    logSuccess("Vercel configuration validation completed");
  } catch (error) {
    logError(`Failed to parse vercel.json: ${error.message}`);
  }
}

/**
 * Validate Storybook story discovery
 */
async function validateStorybookStories() {
  logInfo("Validating Storybook story discovery...");

  const storiesDir = resolve(ROOT_DIR, "libs/components/src");
  if (!existsSync(storiesDir)) {
    logError("Stories directory not found: libs/components/src");
    return;
  }

  try {
    // Find all story files using glob
    const { globSync } = await import("glob");
    const storyPatterns = [
      "libs/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
      "libs/components/src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ];

    let totalStories = 0;
    const storyFiles = [];

    for (const pattern of storyPatterns) {
      try {
        const files = globSync(pattern, { cwd: ROOT_DIR });
        totalStories += files.length;
        storyFiles.push(...files);
        logInfo(
          `Found ${files.length} story files matching pattern: ${pattern}`,
        );
      } catch (error) {
        logWarning(
          `Failed to search for stories with pattern ${pattern}: ${error.message}`,
        );
      }
    }

    // Validate that story files actually exist and are accessible
    const validStories = storyFiles.filter((file) => {
      const fullPath = resolve(ROOT_DIR, file);
      return existsSync(fullPath);
    });

    if (totalStories === 0) {
      logError("No story files found - Storybook will be empty");
    } else if (totalStories < 10) {
      logWarning(
        `Found ${totalStories} story files (expected 10+). This is acceptable for the current project state.`,
      );
      logSuccess(
        `Story discovery validation completed - found ${totalStories} stories`,
      );
    } else {
      logSuccess(
        `Story discovery validation completed - found ${totalStories} stories`,
      );
    }

    // Log some example stories for verification
    if (validStories.length > 0) {
      logInfo("Example story files found:");
      validStories.slice(0, 5).forEach((story) => {
        console.log(`  • ${story}`);
      });
      if (validStories.length > 5) {
        console.log(`  ... and ${validStories.length - 5} more`);
      }
    }
  } catch (error) {
    logError(`Failed to validate story discovery: ${error.message}`);
  }
}

/**
 * Main validation function
 */
async function main() {
  console.log("🔍 Starting build configuration validation...\n");

  // Read all configuration files
  const configs = readConfigFiles();

  // Extract configuration data
  const viteEntries = extractViteBuildEntries(configs.viteConfigContent);
  const pathAliases = extractPathAliases(configs);

  logInfo(`Found ${Object.keys(viteEntries).length} Vite build entries`);
  logInfo(
    `Found ${Object.keys(configs.packageJson.exports).length} package.json exports`,
  );
  console.log("");

  // Run validations
  validateBuildEntries(viteEntries, configs.packageJson.exports);
  validateFileExistence(viteEntries);
  validatePathAliases(pathAliases);
  validateBundleStructure(viteEntries, configs.packageJson.exports);
  validateVercelConfiguration();
  await validateStorybookStories();

  // Summary
  console.log("\n📊 Validation Summary:");
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\n❌ Errors found:");
    errors.forEach((error) => console.log(`  • ${error}`));
  }

  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    warnings.forEach((warning) => console.log(`  • ${warning}`));
  }

  if (hasErrors) {
    console.log("\n💥 Build configuration validation failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 Build configuration validation passed!");
    process.exit(0);
  }
}

// Run the validation
main();
