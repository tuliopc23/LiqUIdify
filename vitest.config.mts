/// <reference types="vitest" />

import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// Simple, reliable test environment
		environment: "jsdom",
		globals: true,

		// Setup files
		setupFiles: ["libs/components/src/test/test-setup.ts"],

		// Test file patterns - keep it simple
		include: ["libs/components/src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
		exclude: [
			"**/node_modules/**",
			"**/dist/**",
			"**/coverage/**",
			"**/*.d.ts",
			"**/*.config.*",
			// Exclude E2E tests from Vitest
			"tests/e2e/**",
		],

		// Basic coverage
		coverage: {
			provider: "v8",
			// Enable coverage in CI or when explicitly requested
			enabled: process.env.CI === "true" || process.env.COVERAGE === "1",
			include: ["libs/components/src/**/*.{js,ts,jsx,tsx}"],
			exclude: [
				"**/test/**",
				"**/*.{test,spec}.{js,ts,jsx,tsx}",
				"**/node_modules/**",
			],
			thresholds: {
				// Initial realistic thresholds for current suite; raise as coverage improves.
				lines: 25,
				statements: 25,
				branches: 30,
				functions: 24,
			},
		},

		// Simple timeouts
		testTimeout: 10000,
		hookTimeout: 5000,

		// Single thread for stability
		pool: "threads",
		poolOptions: {
			threads: {
				singleThread: true,
			},
		},
	},

	// Path aliases
	resolve: {
		alias: {
			"@": resolve(__dirname, "libs/components/src"),
			"@/components": resolve(__dirname, "libs/components/src/components"),
			"@/hooks": resolve(__dirname, "libs/components/src/hooks"),
			"@/types": resolve(__dirname, "libs/components/src/types"),
			"@/utils": resolve(__dirname, "libs/components/src/utils"),
			"@/core": resolve(__dirname, "libs/components/src/core"),
			"@/styles": resolve(__dirname, "libs/components/src/styles"),
			// styled-system alias to avoid deep relative imports
			"styled-system": resolve(__dirname, "styled-system"),
		},
	},
});
