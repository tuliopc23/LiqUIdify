/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/test-setup.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"node_modules/",
				"src/test-setup.ts",
				"vitest.setup.ts",
				"**/*.stories.*",
				"**/*.config.*",
				"dist/",
			],
			thresholds: {
				global: {
					branches: 92,
					functions: 92,
					lines: 92,
					statements: 92,
				},
			},
		},
	},
});
