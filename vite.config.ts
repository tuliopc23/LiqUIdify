import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { compression } from 'vite-plugin-compression2';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        include: ["libs/components/src/**/*"],
        exclude: [
          "libs/components/src/**/*.test.*",
          "libs/components/src/**/*.spec.*",
          "libs/components/src/**/*.stories.*",
        ],
        outDir: "dist/libs/components",
        entryRoot: "libs/components/src",
        skipDiagnostics: true,
        staticImport: true,
        rollupTypes: isProduction,
      }),
      // Bundle analyzer in production
      isProduction && visualizer({
        filename: 'reports/bundle/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      // Gzip compression for analysis
      isProduction && compression({
        algorithm: 'gzip',
        exclude: [/\.(br)$/, /\.(gz)$/],
        deleteOriginalAssets: false,
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@liquidify/components": resolve("libs/components/src/index.ts"),
        "@": resolve("libs/components/src"),
      },
    },
    build: {
      lib: {
        entry: {
          // Main entry
          index: resolve("libs/components/src/index.ts"),
          // Bundle entries
          core: resolve("libs/components/src/bundles/core.ts"),
          forms: resolve("libs/components/src/bundles/forms.ts"),
          navigation: resolve("libs/components/src/bundles/navigation.ts"),
          feedback: resolve("libs/components/src/bundles/feedback.ts"),
          layout: resolve("libs/components/src/bundles/layout.ts"),
          "data-display": resolve("libs/components/src/bundles/data-display.ts"),
          accessibility: resolve("libs/components/src/bundles/accessibility.ts"),
          // Individual component entries
          "components/button": resolve("libs/components/src/components/glass-button-refactored/index.ts"),
          "components/card": resolve("libs/components/src/components/glass-card-refactored/index.ts"),
          "components/modal": resolve("libs/components/src/components/glass-modal/index.ts"),
          "components/input": resolve("libs/components/src/components/glass-input/index.ts"),
        },
        name: "LiqUIdify",
        formats: ["es", "cjs"],
        fileName: (format, entryName) => {
          const ext = format === "es" ? "mjs" : "cjs";
          if (format === "cjs") {
            return `cjs/${entryName}.${ext}`;
          }
          return `${entryName}.${ext}`;
        },
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          // Preserve module structure
          preserveModules: false,
          // Exports
          exports: "named",
          // Globals for UMD builds
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "react/jsx-runtime",
          },
          // Asset naming
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'liquidui.css';
            }
            return assetInfo.name;
          },
          // Manual chunks for optimal splitting
          manualChunks: {
            'utils': ['libs/components/src/utils/index.ts'],
            'hooks': ['libs/components/src/hooks/index.ts'],
            'core/glass': ['libs/components/src/core/glass/unified-glass-system.tsx'],
          },
        },
        // Tree shaking
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
      // Source maps for debugging
      sourcemap: isProduction ? 'hidden' : true,
      // Empty output directory
      emptyOutDir: true,
      // Build target
      target: "es2020",
      // Minification
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
          ascii_only: true,
        },
      } : undefined,
      // Output directory
      outDir: "dist/libs/components",
      // Chunk size warnings
      chunkSizeWarningLimit: 30,
      // CSS code splitting
      cssCodeSplit: true,
      // CSS minification
      cssMinify: isProduction ? 'lightningcss' : false,
      // Asset inlining threshold
      assetsInlineLimit: 4096,
      // Report compressed size
      reportCompressedSize: isProduction,
    },
    esbuild: {
      target: "es2020",
      jsx: "automatic",
      // Remove comments in production
      legalComments: isProduction ? 'none' : 'inline',
      // Pure functions for tree shaking
      pure: isProduction ? ['console.log', 'console.info', 'console.debug'] : [],
      // Drop debugger statements
      drop: isProduction ? ['debugger'] : [],
    },
    css: {
      // CSS modules
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: isProduction 
          ? '[hash:base64:5]' 
          : '[name]__[local]__[hash:base64:5]',
      },
      // PostCSS config
      postcss: {
        plugins: [
          // Add autoprefixer and other PostCSS plugins as needed
        ],
      },
      // Preprocessor options
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
    // Performance optimizations
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@liquidify/components'],
      esbuildOptions: {
        target: 'es2020',
      },
    },
    // Server config for development
    server: {
      port: 3000,
      strictPort: false,
      open: true,
    },
    // Preview config
    preview: {
      port: 4173,
      strictPort: false,
    },
    // Define global constants
    define: {
      __DEV__: !isProduction,
      __PROD__: isProduction,
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    // Cache directory
    cacheDir: "node_modules/.vite",
  };
});