#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Validate package.json exports against actual build output
 */
function validateExports() {
  console.log("🔍 Validating package.json exports against build output...\n");

  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const distPath = "dist/libs/components";

  const errors = [];
  const warnings = [];

  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    errors.push(`❌ Build output directory not found: ${distPath}`);
    console.log(
      'Please run "bun run build:lib" first to generate the build output.',
    );
    return;
  }

  // Validate main exports
  validateMainExports(packageJson, distPath, errors, warnings);

  // Validate bundle exports
  validateBundleExports(packageJson, distPath, errors, warnings);

  // Validate component exports
  validateComponentExports(packageJson, distPath, errors, warnings);

  // Validate CSS exports
  validateCSSExports(packageJson, distPath, errors, warnings);

  // Validate CJS patterns
  validateCJSPatterns(packageJson, errors, warnings);

  // Report results
  console.log("📊 Validation Results:\n");

  if (errors.length > 0) {
    console.log("❌ ERRORS:");
    errors.forEach((error) => console.log(`  ${error}`));
    console.log("");
  }

  if (warnings.length > 0) {
    console.log("⚠️  WARNINGS:");
    warnings.forEach((warning) => console.log(`  ${warning}`));
    console.log("");
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("✅ All exports are valid and consistent!");
  } else {
    console.log(
      `📈 Summary: ${errors.length} errors, ${warnings.length} warnings`,
    );
  }

  return errors.length === 0;
}

function validateMainExports(packageJson, distPath, errors, warnings) {
  console.log("🔧 Validating main exports...");

  const mainExports = [
    { field: "main", path: packageJson.main },
    { field: "module", path: packageJson.module },
    { field: "types", path: packageJson.types },
    { field: "style", path: packageJson.style },
  ];

  mainExports.forEach(({ field, path: filePath }) => {
    if (!filePath) return;

    const fullPath = filePath.replace("./", "");
    if (!fs.existsSync(fullPath)) {
      errors.push(`${field}: File not found - ${filePath}`);
    } else {
      console.log(`  ✅ ${field}: ${filePath}`);
    }
  });
}

function validateBundleExports(packageJson, distPath, errors, warnings) {
  console.log("\n📦 Validating bundle exports...");

  const bundleExports = [
    "accessibility",
    "advanced",
    "animations",
    "core",
    "data-display",
    "feedback",
    "forms",
    "layout",
    "navigation",
    "physics",
    "ssr",
    "tokens",
  ];

  bundleExports.forEach((exportName) => {
    const exportConfig = packageJson.exports[`./${exportName}`];
    if (!exportConfig) {
      warnings.push(`Bundle export not found: ./${exportName}`);
      return;
    }

    // Check types
    if (exportConfig.types) {
      const typesPath = exportConfig.types.replace("./", "");
      if (!fs.existsSync(typesPath)) {
        errors.push(
          `${exportName}.types: File not found - ${exportConfig.types}`,
        );
      } else {
        console.log(`  ✅ ${exportName}.types: ${exportConfig.types}`);
      }
    }

    // Check import (ESM)
    if (exportConfig.import) {
      const importPath = exportConfig.import.replace("./", "");
      if (!fs.existsSync(importPath)) {
        errors.push(
          `${exportName}.import: File not found - ${exportConfig.import}`,
        );
      } else {
        console.log(`  ✅ ${exportName}.import: ${exportConfig.import}`);
      }
    }

    // Check require (CJS)
    if (exportConfig.require) {
      const requirePath = exportConfig.require.replace("./", "");
      if (!fs.existsSync(requirePath)) {
        errors.push(
          `${exportName}.require: File not found - ${exportConfig.require}`,
        );
      } else {
        console.log(`  ✅ ${exportName}.require: ${exportConfig.require}`);
      }
    }
  });
}

function validateComponentExports(packageJson, distPath, errors, warnings) {
  console.log("\n🧩 Validating component exports...");

  const componentExports = ["button", "card", "input", "avatar", "modal"];

  componentExports.forEach((exportName) => {
    const exportConfig = packageJson.exports[`./${exportName}`];
    if (!exportConfig) {
      warnings.push(`Component export not found: ./${exportName}`);
      return;
    }

    // Check types
    if (exportConfig.types) {
      const typesPath = exportConfig.types.replace("./", "");
      if (!fs.existsSync(typesPath)) {
        errors.push(
          `${exportName}.types: File not found - ${exportConfig.types}`,
        );
      } else {
        console.log(`  ✅ ${exportName}.types: ${exportConfig.types}`);
      }
    }

    // Check import (ESM)
    if (exportConfig.import) {
      const importPath = exportConfig.import.replace("./", "");
      if (!fs.existsSync(importPath)) {
        errors.push(
          `${exportName}.import: File not found - ${exportConfig.import}`,
        );
      } else {
        console.log(`  ✅ ${exportName}.import: ${exportConfig.import}`);
      }
    }

    // Check require (CJS)
    if (exportConfig.require) {
      const requirePath = exportConfig.require.replace("./", "");
      if (!fs.existsSync(requirePath)) {
        errors.push(
          `${exportName}.require: File not found - ${exportConfig.require}`,
        );
      } else {
        console.log(`  ✅ ${exportName}.require: ${exportConfig.require}`);
      }
    }
  });
}

function validateCSSExports(packageJson, distPath, errors, warnings) {
  console.log("\n🎨 Validating CSS exports...");

  const cssExports = ["css", "styles"];

  cssExports.forEach((exportName) => {
    const cssPath = packageJson.exports[`./${exportName}`];
    if (!cssPath) {
      warnings.push(`CSS export not found: ./${exportName}`);
      return;
    }

    const fullPath = cssPath.replace("./", "");
    if (!fs.existsSync(fullPath)) {
      errors.push(`${exportName}: CSS file not found - ${cssPath}`);
    } else {
      console.log(`  ✅ ${exportName}: ${cssPath}`);
    }
  });
}

// Check for consistent CJS path patterns
function validateCJSPatterns(packageJson, errors, warnings) {
  console.log("\n🔄 Validating CJS path patterns...");

  const exports = packageJson.exports;
  const cjsPaths = [];

  Object.entries(exports).forEach(([name, config]) => {
    if (config && typeof config === "object" && config.require) {
      cjsPaths.push({ name, path: config.require });
    }
  });

  // Check if all CJS paths follow the same pattern
  const patterns = cjsPaths.map(({ path }) => {
    if (path.includes("/cjs/")) return "cjs-prefix";
    if (path.includes(".cjs")) return "direct-cjs";
    return "other";
  });

  const uniquePatterns = [...new Set(patterns)];

  if (uniquePatterns.length > 1) {
    warnings.push(
      `Inconsistent CJS path patterns detected: ${uniquePatterns.join(", ")}`,
    );
    cjsPaths.forEach(({ name, path }) => {
      console.log(`  📍 ${name}: ${path}`);
    });
  } else {
    console.log(`  ✅ Consistent CJS pattern: ${uniquePatterns[0]}`);
  }
}

// Run validation
const success = validateExports();
process.exit(success ? 0 : 1);
