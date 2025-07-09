import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        csfPluginOptions: null,
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [],
          },
        },
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: resolve(__dirname, '../vite.config.ts'),
      },
    },
  },
  docs: {
    defaultName: 'Documentation',
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: prop => {
        if (prop.parent) {
          return !/node_modules/.test(prop.parent.fileName);
        }
        return true;
      },
      savePropValueAsString: true,
      skipChildrenPropWithoutDoc: false,
    },
  },
  viteFinal: async (config) => {
    // Enhance path resolution for better import handling
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, '../src'),
      '@/tokens': resolve(__dirname, '../src/tokens/index'),
      '@/design-tokens': resolve(__dirname, '../src/tokens/design-tokens'),
    };
    
    // Optimize build performance
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.external = [
      ...((config.build.rollupOptions.external as string[]) || []),
      'react',
      'react-dom',
      'react/jsx-runtime',
    ];
    
    return config;
  },
};

export default config;
