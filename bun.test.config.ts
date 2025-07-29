export default {
  // Test files pattern
  testMatch: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],

  // Setup files
  preload: ["./test/setup.ts"],

  // Coverage configuration
  coverage: {
    enabled: true,
    provider: "v8",
    reporter: ["text", "json", "html", "lcov"],
    exclude: [
      "**/*.stories.tsx",
      "**/*.d.ts",
      "**/node_modules/**",
      "**/test/**",
      "**/.next/**",
      "**/coverage/**",
      "**/scripts/**",
      "**/storybook-static/**",
    ],
    threshold: {
      global: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
  },

  // Test environment
  environment: "jsdom",

  // Timeout
  timeout: 10000,

  // Watch mode
  watchIgnore: [
    "**/node_modules/**",
    "**/.next/**",
    "**/coverage/**",
    "**/storybook-static/**",
  ],
};
