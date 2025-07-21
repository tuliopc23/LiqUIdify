#!/usr/bin/env node
/**
 * SSR Syntax Fixer
 * Properly fixes malformed ternary operators in SSR-safe code
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🛡️ Fixing SSR syntax issues...');

// Find all TypeScript/TSX files
const files = glob.sync('src/**/*.{ts,tsx}', { ignore: ['**/*.d.ts', '**/*.test.*'] });

let totalFixed = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix malformed ternary operators - pattern: typeof X !== "undefined" ? X.something;
  const fixes = [
    // Fix window access ending with semicolon
    {
      pattern: /typeof window !== "undefined" \? window\.([^;]+);/g,
      replacement: 'typeof window !== "undefined" ? window.$1 : null;'
    },
    // Fix document access ending with semicolon  
    {
      pattern: /typeof document !== "undefined" \? document\.([^;]+);/g,
      replacement: 'typeof document !== "undefined" ? document.$1 : null;'
    },
    // Fix window access ending with comma
    {
      pattern: /typeof window !== "undefined" \? window\.([^,]+),/g,
      replacement: 'typeof window !== "undefined" ? window.$1 : null,'
    },
    // Fix document access ending with comma
    {
      pattern: /typeof document !== "undefined" \? document\.([^,]+),/g,
      replacement: 'typeof document !== "undefined" ? document.$1 : null,'
    },
    // Fix window access ending with closing parenthesis
    {
      pattern: /typeof window !== "undefined" \? window\.([^)]+)\)/g,
      replacement: 'typeof window !== "undefined" ? window.$1 : null)'
    },
    // Fix document access ending with closing parenthesis
    {
      pattern: /typeof document !== "undefined" \? document\.([^)]+)\)/g,
      replacement: 'typeof document !== "undefined" ? document.$1 : null)'
    }
  ];
  
  fixes.forEach(fix => {
    const before = content;
    content = content.replace(fix.pattern, fix.replacement);
    if (content !== before) {
      modified = true;
    }
  });
  
  // Additional specific patterns that are common
  const specificFixes = [
    // Fix addEventListener patterns
    {
      pattern: /typeof document !== "undefined" \? document\.addEventListener\('([^']+)', ([^)]+)\);/g,
      replacement: 'if (typeof document !== "undefined") {\n        document.addEventListener(\'$1\', $2);\n      }'
    },
    // Fix removeEventListener patterns
    {
      pattern: /typeof document !== "undefined" \? document\.removeEventListener\('([^']+)', ([^)]+)\);/g,
      replacement: 'if (typeof document !== "undefined") {\n          document.removeEventListener(\'$1\', $2);\n        }'
    },
    // Fix window addEventListener patterns
    {
      pattern: /typeof window !== "undefined" \? window\.addEventListener\('([^']+)', ([^)]+)\);/g,
      replacement: 'if (typeof window !== "undefined") {\n        window.addEventListener(\'$1\', $2);\n      }'
    },
    // Fix window removeEventListener patterns
    {
      pattern: /typeof window !== "undefined" \? window\.removeEventListener\('([^']+)', ([^)]+)\);/g,
      replacement: 'if (typeof window !== "undefined") {\n          window.removeEventListener(\'$1\', $2);\n        }'
    }
  ];
  
  specificFixes.forEach(fix => {
    const before = content;
    content = content.replace(fix.pattern, fix.replacement);
    if (content !== before) {
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    totalFixed++;
    console.log(`✓ Fixed ${filePath}`);
  }
});

console.log(`✅ Fixed ${totalFixed} files with SSR syntax issues`);

// Also create a summary of remaining issues
console.log('\n📋 Running type check to verify fixes...');
const { execSync } = require('child_process');

try {
  execSync('bun run type-check', { stdio: 'pipe' });
  console.log('✅ All TypeScript errors resolved!');
} catch (error) {
  const output = error.stdout.toString();
  const errorCount = (output.match(/error TS/g) || []).length;
  console.log(`⚠️  ${errorCount} TypeScript errors remaining`);
  
  // Save remaining errors to file
  fs.writeFileSync('remaining-ts-errors.txt', output);
  console.log('📄 Remaining errors saved to: remaining-ts-errors.txt');
}
