#!/usr/bin/env node

/**
 * Automatic Index File Fixer
 *
 * This script automatically fixes empty index.ts files by analyzing
 * component implementations and generating proper exports.
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

class IndexFileFixer {
  constructor() {
    this.fixed = 0;
    this.errors = 0;
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

  parseExportsFromFile(filePath) {
    if (!existsSync(filePath)) {
      return { exports: [], interfaces: [] };
    }

    try {
      const content = readFileSync(filePath, "utf-8");
      const exports = [];
      const interfaces = [];

      // Find exported components/functions/constants
      const exportMatches = content.matchAll(
        /export\s+(?:const|function|class)\s+(\w+)/g,
      );
      for (const match of exportMatches) {
        exports.push(match[1]);
      }

      // Find exported interfaces/types
      const interfaceMatches = content.matchAll(
        /export\s+(?:interface|type)\s+(\w+)/g,
      );
      for (const match of interfaceMatches) {
        interfaces.push(match[1]);
      }

      // Find default exports
      const defaultExportMatch = content.match(/export\s+default\s+(\w+)/);
      if (defaultExportMatch) {
        exports.push(defaultExportMatch[1]);
      }

      return { exports, interfaces };
    } catch (error) {
      return { exports: [], interfaces: [], error: error.message };
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

  isIndexFileEmpty(indexPath) {
    if (!existsSync(indexPath)) {
      return true;
    }

    const content = readFileSync(indexPath, "utf-8").trim();
    return !content || /^[;\s]*$/.test(content);
  }

  generateIndexContent(componentName, mainFile, analysis) {
    const { fileName } = mainFile;
    const { exports, interfaces } = analysis;
    const fileNameWithoutExt = fileName.replace(/\.(tsx?|jsx?)$/, "");

    let content = `/**\n * ${componentName} Component Export\n */\n`;

    // Add specific named exports if we found any
    if (exports.length > 0 || interfaces.length > 0) {
      const allExports = [...exports, ...interfaces];
      content += `export { ${allExports.join(", ")} } from "./${fileNameWithoutExt}";\n`;

      // Add type-only exports for interfaces
      if (interfaces.length > 0) {
        content += `export type { ${interfaces.join(", ")} } from "./${fileNameWithoutExt}";\n`;
      }
    }

    // Always add the wildcard export for compatibility
    content += `\n// Re-export everything for compatibility\n`;
    content += `export * from "./${fileNameWithoutExt}";\n`;

    return content;
  }

  fixComponent(componentName) {
    const componentDir = join(COMPONENTS_DIR, componentName);
    const indexPath = join(componentDir, "index.ts");

    if (!existsSync(componentDir)) {
      this.log(`Component directory ${componentName} does not exist`, "error");
      this.errors++;
      return;
    }

    if (!this.isIndexFileEmpty(indexPath)) {
      this.log(
        `${componentName}: index.ts already has content, skipping`,
        "info",
      );
      return;
    }

    const mainFile = this.findMainComponentFile(componentDir, componentName);
    if (!mainFile) {
      this.log(`${componentName}: No main component file found`, "error");
      this.errors++;
      return;
    }

    const analysis = this.parseExportsFromFile(mainFile.filePath);
    if (analysis.error) {
      this.log(
        `${componentName}: Error parsing ${mainFile.fileName}: ${analysis.error}`,
        "error",
      );
      this.errors++;
      return;
    }

    const indexContent = this.generateIndexContent(
      componentName,
      mainFile,
      analysis,
    );

    try {
      writeFileSync(indexPath, indexContent, "utf-8");
      this.log(
        `${componentName}: Fixed index.ts (found ${analysis.exports.length} exports, ${analysis.interfaces.length} types)`,
        "success",
      );
      this.fixed++;
    } catch (error) {
      this.log(
        `${componentName}: Error writing index.ts: ${error.message}`,
        "error",
      );
      this.errors++;
    }
  }

  fixEmptyInterfaceExports() {
    this.log(
      "\nPhase 2: Fixing interface exports in component files...",
      "info",
    );

    const componentDirs = readdirSync(COMPONENTS_DIR).filter((dir) => {
      const dirPath = join(COMPONENTS_DIR, dir);
      return statSync(dirPath).isDirectory();
    });

    for (const componentName of componentDirs) {
      const componentDir = join(COMPONENTS_DIR, componentName);
      const mainFile = this.findMainComponentFile(componentDir, componentName);

      if (!mainFile) continue;

      try {
        const content = readFileSync(mainFile.filePath, "utf-8");

        // Find interfaces that are not exported
        const unexportedInterfaces = [];
        const interfaceMatches = content.matchAll(/^(\s*)interface\s+(\w+)/gm);

        for (const match of interfaceMatches) {
          const indentation = match[1];
          const interfaceName = match[2];

          // Check if this interface is already exported
          const exportedInterfaceRegex = new RegExp(
            `export\\s+interface\\s+${interfaceName}`,
          );
          if (!exportedInterfaceRegex.test(content)) {
            unexportedInterfaces.push({ name: interfaceName, indentation });
          }
        }

        if (unexportedInterfaces.length > 0) {
          let updatedContent = content;

          // Replace each unexported interface with exported version
          for (const { name, indentation } of unexportedInterfaces) {
            const oldPattern = new RegExp(
              `^(${indentation})interface\\s+${name}`,
              "gm",
            );
            const replacement = `${indentation}export interface ${name}`;
            updatedContent = updatedContent.replace(oldPattern, replacement);
          }

          writeFileSync(mainFile.filePath, updatedContent, "utf-8");
          this.log(
            `${componentName}: Added export to ${unexportedInterfaces.map((i) => i.name).join(", ")}`,
            "success",
          );
        }
      } catch (error) {
        this.log(
          `${componentName}: Error processing interfaces: ${error.message}`,
          "error",
        );
      }
    }
  }

  run() {
    this.log("Starting automatic index file fixing...", "info");
    this.log("Phase 1: Fixing empty index.ts files...", "info");

    // Get list of all component directories
    const componentDirs = readdirSync(COMPONENTS_DIR).filter((dir) => {
      const dirPath = join(COMPONENTS_DIR, dir);
      return statSync(dirPath).isDirectory();
    });

    for (const componentName of componentDirs) {
      this.fixComponent(componentName);
    }

    // Fix interface exports
    this.fixEmptyInterfaceExports();

    // Summary
    this.log("\n" + "=".repeat(50), "info");
    this.log("INDEX FILE FIXING COMPLETE", "info");
    this.log("=".repeat(50), "info");
    this.log(`Fixed: ${this.fixed} components`, "success");
    this.log(
      `Errors: ${this.errors} components`,
      this.errors > 0 ? "error" : "info",
    );

    if (this.fixed > 0) {
      this.log("\nRecommendations:", "info");
      this.log("1. Run the verification script to confirm all fixes");
      this.log("2. Test the build to ensure no circular dependencies");
      this.log("3. Update any custom export patterns if needed");
    }

    process.exit(this.errors > 0 ? 1 : 0);
  }
}

// Run the fixer
const fixer = new IndexFileFixer();
fixer.run();
