#!/usr/bin/env bun
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const distDir = join(process.cwd(), "dist/libs/components");
const cssSource = join(process.cwd(), "dist/liquidui.css");
const cssTarget = join(distDir, "liquidui.css");
const stylesTarget = join(distDir, "styles.css");

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy CSS files
if (existsSync(cssSource)) {
  copyFileSync(cssSource, cssTarget);
  copyFileSync(cssSource, stylesTarget);
  console.log("✅ CSS files copied successfully");
} else {
  console.error("❌ CSS source file not found:", cssSource);
  process.exit(1);
}