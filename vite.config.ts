import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["libs/components/src/**/*"],
      exclude: [
        "libs/components/src/**/*.test.*",
        "libs/components/src/**/*.spec.*",
      ],
      outDir: "dist/libs/components/types",
      entryRoot: "libs/components/src",
    }),
  ],
  resolve: {
    alias: {
      '@liquidify/components': resolve(__dirname, 'libs/components/src/index.ts'),
      '@': resolve(__dirname, 'libs/components/src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'libs/components/src/index.ts'),
      name: 'LiquidUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx/runtime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    target: 'es2020',
    minify: false,
    outDir: 'dist/libs/components',
  },
  esbuild: {
    target: 'es2020',
    jsx: 'automatic',
  },
  cacheDir: 'node_modules/.vite',
});