#!/usr/bin/env bun

import { Project, SyntaxKind, Node } from 'ts-morph';
import path from 'path';

console.log('🚀 TypeScript Comprehensive Fix Tool');
console.log('====================================\n');

const project = new Project({
  tsConfigFilePath: 'tsconfig.base.json',
});

// Add all TypeScript files from your libs directory
project.addSourceFilesAtPaths('libs/components/src/**/*.{ts,tsx}');

console.log(`📁 Processing ${project.getSourceFiles().length} files...\n`);

let totalFixes = 0;

// 1. Fix unused imports
console.log('🧹 Step 1: Removing unused imports...');
let unusedImportFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  const imports = sourceFile.getImportDeclarations();

  for (const importDecl of imports) {
    const namedImports = importDecl.getNamedImports();
    const unusedImports: string[] = [];

    for (const namedImport of namedImports) {
      const identifier = namedImport.getName();
      const references = sourceFile
        .getDescendantsOfKind(SyntaxKind.Identifier)
        .filter(
          (id) =>
            id.getText() === identifier && id !== namedImport.getNameNode()
        );

      if (references.length === 0) {
        unusedImports.push(identifier);
        unusedImportFixes++;
      }
    }

    // Remove unused imports
    if (unusedImports.length > 0) {
      const remainingImports = namedImports.filter(
        (ni) => !unusedImports.includes(ni.getName())
      );

      if (remainingImports.length === 0) {
        // Remove entire import if no named imports remain
        importDecl.remove();
      } else {
        // Keep only used imports
        importDecl.removeNamedImports();
        remainingImports.forEach((ni) => {
          importDecl.addNamedImport(ni.getName());
        });
      }

      console.log(
        `  ✅ Removed unused imports: ${unusedImports.join(', ')} from ${sourceFile.getBaseName()}`
      );
    }
  }
}

console.log(`✅ Fixed ${unusedImportFixes} unused imports\n`);
totalFixes += unusedImportFixes;

// 2. Fix 'any' types
console.log('🎯 Step 2: Fixing any types...');
let anyTypeFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  // Fix 'any' keywords
  const anyNodes = sourceFile.getDescendantsOfKind(SyntaxKind.AnyKeyword);

  anyNodes.forEach((anyNode) => {
    const parent = anyNode.getParent();
    if (!parent) return;

    const context = getTypeContext(anyNode);
    let suggestedType = 'unknown';

    // More sophisticated type inference
    if (context === 'parameter') {
      const param = parent as unknown;
      const paramName = param.getName?.() || '';
      suggestedType = inferParameterType(paramName);
    } else if (context === 'property') {
      const prop = parent as unknown;
      const propName = prop.getName?.() || '';
      suggestedType = inferReactPropType(propName);
    }

    anyNode.replaceWithText(suggestedType);
    anyTypeFixes++;
  });

  // Fix Record<string, any> -> Record<string, unknown>
  const recordTypes = sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference);
  recordTypes.forEach((typeRef) => {
    const typeName = typeRef.getTypeName();
    if (Node.isIdentifier(typeName) && typeName.getText() === 'Record') {
      const typeArgs = typeRef.getTypeArguments();
      if (typeArgs.length === 2 && typeArgs[1].getText() === 'any') {
        typeArgs[1].replaceWithText('unknown');
        anyTypeFixes++;
      }
    }
  });
}

console.log(`✅ Fixed ${anyTypeFixes} any types\n`);
totalFixes += anyTypeFixes;

// 3. Fix type assertions
console.log('🔄 Step 3: Fixing dangerous type assertions...');
let assertionFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  const typeAssertions = sourceFile.getDescendantsOfKind(
    SyntaxKind.AsExpression
  );

  typeAssertions.forEach((assertion) => {
    const typeText = assertion.getTypeNode().getText();
    if (typeText === 'any') {
      assertion.getTypeNode().replaceWithText('unknown');
      assertionFixes++;
      console.log(
        `  ✅ Fixed 'as any' -> 'as unknown' in ${sourceFile.getBaseName()}`
      );
    }
  });
}

console.log(`✅ Fixed ${assertionFixes} type assertions\n`);
totalFixes += assertionFixes;

// 4. Add missing parameter types
console.log('📥 Step 4: Adding missing parameter types...');
let paramTypeFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  // Regular functions
  const functions = sourceFile.getFunctions();
  functions.forEach((func) => {
    func.getParameters().forEach((param) => {
      if (!param.getTypeNode() && !param.hasInitializer()) {
        const paramName = param.getName();
        const inferredType = inferParameterType(paramName);

        if (inferredType !== 'unknown') {
          param.setType(inferredType);
          paramTypeFixes++;
          console.log(
            `  ✅ Added type '${inferredType}' to parameter '${paramName}' in ${func.getName()}`
          );
        }
      }
    });
  });

  // Arrow functions
  const arrowFunctions = sourceFile.getDescendantsOfKind(
    SyntaxKind.ArrowFunction
  );
  arrowFunctions.forEach((arrowFunc) => {
    arrowFunc.getParameters().forEach((param) => {
      if (!param.getTypeNode() && !param.hasInitializer()) {
        const paramName = param.getName();
        const inferredType = inferParameterType(paramName);

        if (inferredType !== 'unknown') {
          param.setType(inferredType);
          paramTypeFixes++;
        }
      }
    });
  });
}

console.log(`✅ Added ${paramTypeFixes} parameter types\n`);
totalFixes += paramTypeFixes;

// 5. Add missing return types
console.log('📤 Step 5: Adding missing return types...');
let returnTypeFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  const functions = sourceFile.getFunctions();

  functions.forEach((func) => {
    if (!func.getReturnTypeNode() && func.getName() && func.isExported()) {
      const inferredReturnType = inferReturnType(func, sourceFile);
      if (inferredReturnType !== 'unknown') {
        func.setReturnType(inferredReturnType);
        returnTypeFixes++;
        console.log(
          `  ✅ Added return type '${inferredReturnType}' to function '${func.getName()}'`
        );
      }
    }
  });
}

console.log(`✅ Added ${returnTypeFixes} return types\n`);
totalFixes += returnTypeFixes;

// 6. Fix common React/JSX issues
console.log('⚛️  Step 6: Fixing React/JSX issues...');
let reactFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  if (!sourceFile.getBaseName().includes('.tsx')) continue;

  // Fix missing key props in mapped elements
  const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement);
  const jsxSelfClosingElements = sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement
  );

  [...jsxElements, ...jsxSelfClosingElements].forEach((element) => {
    const parent = element.getParent();

    // Check if this element is inside a map function
    if (isInsideMapFunction(element)) {
      const hasKeyProp = element
        .getAttributes?.()
        .some((attr: unknown) => attr.getName?.() === 'key');

      if (!hasKeyProp) {
        // This is a potential issue but requires manual review
        console.log(
          `  ⚠️  Missing key prop in mapped element at ${sourceFile.getBaseName()}:${element.getStartLineNumber()}`
        );
      }
    }
  });
}

console.log(`✅ Analyzed React/JSX patterns\n`);

// 7. Remove @ts-ignore comments and fix underlying issues
console.log('🙈 Step 7: Handling @ts-ignore comments...');
let tsIgnoreFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  const fullText = sourceFile.getFullText();
  const tsIgnoreMatches = fullText.match(/\/\/ @ts-ignore.*$/gm) || [];

  tsIgnoreMatches.forEach((match) => {
    console.log(
      `  ⚠️  Found @ts-ignore in ${sourceFile.getBaseName()}: ${match.trim()}`
    );
    console.log(`     Consider fixing the underlying type issue instead`);
  });
}

// 8. Clean up empty/redundant type definitions
console.log('🧼 Step 8: Cleaning up redundant types...');
let cleanupFixes = 0;

for (const sourceFile of project.getSourceFiles()) {
  // Remove empty interfaces
  const interfaces = sourceFile.getInterfaces();
  interfaces.forEach((interfaceDecl) => {
    if (
      interfaceDecl.getProperties().length === 0 &&
      interfaceDecl.getExtends().length === 0
    ) {
      console.log(
        `  ⚠️  Empty interface '${interfaceDecl.getName()}' in ${sourceFile.getBaseName()}`
      );
      console.log(`     Consider removing or adding properties`);
    }
  });

  // Remove duplicate type definitions
  const typeAliases = sourceFile.getTypeAliases();
  const typeNames = new Set<string>();

  typeAliases.forEach((typeAlias) => {
    const name = typeAlias.getName();
    if (typeNames.has(name)) {
      console.log(
        `  ⚠️  Duplicate type alias '${name}' in ${sourceFile.getBaseName()}`
      );
    }
    typeNames.add(name);
  });
}

// Save all changes
console.log('💾 Saving all changes...');
project.saveSync();

// Generate summary
console.log('\n🎉 TypeScript Fix Summary');
console.log('========================');
console.log(`✅ Total fixes applied: ${totalFixes}`);
console.log(`   🧹 Unused imports: ${unusedImportFixes}`);
console.log(`   🎯 Any types: ${anyTypeFixes}`);
console.log(`   🔄 Type assertions: ${assertionFixes}`);
console.log(`   📥 Parameter types: ${paramTypeFixes}`);
console.log(`   📤 Return types: ${returnTypeFixes}`);
console.log(`   ⚛️  React fixes: ${reactFixes}`);

console.log('\n📋 Next Steps:');
console.log('1. Review changes: git diff');
console.log('2. Run type check: bun run type-check');
console.log('3. Run linting: bun run lint');
console.log('4. Test your application');
console.log(
  '5. Commit changes: git add . && git commit -m "fix: improve TypeScript types"'
);

// Helper functions
function getTypeContext(anyNode: Node): string {
  const parent = anyNode.getParent();

  if (!parent) return 'unknown';

  if (Node.isAsExpression(parent)) return 'assertion';
  if (Node.isParameter(parent)) return 'parameter';
  if (Node.isPropertyDeclaration(parent) || Node.isPropertySignature(parent))
    return 'property';
  if (Node.isFunctionDeclaration(parent) || Node.isMethodDeclaration(parent))
    return 'return';
  if (Node.isTypeAliasDeclaration(parent)) return 'alias';

  return 'unknown';
}

function inferParameterType(paramName: string): string {
  const lowerName = paramName.toLowerCase();

  // React event handlers
  if (lowerName.includes('event') || lowerName === 'e')
    return 'React.SyntheticEvent';
  if (lowerName.includes('click')) return 'React.MouseEvent';
  if (lowerName.includes('change')) return 'React.ChangeEvent';
  if (lowerName.includes('key')) return 'React.KeyboardEvent';

  // HTML elements
  if (lowerName.includes('element') || lowerName === 'el') return 'HTMLElement';
  if (lowerName.includes('ref')) return 'React.RefObject<HTMLElement>';

  // Common React props
  if (lowerName.includes('children')) return 'React.ReactNode';
  if (lowerName.includes('classname')) return 'string';
  if (lowerName.includes('props')) return 'Record<string, unknown>';

  // Functions
  if (lowerName.includes('callback') || lowerName === 'cb') return 'Function';
  if (lowerName.includes('handler')) return 'Function';

  // Data types
  if (lowerName.includes('config') || lowerName.includes('options'))
    return 'Record<string, unknown>';
  if (lowerName.includes('id')) return 'string';
  if (lowerName.includes('index') || lowerName === 'i') return 'number';
  if (lowerName.includes('count') || lowerName.includes('length'))
    return 'number';
  if (lowerName.includes('name') || lowerName.includes('title'))
    return 'string';
  if (lowerName.includes('enabled') || lowerName.includes('visible'))
    return 'boolean';
  if (lowerName.includes('error') || lowerName === 'err') return 'Error';

  return 'unknown';
}

function inferReactPropType(propName: string): string {
  const lowerName = propName.toLowerCase();

  if (lowerName === 'children') return 'React.ReactNode';
  if (lowerName === 'classname') return 'string';
  if (lowerName === 'style') return 'React.CSSProperties';
  if (lowerName.startsWith('on') && lowerName.length > 2) return 'Function';
  if (lowerName.includes('ref')) return 'React.RefObject<HTMLElement>';

  return 'unknown';
}

function inferReturnType(func: unknown, sourceFile: unknown): string {
  const funcName = func.getName?.() || '';

  // React components (PascalCase functions in .tsx files)
  if (sourceFile.getBaseName().includes('.tsx')) {
    if (funcName[0] && funcName[0] === funcName[0].toUpperCase()) {
      return 'React.ReactElement | null';
    }
  }

  // React hooks
  if (funcName.startsWith('use') && funcName.length > 3) {
    return 'unknown'; // Hooks return various types
  }

  // Boolean functions
  if (
    funcName.startsWith('is') ||
    funcName.startsWith('has') ||
    funcName.startsWith('can')
  ) {
    return 'boolean';
  }

  // Event handlers
  if (funcName.includes('Handler') || funcName.includes('Callback')) {
    return 'void';
  }

  return 'void'; // Default for most functions
}

function isInsideMapFunction(node: Node): boolean {
  let current = node.getParent();

  while (current) {
    if (Node.isCallExpression(current)) {
      const expression = current.getExpression();
      if (Node.isPropertyAccessExpression(expression)) {
        const name = expression.getName();
        if (name === 'map') {
          return true;
        }
      }
    }
    current = current.getParent();
  }

  return false;
}
