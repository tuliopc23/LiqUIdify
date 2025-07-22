#!/usr/bin/env node

/**
 * Component Performance Optimizer
 * Applies React.memo and useMemo optimizations to components for 55fps performance
 */

import { promises as fs } from 'fs';
import path from 'path';

class ComponentPerformanceOptimizer {
  constructor() {
    this.optimizations = [];
    this.componentsOptimized = 0;
  }

  log(message, level = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };

    console.log(`${colors[level]}[Component Optimizer] ${message}${colors.reset}`);
  }

  async optimizeComponent(filePath) {
    try {
      let content = await fs.readFile(filePath, 'utf8');
      const originalContent = content;
      
      // Add React.memo import if needed
      if (!content.includes('memo') && content.includes('export')) {
        content = content.replace(
          /(import.*from\s+['"]react['"])/,
          "$1\nimport { memo } from 'react';"
        );
      }

      // Add useMemo for expensive computations
      if (!content.includes('useMemo') && content.includes('const')) {
        content = content.replace(
          /(import.*from\s+['"]react['"])/,
          "$1\nimport { useMemo } from 'react';"
        );
      }

      // Memoize style objects and className computations
      content = content.replace(
        /const\s+(\w+Classes?)\s*=\s*cn\([^)]+\);?/g,
        'const $1 = useMemo(() => cn($&), [dependencies]);'
      );

      // Add React.memo to component exports (more targeted approach)
      if (content.includes('forwardRef')) {
        content = content.replace(
          /export\s+default\s+forwardRef\(/,
          'export default memo(forwardRef('
        ).replace(/\)\s*;\s*$/, '));');
      } else {
        content = content.replace(
          /export\s+default\s+(function\s+\w+|const\s+\w+\s*=)/,
          'export default memo($1'
        ).replace(/;$/, ');');
      }

      if (content !== originalContent) {
        await fs.writeFile(filePath, content);
        this.componentsOptimized++;
        this.optimizations.push(`Optimized ${path.basename(filePath)}`);
        this.log(`✓ Optimized ${filePath}`, 'success');
        return true;
      }
      
      return false;
    } catch (error) {
      this.log(`⚠️ Could not optimize ${filePath}: ${error.message}`, 'warn');
      return false;
    }
  }

  async findComponentFiles() {
    const componentDirs = [
      './src/components/glass-button-refactored',
      './src/components/glass-card-refactored',
      './src/components/glass-input',
      './src/components/glass-modal',
    ];

    const files = [];
    
    for (const dir of componentDirs) {
      try {
        const entries = await fs.readdir(dir);
        for (const entry of entries) {
          if (entry.endsWith('.tsx') && !entry.includes('.test.') && !entry.includes('.stories.')) {
            files.push(path.join(dir, entry));
          }
        }
      } catch (error) {
        // Directory might not exist, continue
      }
    }
    
    return files;
  }

  async run() {
    try {
      this.log('🚀 Starting component performance optimization...');
      
      const componentFiles = await this.findComponentFiles();
      this.log(`Found ${componentFiles.length} component files to optimize`);
      
      for (const file of componentFiles) {
        await this.optimizeComponent(file);
      }
      
      this.log(`✅ Optimization complete: ${this.componentsOptimized} components optimized`, 'success');
      this.log('Applied optimizations:');
      this.optimizations.forEach(opt => this.log(`  • ${opt}`));
      
      return this.componentsOptimized;
      
    } catch (error) {
      this.log(`❌ Optimization failed: ${error.message}`, 'error');
      throw error;
    }
  }
}

// Run optimization
const optimizer = new ComponentPerformanceOptimizer();
optimizer.run();