#!/usr/bin/env node

/**
 * Legacy Code Audit Tool
 * 
 * This script analyzes the codebase to identify:
 * 1. Legacy code patterns
 * 2. Duplicate implementations
 * 3. Failed migrations
 * 4. Technical debt
 * 
 * It generates a comprehensive report with priority rankings
 * to guide the modernization efforts.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

// Configuration
const PATTERNS = {
  LEGACY_PATTERNS: [
    { pattern: /componentWillMount|componentWillReceiveProps|componentWillUpdate/g, description: 'Legacy React lifecycle methods' },
    { pattern: /React\.createClass/g, description: 'Legacy React class creation' },
    { pattern: /mixins:/g, description: 'React mixins (deprecated)' },
    { pattern: /\.bind\(this\)/g, description: 'Manual method binding (use class properties or hooks)' },
    { pattern: /this\.setState\(\{\s*[^:]+:\s*[^,}]+\s*\}\)/g, description: 'Potential setState race condition' },
    { pattern: /document\.getElementById|document\.querySelector/g, description: 'Direct DOM manipulation' },
    { pattern: /\.innerHtml\s*=/g, description: 'Unsafe innerHTML usage' },
    { pattern: /\/\/ TODO|\/\/ FIXME/g, description: 'TODO/FIXME comments' },
    { pattern: /console\.log|console\.warn|console\.error/g, description: 'Console statements' },
  ],
  DUPLICATE_IMPLEMENTATIONS: [
    { pattern: /createGlassEffect|applyGlassEffect/g, description: 'Multiple glass effect implementations' },
    { pattern: /animateElement|createAnimation/g, description: 'Duplicate animation systems' },
    { pattern: /theme\s*=\s*{/g, description: 'Multiple theme definitions' },
    { pattern: /const\s+styles\s*=\s*{/g, description: 'Inline styles (should use styled components or CSS modules)' },
  ],
  FAILED_MIGRATIONS: [
    { pattern: /\/\/ @ts-ignore|\/\/ @ts-nocheck/g, description: 'TypeScript ignores (failed TypeScript migration)' },
    { pattern: /any\s*[;,)]/g, description: 'TypeScript any usage (incomplete typing)' },
    { pattern: /eslint-disable|tslint:disable/g, description: 'Linting disables' },
    { pattern: /\/\/ Migration:/g, description: 'Explicit migration comments' },
  ]
};

// File extensions to scan
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// Directories to exclude
const EXCLUDE_DIRS = ['node_modules', 'dist', 'build', '.git'];

// Results storage
const results = {
  legacyPatterns: [],
  duplicateImplementations: [],
  failedMigrations: [],
  summary: {
    totalFiles: 0,
    filesWithIssues: 0,
    totalIssues: 0,
    highPriorityIssues: 0,
    mediumPriorityIssues: 0,
    lowPriorityIssues: 0,
  }
};

/**
 * Scans a file for patterns and records matches
 */
function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fileHasIssues = false;
    
    // Check for legacy patterns
    PATTERNS.LEGACY_PATTERNS.forEach(({ pattern, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        fileHasIssues = true;
        results.legacyPatterns.push({
          file: filePath,
          pattern: description,
          count: matches.length,
          priority: description.includes('lifecycle') || description.includes('createClass') ? 'high' : 'medium'
        });
      }
    });
    
    // Check for duplicate implementations
    PATTERNS.DUPLICATE_IMPLEMENTATIONS.forEach(({ pattern, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        fileHasIssues = true;
        results.duplicateImplementations.push({
          file: filePath,
          pattern: description,
          count: matches.length,
          priority: 'high'
        });
      }
    });
    
    // Check for failed migrations
    PATTERNS.FAILED_MIGRATIONS.forEach(({ pattern, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        fileHasIssues = true;
        results.failedMigrations.push({
          file: filePath,
          pattern: description,
          count: matches.length,
          priority: description.includes('TypeScript') ? 'high' : 'medium'
        });
      }
    });
    
    // Update summary
    results.summary.totalFiles++;
    if (fileHasIssues) {
      results.summary.filesWithIssues++;
    }
    
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error.message);
  }
}

/**
 * Recursively scans directories for files to analyze
 */
function scanDirectory(directory) {
  const files = glob.sync(`${directory}/**/*.*`);
  
  files.forEach(file => {
    const ext = path.extname(file);
    const shouldExclude = EXCLUDE_DIRS.some(dir => file.includes(`/${dir}/`));
    
    if (EXTENSIONS.includes(ext) && !shouldExclude) {
      scanFile(file);
    }
  });
}

/**
 * Calculates summary statistics
 */
function calculateSummary() {
  const allIssues = [
    ...results.legacyPatterns,
    ...results.duplicateImplementations,
    ...results.failedMigrations
  ];
  
  results.summary.totalIssues = allIssues.length;
  results.summary.highPriorityIssues = allIssues.filter(issue => issue.priority === 'high').length;
  results.summary.mediumPriorityIssues = allIssues.filter(issue => issue.priority === 'medium').length;
  results.summary.lowPriorityIssues = allIssues.filter(issue => issue.priority === 'low').length;
}

/**
 * Generates a technical debt inventory report
 */
function generateReport() {
  calculateSummary();
  
  console.log(chalk.bold.blue('\n=== LEGACY CODE AUDIT REPORT ===\n'));
  
  // Summary
  console.log(chalk.bold('SUMMARY:'));
  console.log(`Total files scanned: ${results.summary.totalFiles}`);
  console.log(`Files with issues: ${results.summary.filesWithIssues} (${Math.round(results.summary.filesWithIssues / results.summary.totalFiles * 100)}%)`);
  console.log(`Total issues found: ${results.summary.totalIssues}`);
  console.log(`  - High priority: ${chalk.red(results.summary.highPriorityIssues)}`);
  console.log(`  - Medium priority: ${chalk.yellow(results.summary.mediumPriorityIssues)}`);
  console.log(`  - Low priority: ${chalk.green(results.summary.lowPriorityIssues)}`);
  
  // Legacy Patterns
  console.log(chalk.bold('\nLEGACY CODE PATTERNS:'));
  if (results.legacyPatterns.length === 0) {
    console.log('  No legacy patterns found.');
  } else {
    results.legacyPatterns.forEach(issue => {
      const priorityColor = issue.priority === 'high' ? chalk.red : issue.priority === 'medium' ? chalk.yellow : chalk.green;
      console.log(`  ${priorityColor(`[${issue.priority.toUpperCase()}]`)} ${issue.pattern} (${issue.count} occurrences)`);
      console.log(`    - ${issue.file}`);
    });
  }
  
  // Duplicate Implementations
  console.log(chalk.bold('\nDUPLICATE IMPLEMENTATIONS:'));
  if (results.duplicateImplementations.length === 0) {
    console.log('  No duplicate implementations found.');
  } else {
    results.duplicateImplementations.forEach(issue => {
      const priorityColor = issue.priority === 'high' ? chalk.red : issue.priority === 'medium' ? chalk.yellow : chalk.green;
      console.log(`  ${priorityColor(`[${issue.priority.toUpperCase()}]`)} ${issue.pattern} (${issue.count} occurrences)`);
      console.log(`    - ${issue.file}`);
    });
  }
  
  // Failed Migrations
  console.log(chalk.bold('\nFAILED MIGRATIONS:'));
  if (results.failedMigrations.length === 0) {
    console.log('  No failed migrations found.');
  } else {
    results.failedMigrations.forEach(issue => {
      const priorityColor = issue.priority === 'high' ? chalk.red : issue.priority === 'medium' ? chalk.yellow : chalk.green;
      console.log(`  ${priorityColor(`[${issue.priority.toUpperCase()}]`)} ${issue.pattern} (${issue.count} occurrences)`);
      console.log(`    - ${issue.file}`);
    });
  }
  
  // Generate JSON report
  const reportPath = path.join(process.cwd(), 'technical-debt-inventory.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(chalk.bold(`\nDetailed report saved to: ${reportPath}`));
  
  // Recommendations
  console.log(chalk.bold('\nRECOMMENDATIONS:'));
  if (results.summary.highPriorityIssues > 0) {
    console.log(chalk.red('  ! Address high priority issues first, especially legacy React lifecycle methods and failed TypeScript migrations'));
  }
  if (results.duplicateImplementations.length > 0) {
    console.log(chalk.yellow('  ! Consolidate duplicate implementations to improve maintainability and performance'));
  }
  if (results.legacyPatterns.filter(p => p.pattern.includes('setState')).length > 0) {
    console.log(chalk.yellow('  ! Review setState usage for potential race conditions'));
  }
  
  console.log(chalk.bold.blue('\n=== END OF REPORT ===\n'));
}

// Main execution
console.log(chalk.bold('Starting legacy code audit...'));
scanDirectory(process.cwd());
generateReport();
