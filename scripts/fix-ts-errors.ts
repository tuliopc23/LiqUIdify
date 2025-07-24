#!/usr/bin/env bun

import { readFile, writeFile } from 'node:fs/promises';
import { glob } from 'glob';
import { execSync } from 'node:child_process';

// Get all TypeScript errors
function getTypeScriptErrors(): Map<string, Set<number>> {
  const errors = new Map<string, Set<number>>();
  
  try {
    execSync('bun run type-check', { encoding: 'utf8' });
  } catch (error: any) {
    const output = error.stdout || '';
    const lines = output.split('\n');
    
    for (const line of lines) {
      const match = line.match(/^(.+?)\((\d+),\d+\): error TS2578: Unused '@ts-expect-error' directive\./);
      if (match) {
        const [, file, lineNum] = match;
        if (!errors.has(file)) {
          errors.set(file, new Set());
        }
        errors.get(file)!.add(Number.parseInt(lineNum, 10));
      }
    }
  }
  
  return errors;
}

// Remove unused @ts-expect-error directives
async function removeUnusedTsExpectErrors() {
  console.log('🔍 Finding unused @ts-expect-error directives...');
  const errors = getTypeScriptErrors();
  
  let totalFixed = 0;
  
  for (const [filePath, lineNumbers] of errors) {
    try {
      const content = await readFile(filePath, 'utf8');
      const lines = content.split('\n');
      
      // Sort line numbers in descending order to avoid index shifting
      const sortedLineNumbers = [...lineNumbers].sort((a, b) => b - a);
      
      for (const lineNum of sortedLineNumbers) {
        const lineIndex = lineNum - 1;
        if (lines[lineIndex] && lines[lineIndex].trim() === '// @ts-expect-error') {
          lines.splice(lineIndex, 1);
          totalFixed++;
        }
      }
      
      await writeFile(filePath, lines.join('\n'));
      console.log(`✅ Fixed ${lineNumbers.size} errors in ${filePath}`);
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
    }
  }
  
  console.log(`\n✨ Removed ${totalFixed} unused @ts-expect-error directives`);
  return totalFixed;
}

// Fix undefined assignments
async function fixUndefinedAssignments() {
  console.log('\n🔍 Fixing undefined assignments...');
  
  const patterns = [
    {
      pattern: /Type 'undefined' is not assignable to type '(.+?)'/,
      files: await glob('src/**/*.{ts,tsx}'),
    }
  ];
  
  let fixedCount = 0;
  
  for (const { files } of patterns) {
    for (const file of files) {
      try {
        let content = await readFile(file, 'utf8');
        let modified = false;
        
        // Fix undefined assignments to null
        content = content.replaceAll(
          /(\w+)\s*=\s*undefined;(\s*\/\/.*Type 'undefined' is not assignable to type '.+?\s*\|\s*null')?/g,
          (match, varName) => {
            modified = true;
            fixedCount++;
            return `${varName} = null;`;
          }
        );
        
        if (modified) {
          await writeFile(file, content);
          console.log(`✅ Fixed undefined assignments in ${file}`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    }
  }
  
  console.log(`✨ Fixed ${fixedCount} undefined assignments`);
  return fixedCount;
}

// Main function
async function main() {
  console.log('🚀 Starting TypeScript error fixes...\n');
  
  // Step 1: Remove unused @ts-expect-error directives
  await removeUnusedTsExpectErrors();
  
  // Step 2: Fix undefined assignments
  await fixUndefinedAssignments();
  
  // Run type check again to see remaining errors
  console.log('\n📊 Running type check to see remaining errors...');
  try {
    execSync('bun run type-check', { stdio: 'inherit' });
    console.log('✅ No TypeScript errors remaining!');
  } catch {
    console.log('⚠️  Some TypeScript errors remain. Check the output above.');
  }
}

main().catch(console.error);