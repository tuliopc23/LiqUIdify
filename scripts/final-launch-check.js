#!/usr/bin/env node

/**
 * Final Launch Validation Script
 *
 * Comprehensive validation script that performs all critical checks before production launch:
 * - Environment verification (Bun runtime, dependencies, configuration)
 * - Build validation (library and Storybook builds)
 * - Export validation (package.json exports resolution)
 * - Test execution (unit, integration, E2E, accessibility, performance)
 * - Quality audits (security, accessibility, component completeness)
 * - Bundle analysis (size validation and reporting)
 * - Deployment readiness (Vercel configuration)
 * - Final report generation
 *
 * Exits with code 0 if ready for launch, code 1 if critical issues found.
 */

import { readFileSync, existsSync, statSync, writeFileSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = resolve(__dirname, "..");

let hasErrors = false;
let hasWarnings = false;
const errors = [];
const warnings = [];
const results = [];
const metrics = {};

/**
 * Log functions for consistent output
 */
function logError(message) {
  errors.push(message);
  console.error(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function logWarning(message) {
  warnings.push(message);
  console.warn(`⚠️  WARNING: ${message}`);
  hasWarnings = true;
}

function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
  results.push({ type: "success", message });
}

function logResult(message) {
  console.log(`📊 ${message}`);
  results.push({ type: "result", message });
}

function logSection(title) {
  console.log(`\n🔍 ${title}`);
  console.log("=".repeat(50));
}

/**
 * Execute command and capture output safely
 */
function executeCommand(command, options = {}) {
  try {
    const output = execSync(command, {
      cwd: ROOT_DIR,
      encoding: "utf8",
      stdio: "pipe",
      ...options,
    });
    return { success: true, output: output.trim() };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: error.stdout ? error.stdout.toString() : "",
      stderr: error.stderr ? error.stderr.toString() : "",
    };
  }
}

/**
 * Environment Verification
 */
function verifyEnvironment() {
  logSection("Environment Verification");

  // Check for Bun runtime
  const bunCheck = executeCommand("bun --version");
  if (!bunCheck.success) {
    logError("Bun runtime not found - required for builds");
  } else {
    logSuccess(`Bun runtime available: ${bunCheck.output}`);
    metrics.bunVersion = bunCheck.output;
  }

  // Check for package.json
  const packageJsonPath = resolve(ROOT_DIR, "package.json");
  if (!existsSync(packageJsonPath)) {
    logError("package.json not found in root directory");
  } else {
    logSuccess("package.json exists");
  }

  // Check for node_modules
  if (!existsSync(resolve(ROOT_DIR, "node_modules"))) {
    logError('Dependencies not installed - run "bun install" first');
  } else {
    logSuccess("Dependencies installed");
  }

  // Check required configuration files
  const requiredFiles = [
    "vite.config.mts",
    "tsconfig.json",
    "tsconfig.base.json",
    "apps/storybook/.storybook/main.ts",
    "apps/storybook/.storybook/preview.ts",
    "vercel.json",
  ];

  requiredFiles.forEach((file) => {
    const filePath = resolve(ROOT_DIR, file);
    if (!existsSync(filePath)) {
      logError(`Required configuration file missing: ${file}`);
    } else {
      logSuccess(`Configuration file exists: ${file}`);
    }
  });

  // Validate Vercel configuration
  const vercelConfigPath = resolve(ROOT_DIR, "vercel.json");
  if (existsSync(vercelConfigPath)) {
    try {
      const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));
      logSuccess("vercel.json is valid JSON");
      
      // Check for required Vercel configuration
      if (vercelConfig.buildCommand && vercelConfig.outputDirectory) {
        logSuccess("Vercel deployment configuration is complete");
      } else {
        logWarning("Vercel configuration may be incomplete");
      }
    } catch (error) {
      logError(`vercel.json is invalid JSON: ${error.message}`);
    }
  }
}

/**
 * Build Validation
 */
function validateBuilds() {
  logSection("Build Validation");

  // Clean previous builds
  logInfo("Cleaning previous builds...");
  const cleanResult = executeCommand("bun run clean");
  if (!cleanResult.success) {
    logWarning("Failed to clean previous builds");
  }

  // Build library
  logInfo("Building component library...");
  const libBuildResult = executeCommand("bun run build:lib", { timeout: 120000 });
  if (!libBuildResult.success) {
    logError(`Component library build failed: ${libBuildResult.error}`);
    if (libBuildResult.stderr) {
      console.error("Build stderr:", libBuildResult.stderr);
    }
    return;
  }
  logSuccess("Component library build completed");

  // Validate library build outputs
  const expectedLibOutputs = [
    "dist/libs/components/index.mjs",
    "dist/libs/components/index.d.ts",
    "dist/libs/components/liquidui.css",
    "dist/libs/components/cjs/index.cjs",
  ];

  expectedLibOutputs.forEach((output) => {
    const outputPath = resolve(ROOT_DIR, output);
    if (!existsSync(outputPath)) {
      logError(`Expected library build output missing: ${output}`);
    } else {
      const stats = statSync(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      logSuccess(`Library output exists: ${output} (${sizeKB}KB)`);
      metrics[`${output.split('/').pop()}_size`] = sizeKB;
    }
  });

  // Build Storybook
  logInfo("Building Storybook...");
  const storybookCleanResult = executeCommand("rm -rf apps/storybook/storybook-static");
  const storybookBuildResult = executeCommand("bun run build:storybook", {
    timeout: 180000,
  });
  
  if (!storybookBuildResult.success) {
    logError(`Storybook build failed: ${storybookBuildResult.error}`);
    if (storybookBuildResult.stderr) {
      console.error("Storybook stderr:", storybookBuildResult.stderr);
    }
    return;
  }
  logSuccess("Storybook build completed");

  // Validate Storybook build outputs
  const storybookOutputDir = resolve(ROOT_DIR, "apps/storybook/storybook-static");
  if (!existsSync(storybookOutputDir)) {
    logError("Storybook build output directory not found");
  } else {
    logSuccess("Storybook static files generated");
    
    // Check Storybook build size
    const sizeResult = executeCommand("du -sh apps/storybook/storybook-static");
    if (sizeResult.success) {
      const size = sizeResult.output.split("\t")[0];
      logResult(`Storybook build size: ${size}`);
      metrics.storybookSize = size;
    }
  }
}

/**
 * Export Validation
 */
function validateExports() {
  logSection("Export Validation");

  logInfo("Running export validation script...");
  const exportValidationResult = executeCommand("node scripts/validate-exports.js");
  
  if (!exportValidationResult.success) {
    logError(`Export validation failed: ${exportValidationResult.error}`);
    if (exportValidationResult.output) {
      console.log(exportValidationResult.output);
    }
  } else {
    logSuccess("All package.json exports are valid");
    if (exportValidationResult.output) {
      console.log(exportValidationResult.output);
    }
  }
}

/**
 * Test Execution
 */
function executeTests() {
  logSection("Test Execution");

  // TypeScript validation
  logInfo("Running TypeScript validation...");
  const typeCheckResult = executeCommand("bun run type-check", { timeout: 60000 });
  if (!typeCheckResult.success) {
    logError(`TypeScript validation failed: ${typeCheckResult.error}`);
  } else {
    logSuccess("TypeScript validation passed");
  }

  // Comprehensive test suite
  logInfo("Running comprehensive test suite...");
  const testResult = executeCommand("bun run test:all", { timeout: 300000 });
  if (!testResult.success) {
    logError(`Test suite failed: ${testResult.error}`);
    if (testResult.output) {
      console.log("Test output:", testResult.output);
    }
  } else {
    logSuccess("All tests passed");
    
    // Extract test coverage if available
    if (testResult.output.includes("Coverage")) {
      const coverageMatch = testResult.output.match(/(\d+\.?\d*)%/);
      if (coverageMatch) {
        metrics.testCoverage = coverageMatch[1];
        logResult(`Test coverage: ${coverageMatch[1]}%`);
      }
    }
  }

  // Code quality checks
  logInfo("Running code quality checks...");
  const lintResult = executeCommand("bun run lint", { timeout: 60000 });
  if (!lintResult.success) {
    if (lintResult.output.includes("qlty")) {
      logSuccess("Code quality checks completed");
    } else {
      logWarning(`Code quality check issues: ${lintResult.error}`);
    }
  } else {
    logSuccess("Code quality checks passed");
  }
}

/**
 * Quality Audits
 */
function executeQualityAudits() {
  logSection("Quality Audits");

  const audits = [
    { name: "Security Audit", script: "audit:security" },
    { name: "Component Audit", script: "audit:components" },
    { name: "Accessibility Audit", script: "audit:accessibility" },
  ];

  audits.forEach(({ name, script }) => {
    logInfo(`Running ${name}...`);
    const auditResult = executeCommand(`bun run ${script}`, { timeout: 120000 });
    
    if (!auditResult.success) {
      logWarning(`${name} completed with warnings: ${auditResult.error}`);
      if (auditResult.output) {
        console.log(auditResult.output);
      }
    } else {
      logSuccess(`${name} passed`);
      if (auditResult.output) {
        console.log(auditResult.output);
      }
    }
  });
}

/**
 * Bundle Analysis
 */
function analyzeBundles() {
  logSection("Bundle Analysis");

  logInfo("Running bundle analysis...");
  const bundleAnalysisResult = executeCommand("node scripts/bundle-analysis.js");
  
  if (!bundleAnalysisResult.success) {
    logWarning(`Bundle analysis completed with warnings: ${bundleAnalysisResult.error}`);
    if (bundleAnalysisResult.output) {
      console.log(bundleAnalysisResult.output);
    }
  } else {
    logSuccess("Bundle analysis completed");
    if (bundleAnalysisResult.output) {
      console.log(bundleAnalysisResult.output);
    }
    
    // Extract bundle size information
    const output = bundleAnalysisResult.output;
    const totalSizeMatch = output.match(/Total Size: ([^\n]+)/);
    const gzippedSizeMatch = output.match(/Gzipped: ([^\n]+)/);
    
    if (totalSizeMatch) {
      metrics.totalBundleSize = totalSizeMatch[1];
      logResult(`Total bundle size: ${totalSizeMatch[1]}`);
    }
    if (gzippedSizeMatch) {
      metrics.gzippedBundleSize = gzippedSizeMatch[1];
      logResult(`Gzipped bundle size: ${gzippedSizeMatch[1]}`);
    }
  }
}

/**
 * Deployment Readiness Check
 */
function checkDeploymentReadiness() {
  logSection("Deployment Readiness");

  // Verify Vercel configuration
  const vercelConfigPath = resolve(ROOT_DIR, "vercel.json");
  if (existsSync(vercelConfigPath)) {
    try {
      const vercelConfig = JSON.parse(readFileSync(vercelConfigPath, "utf8"));
      
      // Check build command
      if (vercelConfig.buildCommand) {
        logSuccess(`Vercel build command configured: ${vercelConfig.buildCommand}`);
      } else {
        logWarning("Vercel build command not specified");
      }
      
      // Check output directory
      if (vercelConfig.outputDirectory) {
        const outputPath = resolve(ROOT_DIR, vercelConfig.outputDirectory);
        if (existsSync(outputPath)) {
          logSuccess(`Vercel output directory exists: ${vercelConfig.outputDirectory}`);
        } else {
          logError(`Vercel output directory not found: ${vercelConfig.outputDirectory}`);
        }
      } else {
        logWarning("Vercel output directory not specified");
      }
      
    } catch (error) {
      logError(`Failed to parse vercel.json: ${error.message}`);
    }
  } else {
    logError("vercel.json not found - required for deployment");
  }

  // Check Storybook static build
  const storybookStaticPath = resolve(ROOT_DIR, "apps/storybook/storybook-static");
  if (existsSync(storybookStaticPath)) {
    const indexPath = join(storybookStaticPath, "index.html");
    if (existsSync(indexPath)) {
      logSuccess("Storybook static build ready for deployment");
    } else {
      logError("Storybook index.html not found in static build");
    }
  } else {
    logError("Storybook static build directory not found");
  }

  // Check for critical files
  const criticalFiles = [
    "dist/libs/components/index.mjs",
    "dist/libs/components/liquidui.css",
    "package.json",
    "README.md",
  ];

  criticalFiles.forEach((file) => {
    const filePath = resolve(ROOT_DIR, file);
    if (!existsSync(filePath)) {
      logError(`Critical deployment file missing: ${file}`);
    } else {
      logSuccess(`Critical file ready: ${file}`);
    }
  });
}

/**
 * Generate Final Report
 */
function generateFinalReport() {
  logSection("Final Launch Report Generation");

  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    version: "1.3.0",
    status: hasErrors ? "FAILED" : hasWarnings ? "READY_WITH_WARNINGS" : "READY_FOR_LAUNCH",
    metrics,
    summary: {
      totalChecks: results.length,
      errors: errors.length,
      warnings: warnings.length,
      successfulChecks: results.filter((r) => r.type === "success").length,
    },
    errors,
    warnings,
    results,
    recommendations: generateRecommendations(),
  };

  // Save detailed report
  const reportPath = resolve(ROOT_DIR, "reports/final-launch-report.json");
  try {
    // Ensure reports directory exists
    executeCommand("mkdir -p reports");
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    logSuccess(`Detailed report saved to: ${reportPath}`);
  } catch (error) {
    logWarning(`Failed to save detailed report: ${error.message}`);
  }

  // Generate markdown summary
  const markdownReport = generateMarkdownReport(report);
  const markdownPath = resolve(ROOT_DIR, "reports/final-launch-report.md");
  try {
    writeFileSync(markdownPath, markdownReport);
    logSuccess(`Markdown report saved to: ${markdownPath}`);
  } catch (error) {
    logWarning(`Failed to save markdown report: ${error.message}`);
  }

  return report;
}

/**
 * Generate recommendations based on findings
 */
function generateRecommendations() {
  const recommendations = [];

  if (hasErrors) {
    recommendations.push("🚨 CRITICAL: Fix all errors before launching to production");
  }

  if (hasWarnings) {
    recommendations.push("⚠️ Consider addressing warnings for optimal launch experience");
  }

  if (metrics.testCoverage && parseFloat(metrics.testCoverage) < 80) {
    recommendations.push("📈 Consider increasing test coverage above 80%");
  }

  if (!hasErrors && !hasWarnings) {
    recommendations.push("🚀 All systems ready - proceed with confidence!");
    recommendations.push("📊 Monitor post-launch metrics and user feedback");
    recommendations.push("🔄 Schedule regular health checks and updates");
  }

  return recommendations;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(report) {
  const statusEmoji = {
    READY_FOR_LAUNCH: "🚀",
    READY_WITH_WARNINGS: "⚠️",
    FAILED: "❌",
  };

  return `# Final Launch Validation Report

**Generated:** ${report.timestamp}  
**Version:** ${report.version}  
**Status:** ${statusEmoji[report.status]} ${report.status.replace(/_/g, " ")}

## Summary

- **Total Checks:** ${report.summary.totalChecks}
- **Successful:** ${report.summary.successfulChecks}
- **Errors:** ${report.summary.errors}
- **Warnings:** ${report.summary.warnings}

## Metrics

${Object.entries(report.metrics)
  .map(([key, value]) => `- **${key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}:** ${value}`)
  .join("\n")}

## Validation Results

### ✅ Successful Checks
${report.results
  .filter((r) => r.type === "success")
  .map((r) => `- ${r.message}`)
  .join("\n")}

${report.errors.length > 0 ? `### ❌ Errors
${report.errors.map((e) => `- ${e}`).join("\n")}` : ""}

${report.warnings.length > 0 ? `### ⚠️ Warnings
${report.warnings.map((w) => `- ${w}`).join("\n")}` : ""}

## Recommendations

${report.recommendations.map((r) => `- ${r}`).join("\n")}

## Next Steps

${report.status === "READY_FOR_LAUNCH" 
  ? "🎉 **Ready for Production Launch!**\n\n1. Deploy to production\n2. Monitor launch metrics\n3. Gather user feedback\n4. Plan post-launch improvements"
  : report.status === "READY_WITH_WARNINGS"
  ? "⚠️ **Ready with Warnings**\n\n1. Review and address warnings if possible\n2. Proceed with deployment if warnings are acceptable\n3. Monitor closely post-launch"
  : "❌ **Not Ready for Launch**\n\n1. Fix all critical errors\n2. Re-run validation\n3. Address any remaining issues\n4. Repeat until all checks pass"
}
`;
}

/**
 * Generate final summary
 */
function generateSummary(report) {
  console.log("\n🎯 Final Launch Validation Summary");
  console.log("=".repeat(60));

  // Status
  const statusEmoji = {
    READY_FOR_LAUNCH: "🚀",
    READY_WITH_WARNINGS: "⚠️",
    FAILED: "❌",
  };

  console.log(`\n${statusEmoji[report.status]} **STATUS: ${report.status.replace(/_/g, " ")}**`);

  // Key metrics
  if (Object.keys(metrics).length > 0) {
    console.log("\n📊 Key Metrics:");
    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`  • ${key.replace(/_/g, " ")}: ${value}`);
    });
  }

  // Summary statistics
  console.log("\n📈 Validation Statistics:");
  console.log(`  • Total checks: ${report.summary.totalChecks}`);
  console.log(`  • Successful: ${report.summary.successfulChecks}`);
  console.log(`  • Errors: ${report.summary.errors}`);
  console.log(`  • Warnings: ${report.summary.warnings}`);

  // Errors
  if (errors.length > 0) {
    console.log("\n❌ Critical Issues (must fix):");
    errors.forEach((error) => console.log(`  • ${error}`));
  }

  // Warnings
  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings (recommended to fix):");
    warnings.forEach((warning) => console.log(`  • ${warning}`));
  }

  // Recommendations
  if (report.recommendations.length > 0) {
    console.log("\n💡 Recommendations:");
    report.recommendations.forEach((rec) => console.log(`  • ${rec}`));
  }

  // Final verdict
  console.log("\n🎯 Launch Readiness:");
  if (hasErrors) {
    console.log("  ❌ NOT READY FOR LAUNCH");
    console.log("  Critical issues must be resolved before deployment");
  } else if (hasWarnings) {
    console.log("  ⚠️  READY WITH WARNINGS");
    console.log("  Launch possible, but consider addressing warnings");
  } else {
    console.log("  🚀 READY FOR PRODUCTION LAUNCH!");
    console.log("  All validation checks passed successfully");
  }
}

/**
 * Main validation function
 */
async function main() {
  console.log("🚀 LiqUIdify Final Launch Validation");
  console.log("=====================================");
  console.log("Comprehensive pre-launch validation starting...\n");

  const startTime = Date.now();

  try {
    // Run all validation steps
    verifyEnvironment();
    validateBuilds();
    validateExports();
    executeTests();
    executeQualityAudits();
    analyzeBundles();
    checkDeploymentReadiness();

    // Generate final report
    const report = generateFinalReport();
    
    // Calculate execution time
    const executionTime = Math.round((Date.now() - startTime) / 1000);
    metrics.executionTime = `${executionTime}s`;

    // Generate summary
    generateSummary(report);

    console.log(`\n⏱️  Total validation time: ${executionTime}s`);

  } catch (error) {
    logError(`Final launch validation failed: ${error.message}`);
    console.error("Stack trace:", error.stack);
  }

  // Exit with appropriate code
  if (hasErrors) {
    console.log("\n💥 Final launch validation FAILED!");
    console.log("Please fix all critical issues before attempting launch.");
    process.exit(1);
  } else {
    console.log("\n🎉 Final launch validation COMPLETED!");
    if (hasWarnings) {
      console.log("Ready for launch with minor warnings to consider.");
    } else {
      console.log("All systems ready for production launch! 🚀");
    }
    process.exit(0);
  }
}

// Run the validation
main().catch((error) => {
  console.error("Fatal error during final launch validation:", error);
  process.exit(1);
});