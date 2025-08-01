#!/usr/bin/env node

/**
 * Test Builds Script
 * Validates all three build systems work correctly after fixes
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
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  console.log("\n" + "=".repeat(60));
  log(title, "bold");
  console.log("=".repeat(60));
}

function logSection(title) {
  console.log("\n" + "-".repeat(40));
  log(title, "cyan");
  console.log("-".repeat(40));
}

function formatSize(bytes) {
  const sizes = ["B", "KB", "MB", "GB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}

function runBuildCommand(command, description, outputDir) {
  log(`\nRunning: ${command}`, "blue");
  const startTime = Date.now();

  try {
    const output = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
      timeout: 300000, // 5 minutes timeout
    });

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    log(`✅ ${description} - SUCCESS (${duration}s)`, "green");

    // Verify output files exist
    const outputExists = fs.existsSync(outputDir);
    if (outputExists) {
      const stats = fs.statSync(outputDir);
      const size = stats.isDirectory() ? getDirSize(outputDir) : stats.size;
      log(`📦 Output: ${outputDir} (${formatSize(size)})`, "blue");
    } else {
      log(`⚠️  Output directory not found: ${outputDir}`, "yellow");
    }

    return {
      success: true,
      output,
      duration: parseFloat(duration),
      outputExists,
      outputSize: outputExists
        ? stats.isDirectory()
          ? getDirSize(outputDir)
          : stats.size
        : 0,
    };
  } catch (error) {
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    log(`❌ ${description} - FAILED (${duration}s)`, "red");
    log(`Error: ${error.message}`, "red");

    if (error.stdout) {
      log(`Stdout: ${error.stdout.substring(0, 500)}`, "yellow");
    }
    if (error.stderr) {
      log(`Stderr: ${error.stderr.substring(0, 500)}`, "red");
    }

    return {
      success: false,
      error: error.message,
      duration: parseFloat(duration),
      stdout: error.stdout,
      stderr: error.stderr,
    };
  }
}

function getDirSize(dirPath) {
  let totalSize = 0;

  function calcSize(itemPath) {
    const stats = fs.statSync(itemPath);
    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const items = fs.readdirSync(itemPath);
      items.forEach((item) => {
        calcSize(path.join(itemPath, item));
      });
    }
  }

  try {
    calcSize(dirPath);
  } catch (error) {
    log(`Error calculating directory size: ${error.message}`, "yellow");
  }

  return totalSize;
}

function verifyLibraryArtifacts() {
  logSection("Verifying Library Build Artifacts");

  const expectedFiles = [
    "dist/libs/components/liquidui.css",
    "dist/libs/components/index.js",
    "dist/libs/components/index.d.ts",
    "dist/libs/components/bundles/core.mjs",
    "dist/libs/components/bundles/forms.mjs",
    "dist/libs/components/bundles/navigation.mjs",
  ];

  const results = [];
  let totalSize = 0;

  expectedFiles.forEach((filePath) => {
    const exists = fs.existsSync(filePath);
    const status = exists ? "✅" : "❌";
    const color = exists ? "green" : "red";

    let size = 0;
    if (exists) {
      size = fs.statSync(filePath).size;
      totalSize += size;
    }

    log(
      `${status} ${filePath} ${exists ? `(${formatSize(size)})` : ""}`,
      color,
    );
    results.push({ file: filePath, exists, size });
  });

  log(`\n📊 Total library bundle size: ${formatSize(totalSize)}`, "blue");
  return { results, totalSize };
}

function verifyStorybookArtifacts() {
  logSection("Verifying Storybook Build Artifacts");

  const storybookDir = "apps/storybook/storybook-static";
  const expectedFiles = [
    "apps/storybook/storybook-static/index.html",
    "apps/storybook/storybook-static/iframe.html",
  ];

  const results = [];
  let totalSize = 0;

  if (fs.existsSync(storybookDir)) {
    totalSize = getDirSize(storybookDir);
    log(
      `✅ Storybook static directory exists (${formatSize(totalSize)})`,
      "green",
    );
  } else {
    log("❌ Storybook static directory not found", "red");
  }

  expectedFiles.forEach((filePath) => {
    const exists = fs.existsSync(filePath);
    const status = exists ? "✅" : "❌";
    const color = exists ? "green" : "red";

    log(`${status} ${path.basename(filePath)}`, color);
    results.push({ file: filePath, exists });
  });

  return { results, totalSize };
}

function verifyDocumentationArtifacts() {
  logSection("Verifying Documentation Build Artifacts");

  // Mintlify typically builds to a .mintlify or dist directory
  const possibleDirs = [
    "apps/docs/.mintlify",
    "apps/docs/dist",
    "apps/docs/_site",
    "apps/docs/build",
  ];

  let docsDir = null;
  let totalSize = 0;

  for (const dir of possibleDirs) {
    if (fs.existsSync(dir)) {
      docsDir = dir;
      totalSize = getDirSize(dir);
      log(
        `✅ Documentation built to ${dir} (${formatSize(totalSize)})`,
        "green",
      );
      break;
    }
  }

  if (!docsDir) {
    log("❌ No documentation build output found", "red");
    log(`Searched: ${possibleDirs.join(", ")}`, "yellow");
  }

  // Check for key Mintlify files
  const mintConfigExists = fs.existsSync("apps/docs/mint.json");
  const introExists = fs.existsSync("apps/docs/introduction.mdx");

  log(
    `${mintConfigExists ? "✅" : "❌"} mint.json configuration`,
    mintConfigExists ? "green" : "red",
  );
  log(
    `${introExists ? "✅" : "❌"} introduction.mdx`,
    introExists ? "green" : "red",
  );

  return {
    buildDir: docsDir,
    totalSize,
    configExists: mintConfigExists,
    introExists,
  };
}

function testLibraryBuild() {
  logSection("Testing Library Build");

  // Clean previous build
  if (fs.existsSync("dist")) {
    log("🧹 Cleaning previous build...", "blue");
    execSync("rm -rf dist", { stdio: "pipe" });
  }

  const result = runBuildCommand(
    "bun run build:lib",
    "Library Build",
    "dist/libs/components",
  );

  if (result.success) {
    const artifacts = verifyLibraryArtifacts();
    result.artifacts = artifacts;
  }

  return result;
}

function testStorybookBuild() {
  logSection("Testing Storybook Build");

  // Clean previous build
  const storybookStatic = "apps/storybook/storybook-static";
  if (fs.existsSync(storybookStatic)) {
    log("🧹 Cleaning previous Storybook build...", "blue");
    execSync(`rm -rf ${storybookStatic}`, { stdio: "pipe" });
  }

  const result = runBuildCommand(
    "bun run build:storybook",
    "Storybook Build",
    storybookStatic,
  );

  if (result.success) {
    const artifacts = verifyStorybookArtifacts();
    result.artifacts = artifacts;
  }

  return result;
}

function testDocumentationBuild() {
  logSection("Testing Documentation Build");

  const result = runBuildCommand(
    "bun run docs:build",
    "Documentation Build (Mintlify)",
    "apps/docs",
  );

  if (result.success) {
    const artifacts = verifyDocumentationArtifacts();
    result.artifacts = artifacts;
  }

  return result;
}

function testIntegratedBuild() {
  logSection("Testing Complete Build Pipeline");

  const result = runBuildCommand(
    "bun run build",
    "Complete Build Pipeline",
    "dist",
  );

  return result;
}

function generateReport(results) {
  logHeader("BUILD VALIDATION REPORT");

  const { libBuild, storybookBuild, docsBuild, integratedBuild } = results;

  console.log("\n🏗️  BUILD RESULTS:");
  console.log("==================");

  // Individual build results
  log(
    `Library Build: ${libBuild.success ? "✅ SUCCESS" : "❌ FAILED"} (${libBuild.duration}s)`,
    libBuild.success ? "green" : "red",
  );
  log(
    `Storybook Build: ${storybookBuild.success ? "✅ SUCCESS" : "❌ FAILED"} (${storybookBuild.duration}s)`,
    storybookBuild.success ? "green" : "red",
  );
  log(
    `Documentation Build: ${docsBuild.success ? "✅ SUCCESS" : "❌ FAILED"} (${docsBuild.duration}s)`,
    docsBuild.success ? "green" : "red",
  );
  log(
    `Integrated Build: ${integratedBuild.success ? "✅ SUCCESS" : "❌ FAILED"} (${integratedBuild.duration}s)`,
    integratedBuild.success ? "green" : "red",
  );

  // Performance metrics
  console.log("\n⚡ PERFORMANCE METRICS:");
  console.log("=======================");

  const totalTime =
    libBuild.duration + storybookBuild.duration + docsBuild.duration;
  log(`Total build time: ${totalTime.toFixed(2)}s`, "blue");
  log(`Average build time: ${(totalTime / 3).toFixed(2)}s`, "blue");

  if (libBuild.artifacts) {
    log(
      `Library bundle size: ${formatSize(libBuild.artifacts.totalSize)}`,
      "blue",
    );
  }

  if (storybookBuild.artifacts) {
    log(
      `Storybook size: ${formatSize(storybookBuild.artifacts.totalSize)}`,
      "blue",
    );
  }

  if (docsBuild.artifacts) {
    log(
      `Documentation size: ${formatSize(docsBuild.artifacts.totalSize)}`,
      "blue",
    );
  }

  // Success/failure analysis
  const successfulBuilds = [
    libBuild,
    storybookBuild,
    docsBuild,
    integratedBuild,
  ].filter((b) => b.success).length;
  const totalBuilds = 4;

  console.log("\n📊 SUMMARY:");
  console.log("============");
  log(
    `Successful builds: ${successfulBuilds}/${totalBuilds}`,
    successfulBuilds === totalBuilds ? "green" : "yellow",
  );

  if (successfulBuilds === totalBuilds) {
    log("\n🎉 All builds completed successfully!", "green");
    log("✅ Library artifacts generated", "green");
    log("✅ Storybook static site built", "green");
    log("✅ Documentation site ready", "green");
    log("✅ Production build pipeline working", "green");
  } else {
    log(
      "\n⚠️  Some builds failed. Check the logs above for details.",
      "yellow",
    );

    if (!libBuild.success) {
      log(
        "❌ Library build failed - check Vite configuration and component exports",
        "red",
      );
    }
    if (!storybookBuild.success) {
      log(
        "❌ Storybook build failed - check story files and configuration",
        "red",
      );
    }
    if (!docsBuild.success) {
      log(
        "❌ Documentation build failed - check Mintlify setup and MDX files",
        "red",
      );
    }
    if (!integratedBuild.success) {
      log(
        "❌ Integrated build failed - one or more sub-builds have issues",
        "red",
      );
    }
  }

  return {
    allSuccessful: successfulBuilds === totalBuilds,
    successfulBuilds,
    totalBuilds,
    totalTime,
    results,
  };
}

// Main execution
async function main() {
  logHeader("LiqUIdify Build System Validation");

  log("Testing all build systems after fixes...", "blue");

  // Test each build system individually
  const libBuild = testLibraryBuild();
  const storybookBuild = testStorybookBuild();
  const docsBuild = testDocumentationBuild();

  // Test integrated build
  const integratedBuild = testIntegratedBuild();

  // Generate comprehensive report
  const report = generateReport({
    libBuild,
    storybookBuild,
    docsBuild,
    integratedBuild,
  });

  // Exit with appropriate code
  if (report.allSuccessful) {
    log("\n🚀 All systems ready for production!", "green");
    process.exit(0);
  } else {
    log("\n💔 Build system needs attention before production.", "red");
    process.exit(1);
  }
}

// Run the validation
main().catch((error) => {
  log(`\n❌ Build validation script failed: ${error.message}`, "red");
  process.exit(1);
});
