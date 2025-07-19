#!/usr/bin/env node

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

console.log('🚀 Migrating to OXC toolchain...\n');

// 1. Read current package.json
const packageJsonPath = resolve(projectRoot, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

console.log('📦 Current package analysis:');

// Check current linting tools
const legacyDevDeps = [
  'eslint',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint-config-prettier',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-react-refresh',
  'eslint-plugin-storybook'
];

const oxcDeps = [
  'oxc',
  'oxlint'
];

// Check what's currently installed
const currentLegacyDeps = legacyDevDeps.filter(dep => packageJson.devDependencies?.[dep]);
const currentOxcDeps = oxcDeps.filter(dep => packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]);

console.log('  Legacy linting tools:', currentLegacyDeps.length > 0 ? currentLegacyDeps.join(', ') : 'None');
console.log('  OXC tools:', currentOxcDeps.length > 0 ? currentOxcDeps.join(', ') : 'None');

// 2. Update package.json scripts to use OXC by default
console.log('\n🔧 Updating package.json scripts...');

const newScripts = {
  ...packageJson.scripts,
  // Replace ESLint with OXlint
  'lint': 'oxlint src',
  'lint:fix': 'oxlint src --fix',
  'lint:ci': 'oxlint src',
  // Keep legacy scripts for comparison/fallback
  'lint:eslint': packageJson.scripts.lint || 'eslint src/**/*.{ts,tsx} --no-warn-ignored',
  'lint:eslint:fix': packageJson.scripts['lint:fix'] || 'eslint src/**/*.{ts,tsx} --fix --no-warn-ignored',
  'lint:eslint:ci': packageJson.scripts['lint:ci'] || 'eslint src/**/*.{ts,tsx} --max-warnings 0 --no-warn-ignored',
  
  // Update build scripts to prefer OXC-enhanced builds
  'build:default': 'bun run build:rolldown',
  'build:legacy': packageJson.scripts.build || 'bun run clean && vite build && bun run build:css',
  
  // Add comprehensive OXC toolchain commands
  'oxc:all': 'bun run oxc:lint && bun run type-check',
  'ci:oxc': 'bun run oxc:all && bun run build:oxc && bun run test:ci',
  
  // Quality assurance with OXC
  'qa:oxc': 'bun run oxc:all && bun run test && bun run bundle:budget:check'
};

packageJson.scripts = newScripts;

// 3. Add lint-staged configuration for OXC
if (!packageJson['lint-staged']) {
  packageJson['lint-staged'] = {};
}

packageJson['lint-staged'] = {
  ...packageJson['lint-staged'],
  '*.{ts,tsx}': [
    'oxlint --fix',
    'prettier --write'
  ]
};

// 4. Write updated package.json
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log('  ✅ Updated package.json with OXC scripts');

// 5. Create a performance comparison script
const perfComparisonScript = `#!/usr/bin/env node

console.log('🏁 Performance Comparison: Legacy vs OXC\\n');

import { execSync } from 'child_process';

// Function to measure execution time
function measureTime(name, command) {
  console.log(\`⏱️  Running \${name}...\`);
  const start = performance.now();
  
  try {
    execSync(command, { stdio: 'pipe' });
    const end = performance.now();
    const duration = ((end - start) / 1000).toFixed(2);
    console.log(\`  ✅ \${name}: \${duration}s\`);
    return parseFloat(duration);
  } catch (error) {
    const end = performance.now();
    const duration = ((end - start) / 1000).toFixed(2);
    console.log(\`  ❌ \${name}: \${duration}s (with errors)\`);
    return parseFloat(duration);
  }
}

console.log('📊 Linting Performance:');
const eslintTime = measureTime('ESLint', 'bun run lint:eslint');
const oxlintTime = measureTime('OXlint', 'bun run lint');

console.log(\`\\n🚀 Performance Results:\`);
console.log(\`  ESLint: \${eslintTime}s\`);
console.log(\`  OXlint: \${oxlintTime}s\`);

if (oxlintTime < eslintTime) {
  const improvement = ((eslintTime - oxlintTime) / eslintTime * 100).toFixed(1);
  console.log(\`  🎉 OXlint is \${improvement}% faster!\`);
} else {
  console.log(\`  ⚠️  ESLint was faster this time\`);
}

console.log(\`\\n📈 Build Performance:\`);
const viteBuildTime = measureTime('Vite Build', 'bun run build:legacy');
const oxcBuildTime = measureTime('OXC Build', 'bun run build:oxc');

console.log(\`\\n🏗️  Build Results:\`);
console.log(\`  Vite: \${viteBuildTime}s\`);
console.log(\`  OXC: \${oxcBuildTime}s\`);

if (oxcBuildTime < viteBuildTime) {
  const improvement = ((viteBuildTime - oxcBuildTime) / viteBuildTime * 100).toFixed(1);
  console.log(\`  🎉 OXC build is \${improvement}% faster!\`);
} else {
  console.log(\`  ⚠️  Vite build was faster this time\`);
}
`;

writeFileSync(resolve(projectRoot, 'scripts/performance-comparison.js'), perfComparisonScript);
console.log('  ✅ Created performance comparison script');

// 6. Create a comprehensive validation script
const validationScript = `#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🔍 OXC Toolchain Validation\\n');

const tests = [
  {
    name: 'OXlint Configuration',
    command: 'oxlint --version',
    successMessage: 'OXlint is properly installed'
  },
  {
    name: 'TypeScript Compilation',
    command: 'tsc --noEmit',
    successMessage: 'TypeScript compilation successful'
  },
  {
    name: 'OXlint Analysis',
    command: 'oxlint src --quiet',
    successMessage: 'Code passes OXlint analysis'
  },
  {
    name: 'Build with OXC',
    command: 'bun run build:oxc',
    successMessage: 'OXC-enhanced build successful'
  }
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    console.log(\`⏳ Testing: \${test.name}\`);
    execSync(test.command, { stdio: 'pipe' });
    console.log(\`✅ \${test.successMessage}\`);
    passed++;
  } catch (error) {
    console.log(\`❌ \${test.name} failed\`);
    failed++;
  }
}

console.log(\`\\n📊 Validation Results:\`);
console.log(\`  ✅ Passed: \${passed}\`);
console.log(\`  ❌ Failed: \${failed}\`);

if (failed === 0) {
  console.log(\`\\n🎉 All tests passed! OXC toolchain is ready.\`);
  process.exit(0);
} else {
  console.log(\`\\n⚠️  Some tests failed. Please check the configuration.\`);
  process.exit(1);
}
`;

writeFileSync(resolve(projectRoot, 'scripts/validate-oxc.js'), validationScript);
console.log('  ✅ Created OXC validation script');

// 7. Show migration summary
console.log('\n🎯 Migration Summary:');
console.log('  📝 Updated package.json scripts to use OXC by default');
console.log('  🔧 Created lint-staged configuration for OXC');
console.log('  📊 Added performance comparison script');
console.log('  ✅ Created validation script');

console.log('\n📋 Next Steps:');
console.log('  1. Run: bun run oxc:all');
console.log('  2. Run: node scripts/validate-oxc.js');
console.log('  3. Run: node scripts/performance-comparison.js');
console.log('  4. Test the new build: bun run build:oxc');
console.log('  5. If everything works, update CI/CD to use: bun run ci:oxc');

console.log('\n💡 Legacy Commands (for rollback):');
console.log('  Lint: bun run lint:eslint');
console.log('  Build: bun run build:legacy');

console.log('\n🚀 OXC migration completed successfully!');
