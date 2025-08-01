#!/usr/bin/env node

/**
 * Export Validation Script
 *
 * This script validates that package exports are working correctly
 * by attempting to import the main package and checking for failures.
 *
 * Exits with non-zero status on failure to ensure CI build fails properly.
 */

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = dirname(__dirname);

async function validateExports() {
  console.log("🔍 Validating package exports...");

  let hasErrors = false;

  try {
    // Check if built files exist first
    const distPath = join(rootDir, "dist/libs/components");
    const requiredFiles = ["index.mjs", "index.cjs", "index.d.ts"];

    console.log("📁 Checking for required build outputs...");
    for (const file of requiredFiles) {
      const filePath = join(distPath, file);
      if (!existsSync(filePath)) {
        console.error(`❌ Required file missing: ${file}`);
        hasErrors = true;
      } else {
        console.log(`✅ Found: ${file}`);
      }
    }

    if (hasErrors) {
      console.error("❌ Missing required build outputs");
      process.exit(1);
    }

    // Test ESM import
    console.log("🧪 Testing ESM import...");
    try {
      // Use dynamic import to test the built package
      const packagePath = join(distPath, "index.mjs");
      const module = await import(`file://${packagePath}`);

      if (!module || typeof module !== "object") {
        console.error("❌ ESM import returned invalid module");
        hasErrors = true;
      } else {
        console.log("✅ ESM import successful");

        // Check if we have some expected exports
        const expectedExports = ["GlassButton", "GlassCard", "GlassProvider"];
        const availableExports = Object.keys(module);

        if (availableExports.length === 0) {
          console.error("❌ No exports found in module");
          hasErrors = true;
        } else {
          console.log(`✅ Found ${availableExports.length} exports`);

          // Check for some key exports
          const foundExpectedExports = expectedExports.filter((exp) =>
            availableExports.includes(exp),
          );

          if (foundExpectedExports.length === 0) {
            console.warn("⚠️  None of the expected key exports found");
            console.warn(`   Expected: ${expectedExports.join(", ")}`);
            console.warn(
              `   Available: ${availableExports.slice(0, 10).join(", ")}${availableExports.length > 10 ? "..." : ""}`,
            );
          } else {
            console.log(
              `✅ Found expected exports: ${foundExpectedExports.join(", ")}`,
            );
          }
        }
      }
    } catch (importError) {
      console.error("❌ ESM import failed:", importError.message);
      hasErrors = true;
    }

    // Test CommonJS require (if available)
    console.log("🧪 Testing CommonJS require...");
    try {
      const cjsPath = join(distPath, "index.cjs");
      if (existsSync(cjsPath)) {
        // Use dynamic import for CJS as well since we're in ESM context
        const { createRequire } = await import("module");
        const require = createRequire(import.meta.url);

        const module = require(cjsPath);

        if (!module || typeof module !== "object") {
          console.error("❌ CommonJS require returned invalid module");
          hasErrors = true;
        } else {
          console.log("✅ CommonJS require successful");
        }
      } else {
        console.warn("⚠️  CommonJS build not found, skipping CJS test");
      }
    } catch (requireError) {
      console.error("❌ CommonJS require failed:", requireError.message);
      hasErrors = true;
    }
  } catch (error) {
    console.error("❌ Export validation failed with error:", error.message);
    hasErrors = true;
  }

  if (hasErrors) {
    console.error("\n❌ Export validation failed");
    console.error(
      "Please check the build output and package.json exports configuration.",
    );
    process.exit(1);
  } else {
    console.log("\n✅ All export validation checks passed!");
    process.exit(0);
  }
}

// Run validation
validateExports().catch((error) => {
  console.error("❌ Unexpected error during export validation:", error);
  process.exit(1);
});
