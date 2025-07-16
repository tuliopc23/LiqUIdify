import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// Optimized build configuration for Phase 2
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
        'core/index': resolve(__dirname, 'src/core/index.ts'),
        // Component bundles - grouped by functionality
        'components/forms': resolve(__dirname, 'src/components/forms/index.ts'),
        'components/layout': resolve(__dirname, 'src/bundles/layout.ts'),
        'components/feedback': resolve(__dirname, 'src/bundles/feedback.ts'),
        'components/navigation': resolve(__dirname, 'src/bundles/navigation.ts'),
        // Feature bundles
        'features/animations': resolve(__dirname, 'src/bundles/animations.ts'),
        'features/physics': resolve(__dirname, 'src/bundles/physics.ts'),
        // Utility bundles
        'utils/accessibility': resolve(__dirname, 'src/bundles/accessibility.ts'),
        'utils/ssr': resolve(__dirname, 'src/bundles/ssr.ts'),
        // Individual component entries for maximum tree-shaking
        'components/button': resolve(__dirname, 'src/components/glass-button/index.ts'),
        'components/card': resolve(__dirname, 'src/components/glass-card/index.ts'),
        'components/input': resolve(__dirname, 'src/components/glass-input/index.ts'),
        'components/modal': resolve(__dirname, 'src/components/glass-modal/index.ts'),
        // Lite versions without animations
        'lite/button': resolve(__dirname, 'src/lite/glass-button-lite.tsx'),
        'lite/card': resolve(__dirname, 'src/lite/glass-card-lite.tsx'),
        'lite/modal': resolve(__dirname, 'src/lite/glass-modal-lite.tsx'),
        // Legacy bundle for backwards compatibility
        index: resolve(__dirname, 'src/index.ts'),
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
        // Make heavy dependencies external and optional
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/MorphSVGPlugin',
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
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].mjs',
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          preserveModules: false, // Bundle for better performance
          exports: 'named',
          generatedCode: {
            preset: 'es2015',
            constBindings: true,
          },
          // Manual chunks for optimal loading
          manualChunks(id) {
            // Core React dependencies
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // Animation libraries
            if (id.includes('gsap') || id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            // Utility libraries
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
              return 'vendor-utils';
            }
            // Glass physics engine
            if (id.includes('glass-physics')) {
              return 'glass-physics';
            }
            // Core components
            if (id.includes('glass-button') || id.includes('glass-card') || id.includes('glass-input')) {
              return 'glass-core';
            }
            // Form components
            if (id.includes('glass-checkbox') || id.includes('glass-switch') || id.includes('glass-select')) {
              return 'glass-forms';
            }
            // Layout components
            if (id.includes('glass-modal') || id.includes('glass-drawer') || id.includes('glass-tabs')) {
              return 'glass-layout';
            }
            // Feedback components
            if (id.includes('glass-toast') || id.includes('glass-notification') || id.includes('glass-loading')) {
              return 'glass-feedback';
            }
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
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        ecma: 2020,
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
        toplevel: true,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
    },
    // Performance optimizations
    chunkSizeWarningLimit: 50, // 50kb warning limit
    reportCompressedSize: true,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb
  },
  // Enable build optimizations
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['gsap', 'framer-motion'], // Exclude heavy deps from pre-bundling
  },
});