#!/usr/bin/env node

/**
 * Bundle Size Monitor for Glass UI
 *
 * Monitors bundle sizes and enforces size budgets:
 * - Core bundle: <15KB (critical)
 * - Animations: <10KB (lazy)
 * - Utilities: <8KB
 * - Themes: <5KB (lazy)
 * - Total critical: <30KB
 */

const fs = require("node:fs");
const path = require("node:path");
const gzipSize = require("gzip-size");
const chalk = require("chalk");

// Size budgets (in bytes)
const SIZE_BUDGETS = {
	"core.css": 15 * 1024, // 15KB - Critical CSS
	"animations.css": 10 * 1024, // 10KB - Lazy loaded
	"utilities.css": 8 * 1024, // 8KB
	"themes.css": 5 * 1024, // 5KB - Lazy loaded
	"total-critical": 30 * 1024, // 30KB - Total critical CSS
};

// Critical bundles (loaded immediately)
const CRITICAL_BUNDLES = new Set(["core.css"]);

class BundleSizeMonitor {
	constructor(distDir = "dist/css") {
		this.distDir = distDir;
		this.results = {
			bundles: [],
			totalSize: 0,
			criticalSize: 0,
			violations: [],
			passed: true,
		};
	}

	/**
	 * Analyze all CSS bundles
	 */
	async analyze() {
		console.log(chalk.blue("📊 Analyzing CSS bundle sizes...\n"));

		if (!fs.existsSync(this.distDir)) {
			throw new Error(`Distribution directory not found: ${this.distDir}`);
		}

		const cssFiles = fs
			.readdirSync(this.distDir)
			.filter((file) => file.endsWith(".css"))
			.filter((file) => !file.includes(".map")); // Exclude source maps

		if (cssFiles.length === 0) {
			throw new Error("No CSS files found in distribution directory");
		}

		// Analyze each bundle
		for (const file of cssFiles) {
			const bundle = await this.analyzeBundle(file);
			this.results.bundles.push(bundle);
			this.results.totalSize += bundle.size;

			if (CRITICAL_BUNDLES.has(file)) {
				this.results.criticalSize += bundle.size;
			}
		}

		// Check size budgets
		this.checkSizeBudgets();

		return this.results;
	}

	/**
	 * Analyze a single bundle
	 */
	async analyzeBundle(filename) {
		const filePath = path.join(this.distDir, filename);
		const content = fs.readFileSync(filePath, "utf8");

		const size = Buffer.byteLength(content, "utf8");
		const compressed = await gzipSize(content);
		const isCritical = CRITICAL_BUNDLES.has(filename);

		return {
			name: filename,
			path: filePath,
			size,
			gzipSize: compressed,
			critical: isCritical,
			compressionRatio: (((size - compressed) / size) * 100).toFixed(1),
		};
	}

	/**
	 * Check size budgets and record violations
	 */
	checkSizeBudgets() {
		// Check individual bundle budgets
		for (const bundle of this.results.bundles) {
			const budget = SIZE_BUDGETS[bundle.name];
			if (budget && bundle.gzipSize > budget) {
				this.results.violations.push({
					type: "bundle",
					name: bundle.name,
					actual: bundle.gzipSize,
					budget,
					severity: bundle.critical ? "error" : "warning",
				});
				this.results.passed = false;
			}
		}

		// Check total critical size
		if (this.results.criticalSize > SIZE_BUDGETS["total-critical"]) {
			this.results.violations.push({
				type: "critical-total",
				name: "Total Critical CSS",
				actual: this.results.criticalSize,
				budget: SIZE_BUDGETS["total-critical"],
				severity: "error",
			});
			this.results.passed = false;
		}
	}

	/**
	 * Display results in a formatted table
	 */
	displayResults() {
		console.log(chalk.bold("📦 Bundle Size Analysis"));
		console.log("─".repeat(80));
		console.log(
			chalk.gray("Bundle".padEnd(20)) +
				chalk.gray("Size".padStart(10)) +
				chalk.gray("Gzipped".padStart(10)) +
				chalk.gray("Compression".padStart(12)) +
				chalk.gray("Budget".padStart(10)) +
				chalk.gray("Status".padStart(12)),
		);
		console.log("─".repeat(80));

		for (const bundle of this.results.bundles) {
			const sizeKB = (bundle.size / 1024).toFixed(1);
			const gzipKB = (bundle.gzipSize / 1024).toFixed(1);
			const budget = SIZE_BUDGETS[bundle.name];
			const budgetKB = budget ? (budget / 1024).toFixed(1) : "N/A";

			let status = "✅ OK";
			let statusColor = chalk.green;

			if (budget && bundle.gzipSize > budget) {
				status = bundle.critical ? "🚨 OVER" : "⚠️  OVER";
				statusColor = bundle.critical ? chalk.red : chalk.yellow;
			}

			const criticalIcon = bundle.critical ? "🔥" : "  ";

			console.log(
				`${criticalIcon}${bundle.name.padEnd(18)} ` +
					`${sizeKB.padStart(8)}KB ` +
					`${gzipKB.padStart(8)}KB ` +
					`${bundle.compressionRatio.padStart(10)}% ` +
					`${budgetKB.padStart(8)}KB ` +
					statusColor(`${status.padStart(10)}`),
			);
		}

		console.log("─".repeat(80));
		console.log(
			`Total Size: ${chalk.bold((this.results.totalSize / 1024).toFixed(1))}KB | ` +
				`Critical: ${chalk.bold((this.results.criticalSize / 1024).toFixed(1))}KB | ` +
				`Budget: ${chalk.bold((SIZE_BUDGETS["total-critical"] / 1024).toFixed(1))}KB`,
		);
		console.log("");

		// Display violations
		if (this.results.violations.length > 0) {
			console.log(chalk.red.bold("❌ Size Budget Violations:"));
			for (const violation of this.results.violations) {
				const actualKB = (violation.actual / 1024).toFixed(1);
				const budgetKB = (violation.budget / 1024).toFixed(1);
				const overageKB = (
					(violation.actual - violation.budget) /
					1024
				).toFixed(1);
				const icon = violation.severity === "error" ? "🚨" : "⚠️";

				console.log(
					`${icon} ${violation.name}: ${actualKB}KB > ${budgetKB}KB ` +
						`(+${overageKB}KB over budget)`,
				);
			}
			console.log("");
		} else {
			console.log(chalk.green.bold("✅ All bundles within size budgets!"));
			console.log("");
		}
	}

	/**
	 * Generate size report for CI/CD
	 */
	generateReport() {
		const report = {
			timestamp: new Date().toISOString(),
			passed: this.results.passed,
			summary: {
				totalBundles: this.results.bundles.length,
				totalSize: this.results.totalSize,
				criticalSize: this.results.criticalSize,
				violations: this.results.violations.length,
			},
			bundles: this.results.bundles.map((bundle) => ({
				name: bundle.name,
				size: bundle.size,
				gzipSize: bundle.gzipSize,
				critical: bundle.critical,
				withinBudget: !this.results.violations.some(
					(v) => v.name === bundle.name,
				),
			})),
			violations: this.results.violations,
			budgets: SIZE_BUDGETS,
		};

		// Write report to file
		const reportPath = path.join(this.distDir, "size-report.json");
		fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

		console.log(chalk.blue(`📄 Size report saved: ${reportPath}`));

		return report;
	}

	/**
	 * Compare with previous report
	 */
	compareWithPrevious() {
		const reportPath = path.join(this.distDir, "size-report.json");

		if (!fs.existsSync(reportPath)) {
			console.log(chalk.yellow("📊 No previous report found for comparison"));
			return null;
		}

		try {
			const previousReport = JSON.parse(fs.readFileSync(reportPath, "utf8"));
			const comparison = {
				totalSizeDiff:
					this.results.totalSize - previousReport.summary.totalSize,
				criticalSizeDiff:
					this.results.criticalSize - previousReport.summary.criticalSize,
				bundleChanges: [],
			};

			// Compare individual bundles
			for (const currentBundle of this.results.bundles) {
				const previousBundle = previousReport.bundles.find(
					(b) => b.name === currentBundle.name,
				);
				if (previousBundle) {
					const sizeDiff = currentBundle.gzipSize - previousBundle.gzipSize;
					if (Math.abs(sizeDiff) > 100) {
						// Only report changes > 100 bytes
						comparison.bundleChanges.push({
							name: currentBundle.name,
							sizeDiff,
							previousSize: previousBundle.gzipSize,
							currentSize: currentBundle.gzipSize,
						});
					}
				}
			}

			// Display comparison
			if (comparison.bundleChanges.length > 0) {
				console.log(chalk.blue.bold("📈 Size Changes Since Last Build:"));
				for (const change of comparison.bundleChanges) {
					const diffKB = (change.sizeDiff / 1024).toFixed(1);
					const icon = change.sizeDiff > 0 ? "📈" : "📉";
					const color = change.sizeDiff > 0 ? chalk.red : chalk.green;
					const sign = change.sizeDiff > 0 ? "+" : "";

					console.log(`${icon} ${change.name}: ${color(`${sign}${diffKB}KB`)}`);
				}
				console.log("");
			}

			return comparison;
		} catch (error) {
			console.log(
				chalk.yellow(
					"⚠️  Could not compare with previous report:",
					error.message,
				),
			);
			return null;
		}
	}
}

// CLI execution
async function main() {
	const args = process.argv.slice(2);
	const distDir =
		args.find((arg) => arg.startsWith("--dir="))?.split("=")[1] || "dist/css";
	const shouldFail = args.includes("--fail-on-budget");
	const compareMode = args.includes("--compare");

	try {
		const monitor = new BundleSizeMonitor(distDir);

		// Compare with previous if requested
		if (compareMode) {
			monitor.compareWithPrevious();
		}

		// Analyze current bundles
		await monitor.analyze();

		// Display results
		monitor.displayResults();

		// Generate report
		monitor.generateReport();

		// Exit with appropriate code
		if (shouldFail && !monitor.results.passed) {
			console.log(
				chalk.red.bold("💥 Build failed due to size budget violations"),
			);
			process.exit(1);
		} else if (monitor.results.passed) {
			console.log(chalk.green.bold("🎉 All size budgets passed!"));
			process.exit(0);
		} else {
			console.log(
				chalk.yellow.bold(
					"⚠️  Size budget violations detected (not failing build)",
				),
			);
			process.exit(0);
		}
	} catch (error) {
		console.error(
			chalk.red.bold("💥 Bundle size analysis failed:"),
			error.message,
		);
		process.exit(1);
	}
}

// Run if called directly
if (require.main === module) {
	main();
}

module.exports = { BundleSizeMonitor, SIZE_BUDGETS };
