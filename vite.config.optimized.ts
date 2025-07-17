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
        // Core bundle - essential components only
        'core': resolve(__dirname, 'src/bundles/core.ts'),
        // Animation bundle - lazy-loaded animations
        'animations': resolve(__dirname, 'src/bundles/animations.ts'),
        // Advanced bundle - complex components
        'advanced': resolve(__dirname, 'src/bundles/advanced.ts'),
        // Specialized bundles
        'forms': resolve(__dirname, 'src/bundles/forms.ts'),
        'layout': resolve(__dirname, 'src/bundles/layout.ts'),
        'accessibility': resolve(__dirname, 'src/bundles/accessibility.ts'),
        'feedback': resolve(__dirname, 'src/bundles/feedback.ts'),
        'navigation': resolve(__dirname, 'src/bundles/navigation.ts'),
        'physics': resolve(__dirname, 'src/bundles/physics.ts'),
        'ssr': resolve(__dirname, 'src/bundles/ssr.ts'),
        // Individual component entries for maximum tree-shaking
        'components/button': resolve(__dirname, 'src/components/glass-button/index.ts'),
        'components/card': resolve(__dirname, 'src/components/glass-card/index.ts'),
        'components/input': resolve(__dirname, 'src/components/glass-input/index.ts'),
        'components/modal': resolve(__dirname, 'src/components/glass-modal/index.ts'),
        // Tokens and providers
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
      // Optimized manual chunking for better tree-shaking
      manualChunks: {
        // Vendor chunks
        'vendor-react': ['react', 'react-dom'],
        'vendor-radix': ['@radix-ui/react-slot', '@radix-ui/react-accordion', '@radix-ui/react-dialog'],
        'vendor-animation': ['framer-motion'],
        'vendor-gsap': ['gsap'],
        'vendor-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        // Core chunks
        'core-utils': ['src/lib/glass-utils.ts', 'src/utils/contrast-checker.ts'],
        'core-hooks': ['src/hooks/use-ssr-safe.ts'],
        // Animation chunks (lazy-loaded)
        'animation-physics': ['src/lib/glass-physics.ts', 'src/lib/glass-animations.ts'],
        'animation-components': ['src/components/glass-spinner', 'src/components/glass-loading'],
      },
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        // Mark heavy libraries as external for dynamic imports
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
        // ESM output optimized for tree-shaking
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          preserveModules: false, // Bundle for better compression
          exports: 'named',
          generatedCode: {
            preset: 'es2015',
            constBindings: true,
          },
          // Optimize for bundle size
          compact: true,
        },
        // CommonJS output
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
          compact: true,
        },
      ],
      // Aggressive tree-shaking
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: (id) => {
          // Only CSS files have side effects
          return id.includes('.css') || id.includes('styles/');
        },
        annotations: true,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
        // Remove unused imports
        pureExternalModules: true,
      },
    },
    sourcemap: false, // Disable for production builds
    emptyOutDir: true,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 3, // More aggressive compression
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    // Bundle size optimization
    chunkSizeWarningLimit: 15000, // 15KB warning for core bundle
    assetsInlineLimit: 4096, // Inline small assets
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'clsx',
      'tailwind-merge',
    ],
    exclude: [
      'gsap', // Lazy-loaded
      'framer-motion', // Lazy-loaded for animations bundle
    ],
  },
});