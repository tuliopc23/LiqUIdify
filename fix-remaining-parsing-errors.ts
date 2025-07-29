#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'fs';

// List of files with known parsing errors
const problematicFiles = [
  'libs/components/src/components/glass-drawer/glass-drawer.stories.tsx',
  'libs/components/src/components/glass-form-field/glass-form-field.stories.tsx',
  'libs/components/src/components/glass-tabs/glass-tabs.stories.tsx',
  'libs/components/src/components/glass-textarea/glass-textarea.stories.tsx',
  'libs/components/src/components/glass-tooltip/glass-tooltip.stories.tsx',
  'libs/components/src/core/performance/performance-benchmarks.ts',
  'libs/components/src/stories/components/glass-focus-demo.stories.tsx'
];

let totalFixed = 0;

for (const file of problematicFiles) {
  try {
    const content = readFileSync(file, 'utf-8');
    let modified = content;
    let fileFixed = 0;

    // Fix the specific pattern: "/ >" should be "/>"
    const spaceSlashSpaceRegex = /\s+\/\s+>/g;
    const matches = modified.match(spaceSlashSpaceRegex);
    if (matches) {
      fileFixed += matches.length;
      modified = modified.replace(spaceSlashSpaceRegex, ' />');
    }

    // Fix pattern where there's a newline before the slash
    const newlineSlashRegex = /\n\s*\/\s*>/g;
    const newlineMatches = modified.match(newlineSlashRegex);
    if (newlineMatches) {
      fileFixed += newlineMatches.length;
      modified = modified.replace(newlineSlashRegex, ' />');
    }

    // Fix pattern where there's extra spacing around self-closing tags
    const extraSpaceRegex = /\s{2,}\/\s*>/g;
    const extraSpaceMatches = modified.match(extraSpaceRegex);
    if (extraSpaceMatches) {
      fileFixed += extraSpaceMatches.length;
      modified = modified.replace(extraSpaceRegex, ' />');
    }

    // Fix any remaining malformed self-closing tags
    const malformedRegex = /(\w+="[^"]*")\s+\/\s+>/g;
    const malformedMatches = modified.match(malformedRegex);
    if (malformedMatches) {
      fileFixed += malformedMatches.length;
      modified = modified.replace(malformedRegex, '$1 />');
    }

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} parsing errors in ${file}`);
      totalFixed += fileFixed;
    } else {
      console.log(`ℹ️  No parsing errors found in ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total parsing errors fixed: ${totalFixed}`);
