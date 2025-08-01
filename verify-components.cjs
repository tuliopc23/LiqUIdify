#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  bright: "\x1b[1m",
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  header: (msg) =>
    console.log(`${colors.bright}${colors.cyan}${msg}${colors.reset}`),
  subheader: (msg) => console.log(`${colors.magenta}${msg}${colors.reset}`),
};

class ComponentVerifier {
  constructor() {
    this.basePath = "libs/components/src";
    this.componentsPath = path.join(this.basePath, "components");
    this.indexPath = path.join(this.basePath, "index.ts");
    this.errors = [];
    this.warnings = [];
    this.successes = [];
  }

  // Extract export statements from the main index.ts
  extractExportsFromIndex() {
    try {
      const indexContent = fs.readFileSync(this.indexPath, "utf8");
      const exportRegex = /export \* from ["']\.\/components\/([^"']+)["'];?/g;
      const exports = [];
      let match;

      while ((match = exportRegex.exec(indexContent)) !== null) {
        exports.push(match[1]);
      }

      return exports;
    } catch (error) {
      this.errors.push(`Failed to read main index.ts: ${error.message}`);
      return [];
    }
  }

  // Check if a component directory exists
  checkComponentDirectory(componentName) {
    const componentDir = path.join(this.componentsPath, componentName);
    return fs.existsSync(componentDir);
  }

  // Check if component index file exists
  checkComponentIndex(componentName) {
    const indexFile = path.join(this.componentsPath, componentName, "index.ts");
    return fs.existsSync(indexFile);
  }

  // Check if component implementation file exists
  checkComponentImplementation(componentName) {
    const componentDir = path.join(this.componentsPath, componentName);

    // Try different naming patterns
    const possibleFiles = [
      `${componentName}.tsx`,
      `${componentName.replace("-refactored", "")}.tsx`,
      `${componentName.replace("glass-", "")}.tsx`,
      "index.tsx",
    ];

    for (const fileName of possibleFiles) {
      const filePath = path.join(componentDir, fileName);
      if (fs.existsSync(filePath)) {
        return { exists: true, fileName };
      }
    }

    return { exists: false, fileName: null };
  }

  // Read and parse component index file
  parseComponentIndex(componentName) {
    try {
      const indexFile = path.join(
        this.componentsPath,
        componentName,
        "index.ts",
      );
      const content = fs.readFileSync(indexFile, "utf8");

      // Extract exports - handle various patterns
      const namedExports = [];
      const defaultExports = [];

      // Pattern 1: export { Component1, Component2 } from "./file"
      const namedExportRegex =
        /export\s*{\s*([^}]+)\s*}\s*from\s*["'][^"']+["'];?/g;
      let match;
      while ((match = namedExportRegex.exec(content)) !== null) {
        const exports = match[1]
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e);
        namedExports.push(...exports);
      }

      // Pattern 2: export { default as ComponentName } from "./file"
      const defaultAsRegex = /export\s*{\s*default\s+as\s+(\w+)\s*}\s*from/g;
      while ((match = defaultAsRegex.exec(content)) !== null) {
        defaultExports.push(match[1]);
      }

      // Pattern 3: export { ComponentName } from "./file"
      const directExportRegex =
        /export\s*{\s*([^}]+)\s*}\s*from\s*["'][^"']+["'];?/g;
      while ((match = directExportRegex.exec(content)) !== null) {
        const exports = match[1]
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e && !e.includes("default"));
        namedExports.push(...exports);
      }

      // Pattern 3: export * from "./file"
      const wildcardExports = /export\s*\*\s*from\s*["'][^"']+["'];?/g.test(
        content,
      );

      return {
        namedExports,
        defaultExports,
        hasWildcardExport: wildcardExports,
        content,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  // Parse component implementation file to find actual exports
  parseComponentImplementation(componentName) {
    try {
      const componentDir = path.join(this.componentsPath, componentName);

      // Find the actual implementation file
      const possibleFiles = [
        `${componentName}.tsx`,
        `${componentName.replace("-refactored", "")}.tsx`,
        `${componentName.replace("glass-", "")}.tsx`,
        "index.tsx",
      ];

      let componentFile = null;
      for (const fileName of possibleFiles) {
        const filePath = path.join(componentDir, fileName);
        if (fs.existsSync(filePath)) {
          componentFile = filePath;
          break;
        }
      }

      if (!componentFile) {
        return { error: "No implementation file found" };
      }

      const content = fs.readFileSync(componentFile, "utf8");

      const exports = {
        named: [],
        default: null,
        types: [],
      };

      // Find named exports
      const namedExportRegex = /export\s*{\s*([^}]+)\s*}/g;
      let match;
      while ((match = namedExportRegex.exec(content)) !== null) {
        const namedExports = match[1]
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e);
        exports.named.push(...namedExports);
      }

      // Find default export
      const defaultExportRegex = /export\s+default\s+(\w+)/g;
      match = defaultExportRegex.exec(content);
      if (match) {
        exports.default = match[1];
      }

      // Find type exports
      const typeExportRegex = /export\s+(?:type|interface)\s+(\w+)/g;
      while ((match = typeExportRegex.exec(content)) !== null) {
        exports.types.push(match[1]);
      }

      return exports;
    } catch (error) {
      return { error: error.message };
    }
  }

  // Verify a single component
  verifyComponent(componentName) {
    const issues = [];
    const info = [];

    // Check directory exists
    if (!this.checkComponentDirectory(componentName)) {
      issues.push(`Directory does not exist: ${componentName}`);
      return { componentName, issues, info };
    }

    // Check index file exists
    if (!this.checkComponentIndex(componentName)) {
      issues.push(`Index file missing: ${componentName}/index.ts`);
    }

    // Check implementation file exists
    const implCheck = this.checkComponentImplementation(componentName);
    if (!implCheck.exists) {
      issues.push(
        `Implementation file missing: ${componentName}/ (tried multiple patterns)`,
      );
    } else {
      info.push(`Implementation file: ${implCheck.fileName}`);
    }

    // If critical files are missing, skip further checks
    if (issues.length > 0 && !implCheck.exists) {
      return { componentName, issues, info };
    }

    // Parse index file
    const indexExports = this.parseComponentIndex(componentName);
    if (indexExports.error) {
      issues.push(`Failed to parse index file: ${indexExports.error}`);
      return { componentName, issues, info };
    }

    // Parse implementation file
    const implExports = this.parseComponentImplementation(componentName);
    if (implExports.error) {
      issues.push(`Failed to parse implementation file: ${implExports.error}`);
      return { componentName, issues, info };
    }

    // Verify exports match
    if (indexExports.hasWildcardExport) {
      info.push("Uses wildcard export (*)");
    } else {
      // Check if all exports in index are available in implementation
      const allIndexExports = [
        ...indexExports.namedExports,
        ...indexExports.defaultExports,
      ];
      const allImplExports = [...implExports.named];
      if (implExports.default) {
        allImplExports.push(implExports.default);
      }

      for (const exportName of allIndexExports) {
        if (!allImplExports.includes(exportName)) {
          issues.push(
            `Export '${exportName}' declared in index but not found in implementation`,
          );
        }
      }
    }

    // Report what was found
    if (implExports.named.length > 0) {
      info.push(`Named exports: ${implExports.named.join(", ")}`);
    }
    if (implExports.default) {
      info.push(`Default export: ${implExports.default}`);
    }
    if (implExports.types.length > 0) {
      info.push(`Type exports: ${implExports.types.join(", ")}`);
    }

    return { componentName, issues, info };
  }

  // Main verification process
  async run() {
    log.header("🔍 LiqUIdify Component Verification");
    log.header("=====================================\n");

    // Check if base paths exist
    if (!fs.existsSync(this.basePath)) {
      log.error(`Base path does not exist: ${this.basePath}`);
      return;
    }

    if (!fs.existsSync(this.componentsPath)) {
      log.error(`Components path does not exist: ${this.componentsPath}`);
      return;
    }

    if (!fs.existsSync(this.indexPath)) {
      log.error(`Main index file does not exist: ${this.indexPath}`);
      return;
    }

    // Extract component exports from main index
    const componentExports = this.extractExportsFromIndex();
    if (componentExports.length === 0) {
      log.warn("No component exports found in main index.ts");
      return;
    }

    log.info(
      `Found ${componentExports.length} component exports in main index.ts\n`,
    );

    // Verify each component
    const results = [];
    for (const componentName of componentExports) {
      const result = this.verifyComponent(componentName);
      results.push(result);
    }

    // Report results
    log.subheader("Verification Results:");
    log.subheader("===================\n");

    let totalErrors = 0;
    let totalSuccess = 0;

    for (const result of results) {
      if (result.issues.length === 0) {
        log.success(`${result.componentName}`);
        if (result.info.length > 0) {
          result.info.forEach((info) =>
            console.log(`  ${colors.cyan}→ ${info}${colors.reset}`),
          );
        }
        totalSuccess++;
      } else {
        log.error(`${result.componentName}`);
        result.issues.forEach((issue) =>
          console.log(`  ${colors.red}→ ${issue}${colors.reset}`),
        );
        if (result.info.length > 0) {
          result.info.forEach((info) =>
            console.log(`  ${colors.cyan}→ ${info}${colors.reset}`),
          );
        }
        totalErrors += result.issues.length;
      }
      console.log();
    }

    // Summary
    log.header("Summary:");
    log.header("========");
    log.info(`Total components checked: ${results.length}`);
    log.success(`Components without issues: ${totalSuccess}`);
    log.error(`Components with issues: ${results.length - totalSuccess}`);
    log.error(`Total issues found: ${totalErrors}`);

    if (totalErrors === 0) {
      log.success("\n🎉 All components verified successfully!");
    } else {
      log.warn("\n⚠️  Issues found. Please review and fix the problems above.");
    }

    // Check for orphaned component directories
    log.subheader("\nChecking for orphaned components...");
    const allComponentDirs = fs
      .readdirSync(this.componentsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    const orphaned = allComponentDirs.filter(
      (dir) => !componentExports.includes(dir),
    );
    if (orphaned.length > 0) {
      log.warn(
        `Found ${orphaned.length} component directories not exported in main index:`,
      );
      orphaned.forEach((dir) =>
        console.log(`  ${colors.yellow}→ ${dir}${colors.reset}`),
      );
    } else {
      log.success("No orphaned component directories found.");
    }
  }
}

// Run the verification
const verifier = new ComponentVerifier();
verifier.run().catch((error) => {
  log.error(`Verification failed: ${error.message}`);
  process.exit(1);
});
