#!/usr/bin/env node

/**
 * Comprehensive Export Fixer
 *
 * This script fixes all export issues including:
 * - Default vs named export mismatches
 * - Type vs component export confusion
 * - Missing exports and incorrect imports
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

class ComprehensiveExportFixer {
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

  analyzeFile(filePath) {
    if (!existsSync(filePath)) {
      return {
        namedExports: [],
        defaultExport: null,
        interfaces: [],
        types: [],
        error: "File does not exist",
      };
    }

    try {
      const content = readFileSync(filePath, "utf-8");
      const namedExports = [];
      const interfaces = [];
      const types = [];
      let defaultExport = null;

      // Find named component/function/const exports
      const namedMatches = content.matchAll(
        /export\s+(?:const|function|class)\s+(\w+)/g,
      );
      for (const match of namedMatches) {
        namedExports.push(match[1]);
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

      // Find default export
      const defaultMatch = content.match(/export\s+default\s+(\w+)/);
      if (defaultMatch) {
        defaultExport = defaultMatch[1];
      }

      return {
        namedExports,
        defaultExport,
        interfaces,
        types,
        content,
      };
    } catch (error) {
      return {
        namedExports: [],
        defaultExport: null,
        interfaces: [],
        types: [],
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

  generateFixedIndexContent(componentName, analysis) {
    const { fileName } = analysis.mainFile;
    const { namedExports, defaultExport, interfaces, types } =
      analysis.implementation;
    const baseName = fileName.replace(/\.(tsx?|jsx?)$/, "");

    let content = `/**\n * ${componentName} Component Export\n */\n`;

    // Handle default export (convert to named if it exists)
    if (defaultExport) {
      content += `export { default as ${defaultExport} } from "./${baseName}";\n`;
    }

    // Handle named component exports
    if (namedExports.length > 0) {
      content += `export { ${namedExports.join(", ")} } from "./${baseName}";\n`;
    }

    // Handle type exports (interfaces and types together)
    const allTypes = [...interfaces, ...types];
    if (allTypes.length > 0) {
      content += `export type { ${allTypes.join(", ")} } from "./${baseName}";\n`;
    }

    // Always include wildcard export for compatibility
    content += `\n// Re-export everything for compatibility\n`;
    content += `export * from "./${baseName}";\n`;

    return content;
  }

  fixComponent(componentName) {
    this.totalComponents++;
    const componentDir = join(COMPONENTS_DIR, componentName);
    const indexPath = join(componentDir, "index.ts");

    if (!existsSync(componentDir)) {
      this.log(`${componentName}: Directory does not exist`, "error");
      this.errors++;
      return;
    }

    const mainFile = this.findMainFile(componentDir, componentName);
    if (!mainFile) {
      this.log(`${componentName}: No implementation file found`, "error");
      this.errors++;
      return;
    }

    // Analyze the implementation file
    const implementationAnalysis = this.analyzeFile(mainFile.filePath);
    if (implementationAnalysis.error) {
      this.log(
        `${componentName}: Error analyzing implementation: ${implementationAnalysis.error}`,
        "error",
      );
      this.errors++;
      return;
    }

    // Analyze current index file
    const indexAnalysis = this.analyzeFile(indexPath);

    const analysis = {
      mainFile,
      implementation: implementationAnalysis,
      currentIndex: indexAnalysis,
    };

    // Check if fix is needed
    const needsFix = this.needsFixing(componentName, analysis);

    if (needsFix.length === 0) {
      this.log(`${componentName}: No issues found`, "info");
      return;
    }

    this.log(
      `${componentName}: Found ${needsFix.length} issues - ${needsFix.join(", ")}`,
      "warning",
    );

    // Generate fixed content
    const fixedContent = this.generateFixedIndexContent(
      componentName,
      analysis,
    );

    try {
      writeFileSync(indexPath, fixedContent, "utf-8");
      this.log(`${componentName}: Fixed index.ts`, "success");
      this.fixed++;
    } catch (error) {
      this.log(
        `${componentName}: Failed to write fixed index: ${error.message}`,
        "error",
      );
      this.errors++;
    }
  }

  needsFixing(componentName, analysis) {
    const issues = [];
    const { implementation, currentIndex } = analysis;

    // Check if trying to export non-existent named exports
    if (currentIndex.content) {
      const exportLines = currentIndex.content.match(
        /export\s*{\s*([^}]+)\s*}\s*from/g,
      );
      if (exportLines) {
        for (const line of exportLines) {
          const match = line.match(/export\s*{\s*([^}]+)\s*}\s*from/);
          if (match) {
            const exports = match[1].split(",").map((e) => e.trim());
            for (const exp of exports) {
              const cleanExp = exp.replace(/\s+as\s+\w+$/, ""); // Remove "as Alias"
              if (
                !implementation.namedExports.includes(cleanExp) &&
                !implementation.interfaces.includes(cleanExp) &&
                !implementation.types.includes(cleanExp) &&
                implementation.defaultExport !== cleanExp
              ) {
                issues.push(`exports non-existent: ${cleanExp}`);
              }
            }
          }
        }
      }
    }

    // Check if default export exists but not handled properly
    if (
      implementation.defaultExport &&
      currentIndex.content &&
      !currentIndex.content.includes(
        `default as ${implementation.defaultExport}`,
      )
    ) {
      issues.push("default export not properly handled");
    }

    // Check if named exports are missing
    for (const namedExport of implementation.namedExports) {
      if (
        currentIndex.content &&
        !currentIndex.content.includes(namedExport) &&
        !currentIndex.content.includes("export *")
      ) {
        issues.push(`missing named export: ${namedExport}`);
      }
    }

    // Check if types are missing
    const allTypes = [...implementation.interfaces, ...implementation.types];
    for (const type of allTypes) {
      if (
        currentIndex.content &&
        !currentIndex.content.includes(`type { ${type}`) &&
        !currentIndex.content.includes(`type {${type}`) &&
        !currentIndex.content.includes("export *")
      ) {
        issues.push(`missing type export: ${type}`);
      }
    }

    return issues;
  }

  run() {
    this.log("Starting comprehensive export fixing...", "info");

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
    this.log("COMPREHENSIVE EXPORT FIXING COMPLETE", "info");
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
      this.log("2. Run verification script to confirm fixes", "info");
      this.log("3. Check for any remaining TypeScript errors", "info");
    }

    if (this.errors > 0) {
      this.log(
        "\n⚠️  Some components had errors and may need manual review",
        "warning",
      );
    } else {
      this.log("\n🎉 All components processed successfully!", "success");
    }

    process.exit(this.errors > 0 ? 1 : 0);
  }
}

// Run the comprehensive fixer
const fixer = new ComprehensiveExportFixer();
fixer.run();
