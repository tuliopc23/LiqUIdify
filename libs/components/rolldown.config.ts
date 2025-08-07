import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      include: ['src/**/*'],
      exclude: [
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.spec.*',
        '**/__tests__/**',
        '**/tests/**',
        '**/examples/**',
        '**/demo/**',
        '**/playground/**',
        '**/glass-playground/**'
      ],
      outDir: '../../dist/libs/components',
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
      staticImport: true,
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LiquidifyComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    outDir: resolve(__dirname, '../../dist/libs/components'),
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@radix-ui/,
        'clsx',
        'framer-motion',
        'lucide-react',
        'tailwind-merge'
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: resolve(__dirname, 'src'),
        exports: 'named'
      }
    },
    minify: 'esbuild',
    sourcemap: true,
    emptyOutDir: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@liquidify/components': resolve(__dirname, 'src/index.ts')
    }
  },
  // Use Rolldown as Vite's bundler
  experimental: {
    renderBuiltUrl(filename) {
      return filename
    }
  }
})
