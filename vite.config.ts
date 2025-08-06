import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative } from 'node:path';

export default defineConfig({
  build: {
    rolldown: true,
    minify: 'oxc',
    target: 'esnext',
    lib: {
      entry: 'libs/components/src/index.ts',
      name: 'liquidify',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const name = entryName.replace(/^src\//, '');
        const ext = format === 'es' ? '.mjs' : '.cjs';
        return `${name}${ext}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob.sync('libs/components/src/**/*.{ts,tsx}', { ignore: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'] }).map(file => [
          relative(
            'libs/components',
            file.slice(0, file.length - extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        preserveModules: true,
        preserveModulesRoot: 'libs/components/src',
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: 'libs/components/tsconfig.lib.json'
    })
  ],
});