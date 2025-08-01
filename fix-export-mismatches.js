#!/usr/bin/env node

/**
 * Export Mismatch Fixer
 *
 * This script identifies and fixes export/import mismatches by analyzing
 * what components actually export vs. what their index files claim to export.
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  statSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENTS_DIR = join(__dirname, "libs/components/src/components");

class ExportMismatchFixer {
  constructor() {
    this.fixed = 0;
    this.errors = 0;
    this.issues = [];
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

  parseActualExports(filePath) {
    if (!existsSync(filePath)) {
      return { components: [], interfaces: [], types: [], all: [] };
    }

    try {
      const content = readFileSync(filePath, "utf-8");
      const components = [];
      const interfaces = [];
      const types = [];
      const all = [];

      // Find exported components/functions/constants
      const componentMatches = content.matchAll(
        /export\s+(?:const|function|class)\s+(\w+)/g,
      );
      for (const match of componentMatches) {
        components.push(match[1]);
        all.push(match[1]);
      }

      // Find exported interfaces
      const interfaceMatches = content.matchAll(/export\s+interface\s+(\w+)/g);
      for (const match of interfaceMatches) {
        interfaces.push(match[1]);
        all.push(match[1]);
      }

      // Find exported types
      const typeMatches = content.matchAll(/export\s+type\s+(\w+)/g);
      for (const match of typeMatches) {
        types.push(match[1]);
        all.push(match[1]);
      }

      // Find default exports
      const defaultExportMatch = content.match(/export\s+default\s+(\w+)/);
      if (defaultExportMatch) {
        components.push(defaultExportMatch[1]);
        all.push(`default (${defaultExportMatch[1]})`);
      }

      return { components, interfaces, types, all };
    } catch (error) {
      return {
        components: [],
        interfaces: [],
        types: [],
        all: [],
        error: error.message,
      };
    }
  }

  parseIndexExports(indexPath) {
    if (!existsSync(indexPath)) {
      return { namedExports: [], typeExports: [], reExports: [] };
    }

    try {
      const content = readFileSync(indexPath, "utf-8");
      const namedExports = [];
      const typeExports = [];
      const reExports = [];

      // Find named exports: export { ComponentName }
      const namedExportMatches = content.matchAll(
        /export\s*{\s*([^}]+)\s*}\s*from/g,
      );
      for (const match of namedExportMatches) {
        const exports = match[1].split(",").map((item) => item.trim());
        namedExports.push(...exports);
      }

      // Find type exports: export type { TypeName }
      const typeExportMatches = content.matchAll(
        /export\s+type\s*{\s*([^}]+)\s*}\s*from/g,
      );
      for (const match of typeExportMatches) {
        const exports = match[1].split(",").map((item) => item.trim());
        typeExports.push(...exports);
      }

      // Find re-exports: export * from
      const reExportMatches = content.matchAll(
        /export\s*\*\s*from\s*['"]([^'"]+)['"]/g,
      );
      for (const match of reExportMatches) {
        reExports.push(match[1]);
      }

      return { namedExports, typeExports, reExports };
    } catch (error) {
      return {
        namedExports: [],
        typeExports: [],
        reExports: [],
        error: error.message,
      };
    }
  }

  findMainComponentFile(componentDir, componentName) {
    const possibleNames = [
      `${componentName}.tsx`,
      `${componentName}.ts`,
      // Handle kebab-case to PascalCase conversion
      componentName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("") + ".tsx",
    ];

    for (const fileName of possibleNames) {
      const filePath = join(componentDir, fileName);
      if (existsSync(filePath)) {
        return { fileName, filePath };
      }
    }

    // Find any .tsx/.ts file that's not stories, test, or index
    const files = readdirSync(componentDir).filter((file) => {
      return (
        (file.endsWith(".tsx") || file.endsWith(".ts")) &&
        !file.endsWith(".stories.tsx") &&
        !file.endsWith(".test.tsx") &&
        file !== "index.ts"
      );
    });

    if (files.length > 0) {
      return { fileName: files[0], filePath: join(componentDir, files[0]) };
    }

    return null;
  }

  generateCorrectIndexContent(componentName, actualExports, mainFile) {
    const { fileName } = mainFile;
    const { components, interfaces, types } = actualExports;
    const fileNameWithoutExt = fileName.replace(/\.(tsx?|jsx?)$/, "");

    let content = `/**\n * ${componentName} Component Export\n */\n`;

    // Add component exports
    if (components.length > 0) {
      const componentsList = components
        .filter((c) => !c.startsWith("default"))
        .join(", ");
      if (componentsList) {
        content += `export { ${componentsList} } from "./${fileNameWithoutExt}";\n`;
      }
    }

    // Add type exports (interfaces and types)
    const allTypes = [...interfaces, ...types];
    if (allTypes.length > 0) {
      content += `export type { ${allTypes.join(", ")} } from "./${fileNameWithoutExt}";\n`;
    }

    // Always add the wildcard export for compatibility
    content += `\n// Re-export everything for compatibility\n`;
    content += `export * from "./${fileNameWithoutExt}";\n`;

    return content;
  }

  validateAndFixComponent(componentName) {
    const componentDir = join(COMPONENTS_DIR, componentName);
    const indexPath = join(componentDir, "index.ts");

    if (!existsSync(componentDir)) {
      this.log(`${componentName}: Component directory does not exist`, "error");
      this.errors++;
      return;
    }

    const mainFile = this.findMainComponentFile(componentDir, componentName);
    if (!mainFile) {
      this.log(`${componentName}: No main component file found`, "error");
      this.errors++;
      return;
    }

    // Analyze what the component actually exports
    const actualExports = this.parseActualExports(mainFile.filePath);
    if (actualExports.error) {
      this.log(
        `${componentName}: Error parsing ${mainFile.fileName}: ${actualExports.error}`,
        "error",
      );
      this.errors++;
      return;
    }

    // Analyze what the index claims to export
    const indexExports = this.parseIndexExports(indexPath);
    if (indexExports.error) {
      this.log(
        `${componentName}: Error parsing index.ts: ${indexExports.error}`,
        "error",
      );
      this.errors++;
      return;
    }

    // Check for mismatches
    const issues = [];

    // Check if index is trying to export non-existent components
    for (const namedExport of indexExports.namedExports) {
      if (!actualExports.all.some((exp) => exp.includes(namedExport))) {
        issues.push(`Index exports non-existent component: ${namedExport}`);
      }
    }

    // Check if index is trying to export components as types
    for (const typeExport of indexExports.typeExports) {
      if (actualExports.components.includes(typeExport)) {
        issues.push(`Index exports component ${typeExport} as type`);
      }
    }

    // Check if important components are missing from index
    for (const component of actualExports.components) {
      if (
        !component.startsWith("default") &&
        !indexExports.namedExports.includes(component) &&
        indexExports.reExports.length === 0
      ) {
        issues.push(`Component ${component} not exported by index`);
      }
    }

    // Check if important types are missing from index
    const allTypes = [...actualExports.interfaces, ...actualExports.types];
    for (const type of allTypes) {
      if (
        !indexExports.typeExports.includes(type) &&
        indexExports.reExports.length === 0
      ) {
        issues.push(`Type ${type} not exported by index`);
      }
    }

    if (issues.length > 0) {
      this.log(
        `${componentName}: Found ${issues.length} export issues`,
        "warning",
      );
      for (const issue of issues) {
        this.log(`  - ${issue}`, "warning");
      }

      // Generate corrected index content
      const correctedContent = this.generateCorrectIndexContent(
        componentName,
        actualExports,
        mainFile,
      );

      try {
        writeFileSync(indexPath, correctedContent, "utf-8");
        this.log(`${componentName}: Fixed index.ts exports`, "success");
        this.fixed++;
      } catch (error) {
        this.log(
          `${componentName}: Error writing corrected index.ts: ${error.message}`,
          "error",
        );
        this.errors++;
      }
    } else {
      this.log(`${componentName}: No export issues found`, "info");
    }
  }

  run() {
    this.log("Starting export mismatch validation and fixing...", "info");

    // Get list of all component directories
    const componentDirs = readdirSync(COMPONENTS_DIR).filter((dir) => {
      const dirPath = join(COMPONENTS_DIR, dir);
      return statSync(dirPath).isDirectory();
    });

    for (const componentName of componentDirs) {
      this.validateAndFixComponent(componentName);
    }

    // Summary
    this.log("\n" + "=".repeat(50), "info");
    this.log("EXPORT MISMATCH FIXING COMPLETE", "info");
    this.log("=".repeat(50), "info");
    this.log(`Fixed: ${this.fixed} components`, "success");
    this.log(
      `Errors: ${this.errors} components`,
      this.errors > 0 ? "error" : "info",
    );

    if (this.fixed > 0) {
      this.log("\nRecommendations:", "info");
      this.log("1. Run the build to test the fixes");
      this.log(
        "2. Run the verification script to confirm all issues are resolved",
      );
      this.log("3. Check for any remaining TypeScript errors");
    }

    process.exit(this.errors > 0 ? 1 : 0);
  }
}

// Run the fixer
const fixer = new ExportMismatchFixer();
fixer.run();
