#!/usr/bin/env bun

/**
 * Verification script for Bun + OXC setup
 * Ensures all tools are properly configured and working
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const colors = {
	reset: "\u001B[0m",
	green: "\u001B[32m",
	yellow: "\u001B[33m",
	blue: "\u001B[34m",
	red: "\u001B[31m",
	cyan: "\u001B[36m",
};

function log(message, color = "reset") {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

class BunOxcVerifier {
	constructor() {
		this.checks = [];
		this.warnings = [];
		this.errors = [];
	}

	async checkBunInstallation() {
		log("🔍 Checking Bun installation...", "cyan");

		try {
			const bunVersion = execSync("bun --version", { encoding: "utf8" }).trim();
			this.checks.push(`✅ Bun ${bunVersion} is installed`);
			log(`✅ Bun ${bunVersion} is installed`, "green");

			// Check if version is 1.0+
			const majorVersion = Number.parseInt(bunVersion.split(".")[0]);
			if (majorVersion < 1) {
				this.warnings.push(
					`⚠️ Bun version ${bunVersion} is below 1.0. Consider upgrading.`,
				);
			}
		} catch {
			this.errors.push("❌ Bun is not installed or not in PATH");
			log("❌ Bun is not installed or not in PATH", "red");
		}
	}

	async checkOxcInstallation() {
		log("🔍 Checking OXC tools installation...", "cyan");

		try {
			// Check oxlint
			const oxlintVersion = execSync("bunx oxlint --version", {
				encoding: "utf8",
			}).trim();
			this.checks.push(`✅ oxlint ${oxlintVersion} is available`);
			log(`✅ oxlint ${oxlintVersion} is available`, "green");
		} catch {
			this.errors.push("❌ oxlint is not available");
			log("❌ oxlint is not available", "red");
		}

		try {
			// Check if oxc package is installed
			const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
			if (packageJson.dependencies?.oxc || packageJson.devDependencies?.oxc) {
				this.checks.push("✅ oxc package is installed");
				log("✅ oxc package is installed", "green");
			} else {
				this.warnings.push("⚠️ oxc package not found in dependencies");
			}

			if (
				packageJson.dependencies?.oxlint ||
				packageJson.devDependencies?.oxlint
			) {
				this.checks.push("✅ oxlint package is installed");
				log("✅ oxlint package is installed", "green");
			} else {
				this.warnings.push("⚠️ oxlint package not found in dependencies");
			}
		} catch {
			this.errors.push("❌ Could not read package.json");
		}
	}

	async checkConfigurationFiles() {
		log("🔍 Checking configuration files...", "cyan");

		const configFiles = [
			{ file: "oxc.config.json", required: true },
			{ file: ".oxlintrc.json", required: true },
			{ file: "package.json", required: true },
			{ file: "tsconfig.json", required: true },
		];

		for (const { file, required } of configFiles) {
			if (existsSync(file)) {
				this.checks.push(`✅ ${file} exists`);
				log(`✅ ${file} exists`, "green");

				// Validate JSON syntax
				try {
					JSON.parse(readFileSync(file, "utf8"));
					this.checks.push(`✅ ${file} has valid JSON syntax`);
				} catch {
					this.errors.push(`❌ ${file} has invalid JSON syntax`);
					log(`❌ ${file} has invalid JSON syntax`, "red");
				}
			} else if (required) {
				this.errors.push(`❌ Required file ${file} is missing`);
				log(`❌ Required file ${file} is missing`, "red");
			} else {
				this.warnings.push(`⚠️ Optional file ${file} is missing`);
			}
		}
	}

	async checkPackageJsonScripts() {
		log("🔍 Checking package.json scripts...", "cyan");

		try {
			const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
			const scripts = packageJson.scripts || {};

			const expectedScripts = [
				"lint",
				"lint:fix",
				"lint:ci",
				"type-check",
				"build",
				"test",
			];

			for (const script of expectedScripts) {
				if (scripts[script]) {
					this.checks.push(`✅ Script "${script}" is defined`);
					log(`✅ Script "${script}" is defined`, "green");

					// Check if script uses Bun/OXC
					if (script.startsWith("lint") && scripts[script].includes("oxlint")) {
						this.checks.push(`✅ Script "${script}" uses oxlint`);
					} else if (
						script.startsWith("lint") &&
						!scripts[script].includes("oxlint")
					) {
						this.warnings.push(`⚠️ Script "${script}" doesn't use oxlint`);
					}
				} else {
					this.warnings.push(`⚠️ Script "${script}" is missing`);
				}
			}

			// Check for Node.js references
			const scriptString = JSON.stringify(scripts);
			if (scriptString.includes("npm ") || scriptString.includes("npx ")) {
				this.warnings.push(
					"⚠️ Some scripts still use npm/npx instead of bun/bunx",
				);
			}

			// Check engines
			if (packageJson.engines?.bun) {
				this.checks.push("✅ Bun engine requirement is specified");
				log("✅ Bun engine requirement is specified", "green");
			} else {
				this.warnings.push("⚠️ Bun engine requirement not specified");
			}
		} catch {
			this.errors.push("❌ Could not parse package.json");
		}
	}

	async checkOxcConfiguration() {
		log("🔍 Checking OXC configuration...", "cyan");

		try {
			const oxcConfig = JSON.parse(readFileSync("oxc.config.json", "utf8"));

			// Check environment
			if (oxcConfig.env?.bun) {
				this.checks.push("✅ Bun environment is configured in oxc.config.json");
				log("✅ Bun environment is configured in oxc.config.json", "green");
			} else {
				this.warnings.push(
					"⚠️ Bun environment not configured in oxc.config.json",
				);
			}

			// Check JSX configuration
			if (oxcConfig.parser?.typescript?.jsx?.runtime === "automatic") {
				this.checks.push("✅ JSX automatic runtime is configured");
				log("✅ JSX automatic runtime is configured", "green");
			} else {
				this.warnings.push("⚠️ JSX automatic runtime not configured");
			}

			// Check resolver aliases
			if (oxcConfig.resolver?.alias) {
				this.checks.push("✅ Path aliases are configured");
				log("✅ Path aliases are configured", "green");
			} else {
				this.warnings.push("⚠️ Path aliases not configured");
			}
		} catch {
			this.errors.push("❌ Could not parse oxc.config.json");
		}

		try {
			const oxlintConfig = JSON.parse(readFileSync(".oxlintrc.json", "utf8"));

			// Check plugins
			const expectedPlugins = ["react", "typescript", "jsx-a11y"];
			const configuredPlugins = oxlintConfig.plugins || [];

			for (const plugin of expectedPlugins) {
				if (configuredPlugins.includes(plugin)) {
					this.checks.push(`✅ Plugin "${plugin}" is configured`);
					log(`✅ Plugin "${plugin}" is configured`, "green");
				} else {
					this.warnings.push(`⚠️ Plugin "${plugin}" is not configured`);
				}
			}

			// Check environment
			if (oxlintConfig.env?.bun) {
				this.checks.push("✅ Bun environment is configured in .oxlintrc.json");
				log("✅ Bun environment is configured in .oxlintrc.json", "green");
			} else {
				this.warnings.push(
					"⚠️ Bun environment not configured in .oxlintrc.json",
				);
			}
		} catch {
			this.errors.push("❌ Could not parse .oxlintrc.json");
		}
	}

	async runFunctionalTests() {
		log("🔍 Running functional tests...", "cyan");

		// Test linting
		try {
			execSync("bun run lint", { stdio: "pipe" });
			this.checks.push("✅ Linting command works");
			log("✅ Linting command works", "green");
		} catch {
			this.errors.push("❌ Linting command failed");
			log("❌ Linting command failed", "red");
		}

		// Test type checking
		try {
			execSync("bun run type-check", { stdio: "pipe" });
			this.checks.push("✅ Type checking works");
			log("✅ Type checking works", "green");
		} catch {
			this.warnings.push("⚠️ Type checking failed (may have type errors)");
		}

		// Test build
		try {
			execSync("bun run build:simple", { stdio: "pipe" });
			this.checks.push("✅ Build command works");
			log("✅ Build command works", "green");
		} catch {
			this.warnings.push("⚠️ Build command failed");
		}
	}

	async checkLegacyFiles() {
		log("🔍 Checking for legacy Node.js files...", "cyan");

		const legacyFiles = [
			"package-lock.json",
			".eslintrc.js",
			".eslintrc.json",
			"eslint.config.js",
			".eslintignore",
		];

		for (const file of legacyFiles) {
			if (existsSync(file)) {
				this.warnings.push(`⚠️ Legacy file ${file} still exists`);
				log(`⚠️ Legacy file ${file} still exists`, "yellow");
			} else {
				this.checks.push(`✅ Legacy file ${file} has been removed`);
			}
		}
	}

	generateReport() {
		const report = {
			timestamp: new Date().toISOString(),
			totalChecks: this.checks.length,
			totalWarnings: this.warnings.length,
			totalErrors: this.errors.length,
			checks: this.checks,
			warnings: this.warnings,
			errors: this.errors,
			success: this.errors.length === 0,
			score: Math.round(
				(this.checks.length /
					(this.checks.length + this.warnings.length + this.errors.length)) *
					100,
			),
		};

		const reportContent = `
# Bun + OXC Setup Verification Report

**Date**: ${report.timestamp}
**Status**: ${report.success ? "✅ PASSED" : "❌ FAILED"}
**Score**: ${report.score}%
**Checks Passed**: ${report.totalChecks}
**Warnings**: ${report.totalWarnings}
**Errors**: ${report.totalErrors}

## ✅ Passed Checks

${report.checks.map((check) => check).join("\\n")}

## ⚠️ Warnings

${report.warnings.map((warning) => warning).join("\\n") || "None"}

## ❌ Errors

${report.errors.map((error) => error).join("\\n") || "None"}

## 🎯 Recommendations

${report.errors.length > 0 ? "### Critical Issues (Must Fix)" : ""}
${report.errors.map((error) => `- ${error.replace("❌ ", "")}`).join("\\n")}

${report.warnings.length > 0 ? "### Improvements (Should Fix)" : ""}
${report.warnings.map((warning) => `- ${warning.replace("⚠️ ", "")}`).join("\\n")}

## 🚀 Next Steps

${
	report.success
		? "✅ Your Bun + OXC setup is working correctly!"
		: "❌ Please fix the errors above before proceeding."
}

### Commands to run:
\`\`\`bash
# Verify everything is working
bun run verify-bun

# Run linting
bun run lint

# Run type checking  
bun run type-check

# Run tests
bun run test

# Build the project
bun run build
\`\`\`
`;

		return { report, reportContent };
	}

	async run() {
		log("🚀 Starting Bun + OXC setup verification...", "blue");
		log("=".repeat(60), "blue");

		await this.checkBunInstallation();
		await this.checkOxcInstallation();
		await this.checkConfigurationFiles();
		await this.checkPackageJsonScripts();
		await this.checkOxcConfiguration();
		await this.runFunctionalTests();
		await this.checkLegacyFiles();

		const { report, reportContent } = this.generateReport();

		log("=".repeat(60), "blue");

		if (report.success) {
			log("🎉 Verification completed successfully!", "green");
			log(
				`📊 Score: ${report.score}% (${report.totalChecks} checks passed)`,
				"green",
			);
		} else {
			log("❌ Verification completed with errors", "red");
			log(
				`📊 Score: ${report.score}% (${report.totalErrors} errors, ${report.totalWarnings} warnings)`,
				"red",
			);
		}

		if (report.totalWarnings > 0) {
			log(`⚠️ ${report.totalWarnings} warnings found`, "yellow");
		}

		// Write report to file
		try {
			const fs = await import("node:fs");
			fs.writeFileSync("./BUN_OXC_VERIFICATION_REPORT.md", reportContent);
			log(
				"\\n📋 Verification report saved to BUN_OXC_VERIFICATION_REPORT.md",
				"blue",
			);
		} catch {
			log("⚠️ Could not save verification report", "yellow");
		}

		return report.success;
	}
}

// Run verification if this script is executed directly
if (import.meta.main) {
	const verifier = new BunOxcVerifier();
	const success = await verifier.run();
	process.exit(success ? 0 : 1);
}

export default BunOxcVerifier;
