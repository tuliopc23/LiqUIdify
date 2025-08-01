#!/usr/bin/env node

/**
 * Component Completeness Audit Script
 * Validates that every export path in package.json resolves to actual built files
 * and checks component implementation completeness
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const AUDIT_CONFIG = {
  // Directories to check
  sourceDir: path.join(process.cwd(), "libs/components/src"),
  distDir: path.join(process.cwd(), "dist/libs/components"),
  outputDir: path.join(process.cwd(), "reports/component-audit"),

  // Required files for each component
  requiredFiles: ["index.ts", "{component}.tsx", "{component}.stories.tsx"],

  // Optional files that should be present for mature components
  optionalFiles: ["{component}.test.tsx", "{component}.types.ts", "README.md"],

  // Component naming patterns
  componentPattern: /^glass-[\w-]+$/,

  // Export patterns to validate
  exportPatterns: {
    component: /export.*(?:Glass\w+|glass\w+)/,
    types: /export.*(?:Props|Config|Theme)/,
    styles: /export.*(?:styles|css|className)/,
  },
};

class ComponentAuditor {
  constructor() {
    this.results = {
      components: [],
      exports: [],
      violations: [],
      warnings: [],
      summary: {
        totalComponents: 0,
        completeComponents: 0,
        missingImplementations: 0,
        missingTests: 0,
        missingStories: 0,
        brokenExports: 0,
      },
    };
    this.packageJson = null;
  }

  async init() {
    // Ensure output directory exists
    if (!fs.existsSync(AUDIT_CONFIG.outputDir)) {
      fs.mkdirSync(AUDIT_CONFIG.outputDir, { recursive: true });
    }

    // Load package.json
    const packagePath = path.join(process.cwd(), "package.json");
    if (fs.existsSync(packagePath)) {
      this.packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    }

    console.log("🔍 Starting component completeness audit...");
    console.log(`📁 Source: ${AUDIT_CONFIG.sourceDir}`);
    console.log(`📁 Dist: ${AUDIT_CONFIG.distDir}`);
    console.log(`📁 Output: ${AUDIT_CONFIG.outputDir}`);
    console.log("━".repeat(60));
  }

  scanComponents() {
    console.log("\n📦 Scanning components...");

    const componentsDir = path.join(AUDIT_CONFIG.sourceDir, "components");

    if (!fs.existsSync(componentsDir)) {
      this.addViolation(
        "critical",
        "Components directory not found",
        componentsDir,
      );
      return;
    }

    const componentDirs = fs.readdirSync(componentsDir).filter((dir) => {
      const dirPath = path.join(componentsDir, dir);
      return (
        fs.statSync(dirPath).isDirectory() &&
        AUDIT_CONFIG.componentPattern.test(dir)
      );
    });

    this.results.summary.totalComponents = componentDirs.length;
    console.log(`Found ${componentDirs.length} component directories`);

    componentDirs.forEach((componentDir) => {
      this.auditComponent(componentDir);
    });
  }

  auditComponent(componentName) {
    console.log(`\n🔍 Auditing ${componentName}...`);

    const componentPath = path.join(
      AUDIT_CONFIG.sourceDir,
      "components",
      componentName,
    );
    const component = {
      name: componentName,
      path: componentPath,
      files: {
        required: {},
        optional: {},
        extra: [],
      },
      exports: [],
      violations: [],
      warnings: [],
      completeness: 0,
    };

    // Check required files
    AUDIT_CONFIG.requiredFiles.forEach((filePattern) => {
      const fileName = filePattern.replace("{component}", componentName);
      const filePath = path.join(componentPath, fileName);

      component.files.required[fileName] = {
        exists: fs.existsSync(filePath),
        path: filePath,
      };

      if (!fs.existsSync(filePath)) {
        const violation = `Missing required file: ${fileName}`;
        component.violations.push(violation);
        this.addViolation("error", violation, filePath);

        if (fileName.endsWith(".tsx")) {
          this.results.summary.missingImplementations++;
        } else if (fileName.includes(".test.")) {
          this.results.summary.missingTests++;
        } else if (fileName.includes(".stories.")) {
          this.results.summary.missingStories++;
        }
      }
    });

    // Check optional files
    AUDIT_CONFIG.optionalFiles.forEach((filePattern) => {
      const fileName = filePattern.replace("{component}", componentName);
      const filePath = path.join(componentPath, fileName);

      component.files.optional[fileName] = {
        exists: fs.existsSync(filePath),
        path: filePath,
      };

      if (!fs.existsSync(filePath)) {
        const warning = `Missing optional file: ${fileName}`;
        component.warnings.push(warning);
        this.addWarning("Missing optional file", fileName, filePath);
      }
    });

    // Check for extra files
    if (fs.existsSync(componentPath)) {
      const allFiles = fs.readdirSync(componentPath);
      const knownFiles = [
        ...Object.keys(component.files.required),
        ...Object.keys(component.files.optional),
      ];

      component.files.extra = allFiles.filter(
        (file) => !knownFiles.includes(file) && !file.startsWith("."),
      );
    }

    // Analyze main component file
    this.analyzeComponentImplementation(component);

    // Analyze exports
    this.analyzeComponentExports(component);

    // Calculate completeness score
    const requiredCount = Object.keys(component.files.required).length;
    const requiredExists = Object.values(component.files.required).filter(
      (f) => f.exists,
    ).length;
    const optionalCount = Object.keys(component.files.optional).length;
    const optionalExists = Object.values(component.files.optional).filter(
      (f) => f.exists,
    ).length;

    component.completeness = Math.round(
      ((requiredExists / requiredCount) * 0.7 +
        (optionalExists / optionalCount) * 0.3) *
        100,
    );

    if (component.completeness === 100 && component.violations.length === 0) {
      this.results.summary.completeComponents++;
    }

    this.results.components.push(component);

    // Console output
    const status = component.violations.length === 0 ? "✅" : "❌";
    console.log(
      `   ${status} ${componentName} - ${component.completeness}% complete`,
    );

    if (component.violations.length > 0) {
      component.violations.forEach((violation) => {
        console.log(`      ❌ ${violation}`);
      });
    }

    if (component.warnings.length > 0) {
      console.log(`      ⚠️  ${component.warnings.length} warning(s)`);
    }
  }

  analyzeComponentImplementation(component) {
    const mainFile = Object.values(component.files.required).find(
      (f) => f.path.endsWith(".tsx") && f.exists,
    );

    if (!mainFile) return;

    try {
      const content = fs.readFileSync(mainFile.path, "utf8");

      // Check for required exports
      if (!AUDIT_CONFIG.exportPatterns.component.test(content)) {
        const violation = "Main component export not found";
        component.violations.push(violation);
        this.addViolation("error", violation, mainFile.path);
      }

      // Check for TypeScript
      if (!content.includes("interface") && !content.includes("type ")) {
        const warning = "No TypeScript interfaces or types found";
        component.warnings.push(warning);
        this.addWarning("TypeScript types", warning, mainFile.path);
      }

      // Check for accessibility features
      const a11yPatterns = [
        /aria-\w+/,
        /role=/,
        /tabIndex/,
        /onKeyDown/,
        /onKeyPress/,
      ];

      const hasA11yFeatures = a11yPatterns.some((pattern) =>
        pattern.test(content),
      );
      if (!hasA11yFeatures) {
        const warning = "No accessibility attributes found";
        component.warnings.push(warning);
        this.addWarning("Accessibility", warning, mainFile.path);
      }

      // Check for prop validation
      if (
        !content.includes("PropTypes") &&
        !content.includes("interface ") &&
        !content.includes("type ")
      ) {
        const warning = "No prop validation found";
        component.warnings.push(warning);
        this.addWarning("Prop validation", warning, mainFile.path);
      }

      // Check component complexity (basic heuristic)
      const lineCount = content.split("\n").length;
      if (lineCount > 300) {
        const warning = `Component is large (${lineCount} lines) - consider splitting`;
        component.warnings.push(warning);
        this.addWarning("Component size", warning, mainFile.path);
      }
    } catch (error) {
      const violation = `Failed to analyze component implementation: ${error.message}`;
      component.violations.push(violation);
      this.addViolation("error", violation, mainFile.path);
    }
  }

  analyzeComponentExports(component) {
    const indexFile = component.files.required["index.ts"];

    if (!indexFile || !indexFile.exists) return;

    try {
      const content = fs.readFileSync(indexFile.path, "utf8");

      // Extract exports
      const exportMatches = content.match(/export\s+.*?(?:;|$)/gm) || [];
      component.exports = exportMatches;

      // Check for proper exports
      if (exportMatches.length === 0) {
        const violation = "No exports found in index.ts";
        component.violations.push(violation);
        this.addViolation("error", violation, indexFile.path);
      }

      // Check for re-exports
      const hasReExports =
        content.includes("export") && content.includes("from");
      if (!hasReExports) {
        const warning =
          "No re-exports found - may not be following export patterns";
        component.warnings.push(warning);
        this.addWarning("Export patterns", warning, indexFile.path);
      }
    } catch (error) {
      const violation = `Failed to analyze exports: ${error.message}`;
      component.violations.push(violation);
      this.addViolation("error", violation, indexFile.path);
    }
  }

  validatePackageExports() {
    console.log("\n📦 Validating package.json exports...");

    if (!this.packageJson || !this.packageJson.exports) {
      this.addViolation(
        "critical",
        "No exports field in package.json",
        "package.json",
      );
      return;
    }

    const exports = this.packageJson.exports;

    Object.entries(exports).forEach(([exportPath, exportConfig]) => {
      const exportResult = {
        path: exportPath,
        config: exportConfig,
        status: "unknown",
        files: {},
        violations: [],
      };

      // Handle different export configurations
      if (typeof exportConfig === "string") {
        exportResult.files.main = exportConfig;
        exportResult.status = this.validateExportFile(exportConfig)
          ? "valid"
          : "invalid";
      } else if (exportConfig && typeof exportConfig === "object") {
        // Handle conditional exports
        ["import", "require", "types", "default"].forEach((condition) => {
          if (exportConfig[condition]) {
            exportResult.files[condition] = exportConfig[condition];
            if (!this.validateExportFile(exportConfig[condition])) {
              exportResult.violations.push(
                `${condition} file not found: ${exportConfig[condition]}`,
              );
              exportResult.status = "invalid";
            }
          }
        });

        if (
          exportResult.status === "unknown" &&
          exportResult.violations.length === 0
        ) {
          exportResult.status = "valid";
        }
      }

      this.results.exports.push(exportResult);

      if (exportResult.status === "invalid") {
        this.results.summary.brokenExports++;
        console.log(
          `   ❌ ${exportPath} - ${exportResult.violations.join(", ")}`,
        );
        exportResult.violations.forEach((violation) => {
          this.addViolation("error", violation, exportPath);
        });
      } else {
        console.log(`   ✅ ${exportPath}`);
      }
    });
  }

  validateExportFile(filePath) {
    const fullPath = path.join(process.cwd(), filePath);
    return fs.existsSync(fullPath);
  }

  validateBuildOutput() {
    console.log("\n🏗️  Validating build output...");

    if (!fs.existsSync(AUDIT_CONFIG.distDir)) {
      this.addViolation(
        "critical",
        "Dist directory not found - run build first",
        AUDIT_CONFIG.distDir,
      );
      return;
    }

    // Check for main bundle files
    const expectedFiles = ["index.mjs", "index.cjs", "types/index.d.ts"];

    expectedFiles.forEach((file) => {
      const filePath = path.join(AUDIT_CONFIG.distDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`   ✅ ${file}`);
      } else {
        const violation = `Missing build output: ${file}`;
        this.addViolation("error", violation, filePath);
        console.log(`   ❌ ${file}`);
      }
    });

    // Validate bundle integrity
    this.validateBundleIntegrity();
  }

  validateBundleIntegrity() {
    const mainBundle = path.join(AUDIT_CONFIG.distDir, "index.mjs");

    if (!fs.existsSync(mainBundle)) return;

    try {
      const content = fs.readFileSync(mainBundle, "utf8");

      // Check for obvious build errors
      const buildErrors = [
        "SyntaxError",
        "ReferenceError",
        "TypeError",
        "undefined is not a function",
        "Cannot read property",
      ];

      buildErrors.forEach((error) => {
        if (content.includes(error)) {
          const violation = `Potential build error in bundle: ${error}`;
          this.addViolation("critical", violation, mainBundle);
        }
      });

      // Check bundle size
      const stats = fs.statSync(mainBundle);
      const sizeKB = Math.round(stats.size / 1024);

      console.log(`   📊 Bundle size: ${sizeKB}KB`);

      if (sizeKB > 100) {
        const warning = `Bundle size is large (${sizeKB}KB) - consider optimization`;
        this.addWarning("Bundle size", warning, mainBundle);
      }
    } catch (error) {
      const violation = `Failed to validate bundle: ${error.message}`;
      this.addViolation("error", violation, mainBundle);
    }
  }

  addViolation(severity, message, location) {
    this.results.violations.push({
      severity,
      message,
      location,
      timestamp: new Date().toISOString(),
    });
  }

  addWarning(category, message, location) {
    this.results.warnings.push({
      category,
      message,
      location,
      timestamp: new Date().toISOString(),
    });
  }

  generateReport() {
    const report = {
      metadata: {
        timestamp: new Date().toISOString(),
        auditor: "component-audit",
        version: "1.0.0",
      },
      summary: this.results.summary,
      components: this.results.components,
      exports: this.results.exports,
      violations: this.results.violations,
      warnings: this.results.warnings,
      recommendations: this.generateRecommendations(),
    };

    // Write JSON report
    const jsonPath = path.join(AUDIT_CONFIG.outputDir, "component-audit.json");
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

    // Write HTML report
    this.generateHtmlReport(report);

    // Write markdown report
    this.generateMarkdownReport(report);

    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.results.summary.missingImplementations > 0) {
      recommendations.push({
        priority: "high",
        category: "implementation",
        message: `${this.results.summary.missingImplementations} components are missing implementations`,
        action: "Create component .tsx files for all missing implementations",
      });
    }

    if (this.results.summary.missingStories > 0) {
      recommendations.push({
        priority: "medium",
        category: "documentation",
        message: `${this.results.summary.missingStories} components are missing Storybook stories`,
        action: "Add .stories.tsx files for better component documentation",
      });
    }

    if (this.results.summary.missingTests > 0) {
      recommendations.push({
        priority: "medium",
        category: "testing",
        message: `${this.results.summary.missingTests} components are missing tests`,
        action: "Add .test.tsx files to improve test coverage",
      });
    }

    if (this.results.summary.brokenExports > 0) {
      recommendations.push({
        priority: "critical",
        category: "exports",
        message: `${this.results.summary.brokenExports} package exports are broken`,
        action: "Fix package.json exports to point to existing files",
      });
    }

    const completenessRate =
      (this.results.summary.completeComponents /
        this.results.summary.totalComponents) *
      100;
    if (completenessRate < 80) {
      recommendations.push({
        priority: "high",
        category: "completeness",
        message: `Only ${Math.round(completenessRate)}% of components are complete`,
        action:
          "Focus on completing missing required files for existing components",
      });
    }

    return recommendations;
  }

  generateHtmlReport(report) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Audit Report - LiqUIdify</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #059669; color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .content { padding: 30px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .summary-card { background: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #059669; }
        .component-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 15px; margin: 15px 0; }
        .violation { background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px; margin: 5px 0; }
        .warning { background: #fffbeb; border: 1px solid #fed7aa; border-radius: 6px; padding: 10px; margin: 5px 0; }
        .recommendation { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 15px; margin: 10px 0; }
        .status-complete { color: #059669; font-weight: bold; }
        .status-incomplete { color: #dc2626; font-weight: bold; }
        .progress-bar { background: #e5e7eb; border-radius: 4px; overflow: hidden; height: 8px; margin: 10px 0; }
        .progress-fill { background: #059669; height: 100%; transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📦 Component Audit Report</h1>
            <p>LiqUIdify Component Library - ${report.metadata.timestamp}</p>
        </div>
        
        <div class="content">
            <div class="summary-grid">
                <div class="summary-card">
                    <h3>Total Components</h3>
                    <div style="font-size: 2em; font-weight: bold;">${report.summary.totalComponents}</div>
                </div>
                <div class="summary-card">
                    <h3>Complete</h3>
                    <div style="font-size: 2em; font-weight: bold; color: #059669;">${report.summary.completeComponents}</div>
                </div>
                <div class="summary-card">
                    <h3>Missing Implementations</h3>
                    <div style="font-size: 2em; font-weight: bold; color: #dc2626;">${report.summary.missingImplementations}</div>
                </div>
                <div class="summary-card">
                    <h3>Broken Exports</h3>
                    <div style="font-size: 2em; font-weight: bold; color: #d97706;">${report.summary.brokenExports}</div>
                </div>
            </div>
            
            <h2>📊 Components Overview</h2>
            ${report.components
              .map(
                (component) => `
                <div class="component-card">
                    <h3>${component.name} <span class="status-${component.completeness === 100 ? "complete" : "incomplete"}">(${component.completeness}%)</span></h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${component.completeness}%"></div>
                    </div>
                    
                    ${
                      component.violations.length > 0
                        ? `
                        <h4>❌ Violations (${component.violations.length})</h4>
                        ${component.violations.map((violation) => `<div class="violation">${violation}</div>`).join("")}
                    `
                        : ""
                    }
                    
                    ${
                      component.warnings.length > 0
                        ? `
                        <h4>⚠️ Warnings (${component.warnings.length})</h4>
                        ${component.warnings.map((warning) => `<div class="warning">${warning}</div>`).join("")}
                    `
                        : ""
                    }
                    
                    <details>
                        <summary>File Details</summary>
                        <ul>
                            ${Object.entries(component.files.required)
                              .map(
                                ([file, info]) =>
                                  `<li>${info.exists ? "✅" : "❌"} ${file} (required)</li>`,
                              )
                              .join("")}
                            ${Object.entries(component.files.optional)
                              .map(
                                ([file, info]) =>
                                  `<li>${info.exists ? "✅" : "⚪"} ${file} (optional)</li>`,
                              )
                              .join("")}
                        </ul>
                    </details>
                </div>
            `,
              )
              .join("")}
            
            <h2>🎯 Recommendations</h2>
            ${report.recommendations
              .map(
                (rec) => `
                <div class="recommendation">
                    <h4>${rec.priority.toUpperCase()}: ${rec.category}</h4>
                    <p><strong>Issue:</strong> ${rec.message}</p>
                    <p><strong>Action:</strong> ${rec.action}</p>
                </div>
            `,
              )
              .join("")}
            
            <h2>📋 Export Validation</h2>
            ${report.exports
              .map(
                (exp) => `
                <div class="component-card">
                    <h4>${exp.path} ${exp.status === "valid" ? "✅" : "❌"}</h4>
                    ${exp.violations.length > 0 ? exp.violations.map((v) => `<div class="violation">${v}</div>`).join("") : ""}
                    <details>
                        <summary>Files</summary>
                        <ul>
                            ${Object.entries(exp.files)
                              .map(
                                ([type, file]) => `<li>${type}: ${file}</li>`,
                              )
                              .join("")}
                        </ul>
                    </details>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>
</body>
</html>`;

    const htmlPath = path.join(AUDIT_CONFIG.outputDir, "component-audit.html");
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`📄 HTML report saved: ${htmlPath}`);
  }

  generateMarkdownReport(report) {
    const mdContent = `# Component Audit Report

**Generated:** ${report.metadata.timestamp}
**Library:** LiqUIdify Component Library

## Summary

| Metric | Count |
|--------|-------|
| Total Components | ${report.summary.totalComponents} |
| Complete Components | ${report.summary.completeComponents} |
| Missing Implementations | ${report.summary.missingImplementations} |
| Missing Tests | ${report.summary.missingTests} |
| Missing Stories | ${report.summary.missingStories} |
| Broken Exports | ${report.summary.brokenExports} |

## Components

${report.components
  .map(
    (component) => `
### ${component.name} (${component.completeness}% complete)

${
  component.violations.length > 0
    ? `
**Violations:**
${component.violations.map((v) => `- ❌ ${v}`).join("\n")}
`
    : ""
}

${
  component.warnings.length > 0
    ? `
**Warnings:**
${component.warnings.map((w) => `- ⚠️ ${w}`).join("\n")}
`
    : ""
}

**Files:**
${Object.entries(component.files.required)
  .map(([file, info]) => `- ${info.exists ? "✅" : "❌"} ${file} (required)`)
  .join("\n")}
${Object.entries(component.files.optional)
  .map(([file, info]) => `- ${info.exists ? "✅" : "⚪"} ${file} (optional)`)
  .join("\n")}
`,
  )
  .join("\n")}

## Recommendations

${report.recommendations
  .map(
    (rec) => `
### ${rec.priority.toUpperCase()}: ${rec.category}
- **Issue:** ${rec.message}
- **Action:** ${rec.action}
`,
  )
  .join("\n")}

## Next Steps

1. Fix all critical violations first
2. Complete missing component implementations
3. Add missing tests and stories
4. Validate package.json exports
5. Re-run audit to verify fixes
`;

    const mdPath = path.join(AUDIT_CONFIG.outputDir, "component-audit.md");
    fs.writeFileSync(mdPath, mdContent);
    console.log(`📄 Markdown report saved: ${mdPath}`);
  }

  async run() {
    await this.init();

    // Run audit steps
    this.scanComponents();
    this.validatePackageExports();
    this.validateBuildOutput();

    // Generate report
    console.log("\n📊 Generating reports...");
    const report = this.generateReport();

    // Final summary
    console.log("\n" + "━".repeat(60));
    console.log("🏁 AUDIT COMPLETE");
    console.log("━".repeat(60));
    console.log(`📦 Total Components: ${report.summary.totalComponents}`);
    console.log(`✅ Complete: ${report.summary.completeComponents}`);
    console.log(
      `❌ Missing Implementations: ${report.summary.missingImplementations}`,
    );
    console.log(`📝 Missing Tests: ${report.summary.missingTests}`);
    console.log(`📚 Missing Stories: ${report.summary.missingStories}`);
    console.log(`🔗 Broken Exports: ${report.summary.brokenExports}`);
    console.log(`📁 Reports saved to: ${AUDIT_CONFIG.outputDir}`);

    const completenessRate =
      (report.summary.completeComponents / report.summary.totalComponents) *
      100;
    console.log(`📊 Overall Completeness: ${Math.round(completenessRate)}%`);

    // Exit with appropriate code
    const hasCriticalIssues =
      report.summary.missingImplementations > 0 ||
      report.summary.brokenExports > 0;
    process.exit(hasCriticalIssues ? 1 : 0);
  }
}

// Run the audit if called directly
if (require.main === module) {
  const auditor = new ComponentAuditor();
  auditor.run().catch((error) => {
    console.error("❌ Component audit failed:", error);
    process.exit(1);
  });
}

module.exports = ComponentAuditor;
