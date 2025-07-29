import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "node:path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
    "../../../libs/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../libs/components/src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      // Add alias for proper imports in the monorepo
      resolve: {
        alias: {
          "@liquidify/components": resolve(
            __dirname,
            "../../../libs/components/src/index.ts",
          ),
          "@": resolve(__dirname, "../../../libs/components/src"),
          "@/tokens": resolve(
            __dirname,
            "../../../libs/components/src/tokens/index",
          ),
          "@/design-tokens": resolve(
            __dirname,
            "../../../libs/components/src/tokens/design-tokens",
          ),
        },
      },

      // ---------- Performance Optimisations ----------
      // Pre-bundle heavy deps so Vite and Storybook don't spend time
      // re-scanning them on every launch.
      optimizeDeps: {
        include: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "framer-motion",
          "clsx",
          "class-variance-authority",
          "tailwind-merge",
          "lucide-react",
          "@radix-ui/react-slot",
          "@radix-ui/react-accordion",
          "@radix-ui/react-dialog",
          "@radix-ui/react-radio-group",
          "@storybook/blocks",
        ],
      },

      // Use Rollup manualChunks to avoid a single huge bundle in docs mode
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: [
                "react",
                "react-dom",
                "framer-motion",
                "lucide-react",
                "clsx",
              ],
              radix: [
                "@radix-ui/react-slot",
                "@radix-ui/react-accordion",
                "@radix-ui/react-dialog",
                "@radix-ui/react-radio-group",
              ],
              storybook: [
                "@storybook/blocks",
                "@storybook/addon-docs",
                "@storybook/addon-a11y",
                "@storybook/addon-themes",
              ],
            },
          },
        },
        // Enable source maps for better debugging
        sourcemap: true,
        // Optimize for production
        minify: "terser",
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      },

      // Lower logging noise during Storybook build
      logLevel: "error",
      // ----------------------------------------------
    });
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (property) =>
        property.parent ? !/node_modules/.test(property.parent.fileName) : true,
    },
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
};

export default config;
