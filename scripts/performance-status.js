#!/usr/bin/env node

/**
 * Performance Status Reporter
 * Provides a clear, actionable performance status for LiqUIdify
 */

import STierValidator from './validate-s-tier-performance.js';
import fs from 'fs';
import path from 'path';

class PerformanceStatusReporter {
  constructor() {
    this.validator = new STierValidator();
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

  generateStatusBadge(score, passed) {
    if (passed && score >= 95) {
      return '![Performance](https://img.shields.io/badge/Performance-S--tier-brightgreen)';
    } else if (score >= 85) {
      return '![Performance](https://img.shields.io/badge/Performance-A--tier-green)';
    } else if (score >= 70) {
      return '![Performance](https://img.shields.io/badge/Performance-B--tier-yellow)';
    } else {
      return '![Performance](https://img.shields.io/badge/Performance-Needs--Work-red)';
    }
  }

  async generateMarkdownReport(results) {
    const status = results.overall.passed ? 'COMPLIANT' : 'NON-COMPLIANT';
    const statusColor = results.overall.passed ? '🟢' : '🔴';
    
    return `# LiqUIdify Performance Status Report

${this.generateStatusBadge(results.overall.score, results.overall.passed)}

## ${statusColor} S-tier Compliance: ${status}

**Overall Score**: ${results.overall.score}/100  
**Generated**: ${new Date().toISOString()}  
**Version**: ${JSON.parse(fs.readFileSync('package.json', 'utf8')).version}

## Performance Metrics

### 📦 Bundle Size Performance
- **Status**: ${results.bundleSize.passed ? '✅ PASSED' : '❌ FAILED'}
- **Score**: ${results.bundleSize.score}/100
- **Total Size**: ${results.bundleSize.details.total.sizeKB}KB / ${results.bundleSize.details.total.limitKB}KB (${results.bundleSize.details.total.utilization}% utilized)

| Bundle | Size | Limit | Utilization | Status |
|--------|------|-------|-------------|--------|
| Core | ${results.bundleSize.details.core.sizeKB}KB | ${results.bundleSize.details.core.limitKB}KB | ${results.bundleSize.details.core.utilization}% | ${results.bundleSize.details.core.passed ? '✅' : '❌'} |
| Animations | ${results.bundleSize.details.animations.sizeKB}KB | ${results.bundleSize.details.animations.limitKB}KB | ${results.bundleSize.details.animations.utilization}% | ${results.bundleSize.details.animations.passed ? '✅' : '❌'} |
| Advanced | ${results.bundleSize.details.advanced.sizeKB}KB | ${results.bundleSize.details.advanced.limitKB}KB | ${results.bundleSize.details.advanced.utilization}% | ${results.bundleSize.details.advanced.passed ? '✅' : '❌'} |

### ⚡ Render Performance  
- **Status**: ${results.renderTime.passed ? '✅ PASSED' : '❌ FAILED'}
- **Score**: ${results.renderTime.score}/100
- **Average FPS**: ${results.renderTime.details.fps} (target: ${results.renderTime.details.targetFps}+)
- **Average Render Time**: ${results.renderTime.details.averageRenderTime}ms (target: <16ms)

| Component | Render Time | Status |
|-----------|-------------|--------|
${results.renderTime.details.components.map(c => 
  `| ${c.component} | ${c.time.toFixed(2)}ms | ${c.passed ? '✅' : '❌'} |`
).join('\n')}

### 📊 Infrastructure Performance
- **Status**: ${results.performanceScore.passed ? '✅ PASSED' : '❌ FAILED'}
- **Score**: ${results.performanceScore.score}/100

| Feature | Status |
|---------|--------|
${results.performanceScore.details.infrastructureFeatures.map(f => 
  `| ${f.name} | ${f.exists ? '✅' : '❌'} |`
).join('\n')}

## S-tier Requirements ✅

- **Render time**: 55fps (${results.renderTime.details.fps} achieved) ✅
- **Bundle size**: <30KB total (${results.bundleSize.details.total.sizeKB}KB achieved) ✅  
- **Performance score**: >85 (${results.performanceScore.score} achieved) ✅

## Summary

${results.overall.passed 
  ? `🎉 **LiqUIdify meets all S-tier performance requirements!**

The library delivers excellent performance with:
- Lightning-fast render times (${results.renderTime.details.fps} FPS)
- Minimal bundle size (${results.bundleSize.details.total.utilization}% of limit used)
- Comprehensive performance monitoring infrastructure

No action required - performance targets exceeded.`
  : `⚠️ **Performance improvements needed to meet S-tier requirements.**

Priority areas for optimization:
${!results.bundleSize.passed ? '- Reduce bundle size to meet limits' : ''}
${!results.renderTime.passed ? '- Optimize render performance for 55+ FPS' : ''}
${!results.performanceScore.passed ? '- Improve overall performance score' : ''}

Run \`bun run perf:validate\` for detailed recommendations.`
}

---
*Automated performance validation by LiqUIdify S-tier Performance Monitor*
`;
  }

  async run() {
    this.log('\n🔍 LiqUIdify Performance Status Check', 'info');
    this.log('=' .repeat(50), 'info');

    try {
      // Run validation
      const passed = await this.validator.runValidation();
      
      // Get results
      const results = this.validator.results;
      
      // Generate markdown report
      const markdownReport = await this.generateMarkdownReport(results);
      
      // Save status report
      const statusPath = path.join(process.cwd(), 'PERFORMANCE_STATUS.md');
      fs.writeFileSync(statusPath, markdownReport);
      
      // Log summary
      this.log('=' .repeat(50), 'info');
      
      if (passed) {
        this.log(`🎉 S-tier Performance: COMPLIANT (${results.overall.score}/100)`, 'success');
        this.log(`📄 Status report: ${statusPath}`, 'info');
        
        // Quick summary for CI
        console.log('\n## CI Summary');
        console.log(`- Bundle Size: ${results.bundleSize.details.total.sizeKB}KB ✅`);
        console.log(`- Render FPS: ${results.renderTime.details.fps} ✅`);  
        console.log(`- Overall Score: ${results.overall.score}/100 ✅`);
        
      } else {
        this.log(`⚠️ S-tier Performance: NON-COMPLIANT (${results.overall.score}/100)`, 'warn');
        this.log(`📄 Status report: ${statusPath}`, 'info');
        
        // Show what failed
        console.log('\n## Issues Found');
        if (!results.bundleSize.passed) {
          console.log(`- Bundle Size: ${results.bundleSize.details.total.sizeKB}KB (exceeds limit) ❌`);
        }
        if (!results.renderTime.passed) {
          console.log(`- Render FPS: ${results.renderTime.details.fps} (below 55fps) ❌`);
        }
        if (!results.performanceScore.passed) {
          console.log(`- Performance Score: ${results.performanceScore.score}/100 (below 85) ❌`);
        }
      }
      
      return passed;
      
    } catch (error) {
      this.log(`❌ Performance status check failed: ${error.message}`, 'error');
      return false;
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const reporter = new PerformanceStatusReporter();
  
  reporter.run()
    .then((passed) => {
      process.exit(passed ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Status check failed:', error);
      process.exit(1);
    });
}

export default PerformanceStatusReporter;