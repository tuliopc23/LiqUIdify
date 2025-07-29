#!/usr/bin/env bun

import path from 'path';
import { Node, Project, SyntaxKind } from 'ts-morph';

const project = new Project({
  tsConfigFilePath: 'tsconfig.base.json',
});

// Add all TypeScript files from your libs directory
project.addSourceFilesAtPaths('libs/components/src/**/*.{ts,tsx}');

console.log(
  `🔍 Scanning ${project.getSourceFiles().length} files for missing types...`
);

let fixCount = 0;

for (const sourceFile of project.getSourceFiles()) {
  console.log(
    `\n📁 Processing: ${path.relative(process.cwd(), sourceFile.getFilePath())}`
  );

  let fileChanged = false;

  // Fix missing parameter types
  const functions = sourceFile.getFunctions();
  functions.forEach((func) => {
    func.getParameters().forEach((param) => {
      if (!param.getTypeNode() && !param.hasInitializer()) {
        const paramName = param.getName();
        const inferredType = inferParameterType(paramName, func, sourceFile);

        if (inferredType !== 'unknown') {
          param.setType(inferredType);
          console.log(
            `  🔧 Added type '${inferredType}' to parameter '${paramName}' in function '${func.getName()}'`
          );
          fileChanged = true;
          fixCount++;
        } else {
          console.log(
            `  ⚠️  Could not infer type for parameter '${paramName}' in function '${func.getName()}'`
          );
        }
      }
    });

    // Fix missing return types
    if (!func.getReturnTypeNode() && func.getName() && func.isExported()) {
      const inferredReturnType = inferReturnType(func, sourceFile);
      if (inferredReturnType !== 'unknown') {
        func.setReturnType(inferredReturnType);
        console.log(
          `  🔧 Added return type '${inferredReturnType}' to function '${func.getName()}'`
        );
        fileChanged = true;
        fixCount++;
      }
    }
  });

  // Fix arrow functions
  const arrowFunctions = sourceFile.getDescendantsOfKind(
    SyntaxKind.ArrowFunction
  );
  arrowFunctions.forEach((arrowFunc) => {
    // Fix parameters
    arrowFunc.getParameters().forEach((param) => {
      if (!param.getTypeNode() && !param.hasInitializer()) {
        const paramName = param.getName();
        const inferredType = inferParameterType(
          paramName,
          arrowFunc,
          sourceFile
        );

        if (inferredType !== 'unknown') {
          param.setType(inferredType);
          console.log(
            `  🔧 Added type '${inferredType}' to arrow function parameter '${paramName}'`
          );
          fileChanged = true;
          fixCount++;
        }
      }
    });

    // Fix return types for exported arrow functions
    const parent = arrowFunc.getParent();
    if (!arrowFunc.getReturnTypeNode() && Node.isVariableDeclaration(parent)) {
      if (parent.isExported()) {
        const inferredReturnType = inferReturnType(arrowFunc, sourceFile);
        if (inferredReturnType !== 'unknown') {
          arrowFunc.setReturnType(inferredReturnType);
          console.log(
            `  🔧 Added return type '${inferredReturnType}' to arrow function '${parent.getName()}'`
          );
          fileChanged = true;
          fixCount++;
        }
      }
    }
  });

  // Fix interface and type properties without types
  const interfaces = sourceFile.getInterfaces();
  interfaces.forEach((interfaceDecl) => {
    interfaceDecl.getProperties().forEach((prop) => {
      if (!prop.getTypeNode()) {
        const propName = prop.getName();
        const inferredType = inferPropertyType(
          propName,
          interfaceDecl,
          sourceFile
        );

        if (inferredType !== 'unknown') {
          prop.setType(inferredType);
          console.log(
            `  🔧 Added type '${inferredType}' to property '${propName}' in interface '${interfaceDecl.getName()}'`
          );
          fileChanged = true;
          fixCount++;
        }
      }
    });
  });

  if (fileChanged) {
    console.log(`✅ Applied ${fixCount} fixes to ${sourceFile.getBaseName()}`);
  } else {
    console.log('  ✅ No missing types found');
  }
}

// Save all changes
console.log('\n💾 Saving changes...');
project.saveSync();

console.log(
  `\n✅ Completed! Added ${fixCount} type annotations across ${project.getSourceFiles().length} files.`
);
console.log('\n📋 Next steps:');
console.log('1. Review the changes with: git diff');
console.log('2. Run type checking: bun run type-check');
console.log('3. Fix any remaining issues manually');

function inferParameterType(
  paramName: string,
  func: unknown,
  sourceFile: unknown
): string {
  const lowerName = paramName.toLowerCase();

  // React event handlers
  if (lowerName.includes('event') || lowerName === 'e') {
    // Check if it's a specific event type
    const funcName = func.getName?.() || '';
    if (funcName.includes('Click') || funcName.includes('click'))
      return 'React.MouseEvent';
    if (funcName.includes('Change') || funcName.includes('change'))
      return 'React.ChangeEvent';
    if (funcName.includes('Key') || funcName.includes('key'))
      return 'React.KeyboardEvent';
    if (funcName.includes('Focus') || funcName.includes('focus'))
      return 'React.FocusEvent';
    return 'React.SyntheticEvent';
  }

  // HTML elements
  if (lowerName.includes('element') || lowerName === 'el') return 'HTMLElement';
  if (lowerName.includes('button')) return 'HTMLButtonElement';
  if (lowerName.includes('input')) return 'HTMLInputElement';
  if (lowerName.includes('div')) return 'HTMLDivElement';

  // Common React types
  if (lowerName.includes('ref')) return 'React.RefObject<HTMLElement>';
  if (lowerName.includes('children')) return 'React.ReactNode';
  if (lowerName.includes('props')) {
    // Try to infer from component context
    const componentName = extractComponentName(func, sourceFile);
    if (componentName) {
      return `${componentName}Props`;
    }
    return 'Record<string, unknown>';
  }

  // Functions
  if (lowerName.includes('callback') || lowerName === 'cb') return 'Function';
  if (lowerName.includes('handler')) return 'Function';
  if (lowerName.includes('onclick')) return '() => void';
  if (lowerName.includes('onchange')) return '(value: string) => void';

  // Data types
  if (lowerName.includes('config') || lowerName.includes('options'))
    return 'Record<string, unknown>';
  if (lowerName.includes('data')) return 'unknown';
  if (lowerName.includes('id')) return 'string';
  if (lowerName.includes('index') || lowerName === 'i') return 'number';
  if (lowerName.includes('count') || lowerName.includes('length'))
    return 'number';
  if (lowerName.includes('name') || lowerName.includes('title'))
    return 'string';
  if (
    lowerName.includes('enabled') ||
    lowerName.includes('visible') ||
    lowerName.includes('disabled')
  )
    return 'boolean';
  if (lowerName.includes('error') || lowerName === 'err') return 'Error';

  return 'unknown';
}

function inferReturnType(func: unknown, sourceFile: unknown): string {
  const funcName = func.getName?.() || '';
  const body = func.getBody?.();

  // React components
  if (funcName.startsWith('use') && funcName.length > 3) {
    // It's likely a React hook
    return 'unknown'; // Hooks can return various types
  }

  if (
    sourceFile.getBaseName().includes('.tsx') ||
    sourceFile.getBaseName().includes('.jsx')
  ) {
    // If it's a TSX file and function name starts with uppercase, likely a component
    if (funcName[0] && funcName[0] === funcName[0].toUpperCase()) {
      return 'React.ReactElement | null';
    }
  }

  // Check return statements
  if (body) {
    const returnStmts =
      body.getDescendantsOfKind?.(SyntaxKind.ReturnStatement) || [];
    if (returnStmts.length === 0) {
      return 'void';
    }

    // Analyze return statements
    const hasNullReturn = returnStmts.some((stmt) => {
      const expr = stmt.getExpression();
      return expr && expr.getText() === 'null';
    });

    const hasJsxReturn = returnStmts.some((stmt) => {
      const expr = stmt.getExpression();
      return expr && expr.getKind() === SyntaxKind.JsxElement;
    });

    if (hasJsxReturn) {
      return hasNullReturn ? 'React.ReactElement | null' : 'React.ReactElement';
    }
  }

  // Function name patterns
  if (
    funcName.startsWith('is') ||
    funcName.startsWith('has') ||
    funcName.startsWith('can')
  )
    return 'boolean';
  if (funcName.startsWith('get') && funcName.includes('Count')) return 'number';
  if (funcName.startsWith('get') && funcName.includes('Name')) return 'string';
  if (funcName.includes('Handler') || funcName.includes('Callback'))
    return 'void';

  return 'unknown';
}

function inferPropertyType(
  propName: string,
  interfaceDecl: unknown,
  _sourceFile: unknown
): string {
  const lowerName = propName.toLowerCase();

  // React props patterns
  if (lowerName === 'children') return 'React.ReactNode';
  if (lowerName === 'classname') return 'string';
  if (lowerName === 'style') return 'React.CSSProperties';
  if (lowerName.startsWith('on') && lowerName.length > 2) return 'Function';

  // Common property patterns
  if (lowerName === 'id') return 'string';
  if (lowerName === 'key') return 'string | number';
  if (lowerName.includes('name') || lowerName.includes('title'))
    return 'string';
  if (
    lowerName.includes('count') ||
    lowerName.includes('length') ||
    lowerName.includes('size')
  )
    return 'number';
  if (
    lowerName.includes('enabled') ||
    lowerName.includes('visible') ||
    lowerName.includes('disabled')
  )
    return 'boolean';
  if (lowerName.includes('color')) return 'string';
  if (lowerName.includes('width') || lowerName.includes('height'))
    return 'number | string';

  // Interface name context
  const interfaceName = interfaceDecl.getName?.() || '';
  if (interfaceName.includes('Props')) {
    if (lowerName.includes('variant')) return 'string';
    if (lowerName.includes('size')) return 'string | number';
  }

  return 'unknown';
}

function extractComponentName(
  func: unknown,
  _sourceFile: unknown
): string | null {
  const funcName = func.getName?.() || '';

  // If function name looks like a component (PascalCase)
  if (funcName[0] && funcName[0] === funcName[0].toUpperCase()) {
    return funcName;
  }

  return null;
}
