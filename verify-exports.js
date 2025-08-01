#!/usr/bin/env node

/**
 * Component Export Verification Script
 *
 * This script verifies that all component files referenced in index files
 * actually exist and export the expected components and types.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENTS_DIR = join(__dirname, "libs/components/src/components");
const MAIN_INDEX = join(__dirname, "libs/components/src/index.ts");

class ExportVerifier {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      issues: [],
    };
  }

  log(message, type = "info") {
    const prefix = {
      info: "📋",
      success: "✅",
      warning: "⚠️",
      error: "❌",
    }[type];
    console.log(`${prefix} ${message}`);
  }

  addIssue(component, issue, severity = "error") {
    this.results.issues.push({ component, issue, severity });
    if (severity === "error") {
      this.results.failed++;
    }
  }

  parseExportsFromFile(filePath) {
    if (!existsSync(filePath)) {
      return { exports: [], reExports: [], isEmpty: true };
    }

    try {
      const content = readFileSync(filePath, "utf-8").trim();

      // Check if file is effectively empty (just semicolons, whitespace, or empty)
      const isEffectivelyEmpty = !content || /^[;\s]*$/.test(content);

      if (isEffectivelyEmpty) {
        return { exports: [], reExports: [], isEmpty: true };
      }

      const exports = [];
      const reExports = [];

      // Find named exports: export { ComponentName }
      const namedExportMatches = content.matchAll(/export\s*{\s*([^}]+)\s*}/g);
      for (const match of namedExportMatches) {
        const exportItems = match[1].split(",").map((item) => {
          const cleaned = item.trim();
          // Handle "ComponentName as AliasName" and "type ComponentProps"
          if (cleaned.includes(" as ")) {
            return cleaned.split(" as ")[0].trim();
          }
          if (cleaned.startsWith("type ")) {
            return cleaned.substring(5).trim();
          }
          return cleaned;
        });
        exports.push(...exportItems);
      }

      // Find default exports: export default ComponentName
      const defaultExportMatch = content.match(/export\s+default\s+(\w+)/);
      if (defaultExportMatch) {
        exports.push("default");
      }

      // Find direct exports: export const/function/class ComponentName
      const directExportMatches = content.matchAll(
        /export\s+(?:const|function|class|interface|type)\s+(\w+)/g,
      );
      for (const match of directExportMatches) {
        exports.push(match[1]);
      }

      // Find re-exports: export * from "./file"
      const reExportMatches = content.matchAll(
        /export\s*\*\s*from\s*['"]([^'"]+)['"]/g,
      );
      for (const match of reExportMatches) {
        reExports.push(match[1]);
      }

      // Find named re-exports: export { Something } from "./file"
      const namedReExportMatches = content.matchAll(
        /export\s*{\s*([^}]+)\s*}\s*from\s*['"]([^'"]+)['"]/g,
      );
      for (const match of namedReExportMatches) {
        const exportItems = match[1].split(",").map((item) => item.trim());
        exports.push(...exportItems);
        reExports.push(match[2]);
      }

      return { exports, reExports, isEmpty: false };
    } catch (error) {
      return {
        exports: [],
        reExports: [],
        isEmpty: false,
        error: error.message,
      };
    }
  }

  getMainExports() {
    if (!existsSync(MAIN_INDEX)) {
      this.log("Main index.ts not found!", "error");
      return [];
    }

    const content = readFileSync(MAIN_INDEX, "utf-8");
    const componentExports = [];

    // Find all export * from "./components/..." lines (not commented out)
    const lines = content.split("\n");
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("//")) continue; // Skip commented lines

      const exportMatch = trimmedLine.match(
        /export\s*\*\s*from\s*['"]\.\/components\/([^'"]+)['"]/,
      );
      if (exportMatch) {
        componentExports.push(exportMatch[1]);
      }
    }

    return componentExports;
  }

  findComponentFiles(componentDir) {
    if (!existsSync(componentDir)) {
      return [];
    }

    const files = readdirSync(componentDir);
    const componentFiles = files.filter((file) => {
      const filePath = join(componentDir, file);
      return (
        statSync(filePath).isFile() &&
        (file.endsWith(".tsx") || file.endsWith(".ts")) &&
        !file.endsWith(".stories.tsx") &&
        !file.endsWith(".test.tsx") &&
        file !== "index.ts"
      );
    });

    return componentFiles;
  }

  detectExpectedExports(componentName, implementationFiles) {
    const expectedExports = [];

    // Common patterns for component names
    const baseName = componentName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    expectedExports.push(baseName);

    // Check for Props types
    expectedExports.push(`${baseName}Props`);

    // Check actual implementation files for exports
    for (const file of implementationFiles) {
      const analysis = this.parseExportsFromFile(file);
      if (analysis.exports.length > 0) {
        expectedExports.push(...analysis.exports);
      }
    }

    return [...new Set(expectedExports)]; // Remove duplicates
  }

  verifyComponent(componentName) {
    this.results.total++;
    this.log(`\nVerifying: ${componentName}`, "info");

    const componentDir = join(COMPONENTS_DIR, componentName);
    const indexPath = join(componentDir, "index.ts");

    // Check if component directory exists
    if (!existsSync(componentDir)) {
      this.addIssue(componentName, "Component directory does not exist");
      return;
    }

    // Check if index.ts exists
    if (!existsSync(indexPath)) {
      this.addIssue(componentName, "index.ts file does not exist");
      return;
    }

    // Find component implementation files
    const componentFiles = this.findComponentFiles(componentDir);
    if (componentFiles.length === 0) {
      this.addIssue(componentName, "No component implementation files found");
      return;
    }

    // Parse what the index.ts actually exports
    const indexAnalysis = this.parseExportsFromFile(indexPath);
    if (indexAnalysis.error) {
      this.addIssue(
        componentName,
        `Error parsing index.ts: ${indexAnalysis.error}`,
      );
      return;
    }

    // Check if index.ts is empty
    if (indexAnalysis.isEmpty) {
      this.addIssue(
        componentName,
        "index.ts file is empty - no exports defined",
      );

      // Analyze implementation files to suggest what should be exported
      const implementationPaths = componentFiles.map((f) =>
        join(componentDir, f),
      );
      const expectedExports = this.detectExpectedExports(
        componentName,
        implementationPaths,
      );

      if (expectedExports.length > 0) {
        this.addIssue(
          componentName,
          `Suggested exports based on implementation: ${expectedExports.join(", ")}`,
          "warning",
        );
      }
      return;
    }

    // Verify that re-exported files exist
    const missingFiles = [];
    for (const reExport of indexAnalysis.reExports) {
      const possiblePaths = [
        join(componentDir, `${reExport}.tsx`),
        join(componentDir, `${reExport}.ts`),
        join(componentDir, reExport, "index.ts"),
      ];

      let fileFound = false;
      for (const filePath of possiblePaths) {
        if (existsSync(filePath)) {
          fileFound = true;
          // Verify the file has exports
          const fileAnalysis = this.parseExportsFromFile(filePath);
          if (fileAnalysis.isEmpty) {
            this.addIssue(
              componentName,
              `Referenced file ${reExport} exists but has no exports`,
              "warning",
            );
          }
          break;
        }
      }

      if (!fileFound) {
        missingFiles.push(reExport);
      }
    }

    if (missingFiles.length > 0) {
      this.addIssue(
        componentName,
        `index.ts references missing files: ${missingFiles.join(", ")}`,
      );
      return;
    }

    // Check implementation files for exports
    let hasValidExports = false;
    for (const componentFile of componentFiles) {
      const filePath = join(componentDir, componentFile);
      const fileAnalysis = this.parseExportsFromFile(filePath);

      if (fileAnalysis.error) {
        this.addIssue(
          componentName,
          `Error parsing ${componentFile}: ${fileAnalysis.error}`,
        );
      } else if (fileAnalysis.exports.length > 0) {
        hasValidExports = true;
      }
    }

    if (!hasValidExports && indexAnalysis.exports.length === 0) {
      this.addIssue(
        componentName,
        "No exports found in any component files",
        "warning",
      );
    }

    if (
      missingFiles.length === 0 &&
      (hasValidExports || indexAnalysis.exports.length > 0)
    ) {
      this.results.passed++;
      this.log(`✓ Component structure and exports are valid`, "success");
    }
  }

  generateReport() {
    this.log("\n" + "=".repeat(60), "info");
    this.log("COMPONENT EXPORT VERIFICATION REPORT", "info");
    this.log("=".repeat(60), "info");

    this.log(`\nSummary:`, "info");
    this.log(`  Total components checked: ${this.results.total}`);
    this.log(`  Passed: ${this.results.passed}`, "success");
    this.log(`  Failed: ${this.results.failed}`, "error");

    if (this.results.issues.length > 0) {
      this.log(`\nIssues found:`, "error");

      const errorIssues = this.results.issues.filter(
        (i) => i.severity === "error",
      );
      const warningIssues = this.results.issues.filter(
        (i) => i.severity === "warning",
      );

      if (errorIssues.length > 0) {
        this.log(`\nErrors (${errorIssues.length}):`, "error");
        for (const issue of errorIssues) {
          this.log(`  ${issue.component}: ${issue.issue}`, "error");
        }
      }

      if (warningIssues.length > 0) {
        this.log(`\nWarnings (${warningIssues.length}):`, "warning");
        for (const issue of warningIssues) {
          this.log(`  ${issue.component}: ${issue.issue}`, "warning");
        }
      }
    } else {
      this.log("\nNo issues found! 🎉", "success");
    }

    // Recommendations
    if (this.results.failed > 0) {
      this.log("\nRecommendations:", "info");
      this.log("1. Fix empty index.ts files by adding proper exports");
      this.log("2. Create missing component implementation files");
      this.log("3. Ensure all exported components are properly implemented");
      this.log("4. Fix any parsing errors in TypeScript files");
      this.log(
        "5. Remove unused exports from main index.ts if components are not ready",
      );
    }

    // Quick fix suggestions
    const emptyIndexIssues = this.results.issues.filter((i) =>
      i.issue.includes("index.ts file is empty"),
    );

    if (emptyIndexIssues.length > 0) {
      this.log("\nQuick Fix for Empty Index Files:", "info");
      this.log("For components with empty index.ts files, add exports like:");
      this.log('  export { ComponentName } from "./component-file";');
      this.log('  export type { ComponentNameProps } from "./component-file";');
    }
  }

  run() {
    this.log("Starting component export verification...", "info");

    const mainExports = this.getMainExports();
    this.log(
      `Found ${mainExports.length} component exports in main index.ts`,
      "info",
    );

    for (const componentName of mainExports) {
      this.verifyComponent(componentName);
    }

    this.generateReport();

    // Exit with error code if issues found
    process.exit(this.results.failed > 0 ? 1 : 0);
  }
}

// Run the verification
const verifier = new ExportVerifier();
verifier.run();
