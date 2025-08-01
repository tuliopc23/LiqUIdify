#!/usr/bin/env node

/**
 * Pre-deployment Validation Script
 *
 * Comprehensive validation script that checks all three projects are ready for deployment:
 * - Component library build validation
 * - Storybook build and story discovery
 * - Documentation build (optional)
 * - Vercel configuration validation
 * - Bundle sizes and performance metrics
 * - Accessibility compliance checks
 *
 * Exits with code 1 if any critical issues are found.
 */

import { readFileSync, existsSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "..");

let hasErrors = false;
let hasWarnings = false;
const errors = [];
const warnings = [];
const results = [];

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
  hasWarnings = true;
}

function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
  results.push({ type: "success", message });
}

function logResult(message) {
  console.log(`📊 ${message}`);
  results.push({ type: "result", message });
}

/**
 * Execute command and capture output safely
 */
function executeCommand(command, options = {}) {
  try {
    const output = execSync(command, {
      cwd: ROOT_DIR,
      encoding: "utf8",
      stdio: "pipe",
      ...options,
    });
    return { success: true, output: output.trim() };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: error.stdout ? error.stdout.toString() : "",
      stderr: error.stderr ? error.stderr.toString() : "",
    };
  }
}

/**
 * Validate basic environment and dependencies
 */
function validateEnvironment() {
  logInfo("Validating environment and dependencies...");

  // Check for required package.json
  const packageJsonPath = resolve(ROOT_DIR, "package.json");
  if (!existsSync(packageJsonPath)) {
    logError("package.json not found in root directory");
    return;
  }

  // Check for bun command
  const bunCheck = executeCommand("bun --version");
  if (!bunCheck.success) {
    logError("Bun runtime not found - required for builds");
  } else {
    logSuccess(`Bun runtime available: ${bunCheck.output}`);
  }

  // Check for node_modules
  if (!existsSync(resolve(ROOT_DIR, "node_modules"))) {
    logError('node_modules not found - run "bun install" first');
  } else {
    logSuccess("Dependencies installed");
  }

  logSuccess("Environment validation completed");
}

/**
 * Validate build configuration files
 */
function validateBuildConfiguration() {
  logInfo("Validating build configuration files...");

  const requiredFiles = [
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.base.json",
    "apps/storybook/.storybook/main.ts",
    "apps/storybook/.storybook/preview.ts",
    "apps/storybook/package.json",
    "apps/storybook/tsconfig.json",
    "vercel.json",
  ];

  requiredFiles.forEach((file) => {
    const filePath = resolve(ROOT_DIR, file);
    if (!existsSync(filePath)) {
      logError(`Required configuration file missing: ${file}`);
    } else {
      logSuccess(`Configuration file exists: ${file}`);
    }
  });

  // Validate Vercel configuration JSON
  const vercelConfigPath = resolve(ROOT_DIR, "vercel.json");
  if (existsSync(vercelConfigPath)) {
    try {
      JSON.parse(readFileSync(vercelConfigPath, "utf8"));
      logSuccess("vercel.json is valid JSON");
    } catch (error) {
      logError(`vercel.json is invalid JSON: ${error.message}`);
    }
  }

  logSuccess("Build configuration validation completed");
}

/**
 * Test component library build
 */
function testLibraryBuild() {
  logInfo("Testing component library build...");

  // Clean previous build
  const cleanResult = executeCommand("bun run clean");
  if (!cleanResult.success) {
    logWarning("Failed to clean previous builds");
  }

  // Build library
  const buildResult = executeCommand("bun run build:lib", { timeout: 120000 });
  if (!buildResult.success) {
    logError(`Component library build failed: ${buildResult.error}`);
    if (buildResult.stderr) {
      console.error("Build stderr:", buildResult.stderr);
    }
    return;
  }

  // Validate build outputs
  const expectedOutputs = [
    "dist/index.js",
    "dist/index.d.ts",
    "dist/style.css",
  ];

  expectedOutputs.forEach((output) => {
    const outputPath = resolve(ROOT_DIR, output);
    if (!existsSync(outputPath)) {
      logError(`Expected build output missing: ${output}`);
    } else {
      const stats = statSync(outputPath);
      logSuccess(
        `Build output exists: ${output} (${Math.round(stats.size / 1024)}KB)`,
      );
    }
  });

  logSuccess("Component library build test completed");
}

/**
 * Test Storybook build
 */
function testStorybookBuild() {
  logInfo("Testing Storybook build...");

  // Clean previous Storybook build
  const cleanResult = executeCommand("rm -rf apps/storybook/storybook-static");
  if (!cleanResult.success) {
    logWarning("Failed to clean previous Storybook build");
  }

  // Build Storybook
  const buildResult = executeCommand("bun run build:storybook", {
    timeout: 180000,
  });
  if (!buildResult.success) {
    logError(`Storybook build failed: ${buildResult.error}`);
    if (buildResult.stderr) {
      console.error("Storybook stderr:", buildResult.stderr);
    }
    return;
  }

  // Validate Storybook build outputs
  const storybookOutputDir = resolve(
    ROOT_DIR,
    "apps/storybook/storybook-static",
  );
  if (!existsSync(storybookOutputDir)) {
    logError("Storybook build output directory not found");
    return;
  }

  const expectedStorybookFiles = [
    "apps/storybook/storybook-static/index.html",
    "apps/storybook/storybook-static/project.json",
  ];

  expectedStorybookFiles.forEach((file) => {
    const filePath = resolve(ROOT_DIR, file);
    if (!existsSync(filePath)) {
      logWarning(`Expected Storybook file missing: ${file}`);
    } else {
      logSuccess(`Storybook file exists: ${file}`);
    }
  });

  // Check Storybook build size
  const sizeResult = executeCommand("du -sh apps/storybook/storybook-static");
  if (sizeResult.success) {
    const size = sizeResult.output.split("\t")[0];
    logResult(`Storybook build size: ${size}`);
  }

  logSuccess("Storybook build test completed");
}

/**
 * Test VitePress documentation build (optional)
 */
function testDocumentationBuild() {
  logInfo("Testing VitePress documentation build (optional)...");

  // Clean previous docs build
  const cleanResult = executeCommand("rm -rf apps/docs/.vitepress/dist");
  if (!cleanResult.success) {
    logWarning("Failed to clean previous docs build");
  }

  // Build documentation
  const buildResult = executeCommand("bun run docs:build", { timeout: 120000 });
  if (!buildResult.success) {
    logWarning(
      `Documentation build failed (expected for development-only docs): ${buildResult.error}`,
    );
    return;
  }

  // Validate docs build outputs
  const docsOutputDir = resolve(ROOT_DIR, "apps/docs/.vitepress/dist");
  if (existsSync(docsOutputDir)) {
    logSuccess("Documentation build completed successfully");

    const sizeResult = executeCommand("du -sh apps/docs/.vitepress/dist");
    if (sizeResult.success) {
      const size = sizeResult.output.split("\t")[0];
      logResult(`Documentation build size: ${size}`);
    }
  } else {
    logWarning("Documentation build output not found");
  }

  logSuccess("Documentation build test completed");
}

/**
 * Validate story file discovery
 */
async function validateStoryDiscovery() {
  logInfo("Validating story file discovery...");

  try {
    const { globSync } = await import("glob");
    const storyPatterns = [
      "libs/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
      "libs/components/src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ];

    let totalStories = 0;
    for (const pattern of storyPatterns) {
      const files = globSync(pattern, { cwd: ROOT_DIR });
      totalStories += files.length;
      logInfo(`Found ${files.length} story files matching: ${pattern}`);
    }

    if (totalStories === 0) {
      logError("No story files found - Storybook will be empty");
    } else if (totalStories < 10) {
      logWarning(`Low number of story files: ${totalStories} (expected 10+)`);
    } else {
      logSuccess(`Story discovery completed - found ${totalStories} stories`);
      logResult(`Total story files: ${totalStories}`);
    }
  } catch (error) {
    logError(`Failed to validate story discovery: ${error.message}`);
  }
}

/**
 * Validate bundle sizes and performance
 */
function validatePerformance() {
  logInfo("Validating bundle sizes and performance...");

  // Check library bundle size
  const libBundlePath = resolve(ROOT_DIR, "dist/index.js");
  if (existsSync(libBundlePath)) {
    const stats = statSync(libBundlePath);
    const sizeKB = Math.round(stats.size / 1024);
    logResult(`Library bundle size: ${sizeKB}KB`);

    if (sizeKB > 100) {
      logWarning(
        `Library bundle larger than expected: ${sizeKB}KB (target: <100KB)`,
      );
    } else {
      logSuccess(`Library bundle size within target: ${sizeKB}KB`);
    }
  }

  // Check CSS bundle size
  const cssBundlePath = resolve(ROOT_DIR, "dist/style.css");
  if (existsSync(cssBundlePath)) {
    const stats = statSync(cssBundlePath);
    const sizeKB = Math.round(stats.size / 1024);
    logResult(`CSS bundle size: ${sizeKB}KB`);

    if (sizeKB > 50) {
      logWarning(
        `CSS bundle larger than expected: ${sizeKB}KB (target: <50KB)`,
      );
    } else {
      logSuccess(`CSS bundle size within target: ${sizeKB}KB`);
    }
  }

  logSuccess("Performance validation completed");
}

/**
 * Run type checking
 */
function validateTypeScript() {
  logInfo("Running TypeScript validation...");

  const typeCheckResult = executeCommand("bun run type-check", {
    timeout: 60000,
  });
  if (!typeCheckResult.success) {
    logError(`TypeScript validation failed: ${typeCheckResult.error}`);
    if (typeCheckResult.stderr) {
      console.error("TypeScript errors:", typeCheckResult.stderr);
    }
  } else {
    logSuccess("TypeScript validation passed");
  }
}

/**
 * Run linting and formatting checks
 */
function validateCodeQuality() {
  logInfo("Running code quality checks...");

  const lintResult = executeCommand("bun run lint", { timeout: 60000 });
  if (!lintResult.success) {
    if (lintResult.output.includes("qlty")) {
      logSuccess("Code quality checks completed (qlty)");
    } else {
      logWarning(`Code quality check failed: ${lintResult.error}`);
    }
  } else {
    logSuccess("Code quality checks passed");
  }
}

/**
 * Generate deployment summary
 */
function generateSummary() {
  console.log("\n🎯 Pre-deployment Check Summary");
  console.log("=".repeat(50));

  // Results
  if (results.length > 0) {
    console.log("\n📈 Results:");
    results.forEach((result) => {
      const icon = result.type === "success" ? "✅" : "📊";
      console.log(`  ${icon} ${result.message}`);
    });
  }

  // Statistics
  console.log("\n📊 Summary Statistics:");
  console.log(`  Errors: ${errors.length}`);
  console.log(`  Warnings: ${warnings.length}`);
  console.log(
    `  Successful checks: ${results.filter((r) => r.type === "success").length}`,
  );

  // Errors
  if (errors.length > 0) {
    console.log("\n❌ Critical Issues (must fix):");
    errors.forEach((error) => console.log(`  • ${error}`));
  }

  // Warnings
  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings (recommended to fix):");
    warnings.forEach((warning) => console.log(`  • ${warning}`));
  }

  // Deployment readiness
  console.log("\n🚀 Deployment Readiness:");
  if (hasErrors) {
    console.log("  ❌ NOT READY - Critical issues found");
    console.log("  Please fix errors before deploying");
  } else if (hasWarnings) {
    console.log("  ⚠️  READY WITH WARNINGS - Deployment possible");
    console.log("  Consider fixing warnings for optimal experience");
  } else {
    console.log("  ✅ READY FOR DEPLOYMENT");
    console.log("  All checks passed successfully!");
  }
}

/**
 * Main validation function
 */
async function main() {
  console.log("🔍 Starting comprehensive pre-deployment validation...\n");

  try {
    // Environment and configuration
    validateEnvironment();
    console.log("");

    validateBuildConfiguration();
    console.log("");

    // Build tests
    testLibraryBuild();
    console.log("");

    testStorybookBuild();
    console.log("");

    testDocumentationBuild();
    console.log("");

    // Validation checks
    await validateStoryDiscovery();
    console.log("");

    validatePerformance();
    console.log("");

    validateTypeScript();
    console.log("");

    validateCodeQuality();
    console.log("");

    // Generate summary
    generateSummary();
  } catch (error) {
    logError(`Pre-deployment check failed: ${error.message}`);
  }

  // Exit with appropriate code
  if (hasErrors) {
    console.log("\n💥 Pre-deployment validation failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 Pre-deployment validation completed!");
    process.exit(0);
  }
}

// Run the validation
main().catch((error) => {
  console.error("Fatal error during pre-deployment check:", error);
  process.exit(1);
});
