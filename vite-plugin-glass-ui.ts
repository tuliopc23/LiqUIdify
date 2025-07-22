import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";

interface GlassUIPluginOptions {
	/**
	 * Enable bundle splitting
	 */
	splitBundles?: boolean;

	/**
	 * Target bundle sizes in KB
	 */
	bundleSizes?: {
		core?: number;
		animations?: number;
		advanced?: number;
	};

	/**
	 * Enable tree shaking markers
	 */
	treeShaking?: boolean;

	/**
	 * Analyze bundle sizes
	 */
	analyze?: boolean;

	/**
	 * Minify CSS
	 */
	minifyCSS?: boolean;
}

export function glassUIPlugin(options: GlassUIPluginOptions = {}): Plugin {
	const {
		splitBundles = true,
		bundleSizes = {
			core: 15,
			animations: 10,
			advanced: 8,
		},
		treeShaking = true,
		analyze = false,
		minifyCSS = true,
	} = options;

	const bundleSizeMap = new Map<string, number>();

	return {
		name: "vite-plugin-glass-ui",

		config() {
			return {
				build: {
					rollupOptions: {
						output: {
							manualChunks: splitBundles
								? {
										"glass-ui-core": [
											"src/components/glass-button/index.ts",
											"src/components/glass-card/index.ts",
											"src/components/glass-input/index.ts",
											"src/core/base-component.ts",
											"src/lib/glass-utils.ts",
										],
										"glass-ui-animations": [
											"src/hooks/use-glass-animations.ts",
											"src/lib/glass-animations.ts",
											"src/components/glass-loading/index.ts",
											"src/components/glass-progress/index.ts",
										],
										"glass-ui-advanced": [
											"src/components/glass-modal/index.ts",
											"src/components/glass-command/index.ts",
											"src/components/apple-liquid-glass.tsx",
											"src/lib/glass-physics-lite.ts",
										],
									}
								: undefined,
						},
						treeshake: treeShaking
							? {
									moduleSideEffects: false,
									propertyReadSideEffects: false,
									annotations: true,
								}
							: false,
					},
					terserOptions: {
						compress: {
							drop_console: true,
							drop_debugger: true,
							pure_funcs: ["console.log", "console.info"],
							passes: 2,
						},
						mangle: {
							properties: {
								regex: /^_/,
							},
						},
						format: {
							comments: false,
						},
					},
				},
				optimizeDeps: {
					include: ["react", "react-dom"],
					exclude: ["@glass-ui/animations", "@glass-ui/advanced"],
				},
			};
		},

		transform(code, id) {
			// Add tree-shaking annotations
			if ((treeShaking && id.endsWith(".ts")) || id.endsWith(".tsx")) {
				// Mark pure functions
				code = code.replace(
					/export\s+function\s+(\w+)/g,
					"/*#__PURE__*/ export function $1",
				);

				// Mark pure components
				code = code.replace(
					/export\s+const\s+(\w+)\s*=\s*React\.forwardRef/g,
					"/*#__PURE__*/ export const $1 = React.forwardRef",
				);

				// Add sideEffects: false marker
				if (id.includes("src/components/") && !code.includes("sideEffects")) {
					code = `/*#__NO_SIDE_EFFECTS__*/\n${code}`;
				}
			}

			// Minify inline CSS
			if (minifyCSS && code.includes("`") && code.includes("css")) {
				code = code.replace(/`([^`]+)`/g, (match, css) => {
					if (css.includes("{") && css.includes("}")) {
						const minified = css
							.replace(/\s+/g, " ")
							.replace(/:\s+/g, ":")
							.replace(/;\s+/g, ";")
							.replace(/\{\s+/g, "{")
							.replace(/\}\s+/g, "}")
							.trim();
						return `\`${minified}\``;
					}
					return match;
				});
			}

			return code;
		},

		generateBundle(options, bundle) {
			// Analyze bundle sizes
			if (analyze) {
				console.log("\n📊 Glass UI Bundle Analysis:\n");

				for (const [fileName, chunk] of Object.entries(bundle)) {
					if ("chunk" === chunk.type) {
						const size = Buffer.byteLength(chunk.code) / 1024;
						bundleSizeMap.set(fileName, size);

						const bundleType = fileName.includes("core")
							? "core"
							: fileName.includes("animations")
								? "animations"
								: fileName.includes("advanced")
									? "advanced"
									: "other";

						const targetSize =
							bundleSizes[bundleType as keyof typeof bundleSizes];
						const status = targetSize && size > targetSize ? "❌" : "✅";

						console.log(
							`${status} ${fileName}: ${size.toFixed(2)}KB${
								targetSize ? ` (target: ${targetSize}KB)` : ""
							}`,
						);
					}
				}

				console.log("\n");
			}

			// Warn if bundles exceed target sizes
			for (const [fileName, size] of bundleSizeMap.entries()) {
				const bundleType = fileName.includes("core")
					? "core"
					: fileName.includes("animations")
						? "animations"
						: fileName.includes("advanced")
							? "advanced"
							: undefined;

				if (bundleType) {
					const targetSize =
						bundleSizes[bundleType as keyof typeof bundleSizes];
					if (targetSize && size > targetSize) {
						console.warn(
							`⚠️  Warning: ${bundleType} bundle (${size.toFixed(2)}KB) exceeds target size (${targetSize}KB)`,
						);
					}
				}
			}
		},

		// Custom resolver for modular imports
		resolveId(id) {
			if ("@glass-ui/core" === id) {
				return join(__dirname, "src/bundles/core-bundle.ts");
			}
			if ("@glass-ui/animations" === id) {
				return join(__dirname, "src/bundles/animations-bundle.ts");
			}
			if ("@glass-ui/advanced" === id) {
				return join(__dirname, "src/bundles/advanced-bundle.ts");
			}
			return;
		},
	};
}
