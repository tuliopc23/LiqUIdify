import * as fs from 'fs';
import * as path from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { performanceMonitor } from './performance-monitor';

// Types
export interface CSSBundle {
  name: string;
  files: string[];
  output: string;
  critical: boolean;
  size: number;
  gzipSize: number;
}

export interface CSSBundleConfig {
  core: {
    files: string[];
    critical: true;
    maxSize: number; // 15KB
  };
  animations: {
    files: string[];
    critical: false;
    maxSize: number; // 10KB
    lazy: true;
  };
  utilities: {
    files: string[];
    critical: false;
    maxSize: number; // 8KB
  };
  themes: {
    files: string[];
    critical: false;
    maxSize: number; // 5KB
    lazy: true;
  };
}

export interface BundleResult {
  bundles: CSSBundle[];
  totalSize: number;
  criticalSize: number;
  warnings: string[];
  errors: string[];
}

// Default bundle configuration
const DEFAULT_BUNDLE_CONFIG: CSSBundleConfig = {
  core: {
    files: [
      'src/styles/glass-core.css',
      'src/styles/glass-critical.css',
      'src/styles/graceful-degradation.css',
    ],
    critical: true,
    maxSize: 15 * 1024, // 15KB
  },
  animations: {
    files: [
      'src/styles/glass-animations.css',
      'src/styles/apple-liquid-glass.css',
      'src/styles/enhanced-apple-liquid-glass.css',
    ],
    critical: false,
    maxSize: 10 * 1024, // 10KB
    lazy: true,
  },
  utilities: {
    files: ['src/styles/glass-utilities.css', 'src/styles/tailwind.css'],
    critical: false,
    maxSize: 8 * 1024, // 8KB
  },
  themes: {
    files: [
      'src/styles/glass-themes.css',
      'src/styles/apple-liquid-authentic.css',
    ],
    critical: false,
    maxSize: 5 * 1024, // 5KB
    lazy: true,
  },
};

/**
 * CSS Bundler for modular architecture
 */
export class CSSBundler {
  private config: CSSBundleConfig;
  private outputDir: string;

  constructor(
    config: CSSBundleConfig = DEFAULT_BUNDLE_CONFIG,
    outputDir: string = 'dist/css'
  ) {
    this.config = config;
    this.outputDir = outputDir;
  }

  /**
   * Build all CSS bundles
   */
  async buildBundles(): Promise<BundleResult> {
    performanceMonitor.startTiming('css-bundle-build');

    const result: BundleResult = {
      bundles: [],
      totalSize: 0,
      criticalSize: 0,
      warnings: [],
      errors: [],
    };

    try {
      // Ensure output directory exists
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      // Build each bundle
      for (const [bundleName, bundleConfig] of Object.entries(this.config)) {
        try {
          const bundle = await this.buildBundle(bundleName, bundleConfig);
          result.bundles.push(bundle);
          result.totalSize += bundle.size;

          if (bundle.critical) {
            result.criticalSize += bundle.size;
          }

          // Check size limits
          if (bundle.size > bundleConfig.maxSize) {
            result.warnings.push(
              `Bundle "${bundleName}" exceeds size limit: ${bundle.size} > ${bundleConfig.maxSize}`
            );
          }
        } catch (error) {
          result.errors.push(
            `Failed to build bundle "${bundleName}": ${error}`
          );
        }
      }

      // Validate total critical size (should be < 30KB)
      if (result.criticalSize > 30 * 1024) {
        result.warnings.push(
          `Critical CSS exceeds 30KB limit: ${result.criticalSize / 1024}KB`
        );
      }

      performanceMonitor.endTiming('css-bundle-build');
      return result;
    } catch (error) {
      result.errors.push(`Bundle build failed: ${error}`);
      performanceMonitor.endTiming('css-bundle-build');
      return result;
    }
  }

  /**
   * Build a single CSS bundle
   */
  private async buildBundle(name: string, config: any): Promise<CSSBundle> {
    const startTime = performance.now();

    // Combine all CSS files
    let combinedCSS = '';
    const existingFiles: string[] = [];

    for (const filePath of config.files) {
      if (fs.existsSync(filePath)) {
        const css = fs.readFileSync(filePath, 'utf8');
        combinedCSS += `\n/* ${path.basename(filePath)} */\n${css}\n`;
        existingFiles.push(filePath);
      }
    }

    if (combinedCSS.length === 0) {
      throw new Error(`No CSS files found for bundle "${name}"`);
    }

    // Process CSS with PostCSS
    const processedCSS = await this.processCSS(combinedCSS, config);

    // Write bundle file
    const outputPath = path.join(this.outputDir, `${name}.css`);
    fs.writeFileSync(outputPath, processedCSS);

    // Calculate sizes
    const size = Buffer.byteLength(processedCSS, 'utf8');
    const gzipSize = await this.calculateGzipSize(processedCSS);

    const buildTime = performance.now() - startTime;

    console.log(
      `Built CSS bundle "${name}": ${size} bytes (${gzipSize} gzipped) in ${buildTime.toFixed(2)}ms`
    );

    return {
      name,
      files: existingFiles,
      output: outputPath,
      critical: config.critical || false,
      size,
      gzipSize,
    };
  }

  /**
   * Process CSS with PostCSS plugins
   */
  private async processCSS(css: string, config: any): Promise<string> {
    const plugins = [
      autoprefixer,
      cssnano({
        preset: [
          'default',
          {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            mergeLonghand: true,
            mergeRules: true,
            minifySelectors: true,
            reduceIdents: false, // Keep CSS custom properties
          },
        ],
      }),
    ];

    // Add custom plugins for specific bundles
    if (config.critical) {
      // Additional optimizations for critical CSS
      plugins.push(
        require('postcss-critical-css')({
          preserve: false,
        })
      );
    }

    const result = await postcss(plugins).process(css, { from: undefined });
    return result.css;
  }

  /**
   * Calculate gzipped size
   */
  private async calculateGzipSize(content: string): Promise<number> {
    const zlib = require('zlib');
    return new Promise((resolve, reject) => {
      zlib.gzip(content, (err: any, compressed: Buffer) => {
        if (err) reject(err);
        else resolve(compressed.length);
      });
    });
  }

  /**
   * Generate CSS loading strategy
   */
  generateLoadingStrategy(): {
    critical: string[];
    lazy: string[];
    preload: string[];
  } {
    const strategy = {
      critical: [] as string[],
      lazy: [] as string[],
      preload: [] as string[],
    };

    Object.entries(this.config).forEach(([bundleName, config]) => {
      const bundlePath = `${bundleName}.css`;

      if (config.critical) {
        strategy.critical.push(bundlePath);
      } else if ('lazy' in config && config.lazy) {
        strategy.lazy.push(bundlePath);
      } else {
        strategy.preload.push(bundlePath);
      }
    });

    return strategy;
  }

  /**
   * Generate HTML for CSS loading
   */
  generateHTMLIncludes(): {
    critical: string;
    preload: string;
    lazy: string;
  } {
    const strategy = this.generateLoadingStrategy();

    const critical = strategy.critical
      .map(bundle => `<link rel="stylesheet" href="/css/${bundle}" />`)
      .join('\n');

    const preload = strategy.preload
      .map(
        bundle =>
          `<link rel="preload" href="/css/${bundle}" as="style" onload="this.onload=null;this.rel='stylesheet'" />`
      )
      .join('\n');

    const lazy = strategy.lazy
      .map(bundle => `<link rel="prefetch" href="/css/${bundle}" />`)
      .join('\n');

    return { critical, preload, lazy };
  }

  /**
   * Watch for changes and rebuild
   */
  watch(callback?: (result: BundleResult) => void): void {
    const chokidar = require('chokidar');

    // Get all files to watch
    const filesToWatch: string[] = [];
    Object.values(this.config).forEach(config => {
      filesToWatch.push(...config.files);
    });

    const watcher = chokidar.watch(filesToWatch, {
      ignored: /node_modules/,
      persistent: true,
    });

    watcher.on('change', async (filePath: string) => {
      console.log(`CSS file changed: ${filePath}`);
      try {
        const result = await this.buildBundles();
        callback?.(result);
      } catch (error) {
        console.error('Error rebuilding CSS bundles:', error);
      }
    });

    console.log(`Watching ${filesToWatch.length} CSS files for changes...`);
  }
}

/**
 * CSS Bundle Size Validator
 */
export class BundleSizeValidator {
  private thresholds: Record<string, number>;

  constructor(thresholds: Record<string, number> = {}) {
    this.thresholds = {
      core: 15 * 1024, // 15KB
      animations: 10 * 1024, // 10KB
      utilities: 8 * 1024, // 8KB
      themes: 5 * 1024, // 5KB
      total: 30 * 1024, // 30KB total critical
      ...thresholds,
    };
  }

  /**
   * Validate bundle sizes
   */
  validate(result: BundleResult): {
    passed: boolean;
    violations: Array<{
      bundle: string;
      actual: number;
      limit: number;
      severity: 'warning' | 'error';
    }>;
  } {
    const violations: Array<{
      bundle: string;
      actual: number;
      limit: number;
      severity: 'warning' | 'error';
    }> = [];

    // Check individual bundle sizes
    result.bundles.forEach(bundle => {
      const limit = this.thresholds[bundle.name];
      if (limit && bundle.size > limit) {
        violations.push({
          bundle: bundle.name,
          actual: bundle.size,
          limit,
          severity: bundle.critical ? 'error' : 'warning',
        });
      }
    });

    // Check total critical size
    if (this.thresholds.total && result.criticalSize > this.thresholds.total) {
      violations.push({
        bundle: 'critical-total',
        actual: result.criticalSize,
        limit: this.thresholds.total || 0,
        severity: 'error',
      });
    }

    return {
      passed: violations.filter(v => v.severity === 'error').length === 0,
      violations,
    };
  }
}

/**
 * CSS Performance Analyzer
 */
export class CSSPerformanceAnalyzer {
  /**
   * Analyze CSS performance impact
   */
  async analyze(bundlePath: string): Promise<{
    parseTime: number;
    renderTime: number;
    unusedRules: number;
    complexSelectors: string[];
    recommendations: string[];
  }> {
    const css = fs.readFileSync(bundlePath, 'utf8');
    const startTime = performance.now();

    // Parse CSS
    const ast = postcss.parse(css);
    const parseTime = performance.now() - startTime;

    // Analyze selectors
    const selectors: string[] = [];
    const complexSelectors: string[] = [];

    ast.walkRules(rule => {
      selectors.push(rule.selector);

      // Check for complex selectors
      if (
        (rule.selector.includes(' ') && rule.selector.split(' ').length > 3) ||
        rule.selector.includes('+') ||
        rule.selector.includes('~') ||
        rule.selector.includes('>')
      ) {
        complexSelectors.push(rule.selector);
      }
    });

    // Generate recommendations
    const recommendations: string[] = [];

    if (complexSelectors.length > selectors.length * 0.1) {
      recommendations.push(
        'Consider simplifying complex selectors for better performance'
      );
    }

    if (css.length > 50 * 1024) {
      recommendations.push(
        'Bundle size is large, consider splitting into smaller chunks'
      );
    }

    return {
      parseTime,
      renderTime: 0, // Would need browser environment to measure
      unusedRules: 0, // Would need DOM analysis
      complexSelectors,
      recommendations,
    };
  }
}

// Export utilities
export const cssBundler = new CSSBundler();
export const bundleSizeValidator = new BundleSizeValidator();
export const cssPerformanceAnalyzer = new CSSPerformanceAnalyzer();
