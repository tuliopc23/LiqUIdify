#!/usr/bin/env node

/**
 * Tailwind Migration Validation Script
 * 
 * This script validates the Tailwind CSS migration by:
 * - Checking for remaining inline styles
 * - Validating Tailwind class usage
 * - Ensuring glass utilities are properly applied
 * - Verifying HIG-compliant radius usage
 * - Testing motion-safe prefixes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '../libs/components/src/components');
const STYLES_DIR = path.join(__dirname, '../libs/components/src/styles');
const STORYBOOK_DIR = path.join(__dirname, '../apps/storybook');

// Validation results
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  errors: []
};

// Utility functions
function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m',   // Red
    reset: '\x1b[0m'     // Reset
  };
  
  console.log(`${colors[type]}${message}${colors.reset}`);
}

function addError(message, file = null) {
  results.errors.push({ message, file });
  results.failed++;
  log(`❌ ${message}${file ? ` in ${file}` : ''}`, 'error');
}

function addWarning(message, file = null) {
  results.warnings++;
  log(`⚠️  ${message}${file ? ` in ${file}` : ''}`, 'warning');
}

function addSuccess(message) {
  results.passed++;
  log(`✅ ${message}`, 'success');
}

// Validation functions
function validateTailwindConfig() {
  log('\n🔧 Validating Tailwind Configuration...', 'info');
  
  const configPath = path.join(__dirname, '../tailwind.config.js');
  
  if (!fs.existsSync(configPath)) {
    addError('tailwind.config.js not found');
    return;
  }
  
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check for required glass utilities
  const requiredUtilities = [
    '.glass',
    '.glass-filter',
    '.glass-overlay',
    '.glass-specular',
    '.glass-content'
  ];
  
  requiredUtilities.forEach(utility => {
    if (configContent.includes(utility)) {
      addSuccess(`Glass utility ${utility} found in config`);
    } else {
      addError(`Missing glass utility ${utility} in config`);
    }
  });
  
  // Check for HIG-compliant radii
  const requiredRadii = ['lg-s', 'lg-m', 'lg-l'];
  requiredRadii.forEach(radius => {
    if (configContent.includes(`'${radius}'`)) {
      addSuccess(`HIG-compliant radius ${radius} found`);
    } else {
      addError(`Missing HIG-compliant radius ${radius}`);
    }
  });
  
  // Check for glass colors
  if (configContent.includes('glass: {')) {
    addSuccess('Glass color palette found');
  } else {
    addError('Glass color palette missing');
  }
}

function validateMainCSS() {
  log('\n🎨 Validating Main CSS File...', 'info');
  
  const cssPath = path.join(STYLES_DIR, 'index.css');
  
  if (!fs.existsSync(cssPath)) {
    addError('Main CSS file (index.css) not found');
    return;
  }
  
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Check for Tailwind import
  if (cssContent.includes('@import "tailwindcss"')) {
    addSuccess('Tailwind CSS import found');
  } else {
    addError('Missing Tailwind CSS import');
  }
  
  // Check for CSS variables
  const requiredVariables = [
    '--glass-bg',
    '--glass-hl',
    '--glass-text',
    '--glass-accent',
    '--radius-lg-s',
    '--radius-lg-m',
    '--radius-lg-l'
  ];
  
  requiredVariables.forEach(variable => {
    if (cssContent.includes(variable)) {
      addSuccess(`CSS variable ${variable} found`);
    } else {
      addError(`Missing CSS variable ${variable}`);
    }
  });
  
  // Check for motion-safe media query
  if (cssContent.includes('@media (prefers-reduced-motion: reduce)')) {
    addSuccess('Motion-safe media query found');
  } else {
    addError('Missing motion-safe media query');
  }
}

function validateComponents() {
  log('\n🧩 Validating Component Migration...', 'info');
  
  if (!fs.existsSync(COMPONENTS_DIR)) {
    addError('Components directory not found');
    return;
  }
  
  const componentDirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  let migratedComponents = 0;
  let totalComponents = componentDirs.length;
  
  componentDirs.forEach(componentDir => {
    const componentPath = path.join(COMPONENTS_DIR, componentDir);
    const files = fs.readdirSync(componentPath);
    
    // Find main component file
    const mainFile = files.find(file => 
      file.endsWith('.tsx') && !file.includes('.stories.') && !file.includes('.test.')
    );
    
    if (!mainFile) {
      addWarning(`No main component file found in ${componentDir}`);
      return;
    }
    
    const filePath = path.join(componentPath, mainFile);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for inline styles (should be removed)
    const inlineStyleMatches = content.match(/style\s*=\s*\{[^}]*\}/g);
    if (inlineStyleMatches && inlineStyleMatches.length > 0) {
      addError(`Inline styles found in ${componentDir}/${mainFile}`);
      inlineStyleMatches.forEach(match => {
        log(`   Found: ${match.substring(0, 50)}...`, 'error');
      });
    } else {
      addSuccess(`No inline styles in ${componentDir}`);
    }
    
    // Check for glass utilities usage
    const glassUtilities = ['glass', 'glass-filter', 'glass-overlay', 'glass-content'];
    let hasGlassUtilities = false;
    
    glassUtilities.forEach(utility => {
      if (content.includes(`"${utility}"`) || content.includes(`'${utility}'`)) {
        hasGlassUtilities = true;
      }
    });
    
    if (hasGlassUtilities) {
      addSuccess(`Glass utilities found in ${componentDir}`);
      migratedComponents++;
    } else {
      addWarning(`No glass utilities found in ${componentDir} (may not need them)`);
    }
    
    // Check for motion-safe prefixes
    const motionSafePattern = /motion-safe:(hover|active|focus):/g;
    const motionSafeMatches = content.match(motionSafePattern);
    
    if (motionSafeMatches && motionSafeMatches.length > 0) {
      addSuccess(`Motion-safe prefixes found in ${componentDir}`);
    } else {
      // Only warn if component has hover/active states
      if (content.includes('hover:') || content.includes('active:')) {
        addWarning(`Consider adding motion-safe prefixes in ${componentDir}`);
      }
    }
    
    // Check for HIG-compliant radius usage
    const higRadiusPattern = /radius-lg-(s|m|l)/g;
    const higRadiusMatches = content.match(higRadiusPattern);
    
    if (higRadiusMatches && higRadiusMatches.length > 0) {
      addSuccess(`HIG-compliant radius found in ${componentDir}`);
    } else if (content.includes('rounded-')) {
      addWarning(`Consider using HIG-compliant radius in ${componentDir}`);
    }
  });
  
  log(`\n📊 Migration Progress: ${migratedComponents}/${totalComponents} components migrated`, 'info');
}

function validateStorybook() {
  log('\n📚 Validating Storybook Configuration...', 'info');
  
  // Check main.ts
  const mainPath = path.join(STORYBOOK_DIR, '.storybook/main.ts');
  if (fs.existsSync(mainPath)) {
    const mainContent = fs.readFileSync(mainPath, 'utf8');
    
    if (mainContent.includes('storybook-addon-tailwindcss')) {
      addSuccess('Storybook Tailwind addon found in main.ts');
    } else {
      addError('Missing storybook-addon-tailwindcss in main.ts');
    }
  } else {
    addError('Storybook main.ts not found');
  }
  
  // Check preview.ts
  const previewPath = path.join(STORYBOOK_DIR, '.storybook/preview.ts');
  if (fs.existsSync(previewPath)) {
    const previewContent = fs.readFileSync(previewPath, 'utf8');
    
    if (previewContent.includes('styles/index.css')) {
      addSuccess('Main CSS import found in preview.ts');
    } else {
      addError('Missing main CSS import in preview.ts');
    }
    
    if (previewContent.includes('container flex flex-col gap-4')) {
      addSuccess('Tailwind decorator classes found in preview.ts');
    } else {
      addWarning('Consider using Tailwind classes in Storybook decorator');
    }
  } else {
    addError('Storybook preview.ts not found');
  }
}

function validatePackageJson() {
  log('\n📦 Validating Package Dependencies...', 'info');
  
  const packagePath = path.join(__dirname, '../package.json');
  if (!fs.existsSync(packagePath)) {
    addError('package.json not found');
    return;
  }
  
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const devDeps = packageContent.devDependencies || {};
  
  // Check for required dependencies
  const requiredDeps = {
    'tailwindcss': '^4.0.0-alpha.30',
    'storybook-addon-tailwindcss': '^2.0.0'
  };
  
  Object.entries(requiredDeps).forEach(([dep, version]) => {
    if (devDeps[dep]) {
      addSuccess(`Dependency ${dep} found`);
    } else {
      addError(`Missing dependency ${dep}`);
    }
  });
}

function runBuildTest() {
  log('\n🏗️  Running Build Test...', 'info');
  
  try {
    // Test Tailwind build
    execSync('npx tailwindcss --input libs/components/src/styles/index.css --output /tmp/tailwind-test.css', 
      { stdio: 'pipe' });
    addSuccess('Tailwind CSS builds successfully');
    
    // Clean up
    if (fs.existsSync('/tmp/tailwind-test.css')) {
      fs.unlinkSync('/tmp/tailwind-test.css');
    }
  } catch (error) {
    addError('Tailwind CSS build failed');
    log(error.message, 'error');
  }
  
  try {
    // Test TypeScript compilation
    execSync('npx tsc --noEmit --project tsconfig.json', { stdio: 'pipe' });
    addSuccess('TypeScript compilation successful');
  } catch (error) {
    addError('TypeScript compilation failed');
    log(error.message, 'error');
  }
}

function generateReport() {
  log('\n📋 Migration Validation Report', 'info');
  log('='.repeat(50), 'info');
  
  log(`✅ Passed: ${results.passed}`, 'success');
  log(`⚠️  Warnings: ${results.warnings}`, 'warning');
  log(`❌ Failed: ${results.failed}`, 'error');
  
  if (results.errors.length > 0) {
    log('\n🚨 Critical Issues:', 'error');
    results.errors.forEach((error, index) => {
      log(`${index + 1}. ${error.message}${error.file ? ` (${error.file})` : ''}`, 'error');
    });
  }
  
  const totalChecks = results.passed + results.failed;
  const successRate = totalChecks > 0 ? ((results.passed / totalChecks) * 100).toFixed(1) : 0;
  
  log(`\n📊 Success Rate: ${successRate}%`, successRate >= 90 ? 'success' : 'warning');
  
  if (results.failed === 0) {
    log('\n🎉 Migration validation completed successfully!', 'success');
    log('All components are ready for production deployment.', 'success');
  } else {
    log('\n⚠️  Migration validation found issues that need attention.', 'warning');
    log('Please address the critical issues before deployment.', 'warning');
  }
  
  // Save report to file
  const reportPath = path.join(__dirname, '../MIGRATION_VALIDATION_REPORT.md');
  const reportContent = `# Tailwind Migration Validation Report

Generated: ${new Date().toISOString()}

## Summary
- ✅ Passed: ${results.passed}
- ⚠️  Warnings: ${results.warnings}  
- ❌ Failed: ${results.failed}
- 📊 Success Rate: ${successRate}%

## Critical Issues
${results.errors.length > 0 ? 
  results.errors.map((error, index) => 
    `${index + 1}. ${error.message}${error.file ? ` (${error.file})` : ''}`
  ).join('\n') : 
  'None - All validations passed! 🎉'
}

## Next Steps
${results.failed === 0 ? 
  '✅ Migration is complete and ready for production deployment.' :
  '⚠️  Address the critical issues listed above before proceeding with deployment.'
}
`;
  
  fs.writeFileSync(reportPath, reportContent);
  log(`\n📄 Detailed report saved to: ${reportPath}`, 'info');
}

// Main execution
function main() {
  log('🚀 Starting Tailwind Migration Validation...', 'info');
  log('This will validate the migration from custom CSS to Tailwind CSS v4\n', 'info');
  
  validateTailwindConfig();
  validateMainCSS();
  validateComponents();
  validateStorybook();
  validatePackageJson();
  runBuildTest();
  
  generateReport();
  
  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run the validation
if (require.main === module) {
  main();
}

module.exports = {
  validateTailwindConfig,
  validateMainCSS,
  validateComponents,
  validateStorybook,
  validatePackageJson,
  runBuildTest
};
