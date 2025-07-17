import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      include: /\.(tsx|ts|jsx|js)$/,
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      rollupTypes: true,
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
    },
  },
  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
  build: {
    lib: {
      entry: {
        // Main entry point
        index: resolve(__dirname, 'src/index.ts'),
        // Modular bundles
        'core': resolve(__dirname, 'src/bundles/core.ts'),
        'animations': resolve(__dirname, 'src/bundles/animations.ts'),
        'advanced': resolve(__dirname, 'src/bundles/advanced.ts'),
        'forms': resolve(__dirname, 'src/bundles/forms.ts'),
        'layout': resolve(__dirname, 'src/bundles/layout.ts'),
        'accessibility': resolve(__dirname, 'src/bundles/accessibility.ts'),
        'feedback': resolve(__dirname, 'src/bundles/feedback.ts'),
        'navigation': resolve(__dirname, 'src/bundles/navigation.ts'),
        'physics': resolve(__dirname, 'src/bundles/physics.ts'),
        'ssr': resolve(__dirname, 'src/bundles/ssr.ts'),
        // Individual component entries
        'components/button': resolve(__dirname, 'src/components/glass-button/index.ts'),
        'components/card': resolve(__dirname, 'src/components/glass-card/index.ts'),
        'components/input': resolve(__dirname, 'src/components/glass-input/index.ts'),
        'components/modal': resolve(__dirname, 'src/components/glass-modal/index.ts'),
        // Utilities
        'tokens': resolve(__dirname, 'src/tokens/index.ts'),
        'providers': resolve(__dirname, 'src/providers/index.ts'),
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
        'gsap',
        'lucide-react',
        '@radix-ui/react-slot',
        '@radix-ui/react-accordion',
        '@radix-ui/react-dialog',
        '@radix-ui/react-radio-group',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        /^@radix-ui\//,
        /^react\//,
      ],
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          generatedCode: {
            preset: 'es2015',
            constBindings: true,
          },
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          exports: 'named',
          interop: 'auto',
          generatedCode: {
            preset: 'es2015',
          },
        },
      ],
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: (id) => {
          return id.includes('.css') || id.includes('styles/');
        },
        annotations: true,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2,
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