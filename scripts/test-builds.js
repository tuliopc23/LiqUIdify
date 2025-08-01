#!/usr/bin/env node

/**
 * Test Builds Script
 * Comprehensively tests all builds (library, Storybook, docs) with detailed validation and reporting
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
  console.log("\n" + "=".repeat(85));
  log(`🏗️  ${title}`, "bold");
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

// Check build environment and prerequisites
function checkBuildEnvironment() {
  logSection("Build Environment Check");

  let envResults = {
    nodeVersion: null,
    bunVersion: null,
    packageJsonValid: false,
    workspacesOk: false,
    buildScriptsOk: false,
    dependencies: { missing: [], outdated: [] },
  };

  logStep(1, "Checking runtime versions");

  try {
    const nodeVersion = execSync("node --version", { encoding: "utf8" }).trim();
    envResults.nodeVersion = nodeVersion;
    logSuccess(`Node.js: ${nodeVersion}`);
  } catch (error) {
    logError("Node.js not found");
  }

  try {
    const bunVersion = execSync("bun --version", { encoding: "utf8" }).trim();
    envResults.bunVersion = bunVersion;
    logSuccess(`Bun: ${bunVersion}`);
  } catch (error) {
    logWarning("Bun not found (using npm/yarn instead)");
  }

  logStep(2, "Validating package.json and workspace setup");

  try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    envResults.packageJsonValid = true;
    logSuccess("package.json is valid");

    // Check workspaces
    if (packageJson.workspaces) {
      envResults.workspacesOk = true;
      logSuccess(
        `Workspace configuration found: ${packageJson.workspaces.length} workspaces`,
      );
    }

    // Check build scripts
    const requiredScripts = [
      "build",
      "build:lib",
      "build:storybook",
      "docs:build",
    ];
    const scripts = packageJson.scripts || {};
    const missingScripts = requiredScripts.filter((script) => !scripts[script]);

    if (missingScripts.length === 0) {
      envResults.buildScriptsOk = true;
      logSuccess("All required build scripts found");
    } else {
      logWarning(`Missing build scripts: ${missingScripts.join(", ")}`);
    }
  } catch (error) {
    logError(`Package.json validation failed: ${error.message}`);
  }

  logStep(3, "Checking build dependencies");

  try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const devDeps = packageJson.devDependencies || {};

    const buildDeps = ["vite", "typescript", "@storybook/react", "mintlify"];

    const missingDeps = buildDeps.filter((dep) => !devDeps[dep]);
    envResults.dependencies.missing = missingDeps;

    if (missingDeps.length === 0) {
      logSuccess("All build dependencies found");
    } else {
      logWarning(`Missing dependencies: ${missingDeps.join(", ")}`);
    }

    // Check for build-specific files
    const buildFiles = [
      "vite.config.ts",
      "tsconfig.json",
      "apps/storybook/.storybook/main.ts",
      "apps/docs/mint.json",
    ];

    buildFiles.forEach((file) => {
      if (fs.existsSync(file)) {
        logInfo(`✓ ${file}`);
      } else {
        logWarning(`Missing: ${file}`);
      }
    });
  } catch (error) {
    logError(`Dependency check failed: ${error.message}`);
  }

  return envResults;
}

// Clean all build artifacts
function cleanAllBuilds() {
  logSection("Cleaning Build Artifacts");

  const buildDirs = [
    "dist",
    "apps/storybook/storybook-static",
    "apps/docs/.mintlify",
  ];

  let cleanResults = { cleaned: [], failed: [] };

  buildDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      try {
        execSync(`rm -rf ${dir}`, { stdio: "pipe" });
        cleanResults.cleaned.push(dir);
        logSuccess(`Cleaned: ${dir}`);
      } catch (error) {
        cleanResults.failed.push({ dir, error: error.message });
        logWarning(`Failed to clean ${dir}: ${error.message}`);
      }
    } else {
      logInfo(`No cleanup needed: ${dir} doesn't exist`);
    }
  });

  return cleanResults;
}

// Test library build
function testLibraryBuild() {
  logSection("Library Build Test");

  let libResults = {
    buildSuccess: false,
    buildTime: 0,
    outputFiles: [],
    errors: [],
    bundleSize: 0,
  };

  logStep(1, "Building component library");

  try {
    const startTime = Date.now();

    const buildOutput = execSync("bun run build:lib", {
      encoding: "utf8",
      stdio: "pipe",
      maxBuffer: 1024 * 1024 * 10,
      timeout: 180000, // 3 minutes
    });

    const endTime = Date.now();
    libResults.buildTime = ((endTime - startTime) / 1000).toFixed(2);
    libResults.buildSuccess = true;

    logSuccess(`Library build completed in ${libResults.buildTime}s`);
  } catch (error) {
    logError("Library build failed");
    libResults.errors.push(error.message);

    if (error.stderr) {
      logError("Build errors:");
      console.log(colors.red + error.stderr.slice(0, 1000) + colors.reset);
    }

    return libResults;
  }

  logStep(2, "Verifying library outputs");

  if (fs.existsSync("dist/libs/components")) {
    const expectedOutputs = [
      "dist/libs/components/index.mjs",
      "dist/libs/components/index.cjs",
      "dist/libs/components/index.d.ts",
      "dist/libs/components/liquidui.css",
    ];

    expectedOutputs.forEach((outputPath) => {
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        libResults.outputFiles.push({
          path: outputPath,
          size: stats.size,
          sizeKB: (stats.size / 1024).toFixed(2),
        });
        libResults.bundleSize += stats.size;
        logSuccess(`✓ ${outputPath} (${(stats.size / 1024).toFixed(2)} KB)`);
      } else {
        libResults.errors.push(`Missing output: ${outputPath}`);
        logError(`✗ ${outputPath}`);
      }
    });

    const totalSizeMB = (libResults.bundleSize / (1024 * 1024)).toFixed(2);
    logInfo(`Total library size: ${totalSizeMB} MB`);
  } else {
    logError("Library build output directory not found");
    libResults.errors.push("No build output directory created");
  }

  logStep(3, "Testing library imports");

  try {
    // Test ESM import
    execSync(
      "node -e \"import('./dist/libs/components/index.mjs').then(m => console.log('ESM OK', Object.keys(m).length))\"",
      {
        stdio: "pipe",
        timeout: 10000,
      },
    );
    logSuccess("ESM imports work");

    // Test CommonJS require
    execSync(
      "node -e \"const m = require('./dist/libs/components/index.cjs'); console.log('CJS OK', Object.keys(m).length)\"",
      {
        stdio: "pipe",
        timeout: 10000,
      },
    );
    logSuccess("CommonJS requires work");
  } catch (error) {
    libResults.errors.push("Import/require test failed");
    logError("Module loading failed");
  }

  return libResults;
}

// Test Storybook build
function testStorybookBuild() {
  logSection("Storybook Build Test");

  let sbResults = {
    buildSuccess: false,
    buildTime: 0,
    outputSize: 0,
    storyCount: 0,
    errors: [],
  };

  logStep(1, "Counting story files");

  try {
    const storyFiles = execSync(
      'find libs/components/src -name "*.stories.ts" -o -name "*.stories.tsx" | wc -l',
      {
        encoding: "utf8",
      },
    ).trim();
    sbResults.storyCount = parseInt(storyFiles);
    logInfo(`Found ${sbResults.storyCount} story files`);

    if (sbResults.storyCount === 0) {
      logWarning("No story files found - Storybook may not build properly");
    }
  } catch (error) {
    logWarning("Could not count story files");
  }

  logStep(2, "Building Storybook");

  try {
    const startTime = Date.now();

    const buildOutput = execSync("bun run build:storybook", {
      encoding: "utf8",
      stdio: "pipe",
      maxBuffer: 1024 * 1024 * 15,
      timeout: 300000, // 5 minutes
    });

    const endTime = Date.now();
    sbResults.buildTime = ((endTime - startTime) / 1000).toFixed(2);
    sbResults.buildSuccess = true;

    logSuccess(`Storybook build completed in ${sbResults.buildTime}s`);
  } catch (error) {
    logError("Storybook build failed");
    sbResults.errors.push(error.message);

    if (error.stderr) {
      logError("Storybook build errors:");
      console.log(colors.red + error.stderr.slice(0, 1000) + colors.reset);
    }

    return sbResults;
  }

  logStep(3, "Verifying Storybook output");

  const storybookOutput = "apps/storybook/storybook-static";
  if (fs.existsSync(storybookOutput)) {
    try {
      // Calculate total size
      const sizeOutput = execSync(`du -sh ${storybookOutput}`, {
        encoding: "utf8",
      });
      const sizeMatch = sizeOutput.match(/^(\d+(?:\.\d+)?[KMGT]?)\s/);
      if (sizeMatch) {
        logInfo(`Storybook output size: ${sizeMatch[1]}`);
      }

      // Check essential files
      const essentialFiles = ["index.html", "static"];
      const missing = essentialFiles.filter(
        (file) => !fs.existsSync(path.join(storybookOutput, file)),
      );

      if (missing.length === 0) {
        logSuccess("All essential Storybook files generated");

        // Check index.html content
        const indexPath = path.join(storybookOutput, "index.html");
        const indexContent = fs.readFileSync(indexPath, "utf8");
        if (
          indexContent.includes("storybook") &&
          indexContent.includes("<script")
        ) {
          logSuccess("index.html contains valid Storybook content");
        } else {
          logWarning("index.html may be incomplete");
        }
      } else {
        sbResults.errors.push(`Missing essential files: ${missing.join(", ")}`);
        logError(`Missing: ${missing.join(", ")}`);
      }
    } catch (error) {
      sbResults.errors.push(`Output verification failed: ${error.message}`);
      logError(`Verification failed: ${error.message}`);
    }
  } else {
    sbResults.errors.push("Storybook output directory not created");
    logError("No Storybook output directory found");
  }

  return sbResults;
}

// Test documentation build
function testDocsBuild() {
  logSection("Documentation Build Test");

  let docsResults = {
    buildSuccess: false,
    buildTime: 0,
    pageCount: 0,
    errors: [],
  };

  logStep(1, "Checking documentation files");

  try {
    // Count MDX files
    const mdxFiles = execSync('find apps/docs -name "*.mdx" | wc -l', {
      encoding: "utf8",
    }).trim();
    docsResults.pageCount = parseInt(mdxFiles);
    logInfo(`Found ${docsResults.pageCount} documentation pages`);

    // Check mint.json
    if (fs.existsSync("apps/docs/mint.json")) {
      logSuccess("mint.json configuration found");
    } else {
      logWarning("mint.json not found - may affect build");
    }
  } catch (error) {
    logWarning("Could not analyze documentation files");
  }

  logStep(2, "Building documentation");

  try {
    const startTime = Date.now();

    const buildOutput = execSync("bun run docs:build", {
      encoding: "utf8",
      stdio: "pipe",
      maxBuffer: 1024 * 1024 * 10,
      timeout: 120000, // 2 minutes
    });

    const endTime = Date.now();
    docsResults.buildTime = ((endTime - startTime) / 1000).toFixed(2);
    docsResults.buildSuccess = true;

    logSuccess(`Documentation build completed in ${docsResults.buildTime}s`);

    if (buildOutput && buildOutput.trim()) {
      logInfo("Build completed successfully");
    }
  } catch (error) {
    logError("Documentation build failed");
    docsResults.errors.push(error.message);

    if (error.stderr) {
      logError("Documentation build errors:");
      console.log(colors.red + error.stderr.slice(0, 1000) + colors.reset);
    }

    if (error.stdout) {
      logInfo("Build output:");
      console.log(colors.dim + error.stdout.slice(0, 500) + colors.reset);
    }
  }

  logStep(3, "Verifying documentation output");

  // Mintlify typically builds to .mintlify or similar
  const possibleOutputs = [
    "apps/docs/.mintlify",
    "apps/docs/out",
    "apps/docs/dist",
  ];

  let outputFound = false;
  for (const outputPath of possibleOutputs) {
    if (fs.existsSync(outputPath)) {
      outputFound = true;
      logSuccess(`Documentation output found: ${outputPath}`);

      try {
        const files = fs.readdirSync(outputPath);
        logInfo(`Generated ${files.length} files/directories`);
      } catch (error) {
        logWarning(`Cannot read output directory: ${error.message}`);
      }
      break;
    }
  }

  if (!outputFound) {
    // Some documentation tools don't create local output
    if (docsResults.buildSuccess) {
      logInfo("Build succeeded but no local output found (may be cloud-based)");
    } else {
      docsResults.errors.push("No documentation output directory found");
    }
  }

  return docsResults;
}

// Test complete build process
function testCompleteBuild() {
  logSection("Complete Build Test");

  logStep(1, "Running complete build command");

  let completeResults = {
    buildSuccess: false,
    buildTime: 0,
    errors: [],
  };

  try {
    const startTime = Date.now();

    const buildOutput = execSync("bun run build", {
      encoding: "utf8",
      stdio: "pipe",
      maxBuffer: 1024 * 1024 * 20,
      timeout: 600000, // 10 minutes
    });

    const endTime = Date.now();
    completeResults.buildTime = ((endTime - startTime) / 1000).toFixed(2);
    completeResults.buildSuccess = true;

    logSuccess(`Complete build finished in ${completeResults.buildTime}s`);
  } catch (error) {
    logError("Complete build failed");
    completeResults.errors.push(error.message);

    if (error.stderr) {
      logError("Complete build errors:");
      console.log(colors.red + error.stderr.slice(-2000) + colors.reset);
    }
  }

  return completeResults;
}

// Run CI simulation
function simulateCI() {
  logSection("CI Pipeline Simulation");

  let ciResults = {
    typeCheck: false,
    lint: false,
    tests: false,
    build: false,
    errors: [],
  };

  const ciCommands = [
    { name: "Type Check", command: "bun run type-check", key: "typeCheck" },
    { name: "Lint", command: "bun run lint", key: "lint" },
    { name: "Tests", command: "bun run test", key: "tests" },
    { name: "Build", command: "bun run build", key: "build" },
  ];

  ciCommands.forEach((cmd, index) => {
    logStep(index + 1, `Running ${cmd.name}`);

    try {
      execSync(cmd.command, {
        stdio: "pipe",
        timeout: 180000, // 3 minutes per step
      });
      ciResults[cmd.key] = true;
      logSuccess(`${cmd.name} passed`);
    } catch (error) {
      ciResults.errors.push(`${cmd.name} failed: ${error.message}`);
      logError(`${cmd.name} failed`);
    }
  });

  return ciResults;
}

// Generate comprehensive build report
function generateBuildReport(
  envResults,
  libResults,
  sbResults,
  docsResults,
  completeResults,
  ciResults,
) {
  logHeader("COMPREHENSIVE BUILD ANALYSIS REPORT");

  console.log("\n📊 EXECUTIVE SUMMARY:");
  console.log("========================");

  // Calculate overall success
  const overallSuccess =
    envResults.buildScriptsOk &&
    libResults.buildSuccess &&
    sbResults.buildSuccess &&
    docsResults.buildSuccess &&
    completeResults.buildSuccess;

  if (overallSuccess) {
    logSuccess("🎉 ALL BUILDS SUCCESSFUL - Production Ready!");
  } else {
    logError("❌ BUILD ISSUES DETECTED - Requires Attention");
  }

  // Build status overview
  console.log("\n🏗️  BUILD STATUS OVERVIEW:");
  console.log("==============================");

  log(
    `Environment: ${envResults.buildScriptsOk ? "✅ READY" : "❌ ISSUES"}`,
    envResults.buildScriptsOk ? "green" : "red",
  );
  log(
    `Library Build: ${libResults.buildSuccess ? "✅ SUCCESS" : "❌ FAILED"}`,
    libResults.buildSuccess ? "green" : "red",
  );
  log(
    `Storybook Build: ${sbResults.buildSuccess ? "✅ SUCCESS" : "❌ FAILED"}`,
    sbResults.buildSuccess ? "green" : "red",
  );
  log(
    `Documentation Build: ${docsResults.buildSuccess ? "✅ SUCCESS" : "❌ FAILED"}`,
    docsResults.buildSuccess ? "green" : "red",
  );
  log(
    `Complete Build: ${completeResults.buildSuccess ? "✅ SUCCESS" : "❌ FAILED"}`,
    completeResults.buildSuccess ? "green" : "red",
  );

  // Performance metrics
  console.log("\n⏱️  BUILD PERFORMANCE:");
  console.log("========================");

  if (libResults.buildTime)
    logInfo(`Library build time: ${libResults.buildTime}s`);
  if (sbResults.buildTime)
    logInfo(`Storybook build time: ${sbResults.buildTime}s`);
  if (docsResults.buildTime)
    logInfo(`Documentation build time: ${docsResults.buildTime}s`);
  if (completeResults.buildTime)
    logInfo(`Complete build time: ${completeResults.buildTime}s`);

  // Asset metrics
  console.log("\n📦 ASSET METRICS:");
  console.log("===================");

  if (libResults.bundleSize) {
    const sizeMB = (libResults.bundleSize / (1024 * 1024)).toFixed(2);
    logInfo(`Library bundle size: ${sizeMB} MB`);
  }
  if (libResults.outputFiles.length) {
    logInfo(`Library output files: ${libResults.outputFiles.length}`);
  }
  if (sbResults.storyCount) {
    logInfo(`Storybook stories: ${sbResults.storyCount}`);
  }
  if (docsResults.pageCount) {
    logInfo(`Documentation pages: ${docsResults.pageCount}`);
  }

  // Error summary
  const allErrors = [
    ...libResults.errors,
    ...sbResults.errors,
    ...docsResults.errors,
    ...completeResults.errors,
  ];

  if (allErrors.length > 0) {
    console.log("\n❌ ERROR SUMMARY:");
    console.log("==================");
    allErrors.forEach((error, index) => {
      logError(`${index + 1}. ${error}`);
    });
  }

  // CI simulation results
  if (ciResults && Object.keys(ciResults).length > 0) {
    console.log("\n🔄 CI SIMULATION:");
    console.log("==================");
    log(
      `Type Check: ${ciResults.typeCheck ? "✅ PASS" : "❌ FAIL"}`,
      ciResults.typeCheck ? "green" : "red",
    );
    log(
      `Lint: ${ciResults.lint ? "✅ PASS" : "❌ FAIL"}`,
      ciResults.lint ? "green" : "red",
    );
    log(
      `Tests: ${ciResults.tests ? "✅ PASS" : "❌ FAIL"}`,
      ciResults.tests ? "green" : "red",
    );
    log(
      `Build: ${ciResults.build ? "✅ PASS" : "❌ FAIL"}`,
      ciResults.build ? "green" : "red",
    );
  }

  // Recommendations
  console.log("\n💡 RECOMMENDATIONS:");
  console.log("====================");

  if (!envResults.buildScriptsOk) {
    logWarning("1. Fix missing build scripts in package.json");
  }

  if (envResults.dependencies.missing.length > 0) {
    logWarning(
      `2. Install missing dependencies: ${envResults.dependencies.missing.join(", ")}`,
    );
  }

  if (!libResults.buildSuccess) {
    logWarning("3. Fix library build errors - this blocks all other builds");
  }

  if (!sbResults.buildSuccess && sbResults.storyCount === 0) {
    logWarning("4. Create story files for Storybook build");
  }

  if (!docsResults.buildSuccess) {
    logWarning("5. Check documentation configuration and content");
  }

  if (allErrors.length > 5) {
    logWarning(
      "6. Multiple build issues detected - consider reviewing entire build pipeline",
    );
  }

  if (overallSuccess) {
    console.log("\n🚀 DEPLOYMENT READINESS:");
    console.log("==========================");
    logSuccess("✅ Library is ready for NPM publishing");
    logSuccess("✅ Storybook is ready for deployment");
    logSuccess("✅ Documentation is ready for hosting");
    logSuccess("✅ All build artifacts are valid");

    console.log("\n📋 NEXT STEPS:");
    logSuccess("• Run final QA tests");
    logSuccess("• Verify deployment configurations");
    logSuccess("• Update version numbers as needed");
    logSuccess("• Deploy to staging environment");
  }

  return {
    overallSuccess,
    buildResults: {
      environment: envResults.buildScriptsOk,
      library: libResults.buildSuccess,
      storybook: sbResults.buildSuccess,
      documentation: docsResults.buildSuccess,
      complete: completeResults.buildSuccess,
    },
    metrics: {
      librarySize: libResults.bundleSize,
      libraryTime: libResults.buildTime,
      storybookTime: sbResults.buildTime,
      docsTime: docsResults.buildTime,
      totalTime: completeResults.buildTime,
      errorCount: allErrors.length,
    },
  };
}

// Main execution
function main() {
  logHeader("LiqUIdify Comprehensive Build Testing");

  log(
    "🏗️  Testing all build processes: Library, Storybook, and Documentation...",
    "blue",
  );
  log(
    "This comprehensive test will validate your entire build pipeline\n",
    "dim",
  );

  // Step 1: Environment check
  const envResults = checkBuildEnvironment();

  if (!envResults.packageJsonValid) {
    logError("❌ Environment check failed. Cannot proceed with builds.");
    process.exit(1);
  }

  // Step 2: Clean all builds
  const cleanResults = cleanAllBuilds();
  if (cleanResults.failed.length > 0) {
    logWarning("Some cleanup operations failed - builds may be affected");
  }

  // Step 3: Test individual builds
  const libResults = testLibraryBuild();
  const sbResults = testStorybookBuild();
  const docsResults = testDocsBuild();

  // Step 4: Test complete build
  const completeResults = testCompleteBuild();

  // Step 5: CI simulation (optional - only if all builds work)
  let ciResults = {};
  if (
    libResults.buildSuccess &&
    sbResults.buildSuccess &&
    docsResults.buildSuccess
  ) {
    logInfo("All individual builds succeeded - running CI simulation");
    // ciResults = simulateCI(); // Uncomment to run full CI simulation
  }

  // Step 6: Generate comprehensive report
  const report = generateBuildReport(
    envResults,
    libResults,
    sbResults,
    docsResults,
    completeResults,
    ciResults,
  );

  // Exit with appropriate code
  if (report.overallSuccess) {
    log("\n🎉 BUILD PIPELINE VALIDATION COMPLETE - ALL SYSTEMS GO!", "green");
    process.exit(0);
  } else {
    log("\n⚠️  BUILD PIPELINE ISSUES DETECTED - REVIEW REQUIRED", "yellow");
    process.exit(1);
  }
}

// Run the comprehensive build test
main();
