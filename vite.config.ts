import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "rolldown-vite";
import dts from "vite-plugin-dts";
import postcssConfig from "./postcss.config.js";
import { sharedRollupOptions } from "./build/rolldown.shared";

// Load OXC configuration for consistency
const oxcConfig = JSON.parse(readFileSync("./oxc.config.json", "utf-8"));

export default defineConfig({

	plugins: [
		react({
			jsxRuntime: "automatic",
			jsxImportSource: "react",
			include: /\.(tsx|ts|jsx|js)$/,
		}),
		dts({
			insertTypesEntry: true,
			outDir: "dist/types",
			rollupTypes: false,
			bundledPackages: [],
			exclude: [
				"**/*.test.*",
				"**/*.stories.*",
				"src/testing/**/*",
				"src/docs/**/*",
				"src/test-utils/**/*",
				"src/tests/**/*",
				"**/*.spec.*",
			],
		}),
	],

	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			"@/tokens": resolve(__dirname, "src/tokens/index"),
			"@/design-tokens": resolve(__dirname, "src/tokens/design-tokens"),
			"@/core/accessibility-manager": resolve(__dirname, "src/core/accessibility-manager-index"),
		},
		mainFields: ["module", "main", "browser"],
		conditions: ["import", "module", "browser", "default"],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"],
	},

	css: {
		postcss: postcssConfig,
	},

	optimizeDeps: {
		include: [
			"react",
			"react-dom",
			"react/jsx-runtime",
			"framer-motion",
			"clsx",
			"class-variance-authority",
			"tailwind-merge",
			"lucide-react",
			"@radix-ui/react-slot",
			"@radix-ui/react-accordion",
			"@radix-ui/react-dialog",
			"@radix-ui/react-radio-group",
		],
		exclude: ["axe-core"],
		rollupOptions: {},
	},

	build: {
		lib: {
			entry: {
				// Main entries
				index: resolve(__dirname, "src/index.ts"),
				"index-modular": resolve(__dirname, "src/index-modular.ts"),

				// Bundle entries
				core: resolve(__dirname, "src/bundles/core.ts"),
				animations: resolve(__dirname, "src/bundles/animations.ts"),
				advanced: resolve(__dirname, "src/bundles/advanced.ts"),
				forms: resolve(__dirname, "src/bundles/forms.ts"),
				layout: resolve(__dirname, "src/bundles/layout.ts"),
				accessibility: resolve(__dirname, "src/bundles/accessibility.ts"),
				feedback: resolve(__dirname, "src/bundles/feedback.ts"),
				navigation: resolve(__dirname, "src/bundles/navigation.ts"),
				physics: resolve(__dirname, "src/bundles/physics.ts"),
				ssr: resolve(__dirname, "src/bundles/ssr.ts"),

				// Component entries
				"components/button": resolve(
					__dirname,
					"src/components/glass-button-refactored/index.ts",
				),
				"components/card": resolve(
					__dirname,
					"src/components/glass-card-refactored/index.ts",
				),
				"components/input": resolve(
					__dirname,
					"src/components/glass-input/index.ts",
				),
				"components/modal": resolve(
					__dirname,
					"src/components/glass-modal/index.ts",
				),

				// Utility entries
				tokens: resolve(__dirname, "src/tokens/index.ts"),
				providers: resolve(__dirname, "src/providers/index.ts"),
				documentation: resolve(__dirname, "src/documentation/index.tsx"),
			},
			name: "LiquidUI",
			formats: ["es", "cjs"],
			fileName: (format, entryName) => {
				const extension = format === "es" ? "mjs" : "cjs";
				return `${entryName}.${extension}`;
			},
		},

		rollupOptions: sharedRollupOptions,

		sourcemap: false,
		emptyOutDir: true,
		target: ["es2020", "edge88", "firefox78", "chrome87", "safari13.1"],
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ["console.log"],
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
	logLevel: "info",

	esbuild: {
		drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
	},
});
