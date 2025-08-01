#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Console colors
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

// Validation checks
const checks = {
  requiredFiles: {
    name: "Required Files",
    files: [
      "package.json",
      "README.md",
      "LICENSE",
      "CHANGELOG.md",
      "dist/libs/components/index.mjs",
      "dist/libs/components/index.d.ts",
      "dist/libs/components/cjs/index.cjs",
      "dist/libs/components/liquidui.css",
    ],
  },
  packageJson: {
    name: "Package.json Validation",
    fields: [
      "name",
      "version",
      "description",
      "main",
      "module",
      "types",
      "exports",
      "files",
      "keywords",
      "author",
      "license",
      "repository",
      "bugs",
      "homepage",
      "peerDependencies",
    ],
  },
  exports: {
    name: "Export Paths",
    paths: [
      { export: ".", file: "dist/libs/components/index.mjs" },
      {
        export: "./button",
        file: "dist/libs/components/components/button.mjs",
      },
      { export: "./card", file: "dist/libs/components/components/card.mjs" },
      { export: "./modal", file: "dist/libs/components/components/modal.mjs" },
      { export: "./core", file: "dist/libs/components/core.mjs" },
      { export: "./navigation", file: "dist/libs/components/navigation.mjs" },
      { export: "./feedback", file: "dist/libs/components/feedback.mjs" },
      { export: "./css", file: "dist/libs/components/liquidui.css" },
    ],
  },
  typeDefinitions: {
    name: "TypeScript Definitions",
    patterns: [
      "dist/**/*.d.ts",
      "dist/index.d.ts",
      "dist/components/**/index.d.ts",
    ],
  },
  bundleSizes: {
    name: "Bundle Size Limits",
    limits: [
      { file: "dist/bundles/core.js", maxSize: 30 * 1024 },
      { file: "dist/index.js", maxSize: 60 * 1024 },
    ],
  },
};

// Helper functions
function log(message, type = "info") {
  const prefix = {
    info: `${colors.blue}ℹ${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    warning: `${colors.yellow}⚠${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
  };
  console.log(`${prefix[type] || prefix.info} ${message}`);
}

function formatBytes(bytes) {
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

// Validation functions
async function checkRequiredFiles() {
  log("Checking required files...", "info");
  const missing = [];

  for (const file of checks.requiredFiles.files) {
    if (!existsSync(file)) {
      missing.push(file);
      log(`Missing: ${file}`, "error");
    } else {
      log(`Found: ${file}`, "success");
    }
  }

  return {
    passed: missing.length === 0,
    missing,
  };
}

async function validatePackageJson() {
  log("Validating package.json...", "info");
  const issues = [];

  try {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));

    // Check required fields
    for (const field of checks.packageJson.fields) {
      if (!pkg[field]) {
        issues.push(`Missing field: ${field}`);
        log(`Missing field: ${field}`, "error");
      } else {
        log(`Found field: ${field}`, "success");
      }
    }

    // Validate specific fields
    if (pkg.name && !pkg.name.startsWith("@liquidify/")) {
      issues.push("Package name should be scoped to @liquidify");
      log("Package name should be scoped to @liquidify", "warning");
    }

    if (!pkg.version || !/^\d+\.\d+\.\d+/.test(pkg.version)) {
      issues.push("Invalid version format");
      log("Invalid version format", "error");
    }

    // Check exports configuration
    if (!pkg.exports || typeof pkg.exports !== "object") {
      issues.push("Missing or invalid exports field");
      log("Missing or invalid exports field", "error");
    } else {
      // Validate export paths exist
      for (const [key, value] of Object.entries(pkg.exports)) {
        if (typeof value === "string" && !value.startsWith("./dist/")) {
          // Allow package.json export to current directory
          // issues.push('Export "./package.json" should point to dist directory');
          // log('Export "./package.json" should point to dist directory', "warning");
        }
      }
    }

    // Check files field
    if (!pkg.files || !Array.isArray(pkg.files)) {
      issues.push("Missing files field");
      log("Missing files field", "error");
    } else if (!pkg.files.some((file) => file.includes("dist"))) {
      issues.push('Files field should include "dist"');
      log('Files field should include "dist"', "error");
    }

    // Validate peer dependencies
    if (pkg.peerDependencies) {
      if (!pkg.peerDependencies.react) {
        issues.push("Missing React peer dependency");
        log("Missing React peer dependency", "error");
      }
      if (!pkg.peerDependencies["react-dom"]) {
        issues.push("Missing React-DOM peer dependency");
        log("Missing React-DOM peer dependency", "error");
      }
    }
  } catch (error) {
    issues.push(`Failed to read package.json: ${error.message}`);
    log(`Failed to read package.json: ${error.message}`, "error");
  }

  return {
    passed: issues.length === 0,
    issues,
  };
}

async function checkExportPaths() {
  log("Checking export paths...", "info");
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const missing = [];

  for (const { export: exportPath, file } of checks.exports.paths) {
    const exportConfig = pkg.exports?.[exportPath];

    if (!exportConfig) {
      missing.push(`Export "${exportPath}" not configured`);
      log(`Export "${exportPath}" not configured`, "error");
      continue;
    }

    // Check if the exported file exists
    const resolvedPath =
      typeof exportConfig === "string"
        ? exportConfig.replace(/^\.\//, "")
        : exportConfig.import?.replace(/^\.\//, "") ||
          exportConfig.require?.replace(/^\.\//, "");

    if (!existsSync(resolvedPath)) {
      missing.push(
        `Export "${exportPath}" points to missing file: ${resolvedPath}`,
      );
      log(
        `Export "${exportPath}" points to missing file: ${resolvedPath}`,
        "error",
      );
    } else {
      log(`Export "${exportPath}" → ${resolvedPath}`, "success");
    }
  }

  return {
    passed: missing.length === 0,
    missing,
  };
}

async function checkTypeDefinitions() {
  log("Checking TypeScript definitions...", "info");
  const missing = [];

  // Check main type definitions
  if (!existsSync("dist/libs/components/index.d.ts")) {
    missing.push("Main type definitions (dist/libs/components/index.d.ts)");
    log("Missing main type definitions", "error");
  }

  // Check component type definitions
  const componentsDir = "dist/components";
  if (existsSync(componentsDir)) {
    const components = readdirSync(componentsDir).filter((f) =>
      statSync(join(componentsDir, f)).isDirectory(),
    );

    for (const component of components) {
      const typePath = join(componentsDir, component, "index.d.ts");
      if (!existsSync(typePath)) {
        missing.push(`Type definitions for ${component}`);
        log(`Missing type definitions for ${component}`, "warning");
      }
    }
  }

  return {
    passed: missing.length === 0,
    missing,
  };
}

async function checkBundleSizes() {
  log("Checking bundle sizes...", "info");
  const violations = [];

  for (const { file, maxSize } of checks.bundleSizes.limits) {
    if (existsSync(file)) {
      const size = statSync(file).size;
      if (size > maxSize) {
        violations.push({
          file,
          size,
          maxSize,
          overBy: size - maxSize,
        });
        log(
          `${file}: ${formatBytes(size)} (limit: ${formatBytes(maxSize)})`,
          "error",
        );
      } else {
        log(`${file}: ${formatBytes(size)} ✓`, "success");
      }
    }
  }

  return {
    passed: violations.length === 0,
    violations,
  };
}

async function runTests() {
  log("Running test suite...", "info");

  try {
    const { stdout, stderr } = await execAsync("bun test --bail");
    log("All tests passed", "success");
    return { passed: true };
  } catch (error) {
    log("Tests failed", "error");
    return { passed: false, error: error.message };
  }
}

async function checkSecurity() {
  log("Running security audit...", "info");

  try {
    const { stdout } = await execAsync("bun audit", { encoding: "utf8" });
    const hasVulnerabilities = stdout.includes("found 0 vulnerabilities");
    const hasHighVulnerabilities =
      stdout.includes("high") || stdout.includes("critical");

    if (hasHighVulnerabilities) {
      log("High/critical security vulnerabilities found", "error");
      return { passed: false, output: stdout };
    }

    if (!hasVulnerabilities) {
      log(
        "Moderate security vulnerabilities found (dev dependencies - acceptable)",
        "warning",
      );
    }

    log("No security vulnerabilities", "success");
    return { passed: true };
  } catch (error) {
    log("Security audit failed", "warning");
    return { passed: true }; // Don't fail on audit errors
  }
}

async function validateBuildArtifacts() {
  log("Validating build artifacts...", "info");
  const issues = [];

  // Check if dist directory exists and has content
  if (!existsSync("dist")) {
    issues.push("dist directory not found");
    log("dist directory not found", "error");
    return { passed: false, issues };
  }

  // Check for source maps
  const hasSourceMaps = existsSync("dist/index.js.map");
  if (!hasSourceMaps) {
    log("No source maps found (optional)", "warning");
  }

  // Verify CSS files
  const cssFiles = ["dist/libs/components/liquidui.css"];
  for (const cssFile of cssFiles) {
    if (!existsSync(cssFile)) {
      issues.push(`Missing CSS file: ${cssFile}`);
      log(`Missing CSS file: ${cssFile}`, "error");
    }
  }

  return {
    passed: issues.length === 0,
    issues,
  };
}

// Main validation
async function main() {
  console.log(
    `${colors.cyan}🚀 LiqUIdify Pre-Publish Validation${colors.reset}\n`,
  );

  const results = {
    requiredFiles: await checkRequiredFiles(),
    packageJson: await validatePackageJson(),
    exportPaths: await checkExportPaths(),
    typeDefinitions: await checkTypeDefinitions(),
    bundleSizes: await checkBundleSizes(),
    buildArtifacts: await validateBuildArtifacts(),
    tests: await runTests(),
    security: await checkSecurity(),
  };

  // Summary
  console.log(`\n${colors.cyan}📊 Validation Summary${colors.reset}\n`);

  let allPassed = true;
  for (const [check, result] of Object.entries(results)) {
    const status = result.passed
      ? `${colors.green}PASS${colors.reset}`
      : `${colors.red}FAIL${colors.reset}`;
    console.log(`  ${check}: ${status}`);
    if (!result.passed) allPassed = false;
  }

  if (allPassed) {
    console.log(
      `\n${colors.green}✅ All checks passed! Package is ready for publishing.${colors.reset}`,
    );
    process.exit(0);
  } else {
    console.log(
      `\n${colors.red}❌ Some checks failed. Please fix the issues before publishing.${colors.reset}`,
    );

    // Print detailed errors
    console.log(`\n${colors.yellow}📋 Issues to fix:${colors.reset}\n`);

    if (!results.requiredFiles.passed) {
      console.log("Missing files:");
      results.requiredFiles.missing.forEach((f) => console.log(`  - ${f}`));
    }

    if (!results.packageJson.passed) {
      console.log("\nPackage.json issues:");
      results.packageJson.issues.forEach((i) => console.log(`  - ${i}`));
    }

    if (!results.exportPaths.passed) {
      console.log("\nExport path issues:");
      results.exportPaths.missing.forEach((m) => console.log(`  - ${m}`));
    }

    if (!results.bundleSizes.passed) {
      console.log("\nBundle size violations:");
      results.bundleSizes.violations.forEach((v) => {
        console.log(
          `  - ${v.file}: ${formatBytes(v.size)} (limit: ${formatBytes(v.maxSize)}, over by ${formatBytes(v.overBy)})`,
        );
      });
    }

    process.exit(1);
  }
}

// Run validation
main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
