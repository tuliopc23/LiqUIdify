#!/usr/bin/env bun
/**
 * ESM Import Resolution Tests
 * Tests that all flat and nested Ark UI components can be imported via ESM
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

console.log("🔍 Testing ESM imports...\n");

// Test flat imports
for (const specifier of flatComponents) {
	try {
		const mod = await import(specifier);
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
		const mod = await import(specifier);
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

console.log(`\n📊 ESM Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
	console.error("\n❌ Failed imports:", failures);
	process.exit(1);
}

console.log("✅ All ESM imports successful!");
