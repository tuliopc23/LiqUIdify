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

    // Fix button elements without type attribute - more precise regex
    // Look for <button that doesn't have type= anywhere in the opening tag
    const buttonRegex = /<button(?![^>]*\btype\s*=)([^>]*)>/g;
    modified = modified.replace(buttonRegex, (match, attributes) => {
      fileFixed++;
      // Add space before attributes if they exist and don't start with space
      const spacedAttributes = attributes && !attributes.startsWith(' ') ? ` ${attributes}` : attributes;
      return `<button type="button"${spacedAttributes}>`;
    });

    // Fix any remaining button elements that might have been missed
    // This catches buttons with complex attribute patterns
    const complexButtonRegex = /<button\s+(?![^>]*\btype\s*=)([^>]*)>/g;
    modified = modified.replace(complexButtonRegex, (match, attributes) => {
      fileFixed++;
      return `<button type="button" ${attributes.trim()}>`;
    });

    // Fix GlassButton components without type attribute
    const glassButtonRegex = /<GlassButton(?![^>]*\btype\s*=)([^>\/]*(?:\/?>|>))/g;
    modified = modified.replace(glassButtonRegex, (match, rest) => {
      fileFixed++;
      if (rest.trim().endsWith('/>')) {
        return `<GlassButton type="button" ${rest.trim()}`;
      } else {
        return `<GlassButton type="button"${rest}`;
      }
    });

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} button type issues in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total button type issues fixed: ${totalFixed}`);