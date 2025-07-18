#!/usr/bin/env node

/**
 * LiqUIdify Migration Codemod
 *
 * Automated migration system for upgrading between LiqUIdify versions
 * - AST-based code transformations
 * - Prop renaming and deprecation handling
 * - Import path updates
 * - Breaking change migrations
 * - Automated testing of migrations
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

// Migration configuration for different versions
const MIGRATION_CONFIGS = {
  '0.9.0-to-1.0.0': {
    description: 'Major release with breaking changes',
    breaking: true,
    changes: [
      {
        type: 'import-path',
        from: 'liquidify',
        to: 'liquidify/core',
        components: ['GlassButton', 'GlassCard', 'GlassInput']
      },
      {
        type: 'prop-rename',
        component: 'GlassButton',
        from: 'theme',
        to: 'variant'
      },
      {
        type: 'prop-rename',
        component: 'GlassCard',
        from: 'size',
        to: 'scale'
      },
      {
        type: 'prop-add',
        component: '*',
        prop: 'glassMorphism',
        defaultValue: 60
      },
      {
        type: 'prop-remove',
        component: 'GlassModal',
        prop: 'backdrop',
        replacement: 'Use glassMorphism prop instead'
      }
    ]
  },
  '1.0.0-to-1.1.0': {
    description: 'Minor release with new features',
    breaking: false,
    changes: [
      {
        type: 'prop-add',
        component: 'GlassButton',
        prop: 'animation',
        defaultValue: true
      },
      {
        type: 'import-path',
        from: 'liquidify/animations',
        to: 'liquidify/physics',
        components: ['useSpringAnimation']
      }
    ]
  },
  '1.1.0-to-1.2.0': {
    description: 'Performance improvements and accessibility enhancements',
    breaking: false,
    changes: [
      {
        type: 'prop-deprecate',
        component: 'GlassInput',
        prop: 'autoFocus',
        replacement: 'Use ref with focus() method'
      },
      {
        type: 'component-rename',
        from: 'GlassNavigation',
        to: 'GlassNav'
      }
    ]
  }
};

class LiqUIdifyMigrationCoder {
  constructor(sourceDir, targetVersion, options = {}) {
    this.sourceDir = sourceDir;
    this.targetVersion = targetVersion;
    this.options = {
      dryRun: false,
      verbose: false,
      backup: true,
      skipTests: false,
      ...options
    };

    this.migratedFiles = [];
    this.errors = [];
    this.warnings = [];
    this.stats = {
      filesProcessed: 0,
      componentsUpdated: 0,
      propsChanged: 0,
      importsUpdated: 0
    };
  }

  /**
   * Run migration for the specified version range
   */
  async migrate(fromVersion, toVersion) {
    const migrationKey = `${fromVersion}-to-${toVersion}`;
    const config = MIGRATION_CONFIGS[migrationKey];

    if (!config) {
      throw new Error(`No migration configuration found for ${fromVersion} → ${toVersion}`);
    }

    this.log(`🚀 Starting LiqUIdify migration: ${fromVersion} → ${toVersion}`, 'info');
    this.log(`📋 ${config.description}`, 'info');

    if (config.breaking) {
      this.log('⚠️ This is a BREAKING CHANGE migration', 'warn');
      if (!this.options.force) {
        this.log('Use --force flag to proceed with breaking changes', 'error');
        process.exit(1);
      }
    }

    try {
      // Create backup if enabled
      if (this.options.backup && !this.options.dryRun) {
        await this.createBackup();
      }

      // Find all React/TypeScript files
      const files = await this.findSourceFiles();
      this.log(`📁 Found ${files.length} files to process`, 'info');

      // Process each file
      for (const file of files) {
        await this.processFile(file, config.changes);
      }

      // Generate migration report
      await this.generateMigrationReport(fromVersion, toVersion, config);

      // Run tests if not skipped
      if (!this.options.skipTests && !this.options.dryRun) {
        await this.runTests();
      }

      this.log('✅ Migration completed successfully!', 'success');
      this.printSummary();

    } catch (error) {
      this.log(`❌ Migration failed: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Find all source files that need migration
   */
  async findSourceFiles() {
    const extensions = ['.tsx', '.ts', '.jsx', '.js'];
    const files = [];

    const walk = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          // Skip node_modules and other irrelevant directories
          if (!['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
            await walk(fullPath);
          }
        } else if (extensions.some(ext => entry.name.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    };

    await walk(this.sourceDir);
    return files;
  }

  /**
   * Process a single file with the given transformations
   */
  async processFile(filePath, changes) {
    try {
      this.log(`🔧 Processing ${path.relative(this.sourceDir, filePath)}`, 'debug');

      const source = await fs.readFile(filePath, 'utf8');
      const transformed = await this.transformCode(source, changes, filePath);

      if (transformed.code !== source) {
        this.stats.filesProcessed++;

        if (!this.options.dryRun) {
          await fs.writeFile(filePath, transformed.code);
        }

        this.migratedFiles.push({
          path: filePath,
          changes: transformed.changes,
          warnings: transformed.warnings
        });

        this.log(`✅ Updated ${path.relative(this.sourceDir, filePath)}`, 'success');
      }

    } catch (error) {
      this.errors.push({
        file: filePath,
        error: error.message
      });
      this.log(`❌ Error processing ${filePath}: ${error.message}`, 'error');
    }
  }

  /**
   * Transform code using Babel AST
   */
  async transformCode(source, changes, filePath) {
    const appliedChanges = [];
    const warnings = [];

    const result = await babel.transformAsync(source, {
      filename: filePath,
      parserOpts: {
        sourceType: 'module',
        allowImportExportEverywhere: true,
        plugins: [
          'jsx',
          'typescript',
          'decorators-legacy',
          'classProperties',
          'objectRestSpread'
        ]
      },
      plugins: [
        () => ({
          visitor: {
            // Transform import statements
            ImportDeclaration: (path) => {
              const importChanges = changes.filter(c => c.type === 'import-path');

              for (const change of importChanges) {
                if (path.node.source.value === change.from) {
                  const specifiers = path.node.specifiers
                    .filter(spec => t.isImportSpecifier(spec))
                    .map(spec => spec.imported.name);

                  const affectedComponents = specifiers.filter(name =>
                    change.components.includes(name)
                  );

                  if (affectedComponents.length > 0) {
                    path.node.source.value = change.to;
                    appliedChanges.push({
                      type: 'import-path',
                      from: change.from,
                      to: change.to,
                      components: affectedComponents
                    });
                    this.stats.importsUpdated++;
                  }
                }
              }
            },

            // Transform JSX elements
            JSXElement: (path) => {
              const elementName = path.node.openingElement.name.name;
              this.transformJSXElement(path, elementName, changes, appliedChanges, warnings);
            },

            // Transform JSX self-closing elements
            JSXSelfClosingElement: (path) => {
              const elementName = path.node.name.name;
              this.transformJSXElement(path, elementName, changes, appliedChanges, warnings);
            }
          }
        })
      ]
    });

    return {
      code: result.code,
      changes: appliedChanges,
      warnings
    };
  }

  /**
   * Transform JSX element with prop changes
   */
  transformJSXElement(path, elementName, changes, appliedChanges, warnings) {
    const relevantChanges = changes.filter(c =>
      c.component === elementName || c.component === '*'
    );

    for (const change of relevantChanges) {
      switch (change.type) {
        case 'prop-rename':
          this.renameProp(path, change, appliedChanges);
          break;

        case 'prop-add':
          this.addProp(path, change, appliedChanges);
          break;

        case 'prop-remove':
          this.removeProp(path, change, appliedChanges, warnings);
          break;

        case 'prop-deprecate':
          this.deprecateProp(path, change, warnings);
          break;

        case 'component-rename':
          this.renameComponent(path, change, appliedChanges);
          break;
      }
    }
  }

  /**
   * Rename a prop in JSX element
   */
  renameProp(path, change, appliedChanges) {
    const attributes = path.node.openingElement ?
      path.node.openingElement.attributes :
      path.node.attributes;

    const attr = attributes.find(attr =>
      t.isJSXAttribute(attr) && attr.name.name === change.from
    );

    if (attr) {
      attr.name.name = change.to;
      appliedChanges.push({
        type: 'prop-rename',
        component: change.component,
        from: change.from,
        to: change.to
      });
      this.stats.propsChanged++;
    }
  }

  /**
   * Add a new prop with default value
   */
  addProp(path, change, appliedChanges) {
    const attributes = path.node.openingElement ?
      path.node.openingElement.attributes :
      path.node.attributes;

    // Check if prop already exists
    const existingAttr = attributes.find(attr =>
      t.isJSXAttribute(attr) && attr.name.name === change.prop
    );

    if (!existingAttr) {
      const newAttr = t.jsxAttribute(
        t.jsxIdentifier(change.prop),
        t.jsxExpressionContainer(
          typeof change.defaultValue === 'string'
            ? t.stringLiteral(change.defaultValue)
            : t.numericLiteral(change.defaultValue)
        )
      );

      attributes.push(newAttr);
      appliedChanges.push({
        type: 'prop-add',
        component: change.component,
        prop: change.prop,
        defaultValue: change.defaultValue
      });
      this.stats.propsChanged++;
    }
  }

  /**
   * Remove a deprecated prop
   */
  removeProp(path, change, appliedChanges, warnings) {
    const attributes = path.node.openingElement ?
      path.node.openingElement.attributes :
      path.node.attributes;

    const attrIndex = attributes.findIndex(attr =>
      t.isJSXAttribute(attr) && attr.name.name === change.prop
    );

    if (attrIndex !== -1) {
      attributes.splice(attrIndex, 1);
      appliedChanges.push({
        type: 'prop-remove',
        component: change.component,
        prop: change.prop
      });
      warnings.push({
        type: 'prop-removed',
        message: `Removed deprecated prop '${change.prop}'. ${change.replacement}`
      });
      this.stats.propsChanged++;
    }
  }

  /**
   * Mark a prop as deprecated
   */
  deprecateProp(path, change, warnings) {
    const attributes = path.node.openingElement ?
      path.node.openingElement.attributes :
      path.node.attributes;

    const attr = attributes.find(attr =>
      t.isJSXAttribute(attr) && attr.name.name === change.prop
    );

    if (attr) {
      warnings.push({
        type: 'prop-deprecated',
        message: `Prop '${change.prop}' is deprecated. ${change.replacement}`
      });
    }
  }

  /**
   * Rename a component
   */
  renameComponent(path, change, appliedChanges) {
    const elementName = path.node.openingElement ?
      path.node.openingElement.name.name :
      path.node.name.name;

    if (elementName === change.from) {
      if (path.node.openingElement) {
        path.node.openingElement.name.name = change.to;
        if (path.node.closingElement) {
          path.node.closingElement.name.name = change.to;
        }
      } else {
        path.node.name.name = change.to;
      }

      appliedChanges.push({
        type: 'component-rename',
        from: change.from,
        to: change.to
      });
      this.stats.componentsUpdated++;
    }
  }

  /**
   * Create backup of source directory
   */
  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = `${this.sourceDir}_backup_${timestamp}`;

    this.log(`💾 Creating backup at ${backupDir}`, 'info');

    try {
      execSync(`cp -r "${this.sourceDir}" "${backupDir}"`);
      this.log(`✅ Backup created successfully`, 'success');
    } catch (error) {
      throw new Error(`Failed to create backup: ${error.message}`);
    }
  }

  /**
   * Generate migration report
   */
  async generateMigrationReport(fromVersion, toVersion, config) {
    const report = {
      migration: {
        from: fromVersion,
        to: toVersion,
        description: config.description,
        breaking: config.breaking,
        timestamp: new Date().toISOString()
      },
      statistics: this.stats,
      migratedFiles: this.migratedFiles.map(file => ({
        path: path.relative(this.sourceDir, file.path),
        changesCount: file.changes.length,
        warningsCount: file.warnings.length
      })),
      errors: this.errors,
      warnings: this.warnings.concat(
        this.migratedFiles.flatMap(f => f.warnings)
      )
    };

    const reportPath = path.join(this.sourceDir, `migration-report-${fromVersion}-to-${toVersion}.json`);

    if (!this.options.dryRun) {
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      this.log(`📊 Migration report saved to ${reportPath}`, 'info');
    }

    // Generate human-readable report
    const markdownReport = this.generateMarkdownReport(report);
    const markdownPath = path.join(this.sourceDir, `MIGRATION-${fromVersion}-to-${toVersion}.md`);

    if (!this.options.dryRun) {
      await fs.writeFile(markdownPath, markdownReport);
      this.log(`📄 Markdown report saved to ${markdownPath}`, 'info');
    }
  }

  /**
   * Generate markdown migration report
   */
  generateMarkdownReport(report) {
    return `# LiqUIdify Migration Report

**From**: ${report.migration.from}
**To**: ${report.migration.to}
**Date**: ${new Date(report.migration.timestamp).toLocaleString()}
**Breaking Changes**: ${report.migration.breaking ? 'Yes' : 'No'}

## Description

${report.migration.description}

## Statistics

- **Files Processed**: ${report.statistics.filesProcessed}
- **Components Updated**: ${report.statistics.componentsUpdated}
- **Props Changed**: ${report.statistics.propsChanged}
- **Imports Updated**: ${report.statistics.importsUpdated}

## Migrated Files

${report.migratedFiles.length === 0 ? 'No files were migrated.' : ''}
${report.migratedFiles.map(file =>
  `- \`${file.path}\` (${file.changesCount} changes, ${file.warningsCount} warnings)`
).join('\n')}

## Warnings

${report.warnings.length === 0 ? 'No warnings.' : ''}
${report.warnings.map(warning =>
  `- ${warning.message || warning.type}`
).join('\n')}

## Errors

${report.errors.length === 0 ? 'No errors.' : ''}
${report.errors.map(error =>
  `- **${error.file}**: ${error.error}`
).join('\n')}

## Next Steps

${report.migration.breaking ? `
⚠️ **Breaking Changes Applied**

Please review all changes carefully and test your application thoroughly.

### Manual Steps Required:

1. Update your test files to match new component APIs
2. Review and update any custom styling that may be affected
3. Check documentation for additional migration notes
4. Run your test suite to ensure everything works correctly

### Common Issues:

- Props that were removed may need manual replacement
- Import paths may need adjustment in test files
- Type definitions may need updates if using TypeScript
` : `
✅ **Non-Breaking Migration**

The migration should be backward compatible, but please test your application to ensure everything works as expected.
`}

## Getting Help

If you encounter any issues with this migration:

1. Check the [LiqUIdify Migration Guide](https://liquidify.dev/docs/migration)
2. Search existing [GitHub Issues](https://github.com/tuliopc23/LiqUIdify/issues)
3. Create a new issue with the migration report attached

---
*Generated by LiqUIdify Migration Codemod v${this.targetVersion}*
`;
  }

  /**
   * Run tests after migration
   */
  async runTests() {
    this.log('🧪 Running tests after migration...', 'info');

    try {
      execSync('npm test', {
        cwd: this.sourceDir,
        stdio: this.options.verbose ? 'inherit' : 'pipe'
      });
      this.log('✅ All tests passed!', 'success');
    } catch (error) {
      this.log('❌ Some tests failed. Please review the changes.', 'warn');
      if (this.options.verbose) {
        this.log(error.stdout?.toString() || error.message, 'debug');
      }
    }
  }

  /**
   * Print migration summary
   */
  printSummary() {
    this.log('\n📊 Migration Summary:', 'info');
    this.log(`   Files processed: ${this.stats.filesProcessed}`, 'info');
    this.log(`   Components updated: ${this.stats.componentsUpdated}`, 'info');
    this.log(`   Props changed: ${this.stats.propsChanged}`, 'info');
    this.log(`   Imports updated: ${this.stats.importsUpdated}`, 'info');
    this.log(`   Errors: ${this.errors.length}`, this.errors.length > 0 ? 'error' : 'info');
    this.log(`   Warnings: ${this.warnings.length}`, this.warnings.length > 0 ? 'warn' : 'info');

    if (this.options.dryRun) {
      this.log('\n🔍 This was a dry run. No files were actually modified.', 'info');
    }
  }

  /**
   * Logging utility
   */
  log(message, level = 'info') {
    const colors = {
      info: '\x1b[36m',    // cyan
      warn: '\x1b[33m',    // yellow
      error: '\x1b[31m',   // red
      success: '\x1b[32m', // green
      debug: '\x1b[90m',   // gray
      reset: '\x1b[0m'
    };

    if (level === 'debug' && !this.options.verbose) {
      return;
    }

    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.log(`${colors[level]}[${timestamp}] ${message}${colors.reset}`);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log(`
Usage: node migration-codemod.js <source-dir> <from-version> <to-version> [options]

Options:
  --dry-run        Show what would be changed without making changes
  --verbose        Show detailed output
  --no-backup      Skip creating backup
  --skip-tests     Skip running tests after migration
  --force          Proceed with breaking changes

Examples:
  node migration-codemod.js ./src 0.9.0 1.0.0
  node migration-codemod.js ./src 1.0.0 1.1.0 --dry-run
  node migration-codemod.js ./src 0.9.0 1.0.0 --force --verbose
`);
    process.exit(1);
  }

  const [sourceDir, fromVersion, toVersion, ...flags] = args;

  const options = {
    dryRun: flags.includes('--dry-run'),
    verbose: flags.includes('--verbose'),
    backup: !flags.includes('--no-backup'),
    skipTests: flags.includes('--skip-tests'),
    force: flags.includes('--force')
  };

  try {
    const migrator = new LiqUIdifyMigrationCoder(sourceDir, toVersion, options);
    await migrator.migrate(fromVersion, toVersion);
  } catch (error) {
    console.error(`\n❌ Migration failed: ${error.message}`);
    process.exit(1);
  }
}

// Export for programmatic use
module.exports = {
  LiqUIdifyMigrationCoder,
  MIGRATION_CONFIGS
};

// Run CLI if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}
