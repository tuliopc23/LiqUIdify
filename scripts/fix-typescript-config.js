#!/usr/bin/env node

/**
 * TypeScript Configuration Auto-Fix Script
 *
 * Automatically detects and fixes common TypeScript configuration issues:
 * - Invalid moduleResolution values
 * - Empty object values
 * - Duplicate properties
 * - Invalid JSON structure
 * - Missing required options
 *
 * Creates backups before making changes and reports all modifications.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

let changesMade = [];
let backupsCreated = [];

/**
 * Log functions for consistent output
 */
function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

function logWarning(message) {
  console.log(`⚠️  ${message}`);
}

function logError(message) {
  console.error(`❌ ${message}`);
}

/**
 * Create backup of a file
 */
function createBackup(filePath) {
  const backupPath = `${filePath}.backup.${Date.now()}`;
  try {
    fs.copyFileSync(filePath, backupPath);
    backupsCreated.push(backupPath);
    logInfo(`Created backup: ${backupPath}`);
    return backupPath;
  } catch (error) {
    logError(`Failed to create backup for ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Fix TypeScript configuration issues
 */
function fixTypeScriptConfig() {
  logInfo("Fixing TypeScript configuration issues...");

  const tsconfigPath = path.resolve(ROOT_DIR, "tsconfig.json");

  if (!fs.existsSync(tsconfigPath)) {
    logError("tsconfig.json not found");
    return false;
  }

  // Create backup
  const backupPath = createBackup(tsconfigPath);
  if (!backupPath) {
    return false;
  }

  try {
    // Read and parse tsconfig.json
    const tsconfigContent = fs.readFileSync(tsconfigPath, "utf8");
    const tsconfig = JSON.parse(tsconfigContent);

    let hasChanges = false;

    // Fix moduleResolution if it's invalid
    if (tsconfig.compilerOptions?.moduleResolution === undefined) {
      tsconfig.compilerOptions = tsconfig.compilerOptions || {};
      tsconfig.compilerOptions.moduleResolution = "node";
      changesMade.push("Added missing moduleResolution: 'node'");
      hasChanges = true;
    } else if (typeof tsconfig.compilerOptions.moduleResolution !== "string") {
      tsconfig.compilerOptions.moduleResolution = "node";
      changesMade.push("Fixed invalid moduleResolution type to 'node'");
      hasChanges = true;
    } else if (
      !["node", "bundler", "classic"].includes(
        tsconfig.compilerOptions.moduleResolution,
      )
    ) {
      tsconfig.compilerOptions.moduleResolution = "node";
      changesMade.push(
        `Fixed invalid moduleResolution value to 'node' (was: '${tsconfig.compilerOptions.moduleResolution}')`,
      );
      hasChanges = true;
    }

    // Fix empty object values
    if (tsconfig.compilerOptions) {
      Object.entries(tsconfig.compilerOptions).forEach(([key, value]) => {
        if (
          value !== null &&
          typeof value === "object" &&
          Object.keys(value).length === 0
        ) {
          // Determine appropriate default value based on the option
          let defaultValue;
          switch (key) {
            case "moduleResolution":
              defaultValue = "node";
              break;
            case "target":
              defaultValue = "ES2022";
              break;
            case "module":
              defaultValue = "ESNext";
              break;
            case "lib":
              defaultValue = ["ES2022", "DOM", "DOM.Iterable"];
              break;
            default:
              defaultValue = null;
          }

          if (defaultValue !== null) {
            tsconfig.compilerOptions[key] = defaultValue;
            changesMade.push(
              `Fixed empty object for ${key} to: ${JSON.stringify(defaultValue)}`,
            );
            hasChanges = true;
          } else {
            // Remove the option if we don't know a good default
            delete tsconfig.compilerOptions[key];
            changesMade.push(`Removed invalid empty object for ${key}`);
            hasChanges = true;
          }
        }
      });
    }

    // Ensure required compiler options exist
    const requiredOptions = {
      target: "ES2022",
      module: "ESNext",
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
    };

    Object.entries(requiredOptions).forEach(([key, defaultValue]) => {
      if (tsconfig.compilerOptions?.[key] === undefined) {
        tsconfig.compilerOptions = tsconfig.compilerOptions || {};
        tsconfig.compilerOptions[key] = defaultValue;
        changesMade.push(
          `Added missing required option ${key}: ${JSON.stringify(defaultValue)}`,
        );
        hasChanges = true;
      }
    });

    // Write changes if any were made
    if (hasChanges) {
      const updatedContent = JSON.stringify(tsconfig, null, 2);
      fs.writeFileSync(tsconfigPath, updatedContent, "utf8");
      logSuccess("TypeScript configuration fixed successfully");
      return true;
    } else {
      logSuccess("No TypeScript configuration issues found");
      return true;
    }
  } catch (error) {
    logError(`Failed to fix TypeScript configuration: ${error.message}`);
    return false;
  }
}

/**
 * Fix Vite configuration issues
 */
function fixViteConfig() {
  logInfo("Fixing Vite configuration issues...");

  const viteConfigPath = path.resolve(ROOT_DIR, "vite.config.mts");

  if (!fs.existsSync(viteConfigPath)) {
    logError("vite.config.mts not found");
    return false;
  }

  // Create backup
  const backupPath = createBackup(viteConfigPath);
  if (!backupPath) {
    return false;
  }

  try {
    let viteConfigContent = fs.readFileSync(viteConfigPath, "utf8");
    let hasChanges = false;

    // Remove duplicate moduleResolution properties
    const moduleResolutionRegex = /moduleResolution:\s*["']([^"']+)["']/g;
    const matches = [...viteConfigContent.matchAll(moduleResolutionRegex)];

    if (matches.length > 1) {
      // Keep only the first one (in compilerOptions) and remove others
      let matchCount = 0;
      viteConfigContent = viteConfigContent.replace(
        moduleResolutionRegex,
        (match, value) => {
          matchCount++;
          if (matchCount === 1) {
            return match; // Keep the first one
          } else {
            changesMade.push(`Removed duplicate moduleResolution: '${value}'`);
            hasChanges = true;
            return ""; // Remove duplicates
          }
        },
      );
    }

    // Remove invalid DTS plugin options
    const invalidOptions = [
      {
        pattern: /generateDeclarationMap:\s*true,?\s*/g,
        description: "generateDeclarationMap: true",
      },
      {
        pattern: /moduleResolution:\s*["']node["'],?\s*/g,
        description: 'moduleResolution: "node"',
      },
    ];

    invalidOptions.forEach(({ pattern, description }) => {
      if (viteConfigContent.match(pattern)) {
        viteConfigContent = viteConfigContent.replace(pattern, "");
        changesMade.push(`Removed invalid DTS plugin option: ${description}`);
        hasChanges = true;
      }
    });

    // Write changes if any were made
    if (hasChanges) {
      fs.writeFileSync(viteConfigPath, viteConfigContent, "utf8");
      logSuccess("Vite configuration fixed successfully");
      return true;
    } else {
      logSuccess("No Vite configuration issues found");
      return true;
    }
  } catch (error) {
    logError(`Failed to fix Vite configuration: ${error.message}`);
    return false;
  }
}

/**
 * Validate configuration after fixes
 */
function validateAfterFix() {
  logInfo("Validating configuration after fixes...");

  try {
    // Test TypeScript compilation
    const { execSync } = require("child_process");
    execSync("npx tsc --noEmit --project tsconfig.json", {
      cwd: ROOT_DIR,
      stdio: "pipe",
    });
    logSuccess("TypeScript compilation test passed");
    return true;
  } catch (error) {
    logError(`TypeScript compilation test failed: ${error.message}`);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log("🔧 Starting TypeScript configuration auto-fix...\n");

  let success = true;

  // Fix TypeScript configuration
  success = fixTypeScriptConfig() && success;

  // Fix Vite configuration
  success = fixViteConfig() && success;

  // Validate after fixes
  if (success) {
    success = validateAfterFix() && success;
  }

  // Report changes
  console.log("\n📊 Changes Summary:");
  if (changesMade.length > 0) {
    console.log("Changes made:");
    changesMade.forEach((change) => console.log(`  • ${change}`));
  } else {
    console.log("No changes were necessary");
  }

  if (backupsCreated.length > 0) {
    console.log("\nBackups created:");
    backupsCreated.forEach((backup) => console.log(`  • ${backup}`));
  }

  // Final result
  if (success) {
    console.log(
      "\n🎉 TypeScript configuration auto-fix completed successfully!",
    );
    process.exit(0);
  } else {
    console.log("\n💥 TypeScript configuration auto-fix failed!");
    process.exit(1);
  }
}

// Run the script
main();
