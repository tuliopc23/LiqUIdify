import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
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
        target: 'es2020'
      },
      esbuild: {
        target: 'es2020'
      }
    })
  },
  docs: {
    defaultName: 'Documentation'
  }
}

export default config