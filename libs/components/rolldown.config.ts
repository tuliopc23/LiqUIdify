import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import lightningcss from 'vite-plugin-lightningcss'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    lightningcss({
      browserslist: '>0.5%, last 2 versions, not dead, not IE 11',
      // Enable modern CSS features and optimizations
      cssModules: false,
      // Custom Lightning CSS options for glassmorphism effects
      lightningcssOptions: {
        minify: true,
        sourceMap: true,
        targets: {
          chrome: 95,
          firefox: 91,
          safari: 15,
          edge: 95
        },
        drafts: {
          customMedia: true,
          nesting: true
        },
        pseudoClasses: {
          hover: true,
          focus: true,
          focusVisible: true,
          active: true
        },
        // Preserve important CSS variables for glassmorphism
        unusedSymbols: ['glass', 'liquid', 'blur', 'backdrop']
      }
    }),
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
    cssCodeSplit: false,
    cssMinify: 'lightningcss',
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
