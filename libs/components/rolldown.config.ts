import { defineConfig } from 'rolldown'
import { glob } from 'glob'
import { extname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Get all TypeScript/TSX files for entry points, excluding test/story files and CSS
const entries = glob.sync('src/**/*.{ts,tsx}', {
  cwd: __dirname,
  absolute: false,
  ignore: [
    '**/*.stories.*',
    '**/*.test.*',
    '**/*.spec.*',
    '**/__tests__/**',
    '**/tests/**',
    '**/examples/**',
    '**/demo/**',
    '**/playground/**',
    '**/glass-playground/**',
    '**/*liquid-glass-template*',
    '**/*.backup',
    '**/*.md',
    '**/*.mdx',
    '**/stories/**',
    '**/*.css'
  ]
}).reduce((acc, file) => {
  const name = relative('src', file.slice(0, file.length - extname(file).length))
  acc[name] = resolve(__dirname, file)
  return acc
}, {} as Record<string, string>)

export default defineConfig({
  input: entries,
  output: [
    {
      dir: '../../dist/libs/components',
      format: 'esm',
      entryFileNames: '[name].mjs',
      chunkFileNames: '_chunks/[name]-[hash].mjs',
      preserveModules: true,
      preserveModulesRoot: resolve(__dirname, 'src'),
      sourcemap: true,
    },
    {
      dir: '../../dist/libs/components/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: '_chunks/[name]-[hash].cjs',
      preserveModules: true,
      preserveModulesRoot: resolve(__dirname, 'src'),
      sourcemap: true,
    }
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    // Add peer dependencies
    /^@radix-ui/,
    'clsx',
    'framer-motion',
    'lucide-react',
    'tailwind-merge'
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': resolve(__dirname, 'src'),
      '@liquidify/components': resolve(__dirname, 'src/index.ts')
    }
  },
  // Enable tree-shaking and minification
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false
  },
  // Oxc minification
  minify: 'oxc',
  // TypeScript/React handling
  jsx: 'react-jsx',
  // Plugin configuration
  plugins: [
    // CSS extraction will be handled separately
  ],
  // Build optimizations
  experimentalCspNonce: undefined,
  logLevel: 'info'
})
