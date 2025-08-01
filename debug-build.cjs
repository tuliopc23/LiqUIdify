#!/usr/bin/env node

/**
 * Debug Build Script
 * Systematically tests each build step and identifies specific failure points
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

function checkFileExists(filePath) {
  const exists = fs.existsSync(filePath);
  const status = exists ? "✅" : "❌";
  log(`${status} ${filePath}`, exists ? "green" : "red");
  return exists;
}

function runCommand(command, description) {
  log(`\nRunning: ${command}`, "blue");
  try {
    const output = execSync(command, {
      encoding: "utf8",
      stdio: "pipe",
      timeout: 120000, // 2 minutes timeout
    });
    log(`✅ ${description} - SUCCESS`, "green");
    return { success: true, output };
  } catch (error) {
    log(`❌ ${description} - FAILED`, "red");
    log(`Error: ${error.message}`, "red");
    if (error.stdout) {
      log(`Stdout: ${error.stdout}`, "yellow");
    }
    if (error.stderr) {
      log(`Stderr: ${error.stderr}`, "red");
    }
    return {
      success: false,
      error: error.message,
      stdout: error.stdout,
      stderr: error.stderr,
    };
  }
}

function checkBundleEntryPoints() {
  logSection("Checking Bundle Entry Points");

  const bundleDir = "libs/components/src/bundles";
  const expectedBundles = [
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

  const results = [];
  expectedBundles.forEach((bundle) => {
    const filePath = path.join(bundleDir, bundle);
    const exists = checkFileExists(filePath);
    results.push({ bundle, exists, path: filePath });
  });

  return results;
}

function checkComponentIndexFiles() {
  logSection("Checking Component Index Files");

  const componentIndexes = [
    "libs/components/src/components/glass-button-refactored/index.ts",
    "libs/components/src/components/glass-card-refactored/index.ts",
    "libs/components/src/components/glass-modal/index.ts",
    "libs/components/src/components/glass-input/index.ts",
  ];

  const results = [];
  componentIndexes.forEach((indexPath) => {
    const exists = checkFileExists(indexPath);
    results.push({ path: indexPath, exists });
  });

  return results;
}

function checkStoryFiles() {
  logSection("Checking Storybook Story Files");

  try {
    const storyPattern = "libs/components/src/**/*.stories.@(ts|tsx)";
    const command = `find libs/components/src -name "*.stories.ts" -o -name "*.stories.tsx"`;
    const output = execSync(command, { encoding: "utf8" });
    const storyFiles = output
      .trim()
      .split("\n")
      .filter((f) => f);

    log(`Found ${storyFiles.length} story files:`, "blue");
    const results = [];
    storyFiles.forEach((file) => {
      const exists = checkFileExists(file);
      results.push({ file, exists });
    });

    return results;
  } catch (error) {
    log(`Error finding story files: ${error.message}`, "red");
    return [];
  }
}

function checkDependencies() {
  logSection("Checking Dependencies");

  const packageJsonPath = "package.json";
  if (!fs.existsSync(packageJsonPath)) {
    log("❌ package.json not found", "red");
    return { success: false };
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const devDeps = packageJson.devDependencies || {};
  const deps = packageJson.dependencies || {};

  // Check for key dependencies
  const keyDeps = {
    vite: devDeps.vite || "missing",
    react: deps.react || "missing",
    "@vitejs/plugin-react": devDeps["@vitejs/plugin-react"] || "missing",
    typescript: devDeps.typescript || "missing",
    "@storybook/react-vite": devDeps["@storybook/react-vite"] || "missing",
    vitepress: devDeps.vitepress || "missing",
  };

  Object.entries(keyDeps).forEach(([dep, version]) => {
    const status = version === "missing" ? "❌" : "✅";
    const color = version === "missing" ? "red" : "green";
    log(`${status} ${dep}: ${version}`, color);
  });

  return { success: true, dependencies: keyDeps };
}

function testLibraryBuild() {
  logSection("Testing Library Build");

  // Check for Vite config
  const viteConfigExists = checkFileExists("vite.config.ts");
  if (!viteConfigExists) {
    return { success: false, error: "vite.config.ts not found" };
  }

  // Run the library build
  return runCommand("bun run build:lib", "Library Build");
}

function testStorybookBuild() {
  logSection("Testing Storybook Build");

  // Check for Storybook config
  const storybookConfigExists = checkFileExists(
    "apps/storybook/.storybook/main.ts",
  );
  if (!storybookConfigExists) {
    return { success: false, error: "Storybook main.ts config not found" };
  }

  // Run the Storybook build
  return runCommand("bun run build:storybook", "Storybook Build");
}

function testDocumentationBuild() {
  logSection("Testing Documentation Build");

  // Check for documentation config
  const vitePresConfigExists = checkFileExists(
    "apps/docs/.vitepress/config.ts",
  );
  if (!vitePresConfigExists) {
    log("❌ VitePress config not found", "red");
    return { success: false, error: "VitePress config.ts not found" };
  }

  // Run the documentation build
  return runCommand("bun run docs:build", "Documentation Build");
}

function generateReport(results) {
  logHeader("BUILD DEBUG REPORT");

  console.log("\n📊 SUMMARY:");
  console.log("===========");

  const {
    bundleResults,
    componentResults,
    storyResults,
    depResults,
    libBuild,
    storybookBuild,
    docsBuild,
  } = results;

  // Bundle files summary
  const missingBundles = bundleResults.filter((b) => !b.exists);
  if (missingBundles.length > 0) {
    log(`❌ Missing ${missingBundles.length} bundle files:`, "red");
    missingBundles.forEach((b) => log(`   - ${b.bundle}`, "red"));
  } else {
    log("✅ All bundle entry points exist", "green");
  }

  // Component indexes summary
  const missingIndexes = componentResults.filter((c) => !c.exists);
  if (missingIndexes.length > 0) {
    log(`❌ Missing ${missingIndexes.length} component index files:`, "red");
    missingIndexes.forEach((c) => log(`   - ${path.basename(c.path)}`, "red"));
  } else {
    log("✅ All component index files exist", "green");
  }

  // Build results summary
  console.log("\n🏗️  BUILD RESULTS:");
  console.log("==================");
  log(
    `Library Build: ${libBuild.success ? "✅ SUCCESS" : "❌ FAILED"}`,
    libBuild.success ? "green" : "red",
  );
  log(
    `Storybook Build: ${storybookBuild.success ? "✅ SUCCESS" : "❌ FAILED"}`,
    storybookBuild.success ? "green" : "red",
  );
  log(
    `Documentation Build: ${docsBuild.success ? "✅ SUCCESS" : "❌ FAILED"}`,
    docsBuild.success ? "green" : "red",
  );

  // Recommendations
  console.log("\n💡 RECOMMENDATIONS:");
  console.log("====================");

  if (missingBundles.length > 0) {
    log(
      "1. Create missing bundle files in libs/components/src/bundles/",
      "yellow",
    );
  }

  if (missingIndexes.length > 0) {
    log("2. Create missing component index.ts files", "yellow");
  }

  if (!libBuild.success) {
    log("3. Fix library build configuration and dependencies", "yellow");
  }

  if (!storybookBuild.success) {
    log("4. Fix Storybook configuration and story files", "yellow");
  }

  if (!docsBuild.success) {
    log(
      "5. Consider replacing VitePress with Mintlify for React component docs",
      "yellow",
    );
  }

  const allBuildsWorking =
    libBuild.success && storybookBuild.success && docsBuild.success;
  if (allBuildsWorking) {
    log("\n🎉 All builds are working! No issues detected.", "green");
  } else {
    log(
      "\n⚠️  Issues detected. Please follow recommendations above.",
      "yellow",
    );
  }
}

// Main execution
async function main() {
  logHeader("LiqUIdify Build Debug Analysis");

  log(
    "This script will systematically test each build component and identify issues.",
    "blue",
  );

  // Check file system components
  const bundleResults = checkBundleEntryPoints();
  const componentResults = checkComponentIndexFiles();
  const storyResults = checkStoryFiles();
  const depResults = checkDependencies();

  // Test each build system
  const libBuild = testLibraryBuild();
  const storybookBuild = testStorybookBuild();
  const docsBuild = testDocumentationBuild();

  // Generate comprehensive report
  generateReport({
    bundleResults,
    componentResults,
    storyResults,
    depResults,
    libBuild,
    storybookBuild,
    docsBuild,
  });
}

// Run the debug analysis
main().catch((error) => {
  log(`\n❌ Debug script failed: ${error.message}`, "red");
  process.exit(1);
});
