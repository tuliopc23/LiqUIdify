import { defineConfig } from 'rolldown-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readFileSync } from 'fs';

// Load OXC configuration for consistency
const oxcConfig = JSON.parse(readFileSync('./oxc.config.json', 'utf-8'));

export default defineConfig({
  // Configure rolldown-vite to use OXC transformer
  rolldown: {
    transform: oxcConfig.transform,
    parser: oxcConfig.parser,
    resolve: {
      alias: oxcConfig.resolver.alias,
      mainFields: oxcConfig.resolver.mainFields,
      conditionNames: oxcConfig.resolver.conditionNames,
    },
    sourcemap: oxcConfig.sourcemap.enable,
    minify: process.env.NODE_ENV === 'production',
    target: 'es2020',
  },

  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      include: /\.(tsx|ts|jsx|js)$/,
      babel: false, // Use OXC through rolldown-vite
      fastRefresh: process.env.NODE_ENV === 'development',
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      rollupTypes: false,
      bundledPackages: [],
      exclude: [
        '**/*.test.*',
        '**/*.stories.*',
        'src/testing/**/*',
        'src/docs/**/*',
        'src/test-utils/**/*',
        'src/tests/**/*',
        '**/*.spec.*',
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/tokens': resolve(__dirname, 'src/tokens/index'),
      '@/design-tokens': resolve(__dirname, 'src/tokens/design-tokens'),
    },
    mainFields: ['module', 'main', 'browser'],
    conditions: ['import', 'module', 'browser', 'default'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],
  },

  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'framer-motion',
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
      'lucide-react',
      '@radix-ui/react-slot',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-radio-group',
    ],
    rollupOptions: {},
  },

  esbuild: {
    target: 'es2020',
    jsx: 'automatic',
    jsxImportSource: 'react',
    sourcemap: true,
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  build: {
    lib: {
      entry: {
        // Main entries
        index: resolve(__dirname, 'src/index.ts'),
        'index-modular': resolve(__dirname, 'src/index-modular.ts'),

        // Bundle entries
        core: resolve(__dirname, 'src/bundles/core.ts'),
        animations: resolve(__dirname, 'src/bundles/animations.ts'),
        advanced: resolve(__dirname, 'src/bundles/advanced.ts'),
        forms: resolve(__dirname, 'src/bundles/forms.ts'),
        layout: resolve(__dirname, 'src/bundles/layout.ts'),
        accessibility: resolve(__dirname, 'src/bundles/accessibility.ts'),
        feedback: resolve(__dirname, 'src/bundles/feedback.ts'),
        navigation: resolve(__dirname, 'src/bundles/navigation.ts'),
        physics: resolve(__dirname, 'src/bundles/physics.ts'),
        ssr: resolve(__dirname, 'src/bundles/ssr.ts'),

        // Component entries
        'components/button': resolve(
          __dirname,
          'src/components/glass-button-refactored/index.ts'
        ),
        'components/card': resolve(
          __dirname,
          'src/components/glass-card-refactored/index.ts'
        ),
        'components/input': resolve(
          __dirname,
          'src/components/glass-input/index.ts'
        ),
        'components/modal': resolve(
          __dirname,
          'src/components/glass-modal/index.ts'
        ),

        // Utility entries
        tokens: resolve(__dirname, 'src/tokens/index.ts'),
        providers: resolve(__dirname, 'src/providers/index.ts'),
        documentation: resolve(__dirname, 'src/documentation/index.tsx'),
      },
      name: 'LiquidUI',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'mjs' : 'cjs';
        return `${entryName}.${extension}`;
      },
    },

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'framer-motion',
        'lucide-react',
        '@radix-ui/react-slot',
        '@radix-ui/react-accordion',
        '@radix-ui/react-dialog',
        '@radix-ui/react-radio-group',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'tailwindcss-animate',
        /^@radix-ui\//,
        /^react\//,
      ],
      output: [
        // ESM output
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
        },
        // CommonJS output
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          exports: 'named',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
            'react-dom/client': 'ReactDOMClient',
            'framer-motion': 'FramerMotion',
            'lucide-react': 'LucideReact',
            '@radix-ui/react-slot': 'RadixSlot',
            clsx: 'clsx',
            'tailwind-merge': 'tailwindMerge',
          },
        },
      ],
    },

    sourcemap: true,
    emptyOutDir: true,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    minify: 'terser',
    chunkSizeWarningLimit: 15,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 3,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
      },
    },
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
      format: {
        comments: false,
      },
    },
  },
});
