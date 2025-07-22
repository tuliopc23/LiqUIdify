#!/usr/bin/env node

/**
 * Performance Score Calculator
 * 
 * Calculates overall performance score based on:
 * - Render performance (40%)
 * - Memory efficiency (30%)
 * - Bundle size (20%)
 * - Animation performance (10%)
 */

const fs = require('fs');
const path = require('path');

// Performance scoring weights
const WEIGHTS = {
  render: 0.4,      // 40% - Most important for user experience
  memory: 0.3,      // 30% - Critical for stability
  bundle: 0.2,      // 20% - Important for load times
  animation: 0.1,   // 10% - Nice to have
};

// S-tier thresholds
const THRESHOLDS = {
  render: 18,           // ms (55fps equivalent)
  memory: 1024 * 1024,  // 1MB leak limit
  bundle: 30 * 1024,    // 30KB total
  animation: 55,        // fps
};

class PerformanceScoreCalculator {
  constructor() {
    this.scores = {
      render: 0,
      memory: 0,
      bundle: 0,
      animation: 0,
      overall: 0,
    };
  }

  /**
   * Calculate render performance score (0-100)
   */
  calculateRenderScore(renderTimes) {
    if (!renderTimes || renderTimes.length === 0) {
      return 0;
    }

    const sortedTimes = renderTimes.sort((a, b) => a - b);
    const p95Time = sortedTimes[Math.floor(sortedTimes.length * 0.95)];
    const averageTime = renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;

    // Score based on P95 render time
    const p95Score = Math.max(0, 100 - (p95Time / THRESHOLDS.render) * 50);
    // Score based on average render time  
    const avgScore = Math.max(0, 100 - (averageTime / (THRESHOLDS.render / 2)) * 50);

    // Weighted combination (P95 is more important)
    return Math.min(100, p95Score * 0.7 + avgScore * 0.3);
  }

  /**
   * Calculate memory efficiency score (0-100)
   */
  calculateMemoryScore(memoryMetrics) {
    if (!memoryMetrics) {
      return 100; // Assume good if no data
    }

    const { leaked = 0, growth = 0, peak = 0 } = memoryMetrics;

    // Penalty for memory leaks
    const leakPenalty = Math.min(50, (leaked / THRESHOLDS.memory) * 50);
    
    // Penalty for excessive memory growth
    const growthPenalty = Math.min(30, (growth / (THRESHOLDS.memory / 2)) * 30);
    
    // Penalty for high peak usage
    const peakPenalty = Math.min(20, (peak / (THRESHOLDS.memory * 5)) * 20);

    return Math.max(0, 100 - leakPenalty - growthPenalty - peakPenalty);
  }

  /**
   * Calculate bundle size score (0-100)
   */
  calculateBundleScore(bundleSizes) {
    if (!bundleSizes) {
      return 0;
    }

    const { total = 0, core = 0, animations = 0, advanced = 0 } = bundleSizes;

    // Score based on total size
    const totalScore = Math.max(0, 100 - (total / THRESHOLDS.bundle) * 60);
    
    // Bonus for efficient individual bundles
    const coreEfficiency = Math.max(0, 100 - (core / (15 * 1024)) * 40);
    const animationsEfficiency = Math.max(0, 100 - (animations / (10 * 1024)) * 30);
    const advancedEfficiency = Math.max(0, 100 - (advanced / (8 * 1024)) * 30);

    const individualScore = (coreEfficiency + animationsEfficiency + advancedEfficiency) / 3;

    // Weighted combination
    return Math.min(100, totalScore * 0.7 + individualScore * 0.3);
  }

  /**
   * Calculate animation performance score (0-100)
   */
  calculateAnimationScore(animationMetrics) {
    if (!animationMetrics) {
      return 100; // Assume good if no animation data
    }

    const { frameRate = 60, droppedFrames = 0, jankEvents = 0 } = animationMetrics;

    // Score based on frame rate
    const fpsScore = Math.min(100, (frameRate / THRESHOLDS.animation) * 100);
    
    // Penalty for dropped frames
    const droppedPenalty = Math.min(30, droppedFrames * 2);
    
    // Penalty for jank events
    const jankPenalty = Math.min(20, jankEvents * 5);

    return Math.max(0, fpsScore - droppedPenalty - jankPenalty);
  }

  /**
   * Load performance data from various sources
   */
  loadPerformanceData(dataDir = './performance-results') {
    const data = {
      render: null,
      memory: null,
      bundle: null,
      animation: null,
    };

    try {
      // Load component performance results
      const componentResultsPath = path.join(dataDir, 'component-performance.json');
      if (fs.existsSync(componentResultsPath)) {
        const componentResults = JSON.parse(fs.readFileSync(componentResultsPath, 'utf8'));
        data.render = componentResults.renderTimes;
        data.memory = componentResults.memoryMetrics;
      }

      // Load bundle analysis results  
      const bundleResultsPath = path.join(process.cwd(), 'dist', 'bundle-size-report.json');
      if (fs.existsSync(bundleResultsPath)) {
        const bundleResults = JSON.parse(fs.readFileSync(bundleResultsPath, 'utf8'));
        data.bundle = {
          total: bundleResults.total?.gzipSize || bundleResults.total?.size || 0,
          core: bundleResults.bundles?.core?.gzipSize || 0,
          animations: bundleResults.bundles?.animations?.gzipSize || 0,
          advanced: bundleResults.bundles?.advanced?.gzipSize || 0,
        };
      }

      // Load animation performance results
      const animationResultsPath = path.join(dataDir, 'animation-performance.json');
      if (fs.existsSync(animationResultsPath)) {
        const animationResults = JSON.parse(fs.readFileSync(animationResultsPath, 'utf8'));
        data.animation = animationResults;
      }

      // Load memory test results
      const memoryResultsPath = path.join(dataDir, 'memory-results.json');
      if (fs.existsSync(memoryResultsPath)) {
        const memoryResults = JSON.parse(fs.readFileSync(memoryResultsPath, 'utf8'));
        data.memory = memoryResults;
      }

    } catch (error) {
      console.warn(`Warning: Could not load performance data: ${error.message}`);
    }

    return data;
  }

  /**
   * Calculate overall performance score
   */
  calculate(dataDir) {
    const data = this.loadPerformanceData(dataDir);

    // Calculate individual scores
    this.scores.render = this.calculateRenderScore(data.render);
    this.scores.memory = this.calculateMemoryScore(data.memory);
    this.scores.bundle = this.calculateBundleScore(data.bundle);
    this.scores.animation = this.calculateAnimationScore(data.animation);

    // Calculate weighted overall score
    this.scores.overall = 
      this.scores.render * WEIGHTS.render +
      this.scores.memory * WEIGHTS.memory +
      this.scores.bundle * WEIGHTS.bundle +
      this.scores.animation * WEIGHTS.animation;

    return this.scores;
  }

  /**
   * Generate detailed performance report
   */
  generateReport() {
    const getGrade = (score) => {
      if (score >= 95) return 'S';
      if (score >= 90) return 'A';
      if (score >= 80) return 'B';
      if (score >= 70) return 'C';
      if (score >= 60) return 'D';
      return 'F';
    };

    const getStatus = (score) => {
      if (score >= 95) return '🏆 S-tier';
      if (score >= 85) return '✅ Excellent';
      if (score >= 70) return '⚠️ Good';
      return '❌ Needs improvement';
    };

    return `# LiqUIdify Performance Score Report

**Overall Score**: ${this.scores.overall.toFixed(1)}/100 (Grade: ${getGrade(this.scores.overall)})
**Status**: ${getStatus(this.scores.overall)}

## Individual Scores

| Category | Score | Weight | Contribution | Status |
|----------|-------|--------|-------------|--------|
| Render Performance | ${this.scores.render.toFixed(1)}/100 | ${(WEIGHTS.render * 100).toFixed(0)}% | ${(this.scores.render * WEIGHTS.render).toFixed(1)} | ${getStatus(this.scores.render)} |
| Memory Efficiency | ${this.scores.memory.toFixed(1)}/100 | ${(WEIGHTS.memory * 100).toFixed(0)}% | ${(this.scores.memory * WEIGHTS.memory).toFixed(1)} | ${getStatus(this.scores.memory)} |
| Bundle Size | ${this.scores.bundle.toFixed(1)}/100 | ${(WEIGHTS.bundle * 100).toFixed(0)}% | ${(this.scores.bundle * WEIGHTS.bundle).toFixed(1)} | ${getStatus(this.scores.bundle)} |
| Animation Performance | ${this.scores.animation.toFixed(1)}/100 | ${(WEIGHTS.animation * 100).toFixed(0)}% | ${(this.scores.animation * WEIGHTS.animation).toFixed(1)} | ${getStatus(this.scores.animation)} |

## S-Tier Requirements

- **Overall Score**: ≥85 ${this.scores.overall >= 85 ? '✅' : '❌'}
- **Render Performance**: ≥90 ${this.scores.render >= 90 ? '✅' : '❌'}
- **Memory Efficiency**: ≥90 ${this.scores.memory >= 90 ? '✅' : '❌'}
- **Bundle Size**: ≥95 ${this.scores.bundle >= 95 ? '✅' : '❌'}

## Recommendations

${this.generateRecommendations()}

---
*Generated on ${new Date().toISOString()}*
`;
  }

  /**
   * Generate performance improvement recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.scores.render < 90) {
      recommendations.push('**Render Performance**: Consider memoizing expensive calculations, using React.memo, or optimizing component re-renders');
    }

    if (this.scores.memory < 90) {
      recommendations.push('**Memory Efficiency**: Check for memory leaks, clean up event listeners, and optimize component lifecycle methods');
    }

    if (this.scores.bundle < 95) {
      recommendations.push('**Bundle Size**: Enable tree-shaking, use dynamic imports, and optimize dependencies');
    }

    if (this.scores.animation < 85) {
      recommendations.push('**Animation Performance**: Use CSS transforms, will-change property, and optimize animation frame rates');
    }

    if (recommendations.length === 0) {
      return '🎉 All performance metrics are excellent! No improvements needed.';
    }

    return recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n');
  }
}

// CLI interface
if (require.main === module) {
  const dataDir = process.argv[2] || './performance-results';
  
  console.log('🚀 Calculating LiqUIdify Performance Score...\n');
  
  const calculator = new PerformanceScoreCalculator();
  const scores = calculator.calculate(dataDir);
  
  // Output for GitHub Actions
  if (process.env.CI) {
    console.log(`PERFORMANCE_SCORE=${scores.overall.toFixed(0)}`);
    process.exit(scores.overall >= 85 ? 0 : 1);
  }
  
  // Output detailed report
  console.log(calculator.generateReport());
  
  // Save report to file
  const reportPath = path.join(process.cwd(), 'performance-score-report.md');
  fs.writeFileSync(reportPath, calculator.generateReport());
  console.log(`\n📄 Report saved to: ${reportPath}`);
  
  // Exit with appropriate code
  process.exit(scores.overall >= 85 ? 0 : 1);
}

module.exports = PerformanceScoreCalculator;