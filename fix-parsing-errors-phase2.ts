#!/usr/bin/env bun
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

    // Fix malformed self-closing tags with space before /
    // Pattern: " / >" should be " />"
    const malformedSelfClosingRegex = /\s+\/\s+>/g;
    modified = modified.replace(malformedSelfClosingRegex, (match) => {
      fileFixed++;
      return ' />';
    });

    // Fix malformed self-closing tags with just space before /
    // Pattern: " /" should be "/"
    const spaceBeforeSlashRegex = /\s+\/>/g;
    modified = modified.replace(spaceBeforeSlashRegex, (match) => {
      fileFixed++;
      return ' />';
    });

    // Fix any remaining malformed JSX syntax
    // Pattern: attributes ending with space and then />
    const malformedJSXRegex = /(\w+="[^"]*")\s+\/\s*>/g;
    modified = modified.replace(malformedJSXRegex, (match, attributes) => {
      fileFixed++;
      return `${attributes} />`;
    });

    // Fix input elements that might have malformed syntax
    const malformedInputRegex = /<input([^>]*)\s+\/\s+>/g;
    modified = modified.replace(malformedInputRegex, (match, attributes) => {
      fileFixed++;
      return `<input${attributes} />`;
    });

    // Fix any other self-closing elements with malformed syntax
    const malformedElementRegex = /<(\w+)([^>]*)\s+\/\s+>/g;
    modified = modified.replace(malformedElementRegex, (match, tagName, attributes) => {
      fileFixed++;
      return `<${tagName}${attributes} />`;
    });

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} parsing errors in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total parsing errors fixed: ${totalFixed}`);
