#!/usr/bin/env bun

/**
 * Clean up all the problematic auto-fix scripts to prevent future loops
 */

import { unlinkSync, existsSync } from 'fs';

const problematicScripts = [
  'fix-anchor-href.ts',
  'fix-button-types.ts',
  'fix-parsing-errors.ts',
  'final-targeted-fixes.ts',
  'fix-malformed-syntax.ts',
  'fix-unused-variables.ts',
  'fix-malformed-onclick.ts',
  'fix-semantic-elements.ts',
  'fix-svg-accessibility.ts',
  'fix-all-parsing-errors.ts',
  'fix-component-showcase.ts',
  'fix-parsing-errors-final.ts',
  'revert-problematic-fixes.ts',
  'fix-glass-accessible-demo.ts',
  'fix-parsing-errors-phase2.ts',
  'fix-critical-linting-issues.ts',
  'fix-remaining-parsing-errors.ts',
  'fix-critical-remaining-issues.ts',
  'fix-label-control-association.ts',
  'fix-remaining-parsing-errors-comprehensive.ts'
];

console.log('🧹 Cleaning up problematic auto-fix scripts...\n');

let cleaned = 0;

for (const script of problematicScripts) {
  if (existsSync(script)) {
    try {
      unlinkSync(script);
      console.log(`✅ Removed: ${script}`);
      cleaned++;
    } catch (error) {
      console.log(`❌ Failed to remove: ${script}`);
    }
  }
}

console.log(`\n🎉 Cleaned up ${cleaned} problematic scripts`);
console.log('\n📋 Moving forward:');
console.log('1. Use proper TypeScript tooling instead of regex replacements');
console.log('2. Fix errors systematically, not with automated scripts');
console.log('3. Keep TypeScript strict mode enabled');
console.log('4. Address root causes, not symptoms');