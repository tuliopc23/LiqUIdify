#!/usr/bin/env node

/**
 * Check Stories Script
 * Systematically tests Storybook build and story files with comprehensive validation
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ANSI color codes for output formatting
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
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

// Check Storybook configuration and dependencies
function checkStorybookSetup() {
  logSection("Storybook Setup Verification");

  let setupResults = {
    configExists: false,
    dependenciesOk: false,
    scriptsOk: false,
    configValid: false,
  };

  logStep(1, "Checking Storybook configuration files");

  const configFiles = [
    "apps/storybook/.storybook/main.ts",
    "apps/storybook/.storybook/main.js",
    ".storybook/main.ts",
    ".storybook/main.js",
  ];

  let foundConfig = null;
  for (const configFile of configFiles) {
    if (fs.existsSync(configFile)) {
      foundConfig = configFile;
      setupResults.configExists = true;
      logSuccess(`Found Storybook config: ${configFile}`);
      break;
    }
  }

  if (!foundConfig) {
    logError("No Storybook configuration found");
    logInfo("Searched for: " + configFiles.join(", "));
    return setupResults;
  }

  // Validate config content
  try {
    const configContent = fs.readFileSync(foundConfig, "utf8");

    // Check for essential configuration
    const hasStories = /stories\s*:\s*\[/.test(configContent);
    const hasAddons = /addons\s*:\s*\[/.test(configContent);
    const hasFramework = /framework\s*:\s*['\"]/.test(configContent);

    if (hasStories && hasAddons && hasFramework) {
      setupResults.configValid = true;
      logSuccess("Storybook configuration is valid");

      // Extract story patterns
      const storyMatch = configContent.match(/stories\s*:\s*\[(.*?)\]/s);
      if (storyMatch) {
        const patterns = storyMatch[1].replace(/\s+/g, " ").trim();
        logInfo(`Story patterns: ${patterns}`);
      }
    } else {
      logWarning("Storybook configuration may be incomplete");
      logInfo(
        `Has stories: ${hasStories}, Has addons: ${hasAddons}, Has framework: ${hasFramework}`,
      );
    }
  } catch (error) {
    logError(`Error reading Storybook config: ${error.message}`);
  }

  logStep(2, "Checking Storybook dependencies");

  try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const devDeps = packageJson.devDependencies || {};

    const requiredDeps = [
      "@storybook/react",
      "@storybook/react-vite",
      "storybook",
    ];

    const missingDeps = requiredDeps.filter((dep) => !devDeps[dep]);

    if (missingDeps.length === 0) {
      setupResults.dependenciesOk = true;
      logSuccess("All required Storybook dependencies found");

      // Show versions
      requiredDeps.forEach((dep) => {
        logInfo(`${dep}: ${devDeps[dep]}`);
      });
    } else {
      logError("Missing Storybook dependencies:");
      missingDeps.forEach((dep) => logError(`  • ${dep}`));
    }

    // Check optional but recommended deps
    const optionalDeps = [
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
      "@storybook/addon-a11y",
    ];

    const foundOptional = optionalDeps.filter((dep) => devDeps[dep]);
    if (foundOptional.length > 0) {
      logInfo("Optional addons found:");
      foundOptional.forEach((dep) => logInfo(`  • ${dep}: ${devDeps[dep]}`));
    }
  } catch (error) {
    logError(`Error checking dependencies: ${error.message}`);
  }

  logStep(3, "Checking Storybook scripts");

  try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const scripts = packageJson.scripts || {};

    const requiredScripts = ["storybook", "build:storybook"];
    const foundScripts = requiredScripts.filter((script) => scripts[script]);

    if (foundScripts.length === requiredScripts.length) {
      setupResults.scriptsOk = true;
      logSuccess("Storybook scripts are configured");
      requiredScripts.forEach((script) => {
        logInfo(`${script}: ${scripts[script]}`);
      });
    } else {
      const missingScripts = requiredScripts.filter(
        (script) => !scripts[script],
      );
      logWarning("Missing Storybook scripts:");
      missingScripts.forEach((script) => logWarning(`  • ${script}`));
    }
  } catch (error) {
    logError(`Error checking scripts: ${error.message}`);
  }

  return setupResults;
}

// Find and analyze story files
function analyzeStoryFiles() {
  logSection("Story Files Analysis");

  let storyResults = {
    totalFiles: 0,
    validStories: 0,
    invalidStories: 0,
    missingComponents: 0,
    storyFiles: [],
    issues: [],
  };

  logStep(1, "Finding story files");

  try {
    // Look for story files in common locations
    const searchPaths = [
      "libs/components/src/**/*.stories.ts",
      "libs/components/src/**/*.stories.tsx",
      "src/**/*.stories.ts",
      "src/**/*.stories.tsx",
      "stories/**/*.stories.ts",
      "stories/**/*.stories.tsx",
    ];

    let allStoryFiles = [];

    for (const searchPath of searchPaths) {
      try {
        // Use find command to locate story files
        const basePath = searchPath.split("**")[0];
        if (fs.existsSync(basePath)) {
          const findCmd = `find ${basePath} -name "*.stories.ts" -o -name "*.stories.tsx" 2>/dev/null || true`;
          const output = execSync(findCmd, { encoding: "utf8" });
          const files = output
            .trim()
            .split("\n")
            .filter((f) => f && f.length > 0);
          allStoryFiles.push(...files);
        }
      } catch (error) {
        // Continue searching other paths
      }
    }

    // Remove duplicates
    const uniqueStoryFiles = [...new Set(allStoryFiles)];
    storyResults.storyFiles = uniqueStoryFiles;
    storyResults.totalFiles = uniqueStoryFiles.length;

    logSuccess(`Found ${uniqueStoryFiles.length} story files`);

    if (uniqueStoryFiles.length === 0) {
      logWarning(
        "No story files found - this will prevent Storybook from building",
      );
      return storyResults;
    }
  } catch (error) {
    logError(`Error finding story files: ${error.message}`);
    return storyResults;
  }

  logStep(2, "Validating story file contents");

  storyResults.storyFiles.forEach((storyFile) => {
    const validation = validateStoryFile(storyFile);

    if (validation.isValid) {
      storyResults.validStories++;
      logSuccess(`Valid: ${storyFile}`);
    } else {
      storyResults.invalidStories++;
      logError(`Invalid: ${storyFile}`);
      storyResults.issues.push(
        `Invalid story: ${storyFile} - ${validation.errors.join(", ")}`,
      );
    }

    // Check if component exists
    const componentCheck = checkComponentForStory(storyFile);
    if (!componentCheck.exists) {
      storyResults.missingComponents++;
      storyResults.issues.push(
        `Missing component for ${storyFile}: searched ${componentCheck.searched.join(", ")}`,
      );
    }
  });

  return storyResults;
}

// Validate individual story file
function validateStoryFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const errors = [];

    // Check for required Storybook elements
    if (!/export\s+default\s+/.test(content)) {
      errors.push("Missing default export");
    }

    if (!/(?:Meta|meta)\s*[=:]/.test(content)) {
      errors.push("Missing Meta configuration");
    }

    if (!/import.*from\s+['"]@storybook/.test(content)) {
      errors.push("Missing Storybook imports");
    }

    if (!/import.*(?:Glass|glass)/.test(content)) {
      errors.push("Missing component import");
    }

    // Check for at least one story
    if (!/(?:export\s+const\s+\w+|const\s+\w+\s*:\s*Story)/.test(content)) {
      errors.push("No stories found");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [`File read error: ${error.message}`],
    };
  }
}

// Check if component exists for story
function checkComponentForStory(storyFilePath) {
  const componentDir = path.dirname(storyFilePath);
  const componentName = path.basename(componentDir);

  const possibleComponentFiles = [
    path.join(componentDir, `${componentName}.tsx`),
    path.join(componentDir, `${componentName}.ts`),
    path.join(componentDir, "index.tsx"),
    path.join(componentDir, "index.ts"),
  ];

  for (const componentFile of possibleComponentFiles) {
    if (fs.existsSync(componentFile)) {
      return { exists: true, found: componentFile };
    }
  }

  return { exists: false, searched: possibleComponentFiles };
}

// Test Storybook build process
function testStorybookBuild() {
  logSection("Storybook Build Test");

  let buildResults = {
    buildSuccess: false,
    buildTime: 0,
    outputExists: false,
    outputValid: false,
    errors: [],
  };

  logStep(1, "Cleaning previous Storybook build");

  const storybookOutputDir = "apps/storybook/storybook-static";
  if (fs.existsSync(storybookOutputDir)) {
    try {
      execSync(`rm -rf ${storybookOutputDir}`, { stdio: "pipe" });
      logSuccess("Cleaned previous build");
    } catch (error) {
      logWarning(`Failed to clean previous build: ${error.message}`);
    }
  }

  logStep(2, "Running Storybook build");

  try {
    const startTime = Date.now();

    const buildOutput = execSync("bun run build:storybook", {
      encoding: "utf8",
      stdio: "pipe",
      timeout: 120000, // 2 minute timeout
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });

    const endTime = Date.now();
    buildResults.buildTime = ((endTime - startTime) / 1000).toFixed(2);
    buildResults.buildSuccess = true;

    logSuccess(`Storybook build completed in ${buildResults.buildTime}s`);

    if (buildOutput && buildOutput.trim()) {
      logInfo("Build output preview:");
      const lines = buildOutput.trim().split("\n");
      const preview = lines.slice(-10).join("\n"); // Last 10 lines
      console.log(colors.dim + preview + colors.reset);
    }
  } catch (error) {
    logError("Storybook build failed");
    buildResults.errors.push(error.message);

    if (error.stdout) {
      logInfo("Build stdout:");
      console.log(colors.dim + error.stdout + colors.reset);
    }

    if (error.stderr) {
      logError("Build stderr:");
      console.log(colors.red + error.stderr + colors.reset);
    }

    return buildResults;
  }

  logStep(3, "Verifying build output");

  if (fs.existsSync(storybookOutputDir)) {
    buildResults.outputExists = true;
    logSuccess("Storybook output directory exists");

    try {
      const outputFiles = fs.readdirSync(storybookOutputDir);
      logInfo(`Generated ${outputFiles.length} files/directories`);

      // Check for essential files
      const essentialFiles = ["index.html", "static"];
      const foundEssential = essentialFiles.filter((file) =>
        outputFiles.includes(file),
      );

      if (foundEssential.length === essentialFiles.length) {
        buildResults.outputValid = true;
        logSuccess("All essential Storybook files generated");
      } else {
        const missing = essentialFiles.filter(
          (file) => !outputFiles.includes(file),
        );
        logWarning(`Missing essential files: ${missing.join(", ")}`);
      }

      // Check index.html content
      const indexPath = path.join(storybookOutputDir, "index.html");
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, "utf8");
        if (
          indexContent.includes("storybook") &&
          indexContent.includes("<script")
        ) {
          logSuccess("index.html contains valid Storybook content");
        } else {
          logWarning("index.html may be corrupted or incomplete");
        }
      }
    } catch (error) {
      logError(`Error reading build output: ${error.message}`);
      buildResults.errors.push(`Output verification failed: ${error.message}`);
    }
  } else {
    logError("Storybook output directory not created");
  }

  return buildResults;
}

// Test Storybook dev server (quick start test)
function testStorybookDev() {
  logSection("Storybook Dev Server Test");

  logStep(1, "Testing Storybook dev server startup");

  try {
    // Start Storybook dev server with timeout
    const process = execSync("timeout 10s bun run storybook || true", {
      encoding: "utf8",
      stdio: "pipe",
      timeout: 15000,
    });

    if (process.includes("Local:") || process.includes("webpack compiled")) {
      logSuccess("Storybook dev server can start successfully");
      return { devWorks: true };
    } else {
      logWarning("Storybook dev server startup unclear - check manually");
      logInfo("Output preview:");
      console.log(colors.dim + process.slice(0, 500) + colors.reset);
      return { devWorks: false, output: process };
    }
  } catch (error) {
    // Timeout is expected, check if error contains startup success indicators
    const output = error.stdout || "";
    if (output.includes("Local:") || output.includes("webpack compiled")) {
      logSuccess(
        "Storybook dev server started successfully (killed by timeout)",
      );
      return { devWorks: true };
    } else {
      logError("Storybook dev server failed to start");
      if (error.stderr) {
        logInfo("Error output:");
        console.log(colors.red + error.stderr.slice(0, 500) + colors.reset);
      }
      return { devWorks: false, error: error.message };
    }
  }
}

// Generate comprehensive Storybook report
function generateStorybookReport(
  setupResults,
  storyResults,
  buildResults,
  devResults,
) {
  logHeader("STORYBOOK ANALYSIS REPORT");

  console.log("\n📊 SUMMARY:");
  console.log("================");

  // Overall status
  const overallSuccess =
    setupResults.configExists &&
    setupResults.dependenciesOk &&
    storyResults.validStories > 0 &&
    storyResults.invalidStories === 0 &&
    buildResults.buildSuccess &&
    buildResults.outputValid;

  if (overallSuccess) {
    logSuccess("🎉 STORYBOOK FULLY FUNCTIONAL");
  } else {
    logError("❌ STORYBOOK ISSUES DETECTED");
  }

  console.log("\n📈 Results Breakdown:");
  console.log("========================");

  log(
    `Configuration: ${setupResults.configExists && setupResults.configValid ? "✅ VALID" : "❌ INVALID"}`,
    setupResults.configExists && setupResults.configValid ? "green" : "red",
  );
  log(
    `Dependencies: ${setupResults.dependenciesOk ? "✅ OK" : "❌ MISSING"}`,
    setupResults.dependenciesOk ? "green" : "red",
  );
  log(
    `Scripts: ${setupResults.scriptsOk ? "✅ OK" : "❌ MISSING"}`,
    setupResults.scriptsOk ? "green" : "red",
  );
  log(
    `Story files: ${storyResults.validStories}/${storyResults.totalFiles} valid`,
    storyResults.invalidStories === 0 ? "green" : "red",
  );
  log(
    `Build: ${buildResults.buildSuccess ? "✅ SUCCESS" : "❌ FAILED"}`,
    buildResults.buildSuccess ? "green" : "red",
  );
  log(
    `Dev server: ${devResults.devWorks ? "✅ WORKS" : "❌ ISSUES"}`,
    devResults.devWorks ? "green" : "red",
  );

  if (buildResults.buildTime) {
    logInfo(`Build time: ${buildResults.buildTime}s`);
  }

  // Detailed issues
  if (storyResults.issues.length > 0) {
    console.log("\n⚠️  STORY ISSUES:");
    console.log("==================");
    storyResults.issues.forEach((issue, index) => {
      logWarning(`${index + 1}. ${issue}`);
    });
  }

  if (buildResults.errors.length > 0) {
    console.log("\n❌ BUILD ERRORS:");
    console.log("=================");
    buildResults.errors.forEach((error, index) => {
      logError(`${index + 1}. ${error}`);
    });
  }

  // Recommendations
  console.log("\n💡 RECOMMENDATIONS:");
  console.log("====================");

  if (!setupResults.configExists) {
    logWarning("1. Install and configure Storybook: npx storybook@latest init");
  }

  if (!setupResults.dependenciesOk) {
    logWarning("2. Install missing Storybook dependencies");
  }

  if (storyResults.totalFiles === 0) {
    logWarning("3. Create story files for your components");
  }

  if (storyResults.invalidStories > 0) {
    logWarning("4. Fix invalid story files to follow Storybook format");
  }

  if (storyResults.missingComponents > 0) {
    logWarning("5. Create missing component files or fix story imports");
  }

  if (!buildResults.buildSuccess) {
    logWarning("6. Fix build errors before deploying Storybook");
  }

  if (!devResults.devWorks) {
    logWarning("7. Test Storybook dev server manually: bun run storybook");
  }

  if (overallSuccess) {
    console.log("\n🚀 Next steps:");
    logSuccess("• Storybook is ready for development and deployment");
    logSuccess("• Add more stories to document your components");
    logSuccess("• Configure additional addons as needed");
  }

  return {
    overallSuccess,
    setupOk: setupResults.configExists && setupResults.dependenciesOk,
    storiesOk: storyResults.invalidStories === 0 && storyResults.totalFiles > 0,
    buildOk: buildResults.buildSuccess && buildResults.outputValid,
    devOk: devResults.devWorks,
    summary: {
      totalStories: storyResults.totalFiles,
      validStories: storyResults.validStories,
      invalidStories: storyResults.invalidStories,
      buildTime: buildResults.buildTime,
    },
  };
}

// Main execution
function main() {
  logHeader("LiqUIdify Storybook Analysis");

  log("📚 Testing Storybook setup, stories, and build process...", "blue");
  log(
    "This will verify your Storybook configuration and functionality\n",
    "dim",
  );

  // Step 1: Check Storybook setup
  const setupResults = checkStorybookSetup();

  // Step 2: Analyze story files
  const storyResults = analyzeStoryFiles();

  // Step 3: Test Storybook build (only if setup is ok)
  let buildResults = {
    buildSuccess: false,
    errors: ["Skipped due to setup issues"],
  };
  if (setupResults.configExists && setupResults.dependenciesOk) {
    buildResults = testStorybookBuild();
  } else {
    logWarning("Skipping build test due to setup issues");
  }

  // Step 4: Test dev server (only if build succeeded)
  let devResults = { devWorks: false };
  if (buildResults.buildSuccess) {
    devResults = testStorybookDev();
  } else {
    logWarning("Skipping dev server test due to build issues");
  }

  // Step 5: Generate comprehensive report
  const report = generateStorybookReport(
    setupResults,
    storyResults,
    buildResults,
    devResults,
  );

  // Exit with appropriate code
  process.exit(report.overallSuccess ? 0 : 1);
}

// Run the analysis
main();
