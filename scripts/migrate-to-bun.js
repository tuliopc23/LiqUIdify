#!/usr/bin/env bun

/**
 * Migration script to complete the transition from Node.js to Bun
 * This script will:
 * 1. Update all remaining Node.js shebangs to Bun
 * 2. Replace npm/npx commands with bun/bunx
 * 3. Update documentation references
 * 4. Clean up Node.js specific configurations
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

class BunMigrator {
  constructor() {
    this.changes = [];
    this.errors = [];
  }

  // Replace Node.js shebangs with Bun
  updateShebangs(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      const updatedContent = content.replace(/^#!\/usr\/bin\/env node$/gm, '#!/usr/bin/env bun');
      
      if (content !== updatedContent) {
        writeFileSync(filePath, updatedContent);
        this.changes.push(`Updated shebang in ${filePath}`);
        return true;
      }
    } catch (error) {
      this.errors.push(`Failed to update shebang in ${filePath}: ${error.message}`);
    }
    return false;
  }

  // Replace npm/npx commands with bun/bunx
  updatePackageManagerCommands(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      let updatedContent = content;

      // Replace npm commands
      updatedContent = updatedContent.replace(/\\bnpm\\s+run\\s+/g, 'bun run ');
      updatedContent = updatedContent.replace(/\\bnpm\\s+install\\b/g, 'bun install');
      updatedContent = updatedContent.replace(/\\bnpm\\s+ci\\b/g, 'bun install --frozen-lockfile');
      updatedContent = updatedContent.replace(/\\bnpm\\s+test\\b/g, 'bun test');
      updatedContent = updatedContent.replace(/\\bnpm\\s+build\\b/g, 'bun run build');
      updatedContent = updatedContent.replace(/\\bnpm\\s+start\\b/g, 'bun run start');
      updatedContent = updatedContent.replace(/\\bnpm\\s+dev\\b/g, 'bun run dev');
      updatedContent = updatedContent.replace(/\\bnpm\\s+list\\b/g, 'bun pm ls');
      updatedContent = updatedContent.replace(/\\bnpm\\s+ls\\b/g, 'bun pm ls');

      // Replace npx commands
      updatedContent = updatedContent.replace(/\\bnpx\\s+/g, 'bunx ');

      // Replace node commands (but be careful not to replace Node.js API references)
      updatedContent = updatedContent.replace(/\\bnode\\s+([^\\s]+\\.js)/g, 'bun $1');
      updatedContent = updatedContent.replace(/\\bnode\\s+([^\\s]+\\.ts)/g, 'bun $1');

      if (content !== updatedContent) {
        writeFileSync(filePath, updatedContent);
        this.changes.push(`Updated package manager commands in ${filePath}`);
        return true;
      }
    } catch (error) {
      this.errors.push(`Failed to update commands in ${filePath}: ${error.message}`);
    }
    return false;
  }

  // Update documentation references
  updateDocumentation(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      let updatedContent = content;

      // Update installation instructions
      updatedContent = updatedContent.replace(/npm install/g, 'bun install');
      updatedContent = updatedContent.replace(/npm run/g, 'bun run');
      updatedContent = updatedContent.replace(/npx/g, 'bunx');

      // Update Node.js version references to Bun
      updatedContent = updatedContent.replace(/Node\\.js\\s+v?\\d+/g, 'Bun v1.0+');
      updatedContent = updatedContent.replace(/node\\s+--version/g, 'bun --version');

      if (content !== updatedContent) {
        writeFileSync(filePath, updatedContent);
        this.changes.push(`Updated documentation in ${filePath}`);
        return true;
      }
    } catch (error) {
      this.errors.push(`Failed to update documentation in ${filePath}: ${error.message}`);
    }
    return false;
  }

  // Process a single file
  processFile(filePath) {
    const ext = extname(filePath);
    const isScript = ['.js', '.ts', '.mjs'].includes(ext);
    const isDoc = ['.md', '.txt'].includes(ext);
    const isConfig = ['package.json', '.json'].some(pattern => filePath.includes(pattern));

    if (isScript) {
      this.updateShebangs(filePath);
      this.updatePackageManagerCommands(filePath);
    }

    if (isDoc) {
      this.updateDocumentation(filePath);
    }

    if (isConfig && !filePath.includes('node_modules')) {
      this.updatePackageManagerCommands(filePath);
    }
  }

  // Recursively process directory
  processDirectory(dirPath, excludeDirs = ['node_modules', '.git', 'dist', 'build']) {
    try {
      const entries = readdirSync(dirPath);

      for (const entry of entries) {
        const fullPath = join(dirPath, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          if (!excludeDirs.includes(entry)) {
            this.processDirectory(fullPath, excludeDirs);
          }
        } else {
          this.processFile(fullPath);
        }
      }
    } catch (error) {
      this.errors.push(`Failed to process directory ${dirPath}: ${error.message}`);
    }
  }

  // Generate migration report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalChanges: this.changes.length,
      totalErrors: this.errors.length,
      changes: this.changes,
      errors: this.errors,
      success: this.errors.length === 0
    };

    const reportContent = `
# Bun Migration Report

**Date**: ${report.timestamp}
**Status**: ${report.success ? '✅ SUCCESS' : '❌ FAILED'}
**Changes Made**: ${report.totalChanges}
**Errors**: ${report.totalErrors}

## Changes Made

${report.changes.map(change => `- ✅ ${change}`).join('\\n')}

## Errors

${report.errors.map(error => `- ❌ ${error}`).join('\\n') || 'None'}

## Next Steps

1. Run \`bun install\` to ensure all dependencies are properly installed
2. Run \`bun run lint\` to check for any linting issues
3. Run \`bun run type-check\` to verify TypeScript compilation
4. Run \`bun run test\` to ensure all tests pass
5. Run \`bun run build\` to verify the build process

## Verification Commands

\`\`\`bash
# Verify Bun installation
bun --version

# Install dependencies
bun install

# Run quality checks
bun run lint
bun run type-check
bun run test
bun run build
\`\`\`
`;

    writeFileSync('./BUN_MIGRATION_REPORT.md', reportContent);
    return report;
  }

  async run() {
    log('🚀 Starting Bun migration...', 'blue');
    log('=' .repeat(50), 'blue');

    // Process scripts directory
    log('📁 Processing scripts directory...', 'yellow');
    this.processDirectory('./scripts');

    // Process GitHub workflows
    log('📁 Processing GitHub workflows...', 'yellow');
    this.processDirectory('./.github');

    // Process root configuration files
    log('📄 Processing root configuration files...', 'yellow');
    const rootFiles = [
      'package.json',
      'README.md',
      'CONTRIBUTING.md',
      'DEPLOYMENT.md'
    ];

    for (const file of rootFiles) {
      try {
        this.processFile(`./${file}`);
      } catch (error) {
        // File might not exist, which is fine
      }
    }

    // Process source files for any remaining references
    log('📁 Processing source files...', 'yellow');
    this.processDirectory('./src');

    // Generate report
    const report = this.generateReport();

    log('=' .repeat(50), 'blue');
    
    if (report.success) {
      log('🎉 Bun migration completed successfully!', 'green');
      log(`📊 Made ${report.totalChanges} changes`, 'green');
    } else {
      log('❌ Bun migration completed with errors', 'red');
      log(`📊 Made ${report.totalChanges} changes, ${report.totalErrors} errors`, 'red');
    }

    log('\\n📋 Migration report saved to BUN_MIGRATION_REPORT.md', 'blue');
    
    log('\\n🔧 Next steps:', 'yellow');
    log('1. Run: bun install', 'yellow');
    log('2. Run: bun run lint', 'yellow');
    log('3. Run: bun run type-check', 'yellow');
    log('4. Run: bun run test', 'yellow');
    log('5. Run: bun run build', 'yellow');

    return report.success;
  }
}

// Run migration if this script is executed directly
if (import.meta.main) {
  const migrator = new BunMigrator();
  const success = await migrator.run();
  process.exit(success ? 0 : 1);
}

export default BunMigrator;