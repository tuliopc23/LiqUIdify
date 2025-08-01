#!/usr/bin/env node

/**
 * Comprehensive Build Validation Script
 * Validates all build systems, configurations, and outputs to ensure
 * the entire build pipeline is production-ready and functioning correctly.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ANSI color codes for output formatting
const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    dim: "\x1b[2m",
};

function log(message, color = "reset") {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
    console.log("\n" + "=".repeat(85));
    log(`🔍 ${title}`, "bold");
    console.log("=".repeat(85));
}

function logSection(title) {
    console.log("\n" + "-".repeat(65));
    log(`📋 ${title}`, "cyan");
    console.log("-".repeat(65));
}

function logStep(step, description) {
    log(`\n${step}. ${description}`, "blue");
}

function logSuccess(message) {
    log(`✅ ${message}`, "green");
}

function logError(message) {
    log(`❌ ${message}`, "red");
}

function logWarning(message) {
    log(`⚠️  ${message}`, "yellow");
}

function logInfo(message) {
    log(`ℹ️  ${message}`, "blue");
}

function logValidation(message) {
    log(`🔎 ${message}`, "magenta");
}

/**
 * Enhanced command execution with detailed metrics
 */
function runCommand(command, description, options = {}) {
    const {
        continueOnError = true,
        timeout = 300000, // 5 minutes default
        cwd = process.cwd(),
        captureOutput = true,
    } = options;

    logValidation(`Testing: ${description}`);
    logInfo(`Command: ${command}`);

    const startTime = Date.now();
    let result = {
        command,
        description,
        success: false,
        output: "",
        error: "",
        duration: 0,
        exitCode: null,
        metrics: {},
    };

    try {
        const output = execSync(command, {
            encoding: "utf8",
            cwd,
            timeout,
            stdio: captureOutput ? "pipe" : "inherit",
            maxBuffer: 20 * 1024 * 1024, // 20MB buffer
        });

        result.output = output;
        result.success = true;
        result.duration = Date.now() - startTime;
        result.metrics = extractBuildMetrics(output, description);

        logSuccess(`${description} ✅ (${result.duration}ms)`);
        return result;
    } catch (error) {
        result.error = error.message;
        result.exitCode = error.status;
        result.duration = Date.now() - startTime;

        if (error.stdout) result.output = error.stdout;
        if (error.stderr) result.error += `\nSTDERR: ${error.stderr}`;

        if (continueOnError) {
            logWarning(`${description} ⚠️  (${result.duration}ms)`);
            return result;
        } else {
            logError(`${description} ❌ (${result.duration}ms): ${error.message}`);
            throw error;
        }
    }
}

/**
 * Extract build metrics from command output
 */
function extractBuildMetrics(output, buildType) {
    const metrics = {};

    // Extract file sizes
    const sizeRegex = /(\d+(?:\.\d+)?)\s*(KB|MB|B)/gi;
    const sizes = [];
    let match;
    while ((match = sizeRegex.exec(output)) !== null) {
        sizes.push({
            size: parseFloat(match[1]),
            unit: match[2].toUpperCase(),
        });
    }
    if (sizes.length > 0) {
        metrics.fileSizes = sizes;
    }

    // Extract bundle information
    if (output.includes("dist/") || output.includes("build/")) {
        metrics.hasOutput = true;
    }

    // Extract warnings and errors count
    const warningCount = (output.match(/warning/gi) || []).length;
    const errorCount = (output.match(/error(?!.*warning)/gi) || []).length;

    if (warningCount > 0) metrics.warnings = warningCount;
    if (errorCount > 0) metrics.errors = errorCount;

    // Build-specific metrics
    if (buildType.includes("Library")) {
        // Look for TypeScript compilation info
        if (output.includes("Built in")) {
            const timeMatch = output.match(/Built in (\d+)ms/);
            if (timeMatch) {
                metrics.compileTime = parseInt(timeMatch[1]);
            }
        }
    }

    if (buildType.includes("Storybook")) {
        // Look for Storybook-specific info
        if (output.includes("info => Output directory:")) {
            metrics.hasStorybookOutput = true;
        }
    }

    return metrics;
}

/**
 * Validate build environment and prerequisites
 */
function validateBuildEnvironment() {
    logSection("Build Environment Validation");

    let validation = {
        runtime: { node: null, bun: null },
        packageJson: { valid: false, hasScripts: false },
        dependencies: { installed: false, criticalMissing: [] },
        tsconfig: { exists: false, valid: false },
        score: 0,
        issues: [],
    };

    // Check runtime versions
    logStep("1", "Validating runtime environment");
    try {
        const nodeVersion = execSync("node --version", { encoding: "utf8" }).trim();
        validation.runtime.node = nodeVersion;
        logSuccess(`Node.js: ${nodeVersion}`);
    } catch (error) {
        validation.issues.push("Node.js not available");
        logError("Node.js not found");
    }

    try {
        const bunVersion = execSync("bun --version", { encoding: "utf8" }).trim();
        validation.runtime.bun = bunVersion;
        logSuccess(`Bun: ${bunVersion}`);
    } catch (error) {
        validation.issues.push("Bun not available");
        logWarning("Bun not found - using fallback package manager");
    }

    // Validate package.json
    logStep("2", "Validating package.json configuration");
    try {
        const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
        validation.packageJson.valid = true;
        logSuccess("package.json is valid JSON");

        // Check required scripts
        const requiredScripts = ["build", "build:lib", "build:storybook"];
        const hasAllScripts = requiredScripts.every(
            (script) => packageJson.scripts?.[script],
        );
        validation.packageJson.hasScripts = hasAllScripts;

        if (hasAllScripts) {
            logSuccess("All required build scripts are present");
        } else {
            const missingScripts = requiredScripts.filter(
                (script) => !packageJson.scripts?.[script],
            );
            validation.issues.push(`Missing scripts: ${missingScripts.join(", ")}`);
            logWarning(`Missing build scripts: ${missingScripts.join(", ")}`);
        }
    } catch (error) {
        validation.packageJson.valid = false;
        validation.issues.push("Invalid package.json");
        logError(`package.json validation failed: ${error.message}`);
    }

    // Check dependencies
    logStep("3", "Validating dependencies");
    validation.dependencies.installed = fs.existsSync("node_modules");
    if (validation.dependencies.installed) {
        logSuccess("node_modules directory exists");

        // Check critical dependencies
        const criticalDeps = [
            "react",
            "react-dom",
            "vite",
            "typescript",
            "@storybook/react",
        ];
        for (const dep of criticalDeps) {
            try {
                const depPath = path.join("node_modules", dep);
                if (!fs.existsSync(depPath)) {
                    validation.dependencies.criticalMissing.push(dep);
                    logWarning(`Critical dependency not found: ${dep}`);
                } else {
                    logSuccess(`Critical dependency available: ${dep}`);
                }
            } catch (error) {
                validation.dependencies.criticalMissing.push(dep);
                logWarning(`Could not verify dependency: ${dep}`);
            }
        }
    } else {
        validation.issues.push("Dependencies not installed");
        logError("node_modules not found - run 'bun install'");
    }

    // Check TypeScript configuration
    logStep("4", "Validating TypeScript configuration");
    validation.tsconfig.exists = fs.existsSync("tsconfig.json");
    if (validation.tsconfig.exists) {
        try {
            JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
            validation.tsconfig.valid = true;
            logSuccess("tsconfig.json is valid");
        } catch (error) {
            validation.issues.push("Invalid tsconfig.json");
            logError(`tsconfig.json is invalid: ${error.message}`);
        }
    } else {
        validation.issues.push("Missing tsconfig.json");
        logError("tsconfig.json not found");
    }

    // Calculate environment score
    let score = 0;
    if (validation.runtime.node) score += 20;
    if (validation.runtime.bun) score += 10;
    if (validation.packageJson.valid) score += 25;
    if (validation.packageJson.hasScripts) score += 20;
    if (validation.dependencies.installed) score += 15;
    if (validation.dependencies.criticalMissing.length === 0) score += 10;

    validation.score = score;

    return validation;
}

/**
 * Validate file system structure
 */
function validateFileStructure() {
    logSection("File Structure Validation");

    let validation = {
        bundleFiles: { total: 0, missing: [] },
        componentIndexes: { total: 0, missing: [] },
        storyFiles: { total: 0, missing: [] },
        configFiles: { missing: [] },
        score: 0,
        issues: [],
    };

    // Validate bundle files
    logStep("1", "Validating bundle entry points");
    const bundleDir = "libs/components/src/bundles";
    const requiredBundles = [
        "core.ts",
        "forms.ts",
        "navigation.ts",
        "feedback.ts",
        "layout.ts",
        "data-display.ts",
        "accessibility.ts",
        "advanced.ts",
        "animations.ts",
        "physics.ts",
        "ssr.ts",
        "providers.ts",
        "tokens.ts",
    ];

    validation.bundleFiles.total = requiredBundles.length;

    for (const bundle of requiredBundles) {
        const bundlePath = path.join(bundleDir, bundle);
        if (!fs.existsSync(bundlePath)) {
            validation.bundleFiles.missing.push(bundle);
            logWarning(`Missing bundle: ${bundle}`);
        } else {
            // Check if file has content
            const content = fs.readFileSync(bundlePath, "utf8").trim();
            if (content.length === 0) {
                validation.bundleFiles.missing.push(bundle);
                logWarning(`Empty bundle file: ${bundle}`);
            } else {
                logSuccess(`Bundle file valid: ${bundle}`);
            }
        }
    }

    // Validate component indexes
    logStep("2", "Validating component index files");
    const componentsDir = "libs/components/src/components";
    if (fs.existsSync(componentsDir)) {
        const componentDirs = fs
            .readdirSync(componentsDir, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        validation.componentIndexes.total = componentDirs.length;

        for (const componentDir of componentDirs) {
            const indexPath = path.join(componentsDir, componentDir, "index.ts");
            if (!fs.existsSync(indexPath)) {
                validation.componentIndexes.missing.push(componentDir);
                logWarning(`Missing component index: ${componentDir}/index.ts`);
            } else {
                const content = fs.readFileSync(indexPath, "utf8").trim();
                if (content.length === 0) {
                    validation.componentIndexes.missing.push(componentDir);
                    logWarning(`Empty component index: ${componentDir}/index.ts`);
                } else {
                    logSuccess(`Component index valid: ${componentDir}`);
                }
            }
        }
    } else {
        validation.issues.push("Components directory not found");
        logError(`Components directory not found: ${componentsDir}`);
    }

    // Validate configuration files
    logStep("3", "Validating configuration files");
    const requiredConfigs = [
        "vite.config.ts",
        "apps/storybook/.storybook/main.ts",
        "tsconfig.json",
    ];

    for (const config of requiredConfigs) {
        if (!fs.existsSync(config)) {
            validation.configFiles.missing.push(config);
            logWarning(`Missing config file: ${config}`);
        } else {
            logSuccess(`Config file exists: ${config}`);
        }
    }

    // Calculate structure score
    let score = 100;
    score -= validation.bundleFiles.missing.length * 5;
    score -= validation.componentIndexes.missing.length * 3;
    score -= validation.configFiles.missing.length * 10;
    validation.score = Math.max(0, score);

    return validation;
}

/**
 * Validate individual build systems
 */
function validateBuilds() {
    logSection("Build Systems Validation");

    let validation = {
        typeCheck: null,
        libraryBuild: null,
        storybookBuild: null,
        documentationBuild: null,
        score: 0,
        totalDuration: 0,
    };

    // TypeScript type checking
    logStep("1", "Running TypeScript type check");
    validation.typeCheck = runCommand(
        "bunx tsc --noEmit --project tsconfig.json",
        "TypeScript type checking",
        { continueOnError: true },
    );

    // Library build
    logStep("2", "Testing library build");
    validation.libraryBuild = runCommand("bun run build:lib", "Library build", {
        continueOnError: true,
    });

    // Storybook build
    logStep("3", "Testing Storybook build");
    validation.storybookBuild = runCommand(
        "bun run build:storybook",
        "Storybook build",
        { continueOnError: true },
    );

    // Documentation build (optional)
    logStep("4", "Testing documentation build");
    validation.documentationBuild = runCommand(
        "bun run docs:build",
        "Documentation build",
        { continueOnError: true },
    );

    // Calculate build score and total duration
    const builds = [
        validation.typeCheck,
        validation.libraryBuild,
        validation.storybookBuild,
        validation.documentationBuild,
    ];

    validation.totalDuration = builds.reduce(
        (sum, build) => sum + (build?.duration || 0),
        0,
    );

    const successfulBuilds = builds.filter((build) => build?.success).length;
    validation.score = (successfulBuilds / builds.length) * 100;

    return validation;
}

/**
 * Validate build outputs
 */
function validateBuildOutputs() {
    logSection("Build Output Validation");

    let validation = {
        libraryOutputs: { files: [], totalSize: 0, issues: [] },
        storybookOutputs: { exists: false, fileCount: 0, issues: [] },
        score: 0,
    };

    // Validate library outputs
    logStep("1", "Validating library build outputs");
    const libDistDir = "dist/libs/components";
    if (fs.existsSync(libDistDir)) {
        const expectedFiles = [
            "index.mjs",
            "index.cjs",
            "index.d.ts",
            "liquidui.css",
        ];

        for (const file of expectedFiles) {
            const filePath = path.join(libDistDir, file);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                validation.libraryOutputs.files.push({
                    file,
                    size: stats.size,
                    exists: true,
                });
                validation.libraryOutputs.totalSize += stats.size;
                logSuccess(
                    `Library output found: ${file} (${formatBytes(stats.size)})`,
                );
            } else {
                validation.libraryOutputs.files.push({
                    file,
                    size: 0,
                    exists: false,
                });
                validation.libraryOutputs.issues.push(`Missing: ${file}`);
                logWarning(`Library output missing: ${file}`);
            }
        }

        // Check for bundle outputs
        const bundleFiles = fs
            .readdirSync(libDistDir)
            .filter((file) => file.endsWith(".mjs") || file.endsWith(".cjs"))
            .filter((file) => !file.startsWith("index"));

        if (bundleFiles.length > 0) {
            logSuccess(`Found ${bundleFiles.length} bundle output files`);
        } else {
            validation.libraryOutputs.issues.push("No bundle files found");
            logWarning("No bundle output files found");
        }
    } else {
        validation.libraryOutputs.issues.push("Library output directory missing");
        logError(`Library output directory missing: ${libDistDir}`);
    }

    // Validate Storybook outputs
    logStep("2", "Validating Storybook build outputs");
    const storybookOutputDir = "apps/storybook/storybook-static";
    if (fs.existsSync(storybookOutputDir)) {
        validation.storybookOutputs.exists = true;
        const files = fs.readdirSync(storybookOutputDir);
        validation.storybookOutputs.fileCount = files.length;

        // Check for essential files
        const essentialFiles = ["index.html"];
        const foundEssential = essentialFiles.filter((file) =>
            files.includes(file),
        );

        if (foundEssential.length === essentialFiles.length) {
            logSuccess(
                `Storybook output valid: ${validation.storybookOutputs.fileCount} files`,
            );
        } else {
            const missing = essentialFiles.filter((file) => !files.includes(file));
            validation.storybookOutputs.issues.push(
                `Missing essential files: ${missing.join(", ")}`,
            );
            logWarning(`Storybook missing essential files: ${missing.join(", ")}`);
        }
    } else {
        validation.storybookOutputs.issues.push(
            "Storybook output directory missing",
        );
        logWarning(`Storybook output directory missing: ${storybookOutputDir}`);
    }

    // Calculate output score
    let score = 0;
    const libOutputScore =
        (validation.libraryOutputs.files.filter((f) => f.exists).length /
            validation.libraryOutputs.files.length) *
        50;
    const storybookScore = validation.storybookOutputs.exists ? 50 : 0;
    validation.score = libOutputScore + storybookScore;

    return validation;
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Generate comprehensive validation report
 */
function generateValidationReport(results) {
    logHeader("COMPREHENSIVE BUILD VALIDATION REPORT");

    const { environment, fileStructure, builds, outputs } = results;

    // Executive Summary
    console.log("\n🎯 EXECUTIVE SUMMARY:");
    console.log("=====================");

    const overallScore =
        (environment.score + fileStructure.score + builds.score + outputs.score) /
        4;

    let status, statusColor;
    if (overallScore >= 90) {
        status = "🟢 EXCELLENT - Production Ready";
        statusColor = "green";
    } else if (overallScore >= 75) {
        status = "🟡 GOOD - Minor Issues";
        statusColor = "yellow";
    } else if (overallScore >= 50) {
        status = "🟠 FAIR - Needs Attention";
        statusColor = "yellow";
    } else {
        status = "🔴 POOR - Major Issues";
        statusColor = "red";
    }

    log(`Overall Status: ${status}`, statusColor);
    log(`Overall Score: ${overallScore.toFixed(1)}/100`, statusColor);

    // Detailed Scores
    console.log("\n📊 DETAILED SCORES:");
    console.log("===================");
    log(
        `Environment: ${environment.score}/100`,
        environment.score >= 80 ? "green" : "yellow",
    );
    log(
        `File Structure: ${fileStructure.score}/100`,
        fileStructure.score >= 80 ? "green" : "yellow",
    );
    log(
        `Build Systems: ${builds.score.toFixed(1)}/100`,
        builds.score >= 80 ? "green" : "yellow",
    );
    log(
        `Build Outputs: ${outputs.score.toFixed(1)}/100`,
        outputs.score >= 80 ? "green" : "yellow",
    );

    // Build Performance Summary
    console.log("\n⚡ BUILD PERFORMANCE:");
    console.log("====================");
    log(`Total Build Time: ${builds.totalDuration}ms`, "blue");

    if (builds.libraryBuild?.success) {
        log(`Library Build: ✅ ${builds.libraryBuild.duration}ms`, "green");
    } else {
        log(`Library Build: ❌ ${builds.libraryBuild?.duration || 0}ms`, "red");
    }

    if (builds.storybookBuild?.success) {
        log(`Storybook Build: ✅ ${builds.storybookBuild.duration}ms`, "green");
    } else {
        log(`Storybook Build: ❌ ${builds.storybookBuild?.duration || 0}ms`, "red");
    }

    // Critical Issues
    const criticalIssues = [
        ...environment.issues,
        ...fileStructure.issues,
        ...outputs.libraryOutputs.issues,
        ...outputs.storybookOutputs.issues,
    ];

    if (criticalIssues.length > 0) {
        console.log("\n🚨 CRITICAL ISSUES:");
        console.log("===================");
        criticalIssues.forEach((issue, index) => {
            log(`${index + 1}. ${issue}`, "red");
        });
    }

    // Recommendations
    console.log("\n💡 RECOMMENDATIONS:");
    console.log("===================");

    const recommendations = [];

    if (environment.score < 80) {
        recommendations.push("Fix environment setup - check Node.js, dependencies");
    }
    if (fileStructure.bundleFiles.missing.length > 0) {
        recommendations.push(
            "Run 'node scripts/fix-library-build.cjs' to fix missing bundles",
        );
    }
    if (!builds.libraryBuild?.success) {
        recommendations.push(
            "Debug library build with 'node scripts/debug-build-fixed.cjs'",
        );
    }
    if (!builds.storybookBuild?.success) {
        recommendations.push(
            "Fix Storybook with 'node scripts/fix-storybook-build.cjs'",
        );
    }
    if (outputs.score < 80) {
        recommendations.push("Verify build outputs and fix any missing files");
    }

    if (recommendations.length === 0) {
        log("✅ No immediate recommendations - system is working well!", "green");
    } else {
        recommendations.forEach((rec, index) => {
            log(`${index + 1}. ${rec}`, "yellow");
        });
    }

    // Quick Commands
    console.log("\n⚡ QUICK FIX COMMANDS:");
    console.log("=====================");
    if (environment.score < 80) {
        log("bun install --frozen-lockfile", "cyan");
    }
    if (fileStructure.score < 80) {
        log("node scripts/fix-library-build.cjs", "cyan");
        log("node scripts/fix-storybook-build.cjs", "cyan");
    }
    if (builds.score < 80) {
        log("node scripts/debug-build-fixed.cjs", "cyan");
    }

    return {
        overallScore,
        status,
        criticalIssues: criticalIssues.length,
        recommendations: recommendations.length,
        readyForProduction: overallScore >= 90 && criticalIssues.length === 0,
    };
}

/**
 * Main execution function
 */
async function main() {
    logHeader("LiqUIdify Comprehensive Build Validation");

    log(
        "This script will comprehensively validate your entire build pipeline",
        "blue",
    );
    log(
        "including environment, file structure, build systems, and outputs.\n",
        "blue",
    );

    try {
        logStep("1", "Validating build environment");
        const environment = validateBuildEnvironment();

        logStep("2", "Validating file structure");
        const fileStructure = validateFileStructure();

        logStep("3", "Validating build systems");
        const builds = validateBuilds();

        logStep("4", "Validating build outputs");
        const outputs = validateBuildOutputs();

        logStep("5", "Generating comprehensive report");
        const report = generateValidationReport({
            environment,
            fileStructure,
            builds,
            outputs,
        });

        // Final status
        console.log("\n" + "=".repeat(85));
        if (report.readyForProduction) {
            log("🎉 BUILD PIPELINE IS PRODUCTION READY!", "green");
            process.exit(0);
        } else if (report.overallScore >= 75) {
            log("🔧 BUILD PIPELINE IS MOSTLY READY - MINOR FIXES NEEDED", "yellow");
            process.exit(1);
        } else {
            log("🚨 BUILD PIPELINE NEEDS SIGNIFICANT ATTENTION", "red");
            process.exit(1);
        }
    } catch (error) {
        logError(`Validation failed: ${error.message}`);
        console.error(error.stack);
        process.exit(1);
    }
}

// Execute the comprehensive validation
main().catch((error) => {
    logError(`Fatal error: ${error.message}`);
    process.exit(1);
});
