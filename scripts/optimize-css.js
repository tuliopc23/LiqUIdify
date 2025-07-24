#!/usr/bin/env node

/**
 * CSS Optimization Script for S-tier Performance
 *
 * This script optimizes the CSS bundle to meet performance targets:
 * - Bundle size < 30KB total
 * - Critical CSS < 15KB
 * - Render performance > 55fps
 */

const fs = require("node:fs").promises;
const path = require("node:path");
const { execSync } = require("node:child_process");

// Performance targets
const PERFORMANCE_TARGETS = {
	maxTotalCSS: 30 * 1024, // 30KB max total
	maxCriticalCSS: 15 * 1024, // 15KB max critical
	compressionRatio: 0.7, // Estimated gzip compression
};

async function optimizeCSS() {
	console.log("🎨 Starting CSS optimization for S-tier performance...");

	try {
		// Step 1: Build minimal CSS instead of full Tailwind
		console.log("📦 Building minimal CSS bundle...");
		const minimalCSSPath = path.join(
			__dirname,
			"../src/styles/minimal-glass.css",
		);
		const minimalCSS = await fs.readFile(minimalCSSPath, "utf8");

		// Minify the CSS
		const optimizedCSS = minifyCSS(minimalCSS);

		// Write optimized CSS
		const cssPath = path.join(__dirname, "../dist/liquidui.optimized.css");
		await fs.writeFile(cssPath, optimizedCSS);

		// Step 2: Analyze bundle size
		const cssContent = optimizedCSS;
		const originalSize = Buffer.byteLength(cssContent, "utf8");
		const estimatedGzipped = Math.round(
			originalSize * PERFORMANCE_TARGETS.compressionRatio,
		);

		console.log("📊 CSS Bundle Analysis:");
		console.log(`  Original size: ${Math.round(originalSize / 1024)}KB`);
		console.log(
			`  Estimated gzipped: ${Math.round(estimatedGzipped / 1024)}KB`,
		);
		console.log(`  Target: ${PERFORMANCE_TARGETS.maxTotalCSS / 1024}KB`);

		// Step 3: Extract critical CSS
		console.log("🔍 Extracting critical CSS...");
		const criticalCSS = await extractCriticalCSS(cssContent);

		// Step 4: Split CSS into critical and non-critical
		const criticalPath = path.join(__dirname, "../dist/liquidui.critical.css");
		const nonCriticalPath = path.join(
			__dirname,
			"../dist/liquidui.deferred.css",
		);

		await fs.writeFile(criticalPath, criticalCSS.critical);
		await fs.writeFile(nonCriticalPath, criticalCSS.deferred);

		const criticalSize = Buffer.byteLength(criticalCSS.critical, "utf8");
		const deferredSize = Buffer.byteLength(criticalCSS.deferred, "utf8");

		console.log("💾 CSS Splitting Results:");
		console.log(`  Critical CSS: ${Math.round(criticalSize / 1024)}KB`);
		console.log(`  Deferred CSS: ${Math.round(deferredSize / 1024)}KB`);

		// Step 5: Validate against performance targets
		const isValid = validatePerformance({
			originalSize,
			criticalSize,
			deferredSize,
			estimatedGzipped,
		});

		if (isValid) {
			// Replace the main CSS file with optimized version
			await fs.copyFile(cssPath, path.join(__dirname, "../dist/liquidui.css"));
			console.log("✅ CSS optimization completed successfully!");

			// Generate performance report
			await generatePerformanceReport({
				originalSize,
				criticalSize,
				deferredSize,
				estimatedGzipped,
			});
		} else {
			console.error("❌ CSS optimization failed to meet S-tier targets");
			process.exit(1);
		}
	} catch (error) {
		console.error("💥 CSS optimization failed:", error.message);
		process.exit(1);
	}
}

async function extractCriticalCSS(cssContent) {
	const lines = cssContent.split("\n");
	const criticalSelectors = [
		// Core HTML elements
		"html",
		"body",
		"*",
		// Glass component selectors
		".glass-",
		".liquid-",
		".backdrop-blur",
		// Layout essentials
		".flex",
		".grid",
		".relative",
		".absolute",
		// Typography essentials
		".text-",
		".font-",
		// Core utilities that are always needed
		".sr-only",
		".hidden",
		".block",
		".inline",
	];

	const critical = [];
	const deferred = [];
	let currentRule = "";
	let isCritical = false;

	for (const line of lines) {

		// Check if this is the start of a new rule
		if (line.includes("{") && !line.includes("}")) {
			currentRule = line;
			isCritical = criticalSelectors.some(
				(selector) =>
					line.includes(selector) ||
					line.includes("@layer theme") ||
					line.includes("@layer base") ||
					line.includes(":root"),
			);
		} else if (line.includes("}")) {
			currentRule += "\n" + line;

			if (isCritical) {
				critical.push(currentRule);
			} else {
				deferred.push(currentRule);
			}

			currentRule = "";
		} else {
			currentRule += "\n" + line;
		}
	}

	return {
		critical: critical.join("\n"),
		deferred: deferred.join("\n"),
	};
}

function validatePerformance({
	originalSize,
	criticalSize,
	deferredSize,
	estimatedGzipped,
}) {
	const issues = [];

	if (estimatedGzipped > PERFORMANCE_TARGETS.maxTotalCSS) {
		issues.push(
			`Total CSS size (${Math.round(estimatedGzipped / 1024)}KB) exceeds target (${PERFORMANCE_TARGETS.maxTotalCSS / 1024}KB)`,
		);
	}

	if (criticalSize > PERFORMANCE_TARGETS.maxCriticalCSS) {
		issues.push(
			`Critical CSS size (${Math.round(criticalSize / 1024)}KB) exceeds target (${PERFORMANCE_TARGETS.maxCriticalCSS / 1024}KB)`,
		);
	}

	if (issues.length > 0) {
		console.error("⚠️ Performance issues detected:");
		for (const issue of issues) {console.error(`  - ${issue}`);}
		return false;
	}

	return true;
}

async function generatePerformanceReport(stats) {
	const report = {
		timestamp: new Date().toISOString(),
		performance: {
			originalSize: Math.round(stats.originalSize / 1024),
			criticalSize: Math.round(stats.criticalSize / 1024),
			deferredSize: Math.round(stats.deferredSize / 1024),
			estimatedGzipped: Math.round(stats.estimatedGzipped / 1024),
			compressionRatio: PERFORMANCE_TARGETS.compressionRatio,
		},
		targets: {
			maxTotal: PERFORMANCE_TARGETS.maxTotalCSS / 1024,
			maxCritical: PERFORMANCE_TARGETS.maxCriticalCSS / 1024,
		},
		status: "PASS",
		recommendations: [
			"Use critical CSS loading strategy",
			"Defer non-critical CSS",
			"Enable CSS compression in production",
			"Monitor CSS bundle growth",
		],
	};

	await fs.writeFile(
		path.join(__dirname, "../dist/css-performance-report.json"),
		JSON.stringify(report, null, 2),
	);

	console.log(
		"📄 Performance report saved to dist/css-performance-report.json",
	);
}

function minifyCSS(css) {
	// Basic CSS minification
	return css
		.replaceAll(/\/\*[\S\s]*?\*\//g, "") // Remove comments
		.replaceAll(/\s+/g, " ") // Collapse whitespace
		.replaceAll(/;\s*}/g, "}") // Remove last semicolon in blocks
		.replaceAll(/\s*{\s*/g, "{") // Clean up braces
		.replaceAll(/\s*}\s*/g, "}")
		.replaceAll(/\s*,\s*/g, ",") // Clean up commas
		.replaceAll(/\s*:\s*/g, ":") // Clean up colons
		.replaceAll(/\s*;\s*/g, ";") // Clean up semicolons
		.trim();
}

// Run optimization
if (require.main === module) {
	optimizeCSS();
}

module.exports = { optimizeCSS };
