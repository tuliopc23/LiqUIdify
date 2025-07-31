import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🎭 Starting Playwright E2E Tests');
  console.log(`   Running ${config.projects.length} projects`);
  console.log(`   Base URL: ${config.projects[0].use.baseURL}`);
  
  // Set up any global test data or environment
  process.env.E2E_TEST = 'true';
  
  // Return a teardown function
  return async () => {
    console.log('🏁 E2E Tests Complete');
  };
}

export default globalSetup;