#!/usr/bin/env node

/**
 * Build Configuration Validation Script
 *
 * Validates consistency between:
 * - Vite build entries in vite.config.mts
 * - package.json exports
 * - Actual file existence
 * - Path aliases across all build tools
 * - Required plugin dependencies
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

    // Read vite.config.mts (extract configuration)
    const viteConfigPath = resolve(ROOT_DIR, "vite.config.mts");
    if (!existsSync(viteConfigPath)) {
      logError(
        "vite.config.mts not found - this is the required configuration file",
      );
      process.exit(1);
    }
    const viteConfigContent = readFileSync(viteConfigPath, "utf8");
    if (viteConfigContent.trim().length === 0) {
      logError("vite.config.mts is empty - configuration is required");
      process.exit(1);
    }
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

    // Read Mintlify docs.json (instead of VitePress)
    const mintlifyConfigPath = resolve(ROOT_DIR, "apps/docs/docs.json");
    if (existsSync(mintlifyConfigPath)) {
      const mintlifyContent = readFileSync(mintlifyConfigPath, "utf8");
      configs.mintlifyContent = mintlifyContent;
    } else {
      logWarning("Mintlify docs.json not found - skipping documentation validation");
      configs.mintlifyContent = null;
    }

    return configs;
  } catch (error) {
    logError(`Failed to read configuration files: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Extract Vite build entries from vite.config.mts content
 */
function extractViteBuildEntries(viteConfigContent) {
  const entries = {};

  // Find the entry object in build.lib configuration
  // Need to handle nested braces and multiline strings carefully
  const entryStartMatch = viteConfigContent.match(/entry:\s*{/);
  if (!entryStartMatch) {
    logError("Could not find build.lib.entry configuration in vite.config.mts");
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

  // Extract from Mintlify config - handle relative paths
  if (configs.mintlifyContent) {
    try {
      const mintlifyConfig = JSON.parse(configs.mintlifyContent);
      // Mintlify doesn't typically have Vite aliases, but we can check for any path configurations
      if (mintlifyConfig.navigation) {
        logInfo("Mintlify navigation configuration found");
      }
    } catch (error) {
      logWarning("Failed to parse Mintlify config: " + error.message);
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
    const expectedTypesPath = `./dist/libs/components/${bundleName}.d.ts`;

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
 * Validate required plugin dependencies
 */
function validatePluginDependencies(packageJson) {
  logInfo("Validating required plugin dependencies...");

  const requiredPlugins = [
    "vite-tsconfig-paths",
    "vite-plugin-dts",
    "@vitejs/plugin-react",
    "rollup-plugin-visualizer",
    "vite-plugin-compression2",
  ];

  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const missingPlugins = [];

  requiredPlugins.forEach((plugin) => {
    if (!allDependencies[plugin]) {
      missingPlugins.push(plugin);
    }
  });

  if (missingPlugins.length > 0) {
    logError(
      `Missing required plugin dependencies: ${missingPlugins.join(", ")}`,
    );
    logError(
      "Install missing plugins with: bun add -D " + missingPlugins.join(" "),
    );
  } else {
    logSuccess("All required plugin dependencies are installed");
  }

  // Validate plugin versions for critical plugins
  const criticalPlugins = {
    "vite-tsconfig-paths": "^5.0.0",
    "vite-plugin-dts": "^5.0.0",
  };

  Object.entries(criticalPlugins).forEach(([plugin, minVersion]) => {
    const installedVersion = allDependencies[plugin];
    if (installedVersion) {
      // Basic version check (could be enhanced with semver)
      const versionNumber = installedVersion.replace(/[^\d.]/g, "");
      const minVersionNumber = minVersion.replace(/[^\d.]/g, "");

      if (versionNumber < minVersionNumber) {
        logWarning(
          `Plugin ${plugin} version ${installedVersion} may be outdated (minimum: ${minVersion})`,
        );
      }
    }
  });

  logSuccess("Plugin dependency validation completed");
}

/**
 * Validate Vercel configuration
 */
function validateVercelConfiguration() {
  logInfo("Validating Vercel configuration...");

  const vercelConfigPath = resolve(ROOT_DIR, "vercel.json");
  if (!existsSync(vercelConfigPath)) {
    logWarning("vercel.json not found - skipping Vercel validation");
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
        build.config?.buildCommand &&
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
 * Validate TypeScript configuration compatibility
 */
function validateTypeScriptConfiguration(tsconfig, viteConfigContent) {
  logInfo("Validating TypeScript configuration compatibility...");

  // Check that tsconfig paths are compatible with Vite
  const tsconfigPaths = tsconfig.compilerOptions?.paths || {};
  const hasWildcardPaths = Object.keys(tsconfigPaths).some((path) =>
    path.includes("*"),
  );

  if (hasWildcardPaths) {
    // Check if vite-tsconfig-paths plugin is being used
    const hasViteTsconfigPaths =
      viteConfigContent.includes("tsconfigPaths()") ||
      viteConfigContent.includes("vite-tsconfig-paths");

    if (!hasViteTsconfigPaths) {
      logError(
        "TypeScript wildcard paths found but vite-tsconfig-paths plugin not configured",
      );
      logError(
        "Add 'import tsconfigPaths from \"vite-tsconfig-paths\"' and 'tsconfigPaths()' to plugins array",
      );
    } else {
      logSuccess(
        "TypeScript wildcard paths properly configured with vite-tsconfig-paths",
      );
    }
  }

  // Validate TypeScript target compatibility
  const target = tsconfig.compilerOptions?.target;
  if (target && !["ES2021", "ES2022", "ESNext"].includes(target)) {
    logWarning(
      `TypeScript target "${target}" may not be optimal for modern builds. Consider ES2021 or ES2022`,
    );
  }

  // Check module resolution
  const moduleResolution = tsconfig.compilerOptions?.moduleResolution;
  if (moduleResolution !== "bundler" && moduleResolution !== "node") {
    logWarning(
      `TypeScript moduleResolution "${moduleResolution}" may cause issues with Vite`,
    );
  }

  logSuccess("TypeScript configuration validation completed");
}

/**
 * Validate TypeScript configuration structure and values
 */
function validateTypeScriptConfigStructure(tsconfig) {
  logInfo("Validating TypeScript configuration structure...");

  // Check moduleResolution value
  const moduleResolution = tsconfig.compilerOptions?.moduleResolution;
  if (moduleResolution === undefined) {
    logError("TypeScript moduleResolution is not set");
  } else if (typeof moduleResolution !== "string") {
    logError(
      `TypeScript moduleResolution must be a string, got: ${typeof moduleResolution}`,
    );
  } else if (!["node", "bundler", "classic"].includes(moduleResolution)) {
    logError(
      `Invalid TypeScript moduleResolution value: "${moduleResolution}". Must be one of: "node", "bundler", "classic"`,
    );
  } else {
    logSuccess(`TypeScript moduleResolution is valid: "${moduleResolution}"`);
  }

  // Check for invalid empty objects
  Object.entries(tsconfig.compilerOptions || {}).forEach(([key, value]) => {
    if (
      value !== null &&
      typeof value === "object" &&
      Object.keys(value).length === 0
    ) {
      logError(
        `TypeScript compiler option "${key}" has invalid empty object value`,
      );
    }
  });

  // Validate JSON structure
  try {
    JSON.stringify(tsconfig);
    logSuccess("TypeScript configuration has valid JSON structure");
  } catch (error) {
    logError(
      `TypeScript configuration has invalid JSON structure: ${error.message}`,
    );
  }

  logSuccess("TypeScript configuration structure validation completed");
}

/**
 * Validate DTS plugin configuration in Vite
 */
function validateDTSPluginConfiguration(viteConfigContent) {
  logInfo("Validating DTS plugin configuration...");

  // Check for duplicate moduleResolution properties
  const moduleResolutionMatches = viteConfigContent.match(
    /moduleResolution:\s*["']([^"']+)["']/g,
  );
  if (moduleResolutionMatches && moduleResolutionMatches.length > 1) {
    logError(
      "Duplicate moduleResolution properties found in DTS plugin configuration",
    );
    logError("Remove duplicate moduleResolution from DTS plugin options");
  }

  // Check for invalid DTS plugin options
  const invalidOptions = [
    "generateDeclarationMap: true",
    'moduleResolution: "node"',
  ];

  invalidOptions.forEach((option) => {
    if (viteConfigContent.includes(option)) {
      logError(`Invalid DTS plugin option found: "${option}"`);
    }
  });

  // Check for valid DTS plugin structure
  if (!viteConfigContent.includes("dts({")) {
    logError("DTS plugin configuration not found in vite.config.mts");
  } else {
    logSuccess("DTS plugin configuration found");
  }

  logSuccess("DTS plugin configuration validation completed");
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
  validatePluginDependencies(configs.packageJson);
  validateBuildEntries(viteEntries, configs.packageJson.exports);
  validateFileExistence(viteEntries);
  validatePathAliases(pathAliases);
  validateBundleStructure(viteEntries, configs.packageJson.exports);
  validateTypeScriptConfiguration(configs.tsconfig, configs.viteConfigContent);
  validateTypeScriptConfigStructure(configs.tsconfig);
  validateDTSPluginConfiguration(configs.viteConfigContent);
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
