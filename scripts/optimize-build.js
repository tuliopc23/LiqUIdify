#!/usr/bin/env node

/**
 * S-tier Production Build Optimization Script
 * Ensures maximum optimization for production builds
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const terser = require("terser");
const cssnano = require("cssnano");
const postcss = require("postcss");
const { gzipSync, brotliCompressSync } = require("zlib");

const BUILD_DIR = path.join(__dirname, "..", "dist");
const OPTIMIZATION_REPORT = path.join(BUILD_DIR, "optimization-report.json");

// S-tier optimization targets
const OPTIMIZATION_TARGETS = {
	jsMinificationRatio: 0.7, // 70% reduction minimum
	cssMinificationRatio: 0.6, // 60% reduction minimum
	gzipCompressionRatio: 0.3, // 70% compression
	brotliCompressionRatio: 0.25, // 75% compression
};

async function optimizeJavaScript(filePath) {
	console.log(`🔧 Optimizing JavaScript: ${path.basename(filePath)}`);

	const originalCode = fs.readFileSync(filePath, "utf8");
	const originalSize = originalCode.length;

	// Terser options for maximum optimization
	const result = await terser.minify(originalCode, {
		compress: {
			passes: 3, // Multiple compression passes
			pure_getters: true,
			unsafe: true,
			unsafe_comps: true,
			unsafe_math: true,
			unsafe_proto: true,
			unsafe_regexp: true,
			unsafe_undefined: true,
			drop_console: true,
			drop_debugger: true,
			dead_code: true,
			evaluate: true,
			inline: 3,
			join_vars: true,
			reduce_vars: true,
			comparisons: true,
			collapse_vars: true,
			booleans: true,
			loops: true,
			if_return: true,
			hoist_funs: true,
			hoist_vars: false,
			side_effects: false,
			pure_funcs: [
				"console.log",
				"console.info",
				"console.debug",
				"console.warn",
			],
			global_defs: {
				"@__DEV__": false,
				"process.env.NODE_ENV": '"production"',
			},
		},
		mangle: {
			toplevel: true,
			eval: true,
			reserved: ["React", "ReactDOM"], // Preserve critical globals
			properties: {
				regex: /^_/, // Mangle properties starting with _
			},
		},
		format: {
			comments: false,
			ascii_only: true,
		},
		sourceMap: {
			filename: path.basename(filePath),
			url: `${path.basename(filePath)}.map`,
		},
		toplevel: true,
		module: true,
	});

	if (result.error) {
		throw result.error;
	}

	// Write optimized code
	fs.writeFileSync(filePath, result.code);
	if (result.map) {
		fs.writeFileSync(`${filePath}.map`, result.map);
	}

	const optimizedSize = result.code.length;
	const ratio = optimizedSize / originalSize;

	return {
		originalSize,
		optimizedSize,
		ratio,
		saved: originalSize - optimizedSize,
	};
}

async function optimizeCSS(filePath) {
	console.log(`🎨 Optimizing CSS: ${path.basename(filePath)}`);

	const originalCSS = fs.readFileSync(filePath, "utf8");
	const originalSize = originalCSS.length;

	// PostCSS with cssnano for maximum optimization
	const result = await postcss([
		cssnano({
			preset: [
				"advanced",
				{
					discardComments: {
						removeAll: true,
					},
					discardDuplicates: true,
					discardEmpty: true,
					discardOverridden: true,
					mergeIdents: true,
					mergeRules: true,
					minifyFontValues: true,
					minifyGradients: true,
					minifyParams: true,
					minifySelectors: true,
					normalizeCharset: true,
					normalizeDisplayValues: true,
					normalizePositions: true,
					normalizeRepeatStyle: true,
					normalizeTimingFunctions: true,
					normalizeUnicode: true,
					normalizeUrl: true,
					normalizeWhitespace: true,
					orderedValues: true,
					reduceIdents: true,
					reduceInitial: true,
					reduceTransforms: true,
					svgo: true,
					uniqueSelectors: true,
					zindex: false, // Preserve z-index for glass effects
				},
			],
		}),
	]).process(originalCSS, {
		from: filePath,
		to: filePath,
		map: { inline: false },
	});

	fs.writeFileSync(filePath, result.css);
	if (result.map) {
		fs.writeFileSync(`${filePath}.map`, result.map.toString());
	}

	const optimizedSize = result.css.length;
	const ratio = optimizedSize / originalSize;

	return {
		originalSize,
		optimizedSize,
		ratio,
		saved: originalSize - optimizedSize,
	};
}

function createCompressedVersions(filePath) {
	console.log(`📦 Creating compressed versions: ${path.basename(filePath)}`);

	const content = fs.readFileSync(filePath);
	const originalSize = content.length;

	// Gzip compression
	const gzipped = gzipSync(content, {
		level: 9, // Maximum compression
	});
	fs.writeFileSync(`${filePath}.gz`, gzipped);
	const gzipSize = gzipped.length;
	const gzipRatio = gzipSize / originalSize;

	// Brotli compression
	const brotlied = brotliCompressSync(content, {
		params: {
			[require("zlib").constants.BROTLI_PARAM_QUALITY]: 11, // Maximum quality
		},
	});
	fs.writeFileSync(`${filePath}.br`, brotlied);
	const brotliSize = brotlied.length;
	const brotliRatio = brotliSize / originalSize;

	return {
		originalSize,
		gzipSize,
		gzipRatio,
		brotliSize,
		brotliRatio,
	};
}

async function generateTreeShakingReport() {
	console.log("🌳 Analyzing tree-shaking effectiveness...");

	// Use webpack-bundle-analyzer data if available
	const statsFile = path.join(BUILD_DIR, "stats.json");
	if (fs.existsSync(statsFile)) {
		const stats = JSON.parse(fs.readFileSync(statsFile, "utf8"));

		// Find unused exports
		const unusedExports = [];
		if (stats.modules) {
			stats.modules.forEach((module) => {
				if (module.usedExports && module.providedExports) {
					const unused = module.providedExports.filter(
						(exp) => !module.usedExports.includes(exp),
					);
					if (unused.length > 0) {
						unusedExports.push({
							module: module.name,
							unused,
						});
					}
				}
			});
		}

		return {
			totalModules: stats.modules ? stats.modules.length : 0,
			unusedExports,
			treeShakingEffective: unusedExports.length === 0,
		};
	}

	return {
		totalModules: 0,
		unusedExports: [],
		treeShakingEffective: null,
	};
}

async function optimizeBuild() {
	console.log("🚀 S-tier Production Build Optimization\n");

	const report = {
		timestamp: new Date().toISOString(),
		targets: OPTIMIZATION_TARGETS,
		results: {
			javascript: {},
			css: {},
			compression: {},
			treeShaking: {},
		},
		summary: {
			passed: true,
			totalSaved: 0,
		},
	};

	try {
		// Optimize JavaScript files
		const jsFiles = fs
			.readdirSync(BUILD_DIR)
			.filter((f) => f.endsWith(".js") && !f.endsWith(".min.js"))
			.map((f) => path.join(BUILD_DIR, f));

		for (const file of jsFiles) {
			const result = await optimizeJavaScript(file);
			report.results.javascript[path.basename(file)] = result;
			report.summary.totalSaved += result.saved;

			if (result.ratio > OPTIMIZATION_TARGETS.jsMinificationRatio) {
				console.log(
					`  ❌ Insufficient minification: ${(result.ratio * 100).toFixed(1)}%`,
				);
				report.summary.passed = false;
			} else {
				console.log(
					`  ✅ Minified to ${(result.ratio * 100).toFixed(1)}% of original`,
				);
			}
		}

		// Optimize CSS files
		const cssFiles = fs
			.readdirSync(BUILD_DIR)
			.filter((f) => f.endsWith(".css") && !f.endsWith(".min.css"))
			.map((f) => path.join(BUILD_DIR, f));

		for (const file of cssFiles) {
			const result = await optimizeCSS(file);
			report.results.css[path.basename(file)] = result;
			report.summary.totalSaved += result.saved;

			if (result.ratio > OPTIMIZATION_TARGETS.cssMinificationRatio) {
				console.log(
					`  ❌ Insufficient minification: ${(result.ratio * 100).toFixed(1)}%`,
				);
				report.summary.passed = false;
			} else {
				console.log(
					`  ✅ Minified to ${(result.ratio * 100).toFixed(1)}% of original`,
				);
			}
		}

		// Create compressed versions
		console.log("\n📦 Creating compressed versions...\n");
		const allFiles = [...jsFiles, ...cssFiles].filter(
			(f) => !f.includes(".map"),
		);

		for (const file of allFiles) {
			const result = createCompressedVersions(file);
			report.results.compression[path.basename(file)] = result;

			const gzipOk =
				result.gzipRatio <= OPTIMIZATION_TARGETS.gzipCompressionRatio;
			const brotliOk =
				result.brotliRatio <= OPTIMIZATION_TARGETS.brotliCompressionRatio;

			console.log(`  ${path.basename(file)}:`);
			console.log(
				`    Gzip: ${(result.gzipRatio * 100).toFixed(1)}% ${gzipOk ? "✅" : "❌"}`,
			);
			console.log(
				`    Brotli: ${(result.brotliRatio * 100).toFixed(1)}% ${brotliOk ? "✅" : "❌"}`,
			);

			if (!gzipOk || !brotliOk) {
				report.summary.passed = false;
			}
		}

		// Tree-shaking analysis
		console.log("\n🌳 Tree-shaking analysis...\n");
		report.results.treeShaking = await generateTreeShakingReport();

		if (report.results.treeShaking.unusedExports.length > 0) {
			console.log("  ⚠️  Found unused exports:");
			report.results.treeShaking.unusedExports.forEach(({ module, unused }) => {
				console.log(`    ${module}: ${unused.join(", ")}`);
			});
		} else {
			console.log("  ✅ No unused exports detected");
		}

		// Write report
		fs.writeFileSync(OPTIMIZATION_REPORT, JSON.stringify(report, null, 2));

		// Summary
		console.log("\n📊 Optimization Summary\n");
		console.log(
			`Total size saved: ${(report.summary.totalSaved / 1024).toFixed(2)}KB`,
		);
		console.log(
			`Status: ${report.summary.passed ? "✅ S-tier optimization achieved" : "❌ Optimization targets not met"}`,
		);
		console.log(`\nDetailed report: ${OPTIMIZATION_REPORT}`);

		if (!report.summary.passed) {
			process.exit(1);
		}
	} catch (error) {
		console.error("❌ Optimization failed:", error.message);
		process.exit(1);
	}
}

// Install required dependencies if not present
function ensureDependencies() {
	const requiredDeps = ["terser", "postcss", "cssnano"];
	const missing = requiredDeps.filter((dep) => {
		try {
			require.resolve(dep);
			return false;
		} catch {
			return true;
		}
	});

	if (missing.length > 0) {
		console.log(`Installing required dependencies: ${missing.join(", ")}...`);
		execSync(`npm install -D ${missing.join(" ")}`, { stdio: "inherit" });
	}
}

// Run optimization
ensureDependencies();
optimizeBuild();
