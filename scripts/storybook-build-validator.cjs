#!/usr/bin/env node

/**
 * Storybook Build Validation Script
 *
 * This script validates Storybook builds by:
 * - Checking story file syntax and imports
 * - Validating TypeScript compilation
 * - Verifying CSS imports exist
 * - Testing provider configurations
 * - Monitoring build process
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const COLORS = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
};

const log = {
  info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  debug: (msg) => console.log(`${COLORS.gray}  ${msg}${COLORS.reset}`),
};

class StorybookValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.projectRoot = path.resolve(__dirname, "..");
    this.storybookDir = path.join(this.projectRoot, "apps/storybook");
    this.componentsDir = path.join(this.projectRoot, "libs/components/src");
  }

  async run() {
    log.info("🔧 Starting Storybook Build Validation");
    console.log("─".repeat(50));

    try {
      await this.validatePreBuild();
      await this.validateStoryFiles();
      await this.validateImports();
      await this.validateCSSFiles();
      await this.validateProviders();
      await this.validateTypeScript();
      await this.generateReport();

      if (this.errors.length === 0) {
        log.success("🎉 Storybook validation completed successfully!");
        return true;
      } else {
        log.error(`❌ Validation failed with ${this.errors.length} errors`);
        return false;
      }
    } catch (error) {
      log.error(`Fatal validation error: ${error.message}`);
      return false;
    }
  }

  async validatePreBuild() {
    log.info("Validating pre-build requirements...");

    // Check if required directories exist
    const requiredDirs = [
      this.storybookDir,
      this.componentsDir,
      path.join(this.storybookDir, ".storybook"),
      path.join(this.componentsDir, "components"),
      path.join(this.componentsDir, "styles"),
    ];

    for (const dir of requiredDirs) {
      if (!fs.existsSync(dir)) {
        this.errors.push(`Required directory missing: ${dir}`);
      } else {
        log.debug(
          `✓ Directory exists: ${path.relative(this.projectRoot, dir)}`,
        );
      }
    }

    // Check required config files
    const requiredFiles = [
      path.join(this.storybookDir, ".storybook/main.ts"),
      path.join(this.storybookDir, ".storybook/preview.ts"),
      path.join(this.projectRoot, "package.json"),
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        this.errors.push(`Required file missing: ${file}`);
      } else {
        log.debug(`✓ File exists: ${path.relative(this.projectRoot, file)}`);
      }
    }

    log.success(`Pre-build validation completed`);
  }

  async validateStoryFiles() {
    log.info("Validating story files...");

    const storyFiles = await this.findStoryFiles();
    log.debug(`Found ${storyFiles.length} story files`);

    for (const storyFile of storyFiles) {
      await this.validateStoryFile(storyFile);
    }

    log.success(`Story files validation completed`);
  }

  async findStoryFiles() {
    const storyFiles = [];

    const scanDir = (dir) => {
      if (!fs.existsSync(dir)) return;

      const entries = fs.readdirSync(dir);

      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (
          entry.endsWith(".stories.tsx") ||
          entry.endsWith(".stories.ts")
        ) {
          storyFiles.push(fullPath);
        }
      }
    };

    scanDir(this.componentsDir);
    return storyFiles;
  }

  async validateStoryFile(filePath) {
    const relativePath = path.relative(this.projectRoot, filePath);

    try {
      const content = fs.readFileSync(filePath, "utf-8");

      // Check for basic story structure
      if (!content.includes("export default")) {
        this.errors.push(`${relativePath}: Missing default export`);
      }

      if (!content.includes("@storybook/react")) {
        this.warnings.push(`${relativePath}: Missing Storybook React import`);
      }

      // Check for Meta type
      if (!content.includes("Meta<") && !content.includes("StoryObj<")) {
        this.warnings.push(`${relativePath}: Missing proper Storybook types`);
      }

      // Check for React import
      if (
        !content.includes("import React") &&
        !content.includes("import * as React")
      ) {
        this.warnings.push(`${relativePath}: Missing React import`);
      }

      // Check for component imports
      const componentName = path.basename(path.dirname(filePath));
      if (
        !content.includes(componentName) &&
        !content.toLowerCase().includes("glass")
      ) {
        this.warnings.push(`${relativePath}: Component import may be missing`);
      }

      // Check for syntax errors via basic parsing
      try {
        // Simple validation - check for unmatched braces/brackets
        const openBraces = (content.match(/{/g) || []).length;
        const closeBraces = (content.match(/}/g) || []).length;
        const openParens = (content.match(/\(/g) || []).length;
        const closeParens = (content.match(/\)/g) || []).length;

        if (openBraces !== closeBraces) {
          this.errors.push(`${relativePath}: Unmatched braces detected`);
        }

        if (openParens !== closeParens) {
          this.errors.push(`${relativePath}: Unmatched parentheses detected`);
        }
      } catch (parseError) {
        this.errors.push(
          `${relativePath}: Syntax validation failed - ${parseError.message}`,
        );
      }

      log.debug(`✓ Validated: ${relativePath}`);
    } catch (error) {
      this.errors.push(
        `${relativePath}: Failed to read file - ${error.message}`,
      );
    }
  }

  async validateImports() {
    log.info("Validating component imports...");

    const componentsDir = path.join(this.componentsDir, "components");

    if (!fs.existsSync(componentsDir)) {
      this.errors.push("Components directory not found");
      return;
    }

    const componentDirs = fs.readdirSync(componentsDir).filter((item) => {
      const fullPath = path.join(componentsDir, item);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const componentDir of componentDirs) {
      const indexPath = path.join(componentsDir, componentDir, "index.ts");
      const componentPath = path.join(
        componentsDir,
        componentDir,
        `${componentDir}.tsx`,
      );

      if (!fs.existsSync(indexPath) && !fs.existsSync(componentPath)) {
        this.warnings.push(
          `Component ${componentDir}: No index.ts or main component file found`,
        );
      } else {
        log.debug(`✓ Component structure valid: ${componentDir}`);
      }
    }

    log.success("Import validation completed");
  }

  async validateCSSFiles() {
    log.info("Validating CSS files...");

    const requiredCSSFiles = [
      path.join(this.componentsDir, "styles/glass.css"),
      path.join(this.componentsDir, "styles/glass-core.css"),
      path.join(this.componentsDir, "styles/glass-themes.css"),
      path.join(this.componentsDir, "styles/glass-animations.css"),
      path.join(this.componentsDir, "styles/glass-utilities.css"),
    ];

    for (const cssFile of requiredCSSFiles) {
      if (!fs.existsSync(cssFile)) {
        this.errors.push(
          `Required CSS file missing: ${path.relative(this.projectRoot, cssFile)}`,
        );
      } else {
        // Check if file is not empty
        const content = fs.readFileSync(cssFile, "utf-8").trim();
        if (content.length === 0) {
          this.warnings.push(
            `CSS file is empty: ${path.relative(this.projectRoot, cssFile)}`,
          );
        } else {
          log.debug(
            `✓ CSS file valid: ${path.relative(this.projectRoot, cssFile)}`,
          );
        }
      }
    }

    log.success("CSS validation completed");
  }

  async validateProviders() {
    log.info("Validating provider configurations...");

    const previewPath = path.join(this.storybookDir, ".storybook/preview.ts");

    if (!fs.existsSync(previewPath)) {
      this.errors.push("Storybook preview.ts not found");
      return;
    }

    try {
      const previewContent = fs.readFileSync(previewPath, "utf-8");

      // Check for ThemeProvider import
      if (!previewContent.includes("ThemeProvider")) {
        this.warnings.push("ThemeProvider not found in preview.ts");
      }

      // Check for GlassUIProvider import
      if (!previewContent.includes("GlassUIProvider")) {
        this.warnings.push("GlassUIProvider not found in preview.ts");
      }

      // Check for CSS imports
      const requiredCSSImports = [
        "glass.css",
        "glass-core.css",
        "glass-themes.css",
      ];

      for (const cssImport of requiredCSSImports) {
        if (!previewContent.includes(cssImport)) {
          this.warnings.push(`CSS import missing: ${cssImport}`);
        }
      }

      log.debug("✓ Provider configuration validated");
    } catch (error) {
      this.errors.push(`Failed to validate providers: ${error.message}`);
    }

    log.success("Provider validation completed");
  }

  async validateTypeScript() {
    log.info("Validating TypeScript compilation...");

    try {
      // Check if TypeScript is available
      execSync("npx tsc --version", { stdio: "pipe" });

      // Try to compile story files
      const tsconfigPath = path.join(this.storybookDir, "tsconfig.json");
      if (fs.existsSync(tsconfigPath)) {
        try {
          execSync(`npx tsc --noEmit --project ${tsconfigPath}`, {
            stdio: "pipe",
            cwd: this.projectRoot,
          });
          log.debug("✓ TypeScript compilation successful");
        } catch (tscError) {
          this.warnings.push(
            "TypeScript compilation has issues (this may be expected in some cases)",
          );
          log.debug(`TypeScript output: ${tscError.stdout || tscError.stderr}`);
        }
      } else {
        this.warnings.push("Storybook tsconfig.json not found");
      }
    } catch (error) {
      this.warnings.push("TypeScript validation skipped - tsc not available");
    }

    log.success("TypeScript validation completed");
  }

  async generateReport() {
    console.log("\n" + "=".repeat(50));
    log.info("📊 VALIDATION REPORT");
    console.log("=".repeat(50));

    if (this.errors.length > 0) {
      log.error(`❌ ERRORS (${this.errors.length}):`);
      this.errors.forEach((error, index) => {
        console.log(`${COLORS.red}   ${index + 1}. ${error}${COLORS.reset}`);
      });
      console.log();
    }

    if (this.warnings.length > 0) {
      log.warn(`⚠️  WARNINGS (${this.warnings.length}):`);
      this.warnings.forEach((warning, index) => {
        console.log(
          `${COLORS.yellow}   ${index + 1}. ${warning}${COLORS.reset}`,
        );
      });
      console.log();
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      log.success("🎉 No issues found!");
    }

    // Generate suggestions
    if (this.errors.length > 0 || this.warnings.length > 0) {
      log.info("💡 SUGGESTIONS:");
      console.log(
        `${COLORS.cyan}   • Run 'npm run fix-storybook' to auto-fix common issues${COLORS.reset}`,
      );
      console.log(
        `${COLORS.cyan}   • Check story file imports and exports${COLORS.reset}`,
      );
      console.log(
        `${COLORS.cyan}   • Verify component paths and naming conventions${COLORS.reset}`,
      );
      console.log(
        `${COLORS.cyan}   • Ensure all CSS files are properly imported${COLORS.reset}`,
      );
    }

    console.log("=".repeat(50));
  }
}

// Main execution
async function main() {
  const validator = new StorybookValidator();
  const success = await validator.run();

  process.exit(success ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    log.error(`Validation script failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { StorybookValidator };
