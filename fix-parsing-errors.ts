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

    // Fix TypeScript type definitions that incorrectly have aria-label attributes
    // Pattern: Array<SomeType aria-label="...">
    const typeWithAriaRegex = /Array<([^<>]+)\s+aria-label="[^"]*">/g;
    modified = modified.replace(typeWithAriaRegex, (match, typeName) => {
      fileFixed++;
      return `Array<${typeName.trim()}>`;
    });

    // Fix generic types with aria-label
    const genericTypeAriaRegex = /([A-Z][a-zA-Z]*)\s+aria-label="[^"]*">/g;
    modified = modified.replace(genericTypeAriaRegex, (match, typeName) => {
      // Only fix if this is clearly in a type context (after < or :)
      return `${typeName}>`;
    });

    // Fix malformed href attributes like href="#placeholder"#"
    const malformedHrefRegex = /href="([^"]*)"#"/g;
    modified = modified.replace(malformedHrefRegex, (match, href) => {
      fileFixed++;
      return `href="${href}"`;
    });

    // Fix double quotes in href
    const doubleQuoteHrefRegex = /href=""([^"]*)""/g;
    modified = modified.replace(doubleQuoteHrefRegex, (match, href) => {
      fileFixed++;
      return `href="${href}"`;
    });

    // Fix any remaining malformed attributes
    const malformedAttrRegex = /(\w+)="([^"]*)"([^"\s>]*)"([^>]*)/g;
    modified = modified.replace(malformedAttrRegex, (match, attrName, value, extra, rest) => {
      if (extra.includes('#')) {
        fileFixed++;
        return `${attrName}="${value}"${rest}`;
      }
      return match;
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
