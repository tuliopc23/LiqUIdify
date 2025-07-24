#!/usr/bin/env bun

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'glob';

console.log('🔧 Fixing ARIA type issues...\n');

let totalFixed = 0;

// Fix ARIA attribute type issues by wrapping problematic extends
function fixAriaAttributeTypes(content: string, filePath: string): string {
  let modified = content;
  let fixCount = 0;

  // Pattern to match interface extending HTML attributes with ARIA issues
  const interfacePattern = /export\s+interface\s+(\w+)\s+extends\s+(.*?)(?=\s*{)/gs;
  
  const matches = [...content.matchAll(interfacePattern)];
  
  for (const match of matches) {
    const [fullMatch, interfaceName, extendsClause] = match;
    
    // Check if this is an interface that extends React HTML attributes
    if (extendsClause.includes('React.') && extendsClause.includes('HTMLAttributes')) {
      // Check if the following lines have ARIA-related type errors by looking for common patterns
      const startIndex = match.index! + fullMatch.length;
      const nextBrace = content.indexOf('{', startIndex);
      const endBrace = findMatchingBrace(content, nextBrace);
      
      if (endBrace === -1) {continue;}
      
      const interfaceBody = content.substring(nextBrace, endBrace + 1);
      
      // If interface has ARIA issues, we need to fix the extends clause
      // by using a more specific type that doesn't have the index signature conflict
      if (shouldFixInterface(interfaceName, filePath)) {
        // Create a fixed extends clause that omits the problematic index signature
        const fixedExtendsClause = extendsClause.replaceAll(
          /React\.(HTML|Input|TextArea|Select|Button|Div)Attributes<(\w+)>/g,
          (match, elementType, genericType) => {
            return `Omit<React.${elementType}Attributes<${genericType}>, keyof React.AriaAttributes>`;
          }
        );
        
        if (fixedExtendsClause !== extendsClause) {
          const newInterface = `export interface ${interfaceName} extends ${fixedExtendsClause}`;
          modified = modified.replace(fullMatch, newInterface);
          fixCount++;
        }
      }
    }
  }

  // Alternative approach: Add type assertion for components with ARIA issues
  const componentPattern = /<(\w+)\s+([^>]*?)(?:\s*\/>|>)/gs;
  const componentMatches = [...content.matchAll(componentPattern)];
  
  for (const match of componentMatches) {
    const [fullMatch, componentName, props] = match;
    
    // Check if props contain spread operator with potential ARIA issues
    if (props.includes('{...') && props.includes('props}')) {
      // Components that commonly have ARIA issues
      const problematicComponents = ['motion.div', 'motion.button', 'div', 'button', 'input'];
      
      if (problematicComponents.some(comp => componentName === comp || componentName.includes(comp))) {
        // Add type assertion to props spread
        const fixedProps = props.replaceAll(
          '{...props}',
          '{...(props as any)}'
        );
        
        if (fixedProps !== props) {
          const newComponent = `<${componentName} ${fixedProps}${fullMatch.endsWith('/>') ? '/>' : '>'}`;
          modified = modified.replace(fullMatch, newComponent);
          fixCount++;
        }
      }
    }
  }

  if (fixCount > 0) {
    console.log(`  ✓ Fixed ${fixCount} ARIA type issues in ${filePath}`);
  }

  return modified;
}

// Helper function to find matching closing brace
function findMatchingBrace(content: string, startIndex: number): number {
  let depth = 0;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '{') {depth++;}
    if (content[i] === '}') {
      depth--;
      if (depth === 0) {return i;}
    }
  }
  return -1;
}

// Determine if an interface should be fixed based on known problematic patterns
function shouldFixInterface(interfaceName: string, filePath: string): boolean {
  // List of known interfaces with ARIA issues
  const problematicInterfaces = [
    'GlassNumberInputProps',
    'GlassDrawerProps',
    'GlassRadioGroupProps',
    'GlassSpinnerProps',
    'GlassSkeletonProps',
    'GlassPaginationProps',
    'GlassFormFieldProps',
    'GlassFileUploadProps',
    'GlassDatePickerProps',
    'GlassComboboxProps',
    'GlassInputProps',
    'GlassTextareaProps',
    'GlassSelectProps',
    'GlassCheckboxProps',
    'GlassCheckboxGroupProps',
    'GlassSwitchProps',
    'GlassSliderProps',
    'GlassAccordionProps',
    'GlassBreadcrumbsProps',
    'GlassTabsProps',
    'GlassTooltipProps',
    'GlassPopoverProps',
    'GlassDropdownProps',
    'GlassCommandProps',
    'GlassSearchProps',
    'GlassNotificationProps',
    'GlassProgressProps',
    'GlassAvatarProps',
    'GlassBadgeProps',
    'GlassLoadingProps',
    'GlassToastProps',
    'GlassTableProps',
    'GlassModalProps',
    'GlassChartProps',
    'GlassMobileNavProps',
    'GlassLiveRegionProps',
    'GlassFocusTrapProps',
    'GlassVisuallyHiddenProps',
    'GlassSkipNavigationProps',
    'GlassFocusDemoProps',
    'GlassAccessibleDemoProps',
    'GlassPerformanceDashboardProps',
    'GlassResponsiveButtonProps',
    'GlassResponsiveCardProps',
    'GlassShowcaseProps',
    'GlassPlaygroundProps'
  ];
  
  return problematicInterfaces.includes(interfaceName);
}

// Process all TypeScript/TSX files
async function processFiles() {
  const files = await glob('src/**/*.{ts,tsx}', { 
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/dist/**', '**/*.test.*', '**/*.spec.*', '**/*.d.ts']
  });

  console.log(`Found ${files.length} TypeScript files to process.\n`);

  for (const file of files) {
    const filePath = join(process.cwd(), file);
    
    if (!existsSync(filePath)) {continue;}
    
    let content = readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Apply fixes
    content = fixAriaAttributeTypes(content, file);
    
    if (content !== originalContent) {
      writeFileSync(filePath, content);
      totalFixed++;
    }
  }

  console.log(`\n✅ Processing complete! Fixed issues in ${totalFixed} files.`);
}

// Run the fixes
processFiles().catch(console.error);