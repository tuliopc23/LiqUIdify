#!/usr/bin/env bun

console.log('🔄 Reverting Array Type Changes');
console.log('================================\n');

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

    // Revert T[] back to Array<T> to match the codebase preference
    const arrayTypeRegex = /([A-Za-z_][A-Za-z0-9_<>|&\s]*)\[\]/g;
    modified = modified.replace(arrayTypeRegex, (match, type) => {
      // Skip if it's a simple array access like arr[0]
      if (type.match(/^\w+$/)) {
        fileReverted++;
        return `Array<${type}>`;
      }
      return match;
    });

    if (fileReverted > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Reverted ${fileReverted} array type changes in ${file}`);
      totalReverted += fileReverted;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total array type changes reverted: ${totalReverted}`);
