import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// Lite build configuration - minimal bundle without animations
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: {
        // Lite components only
        'lite/index': resolve(__dirname, 'src/lite/index.ts'),
        'lite/button': resolve(__dirname, 'src/lite/glass-button-lite.tsx'),
        'lite/card': resolve(__dirname, 'src/lite/glass-card-lite.tsx'),
        'lite/modal': resolve(__dirname, 'src/lite/glass-modal-lite.tsx'),
        'lite/core': resolve(__dirname, 'src/lite/core.ts'),
      },
      name: 'LiquidUILite',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'js' : format === 'cjs' ? 'cjs' : 'umd.js';
        return `${entryName}.${extension}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 3,
        ecma: 2020,
        module: true,
        toplevel: true,
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
    target: 'es2015',
    sourcemap: false, // No sourcemaps for lite build
    emptyOutDir: false, // Don't clean, we're building to specific directory
    outDir: 'dist',
  },
});