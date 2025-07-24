#!/usr/bin/env node

/**
 * S-Tier Validation Script
 *
 * This script runs a comprehensive validation of the LiqUIdify library
 * to verify it meets S-tier quality standards.
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");
const chalk = require("chalk");

// Import validation modules
const {
	sTierValidator,
} = require("../dist/quality-assurance/s-tier-validation");

async function main() {
	console.log(chalk.blue.bold("\n=== LiqUIdify S-Tier Validation ===\n"));

	try {
		// Build the library first
		console.log(chalk.yellow("Building library..."));
		execSync("npm run build:optimized", { stdio: "inherit" });

		// Run bundle size check
		console.log(chalk.yellow("\nChecking bundle size..."));
		execSync("npm run size", { stdio: "inherit" });

		// Run accessibility tests
		console.log(chalk.yellow("\nRunning accessibility tests..."));
		execSync("npm run test:a11y", { stdio: "inherit" });

		// Run S-tier validation
		console.log(chalk.yellow("\nRunning S-tier validation..."));
		const results = await sTierValidator.runValidation();

		// Generate validation report
		const report = sTierValidator.generateValidationReport(results);
		const reportPath = path.join(process.cwd(), "s-tier-validation-report.md");
		fs.writeFileSync(reportPath, report);

		// Generate deployment checklist
		const checklist = sTierValidator.createDeploymentChecklist();
		const checklistPath = path.join(
			process.cwd(),
			"s-tier-deployment-checklist.md",
		);
		fs.writeFileSync(checklistPath, checklist.join("\n"));

		// Generate sign-off document
		const signOffDoc = sTierValidator.createSignOffDocument(results);
		const signOffPath = path.join(process.cwd(), "s-tier-sign-off.md");
		fs.writeFileSync(signOffPath, signOffDoc);

		// Calculate overall score
		const totalScore =
			results.reduce((sum, result) => sum + result.score, 0) / results.length;

		// Print summary
		console.log(
			chalk.green.bold(
				`\nValidation complete! Overall score: ${totalScore.toFixed(1)}/100`,
			),
		);
		console.log(chalk.green(`Reports generated:`));
		console.log(`- Validation Report: ${reportPath}`);
		console.log(`- Deployment Checklist: ${checklistPath}`);
		console.log(`- Sign-off Document: ${signOffPath}`);

		// Final assessment
		if (totalScore >= 95) {
			console.log(
				chalk.green.bold("\n✅ LiqUIdify meets S-tier quality standards!"),
			);
		} else {
			console.log(
				chalk.yellow.bold(
					"\n⚠️ LiqUIdify is close to S-tier quality but needs some improvements.",
				),
			);

			// Find categories that need improvement
			const categoriesNeedingImprovement = results
				.filter((result) => result.score < 95)
				.map((result) => result.category);

			console.log(
				chalk.yellow(
					`Areas needing improvement: ${categoriesNeedingImprovement.join(", ")}`,
				),
			);
		}
	} catch (error) {
		console.error(chalk.red.bold("\n❌ Validation failed:"));
		console.error(chalk.red(error.message));
		process.exit(1);
	}
}

main().catch((error) => {
	console.error(chalk.red.bold("Unexpected error:"));
	console.error(chalk.red(error));
	process.exit(1);
});
