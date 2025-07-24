#!/usr/bin/env bun

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { minify } from "terser";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, "..", "dist");
const BUNDLES_DIR = join(DIST_DIR, "bundles");

// Ensure dist directory exists
if (!existsSync(DIST_DIR)) {
	mkdirSync(DIST_DIR, { recursive: true });
}

const BUNDLE_MAPPING = {
	"core.min.js": "bundles/core-bundle.mjs",
	"animations.min.js": "bundles/animations-bundle.mjs",
	"advanced.min.js": "bundles/advanced-bundle.mjs",
};

async function minifyBundle(inputPath, outputPath) {
	try {
		const code = readFileSync(inputPath, "utf8");

		const result = await minify(code, {
			compress: {
				dead_code: true,
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ["console.log", "console.info", "console.debug"],
				passes: 2,
				unsafe: true,
				unsafe_comps: true,
				unsafe_proto: true,
				unsafe_regexp: true,
			},
			mangle: {
				toplevel: true,
				properties: {
					regex: /^_/,
				},
			},
			format: {
				comments: false,
			},
			sourceMap: {
				filename: outputPath.split("/").pop(),
				url: outputPath.split("/").pop() + ".map",
			},
		});

		if (result.code) {
			writeFileSync(outputPath, result.code);
			console.log(
				`✅ Minified: ${outputPath} (${(result.code.length / 1024).toFixed(2)}KB)`,
			);

			if (result.map) {
				writeFileSync(outputPath + ".map", result.map);
			}
		}
	} catch (error) {
		console.error(`❌ Failed to minify ${inputPath}:`, error.message);
	}
}

async function buildMinifiedBundles() {
	console.log("🔨 Building minified bundles for S-tier requirements...\n");

	for (const [outputName, inputPath] of Object.entries(BUNDLE_MAPPING)) {
		const fullInputPath = join(DIST_DIR, inputPath);
		const fullOutputPath = join(DIST_DIR, outputName);

		if (existsSync(fullInputPath)) {
			await minifyBundle(fullInputPath, fullOutputPath);
		} else {
			console.warn(`⚠️  Source file not found: ${fullInputPath}`);
		}
	}

	console.log("\n✨ Minified bundles ready for analysis!");
}

// Run the build
buildMinifiedBundles().catch(console.error);
