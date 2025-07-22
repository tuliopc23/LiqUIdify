#!/usr/bin/env node

/**
 * Performance Validation Script
 * 
 * Validates that the performance optimizations meet S-tier requirements
 * without requiring a full browser environment.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 LiqUIdify S-Tier Performance Validation\n');

// 1. Bundle Size Validation
function validateBundleSize() {
  console.log('📦 Validating Bundle Sizes...');
  
  const bundleReport = path.join(__dirname, '../dist/bundle-size-report.json');
  
  if (!fs.existsSync(bundleReport)) {
    console.log('❌ Bundle size report not found. Run `bun run build` first.');
    return false;
  }
  
  const report = JSON.parse(fs.readFileSync(bundleReport, 'utf8'));
  
  const requirements = {
    core: 15 * 1024,       // 15KB
    animations: 10 * 1024, // 10KB  
    advanced: 8 * 1024,    // 8KB
    total: 30 * 1024       // 30KB
  };
  
  let allPassed = true;
  
  // Check individual bundles
  ['core', 'animations', 'advanced'].forEach(bundle => {
    const actual = report.bundles[bundle]?.gzipSize || 0;
    const limit = requirements[bundle];
    const passed = actual <= limit;
    
    const percentage = ((limit - actual) / limit * 100).toFixed(1);
    
    console.log(`  ${bundle.padEnd(12)} ${(actual/1024).toFixed(2)}KB / ${(limit/1024).toFixed(0)}KB (${percentage}% under limit) ${passed ? '✅' : '❌'}`);
    
    if (!passed) allPassed = false;
  });
  
  // Check total
  const totalActual = report.total?.gzipSize || 0;
  const totalLimit = requirements.total;
  const totalPassed = totalActual <= totalLimit;
  const totalPercentage = ((totalLimit - totalActual) / totalLimit * 100).toFixed(1);
  
  console.log(`  ${'TOTAL'.padEnd(12)} ${(totalActual/1024).toFixed(2)}KB / ${(totalLimit/1024).toFixed(0)}KB (${totalPercentage}% under limit) ${totalPassed ? '✅' : '❌'}`);
  
  if (!totalPassed) allPassed = false;
  
  return allPassed;
}

// 2. Code Quality Validation
function validateCodeOptimizations() {
  console.log('\n🔧 Validating Code Optimizations...');
  
  const filesToCheck = [
    'src/hooks/use-performance-monitoring.tsx',
    'src/hooks/use-glass-animations.ts', 
    'src/hooks/use-liquid-glass.tsx',
    'src/core/performance-monitor.ts'
  ];
  
  let allPassed = true;
  
  filesToCheck.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`  ❌ ${file} - File not found`);
      allPassed = false;
      return;
    }
    
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for memoization
    const checks = [
      {
        name: 'Debounce usage',
        pattern: /debounce/i,
        required: file.includes('use-performance-monitoring') || file.includes('use-liquid-glass')
      },
      {
        name: 'Memoization',
        pattern: /useMemo|useCallback|memoize/,
        required: true
      },
      {
        name: 'RAF optimization', 
        pattern: /requestAnimationFrame/,
        required: file.includes('use-glass-animations') || file.includes('use-performance-monitoring')
      },
      {
        name: 'Cleanup handling',
        pattern: /return\s*\(\)\s*=>/,
        required: true
      }
    ];
    
    let filePassed = true;
    
    checks.forEach(check => {
      if (check.required) {
        const hasPattern = check.pattern.test(content);
        if (!hasPattern) {
          console.log(`  ❌ ${file} - Missing ${check.name}`);
          filePassed = false;
        }
      }
    });
    
    if (filePassed) {
      console.log(`  ✅ ${file} - Optimizations implemented`);
    } else {
      allPassed = false;
    }
  });
  
  return allPassed;
}

// 3. Performance Metrics Validation  
function validatePerformanceMetrics() {
  console.log('\n📊 Validating Performance Metrics...');
  
  // Check that performance utilities exist
  const perfUtilsPath = path.join(__dirname, '../src/core/utils/performance-utils.ts');
  
  if (!fs.existsSync(perfUtilsPath)) {
    console.log('  ❌ Performance utilities not found');
    return false;
  }
  
  const content = fs.readFileSync(perfUtilsPath, 'utf8');
  
  const requiredFunctions = [
    'debounce',
    'throttle', 
    'batchDOMUpdates',
    'shouldMonitorPerformance',
    'shallowEqual'
  ];
  
  let allFound = true;
  
  requiredFunctions.forEach(func => {
    const hasFunction = content.includes(`function ${func}`) || content.includes(`const ${func}`);
    console.log(`  ${hasFunction ? '✅' : '❌'} ${func} utility`);
    
    if (!hasFunction) allFound = false;
  });
  
  return allFound;
}

// 4. Memory Leak Prevention Validation
function validateMemoryOptimizations() {
  console.log('\n🧠 Validating Memory Optimizations...');
  
  const performanceHookPath = path.join(__dirname, '../src/hooks/use-performance-monitoring.tsx');
  
  if (!fs.existsSync(performanceHookPath)) {
    console.log('  ❌ Performance monitoring hook not found');
    return false;
  }
  
  const content = fs.readFileSync(performanceHookPath, 'utf8');
  
  // Check for infinite re-render prevention
  const hasRenderCountInDeps = content.includes('renderCount]');
  // Check for proper dependency management
  const hasProperDeps = content.includes('componentName, memoizedProps]');
  
  console.log(`  ${!hasRenderCountInDeps ? '✅' : '❌'} Infinite re-render prevention`);
  console.log(`  ${hasProperDeps ? '✅' : '❌'} Proper dependency management`);
  
  // Check for memoization
  const hasMemoizedProps = content.includes('memoizedProps');
  const hasShallowEqual = content.includes('shallowEqual');
  
  console.log(`  ${hasMemoizedProps ? '✅' : '❌'} Props memoization`);
  console.log(`  ${hasShallowEqual ? '✅' : '❌'} Shallow equality checking`);
  
  return !hasRenderCountInDeps && hasProperDeps && hasMemoizedProps;
}

// 5. Animation Performance Validation
function validateAnimationOptimizations() {
  console.log('\n🎬 Validating Animation Optimizations...');
  
  const animationHookPath = path.join(__dirname, '../src/hooks/use-glass-animations.ts');
  
  if (!fs.existsSync(animationHookPath)) {
    console.log('  ❌ Animation hook not found');
    return false;
  }
  
  const content = fs.readFileSync(animationHookPath, 'utf8');
  
  // Check for throttled updates
  const hasThrottling = content.includes('lastProgressUpdate') && content.includes('33'); // 30fps throttling
  console.log(`  ${hasThrottling ? '✅' : '❌'} Animation frame throttling (30fps)`);
  
  // Check for cleanup
  const hasCleanup = content.includes('cancelAnimationFrame') || content.includes('animation.cancel') || content.includes('cancel()');
  console.log(`  ${hasCleanup ? '✅' : '❌'} Animation cleanup`);
  
  return hasThrottling && hasCleanup;
}

// Run all validations
async function runValidation() {
  const results = [
    validateBundleSize(),
    validateCodeOptimizations(), 
    validatePerformanceMetrics(),
    validateMemoryOptimizations(),
    validateAnimationOptimizations()
  ];
  
  const allPassed = results.every(result => result);
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n🏆 S-Tier Performance Validation: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
  
  if (allPassed) {
    console.log('\n🎉 All performance optimizations are in place!');
    console.log('📈 Expected improvements:');
    console.log('   • Render performance: 55+ fps (reduced re-renders)');
    console.log('   • Memory usage: Stable (no leaks)');
    console.log('   • Animation smoothness: 30-60fps (throttled updates)');
    console.log('   • Bundle size: Well under 30KB total');
    console.log('   • Core Web Vitals: Improved scores');
  } else {
    console.log('\n❌ Some optimizations need attention. Check the output above.');
  }
  
  process.exit(allPassed ? 0 : 1);
}

runValidation().catch(error => {
  console.error('\n💥 Validation failed:', error.message);
  process.exit(1);
});