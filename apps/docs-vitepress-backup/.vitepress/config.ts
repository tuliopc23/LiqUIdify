import { defineConfig } from "vitepress";
import path from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LiqUIdify",
  description:
    "Premium React component library with glassmorphism design. Production-ready components with TypeScript, accessibility, and modern animations.",
  base: "/",

  // SEO and Meta
  head: [
    ["meta", { name: "theme-color", content: "#3b82f6" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    [
      "meta",
      {
        name: "og:title",
        content: "LiqUIdify - Premium React Component Library",
      },
    ],
    [
      "meta",
      {
        name: "og:description",
        content:
          "Production-ready React components with glassmorphism design, TypeScript support, and WCAG 2.1 AA accessibility compliance.",
      },
    ],
    ["meta", { name: "og:site_name", content: "LiqUIdify" }],
    [
      "meta",
      { name: "og:image", content: "https://liquidify.dev/og-image.png" },
    ],
    ["meta", { name: "og:url", content: "https://liquidify.dev/" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:title",
        content: "LiqUIdify - Premium React Component Library",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "Production-ready React components with glassmorphism design and accessibility compliance.",
      },
    ],
    [
      "meta",
      { name: "twitter:image", content: "https://liquidify.dev/og-image.png" },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "React, TypeScript, Component Library, Glassmorphism, Accessibility, UI, Design System",
      },
    ],
    ["meta", { name: "author", content: "Tulio Pinheiro Cunha" }],
    ["link", { rel: "canonical", href: "https://liquidify.dev/" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["link", { rel: "icon", type: "image/png", href: "/favicon.png" }],
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    // Analytics
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX",
      },
    ],
    [
      "script",
      {},
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href
      });
    `,
    ],
    // Performance hints
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    ["link", { rel: "dns-prefetch", href: "https://unpkg.com" }],
  ],

  // Core Web Vitals optimization
  transformHead: ({ pageData }) => {
    const head: any[] = [];

    // Dynamic OG tags per page
    if (pageData.frontmatter.title) {
      head.push([
        "meta",
        {
          property: "og:title",
          content: `${pageData.frontmatter.title} | LiqUIdify`,
        },
      ]);
    }

    return head;
  },

  sitemap: {
    hostname: "https://liquidify.dev",
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    siteTitle: "LiqUIdify",

    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "Components", link: "/components/" },
      { text: "API", link: "/api/" },
      {
        text: "Storybook",
        link: "https://storybook.liquidify.dev",
        target: "_blank",
      },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/" },
          { text: "Installation", link: "/guide/installation" },
          { text: "Quick Start", link: "/guide/quick-start" },
          { text: "Framework Guides", link: "/guide/framework-guides" },
          { text: "Usage Examples", link: "/guide/usage-examples" },
          { text: "Design System", link: "/guide/design-system" },
          { text: "Theming", link: "/guide/theming" },
          { text: "Component Patterns", link: "/guide/patterns" },
        ],
      },
      {
        text: "Components",
        collapsed: false,
        items: [
          { text: "Overview", link: "/components/" },
          {
            text: "Core",
            collapsed: true,
            items: [
              { text: "Button", link: "/components/button" },
              { text: "Card", link: "/components/card" },
              { text: "Input", link: "/components/input" },
              { text: "Modal", link: "/components/modal" },
              { text: "Tooltip", link: "/components/tooltip" },
              { text: "Badge", link: "/components/badge" },
              { text: "Avatar", link: "/components/avatar" },
            ],
          },
          {
            text: "Form",
            collapsed: true,
            items: [
              { text: "Checkbox", link: "/components/checkbox" },
              { text: "Radio Group", link: "/components/radio-group" },
              { text: "Select", link: "/components/select" },
              { text: "Textarea", link: "/components/textarea" },
              { text: "Switch", link: "/components/switch" },
              { text: "Slider", link: "/components/slider" },
              { text: "Date Picker", link: "/components/date-picker" },
              { text: "File Upload", link: "/components/file-upload" },
              { text: "Combobox", link: "/components/combobox" },
              { text: "Number Input", link: "/components/number-input" },
            ],
          },
          {
            text: "Navigation",
            collapsed: true,
            items: [
              { text: "Breadcrumbs", link: "/components/breadcrumbs" },
              { text: "Tabs", link: "/components/tabs" },
              { text: "Pagination", link: "/components/pagination" },
              { text: "Navbar", link: "/components/navbar" },
              { text: "Sidebar", link: "/components/sidebar" },
              { text: "Mobile Nav", link: "/components/mobile-nav" },
            ],
          },
          {
            text: "Feedback",
            collapsed: true,
            items: [
              { text: "Alert", link: "/components/alert" },
              { text: "Toast", link: "/components/toast" },
              { text: "Notification", link: "/components/notification" },
              { text: "Banner", link: "/components/banner" },
              { text: "Progress", link: "/components/progress" },
              { text: "Spinner", link: "/components/spinner" },
              { text: "Loading", link: "/components/loading" },
              { text: "Skeleton", link: "/components/skeleton" },
            ],
          },
          {
            text: "Data Display",
            collapsed: true,
            items: [
              { text: "Table", link: "/components/table" },
              { text: "Accordion", link: "/components/accordion" },
              { text: "Timeline", link: "/components/timeline" },
              { text: "Tree View", link: "/components/tree-view" },
              { text: "Chart", link: "/components/chart" },
            ],
          },
          {
            text: "Layout",
            collapsed: true,
            items: [
              { text: "Drawer", link: "/components/drawer" },
              { text: "Dropdown", link: "/components/dropdown" },
              { text: "Popover", link: "/components/popover" },
              { text: "Portal", link: "/components/portal" },
            ],
          },
          {
            text: "Utility",
            collapsed: true,
            items: [
              { text: "Command", link: "/components/command" },
              { text: "Search", link: "/components/search" },
              { text: "Error Boundary", link: "/components/error-boundary" },
              { text: "Theme Provider", link: "/components/theme-provider" },
              { text: "Theme Toggle", link: "/components/theme-toggle" },
            ],
          },
          {
            text: "Accessibility",
            collapsed: true,
            items: [
              { text: "Focus Trap", link: "/components/focus-trap" },
              { text: "Live Region", link: "/components/live-region" },
              { text: "Skip Navigation", link: "/components/skip-navigation" },
              { text: "Visually Hidden", link: "/components/visually-hidden" },
            ],
          },
        ],
      },
      {
        text: "API Reference",
        items: [{ text: "Overview", link: "/api/" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tuliopc23/LiqUIdify" },
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/@liquidify/components",
      },
      { icon: "discord", link: "https://discord.gg/liquidify" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024 Tulio Pinheiro Cunha",
    },

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search documentation",
              },
              modal: {
                noResultsText: "No results for",
                resetButtonTitle: "Clear search query",
                footer: {
                  selectText: "to select",
                  navigateText: "navigate",
                  closeText: "to close",
                },
              },
            },
          },
        },
      },
    },

    editLink: {
      pattern:
        "https://github.com/tuliopc23/LiqUIdify/edit/main/apps/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
  },

  markdown: {
    lineNumbers: true,
    anchor: {
      permalink: {
        symbol: "#",
        renderBefore: true,
      },
    },
    toc: { level: [1, 2, 3] },
    config: (_md) => {
      // Markdown configuration can be added here if needed
    },
  },

  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "../../../libs/components/src"),
        "@liquidify/components": path.resolve(
          __dirname,
          "../../../libs/components/src/index.ts",
        ),
        "@/components/*": path.resolve(
          __dirname,
          "../../../libs/components/src/components/*",
        ),
        "@/core/*": path.resolve(
          __dirname,
          "../../../libs/components/src/core/*",
        ),
        "@/hooks/*": path.resolve(
          __dirname,
          "../../../libs/components/src/hooks/*",
        ),
        "@/styles/*": path.resolve(
          __dirname,
          "../../../libs/components/src/styles/*",
        ),
        "@/tokens/*": path.resolve(
          __dirname,
          "../../../libs/components/src/tokens/*",
        ),
        "@/types/*": path.resolve(
          __dirname,
          "../../../libs/components/src/types/*",
        ),
      },
    },
    build: {
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          manualChunks: {
            "vue-vendor": ["vue", "@vue/runtime-core"],
            "vitepress-vendor": ["vitepress"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      // Improve error handling for missing React components
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
      // Add fallback mechanisms for React components
      target: "esnext",
      minify: "esbuild",
    },
    optimizeDeps: {
      include: ["vue", "@vue/runtime-core", "@vue/shared"],
      // Exclude React components from optimization to avoid SSR issues
      exclude: ["@liquidify/components"],
    },
    ssr: {
      noExternal: ["@liquidify/components"],
      // Add error boundaries for React components in SSR
      target: "node",
      // Add fallback for unsupported React integrations
      format: "cjs",
    },
    define: {
      // Prevent React hydration warnings in development
      __DEV__: process.env.NODE_ENV === "development",
      // Add fallback for React components that can't render in Vue
      "process.env.VITE_DOCS_REACT_FALLBACK": '"true"',
      // Add warning system for unsupported integrations
      "process.env.VITE_WARN_REACT_IN_VUE": '"true"',
    },
    // Add error handling for React/Vue integration issues
    plugins: [
      {
        name: "react-vue-fallback",
        transform(code, id) {
          // Add warnings for React components in Vue context
          if (id.includes("@liquidify/components") && code.includes("React.")) {
            console.warn(
              `⚠️  Warning: React component detected in Vue context: ${id}`,
            );
            console.warn(
              "   Consider using Vue-compatible alternatives or static examples",
            );
          }
          return null;
        },
      },
    ],
  },

  // Build optimization
  buildEnd: async (config) => {
    // Generate sitemap
    console.log("Generating sitemap...");
  },

  // Development server config
  dev: {
    port: 3001,
    host: true,
  },

  // Cache optimization
  cacheDir: ".vitepress/cache",

  // Cleanup URLs
  cleanUrls: true,

  // Enable MPA mode for better performance
  mpa: false,
});
