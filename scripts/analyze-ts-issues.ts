#!/usr/bin/env bun

import path from 'path';
import { Node, Project, SyntaxKind, ts } from 'ts-morph';

interface TypeIssue {
  file: string;
  line: number;
  column: number;
  type: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  fixable: boolean;
}

console.log('🔍 Analyzing TypeScript issues...\n');

// Create project with strict settings to see all issues
const project = new Project({
  tsConfigFilePath: 'tsconfig.base.json',
  compilerOptions: {
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    noImplicitReturns: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noUncheckedIndexedAccess: true,
  },
});

// Add all TypeScript files from your libs directory
project.addSourceFilesAtPaths('libs/components/src/**/*.{ts,tsx}');

const issues: Array<TypeIssue> = [];

console.log(`📁 Analyzing ${project.getSourceFiles().length} files...\n`);

// Check diagnostics first
const diagnostics = project.getPreEmitDiagnostics();
console.log(`🚨 Found ${diagnostics.length} TypeScript diagnostics\n`);

diagnostics.forEach((diagnostic) => {
  const sourceFile = diagnostic.getSourceFile();
  const lineAndColumn = diagnostic.getLineAndColumnAtPos();

  if (sourceFile && lineAndColumn) {
    issues.push({
      file: path.relative(process.cwd(), sourceFile.getFilePath()),
      line: lineAndColumn.line,
      column: lineAndColumn.column,
      type: 'diagnostic',
      description: diagnostic.getMessageText().toString(),
      severity:
        diagnostic.getCategory() === ts.DiagnosticCategory.Error
          ? 'error'
          : 'warning',
      fixable: false,
    });
  }
});

// Analyze each file for common issues
for (const sourceFile of project.getSourceFiles()) {
  const relativePath = path.relative(process.cwd(), sourceFile.getFilePath());

  // 1. Find 'any' types
  const anyNodes = sourceFile.getDescendantsOfKind(SyntaxKind.AnyKeyword);
  anyNodes.forEach((anyNode) => {
    issues.push({
      file: relativePath,
      line: anyNode.getStartLineNumber(),
      column: anyNode.getStartColumnNumber(),
      type: 'any-type',
      description: "Usage of 'any' type detected",
      severity: 'warning',
      fixable: true,
    });
  });

  // 2. Find non-null assertions (!.)
  const nonNullAssertions = sourceFile.getDescendantsOfKind(
    SyntaxKind.NonNullExpression
  );
  nonNullAssertions.forEach((assertion) => {
    issues.push({
      file: relativePath,
      line: assertion.getStartLineNumber(),
      column: assertion.getStartColumnNumber(),
      type: 'non-null-assertion',
      description: 'Non-null assertion (!) used - potentially unsafe',
      severity: 'warning',
      fixable: true,
    });
  });

  // 3. Find type assertions (as any, as unknown)
  const typeAssertions = sourceFile.getDescendantsOfKind(
    SyntaxKind.AsExpression
  );
  typeAssertions.forEach((assertion) => {
    const typeText = assertion.getType().getText();
    if (typeText.includes('any')) {
      issues.push({
        file: relativePath,
        line: assertion.getStartLineNumber(),
        column: assertion.getStartColumnNumber(),
        type: 'type-assertion-any',
        description: `Type assertion to 'any': ${assertion.getText()}`,
        severity: 'error',
        fixable: true,
      });
    }
  });

  // 4. Find functions without return types
  const functions = sourceFile.getFunctions();
  functions.forEach((func) => {
    if (!func.getReturnTypeNode() && func.getName() && func.isExported()) {
      issues.push({
        file: relativePath,
        line: func.getStartLineNumber(),
        column: func.getStartColumnNumber(),
        type: 'missing-return-type',
        description: `Function '${func.getName()}' missing return type annotation`,
        severity: 'warning',
        fixable: true,
      });
    }
  });

  // 5. Find arrow functions without return types
  const arrowFunctions = sourceFile.getDescendantsOfKind(
    SyntaxKind.ArrowFunction
  );
  arrowFunctions.forEach((arrowFunc) => {
    const parent = arrowFunc.getParent();
    if (!arrowFunc.getReturnTypeNode() && Node.isVariableDeclaration(parent)) {
      const name = parent.getName();
      if (parent.isExported()) {
        issues.push({
          file: relativePath,
          line: arrowFunc.getStartLineNumber(),
          column: arrowFunc.getStartColumnNumber(),
          type: 'missing-return-type',
          description: `Arrow function '${name}' missing return type annotation`,
          severity: 'warning',
          fixable: true,
        });
      }
    }
  });

  // 6. Find parameters without types
  const allFunctions = [...functions, ...arrowFunctions];
  allFunctions.forEach((func) => {
    func.getParameters().forEach((param) => {
      if (!param.getTypeNode() && !param.hasInitializer()) {
        issues.push({
          file: relativePath,
          line: param.getStartLineNumber(),
          column: param.getStartColumnNumber(),
          type: 'missing-parameter-type',
          description: `Parameter '${param.getName()}' missing type annotation`,
          severity: 'error',
          fixable: true,
        });
      }
    });
  });

  // 7. Find unused imports
  const imports = sourceFile.getImportDeclarations();
  imports.forEach((importDecl) => {
    const namedImports = importDecl.getNamedImports();
    namedImports.forEach((namedImport) => {
      const identifier = namedImport.getName();
      const references = sourceFile
        .getDescendantsOfKind(SyntaxKind.Identifier)
        .filter(
          (id) =>
            id.getText() === identifier && id !== namedImport.getNameNode()
        );

      if (references.length === 0) {
        issues.push({
          file: relativePath,
          line: namedImport.getStartLineNumber(),
          column: namedImport.getStartColumnNumber(),
          type: 'unused-import',
          description: `Unused import '${identifier}'`,
          severity: 'warning',
          fixable: true,
        });
      }
    });
  });

  // 8. Find @ts-ignore comments
  const tsIgnoreComments =
    sourceFile.getFullText().match(/\/\/ @ts-ignore.*$/gm) || [];
  tsIgnoreComments.forEach((comment, _index) => {
    const commentIndex = sourceFile.getFullText().indexOf(comment);
    const pos = sourceFile.getLineAndColumnAtPos(commentIndex);

    issues.push({
      file: relativePath,
      line: pos.line,
      column: pos.column,
      type: 'ts-ignore',
      description: `@ts-ignore comment found: ${comment.trim()}`,
      severity: 'warning',
      fixable: false,
    });
  });
}

// Sort issues by severity and file
issues.sort((a, b) => {
  if (a.severity !== b.severity) {
    const severityOrder = { error: 0, warning: 1, info: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  }
  return a.file.localeCompare(b.file);
});

// Generate report
console.log('📊 TypeScript Issues Analysis Report');
console.log('=====================================\n');

const summary = {
  total: issues.length,
  errors: issues.filter((i) => i.severity === 'error').length,
  warnings: issues.filter((i) => i.severity === 'warning').length,
  fixable: issues.filter((i) => i.fixable).length,
};

console.log(`📈 Summary:`);
console.log(`   Total Issues: ${summary.total}`);
console.log(`   🔴 Errors: ${summary.errors}`);
console.log(`   🟡 Warnings: ${summary.warnings}`);
console.log(`   🔧 Auto-fixable: ${summary.fixable}`);
console.log(`   📝 Manual fixes needed: ${summary.total - summary.fixable}\n`);

// Group by type
const byType = issues.reduce(
  (acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);

console.log('📋 Issues by Type:');
Object.entries(byType)
  .sort(([, a], [, b]) => b - a)
  .forEach(([type, count]) => {
    const icon = getTypeIcon(type);
    console.log(`   ${icon} ${type}: ${count}`);
  });

console.log('\n🔍 Detailed Issues:');
console.log('==================\n');

// Group issues by file
const byFile = issues.reduce(
  (acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = [];
    acc[issue.file].push(issue);
    return acc;
  },
  {} as Record<string, Array<TypeIssue>>
);

Object.entries(byFile).forEach(([file, fileIssues]) => {
  console.log(`📁 ${file} (${fileIssues.length} issues)`);
  fileIssues.forEach((issue) => {
    const icon =
      issue.severity === 'error'
        ? '🔴'
        : issue.severity === 'warning'
          ? '🟡'
          : '🔵';
    const fixIcon = issue.fixable ? '🔧' : '📝';
    console.log(
      `   ${icon} ${fixIcon} Line ${issue.line}: ${issue.description}`
    );
  });
  console.log();
});

// Generate recommendations
console.log('\n💡 Recommendations:');
console.log('==================\n');

if (byType['any-type']) {
  console.log('🎯 High Priority:');
  console.log(
    `   • Replace ${byType['any-type']} 'any' types with proper types`
  );
  console.log('   • Run: bun scripts/fix-any-types.ts');
}

if (byType['missing-parameter-type']) {
  console.log(
    `   • Add type annotations to ${byType['missing-parameter-type']} parameters`
  );
  console.log('   • Run: bun scripts/fix-missing-types.ts');
}

if (byType['missing-return-type']) {
  console.log(
    `   • Add return type annotations to ${byType['missing-return-type']} functions`
  );
  console.log('   • Run: bun scripts/fix-return-types.ts');
}

if (byType['unused-import']) {
  console.log('🧹 Cleanup:');
  console.log(`   • Remove ${byType['unused-import']} unused imports`);
  console.log('   • Run: bun scripts/fix-unused-imports.ts');
}

if (byType['non-null-assertion']) {
  console.log('⚠️  Code Safety:');
  console.log(
    `   • Review ${byType['non-null-assertion']} non-null assertions`
  );
  console.log('   • Run: bun scripts/fix-non-null-assertions.ts');
}

console.log('\n🚀 Next Steps:');
console.log(
  '1. Run individual fix scripts or comprehensive fix: bun scripts/fix-all-ts-issues.ts'
);
console.log('2. Update tsconfig.lib.json to enable strict mode gradually');
console.log('3. Review and test changes');
console.log('4. Re-run analysis to track progress');

function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    'any-type': '🎯',
    'non-null-assertion': '⚠️',
    'type-assertion-any': '🔴',
    'missing-return-type': '📤',
    'missing-parameter-type': '📥',
    'unused-import': '🧹',
    'ts-ignore': '🙈',
    diagnostic: '🚨',
  };
  return icons[type] || '📋';
}
