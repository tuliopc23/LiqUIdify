import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path, { dirname, join } from "path";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: [
    // Curated: Only stable, visual component stories
    "../../../libs/components/src/components/glass-button-refactored/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-card-refactored/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs")
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {
      strictMode: true,
    },
  },
  core: {
    builder: getAbsolutePath("@storybook/builder-vite"),
    disableTelemetry: true,
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  staticDirs: ["../public"],
  docs: {
    defaultName: "Documentation",
  },
  viteFinal: async (config, { configType }) => {
    try {
      // Debug: log the resolved paths
      // Prefer consuming the built package entry to match real consumers
      const distBase = path.resolve(__dirname, "../../../dist/libs/components");
      const aliasMap: Record<string, string> = {
        "@liquidify/components/css": path.resolve(distBase, "components.css"),
        "@liquidify/components/styles": path.resolve(distBase, "components.css"),
        "@liquidify/components": path.resolve(distBase, "index.mjs"),
        "@": path.resolve(__dirname, "../../../libs/components/src"),
      };

      return mergeConfig(config, {
        resolve: {
          alias: aliasMap,
          dedupe: ["react", "react-dom"],
        },
        plugins: [tsconfigPaths()],
        build: {
          rollupOptions: {
            output: {
              manualChunks: (id: string) => {
                if (id.includes("node_modules")) {
                  if (id.includes("react") || id.includes("react-dom")) {
                    return "react-vendor";
                  }
                  if (id.includes("@storybook")) {
                    return "storybook-vendor";
                  }
                  return "vendor";
                }
                if (id.includes("stories")) {
                  return "stories";
                }
              },
            },
          },
          chunkSizeWarningLimit: 1000,
        },
        optimizeDeps: {
          include: ["react", "react-dom", "@storybook/react-vite"],
          exclude: [],
        },
        define: {
          "process.env.NODE_ENV": JSON.stringify(
            configType === "PRODUCTION" ? "production" : "development",
          ),
        },
      });
    } catch (error) {
      console.error("❌ Storybook Vite configuration error:", error);
      throw error;
    }
  },
  managerHead: (head) => `
    ${head}
    <meta name="theme-color" content="#3b82f6" />
    <meta name="description" content="LiqUIdify Component Library - Interactive component documentation and examples" />
    <meta property="og:title" content="LiqUIdify Storybook" />
    <meta property="og:description" content="Interactive documentation for LiqUIdify React component library" />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  `,
  previewHead: (head) => `
    ${head}
    <style>
      .sb-show-main {
        background: #ffffff;
      }

      .dark .sb-show-main {
        background: #1a1a1a;
      }

      .sb-show-main.sb-main-padded {
        padding: 1rem;
      }

      /* Performance optimization for animations */
      * {
        will-change: auto;
      }

      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    </style>
  `,
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
