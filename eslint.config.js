import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
// import storybook from 'eslint-plugin-storybook'
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist',
      'storybook-static',
      'scripts/**',
      '**/*.stories.*',
      '**/*.test.*',
      'src/docs/**',
      'src/testing/**',
      'src/lib/glass-utils.test.ts',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...Object.fromEntries(
            Object.entries(globals.browser).filter(([key]) => key.trim() === key)
          ),
          ...globals.node,
          ...globals.es2020,
          React: 'readonly',
          HTMLElement: 'readonly',
          HTMLDivElement: 'readonly',
          HTMLButtonElement: 'readonly',
          HTMLInputElement: 'readonly',
          setTimeout: 'readonly',
          performance: 'readonly',
          requestIdleCallback: 'readonly',
          expect: 'readonly',
          jest: 'readonly',
          global: 'readonly',
          AudioWorkletGlobalScope: 'readonly',
          // Browser API types
          EventListener: 'readonly',
          AddEventListenerOptions: 'readonly',
          IntersectionObserverCallback: 'readonly',
          IntersectionObserverInit: 'readonly',
          ResizeObserverCallback: 'readonly',
          MutationCallback: 'readonly',
          MutationObserverInit: 'readonly',
          FrameRequestCallback: 'readonly',
          DOMHighResTimeStamp: 'readonly',
          HTMLElementTagNameMap: 'readonly',
          NodeListOf: 'readonly',
          NodeJS: 'readonly',
        },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // 'storybook': storybook
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-unused-vars': 'off',
      'no-undef': 'warn',
      'no-async-promise-executor': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // {
  //   files: ['**/*.stories.@(js|jsx|ts|tsx)'],
  //   rules: {
  //     ...storybook.configs.recommended.rules
  //   }
  // }
];
