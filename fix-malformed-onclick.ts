#!/usr/bin/env bun

console.log('🔧 Fixing Malformed onClick Attributes');
console.log('====================================\n');

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Find all TypeScript and TSX files
const files = glob.sync('libs/components/src/**/*.{ts,tsx}', { 
  ignore: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'] 
});

let totalFixed = 0;

for (const file of files) {
  try {
    const content = readFileSync(file, 'utf-8');
    let modified = content;
    let fileFixed = 0;

    // Fix malformed onClick attributes like: onClick={onClick={(e) => ...}}
    const malformedOnClickRegex = /onClick=\{onClick=\{([^}]+)\}\}/g;
    const onClickMatches = modified.match(malformedOnClickRegex);
    if (onClickMatches) {
      fileFixed += onClickMatches.length;
      modified = modified.replace(malformedOnClickRegex, 'onClick={$1}');
    }

    // Fix malformed onKeyDown attributes like: onKeyDown={onKeyDown={(e) => ...}}
    const malformedOnKeyDownRegex = /onKeyDown=\{onKeyDown=\{([^}]+)\}\}/g;
    const onKeyDownMatches = modified.match(malformedOnKeyDownRegex);
    if (onKeyDownMatches) {
      fileFixed += onKeyDownMatches.length;
      modified = modified.replace(malformedOnKeyDownRegex, 'onKeyDown={$1}');
    }

    // Fix malformed onChange attributes like: onChange={onChange={(e) => ...}}
    const malformedOnChangeRegex = /onChange=\{onChange=\{([^}]+)\}\}/g;
    const onChangeMatches = modified.match(malformedOnChangeRegex);
    if (onChangeMatches) {
      fileFixed += onChangeMatches.length;
      modified = modified.replace(malformedOnChangeRegex, 'onChange={$1}');
    }

    // Fix any other malformed event handlers
    const malformedEventRegex = /(on\w+)=\{\1=\{([^}]+)\}\}/g;
    const eventMatches = modified.match(malformedEventRegex);
    if (eventMatches) {
      fileFixed += eventMatches.length;
      modified = modified.replace(malformedEventRegex, '$1={$2}');
    }

    // Fix duplicate attributes that might have been created
    const duplicateAttrRegex = /(\w+)=\{([^}]*)\}\s+\1=\{([^}]*)\}/g;
    const duplicateMatches = modified.match(duplicateAttrRegex);
    if (duplicateMatches) {
      fileFixed += duplicateMatches.length;
      // Keep the second one (usually the correct one)
      modified = modified.replace(duplicateAttrRegex, '$1={$3}');
    }

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} malformed attributes in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total malformed attributes fixed: ${totalFixed}`);
console.log('\n📋 Next Steps:');
console.log('1. Format code: bunx @biomejs/biome format --write .');
console.log('2. Run linting to see current status: bunx @biomejs/biome check --reporter=summary');
