import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path, { dirname, join } from "path";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: [
    // Welcome Story - Shows first
    "../../../libs/components/src/stories/00-welcome.stories.@(js|jsx|ts|tsx|mdx)",
    
    // Production Components Only
    "../../../libs/components/src/components/glass-button-refactored/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-card-refactored/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-input/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-modal/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-badge/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-avatar/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-checkbox/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-select/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-accordion/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-tabs/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-alert/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-toast/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-table/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../libs/components/src/components/glass-dropdown/*.stories.@(js|jsx|ts|tsx|mdx)",
    
    // Design System Stories
    "../../../libs/components/src/stories/design-system/*.stories.@(js|jsx|ts|tsx|mdx)",
    
    // Exclude demo and experimental stories
    "!../../../libs/components/src/**/*.demo.stories.@(js|jsx|ts|tsx|mdx)",
    "!../../../libs/components/src/**/*.playground.stories.@(js|jsx|ts|tsx|mdx)",
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
      const basePath = path.resolve(__dirname, "../../../libs/components/src");
      console.log("🔧 Storybook Vite Config - Base path:", basePath);

      const aliasMap = {
        "@": basePath,
        "@liquidify/components": path.resolve(basePath, "index.ts"),
        "@/components": path.resolve(basePath, "components"),
        "@/core": path.resolve(basePath, "core"),
        "@/hooks": path.resolve(basePath, "hooks"),
        "@/styles": path.resolve(basePath, "styles"),
        "@/tokens": path.resolve(basePath, "tokens"),
        "@/types": path.resolve(basePath, "types"),
      };

      // Debug: verify paths exist
      Object.entries(aliasMap).forEach(([alias, resolvedPath]) => {
        const exists = require("fs").existsSync(resolvedPath);
        console.log(`📁 ${alias} -> ${resolvedPath} ${exists ? "✅" : "❌"}`);
      });

      return mergeConfig(config, {
        resolve: {
          alias: aliasMap,
        },
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
