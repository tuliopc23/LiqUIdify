#!/usr/bin/env node

/**
 * CSS Build Script for Glass UI
 *
 * This script builds optimized CSS bundles for production:
 * - Core bundle (critical CSS, <15KB)
 * - Animations bundle (lazy-loaded, <10KB)
 * - Utilities bundle (<8KB)
 * - Themes bundle (lazy-loaded, <5KB)
 */

const { CSSBundler, BundleSizeValidator } = require("../dist/core/css-bundler");
const fs = require("fs");
const path = require("path");

// Configuration
const BUNDLE_CONFIG = {
	core: {
		files: [
			"src/styles/glass-core.css",
			"src/styles/glass-critical.css",
			"src/styles/graceful-degradation.css",
		],
		critical: true,
		maxSize: 15 * 1024, // 15KB
	},
	animations: {
		files: [
			"src/styles/glass-animations.css",
			"src/styles/apple-liquid-glass.css",
			"src/styles/enhanced-apple-liquid-glass.css",
		],
		critical: false,
		maxSize: 10 * 1024, // 10KB
		lazy: true,
	},
	utilities: {
		files: ["src/styles/glass-utilities.css", "src/styles/tailwind.css"],
		critical: false,
		maxSize: 8 * 1024, // 8KB
	},
	themes: {
		files: [
			"src/styles/glass-themes.css",
			"src/styles/apple-liquid-authentic.css",
		],
		critical: false,
		maxSize: 5 * 1024, // 5KB
		lazy: true,
	},
};

async function buildCSS() {
	console.log("🎨 Building CSS bundles...\n");

	try {
		// Initialize bundler
		const bundler = new CSSBundler(BUNDLE_CONFIG, "dist/css");
		const validator = new BundleSizeValidator();

		// Build bundles
		const result = await bundler.buildBundles();

		// Display results
		console.log("📦 Bundle Results:");
		console.log("─".repeat(60));

		result.bundles.forEach((bundle) => {
			const sizeKB = (bundle.size / 1024).toFixed(2);
			const gzipKB = (bundle.gzipSize / 1024).toFixed(2);
			const critical = bundle.critical ? "🔥 CRITICAL" : "⚡ LAZY";

			console.log(
				`${bundle.name.padEnd(12)} │ ${sizeKB.padStart(8)}KB │ ${gzipKB.padStart(8)}KB gzip │ ${critical}`,
			);
		});

		console.log("─".repeat(60));
		console.log(`Total Size: ${(result.totalSize / 1024).toFixed(2)}KB`);
		console.log(`Critical Size: ${(result.criticalSize / 1024).toFixed(2)}KB`);
		console.log("");

		// Validate bundle sizes
		const validation = validator.validate(result);

		if (validation.passed) {
			console.log("✅ All bundle size limits passed!");
		} else {
			console.log("❌ Bundle size violations:");
			validation.violations.forEach((violation) => {
				const actualKB = (violation.actual / 1024).toFixed(2);
				const limitKB = (violation.limit / 1024).toFixed(2);
				const icon = violation.severity === "error" ? "🚨" : "⚠️";

				console.log(
					`${icon} ${violation.bundle}: ${actualKB}KB > ${limitKB}KB limit`,
				);
			});
		}

		// Display warnings and errors
		if (result.warnings.length > 0) {
			console.log("\n⚠️  Warnings:");
			result.warnings.forEach((warning) => console.log(`   ${warning}`));
		}

		if (result.errors.length > 0) {
			console.log("\n🚨 Errors:");
			result.errors.forEach((error) => console.log(`   ${error}`));
			process.exit(1);
		}

		// Generate loading strategy
		const strategy = bundler.generateLoadingStrategy();
		const htmlIncludes = bundler.generateHTMLIncludes();

		// Write loading strategy to file
		const strategyOutput = {
			strategy,
			htmlIncludes,
			bundles: result.bundles.map((b) => ({
				name: b.name,
				path: `/css/${path.basename(b.output)}`,
				size: b.size,
				gzipSize: b.gzipSize,
				critical: b.critical,
			})),
		};

		fs.writeFileSync(
			"dist/css/loading-strategy.json",
			JSON.stringify(strategyOutput, null, 2),
		);

		console.log("\n📋 Loading Strategy:");
		console.log(`Critical: ${strategy.critical.length} bundles`);
		console.log(`Preload: ${strategy.preload.length} bundles`);
		console.log(`Lazy: ${strategy.lazy.length} bundles`);

		// Generate HTML template
		const htmlTemplate = `
<!-- Critical CSS (inline or high priority) -->
${htmlIncludes.critical}

<!-- Preload CSS (important but not critical) -->
${htmlIncludes.preload}

<!-- Lazy CSS (load when needed) -->
${htmlIncludes.lazy}

<!-- Fallback for browsers without JS -->
<noscript>
  ${strategy.preload.map((bundle) => `<link rel="stylesheet" href="/css/${bundle}" />`).join("\n  ")}
  ${strategy.lazy.map((bundle) => `<link rel="stylesheet" href="/css/${bundle}" />`).join("\n  ")}
</noscript>
`;

		fs.writeFileSync("dist/css/html-template.html", htmlTemplate.trim());

		console.log("\n✨ CSS build completed successfully!");
		console.log(`📁 Output directory: dist/css/`);
		console.log(`📄 Loading strategy: dist/css/loading-strategy.json`);
		console.log(`🌐 HTML template: dist/css/html-template.html`);

		// Exit with appropriate code
		process.exit(validation.passed ? 0 : 1);
	} catch (error) {
		console.error("🚨 CSS build failed:", error);
		process.exit(1);
	}
}

// Watch mode
function watchCSS() {
	console.log("👀 Starting CSS watch mode...\n");

	const bundler = new CSSBundler(BUNDLE_CONFIG, "dist/css");
	const validator = new BundleSizeValidator();

	bundler.watch(async (result) => {
		console.log(`🔄 Rebuilt at ${new Date().toLocaleTimeString()}`);

		const validation = validator.validate(result);
		if (validation.passed) {
			console.log("✅ All bundles within size limits");
		} else {
			console.log("❌ Size limit violations detected");
			validation.violations.forEach((violation) => {
				const actualKB = (violation.actual / 1024).toFixed(2);
				const limitKB = (violation.limit / 1024).toFixed(2);
				console.log(`   ${violation.bundle}: ${actualKB}KB > ${limitKB}KB`);
			});
		}
		console.log("");
	});
}

// CLI handling
const args = process.argv.slice(2);

if (args.includes("--watch") || args.includes("-w")) {
	watchCSS();
} else {
	buildCSS();
}
