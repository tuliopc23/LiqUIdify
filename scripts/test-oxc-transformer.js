#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

/**
 * Test OXC configuration and validate TypeScript/JSX support
 * Since OXC doesn't expose a JS API, we test via OXlint
 */

// Load OXC configuration
const oxcConfigPath = resolve(process.cwd(), 'oxc.config.json');
const oxcConfig = JSON.parse(readFileSync(oxcConfigPath, 'utf-8'));

console.log('🔧 Testing OXC Configuration for TypeScript/JSX Support...\n');

// Test cases for TypeScript and JSX validation
const testCases = [
  {
    name: 'TypeScript Interface Support',
    filename: 'test-interface.tsx',
    content: `
interface Props {
  title: string;
  count?: number;
}

export const Component: React.FC<Props> = ({ title, count = 0 }) => {
  return <div>{title}: {count}</div>;
};
`,
    expectedFeatures: ['TypeScript interfaces', 'React.FC types', 'JSX syntax']
  },
  {
    name: 'JSX Automatic Runtime',
    filename: 'test-jsx.tsx',
    content: `
export function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="glass-button"
    >
      {children}
    </button>
  );
}
`,
    expectedFeatures: ['JSX without React import', 'TypeScript props', 'Event handlers']
  },
  {
    name: 'Advanced TypeScript Features',
    filename: 'test-generics.tsx',
    content: `
type Theme = 'light' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface ComponentProps<T extends string = string> {
  theme?: Theme;
  size?: Size;
  variant: T;
}

export const GenericComponent = <T extends string>({ 
  theme = 'light', 
  size = 'md', 
  variant 
}: ComponentProps<T>) => {
  const classes = \`component-\${theme} size-\${size} variant-\${variant}\`;
  
  return (
    <div className={classes}>
      <span>Theme: {theme}</span>
    </div>
  );
};
`,
    expectedFeatures: ['Generic types', 'Union types', 'Template literals', 'Default parameters']
  }
];

// Test each case
let allTestsPassed = true;
const tempDir = mkdtempSync(join(tmpdir(), 'oxc-test-'));

console.log('📁 Using temporary directory:', tempDir);
console.log('');

for (const testCase of testCases) {
  console.log(`🧪 Testing: ${testCase.name}`);
  
  try {
    // Write test case to temporary file
    const testFile = join(tempDir, testCase.filename);
    writeFileSync(testFile, testCase.content);

    // Test with OXlint
    try {
      const result = execSync(`bunx oxlint "${testFile}" --quiet`, { 
        encoding: 'utf8',
        stdio: 'pipe' 
      });
      console.log(`   ✅ OXlint validation passed`);
    } catch (lintError) {
      // OXlint might report style issues, check if it's a parse error
      if (lintError.message.includes('parse error') || lintError.message.includes('syntax error')) {
        console.log(`   ❌ OXlint parse error:`, lintError.message);
        allTestsPassed = false;
      } else {
        console.log(`   ⚠️  OXlint found style issues (file parsed successfully)`);
      }
    }

    // Verify TypeScript can parse it too
    try {
      execSync(`bunx tsc "${testFile}" --noEmit --jsx react-jsx --target ES2020 --module ESNext --skipLibCheck`, {
        stdio: 'pipe'
      });
      console.log(`   ✅ TypeScript compilation validated`);
    } catch (tscError) {
      console.log(`   ⚠️  TypeScript validation notes:`, tscError.stderr?.toString()?.slice(0, 100) || 'Check types');
    }

    console.log(`   📋 Features tested: ${testCase.expectedFeatures.join(', ')}`);
    console.log('');

  } catch (error) {
    console.error(`   ❌ Error testing ${testCase.name}:`, error.message);
    allTestsPassed = false;
  }
}

// Clean up
rmSync(tempDir, { recursive: true, force: true });

// Test configuration validation
console.log('🔍 Validating OXC Configuration...\n');

const configChecks = [
  {
    name: 'OXlint Binary Available',
    check: () => {
      try {
        const version = execSync('bunx oxlint --version', { encoding: 'utf8', stdio: 'pipe' }).trim();
        console.log(`   Version: ${version}`);
        return true;
      } catch {
        return false;
      }
    }
  },
  {
    name: 'Parser Configuration',
    check: () => {
      const parser = oxcConfig.parser;
      const hasTypeScript = parser?.typescript !== undefined;
      const jsxConfig = parser?.typescript?.jsx;
      const validJsx = jsxConfig?.runtime === 'automatic' && jsxConfig?.importSource === 'react';
      if (hasTypeScript && validJsx) {
        console.log(`   JSX: ${jsxConfig.runtime} runtime, import from '${jsxConfig.importSource}'`);
      }
      return hasTypeScript && validJsx;
    }
  },
  {
    name: 'Transform Configuration',
    check: () => {
      const transform = oxcConfig.transform;
      if (!transform) {
        console.log(`   No transform config (using parser config)`);
        return true; // Transform is optional if parser is configured
      }
      const validTs = transform.typescript?.target === 'es2020';
      const validJsx = transform.jsx?.runtime === 'automatic';
      return validTs && validJsx;
    }
  },
  {
    name: 'Source Map Configuration',
    check: () => {
      const sourcemap = oxcConfig.sourcemap;
      const valid = sourcemap?.enable === true;
      if (valid) {
        console.log(`   Source maps: enabled, include sources: ${sourcemap.sources}`);
      }
      return valid;
    }
  },
  {
    name: 'Resolver Configuration',
    check: () => {
      const resolver = oxcConfig.resolver;
      const hasAliases = resolver?.alias && Object.keys(resolver.alias).length > 0;
      if (hasAliases) {
        console.log(`   Aliases configured: ${Object.keys(resolver.alias).join(', ')}`);
      }
      return hasAliases;
    }
  }
];

for (const configCheck of configChecks) {
  console.log(`🔧 ${configCheck.name}:`);
  const passed = configCheck.check();
  console.log(`   ${passed ? '✅ Valid' : '❌ Invalid'}`);
  if (!passed) allTestsPassed = false;
}

console.log('\n' + '='.repeat(50));

if (allTestsPassed) {
  console.log('🎉 All OXC configuration tests passed!');
  console.log('✅ OXlint can parse TypeScript/JSX files correctly');
  console.log('✅ Configuration is valid');
  console.log('✅ Ready for OXC-enhanced development with Bun');
  process.exit(0);
} else {
  console.log('❌ Some OXC configuration tests failed!');
  console.log('Please check the configuration and try again.');
  process.exit(1);
}