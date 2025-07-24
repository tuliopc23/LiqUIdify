#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';

console.log('🔧 Fixing final TypeScript errors...\n');

let totalFixed = 0;

// Fix boolean to string literal issues for isActive and isClickable
function fixBooleanToStringLiterals(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix isActive and isClickable boolean values
  const patterns = [
    // Fix isActive: false to isActive: "false"
    { pattern: /(\bisActive\s*:\s*)false\b/g, replacement: '$1"false"' },
    // Fix isActive: true to isActive: "true"
    { pattern: /(\bisActive\s*:\s*)true\b/g, replacement: '$1"true"' },
    // Fix isClickable: false to isClickable: "false"
    { pattern: /(\bisClickable\s*:\s*)false\b/g, replacement: '$1"false"' },
    // Fix isClickable: true to isClickable: "true"
    { pattern: /(\bisClickable\s*:\s*)true\b/g, replacement: '$1"true"' },
  ];

  for (const { pattern, replacement } of patterns) {
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, replacement);
      fixCount += matches.length;
    }
  }

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} boolean to string literal issues in ${filePath}`);
  }

  return modified;
}

// Fix undefined assignments where null is expected
function fixUndefinedToNull(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Replace sortBy: undefined with sortBy: null
  modified = modified.replaceAll(/(\bsortBy\s*:\s*)undefined\b/g, '$1null');
  fixCount += (content.match(/(\bsortBy\s*:\s*)undefined\b/g) || []).length;

  // Replace data: undefined with data: null
  modified = modified.replaceAll(/(\bdata\s*:\s*)undefined\b/g, '$1null');
  fixCount += (content.match(/(\bdata\s*:\s*)undefined\b/g) || []).length;

  // Replace error: null with error: null (already correct)
  // Replace lastFetch: undefined with lastFetch: null
  modified = modified.replaceAll(/(\blastFetch\s*:\s*)undefined\b/g, '$1null');
  fixCount += (content.match(/(\blastFetch\s*:\s*)undefined\b/g) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} undefined to null issues in ${filePath}`);
  }

  return modified;
}

// Fix GlassEffectOptions interface to include config property
function fixGlassEffectOptions(content: string, filePath: string): string {
  if (!filePath.includes('types.ts') && !filePath.includes('types/index.ts')) {
    return content;
  }

  let modified = content;
  let fixCount = 0;

  // Find GlassEffectOptions interface and add config property
  const interfacePattern = /export\s+interface\s+GlassEffectOptions\s*{([^}]+)}/;
  const match = modified.match(interfacePattern);
  
  if (match && !match[1].includes('config')) {
    const interfaceContent = match[1];
    const newInterfaceContent = interfaceContent.trimEnd() + '\n  config?: Record<string, any>;\n';
    modified = modified.replace(interfacePattern, `export interface GlassEffectOptions {${newInterfaceContent}}`);
    fixCount++;
    console.log(`  ✓ Added config property to GlassEffectOptions in ${filePath}`);
  }

  return modified;
}

// Fix cva function calls with incorrect syntax
function fixCvaFunctionCalls(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix patterns like cva("class1", "class2", , { to cva(["class1", "class2"], {
  const cvaPattern = /cva\s*\(\s*"([^"]+)"\s*,\s*,\s*{/g;
  modified = modified.replaceAll(cvaPattern, 'cva(["$1"], {');
  fixCount += (content.match(cvaPattern) || []).length;

  // Fix patterns where cva has string arguments before the config object
  const cvaMultiStringPattern = /cva\s*\(\s*("(?:[^"\\]|\\.)*"(?:\s*,\s*"(?:[^"\\]|\\.)*")*)\s*,\s*{/g;
  modified = modified.replaceAll(cvaMultiStringPattern, (match, strings) => {
    return `cva([${strings}], {`;
  });

  // Fix cva calls that already have array syntax but might have issues
  const cvaArrayPattern = /cva\s*\(\s*\[\s*([^\]]+)\s*]\s*,\s*,\s*{/g;
  modified = modified.replaceAll(cvaArrayPattern, 'cva([$1], {');

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} cva function calls in ${filePath}`);
  }

  return modified;
}

// Fix aria-current boolean to string
function fixAriaCurrent(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // aria-current={true} to aria-current="page"
  modified = modified.replaceAll('aria-current={true}', 'aria-current="page"');
  fixCount += (content.match(/aria-current={true}/g) || []).length;

  // aria-current={false} to aria-current={undefined}
  modified = modified.replaceAll('aria-current={false}', 'aria-current={undefined}');
  fixCount += (content.match(/aria-current={false}/g) || []).length;

  // aria-current={someBoolean ? true : false} to aria-current={someBoolean ? "page" : undefined}
  const ariaCurrentTernaryPattern = /aria-current={([^?]+)\?\s*true\s*:\s*false}/g;
  modified = modified.replaceAll(ariaCurrentTernaryPattern, 'aria-current={$1 ? "page" : undefined}');
  fixCount += (content.match(ariaCurrentTernaryPattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} aria-current issues in ${filePath}`);
  }

  return modified;
}

// Fix RadioGroupItem value prop
function fixRadioGroupValue(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // RadioGroupItem value={number} to value={string}
  const radioGroupPattern = /<RadioGroupItem[^>]*value={(\d+)}/g;
  modified = modified.replaceAll(radioGroupPattern, (match, num) => {
    return match.replace(`value={${num}}`, `value="${num}"`);
  });
  fixCount += (content.match(radioGroupPattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} RadioGroupItem value issues in ${filePath}`);
  }

  return modified;
}

// Process all TypeScript/TSX files
async function processFiles() {
  const files = await glob('src/**/*.{ts,tsx}', { 
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.spec.*']
  });

  console.log(`Found ${files.length} TypeScript files to process.\n`);

  for (const file of files) {
    const filePath = join(process.cwd(), file);
    
    if (!existsSync(filePath)) {continue;}
    
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Apply all fixes
    content = fixBooleanToStringLiterals(content, file);
    content = fixUndefinedToNull(content, file);
    content = fixGlassEffectOptions(content, file);
    content = fixCvaFunctionCalls(content, file);
    content = fixAriaCurrent(content, file);
    content = fixRadioGroupValue(content, file);
    
    if (content !== originalContent) {
      writeFileSync(filePath, content);
      totalFixed++;
    }
  }

  console.log(`\n✅ Processing complete! Fixed issues in ${totalFixed} files.`);
}

// Run the fixes
processFiles().catch(console.error);