#!/usr/bin/env node

/**
 * Type/Component Export Confusion Fixer
 *
 * This script identifies and fixes cases where types are being exported
 * as components or vice versa, which causes build failures.
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

class TypeComponentFixer {
  constructor() {
    this.fixed = 0;
    this.errors = 0;
    this.totalComponents = 0;
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

  analyzeImplementation(filePath) {
    if (!existsSync(filePath)) {
      return {
        components: [],
        types: [],
        interfaces: [],
        error: "File not found",
      };
    }

    try {
      const content = readFileSync(filePath, "utf-8");
      const components = [];
      const types = [];
      const interfaces = [];

      // Find exported components (const, function, class)
      const componentMatches = content.matchAll(
        /export\s+(?:const|function|class)\s+(\w+)/g,
      );
      for (const match of componentMatches) {
        components.push(match[1]);
      }

      // Find default exports
      const defaultMatch = content.match(/export\s+default\s+(\w+)/);
      if (defaultMatch) {
        components.push(defaultMatch[1]);
      }

      // Find exported interfaces
      const interfaceMatches = content.matchAll(/export\s+interface\s+(\w+)/g);
      for (const match of interfaceMatches) {
        interfaces.push(match[1]);
      }

      // Find exported types
      const typeMatches = content.matchAll(/export\s+type\s+(\w+)/g);
      for (const match of typeMatches) {
        types.push(match[1]);
      }

      return { components, types, interfaces };
    } catch (error) {
      return {
        components: [],
        types: [],
        interfaces: [],
        error: error.message,
      };
    }
  }

  analyzeIndex(indexPath) {
    if (!existsSync(indexPath)) {
      return { namedExports: [], typeExports: [], content: "" };
    }

    try {
      const content = readFileSync(indexPath, "utf-8");
      const namedExports = [];
      const typeExports = [];

      // Find named exports: export { ComponentName }
      const namedMatches = content.matchAll(/export\s*{\s*([^}]+)\s*}\s*from/g);
      for (const match of namedMatches) {
        const exports = match[1].split(",").map((item) => item.trim());
        namedExports.push(...exports);
      }

      // Find type exports: export type { TypeName }
      const typeMatches = content.matchAll(
        /export\s+type\s*{\s*([^}]+)\s*}\s*from/g,
      );
      for (const match of typeMatches) {
        const exports = match[1].split(",").map((item) => item.trim());
        typeExports.push(...exports);
      }

      return { namedExports, typeExports, content };
    } catch (error) {
      return {
        namedExports: [],
        typeExports: [],
        content: "",
        error: error.message,
      };
    }
  }

  findMainFile(componentDir, componentName) {
    const possibleNames = [`${componentName}.tsx`, `${componentName}.ts`];

    for (const fileName of possibleNames) {
      const filePath = join(componentDir, fileName);
      if (existsSync(filePath)) {
        return { fileName, filePath };
      }
    }

    // Find any implementation file
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

  generateCorrectedIndex(componentName, mainFile, implementation) {
    const { fileName } = mainFile;
    const { components, types, interfaces } = implementation;
    const baseName = fileName.replace(/\.(tsx?|jsx?)$/, "");

    let content = `/**\n * ${componentName} Component Export\n */\n`;

    // Export components
    if (components.length > 0) {
      const actualComponents = components.filter((c) => c !== "default");
      if (actualComponents.length > 0) {
        content += `export { ${actualComponents.join(", ")} } from "./${baseName}";\n`;
      }
    }

    // Export types and interfaces together
    const allTypes = [...types, ...interfaces];
    if (allTypes.length > 0) {
      content += `export type { ${allTypes.join(", ")} } from "./${baseName}";\n`;
    }

    // Wildcard export
    content += `\n// Re-export everything for compatibility\n`;
    content += `export * from "./${baseName}";\n`;

    return content;
  }

  fixComponent(componentName) {
    this.totalComponents++;
    const componentDir = join(COMPONENTS_DIR, componentName);
    const indexPath = join(componentDir, "index.ts");

    if (!existsSync(componentDir)) {
      this.log(`${componentName}: Directory not found`, "error");
      this.errors++;
      return;
    }

    const mainFile = this.findMainFile(componentDir, componentName);
    if (!mainFile) {
      this.log(`${componentName}: No implementation file found`, "error");
      this.errors++;
      return;
    }

    const implementation = this.analyzeImplementation(mainFile.filePath);
    if (implementation.error) {
      this.log(
        `${componentName}: Error analyzing implementation: ${implementation.error}`,
        "error",
      );
      this.errors++;
      return;
    }

    const index = this.analyzeIndex(indexPath);
    if (index.error) {
      this.log(
        `${componentName}: Error analyzing index: ${index.error}`,
        "error",
      );
      this.errors++;
      return;
    }

    // Find issues
    const issues = [];
    const allTypes = [...implementation.types, ...implementation.interfaces];
    const allComponents = implementation.components.filter(
      (c) => c !== "default",
    );

    // Check if types are being exported as components
    for (const namedExport of index.namedExports) {
      if (
        allTypes.includes(namedExport) &&
        !allComponents.includes(namedExport)
      ) {
        issues.push(`Type ${namedExport} exported as component`);
      }
    }

    // Check if components are being exported as types
    for (const typeExport of index.typeExports) {
      if (
        allComponents.includes(typeExport) &&
        !allTypes.includes(typeExport)
      ) {
        issues.push(`Component ${typeExport} exported as type`);
      }
    }

    // Check for non-existent exports
    for (const namedExport of index.namedExports) {
      if (
        !allComponents.includes(namedExport) &&
        !allTypes.includes(namedExport)
      ) {
        issues.push(`Non-existent export: ${namedExport}`);
      }
    }

    if (issues.length === 0) {
      this.log(`${componentName}: No type/component confusion`, "info");
      return;
    }

    this.log(
      `${componentName}: Found ${issues.length} issues - ${issues.join(", ")}`,
      "warning",
    );

    // Generate corrected content
    const correctedContent = this.generateCorrectedIndex(
      componentName,
      mainFile,
      implementation,
    );

    try {
      writeFileSync(indexPath, correctedContent, "utf-8");
      this.log(`${componentName}: Fixed type/component exports`, "success");
      this.fixed++;
    } catch (error) {
      this.log(
        `${componentName}: Failed to write corrected index: ${error.message}`,
        "error",
      );
      this.errors++;
    }
  }

  run() {
    this.log("Starting type/component export confusion fixer...", "info");

    // Get all component directories
    const componentDirs = readdirSync(COMPONENTS_DIR).filter((dir) => {
      const dirPath = join(COMPONENTS_DIR, dir);
      return (
        statSync(dirPath).isDirectory() &&
        !dir.startsWith(".") &&
        dir !== "node_modules"
      );
    });

    this.log(`Found ${componentDirs.length} component directories`, "info");

    // Process each component
    for (const componentName of componentDirs.sort()) {
      this.fixComponent(componentName);
    }

    // Generate report
    this.generateReport();
  }

  generateReport() {
    this.log("\n" + "=".repeat(60), "info");
    this.log("TYPE/COMPONENT CONFUSION FIXING COMPLETE", "info");
    this.log("=".repeat(60), "info");

    this.log(`\nResults:`, "info");
    this.log(`  Total components: ${this.totalComponents}`, "info");
    this.log(`  Fixed: ${this.fixed}`, this.fixed > 0 ? "success" : "info");
    this.log(`  Errors: ${this.errors}`, this.errors > 0 ? "error" : "info");
    this.log(
      `  No issues: ${this.totalComponents - this.fixed - this.errors}`,
      "info",
    );

    if (this.fixed > 0) {
      this.log("\n✨ Next steps:", "info");
      this.log("1. Run 'bun run build:lib' to test the build", "info");
      this.log("2. Verify all components are properly exported", "info");
    }

    if (this.errors === 0 && this.fixed === 0) {
      this.log("\n🎉 No type/component confusion found!", "success");
    }

    process.exit(this.errors > 0 ? 1 : 0);
  }
}

// Run the fixer
const fixer = new TypeComponentFixer();
fixer.run();
