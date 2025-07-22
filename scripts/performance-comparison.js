#!/usr/bin/env node

console.log("🏁 Performance Comparison: Legacy vs OXC\n");

import { execSync } from "child_process";

// Function to measure execution time
function measureTime(name, command) {
	console.log(`⏱️  Running ${name}...`);
	const start = performance.now();

	try {
		execSync(command, { stdio: "pipe" });
		const end = performance.now();
		const duration = ((end - start) / 1000).toFixed(2);
		console.log(`  ✅ ${name}: ${duration}s`);
		return parseFloat(duration);
	} catch (error) {
		const end = performance.now();
		const duration = ((end - start) / 1000).toFixed(2);
		console.log(`  ❌ ${name}: ${duration}s (with errors)`);
		return parseFloat(duration);
	}
}

console.log("📊 Linting Performance:");
const eslintTime = measureTime("ESLint", "bun run lint:eslint");
const oxlintTime = measureTime("OXlint", "bun run lint");

console.log(`\n🚀 Performance Results:`);
console.log(`  ESLint: ${eslintTime}s`);
console.log(`  OXlint: ${oxlintTime}s`);

if (oxlintTime < eslintTime) {
	const improvement = (((eslintTime - oxlintTime) / eslintTime) * 100).toFixed(
		1,
	);
	console.log(`  🎉 OXlint is ${improvement}% faster!`);
} else {
	console.log(`  ⚠️  ESLint was faster this time`);
}

console.log(`\n📈 Build Performance:`);
const viteBuildTime = measureTime("Vite Build", "bun run build:legacy");
const oxcBuildTime = measureTime("OXC Build", "bun run build:oxc");

console.log(`\n🏗️  Build Results:`);
console.log(`  Vite: ${viteBuildTime}s`);
console.log(`  OXC: ${oxcBuildTime}s`);

if (oxcBuildTime < viteBuildTime) {
	const improvement = (
		((viteBuildTime - oxcBuildTime) / viteBuildTime) *
		100
	).toFixed(1);
	console.log(`  🎉 OXC build is ${improvement}% faster!`);
} else {
	console.log(`  ⚠️  Vite build was faster this time`);
}
