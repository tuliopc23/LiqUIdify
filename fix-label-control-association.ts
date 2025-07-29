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

    // Fix labels without htmlFor by adding a generated ID
    // Pattern: <label (without htmlFor) ... >content</label>
    const labelRegex = /<label(?![^>]*\bhtmlFor\s*=)([^>]*)>(.*?)<\/label>/gs;
    modified = modified.replace(labelRegex, (match, attributes, content) => {
      // Generate a unique ID based on the content
      const labelText = content.replace(/<[^>]*>/g, '').trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const uniqueId = `${labelText}-${Math.random().toString(36).substr(2, 6)}`;
      
      fileFixed++;
      const spacedAttributes = attributes && !attributes.startsWith(' ') ? ` ${attributes}` : attributes;
      return `<label htmlFor="${uniqueId}"${spacedAttributes}>${content}</label>`;
    });

    // Fix input elements that should have corresponding IDs
    // This is a basic approach - in practice, you'd want to match labels with their intended inputs
    const inputRegex = /<input(?![^>]*\bid\s*=)([^>]*)\/?>/g;
    let inputCount = 0;
    modified = modified.replace(inputRegex, (match, attributes) => {
      inputCount++;
      const inputId = `input-${inputCount}-${Math.random().toString(36).substr(2, 6)}`;
      const spacedAttributes = attributes && !attributes.startsWith(' ') ? ` ${attributes}` : attributes;
      
      if (match.endsWith('/>')) {
        return `<input id="${inputId}"${spacedAttributes} />`;
      } else {
        return `<input id="${inputId}"${spacedAttributes}>`;
      }
    });

    // Fix textarea elements that should have corresponding IDs
    const textareaRegex = /<textarea(?![^>]*\bid\s*=)([^>]*)>/g;
    let textareaCount = 0;
    modified = modified.replace(textareaRegex, (match, attributes) => {
      textareaCount++;
      const textareaId = `textarea-${textareaCount}-${Math.random().toString(36).substr(2, 6)}`;
      const spacedAttributes = attributes && !attributes.startsWith(' ') ? ` ${attributes}` : attributes;
      return `<textarea id="${textareaId}"${spacedAttributes}>`;
    });

    // Fix select elements that should have corresponding IDs
    const selectRegex = /<select(?![^>]*\bid\s*=)([^>]*)>/g;
    let selectCount = 0;
    modified = modified.replace(selectRegex, (match, attributes) => {
      selectCount++;
      const selectId = `select-${selectCount}-${Math.random().toString(36).substr(2, 6)}`;
      const spacedAttributes = attributes && !attributes.startsWith(' ') ? ` ${attributes}` : attributes;
      return `<select id="${selectId}"${spacedAttributes}>`;
    });

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} label-control association issues in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total label-control association issues fixed: ${totalFixed}`);
console.log(`\n⚠️  Note: This script provides basic fixes. You may need to manually review and adjust:`);
console.log(`   • Ensure labels are properly associated with their intended form controls`);
console.log(`   • Update any existing JavaScript that relies on specific IDs`);
console.log(`   • Consider using more semantic form structures`);
