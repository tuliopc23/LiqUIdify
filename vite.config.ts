import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react({
      // Enable automatic JSX runtime for better tree-shaking
      jsxRuntime: 'automatic',
      // Optimize React for production builds
      jsxImportSource: 'react',
      // Enable development features only in development
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
    // Enable CSS modules and processing
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
        // Individual component entries for per-component imports
        'components/button': resolve(
          __dirname,
          'src/components/glass-button/index.ts'
        ),
        'components/card': resolve(
          __dirname,
          'src/components/glass-card/index.ts'
        ),
        'components/input': resolve(
          __dirname,
          'src/components/glass-input/index.ts'
        ),
        'components/modal': resolve(
          __dirname,
          'src/components/glass-modal/index.ts'
        ),
        'components/tooltip': resolve(
          __dirname,
          'src/components/glass-tooltip/index.ts'
        ),
        'components/tabs': resolve(
          __dirname,
          'src/components/glass-tabs/index.ts'
        ),
        tokens: resolve(__dirname, 'src/tokens/index.ts'),
        // Context provider entry
        providers: resolve(__dirname, 'src/providers/index.ts'),
        // Documentation wrapper components
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
      // More comprehensive external dependencies for React 19 compatibility
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime', // Critical for React 19
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
        'gsap',
        'tailwindcss-animate',
        // Add any other peer dependencies
        /^@radix-ui\//,
        /^react\//,
      ],
      output: [
        // ESM output with better tree-shaking
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          // Preserve modules for optimal tree-shaking
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          // Improved tree-shaking with side effects handling
          generatedCode: {
            preset: 'es2015',
            constBindings: true,
          },
        },
        // CommonJS output for backward compatibility
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
            gsap: 'gsap',
          },
        },
      ],
      // Tree-shaking optimization
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: id => {
          // CSS files have side effects
          return id.includes('.css') || id.includes('styles/');
        },
        // Aggressive pure annotation
        annotations: true,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    // Enable source maps for debugging
    sourcemap: true,
    // Clean dist folder before build
    emptyOutDir: true,
    // Target modern ESM for better tree-shaking
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    // Minification settings
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
