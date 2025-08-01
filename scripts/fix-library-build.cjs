#!/usr/bin/env node

/**
 * Fix Library Build Script
 * Automatically detects and fixes common library build issues including
 * missing bundle files, configuration mismatches, and dependency problems.
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
    log(`🛠️  ${title}`, "cyan");
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

function logFix(message) {
    log(`🔧 ${message}`, "magenta");
}

/**
 * Safe command execution with error handling
 */
function runCommand(command, description, options = {}) {
    const { continueOnError = true, cwd = process.cwd() } = options;

    logInfo(`Executing: ${command}`);

    try {
        const output = execSync(command, {
            encoding: "utf8",
            cwd,
            stdio: "pipe",
        });
        logSuccess(`${description} completed`);
        return { success: true, output };
    } catch (error) {
        const errorMsg = `${description} failed: ${error.message}`;
        if (continueOnError) {
            logWarning(errorMsg);
            return { success: false, error: error.message };
        } else {
            logError(errorMsg);
            throw error;
        }
    }
}

/**
 * Bundle template generator
 */
function generateBundleTemplate(bundleName, components = []) {
    const templates = {
        core: `// Core bundle - Essential components and utilities
export { BaseComponent } from "../core/base-component";
export { AccessibilityManager } from "../core/accessibility-manager";
export * from "../core/types/index";
export * from "../core/utils/index";
export * from "../hooks/index";`,

        forms: `// Forms bundle - Form components and inputs
export { GlassInput } from "../components/glass-input";
export { GlassTextarea } from "../components/glass-textarea";
export { GlassSelect } from "../components/glass-select";
export { GlassCheckbox } from "../components/glass-checkbox";
export { GlassRadioGroup } from "../components/glass-radio-group";
export { GlassSwitch } from "../components/glass-switch";
export { GlassFormField } from "../components/glass-form-field";
export { GlassNumberInput } from "../components/glass-number-input";
export { GlassDatePicker } from "../components/glass-date-picker";
export { GlassCombobox } from "../components/glass-combobox";
export { GlassCheckboxGroup } from "../components/glass-checkbox-group";
export { GlassFileUpload } from "../components/glass-file-upload";`,

        navigation: `// Navigation bundle - Navigation and routing components
export { GlassBreadcrumbs } from "../components/glass-breadcrumbs";
export { GlassTabs } from "../components/glass-tabs";
export { GlassPagination } from "../components/glass-pagination";
export { GlassTreeView } from "../components/glass-tree-view";
export { GlassMobileNav } from "../components/glass-mobile-nav";
export { Navbar } from "../components/navbar";
export { Sidebar } from "../components/sidebar";`,

        feedback: `// Feedback bundle - User feedback and notification components
export { GlassAlert } from "../components/glass-alert";
export { GlassToast } from "../components/glass-toast";
export { GlassNotification } from "../components/glass-notification";
export { GlassSpinner } from "../components/glass-spinner";
export { GlassLoading } from "../components/glass-loading";
export { GlassProgress } from "../components/glass-progress";
export { GlassSkeleton } from "../components/glass-skeleton";
export { GlassBanner } from "../components/glass-banner";`,

        layout: `// Layout bundle - Layout and container components
export { GlassCardRefactored as GlassCard } from "../components/glass-card-refactored";
export { GlassModal } from "../components/glass-modal";
export { GlassDrawer } from "../components/glass-drawer";
export { GlassPopover } from "../components/glass-popover";
export { GlassTooltip } from "../components/glass-tooltip";
export { GlassResponsiveCard } from "../components/glass-responsive-card";
export { GlassAccordion } from "../components/glass-accordion";`,

        "data-display": `// Data Display bundle - Data presentation components
export { GlassTable } from "../components/glass-table";
export { GlassChart } from "../components/glass-chart";
export { GlassBadge } from "../components/glass-badge";
export { GlassAvatar } from "../components/glass-avatar";
export { GlassTimeline } from "../components/glass-timeline";`,

        accessibility: `// Accessibility bundle - Accessibility utilities and components
export { GlassAccessibleDemo } from "../components/glass-accessible-demo";
export { GlassSkipNavigation } from "../components/glass-skip-navigation";
export { GlassVisuallyHidden } from "../components/glass-visually-hidden";
export { GlassLiveRegion } from "../components/glass-live-region";
export { GlassFocusTrap } from "../components/glass-focus-trap";
export { GlassFocusDemo } from "../components/glass-focus-demo";
export { AccessibilityManager } from "../core/accessibility-manager";`,

        advanced: `// Advanced bundle - Advanced components and effects
export { GlassCommand } from "../components/glass-command";
export { GlassSearch } from "../components/glass-search";
export { GlassSlider } from "../components/glass-slider";
export { GlassDropdown } from "../components/glass-dropdown";
export { GlassPerformanceDashboard } from "../components/glass-performance-dashboard";
export { AppleLiquidGlass } from "../components/apple-liquid-glass";`,

        animations: `// Animations bundle - Animation utilities and hooks
export * from "../lib/framer-motion-constants";
export * from "../hooks/use-glass-animations";
export * from "../hooks/use-haptic-feedback";
export * from "../utils/glass-effects";`,

        physics: `// Physics bundle - Physics engine and related utilities
export * from "../lib/glass-physics";
export * from "../lib/liquid-glass-tokens";
export * from "../hooks/use-glass-animations";`,

        ssr: `// SSR bundle - Server-side rendering utilities
export { GlassSSRDemo } from "../components/glass-ssr-demo";
export { HydrationDetector } from "../components/hydration-detector";
export * from "../hooks/use-ssr-safe";`,

        providers: `// Providers bundle - Context providers and configuration
export { GlassUIProvider } from "../providers/glass-ui-provider";
export { GlassPerformanceProvider } from "../providers/glass-performance-provider";
export { ConfigProvider } from "../providers/config-provider";
export { ThemeProvider } from "../components/theme-provider";
export { ThemeToggle } from "../components/theme-toggle";`,

        tokens: `// Tokens bundle - Design tokens and theming
export * from "../tokens/design-tokens";
export * from "../lib/liquid-glass-tokens";
export * from "../styles/glass-base.css";`,
    };

    return (
        templates[bundleName] ||
        `// ${bundleName} bundle
// TODO: Add exports for ${bundleName} components
export {};`
    );
}

/**
 * Component index template generator
 */
function generateComponentIndexTemplate(componentName) {
    // Extract the actual component name from directory names like 'glass-button-refactored'
    const cleanName = componentName
        .replace("glass-", "")
        .replace("-refactored", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

    const componentClass = `Glass${cleanName}`;
    const fileName = componentName;

    return `// ${componentClass} component export
export { ${componentClass} } from "./${fileName}";
export type { ${componentClass}Props } from "./${fileName}";
`;
}

/**
 * Fix missing bundle files
 */
function fixMissingBundles() {
    logSection("Fixing Missing Bundle Files");

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

    // Ensure bundles directory exists
    if (!fs.existsSync(bundleDir)) {
        fs.mkdirSync(bundleDir, { recursive: true });
        logFix(`Created bundles directory: ${bundleDir}`);
    }

    let fixedCount = 0;

    for (const bundle of requiredBundles) {
        const bundlePath = path.join(bundleDir, bundle);
        const bundleName = bundle.replace(".ts", "");

        if (!fs.existsSync(bundlePath)) {
            const template = generateBundleTemplate(bundleName);
            fs.writeFileSync(bundlePath, template);
            logFix(`Created bundle file: ${bundle}`);
            fixedCount++;
        } else {
            // Check if file is empty and fix if needed
            const content = fs.readFileSync(bundlePath, "utf8").trim();
            if (content.length === 0 || content === "export {};") {
                const template = generateBundleTemplate(bundleName);
                fs.writeFileSync(bundlePath, template);
                logFix(`Fixed empty bundle file: ${bundle}`);
                fixedCount++;
            } else {
                logSuccess(`Bundle file exists and has content: ${bundle}`);
            }
        }
    }

    if (fixedCount > 0) {
        logSuccess(`Fixed ${fixedCount} bundle files`);
    } else {
        logSuccess("All bundle files are present and valid");
    }

    return fixedCount;
}

/**
 * Fix missing component index files
 */
function fixMissingComponentIndexes() {
    logSection("Fixing Missing Component Index Files");

    const componentsDir = "libs/components/src/components";
    let fixedCount = 0;

    if (!fs.existsSync(componentsDir)) {
        logError(`Components directory not found: ${componentsDir}`);
        return 0;
    }

    const componentDirs = fs
        .readdirSync(componentsDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    for (const componentDir of componentDirs) {
        const indexPath = path.join(componentsDir, componentDir, "index.ts");

        if (!fs.existsSync(indexPath)) {
            const template = generateComponentIndexTemplate(componentDir);
            fs.writeFileSync(indexPath, template);
            logFix(`Created index file: ${componentDir}/index.ts`);
            fixedCount++;
        } else {
            // Check if file is empty and fix if needed
            const content = fs.readFileSync(indexPath, "utf8").trim();
            if (content.length === 0) {
                const template = generateComponentIndexTemplate(componentDir);
                fs.writeFileSync(indexPath, template);
                logFix(`Fixed empty index file: ${componentDir}/index.ts`);
                fixedCount++;
            } else {
                logSuccess(`Index file exists and has content: ${componentDir}`);
            }
        }
    }

    if (fixedCount > 0) {
        logSuccess(`Fixed ${fixedCount} component index files`);
    } else {
        logSuccess("All component index files are present and valid");
    }

    return fixedCount;
}

/**
 * Fix package.json exports configuration
 */
function fixPackageJsonExports() {
    logSection("Validating Package.json Exports");

    try {
        const packageJsonPath = "package.json";
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

        let fixedCount = 0;
        let needsUpdate = false;

        // Ensure exports are properly configured
        if (!packageJson.exports) {
            logWarning("No exports field found in package.json");
            return 0;
        }

        // Validate main exports paths
        const mainExport = packageJson.exports["."];
        if (mainExport) {
            const expectedPaths = {
                types: "./dist/libs/components/index.d.ts",
                import: "./dist/libs/components/index.mjs",
                require: "./dist/libs/components/index.cjs",
                style: "./dist/libs/components/liquidui.css",
            };

            for (const [key, expectedPath] of Object.entries(expectedPaths)) {
                if (mainExport[key] !== expectedPath) {
                    logFix(`Fixed export path for ${key}: ${expectedPath}`);
                    mainExport[key] = expectedPath;
                    needsUpdate = true;
                    fixedCount++;
                }
            }
        }

        // Update package.json if changes were made
        if (needsUpdate) {
            fs.writeFileSync(
                packageJsonPath,
                JSON.stringify(packageJson, null, 2) + "\n",
            );
            logSuccess(`Updated package.json exports (${fixedCount} fixes)`);
        } else {
            logSuccess("Package.json exports are correctly configured");
        }

        return fixedCount;
    } catch (error) {
        logError(`Failed to validate package.json exports: ${error.message}`);
        return 0;
    }
}

/**
 * Fix TypeScript configuration issues
 */
function fixTypeScriptConfig() {
    logSection("Fixing TypeScript Configuration");

    let fixedCount = 0;

    // Check and fix tsconfig.json
    const tsconfigPath = "tsconfig.json";
    if (!fs.existsSync(tsconfigPath)) {
        logWarning("tsconfig.json not found - this should be created manually");
        return 0;
    }

    try {
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
        let needsUpdate = false;

        // Ensure proper compilation settings for library build
        const requiredCompilerOptions = {
            target: "ES2021",
            module: "ESNext",
            moduleResolution: "bundler",
            strict: true,
            declaration: true,
            declarationMap: true,
            sourceMap: true,
            jsx: "react-jsx",
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
        };

        if (!tsconfig.compilerOptions) {
            tsconfig.compilerOptions = {};
        }

        for (const [option, value] of Object.entries(requiredCompilerOptions)) {
            if (tsconfig.compilerOptions[option] !== value) {
                tsconfig.compilerOptions[option] = value;
                needsUpdate = true;
                fixedCount++;
            }
        }

        if (needsUpdate) {
            fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + "\n");
            logFix(`Updated tsconfig.json (${fixedCount} options fixed)`);
        } else {
            logSuccess("TypeScript configuration is correct");
        }

        return fixedCount;
    } catch (error) {
        logError(`Failed to fix TypeScript config: ${error.message}`);
        return 0;
    }
}

/**
 * Clean and rebuild node_modules if needed
 */
function fixDependencies() {
    logSection("Fixing Dependencies");

    let fixedCount = 0;

    // Check if node_modules exists
    if (!fs.existsSync("node_modules")) {
        logFix("Installing dependencies...");
        const installResult = runCommand(
            "bun install --frozen-lockfile",
            "Installing dependencies",
        );
        if (installResult.success) {
            fixedCount++;
        }
    } else {
        logSuccess("Dependencies are installed");
    }

    // Check for peer dependency warnings
    logInfo("Checking for dependency issues...");
    const checkResult = runCommand("bun install --dry-run", "Dependency check");

    if (!checkResult.success && checkResult.error.includes("peer dep")) {
        logWarning("Peer dependency issues detected - consider reviewing");
    }

    return fixedCount;
}

/**
 * Test the library build after fixes
 */
function testLibraryBuildAfterFixes() {
    logSection("Testing Library Build After Fixes");

    logInfo("Attempting library build...");
    const buildResult = runCommand("bun run build:lib", "Library build test", {
        continueOnError: true,
    });

    if (buildResult.success) {
        logSuccess("✅ Library build successful after fixes!");

        // Check if output files were generated
        const distDir = "dist/libs/components";
        const expectedFiles = ["index.mjs", "index.cjs", "index.d.ts"];
        let outputFilesFound = 0;

        for (const file of expectedFiles) {
            if (fs.existsSync(path.join(distDir, file))) {
                outputFilesFound++;
            }
        }

        logSuccess(
            `Generated ${outputFilesFound}/${expectedFiles.length} expected output files`,
        );
        return true;
    } else {
        logError("❌ Library build still failing - manual intervention required");
        logError(`Build error: ${buildResult.error}`);
        return false;
    }
}

/**
 * Generate fix summary report
 */
function generateFixSummary(fixes) {
    logHeader("LIBRARY BUILD FIX SUMMARY");

    const {
        bundlesFixes,
        indexesFixes,
        exportsFixes,
        typeScriptFixes,
        dependencyFixes,
        buildSuccess,
    } = fixes;

    const totalFixes =
        bundlesFixes +
        indexesFixes +
        exportsFixes +
        typeScriptFixes +
        dependencyFixes;

    console.log("\n📊 FIXES APPLIED:");
    console.log("=================");
    log(
        `Bundle files fixed: ${bundlesFixes}`,
        bundlesFixes > 0 ? "green" : "dim",
    );
    log(`Index files fixed: ${indexesFixes}`, indexesFixes > 0 ? "green" : "dim");
    log(
        `Export paths fixed: ${exportsFixes}`,
        exportsFixes > 0 ? "green" : "dim",
    );
    log(
        `TypeScript config fixes: ${typeScriptFixes}`,
        typeScriptFixes > 0 ? "green" : "dim",
    );
    log(
        `Dependency fixes: ${dependencyFixes}`,
        dependencyFixes > 0 ? "green" : "dim",
    );

    console.log("\n🎯 RESULTS:");
    console.log("===========");
    log(`Total fixes applied: ${totalFixes}`, totalFixes > 0 ? "green" : "blue");
    log(
        `Build status: ${buildSuccess ? "✅ SUCCESS" : "❌ FAILED"}`,
        buildSuccess ? "green" : "red",
    );

    if (buildSuccess) {
        console.log("\n🎉 LIBRARY BUILD IS NOW WORKING!");
        console.log(
            "Your library build has been successfully fixed and is ready for use.",
        );
    } else if (totalFixes > 0) {
        console.log("\n🔄 PROGRESS MADE");
        console.log(
            `Applied ${totalFixes} fixes. The build may need additional manual fixes.`,
        );
    } else {
        console.log("\n🔍 NO AUTOMATIC FIXES AVAILABLE");
        console.log("The build issues require manual investigation and fixing.");
    }

    console.log("\n📋 NEXT STEPS:");
    console.log("===============");
    if (buildSuccess) {
        log("1. Run 'bun run build:lib' to verify the fix", "cyan");
        log("2. Test the build output in your applications", "cyan");
        log(
            "3. Consider running 'node scripts/validate-builds.cjs' for full validation",
            "cyan",
        );
    } else {
        log("1. Review the build error messages above", "yellow");
        log("2. Check for missing components or circular dependencies", "yellow");
        log(
            "3. Run 'node scripts/debug-build-fixed.cjs' for detailed analysis",
            "yellow",
        );
        log("4. Consider manual fixes based on specific error patterns", "yellow");
    }

    return {
        totalFixes,
        buildSuccess,
        readyForProduction: buildSuccess && totalFixes >= 0,
    };
}

/**
 * Main execution function
 */
async function main() {
    logHeader("LiqUIdify Library Build Fix Tool");

    log(
        "This script will automatically detect and fix common library build issues.",
        "blue",
    );
    log(
        "Including missing bundles, component indexes, and configuration problems.\n",
        "blue",
    );

    try {
        logStep("1", "Diagnosing build issues");

        // Apply fixes in order of dependency
        logStep("2", "Applying automatic fixes");

        const bundlesFixes = fixMissingBundles();
        const indexesFixes = fixMissingComponentIndexes();
        const exportsFixes = fixPackageJsonExports();
        const typeScriptFixes = fixTypeScriptConfig();
        const dependencyFixes = fixDependencies();

        logStep("3", "Testing build after fixes");
        const buildSuccess = testLibraryBuildAfterFixes();

        logStep("4", "Generating fix summary");
        const summary = generateFixSummary({
            bundlesFixes,
            indexesFixes,
            exportsFixes,
            typeScriptFixes,
            dependencyFixes,
            buildSuccess,
        });

        // Exit with appropriate code
        if (summary.buildSuccess) {
            process.exit(0);
        } else {
            process.exit(1);
        }
    } catch (error) {
        logError(`Fix script failed: ${error.message}`);
        console.error(error.stack);
        process.exit(1);
    }
}

// Execute the fix script
main().catch((error) => {
    logError(`Fatal error: ${error.message}`);
    process.exit(1);
});
