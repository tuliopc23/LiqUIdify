import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { PRODUCTION_COMPONENTS } from "./production-stories.config.js";

// ---------------------------------------------------------------------------
// ESM helpers ---------------------------------------------------------------
// ---------------------------------------------------------------------------
// Storybook executes this file in Node ESM context
const baseDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Determine the current Storybook build mode.
 * Storybook passes NODE_ENV=production during `storybook build`
 * and NODE_ENV=development during `storybook dev`.
 */
const isProductionBuild = process.env.NODE_ENV === "production";

/**
 * Build story globs for the production whitelist.
 * We flatten all component lists from PRODUCTION_COMPONENTS and
 * create a glob per component folder.
 */
function buildProductionStoryGlobs() {
  const basePath = "../../../libs/components/src/components";

  const flatList = Object.values(PRODUCTION_COMPONENTS).flat();

  return flatList.map(
    (componentName) =>
      `${basePath}/${componentName}/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  );
}

const config = {
  stories: isProductionBuild
    ? buildProductionStoryGlobs()
    : [
        // Development: include every story so contributors can preview work-in-progress components.
        "../../../libs/components/src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
      ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
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
  viteFinal: async (config, { configType }) => {
    try {
      // Dynamically import vite-tsconfig-paths
      const { default: tsconfigPaths } = await import("vite-tsconfig-paths");

      const distBase = path.resolve(baseDir, "../../../dist/libs/components");
      const srcBase = path.resolve(baseDir, "../../../libs/components/src");
      const aliasMap =
        configType === "PRODUCTION"
          ? {
              "liquidify/css": path.resolve(distBase, "liquidify.css"),
              "liquidify/styles": path.resolve(distBase, "liquidify.css"),
              liquidify: path.resolve(distBase, "index.mjs"),
              "@": srcBase,
            }
          : {
              "liquidify/css": path.resolve(srcBase, "styles/index.css"),
              "liquidify/styles": path.resolve(srcBase, "styles/index.css"),
              liquidify: path.resolve(srcBase, "index.ts"),
              "@": srcBase,
            };

      // -----------------------------
      // Mutate the supplied Vite config in-place instead of using mergeConfig
      // This avoids the duplicate __dirname declaration error that Storybook
      // hits when evaluating main.ts in CJS context.
      // -----------------------------

      // Resolve & alias settings
      config.logLevel = "error";
      config.resolve = {
        ...(config.resolve ?? {}),
        alias: aliasMap,
        dedupe: ["react", "react-dom"],
      };

      // Plugins
      config.plugins = [...(config.plugins ?? []), tsconfigPaths()];

      // Build options
      config.build = {
        ...(config.build ?? {}),
        rollupOptions: {
          ...(config.build?.rollupOptions ?? {}),
          onwarn(warning, warn) {
            // Suppress "use client" directive warnings
            if (
              warning.message &&
              warning.message.includes(
                "Module level directives cause errors when bundled",
              )
            ) {
              return;
            }
            // Suppress "use client" warnings
            if (warning.message && warning.message.includes('"use client"')) {
              return;
            }
            warn(warning);
          },
          output: {
            manualChunks: (id) => {
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
        chunkSizeWarningLimit: 2500,
      };

      // Dependency optimisation
      config.optimizeDeps = {
        include: ["react", "react-dom", "@storybook/react-vite"],
        exclude: [],
      };

      // Global defines
      config.define = {
        ...(config.define ?? {}),
        "process.env.NODE_ENV": JSON.stringify(
          configType === "PRODUCTION" ? "production" : "development",
        ),
      };

      return config;
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
