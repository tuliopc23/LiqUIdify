#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';

console.log('🔧 Fixing specific TypeScript errors...\n');

let totalFixed = 0;

// Fix aria-current null to undefined
function fixAriaCurrentNull(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Replace aria-current={condition ? "page" : null} with undefined
  const ariaCurrentNullPattern = /aria-current={([^?]+)\?\s*"page"\s*:\s*null}/g;
  modified = modified.replaceAll(ariaCurrentNullPattern, 'aria-current={$1 ? "page" : undefined}');
  fixCount += (content.match(ariaCurrentNullPattern) || []).length;

  // Replace aria-current="page" | null type annotations
  const ariaCurrentTypePattern = /"aria-current":\s*"page"\s*\|\s*null/g;
  modified = modified.replaceAll(ariaCurrentTypePattern, '"aria-current": "page" | undefined');
  fixCount += (content.match(ariaCurrentTypePattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} aria-current null issues in ${filePath}`);
  }

  return modified;
}

// Fix role and tabIndex null to undefined
function fixRoleAndTabIndexNull(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix role={condition ? "button" : null} to undefined
  const roleNullPattern = /role={([^?]+)\?\s*"([^"]+)"\s*:\s*null}/g;
  modified = modified.replaceAll(roleNullPattern, 'role={$1 ? "$2" : undefined}');
  fixCount += (content.match(roleNullPattern) || []).length;

  // Fix tabIndex={condition ? 0 : null} to undefined
  const tabIndexNullPattern = /tabIndex={([^?]+)\?\s*(\d+)\s*:\s*null}/g;
  modified = modified.replaceAll(tabIndexNullPattern, 'tabIndex={$1 ? $2 : undefined}');
  fixCount += (content.match(tabIndexNullPattern) || []).length;

  // Fix aria-pressed null to undefined
  const ariaPressedNullPattern = /aria-pressed={([^?]+)\?\s*([^:]+)\s*:\s*null}/g;
  modified = modified.replaceAll(ariaPressedNullPattern, 'aria-pressed={$1 ? $2 : undefined}');
  fixCount += (content.match(ariaPressedNullPattern) || []).length;

  // Fix aria-label null to undefined
  const ariaLabelNullPattern = /aria-label={([^?]+)\?\s*"([^"]+)"\s*:\s*null}/g;
  modified = modified.replaceAll(ariaLabelNullPattern, 'aria-label={$1 ? "$2" : undefined}');
  fixCount += (content.match(ariaLabelNullPattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} role/tabIndex null issues in ${filePath}`);
  }

  return modified;
}

// Fix button type null to undefined
function fixButtonTypeNull(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix type={!asChild ? type : null} to undefined
  const typeNullPattern = /type={([^?]+)\?\s*([^:]+)\s*:\s*null}/g;
  modified = modified.replaceAll(typeNullPattern, 'type={$1 ? $2 : undefined}');
  fixCount += (content.match(typeNullPattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} button type null issues in ${filePath}`);
  }

  return modified;
}

// Fix cva function calls with too many arguments
function fixCvaArguments(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix cva with two separate arguments (classes and config)
  // cva("classes", { variants: ... }) => cva(["classes"], { variants: ... })
  const cvaTwoArgsPattern = /cva\s*\(\s*"([^"]+)"\s*,\s*{/g;
  modified = modified.replaceAll(cvaTwoArgsPattern, 'cva(["$1"], {');
  fixCount += (content.match(cvaTwoArgsPattern) || []).length;

  // Fix cva with array and config but extra comma
  const cvaExtraCommaPattern = /cva\s*\(\s*\[([^\]]+)]\s*,\s*,\s*{/g;
  modified = modified.replaceAll(cvaExtraCommaPattern, 'cva([$1], {');
  fixCount += (content.match(cvaExtraCommaPattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} cva argument issues in ${filePath}`);
  }

  return modified;
}

// Fix BreadcrumbItem type issues
function fixBreadcrumbItemTypes(content: string, filePath: string): string {
  if (!filePath.includes('breadcrumbs')) {return content;}

  let modified = content;
  let fixCount = 0;

  // Fix the ellipsis item to match BreadcrumbItem interface
  const ellipsisPattern = /{\s*label:\s*"\.\.\."\s*,\s*href:\s*null\s*,\s*onClick:\s*null\s*,\s*icon:\s*null\s*,?\s*}/g;
  modified = modified.replaceAll(ellipsisPattern, 
    '{\n\t\t\t\t\t\t\t\tlabel: "...",\n\t\t\t\t\t\t\t} as BreadcrumbItem');
  fixCount += (content.match(ellipsisPattern) || []).length;

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} BreadcrumbItem type issues in ${filePath}`);
  }

  return modified;
}

// Fix isActive type issues in breadcrumbs
function fixIsActiveType(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Fix isActive: boolean to isActive: boolean ? "true" : "false"
  const isActivePattern = /isActive:\s*([^,}]+)(?=\s*[,}])/g;
  modified = modified.replaceAll(isActivePattern, (match, value) => {
    // Skip if already converted to string literal
    if (value.includes('"true"') || value.includes('"false"')) {
      return match;
    }
    // Skip if it's a defaultVariant definition
    if (match.includes('defaultVariants')) {
      return match;
    }
    // Convert boolean expressions to string literals
    if (value.trim() === 'isLast') {
      fixCount++;
      return `isActive: isLast ? "true" : "false"`;
    }
    if (value.trim() === 'true' || value.trim() === 'false') {
      fixCount++;
      return `isActive: "${value.trim()}"`;
    }
    return match;
  });

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} isActive type issues in ${filePath}`);
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
    content = fixAriaCurrentNull(content, file);
    content = fixRoleAndTabIndexNull(content, file);
    content = fixButtonTypeNull(content, file);
    content = fixCvaArguments(content, file);
    content = fixBreadcrumbItemTypes(content, file);
    content = fixIsActiveType(content, file);
    
    if (content !== originalContent) {
      writeFileSync(filePath, content);
      totalFixed++;
    }
  }

  console.log(`\n✅ Processing complete! Fixed issues in ${totalFixed} files.`);
}

// Run the fixes
processFiles().catch(console.error);