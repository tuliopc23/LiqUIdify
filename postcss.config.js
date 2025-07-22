import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcssPostcss from '@tailwindcss/postcss';

// Determine if we're in optimization mode
const isOptimized = 'true' === process.env.OPTIMIZE_CSS;

// Custom PostCSS plugin for Glass UI optimizations
const glassUIOptimizer = () => {
  return {
    postcssPlugin: 'postcss-glass-ui-optimizer',
    Once(root, { result }) {
      // Track used CSS custom properties
      const usedProperties = new Set();
      const propertyDeclarations = new Map();

      // Collect all custom property declarations
      root.walkDecls((decl) => {
        if (decl.prop.startsWith('--')) {
          propertyDeclarations.set(decl.prop, decl);
        }
      });

      // Track which custom properties are actually used
      root.walkDecls((decl) => {
        const matches = decl.value.matchAll(/var\((--[\w-]+)/g);
        for (const match of matches) {
          usedProperties.add(match[1]);
        }
      });

      // Remove unused custom properties
      for (const [prop, decl] of propertyDeclarations) {
        if (!usedProperties.has(prop) && !prop.includes('glass-')) {
          decl.remove();
        }
      }

      // Optimize backdrop-filter usage
      root.walkDecls('backdrop-filter', (decl) => {
        // Add will-change for better performance
        const rule = decl.parent;
        if (!rule.some(d => 'will-change' === d.prop)) {
          rule.append({
            prop: 'will-change',
            value: 'backdrop-filter'
          });
        }
      });

      // Add performance hints for glass effects
      root.walkRules((rule) => {
        if (rule.selector.includes('.glass-')) {
          let hasTransform = false;
          rule.walkDecls(decl => {
            if ('transform' === decl.prop) hasTransform = true;
          });
          
          if (!hasTransform) {
            rule.append({
              prop: 'transform',
              value: 'translateZ(0)'
            });
          }
        }
      });
    }
  };
};
glassUIOptimizer.postcss = true;

// Base configuration
const baseConfig = {
  plugins: [
    postcssImport(),
    tailwindcssPostcss(),
    autoprefixer(),
  ]
};

// Optimized configuration
const optimizedConfig = {
  plugins: [
    postcssImport(),
    tailwindcssPostcss(),
    glassUIOptimizer(),
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'color-functional-notation': true,
      },
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace'
      }
    }),
    autoprefixer({
      flexbox: 'no-2009',
      grid: 'autoplace'
    }),
    ...('production' === process.env.NODE_ENV ? [
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          reduceIdents: false,
          discardUnused: {
            fontFace: false,
            keyframes: false
          },
          zindex: false,
          cssDeclarationSorter: false,
          calc: {
            precision: 10
          }
        }]
      })
    ] : [])
  ]
};

export default isOptimized ? optimizedConfig : baseConfig;