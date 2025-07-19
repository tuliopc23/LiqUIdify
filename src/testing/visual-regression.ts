/**
 * Visual Regression Testing System
 *
 * Comprehensive visual testing infrastructure:
 * - Component screenshot capture
 * - Pixel-perfect comparison
 * - Cross-browser consistency validation
 * - Animation frame testing
 */

import { Browser, Page, chromium, firefox, webkit } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { performanceMonitor } from '../core/performance-monitor';

// Types
export interface VisualTestOptions {
  threshold?: number;
  diffDir?: string;
  baselineDir?: string;
  screenshotDir?: string;
  updateBaseline?: boolean;
  browsers?: ('chromium' | 'firefox' | 'webkit')[];
  viewports?: { width: number; height: number; name: string }[];
  themes?: ('light' | 'dark' | 'custom')[];
}

export interface VisualTestResult {
  passed: boolean;
  diffPercentage: number;
  diffPixels: number;
  totalPixels: number;
  diffPath?: string;
  baselinePath?: string;
  screenshotPath?: string;
  browser: string;
  viewport: string;
  theme: string;
  component: string;
  state: string;
}

export interface AnimationFrameTestOptions extends VisualTestOptions {
  frames?: number;
  duration?: number;
}

export interface AnimationFrameTestResult extends VisualTestResult {
  frameNumber: number;
  timestamp: number;
}

/**
 * Visual Regression Tester
 * Core class for visual regression testing
 */
export class VisualRegressionTester {
  private options: VisualTestOptions;
  private browsers: Browser[] = [];

  constructor(options: VisualTestOptions = {}) {
    this.options = {
      threshold: 0.1, // 0.1% threshold for differences
      diffDir: path.join(process.cwd(), 'visual-test-results/diffs'),
      baselineDir: path.join(process.cwd(), 'visual-test-results/baseline'),
      screenshotDir: path.join(
        process.cwd(),
        'visual-test-results/screenshots'
      ),
      updateBaseline: false,
      browsers: ['chromium'],
      viewports: [{ width: 1280, height: 720, name: 'desktop' }],
      themes: ['light'],
      ...options,
    };

    // Create directories if they don't exist
    this.createDirectories();
  }

  /**
   * Initialize browsers for testing
   */
  async initialize(): Promise<void> {
    performanceMonitor.startTiming('visual-regression-init');

    // Launch browsers
    for (const browserType of this.options.browsers!) {
      let browser: Browser;

      switch (browserType) {
        case 'chromium':
          browser = await chromium.launch();
          break;
        case 'firefox':
          browser = await firefox.launch();
          break;
        case 'webkit':
          browser = await webkit.launch();
          break;
        default:
          throw new Error(`Unsupported browser type: ${browserType}`);
      }

      this.browsers.push(browser);
    }

    performanceMonitor.endTiming('visual-regression-init');
  }

  /**
   * Capture screenshots of a component in different states
   */
  async captureScreenshots(
    url: string,
    component: string,
    states: string[],
    selector: string
  ): Promise<VisualTestResult[]> {
    performanceMonitor.startTiming(`visual-regression-capture-${component}`);

    const results: VisualTestResult[] = [];

    // Iterate through browsers
    for (let i = 0; i < this.browsers.length; i++) {
      const browser = this.browsers[i];
      const browserType = this.options.browsers![i];

      // Create context and page
      const context = await browser!.newContext();
      const page = await context.newPage();

      // Iterate through viewports
      for (const viewport of this.options.viewports!) {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });

        // Iterate through themes
        for (const theme of this.options.themes!) {
          // Navigate to URL with theme parameter
          await page.goto(`${url}?theme=${theme}`);

          // Wait for component to be ready
          await page.waitForSelector(selector);

          // Iterate through states
          for (const state of states) {
            // Set component state
            await this.setComponentState(page, selector, state);

            // Wait for animations to complete
            await page.waitForTimeout(500);

            // Capture screenshot
            const screenshotPath = this.getScreenshotPath(
              component,
              state,
              browserType || 'chromium',
              viewport.name || '',
              theme || 'light'
            );

            await page.locator(selector).screenshot({ path: screenshotPath });

            // Compare with baseline
            const result = await this.compareWithBaseline(
              component,
              state,
              browserType || 'chromium',
              viewport.name || '',
              theme || 'light',
              screenshotPath
            );

            results.push(result);
          }
        }
      }

      // Close context
      await context.close();
    }

    performanceMonitor.endTiming(`visual-regression-capture-${component}`);
    return results;
  }

  /**
   * Capture animation frames for testing
   */
  async captureAnimationFrames(
    url: string,
    component: string,
    animationState: string,
    selector: string,
    options: AnimationFrameTestOptions = {}
  ): Promise<AnimationFrameTestResult[]> {
    performanceMonitor.startTiming(`visual-regression-animation-${component}`);

    const { frames = 10, duration = 1000 } = options;

    const results: AnimationFrameTestResult[] = [];
    const frameInterval = duration / frames;

    // Use first browser for animation testing
    const browser = this.browsers[0];
    const browserType = this.options.browsers![0];

    // Create context and page
    const context = await browser!.newContext();
    const page = await context.newPage();

    // Use first viewport and theme for animation testing
    const viewport = this.options.viewports![0];
    const theme = this.options.themes![0];

    await page.setViewportSize({
      width: viewport!.width,
      height: viewport!.height,
    });

    // Navigate to URL with theme parameter
    await page.goto(`${url}?theme=${theme}`);

    // Wait for component to be ready
    await page.waitForSelector(selector);

    // Trigger animation
    await this.setComponentState(page, selector, animationState);

    // Capture frames
    for (let i = 0; i < frames; i++) {
      const timestamp = i * frameInterval;
      const frameNumber = i + 1;

      // Wait for frame time
      await page.waitForTimeout(frameInterval);

      // Capture screenshot
      const screenshotPath = this.getAnimationFramePath(
        component,
        animationState,
        frameNumber,
        browserType || 'chromium',
        viewport?.name || '',
        theme || 'light'
      );

      await page.locator(selector).screenshot({ path: screenshotPath });

      // Compare with baseline
      const baseResult = await this.compareWithBaseline(
        component,
        `${animationState}-frame-${frameNumber}`,
        browserType || 'chromium',
        viewport?.name || '',
        theme || 'light',
        screenshotPath
      );

      // Add animation-specific properties
      const result: AnimationFrameTestResult = {
        ...baseResult,
        frameNumber,
        timestamp,
      };

      results.push(result);
    }

    // Close context
    await context.close();

    performanceMonitor.endTiming(`visual-regression-animation-${component}`);
    return results;
  }

  /**
   * Compare screenshot with baseline
   */
  private async compareWithBaseline(
    component: string,
    state: string,
    browser: string,
    viewport: string,
    theme: string,
    screenshotPath: string
  ): Promise<VisualTestResult> {
    const baselinePath = this.getBaselinePath(
      component,
      state,
      browser,
      viewport,
      theme
    );

    // If baseline doesn't exist or update is requested, use current screenshot as baseline
    if (!fs.existsSync(baselinePath) || this.options.updateBaseline) {
      fs.copyFileSync(screenshotPath, baselinePath);

      return {
        passed: true,
        diffPercentage: 0,
        diffPixels: 0,
        totalPixels: 0,
        baselinePath,
        screenshotPath,
        browser,
        viewport,
        theme: theme || 'light',
        component,
        state,
      };
    }

    // Compare images
    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const screenshot = PNG.sync.read(fs.readFileSync(screenshotPath));

    const { width, height } = baseline;
    const totalPixels = width * height;

    // Create diff image
    const diff = new PNG({ width, height });

    const diffPixels = pixelmatch(
      baseline.data,
      screenshot.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    const diffPercentage = (diffPixels / totalPixels) * 100;
    const passed = diffPercentage <= this.options.threshold!;

    // Save diff image if there are differences
    let diffPath: string | undefined;

    if (diffPixels > 0) {
      diffPath = this.getDiffPath(
        component,
        state,
        browser,
        viewport,
        theme || 'light'
      );

      fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }

    return {
      passed,
      diffPercentage,
      diffPixels,
      totalPixels,
      diffPath,
      baselinePath,
      screenshotPath,
      browser,
      viewport,
      theme,
      component,
      state,
    };
  }

  /**
   * Set component state for testing
   */
  private async setComponentState(
    page: Page,
    selector: string,
    state: string
  ): Promise<void> {
    // Execute state change based on state name
    switch (state) {
      case 'hover':
        await page.hover(selector);
        break;
      case 'focus':
        await page.focus(selector);
        break;
      case 'active':
        await page.focus(selector);
        await page.mouse.down();
        break;
      case 'disabled':
        await page.evaluate(sel => {
          const element = document.querySelector(sel);
          if (element) {
            (element as HTMLElement).setAttribute('disabled', 'true');
          }
        }, selector);
        break;
      default:
        // For custom states, try to find a data attribute or class
        await page.evaluate(
          ({ sel, st }: { sel: string; st: string }) => {
            const element = document.querySelector(sel);
            if (element) {
              // Try to find a button or link that triggers the state
              const trigger =
                element.querySelector(`[data-state="${st}"]`) ||
                element.querySelector(`[data-trigger="${st}"]`) ||
                element.querySelector(`.trigger-${st}`);

              if (trigger) {
                (trigger as HTMLElement).click();
              } else {
                // Try to set a data attribute
                (element as HTMLElement).setAttribute('data-state', st);
                // Dispatch custom event
                element.dispatchEvent(
                  new CustomEvent('statechange', {
                    detail: { state: st },
                  })
                );
              }
            }
          },
          { sel: selector, st: state }
        );
        break;
    }

    // Wait for any state changes to apply
    await page.waitForTimeout(100);
  }

  /**
   * Get path for screenshot
   */
  private getScreenshotPath(
    component: string,
    state: string,
    browser: string,
    viewport: string,
    theme: string
  ): string {
    return path.join(
      this.options.screenshotDir!,
      `${component}-${state}-${browser}-${viewport}-${theme}.png`
    );
  }

  /**
   * Get path for baseline image
   */
  private getBaselinePath(
    component: string,
    state: string,
    browser: string,
    viewport: string,
    theme: string
  ): string {
    return path.join(
      this.options.baselineDir!,
      `${component}-${state}-${browser}-${viewport}-${theme}.png`
    );
  }

  /**
   * Get path for diff image
   */
  private getDiffPath(
    component: string,
    state: string,
    browser: string,
    viewport: string,
    theme: string
  ): string {
    return path.join(
      this.options.diffDir!,
      `${component}-${state}-${browser}-${viewport}-${theme}-diff.png`
    );
  }

  /**
   * Get path for animation frame
   */
  private getAnimationFramePath(
    component: string,
    animationState: string,
    frameNumber: number,
    browser: string,
    viewport: string,
    theme: string
  ): string {
    return path.join(
      this.options.screenshotDir!,
      `${component}-${animationState}-frame-${frameNumber}-${browser}-${viewport}-${theme}.png`
    );
  }

  /**
   * Create necessary directories
   */
  private createDirectories(): void {
    const dirs = [
      this.options.diffDir!,
      this.options.baselineDir!,
      this.options.screenshotDir!,
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Generate HTML report from test results
   */
  generateReport(results: VisualTestResult[]): string {
    const passedTests = results.filter(result => result.passed).length;
    const totalTests = results.length;
    const passRate = (passedTests / totalTests) * 100;

    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Visual Regression Test Report</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; max-width: 1200px; margin: 0 auto; padding: 20px; }
          h1, h2, h3 { margin-top: 2rem; }
          .summary { display: flex; gap: 20px; margin-bottom: 2rem; }
          .summary-card { background: #f5f5f5; border-radius: 8px; padding: 20px; flex: 1; }
          .pass-rate { font-size: 2rem; font-weight: bold; }
          .pass { color: #2ecc71; }
          .fail { color: #e74c3c; }
          .test-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
          .test-card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
          .test-header { padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; }
          .test-status { font-weight: bold; }
          .test-images { display: flex; flex-direction: column; gap: 10px; padding: 10px; }
          .test-image-container { display: flex; flex-direction: column; }
          .test-image-label { font-size: 0.8rem; color: #666; margin-bottom: 5px; }
          .test-image { width: 100%; height: auto; border: 1px solid #ddd; }
          .test-details { padding: 10px; font-size: 0.9rem; border-top: 1px solid #ddd; }
          .test-detail { margin-bottom: 5px; }
          .filters { margin-bottom: 2rem; display: flex; gap: 10px; flex-wrap: wrap; }
          .filter-group { display: flex; flex-direction: column; }
          .filter-label { font-weight: bold; margin-bottom: 5px; }
          .filter-options { display: flex; gap: 10px; }
          .filter-option { padding: 5px 10px; background: #f5f5f5; border-radius: 4px; cursor: pointer; }
          .filter-option.active { background: #333; color: white; }
        </style>
      </head>
      <body>
        <h1>Visual Regression Test Report</h1>
        
        <div class="summary">
          <div class="summary-card">
            <h3>Pass Rate</h3>
            <div class="pass-rate ${passRate >= 95 ? 'pass' : 'fail'}">${passRate.toFixed(2)}%</div>
            <p>${passedTests} / ${totalTests} tests passed</p>
          </div>
          
          <div class="summary-card">
            <h3>Test Coverage</h3>
            <p>Components: ${new Set(results.map(r => r.component)).size}</p>
            <p>States: ${new Set(results.map(r => r.state)).size}</p>
            <p>Browsers: ${new Set(results.map(r => r.browser)).size}</p>
          </div>
        </div>
        
        <div class="filters">
          <div class="filter-group">
            <div class="filter-label">Status</div>
            <div class="filter-options">
              <div class="filter-option active" data-filter="status" data-value="all">All</div>
              <div class="filter-option" data-filter="status" data-value="passed">Passed</div>
              <div class="filter-option" data-filter="status" data-value="failed">Failed</div>
            </div>
          </div>
          
          <div class="filter-group">
            <div class="filter-label">Component</div>
            <div class="filter-options">
              <div class="filter-option active" data-filter="component" data-value="all">All</div>
              ${[...new Set(results.map(r => r.component))]
                .map(
                  component =>
                    `<div class="filter-option" data-filter="component" data-value="${component}">${component}</div>`
                )
                .join('')}
            </div>
          </div>
        </div>
        
        <div class="test-grid">
    `;

    // Add test cards
    results.forEach(result => {
      const statusClass = result.passed ? 'pass' : 'fail';

      html += `
        <div class="test-card" 
             data-status="${result.passed ? 'passed' : 'failed'}"
             data-component="${result.component}"
             data-state="${result.state}"
             data-browser="${result.browser}"
             data-viewport="${result.viewport}"
             data-theme="${result.theme}">
          <div class="test-header">
            <div>${result.component} - ${result.state}</div>
            <div class="test-status ${statusClass}">${result.passed ? 'PASS' : 'FAIL'}</div>
          </div>
          
          <div class="test-images">
            <div class="test-image-container">
              <div class="test-image-label">Baseline</div>
              <img class="test-image" src="${result.baselinePath?.replace(process.cwd(), '')}" alt="Baseline">
            </div>
            
            <div class="test-image-container">
              <div class="test-image-label">Current</div>
              <img class="test-image" src="${result.screenshotPath?.replace(process.cwd(), '')}" alt="Current">
            </div>
            
            ${
              result.diffPath
                ? `
              <div class="test-image-container">
                <div class="test-image-label">Diff</div>
                <img class="test-image" src="${result.diffPath.replace(process.cwd(), '')}" alt="Diff">
              </div>
            `
                : ''
            }
          </div>
          
          <div class="test-details">
            <div class="test-detail">Browser: ${result.browser}</div>
            <div class="test-detail">Viewport: ${result.viewport}</div>
            <div class="test-detail">Theme: ${result.theme}</div>
            <div class="test-detail">Diff: ${result.diffPercentage.toFixed(2)}% (${result.diffPixels} pixels)</div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
        
        <script>
          // Filter functionality
          document.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', () => {
              const filter = option.dataset.filter;
              const value = option.dataset.value;
              
              // Update active state
              document.querySelectorAll(\`[data-filter="\${filter}"]\`).forEach(opt => {
                opt.classList.remove('active');
              });
              option.classList.add('active');
              
              // Apply filters
              const activeFilters = {};
              document.querySelectorAll('.filter-option.active').forEach(activeOption => {
                activeFilters[activeOption.dataset.filter] = activeOption.dataset.value;
              });
              
              // Filter test cards
              document.querySelectorAll('.test-card').forEach(card => {
                let show = true;
                
                Object.entries(activeFilters).forEach(([filter, value]) => {
                  if (value !== 'all') {
                    if (filter === 'status') {
                      if (value === 'passed' && card.dataset.status !== 'passed') show = false;
                      if (value === 'failed' && card.dataset.status !== 'failed') show = false;
                    } else {
                      if (card.dataset[filter] !== value) show = false;
                    }
                  }
                });
                
                card.style.display = show ? 'block' : 'none';
              });
            });
          });
        </script>
      </body>
      </html>
    `;

    // Write report to file
    const reportPath = path.join(
      process.cwd(),
      'visual-test-results/report.html'
    );
    fs.writeFileSync(reportPath, html);

    return reportPath;
  }

  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    // Close all browsers
    for (const browser of this.browsers) {
      await browser.close();
    }

    this.browsers = [];
  }
}

// Export singleton instance
export const visualRegressionTester = new VisualRegressionTester();

// Export helper functions
export async function runVisualTests(
  url: string,
  components: Array<{ name: string; selector: string; states: string[] }>,
  options: VisualTestOptions = {}
): Promise<VisualTestResult[]> {
  const tester = new VisualRegressionTester(options);
  await tester.initialize();

  const results: VisualTestResult[] = [];

  for (const component of components) {
    const componentResults = await tester.captureScreenshots(
      url,
      component.name,
      component.states,
      component.selector
    );

    results.push(...componentResults);
  }

  const reportPath = tester.generateReport(results);
  console.log(`Visual regression test report generated: ${reportPath}`);

  await tester.cleanup();
  return results;
}

export async function runAnimationTests(
  url: string,
  components: Array<{ name: string; selector: string; animationState: string }>,
  options: AnimationFrameTestOptions = {}
): Promise<AnimationFrameTestResult[]> {
  const tester = new VisualRegressionTester(options);
  await tester.initialize();

  const results: AnimationFrameTestResult[] = [];

  for (const component of components) {
    const componentResults = await tester.captureAnimationFrames(
      url,
      component.name,
      component.animationState,
      component.selector,
      options
    );

    results.push(...componentResults);
  }

  const reportPath = tester.generateReport(results);
  console.log(`Animation test report generated: ${reportPath}`);

  await tester.cleanup();
  return results;
}

// Export all types and functions
export const visualTesting = {
  VisualRegressionTester,
  runVisualTests,
  runAnimationTests,
  visualRegressionTester,
};
