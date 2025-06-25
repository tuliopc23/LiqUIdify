const { mergeConfig } = require('vite')
const path = require('path')

const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  features: {
    buildStoriesJson: true
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '..', 'src')
        }
      },
      css: {
        postcss: './postcss.config.js',
      },
      build: {
        target: 'es2020',
        rollupOptions: {
          external: [],
        }
      },
      esbuild: {
        target: 'es2020'
      },
      define: {
        global: 'globalThis',
      }
    })
  },
  docs: {
    defaultName: 'Documentation'
  }
}

module.exports = config
