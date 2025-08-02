#!/usr/bin/env node

/**
 * Documentation Completeness Audit Script
 * Identifies missing documentation, generates coverage reports, and creates action items
 *
 * Features:
 * - Scans all components and checks documentation status
 * - Identifies missing component docs, guides, and API references
 * - Generates coverage reports with actionable insights
 * - Creates prioritized task lists for launch preparation
 * - Validates documentation structure and content quality
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const AUDIT_CONFIG = {
  // Source directories
  componentsDir: path.join(process.cwd(), "libs/components/src/components"),
  storiesDir: path.join(process.cwd(), "libs/components/src/stories"),
  docsDir: path.join(process.cwd(), "apps/docs"),
  outputDir: path.join(process.cwd(), "reports/documentation-audit"),

  // Documentation paths
  componentDocsDir: path.join(process.cwd(), "apps/docs/components"),
  guideDocsDir: path.join(process.cwd(), "apps/docs/guide"),
  apiDocsDir: path.join(process.cwd(), "apps/docs/api"),

  // Required files for complete documentation
  requiredDocs: {
    components: [
      "installation",
      "basic-usage",
      "props",
      "examples",
      "accessibility",
    ],
    guides: [
      "getting-started.md",
      "installation.md",
      "quick-start.md",
      "framework-integration.md",
      "theming-system.md",
      "migration-guide.md",
      "troubleshooting.md",
      "performance.md",
    ],
  },

  // Component categories for organization
  categories: {
    core: ["button", "card", "input", "modal", "tooltip", "badge", "avatar"],
    forms: [
      "checkbox",
      "radio-group",
      "select",
      "textarea",
      "switch",
      "slider",
      "date-picker",
      "file-upload",
      "combobox",
      "number-input",
      "form-field",
    ],
    navigation: [
      "breadcrumbs",
      "tabs",
      "pagination",
      "navbar",
      "sidebar",
      "mobile-nav",
      "drawer",
    ],
    feedback: [
      "alert",
      "toast",
      "notification",
      "banner",
      "progress",
      "spinner",
      "loading",
      "skeleton",
    ],
    data: ["table", "accordion", "timeline", "tree-view", "chart"],
    layout: ["dropdown", "popover", "portal"],
    utility: [
      "command",
      "search",
      "error-boundary",
      "theme-provider",
      "theme-toggle",
    ],
    accessibility: [
      "focus-trap",
      "live-region",
      "skip-navigation",
      "visually-hidden",
    ],
  },

  // Quality thresholds
  thresholds: {
    minContentLength: 500,
    minExamples: 2,
    minProps: 1,
    targetCoverage: 90,
  },
};

class DocumentationAuditor {
  constructor() {
    this.components = new Map();
    this.documentation = new Map();
    this.stories = new Map();
    this.auditResults = {
      components: {
        total: 0,
        documented: 0,
        missing: [],
        incomplete: [],
        highQuality: [],
      },
      guides: {
        total: 0,
        existing: 0,
        missing: [],
        incomplete: [],
      },
      stories: {
        total: 0,
        complete: 0,
        missing: [],
      },
      coverage: {
        overall: 0,
        byCategory: {},
      },
      priorities: {
        critical: [],
        high: [],
        medium: [],
        low: [],
      },
    };
  }

  /**
   * Initialize audit process
   */
  async init() {
    console.log("🔍 Initializing Documentation Audit...");

    // Ensure output directory exists
    if (!fs.existsSync(AUDIT_CONFIG.outputDir)) {
      fs.mkdirSync(AUDIT_CONFIG.outputDir, { recursive: true });
    }

    console.log("✅ Audit initialization complete");
  }

  /**
   * Scan all components
   */
  async scanComponents() {
    console.log("📊 Scanning components...");

    if (!fs.existsSync(AUDIT_CONFIG.componentsDir)) {
      throw new Error(
        `Components directory not found: ${AUDIT_CONFIG.componentsDir}`,
      );
    }

    const componentDirs = fs
      .readdirSync(AUDIT_CONFIG.componentsDir)
      .filter((dir) => {
        const fullPath = path.join(AUDIT_CONFIG.componentsDir, dir);
        return fs.statSync(fullPath).isDirectory() && dir.startsWith("glass-");
      });

    for (const componentDir of componentDirs) {
      await this.scanComponent(componentDir);
    }

    this.auditResults.components.total = this.components.size;
    console.log(`✅ Scanned ${this.components.size} components`);
  }

  /**
   * Scan individual component
   */
  async scanComponent(componentDir) {
    const componentPath = path.join(AUDIT_CONFIG.componentsDir, componentDir);
    const componentName = componentDir.replace("glass-", "");

    const component = {
      name: componentName,
      dirName: componentDir,
      path: componentPath,
      category: this.getComponentCategory(componentName),
      files: {
        component: null,
        stories: null,
        test: null,
        index: null,
        types: null,
      },
      documentation: {
        exists: false,
        path: null,
        quality: {
          score: 0,
          issues: [],
        },
      },
      hasStory: false,
      hasTest: false,
      hasTypes: false,
    };

    // Scan component files
    const files = fs.readdirSync(componentPath);

    for (const file of files) {
      const filePath = path.join(componentPath, file);

      if (file === "index.ts" || file === "index.tsx") {
        component.files.index = filePath;
      } else if (
        file.endsWith(".tsx") &&
        !file.includes(".stories.") &&
        !file.includes(".test.")
      ) {
        component.files.component = filePath;
      } else if (file.includes(".stories.")) {
        component.files.stories = filePath;
        component.hasStory = true;
      } else if (file.includes(".test.")) {
        component.files.test = filePath;
        component.hasTest = true;
      } else if (file.includes(".types.") || file.endsWith(".d.ts")) {
        component.files.types = filePath;
        component.hasTypes = true;
      }
    }

    // Check for documentation
    const docPath = path.join(
      AUDIT_CONFIG.componentDocsDir,
      `${componentName}.md`,
    );
    if (fs.existsSync(docPath)) {
      component.documentation.exists = true;
      component.documentation.path = docPath;
      await this.analyzeDocumentationQuality(component);
    }

    this.components.set(componentName, component);
  }

  /**
   * Analyze documentation quality
   */
  async analyzeDocumentationQuality(component) {
    try {
      const content = fs.readFileSync(component.documentation.path, "utf8");
      const quality = component.documentation.quality;

      // Basic content checks
      if (content.length < AUDIT_CONFIG.thresholds.minContentLength) {
        quality.issues.push("Content too short");
      }

      // Check for required sections
      const requiredSections = [
        "installation",
        "usage",
        "props",
        "examples",
        "accessibility",
      ];

      for (const section of requiredSections) {
        if (!content.toLowerCase().includes(section)) {
          quality.issues.push(`Missing ${section} section`);
        }
      }

      // Check for code examples
      const codeBlocks = (content.match(/```/g) || []).length / 2;
      if (codeBlocks < AUDIT_CONFIG.thresholds.minExamples) {
        quality.issues.push("Insufficient code examples");
      }

      // Check for props table
      if (!content.includes("| Prop |") && !content.includes("Props")) {
        quality.issues.push("Missing props documentation");
      }

      // Calculate quality score
      quality.score = Math.max(0, 100 - quality.issues.length * 15);

      if (quality.score >= 80) {
        this.auditResults.components.highQuality.push(component.name);
      } else if (quality.score >= 50) {
        this.auditResults.components.incomplete.push({
          name: component.name,
          score: quality.score,
          issues: quality.issues,
        });
      }
    } catch (error) {
      component.documentation.quality.issues.push(
        `Failed to analyze: ${error.message}`,
      );
    }
  }

  /**
   * Scan documentation files
   */
  async scanDocumentation() {
    console.log("📚 Scanning existing documentation...");

    // Scan component documentation
    if (fs.existsSync(AUDIT_CONFIG.componentDocsDir)) {
      const docFiles = fs
        .readdirSync(AUDIT_CONFIG.componentDocsDir)
        .filter((file) => file.endsWith(".md") && file !== "index.md");

      for (const docFile of docFiles) {
        const componentName = docFile.replace(".md", "");
        this.documentation.set(componentName, {
          type: "component",
          path: path.join(AUDIT_CONFIG.componentDocsDir, docFile),
          exists: true,
        });
      }

      this.auditResults.components.documented = docFiles.length;
    }

    // Scan guide documentation
    if (fs.existsSync(AUDIT_CONFIG.guideDocsDir)) {
      const guideFiles = fs
        .readdirSync(AUDIT_CONFIG.guideDocsDir)
        .filter((file) => file.endsWith(".md"));

      this.auditResults.guides.existing = guideFiles.length;
      this.auditResults.guides.total = AUDIT_CONFIG.requiredDocs.guides.length;

      // Check for missing guides
      for (const requiredGuide of AUDIT_CONFIG.requiredDocs.guides) {
        if (!guideFiles.includes(requiredGuide)) {
          this.auditResults.guides.missing.push(requiredGuide);
        }
      }
    }

    console.log(
      `✅ Found ${this.auditResults.components.documented} component docs and ${this.auditResults.guides.existing} guides`,
    );
  }

  /**
   * Scan Storybook stories
   */
  async scanStories() {
    console.log("📖 Scanning Storybook stories...");

    let storyCount = 0;

    // Scan component stories
    for (const [componentName, component] of this.components) {
      if (component.hasStory) {
        storyCount++;
        this.stories.set(componentName, {
          path: component.files.stories,
          exists: true,
        });
      } else {
        this.auditResults.stories.missing.push(componentName);
      }
    }

    // Scan additional stories in stories directory
    if (fs.existsSync(AUDIT_CONFIG.storiesDir)) {
      const scanDir = (dir) => {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        for (const item of items) {
          if (item.isDirectory()) {
            scanDir(path.join(dir, item.name));
          } else if (
            item.name.endsWith(".stories.tsx") ||
            item.name.endsWith(".stories.ts")
          ) {
            storyCount++;
          }
        }
      };

      scanDir(AUDIT_CONFIG.storiesDir);
    }

    this.auditResults.stories.total = this.components.size;
    this.auditResults.stories.complete = storyCount;

    console.log(`✅ Found ${storyCount} story files`);
  }

  /**
   * Identify missing documentation
   */
  identifyMissingDocs() {
    console.log("🔍 Identifying missing documentation...");

    // Find components without documentation
    for (const [componentName, component] of this.components) {
      if (!component.documentation.exists) {
        this.auditResults.components.missing.push({
          name: componentName,
          category: component.category,
          hasStory: component.hasStory,
          hasTest: component.hasTest,
          priority: this.calculatePriority(component),
        });
      }
    }

    console.log(
      `❌ Found ${this.auditResults.components.missing.length} components without documentation`,
    );
  }

  /**
   * Calculate documentation priority
   */
  calculatePriority(component) {
    let score = 0;

    // Core components are highest priority
    if (component.category === "core") score += 40;
    else if (component.category === "forms") score += 30;
    else if (component.category === "navigation") score += 25;
    else if (component.category === "feedback") score += 20;

    // Components with stories get priority
    if (component.hasStory) score += 20;

    // Components with tests get priority
    if (component.hasTest) score += 10;

    // Determine priority level
    if (score >= 50) return "critical";
    if (score >= 35) return "high";
    if (score >= 20) return "medium";
    return "low";
  }

  /**
   * Generate coverage statistics
   */
  calculateCoverage() {
    console.log("📊 Calculating coverage statistics...");

    // Overall coverage
    this.auditResults.coverage.overall = Math.round(
      (this.auditResults.components.documented /
        this.auditResults.components.total) *
        100,
    );

    // Coverage by category
    for (const [categoryName, componentNames] of Object.entries(
      AUDIT_CONFIG.categories,
    )) {
      const categoryComponents = componentNames.filter((name) =>
        this.components.has(name),
      );
      const documentedInCategory = categoryComponents.filter((name) => {
        const component = this.components.get(name);
        return component?.documentation.exists;
      });

      this.auditResults.coverage.byCategory[categoryName] = {
        total: categoryComponents.length,
        documented: documentedInCategory.length,
        percentage:
          categoryComponents.length > 0
            ? Math.round(
                (documentedInCategory.length / categoryComponents.length) * 100,
              )
            : 0,
      };
    }
  }

  /**
   * Generate prioritized action items
   */
  generateActionItems() {
    console.log("📋 Generating prioritized action items...");

    // Categorize missing components by priority
    for (const missing of this.auditResults.components.missing) {
      this.auditResults.priorities[missing.priority].push({
        type: "component-doc",
        component: missing.name,
        category: missing.category,
        hasStory: missing.hasStory,
        action: `Create documentation for ${missing.name} component`,
      });
    }

    // Add missing guides as high priority
    for (const missingGuide of this.auditResults.guides.missing) {
      this.auditResults.priorities.high.push({
        type: "guide",
        guide: missingGuide,
        action: `Create ${missingGuide} guide`,
      });
    }

    // Add incomplete documentation as medium priority
    for (const incomplete of this.auditResults.components.incomplete) {
      this.auditResults.priorities.medium.push({
        type: "improvement",
        component: incomplete.name,
        score: incomplete.score,
        issues: incomplete.issues,
        action: `Improve documentation quality for ${incomplete.name}`,
      });
    }

    // Add missing stories as low priority
    for (const missingStory of this.auditResults.stories.missing) {
      this.auditResults.priorities.low.push({
        type: "story",
        component: missingStory,
        action: `Create Storybook story for ${missingStory}`,
      });
    }
  }

  /**
   * Generate comprehensive audit report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        components: this.auditResults.components,
        guides: this.auditResults.guides,
        stories: this.auditResults.stories,
        coverage: this.auditResults.coverage,
      },
      priorities: this.auditResults.priorities,
      recommendations: this.generateRecommendations(),
      launchReadiness: this.assessLaunchReadiness(),
    };

    // Save JSON report
    const jsonPath = path.join(
      AUDIT_CONFIG.outputDir,
      "documentation-audit.json",
    );
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

    // Generate markdown report
    this.generateMarkdownReport(report);

    // Generate HTML report
    this.generateHtmlReport(report);

    return report;
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    // Coverage recommendations
    if (
      this.auditResults.coverage.overall <
      AUDIT_CONFIG.thresholds.targetCoverage
    ) {
      recommendations.push({
        type: "coverage",
        priority: "high",
        title: "Improve Documentation Coverage",
        description: `Current coverage is ${this.auditResults.coverage.overall}%. Target is ${AUDIT_CONFIG.thresholds.targetCoverage}%.`,
        actions: [
          "Focus on critical and high-priority components first",
          "Use automated documentation generation for consistent structure",
          "Batch process components by category",
        ],
      });
    }

    // Quality recommendations
    if (this.auditResults.components.incomplete.length > 0) {
      recommendations.push({
        type: "quality",
        priority: "medium",
        title: "Improve Documentation Quality",
        description: `${this.auditResults.components.incomplete.length} components have low-quality documentation.`,
        actions: [
          "Add more comprehensive examples",
          "Include accessibility guidelines",
          "Expand props documentation",
        ],
      });
    }

    // Guide recommendations
    if (this.auditResults.guides.missing.length > 0) {
      recommendations.push({
        type: "guides",
        priority: "high",
        title: "Create Essential Guides",
        description: `${this.auditResults.guides.missing.length} essential guides are missing.`,
        actions: this.auditResults.guides.missing.map(
          (guide) => `Create ${guide}`,
        ),
      });
    }

    return recommendations;
  }

  /**
   * Assess launch readiness
   */
  assessLaunchReadiness() {
    const critical = this.auditResults.priorities.critical.length;
    const high = this.auditResults.priorities.high.length;
    const coverage = this.auditResults.coverage.overall;

    let readiness = "not-ready";
    let blockers = [];

    if (critical === 0 && high <= 5 && coverage >= 80) {
      readiness = "ready";
    } else if (critical <= 2 && high <= 10 && coverage >= 60) {
      readiness = "nearly-ready";
    } else {
      readiness = "not-ready";
    }

    if (critical > 0)
      blockers.push(`${critical} critical documentation items missing`);
    if (high > 10) blockers.push(`${high} high-priority items need attention`);
    if (coverage < 60)
      blockers.push(`Documentation coverage is only ${coverage}%`);

    return {
      status: readiness,
      blockers: blockers,
      estimatedDays: this.estimateTimeToLaunch(),
    };
  }

  /**
   * Estimate time to launch based on missing items
   */
  estimateTimeToLaunch() {
    const critical = this.auditResults.priorities.critical.length;
    const high = this.auditResults.priorities.high.length;
    const medium = this.auditResults.priorities.medium.length;

    // Rough estimates in hours
    const criticalHours = critical * 2; // 2 hours per critical item
    const highHours = high * 1.5; // 1.5 hours per high priority item
    const mediumHours = medium * 1; // 1 hour per medium priority item

    const totalHours = criticalHours + highHours + mediumHours;
    const workingHoursPerDay = 8;

    return Math.ceil(totalHours / workingHoursPerDay);
  }

  /**
   * Generate markdown report
   */
  generateMarkdownReport(report) {
    const markdownPath = path.join(
      AUDIT_CONFIG.outputDir,
      "documentation-audit.md",
    );

    let markdown = `# Documentation Audit Report

Generated: ${new Date().toLocaleString()}

## 📊 Summary

### Components
- **Total Components**: ${report.summary.components.total}
- **Documented**: ${report.summary.components.documented} (${report.summary.coverage.overall}%)
- **Missing Documentation**: ${report.summary.components.missing.length}
- **Incomplete Documentation**: ${report.summary.components.incomplete.length}
- **High Quality**: ${report.summary.components.highQuality.length}

### Guides
- **Existing Guides**: ${report.summary.guides.existing}/${report.summary.guides.total}
- **Missing Guides**: ${report.summary.guides.missing.length}

### Stories
- **Components with Stories**: ${report.summary.stories.complete}/${report.summary.stories.total}
- **Missing Stories**: ${report.summary.stories.missing.length}

## 🎯 Launch Readiness

**Status**: ${report.launchReadiness.status.toUpperCase()}
**Estimated Days to Launch**: ${report.launchReadiness.estimatedDays}

### Blockers
${report.launchReadiness.blockers.map((blocker) => `- ${blocker}`).join("\n")}

## 🔥 Priority Action Items

### Critical (${report.priorities.critical.length} items)
${report.priorities.critical.map((item) => `- [ ] ${item.action}`).join("\n")}

### High Priority (${report.priorities.high.length} items)
${report.priorities.high.map((item) => `- [ ] ${item.action}`).join("\n")}

### Medium Priority (${report.priorities.medium.length} items)
${report.priorities.medium
  .slice(0, 10)
  .map((item) => `- [ ] ${item.action}`)
  .join("\n")}
${report.priorities.medium.length > 10 ? `\n... and ${report.priorities.medium.length - 10} more` : ""}

## 📈 Coverage by Category

${Object.entries(report.summary.coverage.byCategory)
  .map(
    ([category, stats]) =>
      `### ${category.charAt(0).toUpperCase() + category.slice(1)}
- **Coverage**: ${stats.percentage}% (${stats.documented}/${stats.total})
`,
  )
  .join("\n")}

## 💡 Recommendations

${report.recommendations
  .map(
    (rec) => `### ${rec.title}
**Priority**: ${rec.priority.toUpperCase()}

${rec.description}

**Actions**:
${rec.actions.map((action) => `- ${action}`).join("\n")}
`,
  )
  .join("\n")}

## 📋 Missing Component Documentation

${report.summary.components.missing
  .map(
    (comp) =>
      `- **${comp.name}** (${comp.category}) - Priority: ${comp.priority}${comp.hasStory ? " ✅ Has Story" : " ❌ No Story"}`,
  )
  .join("\n")}

---

*This report was generated automatically. Use it to track documentation completion progress.*`;

    fs.writeFileSync(markdownPath, markdown);
    console.log(`📄 Markdown report saved to: ${markdownPath}`);
  }

  /**
   * Generate HTML report
   */
  generateHtmlReport(report) {
    const htmlPath = path.join(
      AUDIT_CONFIG.outputDir,
      "documentation-audit.html",
    );

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LiqUIdify Documentation Audit Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat-card { padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; color: #007acc; }
        .priority-section { margin-bottom: 30px; }
        .priority-critical { border-left: 4px solid #dc3545; padding-left: 15px; }
        .priority-high { border-left: 4px solid #fd7e14; padding-left: 15px; }
        .priority-medium { border-left: 4px solid #ffc107; padding-left: 15px; }
        .coverage-chart { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
        .coverage-item { text-align: center; padding: 15px; background: #e9ecef; border-radius: 5px; }
        .progress-bar { width: 100%; height: 20px; background: #dee2e6; border-radius: 10px; overflow: hidden; margin: 10px 0; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #28a745, #20c997); transition: width 0.3s ease; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 LiqUIdify Documentation Audit Report</h1>
            <p>Generated: ${new Date().toLocaleString()}</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${report.summary.coverage.overall}%</div>
                <div>Overall Coverage</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.summary.components.documented}</div>
                <div>Documented Components</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.summary.components.missing.length}</div>
                <div>Missing Docs</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.launchReadiness.estimatedDays}</div>
                <div>Days to Launch</div>
            </div>
        </div>

        <h2>🎯 Launch Readiness: ${report.launchReadiness.status.toUpperCase()}</h2>

        <h2>🔥 Priority Actions</h2>

        <div class="priority-section priority-critical">
            <h3>Critical (${report.priorities.critical.length} items)</h3>
            <ul>
                ${report.priorities.critical.map((item) => `<li>${item.action}</li>`).join("")}
            </ul>
        </div>

        <div class="priority-section priority-high">
            <h3>High Priority (${report.priorities.high.length} items)</h3>
            <ul>
                ${report.priorities.high
                  .slice(0, 10)
                  .map((item) => `<li>${item.action}</li>`)
                  .join("")}
                ${report.priorities.high.length > 10 ? `<li><em>... and ${report.priorities.high.length - 10} more</em></li>` : ""}
            </ul>
        </div>

        <h2>📈 Coverage by Category</h2>
        <div class="coverage-chart">
            ${Object.entries(report.summary.coverage.byCategory)
              .map(
                ([category, stats]) => `
                <div class="coverage-item">
                    <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${stats.percentage}%"></div>
                    </div>
                    <div>${stats.percentage}% (${stats.documented}/${stats.total})</div>
                </div>
            `,
              )
              .join("")}
        </div>

        <h2>💡 Recommendations</h2>
        ${report.recommendations
          .map(
            (rec) => `
            <div class="priority-section">
                <h3>${rec.title}</h3>
                <p><strong>Priority:</strong> ${rec.priority.toUpperCase()}</p>
                <p>${rec.description}</p>
                <ul>
                    ${rec.actions.map((action) => `<li>${action}</li>`).join("")}
                </ul>
            </div>
        `,
          )
          .join("")}
    </div>
</body>
</html>`;

    fs.writeFileSync(htmlPath, html);
    console.log(`🌐 HTML report saved to: ${htmlPath}`);
  }

  /**
   * Utility methods
   */
  getComponentCategory(componentName) {
    for (const [category, components] of Object.entries(
      AUDIT_CONFIG.categories,
    )) {
      if (components.includes(componentName)) {
        return category;
      }
    }
    return "utility";
  }

  /**
   * Main audit execution
   */
  async run() {
    try {
      await this.init();
      await this.scanComponents();
      await this.scanDocumentation();
      await this.scanStories();
      this.identifyMissingDocs();
      this.calculateCoverage();
      this.generateActionItems();

      const report = this.generateReport();

      console.log("\n🎉 Documentation audit completed successfully!");
      console.log(`\n📊 Results Summary:`);
      console.log(
        `📝 Components: ${report.summary.components.documented}/${report.summary.components.total} documented (${report.summary.coverage.overall}%)`,
      );
      console.log(
        `📚 Guides: ${report.summary.guides.existing}/${report.summary.guides.total} complete`,
      );
      console.log(
        `🎭 Stories: ${report.summary.stories.complete}/${report.summary.stories.total} complete`,
      );
      console.log(
        `🚀 Launch Status: ${report.launchReadiness.status.toUpperCase()}`,
      );
      console.log(
        `⏱️  Estimated Days to Launch: ${report.launchReadiness.estimatedDays}`,
      );

      if (report.launchReadiness.blockers.length > 0) {
        console.log(`\n🚫 Launch Blockers:`);
        report.launchReadiness.blockers.forEach((blocker) =>
          console.log(`  - ${blocker}`),
        );
      }

      console.log(`\n📄 Reports generated in: ${AUDIT_CONFIG.outputDir}`);

      return report;
    } catch (error) {
      console.error("💥 Audit failed:", error);
      process.exit(1);
    }
  }
}

// CLI execution
if (import.meta.url === `file://${__filename}`) {
  const auditor = new DocumentationAuditor();

  // Parse command line arguments
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "--help" || command === "-h") {
    console.log(`
🔍 LiqUIdify Documentation Auditor

Usage:
  node audit-documentation.js [options]

Options:
  --help, -h     Show this help message
  --json         Output only JSON report
  --summary      Show only summary stats

Examples:
  node audit-documentation.js
  node audit-documentation.js --summary
  node audit-documentation.js --json
`);
    process.exit(0);
  }

  if (command === "--summary") {
    // Quick summary mode
    auditor.run().then((report) => {
      console.log("\n📊 QUICK SUMMARY");
      console.log(`Coverage: ${report.summary.coverage.overall}%`);
      console.log(
        `Missing: ${report.summary.components.missing.length} components`,
      );
      console.log(`Status: ${report.launchReadiness.status.toUpperCase()}`);
      console.log(`Days to launch: ${report.launchReadiness.estimatedDays}`);
    });
  } else {
    auditor.run().catch((error) => {
      console.error("💥 Documentation audit failed:", error);
      process.exit(1);
    });
  }
}

export default DocumentationAuditor;
