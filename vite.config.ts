import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ 
      insertTypesEntry: true,
      exclude: [
        '**/*.test.*',
        '**/*.stories.*',
        'src/testing/**/*',
        'src/docs/**/*'
      ]
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LiquidUI',
      formats: ['es', 'umd'],
      fileName: (format) => `liquidui.${format}.js`
    },
    rollupOptions: {
      external: [
        'react', 
        'react-dom', 
        'framer-motion', 
        'lucide-react',
        '@radix-ui/react-slot',
        'clsx',
        'tailwind-merge'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
          'lucide-react': 'LucideReact',
          '@radix-ui/react-slot': 'RadixSlot',
          'clsx': 'clsx',
          'tailwind-merge': 'tailwindMerge'
        },
        // Preserve module structure for better tree-shaking
        preserveModules: false,
        // Export named exports for better compatibility
        exports: 'named'
      }
    },
    // Enable source maps for debugging
    sourcemap: true,
    // Clean dist folder before build
    emptyOutDir: true,
    // Target modern browsers for better performance
    target: 'es2018'
  }
});
