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

    // Fix anchors with empty or invalid href values
    // Pattern: <a href="" or <a href="#" or <a without href
    
    // Fix empty href
    const emptyHrefRegex = /<a([^>]*)\s+href\s*=\s*["']?\s*["']?([^>]*)>/g;
    modified = modified.replace(emptyHrefRegex, (match, beforeHref, afterHref) => {
      if (match.includes('href=""') || match.includes("href=''") || match.includes('href="#"')) {
        fileFixed++;
        // Convert to button if it has click handlers, otherwise add proper href
        if (match.includes('onClick') || match.includes('onclick')) {
          // Convert to button
          return `<button type="button"${beforeHref}${afterHref}>`;
        } else {
          // Add a placeholder href
          return `<a${beforeHref} href="#placeholder"${afterHref}>`;
        }
      }
      return match;
    });

    // Fix anchors without href attribute that have click handlers
    const anchorWithoutHrefRegex = /<a(?![^>]*\bhref\s*=)([^>]*(?:onClick|onclick)[^>]*)>/g;
    modified = modified.replace(anchorWithoutHrefRegex, (match, attributes) => {
      fileFixed++;
      // Convert to button since it has click handlers
      return `<button type="button"${attributes}>`;
    });

    // Fix corresponding closing tags for converted anchors
    if (fileFixed > 0) {
      // This is a simplified approach - count opening tags and replace corresponding closing tags
      const lines = modified.split('\n');
      let anchorToButtonCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Count button conversions in this line
        const buttonMatches = line.match(/<button[^>]*>/g);
        if (buttonMatches) {
          // Check if these were converted from anchors by looking for typical anchor attributes
          buttonMatches.forEach(match => {
            if (match.includes('onClick') || match.includes('onclick')) {
              anchorToButtonCount++;
            }
          });
        }
        
        // Replace </a> with </button> for converted anchors
        if (line.includes('</a>') && anchorToButtonCount > 0) {
          lines[i] = line.replace('</a>', '</button>');
          anchorToButtonCount--;
        }
      }
      
      modified = lines.join('\n');
    }

    // Fix anchors that should have meaningful href values
    const placeholderHrefRegex = /<a([^>]*)\s+href\s*=\s*["']#["']([^>]*)>/g;
    modified = modified.replace(placeholderHrefRegex, (match, beforeHref, afterHref) => {
      // If it has click handlers, convert to button
      if (match.includes('onClick') || match.includes('onclick')) {
        fileFixed++;
        return `<button type="button"${beforeHref}${afterHref}>`;
      }
      // Otherwise, suggest a more meaningful href
      return match.replace('href="#"', 'href="#section"');
    });

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} anchor href issues in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total anchor href issues fixed: ${totalFixed}`);
console.log(`\n⚠️  Note: This script provides basic fixes. You may need to manually review:`);
console.log(`   • Ensure converted buttons have proper styling`);
console.log(`   • Update any CSS selectors that target anchor tags`);
console.log(`   • Provide meaningful href values for navigation links`);
