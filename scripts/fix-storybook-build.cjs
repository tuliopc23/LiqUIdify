#!/usr/bin/env node

/**
 * Fix Storybook Build Script
 * Automatically detects and fixes common Storybook build issues including
 * configuration problems, missing stories, and dependency conflicts.
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
    log(`📚 ${title}`, "bold");
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
            maxBuffer: 10 * 1024 * 1024, // 10MB buffer
        });
        logSuccess(`${description} completed`);
        return { success: true, output };
    } catch (error) {
        const errorMsg = `${description} failed: ${error.message}`;
        if (continueOnError) {
            logWarning(errorMsg);
            return { success: false, error: error.message, stderr: error.stderr };
        } else {
            logError(errorMsg);
            throw error;
        }
    }
}

/**
 * Check and fix Storybook configuration
 */
function fixStorybookConfiguration() {
    logSection("Fixing Storybook Configuration");

    const storybookConfigPath = "apps/storybook/.storybook/main.ts";
    let fixedCount = 0;

    if (!fs.existsSync(storybookConfigPath)) {
        logError(`Storybook config not found: ${storybookConfigPath}`);
        return 0;
    }

    try {
        let configContent = fs.readFileSync(storybookConfigPath, "utf8");
        let needsUpdate = false;

        // Check for common configuration issues and fixes
        const fixes = [
            {
                name: "Stories pattern",
                check: (content) =>
                    !content.includes(
                        "../../../libs/components/src/**/*.stories.@(js|jsx|ts|tsx)",
                    ),
                fix: (content) => {
                    // Update stories pattern to correctly point to component stories
                    const updatedContent = content.replace(
                        /stories:\s*\[[^\]]*\]/s,
                        `stories: [
    "../../../libs/components/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../libs/components/src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ]`,
                    );
                    return updatedContent;
                },
            },
            {
                name: "TypeScript support",
                check: (content) => !content.includes("@storybook/addon-essentials"),
                fix: (content) => {
                    // Ensure essential addons are included
                    if (!content.includes("addons:")) {
                        return content.replace(
                            /export default \{([^}]+)\}/s,
                            `export default {$1,
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ]
}`,
                        );
                    }
                    return content;
                },
            },
            {
                name: "React framework configuration",
                check: (content) => !content.includes("@storybook/react-vite"),
                fix: (content) => {
                    if (!content.includes("framework:")) {
                        return content.replace(
                            /export default \{([^}]+)\}/s,
                            `export default {$1,
  framework: {
    name: "@storybook/react-vite",
    options: {}
  }
}`,
                        );
                    }
                    return content;
                },
            },
        ];

        // Apply fixes
        for (const fix of fixes) {
            if (fix.check(configContent)) {
                configContent = fix.fix(configContent);
                needsUpdate = true;
                fixedCount++;
                logFix(`Fixed ${fix.name}`);
            } else {
                logSuccess(`${fix.name} is correctly configured`);
            }
        }

        // Write updated configuration
        if (needsUpdate) {
            fs.writeFileSync(storybookConfigPath, configContent);
            logSuccess(`Updated Storybook configuration (${fixedCount} fixes)`);
        } else {
            logSuccess("Storybook configuration is correct");
        }

        return fixedCount;
    } catch (error) {
        logError(`Failed to fix Storybook config: ${error.message}`);
        return 0;
    }
}

/**
 * Fix missing or broken story files
 */
function fixStoryFiles() {
    logSection("Fixing Story Files");

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
        const storyPath = path.join(
            componentsDir,
            componentDir,
            `${componentDir}.stories.tsx`,
        );

        if (!fs.existsSync(storyPath)) {
            // Create basic story template
            const storyTemplate = generateStoryTemplate(componentDir);
            try {
                fs.writeFileSync(storyPath, storyTemplate);
                logFix(`Created story file: ${componentDir}.stories.tsx`);
                fixedCount++;
            } catch (error) {
                logWarning(
                    `Failed to create story for ${componentDir}: ${error.message}`,
                );
            }
        } else {
            // Check if story file is valid
            try {
                const storyContent = fs.readFileSync(storyPath, "utf8");

                // Check for common story issues
                if (storyContent.trim().length === 0) {
                    const storyTemplate = generateStoryTemplate(componentDir);
                    fs.writeFileSync(storyPath, storyTemplate);
                    logFix(`Fixed empty story file: ${componentDir}.stories.tsx`);
                    fixedCount++;
                } else if (!storyContent.includes("export default")) {
                    logWarning(
                        `Story file missing default export: ${componentDir}.stories.tsx`,
                    );
                } else {
                    logSuccess(`Story file is valid: ${componentDir}`);
                }
            } catch (error) {
                logWarning(
                    `Failed to validate story ${componentDir}: ${error.message}`,
                );
            }
        }
    }

    if (fixedCount > 0) {
        logSuccess(`Fixed ${fixedCount} story files`);
    } else {
        logSuccess("All story files are present and valid");
    }

    return fixedCount;
}

/**
 * Generate a basic story template for a component
 */
function generateStoryTemplate(componentDir) {
    // Extract component name from directory
    const componentName = componentDir
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

    const cleanComponentName = componentName.replace("Glass", "");

    return `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentDir}";

const meta: Meta<typeof ${componentName}> = {
  title: "Components/${cleanComponentName}",
  component: ${componentName},
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "${cleanComponentName} component with glassmorphism design",
      },
    },
  },
  argTypes: {
    // Add component-specific arg types here
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Add default props here
  },
};

export const Variant: Story = {
  args: {
    // Add variant props here
  },
};
`;
}

/**
 * Fix Storybook dependencies
 */
function fixStorybookDependencies() {
    logSection("Fixing Storybook Dependencies");

    let fixedCount = 0;

    // Check if Storybook dependencies are installed
    const requiredDeps = [
        "@storybook/react",
        "@storybook/react-vite",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook",
    ];

    for (const dep of requiredDeps) {
        try {
            require.resolve(dep);
            logSuccess(`Dependency available: ${dep}`);
        } catch (error) {
            logWarning(`Missing dependency: ${dep}`);
            // Note: We don't automatically install missing deps to avoid version conflicts
        }
    }

    // Check package.json for Storybook scripts
    try {
        const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
        let needsUpdate = false;

        const expectedScripts = {
            storybook: "storybook dev -p 6006 -c apps/storybook/.storybook",
            "build:storybook":
                "storybook build -c apps/storybook/.storybook -o apps/storybook/storybook-static",
        };

        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }

        for (const [scriptName, scriptCommand] of Object.entries(expectedScripts)) {
            if (packageJson.scripts[scriptName] !== scriptCommand) {
                packageJson.scripts[scriptName] = scriptCommand;
                needsUpdate = true;
                fixedCount++;
                logFix(`Fixed script: ${scriptName}`);
            }
        }

        if (needsUpdate) {
            fs.writeFileSync(
                "package.json",
                JSON.stringify(packageJson, null, 2) + "\n",
            );
            logSuccess(`Updated package.json scripts (${fixedCount} fixes)`);
        } else {
            logSuccess("Storybook scripts are correctly configured");
        }
    } catch (error) {
        logError(`Failed to check package.json scripts: ${error.message}`);
    }

    return fixedCount;
}

/**
 * Fix Storybook build output directory
 */
function fixStorybookOutputDirectory() {
    logSection("Ensuring Storybook Output Directory");

    const outputDir = "apps/storybook/storybook-static";
    let fixedCount = 0;

    // Ensure the parent directory exists
    const parentDir = path.dirname(outputDir);
    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
        logFix(`Created Storybook parent directory: ${parentDir}`);
        fixedCount++;
    }

    // Clean old output if it exists and is corrupted
    if (fs.existsSync(outputDir)) {
        try {
            const stats = fs.statSync(outputDir);
            if (stats.isDirectory()) {
                // Check if directory has any content
                const files = fs.readdirSync(outputDir);
                if (files.length === 0) {
                    logInfo("Storybook output directory exists but is empty");
                } else {
                    logSuccess("Storybook output directory exists with content");
                }
            } else {
                // If it exists but is not a directory, remove it
                fs.unlinkSync(outputDir);
                logFix("Removed invalid Storybook output file");
                fixedCount++;
            }
        } catch (error) {
            logWarning(
                `Could not check Storybook output directory: ${error.message}`,
            );
        }
    }

    return fixedCount;
}

/**
 * Fix Storybook CSS and asset loading
 */
function fixStorybookAssets() {
    logSection("Fixing Storybook Asset Configuration");

    const previewPath = "apps/storybook/.storybook/preview.ts";
    let fixedCount = 0;

    if (!fs.existsSync(previewPath)) {
        // Create basic preview configuration
        const previewTemplate = `import type { Preview } from "@storybook/react";
import "../../../libs/components/src/styles/glass-base.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#1a1a1a",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
  },
};

export default preview;
`;

        try {
            // Ensure .storybook directory exists
            const storybookDir = path.dirname(previewPath);
            if (!fs.existsSync(storybookDir)) {
                fs.mkdirSync(storybookDir, { recursive: true });
            }

            fs.writeFileSync(previewPath, previewTemplate);
            logFix("Created Storybook preview configuration");
            fixedCount++;
        } catch (error) {
            logError(`Failed to create preview config: ${error.message}`);
        }
    } else {
        logSuccess("Storybook preview configuration exists");

        // Check if CSS imports are present
        try {
            const previewContent = fs.readFileSync(previewPath, "utf8");
            if (!previewContent.includes("glass-base.css")) {
                // Add CSS import
                const updatedContent = `import "../../../libs/components/src/styles/glass-base.css";\n${previewContent}`;
                fs.writeFileSync(previewPath, updatedContent);
                logFix("Added CSS import to preview configuration");
                fixedCount++;
            }
        } catch (error) {
            logWarning(`Could not update preview configuration: ${error.message}`);
        }
    }

    return fixedCount;
}

/**
 * Test Storybook build after fixes
 */
function testStorybookBuildAfterFixes() {
    logSection("Testing Storybook Build After Fixes");

    logInfo("Attempting Storybook build...");
    const buildResult = runCommand(
        "bun run build:storybook",
        "Storybook build test",
        { continueOnError: true },
    );

    if (buildResult.success) {
        logSuccess("✅ Storybook build successful after fixes!");

        // Check if output was generated
        const outputDir = "apps/storybook/storybook-static";
        if (fs.existsSync(outputDir)) {
            const files = fs.readdirSync(outputDir);
            logSuccess(`Generated ${files.length} files in output directory`);

            // Check for key files
            const keyFiles = ["index.html", "main.js"];
            const foundKeyFiles = keyFiles.filter((file) =>
                files.some((f) => f.includes(file.replace(".js", ""))),
            );

            if (foundKeyFiles.length > 0) {
                logSuccess(
                    `Found ${foundKeyFiles.length}/${keyFiles.length} key output files`,
                );
            }
        }

        return true;
    } else {
        logError("❌ Storybook build still failing - manual intervention required");
        if (buildResult.error) {
            logError(`Build error: ${buildResult.error}`);
        }
        if (buildResult.stderr) {
            logError(`Build stderr: ${buildResult.stderr}`);
        }
        return false;
    }
}

/**
 * Generate fix summary report
 */
function generateFixSummary(fixes) {
    logHeader("STORYBOOK BUILD FIX SUMMARY");

    const {
        configFixes,
        storyFixes,
        dependencyFixes,
        outputFixes,
        assetFixes,
        buildSuccess,
    } = fixes;

    const totalFixes =
        configFixes + storyFixes + dependencyFixes + outputFixes + assetFixes;

    console.log("\n📊 FIXES APPLIED:");
    console.log("=================");
    log(`Configuration fixes: ${configFixes}`, configFixes > 0 ? "green" : "dim");
    log(`Story files fixed: ${storyFixes}`, storyFixes > 0 ? "green" : "dim");
    log(
        `Dependency fixes: ${dependencyFixes}`,
        dependencyFixes > 0 ? "green" : "dim",
    );
    log(
        `Output directory fixes: ${outputFixes}`,
        outputFixes > 0 ? "green" : "dim",
    );
    log(
        `Asset configuration fixes: ${assetFixes}`,
        assetFixes > 0 ? "green" : "dim",
    );

    console.log("\n🎯 RESULTS:");
    console.log("===========");
    log(`Total fixes applied: ${totalFixes}`, totalFixes > 0 ? "green" : "blue");
    log(
        `Build status: ${buildSuccess ? "✅ SUCCESS" : "❌ FAILED"}`,
        buildSuccess ? "green" : "red",
    );

    if (buildSuccess) {
        console.log("\n🎉 STORYBOOK BUILD IS NOW WORKING!");
        console.log(
            "Your Storybook is ready for development and can be built successfully.",
        );
    } else if (totalFixes > 0) {
        console.log("\n🔄 PROGRESS MADE");
        console.log(
            `Applied ${totalFixes} fixes. The build may need additional manual fixes.`,
        );
    } else {
        console.log("\n🔍 NO AUTOMATIC FIXES AVAILABLE");
        console.log(
            "The Storybook build issues require manual investigation and fixing.",
        );
    }

    console.log("\n📋 NEXT STEPS:");
    console.log("===============");
    if (buildSuccess) {
        log("1. Run 'bun run storybook' to start development server", "cyan");
        log("2. Run 'bun run build:storybook' to verify the build", "cyan");
        log("3. Check that all component stories are working correctly", "cyan");
    } else {
        log("1. Review the build error messages above", "yellow");
        log(
            "2. Check for missing component exports or TypeScript errors",
            "yellow",
        );
        log("3. Verify that all story files have valid syntax", "yellow");
        log(
            "4. Run 'node scripts/debug-build-fixed.cjs' for detailed analysis",
            "yellow",
        );
    }

    return {
        totalFixes,
        buildSuccess,
        readyForDevelopment: buildSuccess,
    };
}

/**
 * Main execution function
 */
async function main() {
    logHeader("LiqUIdify Storybook Build Fix Tool");

    log(
        "This script will automatically detect and fix common Storybook build issues.",
        "blue",
    );
    log(
        "Including configuration problems, missing stories, and asset loading issues.\n",
        "blue",
    );

    try {
        logStep("1", "Diagnosing Storybook build issues");

        // Apply fixes in logical order
        logStep("2", "Applying automatic fixes");

        const configFixes = fixStorybookConfiguration();
        const storyFixes = fixStoryFiles();
        const dependencyFixes = fixStorybookDependencies();
        const outputFixes = fixStorybookOutputDirectory();
        const assetFixes = fixStorybookAssets();

        logStep("3", "Testing Storybook build after fixes");
        const buildSuccess = testStorybookBuildAfterFixes();

        logStep("4", "Generating fix summary");
        const summary = generateFixSummary({
            configFixes,
            storyFixes,
            dependencyFixes,
            outputFixes,
            assetFixes,
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
