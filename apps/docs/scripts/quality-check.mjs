#!/usr/bin/env node
/**
 * quality-check.mjs
 *
 * Comprehensive quality checks for LiqUIdify documentation
 */

import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, "..");

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function checkConfig() {
  console.log("🔧 Checking configuration...");
  const issues = [];

  const docsJson = path.join(docsRoot, "docs.json");
  if (await fileExists(docsJson)) {
    const config = JSON.parse(await readFile(docsJson, "utf8"));

    // Check navigation references
    const allPages = [];
    for (const group of config.navigation.groups || []) {
      for (const page of group.pages || []) {
        allPages.push(page);

        // Check if file exists
        const mdxFile = path.join(docsRoot, `${page}.mdx`);
        if (!(await fileExists(mdxFile))) {
          issues.push(`Missing page: ${page}.mdx`);
        }
      }
    }

    // Check for kebab-case consistency
    for (const page of allPages) {
      if (page !== page.toLowerCase() || page.includes("_")) {
        issues.push(
          `Non-kebab-case page slug: "${page}" should be lowercase with hyphens`,
        );
      }
    }

    console.log(`   ✅ Found ${allPages.length} pages in navigation`);
  } else {
    issues.push("Missing docs.json configuration file");
  }

  return issues;
}

async function checkComponents() {
  console.log("📦 Checking components...");
  const issues = [];

  const componentsDir = path.join(docsRoot, "components");
  const files = await readdir(componentsDir);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  for (const file of mdxFiles) {
    const filePath = path.join(componentsDir, file);
    const content = await readFile(filePath, "utf8");

    // Check for required sections
    const requiredSections = ["Props", "Accessibility", "Apple HIG Guidelines"];

    for (const section of requiredSections) {
      if (
        !content.includes(`## ${section}`) &&
        !content.includes(`### ${section}`)
      ) {
        issues.push(`${file}: Missing "${section}" section`);
      }
    }

    // Check for PreviewCodeTabs usage
    if (content.includes("import") && !content.includes("PreviewCodeTabs")) {
      issues.push(
        `${file}: Should use PreviewCodeTabs for interactive examples`,
      );
    }

    // Check for proper frontmatter
    if (!content.startsWith("---")) {
      issues.push(`${file}: Missing frontmatter`);
    }
  }

  console.log(`   ✅ Checked ${mdxFiles.length} component files`);
  return issues;
}

async function checkSnippets() {
  console.log("🧩 Checking snippets...");
  const issues = [];

  const snippetsDir = path.join(docsRoot, "snippets");
  if (await fileExists(snippetsDir)) {
    const files = await readdir(snippetsDir, { recursive: true });
    const tsxFiles = files.filter(
      (f) => f.endsWith(".tsx") || f.endsWith(".jsx"),
    );

    for (const file of tsxFiles) {
      const filePath = path.join(snippetsDir, file);
      const content = await readFile(filePath, "utf8");

      // Check for proper exports
      if (
        !content.includes("export default") &&
        !content.includes("export {")
      ) {
        issues.push(`snippets/${file}: Missing export`);
      }

      // Check for React imports if JSX is used
      if (
        content.includes("<") &&
        !content.includes("import") &&
        !content.includes("React")
      ) {
        issues.push(`snippets/${file}: Missing React import for JSX`);
      }
    }

    console.log(`   ✅ Checked ${tsxFiles.length} snippet files`);
  }

  return issues;
}

async function checkAssets() {
  console.log("🎨 Checking assets...");
  const issues = [];

  // Check required assets
  const requiredAssets = ["favicon.svg", "logo-light.svg", "logo-dark.svg"];

  for (const asset of requiredAssets) {
    if (!(await fileExists(path.join(docsRoot, asset)))) {
      issues.push(`Missing asset: ${asset}`);
    }
  }

  // Check CSS bundle
  const bundleCss = path.join(docsRoot, "styles", "bundle.css");
  if (await fileExists(bundleCss)) {
    const content = await readFile(bundleCss, "utf8");
    if (content.length < 1000) {
      issues.push("CSS bundle seems too small - may not be building correctly");
    }
  } else {
    issues.push("Missing CSS bundle - run `bun run build:css`");
  }

  return issues;
}

async function checkLinks() {
  console.log("🔗 Checking internal links...");
  const issues = [];

  // This is a simplified link check - in a real scenario you'd want more robust parsing
  const componentsDir = path.join(docsRoot, "components");
  const files = await readdir(componentsDir);

  for (const file of files.filter((f) => f.endsWith(".mdx"))) {
    const content = await readFile(path.join(componentsDir, file), "utf8");

    // Look for internal links
    const linkRegex = /\[.*?\]\((\/[^)]+)\)/g;
    const matches = [...content.matchAll(linkRegex)];

    for (const match of matches) {
      const link = match[1];
      if (link.startsWith("/components/")) {
        const linkedFile = link.replace("/components/", "") + ".mdx";
        if (!(await fileExists(path.join(componentsDir, linkedFile)))) {
          issues.push(`${file}: Broken link to ${link}`);
        }
      }
    }
  }

  return issues;
}

async function main() {
  console.log("🚀 Running LiqUIdify docs quality check...\n");

  const allIssues = [];

  allIssues.push(...(await checkConfig()));
  allIssues.push(...(await checkComponents()));
  allIssues.push(...(await checkSnippets()));
  allIssues.push(...(await checkAssets()));
  allIssues.push(...(await checkLinks()));

  console.log("\n📊 Quality Check Results:");
  console.log("═══════════════════════════");

  if (allIssues.length === 0) {
    console.log("🎉 All checks passed! Documentation is in excellent shape.");
  } else {
    console.log(`❌ Found ${allIssues.length} issue(s):`);
    for (const issue of allIssues) {
      console.log(`   • ${issue}`);
    }

    console.log("\n💡 Recommendations:");
    console.log("   • Fix the issues above");
    console.log("   • Run this script regularly as part of CI");
    console.log("   • Consider adding pre-commit hooks");

    process.exit(1);
  }
}

main().catch(console.error);
