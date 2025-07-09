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
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }
      : {}),
  },
};
