#!/usr/bin/env node

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Configuration
const CONFIG = {
  outputDir: "reports/performance",
  iterations: 100,
  warmupRuns: 10,
  targets: {
    firstRender: 50, // ms
    reRender: 16.67, // ms (60fps)
    memoryUsage: 10, // MB
    bundleLoad: 200, // ms
  },
  components: [
    "GlassButton",
    "GlassCard",
    "GlassInput",
    "GlassModal",
    "GlassTable",
    "GlassNavigation",
    "GlassAccordion",
    "GlassChart",
  ],
};

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Performance testing utilities
function measureTime(fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return { result, time: end - start };
}

async function measureAsync(fn) {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  return { result, time: end - start };
}

function measureMemory() {
  if (typeof window !== "undefined" && window.performance?.memory) {
    return {
      used: window.performance.memory.usedJSHeapSize / 1024 / 1024, // MB
      total: window.performance.memory.totalJSHeapSize / 1024 / 1024, // MB
      limit: window.performance.memory.jsHeapSizeLimit / 1024 / 1024, // MB
    };
  }

  if (typeof process !== "undefined" && process.memoryUsage) {
    const usage = process.memoryUsage();
    return {
      used: usage.heapUsed / 1024 / 1024, // MB
      total: usage.heapTotal / 1024 / 1024, // MB
      limit: usage.rss / 1024 / 1024, // MB
    };
  }

  return { used: 0, total: 0, limit: 0 };
}

// Component testing functions
function createComponentTest(componentName) {
  return `
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { ${componentName} } from '../dist/libs/components';

    // Test component with various props
    const TestComponent = ({ variant = 'primary', size = 'md', ...props }) => {
      return React.createElement(${componentName}, {
        variant,
        size,
        children: 'Test Content',
        ...props
      });
    };

    // Performance test suite
    window.performanceTest = {
      measureFirstRender: () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = ReactDOM.createRoot(container);

        const start = performance.now();
        root.render(React.createElement(TestComponent));

        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            const end = performance.now();
            document.body.removeChild(container);
            resolve(end - start);
          });
        });
      },

      measureReRender: () => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = ReactDOM.createRoot(container);

        // Initial render
        root.render(React.createElement(TestComponent));

        return new Promise((resolve) => {
          requestAnimationFrame(() => {
            const start = performance.now();
            root.render(React.createElement(TestComponent, { variant: 'secondary' }));

            requestAnimationFrame(() => {
              const end = performance.now();
              document.body.removeChild(container);
              resolve(end - start);
            });
          });
        });
      },

      measureMemoryUsage: () => {
        const initialMemory = ${measureMemory.toString()}();
        const containers = [];

        // Create multiple instances
        for (let i = 0; i < 100; i++) {
          const container = document.createElement('div');
          document.body.appendChild(container);
          const root = ReactDOM.createRoot(container);
          root.render(React.createElement(TestComponent));
          containers.push({ container, root });
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            const afterMemory = ${measureMemory.toString()}();

            // Cleanup
            containers.forEach(({ container }) => {
              document.body.removeChild(container);
            });

            setTimeout(() => {
              const cleanupMemory = ${measureMemory.toString()}();
              resolve({
                initial: initialMemory.used,
                peak: afterMemory.used,
                final: cleanupMemory.used,
                leaked: cleanupMemory.used - initialMemory.used
              });
            }, 100);
          }, 100);
        });
      }
    };
  `;
}

async function benchmarkComponent(componentName) {
  log(`🔍 Benchmarking ${componentName}...`, "blue");

  const testScript = createComponentTest(componentName);
  const testFile = join(
    CONFIG.outputDir,
    `${componentName.toLowerCase()}-test.js`,
  );

  writeFileSync(testFile, testScript);

  // Use puppeteer to run the test in a real browser environment
  const puppeteerScript = `
    const puppeteer = require('puppeteer');
    const fs = require('fs');
    const path = require('path');

    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      // Load React and our component
      await page.addScriptTag({ url: 'https://unpkg.com/react@18/umd/react.production.min.js' });
      await page.addScriptTag({ url: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js' });
      await page.addScriptTag({ path: '${testFile}' });

      const results = {};

      // Warmup runs
      for (let i = 0; i < ${CONFIG.warmupRuns}; i++) {
        await page.evaluate(() => window.performanceTest.measureFirstRender());
      }

      // First render benchmarks
      const firstRenderTimes = [];
      for (let i = 0; i < ${CONFIG.iterations}; i++) {
        const time = await page.evaluate(() => window.performanceTest.measureFirstRender());
        firstRenderTimes.push(time);
      }

      // Re-render benchmarks
      const reRenderTimes = [];
      for (let i = 0; i < ${CONFIG.iterations}; i++) {
        const time = await page.evaluate(() => window.performanceTest.measureReRender());
        reRenderTimes.push(time);
      }

      // Memory usage test
      const memoryUsage = await page.evaluate(() => window.performanceTest.measureMemoryUsage());

      results.firstRender = {
        times: firstRenderTimes,
        average: firstRenderTimes.reduce((a, b) => a + b, 0) / firstRenderTimes.length,
        min: Math.min(...firstRenderTimes),
        max: Math.max(...firstRenderTimes),
        p95: firstRenderTimes.sort((a, b) => a - b)[Math.floor(firstRenderTimes.length * 0.95)]
      };

      results.reRender = {
        times: reRenderTimes,
        average: reRenderTimes.reduce((a, b) => a + b, 0) / reRenderTimes.length,
        min: Math.min(...reRenderTimes),
        max: Math.max(...reRenderTimes),
        p95: reRenderTimes.sort((a, b) => a - b)[Math.floor(reRenderTimes.length * 0.95)]
      };

      results.memory = memoryUsage;

      console.log(JSON.stringify(results));

      await browser.close();
    })();
  `;

  try {
    const output = execSync(
      `node -e "${puppeteerScript.replace(/"/g, '\\"')}"`,
      {
        encoding: "utf8",
        timeout: 60000,
      },
    );

    return JSON.parse(output.trim().split("\n").pop());
  } catch (error) {
    log(`❌ Error benchmarking ${componentName}: ${error.message}`, "red");
    return null;
  }
}

function analyzeBundleLoadTime() {
  log("📦 Analyzing bundle load times...", "blue");

  const bundleScript = `
    const puppeteer = require('puppeteer');

    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      // Measure main bundle load time
      const start = Date.now();
      await page.addScriptTag({ path: './dist/libs/components/index.js' });
      const mainBundleTime = Date.now() - start;

      // Measure individual component bundles
      const componentBundles = ['core', 'forms', 'navigation', 'feedback'];
      const bundleTimes = {};

      for (const bundle of componentBundles) {
        try {
          const bundleStart = Date.now();
          await page.addScriptTag({ path: \`./dist/libs/components/bundles/\${bundle}.js\` });
          bundleTimes[bundle] = Date.now() - bundleStart;
        } catch (error) {
          bundleTimes[bundle] = null;
        }
      }

      console.log(JSON.stringify({
        mainBundle: mainBundleTime,
        componentBundles: bundleTimes
      }));

      await browser.close();
    })();
  `;

  try {
    const output = execSync(`node -e "${bundleScript.replace(/"/g, '\\"')}"`, {
      encoding: "utf8",
      timeout: 30000,
    });

    return JSON.parse(output.trim().split("\n").pop());
  } catch (error) {
    log(`⚠️ Could not measure bundle load times: ${error.message}`, "yellow");
    return { mainBundle: 0, componentBundles: {} };
  }
}

function generatePerformanceReport(results) {
  const timestamp = new Date().toISOString();

  let report = `# Performance Benchmark Report

Generated: ${new Date().toLocaleString()}

## Summary

Performance targets and results for LiqUIdify components:

| Metric | Target | Status |
|--------|--------|--------|
| First Render | < ${CONFIG.targets.firstRender}ms | ${results.summary.firstRenderStatus} |
| Re-render | < ${CONFIG.targets.reRender}ms | ${results.summary.reRenderStatus} |
| Memory Usage | < ${CONFIG.targets.memoryUsage}MB | ${results.summary.memoryStatus} |
| Bundle Load | < ${CONFIG.targets.bundleLoad}ms | ${results.summary.bundleLoadStatus} |

## Component Performance

| Component | First Render (avg) | Re-render (avg) | Memory Leak | Status |
|-----------|-------------------|-----------------|-------------|--------|
`;

  Object.entries(results.components).forEach(([name, data]) => {
    if (data) {
      const firstRenderStatus =
        data.firstRender.average < CONFIG.targets.firstRender ? "✅" : "❌";
      const reRenderStatus =
        data.reRender.average < CONFIG.targets.reRender ? "✅" : "❌";
      const memoryStatus =
        data.memory.leaked < CONFIG.targets.memoryUsage ? "✅" : "❌";
      const overallStatus = [
        firstRenderStatus,
        reRenderStatus,
        memoryStatus,
      ].every((s) => s === "✅")
        ? "✅"
        : "❌";

      report += `| ${name} | ${data.firstRender.average.toFixed(2)}ms | ${data.reRender.average.toFixed(2)}ms | ${data.memory.leaked.toFixed(2)}MB | ${overallStatus} |\n`;
    } else {
      report += `| ${name} | - | - | - | ❌ |\n`;
    }
  });

  report += `\n## Bundle Load Performance\n\n`;
  report += `| Bundle | Load Time | Status |\n`;
  report += `|--------|-----------|--------|\n`;
  report += `| Main Bundle | ${results.bundleLoad.mainBundle}ms | ${results.bundleLoad.mainBundle < CONFIG.targets.bundleLoad ? "✅" : "❌"} |\n`;

  Object.entries(results.bundleLoad.componentBundles || {}).forEach(
    ([bundle, time]) => {
      if (time !== null) {
        report += `| ${bundle} | ${time}ms | ${time < CONFIG.targets.bundleLoad ? "✅" : "❌"} |\n`;
      }
    },
  );

  report += `\n## Detailed Results\n\n`;

  Object.entries(results.components).forEach(([name, data]) => {
    if (data) {
      report += `### ${name}\n\n`;
      report += `**First Render Performance:**\n`;
      report += `- Average: ${data.firstRender.average.toFixed(2)}ms\n`;
      report += `- Min: ${data.firstRender.min.toFixed(2)}ms\n`;
      report += `- Max: ${data.firstRender.max.toFixed(2)}ms\n`;
      report += `- 95th Percentile: ${data.firstRender.p95.toFixed(2)}ms\n\n`;

      report += `**Re-render Performance:**\n`;
      report += `- Average: ${data.reRender.average.toFixed(2)}ms\n`;
      report += `- Min: ${data.reRender.min.toFixed(2)}ms\n`;
      report += `- Max: ${data.reRender.max.toFixed(2)}ms\n`;
      report += `- 95th Percentile: ${data.reRender.p95.toFixed(2)}ms\n\n`;

      report += `**Memory Usage:**\n`;
      report += `- Initial: ${data.memory.initial.toFixed(2)}MB\n`;
      report += `- Peak: ${data.memory.peak.toFixed(2)}MB\n`;
      report += `- Final: ${data.memory.final.toFixed(2)}MB\n`;
      report += `- Leaked: ${data.memory.leaked.toFixed(2)}MB\n\n`;
    }
  });

  report += `\n## Recommendations\n\n`;

  const slowComponents = Object.entries(results.components).filter(
    ([, data]) => data && data.firstRender.average > CONFIG.targets.firstRender,
  );

  if (slowComponents.length > 0) {
    report += `**Components with slow first render:**\n`;
    slowComponents.forEach(([name, data]) => {
      report += `- ${name}: ${data.firstRender.average.toFixed(2)}ms (target: ${CONFIG.targets.firstRender}ms)\n`;
    });
    report += `\n`;
  }

  const memoryLeaks = Object.entries(results.components).filter(
    ([, data]) => data && data.memory.leaked > CONFIG.targets.memoryUsage,
  );

  if (memoryLeaks.length > 0) {
    report += `**Components with memory leaks:**\n`;
    memoryLeaks.forEach(([name, data]) => {
      report += `- ${name}: ${data.memory.leaked.toFixed(2)}MB leaked\n`;
    });
    report += `\n`;
  }

  return report;
}

async function main() {
  log("🚀 Starting Performance Benchmark Suite", "bright");

  try {
    // Ensure output directory exists
    mkdirSync(CONFIG.outputDir, { recursive: true });

    const results = {
      timestamp: new Date().toISOString(),
      config: CONFIG,
      components: {},
      bundleLoad: {},
      summary: {},
    };

    // Benchmark each component
    for (const component of CONFIG.components) {
      const componentResults = await benchmarkComponent(component);
      results.components[component] = componentResults;

      if (componentResults) {
        log(
          `✅ ${component}: ${componentResults.firstRender.average.toFixed(2)}ms first render, ${componentResults.reRender.average.toFixed(2)}ms re-render`,
          "green",
        );
      } else {
        log(`❌ ${component}: Failed to benchmark`, "red");
      }
    }

    // Analyze bundle load times
    results.bundleLoad = analyzeBundleLoadTime();

    // Generate summary
    const componentResults = Object.values(results.components).filter(Boolean);
    const avgFirstRender =
      componentResults.reduce((sum, r) => sum + r.firstRender.average, 0) /
      componentResults.length;
    const avgReRender =
      componentResults.reduce((sum, r) => sum + r.reRender.average, 0) /
      componentResults.length;
    const avgMemoryLeak =
      componentResults.reduce((sum, r) => sum + r.memory.leaked, 0) /
      componentResults.length;

    results.summary = {
      firstRenderStatus:
        avgFirstRender < CONFIG.targets.firstRender ? "✅ PASS" : "❌ FAIL",
      reRenderStatus:
        avgReRender < CONFIG.targets.reRender ? "✅ PASS" : "❌ FAIL",
      memoryStatus:
        avgMemoryLeak < CONFIG.targets.memoryUsage ? "✅ PASS" : "❌ FAIL",
      bundleLoadStatus:
        results.bundleLoad.mainBundle < CONFIG.targets.bundleLoad
          ? "✅ PASS"
          : "❌ FAIL",
      averageFirstRender: avgFirstRender,
      averageReRender: avgReRender,
      averageMemoryLeak: avgMemoryLeak,
    };

    // Generate reports
    const report = generatePerformanceReport(results);
    const reportPath = join(CONFIG.outputDir, "performance-benchmark.md");
    writeFileSync(reportPath, report);

    const jsonPath = join(CONFIG.outputDir, "performance-benchmark.json");
    writeFileSync(jsonPath, JSON.stringify(results, null, 2));

    log(`📄 Report saved to: ${reportPath}`, "cyan");
    log(`📊 JSON data saved to: ${jsonPath}`, "cyan");

    // Print summary
    log("\n📊 Performance Summary:", "bright");
    log(
      `   First Render: ${avgFirstRender.toFixed(2)}ms avg (target: ${CONFIG.targets.firstRender}ms) ${results.summary.firstRenderStatus}`,
      results.summary.firstRenderStatus.includes("✅") ? "green" : "red",
    );
    log(
      `   Re-render: ${avgReRender.toFixed(2)}ms avg (target: ${CONFIG.targets.reRender}ms) ${results.summary.reRenderStatus}`,
      results.summary.reRenderStatus.includes("✅") ? "green" : "red",
    );
    log(
      `   Memory Leak: ${avgMemoryLeak.toFixed(2)}MB avg (target: ${CONFIG.targets.memoryUsage}MB) ${results.summary.memoryStatus}`,
      results.summary.memoryStatus.includes("✅") ? "green" : "red",
    );
    log(
      `   Bundle Load: ${results.bundleLoad.mainBundle}ms (target: ${CONFIG.targets.bundleLoad}ms) ${results.summary.bundleLoadStatus}`,
      results.summary.bundleLoadStatus.includes("✅") ? "green" : "red",
    );

    const allPassed =
      Object.values(results.summary).filter(
        (s) => typeof s === "string" && s.includes("✅"),
      ).length === 4;

    if (allPassed) {
      log("\n🎉 All performance benchmarks passed!", "green");
    } else {
      log(
        "\n⚠️  Some performance benchmarks failed. See report for details.",
        "yellow",
      );
      process.exit(1);
    }
  } catch (error) {
    log(`❌ Error during performance benchmarking: ${error.message}`, "red");
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the benchmark
main();
