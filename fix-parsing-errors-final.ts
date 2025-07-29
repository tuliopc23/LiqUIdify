#!/usr/bin/env bun

console.log('🔧 Fixing Remaining Parsing Errors');
console.log('==================================\n');

import { readFileSync, writeFileSync } from 'fs';

// List of files with parsing errors
const problematicFiles = [
  'libs/components/src/components/component-showcase/component-showcase.tsx',
  'libs/components/src/components/glass-accessible-demo/glass-accessible-demo.tsx',
  'libs/components/src/components/glass-breadcrumbs/glass-breadcrumbs.tsx',
  'libs/components/src/components/glass-button-refactored/glass-button.stories.tsx',
  'libs/components/src/components/glass-button-refactored/glass-button.tsx',
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
  'libs/components/src/stories/components/glass-banner.stories.tsx',
  'libs/components/src/stories/components/glass-error-boundary.stories.tsx',
  'libs/components/src/stories/components/glass-focus-demo.stories.tsx',
  'libs/components/src/stories/components/glass-focus-trap.stories.tsx',
  'libs/components/src/stories/components/glass-live-region.stories.tsx',
  'libs/components/src/stories/components/glass-portal.stories.tsx',
  'libs/components/src/stories/components/glass-tree-view.stories.tsx',
  'libs/components/src/stories/design-system/animation-patterns.stories.tsx'
];

let totalFixed = 0;

for (const file of problematicFiles) {
  try {
    const content = readFileSync(file, 'utf-8');
    let modified = content;
    let fileFixed = 0;

    // Fix extra closing braces in JSX attributes
    // Pattern: onClick={handler} }} -> onClick={handler}
    const extraBracesRegex = /(\w+)=\{([^}]+)\}\s*\}\}/g;
    const extraBracesMatches = modified.match(extraBracesRegex);
    if (extraBracesMatches) {
      fileFixed += extraBracesMatches.length;
      modified = modified.replace(extraBracesRegex, '$1={$2}');
    }

    // Fix malformed JSX with extra braces
    // Pattern: } }}> -> >
    const malformedJSXRegex = /\s*\}\s*\}\s*>/g;
    const malformedMatches = modified.match(malformedJSXRegex);
    if (malformedMatches) {
      fileFixed += malformedMatches.length;
      modified = modified.replace(malformedJSXRegex, '>');
    }

    // Fix extra braces before closing tags
    // Pattern: } }}\n -> \n
    const extraBracesBeforeNewlineRegex = /\s*\}\s*\}\s*\n/g;
    const extraBracesNewlineMatches = modified.match(extraBracesBeforeNewlineRegex);
    if (extraBracesNewlineMatches) {
      fileFixed += extraBracesNewlineMatches.length;
      modified = modified.replace(extraBracesBeforeNewlineRegex, '\n');
    }

    // Fix malformed onKeyDown attributes
    // Pattern: onKeyDown={...} onKeyDown={...} -> onKeyDown={...}
    const duplicateOnKeyDownRegex = /(onKeyDown=\{[^}]+\})\s+onKeyDown=\{[^}]+\}/g;
    const duplicateMatches = modified.match(duplicateOnKeyDownRegex);
    if (duplicateMatches) {
      fileFixed += duplicateMatches.length;
      modified = modified.replace(duplicateOnKeyDownRegex, '$1');
    }

    // Fix malformed closing JSX tags
    // Pattern: </Component} -> </Component>
    const malformedClosingTagRegex = /<\/(\w+)\}/g;
    const closingTagMatches = modified.match(malformedClosingTagRegex);
    if (closingTagMatches) {
      fileFixed += closingTagMatches.length;
      modified = modified.replace(malformedClosingTagRegex, '</$1>');
    }

    // Fix any remaining syntax issues with extra characters
    const extraCharRegex = /(\w+="[^"]*")\s*\}\s*>/g;
    const extraCharMatches = modified.match(extraCharRegex);
    if (extraCharMatches) {
      fileFixed += extraCharMatches.length;
      modified = modified.replace(extraCharRegex, '$1>');
    }

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} parsing errors in ${file}`);
      totalFixed += fileFixed;
    } else {
      console.log(`ℹ️  No parsing errors found in ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total parsing errors fixed: ${totalFixed}`);
console.log('\n📋 Next Steps:');
console.log('1. Format code: bunx @biomejs/biome format --write .');
console.log('2. Run linting to see final status: bunx @biomejs/biome check --reporter=summary');
