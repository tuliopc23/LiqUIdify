#!/usr/bin/env node

/**
 * Auto-optimize Components Script
 * Automatically adds React.memo to components that need it for performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsToOptimize = [
  'glass-accordion',
  'glass-avatar', 
  'glass-badge',
  'glass-checkbox',
  'glass-combobox',
  'glass-date-picker',
  'glass-drawer',
  'glass-dropdown',
  'glass-file-upload',
  'glass-input',
  'glass-modal',
  'glass-notification',
  'glass-number-input',
  'glass-pagination',
  'glass-popover',
  'glass-progress',
  'glass-radio-group',
  'glass-search',
  'glass-select',
  'glass-skeleton',
  'glass-slider',
  'glass-spinner',
  'glass-switch',
  'glass-textarea',
  'glass-toast',
  'glass-tooltip'
];

async function optimizeComponent(componentName) {
  const componentDir = path.join(__dirname, '..', 'src', 'components', componentName);
  
  if (!fs.existsSync(componentDir)) {
    console.log(`⏭️ Skipping ${componentName} - directory not found`);
    return false;
  }
  
  try {
    const files = fs.readdirSync(componentDir);
    const mainFile = files.find(file => 
      file.endsWith('.tsx') && 
      !file.includes('.test.') && 
      !file.includes('.stories.') &&
      file.includes(componentName)
    );
    
    if (!mainFile) {
      console.log(`⏭️ Skipping ${componentName} - main file not found`);
      return false;
    }
    
    const filePath = path.join(componentDir, mainFile);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already optimized
    if (content.includes('React.memo') || content.includes('memo(')) {
      console.log(`✅ ${componentName} already optimized`);
      return true;
    }
    
    // Find the main component export
    const componentPattern = new RegExp(`export\\s+const\\s+(\\w*${componentName.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')}\\w*)\\s*=\\s*(React\\.)?forwardRef`, 'i');
    
    const match = content.match(componentPattern);
    
    if (!match) {
      console.log(`⏭️ Skipping ${componentName} - export pattern not found`);
      return false;
    }
    
    const componentVar = match[1];
    
    // Add React import if not present
    if (!content.includes('import React')) {
      if (content.includes("import { ") && content.includes(" } from 'react'")) {
        content = content.replace(
          /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]react['"]/,
          "import React, { $1 } from 'react'"
        );
      } else {
        content = content.replace(
          /import\s+([^;]+)from\s+['"]react['"]/,
          "import React, $1 from 'react'"
        );
      }
    }
    
    // Wrap the component with React.memo
    const forwardRefPattern = new RegExp(
      `(export\\s+const\\s+${componentVar}\\s*=\\s*)(React\\.)?forwardRef`,
      'g'
    );
    
    content = content.replace(forwardRefPattern, '$1React.memo(React.forwardRef');
    
    // Find the corresponding closing parenthesis and add the memo closing
    const lines = content.split('\n');
    let parenCount = 0;
    let inComponent = false;
    let componentStartLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.includes(`export const ${componentVar}`)) {
        inComponent = true;
        componentStartLine = i;
      }
      
      if (inComponent) {
        const openParens = (line.match(/\(/g) || []).length;
        const closeParens = (line.match(/\)/g) || []).length;
        parenCount += openParens - closeParens;
        
        if (parenCount === 0 && line.includes(');') && i > componentStartLine) {
          lines[i] = line.replace(');', '));');
          break;
        }
      }
    }
    
    content = lines.join('\n');
    
    // Write the optimized content back
    fs.writeFileSync(filePath, content);
    console.log(`🚀 Optimized ${componentName}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Failed to optimize ${componentName}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Auto-optimizing components with React.memo...\n');
  
  let optimized = 0;
  let total = componentsToOptimize.length;
  
  for (const componentName of componentsToOptimize) {
    const success = await optimizeComponent(componentName);
    if (success) optimized++;
  }
  
  console.log(`\n✨ Optimization complete: ${optimized}/${total} components optimized`);
  
  // Run performance test again
  console.log('\n🧪 Running performance test...');
  try {
    const { default: SimplePerformanceTest } = await import('./simple-performance-test.js');
    const test = new SimplePerformanceTest();
    const success = await test.run();
    
    if (success) {
      console.log('\n🎉 S-tier performance achieved!');
    } else {
      console.log('\n⚠️ More optimizations needed');
    }
  } catch (error) {
    console.error('Failed to run performance test:', error);
  }
}

main().catch(console.error);