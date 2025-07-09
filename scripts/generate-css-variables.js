#!/usr/bin/env node

/**
 * Script to generate CSS variables file from design tokens
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import the CSS generator (this would be compiled from TypeScript)
import { generateThemeCSS } from '../dist/styles/css-variables.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const css = generateThemeCSS();
  const outputPath = join(__dirname, '..', 'dist', 'liquidui-variables.css');

  writeFileSync(outputPath, css, 'utf-8');

  console.log('✅ CSS variables generated successfully at:', outputPath);
} catch (error) {
  console.error('❌ Error generating CSS variables:', error);
  process.exit(1);
}
