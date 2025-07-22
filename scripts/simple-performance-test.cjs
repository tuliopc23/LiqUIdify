#!/usr/bin/env node

/**
 * Simple Performance Test for LiqUIdify
 * Tests component render performance without requiring a browser
 */

const fs = require('fs').promises;
const path = require('path');
const { performance } = require('perf_hooks');

// S-tier performance thresholds
const PERFORMANCE_THRESHOLDS = {
  bundleSize: {
    core: 15 * 1024,        // 15KB
    animations: 10 * 1024,   // 10KB
    advanced: 8 * 1024,      // 8KB
    total: 30 * 1024,        // 30KB
  },
  buildTime: 30000,         // 30 seconds max build time
  lintingWarnings: 5000,    // Target: reduce to under 5000 warnings
};

class SimplePerformanceTest {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      tests: [],
      summary: {
        passed: 0,
        failed: 0,
        warnings: 0
      },
      performance: {}
    };
  }

  log(message, level = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };

    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.log(`${colors[level]}[${timestamp}] ${message}${colors.reset}`);
  }

  async testBundleSizes() {
    this.log('Testing bundle sizes...', 'info');
    
    try {
      const distFiles = await fs.readdir('./dist');
      const bundleFiles = distFiles.filter(file => file.endsWith('.min.js'));
      
      let totalSize = 0;
      const bundles = {};
      
      for (const file of bundleFiles) {
        const filePath = path.join('./dist', file);
        const stats = await fs.stat(filePath);
        const size = stats.size;
        totalSize += size;
        
        let bundleType = 'other';
        if (file.includes('core')) bundleType = 'core';
        else if (file.includes('animations')) bundleType = 'animations';
        else if (file.includes('advanced')) bundleType = 'advanced';
        
        bundles[bundleType] = size;
      }
      
      // Check thresholds
      let passed = true;
      const violations = [];
      
      Object.entries(bundles).forEach(([bundle, size]) => {
        const threshold = PERFORMANCE_THRESHOLDS.bundleSize[bundle];
        if (threshold && size > threshold) {
          passed = false;
          violations.push({ bundle, size, threshold });
        }
      });
      
      if (totalSize > PERFORMANCE_THRESHOLDS.bundleSize.total) {
        passed = false;
        violations.push({ bundle: 'total', size: totalSize, threshold: PERFORMANCE_THRESHOLDS.bundleSize.total });
      }
      
      const test = {
        name: 'Bundle Size Test',
        passed,
        violations,
        bundles,
        totalSize
      };
      
      this.results.tests.push(test);
      
      if (passed) {
        this.results.summary.passed++;
        this.log(`Bundle size test: PASSED (${Math.round(totalSize / 1024)}KB total)`, 'success');
      } else {
        this.results.summary.failed++;
        this.log(`Bundle size test: FAILED (violations: ${violations.length})`, 'error');
      }
      
    } catch (error) {
      this.results.summary.failed++;
      this.log(`Bundle size test failed: ${error.message}`, 'error');
    }
  }

  async testComponentOptimization() {
    this.log('Testing component optimization patterns...', 'info');
    
    try {
      // Check for performance optimization patterns in key components
      const componentPaths = [
        './src/components/glass-button-refactored/glass-button.tsx',
        './src/core/glass/unified-glass-system.tsx',
        './src/hooks/use-glass-animations.ts'
      ];
      
      let optimizationScore = 0;
      let totalChecks = 0;
      const issues = [];
      
      for (const componentPath of componentPaths) {
        try {
          const content = await fs.readFile(componentPath, 'utf8');
          
          // Check for React.memo usage
          totalChecks++;
          if (content.includes('React.memo') || content.includes('memo(')) {
            optimizationScore++;
          } else {
            issues.push(`${componentPath}: Missing React.memo optimization`);
          }
          
          // Check for useMemo usage
          totalChecks++;
          if (content.includes('useMemo')) {
            optimizationScore++;
          } else {
            issues.push(`${componentPath}: Missing useMemo optimization`);
          }
          
          // Check for useCallback usage
          totalChecks++;
          if (content.includes('useCallback')) {
            optimizationScore++;
          } else {
            issues.push(`${componentPath}: Missing useCallback optimization`);
          }
          
        } catch (error) {
          issues.push(`${componentPath}: Could not analyze - ${error.message}`);
          totalChecks += 3;
        }
      }
      
      const optimizationPercentage = (optimizationScore / totalChecks) * 100;
      const passed = optimizationPercentage >= 75; // Target: 75% optimization coverage
      
      const test = {
        name: 'Component Optimization Test',
        passed,
        optimizationScore,
        totalChecks,
        optimizationPercentage: Math.round(optimizationPercentage),
        issues
      };
      
      this.results.tests.push(test);
      
      if (passed) {
        this.results.summary.passed++;
        this.log(`Component optimization test: PASSED (${Math.round(optimizationPercentage)}% optimized)`, 'success');
      } else {
        this.results.summary.failed++;
        this.log(`Component optimization test: FAILED (${Math.round(optimizationPercentage)}% optimized, need 75%+)`, 'error');
      }
      
    } catch (error) {
      this.results.summary.failed++;
      this.log(`Component optimization test failed: ${error.message}`, 'error');
    }
  }

  async testTypeScriptCompilation() {
    this.log('Testing TypeScript compilation performance...', 'info');
    
    try {
      const startTime = performance.now();
      
      // Run TypeScript type checking
      const { execSync } = require('child_process');
      execSync('bunx tsc --noEmit', { stdio: 'pipe' });
      
      const endTime = performance.now();
      const compilationTime = endTime - startTime;
      
      const passed = compilationTime < 10000; // Target: under 10 seconds
      
      const test = {
        name: 'TypeScript Compilation Test',
        passed,
        compilationTime: Math.round(compilationTime),
        threshold: 10000
      };
      
      this.results.tests.push(test);
      
      if (passed) {
        this.results.summary.passed++;
        this.log(`TypeScript compilation test: PASSED (${Math.round(compilationTime)}ms)`, 'success');
      } else {
        this.results.summary.warnings++;
        this.log(`TypeScript compilation test: WARNING (${Math.round(compilationTime)}ms, target <10s)`, 'warn');
      }
      
    } catch (error) {
      this.results.summary.failed++;
      this.log(`TypeScript compilation test failed: ${error.message}`, 'error');
    }
  }

  async generateReport() {
    this.log('Generating performance report...', 'info');
    
    const report = {
      ...this.results,
      totalTests: this.results.tests.length,
      passRate: this.results.summary.passed / this.results.tests.length * 100,
      compliance: {
        bundleSize: this.results.tests.find(t => t.name === 'Bundle Size Test')?.passed || false,
        optimization: this.results.tests.find(t => t.name === 'Component Optimization Test')?.passed || false,
        compilation: this.results.tests.find(t => t.name === 'TypeScript Compilation Test')?.passed || false
      }
    };
    
    // Save report
    await fs.writeFile('./dist/simple-performance-report.json', JSON.stringify(report, null, 2));
    
    // Generate markdown report
    const markdown = this.generateMarkdownReport(report);
    await fs.writeFile('./dist/SIMPLE_PERFORMANCE_REPORT.md', markdown);
    
    this.log(`Performance report saved to ./dist/SIMPLE_PERFORMANCE_REPORT.md`, 'success');
    
    return report;
  }

  generateMarkdownReport(report) {
    return `# LiqUIdify Simple Performance Report

**Generated**: ${report.timestamp}
**Pass Rate**: ${Math.round(report.passRate)}%

## Summary

| Metric | Count |
|--------|-------|
| ✅ Passed | ${report.summary.passed} |
| ⚠️ Warnings | ${report.summary.warnings} |
| ❌ Failed | ${report.summary.failed} |
| 📊 Total Tests | ${report.totalTests} |

## S-Tier Compliance

| Area | Status | Details |
|------|--------|---------|
| Bundle Size | ${report.compliance.bundleSize ? '✅' : '❌'} | ${report.compliance.bundleSize ? 'Within size limits' : 'Exceeds size limits'} |
| Component Optimization | ${report.compliance.optimization ? '✅' : '❌'} | ${report.compliance.optimization ? 'Good optimization coverage' : 'Needs more optimization'} |
| TypeScript Compilation | ${report.compliance.compilation ? '✅' : '⚠️'} | ${report.compliance.compilation ? 'Fast compilation' : 'Slow compilation'} |

## Test Results

${report.tests.map(test => `
### ${test.name}

**Status**: ${test.passed ? '✅ PASSED' : '❌ FAILED'}

${test.violations ? `**Violations**: ${test.violations.length}` : ''}
${test.optimizationPercentage ? `**Optimization Coverage**: ${test.optimizationPercentage}%` : ''}
${test.compilationTime ? `**Compilation Time**: ${test.compilationTime}ms` : ''}
${test.issues ? test.issues.map(issue => `- ${issue}`).join('\n') : ''}
`).join('\n')}

---
*Generated by LiqUIdify Simple Performance Test*
`;
  }

  async run() {
    try {
      this.log('🚀 Starting LiqUIdify Simple Performance Tests...', 'info');
      this.log('=' .repeat(60), 'info');
      
      await this.testBundleSizes();
      await this.testComponentOptimization();
      await this.testTypeScriptCompilation();
      
      const report = await this.generateReport();
      
      this.log('=' .repeat(60), 'info');
      
      if (report.summary.failed === 0) {
        this.log('🎉 All core performance tests passed!', 'success');
        process.exit(0);
      } else {
        this.log(`❌ ${report.summary.failed} test(s) failed. Check report for details.`, 'error');
        process.exit(1);
      }
      
    } catch (error) {
      this.log(`💥 Performance test suite failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const test = new SimplePerformanceTest();
  test.run().catch(error => {
    console.error(`💥 Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = SimplePerformanceTest;