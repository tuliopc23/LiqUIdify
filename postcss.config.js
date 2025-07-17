export default {
  plugins: {
    // Tailwind v4 PostCSS plugin (already installed: @tailwindcss/postcss)
    '@tailwindcss/postcss': {},

    // PostCSS Import for handling CSS imports
    'postcss-import': {},

    // PostCSS Preset Env for modern CSS features and browser compatibility
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'color-functional-notation': true,
      },
    },

    // Autoprefixer for vendor prefixes
    autoprefixer: {},

    // CSSnano for production optimization (conditionally applied)
    ...(process.env.NODE_ENV === 'production'
      ? {
        cssnano: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              mergeLonghand: true,
              mergeRules: true,
              minifySelectors: true,
              reduceIdents: false, // Keep CSS custom properties
              zindex: false, // Don't optimize z-index values
              colormin: true,
              convertValues: true,
              discardDuplicates: true,
              discardEmpty: true,
              discardOverridden: true,
              normalizeCharset: true,
              normalizeDisplayValues: true,
              normalizePositions: true,
              normalizeRepeatStyle: true,
              normalizeString: true,
              normalizeTimingFunctions: true,
              normalizeUnicode: true,
              normalizeUrl: true,
              orderedValues: true,
              reduceInitial: true,
              reduceTransforms: true,
              svgo: true,
              uniqueSelectors: true,
            },
          ],
        },
        '@fullhuman/postcss-purgecss': {
          content: [
            './src/**/*.{js,jsx,ts,tsx}',
            './public/index.html',
            './dist/**/*.html',
          ],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          safelist: {
            standard: [
              /^glass-/,
              /^liquid-/,
              /^apple-/,
              /^animate-/,
              /^transition-/,
              /^duration-/,
              /^ease-/,
              /^backdrop-/,
              /^bg-gradient-/,
              /^from-/,
              /^to-/,
              /^via-/,
              /^focus:/,
              /^hover:/,
              /^active:/,
              /^disabled:/,
              /^group-/,
              /^peer-/,
            ],
            deep: [
              /glass$/,
              /liquid$/,
              /apple$/,
              /error-/,
              /loading-/,
              /success-/,
            ],
            greedy: [
              /data-/,
              /aria-/,
              /role-/,
              /\[data-/,
              /\[aria-/,
            ],
          },
          variables: true,
          keyframes: true,
        },
      }
      : {}),
  },
};
