#!/usr/bin/env bun
/**
 * CJS Require Resolution Tests
 * Tests that all flat and nested Ark UI components can be required via CJS
 */

const flatComponents = [
	"liquidify-react/button",
	"liquidify-react/badge",
	"liquidify-react/card",
];

const nestedArkComponents = [
	"liquidify-react/ark-ui/accordion",
	"liquidify-react/ark-ui/avatar",
	"liquidify-react/ark-ui/checkbox",
	"liquidify-react/ark-ui/dialog",
	"liquidify-react/ark-ui/menu",
	"liquidify-react/ark-ui/popover",
	"liquidify-react/ark-ui/select",
	"liquidify-react/ark-ui/tabs",
	"liquidify-react/ark-ui/tooltip",
];

let passed = 0;
let failed = 0;
const failures = [];

console.log("🔍 Testing CJS requires...\n");

// Test flat imports
for (const specifier of flatComponents) {
	try {
		const mod = require(specifier);
		if (typeof mod === "object" && Object.keys(mod).length > 0) {
			console.log(`✅ ${specifier}`);
			passed++;
		} else {
			console.log(`❌ ${specifier} - No exports found`);
			failed++;
			failures.push(specifier);
		}
	} catch (error) {
		console.log(`❌ ${specifier} - ${error.message}`);
		failed++;
		failures.push(specifier);
	}
}

// Test nested Ark UI imports
for (const specifier of nestedArkComponents) {
	try {
		const mod = require(specifier);
		if (typeof mod === "object" && Object.keys(mod).length > 0) {
			console.log(`✅ ${specifier}`);
			passed++;
		} else {
			console.log(`❌ ${specifier} - No exports found`);
			failed++;
			failures.push(specifier);
		}
	} catch (error) {
		console.log(`❌ ${specifier} - ${error.message}`);
		failed++;
		failures.push(specifier);
	}
}

console.log(`\n📊 CJS Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
	console.error("\n❌ Failed requires:", failures);
	process.exit(1);
}

console.log("✅ All CJS requires successful!");
