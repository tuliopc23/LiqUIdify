/**
 * Critical CSS Extraction Script
 * Extracts critical CSS for initial page render
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';

// Critical selectors that should be included
const CRITICAL_SELECTORS = [
  // Root and theme
  ':root',
  '[data-theme]',
  '[data-theme="dark"]',
  '[data-theme="light"]',
  
  // Base glass classes
  '.glass',
  '.glass-effect',
  '.glass-ui',
  '.glass-weak',
  '.glass-medium',
  '.glass-strong',
  '.glass-transition',
  
  // Core components (above the fold)
  '.glass-btn',
  '.glass-button',
  '.glass-card',
  '.glass-container',
  '.glass-heading',
  '.glass-text',
  
  // Critical layout
  '.glass-flex',
  '.glass-grid',
  
  // Essential states
  ':focus-visible',
  ':hover',
  ':active',
  ':disabled',
  
  // Critical media queries
  '@media (max-width: 768px)',
  '@media (prefers-color-scheme: dark)',
  '@media (prefers-reduced-motion: reduce)',
  '@media (prefers-contrast: high)',
];

async function extractCriticalCSS() {
  console.log('🎨 Extracting critical CSS for Glass UI...');
  
  // Ensure output directory exists
  const outputDir = join(process.cwd(), 'dist', 'critical');
  mkdirSync(outputDir, { recursive: true });
  
  // Process multiple CSS files
  const cssFiles = [
    'glass-core.css',
    'glass-animations.css',
    'glass-utilities.css',
    'glass-themes.css',
    'liquidui.css'
  ];
  
  let combinedCSS = '';
  
  // Read all CSS files
  for (const file of cssFiles) {
    const inputPath = join(process.cwd(), 'dist', file);
    if (existsSync(inputPath)) {
      combinedCSS += readFileSync(inputPath, 'utf8') + '\n';
    }
  }
  
  // Parse CSS
  const root = postcss.parse(combinedCSS);
  const criticalRoot = postcss.root();
  const criticalRules = new Set(); // Deduplicate rules
  
  // Extract critical rules
  root.walkRules((rule) => {
    const selector = rule.selector;
    
    // Check if rule matches critical selectors
    const isCritical = CRITICAL_SELECTORS.some(critical => {
      if (critical.startsWith('@')) {
        return false; // Handle at-rules separately
      }
      
      // Exact match or contains
      if (critical === selector || selector.includes(critical)) {
        return true;
      }
      
      // Handle wildcard selectors
      if (critical.includes('*')) {
        const pattern = critical.replace('*', '.*');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(selector);
      }
      
      return false;
    });
    
    if (isCritical) {
      const ruleString = rule.toString();
      if (!criticalRules.has(ruleString)) {
        criticalRules.add(ruleString);
        criticalRoot.append(rule.clone());
      }
    }
  });
  
  // Extract critical at-rules
  root.walkAtRules((atRule) => {
    const atRuleString = `@${atRule.name} ${atRule.params}`.trim();
    
    const isCritical = CRITICAL_SELECTORS.some(critical => {
      if (!critical.startsWith('@')) return false;
      
      // Check for exact match or contains
      return atRuleString === critical || atRuleString.includes(critical.substring(1));
    });
    
    if (isCritical) {
      // For media queries, only include critical rules inside
      if (atRule.name === 'media') {
        const criticalMediaRule = postcss.atRule({
          name: atRule.name,
          params: atRule.params
        });
        
        atRule.walkRules(rule => {
          const isInnerCritical = CRITICAL_SELECTORS.some(critical => {
            if (critical.startsWith('@')) return false;
            return rule.selector.includes(critical);
          });
          
          if (isInnerCritical) {
            criticalMediaRule.append(rule.clone());
          }
        });
        
        if (criticalMediaRule.nodes && criticalMediaRule.nodes.length > 0) {
          criticalRoot.append(criticalMediaRule);
        }
      } else {
        criticalRoot.append(atRule.clone());
      }
    }
  });
  
  // Add critical keyframes
  const criticalKeyframes = ['glass-ripple', 'glass-spring-in', 'glass-wave'];
  root.walkAtRules('keyframes', (atRule) => {
    if (criticalKeyframes.includes(atRule.params)) {
      criticalRoot.append(atRule.clone());
    }
  });
  
  // Process and optimize critical CSS
  const optimized = await postcss([
    // Custom optimization for critical CSS
    {
      postcssPlugin: 'optimize-critical',
      Once(root) {
        // Sort rules for better cascade
        const rules = [];
        const mediaQueries = [];
        
        root.walkRules(rule => {
          rules.push(rule);
          rule.remove();
        });
        
        root.walkAtRules('media', atRule => {
          mediaQueries.push(atRule);
          atRule.remove();
        });
        
        // Add rules back in optimized order
        rules.sort((a, b) => {
          // :root first
          if (a.selector.includes(':root')) return -1;
          if (b.selector.includes(':root')) return 1;
          // Then theme rules
          if (a.selector.includes('data-theme')) return -1;
          if (b.selector.includes('data-theme')) return 1;
          // Then base classes
          if (a.selector.startsWith('.glass')) return -1;
          if (b.selector.startsWith('.glass')) return 1;
          return 0;
        });
        
        rules.forEach(rule => root.append(rule));
        mediaQueries.forEach(mq => root.append(mq));
      }
    },
    // Minify
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: {
          transparent: false, // Keep rgba for glass effects
        },
        calc: {
          preserve: true, // Keep calc for dynamic values
        },
        zindex: false, // Don't normalize z-index
      }],
    }),
  ]).process(criticalRoot.toString(), { from: undefined });
  
  // Write different versions
  const outputPath = join(outputDir, 'glass-critical.css');
  const outputMinPath = join(outputDir, 'glass-critical.min.css');
  const outputInlinePath = join(outputDir, 'glass-critical-inline.html');
  
  // Unminified version for debugging
  writeFileSync(outputPath, criticalRoot.toString());
  
  // Minified version
  writeFileSync(outputMinPath, optimized.css);
  
  // Inline HTML template
  const inlineTemplate = `<!-- Glass UI Critical CSS - Inline this in <head> -->
<style id="glass-critical-css">
${optimized.css}
</style>

<!-- Theme Detection Script - Prevents FOUC -->
<script>
(function() {
  const theme = localStorage.getItem('glass-ui-theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
</script>`;
  
  writeFileSync(outputInlinePath, inlineTemplate);
  
  // Generate report
  const originalSize = Buffer.byteLength(combinedCSS, 'utf8');
  const criticalSize = Buffer.byteLength(optimized.css, 'utf8');
  const criticalUnminified = Buffer.byteLength(criticalRoot.toString(), 'utf8');
  const reduction = ((originalSize - criticalSize) / originalSize * 100).toFixed(2);
  
  const report = {
    timestamp: new Date().toISOString(),
    files: cssFiles,
    stats: {
      originalSize: originalSize,
      originalSizeKB: (originalSize / 1024).toFixed(2),
      criticalSize: criticalSize,
      criticalSizeKB: (criticalSize / 1024).toFixed(2),
      criticalUnminifiedKB: (criticalUnminified / 1024).toFixed(2),
      reduction: `${reduction}%`,
      ruleCount: criticalRules.size
    },
    selectors: CRITICAL_SELECTORS
  };
  
  writeFileSync(
    join(outputDir, 'critical-css-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log(`\n✅ Critical CSS extracted successfully!`);
  console.log(`📊 Stats:`);
  console.log(`   Original: ${report.stats.originalSizeKB}KB`);
  console.log(`   Critical: ${report.stats.criticalSizeKB}KB (minified)`);
  console.log(`   Critical: ${report.stats.criticalUnminifiedKB}KB (unminified)`);
  console.log(`   Reduction: ${report.stats.reduction}`);
  console.log(`   Rules: ${report.stats.ruleCount}`);
  console.log(`\n📁 Output files:`);
  console.log(`   ${outputPath}`);
  console.log(`   ${outputMinPath}`);
  console.log(`   ${outputInlinePath}`);
  console.log(`   ${join(outputDir, 'critical-css-report.json')}`);
}

// Add plugin declaration
if (!globalThis.postcssPlugins) {
  globalThis.postcssPlugins = new Set();
}
globalThis.postcssPlugins.add('optimize-critical');

extractCriticalCSS().catch(console.error);
