#!/usr/bin/env node

import { execSync } from "node:child_process";

console.log("🔍 OXC Toolchain Validation\n");

const tests = [
	{
		name: "OXlint Configuration",
		command: "bunx oxlint --version",
		successMessage: "OXlint is properly installed",
	},
	{
		name: "TypeScript Compilation",
		command: "bunx tsc --noEmit",
		successMessage: "TypeScript compilation successful",
	},
	{
		name: "OXlint Analysis",
		command: "bunx oxlint src --quiet",
		successMessage: "Code passes OXlint analysis",
	},
	{
		name: "Build with OXC",
		command: "bun run build:oxc",
		successMessage: "OXC-enhanced build successful",
	},
];

let passed = 0;
let failed = 0;

for (const test of tests) {
	try {
		console.log(`⏳ Testing: ${test.name}`);
		execSync(test.command, { stdio: "pipe" });
		console.log(`✅ ${test.successMessage}`);
		passed++;
	} catch {
		console.log(`❌ ${test.name} failed`);
		failed++;
	}
}

console.log(`\n📊 Validation Results:`);
console.log(`  ✅ Passed: ${passed}`);
console.log(`  ❌ Failed: ${failed}`);

if (failed === 0) {
	console.log(`\n🎉 All tests passed! OXC toolchain is ready.`);
	process.exit(0);
} else {
	console.log(`\n⚠️  Some tests failed. Please check the configuration.`);
	process.exit(1);
}
