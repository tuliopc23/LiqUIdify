#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';

console.log('🔧 Fixing all remaining TypeScript errors...\n');

let totalFixed = 0;

// Fix all undefined to null issues
function fixUndefinedToNull(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Replace return undefined with return null where type expects null
  const returnUndefinedPattern = /return\s+undefined(?=\s*[,;}])/g;
  const matches = content.match(returnUndefinedPattern);
  if (matches) {
    // Check context to see if null is expected
    modified = modified.replaceAll(returnUndefinedPattern, (match, offset) => {
      // Look for the function signature or type annotation
      const beforeMatch = content.substring(Math.max(0, offset - 200), offset);
      if (beforeMatch.includes('| null') || beforeMatch.includes('null |')) {
        fixCount++;
        return 'return null';
      }
      return match;
    });
  }

  // Replace = undefined with = null in type contexts
  const assignUndefinedPattern = /(\s*:\s*[^=]+\|\s*null[^=]*)\s*=\s*undefined\b/g;
  modified = modified.replaceAll(assignUndefinedPattern, '$1 = null');
  fixCount += (content.match(assignUndefinedPattern) || []).length;

  // Replace ? undefined : with ? null : in ternary expressions
  const ternaryUndefinedPattern = /\?\s*undefined\s*:/g;
  const ternaryMatches = content.match(ternaryUndefinedPattern);
  if (ternaryMatches) {
    modified = modified.replaceAll(ternaryUndefinedPattern, (match, offset) => {
      // Check if the type expects null
      const lineStart = content.lastIndexOf('\n', offset);
      const lineEnd = content.indexOf('\n', offset);
      const line = content.substring(lineStart, lineEnd);
      if (line.includes('| null')) {
        fixCount++;
        return '? null :';
      }
      return match;
    });
  }

  // Replace setState((prev) => ({ ...prev, error: undefined })) with null
  modified = modified.replaceAll(/setState\s*\(\s*\(\s*prev\s*\)\s*=>\s*\(\s*{\s*\.\.\.prev\s*,\s*error\s*:\s*undefined/g, 
    'setState((prev) => ({ ...prev, error: null');
  
  // Fix specific patterns where undefined should be null
  const patterns = [
    { pattern: /(\s+)return undefined;/g, replacement: '$1return null;' },
    { pattern: /:\s*undefined(\s*[,}])/g, replacement: ': null$1' },
    { pattern: /\|\s*undefined\)/g, replacement: '| null)' },
  ];

  for (const { pattern, replacement } of patterns) {
    const beforeFix = modified;
    modified = modified.replace(pattern, replacement);
    if (beforeFix !== modified) {
      fixCount += (beforeFix.match(pattern) || []).length;
    }
  }

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} undefined to null issues in ${filePath}`);
  }

  return modified;
}

// Fix type mismatches in variant props
function fixVariantProps(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix boolean values in variant props that expect string literals
  const variantPropPatterns = [
    // isActive: true -> isActive: "true"
    { pattern: /(\bisActive\s*:\s*)true\b(?!\s*as\s*const)/g, replacement: '$1"true"' },
    // isActive: false -> isActive: "false"
    { pattern: /(\bisActive\s*:\s*)false\b(?!\s*as\s*const)/g, replacement: '$1"false"' },
    // isClickable: true -> isClickable: "true"
    { pattern: /(\bisClickable\s*:\s*)true\b(?!\s*as\s*const)/g, replacement: '$1"true"' },
    // isClickable: false -> isClickable: "false"
    { pattern: /(\bisClickable\s*:\s*)false\b(?!\s*as\s*const)/g, replacement: '$1"false"' },
  ];

  for (const { pattern, replacement } of variantPropPatterns) {
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, replacement);
      fixCount += matches.length;
    }
  }

  // Fix ternary expressions for variant props
  modified = modified.replaceAll(/(\bisActive\s*:\s*)([^,}]+\s*\?\s*)true(\s*:\s*)false/g, '$1$2"true"$3"false"');
  modified = modified.replaceAll(/(\bisClickable\s*:\s*)([^,}]+\s*\?\s*)true(\s*:\s*)false/g, '$1$2"true"$3"false"');

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} variant prop issues in ${filePath}`);
  }

  return modified;
}

// Fix cva function calls
function fixCvaIssues(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix cva calls with trailing commas before config object
  const cvaTrailingCommaPattern = /cva\s*\(\s*\[([^\]]+)]\s*,\s*,\s*{/g;
  modified = modified.replaceAll(cvaTrailingCommaPattern, 'cva([$1], {');
  fixCount += (content.match(cvaTrailingCommaPattern) || []).length;

  // Fix cva calls with string arguments
  const cvaStringPattern = /cva\s*\(\s*"([^"]+)"\s*,\s*{/g;
  modified = modified.replaceAll(cvaStringPattern, 'cva(["$1"], {');
  fixCount += (content.match(cvaStringPattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} cva issues in ${filePath}`);
  }

  return modified;
}

// Fix aria-current issues
function fixAriaCurrent(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Replace aria-current boolean values
  const ariaCurrentPatterns = [
    { pattern: /aria-current={true}/g, replacement: 'aria-current="page"' },
    { pattern: /aria-current={false}/g, replacement: 'aria-current={undefined}' },
  ];

  for (const { pattern, replacement } of ariaCurrentPatterns) {
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, replacement);
      fixCount += matches.length;
    }
  }

  // Fix ternary expressions
  const ariaTernaryPattern = /aria-current={([^?]+)\?\s*true\s*:\s*(false|undefined)}/g;
  modified = modified.replaceAll(ariaTernaryPattern, 'aria-current={$1 ? "page" : undefined}');

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} aria-current issues in ${filePath}`);
  }

  return modified;
}

// Process all TypeScript/TSX files
async function processFiles() {
  const files = await glob('src/**/*.{ts,tsx}', { 
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.spec.*', '**/*.d.ts']
  });

  console.log(`Found ${files.length} TypeScript files to process.\n`);

  for (const file of files) {
    const filePath = join(process.cwd(), file);
    
    if (!existsSync(filePath)) {continue;}
    
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Apply all fixes
    content = fixUndefinedToNull(content, file);
    content = fixVariantProps(content, file);
    content = fixCvaIssues(content, file);
    content = fixAriaCurrent(content, file);
    
    if (content !== originalContent) {
      writeFileSync(filePath, content);
      totalFixed++;
    }
  }

  console.log(`\n✅ Processing complete! Fixed issues in ${totalFixed} files.`);
}

// Run the fixes
processFiles().catch(console.error);