/**
 * Legacy Code Cleanup and Modernization System
 * Entry point for all legacy code management functionality
 */

export { legacyCodeAuditor, scanLegacyCode, generateMigrationReport, createMigrationScripts as createLegacyMigrationScripts } from './legacy-code-audit';
export { componentConsolidator, analyzeDuplicates, createConsolidationPlan, generateMigrationScripts as createConsolidationMigrationScripts } from './component-consolidation';
export { codebaseModernizer, generateModernizationPlan, createMigrationScripts as createModernizationMigrationScripts } from './codebase-modernization';

import { legacyCodeAuditor } from './legacy-code-audit';
import { componentConsolidator } from './component-consolidation';
import { codebaseModernizer } from './codebase-modernization';

export interface LegacyCleanupReport {
  auditReport: Awaited<ReturnType<typeof legacyCodeAuditor.generateMigrationReport>>;
  consolidationReport: ReturnType<typeof componentConsolidator.analyzeDuplicates>;
  modernizationPlan: ReturnType<typeof codebaseModernizer.generateModernizationPlan>;
  summary: {
    totalIssues: number;
    estimatedEffort: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    timeline: string;
  };
}

export class LegacyCleanupSystem {
  private static instance: LegacyCleanupSystem;

  public static getInstance(): LegacyCleanupSystem {
    if (!LegacyCleanupSystem.instance) {
      LegacyCleanupSystem.instance = new LegacyCleanupSystem();
    }
    return LegacyCleanupSystem.instance;
  }

  /**
   * Run complete legacy code cleanup analysis
   */
  public async runCompleteAnalysis(): Promise<LegacyCleanupReport> {
    const [auditReport, consolidationReport, modernizationPlan] = await Promise.all([
      legacyCodeAuditor.generateMigrationReport(),
      Promise.resolve(componentConsolidator.analyzeDuplicates()),
      Promise.resolve(codebaseModernizer.generateModernizationPlan())
    ]);

    const totalIssues = 
      auditReport.inventory.summary.totalIssues +
      consolidationReport.totalDuplicates +
      modernizationPlan.targets.length;

    const estimatedEffort = this.calculateTotalEffort(
      auditReport.inventory.summary,
      consolidationReport,
      modernizationPlan
    );

    const priority = this.determinePriority(
      auditReport.inventory.summary,
      consolidationReport,
      modernizationPlan
    );

    const timeline = this.generateTimeline(
      auditReport.inventory.summary,
      consolidationReport,
      modernizationPlan
    );

    return {
      auditReport,
      consolidationReport,
      modernizationPlan,
      summary: {
        totalIssues,
        estimatedEffort,
        priority,
        timeline
      }
    };
  }

  /**
   * Calculate total effort required
   */
  private calculateTotalEffort(
    auditSummary: { criticalIssues: number; highIssues: number; mediumIssues: number; lowIssues: number },
    consolidationReport: { consolidationPlans: Array<{ estimatedEffort: 'small' | 'medium' | 'large' | 'extra-large' }> },
    modernizationPlan: { targets: Array<{ estimatedEffort: 'small' | 'medium' | 'large' | 'extra-large' }> }
  ): string {
    const effortMap: Record<'small' | 'medium' | 'large' | 'extra-large', number> = {
      'small': 1,
      'medium': 3,
      'large': 8,
      'extra-large': 20
    };

    let totalPoints = 0;

    // Audit effort
    totalPoints += auditSummary.criticalIssues * 8;
    totalPoints += auditSummary.highIssues * 5;
    totalPoints += auditSummary.mediumIssues * 3;
    totalPoints += auditSummary.lowIssues * 1;

    // Consolidation effort
    consolidationReport.consolidationPlans.forEach(plan => {
      totalPoints += effortMap[plan.estimatedEffort];
    });

    // Modernization effort
    modernizationPlan.targets.forEach(target => {
      totalPoints += effortMap[target.estimatedEffort];
    });

    if (totalPoints <= 20) return '1-2 weeks';
    if (totalPoints <= 50) return '1-2 months';
    if (totalPoints <= 100) return '2-4 months';
    return '4-6 months';
  }

  /**
   * Determine overall priority
   */
  private determinePriority(
    auditSummary: { criticalIssues: number; highIssues: number },
    consolidationReport: { totalDuplicates: number },
    modernizationPlan: { targets: Array<{ priority: string }> }
  ): 'low' | 'medium' | 'high' | 'critical' {
    if (auditSummary.criticalIssues > 0) return 'critical';
    if (auditSummary.highIssues > 5) return 'high';
    if (consolidationReport.totalDuplicates > 3) return 'high';
    if (modernizationPlan.targets.some((t: { priority: string }) => t.priority === 'critical')) return 'critical';
    if (modernizationPlan.targets.some((t: { priority: string }) => t.priority === 'high')) return 'high';
    return 'medium';
  }

  /**
   * Generate timeline
   */
  private generateTimeline(
    auditSummary: { criticalIssues: number; highIssues: number; mediumIssues: number; lowIssues: number },
    consolidationReport: { consolidationPlans: Array<{ estimatedEffort: string }> },
    modernizationPlan: { targets: Array<{ estimatedEffort: string }> }
  ): string {
    const phases = [
      'Week 1-2: Critical security and bug fixes',
      'Week 3-4: High-priority modernization',
      'Month 2: Component consolidation',
      'Month 3: Build tool modernization',
      'Month 4: Testing framework updates',
      'Month 5-6: Final validation and polish'
    ];

    return phases.join('\n');
  }

  /**
   * Execute cleanup phase
   */
  public async executeCleanupPhase(phase: string): Promise<{
    success: boolean;
    issues: string[];
    nextPhase?: string;
  }> {
    const phases = {
      'audit': async () => {
        const report = await legacyCodeAuditor.scanCodebase();
        return {
          success: true,
          issues: [],
          nextPhase: 'consolidation'
        };
      },
      'consolidation': async () => {
        const report = componentConsolidator.analyzeDuplicates();
        return {
          success: true,
          issues: [],
          nextPhase: 'modernization'
        };
      },
      'modernization': async () => {
        const plan = codebaseModernizer.generateModernizationPlan();
        return {
          success: true,
          issues: [],
          nextPhase: 'validation'
        };
      },
      'validation': async () => {
        const validation = await codebaseModernizer.validateModernization();
        return {
          success: validation.isValid,
          issues: validation.issues
        };
      }
    };

    const executor = phases[phase as keyof typeof phases];
    if (!executor) {
      return {
        success: false,
        issues: [`Unknown phase: ${phase}`]
      };
    }

    return executor();
  }

  /**
   * Generate migration guide
   */
  public generateMigrationGuide(): string {
    return `
# Legacy Code Migration Guide

## Overview
This guide provides step-by-step instructions for modernizing the codebase.

## Pre-Migration Checklist
- [ ] Backup current codebase
- [ ] Create feature branch for migration
- [ ] Update team on migration timeline
- [ ] Prepare rollback plan

## Migration Phases

### Phase 1: Audit and Analysis
1. Run legacy code audit
2. Identify duplicate components
3. Create modernization plan
4. Estimate effort and timeline

### Phase 2: Critical Fixes
1. Fix security vulnerabilities
2. Address critical bugs
3. Update deprecated APIs
4. Validate fixes

### Phase 3: Component Consolidation
1. Analyze duplicate implementations
2. Create unified components
3. Update imports and usage
4. Remove deprecated components

### Phase 4: Modernization
1. Update React to v19
2. Enable TypeScript strict mode
3. Update build tools
4. Update testing framework

### Phase 5: Validation
1. Run all tests
2. Performance testing
3. Accessibility testing
4. Cross-browser testing

## Rollback Plan
- Git revert to previous commit
- Restore package.json
- Revert configuration files
- Notify team of rollback

## Success Criteria
- All tests pass
- Build succeeds
- No runtime errors
- Performance maintained
- Bundle size optimized
- Team trained on changes
`;
  }
}

// Export singleton instance
export const legacyCleanupSystem = LegacyCleanupSystem.getInstance();

// Convenience functions
export const runCompleteAnalysis = async () => {
  return legacyCleanupSystem.runCompleteAnalysis();
};

export const executeCleanupPhase = async (phase: string) => {
  return legacyCleanupSystem.executeCleanupPhase(phase);
};

export const generateMigrationGuide = () => {
  return legacyCleanupSystem.generateMigrationGuide();
};