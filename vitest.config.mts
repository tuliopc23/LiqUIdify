/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    // Test environment configuration
    environment: "jsdom",
    globals: true,

    // Global setup and teardown
    globalSetup: ["./libs/components/src/test/global-setup.ts"],
    setupFiles: ["./libs/components/src/test/setup.ts"],

    // Test file patterns
    include: [
      "libs/components/src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      // Only include Vitest unit/integration tests; exclude Playwright specs
      "libs/components/src/test/**/*.{test,spec}.{js,ts,jsx,tsx}",
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/coverage/**",
      "**/*.d.ts",
      "**/*.config.*",
      // Prevent Playwright tests from being picked up by Vitest
      "tests/e2e/**",
      "apps/**/e2e/**",
      "apps/**/playwright/**",
    ],

    // Coverage configuration
    coverage: {
      provider: "v8",
      enabled: false, // Enable with --coverage flag
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.config.*",
        "**/*.d.ts",
        "**/coverage/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/test{,s}/**",
        "**/*.{test,spec}.{js,mjs,cjs,ts,tsx,jsx}",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
        "**/examples/**",
        "**/stories/**",
        "**/demos/**",
        "**/playground/**",
      ],
      include: ["libs/components/src/**/*.{js,ts,jsx,tsx}"],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },

    // Test execution configuration
    testTimeout: 30000,
    hookTimeout: 15000,
    teardownTimeout: 15000,

    // Parallel execution - reduced for stability
    fileParallelism: true,
    maxConcurrency: 3,

    // Pool configuration for better performance
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false,
        isolate: true,
      },
    },

    // Reporter configuration
    reporters: process.env.CI ? ["default", "junit"] : ["default", "html"],

    outputFile: {
      junit: "./test-results/junit.xml",
      json: "./test-results/results.json",
      html: "./test-results/html/index.html",
    },

    // Dependency optimization for better performance
    deps: {
      optimizer: {
        web: {
          enabled: true,
          include: [
            "react",
            "react-dom",
            "@testing-library/react",
            "@testing-library/jest-dom",
            "@testing-library/user-event",
            "framer-motion",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    },

    // Watch configuration
    watch: !process.env.CI,

    // Sequence configuration for reproducible tests
    sequence: {
      hooks: "stack",
      setupFiles: "list",
      shuffle: false,
    },

    // Mock configuration
    clearMocks: true,
    restoreMocks: true,

    // Diff configuration for better test output
    diff: {
      aIndicator: "→ expected",
      bIndicator: "← actual",
      omitAnnotationLines: true,
      includeChangeCounts: true,
    },

    // Chai configuration
    chaiConfig: {
      includeStack: true,
      showDiff: true,
      truncateThreshold: 100,
    },

    // Server configuration
    server: {
      deps: {
        inline: [
          // Inline modules that need to be processed by Vitest
          /tailwind-merge/,
          /clsx/,
        ],
      },
    },
  },

  // Resolve configuration for path aliases
  resolve: {
    alias: {
      "@": resolve(__dirname, "libs/components/src"),
      "@/components": resolve(__dirname, "libs/components/src/components"),
      "@/hooks": resolve(__dirname, "libs/components/src/hooks"),
      "@/types": resolve(__dirname, "libs/components/src/types"),
      "@/utils": resolve(__dirname, "libs/components/src/utils"),
      "@/core": resolve(__dirname, "libs/components/src/core"),
      "@/styles": resolve(__dirname, "libs/components/src/styles"),
      liquidify: resolve(__dirname, "libs/components/src/index.ts"),
    },
  },

  // Vite plugin configuration for testing environment
  plugins: [],
});
