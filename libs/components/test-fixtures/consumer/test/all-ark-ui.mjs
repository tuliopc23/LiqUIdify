#!/usr/bin/env bun
/**
 * All Ark UI Components Test
 * Dynamically discovers and tests all 47 Ark UI components
 */

import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

console.log("🔍 Discovering all Ark UI components...\n");

// Resolve to the liquidify-react package root
let packageRoot;
try {
	// Try to resolve the package.json to find the package root
	const packageJsonPath = require.resolve("liquidify-react/package.json");
	packageRoot = dirname(packageJsonPath);
} catch (error) {
	console.error("❌ Cannot resolve liquidify-react package:", error.message);
	process.exit(1);
}

const arkUiPath = join(packageRoot, "libs/components/dist/components/ark-ui");

let components = [];
try {
	components = readdirSync(arkUiPath, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);
} catch (error) {
	console.error(`❌ Cannot read ark-ui directory at ${arkUiPath}:`, error.message);
	process.exit(1);
}

console.log(`📦 Found ${components.length} Ark UI components\n`);

let esmPassed = 0;
let esmFailed = 0;
let cjsPassed = 0;
let cjsFailed = 0;
const failures = [];

// Test each component with both ESM and CJS
for (const component of components) {
	const specifier = `liquidify-react/ark-ui/${component}`;
	
	// Test ESM import
	try {
		const mod = await import(specifier);
		if (typeof mod === "object" && Object.keys(mod).length > 0) {
			console.log(`✅ ESM: ${specifier}`);
			esmPassed++;
		} else {
			console.log(`⚠️  ESM: ${specifier} - No exports found`);
			esmFailed++;
			failures.push({ component, format: "ESM", reason: "No exports" });
		}
	} catch (error) {
		console.log(`❌ ESM: ${specifier} - ${error.message}`);
		esmFailed++;
		failures.push({ component, format: "ESM", reason: error.message });
	}
	
	// Test CJS require
	try {
		const mod = require(specifier);
		if (typeof mod === "object" && Object.keys(mod).length > 0) {
			console.log(`✅ CJS: ${specifier}`);
			cjsPassed++;
		} else {
			console.log(`⚠️  CJS: ${specifier} - No exports found`);
			cjsFailed++;
			failures.push({ component, format: "CJS", reason: "No exports" });
		}
	} catch (error) {
		console.log(`❌ CJS: ${specifier} - ${error.message}`);
		cjsFailed++;
		failures.push({ component, format: "CJS", reason: error.message });
	}
}

console.log(`\n📊 All Ark UI Components Results:`);
console.log(`   ESM: ${esmPassed} passed, ${esmFailed} failed`);
console.log(`   CJS: ${cjsPassed} passed, ${cjsFailed} failed`);
console.log(`   Total: ${esmPassed + cjsPassed} passed, ${esmFailed + cjsFailed} failed`);

if (failures.length > 0) {
	console.error("\n❌ Failed imports:");
	for (const failure of failures) {
		console.error(`   - ${failure.component} (${failure.format}): ${failure.reason}`);
	}
	process.exit(1);
}

console.log(`\n✅ All ${components.length} Ark UI components import successfully in both ESM and CJS!`);
