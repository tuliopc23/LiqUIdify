import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

// Custom PostCSS plugin for Glass UI optimizations
const glassUIOptimizer = () => {
  return {
    postcssPlugin: 'postcss-glass-ui-optimizer',
    Once(root, { result }) {
      // Track used CSS custom properties
      const usedProperties = new Set();
      const propertyDeclarations = new Map();
      
      // First pass: collect all custom property declarations
      root.walkDecls((decl) => {
        if (decl.prop.startsWith('--')) {
          propertyDeclarations.set(decl.prop, decl);
        }
      });
      
      // Second pass: track used properties
      root.walkDecls((decl) => {
        // Check for var() usage
        const matches = decl.value.match(/var\((--[^,)]+)/g);
        if (matches) {
          matches.forEach(match => {
            const prop = match.replace('var(', '');
            usedProperties.add(prop);
          });
        }
      });
      
      // Remove unused custom properties
      propertyDeclarations.forEach((decl, prop) => {
        if (!usedProperties.has(prop) && !prop.includes('glass-')) {
          decl.remove();
        }
      });
      
      // Log optimization stats
      console.log(`Glass UI CSS Optimization:
        - Total custom properties: ${propertyDeclarations.size}
        - Used properties: ${usedProperties.size}
        - Removed: ${propertyDeclarations.size - usedProperties.size}
      `);
    }
  };
};
glassUIOptimizer.postcss = true;

// Critical CSS extractor
const extractCriticalCSS = () => {
  return {
    postcssPlugin: 'postcss-extract-critical',
    Once(root, { result }) {
      const criticalSelectors = [
        '.glass',
        '.glass-btn',
        '.glass-card',
        '.glass-container',
        '.glass-heading',
        '.glass-text',
        ':root',
        '[data-theme="dark"]'
      ];
      
      const criticalRules = [];
      
      root.walkRules((rule) => {
        if (criticalSelectors.some(selector => rule.selector.includes(selector))) {
          criticalRules.push(rule.clone());
        }
      });
      
      // Write critical CSS to separate file
      if (criticalRules.length > 0) {
        const criticalCSS = criticalRules.map(rule => rule.toString()).join('\n');
        result.criticalCSS = criticalCSS;
      }
    }
  };
};
extractCriticalCSS.postcss = true;

// Split CSS into chunks
const splitCSSChunks = () => {
  return {
    postcssPlugin: 'postcss-split-chunks',
    Once(root, { result }) {
      const chunks = {
        core: [],
        animations: [],
        utilities: [],
        themes: []
      };
      
      root.walkRules((rule) => {
        if (rule.selector.includes('animation') || 
            rule.selector.includes('keyframes') ||
            rule.selector.includes('transition')) {
          chunks.animations.push(rule);
        } else if (rule.selector.includes('theme') || 
                   rule.selector.includes('data-theme')) {
          chunks.themes.push(rule);
        } else if (rule.selector.match(/\.(glass-[a-z]+-[a-z]+)/)) {
          chunks.utilities.push(rule);
        } else {
          chunks.core.push(rule);
        }
      });
      
      result.chunks = chunks;
    }
  };
};
splitCSSChunks.postcss = true;

export default {
  plugins: [
    // Import handling
    postcssImport({
      // Combine duplicated imports
      skipDuplicates: true
    }),
    
    // Modern CSS features
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'custom-selectors': true,
        'is-pseudo-class': true,
        'focus-visible-pseudo-class': true,
        'focus-within-pseudo-class': true
      },
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace'
      }
    }),
    
    // Glass UI specific optimizations
    glassUIOptimizer(),
    extractCriticalCSS(),
    splitCSSChunks(),
    
    // Browser compatibility
    autoprefixer({
      cascade: false
    }),
    
    // Minification (production only)
    process.env.NODE_ENV === 'production' && cssnano({
      preset: ['advanced', {
        // Optimization settings
        discardComments: {
          removeAll: true
        },
        reduceIdents: true,
        mergeIdents: true,
        mergeRules: true,
        minifySelectors: true,
        minifyFontValues: true,
        normalizeWhitespace: true,
        
        // Glass UI specific
        colormin: {
          // Preserve rgba for glass effects
          transparent: false
        },
        calc: {
          // Preserve calc for dynamic values
          preserve: true
        },
        zindex: {
          // Don't normalize z-index (breaks layering)
          normalizeZindex: false
        }
      }]
    })
  ].filter(Boolean)
};