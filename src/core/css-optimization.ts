/**
 * CSS Architecture Optimization System
 * Implements modular CSS chunks, critical CSS extraction, and PostCSS optimizations
 */

import { promises as fs } from 'fs';
import path from 'path';

// CSS Bundle Configuration
export interface CSSBundleConfig {
  core: {
    files: string[];
    maxSize: number; // KB
    critical: boolean;
  };
  animations: {
    files: string[];
    maxSize: number;
    lazyLoad: boolean;
  };
  utilities: {
    files: string[];
    maxSize: number;
    treeshake: boolean;
  };
  themes: {
    files: string[];
    maxSize: number;
    dynamic: boolean;
  };
}

// Default CSS bundle configuration
export const DEFAULT_CSS_CONFIG: CSSBundleConfig = {
  core: {
    files: [
      'src/styles/glass-core.css',
      'src/styles/glass-critical.css',
      'src/styles/graceful-degradation.css'
    ],
    maxSize: 15, // 15KB max for core
    critical: true
  },
  animations: {
    files: [
      'src/styles/glass-animations.css',
      'src/styles/apple-liquid-glass.css'
    ],
    maxSize: 10, // 10KB max for animations
    lazyLoad: true
  },
  utilities: {
    files: [
      'src/styles/glass-utilities.css',
      'src/styles/tailwind.css'
    ],
    maxSize: 8, // 8KB max for utilities
    treeshake: true
  },
  themes: {
    files: [
      'src/styles/glass-themes.css'
    ],
    maxSize: 5, // 5KB max for themes
    dynamic: true
  }
};

// Critical CSS extraction interface
export interface CriticalCSSOptions {
  html: string;
  css: string;
  dimensions: {
    width: number;
    height: number;
  }[];
  ignore: string[];
}

// Bundle size analyzer
export class CSSBundleAnalyzer {
  private config: CSSBundleConfig;
  private bundleSizes: Map<string, number> = new Map();

  constructor(config: CSSBundleConfig = DEFAULT_CSS_CONFIG) {
    this.config = config;
  }

  /**
   * Analyze bundle sizes and validate against limits
   */
  async analyzeBundles(): Promise<{
    bundles: Record<string, { size: number; maxSize: number; status: 'ok' | 'warning' | 'error' }>;
    totalSize: number;
    recommendations: string[];
  }> {
    const results: any = { bundles: {}, totalSize: 0, recommendations: [] };

    for (const [bundleName, bundleConfig] of Object.entries(this.config)) {
      let bundleSize = 0;

      for (const file of bundleConfig.files) {
        try {
          const filePath = path.resolve(file);
          const stats = await fs.stat(filePath);
          bundleSize += stats.size;
        } catch (error) {
          console.warn(`CSS file not found: ${file}`);
        }
      }

      // Convert to KB and apply gzip estimation (roughly 70% compression)
      const sizeKB = Math.round((bundleSize * 0.7) / 1024);
      this.bundleSizes.set(bundleName, sizeKB);

      const status = sizeKB <= bundleConfig.maxSize ? 'ok' :
        sizeKB <= bundleConfig.maxSize * 1.2 ? 'warning' : 'error';

      results.bundles[bundleName] = {
        size: sizeKB,
        maxSize: bundleConfig.maxSize,
        status
      };

      results.totalSize += sizeKB;

      // Generate recommendations
      if (status === 'warning') {
        results.recommendations.push(`${bundleName} bundle is approaching size limit (${sizeKB}KB/${bundleConfig.maxSize}KB)`);
      } else if (status === 'error') {
        results.recommendations.push(`${bundleName} bundle exceeds size limit (${sizeKB}KB/${bundleConfig.maxSize}KB) - optimization required`);
      }
    }

    // Overall bundle size check
    if (results.totalSize > 30) {
      results.recommendations.push(`Total bundle size (${results.totalSize}KB) exceeds 30KB target - critical optimization needed`);
    }

    return results;
  }

  /**
   * Extract critical CSS for above-the-fold content
   */
  async extractCriticalCSS(options: CriticalCSSOptions): Promise<{
    critical: string;
    remaining: string;
    stats: { criticalSize: number; remainingSize: number; reduction: number };
  }> {
    // This would integrate with a tool like critical or penthouse
    // For now, implementing a basic version

    const cssRules = this.parseCSSRules(options.css);
    const criticalRules: string[] = [];
    const remainingRules: string[] = [];

    // Analyze which rules are critical (above-the-fold)
    for (const rule of cssRules) {
      if (this.isCriticalRule(rule, options.html)) {
        criticalRules.push(rule);
      } else {
        remainingRules.push(rule);
      }
    }

    const critical = criticalRules.join('\n');
    const remaining = remainingRules.join('\n');

    const criticalSize = new Blob([critical]).size;
    const remainingSize = new Blob([remaining]).size;
    const reduction = Math.round(((remainingSize / (criticalSize + remainingSize)) * 100));

    return {
      critical,
      remaining,
      stats: {
        criticalSize: Math.round(criticalSize / 1024),
        remainingSize: Math.round(remainingSize / 1024),
        reduction
      }
    };
  }

  /**
   * Optimize CSS with PostCSS transformations
   */
  async optimizeCSS(css: string, options: {
    removeUnused: boolean;
    minify: boolean;
    autoprefixer: boolean;
    purgeSelectors?: string[];
  }): Promise<{
    optimized: string;
    stats: { originalSize: number; optimizedSize: number; reduction: number };
  }> {
    let optimized = css;
    const originalSize = new Blob([css]).size;

    // Remove unused CSS
    if (options.removeUnused && options.purgeSelectors) {
      optimized = this.removeUnusedCSS(optimized, options.purgeSelectors);
    }

    // Minify CSS
    if (options.minify) {
      optimized = this.minifyCSS(optimized);
    }

    // Add vendor prefixes (simplified)
    if (options.autoprefixer) {
      optimized = this.addVendorPrefixes(optimized);
    }

    const optimizedSize = new Blob([optimized]).size;
    const reduction = Math.round(((originalSize - optimizedSize) / originalSize) * 100);

    return {
      optimized,
      stats: {
        originalSize: Math.round(originalSize / 1024),
        optimizedSize: Math.round(optimizedSize / 1024),
        reduction
      }
    };
  }

  /**
   * Generate CSS bundle report
   */
  async generateReport(): Promise<{
    timestamp: Date;
    bundles: any;
    totalSize: number;
    recommendations: string[];
    status: 'pass' | 'warning' | 'fail';
  }> {
    const analysis = await this.analyzeBundles();

    let status: 'pass' | 'warning' | 'fail' = 'pass';
    if (analysis.totalSize > 30) {
      status = 'fail';
    } else if (analysis.recommendations.length > 0) {
      status = 'warning';
    }

    return {
      timestamp: new Date(),
      ...analysis,
      status
    };
  }

  // Private helper methods
  private parseCSSRules(css: string): string[] {
    // Simple CSS rule parser - in production, use a proper CSS parser
    return css.split('}').filter(rule => rule.trim()).map(rule => rule.trim() + '}');
  }

  private isCriticalRule(rule: string, _html: string): boolean {
    // Determine if a CSS rule is critical for above-the-fold content
    // This is a simplified version - in production, use proper critical CSS detection

    // Extract selector from rule
    const selectorMatch = rule.match(/^([^{]+)\{/);
    if (!selectorMatch) return false;

    const selector = selectorMatch[1].trim();

    // Check if selector matches elements in HTML
    // For glass components, prioritize core glass effects
    const criticalSelectors = [
      '.liquid-glass',
      '.glass-button',
      '.glass-card',
      '.glass-input',
      'body',
      'html',
      '*'
    ];

    return criticalSelectors.some(critical => selector.includes(critical));
  }

  private removeUnusedCSS(css: string, usedSelectors: string[]): string {
    // Remove CSS rules that don't match any used selectors
    const rules = this.parseCSSRules(css);
    const usedRules = rules.filter(rule => {
      const selectorMatch = rule.match(/^([^{]+)\{/);
      if (!selectorMatch) return true;

      const selector = selectorMatch[1].trim();
      return usedSelectors.some(used => selector.includes(used));
    });

    return usedRules.join('\n');
  }

  private minifyCSS(css: string): string {
    // Basic CSS minification
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/;\s*}/g, '}') // Remove last semicolon in blocks
      .replace(/\s*{\s*/g, '{') // Clean up braces
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*,\s*/g, ',') // Clean up commas
      .replace(/\s*:\s*/g, ':') // Clean up colons
      .replace(/\s*;\s*/g, ';') // Clean up semicolons
      .trim();
  }

  private addVendorPrefixes(css: string): string {
    // Basic vendor prefix addition for common properties
    const prefixMap: Record<string, string[]> = {
      'transform': ['-webkit-transform', '-moz-transform', '-ms-transform'],
      'transition': ['-webkit-transition', '-moz-transition', '-ms-transition'],
      'backdrop-filter': ['-webkit-backdrop-filter'],
      'user-select': ['-webkit-user-select', '-moz-user-select', '-ms-user-select']
    };

    let prefixed = css;

    for (const [property, prefixes] of Object.entries(prefixMap)) {
      const regex = new RegExp(`(\\s|^)${property}\\s*:`, 'g');
      prefixed = prefixed.replace(regex, (match, whitespace) => {
        const prefixedProps = prefixes.map(prefix => `${whitespace}${prefix}:`).join('');
        return prefixedProps + match;
      });
    }

    return prefixed;
  }
}

// CSS Bundle Manager
export class CSSBundleManager {
  private analyzer: CSSBundleAnalyzer;
  private config: CSSBundleConfig;

  constructor(config: CSSBundleConfig = DEFAULT_CSS_CONFIG) {
    this.config = config;
    this.analyzer = new CSSBundleAnalyzer(config);
  }

  /**
   * Build optimized CSS bundles
   */
  async buildBundles(outputDir: string): Promise<{
    bundles: Record<string, string>;
    manifest: any;
    report: any;
  }> {
    const bundles: Record<string, string> = {};
    const manifest: any = { bundles: {}, timestamp: new Date().toISOString() };

    for (const [bundleName, bundleConfig] of Object.entries(this.config)) {
      let combinedCSS = '';

      // Combine CSS files
      for (const file of bundleConfig.files) {
        try {
          const filePath = path.resolve(file);
          const content = await fs.readFile(filePath, 'utf-8');
          combinedCSS += `\n/* ${file} */\n${content}`;
        } catch (error) {
          console.warn(`CSS file not found: ${file}`);
        }
      }

      // Optimize the bundle
      const optimized = await this.analyzer.optimizeCSS(combinedCSS, {
        removeUnused: bundleConfig.treeshake || false,
        minify: true,
        autoprefixer: true
      });

      bundles[bundleName] = optimized.optimized;

      // Write bundle to output directory
      const outputPath = path.join(outputDir, `${bundleName}.css`);
      await fs.writeFile(outputPath, optimized.optimized);

      manifest.bundles[bundleName] = {
        path: `${bundleName}.css`,
        size: optimized.stats.optimizedSize,
        originalSize: optimized.stats.originalSize,
        reduction: optimized.stats.reduction,
        lazyLoad: bundleConfig.lazyLoad || false,
        critical: bundleConfig.critical || false
      };
    }

    const report = await this.analyzer.generateReport();

    return { bundles, manifest, report };
  }

  /**
   * Validate bundle sizes against limits
   */
  async validateBundles(): Promise<boolean> {
    const report = await this.analyzer.generateReport();

    if (report.status === 'fail') {
      console.error('❌ CSS Bundle validation failed:');
      console.error(`Total size: ${report.totalSize}KB (exceeds 30KB limit)`);
      report.recommendations.forEach(rec => console.error(`- ${rec}`));
      return false;
    }

    if (report.status === 'warning') {
      console.warn('⚠️ CSS Bundle validation warnings:');
      report.recommendations.forEach(rec => console.warn(`- ${rec}`));
    }

    console.log('✅ CSS Bundle validation passed');
    console.log(`Total size: ${report.totalSize}KB`);

    return true;
  }
}

// Export singleton instances
export const cssBundleManager = new CSSBundleManager();
export const cssBundleAnalyzer = new CSSBundleAnalyzer();