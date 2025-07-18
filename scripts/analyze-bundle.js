#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { gzipSync } = require('zlib');

/**
 * S-tier Bundle Size Analyzer
 * Ensures all bundles meet the strict size requirements
 */

const BUNDLE_LIMITS = {
  'core.min.js': 15 * 1024, // 15KB
  'animations.min.js': 10 * 1024, // 10KB
  'advanced.min.js': 8 * 1024, // 8KB
  'total': 30 * 1024, // 30KB total
};

const DIST_DIR = path.join(__dirname, '..', 'dist');

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function getGzipSize(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const compressed = gzipSync(content);
    return compressed.length;
  } catch (error) {
    return 0;
  }
}

function formatSize(bytes) {
  const kb = bytes / 1024;
  return `${kb.toFixed(2)}KB`;
}

function analyzeBundle() {
  console.log('🔍 S-tier Bundle Size Analysis\n');
  console.log('Bundle            | Size      | Gzipped   | Limit     | Status');
  console.log('------------------|-----------|-----------|-----------|-------');

  let totalSize = 0;
  let totalGzipSize = 0;
  let allPassed = true;

  Object.entries(BUNDLE_LIMITS).forEach(([bundleName, limit]) => {
    if (bundleName === 'total') return;

    const filePath = path.join(DIST_DIR, bundleName);
    const size = getFileSize(filePath);
    const gzipSize = getGzipSize(filePath);
    
    totalSize += size;
    totalGzipSize += gzipSize;

    const passed = gzipSize <= limit;
    allPassed = allPassed && passed;

    console.log(
      `${bundleName.padEnd(17)} | ${formatSize(size).padEnd(9)} | ${formatSize(gzipSize).padEnd(9)} | ${formatSize(limit).padEnd(9)} | ${passed ? '✅' : '❌'}`
    );
  });

  console.log('------------------|-----------|-----------|-----------|-------');
  
  const totalPassed = totalGzipSize <= BUNDLE_LIMITS.total;
  allPassed = allPassed && totalPassed;
  
  console.log(
    `${'TOTAL'.padEnd(17)} | ${formatSize(totalSize).padEnd(9)} | ${formatSize(totalGzipSize).padEnd(9)} | ${formatSize(BUNDLE_LIMITS.total).padEnd(9)} | ${totalPassed ? '✅' : '❌'}`
  );

  console.log('\n📊 Bundle Composition Analysis\n');

  // Analyze what's taking up space
  const bundles = ['core.min.js', 'animations.min.js', 'advanced.min.js'];
  bundles.forEach(bundleName => {
    const filePath = path.join(DIST_DIR, bundleName);
    const mapPath = filePath + '.map';
    
    if (fs.existsSync(mapPath)) {
      try {
        const sourceMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
        const sources = sourceMap.sources || [];
        console.log(`\n${bundleName}:`);
        console.log(`  Components: ${sources.filter(s => s.includes('/components/')).length}`);
        console.log(`  Utilities: ${sources.filter(s => s.includes('/utils/') || s.includes('/lib/')).length}`);
        console.log(`  Hooks: ${sources.filter(s => s.includes('/hooks/')).length}`);
      } catch (e) {
        // Source map parsing failed
      }
    }
  });

  // Generate JSON report
  const report = {
    timestamp: new Date().toISOString(),
    bundles: {
      core: {
        size: getFileSize(path.join(DIST_DIR, 'core.min.js')),
        gzipSize: getGzipSize(path.join(DIST_DIR, 'core.min.js')),
        limit: BUNDLE_LIMITS['core.min.js'],
      },
      animations: {
        size: getFileSize(path.join(DIST_DIR, 'animations.min.js')),
        gzipSize: getGzipSize(path.join(DIST_DIR, 'animations.min.js')),
        limit: BUNDLE_LIMITS['animations.min.js'],
      },
      advanced: {
        size: getFileSize(path.join(DIST_DIR, 'advanced.min.js')),
        gzipSize: getGzipSize(path.join(DIST_DIR, 'advanced.min.js')),
        limit: BUNDLE_LIMITS['advanced.min.js'],
      },
    },
    total: {
      size: totalSize,
      gzipSize: totalGzipSize,
      limit: BUNDLE_LIMITS.total,
    },
    passed: allPassed,
  };

  fs.writeFileSync(
    path.join(DIST_DIR, 'bundle-size-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n📄 Report saved to: dist/bundle-size-report.json');

  if (!allPassed) {
    console.error('\n❌ Bundle size limits exceeded! S-tier requirements not met.');
    process.exit(1);
  } else {
    console.log('\n✅ All bundles meet S-tier size requirements!');
  }
}

// Run analysis
analyzeBundle();