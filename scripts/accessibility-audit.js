#!/usr/bin/env node

import { chromium } from "playwright";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import axePlaywright from "axe-playwright";
import pa11y from "pa11y";

// Configuration
const CONFIG = {
  storybookUrl: process.env.STORYBOOK_URL || "http://localhost:6006",
  outputDir: "reports/a11y",
  standards: {
    wcag2aa: true,
    wcag2aaa: false,
    section508: false,
  },
  ignoreRules: [
    // Add any rules to ignore here
  ],
  componentPaths: [
    "/story/components-glass-button--default",
    "/story/components-glass-card--default",
    "/story/components-glass-modal--default",
    "/story/components-glass-table--default",
    "/story/components-glass-accordion--default",
    "/story/components-glass-tabs--default",
    "/story/components-glass-combobox--default",
    "/story/components-glass-toast--default",
    "/story/navigation-glass-breadcrumbs--default",
    "/story/navigation-glass-pagination--default",
    "/story/feedback-glass-loading--default",
    "/story/feedback-glass-spinner--default",
    "/story/accessibility-glass-focus-trap--default",
    "/story/accessibility-glass-live-region--default",
  ],
};

// Console colors
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

// Helper functions
function log(message, type = "info") {
  const prefix = {
    info: `${colors.blue}ℹ${colors.reset}`,
    success: `${colors.green}✓${colors.reset}`,
    warning: `${colors.yellow}⚠${colors.reset}`,
    error: `${colors.red}✗${colors.reset}`,
  };
  console.log(`${prefix[type] || prefix.info} ${message}`);
}

function ensureOutputDir() {
  if (!existsSync(CONFIG.outputDir)) {
    mkdirSync(CONFIG.outputDir, { recursive: true });
  }
}

function formatViolation(violation) {
  return {
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    help: violation.help,
    helpUrl: violation.helpUrl,
    nodes: violation.nodes.map((node) => ({
      html: node.html,
      target: node.target,
      failureSummary: node.failureSummary,
    })),
  };
}

// Audit functions
async function auditWithAxe(browser, componentPath) {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const url = `${CONFIG.storybookUrl}${componentPath}`;
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for story to load
    await page.waitForSelector("#storybook-root", { timeout: 10000 });

    // Inject axe
    await axePlaywright.injectAxe(page);

    // Run accessibility scan
    const results = await axePlaywright.checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    return results;
  } catch (error) {
    log(`Error auditing ${componentPath}: ${error.message}`, "error");
    return null;
  } finally {
    await context.close();
  }
}

async function auditWithPa11y(componentPath) {
  try {
    const url = `${CONFIG.storybookUrl}${componentPath}`;

    const results = await pa11y(url, {
      standard: "WCAG2AA",
      runners: ["axe", "htmlcs"],
      wait: 2000,
      includeWarnings: true,
      chromeLaunchConfig: {
        args: ["--no-sandbox"],
      },
    });

    return results;
  } catch (error) {
    log(`Pa11y error for ${componentPath}: ${error.message}`, "error");
    return null;
  }
}

async function auditAllComponents() {
  log("Starting accessibility audit...", "info");
  ensureOutputDir();

  const browser = await chromium.launch({ headless: true });
  const results = {
    timestamp: new Date().toISOString(),
    storybookUrl: CONFIG.storybookUrl,
    totalComponents: CONFIG.componentPaths.length,
    passed: 0,
    failed: 0,
    components: {},
    summary: {
      totalViolations: 0,
      violationsByImpact: {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0,
      },
      violationsByType: {},
    },
  };

  for (const componentPath of CONFIG.componentPaths) {
    const componentName = componentPath.split("--")[0].split("/").pop();
    log(`Auditing ${componentName}...`, "info");

    // Run Axe audit
    const axeResults = await auditWithAxe(browser, componentPath);

    // Run Pa11y audit
    const pa11yResults = await auditWithPa11y(componentPath);

    const componentResult = {
      path: componentPath,
      passed: true,
      violations: [],
      warnings: [],
    };

    // Process Axe results
    if (axeResults && axeResults.violations) {
      componentResult.violations.push(
        ...axeResults.violations.map(formatViolation),
      );

      // Update summary
      axeResults.violations.forEach((violation) => {
        results.summary.totalViolations++;
        results.summary.violationsByImpact[violation.impact]++;
        results.summary.violationsByType[violation.id] =
          (results.summary.violationsByType[violation.id] || 0) + 1;
      });
    }

    // Process Pa11y results
    if (pa11yResults && pa11yResults.issues) {
      pa11yResults.issues.forEach((issue) => {
        if (issue.type === "error") {
          componentResult.violations.push({
            id: issue.code,
            impact: "serious",
            description: issue.message,
            selector: issue.selector,
            context: issue.context,
          });
        } else if (issue.type === "warning") {
          componentResult.warnings.push({
            id: issue.code,
            description: issue.message,
            selector: issue.selector,
          });
        }
      });
    }

    // Determine pass/fail
    componentResult.passed = componentResult.violations.length === 0;
    if (componentResult.passed) {
      results.passed++;
      log(`${componentName}: PASS`, "success");
    } else {
      results.failed++;
      log(
        `${componentName}: FAIL (${componentResult.violations.length} violations)`,
        "error",
      );
    }

    results.components[componentName] = componentResult;
  }

  await browser.close();
  return results;
}

function generateReport(results) {
  let report = `# Accessibility Audit Report

Generated: ${new Date().toLocaleString()}
Storybook URL: ${results.storybookUrl}

## Summary

- **Total Components**: ${results.totalComponents}
- **Passed**: ${results.passed} (${((results.passed / results.totalComponents) * 100).toFixed(1)}%)
- **Failed**: ${results.failed} (${((results.failed / results.totalComponents) * 100).toFixed(1)}%)
- **Total Violations**: ${results.summary.totalViolations}

### Violations by Impact

- Critical: ${results.summary.violationsByImpact.critical}
- Serious: ${results.summary.violationsByImpact.serious}
- Moderate: ${results.summary.violationsByImpact.moderate}
- Minor: ${results.summary.violationsByImpact.minor}

### Top Violation Types

`;

  // Sort violations by frequency
  const sortedViolations = Object.entries(results.summary.violationsByType)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  sortedViolations.forEach(([type, count]) => {
    report += `- ${type}: ${count} occurrences\n`;
  });

  report += `\n## Component Results\n\n`;

  // Add detailed component results
  Object.entries(results.components).forEach(([name, component]) => {
    report += `### ${name}\n\n`;
    report += `- **Status**: ${component.passed ? "✅ PASS" : "❌ FAIL"}\n`;
    report += `- **Violations**: ${component.violations.length}\n`;
    report += `- **Warnings**: ${component.warnings.length}\n`;

    if (component.violations.length > 0) {
      report += `\n#### Violations\n\n`;

      component.violations.forEach((violation, index) => {
        report += `${index + 1}. **${violation.id}** (${violation.impact})\n`;
        report += `   - ${violation.description}\n`;
        if (violation.help) {
          report += `   - Help: ${violation.help}\n`;
        }
        if (violation.helpUrl) {
          report += `   - More info: ${violation.helpUrl}\n`;
        }
        report += "\n";
      });
    }

    report += "\n---\n\n";
  });

  report += `## Recommendations

1. **Fix Critical Issues First**: Address all critical and serious violations immediately
2. **Review WCAG Guidelines**: Ensure all components meet WCAG 2.1 AA standards
3. **Test with Screen Readers**: Manually test components with NVDA, JAWS, and VoiceOver
4. **Keyboard Navigation**: Verify all interactive elements are keyboard accessible
5. **Color Contrast**: Ensure all text meets minimum contrast ratios
6. **Focus Management**: Implement proper focus trapping for modals and overlays
7. **ARIA Labels**: Add descriptive labels for all interactive elements
8. **Live Regions**: Use appropriate ARIA live regions for dynamic content

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [Axe DevTools](https://www.deque.com/axe/)
- [Pa11y Documentation](https://pa11y.org/)
`;

  return report;
}

function generateHTMLReport(results) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Audit Report - LiqUIdify</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    h1 {
      margin: 0 0 10px;
      color: #2563eb;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat {
      background: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stat-value {
      font-size: 36px;
      font-weight: bold;
      margin: 10px 0;
    }
    .stat-label {
      color: #666;
      font-size: 14px;
    }
    .pass { color: #10b981; }
    .fail { color: #ef4444; }
    .warning { color: #f59e0b; }
    .component {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .component-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .status-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
    }
    .status-pass {
      background: #d1fae5;
      color: #065f46;
    }
    .status-fail {
      background: #fee2e2;
      color: #991b1b;
    }
    .violation {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
    }
    .violation-critical {
      border-color: #dc2626;
      background: #fee2e2;
    }
    .violation-serious {
      border-color: #f59e0b;
    }
    .violation-moderate {
      border-color: #3b82f6;
      background: #dbeafe;
    }
    .violation-minor {
      border-color: #6b7280;
      background: #f3f4f6;
    }
    .impact {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .impact-critical { background: #dc2626; color: white; }
    .impact-serious { background: #f59e0b; color: white; }
    .impact-moderate { background: #3b82f6; color: white; }
    .impact-minor { background: #6b7280; color: white; }
    pre {
      background: #f3f4f6;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 12px;
    }
    .chart {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
</head>
<body>
  <div class="header">
    <h1>Accessibility Audit Report</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>
    <p>WCAG 2.1 AA Compliance Check</p>
  </div>

  <div class="summary">
    <div class="stat">
      <div class="stat-label">Total Components</div>
      <div class="stat-value">${results.totalComponents}</div>
    </div>
    <div class="stat">
      <div class="stat-label">Passed</div>
      <div class="stat-value pass">${results.passed}</div>
      <div class="stat-label">${((results.passed / results.totalComponents) * 100).toFixed(1)}%</div>
    </div>
    <div class="stat">
      <div class="stat-label">Failed</div>
      <div class="stat-value fail">${results.failed}</div>
      <div class="stat-label">${((results.failed / results.totalComponents) * 100).toFixed(1)}%</div>
    </div>
    <div class="stat">
      <div class="stat-label">Total Violations</div>
      <div class="stat-value warning">${results.summary.totalViolations}</div>
    </div>
  </div>

  <div class="chart">
    <h2>Violations by Impact</h2>
    <canvas id="impactChart" width="400" height="200"></canvas>
  </div>

  <h2>Component Results</h2>
  
  ${Object.entries(results.components)
    .map(
      ([name, component]) => `
    <div class="component">
      <div class="component-header">
        <h3>${name}</h3>
        <span class="status-badge status-${component.passed ? "pass" : "fail"}">
          ${component.passed ? "PASS" : "FAIL"}
        </span>
      </div>
      
      ${
        component.violations.length > 0
          ? `
        <h4>Violations (${component.violations.length})</h4>
        ${component.violations
          .map(
            (violation) => `
          <div class="violation violation-${violation.impact}">
            <div>
              <span class="impact impact-${violation.impact}">${violation.impact}</span>
              <strong>${violation.id}</strong>
            </div>
            <p>${violation.description}</p>
            ${violation.help ? `<p><em>${violation.help}</em></p>` : ""}
            ${
              violation.nodes
                ? `
              <details>
                <summary>Affected elements (${violation.nodes.length})</summary>
                <pre>${violation.nodes.map((n) => n.html).join("\n")}</pre>
              </details>
            `
                : ""
            }
          </div>
        `,
          )
          .join("")}
      `
          : "<p>No violations found! ✅</p>"
      }
    </div>
  `,
    )
    .join("")}

  <script>
    // Create impact chart
    const ctx = document.getElementById('impactChart').getContext('2d');
    const impactData = ${JSON.stringify(results.summary.violationsByImpact)};
    
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Critical', 'Serious', 'Moderate', 'Minor'],
        datasets: [{
          data: [
            impactData.critical,
            impactData.serious,
            impactData.moderate,
            impactData.minor
          ],
          backgroundColor: ['#dc2626', '#f59e0b', '#3b82f6', '#6b7280']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  </script>
</body>
</html>`;

  return html;
}

async function main() {
  console.log(
    `${colors.cyan}♿ LiqUIdify Accessibility Audit${colors.reset}\n`,
  );

  try {
    // Check if Storybook is running
    try {
      const response = await fetch(CONFIG.storybookUrl);
      if (!response.ok) throw new Error("Storybook not responding");
    } catch (error) {
      log(`Storybook not found at ${CONFIG.storybookUrl}`, "error");
      log("Please start Storybook with: bun run storybook", "info");
      process.exit(1);
    }

    // Run audit
    const results = await auditAllComponents();

    // Generate reports
    const markdownReport = generateReport(results);
    const htmlReport = generateHTMLReport(results);
    const jsonReport = JSON.stringify(results, null, 2);

    // Save reports
    writeFileSync(
      join(CONFIG.outputDir, "accessibility-audit.md"),
      markdownReport,
    );
    writeFileSync(
      join(CONFIG.outputDir, "accessibility-audit.html"),
      htmlReport,
    );
    writeFileSync(
      join(CONFIG.outputDir, "accessibility-audit.json"),
      jsonReport,
    );

    log(`Reports saved to ${CONFIG.outputDir}/`, "success");

    // Print summary
    console.log(`\n${colors.cyan}📊 Audit Summary${colors.reset}\n`);
    console.log(`   Components tested: ${results.totalComponents}`);
    console.log(`   Passed: ${colors.green}${results.passed}${colors.reset}`);
    console.log(`   Failed: ${colors.red}${results.failed}${colors.reset}`);
    console.log(
      `   Total violations: ${colors.yellow}${results.summary.totalViolations}${colors.reset}`,
    );

    if (results.failed > 0) {
      console.log(
        `\n${colors.yellow}⚠️  Accessibility issues detected!${colors.reset}`,
      );
      console.log(
        `   View the full report at: ${CONFIG.outputDir}/accessibility-audit.html`,
      );
      process.exit(1);
    } else {
      console.log(
        `\n${colors.green}✅ All components passed accessibility audit!${colors.reset}`,
      );
    }
  } catch (error) {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run audit
main();
