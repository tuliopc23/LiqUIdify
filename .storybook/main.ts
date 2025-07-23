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
