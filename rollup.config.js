import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index-simple.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [
        '**/*.test.*',
        '**/*.stories.*',
        'src/components/glass-*', // Exclude problematic components for now
        'src/testing/**/*',
        'src/docs/**/*'
      ],
    }),
    terser(),
  ],
  external: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
};
