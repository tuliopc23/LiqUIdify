#!/usr/bin/env node

/**
 * Verify deployment readiness for Vercel
 */

import fs from "fs";
import path from "path";

console.log("🔍 Verifying deployment readiness...\n");

const checks = {
	"package.json exists": () => fs.existsSync("package.json"),
	"vercel.json exists": () => fs.existsSync("vercel.json"),
	"build script exists": () => {
		const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
		return pkg.scripts && pkg.scripts.build;
	},
	"build-storybook script exists": () => {
		const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
		return pkg.scripts && pkg.scripts["build-storybook"];
	},
	"postcss.config.js exists": () => fs.existsSync("postcss.config.js"),
	"tailwind.config.js exists": () => fs.existsSync("tailwind.config.js"),
	"src directory exists": () => fs.existsSync("src"),
	"storybook config exists": () => fs.existsSync(".storybook"),
};

let allPassed = true;

Object.entries(checks).forEach(([name, check]) => {
	try {
		const passed = check();
		console.log(`${passed ? "✅" : "❌"} ${name}`);
		if (!passed) allPassed = false;
	} catch (error) {
		console.log(`❌ ${name} - Error: ${error.message}`);
		allPassed = false;
	}
});

console.log("\n📋 Build Commands:");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
console.log(`  - build: ${pkg.scripts.build || "NOT FOUND"}`);
console.log(
	`  - build-storybook: ${pkg.scripts["build-storybook"] || "NOT FOUND"}`,
);

console.log("\n🚀 Vercel Configuration:");
try {
	const vercelConfig = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
	console.log(`  - Build Command: ${vercelConfig.buildCommand}`);
	console.log(`  - Output Directory: ${vercelConfig.outputDirectory}`);
	console.log(`  - Install Command: ${vercelConfig.installCommand}`);
} catch (error) {
	console.log("  ❌ Could not read vercel.json");
}

console.log(
	"\n" +
		(allPassed
			? "✅ Ready for deployment!"
			: "❌ Please fix the issues above before deploying."),
);
