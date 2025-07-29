#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Find all TypeScript and TSX files
const files = glob.sync('libs/components/src/**/*.{ts,tsx}', { 
  ignore: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'] 
});

let totalFixed = 0;

// Mapping of roles to semantic elements
const roleToElement: Record<string, string> = {
  'region': 'section',
  'main': 'main',
  'navigation': 'nav',
  'banner': 'header',
  'contentinfo': 'footer',
  'complementary': 'aside',
  'article': 'article',
  'heading': 'h2', // Default to h2, might need manual adjustment
};

for (const file of files) {
  try {
    const content = readFileSync(file, 'utf-8');
    let modified = content;
    let fileFixed = 0;

    // Fix divs with role attributes that should be semantic elements
    for (const [role, element] of Object.entries(roleToElement)) {
      // Pattern: <div ... role="role" ... >
      const divRoleRegex = new RegExp(`<div([^>]*?)\\s+role="${role}"([^>]*?)>`, 'g');
      modified = modified.replace(divRoleRegex, (match, beforeRole, afterRole) => {
        fileFixed++;
        // Remove the role attribute since semantic element provides it implicitly
        const attributes = (beforeRole + afterRole).trim();
        return `<${element}${attributes ? ' ' + attributes : ''}>`;
      });

      // Also handle the case where role is first
      const roleFirstRegex = new RegExp(`<div\\s+role="${role}"([^>]*?)>`, 'g');
      modified = modified.replace(roleFirstRegex, (match, attributes) => {
        // Only replace if not already replaced
        if (!match.includes(`<${element}`)) {
          fileFixed++;
          return `<${element}${attributes ? ' ' + attributes.trim() : ''}>`;
        }
        return match;
      });
    }

    // Now we need to fix the corresponding closing tags
    // This is more complex, so we'll do a simple approach for common cases
    if (fileFixed > 0) {
      // For each semantic element we introduced, we need to find and replace the corresponding </div>
      // This is a simplified approach - in a real scenario, you'd want proper AST parsing
      
      // Count opening tags to match with closing tags
      const lines = modified.split('\n');
      const stack: string[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Find opening semantic tags we just created
        for (const element of Object.values(roleToElement)) {
          const openRegex = new RegExp(`<${element}[^>]*>`, 'g');
          const matches = line.match(openRegex);
          if (matches) {
            matches.forEach(() => stack.push(element));
          }
        }
        
        // Find closing div tags and replace with appropriate semantic closing tag
        if (line.includes('</div>') && stack.length > 0) {
          const element = stack.pop();
          if (element) {
            lines[i] = line.replace('</div>', `</${element}>`);
          }
        }
      }
      
      modified = lines.join('\n');
    }

    if (fileFixed > 0) {
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} semantic element issues in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total semantic element issues fixed: ${totalFixed}`);