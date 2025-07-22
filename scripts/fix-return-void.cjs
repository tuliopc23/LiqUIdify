#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Pattern to find return null statements in void functions
const voidReturnPatterns = [
	// Arrow functions with explicit return null
	{ pattern: /(\) => \{)([^}]*)(return null;)/g, replacement: "$1$2" },
	// Conditional returns in callbacks
	{
		pattern: /if \([^)]+\) {\s*return null;\s*}/g,
		replacement: "if ($1) { return; }",
	},
	// Simple return null statements that should be return
	{ pattern: /^\s*return null;\s*$/gm, replacement: "  return;" },
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

	// Check for patterns that indicate void return functions
	const isVoidFunction =
		content.includes("return null;") &&
		(content.includes("useEffect") ||
			content.includes("onClick") ||
			content.includes("onChange") ||
			content.includes("onFocus") ||
			content.includes("onBlur") ||
			content.includes("handleClick") ||
			content.includes("handleChange"));

	if (isVoidFunction) {
		// Replace return null; with return; in event handlers and effects
		const eventHandlerPattern =
			/(on[A-Z]\w*|handle\w*)\s*[:=]\s*\([^)]*\)\s*=>\s*{[^}]*return null;/g;
		const matches = content.match(eventHandlerPattern);
		if (matches) {
			content = content.replace(/return null;/g, (match, offset) => {
				// Check if this is inside an event handler
				const before = content.substring(Math.max(0, offset - 200), offset);
				if (
					before.match(/(on[A-Z]\w*|handle\w*)\s*[:=]\s*\([^)]*\)\s*=>\s*{/) ||
					before.includes("useEffect") ||
					before.includes("useLayoutEffect")
				) {
					fileReplacements++;
					return "return;";
				}
				return match;
			});
		}
	}

	if (fileReplacements > 0) {
		fs.writeFileSync(file, content);
		console.log(`Fixed ${fileReplacements} void returns in ${file}`);
		totalReplacements += fileReplacements;
	}
});

console.log(`\nTotal replacements: ${totalReplacements}`);
