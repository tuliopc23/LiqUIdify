#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from 'fs';

const filesToFix = [
  'libs/components/src/components/glass-breadcrumbs/glass-breadcrumbs.tsx',
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

function fixCommonParsingErrors(content: string): string {
  // Fix malformed onClick handlers (missing line breaks)
  content = content.replace(
    /type="button" onClick=\{([^}]+)\}/g,
    'type="button"\n              onClick={$1}'
  );
  
  // Fix malformed aria-label attributes
  content = content.replace(/aria-label="([^"]*)">/g, 'aria-label="$1">');
  
  // Fix extra closing braces in JSX
  content = content.replace(/\}\s*\}/g, '}');
  
  // Fix malformed htmlFor attributes (corrupted IDs)
  content = content.replace(
    /htmlFor="[a-z]+-[a-z0-9-]+-[a-z0-9-]+"/g,
    (match) => {
      const baseId = match.includes('foreground') ? 'foreground-color' :
                    match.includes('background') ? 'background-color' :
                    match.includes('input') ? 'input-field' :
                    'form-field';
      return `htmlFor="${baseId}"`;
    }
  );
  
  // Fix corresponding input IDs
  content = content.replace(
    /id="input-\d+-[a-z0-9]+"/g,
    (match, offset) => {
      const linesBefore = content.substring(0, offset).split('\n').length;
      return `id="input-${linesBefore}"`;
    }
  );
  
  // Fix malformed function calls
  content = content.replace(
    /\(\s*\)\s*=>\s*\{\s*([^}]+)\s*\}\s*\}/g,
    '() => { $1 }'
  );
  
  // Fix missing closing braces for switch statements
  content = content.replace(
    /\s*\);\s*\};\s*return\s+<div>/g,
    '\n        );\n      }\n    }\n  };\n\n  return <div>'
  );
  
  // Fix JSX comment syntax
  content = content.replace(/\/\/\s*([^<\n]+)/g, '{/* $1 */}');
  
  return content;
}

let totalFixed = 0;
let totalErrors = 0;

for (const filePath of filesToFix) {
  try {
    if (!existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      continue;
    }
    
    const originalContent = readFileSync(filePath, 'utf8');
    const fixedContent = fixCommonParsingErrors(originalContent);
    
    if (originalContent !== fixedContent) {
      writeFileSync(filePath, fixedContent);
      totalFixed++;
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`ℹ️  No changes needed: ${filePath}`);
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