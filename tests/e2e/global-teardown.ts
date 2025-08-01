import { FullConfig } from "@playwright/test";

async function globalTeardown(config: FullConfig) {
  console.log("🧹 Cleaning up after E2E tests");

  // Clean up any test data or resources
  delete process.env.E2E_TEST;
}

export default globalTeardown;
