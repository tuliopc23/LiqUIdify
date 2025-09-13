import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToString } from 'react-dom/server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist/libs/components/index.mjs');
const cjsPath = path.resolve(__dirname, '../dist/libs/components/index.cjs');
const require = createRequire(import.meta.url);

async function importComponents() {
  // Ensure CommonJS bundle exists; skip test gracefully otherwise
  if (!fs.existsSync(cjsPath)) {
    console.log('ℹ️  SSR smoke test skipped: CommonJS bundle not found');
    process.exit(0);
  }

  // Require CJS bundle (preferred for SSR to avoid ESM↔CJS interop issues)
  try {
    return require(cjsPath);
  } catch (error) {
    console.error(`Failed to require components from ${cjsPath}`);
    console.error(error);
    process.exit(1);
  }
}

async function main() {
  try {
    // ThemeProvider touches localStorage in some flows; avoid provider and
    // smoke-test a simple component export.
    const { Button } = await importComponents();

    const html = renderToString(
      React.createElement(Button, null, 'Hello')
    );

    if (html && html.includes('Hello')) {
      console.log('✅ SSR smoke test passed: Components render correctly on the server');
      process.exit(0);
    } else {
      console.error('❌ SSR smoke test failed: Rendered output does not contain expected content');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ SSR smoke test failed with error:');
    console.error(error);
    process.exit(1);
  }
}

main();
