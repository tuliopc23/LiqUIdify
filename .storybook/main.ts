/** @type { import('@storybook/react-vite').StorybookConfig } */
import { resolve } from "path";
import postcssConfig from "../postcss.config.js";

const config = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y", 
    "@storybook/addon-themes",
    "@storybook/addon-vitest"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    // Ensure CSS is properly handled
    config.css = config.css || {};
    config.css.postcss = postcssConfig;

    // Add alias for proper imports
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve(__dirname, "../src"),
      "@/tokens": resolve(__dirname, "../src/tokens/index"),
      "@/design-tokens": resolve(__dirname, "../src/tokens/design-tokens")
    };

    // ---------- Performance Optimisations ----------
    // Pre-bundle heavy deps so Vite and Storybook don’t spend time
    // re-scanning them on every launch.
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
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
    ];

    // Use Rollup manualChunks to avoid a single huge bundle in docs mode
    config.build = config.build || {};
    config.build.rollupOptions = config.build.rollupOptions || {};
    config.build.rollupOptions.output = {
      ...config.build.rollupOptions.output,
      manualChunks: {
        vendor: [
          "react",
          "react-dom",
          "framer-motion",
          "lucide-react",
          "clsx",
        ],
      },
    };

    // Disable source maps to shave a few hundred ms off build
    config.build.sourcemap = false;

    // Lower logging noise during Storybook build
    config.logLevel = "error";
    // ----------------------------------------------

    return config;
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation"
  }
};

export default config;
