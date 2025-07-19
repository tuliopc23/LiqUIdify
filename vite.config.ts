import { defineConfig } from 'rolldown-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readFileSync } from 'fs';

// Load OXC configuration
const oxcConfig = JSON.parse(readFileSync('./oxc.config.json', 'utf-8'));

export default defineConfig({
  // Configure rolldown-vite to use OXC transformer
  rolldown: {
    // Enable OXC for TypeScript and JSX transformation
    transform: oxcConfig.transform,
    parser: oxcConfig.parser,
    resolve: {
      alias: oxcConfig.resolver.alias,
      mainFields: oxcConfig.resolver.mainFields,
      conditionNames: oxcConfig.resolver.conditionNames,
      extensionAlias: oxcConfig.resolver.extensionAlias,
    },
    // Enable source maps from OXC
    sourcemap: oxcConfig.sourcemap.enable,
    // Optimize for production
    minify: process.env.NODE_ENV === 'production',
    target: 'es2020',
  },
  plugins: [
    react({
      // Configure React plugin to work with OXC
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      include: /\.(tsx|ts|jsx|js)$/,
      // Disable Babel to use OXC through rolldown-vite
      babel: false,
      // Use OXC's JSX transformation settings
      jsxPure: oxcConfig.transform.jsx.pure,
      fastRefresh: process.env.NODE_ENV === 'development',
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
      '@/tokens': resolve(__dirname, 'src/tokens/index'),
      '@/design-tokens': resolve(__dirname, 'src/tokens/design-tokens'),
    },
    // Enhanced module resolution with OXC compatibility
    mainFields: ['module', 'main', 'browser'],
    conditions: ['import', 'module', 'browser', 'default'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],
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
  // OXC-specific optimizations
  optimizeDeps: {
    // Force pre-bundling of these dependencies for better performance
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'framer-motion',
      'gsap',
      'clsx',
      'class-variance-authority',
      'tailwind-merge',
    ],
    // Use esbuild for compatibility while OXC integration matures
    esbuildOptions: {
      target: 'es2020',
      jsx: 'automatic',
      jsxImportSource: 'react',
    },
  },
  esbuild: {
    // Configure esbuild to work alongside OXC
    target: 'es2020',
    jsx: 'automatic',
    jsxImportSource: 'react',
    // Enable source maps for better debugging
    sourcemap: true,
    // Drop console statements in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
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
    // Enhanced Rollup options - optimized for potential Rolldown migration
    rollupOptions: {
      // External dependencies - these won't be bundled
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
        },
        // CommonJS output for backward compatibility
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          exports: 'named',
          interop: 'auto',
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
