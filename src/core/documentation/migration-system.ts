/**
 * LiqUIdify Migration System
 *
 * S-Tier Automated Migration and Codemod System
 * - Version migration guides
 * - Automated code transformations
 * - Breaking change detection
 * - Migration validation
 * - Rollback capabilities
 */

// Note: jscodeshift is an optional dependency for advanced codemods
// import { transform } from 'jscodeshift';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

// Migration configuration
export interface MigrationConfig {
  fromVersion: string;
  toVersion: string;
  description: string;
  breakingChanges: BreakingChange[];
  codemods: Codemod[];
  validationRules: ValidationRule[];
  rollbackSupported: boolean;
}

export interface BreakingChange {
  type:
    | 'prop-rename'
    | 'prop-remove'
    | 'component-rename'
    | 'import-change'
    | 'api-change';
  component?: string;
  oldName: string;
  newName?: string;
  reason: string;
  migrationPath: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Codemod {
  name: string;
  description: string;
  transform: (source: string) => string;
  filePattern: string[];
  runCondition?: (source: string) => boolean;
}

export interface ValidationRule {
  name: string;
  check: (source: string) => {
    passed: boolean;
    message: string;
    suggestions?: string[];
  };
}

export interface MigrationReport {
  success: boolean;
  filesModified: string[];
  errors: MigrationError[];
  warnings: MigrationWarning[];
  summary: {
    componentsUpdated: number;
    propsRenamed: number;
    importsUpdated: number;
    estimatedTimeToComplete: string;
  };
}

export interface MigrationError {
  file: string;
  line?: number;
  column?: number;
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

export interface MigrationWarning {
  file: string;
  message: string;
  autoFixable: boolean;
}

// Pre-defined migrations for LiqUIdify versions
const LIQUIDIFY_MIGRATIONS: Record<string, MigrationConfig> = {
  '1.0.0->1.1.0': {
    fromVersion: '1.0.0',
    toVersion: '1.1.0',
    description:
      'Migration to enhanced glassmorphism API with performance optimizations',
    breakingChanges: [
      {
        type: 'prop-rename',
        component: 'GlassButton',
        oldName: 'glassEffect',
        newName: 'glassMorphism',
        reason: 'Standardized naming convention across all components',
        migrationPath: 'Replace glassEffect prop with glassMorphism',
        severity: 'medium',
      },
      {
        type: 'import-change',
        oldName: 'liquidify/glass',
        newName: 'liquidify/core',
        reason: 'Consolidated imports for better tree-shaking',
        migrationPath: 'Update import statements to use liquidify/core',
        severity: 'low',
      },
    ],
    codemods: [
      {
        name: 'glass-effect-to-glass-morphism',
        description: 'Rename glassEffect prop to glassMorphism',
        filePattern: ['**/*.tsx', '**/*.jsx'],
        transform: (source: string) => {
          return source.replace(/glassEffect=/g, 'glassMorphism=');
        },
      },
      {
        name: 'update-imports',
        description: 'Update import statements to use new paths',
        filePattern: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        transform: (source: string) => {
          return source.replace(
            /from ['"]liquidify\/glass['"]/g,
            'from "liquidify/core"'
          );
        },
      },
    ],
    validationRules: [
      {
        name: 'no-deprecated-props',
        check: (source: string) => {
          const hasDeprecatedProps = /glassEffect=/.test(source);
          return {
            passed: !hasDeprecatedProps,
            message: hasDeprecatedProps
              ? 'File contains deprecated glassEffect prop'
              : 'No deprecated props found',
            suggestions: hasDeprecatedProps
              ? ['Run the glass-effect-to-glass-morphism codemod']
              : null,
          };
        },
      },
    ],
    rollbackSupported: true,
  },

  '1.1.0->2.0.0': {
    fromVersion: '1.1.0',
    toVersion: '2.0.0',
    description:
      'Major version upgrade with new animation system and TypeScript improvements',
    breakingChanges: [
      {
        type: 'component-rename',
        oldName: 'GlassContainer',
        newName: 'GlassPanel',
        reason: 'Better semantic naming and consistency',
        migrationPath: 'Replace all GlassContainer components with GlassPanel',
        severity: 'high',
      },
      {
        type: 'api-change',
        oldName: 'useGlassEffect',
        newName: 'useGlassMorphism',
        reason: 'New hook API with better performance and TypeScript support',
        migrationPath: 'Update hook usage and parameters',
        severity: 'critical',
      },
      {
        type: 'prop-remove',
        component: 'GlassButton',
        oldName: 'legacy',
        reason: 'Legacy support removed for better bundle size',
        migrationPath: 'Remove legacy prop and update component usage',
        severity: 'medium',
      },
    ],
    codemods: [
      {
        name: 'glass-container-to-glass-panel',
        description: 'Rename GlassContainer to GlassPanel',
        filePattern: ['**/*.tsx', '**/*.jsx'],
        transform: (source: string) => {
          return source
            .replace(/GlassContainer/g, 'GlassPanel')
            .replace(/glass-container/g, 'glass-panel');
        },
      },
      {
        name: 'update-glass-hook',
        description: 'Update useGlassEffect to useGlassMorphism',
        filePattern: ['**/*.ts', '**/*.tsx'],
        transform: (source: string) => {
          return source
            .replace(/useGlassEffect/g, 'useGlassMorphism')
            .replace(/glassEffect\s*:/g, 'glassMorphism:');
        },
      },
      {
        name: 'remove-legacy-props',
        description: 'Remove deprecated legacy props',
        filePattern: ['**/*.tsx', '**/*.jsx'],
        transform: (source: string) => {
          // Remove legacy prop from component props
          return source
            .replace(/\s*legacy={[^}]*}\s*/g, ' ')
            .replace(/\s*legacy\s*/g, ' ');
        },
      },
    ],
    validationRules: [
      {
        name: 'no-glass-container',
        check: (source: string) => {
          const hasGlassContainer = /GlassContainer/.test(source);
          return {
            passed: !hasGlassContainer,
            message: hasGlassContainer
              ? 'File contains deprecated GlassContainer component'
              : 'No deprecated components found',
            suggestions: hasGlassContainer
              ? ['Run the glass-container-to-glass-panel codemod']
              : null,
          };
        },
      },
      {
        name: 'no-legacy-hooks',
        check: (source: string) => {
          const hasLegacyHooks = /useGlassEffect/.test(source);
          return {
            passed: !hasLegacyHooks,
            message: hasLegacyHooks
              ? 'File contains deprecated useGlassEffect hook'
              : 'No deprecated hooks found',
            suggestions: hasLegacyHooks
              ? ['Run the update-glass-hook codemod']
              : null,
          };
        },
      },
    ],
    rollbackSupported: false,
  },
};

export class LiqUIdifyMigrationSystem {
  private migrations: Map<string, MigrationConfig> = new Map();
  private backupDir: string = '.liquidify-migration-backup';

  constructor() {
    // Load pre-defined migrations
    Object.entries(LIQUIDIFY_MIGRATIONS).forEach(([key, config]) => {
      this.migrations.set(key, config);
    });
  }

  /**
   * Register a custom migration
   */
  public registerMigration(key: string, config: MigrationConfig): void {
    this.migrations.set(key, config);
  }

  /**
   * Get available migrations for a version range
   */
  public getAvailableMigrations(
    fromVersion: string,
    toVersion: string
  ): MigrationConfig[] {
    const available: MigrationConfig[] = [];

    for (const [, config] of this.migrations) {
      if (
        this.isVersionInRange(
          config.fromVersion,
          config.toVersion,
          fromVersion,
          toVersion
        )
      ) {
        available.push(config);
      }
    }

    return available.sort((a, b) =>
      this.compareVersions(a.fromVersion, b.fromVersion)
    );
  }

  /**
   * Generate migration guide for version upgrade
   */
  public generateMigrationGuide(
    fromVersion: string,
    toVersion: string
  ): string {
    const migrations = this.getAvailableMigrations(fromVersion, toVersion);

    if (0 === migrations.length) {
      return `# Migration Guide: ${fromVersion} → ${toVersion}\n\nNo breaking changes detected. Update your dependencies and you should be good to go!`;
    }

    let guide = `# LiqUIdify Migration Guide: ${fromVersion} → ${toVersion}\n\n`;
    guide += `This guide will help you migrate your LiqUIdify components to version ${toVersion}.\n\n`;

    // Table of contents
    guide += `## Table of Contents\n\n`;
    migrations.forEach((migration, index) => {
      guide += `${index + 1}. [${migration.fromVersion} → ${migration.toVersion}](#migration-${migration.fromVersion.replace(/\./g, '')}-to-${migration.toVersion.replace(/\./g, '')})\n`;
    });
    guide += `\n`;

    // Migration steps
    migrations.forEach((migration, index) => {
      guide += `## Migration ${index + 1}: ${migration.fromVersion} → ${migration.toVersion}\n\n`;
      guide += `${migration.description}\n\n`;

      if (0 < migration.breakingChanges.length) {
        guide += `### Breaking Changes\n\n`;

        migration.breakingChanges.forEach((change, changeIndex) => {
          guide += `#### ${changeIndex + 1}. ${this.formatBreakingChangeTitle(change)}\n\n`;
          guide += `**Severity:** ${change.severity.toUpperCase()}\n\n`;
          guide += `**Reason:** ${change.reason}\n\n`;
          guide += `**Migration Path:** ${change.migrationPath}\n\n`;

          if (change.component) {
            guide += `**Affected Component:** \`${change.component}\`\n\n`;
          }

          // Add code examples
          guide += this.generateCodeExample(change);
          guide += `\n`;
        });
      }

      // Automated migration section
      guide += `### Automated Migration\n\n`;
      guide += `Run the following command to automatically migrate your code:\n\n`;
      guide += `\`\`\`bash\n`;
      guide += `npx @liquidify/migrate ${migration.fromVersion} ${migration.toVersion}\n`;
      guide += `\`\`\`\n\n`;

      // Manual steps if any
      const manualSteps = this.getManualMigrationSteps(migration);
      if (0 < manualSteps.length) {
        guide += `### Manual Steps Required\n\n`;
        manualSteps.forEach((step, stepIndex) => {
          guide += `${stepIndex + 1}. ${step}\n`;
        });
        guide += `\n`;
      }

      guide += `---\n\n`;
    });

    // Final steps
    guide += `## Final Steps\n\n`;
    guide += `1. **Update Dependencies:** Update your package.json to use LiqUIdify ${toVersion}\n`;
    guide += `2. **Run Tests:** Ensure all your tests pass after migration\n`;
    guide += `3. **Check Performance:** Verify that performance meets your requirements\n`;
    guide += `4. **Update Documentation:** Update any component documentation that references the old API\n\n`;

    // Rollback information
    guide += `## Rollback\n\n`;
    const hasRollbackSupport = migrations.some(m => m.rollbackSupported);
    if (hasRollbackSupport) {
      guide += `Some migrations support automatic rollback. If you need to rollback:\n\n`;
      guide += `\`\`\`bash\n`;
      guide += `npx @liquidify/migrate --rollback ${toVersion} ${fromVersion}\n`;
      guide += `\`\`\`\n\n`;
    } else {
      guide += `⚠️ **Warning:** This migration does not support automatic rollback. Make sure to backup your code before proceeding.\n\n`;
    }

    // Support section
    guide += `## Need Help?\n\n`;
    guide += `- 📖 [Documentation](https://liquidify.dev/docs)\n`;
    guide += `- 💬 [Discord Community](https://discord.gg/liquidify)\n`;
    guide += `- 🐛 [Report Issues](https://github.com/liquidify/liquidify/issues)\n`;
    guide += `- 📧 [Email Support](mailto:support@liquidify.dev)\n\n`;

    return guide;
  }

  /**
   * Run automated migration on a project
   */
  public async runMigration(
    projectPath: string,
    fromVersion: string,
    toVersion: string,
    options: {
      dryRun?: boolean;
      backup?: boolean;
      skipValidation?: boolean;
    } = {}
  ): Promise<MigrationReport> {
    const { dryRun = false, backup = true, skipValidation = false } = options;

    const migrations = this.getAvailableMigrations(fromVersion, toVersion);
    const report: MigrationReport = {
      success: true,
      filesModified: [],
      errors: [],
      warnings: [],
      summary: {
        componentsUpdated: 0,
        propsRenamed: 0,
        importsUpdated: 0,
        estimatedTimeToComplete: '0 minutes',
      },
    };

    try {
      // Create backup if requested
      if (backup && !dryRun) {
        await this.createBackup(projectPath);
      }

      // Run each migration in sequence
      for (const migration of migrations) {
        await this.runSingleMigration(projectPath, migration, report, dryRun);
      }

      // Run validation unless skipped
      if (!skipValidation) {
        await this.validateMigration(projectPath, migrations, report);
      }

      // Calculate summary
      this.calculateMigrationSummary(report);
    } catch (error) {
      report.success = false;
      report.errors.push({
        file: 'system',
        message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        severity: 'error',
      });
    }

    return report;
  }

  /**
   * Rollback a migration
   */
  public async rollbackMigration(
    projectPath: string,
    _fromVersion: string,
    _toVersion: string
  ): Promise<MigrationReport> {
    const backupPath = path.join(projectPath, this.backupDir);

    try {
      // Check if backup exists
      const backupExists = await fs
        .access(backupPath)
        .then(() => true)
        .catch(() => false);

      if (!backupExists) {
        throw new Error(
          'No backup found for rollback. Manual rollback required.'
        );
      }

      // Restore from backup
      await this.restoreFromBackup(projectPath);

      return {
        success: true,
        filesModified: [],
        errors: [],
        warnings: [
          {
            file: 'system',
            message: 'Project restored from backup',
            autoFixable: false,
          },
        ],
        summary: {
          componentsUpdated: 0,
          propsRenamed: 0,
          importsUpdated: 0,
          estimatedTimeToComplete: '0 minutes',
        },
      };
    } catch (error) {
      return {
        success: false,
        filesModified: [],
        errors: [
          {
            file: 'system',
            message: `Rollback failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            severity: 'error',
          },
        ],
        warnings: [],
        summary: {
          componentsUpdated: 0,
          propsRenamed: 0,
          importsUpdated: 0,
          estimatedTimeToComplete: '0 minutes',
        },
      };
    }
  }

  // Private helper methods

  private async runSingleMigration(
    projectPath: string,
    migration: MigrationConfig,
    report: MigrationReport,
    dryRun: boolean
  ): Promise<void> {
    for (const codemod of migration.codemods) {
      const files = await this.findFiles(projectPath, codemod.filePattern);

      for (const filePath of files) {
        try {
          const source = await fs.readFile(filePath, 'utf8');

          // Check run condition if specified
          if (codemod.runCondition && !codemod.runCondition(source)) {
            continue;
          }

          const transformed = codemod.transform(source);

          if (transformed !== source) {
            if (!dryRun) {
              await fs.writeFile(filePath, transformed, 'utf8');
            }

            report.filesModified.push(filePath);

            // Update summary based on codemod type
            if (codemod.name.includes('import')) {
              report.summary.importsUpdated++;
            } else if (codemod.name.includes('prop')) {
              report.summary.propsRenamed++;
            } else {
              report.summary.componentsUpdated++;
            }
          }
        } catch (error) {
          report.errors.push({
            file: filePath,
            message: `Failed to apply codemod ${codemod.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
            severity: 'error',
          });
        }
      }
    }
  }

  private async validateMigration(
    projectPath: string,
    migrations: MigrationConfig[],
    report: MigrationReport
  ): Promise<void> {
    const allValidationRules = migrations.flatMap(m => m.validationRules);
    const files = await this.findFiles(projectPath, [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
    ]);

    for (const filePath of files) {
      try {
        const source = await fs.readFile(filePath, 'utf8');

        for (const rule of allValidationRules) {
          const result = rule.check(source);

          if (!result.passed) {
            report.warnings.push({
              file: filePath,
              message: `${rule.name}: ${result.message}`,
              autoFixable: !!result.suggestions,
            });
          }
        }
      } catch (error) {
        report.errors.push({
          file: filePath,
          message: `Failed to validate: ${error instanceof Error ? error.message : 'Unknown error'}`,
          severity: 'warning',
        });
      }
    }
  }

  private async findFiles(
    basePath: string,
    patterns: string[]
  ): Promise<string[]> {
    // Simple glob implementation - in production, use a proper glob library
    const files: string[] = [];

    const scanDir = async (dir: string): Promise<void> => {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (
          entry.isDirectory() &&
          !entry.name.startsWith('.') &&
          'node_modules' !== entry.name
        ) {
          await scanDir(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (
            patterns.some(pattern => {
              const patternExt = pattern.split('.').pop();
              return '*' === patternExt || ext === `.${patternExt}`;
            })
          ) {
            files.push(fullPath);
          }
        }
      }
    };

    await scanDir(basePath);
    return files;
  }

  private async createBackup(projectPath: string): Promise<void> {
    const backupPath = path.join(projectPath, this.backupDir);

    // Remove existing backup
    try {
      await fs.rm(backupPath, { recursive: true, force: true });
    } catch {
      // Backup doesn't exist, continue
    }

    // Create new backup (simplified - copy source files)
    await fs.mkdir(backupPath, { recursive: true });

    const srcPath = path.join(projectPath, 'src');
    const backupSrcPath = path.join(backupPath, 'src');

    try {
      await this.copyDirectory(srcPath, backupSrcPath);
    } catch {
      // src directory doesn't exist or copy failed
    }
  }

  private async restoreFromBackup(projectPath: string): Promise<void> {
    const backupPath = path.join(projectPath, this.backupDir);
    const backupSrcPath = path.join(backupPath, 'src');
    const srcPath = path.join(projectPath, 'src');

    // Remove current src
    await fs.rm(srcPath, { recursive: true, force: true });

    // Restore from backup
    await this.copyDirectory(backupSrcPath, srcPath);

    // Clean up backup
    await fs.rm(backupPath, { recursive: true, force: true });
  }

  private async copyDirectory(src: string, dest: string): Promise<void> {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await this.copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  private formatBreakingChangeTitle(change: BreakingChange): string {
    switch (change.type) {
      case 'prop-rename':
        return `Prop renamed: \`${change.oldName}\` → \`${change.newName}\``;
      case 'prop-remove':
        return `Prop removed: \`${change.oldName}\``;
      case 'component-rename':
        return `Component renamed: \`${change.oldName}\` → \`${change.newName}\``;
      case 'import-change':
        return `Import path changed: \`${change.oldName}\` → \`${change.newName}\``;
      case 'api-change':
        return `API changed: \`${change.oldName}\` → \`${change.newName}\``;
      default:
        return `Change: ${change.oldName}`;
    }
  }

  private generateCodeExample(change: BreakingChange): string {
    let example = '';

    switch (change.type) {
      case 'prop-rename':
        example = `**Before:**
\`\`\`tsx
<${change.component} ${change.oldName}={value} />
\`\`\`

**After:**
\`\`\`tsx
<${change.component} ${change.newName}={value} />
\`\`\``;
        break;

      case 'component-rename':
        example = `**Before:**
\`\`\`tsx
import { ${change.oldName} } from 'liquidify';

<${change.oldName}>Content</${change.oldName}>
\`\`\`

**After:**
\`\`\`tsx
import { ${change.newName} } from 'liquidify';

<${change.newName}>Content</${change.newName}>
\`\`\``;
        break;

      case 'import-change':
        example = `**Before:**
\`\`\`tsx
import { Component } from '${change.oldName}';
\`\`\`

**After:**
\`\`\`tsx
import { Component } from '${change.newName}';
\`\`\``;
        break;
    }

    return example;
  }

  private getManualMigrationSteps(migration: MigrationConfig): string[] {
    const steps: string[] = [];

    // Add manual steps based on breaking changes that can't be automated
    migration.breakingChanges.forEach(change => {
      if ('critical' === change.severity) {
        steps.push(
          `Review and update ${change.component || 'usage'} for ${change.reason}`
        );
      }
    });

    return steps;
  }

  private calculateMigrationSummary(report: MigrationReport): void {
    const fileCount = report.filesModified.length;
    const errorCount = report.errors.length;

    // Estimate time based on complexity
    let estimatedMinutes = Math.max(1, Math.ceil(fileCount / 10));
    if (0 < errorCount) {
      estimatedMinutes += errorCount * 2; // Add 2 minutes per error for manual fixes
    }

    report.summary.estimatedTimeToComplete =
      1 === estimatedMinutes ? '1 minute' : `${estimatedMinutes} minutes`;
  }

  private isVersionInRange(
    migrationFrom: string,
    migrationTo: string,
    targetFrom: string,
    targetTo: string
  ): boolean {
    return (
      0 <= this.compareVersions(migrationFrom, targetFrom) &&
      0 >= this.compareVersions(migrationTo, targetTo)
    );
  }

  private compareVersions(a: string, b: string): number {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] || 0;
      const bPart = bParts[i] || 0;

      if (aPart !== bPart) {
        return aPart - bPart;
      }
    }

    return 0;
  }
}

// Export singleton instance
export const migrationSystem = new LiqUIdifyMigrationSystem();

// CLI utilities
export function createMigrationCLI() {
  return {
    generateGuide: (from: string, to: string) => {
      return migrationSystem.generateMigrationGuide(from, to);
    },

    runMigration: async (
      projectPath: string,
      from: string,
      to: string,
      options: any
    ) => {
      return await migrationSystem.runMigration(projectPath, from, to, options);
    },

    rollback: async (projectPath: string, from: string, to: string) => {
      return await migrationSystem.rollbackMigration(projectPath, from, to);
    },
  };
}

export default LiqUIdifyMigrationSystem;
