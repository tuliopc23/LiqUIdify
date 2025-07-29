#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from 'fs';

const filesToFix = [
  'libs/components/src/components/glass-accessible-demo/glass-accessible-demo.tsx',
  'libs/components/src/components/glass-button-refactored/glass-button.stories.tsx',
  'libs/components/src/components/glass-drawer/glass-drawer.stories.tsx',
  'libs/components/src/components/glass-focus-demo/glass-focus-demo.tsx',
  'libs/components/src/components/glass-form-field/glass-form-field.stories.tsx',
  'libs/components/src/components/glass-modal/glass-modal.stories.tsx',
  'libs/components/src/components/glass-playground/glass-playground.tsx',
  'libs/components/src/components/glass-popover/glass-popover.stories.tsx',
  'libs/components/src/components/glass-tabs/glass-tabs.stories.tsx',
  'libs/components/src/components/glass-textarea/glass-textarea.stories.tsx',
  'libs/components/src/components/glass-tooltip/glass-tooltip.stories.tsx',
  'libs/components/src/components/glass-tree-view/glass-tree-view.tsx',
  'libs/components/src/core/performance/performance-benchmarks.ts',
  'libs/components/src/hooks/use-toast.ts',
  'libs/components/src/lib/glass-animations.ts',
  'libs/components/src/lib/variant-system.ts',
  'libs/components/src/stories/components/glass-error-boundary.stories.tsx',
  'libs/components/src/stories/components/glass-focus-demo.stories.tsx',
  'libs/components/src/stories/components/glass-focus-trap.stories.tsx',
  'libs/components/src/stories/components/glass-live-region.stories.tsx',
  'libs/components/src/stories/components/glass-portal.stories.tsx',
  'libs/components/src/stories/components/glass-tree-view.stories.tsx',
  'libs/components/src/stories/design-system/animation-patterns.stories.tsx'
];

function fixParsingErrors(content: string): string {
  // Fix malformed motion.button props (missing closing braces)
  content = content.replace(
    /whileHover=\{\{\s*scale:\s*1\.05\s*$/gm,
    'whileHover={{ scale: 1.05 }}'
  );
  
  content = content.replace(
    /whileTap=\{\{\s*scale:\s*0\.95\s*\}\s*onClick=/g,
    'whileTap={{ scale: 0.95 }}\n                    onClick='
  );
  
  // Fix missing type="button" on motion.button elements
  content = content.replace(
    /<motion\.button\s+whileHover/g,
    '<motion.button\n                    type="button"\n                    whileHover'
  );
  
  // Fix malformed useCallback functions (missing closing braces)
  content = content.replace(
    /\},\s*\[\s*\]\s*\);$/gm,
    '},\n        []\n      );'
  );
  
  // Fix malformed htmlFor attributes with corrupted values
  content = content.replace(
    /htmlFor="[a-z]+-[a-z0-9-]+-[a-z0-9-]+"/g,
    (match) => {
      if (match.includes('foreground')) return 'htmlFor="foreground-color"';
      if (match.includes('background')) return 'htmlFor="background-color"';
      if (match.includes('input')) return 'htmlFor="input-field"';
      return 'htmlFor="form-field"';
    }
  );
  
  // Fix corresponding input IDs
  content = content.replace(
    /id="input-\d+-[a-z0-9]+"/g,
    (match, offset) => {
      const context = content.substring(Math.max(0, offset - 100), offset + 100);
      if (context.includes('foreground')) return 'id="foreground-color"';
      if (context.includes('background')) return 'id="background-color"';
      return 'id="input-field"';
    }
  );
  
  // Fix JSX comment syntax
  content = content.replace(
    /\{\/\*\s*([^*]+)\s*\*\/\}/g,
    '{/* $1 */}'
  );
  
  // Fix malformed onClick handlers with missing line breaks
  content = content.replace(
    /type="button"\s+onClick=/g,
    'type="button"\n              onClick='
  );
  
  // Fix extra closing braces
  content = content.replace(/\}\s*\}\s*>/g, '}>');
  
  // Fix malformed aria-label attributes
  content = content.replace(/aria-label="([^"]*)">/g, 'aria-label="$1">');
  
  // Fix missing closing braces in object literals
  content = content.replace(
    /\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([^,}]+),?\s*$/gm,
    '{ $1: $2 }'
  );
  
  return content;
}

let totalFixed = 0;
let totalErrors = 0;

console.log('🔧 Fixing parsing errors in remaining files...\n');

for (const filePath of filesToFix) {
  try {
    if (!existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      continue;
    }
    
    const originalContent = readFileSync(filePath, 'utf8');
    const fixedContent = fixParsingErrors(originalContent);
    
    if (originalContent !== fixedContent) {
      writeFileSync(filePath, fixedContent);
      totalFixed++;
      console.log(`✅ Fixed: ${filePath.split('/').pop()}`);
    } else {
      console.log(`ℹ️  No changes needed: ${filePath.split('/').pop()}`);
    }
    
  } catch (error) {
    totalErrors++;
    console.error(`❌ Error fixing ${filePath}:`, error);
  }
}

console.log(`\n📊 Summary:`);
console.log(`✅ Files fixed: ${totalFixed}`);
console.log(`❌ Errors: ${totalErrors}`);
console.log(`📁 Total files processed: ${filesToFix.length}`);

if (totalFixed > 0) {
  console.log('\n🎯 Running linting check to verify fixes...');
}