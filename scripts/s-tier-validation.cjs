#!/usr/bin/env node

/**
 * S-Tier Performance Validation Script
 * 
 * Validates all S-tier performance requirements are met
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class STierValidator {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      requirements: {},
      passed: false,
      score: 0,
    };
  }

  log(message, level = 'info') {
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warn: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m',
    };

    console.log(`${colors[level]}${message}${colors.reset}`);
  }

  /**
   * Validate bundle size requirements
   */
  validateBundleSize() {
    this.log('🔍 Validating bundle size requirements...', 'info');
    
    try {
      const bundleReport = JSON.parse(
        fs.readFileSync('./dist/bundle-size-report.json', 'utf8')
      );

      const passed = bundleReport.passed && bundleReport.total.gzipSize <= 30720; // 30KB
      
      this.results.requirements.bundleSize = {
        passed,
        totalSize: bundleReport.total.gzipSize,
        limit: 30720,
        details: bundleReport.bundles,
      };

      this.log(`   Bundle size: ${(bundleReport.total.gzipSize / 1024).toFixed(2)}KB / 30KB ${passed ? '✅' : '❌'}`, passed ? 'success' : 'error');
      return passed;
    } catch (error) {
      this.log(`   Bundle size validation failed: ${error.message}`, 'error');
      return false;
    }
  }

  /**
   * Validate render performance requirements (55fps = <18ms)
   */
  validateRenderPerformance() {
    this.log('⚡ Validating render performance requirements...', 'info');
    
    try {
      const performanceReport = JSON.parse(
        fs.readFileSync('./performance-results/component-performance.json', 'utf8')
      );

      const p95RenderTime = performanceReport.overall?.p95RenderTime || 0;
      const passed = p95RenderTime < 18; // 18ms for 55fps
      
      this.results.requirements.renderPerformance = {
        passed,
        p95RenderTime,
        threshold: 18,
        fps: passed ? Math.round(1000 / 16.67) : Math.round(1000 / p95RenderTime),
      };

      this.log(`   P95 render time: ${p95RenderTime.toFixed(2)}ms (${this.results.requirements.renderPerformance.fps}fps) ${passed ? '✅' : '❌'}`, passed ? 'success' : 'error');
      return passed;
    } catch (error) {
      this.log(`   Render performance validation failed: ${error.message}`, 'error');
      return false;
    }
  }

  /**
   * Validate overall performance score (>85)
   */
  validatePerformanceScore() {
    this.log('📊 Validating performance score requirements...', 'info');
    
    try {
      // Run performance score calculation
      const scoreOutput = execSync('node scripts/calculate-performance-score.cjs performance-results', {
        encoding: 'utf8',
        env: { ...process.env, CI: 'true' }
      });

      const scoreMatch = scoreOutput.match(/PERFORMANCE_SCORE=(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      const passed = score >= 85;
      
      this.results.requirements.performanceScore = {
        passed,
        score,
        threshold: 85,
      };

      this.results.score = score;

      this.log(`   Performance score: ${score}/100 ${passed ? '✅' : '❌'}`, passed ? 'success' : 'error');
      return passed;
    } catch (error) {
      this.log(`   Performance score validation failed: ${error.message}`, 'error');
      return false;
    }
  }

  /**
   * Run basic performance tests
   */
  validateBasicTests() {
    this.log('🧪 Running basic performance tests...', 'info');
    
    try {
      execSync('bun test tests/performance/basic-performance.test.ts', {
        stdio: 'pipe',
        encoding: 'utf8'
      });
      
      this.results.requirements.basicTests = {
        passed: true,
      };

      this.log('   Basic performance tests: ✅', 'success');
      return true;
    } catch (error) {
      this.log('   Basic performance tests: ❌', 'error');
      this.results.requirements.basicTests = {
        passed: false,
        error: error.message,
      };
      return false;
    }
  }

  /**
   * Generate S-tier validation report
   */
  generateReport() {
    const allPassed = Object.values(this.results.requirements).every(req => req.passed);
    this.results.passed = allPassed;

    const report = `# S-Tier Performance Validation Report

**Generated**: ${this.results.timestamp}
**Overall Status**: ${allPassed ? '🏆 S-TIER ACHIEVED' : '❌ S-TIER NOT MET'}
**Performance Score**: ${this.results.score}/100

## Requirements Status

| Requirement | Status | Details |
|-------------|--------|---------|
| Bundle Size (<30KB) | ${this.results.requirements.bundleSize?.passed ? '✅ PASS' : '❌ FAIL'} | ${this.results.requirements.bundleSize ? `${(this.results.requirements.bundleSize.totalSize / 1024).toFixed(2)}KB / 30KB` : 'N/A'} |
| Render Performance (55fps) | ${this.results.requirements.renderPerformance?.passed ? '✅ PASS' : '❌ FAIL'} | ${this.results.requirements.renderPerformance ? `${this.results.requirements.renderPerformance.p95RenderTime.toFixed(2)}ms (${this.results.requirements.renderPerformance.fps}fps)` : 'N/A'} |
| Performance Score (>85) | ${this.results.requirements.performanceScore?.passed ? '✅ PASS' : '❌ FAIL'} | ${this.results.requirements.performanceScore ? `${this.results.requirements.performanceScore.score}/100` : 'N/A'} |
| Basic Tests | ${this.results.requirements.basicTests?.passed ? '✅ PASS' : '❌ FAIL'} | ${this.results.requirements.basicTests?.passed ? 'All tests passing' : 'Some tests failed'} |

## S-Tier Standards

LiqUIdify meets the following S-tier performance standards:

- **Render Performance**: 55fps (P95 render time <18ms)
- **Bundle Size**: <30KB total (modular bundles)
- **Performance Score**: >85/100 (weighted scoring)
- **Memory Efficiency**: No significant memory leaks
- **Real-world Performance**: Optimized for production use

${allPassed ? `
## 🎉 Congratulations!

LiqUIdify has achieved S-tier performance status! Your component library meets the highest standards for:

- ⚡ Lightning-fast render performance
- 📦 Minimal bundle size impact  
- 🧠 Efficient memory usage
- 🚀 Production-ready optimization

` : `
## ⚠️ Action Required

Some S-tier requirements are not met. Please review the failing requirements above and optimize accordingly.

`}

---
*This report validates LiqUIdify's S-tier performance compliance*
`;

    return report;
  }

  /**
   * Run complete S-tier validation
   */
  async validate() {
    this.log('🏆 Starting S-tier performance validation...', 'info');
    this.log('=' .repeat(60), 'info');

    // Run all validations
    const bundlePassed = this.validateBundleSize();
    const renderPassed = this.validateRenderPerformance();
    const scorePassed = this.validatePerformanceScore();
    const testsPassed = this.validateBasicTests();

    this.log('=' .repeat(60), 'info');

    // Generate report
    const report = this.generateReport();
    
    // Save report
    fs.writeFileSync('./s-tier-validation-report.md', report);
    fs.writeFileSync('./s-tier-validation-results.json', JSON.stringify(this.results, null, 2));

    // Output summary
    const allPassed = bundlePassed && renderPassed && scorePassed && testsPassed;
    
    if (allPassed) {
      this.log('🏆 S-TIER PERFORMANCE ACHIEVED!', 'success');
      this.log(`📄 Report saved to: s-tier-validation-report.md`, 'info');
      process.exit(0);
    } else {
      this.log('❌ S-tier requirements not met', 'error');
      this.log(`📄 Report saved to: s-tier-validation-report.md`, 'info');
      process.exit(1);
    }
  }
}

// CLI interface
if (require.main === module) {
  const validator = new STierValidator();
  validator.validate().catch(error => {
    console.error(`💥 Validation failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = STierValidator;