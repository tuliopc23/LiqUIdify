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

    // Remove unused variable declarations (simple cases)
    // Pattern: const variableName = ... (but not used elsewhere)
    const lines = modified.split('\n');
    const modifiedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check for variable declarations
      const varMatch = line.match(/^\s*(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/);
      if (varMatch) {
        const varName = varMatch[1];
        
        // Check if variable is used elsewhere in the file
        const restOfFile = lines.slice(i + 1).join('\n');
        const currentLine = line;
        
        // Simple check: if variable name appears elsewhere (not in comments)
        const usageRegex = new RegExp(`\\b${varName}\\b`, 'g');
        const usages = restOfFile.match(usageRegex);
        
        // Also check if it's used in the same line (like destructuring)
        const sameLineUsage = currentLine.split('=')[1]?.includes(varName);
        
        if (!usages && !sameLineUsage) {
          // Variable appears to be unused, skip this line
          console.log(`  Removing unused variable: ${varName} in ${file}`);
          fileFixed++;
          continue;
        }
      }
      
      modifiedLines.push(line);
    }
    
    if (fileFixed > 0) {
      modified = modifiedLines.join('\n');
      writeFileSync(file, modified);
      console.log(`✅ Fixed ${fileFixed} unused variables in ${file}`);
      totalFixed += fileFixed;
    }
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error);
  }
}

console.log(`\n🎉 Total unused variables fixed: ${totalFixed}`);