#!/usr/bin/env bun

import { Project, SyntaxKind, Node } from 'ts-morph';
import path from 'path';

const project = new Project({
  tsConfigFilePath: 'tsconfig.base.json',
});

// Add all TypeScript files from your libs directory
project.addSourceFilesAtPaths('libs/components/src/**/*.{ts,tsx}');

console.log(
  `🔍 Scanning ${project.getSourceFiles().length} files for 'any' types...`
);

let fixCount = 0;

for (const sourceFile of project.getSourceFiles()) {
  console.log(
    `\n📁 Processing: ${path.relative(process.cwd(), sourceFile.getFilePath())}`
  );

  // Find all 'any' keyword nodes
  const anyNodes = sourceFile.getDescendantsOfKind(SyntaxKind.AnyKeyword);

  if (anyNodes.length === 0) {
    console.log('  ✅ No any types found');
    continue;
  }

  console.log(`  🎯 Found ${anyNodes.length} 'any' types`);

  anyNodes.forEach((anyNode, index) => {
    const parent = anyNode.getParent();

    if (!parent) return;

    try {
      // Get context to suggest better type
      const context = getTypeContext(anyNode);
      const suggestedType = getSuggestedType(context);

      if (suggestedType && suggestedType !== 'any') {
        console.log(
          `    🔧 Replacing 'any' with '${suggestedType}' at line ${anyNode.getStartLineNumber()}`
        );
        anyNode.replaceWithText(suggestedType);
        fixCount++;
      } else {
        console.log(
          `    ⚠️  Could not determine better type for 'any' at line ${anyNode.getStartLineNumber()}`
        );
      }
    } catch (error) {
      console.log(
        `    ❌ Error processing 'any' at line ${anyNode.getStartLineNumber()}: ${error}`
      );
    }
  });
}

// Additional fixes for common patterns
console.log('\n🔧 Applying additional common fixes...');

for (const sourceFile of project.getSourceFiles()) {
  let fileChanged = false;

  // Fix Record<string, any> -> Record<string, unknown>
  const recordTypes = sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference);
  recordTypes.forEach((typeRef) => {
    const typeName = typeRef.getTypeName();
    if (Node.isIdentifier(typeName) && typeName.getText() === 'Record') {
      const typeArgs = typeRef.getTypeArguments();
      if (typeArgs.length === 2 && typeArgs[1].getText() === 'any') {
        typeArgs[1].replaceWithText('unknown');
        console.log(
          `  🔧 Fixed Record<string, any> -> Record<string, unknown> in ${sourceFile.getBaseName()}`
        );
        fileChanged = true;
        fixCount++;
      }
    }
  });

  // Fix function parameters with any
  const functionDeclarations = sourceFile.getFunctions();
  functionDeclarations.forEach((func) => {
    func.getParameters().forEach((param) => {
      const typeNode = param.getTypeNode();
      if (typeNode && typeNode.getText() === 'any') {
        // Try to infer type from parameter name
        const paramName = param.getName();
        const inferredType = inferTypeFromParameterName(paramName);
        if (inferredType !== 'any') {
          typeNode.replaceWithText(inferredType);
          console.log(
            `  🔧 Fixed parameter '${paramName}': any -> ${inferredType} in ${func.getName()}`
          );
          fileChanged = true;
          fixCount++;
        }
      }
    });
  });

  // Fix arrow function parameters
  const arrowFunctions = sourceFile.getDescendantsOfKind(
    SyntaxKind.ArrowFunction
  );
  arrowFunctions.forEach((arrowFunc) => {
    arrowFunc.getParameters().forEach((param) => {
      const typeNode = param.getTypeNode();
      if (typeNode && typeNode.getText() === 'any') {
        const paramName = param.getName();
        const inferredType = inferTypeFromParameterName(paramName);
        if (inferredType !== 'any') {
          typeNode.replaceWithText(inferredType);
          console.log(
            `  🔧 Fixed arrow function parameter '${paramName}': any -> ${inferredType}`
          );
          fileChanged = true;
          fixCount++;
        }
      }
    });
  });

  if (fileChanged) {
    console.log(`✅ Applied fixes to ${sourceFile.getBaseName()}`);
  }
}

// Save all changes
console.log('\n💾 Saving changes...');
project.saveSync();

console.log(
  `\n✅ Completed! Fixed ${fixCount} 'any' types across ${project.getSourceFiles().length} files.`
);
console.log('\n📋 Next steps:');
console.log('1. Review the changes with: git diff');
console.log('2. Run type checking: bun run type-check');
console.log('3. Run linting: bun run lint');
console.log('4. Fix any remaining type issues manually');

function getTypeContext(anyNode: Node): string {
  const parent = anyNode.getParent();

  if (!parent) return 'unknown';

  // Check if it's in a type assertion
  if (Node.isAsExpression(parent)) {
    return 'assertion';
  }

  // Check if it's in a function parameter
  if (Node.isParameter(parent)) {
    return 'parameter';
  }

  // Check if it's in a property declaration
  if (Node.isPropertyDeclaration(parent) || Node.isPropertySignature(parent)) {
    return 'property';
  }

  // Check if it's in a return type
  if (Node.isFunctionDeclaration(parent) || Node.isMethodDeclaration(parent)) {
    return 'return';
  }

  // Check if it's in a type alias
  if (Node.isTypeAliasDeclaration(parent)) {
    return 'alias';
  }

  return 'unknown';
}

function getSuggestedType(context: string, anyNode?: Node): string {
  // Try to infer better types based on context
  if (anyNode) {
    const parent = anyNode.getParent();

    // If it's Record<string, any> -> Record<string, unknown>
    if (parent && Node.isTypeReference(parent.getParent())) {
      const typeRef = parent.getParent();
      if (Node.isTypeReference(typeRef)) {
        const typeName = typeRef.getTypeName();
        if (Node.isIdentifier(typeName) && typeName.getText() === 'Record') {
          return 'unknown';
        }
      }
    }

    // If it's in a React component props, suggest ReactNode for children
    if (parent && Node.isPropertySignature(parent)) {
      const propName = parent.getName();
      if (propName === 'children') return 'React.ReactNode';
      if (propName === 'className') return 'string';
      if (propName.endsWith('Handler') || propName.startsWith('on'))
        return 'Function';
    }
  }

  switch (context) {
    case 'assertion':
      return 'unknown'; // Safer than any for type assertions
    case 'parameter':
      return 'unknown'; // Let caller decide the type
    case 'property':
      return 'unknown'; // Safe default for properties
    case 'return':
      return 'void'; // Most component functions return void
    case 'alias':
      return 'unknown'; // Safe generic replacement
    default:
      return 'unknown'; // Default safe replacement
  }
}

function inferTypeFromParameterName(paramName: string): string {
  const lowerName = paramName.toLowerCase();

  // Common parameter name patterns
  if (lowerName.includes('event') || lowerName === 'e') return 'Event';
  if (lowerName.includes('element') || lowerName === 'el') return 'HTMLElement';
  if (lowerName.includes('node')) return 'Node';
  if (lowerName.includes('callback') || lowerName === 'cb') return 'Function';
  if (lowerName.includes('handler')) return 'Function';
  if (lowerName.includes('config') || lowerName.includes('options'))
    return 'Record<string, unknown>';
  if (lowerName.includes('data')) return 'unknown';
  if (lowerName.includes('id')) return 'string';
  if (lowerName.includes('index') || lowerName === 'i') return 'number';
  if (lowerName.includes('count') || lowerName.includes('length'))
    return 'number';
  if (lowerName.includes('error') || lowerName === 'err') return 'Error';
  if (lowerName.includes('props')) return 'Record<string, unknown>';
  if (lowerName.includes('ref')) return 'React.RefObject<unknown>';
  if (lowerName.includes('children')) return 'React.ReactNode';

  return 'unknown'; // Safe default
}
