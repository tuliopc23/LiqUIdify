#!/usr/bin/env node

/**
 * CSS Performance Optimizer for S-Tier Standards
 * 
 * This script optimizes the CSS bundle for maximum performance:
 * - Removes unused CSS classes
 * - Optimizes glass effect styles for better paint performance
 * - Purges unnecessary design tokens
 * - Implements critical CSS extraction
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_CSS_SIZE = 50 * 1024; // 50KB target (much smaller than current 284KB)
const CRITICAL_CSS_SIZE = 15 * 1024; // 15KB for critical CSS

class CSSPerformanceOptimizer {
  constructor() {
    this.sourceDir = './src';
    this.distDir = './dist';
    this.usedClasses = new Set();
    this.criticalClasses = new Set();
    this.glassEffectClasses = new Set();
  }

  log(message, level = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };

    console.log(`${colors[level]}[CSS Optimizer] ${message}${colors.reset}`);
  }

  async analyzeUsedClasses() {
    this.log('Analyzing used CSS classes in source code...');

    const sourceFiles = await this.findSourceFiles();
    const classPattern = /class(?:Name)?=["'`]([^"'`]+)["'`]/g;
    const cnPattern = /cn\(([^)]+)\)/g;

    for (const file of sourceFiles) {
      const content = await fs.readFile(file, 'utf8');
      
      // Extract className attributes
      let match;
      while ((match = classPattern.exec(content)) !== null) {
        const classes = match[1].split(/\s+/);
        classes.forEach(cls => {
          if (cls.trim()) {
            this.usedClasses.add(cls.trim());
          }
        });
      }

      // Extract classes from cn() calls
      while ((match = cnPattern.exec(content)) !== null) {
        // Parse the cn() call content for string literals
        const cnContent = match[1];
        const stringMatches = cnContent.match(/["'`]([^"'`]+)["'`]/g);
        if (stringMatches) {
          stringMatches.forEach(str => {
            const classes = str.replace(/["'`]/g, '').split(/\s+/);
            classes.forEach(cls => {
              if (cls.trim()) {
                this.usedClasses.add(cls.trim());
              }
            });
          });
        }
      }

      // Identify critical classes (used in core components)
      if (file.includes('/core/') || file.includes('/components/glass-button') || file.includes('/components/glass-card')) {
        let criticalMatch;
        const criticalPattern = /class(?:Name)?=["'`]([^"'`]+)["'`]/g;
        while ((criticalMatch = criticalPattern.exec(content)) !== null) {
          const classes = criticalMatch[1].split(/\s+/);
          classes.forEach(cls => {
            if (cls.trim()) {
              this.criticalClasses.add(cls.trim());
            }
          });
        }
      }

      // Identify glass effect classes
      if (content.includes('glass-') || content.includes('backdrop-blur') || content.includes('liquid-')) {
        let glassMatch;
        const glassPattern = /class(?:Name)?=["'`]([^"'`]*(?:glass-|backdrop-blur|liquid-)[^"'`]*)["'`]/g;
        while ((glassMatch = glassPattern.exec(content)) !== null) {
          const classes = glassMatch[1].split(/\s+/);
          classes.forEach(cls => {
            if (cls.trim() && (cls.includes('glass-') || cls.includes('backdrop-blur') || cls.includes('liquid-'))) {
              this.glassEffectClasses.add(cls.trim());
            }
          });
        }
      }
    }

    this.log(`Found ${this.usedClasses.size} used classes`);
    this.log(`Found ${this.criticalClasses.size} critical classes`);
    this.log(`Found ${this.glassEffectClasses.size} glass effect classes`);
  }

  async findSourceFiles() {
    const files = [];
    
    async function scanDir(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await scanDir(fullPath);
        } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    }
    
    await scanDir(this.sourceDir);
    return files;
  }

  async optimizeCSS() {
    this.log('Optimizing CSS for performance...');

    const cssPath = path.join(this.distDir, 'liquidui.css');
    const originalCSS = await fs.readFile(cssPath, 'utf8');
    const originalSize = originalCSS.length;

    this.log(`Original CSS size: ${(originalSize / 1024).toFixed(2)}KB`);

    // Step 1: Remove unused utilities
    let optimizedCSS = this.removeUnusedUtilities(originalCSS);
    
    // Step 2: Optimize glass effects for performance
    optimizedCSS = this.optimizeGlassEffects(optimizedCSS);
    
    // Step 3: Remove redundant declarations
    optimizedCSS = this.removeRedundantDeclarations(optimizedCSS);
    
    // Step 4: Optimize custom properties
    optimizedCSS = this.optimizeCustomProperties(optimizedCSS);

    // Step 5: Add performance hints
    optimizedCSS = this.addPerformanceHints(optimizedCSS);

    const optimizedSize = optimizedCSS.length;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    // Write optimized CSS
    await fs.writeFile(cssPath, optimizedCSS);
    
    // Create critical CSS
    await this.createCriticalCSS(optimizedCSS);

    this.log(`Optimized CSS size: ${(optimizedSize / 1024).toFixed(2)}KB (${savings}% reduction)`, 'success');

    // Check if we meet the target
    if (optimizedSize <= TARGET_CSS_SIZE) {
      this.log('✅ CSS size target achieved!', 'success');
    } else {
      this.log(`⚠️  CSS size still above target (${(TARGET_CSS_SIZE / 1024).toFixed(2)}KB)`, 'warn');
    }

    return optimizedSize;
  }

  removeUnusedUtilities(css) {
    this.log('Removing unused utility classes...');

    // Keep only utilities that are actually used
    const lines = css.split('\n');
    const filteredLines = [];
    let insideUnusedRule = false;
    let braceCount = 0;

    for (const line of lines) {
      // Check if this line starts a CSS rule
      if (line.includes('{') && !line.trim().startsWith('/*')) {
        const selector = line.substring(0, line.indexOf('{')).trim();
        
        // Check if this is a utility class we don't use
        if (this.isUnusedUtility(selector)) {
          insideUnusedRule = true;
          braceCount = 1;
          continue;
        }
      }

      if (insideUnusedRule) {
        // Count braces to know when the rule ends
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        braceCount += openBraces - closeBraces;

        if (braceCount <= 0) {
          insideUnusedRule = false;
        }
        continue;
      }

      filteredLines.push(line);
    }

    return filteredLines.join('\n');
  }

  isUnusedUtility(selector) {
    // Skip @layer, @media, :root, and other non-utility selectors
    if (selector.startsWith('@') || selector.startsWith(':root') || selector.includes('::')) {
      return false;
    }

    // Extract class names from selector
    const classMatches = selector.match(/\.([\w-]+)/g);
    if (!classMatches) return false;

    // Check if any of the classes in this selector are used
    return !classMatches.some(classMatch => {
      const className = classMatch.substring(1); // Remove the dot
      return this.usedClasses.has(className) || 
             this.isEssentialClass(className) ||
             className.startsWith('glass-') ||
             className.startsWith('liquid-');
    });
  }

  isEssentialClass(className) {
    // Keep essential classes even if not detected in static analysis
    const essential = [
      'sr-only', 'not-sr-only', 'focus-visible', 'group-hover', 'group-focus',
      'hover', 'focus', 'active', 'disabled', 'dark', 'light'
    ];

    return essential.some(pattern => className.includes(pattern));
  }

  optimizeGlassEffects(css) {
    this.log('Optimizing glass effect performance...');

    // Add performance optimizations for backdrop-filter
    css = css.replace(
      /backdrop-filter:\s*blur\([^)]+\);/g,
      (match) => {
        return `${match}\n  will-change: backdrop-filter;\n  transform: translateZ(0);`;
      }
    );

    // Optimize glass classes for better compositing
    css = css.replace(
      /\.glass-[^{]*{([^}]*)}/g,
      (match, content) => {
        if (!content.includes('will-change')) {
          content += '\n  will-change: backdrop-filter, opacity, transform;';
        }
        if (!content.includes('transform') || content.includes('transform: none')) {
          content += '\n  transform: translateZ(0);';
        }
        return match.replace(/{\s*([^}]*)\s*}/, `{${content}\n}`);
      }
    );

    return css;
  }

  removeRedundantDeclarations(css) {
    this.log('Removing redundant CSS declarations...');

    // Remove duplicate custom property declarations
    const customPropertyMap = new Map();
    const lines = css.split('\n');
    
    return lines.filter(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('--') && trimmed.includes(':')) {
        const propName = trimmed.split(':')[0].trim();
        if (customPropertyMap.has(propName)) {
          return false; // Skip duplicate
        }
        customPropertyMap.set(propName, true);
      }
      return true;
    }).join('\n');
  }

  optimizeCustomProperties(css) {
    this.log('Optimizing CSS custom properties...');

    // Remove unused custom properties (keep glass-related ones)
    const usedProperties = new Set();
    
    // Find all var() usages
    const varMatches = css.matchAll(/var\((--[\w-]+)/g);
    for (const match of varMatches) {
      usedProperties.add(match[1]);
    }

    // Remove unused property declarations
    return css.replace(/^\s*(--[\w-]+):\s*[^;]+;/gm, (match, propName) => {
      if (usedProperties.has(propName) || propName.includes('glass-') || propName.includes('liquid-')) {
        return match;
      }
      return ''; // Remove unused property
    });
  }

  addPerformanceHints(css) {
    this.log('Adding performance optimization hints...');

    // Add critical performance rules at the top
    const performanceHints = `
/* Performance optimizations for S-tier standards */
.glass-effect, [class*="glass-"], [class*="liquid-"] {
  will-change: backdrop-filter, opacity, transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Optimize animations for 60fps */
@media (prefers-reduced-motion: no-preference) {
  .glass-transition {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
}

/* Disable expensive effects on low-end devices */
@media (prefers-reduced-motion: reduce) {
  .glass-effect, [class*="glass-"] {
    backdrop-filter: none !important;
    background: rgba(255, 255, 255, 0.8) !important;
  }
}

/* Memory-efficient backdrop-filter fallback */
@supports not (backdrop-filter: blur(1px)) {
  .glass-effect, [class*="glass-"] {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
`;

    return performanceHints + '\n' + css;
  }

  async createCriticalCSS(css) {
    this.log('Creating critical CSS...');

    const criticalSelectors = Array.from(this.criticalClasses).map(cls => `.${cls}`);
    const criticalLines = [];
    const lines = css.split('\n');
    
    let insideCriticalRule = false;
    let braceCount = 0;

    for (const line of lines) {
      // Always include root variables and essential styles
      if (line.includes(':root') || line.includes('@layer') || line.includes('@media (prefers-')) {
        criticalLines.push(line);
        continue;
      }

      // Check if this line starts a critical CSS rule
      if (line.includes('{') && !line.trim().startsWith('/*')) {
        const selector = line.substring(0, line.indexOf('{')).trim();
        
        if (this.isCriticalSelector(selector)) {
          insideCriticalRule = true;
          braceCount = 1;
          criticalLines.push(line);
          continue;
        }
      }

      if (insideCriticalRule) {
        criticalLines.push(line);
        
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        braceCount += openBraces - closeBraces;

        if (braceCount <= 0) {
          insideCriticalRule = false;
        }
      }
    }

    const criticalCSS = criticalLines.join('\n');
    const criticalPath = path.join(this.distDir, 'critical.css');
    await fs.writeFile(criticalPath, criticalCSS);

    this.log(`Critical CSS created: ${(criticalCSS.length / 1024).toFixed(2)}KB`);

    if (criticalCSS.length <= CRITICAL_CSS_SIZE) {
      this.log('✅ Critical CSS size target achieved!', 'success');
    } else {
      this.log(`⚠️  Critical CSS size above target (${(CRITICAL_CSS_SIZE / 1024).toFixed(2)}KB)`, 'warn');
    }

    return criticalCSS.length;
  }

  isCriticalSelector(selector) {
    // Critical selectors for above-the-fold content
    const criticalPatterns = [
      'glass-button', 'glass-card', 'glass-input', 'liquid-',
      'backdrop-blur', 'glass-light', 'glass-dark', 'glass-primary'
    ];

    return criticalPatterns.some(pattern => selector.includes(pattern)) ||
           Array.from(this.criticalClasses).some(cls => selector.includes(cls));
  }

  async generateReport() {
    const cssPath = path.join(this.distDir, 'liquidui.css');
    const criticalPath = path.join(this.distDir, 'critical.css');
    
    const cssStats = await fs.stat(cssPath);
    let criticalStats;
    try {
      criticalStats = await fs.stat(criticalPath);
    } catch (e) {
      criticalStats = { size: 0 };
    }

    const report = {
      timestamp: new Date().toISOString(),
      cssSize: cssStats.size,
      cssSizeKB: (cssStats.size / 1024).toFixed(2),
      criticalCSSSize: criticalStats.size,
      criticalCSSSizeKB: (criticalStats.size / 1024).toFixed(2),
      usedClasses: this.usedClasses.size,
      criticalClasses: this.criticalClasses.size,
      glassEffectClasses: this.glassEffectClasses.size,
      targetMet: cssStats.size <= TARGET_CSS_SIZE,
      criticalTargetMet: criticalStats.size <= CRITICAL_CSS_SIZE,
      recommendations: []
    };

    // Add recommendations
    if (!report.targetMet) {
      report.recommendations.push({
        type: 'size-reduction',
        priority: 'high',
        suggestion: 'Further reduce unused utilities and consolidate similar classes'
      });
    }

    if (!report.criticalTargetMet) {
      report.recommendations.push({
        type: 'critical-css',
        priority: 'medium',
        suggestion: 'Reduce critical CSS by deferring non-essential styles'
      });
    }

    // Save report
    await fs.writeFile(
      path.join(this.distDir, 'css-optimization-report.json'),
      JSON.stringify(report, null, 2)
    );

    return report;
  }

  async run() {
    try {
      this.log('🎨 Starting CSS Performance Optimization...');
      this.log('=' .repeat(50));

      await this.analyzeUsedClasses();
      const optimizedSize = await this.optimizeCSS();
      const report = await this.generateReport();

      this.log('=' .repeat(50));
      this.log(`📊 Optimization Summary:`);
      this.log(`• Main CSS: ${report.cssSizeKB}KB`);
      this.log(`• Critical CSS: ${report.criticalCSSSizeKB}KB`);
      this.log(`• Used Classes: ${report.usedClasses}`);
      this.log(`• Target Met: ${report.targetMet ? '✅' : '❌'}`);

      if (report.recommendations.length > 0) {
        this.log('\n📝 Recommendations:');
        report.recommendations.forEach(rec => {
          this.log(`• [${rec.priority.toUpperCase()}] ${rec.suggestion}`, 'warn');
        });
      }

      this.log('\n✅ CSS optimization complete!', 'success');

      if (!report.targetMet) {
        this.log('⚠️  CSS size still above S-tier target', 'warn');
        process.exit(1);
      }

    } catch (error) {
      this.log(`❌ Optimization failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run optimization
const optimizer = new CSSPerformanceOptimizer();
optimizer.run();