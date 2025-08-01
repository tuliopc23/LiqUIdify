import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { compression } from "vite-plugin-compression2";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

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
          "libs/components/src/components/glass-playground/**",
        ],
        outDir: "dist/libs/components",
        entryRoot: "libs/components/src",
        skipDiagnostics: false,
        staticImport: true,
        rollupTypes: isProduction,
        // Add TypeScript compiler options for better type checking
        compilerOptions: {
          strict: true,
          noImplicitAny: true,
          strictNullChecks: true,
          strictFunctionTypes: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
        },
      }),
      // Bundle analyzer in production
      isProduction &&
        visualizer({
          filename: "reports/bundle/stats.html",
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
      // Gzip compression for analysis
      isProduction &&
        compression({
          algorithm: "gzip",
          exclude: [/\.(br)$/, /\.(gz)$/],
          deleteOriginalAssets: false,
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@liquidify/components": resolve("libs/components/src/index.ts"),
        "@": resolve("libs/components/src"),
        "@/components/*": resolve("libs/components/src/components/*"),
        "@/core/*": resolve("libs/components/src/core/*"),
        "@/hooks/*": resolve("libs/components/src/hooks/*"),
        "@/styles/*": resolve("libs/components/src/styles/*"),
        "@/tokens/*": resolve("libs/components/src/tokens/*"),
        "@/types/*": resolve("libs/components/src/types/*"),
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
          "data-display": resolve(
            "libs/components/src/bundles/data-display.ts",
          ),
          accessibility: resolve(
            "libs/components/src/bundles/accessibility.ts",
          ),
          advanced: resolve("libs/components/src/bundles/advanced.ts"),
          animations: resolve("libs/components/src/bundles/animations.ts"),
          physics: resolve("libs/components/src/bundles/physics.ts"),
          ssr: resolve("libs/components/src/bundles/ssr.ts"),
          providers: resolve("libs/components/src/bundles/providers.ts"),
          tokens: resolve("libs/components/src/bundles/tokens.ts"),
          // Individual component entries
          "components/button": resolve(
            "libs/components/src/components/glass-button-refactored/index.ts",
          ),
          "components/card": resolve(
            "libs/components/src/components/glass-card-refactored/index.ts",
          ),
          "components/modal": resolve(
            "libs/components/src/components/glass-modal/index.ts",
          ),
          "components/input": resolve(
            "libs/components/src/components/glass-input/index.ts",
          ),
          "components/avatar": resolve(
            "libs/components/src/components/glass-avatar/index.ts",
          ),
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
          // CommonJS compatibility
          interop: "auto",
          esModule: false,
          // Globals for UMD builds
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "react/jsx-runtime",
          },
          // Asset naming
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "liquidui.css";
            }
            return assetInfo.name;
          },
          // Manual chunks for optimal splitting
          manualChunks: (id) => {
            // Handle manual chunks dynamically
            if (id.includes("/utils/") && !id.includes("node_modules")) {
              return "utils";
            }
            if (id.includes("/hooks/") && !id.includes("node_modules")) {
              return "hooks";
            }
            if (id.includes("/core/glass/") && !id.includes("node_modules")) {
              return "core-glass";
            }
            // Default behavior
            return undefined;
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
      sourcemap: isProduction ? "hidden" : true,
      // Empty output directory
      emptyOutDir: true,
      // Build target
      target: "es2021",
      // Minification
      minify: isProduction ? "terser" : false,
      terserOptions: isProduction
        ? {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log", "console.info", "console.debug"],
              passes: 2,
            },
            mangle: {
              safari10: true,
            },
            format: {
              comments: false,
              ascii_only: true,
            },
          }
        : undefined,
      // Output directory
      outDir: "dist/libs/components",
      // Chunk size warnings
      chunkSizeWarningLimit: 30,
      // CSS code splitting
      cssCodeSplit: false,
      // CSS minification
      cssMinify: isProduction,
      // Asset inlining threshold
      assetsInlineLimit: 4096,
      // Report compressed size
      reportCompressedSize: isProduction,
    },
    esbuild: {
      target: "es2021",
      jsx: "automatic",
      // Remove comments in production
      legalComments: isProduction ? "none" : "inline",
      // Pure functions for tree shaking
      pure: isProduction
        ? ["console.log", "console.info", "console.debug"]
        : [],
      // Drop debugger statements
      drop: isProduction ? ["debugger"] : [],
    },
    css: {
      // CSS modules
      modules: {
        localsConvention: "camelCase",
        generateScopedName: isProduction
          ? "[hash:base64:5]"
          : "[name]__[local]__[hash:base64:5]",
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
          // Remove the import that doesn't exist
          additionalData: "",
        },
      },
    },
    // Performance optimizations
    optimizeDeps: {
      include: ["react", "react-dom"],
      exclude: ["@liquidify/components"],
      esbuildOptions: {
        target: "es2021",
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
