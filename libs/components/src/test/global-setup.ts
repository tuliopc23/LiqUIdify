import type { TestProject } from "vitest/node";

/**
 * Global setup for Vitest test environment
 * This runs once before all test suites start
 * Note: DOM-related mocks are in setup.ts since they need the test environment to be ready
 */
export default function globalSetup(project: TestProject) {
  console.log("🧪 Setting up LiqUIdify test environment...");

  // Set up global environment variables
  process.env.NODE_ENV = "test";
  process.env.VITEST = "true";

  // Set up shared test data if needed
  project.provide("testStartTime", Date.now());
  project.provide("testEnvironment", "vitest");

  console.log("✅ Global test setup complete");

  // Return teardown function
  return async () => {
    console.log("🧹 Cleaning up global test environment...");
    // Clean up global state if needed
    console.log("✅ Global test teardown complete");
  };
}

// Extend Vitest's ProvidedContext interface for type safety
declare module "vitest" {
  export interface ProvidedContext {
    testStartTime: number;
    testEnvironment: string;
  }
}
