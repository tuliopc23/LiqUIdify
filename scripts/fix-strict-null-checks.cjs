#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Patterns to replace undefined with null
const replacements = [
	// Direct undefined assignments
	{ pattern: /= undefined;/g, replacement: "= null;" },
	// setState with undefined
	{ pattern: /setState\(undefined\)/g, replacement: "setState(null)" },
	// Type assertions with undefined
	{ pattern: /: undefined/g, replacement: ": null" },
	// Return undefined statements
	{ pattern: /return undefined;/g, replacement: "return null;" },
	// Ternary with undefined
	{ pattern: /\? undefined :/g, replacement: "? null :" },
	{ pattern: /: undefined\)/g, replacement: ": null)" },
];

// Find all TypeScript files
const files = glob.sync("src/**/*.{ts,tsx}", {
	ignore: [
		"**/node_modules/**",
		"**/*.test.*",
		"**/*.spec.*",
		"**/*.stories.*",
	],
});

let totalReplacements = 0;

files.forEach((file) => {
	let content = fs.readFileSync(file, "utf8");
	let fileReplacements = 0;

	replacements.forEach(({ pattern, replacement }) => {
		const matches = content.match(pattern);
		if (matches) {
			fileReplacements += matches.length;
			content = content.replace(pattern, replacement);
		}
	});

	if (fileReplacements > 0) {
		fs.writeFileSync(file, content);
		console.log(`Fixed ${fileReplacements} occurrences in ${file}`);
		totalReplacements += fileReplacements;
	}
});

console.log(`\nTotal replacements: ${totalReplacements}`);
