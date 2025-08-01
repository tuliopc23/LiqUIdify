#!/usr/bin/env node

/**
 * Check Stories Script
 * Verifies all Storybook story files exist and are properly configured
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

function findStoryFiles() {
  logSection("Finding Story Files");

  try {
    // Find all .stories.ts and .stories.tsx files
    const command = `find libs/components/src -name "*.stories.ts" -o -name "*.stories.tsx"`;
    const output = execSync(command, { encoding: "utf8" });
    const storyFiles = output
      .trim()
      .split("\n")
      .filter((f) => f && f.length > 0);

    log(`Found ${storyFiles.length} story files`, "blue");
    return storyFiles;
  } catch (error) {
    log(`Error finding story files: ${error.message}`, "red");
    return [];
  }
}

function checkStoryFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    const checks = {
      hasDefaultExport: /export\s+default\s+/.test(content),
      hasMetaObject: /(?:meta|Meta)\s*:\s*/.test(content),
      hasStoryObject: /(?:Story|story)\s*=/.test(content),
      hasImportStatement: /import.*from/.test(content),
      hasComponentImport: /import.*(?:Glass|glass)/.test(content),
    };

    return {
      valid: Object.values(checks).every(Boolean),
      checks,
      content: content.substring(0, 200) + (content.length > 200 ? "..." : ""),
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message,
      checks: {},
    };
  }
}

function checkComponentExists(storyFilePath) {
  // Extract component name from story file path
  const componentDir = path.dirname(storyFilePath);
  const componentName = path.basename(componentDir);

  // Look for the main component file
  const possibleComponentFiles = [
    path.join(componentDir, `${componentName}.tsx`),
    path.join(componentDir, `${componentName}.ts`),
    path.join(componentDir, "index.tsx"),
    path.join(componentDir, "index.ts"),
  ];

  for (const componentFile of possibleComponentFiles) {
    if (fs.existsSync(componentFile)) {
      return { exists: true, path: componentFile };
    }
  }

  return { exists: false, searched: possibleComponentFiles };
}

function analyzeStorybookConfig() {
  logSection("Analyzing Storybook Configuration");

  const storybookMainPath = "apps/storybook/.storybook/main.ts";

  if (!fs.existsSync(storybookMainPath)) {
    log("❌ Storybook main.ts not found", "red");
    return { exists: false };
  }

  try {
    const config = fs.readFileSync(storybookMainPath, "utf8");

    // Check for story patterns
    const storyPatterns = config.match(/stories:\s*\[(.*?)\]/s);
    const patterns = storyPatterns ? storyPatterns[1] : "No patterns found";

    log("✅ Storybook configuration found", "green");
    log(`Story patterns: ${patterns.replace(/\s+/g, " ").trim()}`, "blue");

    return {
      exists: true,
      config,
      patterns: patterns.trim(),
    };
  } catch (error) {
    log(`❌ Error reading Storybook config: ${error.message}`, "red");
    return { exists: true, error: error.message };
  }
}

function checkStorybookDependencies() {
  logSection("Checking Storybook Dependencies");

  const packageJsonPath = "package.json";
  if (!fs.existsSync(packageJsonPath)) {
    log("❌ package.json not found", "red");
    return { success: false };
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const devDeps = packageJson.devDependencies || {};

  const storybookDeps = {
    "@storybook/react": devDeps["@storybook/react"] || "missing",
    "@storybook/react-vite": devDeps["@storybook/react-vite"] || "missing",
    "@storybook/addon-essentials":
      devDeps["@storybook/addon-essentials"] || "missing",
    "@storybook/addon-interactions":
      devDeps["@storybook/addon-interactions"] || "missing",
    storybook: devDeps["storybook"] || "missing",
  };

  Object.entries(storybookDeps).forEach(([dep, version]) => {
    const status = version === "missing" ? "❌" : "✅";
    const color = version === "missing" ? "red" : "green";
    log(`${status} ${dep}: ${version}`, color);
  });

  return { success: true, dependencies: storybookDeps };
}

function generateStoryReport(storyFiles) {
  logHeader("STORYBOOK ANALYSIS REPORT");

  console.log("\n📊 SUMMARY:");
  console.log("===========");

  let validStories = 0;
  let invalidStories = 0;
  let missingComponents = 0;

  const issues = [];

  storyFiles.forEach((storyFile) => {
    const exists = fs.existsSync(storyFile);
    const status = exists ? "✅" : "❌";
    const color = exists ? "green" : "red";

    log(`${status} ${storyFile}`, color);

    if (!exists) {
      invalidStories++;
      issues.push(`Missing story file: ${storyFile}`);
      return;
    }

    // Check story file content
    const contentCheck = checkStoryFileContent(storyFile);
    if (!contentCheck.valid) {
      invalidStories++;
      issues.push(
        `Invalid story content in ${storyFile}: ${JSON.stringify(contentCheck.checks)}`,
      );
    } else {
      validStories++;
    }

    // Check if component exists
    const componentCheck = checkComponentExists(storyFile);
    if (!componentCheck.exists) {
      missingComponents++;
      issues.push(
        `Missing component for story ${storyFile}. Searched: ${componentCheck.searched?.join(", ")}`,
      );
    }
  });

  console.log(`\n📈 Statistics:`);
  log(`Valid stories: ${validStories}`, "green");
  log(
    `Invalid stories: ${invalidStories}`,
    invalidStories > 0 ? "red" : "green",
  );
  log(
    `Missing components: ${missingComponents}`,
    missingComponents > 0 ? "red" : "green",
  );
  log(`Total stories: ${storyFiles.length}`, "blue");

  if (issues.length > 0) {
    console.log("\n⚠️  ISSUES FOUND:");
    console.log("=================");
    issues.forEach((issue, index) => {
      log(`${index + 1}. ${issue}`, "yellow");
    });
  }

  console.log("\n💡 RECOMMENDATIONS:");
  console.log("====================");

  if (invalidStories > 0) {
    log(
      "1. Fix invalid story files to include proper Storybook format",
      "yellow",
    );
  }

  if (missingComponents > 0) {
    log("2. Create missing component files or update story imports", "yellow");
  }

  if (storyFiles.length === 0) {
    log(
      "3. Create story files for components to enable Storybook build",
      "yellow",
    );
  }

  const allGood =
    validStories === storyFiles.length &&
    missingComponents === 0 &&
    storyFiles.length > 0;
  if (allGood) {
    log("\n🎉 All story files are valid and ready for Storybook!", "green");
  } else {
    log("\n⚠️  Issues detected. Please fix the problems above.", "yellow");
  }

  return {
    validStories,
    invalidStories,
    missingComponents,
    totalStories: storyFiles.length,
    issues,
    allGood,
  };
}

// Main execution
function main() {
  logHeader("Storybook Story Files Analysis");

  log("Checking all story files and their validity...", "blue");

  // Analyze Storybook configuration
  const configAnalysis = analyzeStorybookConfig();

  // Check dependencies
  const depCheck = checkStorybookDependencies();

  // Find and analyze story files
  const storyFiles = findStoryFiles();

  // Generate comprehensive report
  const report = generateStoryReport(storyFiles);

  // Exit with appropriate code
  if (report.allGood && configAnalysis.exists && depCheck.success) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

// Run the analysis
main();
