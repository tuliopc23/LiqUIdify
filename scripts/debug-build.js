#!/usr/bin/env node

/**
 * Debug Build Script
 * Systematically tests library build with detailed error reporting and file existence verification
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

// Check if required files exist before build
function checkPreBuildRequirements() {
  logSection("Pre-Build Requirements Check");

  const requiredFiles = [
    "vite.config.ts",
    "tsconfig.json",
    "libs/components/tsconfig.lib.json",
    "libs/components/src/index.ts",
    "package.json",
  ];

  const requiredDirs = [
    "libs/components/src",
    "libs/components/src/components",
    "libs/components/src/bundles",
  ];

  let allRequirementsOk = true;

  logStep(1, "Checking required files");
  requiredFiles.forEach((file) => {
    if (fs.existsSync(file)) {
      logSuccess(`Found: ${file}`);
    } else {
      logError(`Missing: ${file}`);
      allRequirementsOk = false;
    }
  });

  logStep(2, "Checking required directories");
  requiredDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      logSuccess(`Found: ${dir}`);
      // Count files in directory
      try {
        const files = fs.readdirSync(dir);
        logInfo(`  Contains ${files.length} items`);
      } catch (error) {
        logWarning(`  Cannot read directory contents: ${error.message}`);
      }
    } else {
      logError(`Missing: ${dir}`);
      allRequirementsOk = false;
    }
  });

  logStep(3, "Checking TypeScript configuration");
  try {
    const tsConfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
    logSuccess("TypeScript config is valid JSON");

    if (tsConfig.compilerOptions) {
      logInfo(
        `  Target: ${tsConfig.compilerOptions.target || "not specified"}`,
      );
      logInfo(
        `  Module: ${tsConfig.compilerOptions.module || "not specified"}`,
      );
    }
  } catch (error) {
    logError(`Invalid TypeScript config: ${error.message}`);
    allRequirementsOk = false;
  }

  logStep(4, "Checking package.json exports");
  try {
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    if (packageJson.exports) {
      const exportCount = Object.keys(packageJson.exports).length;
      logSuccess(`Package has ${exportCount} export entries`);

      // Check main exports
      const mainExports = packageJson.exports["."];
      if (mainExports) {
        logInfo(`  Main import: ${mainExports.import || "not specified"}`);
        logInfo(`  Main require: ${mainExports.require || "not specified"}`);
        logInfo(`  Main types: ${mainExports.types || "not specified"}`);
      }
    } else {
      logWarning("No exports field in package.json");
    }
  } catch (error) {
    logError(`Error reading package.json: ${error.message}`);
    allRequirementsOk = false;
  }

  return allRequirementsOk;
}

// Clean previous build artifacts
function cleanBuildArtifacts() {
  logSection("Cleaning Previous Build Artifacts");

  const buildDirs = ["dist", "dist/libs/components"];

  buildDirs.forEach((dir) => {
    if (fs.existsSync(dir)) {
      try {
        execSync(`rm -rf ${dir}`, { stdio: "pipe" });
        logSuccess(`Cleaned: ${dir}`);
      } catch (error) {
        logWarning(`Failed to clean ${dir}: ${error.message}`);
      }
    } else {
      logInfo(`No cleanup needed: ${dir} doesn't exist`);
    }
  });
}

// Run the actual build and capture output
function runBuild() {
  logSection("Running Library Build");

  logStep(1, "Building library with Vite");

  try {
    const startTime = Date.now();

    // Run the build command
    const output = execSync("bun run build:lib", {
      encoding: "utf8",
      stdio: "pipe",
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer
    });

    const endTime = Date.now();
    const buildTime = ((endTime - startTime) / 1000).toFixed(2);

    logSuccess(`Build completed in ${buildTime}s`);

    // Show build output if available
    if (output && output.trim()) {
      logInfo("Build output:");
      console.log(colors.dim + output.trim() + colors.reset);
    }

    return { success: true, output, buildTime };
  } catch (error) {
    logError("Build failed");

    if (error.stdout) {
      logInfo("Build stdout:");
      console.log(colors.dim + error.stdout + colors.reset);
    }

    if (error.stderr) {
      logError("Build stderr:");
      console.log(colors.red + error.stderr + colors.reset);
    }

    return {
      success: false,
      error: error.message,
      stdout: error.stdout,
      stderr: error.stderr,
    };
  }
}

// Verify build outputs exist and are valid
function verifyBuildOutputs() {
  logSection("Verifying Build Outputs");

  const expectedOutputs = [
    // Main exports
    "dist/libs/components/index.mjs",
    "dist/libs/components/index.cjs",
    "dist/libs/components/index.d.ts",
    "dist/libs/components/liquidui.css",

    // Bundle exports
    "dist/libs/components/core.mjs",
    "dist/libs/components/forms.mjs",
    "dist/libs/components/navigation.mjs",

    // Component exports
    "dist/libs/components/components/button.mjs",
    "dist/libs/components/components/card.mjs",
    "dist/libs/components/components/input.mjs",

    // CJS versions
    "dist/libs/components/cjs/core.cjs",
    "dist/libs/components/cjs/forms.cjs",
  ];

  let verificationResults = {
    existing: [],
    missing: [],
    invalid: [],
    totalSize: 0,
  };

  logStep(1, "Checking expected output files");

  expectedOutputs.forEach((outputPath) => {
    if (fs.existsSync(outputPath)) {
      try {
        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        verificationResults.existing.push({
          path: outputPath,
          size: stats.size,
          sizeKB: sizeKB,
        });
        verificationResults.totalSize += stats.size;
        logSuccess(`Found: ${outputPath} (${sizeKB} KB)`);
      } catch (error) {
        verificationResults.invalid.push(outputPath);
        logWarning(`File exists but cannot read stats: ${outputPath}`);
      }
    } else {
      verificationResults.missing.push(outputPath);
      logError(`Missing: ${outputPath}`);
    }
  });

  logStep(2, "Validating file contents");

  // Check main index files
  const mainFiles = verificationResults.existing.filter(
    (f) => f.path.includes("index.") || f.path.includes("core."),
  );

  mainFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(file.path, "utf8");

      if (file.path.endsWith(".d.ts")) {
        // Check TypeScript declarations
        if (content.includes("export") && content.includes("declare")) {
          logSuccess(`Valid TypeScript declarations: ${file.path}`);
        } else {
          logWarning(
            `Potentially invalid TypeScript declarations: ${file.path}`,
          );
        }
      } else if (file.path.endsWith(".mjs") || file.path.endsWith(".cjs")) {
        // Check JavaScript exports
        if (content.includes("export") || content.includes("module.exports")) {
          logSuccess(`Valid JavaScript exports: ${file.path}`);
        } else {
          logWarning(`No exports found in: ${file.path}`);
        }
      } else if (file.path.endsWith(".css")) {
        // Check CSS content
        if (content.includes(".glass") || content.includes("--")) {
          logSuccess(`Valid CSS content: ${file.path}`);
        } else {
          logWarning(`No glass styles found in: ${file.path}`);
        }
      }
    } catch (error) {
      logError(`Cannot read file content: ${file.path} - ${error.message}`);
      verificationResults.invalid.push(file.path);
    }
  });

  logStep(3, "Build size analysis");
  const totalSizeMB = (verificationResults.totalSize / (1024 * 1024)).toFixed(
    2,
  );
  logInfo(`Total build size: ${totalSizeMB} MB`);

  // Size warnings
  const largeBundles = verificationResults.existing.filter(
    (f) => f.size > 500 * 1024,
  ); // > 500KB
  if (largeBundles.length > 0) {
    logWarning("Large bundle files detected:");
    largeBundles.forEach((bundle) => {
      logWarning(`  ${bundle.path}: ${bundle.sizeKB} KB`);
    });
  }

  return verificationResults;
}

// Test import/require functionality
function testImports() {
  logSection("Testing Import/Require Functionality");

  const importTests = [
    {
      name: "ESM Import Test",
      command:
        "node -e \"import('./dist/libs/components/index.mjs').then(m => console.log('ESM import successful', Object.keys(m).length, 'exports'))\"",
      type: "esm",
    },
    {
      name: "CommonJS Require Test",
      command:
        "node -e \"const m = require('./dist/libs/components/index.cjs'); console.log('CJS require successful', Object.keys(m).length, 'exports')\"",
      type: "cjs",
    },
  ];

  let testResults = [];

  importTests.forEach((test, index) => {
    logStep(index + 1, test.name);

    try {
      const output = execSync(test.command, {
        encoding: "utf8",
        stdio: "pipe",
        timeout: 5000,
      });

      logSuccess(`${test.type.toUpperCase()} import works`);
      if (output.trim()) {
        logInfo(`Output: ${output.trim()}`);
      }

      testResults.push({
        name: test.name,
        success: true,
        output: output.trim(),
      });
    } catch (error) {
      logError(`${test.type.toUpperCase()} import failed`);
      if (error.stdout) {
        logInfo(`stdout: ${error.stdout}`);
      }
      if (error.stderr) {
        logError(`stderr: ${error.stderr}`);
      }

      testResults.push({
        name: test.name,
        success: false,
        error: error.message,
        stderr: error.stderr,
      });
    }
  });

  return testResults;
}

// Generate comprehensive build report
function generateBuildReport(preCheck, buildResult, verification, importTests) {
  logHeader("BUILD ANALYSIS REPORT");

  console.log("\n📊 SUMMARY:");
  console.log("==============");

  // Overall status
  const overallSuccess =
    preCheck &&
    buildResult.success &&
    verification.missing.length === 0 &&
    verification.invalid.length === 0 &&
    importTests.every((t) => t.success);

  if (overallSuccess) {
    logSuccess("🎉 BUILD SUCCESSFUL - All checks passed!");
  } else {
    logError("❌ BUILD ISSUES DETECTED");
  }

  // Detailed results
  console.log("\n📈 Results Breakdown:");
  console.log("========================");

  log(
    `Pre-build checks: ${preCheck ? "✅ PASS" : "❌ FAIL"}`,
    preCheck ? "green" : "red",
  );
  log(
    `Build execution: ${buildResult.success ? "✅ PASS" : "❌ FAIL"}`,
    buildResult.success ? "green" : "red",
  );
  log(
    `Output verification: ${verification.missing.length === 0 ? "✅ PASS" : "❌ FAIL"}`,
    verification.missing.length === 0 ? "green" : "red",
  );
  log(
    `Import tests: ${importTests.every((t) => t.success) ? "✅ PASS" : "❌ FAIL"}`,
    importTests.every((t) => t.success) ? "green" : "red",
  );

  if (buildResult.buildTime) {
    logInfo(`Build time: ${buildResult.buildTime}s`);
  }

  logInfo(`Files created: ${verification.existing.length}`);
  logInfo(`Files missing: ${verification.missing.length}`);
  logInfo(`Invalid files: ${verification.invalid.length}`);

  // Missing files
  if (verification.missing.length > 0) {
    console.log("\n❌ MISSING FILES:");
    console.log("==================");
    verification.missing.forEach((file) => {
      logError(`• ${file}`);
    });
  }

  // Invalid files
  if (verification.invalid.length > 0) {
    console.log("\n⚠️  INVALID FILES:");
    console.log("===================");
    verification.invalid.forEach((file) => {
      logWarning(`• ${file}`);
    });
  }

  // Failed import tests
  const failedImports = importTests.filter((t) => !t.success);
  if (failedImports.length > 0) {
    console.log("\n❌ FAILED IMPORT TESTS:");
    console.log("========================");
    failedImports.forEach((test) => {
      logError(`• ${test.name}: ${test.error}`);
    });
  }

  // Recommendations
  console.log("\n💡 RECOMMENDATIONS:");
  console.log("====================");

  if (!preCheck) {
    logWarning("1. Fix pre-build requirement issues before building");
  }

  if (!buildResult.success) {
    logWarning("2. Review build configuration and resolve compilation errors");
  }

  if (verification.missing.length > 0) {
    logWarning(
      "3. Check build configuration to ensure all expected outputs are generated",
    );
  }

  if (failedImports.length > 0) {
    logWarning("4. Fix import/export issues in built modules");
  }

  if (verification.existing.length === 0) {
    logWarning("5. Build produced no output files - check build configuration");
  }

  if (overallSuccess) {
    console.log("\n🚀 Next steps:");
    logSuccess("• Library build is ready for testing");
    logSuccess("• Run integration tests to verify functionality");
    logSuccess("• Test with actual React applications");
  }

  return {
    overallSuccess,
    preCheck,
    buildSuccess: buildResult.success,
    outputsValid:
      verification.missing.length === 0 && verification.invalid.length === 0,
    importsWork: importTests.every((t) => t.success),
    summary: {
      filesCreated: verification.existing.length,
      filesMissing: verification.missing.length,
      filesInvalid: verification.invalid.length,
      buildTime: buildResult.buildTime,
    },
  };
}

// Main execution
function main() {
  logHeader("LiqUIdify Library Build Debug");

  log("🔍 Running comprehensive build analysis...", "blue");
  log(
    "This will test the library build process and verify all outputs\n",
    "dim",
  );

  // Step 1: Pre-build checks
  const preCheckResult = checkPreBuildRequirements();

  if (!preCheckResult) {
    logError(
      "\n❌ Pre-build checks failed. Please fix the issues above before building.",
    );
    process.exit(1);
  }

  // Step 2: Clean previous builds
  cleanBuildArtifacts();

  // Step 3: Run build
  const buildResult = runBuild();

  // Step 4: Verify outputs (even if build failed, to see what was created)
  const verificationResult = verifyBuildOutputs();

  // Step 5: Test imports (only if build succeeded)
  let importTestResults = [];
  if (buildResult.success) {
    importTestResults = testImports();
  } else {
    logWarning("Skipping import tests due to build failure");
  }

  // Step 6: Generate report
  const report = generateBuildReport(
    preCheckResult,
    buildResult,
    verificationResult,
    importTestResults,
  );

  // Exit with appropriate code
  process.exit(report.overallSuccess ? 0 : 1);
}

// Run the debug script
main();
