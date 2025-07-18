/**
 * Legacy Code Audit and Documentation System
 * Identifies legacy patterns, technical debt, and modernization opportunities
 */

export interface LegacyCodePattern {
  id: string;
  type:
    | 'deprecated-api'
    | 'duplicate-implementation'
    | 'inconsistent-pattern'
    | 'performance-issue'
    | 'accessibility-issue';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  currentCode: string;
  recommendedFix: string;
  migrationPath: string;
  effortEstimate: 'small' | 'medium' | 'large' | 'extra-large';
  dependencies: string[];
  breakingChanges: boolean;
}

export interface TechnicalDebtInventory {
  patterns: LegacyCodePattern[];
  summary: {
    totalIssues: number;
    criticalIssues: number;
    highIssues: number;
    mediumIssues: number;
    lowIssues: number;
    estimatedEffort: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  categories: Record<string, LegacyCodePattern[]>;
  recommendations: string[];
}

export interface ModernizationOpportunity {
  id: string;
  title: string;
  description: string;
  currentImplementation: string;
  proposedImplementation: string;
  benefits: string[];
  risks: string[];
  effort: 'small' | 'medium' | 'large' | 'extra-large';
  priority: 'high' | 'medium' | 'low';
  dependencies: string[];
}

export class LegacyCodeAuditor {
  private static instance: LegacyCodeAuditor;
  private patterns: LegacyCodePattern[] = [];
  private opportunities: ModernizationOpportunity[] = [];

  private constructor() {
    this.initializeAuditPatterns();
  }

  public static getInstance(): LegacyCodeAuditor {
    if (!LegacyCodeAuditor.instance) {
      LegacyCodeAuditor.instance = new LegacyCodeAuditor();
    }
    return LegacyCodeAuditor.instance;
  }

  private initializeAuditPatterns(): void {
    // Common legacy patterns to look for
    this.patterns = [
      // Deprecated React patterns
      {
        id: 'legacy-class-components',
        type: 'deprecated-api',
        severity: 'medium',
        description:
          'Class components should be migrated to functional components with hooks',
        filePath: 'src/components/**/*.tsx',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'class MyComponent extends React.Component',
        recommendedFix:
          'Convert to functional component with useState, useEffect hooks',
        migrationPath: 'react-codemod/class-to-function',
        effortEstimate: 'medium',
        dependencies: ['@types/react', 'react-codemod'],
        breakingChanges: false,
      },
      {
        id: 'legacy-lifecycle-methods',
        type: 'deprecated-api',
        severity: 'medium',
        description:
          'componentDidMount, componentDidUpdate, componentWillUnmount should use useEffect',
        filePath: 'src/components/**/*.tsx',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'componentDidMount() { ... }',
        recommendedFix: 'useEffect(() => { ... }, [])',
        migrationPath: 'react-codemod/lifecycle-to-hooks',
        effortEstimate: 'medium',
        dependencies: ['react-codemod'],
        breakingChanges: false,
      },
      // Duplicate implementations
      {
        id: 'duplicate-glass-effects',
        type: 'duplicate-implementation',
        severity: 'high',
        description:
          'Multiple glass effect implementations found across codebase',
        filePath: 'src/styles/glass-*.css',
        lineNumber: 0,
        columnNumber: 0,
        currentCode:
          'Multiple .glass-* classes with similar but inconsistent styles',
        recommendedFix:
          'Consolidate into unified glass system with CSS custom properties',
        migrationPath: 'src/styles/glass-system.css',
        effortEstimate: 'large',
        dependencies: ['postcss', 'cssnano'],
        breakingChanges: true,
      },
      {
        id: 'duplicate-animation-systems',
        type: 'duplicate-implementation',
        severity: 'high',
        description:
          'Multiple animation systems (CSS, JS, GSAP) with overlapping functionality',
        filePath: 'src/animations/**/*.ts',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'Multiple animation implementations',
        recommendedFix:
          'Unify under single animation system with plugin architecture',
        migrationPath: 'src/animations/unified-system.ts',
        effortEstimate: 'extra-large',
        dependencies: ['gsap', 'framer-motion'],
        breakingChanges: true,
      },
      // Inconsistent patterns
      {
        id: 'inconsistent-state-management',
        type: 'inconsistent-pattern',
        severity: 'medium',
        description:
          'Mixed state management approaches (useState, useReducer, context)',
        filePath: 'src/components/**/*.tsx',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'Inconsistent state patterns',
        recommendedFix: 'Standardize on context + useReducer for complex state',
        migrationPath: 'src/state-management/standardized-patterns.ts',
        effortEstimate: 'medium',
        dependencies: ['react', 'zustand'],
        breakingChanges: false,
      },
      {
        id: 'inconsistent-prop-interfaces',
        type: 'inconsistent-pattern',
        severity: 'medium',
        description: 'Inconsistent prop interface patterns across components',
        filePath: 'src/components/**/*.tsx',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'Mixed interface and type definitions',
        recommendedFix: 'Standardize on consistent prop interface patterns',
        migrationPath: 'src/types/component-props.ts',
        effortEstimate: 'medium',
        dependencies: ['typescript'],
        breakingChanges: false,
      },
      // Performance issues
      {
        id: 'unnecessary-re-renders',
        type: 'performance-issue',
        severity: 'high',
        description:
          'Components re-rendering unnecessarily due to missing memoization',
        filePath: 'src/components/**/*.tsx',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'Missing React.memo, useMemo, useCallback',
        recommendedFix: 'Add appropriate memoization hooks and React.memo',
        migrationPath: 'performance/memoization-guide.md',
        effortEstimate: 'medium',
        dependencies: ['react'],
        breakingChanges: false,
      },
      {
        id: 'large-bundle-imports',
        type: 'performance-issue',
        severity: 'high',
        description: 'Importing entire libraries instead of specific functions',
        filePath: 'src/**/*.ts',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'import * as _ from "lodash"',
        recommendedFix:
          'Use tree-shaking imports: import { debounce } from "lodash"',
        migrationPath: 'performance/import-optimization.md',
        effortEstimate: 'small',
        dependencies: ['webpack-bundle-analyzer'],
        breakingChanges: false,
      },
      // Accessibility issues
      {
        id: 'missing-aria-attributes',
        type: 'accessibility-issue',
        severity: 'critical',
        description: 'Interactive elements missing required ARIA attributes',
        filePath: 'src/components/**/*.tsx',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'Missing aria-label, aria-describedby, role attributes',
        recommendedFix: 'Add comprehensive ARIA attributes and semantic HTML',
        migrationPath: 'accessibility/aria-guide.md',
        effortEstimate: 'medium',
        dependencies: ['axe-core'],
        breakingChanges: false,
      },
      {
        id: 'keyboard-navigation-issues',
        type: 'accessibility-issue',
        severity: 'high',
        description:
          'Components not keyboard navigable or missing focus indicators',
        filePath: 'src/components/**/*.tsx',
        lineNumber: 0,
        columnNumber: 0,
        currentCode: 'Missing tabindex, focus styles, keyboard handlers',
        recommendedFix:
          'Implement proper keyboard navigation and focus management',
        migrationPath: 'accessibility/keyboard-navigation.md',
        effortEstimate: 'medium',
        dependencies: ['focus-trap-react'],
        breakingChanges: false,
      },
    ];
  }

  /**
   * Scan codebase for legacy patterns
   */
  public async scanCodebase(): Promise<TechnicalDebtInventory> {
    // Mock implementation - in real scenario, use AST parsing
    const foundPatterns: LegacyCodePattern[] = [];

    // Simulate finding patterns
    this.patterns.forEach(pattern => {
      if (Math.random() > 0.5) {
        foundPatterns.push({
          ...pattern,
          lineNumber: Math.floor(Math.random() * 1000) + 1,
          columnNumber: Math.floor(Math.random() * 100) + 1,
        });
      }
    });

    // Categorize patterns
    const categories: Record<string, LegacyCodePattern[]> = {};
    foundPatterns.forEach(pattern => {
      if (!categories[pattern.type]) {
        categories[pattern.type] = [];
      }
      categories[pattern.type].push(pattern);
    });

    // Calculate summary
    const summary = {
      totalIssues: foundPatterns.length,
      criticalIssues: foundPatterns.filter(p => p.severity === 'critical')
        .length,
      highIssues: foundPatterns.filter(p => p.severity === 'high').length,
      mediumIssues: foundPatterns.filter(p => p.severity === 'medium').length,
      lowIssues: foundPatterns.filter(p => p.severity === 'low').length,
      estimatedEffort: this.calculateEstimatedEffort(foundPatterns),
      riskLevel: this.calculateRiskLevel(foundPatterns),
    };

    return {
      patterns: foundPatterns,
      summary,
      categories,
      recommendations: this.generateRecommendations(foundPatterns),
    };
  }

  /**
   * Calculate estimated effort for fixes
   */
  private calculateEstimatedEffort(patterns: LegacyCodePattern[]): string {
    const effortMap = {
      small: 1,
      medium: 3,
      large: 8,
      'extra-large': 20,
    };

    const totalEffort = patterns.reduce((sum, pattern) => {
      return sum + effortMap[pattern.effortEstimate];
    }, 0);

    if (totalEffort <= 10) return '1-2 days';
    if (totalEffort <= 30) return '1-2 weeks';
    if (totalEffort <= 60) return '1-2 months';
    return '3+ months';
  }

  /**
   * Calculate risk level
   */
  private calculateRiskLevel(
    patterns: LegacyCodePattern[]
  ): 'low' | 'medium' | 'high' | 'critical' {
    const criticalCount = patterns.filter(
      p => p.severity === 'critical'
    ).length;
    const highCount = patterns.filter(p => p.severity === 'high').length;
    const breakingCount = patterns.filter(p => p.breakingChanges).length;

    if (criticalCount > 5 || breakingCount > 10) return 'critical';
    if (criticalCount > 0 || highCount > 10 || breakingCount > 5) return 'high';
    if (highCount > 0 || breakingCount > 0) return 'medium';
    return 'low';
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(patterns: LegacyCodePattern[]): string[] {
    const recommendations: string[] = [];

    const criticalPatterns = patterns.filter(p => p.severity === 'critical');
    const highPatterns = patterns.filter(p => p.severity === 'high');
    const breakingPatterns = patterns.filter(p => p.breakingChanges);

    if (criticalPatterns.length > 0) {
      recommendations.push(
        `Address ${criticalPatterns.length} critical issues immediately: ${criticalPatterns.map(p => p.id).join(', ')}`
      );
    }

    if (highPatterns.length > 0) {
      recommendations.push(
        `Prioritize ${highPatterns.length} high-severity issues for next sprint`
      );
    }

    if (breakingPatterns.length > 0) {
      recommendations.push(
        `Plan breaking changes carefully: ${breakingPatterns.length} issues require major version bump`
      );
    }

    recommendations.push(
      'Implement automated code quality checks to prevent new legacy patterns',
      'Create migration scripts for common patterns',
      'Establish code review guidelines for legacy pattern detection'
    );

    return recommendations;
  }

  /**
   * Generate modernization opportunities
   */
  public generateModernizationOpportunities(): ModernizationOpportunity[] {
    return [
      {
        id: 'react-19-upgrade',
        title: 'Upgrade to React 19 with Concurrent Features',
        description:
          'Migrate to React 19 with concurrent rendering, automatic batching, and new hooks',
        currentImplementation: 'React 18 with manual optimization',
        proposedImplementation:
          'React 19 with useOptimistic, useFormStatus, and concurrent features',
        benefits: [
          'Better performance',
          'Improved user experience',
          'Future-proof codebase',
        ],
        risks: [
          'Breaking changes',
          'Browser compatibility',
          'Testing overhead',
        ],
        effort: 'large',
        priority: 'high',
        dependencies: ['react', 'react-dom', 'testing-library'],
      },
      {
        id: 'typescript-strict-mode',
        title: 'Enable TypeScript Strict Mode',
        description:
          'Enable strict TypeScript mode for better type safety and developer experience',
        currentImplementation: 'TypeScript with lenient configuration',
        proposedImplementation:
          'TypeScript strict mode with branded types and template literal types',
        benefits: [
          'Better type safety',
          'Improved IDE support',
          'Fewer runtime errors',
        ],
        risks: ['Compilation errors', 'Migration effort', 'Developer training'],
        effort: 'medium',
        priority: 'high',
        dependencies: ['typescript', 'eslint', 'prettier'],
      },
      {
        id: 'css-custom-properties',
        title: 'Migrate to CSS Custom Properties',
        description:
          'Replace hard-coded values with CSS custom properties for better theming',
        currentImplementation: 'Hard-coded CSS values and inline styles',
        proposedImplementation: 'CSS custom properties with design tokens',
        benefits: [
          'Better theming',
          'Reduced bundle size',
          'Improved maintainability',
        ],
        risks: ['Browser compatibility', 'Migration complexity'],
        effort: 'large',
        priority: 'medium',
        dependencies: ['postcss', 'autoprefixer'],
      },
      {
        id: 'component-library-standardization',
        title: 'Standardize Component Library',
        description:
          'Create consistent component patterns and remove duplicate implementations',
        currentImplementation:
          'Inconsistent component patterns across codebase',
        proposedImplementation: 'Unified component system with consistent APIs',
        benefits: [
          'Better maintainability',
          'Reduced bundle size',
          'Improved developer experience',
        ],
        risks: ['Breaking changes', 'Migration effort'],
        effort: 'extra-large',
        priority: 'high',
        dependencies: ['storybook', 'testing-library'],
      },
    ];
  }

  /**
   * Generate migration report
   */
  public async generateMigrationReport(): Promise<{
    inventory: TechnicalDebtInventory;
    opportunities: ModernizationOpportunity[];
    roadmap: string[];
  }> {
    const inventory = await this.scanCodebase();
    const opportunities = this.generateModernizationOpportunities();

    const roadmap = [
      'Phase 1: Critical fixes and security patches',
      'Phase 2: High-priority modernization opportunities',
      'Phase 3: Component library standardization',
      'Phase 4: Performance optimizations',
      'Phase 5: Final polish and documentation',
    ];

    return {
      inventory,
      opportunities,
      roadmap,
    };
  }

  /**
   * Create migration scripts
   */
  public createMigrationScripts(
    patterns: LegacyCodePattern[]
  ): Record<string, string> {
    const scripts: Record<string, string> = {};

    patterns.forEach(pattern => {
      scripts[pattern.id] = this.generateMigrationScript(pattern);
    });

    return scripts;
  }

  private generateMigrationScript(pattern: LegacyCodePattern): string {
    switch (pattern.type) {
      case 'deprecated-api':
        return `npx @react-codemod/class-to-function ${pattern.filePath}`;
      case 'duplicate-implementation':
        return `npx jscodeshift -t transforms/merge-duplicates.ts ${pattern.filePath}`;
      case 'inconsistent-pattern':
        return `npx eslint --fix ${pattern.filePath}`;
      case 'performance-issue':
        return `npx webpack-bundle-analyzer ${pattern.filePath}`;
      case 'accessibility-issue':
        return `npx axe-core --fix ${pattern.filePath}`;
      default:
        return `echo "Manual migration required for ${pattern.id}"`;
    }
  }
}

// Export singleton instance
export const legacyCodeAuditor = LegacyCodeAuditor.getInstance();

// Convenience functions
export const scanLegacyCode = async () => {
  return legacyCodeAuditor.scanCodebase();
};

export const generateMigrationReport = async () => {
  return legacyCodeAuditor.generateMigrationReport();
};

export const createMigrationScripts = (patterns: LegacyCodePattern[]) => {
  return legacyCodeAuditor.createMigrationScripts(patterns);
};
