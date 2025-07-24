import type { RolldownOptions, OutputOptions } from 'rolldown';

// Shared externals
export const sharedExternals = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react-dom/client",
  "framer-motion",
  "lucide-react",
  "@radix-ui/react-slot",
  "@radix-ui/react-accordion",
  "@radix-ui/react-dialog",
  "@radix-ui/react-radio-group",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "tailwindcss-animate",
  "axe-core", // Exclude axe-core from production bundles
  /^@radix-ui\//,
  /^react\//,
];

// Shared globals for UMD builds
export const sharedGlobals = {
  react: "React",
  "react-dom": "ReactDOM",
  "react/jsx-runtime": "jsxRuntime",
  "react-dom/client": "ReactDOMClient",
  "framer-motion": "FramerMotion",
  "lucide-react": "LucideReact",
  "@radix-ui/react-slot": "RadixSlot",
  clsx: "clsx",
  "tailwind-merge": "tailwindMerge",
};

// Shared manual chunks configuration
export const sharedManualChunks = (id: string) => {
  if (id.includes('node_modules')) {
    if (id.includes('react') || id.includes('react-dom')) {
      return 'vendor-react';
    }
    if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('clsx')) {
      return 'vendor-ui';
    }
    if (id.includes('@radix-ui')) {
      return 'vendor-radix';
    }
  }
};

// Shared terser options
export const sharedTerserOptions = {
  compress: {
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ["console.log"],
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
};

// Shared output options
export const createOutputOptions = (format: 'es' | 'cjs' | 'umd'): OutputOptions => {
  const baseOptions: OutputOptions = {
    exports: 'named',
    manualChunks: sharedManualChunks,
    sourcemap: true,
  };

  if (format === 'es') {
    return {
      ...baseOptions,
      format: 'es',
      dir: 'dist/esm',
      entryFileNames: '[name].js',
      chunkFileNames: 'chunks/[name]-[hash].js',
      preserveModules: true,
      preserveModulesRoot: 'src',
    };
  }

  if (format === 'cjs') {
    return {
      ...baseOptions,
      format: 'cjs',
      dir: 'dist/cjs',
      entryFileNames: '[name].cjs',
      chunkFileNames: 'chunks/[name]-[hash].cjs',
      globals: sharedGlobals,
    };
  }

  // UMD format
  return {
    ...baseOptions,
    format: 'umd',
    dir: 'dist/umd',
    entryFileNames: '[name].umd.js',
    chunkFileNames: 'chunks/[name]-[hash].umd.js',
    name: 'LiquidUI',
    globals: sharedGlobals,
  };
};

// Shared Rolldown options
export const createRolldownOptions = (): Partial<RolldownOptions> => ({
  external: sharedExternals,
  output: [
    createOutputOptions('es'),
    createOutputOptions('cjs'),
  ],
});

// Legacy export alias for compatibility
export const sharedRollupOptions = createRolldownOptions();