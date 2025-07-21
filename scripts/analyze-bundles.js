#!/usr/bin/env bun

/**
 * Bundle Size Analyzer for Glass UI
 * Monitors bundle sizes and alerts on regressions
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { gzipSync } from 'zlib';
import chalk from 'chalk';
import { glob } from 'glob';

const BUNDLE_TARGETS = {
  'core': { max: 15, warn: 12 },
  'animations': { max: 10, warn: 8 },
  'advanced': { max: 8, warn: 6 },
  'accessibility': { max: 12, warn: 10 },
  'forms': { max: 20, warn: 16 },
  'feedback': { max: 10, warn: 8 },
  'layout': { max: 15, warn: 12 },
  'navigation': { max: 10, warn: 8 },
};

const HISTORY_FILE = '.bundle-size-history.json';

function getFileSize(filePath) {
  const content = readFileSync(filePath);
  const gzipped = gzipSync(content);
  
  return {
    raw: content.length,
    gzipped: gzipped.length,
    rawKB: (content.length / 1024).toFixed(2),
    gzippedKB: (gzipped.length / 1024).toFixed(2),
  };
}

function loadHistory() {
  if (existsSync(HISTORY_FILE)) {
    const content = readFileSync(HISTORY_FILE, 'utf-8');
    return JSON.parse(content);
  }
  return {};
}

function saveHistory(history) {
  writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

function analyzeBundles() {
  console.log(chalk.bold.blue('\n📊 Glass UI Bundle Size Analysis\n'));
  
  const distDir = join(process.cwd(), 'dist');
  const files = glob.sync('*.mjs', { cwd: distDir });
  
  const results = {};
  const history = loadHistory();
  const timestamp = new Date().toISOString();
  
  files.forEach(file => {
    const filePath = join(distDir, file);
    const bundleName = basename(file, '.mjs');
    const sizes = getFileSize(filePath);
    
    results[bundleName] = {
      file,
      ...sizes,
      timestamp,
    };
    
    // Check against targets
    const target = BUNDLE_TARGETS[bundleName];
    if (target) {
      const sizeKB = parseFloat(sizes.gzippedKB);
      
      let status = '✅';
      let color = 'green';
      
      if (sizeKB > target.max) {
        status = '❌';
        color = 'red';
      } else if (sizeKB > target.warn) {
        status = '⚠️';
        color = 'yellow';
      }
      
      console.log(
        chalk[color](
          `${status} ${bundleName}: ${sizes.gzippedKB}KB (gzipped) / ${sizes.rawKB}KB (raw)`
        )
      );
      
      // Check for regression
      const previousSize = history[bundleName]?.gzippedKB;
      if (previousSize) {
        const diff = sizeKB - parseFloat(previousSize);
        if (diff > 0.5) { // 0.5KB regression threshold
          console.log(
            chalk.red(`   ⚠️  Size increased by ${diff.toFixed(2)}KB from previous build`)
          );
        } else if (diff < -0.5) {
          console.log(
            chalk.green(`   ✨ Size decreased by ${Math.abs(diff).toFixed(2)}KB`)
          );
        }
      }
      
      console.log(
        chalk.gray(`   Target: <${target.max}KB, Warning: >${target.warn}KB`)
      );
      console.log();
    }
  });
  
  // Update history
  Object.assign(history, results);
  saveHistory(history);
  
  // Summary
  console.log(chalk.bold('\n📈 Summary:'));
  
  const totalSize = Object.values(results)
    .reduce((sum, r) => sum + parseFloat(r.gzippedKB), 0);
  
  console.log(`Total bundle size: ${totalSize.toFixed(2)}KB (gzipped)`);
  
  // Generate report
  const report = {
    timestamp,
    bundles: results,
    total: {
      gzippedKB: totalSize.toFixed(2),
      rawKB: Object.values(results)
        .reduce((sum, r) => sum + parseFloat(r.rawKB), 0)
        .toFixed(2),
    },
    targets: BUNDLE_TARGETS,
  };
  
  writeFileSync('bundle-size-report.json', JSON.stringify(report, null, 2));
  console.log(chalk.gray('\nDetailed report saved to bundle-size-report.json'));
  
  // Exit with error if any bundle exceeds max size
  const hasErrors = Object.entries(results).some(([name, sizes]) => {
    const target = BUNDLE_TARGETS[name];
    return target && parseFloat(sizes.gzippedKB) > target.max;
  });
  
  if (hasErrors) {
    console.log(chalk.red('\n❌ Some bundles exceed their size limits!'));
    process.exit(1);
  }
}

// Run analysis
analyzeBundles();