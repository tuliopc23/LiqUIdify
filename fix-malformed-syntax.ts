#!/usr/bin/env bun

console.log('🔧 Fixing Malformed Syntax Issues');
console.log('=================================\n');

import { readFileSync, writeFileSync } from 'fs';

// List of files with parsing errors
const problematicFiles = [
  'libs/components/src/components/component-showcase/component-showcase.tsx',
  'libs/components/src/components/glass-accessible-demo/glass-accessible-demo.tsx',
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

    // Fix malformed onKeyDown handlers that were created by previous automation
    // Pattern: } onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => ... )(e); },
    const malformedKeyDownRegex = /\}\s+onKeyDown=\{[^}]*\(\(\)\s*=>\s*[^}]*\)\(e\);\s*\},?/g;
    const keyDownMatches = modified.match(malformedKeyDownRegex);
    if (keyDownMatches) {
      fileFixed += keyDownMatches.length;
      modified = modified.replace(malformedKeyDownRegex, '}');
    }

    // Fix malformed function calls like (() => ... )(e);
    const malformedFunctionCallRegex = /\(\(\)\s*=>\s*([^)]+)\)\(e\);\s*\}/g;
    const functionCallMatches = modified.match(malformedFunctionCallRegex);
    if (functionCallMatches) {
      fileFixed += functionCallMatches.length;
      modified = modified.replace(malformedFunctionCallRegex, '$1; }');
    }

    // Fix malformed JSX with extra closing braces and parentheses
    const malformedJSXRegex = /\)\(e\);\s*\},?\s*\}\)/g;
    const jsxMatches = modified.match(malformedJSXRegex);
    if (jsxMatches) {
      fileFixed += jsxMatches.length;
      modified = modified.replace(malformedJSXRegex, '}');
    }

    // Fix any remaining malformed syntax patterns
    const extraBracesRegex = /\}\s*\}\s*\)/g;
    const extraBracesMatches = modified.match(extraBracesRegex);
    if (extraBracesMatches) {
      fileFixed += extraBracesMatches.length;
      modified = modified.replace(extraBracesRegex, '}');
    }

    // Fix incomplete function calls
    const incompleteFunctionRegex = /\(\(\)\s*=>\s*$/gm;
    const incompleteMatches = modified.match(incompleteFunctionRegex);
    if (incompleteMatches) {
      fileFixed += incompleteMatches.length;
      modified = modified.replace(incompleteFunctionRegex, '');
    }

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} syntax errors in ${file}`);
      totalFixed += fileFixed;
    } else {
      console.log(`ℹ️  No syntax errors found in ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total syntax errors fixed: ${totalFixed}`);
