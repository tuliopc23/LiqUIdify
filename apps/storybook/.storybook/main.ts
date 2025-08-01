import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
    stories: [
        "../../../libs/components/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
        "../../../libs/components/src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    ],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-links",
        "@storybook/addon-a11y",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {
            strictMode: true,
        },
    },
    core: {
        builder: "@storybook/builder-vite",
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
    viteFinal: async (config, {configType}) => {
        return mergeConfig(config, {
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "../../../libs/components/src"),
                    "@liquidify/components": path.resolve(__dirname, "../../../libs/components/src/index.ts"),
                    "@/components/*": path.resolve(__dirname, "../../../libs/components/src/components/*"),
                    "@/core/*": path.resolve(__dirname, "../../../libs/components/src/core/*"),
                    "@/hooks/*": path.resolve(__dirname, "../../../libs/components/src/hooks/*"),
                    "@/styles/*": path.resolve(__dirname, "../../../libs/components/src/styles/*"),
                    "@/tokens/*": path.resolve(__dirname, "../../../libs/components/src/tokens/*"),
                    "@/types/*": path.resolve(__dirname, "../../../libs/components/src/types/*"),
                },
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
                include: ["react", "react-dom", "@storybook/react"],
            },
            define: {
                "process.env.NODE_ENV": JSON.stringify(
                    configType === "PRODUCTION" ? "production" : "development",
                ),
            },
        });
    },
    managerHead: (head) => `
    ${ head }
    <meta name="theme-color" content="#3b82f6" />
    <meta name="description" content="LiqUIdify Component Library - Interactive component documentation and examples" />
    <meta property="og:title" content="LiqUIdify Storybook" />
    <meta property="og:description" content="Interactive documentation for LiqUIdify React component library" />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  `,
    previewHead: (head) => `
    ${ head }
    <style>
      .sb-show-main {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
