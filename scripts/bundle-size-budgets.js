#!/usr/bin/env node

/**
 * LiqUIdify Bundle Size Budget Enforcement
 *
 * S-Tier Bundle Size Monitoring and Enforcement System
 * - Real-time bundle size tracking
 * - Automated budget enforcement
 * - Trend analysis and alerts
 * - CI/CD integration
 * - Performance regression detection
 */

const fs = require("node:fs").promises;
const path = require("node:path");
const { execSync } = require("node:child_process");
const zlib = require("node:zlib");
const { promisify } = require("node:util");

const gzip = promisify(zlib.gzip);
const brotliCompress = promisify(zlib.brotliCompress);

// S-Tier Bundle Size Budgets (bytes)
const BUNDLE_BUDGETS = {
	// Core bundle - Essential components and utilities
	core: {
		uncompressed: 15 * 1024, // 15KB
		gzipped: 5 * 1024, // 5KB gzipped
		brotli: 4 * 1024, // 4KB brotli
	},

	// Animation bundle - Physics and motion
	animations: {
		uncompressed: 10 * 1024, // 10KB
		gzipped: 3.5 * 1024, // 3.5KB gzipped
		brotli: 3 * 1024, // 3KB brotli
	},

	// Advanced bundle - Complex features
	advanced: {
		uncompressed: 8 * 1024, // 8KB
		gzipped: 2.5 * 1024, // 2.5KB gzipped
		brotli: 2 * 1024, // 2KB brotli
	},

	// Individual component budgets
	components: {
		button: { max: 1 * 1024 }, // 1KB
		card: { max: 1.5 * 1024 }, // 1.5KB
		input: { max: 2 * 1024 }, // 2KB
		modal: { max: 3 * 1024 }, // 3KB
		navigation: { max: 2.5 * 1024 }, // 2.5KB
	},

	// CSS budgets
	css: {
		core: { max: 8 * 1024 }, // 8KB
		animations: { max: 4 * 1024 }, // 4KB
		utilities: { max: 3 * 1024 }, // 3KB
		themes: { max: 2 * 1024 }, // 2KB
	},

	// Total budget - S-Tier requirement
	total: {
		uncompressed: 30 * 1024, // 30KB total
		gzipped: 10 * 1024, // 10KB gzipped
		brotli: 8 * 1024, // 8KB brotli
	},
};

// Performance thresholds for regression detection
const PERFORMANCE_THRESHOLDS = {
	maxGrowthPercent: 5, // 5% growth threshold
	maxGrowthAbsolute: 1024, // 1KB absolute growth threshold
	trendAnalysisDays: 7, // Days to analyze for trends
	alertThreshold: 0.9, // Alert when 90% of budget is used
};

class BundleSizeBudgetEnforcer {
	constructor() {
		this.results = {
			violations: [],
			warnings: [],
			passed: [],
			summary: {
				totalSize: 0,
				totalGzipped: 0,
				totalBrotli: 0,
				budgetUsage: 0,
				status: "UNKNOWN",
			},
		};

		this.historicalData = [];
	}

	log(message, level = "info") {
		const colors = {
			info: "\u001B[36m", // cyan
			warn: "\u001B[33m", // yellow
			error: "\u001B[31m", // red
			success: "\u001B[32m", // green
			reset: "\u001B[0m",
		};

		const timestamp = new Date().toISOString().split("T")[1].split(".")[0];
		console.log(`${colors[level]}[${timestamp}] ${message}${colors.reset}`);
	}

	async getFileSize(filePath) {
		try {
			const stats = await fs.stat(filePath);
			return stats.size;
		} catch {
			return 0;
		}
	}

	async getCompressedSizes(filePath) {
		try {
			const content = await fs.readFile(filePath);
			const gzipped = await gzip(content);
			const brotli = await brotliCompress(content);

			return {
				uncompressed: content.length,
				gzipped: gzipped.length,
				brotli: brotli.length,
			};
		} catch {
			return {
				uncompressed: 0,
				gzipped: 0,
				brotli: 0,
			};
		}
	}

	async analyzeBundleFiles() {
		this.log("📊 Analyzing bundle files...", "info");

		const bundleAnalysis = {
			core: { files: [], totalSize: 0 },
			animations: { files: [], totalSize: 0 },
			advanced: { files: [], totalSize: 0 },
			components: { files: [], totalSize: 0 },
			css: { files: [], totalSize: 0 },
		};

		try {
			const distFiles = await fs.readdir("./dist");

			for (const file of distFiles) {
				const filePath = path.join("./dist", file);
				const stat = await fs.stat(filePath);

				if (stat.isFile()) {
					const sizes = await this.getCompressedSizes(filePath);

					const fileInfo = {
						name: file,
						path: filePath,
						...sizes,
					};

					// Categorize files
					if (
						file.includes("core") ||
						file === "index.mjs" ||
						file === "index.cjs"
					) {
						bundleAnalysis.core.files.push(fileInfo);
						bundleAnalysis.core.totalSize += sizes.uncompressed;
					} else if (file.includes("animation")) {
						bundleAnalysis.animations.files.push(fileInfo);
						bundleAnalysis.animations.totalSize += sizes.uncompressed;
					} else if (file.includes("advanced")) {
						bundleAnalysis.advanced.files.push(fileInfo);
						bundleAnalysis.advanced.totalSize += sizes.uncompressed;
					} else if (
						file.includes("components") ||
						/\/(button|card|input|modal|navigation)\./.test(file)
					) {
						bundleAnalysis.components.files.push(fileInfo);
						bundleAnalysis.components.totalSize += sizes.uncompressed;
					} else if (file.endsWith(".css")) {
						bundleAnalysis.css.files.push(fileInfo);
						bundleAnalysis.css.totalSize += sizes.uncompressed;
					}
				}
			}

			// Check CSS files in dist/css directory
			try {
				const cssFiles = await fs.readdir("./dist/css");
				for (const file of cssFiles) {
					if (file.endsWith(".css")) {
						const filePath = path.join("./dist/css", file);
						const sizes = await this.getCompressedSizes(filePath);

						bundleAnalysis.css.files.push({
							name: file,
							path: filePath,
							...sizes,
						});
						bundleAnalysis.css.totalSize += sizes.uncompressed;
					}
				}
			} catch {
				// CSS directory doesn't exist, skip
			}

			return bundleAnalysis;
		} catch (error) {
			this.log(`Error analyzing bundle files: ${error.message}`, "error");
			return bundleAnalysis;
		}
	}

	async checkBundleBudgets(bundleAnalysis) {
		this.log("💰 Checking bundle budgets...", "info");

		// Check core bundle
		await this.checkBundleBudget(
			"core",
			bundleAnalysis.core,
			BUNDLE_BUDGETS.core,
		);

		// Check animations bundle
		await this.checkBundleBudget(
			"animations",
			bundleAnalysis.animations,
			BUNDLE_BUDGETS.animations,
		);

		// Check advanced bundle
		await this.checkBundleBudget(
			"advanced",
			bundleAnalysis.advanced,
			BUNDLE_BUDGETS.advanced,
		);

		// Check individual components
		await this.checkComponentBudgets(bundleAnalysis.components);

		// Check CSS budgets
		await this.checkCSSBudgets(bundleAnalysis.css);

		// Check total budget
		const totalSize = Object.values(bundleAnalysis).reduce(
			(sum, bundle) => sum + bundle.totalSize,
			0,
		);
		await this.checkTotalBudget(totalSize, bundleAnalysis);
	}

	async checkBundleBudget(bundleName, bundleData, budget) {
		const { totalSize } = bundleData;

		if (totalSize > budget.uncompressed) {
			this.results.violations.push({
				type: "BUDGET_EXCEEDED",
				bundle: bundleName,
				actual: totalSize,
				budget: budget.uncompressed,
				overage: totalSize - budget.uncompressed,
				percentage: ((totalSize / budget.uncompressed) * 100).toFixed(1),
			});

			this.log(
				`❌ ${bundleName} bundle exceeds budget: ${(totalSize / 1024).toFixed(1)}KB / ${(budget.uncompressed / 1024).toFixed(1)}KB`,
				"error",
			);
		} else if (
			totalSize >
			budget.uncompressed * PERFORMANCE_THRESHOLDS.alertThreshold
		) {
			this.results.warnings.push({
				type: "BUDGET_WARNING",
				bundle: bundleName,
				actual: totalSize,
				budget: budget.uncompressed,
				usage: ((totalSize / budget.uncompressed) * 100).toFixed(1),
			});

			this.log(
				`⚠️ ${bundleName} bundle approaching budget: ${(totalSize / 1024).toFixed(1)}KB / ${(budget.uncompressed / 1024).toFixed(1)}KB`,
				"warn",
			);
		} else {
			this.results.passed.push({
				bundle: bundleName,
				actual: totalSize,
				budget: budget.uncompressed,
				usage: ((totalSize / budget.uncompressed) * 100).toFixed(1),
			});

			this.log(
				`✅ ${bundleName} bundle within budget: ${(totalSize / 1024).toFixed(1)}KB / ${(budget.uncompressed / 1024).toFixed(1)}KB`,
				"success",
			);
		}

		// Check compressed sizes if available
		for (const file of bundleData.files) {
			if (file.gzipped > budget.gzipped) {
				this.results.warnings.push({
					type: "GZIP_BUDGET_WARNING",
					file: file.name,
					actual: file.gzipped,
					budget: budget.gzipped,
				});
			}
		}
	}

	async checkComponentBudgets(componentData) {
		for (const file of componentData.files) {
			const componentName = this.extractComponentName(file.name);
			const budget = BUNDLE_BUDGETS.components[componentName];

			if (budget && file.uncompressed > budget.max) {
				this.results.violations.push({
					type: "COMPONENT_BUDGET_EXCEEDED",
					component: componentName,
					file: file.name,
					actual: file.uncompressed,
					budget: budget.max,
					overage: file.uncompressed - budget.max,
				});

				this.log(
					`❌ Component ${componentName} exceeds budget: ${(file.uncompressed / 1024).toFixed(1)}KB / ${(budget.max / 1024).toFixed(1)}KB`,
					"error",
				);
			}
		}
	}

	async checkCSSBudgets(cssData) {
		for (const file of cssData.files) {
			const cssType = this.extractCSSType(file.name);
			const budget = BUNDLE_BUDGETS.css[cssType];

			if (budget && file.uncompressed > budget.max) {
				this.results.violations.push({
					type: "CSS_BUDGET_EXCEEDED",
					cssType,
					file: file.name,
					actual: file.uncompressed,
					budget: budget.max,
					overage: file.uncompressed - budget.max,
				});

				this.log(
					`❌ CSS ${cssType} exceeds budget: ${(file.uncompressed / 1024).toFixed(1)}KB / ${(budget.max / 1024).toFixed(1)}KB`,
					"error",
				);
			}
		}
	}

	async checkTotalBudget(totalSize, bundleAnalysis) {
		this.results.summary.totalSize = totalSize;
		this.results.summary.budgetUsage = (
			(totalSize / BUNDLE_BUDGETS.total.uncompressed) *
			100
		).toFixed(1);

		if (totalSize > BUNDLE_BUDGETS.total.uncompressed) {
			this.results.violations.push({
				type: "TOTAL_BUDGET_EXCEEDED",
				actual: totalSize,
				budget: BUNDLE_BUDGETS.total.uncompressed,
				overage: totalSize - BUNDLE_BUDGETS.total.uncompressed,
				percentage: this.results.summary.budgetUsage,
			});

			this.log(
				`❌ Total bundle size exceeds S-tier budget: ${(totalSize / 1024).toFixed(1)}KB / ${(BUNDLE_BUDGETS.total.uncompressed / 1024).toFixed(1)}KB`,
				"error",
			);
			this.results.summary.status = "FAILED";
		} else if (
			totalSize >
			BUNDLE_BUDGETS.total.uncompressed * PERFORMANCE_THRESHOLDS.alertThreshold
		) {
			this.results.warnings.push({
				type: "TOTAL_BUDGET_WARNING",
				actual: totalSize,
				budget: BUNDLE_BUDGETS.total.uncompressed,
				usage: this.results.summary.budgetUsage,
			});

			this.log(
				`⚠️ Total bundle size approaching S-tier budget: ${(totalSize / 1024).toFixed(1)}KB / ${(BUNDLE_BUDGETS.total.uncompressed / 1024).toFixed(1)}KB`,
				"warn",
			);
			this.results.summary.status = "WARNING";
		} else {
			this.log(
				`✅ Total bundle size within S-tier budget: ${(totalSize / 1024).toFixed(1)}KB / ${(BUNDLE_BUDGETS.total.uncompressed / 1024).toFixed(1)}KB`,
				"success",
			);
			this.results.summary.status = "PASSED";
		}
	}

	extractComponentName(filename) {
		// Extract component name from filename
		const matches = filename.match(/(button|card|input|modal|navigation)/i);
		return matches ? matches[1].toLowerCase() : "unknown";
	}

	extractCSSType(filename) {
		// Extract CSS type from filename
		if (filename.includes("core")) {return "core";}
		if (filename.includes("animation")) {return "animations";}
		if (filename.includes("utilities")) {return "utilities";}
		if (filename.includes("theme")) {return "themes";}
		return "core";
	}

	async loadHistoricalData() {
		try {
			const historyPath = "./dist/bundle-size-history.json";
			const historyData = await fs.readFile(historyPath, "utf8");
			this.historicalData = JSON.parse(historyData);
		} catch {
			// No historical data available, start fresh
			this.historicalData = [];
		}
	}

	async saveHistoricalData() {
		const timestamp = new Date().toISOString();
		const commitHash = process.env.GITHUB_SHA || "local";

		const dataPoint = {
			timestamp,
			commit: commitHash,
			totalSize: this.results.summary.totalSize,
			budgetUsage: Number.parseFloat(this.results.summary.budgetUsage),
			status: this.results.summary.status,
			violations: this.results.violations.length,
			warnings: this.results.warnings.length,
		};

		this.historicalData.push(dataPoint);

		// Keep only last 30 days of data
		const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
		this.historicalData = this.historicalData.filter(
			(point) => new Date(point.timestamp) > thirtyDaysAgo,
		);

		await fs.writeFile(
			"./dist/bundle-size-history.json",
			JSON.stringify(this.historicalData, null, 2),
		);
	}

	async analyzeRegressions() {
		if (this.historicalData.length < 2) {
			this.log(
				"📈 Insufficient historical data for regression analysis",
				"info",
			);
			return;
		}

		this.log("📈 Analyzing size regressions...", "info");

		const currentSize = this.results.summary.totalSize;
		const previousRuns = this.historicalData.slice(
			-PERFORMANCE_THRESHOLDS.trendAnalysisDays,
		);

		if (previousRuns.length > 0) {
			const avgPreviousSize =
				previousRuns.reduce((sum, run) => sum + run.totalSize, 0) /
				previousRuns.length;
			const growth = currentSize - avgPreviousSize;
			const growthPercent = (growth / avgPreviousSize) * 100;

			if (
				growth > PERFORMANCE_THRESHOLDS.maxGrowthAbsolute ||
				Math.abs(growthPercent) > PERFORMANCE_THRESHOLDS.maxGrowthPercent
			) {
				this.results.warnings.push({
					type: "SIZE_REGRESSION",
					growth: growth,
					growthPercent: growthPercent.toFixed(1),
					current: currentSize,
					average: avgPreviousSize,
				});

				this.log(
					`⚠️ Bundle size regression detected: +${(growth / 1024).toFixed(1)}KB (+${growthPercent.toFixed(1)}%)`,
					"warn",
				);
			} else {
				this.log(`✅ No significant size regression detected`, "success");
			}
		}
	}

	async generateDetailedReport() {
		this.log("📋 Generating detailed budget report...", "info");

		const report = {
			timestamp: new Date().toISOString(),
			commit: process.env.GITHUB_SHA || "local",
			summary: this.results.summary,
			budgets: BUNDLE_BUDGETS,
			results: this.results,
			recommendations: this.generateRecommendations(),
		};

		// Save JSON report
		await fs.writeFile(
			"./dist/bundle-budget-report.json",
			JSON.stringify(report, null, 2),
		);

		// Generate markdown report
		const markdownReport = this.generateMarkdownReport(report);
		await fs.writeFile("./dist/BUNDLE_BUDGET_REPORT.md", markdownReport);

		return report;
	}

	generateRecommendations() {
		const recommendations = [];

		if (this.results.violations.length > 0) {
			recommendations.push(
				"🚨 **Immediate Action Required**: Bundle size violations detected",
			);
			recommendations.push("- Review and optimize large dependencies");
			recommendations.push("- Enable tree-shaking for unused code elimination");
			recommendations.push("- Consider code splitting for large features");
		}

		if (this.results.warnings.length > 0) {
			recommendations.push("⚠️ **Monitor Closely**: Approaching budget limits");
			recommendations.push("- Implement performance monitoring");
			recommendations.push("- Consider lazy loading for non-critical features");
		}

		if (this.results.summary.budgetUsage > 80) {
			recommendations.push("📊 **Optimization Opportunities**:");
			recommendations.push("- Audit and remove unused dependencies");
			recommendations.push("- Optimize images and assets");
			recommendations.push("- Use dynamic imports for code splitting");
			recommendations.push("- Enable compression in CDN/hosting");
		}

		return recommendations;
	}

	generateMarkdownReport(report) {
		return `# LiqUIdify Bundle Size Budget Report

**Generated**: ${report.timestamp}
**Commit**: ${report.commit}
**Status**: ${report.summary.status}
**Total Size**: ${(report.summary.totalSize / 1024).toFixed(1)}KB / ${(BUNDLE_BUDGETS.total.uncompressed / 1024).toFixed(1)}KB
**Budget Usage**: ${report.summary.budgetUsage}%

## S-Tier Budget Compliance

| Bundle | Status | Actual | Budget | Usage |
|--------|--------|--------|--------|-------|
| **Total** | ${report.summary.status === "PASSED" ? "✅" : "❌"} | ${(report.summary.totalSize / 1024).toFixed(1)}KB | ${(BUNDLE_BUDGETS.total.uncompressed / 1024).toFixed(1)}KB | ${report.summary.budgetUsage}% |

## Violations (${this.results.violations.length})

${
	this.results.violations
		.map(
			(v) =>
				`- ❌ **${v.type}**: ${v.bundle || v.component || v.file} - ${(v.actual / 1024).toFixed(1)}KB / ${(v.budget / 1024).toFixed(1)}KB (+${(v.overage / 1024).toFixed(1)}KB)`,
		)
		.join("\n") || "No violations detected"
}

## Warnings (${this.results.warnings.length})

${
	this.results.warnings
		.map(
			(w) =>
				`- ⚠️ **${w.type}**: ${w.bundle || w.component || w.file} - ${w.usage || w.growthPercent}% usage`,
		)
		.join("\n") || "No warnings"
}

## Recommendations

${report.recommendations.join("\n")}

## Bundle Details

### Core Bundle
- **Budget**: ${(BUNDLE_BUDGETS.core.uncompressed / 1024).toFixed(1)}KB
- **Files**: Essential components and utilities

### Animations Bundle
- **Budget**: ${(BUNDLE_BUDGETS.animations.uncompressed / 1024).toFixed(1)}KB
- **Files**: Physics and motion systems

### Advanced Bundle
- **Budget**: ${(BUNDLE_BUDGETS.advanced.uncompressed / 1024).toFixed(1)}KB
- **Files**: Complex features and integrations

---
*Generated by LiqUIdify Bundle Size Budget Enforcement*
`;
	}

	async run() {
		try {
			this.log("🚀 Starting Bundle Size Budget Enforcement...", "info");

			await this.loadHistoricalData();
			const bundleAnalysis = await this.analyzeBundleFiles();
			await this.checkBundleBudgets(bundleAnalysis);
			await this.analyzeRegressions();
			await this.saveHistoricalData();

			const report = await this.generateDetailedReport();

			this.log("📊 Budget Enforcement Summary:", "info");
			this.log(
				`   Total Size: ${(this.results.summary.totalSize / 1024).toFixed(1)}KB / ${(BUNDLE_BUDGETS.total.uncompressed / 1024).toFixed(1)}KB`,
				"info",
			);
			this.log(`   Budget Usage: ${this.results.summary.budgetUsage}%`, "info");
			this.log(
				`   Violations: ${this.results.violations.length}`,
				this.results.violations.length > 0 ? "error" : "success",
			);
			this.log(
				`   Warnings: ${this.results.warnings.length}`,
				this.results.warnings.length > 0 ? "warn" : "info",
			);

			if (this.results.violations.length > 0) {
				this.log("❌ Bundle size budget enforcement FAILED", "error");
				process.exit(1);
			} else if (this.results.warnings.length > 0) {
				this.log(
					"⚠️ Bundle size budget enforcement PASSED with warnings",
					"warn",
				);
				process.exit(0);
			} else {
				this.log("✅ Bundle size budget enforcement PASSED", "success");
				process.exit(0);
			}
		} catch (error) {
			this.log(
				`💥 Bundle size budget enforcement failed: ${error.message}`,
				"error",
			);
			process.exit(1);
		}
	}
}

// CLI interface
if (require.main === module) {
	const enforcer = new BundleSizeBudgetEnforcer();
	enforcer.run();
}

module.exports = BundleSizeBudgetEnforcer;
