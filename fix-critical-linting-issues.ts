#!/usr/bin/env bun

console.log('🚀 Critical Linting Issues Fix Tool');
console.log('===================================\n');

import { execSync } from 'child_process';

const scripts = [
  {
    name: 'Button Type Issues',
    script: 'fix-button-types.ts',
    description: 'Add type="button" to button elements'
  },
  {
    name: 'Label-Control Association',
    script: 'fix-label-control-association.ts',
    description: 'Associate labels with form controls'
  },
  {
    name: 'Anchor Href Issues',
    script: 'fix-anchor-href.ts',
    description: 'Fix invalid anchor href values'
  },
  {
    name: 'SVG Accessibility',
    script: 'fix-svg-accessibility.ts',
    description: 'Add titles and labels to SVGs'
  }
];

let totalIssuesFixed = 0;

for (const { name, script, description } of scripts) {
  console.log(`\n🔧 Running: ${name}`);
  console.log(`   ${description}`);
  console.log('   ' + '─'.repeat(50));
  
  try {
    const output = execSync(`bun ${script}`, { encoding: 'utf-8' });
    console.log(output);
    
    // Extract number of fixes from output
    const fixMatch = output.match(/Total.*?(\d+)/);
    if (fixMatch) {
      totalIssuesFixed += parseInt(fixMatch[1]);
    }
  } catch (error) {
    console.error(`❌ Error running ${script}:`, error.message);
  }
}

console.log('\n' + '='.repeat(60));
console.log('🎉 CRITICAL FIXES SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Total issues fixed: ${totalIssuesFixed}`);

console.log('\n📋 Next Steps:');
console.log('1. Review changes: git diff');
console.log('2. Run linting again: bunx @biomejs/biome check --reporter=summary');
console.log('3. Test your application to ensure functionality');
console.log('4. Commit changes: git add . && git commit -m "fix: resolve critical linting issues"');

console.log('\n⚠️  Manual Review Required:');
console.log('• Verify button styling after anchor-to-button conversions');
console.log('• Ensure form labels are correctly associated');
console.log('• Update any JavaScript that relies on specific element IDs');
console.log('• Review SVG titles for meaningfulness');

console.log('\n🎯 Remaining Issues to Address Manually:');
console.log('• useSemanticElements (200 warnings) - Convert divs to semantic HTML');
console.log('• noStaticElementInteractions (16 errors) - Add proper event handlers');
console.log('• useHookAtTopLevel (6 errors) - Fix React hook usage');
console.log('• useFocusableInteractive (3 errors) - Make interactive elements focusable');

console.log('\n📊 Expected Impact:');
console.log('• Should reduce errors from 135 to ~25-30');
console.log('• Should reduce warnings significantly');
console.log('• Improves accessibility compliance');
console.log('• Better semantic HTML structure');
