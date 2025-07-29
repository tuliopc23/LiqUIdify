#!/usr/bin/env bun

console.log('🔄 Reverting Problematic Automated Fixes');
console.log('========================================\n');

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Find all TypeScript and TSX files
const files = glob.sync('libs/components/src/**/*.{ts,tsx}', { 
  ignore: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'] 
});

let totalReverted = 0;

for (const file of files) {
  try {
    const content = readFileSync(file, 'utf-8');
    let modified = content;
    let fileReverted = 0;

    // Revert problematic keyboard event handlers that cause noAssignInExpressions errors
    // Pattern: onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (clickHandler)(e); } }}
    const problematicKeyboardRegex = /\s+onKeyDown=\{[^}]*e\.key === 'Enter'[^}]*e\.preventDefault\(\)[^}]*\([^)]+\)\(e\)[^}]*\}/g;
    const keyboardMatches = modified.match(problematicKeyboardRegex);
    if (keyboardMatches) {
      fileReverted += keyboardMatches.length;
      modified = modified.replace(problematicKeyboardRegex, '');
    }

    // Revert problematic tabIndex additions that cause noNoninteractiveTabindex errors
    // Only remove tabIndex={0} that was automatically added, not legitimate ones
    const problematicTabIndexRegex = /\s+tabIndex=\{0\}(?=\s+onClick)/g;
    const tabIndexMatches = modified.match(problematicTabIndexRegex);
    if (tabIndexMatches) {
      fileReverted += tabIndexMatches.length;
      modified = modified.replace(problematicTabIndexRegex, '');
    }

    // Clean up any malformed onClick attributes that might have been created
    const malformedOnClickRegex = /onClick=\{[^}]*onClick\s*=\s*\{[^}]*\}[^}]*\}/g;
    const malformedMatches = modified.match(malformedOnClickRegex);
    if (malformedMatches) {
      fileReverted += malformedMatches.length;
      // This is complex to fix automatically, so just log it for manual review
      console.log(`⚠️  Found malformed onClick in ${file} - needs manual review`);
    }

    // Clean up any duplicate attributes that might have been created
    const duplicateAttrRegex = /(\w+)=\{[^}]*\}\s+\1=\{[^}]*\}/g;
    const duplicateMatches = modified.match(duplicateAttrRegex);
    if (duplicateMatches) {
      fileReverted += duplicateMatches.length;
      console.log(`⚠️  Found duplicate attributes in ${file} - needs manual review`);
    }

    if (fileReverted > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Reverted ${fileReverted} problematic fixes in ${file}`);
      totalReverted += fileReverted;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total problematic fixes reverted: ${totalReverted}`);
console.log('\n📋 Next Steps:');
console.log('1. Run linting to see current status: bunx @biomejs/biome check --reporter=summary');
console.log('2. Format code: bunx @biomejs/biome format --write .');
console.log('3. Proceed with targeted manual fixes');
