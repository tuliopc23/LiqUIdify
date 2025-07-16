/**
 * Critical CSS Extraction Script
 * Extracts critical CSS for initial page render
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';

// Critical selectors that should be included
const CRITICAL_SELECTORS = [
  // Base glass classes
  '.glass-ui',
  '.glass-weak',
  '.glass-medium',
  '.glass-strong',
  '.glass-transition',
  
  // Core components
  '.glass-button',
  '.glass-card',
  '.glass-input',
  '.glass-modal',
  
  // Essential states
  ':root',
  ':focus-visible',
  ':disabled',
  '@media (prefers-color-scheme: dark)',
  '@media (prefers-reduced-motion: reduce)',
];

async function extractCriticalCSS() {
  console.log('Extracting critical CSS...');
  
  const inputPath = join(process.cwd(), 'dist', 'liquidui.css');
  const outputPath = join(process.cwd(), 'dist', 'liquidui-critical.css');
  
  if (!existsSync(inputPath)) {
    console.error('Input CSS file not found. Run build first.');
    process.exit(1);
  }
  
  const css = readFileSync(inputPath, 'utf8');
  
  // Parse CSS
  const root = postcss.parse(css);
  const criticalRoot = postcss.root();
  
  // Extract critical rules
  root.walkRules((rule) => {
    const selector = rule.selector;
    
    // Check if rule matches critical selectors
    const isCritical = CRITICAL_SELECTORS.some(critical => {
      if (critical.startsWith('@')) {
        return false; // Handle at-rules separately
      }
      return selector.includes(critical);
    });
    
    if (isCritical) {
      criticalRoot.append(rule.clone());
    }
  });
  
  // Extract critical at-rules
  root.walkAtRules((atRule) => {
    const isCritical = CRITICAL_SELECTORS.some(critical => 
      atRule.name + ' ' + atRule.params === critical.substring(1)
    );
    
    if (isCritical) {
      criticalRoot.append(atRule.clone());
    }
  });
  
  // Minify critical CSS
  const result = await postcss([
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    }),
  ]).process(criticalRoot.toString(), { from: undefined });
  
  // Write critical CSS
  writeFileSync(outputPath, result.css);
  
  const originalSize = Buffer.byteLength(css, 'utf8');
  const criticalSize = Buffer.byteLength(result.css, 'utf8');
  const reduction = ((originalSize - criticalSize) / originalSize * 100).toFixed(2);
  
  console.log(`✓ Critical CSS extracted successfully`);
  console.log(`  Original: ${(originalSize / 1024).toFixed(2)}KB`);
  console.log(`  Critical: ${(criticalSize / 1024).toFixed(2)}KB`);
  console.log(`  Reduction: ${reduction}%`);
}

extractCriticalCSS().catch(console.error);
