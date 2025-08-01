#!/usr/bin/env node

/**
 * Enhanced Debug Build Script - Fixed Version
 * Systematically tests each build step, identifies specific failure points,
 * and provides actionable solutions for resolving build failures.
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
    console.log("\n" + "=".repeat(80));
    log(`🔧 ${title}`, "bold");
    console.log("=".repeat(80));
}

function logSection(title) {
    console.log("\n" + "-".repeat(60));
    log(`📋 ${title}`, "cyan");
    console.log("-".repeat(60));
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

/**
 * Enhanced command execution with detailed error capture
 */
function runCommand(command, description, options = {}) {
    const {
        continueOnError = false,
        captureOutput = true,
        timeout = 300000, // 5 minutes default
        cwd = process.cwd(),
    } = options;

    logStep("→", `${description}: ${command}`);

    const startTime = Date.now();
    let result = {
        command,
        description,
        success: false,
        output: "",
        error: "",
        duration: 0,
        exitCode: null,
    };

    try {
        const output = execSync(command, {
            encoding: "utf8",
            cwd,
            timeout,
            stdio: captureOutput ? "pipe" : "inherit",
            maxBuffer: 10 * 1024 * 1024, // 10MB buffer
        });

        result.output = output;
        result.success = true;
        result.duration = Date.now() - startTime;
        logSuccess(`${description} completed (${result.duration}ms)`);

        return result;
    } catch (error) {
        result.error = error.message;
        result.exitCode = error.status;
        result.duration = Date.now() - startTime;

        if (error.stdout) result.output = error.stdout;
        if (error.stderr) result.error += `\nSTDERR: ${error.stderr}`;

        logError(`${description} failed (${result.duration}ms): ${error.message}`);

        if (!continueOnError) {
            throw error;
        }

        return result;
    }
}

/**
 * Check if all required bundle entry points exist
 */
function checkBundleEntryPoints() {
    logSection("Bundle Entry Points Validation");

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

    let results = [];

    for (const bundle of requiredBundles) {
        const bundlePath = path.join(bundleDir, bundle);
        const exists = fs.existsSync(bundlePath);

        results.push({
            bundle,
            path: bundlePath,
            exists,
        });

        if (exists) {
            logSuccess(`Bundle found: ${bundle}`);
        } else {
            logError(`Missing bundle: ${bundle}`);
        }
    }

    return results;
}

/**
 * Check component index files
 */
function checkComponentIndexFiles() {
    logSection("Component Index Files Validation");

    const componentsDir = "libs/components/src/components";
    let results = [];

    if (!fs.existsSync(componentsDir)) {
        logError(`Components directory not found: ${componentsDir}`);
        return results;
    }

    const componentDirs = fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    for (const componentDir of componentDirs) {
        const indexPath = path.join(componentsDir, componentDir, "index.ts");
        const exists = fs.existsSync(indexPath);

        results.push({
            component: componentDir,
            path: indexPath,
            exists,
        });

        if (exists) {
            // Check if index file is not empty
            const content = fs.readFileSync(indexPath, "utf8").trim();
            if (content.length === 0) {
                logWarning(`Empty index file: ${componentDir}/index.ts`);
            } else {
                logSuccess(`Component index found: ${componentDir}`);
            }
        } else {
            logError(`Missing index file: ${componentDir}/index.ts`);
        }
    }

    return results;
}

/**
 * Check Storybook story files
 */
function checkStoryFiles() {
    logSection("Storybook Story Files Validation");

    const componentsDir = "libs/components/src/components";
    let results = [];

    if (!fs.existsSync(componentsDir)) {
        logError(`Components directory not found: ${componentsDir}`);
        return results;
    }

    const componentDirs = fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    for (const componentDir of componentDirs) {
        const storyPath = path.join(
            componentsDir,
            componentDir,
            `${componentDir}.stories.tsx`,
        );
        const exists = fs.existsSync(storyPath);

        results.push({
            component: componentDir,
            storyPath,
            exists,
        });

        if (exists) {
            logSuccess(`Story found: ${componentDir}`);
        } else {
            logWarning(`Missing story: ${componentDir}.stories.tsx`);
        }
    }

    return results;
}

/**
 * Enhanced dependency check with version validation
 */
function checkDependencies() {
    logSection("Dependencies Validation");

    let results = {
        packageJsonValid: false,
        nodeModulesExists: false,
        criticalDeps: [],
        devDeps: [],
        peerDeps: [],
        issues: [],
    };

    try {
        // Check package.json
        const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
        results.packageJsonValid = true;
        logSuccess("package.json is valid");

        // Check node_modules
        results.nodeModulesExists = fs.existsSync("node_modules");
        if (results.nodeModulesExists) {
            logSuccess("node_modules directory exists");
        } else {
            logError("node_modules directory missing - run 'bun install'");
            results.issues.push("node_modules missing");
        }

        // Check critical dependencies
        const criticalDeps = ["react", "react-dom", "vite", "typescript"];
        for (const dep of criticalDeps) {
            try {
                require.resolve(dep);
                results.criticalDeps.push({ name: dep, installed: true });
                logSuccess(`Critical dependency available: ${dep}`);
            } catch (error) {
                results.criticalDeps.push({ name: dep, installed: false });
                logError(`Critical dependency missing: ${dep}`);
                results.issues.push(`Missing critical dependency: ${dep}`);
            }
        }

        return results;
    } catch (error) {
        logError(`Dependency check failed: ${error.message}`);
        results.issues.push(`Dependency check error: ${error.message}`);
        return results;
    }
}

/**
 * Enhanced TypeScript validation
 */
function validateTypeScript() {
    logSection("TypeScript Configuration Validation");

    let result = {
        tsconfigExists: false,
        tsconfigValid: false,
        typeCheckPassed: false,
        errors: [],
    };

    try {
        // Check tsconfig.json
        result.tsconfigExists = fs.existsSync("tsconfig.json");
        if (result.tsconfigExists) {
            logSuccess("tsconfig.json found");

            try {
                JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
                result.tsconfigValid = true;
                logSuccess("tsconfig.json is valid");
            } catch (error) {
                logError(`tsconfig.json is invalid: ${error.message}`);
                result.errors.push(`Invalid tsconfig.json: ${error.message}`);
            }
        } else {
            logError("tsconfig.json not found");
            result.errors.push("tsconfig.json missing");
        }

        // Run type check
        if (result.tsconfigValid) {
            const typeCheckResult = runCommand(
                "bunx tsc --noEmit --project tsconfig.json",
                "TypeScript type checking",
                { continueOnError: true },
            );

            result.typeCheckPassed = typeCheckResult.success;
            if (!typeCheckResult.success) {
                result.errors.push(`Type check failed: ${typeCheckResult.error}`);
            }
        }

        return result;
    } catch (error) {
        logError(`TypeScript validation failed: ${error.message}`);
        result.errors.push(`TypeScript validation error: ${error.message}`);
        return result;
    }
}

/**
 * Enhanced build testing with detailed error analysis
 */
function testLibraryBuild() {
    logSection("Library Build Test");

    return runCommand("bun run build:lib", "Library Build", {
        continueOnError: true,
    });
}

function testStorybookBuild() {
    logSection("Storybook Build Test");

    return runCommand("bun run build:storybook", "Storybook Build", {
        continueOnError: true,
    });
}

function testDocumentationBuild() {
    logSection("Documentation Build Test");

    return runCommand("bun run docs:build", "Documentation Build", {
        continueOnError: true,
    });
}

/**
 * Validate build outputs
 */
function validateBuildOutputs() {
    logSection("Build Output Validation");

    let results = {
        distExists: false,
        libOutputs: [],
        cssOutput: false,
        storybookOutput: false,
        docsOutput: false,
    };

    // Check dist directory
    const distDir = "dist/libs/components";
    results.distExists = fs.existsSync(distDir);

    if (results.distExists) {
        logSuccess("Build output directory exists");

        // Check for main library files
        const expectedFiles = [
            "index.mjs",
            "index.cjs",
            "index.d.ts",
            "liquidui.css",
        ];

        for (const file of expectedFiles) {
            const filePath = path.join(distDir, file);
            const exists = fs.existsSync(filePath);
            results.libOutputs.push({ file, exists });

            if (exists) {
                logSuccess(`Found: ${file}`);
            } else {
                logError(`Missing: ${file}`);
            }
        }

        // Check CSS output
        results.cssOutput = fs.existsSync(path.join(distDir, "liquidui.css"));
    } else {
        logError("Build output directory missing");
    }

    // Check Storybook output
    results.storybookOutput = fs.existsSync("apps/storybook/storybook-static");
    if (results.storybookOutput) {
        logSuccess("Storybook build output exists");
    } else {
        logWarning("Storybook build output missing");
    }

    return results;
}

/**
 * Generate comprehensive diagnostic report
 */
function generateDiagnosticReport(results) {
    logHeader("ENHANCED BUILD DIAGNOSTIC REPORT");

    const {
        bundleResults,
        componentResults,
        storyResults,
        depResults,
        typeScriptResults,
        libBuild,
        storybookBuild,
        docsBuild,
        buildOutputs,
    } = results;

    // Executive Summary
    console.log("\n🎯 EXECUTIVE SUMMARY:");
    console.log("=====================");

    const criticalIssues = [];
    const warnings = [];
    const recommendations = [];

    // Analyze results
    const missingBundles = bundleResults.filter((b) => !b.exists);
    const missingIndexes = componentResults.filter((c) => !c.exists);
    const depIssues = depResults.issues.length > 0;
    const typeIssues = !typeScriptResults.typeCheckPassed;
    const buildFailures = [libBuild, storybookBuild, docsBuild].filter(
        (b) => !b.success,
    );

    if (missingBundles.length > 0) {
        criticalIssues.push(`${missingBundles.length} missing bundle files`);
    }
    if (missingIndexes.length > 0) {
        criticalIssues.push(`${missingIndexes.length} missing component indexes`);
    }
    if (depIssues) {
        criticalIssues.push("Dependency issues detected");
    }
    if (typeIssues) {
        criticalIssues.push("TypeScript compilation errors");
    }
    if (buildFailures.length > 0) {
        criticalIssues.push(`${buildFailures.length} build system failures`);
    }

    // Display summary
    if (criticalIssues.length === 0) {
        log("✅ No critical issues detected", "green");
    } else {
        log(`❌ ${criticalIssues.length} critical issues found:`, "red");
        criticalIssues.forEach((issue) => log(`   • ${issue}`, "red"));
    }

    // Detailed Analysis
    console.log("\n📊 DETAILED ANALYSIS:");
    console.log("=====================");

    // Bundle Analysis
    if (missingBundles.length > 0) {
        log(`\n🔍 Missing Bundle Files (${missingBundles.length}):`, "red");
        missingBundles.forEach((bundle) => {
            log(`   ❌ ${bundle.bundle}`, "red");
            recommendations.push(
                `Create ${bundle.bundle} in libs/components/src/bundles/`,
            );
        });
    }

    // Component Analysis
    if (missingIndexes.length > 0) {
        log(`\n🔍 Missing Component Indexes (${missingIndexes.length}):`, "red");
        missingIndexes.forEach((comp) => {
            log(`   ❌ ${comp.component}/index.ts`, "red");
            recommendations.push(`Create index.ts for ${comp.component} component`);
        });
    }

    // Build Results
    console.log("\n🏗️  BUILD RESULTS:");
    console.log("==================");

    const buildResults = [
        { name: "Library Build", result: libBuild },
        { name: "Storybook Build", result: storybookBuild },
        { name: "Documentation Build", result: docsBuild },
    ];

    buildResults.forEach(({ name, result }) => {
        const status = result.success ? "✅ SUCCESS" : "❌ FAILED";
        const color = result.success ? "green" : "red";
        log(`${name}: ${status} (${result.duration}ms)`, color);

        if (!result.success && result.error) {
            log(`   Error: ${result.error.substring(0, 200)}...`, "dim");
        }
    });

    // Action Plan
    console.log("\n🚀 RECOMMENDED ACTION PLAN:");
    console.log("===========================");

    if (recommendations.length === 0) {
        log("✅ No immediate actions required", "green");
    } else {
        recommendations.forEach((rec, index) => {
            log(`${index + 1}. ${rec}`, "yellow");
        });
    }

    // Quick Fix Commands
    console.log("\n⚡ QUICK FIX COMMANDS:");
    console.log("=====================");

    if (depIssues) {
        log("bun install --frozen-lockfile", "cyan");
    }
    if (typeIssues) {
        log("bunx tsc --noEmit --project tsconfig.json", "cyan");
    }
    if (buildFailures.length > 0) {
        log("node scripts/fix-library-build.cjs", "cyan");
        log("node scripts/fix-storybook-build.cjs", "cyan");
    }

    // Return diagnostic summary
    return {
        criticalIssues: criticalIssues.length,
        totalRecommendations: recommendations.length,
        buildsPassing: buildResults.filter((r) => r.result.success).length,
        totalBuilds: buildResults.length,
        readyForProduction: criticalIssues.length === 0,
    };
}

/**
 * Main execution function
 */
async function main() {
    logHeader("Enhanced LiqUIdify Build Debug Analysis");

    log(
        "This enhanced script will systematically analyze all build components",
        "blue",
    );
    log("and provide actionable solutions for resolving issues.\n", "blue");

    try {
        // Pre-flight checks
        logStep("1", "Running pre-flight system checks");
        const bundleResults = checkBundleEntryPoints();
        const componentResults = checkComponentIndexFiles();
        const storyResults = checkStoryFiles();
        const depResults = checkDependencies();
        const typeScriptResults = validateTypeScript();

        // Build testing
        logStep("2", "Testing build systems");
        const libBuild = testLibraryBuild();
        const storybookBuild = testStorybookBuild();
        const docsBuild = testDocumentationBuild();

        // Output validation
        logStep("3", "Validating build outputs");
        const buildOutputs = validateBuildOutputs();

        // Generate comprehensive report
        logStep("4", "Generating diagnostic report");
        const diagnosticSummary = generateDiagnosticReport({
            bundleResults,
            componentResults,
            storyResults,
            depResults,
            typeScriptResults,
            libBuild,
            storybookBuild,
            docsBuild,
            buildOutputs,
        });

        // Final status
        console.log("\n" + "=".repeat(80));
        if (diagnosticSummary.readyForProduction) {
            log("🎉 BUILD SYSTEM IS READY FOR PRODUCTION!", "green");
            process.exit(0);
        } else {
            log("🔧 BUILD SYSTEM REQUIRES ATTENTION", "yellow");
            log(
                `Found ${diagnosticSummary.criticalIssues} critical issues with ${diagnosticSummary.totalRecommendations} recommended fixes`,
                "yellow",
            );
            process.exit(1);
        }
    } catch (error) {
        logError(`Debug analysis failed: ${error.message}`);
        console.error(error.stack);
        process.exit(1);
    }
}

// Execute the enhanced debug analysis
main().catch((error) => {
    logError(`Fatal error: ${error.message}`);
    process.exit(1);
});
